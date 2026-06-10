---
type: daily
date: 2026-06-06
---

# Corveaux V2 — Session 08 — Trigger.dev Validation and Catalog Pilot

## Focus

Validate Trigger.dev orchestration end-to-end. Fix crawlSource() to actually spider links. Run a 5–10 page catalog pilot, establish extraction economics baseline.

## Tasks

- [x] Fix crawlSource() — real link spidering with enqueueLinks(), maxConcurrency: 2, User-Agent header
- [x] Add URL canonicalization — strip fragments, sort query params alphabetically
- [x] Separate crawling from Trigger.dev tasks — jsdom/Crawlee cannot be bundled by esbuild (architectural fix)
- [x] Replace Promise.allSettled(triggerAndWait()) with batchTriggerAndWait() — Trigger.dev v4 requirement
- [x] Add token tracking and cost formula v1 to ExtractionRun.metadata
- [x] New script: trigger-validate.ts — single-page Trigger.dev smoke test
- [x] New script: catalog-programs-pilot.ts — 5â€“10 page catalog pilot
- [x] New script: catalog-programs.ts — full 132-page run (ready, not yet run)
- [x] New script: generate-metrics.ts — generate metrics.md from DB source of truth
- [x] Pilot passed — 9 programs, 6 extracted, 0.965 avg confidence, $0.776 cost

## Wins

- Trigger.dev orchestration validated end-to-end: extraction.run → extraction.extract-page (×N) → extraction.promote → extraction.regenerate-blocks
- Catalog pilot complete — 9 pages, 6 programs extracted, avg confidence 0.965 (above 0.90 gate)
- Extraction economics baseline established: ~$0.129/program → ~$17 for full SLCC catalog
- batchTriggerAndWait() implemented correctly — parallel child tasks work at scale
- URL canonicalization live — no duplicate poid entities observed

## Blockers

None. Full 132-page run is ready to execute next session or on demand.

## Decisions

- Crawlee cannot run inside Trigger.dev tasks — jsdom uses relative require('./xhr-sync-worker.js') which breaks when esbuild bundles into ESM .mjs. Architectural decision: crawling (URL discovery) is always local; Trigger.dev tasks receive pre-discovered URLs and fetch page content themselves via native fetch.
- batchTriggerAndWait() is the correct Trigger.dev v4 API for parallel child tasks. Promise.allSettled() around triggerAndWait() is explicitly unsupported — it produced silent failures and unreliable results.
- Output token limit increased from 8096 to 16000 — dense program pages (ASL/English Interpreting, dual-language programs) exceed 8K tokens output and returned truncated non-JSON.
- extractPage_task.maxDuration raised from 120 to 300 — 9 concurrent Claude API calls under Anthropic rate limits can take >120s total.
- Fan-out scalability (Promise.allSettled / batchTriggerAndWait at 132 pages): acceptable for now. ADR-014 documents bounded fan-out as the target architecture before multi-tenant or >500 page runs.

## Bugs Fixed

- "Project not found: corveaux" — Trigger.dev CLI doesn't load .env; TRIGGER_PROJECT_ID was undefined, falling back to literal "corveaux". Fixed: hardcoded project: "proj_oovndcjdhcwldwcxjosh" in trigger.config.ts.
- "No record found for getTenantDb('tenant-zero')" — lookup used `where: { id }` but platform seed creates tenant with auto-UUID and `slug: "corveaux"`. Fixed: changed lookup to `where: { slug: tenantSlug }`.
- List page included in extraction — crawlSource() returns root content.php as first page; 132 programs on one page exceeds Claude output token limit. Fixed: filter to preview_program.php URLs only before triggering.

## Economics Baseline (Pilot — 9 pages, 6 programs)

| Metric | Value |
|---|---|
| Input tokens | 29,900 |
| Output tokens | 45,732 |
| Estimated cost | $0.776 |
| Cost per page | $0.086 |
| Cost per program | $0.129 |
| Avg confidence | 0.965 |
| Formula version | v1 (claude-sonnet-4-6: $3/M in, $15/M out) |

Projected full SLCC catalog (132 programs): ~$17

## Next Session Targets

- Run full 132-page catalog extraction: npm run trigger:catalog
- npm run metrics after full run — refresh economics baseline
- Manual accuracy sample: 10–20 programs against SLCC catalog ground truth
- Day 30 gate formal assessment — Coverage, Accuracy, Economics, Operational Reliability
- [x] Entra ID auth end-to-end browser verification — completed in [[Corveaux V2 - Session 11 — Tenant Zero Auth Validation]]
- S3 integration for crawl storage (still local tmp/crawl-output/)

## Related

- [[ADR-014 — Fan-out Scalability and batchTriggerAndWait]]
- [[extraction-pipeline-spec]]
- [[metrics]]
- [[SLCC Validation Run]]
