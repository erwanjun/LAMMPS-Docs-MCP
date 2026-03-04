/**
 * MCP Tool: lookup_command
 * Exact command name lookup in the LAMMPS knowledge base
 */

import type { VectorStore } from "../store/vectorStore.js";
import type { Chunk } from "../indexer/chunker.js";

export const lookupToolDefinition = {
  name: "lookup_command",
  description:
    "Look up documentation for a specific LAMMPS command by name. " +
    "Returns the full documentation for the matching command. " +
    "Use this when you know the exact command name (e.g., 'fix nvt', 'pair_style lj/cut', 'dump_modify').",
  inputSchema: {
    type: "object" as const,
    properties: {
      command: {
        type: "string",
        description:
          "The exact LAMMPS command name to look up. Examples: 'fix nvt', 'pair_style lj/cut', 'compute msd', 'read_data'",
      },
    },
    required: ["command"],
  },
};

export const listCommandsToolDefinition = {
  name: "list_commands",
  description:
    "List all LAMMPS commands available in the knowledge base, grouped by category. " +
    "Use this to discover what commands are documented.",
  inputSchema: {
    type: "object" as const,
    properties: {
      category: {
        type: "string",
        description:
          "Optional: filter by category (e.g., 'fix', 'pair_style', 'compute', 'bond_style', 'general')",
      },
    },
  },
};

export const getExampleToolDefinition = {
  name: "get_example",
  description:
    "Get usage examples for a specific LAMMPS command. " +
    "Returns code examples showing how to use the command in a LAMMPS input script.",
  inputSchema: {
    type: "object" as const,
    properties: {
      command: {
        type: "string",
        description: "The LAMMPS command to get examples for",
      },
    },
    required: ["command"],
  },
};

export function handleLookup(
  store: VectorStore,
  args: { command: string }
): { content: { type: "text"; text: string }[] } {
  try {
    const chunks = store.lookupCommand(args.command);

    if (chunks.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `Command "${args.command}" not found in the knowledge base. Use list_commands to see available commands, or try search_lammps_docs for a broader search.`,
          },
        ],
      };
    }

    const formatted = formatCommandDocs(chunks, args.command);
    return {
      content: [{ type: "text", text: formatted }],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Lookup error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
    };
  }
}

export function handleListCommands(
  store: VectorStore,
  args: { category?: string }
): { content: { type: "text"; text: string }[] } {
  try {
    let commands = store.listCommands();

    if (args.category) {
      commands = commands.filter(
        (c) => c.category.toLowerCase() === args.category!.toLowerCase()
      );
    }

    if (commands.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: args.category
              ? `No commands found in category "${args.category}". Available categories: ${store.listCategories().join(", ")}`
              : "No commands indexed. Run `npm run index` to build the index.",
          },
        ],
      };
    }

    // Group by category
    const grouped: Record<string, string[]> = {};
    for (const cmd of commands) {
      if (!grouped[cmd.category]) grouped[cmd.category] = [];
      grouped[cmd.category].push(cmd.command);
    }

    const lines: string[] = ["## LAMMPS Commands in Knowledge Base\n"];
    for (const [cat, cmds] of Object.entries(grouped).sort()) {
      lines.push(`### ${cat}`);
      lines.push(cmds.map((c) => `- ${c}`).join("\n"));
      lines.push("");
    }
    lines.push(`\n**Total:** ${commands.length} commands`);

    return {
      content: [{ type: "text", text: lines.join("\n") }],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
    };
  }
}

export function handleGetExample(
  store: VectorStore,
  args: { command: string }
): { content: { type: "text"; text: string }[] } {
  try {
    const chunks = store.lookupCommand(args.command);

    // Find chunks containing code examples
    const exampleChunks = chunks.filter(
      (c) =>
        c.content.includes("```") ||
        c.content.toLowerCase().includes("example") ||
        c.headingPath.some((h) => h.toLowerCase().includes("example"))
    );

    const target = exampleChunks.length > 0 ? exampleChunks : chunks.slice(0, 2);

    if (target.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No examples found for "${args.command}". The command may not be in the knowledge base.`,
          },
        ],
      };
    }

    const lines: string[] = [`## Examples: ${args.command}\n`];
    for (const chunk of target) {
      lines.push(`### From: ${chunk.headingPath.join(" > ")}`);
      lines.push(chunk.content);
      lines.push("\n---\n");
    }

    return {
      content: [{ type: "text", text: lines.join("\n") }],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
    };
  }
}

function formatCommandDocs(chunks: Chunk[], command: string): string {
  const lines: string[] = [
    `## LAMMPS Command: ${command}\n`,
    `**Found in ${chunks.length} section(s)**\n`,
  ];

  for (const chunk of chunks) {
    lines.push(`### ${chunk.headingPath.join(" > ")}`);
    lines.push(`- **Source:** ${chunk.source}`);
    if (chunk.tags.length > 0) {
      lines.push(`- **Tags:** ${chunk.tags.join(", ")}`);
    }
    lines.push("");
    lines.push(chunk.content);
    lines.push("\n---\n");
  }

  return lines.join("\n");
}
