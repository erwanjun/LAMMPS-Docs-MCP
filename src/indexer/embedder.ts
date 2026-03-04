/**
 * TF-IDF based text vectorizer for LAMMPS knowledge base
 * Pure JavaScript implementation — no native dependencies needed.
 *
 * Uses TF-IDF (Term Frequency–Inverse Document Frequency) to create
 * sparse vectors, then computes cosine similarity for search.
 * This works exceptionally well for technical documentation where
 * LAMMPS command names and technical terms are highly distinctive.
 */

/** Stop words to ignore in vectorization */
const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "shall",
  "should", "may", "might", "must", "can", "could", "am", "i", "me",
  "my", "we", "our", "you", "your", "he", "she", "it", "they", "them",
  "his", "her", "its", "this", "that", "these", "those", "what", "which",
  "who", "whom", "when", "where", "why", "how", "all", "each", "every",
  "both", "few", "more", "most", "other", "some", "such", "no", "not",
  "only", "own", "same", "so", "than", "too", "very", "just", "because",
  "as", "into", "through", "during", "before", "after", "above", "below",
  "to", "from", "up", "down", "in", "out", "on", "off", "over", "under",
  "again", "further", "then", "once", "here", "there", "if", "or", "and",
  "but", "nor", "for", "at", "by", "with", "about", "between", "of",
  "also", "any", "s", "t", "d", "o", "e", "p",
]);

/**
 * Tokenize text into terms, preserving LAMMPS-specific patterns
 * like "fix/nvt", "pair_style", "lj/cut" etc.
 */
export function tokenize(text: string): string[] {
  const lower = text.toLowerCase();
  const rawTokens = lower.match(/[a-z0-9][a-z0-9/_.-]*/g) || [];

  const tokens: string[] = [];
  for (const token of rawTokens) {
    if (STOP_WORDS.has(token) || token.length <= 1) continue;
    tokens.push(token);

    // Also add sub-tokens for compound terms like "pair_style" -> "pair", "style"
    if (token.includes("_") || token.includes("/")) {
      const parts = token.split(/[_/]/);
      for (const part of parts) {
        if (part.length > 1 && !STOP_WORDS.has(part)) {
          tokens.push(part);
        }
      }
    }
  }

  return tokens;
}

/**
 * Compute term frequency for a document
 */
function computeTF(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const token of tokens) {
    tf.set(token, (tf.get(token) || 0) + 1);
  }
  const len = tokens.length || 1;
  for (const [token, count] of tf) {
    tf.set(token, count / len);
  }
  return tf;
}

export interface TfIdfModel {
  idf: Map<string, number>;
  numDocs: number;
  vocabulary: string[];
  termIndex: Map<string, number>;
}

/**
 * Build a TF-IDF model from a corpus of tokenized documents
 */
export function buildTfIdfModel(documents: string[][]): TfIdfModel {
  const df = new Map<string, number>();
  const numDocs = documents.length;

  for (const tokens of documents) {
    const uniqueTerms = new Set(tokens);
    for (const term of uniqueTerms) {
      df.set(term, (df.get(term) || 0) + 1);
    }
  }

  const idf = new Map<string, number>();
  for (const [term, freq] of df) {
    idf.set(term, Math.log((numDocs + 1) / (freq + 1)) + 1);
  }

  const vocabulary = [...idf.keys()].sort();
  const termIndex = new Map<string, number>();
  vocabulary.forEach((term, idx) => termIndex.set(term, idx));

  return { idf, numDocs, vocabulary, termIndex };
}

/**
 * Convert tokens to a TF-IDF sparse vector
 */
export function toTfIdfVector(
  tokens: string[],
  model: TfIdfModel
): Map<number, number> {
  const tf = computeTF(tokens);
  const vector = new Map<number, number>();

  for (const [term, tfVal] of tf) {
    const idx = model.termIndex.get(term);
    if (idx !== undefined) {
      const idfVal = model.idf.get(term) || 0;
      vector.set(idx, tfVal * idfVal);
    }
  }

  return vector;
}

/**
 * Cosine similarity between two sparse vectors
 */
export function sparseCosine(
  a: Map<number, number>,
  b: Map<number, number>
): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (const [idx, val] of a) {
    normA += val * val;
    const bVal = b.get(idx);
    if (bVal !== undefined) {
      dot += val * bVal;
    }
  }

  for (const [, val] of b) {
    normB += val * val;
  }

  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

/**
 * Serialize TF-IDF model to plain object for JSON storage
 */
export function serializeModel(model: TfIdfModel): object {
  return {
    numDocs: model.numDocs,
    vocabulary: model.vocabulary,
    idf: Object.fromEntries(model.idf),
  };
}

/**
 * Deserialize TF-IDF model from JSON
 */
export function deserializeModel(data: any): TfIdfModel {
  const idf = new Map<string, number>(Object.entries(data.idf));
  const vocabulary: string[] = data.vocabulary;
  const termIndex = new Map<string, number>();
  vocabulary.forEach((term, idx) => termIndex.set(term, idx));

  return { idf, numDocs: data.numDocs, vocabulary, termIndex };
}
