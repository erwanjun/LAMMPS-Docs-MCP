/**
 * MCP Tool: search_lammps_docs
 * Hybrid TF-IDF + keyword search across the LAMMPS knowledge base
 */

import type { VectorStore, SearchResult } from "../store/vectorStore.js";

export const searchToolDefinition = {
  name: "search_lammps_docs",
  description:
    "Search the LAMMPS documentation knowledge base using natural language queries. " +
    "Returns the most relevant documentation snippets for LAMMPS commands, concepts, " +
    "and usage patterns. Use this when you need to answer questions about LAMMPS " +
    "molecular dynamics simulation software.",
  inputSchema: {
    type: "object" as const,
    properties: {
      query: {
        type: "string",
        description:
          "Natural language search query about LAMMPS. Examples: " +
          "'how to set up NVT ensemble', 'pair_style lj/cut parameters', " +
          "'fix langevin thermostat usage'",
      },
      top_k: {
        type: "number",
        description: "Number of results to return (default: 5, max: 20)",
        default: 5,
      },
      category: {
        type: "string",
        description:
          "Optional: filter by category (e.g., 'fix', 'pair_style', 'compute', 'general')",
      },
    },
    required: ["query"],
  },
};

export function handleSearch(
  store: VectorStore,
  args: { query: string; top_k?: number; category?: string }
): { content: { type: "text"; text: string }[] } {
  const topK = Math.min(args.top_k ?? 5, 20);

  try {
    const results = store.search(args.query, topK, {
      category: args.category,
    });

    if (results.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No results found for query: "${args.query}". Try broadening your search terms or removing category filters.`,
          },
        ],
      };
    }

    const formatted = formatResults(results, args.query);
    return {
      content: [{ type: "text", text: formatted }],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Search error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
    };
  }
}

function formatResults(results: SearchResult[], query: string): string {
  const lines: string[] = [
    `## LAMMPS Documentation Search Results`,
    `**Query:** ${query}`,
    `**Results:** ${results.length}\n`,
  ];

  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    lines.push(`### ${i + 1}. ${r.chunk.headingPath.join(" > ")}`);
    lines.push(`- **Source:** ${r.chunk.source}`);
    lines.push(`- **Category:** ${r.chunk.category}`);
    if (r.chunk.commands.length > 0) {
      lines.push(`- **Commands:** ${r.chunk.commands.join(", ")}`);
    }
    if (r.chunk.tags.length > 0) {
      lines.push(`- **Tags:** ${r.chunk.tags.join(", ")}`);
    }
    lines.push(`- **Relevance:** ${(r.score * 100).toFixed(1)}% (${r.matchType})`);
    lines.push("");
    lines.push(r.chunk.content);
    lines.push("\n---\n");
  }

  return lines.join("\n");
}
