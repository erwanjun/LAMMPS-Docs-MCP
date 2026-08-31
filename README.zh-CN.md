# LAMMPS-Docs-MCP

[English](README.md) | [中文](README.zh-CN.md)

一个基于 [Model Context Protocol (MCP)](https://modelcontextprotocol.io) 的服务器，为 [LAMMPS](https://www.lammps.org/) 分子动力学文档提供 RAG 检索增强搜索。让大语言模型（LLM）能够搜索、查询和引用 LAMMPS 命令、用法模式和最佳实践，帮助你编写、调试和理解 LAMMPS 输入脚本。

## 功能特性

- **混合搜索** — TF-IDF + 关键词匹配，精准检索文档
- **命令查找** — 精确查找 LAMMPS 命令（如 `fix nvt`、`pair_style lj/cut`）
- **命令浏览** — 按分类列出所有已索引的命令
- **用法示例** — 获取任意已记录命令的使用示例
- **提示模板** — 内置编写脚本、调试、命令解释、势函数查找等预设提示
- **零依赖** — 纯 JavaScript TF-IDF 实现，无需外部模型或 API 密钥
- **离线运行** — 使用预构建索引，完全本地运行
- **1230 篇文档** — 全面覆盖 LAMMPS 命令、fix、compute、pair style 等

## MCP 工具

| 工具 | 描述 |
|------|------|
| `search_lammps_docs` | TF-IDF + 关键词混合搜索知识库 |
| `lookup_command` | 按名称查找特定 LAMMPS 命令的文档 |
| `list_commands` | 列出所有已记录的 LAMMPS 命令，可按分类筛选 |
| `get_example` | 获取特定命令的使用示例 |

## MCP 提示模板

| 模板 | 描述 |
|------|------|
| `write_lammps_script` | 为给定的模拟任务生成完整的 LAMMPS 输入脚本 |
| `explain_command` | 获取任意 LAMMPS 命令的详细解释 |
| `debug_lammps_script` | 分析脚本中的问题，检测常见错误模式 |
| `find_potential` | 为给定的材料体系找到最佳 pair_style |

## 安装

### 方式一：从 npm 安装（推荐）

```bash
npm install -g lammps-docs-mcp
```

安装后可直接运行：

```bash
lammps-docs-mcp
```

或使用 `npx` 免安装运行：

```bash
npx lammps-docs-mcp
```

> **提示**：中国大陆用户如遇网络问题，可使用淘宝镜像：
> ```bash
> npm install -g lammps-docs-mcp --registry=https://registry.npmmirror.com
> ```

### 方式二：从源码构建

```bash
git clone https://github.com/erwanjun/LAMMPS-Docs-MCP.git
cd LAMMPS-Docs-MCP
npm install
npm run build
```

## 客户端配置

### Claude Desktop

在 `claude_desktop_config.json` 中添加：

**如果通过 npm 全局安装：**
```json
{
  "mcpServers": {
    "lammps": {
      "command": "lammps-docs-mcp"
    }
  }
}
```

**如果从源码构建：**
```json
{
  "mcpServers": {
    "lammps": {
      "command": "node",
      "args": ["/你的绝对路径/LAMMPS-Docs-MCP/dist/index.js"]
    }
  }
}
```

配置文件位置：
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

### VS Code (GitHub Copilot)

在工作区的 `.vscode/mcp.json` 中添加：

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

或从源码构建的方式：

```json
{
  "servers": {
    "lammps": {
      "command": "node",
      "args": ["/你的绝对路径/LAMMPS-Docs-MCP/dist/index.js"]
    }
  }
}
```

### Cursor

在 Cursor MCP 设置中添加：

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

## 开发

```bash
# 安装依赖
npm install

# 开发模式运行（无需构建）
npm run dev

# 构建 TypeScript
npm run build

# 使用 MCP Inspector 测试
npm run inspect

# 更新知识库后重建 TF-IDF 索引
npm run index

# 完整重建：获取文档 → 处理 → 索引
npm run rebuild-kb
```

## 知识库

`knowledge/` 目录包含 1230 个 Markdown 文件，涵盖 LAMMPS 文档。每个文件都有 YAML 前置元数据：

```yaml
---
title: "Fix Langevin Thermostat"
description: "fix langevin thermostat including Drude oscillator and eff variants"
category: "fix"
tags: ["thermostat", "langevin", "temperature-control"]
commands: ["fix langevin", "fix langevin/drude", "fix langevin/eff"]
---
```

### 分类

| 分类 | 描述 |
|------|------|
| `general` | 简介、安装、错误信息 |
| `command` | 通用命令（mass、set、dump_modify 等） |
| `fix` | Fix 命令（恒温器、恒压器、约束等） |
| `compute` | Compute 命令（能量、RDF、MSD 等） |
| `pair_style` | 对势（LJ、EAM、ReaxFF、机器学习势等） |
| `bond_style` | 键势（FENE、harmonic 等） |
| `howto` | 教程与理论 |
| `developer` | 代码架构与 API 文档 |

### 更新知识库

从最新的 LAMMPS 文档刷新：

```bash
# 从 LAMMPS GitHub 仓库获取 RST 文档
npm run fetch-docs

# 将 RST 转换为带前置元数据的 Markdown
npm run process-docs

# 重建 TF-IDF 索引
npm run index

# 或一步完成：
npm run rebuild-kb
```

## 架构

```
LAMMPS-Docs-MCP/
├── src/
│   ├── index.ts              # MCP 服务器入口
│   ├── tools/
│   │   ├── search.ts         # TF-IDF + 关键词混合搜索
│   │   └── lookup.ts         # 命令查找工具
│   ├── indexer/
│   │   ├── chunker.ts        # Markdown → 分块
│   │   ├── embedder.ts       # TF-IDF 向量化器
│   │   └── buildIndex.ts     # 索引构建脚本
│   └── store/
│       └── vectorStore.ts    # TF-IDF 搜索引擎
├── knowledge/                 # 1230 篇 LAMMPS 文档（Markdown）
├── data/
│   └── tfidf_index.json      # 预构建的 TF-IDF 索引
├── scripts/
│   ├── fetch-lammps-docs.sh  # 从 LAMMPS 仓库获取 RST 文档
│   ├── fetch-lammps-docs-api.ts  # 备选：通过 GitHub API 获取
│   ├── process-docs.ts       # RST → Markdown 转换器
│   └── rst-converter.ts      # 自定义 RST 解析器
├── eval/                      # 检索评测：100 条标注查询 + 评测框架
├── package.json
├── tsconfig.json
└── LICENSE
```

## 工作原理

1. **文档管线**：LAMMPS RST 文档 → 带前置元数据的 Markdown → 按标题分块 → TF-IDF 索引
2. **搜索**：查询被分词后与 TF-IDF 索引匹配（60% 权重）+ 关键词匹配（40% 权重），混合评分
3. **MCP 协议**：服务器通过 [Model Context Protocol](https://modelcontextprotocol.io) 以 stdio 方式暴露工具、资源和提示模板

## 检索质量评测

检索效果通过 [`eval/`](eval/README.md) 中的标注基准集衡量：100 条真实 LAMMPS 查询，每条标注了能回答它的文档页面。

| 方案 | Recall@1 | Recall@5 | MRR | 平均延迟 |
|---|---|---|---|---|
| 纯关键词 | 11.0% | 54.0% | 0.274 | 58 ms |
| 纯 TF-IDF | 49.0% | 77.0% | 0.615 | 24 ms |
| **混合 60/40（当前方案）** | **49.0%** | **87.0%** | **0.636** | **80 ms** |
| Qdrant 稀疏检索 + 本地重排 | 49.0% | 88.0% | 0.639 | 3 ms |

关键词信号并没有提升首位命中率，但它把 Recall@5 拉高了 10 个百分点——它救回的是 TF-IDF 排在
6~15 位的页面，而这一区间恰好决定了 `top_k: 5` 的客户端能否看到正确文档。权重扫描证实 60/40
这个切分点位于一段平坦的最优区间内。可选的 [Qdrant](https://qdrant.tech) 后端能从向量数据库
复现同样的排序结果——只有当知识库规模超出线性扫描的承受范围时才需要它。

```bash
npm run eval            # 纯关键词 vs 纯 TF-IDF vs 60/40 混合
npm run eval:sweep      # + 扫描混合权重
npm run eval:qdrant-up  # 启动本地 Qdrant，然后：
npm run eval:qdrant     # + 可选的向量数据库后端
```

完整方法论、分类指标拆解与已知失败模式见 [`eval/README.md`](eval/README.md)。

## 许可证

MIT — 见 [LICENSE](LICENSE)

## 致谢

- 文档来源于 [LAMMPS](https://www.lammps.org/)（GPL-2.0）
- MCP SDK 由 [Anthropic](https://github.com/modelcontextprotocol) 提供
