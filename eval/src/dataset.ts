/**
 * Loads and validates the labeled query set against the built index.
 */

import fs from "fs/promises";
import type { QueryCase } from "./types.js";

/**
 * Normalize a knowledge file name to a canonical doc id.
 * The knowledge dir contains duplicate copies such as "velocity 3.md" that are
 * byte-identical to "velocity.md"; collapsing them keeps the metrics from
 * being decided by which copy happened to sort first.
 */
export function docIdOf(source: string): string {
  return source.replace(/\.md$/, "").replace(/ \d+$/, "");
}

export async function loadDataset(path: string): Promise<QueryCase[]> {
  const raw = await fs.readFile(path, "utf-8");
  const cases: QueryCase[] = [];
  const seen = new Set<string>();

  raw.split("\n").forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("//")) return;
    let parsed: QueryCase;
    try {
      parsed = JSON.parse(trimmed);
    } catch (err) {
      throw new Error(`Dataset line ${i + 1} is not valid JSON: ${String(err)}`);
    }
    if (!parsed.id || !parsed.query || !Array.isArray(parsed.gold) || parsed.gold.length === 0) {
      throw new Error(`Dataset line ${i + 1} (${parsed.id}) is missing id/query/gold.`);
    }
    if (seen.has(parsed.id)) throw new Error(`Duplicate query id: ${parsed.id}`);
    seen.add(parsed.id);
    cases.push(parsed);
  });

  return cases;
}

/**
 * Every gold label must name a doc that actually exists in the index, otherwise
 * the query is unanswerable and would silently depress recall for every method.
 */
export function validateGoldLabels(
  cases: QueryCase[],
  knownDocIds: Set<string>
): { ok: boolean; problems: string[] } {
  const problems: string[] = [];
  for (const c of cases) {
    for (const g of c.gold) {
      if (!knownDocIds.has(g)) {
        problems.push(`${c.id}: gold doc "${g}" is not in the index`);
      }
    }
  }
  return { ok: problems.length === 0, problems };
}
