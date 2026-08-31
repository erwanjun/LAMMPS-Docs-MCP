/**
 * RST (reStructuredText) to Markdown converter
 * Tailored for LAMMPS documentation RST files.
 *
 * Handles common RST/Sphinx constructs:
 *   - Title underlines (=, -, ~, ^, ")
 *   - Code blocks (.. code-block::, parsed-literal::)
 *   - Directives (note, warning, versionadded, etc.)
 *   - Inline markup (:math:, :doc:, :ref:, ``code``)
 *   - Math blocks (.. math::)
 *   - Images (.. image::)
 *   - Tables (simple and grid)
 *   - Lists (bullet and enumerated)
 *   - Field lists
 */

/**
 * Convert a single RST document to Markdown
 */
export function rstToMarkdown(rst: string): string {
  let md = rst;

  // Normalize line endings
  md = md.replace(/\r\n/g, "\n");

  // Remove RST index directives
  md = md.replace(/^\.\. index::.*\n(?:[ \t]+.*\n)*/gm, "");

  // Process directive blocks before other transformations
  md = processDirectives(md);

  // Convert RST title underlines to Markdown headings
  md = convertHeadings(md);

  // Convert inline markup
  md = convertInlineMarkup(md);

  // Clean up residual RST artifacts
  md = cleanupRst(md);

  // Normalize excessive blank lines
  md = md.replace(/\n{4,}/g, "\n\n\n");

  return md.trim() + "\n";
}

/**
 * Extract the title from an RST document
 */
export function extractRstTitle(rst: string): string | null {
  const lines = rst.split("\n");
  for (let i = 0; i < Math.min(lines.length - 1, 20); i++) {
    const line = lines[i].trim();
    const nextLine = (lines[i + 1] || "").trim();
    if (
      line.length > 0 &&
      nextLine.length >= line.length &&
      /^[=\-~^"]+$/.test(nextLine)
    ) {
      // Check if there's an overline (line before is also underline chars)
      if (i > 0) {
        const prevLine = (lines[i - 1] || "").trim();
        if (/^[=\-~^"*#]+$/.test(prevLine) && prevLine.length >= line.length) {
          return line;
        }
      }
      return line;
    }
  }
  return null;
}

const UNDERLINE_CHARS = ["=", "-", "~", "^", '"', "*", "#"];

/** A line made up entirely of RST underline characters carries no title text. */
const PUNCT_ONLY = /^[=\-~^"*#]+$/;

/** Opening or closing line of a fenced code block, as emitted by processDirectives(). */
const FENCE = /^\s*```/;

function convertHeadings(md: string): string {
  const lines = md.split("\n");
  const result: string[] = [];
  const headingCharOrder: string[] = [];

  let i = 0;
  let inFence = false;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // processDirectives() runs first, so by this point the text already contains
    // fenced code blocks. Their contents are verbatim and must not be reinterpreted:
    // a LAMMPS input script is full of lines that look like RST underlines, and the
    // closing fence itself was being consumed as a title.
    if (FENCE.test(line)) {
      inFence = !inFence;
      result.push(line);
      i++;
      continue;
    }
    if (inFence) {
      result.push(line);
      i++;
      continue;
    }

    // Check for overline + title + underline pattern
    if (
      i + 2 < lines.length &&
      trimmed.length > 0 &&
      PUNCT_ONLY.test(trimmed) &&
      lines[i + 1].trim().length > 0 &&
      // The title itself must be real text. Three consecutive punctuation lines
      // (common in converted style-index pages) otherwise become "## *".
      !PUNCT_ONLY.test(lines[i + 1].trim()) &&
      lines[i + 2].trim().length > 0 &&
      PUNCT_ONLY.test(lines[i + 2].trim()) &&
      trimmed[0] === lines[i + 2].trim()[0]
    ) {
      const titleText = lines[i + 1].trim();
      const underlineChar = trimmed[0];
      const level = getHeadingLevel(underlineChar, headingCharOrder, true);
      result.push(`${"#".repeat(level)} ${titleText}`);
      i += 3;
      continue;
    }

    // Check for title + underline pattern
    if (
      i + 1 < lines.length &&
      trimmed.length > 0 &&
      !trimmed.startsWith("..") &&
      !trimmed.startsWith("#") &&
      !PUNCT_ONLY.test(trimmed)
    ) {
      const nextTrimmed = (lines[i + 1] || "").trim();
      if (
        nextTrimmed.length > 0 &&
        PUNCT_ONLY.test(nextTrimmed) &&
        nextTrimmed.length >= trimmed.length - 2
      ) {
        const underlineChar = nextTrimmed[0];
        const level = getHeadingLevel(underlineChar, headingCharOrder, false);
        result.push(`${"#".repeat(level)} ${trimmed}`);
        i += 2;
        continue;
      }
    }

    result.push(line);
    i++;
  }

  return result.join("\n");
}

function getHeadingLevel(
  char: string,
  charOrder: string[],
  hasOverline: boolean
): number {
  // Overline patterns are typically higher level
  const key = hasOverline ? `=${char}` : char;

  let idx = charOrder.indexOf(key);
  if (idx === -1) {
    charOrder.push(key);
    idx = charOrder.length - 1;
  }

  return Math.min(idx + 1, 6);
}

function processDirectives(md: string): string {
  const lines = md.split("\n");
  const result: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // code-block / parsed-literal / sourcecode
    const codeBlockMatch = trimmed.match(
      /^\.\.\s+(?:code-block|sourcecode|highlight)::\s*(.*)/
    );
    if (codeBlockMatch) {
      const lang = codeBlockMatch[1].trim().toLowerCase() || "";
      const langMap: Record<string, string> = {
        lammps: "lammps",
        python: "python",
        bash: "bash",
        c: "c",
        "c++": "cpp",
        cpp: "cpp",
        fortran: "fortran",
        console: "bash",
        "": "",
      };
      const mdLang = langMap[lang] || lang;
      result.push(`\`\`\`${mdLang}`);
      i++;
      // Skip blank line after directive
      if (i < lines.length && lines[i].trim() === "") i++;
      // Collect indented content
      const { contentLines, nextIndex } = collectIndentedBlock(lines, i);
      result.push(...contentLines);
      result.push("```");
      i = nextIndex;
      continue;
    }

    // parsed-literal
    if (trimmed.match(/^\.\.\s+parsed-literal::/)) {
      result.push("```");
      i++;
      if (i < lines.length && lines[i].trim() === "") i++;
      const { contentLines, nextIndex } = collectIndentedBlock(lines, i);
      result.push(...contentLines);
      result.push("```");
      i = nextIndex;
      continue;
    }

    // math block
    if (trimmed.match(/^\.\.\s+math::/)) {
      result.push("");
      result.push("$$");
      i++;
      if (i < lines.length && lines[i].trim() === "") i++;
      const { contentLines, nextIndex } = collectIndentedBlock(lines, i);
      result.push(...contentLines);
      result.push("$$");
      result.push("");
      i = nextIndex;
      continue;
    }

    // note, warning, important, tip, danger, caution, seealso, deprecated
    const admonitionMatch = trimmed.match(
      /^\.\.\s+(note|warning|important|tip|danger|caution|seealso|deprecated|admonition)::\s*(.*)/
    );
    if (admonitionMatch) {
      const aType = admonitionMatch[1];
      const title = admonitionMatch[2].trim();
      const label =
        aType === "seealso"
          ? "See Also"
          : aType.charAt(0).toUpperCase() + aType.slice(1);
      result.push("");
      result.push(
        `> **${label}${title ? ": " + title : ""}**`
      );
      i++;
      // Skip directive options (:class:, :name:, etc.)
      while (i < lines.length && /^\s+:\w+:/.test(lines[i])) i++;
      if (i < lines.length && lines[i].trim() === "") i++;
      const { contentLines, nextIndex } = collectIndentedBlock(lines, i);
      for (const cl of contentLines) {
        result.push(`> ${cl}`);
      }
      result.push("");
      i = nextIndex;
      continue;
    }

    // versionadded / versionchanged
    const versionMatch = trimmed.match(
      /^\.\.\s+(versionadded|versionchanged)::\s*(.*)/
    );
    if (versionMatch) {
      const vType =
        versionMatch[1] === "versionadded" ? "Added in" : "Changed in";
      result.push(`*${vType} version ${versionMatch[2].trim()}*`);
      i++;
      // Skip any description content
      if (i < lines.length && lines[i].trim() === "") i++;
      while (i < lines.length && /^\s{3,}/.test(lines[i]) && lines[i].trim() !== "") {
        i++;
      }
      continue;
    }

    // image
    const imageMatch = trimmed.match(/^\.\.\s+image::\s*(.*)/);
    if (imageMatch) {
      const imgPath = imageMatch[1].trim();
      result.push(`![${imgPath}](${imgPath})`);
      i++;
      // Skip image options
      while (i < lines.length && /^\s{3,}:/.test(lines[i])) {
        i++;
      }
      continue;
    }

    // figure
    const figureMatch = trimmed.match(/^\.\.\s+figure::\s*(.*)/);
    if (figureMatch) {
      const imgPath = figureMatch[1].trim();
      result.push(`![${imgPath}](${imgPath})`);
      i++;
      while (i < lines.length && /^\s{3,}/.test(lines[i])) {
        i++;
      }
      continue;
    }
    // list-table directive → Markdown table
    if (trimmed.match(/^\.\.\s+list-table::/)) {
      i++;
      // Skip directive options (:widths:, :header-rows:, etc.)
      while (i < lines.length && /^\s+:/.test(lines[i])) i++;
      if (i < lines.length && lines[i].trim() === "") i++;
      const { contentLines: ltLines, nextIndex: ltNext } = collectIndentedBlock(lines, i);
      const tableRows: string[][] = [];
      let curRow: string[] = [];
      let curCell = "";
      for (const cl of ltLines) {
        if (cl.trim() === "") continue;
        const rowStart = cl.match(/^\*\s+-\s+(.*)/);
        if (rowStart) {
          if (curCell || curRow.length > 0) {
            curRow.push(curCell.trim());
            tableRows.push(curRow);
          }
          curRow = [];
          curCell = rowStart[1];
          continue;
        }
        const cellStart = cl.match(/^\s+-\s+(.*)/);
        if (cellStart) {
          curRow.push(curCell.trim());
          curCell = cellStart[1];
          continue;
        }
        curCell += " " + cl.trim();
      }
      if (curCell || curRow.length > 0) {
        curRow.push(curCell.trim());
        tableRows.push(curRow);
      }
      if (tableRows.length > 0) {
        const numCols = Math.max(...tableRows.map(r => r.length));
        for (const row of tableRows) while (row.length < numCols) row.push("");
        result.push("");
        for (let r = 0; r < tableRows.length; r++) {
          result.push("| " + tableRows[r].join(" | ") + " |");
          if (r === 0) result.push("| " + tableRows[r].map(() => "---").join(" | ") + " |");
        }
        result.push("");
      }
      i = ltNext;
      continue;
    }

    // table_from_list — custom LAMMPS Sphinx directive, keep content
    if (trimmed.match(/^\.\.\s+table_from_list::/)) {
      i++;
      while (i < lines.length && /^\s+:/.test(lines[i])) i++;
      if (i < lines.length && lines[i].trim() === "") i++;
      const { contentLines: tflLines, nextIndex: tflNext } = collectIndentedBlock(lines, i);
      result.push(...tflLines);
      i = tflNext;
      continue;
    }
    // table directive
    const tableMatch = trimmed.match(/^\.\.\s+table::\s*(.*)/);
    if (tableMatch) {
      // Just skip the directive line and options, keep content
      i++;
      while (i < lines.length && /^\s{3,}:/.test(lines[i])) {
        i++;
      }
      continue;
    }

    // toctree - skip entirely
    if (trimmed.match(/^\.\.\s+toctree::/)) {
      i++;
      while (i < lines.length && (/^\s{3,}/.test(lines[i]) || lines[i].trim() === "")) {
        i++;
        if (
          i < lines.length &&
          lines[i].trim() !== "" &&
          !/^\s{3,}/.test(lines[i])
        ) {
          break;
        }
      }
      continue;
    }

    // container, only directives - recursively process nested directives
    if (trimmed.match(/^\.\.\s+(container|only)::/)) {
      i++;
      if (i < lines.length && lines[i].trim() === "") i++;
      const { contentLines, nextIndex } = collectIndentedBlock(lines, i);
      // Recursively process nested directives in the collected content
      const nested = processDirectives(contentLines.join("\n"));
      result.push(...nested.split("\n"));
      i = nextIndex;
      continue;
    }

    // raw directive - skip entirely (LaTeX/HTML content not useful for Markdown)
    if (trimmed.match(/^\.\.\s+raw::/)) {
      i++;
      if (i < lines.length && lines[i].trim() === "") i++;
      const { contentLines: rawLines, nextIndex: rawNext } = collectIndentedBlock(lines, i);
      i = rawNext;
      continue;
    }

    // Generic unknown directives - skip
    if (trimmed.match(/^\.\.\s+\S+::/)) {
      i++;
      // Skip options and content
      while (
        i < lines.length &&
        (/^\s{3,}/.test(lines[i]) || lines[i].trim() === "")
      ) {
        i++;
        if (
          i < lines.length &&
          lines[i].trim() !== "" &&
          !/^\s{3,}/.test(lines[i])
        )
          break;
      }
      continue;
    }

    // comments (.. without directive)
    if (/^\.\.\s*$/.test(trimmed) || /^\.\.\s+[^:]/.test(trimmed)) {
      // Check if it's a comment (not a directive)
      if (!trimmed.includes("::")) {
        i++;
        // Skip indented comment content
        while (i < lines.length && /^\s{3,}/.test(lines[i])) {
          i++;
        }
        continue;
      }
    }

    result.push(line);
    i++;
  }

  return result.join("\n");
}

/**
 * Collect an indented block of text (used for directive content)
 */
function collectIndentedBlock(
  lines: string[],
  startIndex: number
): { contentLines: string[]; nextIndex: number } {
  const contentLines: string[] = [];
  let i = startIndex;

  // Detect initial indent level
  let baseIndent = 0;
  if (i < lines.length) {
    const m = lines[i].match(/^(\s+)/);
    baseIndent = m ? m[1].length : 3;
  }

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      contentLines.push("");
      i++;
      continue;
    }
    const indent = line.match(/^(\s*)/)?.[1].length || 0;
    if (indent < baseIndent) break;
    // Remove base indentation
    contentLines.push(line.slice(baseIndent));
    i++;
  }

  // Trim trailing empty lines
  while (
    contentLines.length > 0 &&
    contentLines[contentLines.length - 1].trim() === ""
  ) {
    contentLines.pop();
  }

  return { contentLines, nextIndex: i };
}

function convertInlineMarkup(md: string): string {
  // :math:`...` → $...$
  md = md.replace(/:math:`([^`]+)`/g, '$$$1$$');

  // :doc:`text <target>` → [text](target) — trim whitespace around text
  md = md.replace(/:doc:`([^<`]+)<([^>]+)>`/g, (_, text, target) => `[${text.trim()}](${target.trim()})`);
  // :doc:`target` → [target](target)
  md = md.replace(/:doc:`([^`]+)`/g, "[$1]($1)");

  // :ref:`text <target>` → [text](#target) — trim whitespace around text
  md = md.replace(/:ref:`([^<`]+)<([^>]+)>`/g, (_, text, target) => `[${text.trim()}](#${target.trim()})`);
  // :ref:`target` → [target](#target)
  md = md.replace(/:ref:`([^`]+)`/g, "[$1](#$1)");

  // Other roles: :command:, :option:, :kbd:, :file:, :program: → `code`
  md = md.replace(
    /:(command|option|kbd|file|program|guilabel|menuselection|envvar|regexp):`([^`]+)`/g,
    "`$2`"
  );

  // Generic unknown roles → just inline code
  md = md.replace(/:[a-z_]+:`([^`]+)`/g, "`$1`");

  // RST external hyperlinks: `text <url>`_ or `text <url>`__ → [text](url)
  md = md.replace(/`([^<`]+)<([^>]+)>`_{1,2}/g, (_, text, url) => `[${text.trim()}](${url.trim()})`);

  // RST bold **text** is already Markdown bold
  // RST italic *text* is already Markdown italic

  // Double backtick ``literal`` → single backtick (avoid matching triple backtick code fences)
  md = md.replace(/(?<!`)``([^`]+)``(?!`)/g, "`$1`");

  return md;
}

function cleanupRst(md: string): string {
  // Remove target definitions
  md = md.replace(/^\.\.\s+_[^:]+:.*$/gm, "");

  // Remove field lists like :Type: ..., but keep as plain text
  md = md.replace(/^:(\w[^:]*):(\s+.*)$/gm, "**$1:** $2");

  // Convert RST substitution references |text| → text
  // Use \S after opening | to avoid matching Markdown table cells (| cell |)
  md = md.replace(/\|(\S[^|\n]*)\|/g, "$1");

  // Remove remaining RST comments
  md = md.replace(/^\.\.\s*$/gm, "");
  // Remove LaTeX artifacts
  md = md.replace(/^\\clearpage\s*$/gm, "");

  // Clean RST backslash escapes (\ before space used for markup separation)
  md = md.replace(/\\ (?=\S)/g, "");
  return md;
}
