---
type: session
project: corveaux-v2
session: 21
date: 2026-06-07
tags: [corveaux, infrastructure, background-jobs, trigger-dev, cloudflare-workflows, migration, planning]
---

# Corveaux V2 - Session 21 — Trigger.dev to Cloudflare Workflows Changeover Plan

> [!status] Partially executed in Session 22
> Platform provisioning and tenant generation moved to Cloudflare Workflows on 2026-06-09. The larger extraction pipeline remains on Trigger.dev pending Cloudflare-native fan-out/queue implementation and SLCC corpus revalidation. See [[Corveaux V2 - Session 22 — Cloudflare and Neon Deployment Closeout]].

## Focus

Originally captured as the forward plan during a Session 20 scan/cleanup conversation when the user confirmed a long-standing instinct: Corveaux should eventually move off Trigger.dev and onto Cloudflare Workflows, and wanted to know *when* to start before sunk orchestration work made the changeover too expensive. The provisioning and generation portions were executed in Session 22; extraction remains pending.

This supersedes the operational half of [[ADR-011 — Background Job Platform]] (Trigger.dev as the chosen platform). The architectural reasoning in that ADR — durable, long-running, observable batch work as the platform's dominant pattern — still holds; only the execution substrate is changing.

## Why Now, Not Later

The extraction pipeline just closed the Day 30 gate and is relatively stable — a bounded, well-understood rewrite target. Day 60 is when the tenant-generation pipeline (the actual product) gets built out at scale, and that is exactly the layer that would otherwise get deeply wired to Trigger.dev-specific UX patterns (realtime subscriptions, metadata streaming for live admin progress).

The recommendation: do the changeover **before** Day 60 orchestration work ramps further, while the surface is "extraction pipeline + a thin slice of tenant-ops," not "extraction + multi-tenant generation + admin dashboards all subscribing to Trigger.dev streams." Every session spent building forward on Trigger.dev primitives compounds the eventual rewrite cost faster than it compounds feature progress, because the coupling isn't just "more tasks to port" — it's "more UI/UX assumptions baked around capabilities Workflows doesn't have an equivalent for."

## Scoping Audit (done during the Session 20 scan)

The actual coupling turned out to be much smaller than feared — the project was already, mostly by good instinct, built on a portable seam:

- **Zero files** use Trigger.dev's realtime hooks or `runs.subscribeToRun`/`useRealtimeRun` — checked directly, none exist anywhere in `src/`.
- The admin UI (`src/server/admin/data.ts`, `src/server/admin/actions.ts`) reads its own database rows — `ExtractionRun` and `TenantOperation` tables with DB-stored `metadata` JSON columns — not Trigger.dev streams. This DB-as-source-of-truth pattern is exactly what keeps the orchestration substrate swappable.
- Only **two files** import `@trigger.dev/sdk` at all: `src/trigger/extraction.ts` (~650 lines — multiple tasks, schedules, queues, retries, waits) and `src/trigger/tenant-operations.ts` (task + `tenantOperationWorker`).
- The only places the rest of the app reaches into the orchestration layer directly are three `tenantOperationWorker.trigger({ operationId })` calls inside `src/server/admin/actions.ts` (around lines 174, 278, 471/475).

## What To Do Before the Changeover Sessions Start

1. **Wrap the three remaining `.trigger()` call sites.** Replace the direct `tenantOperationWorker.trigger(...)` calls in `admin/actions.ts` with a small internal `dispatchTenantOperation(operationId)` function living outside the trigger module. This closes the last seam — once wrapped, the entire orchestration layer becomes swappable behind one function, and the actual migration sessions can focus purely on `extraction.ts` / `tenant-operations.ts` internals.
2. **Catalog `extraction.ts` and `tenant-operations.ts` as the migration scope document.** List, task by task, which Trigger.dev features each one actually uses — `retry`, `queue`, `wait.for`, `triggerAndWait`/`batchTriggerAndWait`, `schedules.task`, `metadata.set`, `tags`. That inventory is what scopes the Cloudflare Workflows research (which primitives map cleanly to `step.do`/`step.sleep`, and which — like fan-out batch triggering, central to [[ADR-014 — Fan-out Scalability and batchTriggerAndWait]] — need a deliberate replacement design).
3. **Hold the DB-as-source-of-truth line.** Any new admin/operations feature built between now and the changeover should keep writing status/progress to `ExtractionRun`/`TenantOperation` rows rather than reaching for `metadata.set()` or realtime subscriptions. Treat any urge to add a realtime hook as a stop-and-reconsider signal — it is the one pattern that would meaningfully raise the cost of this plan.

## Pilot Sequencing for the Actual Changeover

When the changeover sessions begin:

1. Port `tenantOperationWorker` first — smallest, most isolated, no scheduled/cron complexity. Use it to validate the retry/queue/step mapping against Cloudflare Workflows' step model.
2. Only then take on `extraction.ts` — the larger, gate-validated pipeline — informed by what the pilot surfaced.
3. Re-validate the full extraction pipeline against the Day 30 gate corpus before calling the migration complete; >90% accuracy on material facts is the bar that matters, not parity of implementation details.

## Estimate

Roughly 4-6 focused sessions for the full rewrite + re-validation, assuming the prep above is done first. The real variable is not task count but how much *new* realtime/UI coupling accrues between now and when the changeover sessions actually start — which is precisely what the prep work above is designed to prevent.

## Migration Scope Catalog (prep item #2 — completed Session 20)

Full feature-by-feature inventory of every Trigger.dev primitive actually used in the two task files, gathered by grep against `@trigger.dev/sdk` usage patterns. This is the scope document the pilot sequencing above should work from — it tells you exactly which Cloudflare Workflows primitives need a mapping before the rewrite can start.

### `src/trigger/tenant-operations.ts` — the pilot candidate

One task, minimal surface:

- `tenantOperationWorker` (`tenant-operation.worker`) — `maxDuration: 1800`, no `retry`, no `queue`, no `triggerAndWait`, no `batchTrigger`, no `wait`, no `schedules`, no `metadata`, no `tags`, no `idempotencyKeys`. Plain `task()` with a `run` body that branches on `operationType` and calls `regenerateBlocksForTenant` / `crawlSource` directly.

This is as close to a bare async function as a Trigger.dev task gets — confirms the plan's call to port it first. Whatever step/retry model Cloudflare Workflows uses, this is the cheapest place to learn it.

### `src/trigger/extraction.ts` — the real migration target

Six tasks, every non-trivial Trigger.dev primitive in the codebase lives here:

| Task (`id`) | `maxDuration` | `retry` | `queue` | Fan-out / wait primitives |
|---|---|---|---|---|
| `fullCatalogRun` (`extraction.full-catalog-run`) | 86400 | — | — | 3x `triggerAndWait` (sequential phase gating: courses -> programs -> documents) |
| `extractionRun` (`extraction.run`) | 3600 | — | — | `batchTriggerAndWait` in shards of 20 (`SHARD_SIZE`) against `extractPage_task`, each item carrying an `idempotencyKeys.create()` key with `idempotencyKeyTTL: "24h"`; 1x `triggerAndWait` against `promote_task` |
| `extractPage_task` (`extraction.extract-page`) | 600 | `{ maxAttempts: 5, factor: 2, minTimeoutInMs: 30_000, maxTimeoutInMs: 300_000 }` | `{ concurrencyLimit: 15 }` | — |
| `documentRun` (`extraction.document-run`) | 7200 | — | — | `batchTriggerAndWait` against `extractDocument_task`; 1x `triggerAndWait` against `promote_task` |
| `extractDocument_task` (`extraction.extract-document`) | — | `{ maxAttempts: 3, factor: 2, minTimeoutInMs: 30_000, maxTimeoutInMs: 180_000 }` | — | — |
| `promote_task` (`extraction.promote`) | 300 | — | `{ concurrencyLimit: 1 }` | — |
| `regenerateBlocks_task` (`extraction.regenerate-blocks`) | 1800 | — | — | 1x `triggerAndWait` |

Also present: `idempotencyKeys.create()` (per-page idempotency on the `extractPage_task` batch — backlog item #14, Session 18), `logger` (structured logging throughout). **Not present anywhere in either file:** `schedules.task`/cron, `wait.for`/`wait.until`, `metadata.set`/`increment`/`append`, `tags.add`, `debounce`, realtime subscriptions (`subscribeToRun`, `useRealtimeRun`).

### What this confirms

- The fan-out pattern central to [[ADR-014 — Fan-out Scalability and batchTriggerAndWait]] is the single highest-value primitive to map — `batchTriggerAndWait` appears 3x (sharded page extraction, document batch, and implicitly via the phase-gating `triggerAndWait` chain in `fullCatalogRun`). Whatever Workflows offers for parallel sub-workflow fan-out with result aggregation is the crux of the rewrite.
- `concurrencyLimit` queues (15 on page extraction, 1 on promotion — a deliberate serialization to avoid promotion races) need a direct Workflows-native equivalent or an explicit redesign; this is the second-highest-value mapping question.
- The exponential-backoff `retry` configs on `extractPage_task`/`extractDocument_task` are the clearest 1:1 candidates — most workflow engines have a comparable per-step retry policy.
- **No cron, no waits, no metadata streaming, no tags exist anywhere in this codebase.** The migration surface really is just: tasks, fan-out/triggerAndWait, queues, retries, and idempotency keys. Four of the six "Open Questions" below are now answered or reduced to "confirm Workflows has X" rather than "design a replacement for X."

## Open Questions for the Changeover Sessions

Narrowed by the scope catalog above — three of these are now "confirm Workflows has a clean equivalent," not "design a replacement from scratch":

- **Fan-out + wait (highest priority):** what is the Workflows-native equivalent of `batchTriggerAndWait` for the sharded page-extraction / document-batch / phase-gating patterns ([[ADR-014 — Fan-out Scalability and batchTriggerAndWait]])? This is the one primitive that appears repeatedly and has no obvious 1:1 mapping in most workflow engines — likely the long pole of the rewrite.
- **Concurrency queues:** does Workflows have a direct equivalent to `queue: { concurrencyLimit: N }` (15 on page extraction, 1 — deliberate serialization — on promotion), or does that need an explicit redesign (e.g. external rate limiting / sequential step chaining)?
- **Per-step retry:** how does Workflows' retry model map onto the existing `{ maxAttempts, factor, minTimeoutInMs, maxTimeoutInMs }` configs on `extractPage_task`/`extractDocument_task`? Most engines have a comparable per-step policy — likely a clean port.
- **Idempotency:** does Workflows have a direct equivalent to `idempotencyKeys.create()` + `idempotencyKeyTTL`, or does idempotency need to move into application-level checks (e.g. the existing `findFirst`-before-write dedup pattern already used in `archivist.ts`)?

Confirmed **out of scope** — none of these exist anywhere in the current codebase, so no replacement design is needed: `schedules.task`/cron, `wait.for`/`wait.until`, `metadata.set`/`increment`/`append`, `tags.add`, `debounce`, realtime subscriptions (`subscribeToRun`, `useRealtimeRun`). If a future session is tempted to add any of these before the changeover, that's the stop-and-reconsider signal named in prep item #3 above.

## Execution Update (2026-06-09)

Completed:

- Added the orchestration dispatch seam.
- Ported platform tenant provisioning to Cloudflare Workflows.
- Ported `generate_tenant` to a tenant-scoped Cloudflare Workflow.
- Validated a real `generate_tenant` run end to end, including authenticated callback and durable platform operation completion.
- Kept Corveaux database rows as the source of truth for operation state.

Still pending:

- Port page/document extraction fan-out.
- Replace Trigger.dev queue concurrency semantics.
- Preserve per-page idempotency and retry behavior.
- Re-run the full SLCC validation corpus before declaring extraction migration complete.
