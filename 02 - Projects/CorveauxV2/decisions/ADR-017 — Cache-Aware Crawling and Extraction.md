---
type: decision
domain: extraction
status: active
date: 2026-06-07
tags: [extraction, crawler, caching, r2, day-30-gate]
---

# ADR-017 — Cache-Aware Crawling and Extraction

## Decision

Both pipeline stages that fetch raw page HTML — local URL discovery (`crawlSource`, now in `cartographer.ts`) and remote per-page extraction (`extractPage_task`) — now check the R2 crawl cache first, by a deterministic storage key derived from the **source slug + canonicalized URL**, and only issue a live HTTP request on a cache miss. Cache misses are stored back to R2 immediately, so subsequent runs (discovery or extraction, in either order) see them as hits. This closes the cache read-back gap named in `project_caching_policy` (memory) and replaces an in-progress cross-process worker hack that was being built to route around an unrelated Crawlee bug.

The crawler module was renamed `crawler.ts` → `cartographer.ts` in the same pass — "Cartographer" better names what the module now does: map a source's URL space, cache-aware, and hand back a navigable record of it (pages + document links), rather than just "crawl and discard."

## Context

Gate Run 002 attempts kept dying mid-crawl: page caps were hit mid-discovery (attempt 3 found 2,012 unique courses but hit a 3,500-request cap), and a from-scratch re-run meant re-fetching thousands of pages live from `catalog.slcc.edu` — slow (~20+ minutes for course discovery alone), impolite to the source site, and wasteful since most of that content hadn't changed since the last attempt.

Mid-session, a different bug surfaced: running `crawlSource()` twice sequentially in the same process (courses, then programs) caused the second crawl to enqueue nothing — Crawlee leaves module-level state (event manager, autoscaled-pool signal handlers) corrupted after a crawler is force-stopped via `maxRequestsPerCrawl`, confirmed across three isolation attempts (`Configuration` instances, named `RequestQueue`s, then full process isolation via a spawned `crawl-worker.ts`). The worker-process approach worked but added real complexity: a temp-file IPC boundary, `tsx` CLI spawning, and a process per crawl phase.

Separately, `crawl-storage.ts` (`storeCrawledPage`, R2-backed) had been write-only since its introduction — pages were persisted to `crawl/{date}/{hash}.html` but nothing ever read them back. `project_caching_policy` (memory) flagged this as the next required engineering step before further extraction iteration: "Currently `storeCrawledPage`... is write-only; there is no lookup/read-back by canonical URL." It also called out that the date-keyed storage scheme would need to become deterministic (or indexed) to support lookup.

## Options Considered

**Option A — Keep Crawlee, fix isolation, add caching as a bolt-on.** Finish the `crawl-worker.ts` cross-process approach, then separately layer R2 read-back on top. Rejected: this stacks one workaround (process isolation for a Crawlee bug) on top of the actual goal (caching), and still leaves `extractPage_task` doing its own uncached live fetch — the bigger of the two caching gaps.

**Option B — Custom cache-first BFS crawler; wire the same cache into extraction (chosen).** Replace `crawlSource`'s Crawlee-based implementation with a small hand-rolled BFS loop that checks R2 before every fetch (live or cached, it always re-parses for links — see Rationale). Reuse the same deterministic key function (`pageKey`/`canonicalizeUrl`, now exported from `cartographer.ts`) inside `extractPage_task` so the remote extraction stage benefits from exactly the same cache, in either order of execution.

**Option C — Build a separate cache-read service / index.** Maintain a URL → storage-key index (e.g. a manifest object or DB table) so lookups don't depend on a deterministic key scheme. Rejected as unnecessary complexity: a deterministic key (`sha256(canonicalUrl).slice(0,16)`) makes the index redundant — any caller that can canonicalize a URL can compute its own cache key with no shared state.

## Rationale

Dropping Crawlee from `crawlSource` wasn't scope creep — it was the direct consequence of the chosen caching strategy colliding with a known-buggy dependency interaction. Crawlee's `CheerioCrawler` performs its live HTTP fetch *before* the request handler runs, with no supported hook to substitute cached content and skip the network call. Implementing "read cache, re-derive links" inside Crawlee's lifecycle would have meant fighting the framework; outside it, it's a ~70-line loop. Removing Crawlee also eliminates the module-state corruption bug at its root, which made the entire `crawl-worker.ts` cross-process indirection unnecessary — it was deleted in the same pass.

"Read cache, re-derive links" (rather than "skip cached URLs outright") was the deliberate choice for cache hits: a cached page is read back from R2 and *still* parsed for document links and outbound links matching the current `allowedUrlPatterns`. This matters concretely — the pagination regex (`catalog\.slcc\.edu/content\.php\?.*navoid=9704`) was added to the URL patterns *this session*, after most course-listing pages were already cached under the old pattern set. Skipping cached pages outright would have permanently missed the newly-relevant pagination links those pages contain. Re-deriving costs one R2 read (~100ms) and a regex pass — negligible next to a live fetch, and correct under pattern changes.

The storage key changed from `crawl/{date}/{hash}.html` to `crawl/{sourceSlug}/{hash}.html` (e.g. `crawl/slcc/a1b2c3d4e5f6a7b8.html`). Two changes from the original scheme, both deliberate:

- **Dropping the date** makes the key depend only on the canonical URL (plus the source slug), so a lookup needs no index — any caller computes the same key independently. We considered keeping a date for staleness tracking, but rejected it: the "Time" canonical primitive already models temporal change at the *fact* level (`validFrom`/`validTo` in the promoter), and Corveaux's content-block model expects a deliberate, reviewed re-extraction pass rather than silent drift from re-crawled HTML. A dated raw-HTML archive would duplicate that responsibility at the wrong layer. Recrawls overwrite the cached copy with the latest content — "always serve the latest known known version" is the correct semantic for both resumable discovery and extraction-iteration reuse, and matches how the rest of the pipeline already treats staleness (manual, reviewed, not automatic).
- **Adding the source slug** (e.g. `slcc`) namespaces the cache by institution/source — not by *operating* Corveaux tenant (`tenantId` remains `"corveaux"` throughout; `sourceSlug` is a distinct concept naming the institution being crawled). This was originally considered for a future where Corveaux crawls multiple institutions concurrently — without it, two sources whose canonical URLs happen to hash-collide (cryptographically near-impossible at 64 bits, but namespacing removes the question entirely) or whose content differs by source-specific request context would silently corrupt each other's cache. Per CLAUDE.md, "Tenant isolation is a security boundary, not an application convention" — the same discipline applies one level down, to the sources a tenant ingests from.

Wiring the cache into `extractPage_task` closes the larger of the two gaps. Discovery-side caching alone would have made *re-running the crawl* fast, but every extraction run — including iterations that don't change the crawl at all — would still live-fetch ~2,000+ pages from SLCC on every pass. With both stages sharing one cache keyed identically, the *first* stage to see a URL (discovery or extraction, whichever runs first) populates it for the other.

## Stakeholders

- Travis Hornbuckle (platform)

## Consequences

**Positive:**
- A crawl interrupted by a page cap or transient failure resumes from cache in minutes rather than restarting a 20+ minute live walk
- `extractPage_task` (remote, Trigger.dev) now reuses whatever discovery already fetched — and vice versa — eliminating the double live-fetch every full run previously incurred
- Politer to `catalog.slcc.edu`: live requests only happen for genuinely new or changed URLs, with a 250ms delay between them
- Removed `crawlee` from `package.json` entirely (`npm uninstall crawlee`, 257 packages dropped) and deleted `scripts/crawl-worker.ts` and its process-spawning/temp-file IPC machinery — net reduction in moving parts
- Closes the `project_caching_policy` (memory) deferred item: cache read-back now exists and is wired into both stages

**Negative:**
- Cache entries never expire or get invalidated on intentional content refresh — a deliberate "the catalog changed, re-crawl it" pass requires manually clearing the relevant R2 keys (`scripts/clear-r2.ts` already exists for bulk clears) or changing the key scheme
- The custom BFS loop reimplements a slice of what Crawlee provided (link extraction, politeness delay, retry-free error counting) — less battle-tested, though far simpler to reason about and now fully under our control

**Constraints introduced:**
- `pageKey`/`canonicalizeUrl` (exported from `cartographer.ts`) are now the single source of truth for cache key derivation — any new code path that reads or writes crawled HTML must use `pageKey(sourceSlug, canonicalUrl)`, or cache hits silently won't occur. `sourceSlug` must now be threaded through the entire orchestration chain (`fullCatalogRun` → `extractionRun` → `extractPage_task` payloads) alongside `tenantId` — the two are distinct concepts (operating tenant vs. institution being crawled) and must not be conflated
- The deterministic key depends on `canonicalizeUrl`'s exact normalization (hash + sorted query params, no fragment) — changing that function's behavior invalidates every existing cache entry's addressability

## Related

- `project_caching_policy` (memory) — the deferred cache read-back item this ADR closes
- [[ADR-016 — Topological Extraction Order and Content Quality Pipeline]] — the pipeline phases (`crawlSource` → `extractPage_task`) that now share this cache
