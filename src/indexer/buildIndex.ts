/**
 * Build TF-IDF index for the LAMMPS knowledge base
 * Reads all markdown files, chunks them, builds TF-IDF model, saves index
 */

import path from "path";
import { fileURLToPath } from "url";
import { chunkAllFiles } from "./chunker.js";
import { VectorStore } from "../store/vectorStore.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "../..");
const KNOWLEDGE_DIR = path.join(PROJECT_ROOT, "knowledge");
const DATA_DIR = path.join(PROJECT_ROOT, "data");

async function buildIndex() {
  console.log("=== LAMMPS MCP Server — Index Builder ===\n");
  console.log(`Knowledge dir: ${KNOWLEDGE_DIR}`);
  console.log(`Data dir: ${DATA_DIR}\n`);

  // Step 1: Chunk all markdown files
  console.log("Step 1: Chunking markdown files...");
  const chunks = await chunkAllFiles(KNOWLEDGE_DIR);
  console.log(`  Total chunks: ${chunks.length}\n`);

  if (chunks.length === 0) {
    console.error("No chunks generated. Check that knowledge/ contains .md files.");
    process.exit(1);
  }

  // Step 2: Build TF-IDF model and compute vectors
  console.log("Step 2: Building TF-IDF index...");
  const store = new VectorStore(DATA_DIR);
  const { indexedChunks, model } = store.buildFromChunks(chunks);

  // Step 3: Save
  console.log("\nStep 3: Saving index...");
  await store.save(indexedChunks, model);

  // Stats
  const totalTokens = chunks.reduce((sum, c) => sum + c.tokenEstimate, 0);
  const categories = [...new Set(chunks.map((c) => c.category))];
  const commands = [...new Set(chunks.flatMap((c) => c.commands))];

  console.log("\n=== Index Build Complete ===");
  console.log(`  Chunks: ${chunks.length}`);
  console.log(`  Total tokens (est.): ${totalTokens}`);
  console.log(`  Vocabulary size: ${model.vocabulary.length}`);
  console.log(`  Categories: ${categories.length} (${categories.join(", ")})`);
  console.log(`  Commands indexed: ${commands.length}`);
}

buildIndex().catch((err) => {
  console.error("Index build failed:", err);
  process.exit(1);
});
