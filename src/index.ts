/**
 * LAMMPS MCP Server — Main Entry Point
 *
 * A Model Context Protocol server that provides RAG-based search
 * over LAMMPS molecular dynamics documentation.
 *
 * Tools:
 *   - search_lammps_docs: Semantic + keyword hybrid search
 *   - lookup_command: Exact command name lookup
 *   - list_commands: Browse all indexed commands
 *   - get_example: Get usage examples for a command
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

import { VectorStore } from "./store/vectorStore.js";
import {
  searchToolDefinition,
  handleSearch,
} from "./tools/search.js";
import {
  lookupToolDefinition,
  listCommandsToolDefinition,
  getExampleToolDefinition,
  handleLookup,
  handleListCommands,
  handleGetExample,
} from "./tools/lookup.js";

// Resolve paths
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(PROJECT_ROOT, "data");
const KNOWLEDGE_DIR = path.join(PROJECT_ROOT, "knowledge");

// Initialize vector store
const store = new VectorStore(DATA_DIR);

// Create MCP server
const server = new Server(
  {
    name: "lammps-knowledge-base",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// ===== Tool Handlers =====

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      searchToolDefinition,
      lookupToolDefinition,
      listCommandsToolDefinition,
      getExampleToolDefinition,
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  // Ensure index is loaded
  if (!store.isLoaded) {
    const loaded = await store.load();
    if (!loaded) {
      return {
        content: [
          {
            type: "text" as const,
            text: "Knowledge base index not found. Please run `npm run index` to build the vector index first.",
          },
        ],
        isError: true,
      };
    }
  }

  switch (name) {
    case "search_lammps_docs":
      return handleSearch(store, args as any);

    case "lookup_command":
      return handleLookup(store, args as any);

    case "list_commands":
      return handleListCommands(store, args as any);

    case "get_example":
      return handleGetExample(store, args as any);

    default:
      return {
        content: [
          {
            type: "text" as const,
            text: `Unknown tool: ${name}`,
          },
        ],
        isError: true,
      };
  }
});

// ===== Resource Handlers (expose knowledge base index) =====

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  // List all markdown files in knowledge/ as browsable resources
  try {
    const files = await fs.readdir(KNOWLEDGE_DIR);
    const mdFiles = files.filter((f) => f.endsWith(".md")).sort();

    return {
      resources: mdFiles.map((f) => ({
        uri: `lammps://knowledge/${f}`,
        name: f.replace(".md", ""),
        description: `LAMMPS documentation: ${f}`,
        mimeType: "text/markdown",
      })),
    };
  } catch {
    return { resources: [] };
  }
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  const match = uri.match(/^lammps:\/\/knowledge\/(.+)$/);

  if (!match) {
    throw new Error(`Unknown resource URI: ${uri}`);
  }

  const filename = match[1];
  const filePath = path.join(KNOWLEDGE_DIR, filename);

  try {
    const content = await fs.readFile(filePath, "utf-8");
    return {
      contents: [
        {
          uri,
          mimeType: "text/markdown",
          text: content,
        },
      ],
    };
  } catch {
    throw new Error(`Resource not found: ${filename}`);
  }
});

// ===== Start Server =====

async function main() {
  console.error("Starting LAMMPS MCP Server...");
  console.error(`  Data dir: ${DATA_DIR}`);
  console.error(`  Knowledge dir: ${KNOWLEDGE_DIR}`);

  // Pre-load index if available
  const indexExists = await store.exists();
  if (indexExists) {
    await store.load();
    console.error(`  Index loaded: ${store.chunkCount} chunks`);
  } else {
    console.error(
      "  ⚠ No index found. Run `npm run index` to build the vector index."
    );
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("LAMMPS MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
