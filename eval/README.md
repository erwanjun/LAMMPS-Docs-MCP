# Retrieval eval for LAMMPS-Docs-MCP

A small, self-contained benchmark for the search behind `search_lammps_docs`. It answers
one question: **is the shipping 60/40 TF-IDF + keyword hybrid actually better than its
two halves, and what does it cost?**

```bash
npm run eval                # keyword vs TF-IDF vs 60/40 hybrid
npm run eval:sweep          # + alpha sweep over the blend
npm run eval:qdrant-up      # start a local Qdrant (docker)
npm run eval:qdrant         # + the optional Qdrant backend
npm run eval:qdrant-down    # stop it
```

Results print to the console and are written to `eval/results/latest.md` (tables) and
`eval/results/run-<timestamp>.json` (every per-query outcome, for digging into failures).

## The query set

`eval/dataset/lammps-queries-v1.jsonl` — 100 LAMMPS queries in the shape users actually
type them, each labeled with the documentation page(s) that answer it.

```json
{"id":"q001","query":"how do I run an NVT simulation at 300 K","gold":["fix-nh"],"type":"nl-task","difficulty":"easy"}
```

- **`gold`** is a set of canonical doc ids — the knowledge file name without `.md` and
  without the ` N` duplicate suffix. Any hit in the set counts. 69 queries have a single
  gold doc, 31 have two (e.g. `minimize` *and* `min-style` both genuinely answer "energy
  minimization with conjugate gradient").
- **`type`**: `nl-task` (54), `concept` (23), `command` (12), `param` (4), `build` (4),
  `error` (3). Only the `command` slice names a LAMMPS command outright; the rest
  describe the goal, which is what makes the set discriminating.
- **`difficulty`**: `easy` (42), `medium` (48), `hard` (10) — a hand judgement of how far
  the query wording sits from the doc's own vocabulary.

Every gold label is checked against the built index before a run; an unknown doc id fails
the run rather than silently capping recall for every method.

## Metrics

Scoring is at the **document** level. The retriever returns chunks; chunks are collapsed
to their source doc, each doc keeping its best chunk, and docs are ranked by that score.
This matches what a user is after — the right page — and stops one verbose page from
occupying five result slots.

- **Recall@k** — fraction of queries where a gold doc appears in the top *k*. Reported at
  1, 3, 5, 10. With one right answer per query, Recall@1 is precision at 1.
- **MRR** — mean of `1/rank` of the first gold doc, 0 beyond rank 10. Rewards being right
  *and* being first.
- **Latency** — mean / p50 / p95 / max wall-clock per query, measured in-process after a
  warm-up call, taking the best of `--repeats` passes so the number reflects the method's
  own cost rather than a GC pause. Index load is reported separately as setup.

## Results

100 queries, `--repeats 5`, single process, warm index, Apple silicon, Qdrant 1.19 in
Docker on the same machine.

| method | R@1 | R@3 | R@5 | R@10 | MRR | mean ms | p95 ms |
|---|---|---|---|---|---|---|---|
| keyword | 11.0% | 36.0% | 54.0% | 73.0% | 0.274 | 58.4 | 76.7 |
| tfidf | 49.0% | 71.0% | 77.0% | 87.0% | 0.615 | 23.5 | 24.3 |
| **hybrid-60-40** (shipping) | **49.0%** | **71.0%** | **87.0%** | **95.0%** | **0.636** | **80.1** | **99.0** |
| hybrid-60-40-cached | 49.0% | 71.0% | 87.0% | 95.0% | 0.636 | 64.5 | 82.9 |
| qdrant-sparse | 49.0% | 71.0% | 77.0% | 87.0% | 0.615 | 0.8 | 0.9 |
| qdrant-rerank | 49.0% | 72.0% | 88.0% | 95.0% | 0.639 | 3.3 | 4.9 |

Alpha sweep (`alpha` x TF-IDF + `1-alpha` x keyword):

| alpha | 0.00 | 0.10 | 0.30 | 0.50 | **0.60** | 0.70 | 0.80 | 0.90 | 1.00 |
|---|---|---|---|---|---|---|---|---|---|
| R@1 | 11.0% | 42.0% | 42.0% | 45.0% | **49.0%** | 50.0% | 50.0% | 51.0% | 49.0% |
| R@5 | 54.0% | 81.0% | 81.0% | 85.0% | **87.0%** | 87.0% | 86.0% | 86.0% | 77.0% |
| MRR | 0.274 | 0.574 | 0.575 | 0.605 | **0.636** | 0.646 | 0.647 | 0.643 | 0.615 |

### What the numbers say

**The hybrid earns its keep, but not where you'd expect.** It does not improve Recall@1
over TF-IDF alone (49% both). What the keyword term buys is depth: +10 points of
Recall@5 (77% → 87%) and +8 of Recall@10. It rescues documents TF-IDF ranks 6th–15th,
which is exactly the band that decides whether an MCP client with `top_k: 5` sees the
right page at all.

**Pure keyword is not a ranker.** 11% Recall@1. It scores the *fraction of query terms
present*, so any long page mentioning common words scores well and there is nothing to
break ties — hundreds of chunks tie at 1.0. It is a useful signal, not a usable ranking.

**60/40 is close to right, and not worth retuning on this evidence.** The MRR curve is
flat from 0.60 to 0.90 (0.636–0.647). alpha 0.70–0.80 looks marginally better, but a
1-point difference on 100 queries is inside the ±5-point band you'd expect from
resampling. Treat the sweep as confirmation that the current split isn't misconfigured,
not as a mandate to change it.

**Latency is dominated by the keyword half.** TF-IDF alone is 23.5 ms; adding the keyword
term takes it to 80.1 ms. `keywordScore` rebuilds a joined lowercase string of every
chunk's content, title, tags, commands, and headings, then runs one regex per query term
against it — for all 10,082 chunks, on every query. The `hybrid-60-40-cached` row isolates
a smaller, separate cost: rebuilding a `Map` from each chunk's stored vector entries on
every query is worth ~15 ms that a persistent cache removes, with byte-identical
rankings (verified on all 100 queries).

**Where it still fails.** 5 of 100 queries miss the top 10 under the shipping hybrid, and
the pattern is consistent: queries phrased in physics vocabulary rather than LAMMPS
vocabulary. "my simulation blew up with atoms flying apart" (→ `errors-common`), "which
thermostat should I use for equilibration" (→ `howto-thermostat`), "store the initial
coordinates of atoms for later use" (→ `fix-store-state`). Both signals here are lexical,
so neither can bridge a vocabulary gap. That is the argument for a dense-embedding
backend, and it is the gap this eval is set up to measure if one is added.

## The optional Qdrant backend

`eval/src/backends/qdrant.ts`. Chosen over FAISS deliberately: the knowledge base is
already indexed as **sparse** TF-IDF vectors over a ~30k-term vocabulary, and Qdrant
indexes sparse vectors natively over plain HTTP. FAISS would have meant a native Node
binding plus projecting the vectors into a dense space — a second change to the ranking
that would have confounded the comparison. It needs no new npm dependency; it talks to
Qdrant's REST API through `fetch`, and the harness skips it with a message when no Qdrant
is reachable.

The same vectors already in `data/tfidf_index.json` are uploaded, L2-normalized so
Qdrant's sparse dot product equals the in-process cosine. Two retrievers:

- **`qdrant-sparse`** — pure ANN sparse retrieval. It is the server-side twin of `tfidf`,
  and the run confirms it: **identical top-10 rankings on all 100 queries**, max score
  difference 6.6e-8 (float noise). Same answers, 23.5 ms → 0.8 ms.
- **`qdrant-rerank`** — ANN recall pass for the top 200 candidates, then the same 60/40
  blend applied locally. Matches the shipping hybrid's quality (MRR 0.639 vs 0.636, R@5
  88% vs 87%) at **3.3 ms instead of 80.1 ms**, a 24x reduction.

`qdrant-rerank` edging out `hybrid-60-40` at Recall@5 is not noise-free luck: reranking
only the top-200 TF-IDF candidates keeps keyword-only false positives — pages that share
common words but nothing distinctive — out of the pool entirely, which the exhaustive
local scan cannot do.

This is a latency finding, not a recommendation to add a service dependency. A 40 MB
JSON index that loads in 140 ms is a reasonable thing to ship; the point is that if the
knowledge base grows past what a linear scan can serve, the ranking is already portable to
a vector database without changing a single result.

## Caveats

- **Labels are single-annotator and were frozen before the first run.** They were not
  adjusted afterwards to flatter any method. Some misses are arguable — `howto-walls` is a
  defensible answer to "reflective wall at a plane" even though the label says
  `fix-wall-reflect` — so read the absolute numbers as approximate and the *differences
  between methods* as the signal, since every method faces the same labels.
- **Doc-level, not chunk-level.** The eval does not measure whether the right *passage*
  within a page was surfaced.
- **n=100.** Differences under ~5 points are not resolvable.
- **Latency is single-process, warm, and uncontended**, with Qdrant on localhost. It
  measures the algorithms, not a deployment.
- **No semantic baseline.** Both in-process methods are lexical, so the eval cannot yet
  quantify how much a dense embedding model would add. Adding one as a third retriever is
  the natural next use of this harness.

## Adding to the harness

A retriever is anything matching the `Retriever` interface in `eval/src/types.ts`:
a name, a description, an optional async `setup`/`teardown`, and
`search(query, cutoff) => RankedDoc[]`. Add it to the list in `eval/src/run.ts` and it
picks up all metrics, slices, and reports automatically.

New queries go in the JSONL, one per line. Keep `gold` to the pages a LAMMPS user would
call the right page to open, and prefer adding queries in the shape people ask them over
queries built backwards from a page you know exists.
