---
type: daily
date: 2026-06-07
---

# 2026-06-07 — Session 20

## Focus

Started as a project-cleanliness scan, then turned into two compounding pieces of work: settling a naming philosophy for major architectural modules and applying it end to end — first to the module files themselves, then to every place the admin panel surfaces that vocabulary to an operator.

Also produced the forward plan for the Trigger.dev → Cloudflare Workflows changeover, captured separately as [[Corveaux V2 - Session 21 — Trigger.dev to Cloudflare Workflows Changeover Plan]] (created mid-session, numbered ahead since it documents *future* work).

## Work Completed

### 1. Project Scan and Lint Cleanup

Scanned the repo for cleanliness. Found and fixed six `@typescript-eslint/no-unused-vars` warnings in `promoter.ts` (now `archivist.ts`):

- Removed `tenantId` from `promoteRun` — the `db` client passed in already comes from `getTenantDb(payload.tenantId)`, so tenant scoping happens at the connection level and the param was redundant.
- Removed `extractionRunId`/`_policy` from `promoteRelationshipObservation` and `_extractionRunId`/`_policy` from `promotePolicyObservation` — verified against the Prisma schema that `Relationship` and `Policy` have no `extractionRunId` column, so these could never be persisted.
- Removed `_extractionRunId` from `promoteEventObservation`.

Updated all call sites: `src/trigger/extraction.ts`, `scripts/catalog-validation.ts`, `scripts/slcc-smoke-test.ts`.

### 2. Trigger.dev → Cloudflare Workflows Scoping

User confirmed they're committed to the eventual changeover and asked when to do it. Ran a scoping audit:

- Zero files use Trigger.dev realtime hooks (`subscribeToRun`, `useRealtimeRun`, etc.) anywhere in `src/`.
- The admin layer already reads its own DB rows (`ExtractionRun`, `TenantOperation`) — DB-as-source-of-truth, not Trigger.dev streams.
- Only two files import `@trigger.dev/sdk`: `src/trigger/extraction.ts` and `src/trigger/tenant-operations.ts`.
- Only three `.trigger()` call sites *appeared* to reach into the orchestration layer from `src/server/admin/actions.ts` at first count (the prep pass below found a fourth — two branches inside `retryTenantOperationAction` had been counted as one).

The migration surface is much smaller than feared. Recommendation: do the changeover before Day 60 tenant-generation work ramps further — every session spent building forward on Trigger.dev-specific UX (realtime subscriptions, metadata streaming) compounds the eventual rewrite cost faster than it compounds product progress. Full plan, prep checklist, and pilot sequencing documented in [[Corveaux V2 - Session 21 — Trigger.dev to Cloudflare Workflows Changeover Plan]].

### 3. Module Naming Philosophy

Discussed whether it makes sense to keep naming internal tooling the way Cartographer (the crawler) was named. Landed on a clear rule, captured in [[feedback_module_naming_convention]]:

> Codenames are reserved for **major modules** — the architectural nouns you'd point to on a system diagram (Cartographer, Archivist, Interpreter, Projector) — not for supporting/utility/plumbing code, which stays descriptively named.

Worked out the roster together:

- **Cartographer** — the crawler (already renamed in a prior session); maps institutional web structure
- **Interpreter** — formerly `extractor.ts`; reads raw source content and translates it into structured canonical observations via LLM extraction
- **Archivist** — formerly `promoter.ts`; commits PENDING observations to the canonical, time-versioned record (never deletes — closes out and supersedes)
- **Projector** — formerly `regenerator.ts`; named directly off the "One Reality. Many Projections." axiom — casts the canonical model onto rendered surfaces (content blocks), none of which feed back into the model
- **Architect** — not yet built (Day 60 work); the future end-to-end orchestrator that composes map → interpret → archive → project into a single "stand up a tenant" operation

The convention applied during renames: only the file/module identity changes (codename = filename); exported function names stay descriptive (`extractPage`, `promoteRun`, `crawlSource`, `regenerateBlocksForTenant`). Each renamed file got an identity doc-comment above its primary export, in the style of the original Cartographer comment — explaining the *role*, not the mechanics.

### 4. Module Renames

Performed the renames the user explicitly asked for:

- `src/lib/extraction/extractor.ts` → `src/lib/extraction/interpreter.ts` (`git mv`, tracked)
- `src/lib/extraction/promoter.ts` → `src/lib/extraction/archivist.ts` (`git mv`, tracked)
- `src/lib/content-blocks/regenerator.ts` → `src/lib/content-blocks/projector.ts` (plain `mv` — file was untracked/new this session, `git mv` refused with "not under version control")

Updated every import path across `src/trigger/extraction.ts`, `src/trigger/tenant-operations.ts`, `scripts/catalog-validation.ts`, `scripts/slcc-smoke-test.ts`.

### 5. Admin Panel Vocabulary Sweep

User asked to align admin-panel verbiage to the new module vocabulary — "instead of 'crawl' it should be 'map', etc." Confirmed scope as a full sweep across all four verbs (not just crawl→map), with the explicit constraint that underlying Prisma models, routes, DB enums, and stored `operationType` strings stay unchanged — display copy only.

Verb mapping applied across all 8 admin-panel files (`layout.tsx`, `page.tsx`, `extraction-runs/page.tsx`, `extraction-runs/[id]/page.tsx`, `sources/page.tsx`, `sources/[id]/page.tsx`, `tenants/[slug]/page.tsx`, `_components/operation-result.tsx`):

- **crawl → map**: "Crawl operations" → "Mapping operations", "Last Crawl" → "Last Mapping", "Run Crawl"/"Start Crawl" → "Run Mapping"/"Start Mapping", "Queue Crawl" → "Queue Mapping", "Crawl Errors" → "Mapping Errors", "Crawled" → "Mapped"
- **extract/extraction → interpret/interpretation**: "Extraction Runs" → "Interpretation Runs", "Extraction operations" → "Interpretation operations", "Run Extraction" → "Run Interpretation", "Queue Extraction" → "Queue Interpretation", "Extractable" → "Interpretable"
- **generate/regenerate/generated → project/projection/projected**: "Generate Tenant" → "Project Tenant", "Queue Generation" → "Queue Projection", "Generated" → "Projected"
- **promote/promotion/promoted → ?**: first pass landed on "Archive"/"Archived"/"Archiving" (matching the Archivist module name), but the user immediately flagged it — "archive" colloquially means *moving something out of active use*, the near-opposite of what the Archivist actually does (makes an observation canonical/active). Re-ran the verb choice as a question; user picked **"Canonize"** — it echoes the codebase's own "canonical model" vocabulary directly and removes the ambiguity. Final mapping: "Promoted" → "Canonized", "Promote Run" → "Canonize Run", "Queue Promotion" → "Queue Canonization", "Promote as Baseline"/"Baseline promoted" → "Canonize as Baseline"/"Baseline canonized".

The pipeline-step note on the tenant detail page now reads: `Create Tenant -> Add Source -> Run Mapping -> Run Interpretation -> Canonize -> Project Tenant -> Review` (preserving `-&gt;` HTML-entity escaping).

Note: the **module** stays named **Archivist** — that's a role/identity name (the keeper of the canonical record), not the verb describing its action. "Canonize" describes what the Archivist *does*; "Archivist" describes *what it is*. No conflict.

## Errors and Fixes

- `git mv` refused on `regenerator.ts` → `projector.ts` because the file was untracked (new this session) — used plain `mv` instead.
- A vault doc edit accidentally introduced a stray Chinese character ("The单 real variable") — caught and fixed.
- Two self-introduced JSX issues during the verbiage sweep, both caught by `tsc`/`next lint` before commit: a duplicated `{source.id ? (` line from an over-broad Edit match (TS1005), and an unescaped apostrophe (`react/no-unescaped-entities`) in new copy — fixed with `&rsquo;`.

## Verification

`npx tsc --noEmit -p tsconfig.json` and `npx next lint` both run clean (zero errors, zero warnings) after every batch of changes in this session — module renames, then the verbiage sweep, then the Canonize correction.

## Open Threads

- Trigger.dev → Cloudflare Workflows changeover: plan is written ([[Corveaux V2 - Session 21 — Trigger.dev to Cloudflare Workflows Changeover Plan]]); prep items #1 (`dispatchTenantOperation` seam — actually four call sites once the `retryTenantOperationAction` branches were untangled, commit `c8cf46a`) and #2 (migration scope catalog) were both completed later the same session — see Session 21's "Migration Scope Catalog" section. Only prep item #3 (hold the DB-as-source-of-truth line going forward) remains a standing rule rather than a one-time task.
- Architect (the Day 60 end-to-end tenant-generation orchestrator) remains unbuilt — the roster slot is reserved but the module doesn't exist yet.
