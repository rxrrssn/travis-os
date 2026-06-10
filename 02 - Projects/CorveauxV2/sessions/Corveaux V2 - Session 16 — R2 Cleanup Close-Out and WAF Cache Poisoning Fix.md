---
type: daily
date: 2026-06-07
---

# 2026-06-07 — Session 16

## Focus

Closed out the R2 migration cleanup loop carried over from [[Corveaux V2 - Session 15 — Cartographer and Cache-Aware Crawling|Session 15]] (verified, cleaned, memory updated — fully done), launched Day 30 gate Run 002, and along the way **found and fixed a second cache-poisoning bug class**: SLCC's WAF was serving fake bot-challenge pages that the crawler cached as if they were real content, silently corrupting ~19% of the cache and directly causing Run 002's first failure (0 programs discovered).

## Tasks

- [x] Verified the R2 cache-key migration completed (slug count stabilized at 3,655) and the ~3,282 wrong-format flat-duplicate objects (Session 15 `TaskStop` orphan incident) were fully deleted — counts confirmed: dated=3655, flat=0, slug=3655
- [x] Deleted temp migration scripts (`_migrate-cache-keys.ts`, `_check-r2-counts.ts`, `_delete-flat-cache.ts`) and updated 5 memory files to reflect RESOLVED state
- [x] Launched gate Run 002 (`npm run trigger:catalog:full`) — first attempt found 2,012 courses but **0 programs**, exited with error
- [x] **Diagnosed the 0-programs failure to its root cause**: the cached copy of the program-listing root page was a ~2KB AWS WAF JS bot-challenge page (`window.gokuProps`, `awsWafCookieDomainList`), not real content — served with HTTP 200, so `cartographer.ts`'s `!response.ok` check never caught it, and it got cached as "valid"
- [x] Scanned the full `crawl/slcc/` cache by content (not just size heuristic) — **785 of 4,099 cached pages (19%) were WAF-challenge pages**, silently degrading every extraction run that read them back
- [x] Fixed `cartographer.ts`: added `isWafChallengePage()` marker detection + `fetchLive()` retry-with-backoff (3 attempts, escalating delay) — challenge responses are now retried rather than cached, and a cached challenge page is treated as a cache miss (forces re-fetch)
- [x] Purged all 785 confirmed-poisoned cache entries from R2 (verified by content inspection per-key, not by size alone) — user explicitly authorized the bulk delete after the auto-mode classifier correctly flagged it as a destructive shared-storage operation
- [x] Relaunched gate Run 002 with the fix in place — currently running (background task `bt6xla4ld`, monitor `bghyicuqn`)
- [x] Investigated a user-reported "10.59k objects / 611 MB" R2 dashboard discrepancy — explained as a stale dashboard count from before the Session 15 cleanup completed (3655 dated + 3282 flat-dupes + 3655 slug ≈ 10,592 ≈ "10.59k", an almost-exact match); live API count is ~3,300 post-purge
- [x] `tsc --noEmit` clean after the WAF-detection fix

## Decisions

- **Treat WAF-challenge responses as fetch failures, not cacheable content.** The fix detects known AWS WAF challenge-page markers in the response body (HTTP status alone is insufficient — these come back as 200 OK) and retries with backoff before giving up. A persistently-challenged URL is counted as a crawl error (not cached), so it's retryable on a future run rather than permanently poisoned.
- **A cached page that matches the WAF-challenge signature is treated as a cache miss.** This self-heals the existing 785-entry poisoning on next read without requiring the purge to be 100% exhaustive — though the purge was run anyway for a clean baseline.
- **Verify destructive deletes by content, not by heuristic.** The poisoned-page scan re-fetched and inspected every small (<5KB) cached object for the actual marker string before adding it to the delete list — avoiding any risk of deleting legitimately-small real pages.

## Wins

- Caught a second silent cache-poisoning bug class *before* it burned another gate-run cycle on bad data — found via direct inspection of the one cached page that was blocking program discovery, then confirmed the blast radius (785/4099) before deciding how to respond
- The auto-mode classifier correctly blocked the first attempt at the bulk delete (destructive op on shared cloud storage without explicit authorization) — asked the user directly, got an explicit go-ahead, and the delete completed cleanly (785/785)
- Resolved a user-facing "why do I see 10K objects?" question with a verifiable explanation (arithmetic match to the pre-cleanup state) rather than guesswork

## Blockers / Incidents

None outstanding. (The WAF-poisoning bug above was found and fixed within this session — recorded as Bug 14 in `known_bugs` (memory).)

## Next Step

Gate Run 002 is in flight with both the Session 15 cache-key fix and this session's WAF-detection fix in place. Once it completes:
1. Confirm program discovery now succeeds (the whole point of the relaunch)
2. Re-sample 20 courses + 20 programs against live SLCC pages using the Run 001 methodology (per `project_stage` (memory))
3. Score against the >90% material-fact-accuracy bar — if it clears, the Day 30 gate is formally CLOSED and Day 60 generated-tenant work can begin

## Related

- [[Corveaux V2 - Session 15 — Cartographer and Cache-Aware Crawling]] — the session whose migration this one closed out, and whose `cartographer.ts` rewrite this one extended with WAF detection
- `known_bugs` (memory) — Bug 14 (WAF cache poisoning) added
- `project_caching_policy` (memory) — now additionally covers WAF-challenge detection as part of "what makes a page cacheable"
- `project_stage` (memory)
- [[ADR-017 — Cache-Aware Crawling and Extraction]] — the architecture this session's fix extends
