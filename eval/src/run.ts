/**
 * LAMMPS retrieval eval runner.
 *
 *   npx tsx eval/src/run.ts                 # keyword vs TF-IDF vs 60/40 hybrid
 *   npx tsx eval/src/run.ts --sweep         # + the full alpha sweep
 *   npx tsx eval/src/run.ts --qdrant        # + the optional Qdrant backend
 *   npx tsx eval/src/run.ts --repeats 5     # average query latency over N passes
 */

import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { performance } from "perf_hooks";

import { VectorStore } from "../../src/store/vectorStore.js";
import { docIdOf, loadDataset, validateGoldLabels } from "./dataset.js";
import { computeMetrics, groupMetrics } from "./metrics.js";
import { baselineRetrievers, sweepRetrievers } from "./retrievers.js";
import { isQdrantAvailable, qdrantRetrievers } from "./backends/qdrant.js";
import { renderConsole, renderFailures, renderMarkdown } from "./report.js";
import type { QueryCase, QueryOutcome, Retriever, RunReport } from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "../..");
const DATA_DIR = path.join(PROJECT_ROOT, "data");
const EVAL_DIR = path.join(PROJECT_ROOT, "eval");
const RESULTS_DIR = path.join(EVAL_DIR, "results");

/** Doc-level cutoff kept in each outcome; the deepest reported Recall@k. */
const CUTOFF = 10;

interface Options {
  dataset: string;
  sweep: boolean;
  qdrant: boolean;
  keepCollection: boolean;
  repeats: number;
  only: string[] | null;
}

function parseArgs(argv: string[]): Options {
  const opts: Options = {
    dataset: path.join(EVAL_DIR, "dataset", "lammps-queries-v1.jsonl"),
    sweep: false,
    qdrant: false,
    keepCollection: false,
    repeats: 3,
    only: null,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--sweep") opts.sweep = true;
    else if (a === "--qdrant") opts.qdrant = true;
    else if (a === "--keep-collection") opts.keepCollection = true;
    else if (a === "--dataset") opts.dataset = path.resolve(argv[++i]);
    else if (a === "--repeats") opts.repeats = Math.max(1, Number(argv[++i]) || 1);
    else if (a === "--only") opts.only = argv[++i].split(",").map((s) => s.trim());
    else if (a === "--help" || a === "-h") {
      console.log(
        [
          "Usage: npx tsx eval/src/run.ts [options]",
          "  --dataset <path>     JSONL query set (default eval/dataset/lammps-queries-v1.jsonl)",
          "  --sweep              also run the TF-IDF/keyword alpha sweep",
          "  --qdrant             also run the optional Qdrant backend",
          "  --keep-collection    do not delete the Qdrant collection afterwards",
          "  --repeats <n>        latency passes per query (default 3, best-of is reported)",
          "  --only a,b           run only the named methods",
        ].join("\n")
      );
      process.exit(0);
    }
  }
  return opts;
}

/**
 * Run one retriever over the whole query set.
 * Latency is the minimum across repeats: it is the cleanest estimate of the
 * method's own cost, least polluted by GC pauses and other processes.
 */
async function runRetriever(
  retriever: Retriever,
  cases: QueryCase[],
  repeats: number
): Promise<RunReport> {
  const setupStart = performance.now();
  if (retriever.setup) await retriever.setup();
  const setupMs = performance.now() - setupStart;

  // Warm up JIT and any lazy caches so the first query is not an outlier.
  await retriever.search(cases[0].query, CUTOFF);

  const outcomes: QueryOutcome[] = [];
  for (const c of cases) {
    let best: { docs: Awaited<ReturnType<Retriever["search"]>>; ms: number } | null = null;
    for (let r = 0; r < repeats; r++) {
      const t0 = performance.now();
      const docs = await retriever.search(c.query, CUTOFF);
      const ms = performance.now() - t0;
      if (!best || ms < best.ms) best = { docs, ms };
    }
    const docs = best!.docs;
    const goldSet = new Set(c.gold);
    const rankIdx = docs.findIndex((d) => goldSet.has(d.docId));
    outcomes.push({
      id: c.id,
      query: c.query,
      gold: c.gold,
      type: c.type,
      difficulty: c.difficulty,
      retrieved: docs,
      goldRank: rankIdx === -1 ? null : rankIdx + 1,
      latencyMs: best!.ms,
    });
  }

  return {
    name: retriever.name,
    description: retriever.description,
    metrics: computeMetrics(outcomes),
    byType: groupMetrics(outcomes, (o) => o.type),
    byDifficulty: groupMetrics(outcomes, (o) => o.difficulty),
    outcomes,
    setupMs,
  };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  console.log("=== LAMMPS retrieval eval ===\n");

  console.log(`Dataset: ${path.relative(PROJECT_ROOT, opts.dataset)}`);
  const cases = await loadDataset(opts.dataset);
  console.log(`  ${cases.length} labeled queries`);

  const store = new VectorStore(DATA_DIR);
  const loadStart = performance.now();
  if (!(await store.load())) {
    console.error("Index not loaded. Run `npm run index` first.");
    process.exit(1);
  }
  const loadMs = performance.now() - loadStart;
  console.log(`  index load: ${loadMs.toFixed(0)} ms, ${store.chunkCount} chunks`);

  // A gold label naming a doc that is not in the index would silently cap
  // recall for every method, so fail loudly instead.
  const knownDocIds = new Set(store.getIndexedChunks().map((c) => docIdOf(c.source)));
  const validation = validateGoldLabels(cases, knownDocIds);
  if (!validation.ok) {
    console.error("\nInvalid gold labels:");
    for (const p of validation.problems) console.error(`  ${p}`);
    process.exit(1);
  }
  console.log(`  gold labels validated against ${knownDocIds.size} indexed docs\n`);

  let retrievers: Retriever[] = baselineRetrievers(store);
  if (opts.sweep) retrievers = [...retrievers, ...sweepRetrievers(store)];

  if (opts.qdrant) {
    if (await isQdrantAvailable()) {
      retrievers = [
        ...retrievers,
        ...(await qdrantRetrievers(store, (m) => console.log(m), opts.keepCollection)),
      ];
    } else {
      console.log(
        "  Qdrant not reachable at " +
          (process.env.QDRANT_URL ?? "http://127.0.0.1:6333") +
          " — skipping that backend.\n" +
          "  Start one with: docker run -d --name qdrant-eval -p 6333:6333 qdrant/qdrant\n"
      );
    }
  }

  if (opts.only) {
    const wanted = new Set(opts.only);
    retrievers = retrievers.filter((r) => wanted.has(r.name));
    if (retrievers.length === 0) {
      console.error(`No methods matched --only ${opts.only.join(",")}`);
      process.exit(1);
    }
  }

  const reports: RunReport[] = [];
  for (const r of retrievers) {
    process.stdout.write(`Running ${r.name} ... `);
    const report = await runRetriever(r, cases, opts.repeats);
    reports.push(report);
    console.log(
      `R@1 ${(report.metrics.recallAt1 * 100).toFixed(1)}%  ` +
        `R@5 ${(report.metrics.recallAt5 * 100).toFixed(1)}%  ` +
        `MRR ${report.metrics.mrr.toFixed(3)}  ` +
        `${report.metrics.latency.meanMs.toFixed(1)} ms/query`
    );
  }
  for (const r of retrievers) {
    if (r.teardown) await r.teardown();
  }

  console.log(renderConsole(reports));
  console.log(renderFailures(reports, "hybrid-60-40"));

  await fs.mkdir(RESULTS_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const jsonPath = path.join(RESULTS_DIR, `run-${stamp}.json`);
  const mdPath = path.join(RESULTS_DIR, "latest.md");
  await fs.writeFile(
    jsonPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        dataset: path.relative(PROJECT_ROOT, opts.dataset),
        queries: cases.length,
        chunks: store.chunkCount,
        indexLoadMs: loadMs,
        repeats: opts.repeats,
        cutoff: CUTOFF,
        reports,
      },
      null,
      2
    ),
    "utf-8"
  );
  await fs.writeFile(mdPath, renderMarkdown(reports, path.relative(PROJECT_ROOT, opts.dataset)), "utf-8");
  console.log(`\nWrote ${path.relative(PROJECT_ROOT, jsonPath)}`);
  console.log(`Wrote ${path.relative(PROJECT_ROOT, mdPath)}`);
}

main().catch((err) => {
  console.error("Eval failed:", err);
  process.exit(1);
});
