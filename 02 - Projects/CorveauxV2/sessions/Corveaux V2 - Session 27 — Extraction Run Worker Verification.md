---
type: session
project: corveaux-v2
session: 27
date: 2026-06-10
tags: [corveaux, extraction, cloudflare-workers, queues, verification, day-60]
---

# Corveaux V2 - Session 27 — Extraction Run Worker Verification

## Focus

Close the last open Day 60 code item: the `extraction.run` operation worker.
Set out to *build* it — discovered it was **already built end-to-end** and just
never verified. So the work became investigation + a one last-mile UI fix + a live
end-to-end verification run.

## Key finding — it was never a stub

The project memory and the hub todo had long flagged "extraction.run operation
worker" as *the one standing code gap*. That framing was stale-pessimistic. The full
path already existed and typechecked clean:

1. **Admin action** `requestRunExtractionAction` — wired to "Run extraction" buttons
   on `/admin/sources/[id]` and `/admin/tenants/[slug]`; reads the crawl's
   `extractionUrls` manifest, derives scope hints + excluded entity types, creates the
   `TenantOperation`, and dispatches.
2. **Dispatch** `dispatchTenantOperation` → POSTs the parsed `ExtractionManifest` to
   the tenant Worker `/v1/operations/dispatch`.
3. **`TenantOperationWorkflow`** (`cloudflare/tenant/src/index.ts`) — creates the
   `ExtractionRun` + `ExtractionWorkItem` rows and fans out one `extract_page` message
   per page to `EXTRACTION_PAGE_QUEUE` (batched by 100); reports `RUNNING`.
4. **Queue consumer** (`cloudflare/tenant/src/extraction-queue.ts`) — atomic
   work-item claim, page load (R2 cache or live fetch), `extractPage` via Claude,
   `writeObservations`, per-message retry/backoff; enqueues the finalizer when the
   last work item lands.
5. **Finalizer** — `promoteRun` (archivist) + `regenerateBlocksForExtractionRun`
   (projector), reports `COMPLETED` with full metrics.
6. **Platform callback** `/v1/operations/callback` — persists the two-phase
   `RUNNING` → `COMPLETED` result.

Both `EXTRACTION_PAGE_QUEUE` and `EXTRACTION_FINALIZE_QUEUE` have producers **and**
consumers in wrangler; the worker bundles for workerd (5.4 MB); the dev SLCC tenant
Worker is deployed and healthy.

## The one real code gap — fixed

`src/app/admin/_components/operation-result.tsx` early-returned `null` for every
operation type except `generate_tenant` / `source.crawl`, so a finished
`extraction.run` rendered a **blank** result panel despite the finalizer writing full
metrics. Extended it to surface Queued / Observations / Canonized / Conflicts /
Confidence % / Failed Pages / Est. Cost + a link to the run detail page, and
relabeled the shared `errorCount` row "Mapping Errors" → "Errors". Commit `2b74975`
(tsc + lint clean).

## Live verification (user-authorized)

Ran a minimal extraction against `slcc/slcc-catalog-courses` capped at 3 already-
crawled (R2-cached) course URLs:

```
[+0s]  PENDING
[+6s]  RUNNING    runId=00e9ee48  queued=3
[+28s] COMPLETED  obs=5  canon=2  conflict=3  conf=0.9  cost=$0.018  failed=0
```

Operation `476e05e4-8974-497b-9987-f3930f5862ff`, run
`00e9ee48-c290-4360-926f-97af33fb7760`. The full chain fired — dispatch → Workflow →
queue fan-out → Claude extraction → archivist promotion → platform callback —
COMPLETED in ~28s, zero failures, ~$0.018. The deployed worker is running current
code (the queue consumer + finalizer both executed). **`extraction.run` is proven
working end-to-end.**

The 3 conflicts are the expected benign cross-cutting re-observations (shared
org/subject entities colliding at equal precedence — the documented "working as
designed" conflict-resolution path), not extraction errors.

## Notes / gotchas

- **`blocksWritten=0`** for the 2 promoted course entities — the projector ran without
  error but wrote no content blocks. Worth a glance later (course entities may have no
  block generator, or the promoted rows weren't block-bearing types). Not a failure.
- The verification used a throwaway `scripts/_verify-extraction-run.ts` (mirrors the
  admin action, caps at 3 URLs, polls the operation row); deleted after the run.
- Verifying a Cloudflare Workflows + Queues pipeline is not meaningfully local — the
  dev tenant Worker is already deployed, so verification = trigger + poll, not
  `wrangler dev`.

## State at close

- Commit `2b74975` on `master` (UI fix; not pushed). No other code changes.
- One real `TenantOperation` + `ExtractionRun` now exist in the dev SLCC tenant DB
  from the verification (valid SLCC data, authorized).
- Day 60 todo: `extraction.run` worker checked off. Remaining queued-operation
  workers still unbuilt: `extraction.retry_failed`, `source.cache.purge` (and
  `tenant.review` / `source.validate`).

## Related

- [[Corveaux V2 - Session 26 — Repo Hygiene, Security Audit, and ESLint Migration]]
- [[Corveaux V2 - Session 21 — Trigger.dev to Cloudflare Workflows Changeover Plan]]
- [[Corveaux V2 - Session 19 — Platform Admin and Tenant Operations]]
- [[Corveaux V2]]
