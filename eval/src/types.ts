/**
 * Shared types for the LAMMPS retrieval evaluation harness.
 */

/** One labeled evaluation query. */
export interface QueryCase {
  id: string;
  /** The user-facing query text, as a LAMMPS user would actually type it. */
  query: string;
  /**
   * Canonical doc ids that count as a correct answer. A doc id is the knowledge
   * file name without ".md" and without the " N" duplicate suffix
   * (e.g. "fix-nh", "compute-rdf"). Any hit in this set counts.
   */
  gold: string[];
  /** Query shape: command lookup, natural-language task, concept, param, error, build. */
  type: string;
  difficulty: "easy" | "medium" | "hard";
}

/** A single retrieved document, after chunk results are collapsed per doc. */
export interface RankedDoc {
  docId: string;
  /** Score of the best-ranked chunk belonging to this doc. */
  score: number;
  /** Heading path of that best chunk, for eyeballing failures. */
  heading: string;
}

/** Outcome of running one retriever on one query. */
export interface QueryOutcome {
  id: string;
  query: string;
  gold: string[];
  type: string;
  difficulty: string;
  /** Ranked doc ids, best first, truncated to the report cutoff. */
  retrieved: RankedDoc[];
  /** 1-based rank of the first gold doc, or null if none in the cutoff. */
  goldRank: number | null;
  /** Wall-clock milliseconds for this single query. */
  latencyMs: number;
}

export interface Metrics {
  n: number;
  recallAt1: number;
  recallAt3: number;
  recallAt5: number;
  recallAt10: number;
  /** Reciprocal rank averaged over all queries, 0 for misses beyond the cutoff. */
  mrr: number;
  latency: LatencyStats;
}

export interface LatencyStats {
  meanMs: number;
  p50Ms: number;
  p95Ms: number;
  maxMs: number;
}

export interface RunReport {
  name: string;
  description: string;
  metrics: Metrics;
  /** Per-slice breakdown, keyed by query type and by difficulty. */
  byType: Record<string, Metrics>;
  byDifficulty: Record<string, Metrics>;
  outcomes: QueryOutcome[];
  /** One-off setup cost (index load, collection upload), not part of query latency. */
  setupMs: number;
}

/** A retrieval strategy under test. */
export interface Retriever {
  name: string;
  description: string;
  /** Called once before any query; returns setup wall-clock ms. */
  setup?: () => Promise<void>;
  /** Return ranked docs, best first. Must return at least `cutoff` when available. */
  search: (query: string, cutoff: number) => Promise<RankedDoc[]> | RankedDoc[];
  teardown?: () => Promise<void>;
}
