/**
 * TF-IDF based vector store for LAMMPS knowledge base
 * Pure JavaScript — no native dependencies.
 * Uses sparse TF-IDF vectors with cosine similarity for search.
 */

import fs from "fs/promises";
import path from "path";
import type { Chunk } from "../indexer/chunker.js";
import {
  type TfIdfModel,
  tokenize,
  buildTfIdfModel,
  toTfIdfVector,
  sparseCosine,
  serializeModel,
  deserializeModel,
} from "../indexer/embedder.js";

export interface IndexedChunk extends Chunk {
  /** Tokenized content for the chunk */
  tokens: string[];
  /** Sparse TF-IDF vector (stored as entries array for JSON) */
  vector: [number, number][];
}

export interface SearchResult {
  chunk: Chunk;
  score: number;
  matchType: "tfidf" | "keyword" | "hybrid";
}

interface IndexData {
  version: number;
  createdAt: string;
  model: object;
  chunks: IndexedChunk[];
}

const INDEX_VERSION = 2;
const INDEX_FILENAME = "tfidf_index.json";

/**
 * Keyword match score — checks how many query terms appear in the chunk
 * Uses word boundary matching to avoid false positives (e.g., "run" matching "running")
 */
export function keywordScore(queryTokens: string[], chunk: Chunk): number {
  const searchText = [
    chunk.content,
    chunk.docTitle,
    ...chunk.tags,
    ...chunk.commands,
    ...chunk.headingPath,
  ]
    .join(" ")
    .toLowerCase();

  let matched = 0;
  for (const term of queryTokens) {
    // Use word boundary regex for more precise matching
    // Allow LAMMPS-specific separators (/, _, -) as part of word boundaries
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(?:^|[\\s,;:()\\[\\]])${escaped}(?:[\\s,;:()\\[\\]]|$)`);
    if (pattern.test(searchText) || searchText.includes(term)) {
      // Give full credit for exact substring, but the regex check prioritizes boundary matches
      matched++;
    }
  }

  // Bonus for exact command name matches
  const queryJoined = queryTokens.join(" ");
  const commandMatch = chunk.commands.some(
    (cmd) => queryJoined.includes(cmd.toLowerCase())
  );

  const baseScore = queryTokens.length > 0
    ? matched / queryTokens.length
    : 0;

  return commandMatch ? Math.min(baseScore * 1.5, 1.0) : baseScore;
}

/** Relative weights of the two scoring signals. Ships as 60% TF-IDF / 40% keyword. */
export interface SearchWeights {
  tfidf: number;
  keyword: number;
}

export const DEFAULT_WEIGHTS: SearchWeights = { tfidf: 0.6, keyword: 0.4 };

export class VectorStore {
  private indexPath: string;
  private chunks: IndexedChunk[] = [];
  private model: TfIdfModel | null = null;
  private loaded = false;
  /**
   * Lazily built Map form of every chunk vector; only used when useVectorCache
   * is set. Keyed by chunk object, not chunk id: 55 ids in the current index
   * are shared by more than one chunk (headings that slugify identically).
   */
  private vectorCache: Map<IndexedChunk, Map<number, number>> | null = null;

  constructor(dataDir: string) {
    this.indexPath = path.join(dataDir, INDEX_FILENAME);
  }

  /**
   * Build index from chunks: tokenize, build TF-IDF model, compute vectors
   */
  buildFromChunks(chunks: Chunk[]): { indexedChunks: IndexedChunk[]; model: TfIdfModel } {
    console.log("  Tokenizing chunks...");
    const tokenizedDocs = chunks.map((c) => {
      // Prepend metadata to content for better matching
      const enriched = [
        c.docTitle,
        ...c.headingPath,
        ...c.commands,
        ...c.tags,
        c.content,
      ].join(" ");
      return tokenize(enriched);
    });

    console.log("  Building TF-IDF model...");
    const model = buildTfIdfModel(tokenizedDocs);
    console.log(`  Vocabulary size: ${model.vocabulary.length} terms`);

    console.log("  Computing TF-IDF vectors...");
    const indexedChunks: IndexedChunk[] = chunks.map((chunk, i) => ({
      ...chunk,
      tokens: tokenizedDocs[i],
      vector: [...toTfIdfVector(tokenizedDocs[i], model).entries()],
    }));

    this.chunks = indexedChunks;
    this.model = model;
    this.loaded = true;

    return { indexedChunks, model };
  }

  /**
   * Save index to disk
   */
  async save(indexedChunks: IndexedChunk[], model: TfIdfModel): Promise<void> {
    const data: IndexData = {
      version: INDEX_VERSION,
      createdAt: new Date().toISOString(),
      model: serializeModel(model),
      chunks: indexedChunks,
    };

    await fs.mkdir(path.dirname(this.indexPath), { recursive: true });
    await fs.writeFile(this.indexPath, JSON.stringify(data), "utf-8");
    this.chunks = indexedChunks;
    this.model = model;
    this.loaded = true;
    console.log(`Index saved: ${indexedChunks.length} chunks -> ${this.indexPath}`);
  }

  /**
   * Load index from disk
   */
  async load(): Promise<boolean> {
    try {
      const raw = await fs.readFile(this.indexPath, "utf-8");
      const data: IndexData = JSON.parse(raw);

      if (data.version !== INDEX_VERSION) {
        console.warn(`Index version mismatch. Please rebuild with 'npm run index'.`);
        return false;
      }

      this.model = deserializeModel(data.model);
      this.chunks = data.chunks;
      this.loaded = true;
      console.log(`Index loaded: ${this.chunks.length} chunks (built: ${data.createdAt})`);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if index exists on disk
   */
  async exists(): Promise<boolean> {
    try {
      await fs.access(this.indexPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Hybrid search: TF-IDF similarity + keyword matching
   */
  search(
    queryText: string,
    topK: number = 5,
    options?: {
      category?: string;
      tags?: string[];
      minScore?: number;
      /** Override the 60/40 TF-IDF/keyword blend. A zero weight skips that signal entirely. */
      weights?: SearchWeights;
      /**
       * Reuse a prebuilt Map for each chunk vector instead of rebuilding one per query.
       * Off by default so the shipping search path stays byte-for-byte unchanged.
       */
      useVectorCache?: boolean;
    }
  ): SearchResult[] {
    if (!this.loaded || !this.model) {
      throw new Error("Index not loaded. Run `npm run index` first.");
    }

    const minScore = options?.minScore ?? 0.1;
    const weights = options?.weights ?? DEFAULT_WEIGHTS;
    const useTfidf = weights.tfidf !== 0;
    const useKeyword = weights.keyword !== 0;
    const queryTokens = tokenize(queryText);
    const queryVector = toTfIdfVector(queryTokens, this.model);

    if (options?.useVectorCache && !this.vectorCache) {
      this.vectorCache = new Map(this.chunks.map((c) => [c, new Map(c.vector)]));
    }
    const cache = options?.useVectorCache ? this.vectorCache : null;

    let candidates = this.chunks;

    // Pre-filter by category
    if (options?.category) {
      candidates = candidates.filter(
        (c) => c.category.toLowerCase() === options.category!.toLowerCase()
      );
    }

    // Pre-filter by tags
    if (options?.tags && options.tags.length > 0) {
      const filterTags = options.tags.map((t) => t.toLowerCase());
      candidates = candidates.filter((c) =>
        c.tags.some((t) => filterTags.includes(t.toLowerCase()))
      );
    }

    // Score all candidates
    const scored: SearchResult[] = candidates.map((chunk) => {
      let tfidfScore = 0;
      if (useTfidf) {
        const chunkVector = cache?.get(chunk) ?? new Map(chunk.vector);
        tfidfScore = sparseCosine(queryVector, chunkVector);
      }
      const kwScore = useKeyword ? keywordScore(queryTokens, chunk) : 0;

      const hybridScore = weights.tfidf * tfidfScore + weights.keyword * kwScore;

      return {
        chunk: {
          id: chunk.id,
          source: chunk.source,
          docTitle: chunk.docTitle,
          tags: chunk.tags,
          commands: chunk.commands,
          category: chunk.category,
          headingPath: chunk.headingPath,
          content: chunk.content,
          tokenEstimate: chunk.tokenEstimate,
        },
        score: hybridScore,
        matchType:
          kwScore > 0.5 && tfidfScore > 0.1
            ? "hybrid"
            : kwScore > 0.5
              ? "keyword"
              : "tfidf",
      };
    });

    return scored
      .filter((r) => r.score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  /**
   * Exact command lookup
   */
  lookupCommand(commandName: string): Chunk[] {
    if (!this.loaded) throw new Error("Index not loaded");
    const normalized = commandName.toLowerCase().trim();
    return this.chunks
      .filter(
        (c) =>
          c.commands.some((cmd) => cmd.toLowerCase() === normalized) ||
          c.headingPath.some((h) => h.toLowerCase().includes(normalized)) ||
          c.content.toLowerCase().includes(`## ${normalized}`) ||
          c.content.toLowerCase().includes(`# ${normalized}`)
      )
      .map((c) => ({
        id: c.id,
        source: c.source,
        docTitle: c.docTitle,
        tags: c.tags,
        commands: c.commands,
        category: c.category,
        headingPath: c.headingPath,
        content: c.content,
        tokenEstimate: c.tokenEstimate,
      }));
  }

  /**
   * List all unique commands
   */
  listCommands(): { command: string; category: string; source: string }[] {
    if (!this.loaded) throw new Error("Index not loaded");
    const seen = new Set<string>();
    const result: { command: string; category: string; source: string }[] = [];
    for (const chunk of this.chunks) {
      for (const cmd of chunk.commands) {
        if (!seen.has(cmd.toLowerCase())) {
          seen.add(cmd.toLowerCase());
          result.push({ command: cmd, category: chunk.category, source: chunk.source });
        }
      }
    }
    return result.sort((a, b) => a.command.localeCompare(b.command));
  }

  /**
   * List all unique categories
   */
  listCategories(): string[] {
    if (!this.loaded) throw new Error("Index not loaded");
    return [...new Set(this.chunks.map((c) => c.category))].sort();
  }

  /** Raw indexed chunks, including tokens and sparse vectors. Used by the eval harness. */
  getIndexedChunks(): readonly IndexedChunk[] {
    if (!this.loaded) throw new Error("Index not loaded");
    return this.chunks;
  }

  /** The fitted TF-IDF model, for vectorizing queries outside of search(). */
  getModel(): TfIdfModel {
    if (!this.model) throw new Error("Index not loaded");
    return this.model;
  }

  /** Tokenize + vectorize a query with this index's model. */
  vectorizeQuery(queryText: string): { tokens: string[]; vector: Map<number, number> } {
    if (!this.model) throw new Error("Index not loaded");
    const tokens = tokenize(queryText);
    return { tokens, vector: toTfIdfVector(tokens, this.model) };
  }

  get chunkCount(): number {
    return this.chunks.length;
  }

  get isLoaded(): boolean {
    return this.loaded;
  }
}
