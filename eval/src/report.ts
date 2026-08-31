/**
 * Console and markdown rendering of eval results.
 */

import type { Metrics, RunReport } from "./types.js";

const pct = (x: number) => `${(x * 100).toFixed(1)}%`;
const ms = (x: number) => `${x.toFixed(1)}`;

function pad(s: string, w: number, right = false): string {
  return right ? s.padStart(w) : s.padEnd(w);
}

function table(rows: string[][], alignRight: boolean[]): string {
  const widths = rows[0].map((_, i) => Math.max(...rows.map((r) => r[i].length)));
  const lines = rows.map((r, ri) => {
    const cells = r.map((c, i) => pad(c, widths[i], alignRight[i]));
    const line = `  ${cells.join("  ")}`;
    return ri === 0 ? `${line}\n  ${widths.map((w) => "-".repeat(w)).join("  ")}` : line;
  });
  return lines.join("\n");
}

const HEADERS = ["method", "R@1", "R@3", "R@5", "R@10", "MRR", "mean ms", "p50", "p95", "max"];

function metricRow(name: string, m: Metrics): string[] {
  return [
    name,
    pct(m.recallAt1),
    pct(m.recallAt3),
    pct(m.recallAt5),
    pct(m.recallAt10),
    m.mrr.toFixed(3),
    ms(m.latency.meanMs),
    ms(m.latency.p50Ms),
    ms(m.latency.p95Ms),
    ms(m.latency.maxMs),
  ];
}

export function renderConsole(reports: RunReport[]): string {
  const align = [false, true, true, true, true, true, true, true, true, true];
  const out: string[] = [];

  out.push("\n=== Overall (n=" + (reports[0]?.metrics.n ?? 0) + " queries) ===\n");
  out.push(table([HEADERS, ...reports.map((r) => metricRow(r.name, r.metrics))], align));

  const types = [...new Set(reports.flatMap((r) => Object.keys(r.byType)))].sort();
  for (const t of types) {
    const rows = reports.filter((r) => r.byType[t]).map((r) => metricRow(r.name, r.byType[t]));
    if (rows.length === 0) continue;
    out.push(`\n--- query type: ${t} (n=${reports[0].byType[t]?.n ?? 0}) ---\n`);
    out.push(table([HEADERS, ...rows], align));
  }

  const diffs = ["easy", "medium", "hard"];
  for (const d of diffs) {
    const rows = reports.filter((r) => r.byDifficulty[d]).map((r) => metricRow(r.name, r.byDifficulty[d]));
    if (rows.length === 0) continue;
    out.push(`\n--- difficulty: ${d} (n=${reports[0].byDifficulty[d]?.n ?? 0}) ---\n`);
    out.push(table([HEADERS, ...rows], align));
  }

  return out.join("\n");
}

/** Queries where the best method still misses, i.e. where the work is. */
export function renderFailures(reports: RunReport[], focus: string, limit = 15): string {
  const report = reports.find((r) => r.name === focus) ?? reports[reports.length - 1];
  const misses = report.outcomes
    .filter((o) => o.goldRank === null || o.goldRank > 5)
    .slice(0, limit);
  if (misses.length === 0) return `\nNo top-5 misses for ${report.name}.\n`;

  const lines = [`\n=== Top-5 misses for ${report.name} (${misses.length} shown) ===\n`];
  for (const o of misses) {
    lines.push(`  [${o.id}] "${o.query}"`);
    lines.push(`      gold: ${o.gold.join(", ")}   rank: ${o.goldRank ?? "not in top 10"}`);
    lines.push(`      got : ${o.retrieved.slice(0, 3).map((d) => d.docId).join(", ")}`);
  }
  return lines.join("\n");
}

export function renderMarkdown(reports: RunReport[], datasetPath: string): string {
  const lines: string[] = [];
  lines.push("# LAMMPS retrieval eval");
  lines.push("");
  lines.push(`- Dataset: \`${datasetPath}\` (${reports[0]?.metrics.n ?? 0} labeled queries)`);
  lines.push(`- Generated: ${new Date().toISOString()}`);
  lines.push(
    "- Recall@k / MRR are computed over **documents**: chunk hits are collapsed to their " +
      "source doc, each doc keeping its best chunk. A query counts as a hit when any of its " +
      "gold docs appears in the top k."
  );
  lines.push("");
  lines.push("## Overall");
  lines.push("");
  lines.push(`| ${HEADERS.join(" | ")} | setup ms |`);
  lines.push(`|${HEADERS.map(() => "---").join("|")}|---|`);
  for (const r of reports) {
    lines.push(`| ${metricRow(r.name, r.metrics).join(" | ")} | ${r.setupMs.toFixed(0)} |`);
  }
  lines.push("");
  lines.push("## Methods");
  lines.push("");
  for (const r of reports) {
    lines.push(`- **${r.name}** — ${r.description}`);
  }
  lines.push("");

  for (const [label, pick] of [
    ["By query type", (r: RunReport) => r.byType],
    ["By difficulty", (r: RunReport) => r.byDifficulty],
  ] as const) {
    lines.push(`## ${label}`);
    lines.push("");
    const keys = [...new Set(reports.flatMap((r) => Object.keys(pick(r))))].sort();
    for (const k of keys) {
      lines.push(`### ${k} (n=${pick(reports[0])[k]?.n ?? 0})`);
      lines.push("");
      lines.push(`| ${HEADERS.join(" | ")} |`);
      lines.push(`|${HEADERS.map(() => "---").join("|")}|`);
      for (const r of reports) {
        const m = pick(r)[k];
        if (m) lines.push(`| ${metricRow(r.name, m).join(" | ")} |`);
      }
      lines.push("");
    }
  }

  return lines.join("\n");
}
