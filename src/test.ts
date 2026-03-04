/**
 * Quick test script for the LAMMPS MCP server search functionality
 */

import path from "path";
import { fileURLToPath } from "url";
import { VectorStore } from "./store/vectorStore.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(PROJECT_ROOT, "data");

async function test() {
  console.log("=== LAMMPS MCP Server — Search Test ===\n");

  const store = new VectorStore(DATA_DIR);
  const loaded = await store.load();
  if (!loaded) {
    console.error("Failed to load index!");
    process.exit(1);
  }

  console.log(`Loaded ${store.chunkCount} chunks.\n`);

  // Test 1: Search for fix langevin
  console.log("--- Test 1: Search 'fix langevin thermostat' ---");
  const r1 = store.search("fix langevin thermostat", 3);
  for (const r of r1) {
    console.log(`  [${(r.score * 100).toFixed(1)}%] ${r.chunk.headingPath.join(" > ")} (${r.chunk.source})`);
  }
  console.log();

  // Test 2: Search for pair_style granular
  console.log("--- Test 2: Search 'granular contact model hertz' ---");
  const r2 = store.search("granular contact model hertz", 3);
  for (const r of r2) {
    console.log(`  [${(r.score * 100).toFixed(1)}%] ${r.chunk.headingPath.join(" > ")} (${r.chunk.source})`);
  }
  console.log();

  // Test 3: Command lookup
  console.log("--- Test 3: Lookup 'fix langevin' ---");
  const r3 = store.lookupCommand("fix langevin");
  console.log(`  Found ${r3.length} chunks for 'fix langevin'`);
  for (const c of r3.slice(0, 3)) {
    console.log(`  - ${c.headingPath.join(" > ")} (${c.source})`);
  }
  console.log();

  // Test 4: List commands
  console.log("--- Test 4: List all commands ---");
  const cmds = store.listCommands();
  console.log(`  Total commands: ${cmds.length}`);
  for (const cmd of cmds.slice(0, 10)) {
    console.log(`  - ${cmd.command} [${cmd.category}]`);
  }
  if (cmds.length > 10) console.log(`  ... and ${cmds.length - 10} more`);
  console.log();

  // Test 5: List categories
  console.log("--- Test 5: Categories ---");
  const cats = store.listCategories();
  console.log(`  ${cats.join(", ")}`);

  console.log("\n=== All tests passed ===");
}

test().catch(console.error);
