/**
 * Optional Qdrant backend for the retrieval eval.
 *
 * Why Qdrant and not FAISS: the knowledge base is indexed with sparse TF-IDF
 * vectors (~30k-term vocabulary), and Qdrant indexes sparse vectors natively
 * over plain HTTP. FAISS would mean a native node binding plus a dense
 * projection of the vectors, i.e. a second change to the ranking that would
 * confound the comparison. Here the vectors are the *same* vectors already in
 * data/tfidf_index.json, L2-normalized so Qdrant's sparse dot product equals
 * the in-process cosine. What changes is only where the search runs.
 *
 * Requires a reachable Qdrant, e.g.:
 *   docker run -d --name qdrant-eval -p 6333:6333 qdrant/qdrant
 * Set QDRANT_URL to point elsewhere. When unreachable, the harness skips these
 * retrievers instead of failing the run.
 */

import type { VectorStore } from "../../../src/store/vectorStore.js";
import { keywordScore } from "../../../src/store/vectorStore.js";
import { chunksToDocs } from "../retrievers.js";
import type { RankedDoc, Retriever } from "../types.js";

const DEFAULT_URL = process.env.QDRANT_URL ?? "http://127.0.0.1:6333";
const COLLECTION = process.env.QDRANT_COLLECTION ?? "lammps_tfidf";
const VECTOR_NAME = "tfidf";
const UPSERT_BATCH = 256;
const CANDIDATE_POOL = 200;

interface SparseVector {
  indices: number[];
  values: number[];
}

/** L2-normalize so a dot product over sparse vectors equals cosine similarity. */
function normalize(entries: [number, number][]): SparseVector {
  let norm = 0;
  for (const [, v] of entries) norm += v * v;
  norm = Math.sqrt(norm);
  const indices: number[] = [];
  const values: number[] = [];
  if (norm === 0) return { indices, values };
  for (const [i, v] of entries) {
    indices.push(i);
    values.push(v / norm);
  }
  return { indices, values };
}

async function req(url: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(url, {
    ...init,
    headers: { "content-type": "application/json", ...(init?.headers ?? {}) },
  });
  return res;
}

export async function isQdrantAvailable(url = DEFAULT_URL): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 1500);
    const res = await req(`${url}/collections`, { signal: controller.signal });
    clearTimeout(timer);
    return res.ok;
  } catch {
    return false;
  }
}

class QdrantIndex {
  constructor(
    private store: VectorStore,
    private url = DEFAULT_URL,
    private collection = COLLECTION
  ) {}

  /** Drop and rebuild the collection from the chunks already in the store. */
  async upload(log: (msg: string) => void): Promise<void> {
    const chunks = this.store.getIndexedChunks();

    await req(`${this.url}/collections/${this.collection}`, { method: "DELETE" });
    const create = await req(`${this.url}/collections/${this.collection}`, {
      method: "PUT",
      body: JSON.stringify({ sparse_vectors: { [VECTOR_NAME]: {} } }),
    });
    if (!create.ok) {
      throw new Error(`Qdrant collection create failed: ${create.status} ${await create.text()}`);
    }

    for (let start = 0; start < chunks.length; start += UPSERT_BATCH) {
      const batch = chunks.slice(start, start + UPSERT_BATCH).map((c, i) => ({
        id: start + i,
        vector: { [VECTOR_NAME]: normalize(c.vector) },
        payload: { source: c.source, heading: c.headingPath.join(" > ") },
      }));
      const res = await req(`${this.url}/collections/${this.collection}/points?wait=true`, {
        method: "PUT",
        body: JSON.stringify({ points: batch }),
      });
      if (!res.ok) {
        throw new Error(`Qdrant upsert failed at ${start}: ${res.status} ${await res.text()}`);
      }
      if (start % (UPSERT_BATCH * 8) === 0) {
        log(`    uploaded ${start + batch.length}/${chunks.length} points`);
      }
    }
    log(`    uploaded ${chunks.length}/${chunks.length} points`);
  }

  /** Sparse ANN search; returns [chunkIndex, score] pairs. */
  async query(vector: SparseVector, limit: number): Promise<[number, number][]> {
    if (vector.indices.length === 0) return [];
    const res = await req(`${this.url}/collections/${this.collection}/points/query`, {
      method: "POST",
      body: JSON.stringify({
        query: vector,
        using: VECTOR_NAME,
        limit,
        with_payload: false,
      }),
    });
    if (!res.ok) {
      throw new Error(`Qdrant query failed: ${res.status} ${await res.text()}`);
    }
    const body = (await res.json()) as { result: { points: { id: number; score: number }[] } };
    return body.result.points.map((p) => [p.id, p.score]);
  }

  async drop(): Promise<void> {
    await req(`${this.url}/collections/${this.collection}`, { method: "DELETE" });
  }
}

/**
 * Two Qdrant-backed retrievers:
 *  - qdrant-sparse: pure ANN sparse retrieval, the server-side twin of `tfidf`.
 *  - qdrant-rerank: ANN recall pass, then the same 60/40 blend applied locally
 *    to the returned candidates. This is the shape a production deployment
 *    would actually take.
 */
export async function qdrantRetrievers(
  store: VectorStore,
  log: (msg: string) => void,
  keepCollection = false
): Promise<Retriever[]> {
  const index = new QdrantIndex(store);
  const chunks = store.getIndexedChunks();
  let uploaded = false;

  const ensureUploaded = async () => {
    if (uploaded) return;
    log(`  Uploading ${chunks.length} sparse vectors to Qdrant at ${DEFAULT_URL}...`);
    await index.upload(log);
    uploaded = true;
  };

  const toDocs = async (
    query: string,
    cutoff: number,
    rerank: boolean
  ): Promise<RankedDoc[]> => {
    const { tokens, vector } = store.vectorizeQuery(query);
    const sparse = normalize([...vector.entries()]);
    const hits = await index.query(sparse, CANDIDATE_POOL);

    const scored = hits.map(([id, score]) => {
      const chunk = chunks[id];
      // Qdrant returns cosine directly, since the vectors are normalized.
      const finalScore = rerank ? 0.6 * score + 0.4 * keywordScore(tokens, chunk) : score;
      return { chunk, score: finalScore };
    });
    return chunksToDocs(scored, cutoff);
  };

  return [
    {
      name: "qdrant-sparse",
      description: "Qdrant sparse-vector ANN over the same TF-IDF vectors (cosine via dot product)",
      setup: ensureUploaded,
      search: (q, cutoff) => toDocs(q, cutoff, false),
    },
    {
      name: "qdrant-rerank",
      description: "Qdrant ANN recall (top 200) then the 60/40 hybrid blend applied locally",
      setup: ensureUploaded,
      search: (q, cutoff) => toDocs(q, cutoff, true),
      // Dropped only after the last Qdrant retriever has run.
      teardown: keepCollection ? undefined : () => index.drop(),
    },
  ];
}
