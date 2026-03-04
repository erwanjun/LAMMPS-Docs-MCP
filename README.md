# LAMMPS MCP Server

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that provides RAG-based search over LAMMPS molecular dynamics documentation. Enables large language models (LLMs) to search and retrieve LAMMPS commands, usage patterns, and concepts.

## Features

- **Semantic Search** — Natural language queries across the entire LAMMPS knowledge base
- **Hybrid Retrieval** — Combines vector similarity with keyword matching for precise results
- **Command Lookup** — Exact LAMMPS command name lookup (e.g., `fix nvt`, `pair_style lj/cut`)
- **Zero-cost** — Uses local embedding model (`all-MiniLM-L6-v2`), no API keys needed
- **Offline capable** — Runs entirely locally after initial model download
- **Pre-built index** — Included in the repo, no indexing step needed to get started

## MCP Tools

| Tool | Description |
|------|-------------|
| `search_lammps_docs` | Semantic + keyword hybrid search across the knowledge base |
| `lookup_command` | Look up documentation for a specific LAMMPS command by name |
| `list_commands` | List all documented LAMMPS commands, optionally filtered by category |
| `get_example` | Get usage examples for a specific command |

## Quick Start

### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/lammps-mcp-server.git
cd lammps-mcp-server
npm install
npm run build
```

### Build the Vector Index

If the pre-built index is not included or you've updated the knowledge base:

```bash
npm run index
```

This will:
1. Read all markdown files from `knowledge/`
2. Split them into semantic chunks
3. Generate embeddings using a local model (first run downloads ~30MB model)
4. Save the vector index to `data/vector_index.json`

### Run the Server

```bash
npm start
```

## Client Configuration

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "lammps": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/lammps-mcp-server/dist/index.js"]
    }
  }
}
```

**Config file locations:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### VS Code (GitHub Copilot)

Add to your workspace `.vscode/mcp.json`:

```json
{
  "servers": {
    "lammps": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/lammps-mcp-server/dist/index.js"]
    }
  }
}
```

### Cursor

Add to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "lammps": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/lammps-mcp-server/dist/index.js"]
    }
  }
}
```

## Development

```bash
# Run in development mode (with tsx, no build needed)
npm run dev

# Test with MCP Inspector
npm run inspect

# Rebuild index after updating knowledge base
npm run index
```

## Knowledge Base Structure

The `knowledge/` directory contains markdown files with YAML frontmatter:

```yaml
---
title: "Fix Langevin Thermostat"
description: "fix langevin thermostat including Drude oscillator and eff variants"
category: "fix"
tags: ["thermostat", "langevin", "temperature-control", "Drude"]
commands: ["fix langevin", "fix langevin/drude", "fix langevin/eff"]
---
```

### Categories

| Category | Description |
|----------|-------------|
| `general` | Introduction, installation, error messages |
| `command` | General LAMMPS commands (mass, set, dump_modify, etc.) |
| `fix` | Fix commands (thermostat, barostat, constraints, etc.) |
| `compute` | Compute commands (kinetic energy, MSD, etc.) |
| `pair_style` | Pair potentials (LJ, EAM, granular, ML potentials, etc.) |
| `bond_style` | Bond potentials (FENE, harmonic, etc.) |
| `howto` | Theory and tutorials |
| `developer` | Code architecture and API documentation |

## Adding New Documentation

1. Create a new `.md` file in `knowledge/`
2. Add YAML frontmatter with `title`, `description`, `category`, `tags`, `commands`
3. Rebuild the index: `npm run index`

## Architecture

```
lammps-mcp-server/
├── src/
│   ├── index.ts              # MCP server entry point
│   ├── tools/
│   │   ├── search.ts         # Semantic search tool
│   │   └── lookup.ts         # Command lookup tools
│   ├── indexer/
│   │   ├── chunker.ts        # Markdown → chunks splitter
│   │   ├── embedder.ts       # Local embedding model
│   │   └── buildIndex.ts     # Index builder script
│   └── store/
│       └── vectorStore.ts    # Vector similarity search
├── knowledge/                 # LAMMPS documentation (markdown)
├── data/                      # Pre-computed vector index
├── package.json
└── tsconfig.json
```

## License

MIT

## Acknowledgments

- Documentation sourced from [LAMMPS](https://www.lammps.org/) (GPL-2.0)
- MCP SDK by [Anthropic](https://github.com/modelcontextprotocol)
- Embedding model: [all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) by sentence-transformers
