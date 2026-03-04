#!/usr/bin/env node
/**
 * LAMMPS MCP Server — Main Entry Point
 *
 * A Model Context Protocol server that provides RAG-based search
 * over LAMMPS molecular dynamics documentation.
 *
 * Tools:
 *   - search_lammps_docs: TF-IDF + keyword hybrid search
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
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
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
      prompts: {},
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
      return handleSearch(store, args as { query: string; top_k?: number; category?: string });

    case "lookup_command":
      return handleLookup(store, args as { command: string });

    case "list_commands":
      return handleListCommands(store, args as { category?: string });

    case "get_example":
      return handleGetExample(store, args as { command: string });

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

  // Security: prevent path traversal
  if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    throw new Error(`Invalid resource filename: ${filename}`);
  }

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

// ===== Prompt Handlers =====

const PROMPTS = [
  {
    name: "write_lammps_script",
    description:
      "Generate a LAMMPS input script for a specific simulation task. " +
      "Searches the knowledge base for relevant commands and best practices.",
    arguments: [
      {
        name: "task",
        description:
          "Description of the simulation (e.g., 'NVT equilibration of a Lennard-Jones fluid', 'tensile test of a copper nanowire')",
        required: true,
      },
      {
        name: "potential",
        description:
          "Preferred interatomic potential (e.g., 'lj/cut', 'eam', 'reaxff'). Leave empty for auto-selection.",
        required: false,
      },
    ],
  },
  {
    name: "explain_command",
    description:
      "Get a detailed explanation of a LAMMPS command, including syntax, parameters, and usage examples.",
    arguments: [
      {
        name: "command",
        description: "The LAMMPS command to explain (e.g., 'fix nvt', 'pair_style lj/cut', 'compute rdf')",
        required: true,
      },
    ],
  },
  {
    name: "debug_lammps_script",
    description:
      "Analyze a LAMMPS input script for potential issues, suggest fixes, and explain error messages.",
    arguments: [
      {
        name: "script",
        description: "The LAMMPS input script content to debug",
        required: true,
      },
      {
        name: "error_message",
        description: "The error message from LAMMPS (if any)",
        required: false,
      },
    ],
  },
  {
    name: "find_potential",
    description:
      "Find the most appropriate interatomic potential (pair_style) for a given material system or simulation type.",
    arguments: [
      {
        name: "system",
        description:
          "Description of the material system (e.g., 'water with ions', 'iron-carbon alloy', 'polymer melt')",
        required: true,
      },
    ],
  },
];

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return { prompts: PROMPTS };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: promptArgs } = request.params;

  switch (name) {
    case "write_lammps_script": {
      const task = promptArgs?.task || "molecular dynamics simulation";
      const potential = promptArgs?.potential ? ` using ${promptArgs.potential} potential` : "";
      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text:
                `Write a complete LAMMPS input script for: ${task}${potential}.\n\n` +
                `Please use the search_lammps_docs and lookup_command tools to find the correct syntax ` +
                `for all commands used. Include:\n` +
                `1. Proper initialization (units, atom_style, boundary) — choose units carefully: ` +
                `'metal' for metallic systems (eV, Angstrom), 'real' for biomolecular (kcal/mol, Angstrom), ` +
                `'lj' for reduced units in coarse-grained sims\n` +
                `2. System setup (lattice, region, create_box, create_atoms or read_data)\n` +
                `3. Force field definition (pair_style, pair_coeff) — ensure pair_coeff covers ALL atom type pairs\n` +
                `4. Settings (neighbor, neigh_modify, timestep) — choose timestep appropriate for the unit system ` +
                `(typically 1.0 for 'lj', 0.001 ps for 'metal', 1.0 fs for 'real')\n` +
                `5. Equilibration and production runs with appropriate fixes\n` +
                `6. Output (thermo, dump)\n\n` +
                `IMPORTANT CHECKS:\n` +
                `- Ensure pair_style and pair_coeff are compatible\n` +
                `- Verify atom_style matches the force field requirements (e.g., 'charge' for Coulombic, 'full' for molecular)\n` +
                `- Set appropriate boundary conditions (p p p for bulk, p p f for surfaces)\n` +
                `- Include 'pair_modify' if using long-range Coulombics with kspace_style\n` +
                `- Add comments explaining each section. Verify all command syntax against the knowledge base.`,
            },
          },
        ],
      };
    }

    case "explain_command": {
      const command = promptArgs?.command || "fix nvt";
      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text:
                `Explain the LAMMPS command "${command}" in detail.\n\n` +
                `Use the lookup_command tool to retrieve the full documentation, then provide:\n` +
                `1. What this command does (purpose and physics)\n` +
                `2. Complete syntax with all parameters explained\n` +
                `3. Required vs optional arguments\n` +
                `4. Practical usage examples with comments\n` +
                `5. Common pitfalls or mistakes\n` +
                `6. Related commands that are often used together`,
            },
          },
        ],
      };
    }

    case "debug_lammps_script": {
      const script = promptArgs?.script || "";
      const errorMsg = promptArgs?.error_message ? `\n\nError message:\n${promptArgs.error_message}` : "";
      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text:
                `Debug the following LAMMPS input script. Use search_lammps_docs and lookup_command ` +
                `tools to verify command syntax and identify issues.\n\n` +
                `\`\`\`lammps\n${script}\n\`\`\`${errorMsg}\n\n` +
                `Please:\n` +
                `1. Check each command's syntax against the documentation\n` +
                `2. Identify any missing required commands or wrong argument order\n` +
                `3. Check for logical errors (e.g., wrong units, missing pair_coeff)\n` +
                `4. Suggest fixes with corrected code\n` +
                `5. Explain what caused each issue\n\n` +
                `Common LAMMPS errors to watch for:\n` +
                `- pair_style / pair_coeff mismatch (wrong number of args, missing atom type pairs)\n` +
                `- Inconsistent units (mixing 'metal' timestep with 'real' force field)\n` +
                `- Missing 'kspace_style' when using long-range Coulombics\n` +
                `- atom_style not matching the data file format or force field needs\n` +
                `- Wrong fix/compute group (using 'all' when a subset is needed)\n` +
                `- Undefined variables referenced in later commands\n` +
                `- Missing 'run 0' before accessing thermo quantities in variables`,
            },
          },
        ],
      };
    }

    case "find_potential": {
      const system = promptArgs?.system || "general material";
      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text:
                `Find the most appropriate pair_style (interatomic potential) for simulating: ${system}\n\n` +
                `Use search_lammps_docs to search for relevant pair styles, then:\n` +
                `1. List all applicable pair_styles with brief descriptions\n` +
                `2. Recommend the best choice for this system with reasoning\n` +
                `3. Show the required pair_style and pair_coeff syntax\n` +
                `4. Note any additional requirements (special packages, potential files)\n` +
                `5. Provide a minimal working example`,
            },
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown prompt: ${name}`);
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
