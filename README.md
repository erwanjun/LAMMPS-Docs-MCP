# LAMMPS-Docs-MCP

[English](README.md) | [中文](README.zh-CN.md)

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that provides RAG-based search over [LAMMPS](https://www.lammps.org/) molecular dynamics documentation. Enables LLMs to search, retrieve, and reference LAMMPS commands, usage patterns, and best practices — helping you write, debug, and understand LAMMPS input scripts.

## Features

- **Hybrid Search** — TF-IDF + keyword matching for precise document retrieval
- **Command Lookup** — Exact LAMMPS command lookup (e.g., `fix nvt`, `pair_style lj/cut`)
- **Command Browser** — List all indexed commands, filtered by category
- **Usage Examples** — Retrieve examples for any documented command
- **Prompt Templates** — Pre-built prompts for writing scripts, debugging, explaining commands, and finding potentials
- **Zero Dependencies** — Pure JavaScript TF-IDF, no external models or API keys needed
- **Offline Capable** — Runs entirely locally with a pre-built index
- **1230 Documents** — Comprehensive coverage of LAMMPS commands, fixes, computes, pair styles, and more

## MCP Tools

| Tool | Description |
|------|-------------|
| `search_lammps_docs` | TF-IDF + keyword hybrid search across the knowledge base |
| `lookup_command` | Look up documentation for a specific LAMMPS command by name |
| `list_commands` | List all documented LAMMPS commands, optionally filtered by category |
| `get_example` | Get usage examples for a specific command |

## MCP Prompts

| Prompt | Description |
|--------|-------------|
| `write_lammps_script` | Generate a complete LAMMPS input script for a given simulation task |
| `explain_command` | Get a detailed explanation of any LAMMPS command |
| `debug_lammps_script` | Analyze a script for issues, with common error pattern detection |
| `find_potential` | Find the best pair_style for a given material system |

## Installation

### Option 1: Install from npm (recommended)

```bash
npm install -g lammps-docs-mcp
```

After installation, you can run it directly:

```bash
lammps-docs-mcp
```

Or use `npx` without installing:

```bash
npx lammps-docs-mcp
```

### Option 2: Build from source

```bash
git clone https://github.com/erwanjun/LAMMPS-Docs-MCP.git
cd LAMMPS-Docs-MCP
npm install
npm run build
```

## Client Configuration

### Claude Desktop

Add to your `claude_desktop_config.json`:

**If installed globally (npm):**
```json
{
  "mcpServers": {
    "lammps": {
      "command": "lammps-docs-mcp"
    }
  }
}
```

**If built from source:**
```json
{
  "mcpServers": {
    "lammps": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/LAMMPS-Docs-MCP/dist/index.js"]
    }
  }
}
```

Config file locations:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

### VS Code (GitHub Copilot)

Add to your workspace `.vscode/mcp.json`:

```json
{
  "servers": {
    "lammps": {
      "command": "npx",
      "args": ["lammps-docs-mcp"]
    }
  }
}
```

Or if built from source:

```json
{
  "servers": {
    "lammps": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/LAMMPS-Docs-MCP/dist/index.js"]
    }
  }
}
```

### Cursor

Add to Cursor MCP settings:

```json
{
  "mcpServers": {
    "lammps": {
      "command": "npx",
      "args": ["lammps-docs-mcp"]
    }
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode (no build needed)
npm run dev

# Build TypeScript
npm run build

# Test with MCP Inspector
npm run inspect

# Rebuild TF-IDF index after updating knowledge base
npm run index

# Full rebuild: fetch docs → process → index
npm run rebuild-kb
```

## Knowledge Base

The `knowledge/` directory contains 1230 Markdown files covering the LAMMPS documentation. Each file has YAML frontmatter:

```yaml
---
title: "Fix Langevin Thermostat"
description: "fix langevin thermostat including Drude oscillator and eff variants"
category: "fix"
tags: ["thermostat", "langevin", "temperature-control"]
commands: ["fix langevin", "fix langevin/drude", "fix langevin/eff"]
---
```

### Categories

| Category | Description |
|----------|-------------|
| `general` | Introduction, installation, error messages |
| `command` | General commands (mass, set, dump_modify, etc.) |
| `fix` | Fix commands (thermostats, barostats, constraints) |
| `compute` | Compute commands (energy, RDF, MSD, etc.) |
| `pair_style` | Pair potentials (LJ, EAM, ReaxFF, ML potentials) |
| `bond_style` | Bond potentials (FENE, harmonic, etc.) |
| `howto` | Tutorials and theory |
| `developer` | Code architecture and API documentation |

### Updating the Knowledge Base

To refresh from the latest LAMMPS documentation:

```bash
# Fetch RST docs from LAMMPS GitHub repo
npm run fetch-docs

# Convert RST → Markdown with frontmatter
npm run process-docs

# Rebuild the TF-IDF index
npm run index

# Or do all three in one step:
npm run rebuild-kb
```

## Architecture

```
LAMMPS-Docs-MCP/
├── src/
│   ├── index.ts              # MCP server entry point
│   ├── tools/
│   │   ├── search.ts         # TF-IDF + keyword hybrid search
│   │   └── lookup.ts         # Command lookup tools
│   ├── indexer/
│   │   ├── chunker.ts        # Markdown → chunks splitter
│   │   ├── embedder.ts       # TF-IDF vectorizer
│   │   └── buildIndex.ts     # Index builder script
│   └── store/
│       └── vectorStore.ts    # TF-IDF search engine
├── knowledge/                 # 1230 LAMMPS documentation files (Markdown)
├── data/
│   └── tfidf_index.json      # Pre-computed TF-IDF index
├── scripts/
│   ├── fetch-lammps-docs.sh  # Fetch RST docs from LAMMPS repo
│   ├── fetch-lammps-docs-api.ts  # Alternative: fetch via GitHub API
│   ├── process-docs.ts       # RST → Markdown converter
│   └── rst-converter.ts      # Custom RST parser
├── eval/                      # Retrieval benchmark: 100 labeled queries + harness
├── package.json
├── tsconfig.json
└── LICENSE
```

## How It Works

1. **Documentation Pipeline**: LAMMPS RST docs → Markdown with frontmatter → chunked by headings → TF-IDF indexed
2. **Search**: Queries are tokenized and matched against the TF-IDF index (60% weight) + keyword matching (40% weight) for hybrid scoring
3. **MCP Protocol**: The server exposes tools, resources, and prompt templates via the [Model Context Protocol](https://modelcontextprotocol.io) over stdio

## Retrieval Quality

Search quality is measured against a labeled benchmark of 100 real LAMMPS queries in
[`eval/`](eval/README.md), each annotated with the documentation page that answers it.

| method | Recall@1 | Recall@5 | MRR | mean latency |
|---|---|---|---|---|
| keyword only | 11.0% | 54.0% | 0.274 | 58 ms |
| TF-IDF only | 49.0% | 77.0% | 0.615 | 24 ms |
| **hybrid 60/40 (shipping)** | **49.0%** | **87.0%** | **0.636** | **80 ms** |
| Qdrant sparse + local rerank | 49.0% | 88.0% | 0.639 | 3 ms |

The keyword signal does not improve the top result, but it lifts Recall@5 by 10 points by
rescuing pages TF-IDF ranks 6th–15th — the band that decides whether a client calling with
`top_k: 5` sees the right page. An alpha sweep confirms the 60/40 split sits on a flat
optimum. An optional [Qdrant](https://qdrant.tech) backend reproduces the same ranking
from a vector database, which matters only if the knowledge base outgrows a linear scan.

```bash
npm run eval            # keyword vs TF-IDF vs the 60/40 hybrid
npm run eval:sweep      # + sweep the blend weight
npm run eval:qdrant-up  # start a local Qdrant, then:
npm run eval:qdrant     # + the optional vector-database backend
```

Full methodology, per-slice breakdowns, and known failure modes: [`eval/README.md`](eval/README.md).

## License

MIT — see [LICENSE](LICENSE)

## Acknowledgments

- Documentation sourced from [LAMMPS](https://www.lammps.org/) (GPL-2.0)
- MCP SDK by [Anthropic](https://github.com/modelcontextprotocol)
