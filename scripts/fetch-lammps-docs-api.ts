/**
 * Fetch LAMMPS documentation RST files from GitHub API
 *
 * Downloads all RST files from lammps/lammps/doc/src on GitHub
 * Uses the GitHub Tree API (single request) to list files,
 * then downloads them in batches via raw.githubusercontent.com.
 *
 * Usage: tsx scripts/fetch-lammps-docs.ts [--branch develop] [--batch-size 10]
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "raw-docs", "doc", "src");

const GITHUB_OWNER = "lammps";
const GITHUB_REPO = "lammps";
const GITHUB_PATH = "doc/src";
const DEFAULT_BRANCH = "develop";

// Parse CLI args
const args = process.argv.slice(2);
let branch = DEFAULT_BRANCH;
let batchSize = 10;
let retryLimit = 3;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--branch" && args[i + 1]) {
    branch = args[i + 1];
    i++;
  } else if (args[i] === "--batch-size" && args[i + 1]) {
    batchSize = parseInt(args[i + 1], 10);
    i++;
  }
}

interface GitHubTreeEntry {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
  url: string;
}

interface GitHubTreeResponse {
  sha: string;
  url: string;
  tree: GitHubTreeEntry[];
  truncated: boolean;
}

/**
 * Sleep for a given number of milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch with retry
 */
async function fetchWithRetry(
  url: string,
  retries: number = retryLimit
): Promise<Response> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "lammps-mcp-server/1.0",
        },
      });
      if (response.ok) return response;
      if (response.status === 403 || response.status === 429) {
        // Rate limited
        const retryAfter = response.headers.get("retry-after");
        const waitMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : 60000;
        console.log(`  Rate limited. Waiting ${waitMs / 1000}s...`);
        await sleep(waitMs);
        continue;
      }
      if (attempt === retries) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      if (attempt === retries) throw err;
      console.log(`  Retry ${attempt}/${retries} for ${url}`);
      await sleep(2000 * attempt);
    }
  }
  throw new Error("Max retries exceeded");
}

/**
 * Get the list of RST files using GitHub Contents API (paginated)
 */
async function listRstFiles(): Promise<string[]> {
  console.log("Fetching file list from GitHub API...");

  // Use the Contents API to list files in doc/src
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/trees/${branch}?recursive=1`;

  try {
    const response = await fetchWithRetry(url);
    const data = (await response.json()) as GitHubTreeResponse;

    const rstFiles = data.tree
      .filter(
        (entry) =>
          entry.type === "blob" &&
          entry.path.startsWith("doc/src/") &&
          entry.path.endsWith(".rst")
      )
      .map((entry) => entry.path.replace("doc/src/", ""));

    console.log(`Found ${rstFiles.length} RST files`);
    return rstFiles;
  } catch (err) {
    console.log("Tree API failed, trying Contents API fallback...");
    return await listRstFilesViaContents();
  }
}

/**
 * Fallback: list files using Contents API
 */
async function listRstFilesViaContents(): Promise<string[]> {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}?ref=${branch}`;
  const response = await fetchWithRetry(url);
  const entries = (await response.json()) as Array<{
    name: string;
    type: string;
    download_url: string | null;
  }>;

  return entries
    .filter((e) => e.type === "file" && e.name.endsWith(".rst"))
    .map((e) => e.name);
}

/**
 * Download a single RST file
 */
async function downloadFile(filename: string): Promise<string | null> {
  const url = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${branch}/doc/src/${filename}`;

  try {
    const response = await fetchWithRetry(url);
    return await response.text();
  } catch (err) {
    console.error(
      `  Failed: ${filename}: ${err instanceof Error ? err.message : String(err)}`
    );
    return null;
  }
}

/**
 * Download files in batches
 */
async function downloadBatch(
  filenames: string[],
  batchSize: number
): Promise<Map<string, string>> {
  const results = new Map<string, string>();
  const total = filenames.length;

  for (let i = 0; i < total; i += batchSize) {
    const batch = filenames.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(total / batchSize);

    process.stdout.write(
      `\r  Downloading batch ${batchNum}/${totalBatches} (${i + batch.length}/${total})...`
    );

    const promises = batch.map(async (filename) => {
      const content = await downloadFile(filename);
      if (content) {
        results.set(filename, content);
      }
    });

    await Promise.all(promises);

    // Small delay between batches to avoid rate limiting
    if (i + batchSize < total) {
      await sleep(200);
    }
  }

  console.log(""); // newline after progress
  return results;
}

async function main() {
  console.log("=== LAMMPS Documentation Fetcher (API mode) ===\n");
  console.log(`Branch: ${branch}`);
  console.log(`Batch size: ${batchSize}`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  // Get file list
  const rstFiles = await listRstFiles();

  if (rstFiles.length === 0) {
    console.error("No RST files found!");
    process.exit(1);
  }

  // Filter out symlinks/redirect files we don't need
  const filesToDownload = rstFiles.filter((f) => {
    // Skip ATC symlink targets
    if (f.startsWith("atc_")) return false;
    return true;
  });

  console.log(`\nDownloading ${filesToDownload.length} RST files...`);

  // Check which files already exist (incremental download)
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const existingFiles = new Set(await fs.readdir(OUTPUT_DIR));
  const newFiles = filesToDownload.filter((f) => !existingFiles.has(f));

  if (newFiles.length < filesToDownload.length) {
    console.log(
      `  ${existingFiles.size} files already exist, downloading ${newFiles.length} new files`
    );
  }

  const filesToFetch =
    newFiles.length > 0 ? newFiles : filesToDownload;

  // Download
  const contents = await downloadBatch(filesToFetch, batchSize);

  // Save to disk
  let saved = 0;
  for (const [filename, content] of contents) {
    const outputPath = path.join(OUTPUT_DIR, filename);
    await fs.writeFile(outputPath, content, "utf-8");
    saved++;
  }

  console.log(`\nSaved ${saved} RST files to: ${OUTPUT_DIR}`);
  console.log(`\nNext step: run 'npm run process-docs' to convert to knowledge base`);
}

main().catch((err) => {
  console.error("Fetch failed:", err);
  process.exit(1);
});
