/**
 * Recall@k, MRR and latency percentiles over per-query outcomes.
 */

import type { LatencyStats, Metrics, QueryOutcome } from "./types.js";

function percentile(sortedAsc: number[], p: number): number {
  if (sortedAsc.length === 0) return 0;
  // Nearest-rank percentile; exact and dependency-free for sets this size.
  const idx = Math.min(sortedAsc.length - 1, Math.ceil((p / 100) * sortedAsc.length) - 1);
  return sortedAsc[Math.max(0, idx)];
}

export function latencyStats(samplesMs: number[]): LatencyStats {
  if (samplesMs.length === 0) return { meanMs: 0, p50Ms: 0, p95Ms: 0, maxMs: 0 };
  const sorted = [...samplesMs].sort((a, b) => a - b);
  const sum = sorted.reduce((a, b) => a + b, 0);
  return {
    meanMs: sum / sorted.length,
    p50Ms: percentile(sorted, 50),
    p95Ms: percentile(sorted, 95),
    maxMs: sorted[sorted.length - 1],
  };
}

/** Recall@k for known-item retrieval: 1 if any gold doc lands in the top k. */
function recallAt(outcomes: QueryOutcome[], k: number): number {
  if (outcomes.length === 0) return 0;
  const hits = outcomes.filter((o) => o.goldRank !== null && o.goldRank <= k).length;
  return hits / outcomes.length;
}

export function computeMetrics(outcomes: QueryOutcome[]): Metrics {
  const mrr =
    outcomes.length === 0
      ? 0
      : outcomes.reduce((sum, o) => sum + (o.goldRank ? 1 / o.goldRank : 0), 0) / outcomes.length;

  return {
    n: outcomes.length,
    recallAt1: recallAt(outcomes, 1),
    recallAt3: recallAt(outcomes, 3),
    recallAt5: recallAt(outcomes, 5),
    recallAt10: recallAt(outcomes, 10),
    mrr,
    latency: latencyStats(outcomes.map((o) => o.latencyMs)),
  };
}

export function groupMetrics(
  outcomes: QueryOutcome[],
  key: (o: QueryOutcome) => string
): Record<string, Metrics> {
  const groups = new Map<string, QueryOutcome[]>();
  for (const o of outcomes) {
    const g = key(o);
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g)!.push(o);
  }
  const out: Record<string, Metrics> = {};
  for (const [g, items] of [...groups].sort((a, b) => a[0].localeCompare(b[0]))) {
    out[g] = computeMetrics(items);
  }
  return out;
}
