/**
 * In-process retrieval strategies, all backed by the same built TF-IDF index
 * so the only thing that varies between runs is the scoring.
 */

import type { VectorStore, SearchWeights } from "../../src/store/vectorStore.js";
import { docIdOf } from "./dataset.js";
import type { RankedDoc, Retriever } from "./types.js";

/**
 * How many chunks to pull before collapsing to docs. The index averages ~8
 * chunks per doc, so a chunk-level cutoff well above the doc-level cutoff is
 * needed or a single verbose doc can crowd out the rest of the ranking.
 */
const CHUNK_POOL = 200;

/**
 * Collapse chunk hits to a document ranking: each doc keeps its best chunk,
 * and docs are ordered by that best chunk's score.
 */
export function chunksToDocs(
  results: { chunk: { source: string; headingPath: string[] }; score: number }[],
  cutoff: number
): RankedDoc[] {
  const best = new Map<string, RankedDoc>();
  for (const r of results) {
    const docId = docIdOf(r.chunk.source);
    const existing = best.get(docId);
    if (!existing || r.score > existing.score) {
      best.set(docId, {
        docId,
        score: r.score,
        heading: r.chunk.headingPath.join(" > "),
      });
    }
  }
  return [...best.values()].sort((a, b) => b.score - a.score).slice(0, cutoff);
}

function weightedRetriever(
  store: VectorStore,
  name: string,
  description: string,
  weights: SearchWeights,
  useVectorCache = false
): Retriever {
  return {
    name,
    description,
    search(query, cutoff) {
      const results = store.search(query, CHUNK_POOL, {
        // No score floor: the floor is a presentation concern and would hide
        // genuine low-scoring hits from recall.
        minScore: 0,
        weights,
        useVectorCache,
      });
      return chunksToDocs(results, cutoff);
    },
  };
}

/** The three strategies the comparison is actually about. */
export function baselineRetrievers(store: VectorStore): Retriever[] {
  return [
    weightedRetriever(
      store,
      "keyword",
      "Pure keyword: fraction of query terms present, x1.5 for an exact command match",
      { tfidf: 0, keyword: 1 }
    ),
    weightedRetriever(
      store,
      "tfidf",
      "Pure TF-IDF cosine similarity over the sparse term vectors",
      { tfidf: 1, keyword: 0 }
    ),
    weightedRetriever(
      store,
      "hybrid-60-40",
      "Shipping default: 0.6 x TF-IDF + 0.4 x keyword",
      { tfidf: 0.6, keyword: 0.4 }
    ),
    weightedRetriever(
      store,
      "hybrid-60-40-cached",
      "Same ranking as hybrid-60-40, with chunk vectors kept as Maps between queries",
      { tfidf: 0.6, keyword: 0.4 },
      true
    ),
  ];
}

/** Alpha sweep over the TF-IDF/keyword blend, to check whether 60/40 is the right split. */
export function sweepRetrievers(store: VectorStore, steps = 11): Retriever[] {
  const out: Retriever[] = [];
  for (let i = 0; i < steps; i++) {
    const alpha = Math.round((i / (steps - 1)) * 100) / 100;
    out.push(
      weightedRetriever(
        store,
        `alpha-${alpha.toFixed(2)}`,
        `${alpha.toFixed(2)} x TF-IDF + ${(1 - alpha).toFixed(2)} x keyword`,
        { tfidf: alpha, keyword: 1 - alpha }
      )
    );
  }
  return out;
}
