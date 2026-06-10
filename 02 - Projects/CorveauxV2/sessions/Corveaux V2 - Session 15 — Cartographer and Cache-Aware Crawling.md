---
type: daily
date: 2026-06-07
---

# 2026-06-07 — Session 15

## Focus

Closed the long-deferred `project_caching_policy` (memory) gap (R2 cache was write-only — no read-back path), then iterated the cache-key scheme twice more at the user's direction until it landed on a slug-namespaced, date-free scheme, and renamed the crawler module to **Cartographer**. Recorded the redesign as [[ADR-017 — Cache-Aware Crawling and Extraction]].

## Tasks

- [x] Added `getCrawledPage(key)` read-back to `crawl-storage.ts` — the missing half of a write-only cache
- [x] Replaced `crawlSource`'s Crawlee-based implementation with a hand-rolled cache-first BFS loop — "read cache, re-derive links" so URL-pattern changes between runs still surface newly-relevant links from already-cached pages
- [x] Wired the same cache (`getCrawledPage`/`storeCrawledPage`, keyed by `pageKey`/`canonicalizeUrl`) into `extractPage_task` — closing the *larger* of the two caching gaps, since every extraction iteration was independently live-fetching ~2,000+ pages regardless of what discovery had already cached
- [x] Removed `crawlee` entirely (`npm uninstall crawlee`, 257 packages dropped) and deleted `scripts/crawl-worker.ts` — this also fixed the underlying module-state-corruption bug that the cross-process worker hack existed to route around
- [x] Iterated the cache-key scheme twice more per user direction: `crawl/{date}/{hash}.html` → `crawl/{hash}.html` → **`crawl/{sourceSlug}/{hash}.html`** (final) — landed on slug-namespaced, no date, after discussing why neither an index nor a staleness-tracking date belonged at this layer (see Decisions)
- [x] Renamed `crawler.ts` → `cartographer.ts` (`git mv`, preserves history) and threaded a new `sourceSlug: string` concept through the entire orchestration chain — `CrawlOptions` → `fullCatalogRun` → `extractionRun` → `extractPage_task` payloads, distinct from `tenantId` (operating Corveaux tenant vs. institution being crawled)
- [x] Updated all 7 callers (`scripts/catalog-{full,courses,programs,programs-pilot,documents}.ts`, `scripts/trigger-validate.ts`, `src/trigger/extraction.ts`) to import from `cartographer` and pass `sourceSlug: "slcc"`
- [x] Wrote and ran a migration script to re-key ~3,655 cached pages from the old date-prefixed format into the final `crawl/slcc/{hash}.html` namespace (non-destructive — old keys left in place)
- [x] `tsc --noEmit` clean across the full rename + threading change

## Decisions

- **No date in the cache key, and no staleness/diff monitoring.** User initially proposed `{slug}/{date}/{hash}.html`, then asked for my opinion, then independently arrived at "I don't think it needs to be monitored" before I'd finished laying out the case. The reasoning that converged: Corveaux's "Time" canonical primitive already models temporal change at the *fact* level (`validFrom`/`validTo` in the promoter) — a dated raw-HTML archive would duplicate that responsibility one layer down, at the wrong granularity (page snapshots vs. fact versions). Re-crawls are a deliberate, reviewed "the catalog changed, go get it" action, not something that should auto-trigger off a diff. "Always serve the latest cached version, overwrite on recrawl" is the correct default semantic.
- **Slug-namespace the cache by source, not by operating tenant.** `sourceSlug` (e.g. `"slcc"`) is a new, distinct concept from `tenantId` (which stays `"corveaux"` — the platform tenant operating the crawl). This anticipates a future where Corveaux ingests from multiple institutions and prevents their cached content from ever colliding — same discipline CLAUDE.md already mandates one level up ("Tenant isolation is a security boundary, not an application convention").
- **Renamed to "Cartographer."** The module no longer just crawls-and-discards; it cache-aware maps a source's URL space and hands back a navigable record (pages + document links). The new name better fits what Option B in ADR-017 actually built.

## Wins

- Smoke-tested the cache read-back path before committing to the full rewrite: 4474ms (live) → 492ms (cached) for a repeat fetch — ~9x speedup confirmed empirically, not just in theory
- Caught a silent 100%-cache-miss landmine *before* burning gate-run budget on it: discovered via direct R2 inspection that the deterministic no-date key scheme would have produced zero hits against ~3,655 previously-cached pages, because the key format had changed underneath them
- `tsc --noEmit` clean after a rename touching 8 files and a new payload field threaded four layers deep

## Blockers / Incidents

- **Background-task `TaskStop` does not reliably kill underlying OS processes.** Stopped an in-flight migration (`br15qf2zl`, targeting the now-obsolete `crawl/{hash}.html` scheme) via `TaskStop` and received "successfully stopped" — but the underlying `tsx` process tree survived, orphaned from harness tracking, and kept running on its old in-memory code for over an hour. It silently wrote ~3,282 wrong-format duplicate objects into R2 before the user noticed the bucket had grown to roughly double its expected size and asked directly: *"did i duplicate the old files when performing the transition... I think that's DOUBLE what it should be."* Found the orphan via `Get-CimInstance Win32_Process` (matching on command line + creation timestamp) and killed it with `Stop-Process -Force`. **Lesson recorded in `known_bugs` (memory): after `TaskStop`, verify the underlying OS process is actually gone — don't trust the harness's "stopped" confirmation for long-running background shells.** Cleanup of the ~3,282 wrongly-duplicated objects is in progress alongside the (now-singular, verified) correct migration.

## Next Step

Once the `crawl/slcc/{hash}.html` migration completes and the wrong-format duplicates are deleted: run gate Run 002 (`npm run trigger:catalog:full`). With ~3,655 pages already cached under the correct scheme, this run should resume from cache rather than re-walking the SLCC catalog live — the entire point of this session's work. Do not start generated-tenant work until the gate scores ≥90% (per `project_stage` (memory)).

## Related

- [[ADR-017 — Cache-Aware Crawling and Extraction]] — full record of the redesign and the final key-scheme rationale
- `project_caching_policy` (memory) — the deferred item this session closed
- `known_bugs` (memory) — updated with the `TaskStop`/orphaned-process lesson
- [[Corveaux V2 - Session 14 — Day 30 Gate Defect Remediation]] — the immediately-prior session, whose fixes this one's gate run will validate
- `project_stage` (memory)
