/**
 * Markdown Chunker for LAMMPS knowledge base
 * Splits markdown documents into semantically meaningful chunks
 * based on heading hierarchy, preserving frontmatter metadata as context.
 */

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface Chunk {
  /** Unique chunk ID: filename#heading-slug */
  id: string;
  /** Source file path (relative to knowledge dir) */
  source: string;
  /** Document title from frontmatter */
  docTitle: string;
  /** Tags from frontmatter */
  tags: string[];
  /** Commands covered (from frontmatter) */
  commands: string[];
  /** Category from frontmatter */
  category: string;
  /** Heading path, e.g. ["Fix Commands", "fix nvt"] */
  headingPath: string[];
  /** The actual text content of this chunk */
  content: string;
  /** Approximate token count */
  tokenEstimate: number;
}

interface HeadingNode {
  level: number;
  title: string;
  startLine: number;
}

const MAX_CHUNK_TOKENS = 1500;
const MIN_CHUNK_TOKENS = 100;

/**
 * Estimate token count (rough: 1 token ≈ 4 chars for English, ≈ 2 chars for CJK)
 */
function estimateTokens(text: string): number {
  const cjkChars = (text.match(/[\u4e00-\u9fff\u3000-\u303f]/g) || []).length;
  const otherChars = text.length - cjkChars;
  return Math.ceil(cjkChars / 2 + otherChars / 4);
}

/**
 * Create a URL-safe slug from heading text
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Parse a single markdown file into chunks
 */
export function chunkMarkdown(
  filePath: string,
  rawContent: string
): Chunk[] {
  const { data: frontmatter, content } = matter(rawContent);
  const lines = content.split("\n");
  const fileName = path.basename(filePath, ".md");

  const docTitle = (frontmatter.title as string) || fileName;
  const tags: string[] = (frontmatter.tags as string[]) || [];
  const commands: string[] = (frontmatter.commands as string[]) || [];
  const category: string = (frontmatter.category as string) || "general";

  // Find all headings and their positions
  const headings: HeadingNode[] = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^(#{1,4})\s+(.+)/);
    if (match) {
      headings.push({
        level: match[1].length,
        title: match[2].trim(),
        startLine: i,
      });
    }
  }

  // If no headings found, return entire file as one chunk
  if (headings.length === 0) {
    const text = content.trim();
    if (!text) return [];
    return [
      {
        id: `${fileName}#full`,
        source: path.basename(filePath),
        docTitle,
        tags,
        commands,
        category,
        headingPath: [docTitle],
        content: text,
        tokenEstimate: estimateTokens(text),
      },
    ];
  }

  const chunks: Chunk[] = [];

  // Content before the first heading
  if (headings[0].startLine > 0) {
    const preContent = lines.slice(0, headings[0].startLine).join("\n").trim();
    if (preContent && estimateTokens(preContent) >= MIN_CHUNK_TOKENS) {
      chunks.push({
        id: `${fileName}#intro`,
        source: path.basename(filePath),
        docTitle,
        tags,
        commands,
        category,
        headingPath: [docTitle, "Introduction"],
        content: preContent,
        tokenEstimate: estimateTokens(preContent),
      });
    }
  }

  // Build heading path stack for nested headings
  const headingStack: { level: number; title: string }[] = [];

  for (let hi = 0; hi < headings.length; hi++) {
    const heading = headings[hi];
    const endLine =
      hi + 1 < headings.length ? headings[hi + 1].startLine : lines.length;
    const sectionLines = lines.slice(heading.startLine, endLine);
    let sectionText = sectionLines.join("\n").trim();

    // Update heading path stack
    while (
      headingStack.length > 0 &&
      headingStack[headingStack.length - 1].level >= heading.level
    ) {
      headingStack.pop();
    }
    headingStack.push({ level: heading.level, title: heading.title });
    const headingPath = headingStack.map((h) => h.title);

    const tokens = estimateTokens(sectionText);

    if (tokens < MIN_CHUNK_TOKENS && hi + 1 < headings.length) {
      // Too small — will be merged with next section if possible
      // For now, still create the chunk (better to have small chunks than lose content)
    }

    if (tokens > MAX_CHUNK_TOKENS) {
      // Split large sections by paragraphs
      const paragraphs = sectionText.split(/\n\n+/);
      let currentChunkParts: string[] = [];
      let currentTokens = 0;
      let partIndex = 0;

      for (const para of paragraphs) {
        const paraTokens = estimateTokens(para);
        if (
          currentTokens + paraTokens > MAX_CHUNK_TOKENS &&
          currentChunkParts.length > 0
        ) {
          // Emit current chunk
          const chunkContent = currentChunkParts.join("\n\n");
          chunks.push({
            id: `${fileName}#${slugify(heading.title)}-p${partIndex}`,
            source: path.basename(filePath),
            docTitle,
            tags,
            commands,
            category,
            headingPath,
            content: chunkContent,
            tokenEstimate: estimateTokens(chunkContent),
          });
          partIndex++;
          currentChunkParts = [];
          currentTokens = 0;
        }
        currentChunkParts.push(para);
        currentTokens += paraTokens;
      }

      // Remaining content
      if (currentChunkParts.length > 0) {
        const chunkContent = currentChunkParts.join("\n\n");
        chunks.push({
          id: `${fileName}#${slugify(heading.title)}-p${partIndex}`,
          source: path.basename(filePath),
          docTitle,
          tags,
          commands,
          category,
          headingPath,
          content: chunkContent,
          tokenEstimate: estimateTokens(chunkContent),
        });
      }
    } else {
      chunks.push({
        id: `${fileName}#${slugify(heading.title)}`,
        source: path.basename(filePath),
        docTitle,
        tags,
        commands,
        category,
        headingPath,
        content: sectionText,
        tokenEstimate: estimateTokens(sectionText),
      });
    }
  }

  return chunks;
}

/**
 * Load and chunk all markdown files from the knowledge directory
 */
export async function chunkAllFiles(
  knowledgeDir: string
): Promise<Chunk[]> {
  const files = await fs.readdir(knowledgeDir);
  const mdFiles = files
    .filter((f) => f.endsWith(".md"))
    .sort();

  const allChunks: Chunk[] = [];

  for (const file of mdFiles) {
    const filePath = path.join(knowledgeDir, file);
    const content = await fs.readFile(filePath, "utf-8");
    const chunks = chunkMarkdown(filePath, content);
    allChunks.push(...chunks);
  }

  console.log(
    `Chunked ${mdFiles.length} files into ${allChunks.length} chunks`
  );
  return allChunks;
}
