---
type: daily
date: 2026-06-07
---

# 2026-06-07 — Session 19

## Focus

Moved Corveaux V2 from extraction-pipeline closeout into the Day 60 foundation: a platform operator cockpit for tenant operations.

The core user framing was correct: without admin, generated tenants become invisible machinery. This session built the first operator surface and then pushed it beyond read-only reporting into operational controls and a first real `TenantOperation` worker.

## Starting Context

At session start, the repo and vault were scanned. Current state from memory:

- Day 30 gate was already formally closed.
- Day 60 generated-tenant work was unblocked.
- ADR-018 was active and implemented.
- Bugs 16–19 were fixed/verified.
- The remaining named follow-on was optional pre-ADR-018 backfill/reshape for legacy course/program/policy records.

The repo was already dirty from Session 18 work. I treated that as user-owned state and only layered this session’s changes on top.

## Work Completed

### 1. Platform Admin Route Tree

Built the first protected admin route tree:

- `/admin`
- `/admin/tenants`
- `/admin/tenants/new`
- `/admin/tenants/[slug]`
- `/admin/extraction-runs`
- `/admin/extraction-runs/[id]`
- `/admin/sources`
- `/admin/sources/[id]`

The tenant detail path was corrected during the session:

- Keep plural `/admin/tenants/...`
- Use tenant `slug`, not tenant `id`
- Final shape: `/admin/tenants/{slug}`

### 2. Admin Data Layer

Added `src/server/admin/data.ts` to centralize admin read models:

- Tenant summaries
- Extraction run summaries and details
- Failed URL extraction
- Observation status/type breakdowns
- Recent conflicts
- Source health
- Tenant operation history

Source health initially derives from extraction-run metadata and R2 cache prefixes, then later incorporates the platform `TenantSource` table added this session.

### 3. Admin Actions

Added `src/server/admin/actions.ts` with server actions for operator controls.

Tenant actions:

- Create tenant
- Edit tenant
- Deactivate tenant
- Queue/generate tenant

Source actions:

- Add source
- Validate source
- Queue crawl
- Queue extraction
- Queue cache purge

Extraction actions:

- Attach validation result
- Mark Day 30 closed
- Promote as baseline
- Queue promote run
- Queue retry failed URLs

Operation actions:

- Retry failed tenant operations

Most heavy operations are intentionally queued as `TenantOperation` records, not executed inline. `generate_tenant` became the first operation with a real worker.

### 4. Platform Operations Schema

Extended the platform schema with two platform-level operator tables:

- `TenantSource`
- `TenantOperation`

Migration:

- `prisma/platform-migrations/20260608000000_add_platform_operations/migration.sql`

Applied successfully to local dev:

- Database: `corveaux_dev`
- Schema: `corveaux_platform`

Rationale: sources and operations are platform/operator concerns. Canonical institutional facts remain tenant-scoped.

### 5. Admin Styling

Added the first admin UI theme in `src/app/globals.css`.

This is not yet a formal design system. It is:

- CSS variables for color tokens
- Global admin classes
- Server components using those classes directly

Components/styles added:

- Admin shell/sidebar/main layout
- Metric/detail cards
- Admin panels
- Tables
- Forms
- Status pills
- Source and operation rows
- Operation result display
- Destructive button variant
- Responsive layout

### 6. Auth Tightening

Found and fixed an important auth coupling issue.

Problem: admin access was keyed to `audienceContext`, which is a projection. That allowed auth to drift away from canonical Tenant Zero identity/person linkage.

Fix:

- `/admin` now requires:
  - `identityEntityId`
  - `personEntityId`
  - `authorityScopes` includes `platform.operator`
- `audienceContext` is now derived from those canonical claims, not trusted directly.
- Added `requirePlatformOperator()` server-side guard.
- Admin layout now enforces the same guard after middleware.

Files:

- `src/middleware.ts`
- `src/lib/auth/config.ts`
- `src/lib/auth/admin.ts`
- `src/app/admin/layout.tsx`

### 7. Entity Service Partial-Index Fix

`npx tsc --noEmit` exposed existing errors in `src/server/institutional/entity.service.ts`.

Root cause: the service still used `canonicalKey` as a Prisma unique input even though canonical-key uniqueness is now enforced by a partial index on active rows.

Fix:

- `upsert()` now uses `findFirst({ canonicalKey, validTo: null })`
- Creates if missing
- Updates by `id` if active row exists
- `findByCanonicalKey()` now uses `findFirst({ canonicalKey, validTo: null })`

This aligns the service with the known partial-index pattern used elsewhere.

### 8. TenantOperation Worker

Added the first worker-backed operation:

- `src/trigger/tenant-operations.ts`
- task id: `tenant-operation.worker`
- first handled operation type: `generate_tenant`

Behavior:

1. Loads `TenantOperation`
2. Marks it `RUNNING`
3. If `operationType === "generate_tenant"`:
   - opens the tenant DB
   - regenerates projection content blocks for active tenant entities
   - writes `{ entityCount, blocksWritten, generatedAt }` into `TenantOperation.result`
   - marks operation `COMPLETED`
4. On failure:
   - marks operation `FAILED`
   - stores error in `result`

The admin `Generate Tenant` control now:

- creates a `generate_tenant` operation
- triggers `tenantOperationWorker`

### 9. Shared Content Block Regenerator

Extracted block regeneration out of `src/trigger/extraction.ts` into:

- `src/lib/content-blocks/regenerator.ts`

Exports:

- `regenerateBlocksForExtractionRun()`
- `regenerateBlocksForTenant()`

`extraction.regenerate-blocks` now uses the shared regenerator, and `generate_tenant` uses the all-tenant regeneration mode.

### 10. Operation Result Visibility

Added operation result display in admin:

- `src/app/admin/_components/operation-result.tsx`

For `generate_tenant`, the admin UI now shows:

- operation type
- status: `RUNNING`, `COMPLETED`, `FAILED`
- `entityCount`
- `blocksWritten`
- `generatedAt`
- error if failed

Rendered on:

- tenant detail recent operations
- source detail recent operations

### 11. Manual Retry for Failed Operations

Added the operator recovery loop:

`FAILED → inspect error → retry → COMPLETED`

Behavior:

- Failed operations render a `Retry Operation` button.
- Retry resets status to `PENDING`.
- Clears `completedAt`.
- Stores `retriedAt` / `retriedBy` in result.
- For `generate_tenant`, triggers the worker again.

This completes the first true operator story.

### 12. Tenant-Level Manual Pipeline

Added the missing tenant detail pipeline so the admin pane now exposes the whole manual operating sequence in one place:

1. Create Tenant
2. Add Source
3. Run Crawl
4. Run Extraction
5. Promote
6. Generate Tenant
7. Review

Implementation details:

- The pipeline lives on `/admin/tenants/[slug]`.
- Add Source now returns to the tenant cockpit when submitted from tenant detail.
- Crawl, extraction, and promote controls are rendered per source.
- Generate Tenant and Review are tenant-wide controls.
- Tenant detail revalidates after source/extraction/promote operation requests so recent operations become visible from the same cockpit.
- Review is recorded as `tenant.review` in `TenantOperation`; it is queued/audited but not yet worker-backed.

This closes the gap between read-only reporting and a complete manual operator path.

### 13. Audit Trail Shape

Audit trail for admin actions is currently handled through durable `TenantOperation` records.

Each operator action records:

- tenant
- optional source
- operation type
- status
- label
- payload
- result
- created/updated/completed timestamps

Completed synchronous actions, such as tenant edits or source adds, write `COMPLETED` operations immediately. Long-running or not-yet-worker-backed actions write `PENDING` operations first. Worker-backed actions, currently `generate_tenant` and `source.crawl`, transition through `PENDING → RUNNING → COMPLETED` or `FAILED` and store operational result/error data.

### 15. Source Crawl Worker

Added the second real `TenantOperation` worker handler:

- operation type: `source.crawl`
- implemented in `src/trigger/tenant-operations.ts`
- triggered by `requestStartCrawlAction`
- retryable through the existing failed-operation retry flow

Behavior:

1. Loads the source attached to the operation.
2. Derives crawl patterns from source metadata or known catalog URL shape.
3. Runs the cache-aware Cartographer crawler.
4. Stores pages in the R2 crawl cache through the existing crawl storage path.
5. Updates `TenantSource` health:
   - `lastCrawledAt`
   - `discoveredUrlCount`
   - `cacheCount`
   - `wafErrorCount`
   - `metadata.lastCrawl`
6. Writes operation result:
   - `discoveredUrlCount`
   - `extractionUrlCount`
   - `cacheCount`
   - `documentLinkCount`
   - `errorCount`
   - `crawledAt`

The operation result component now renders crawl results in the admin UI.

Current limitation: there is not yet a dedicated actor column or immutable append-only audit-event table. For now, actor/source is captured in operation payload/result values such as `source: platform-admin` or `retriedBy: platform-admin`. A later audit hardening pass should add canonical actor identity, request metadata, and append-only audit events.

### 14. Stale Extraction Cleanup

The user asked whether extractions were running.

Checks performed:

- Queried tenant DB for `PENDING`/`RUNNING` extraction runs.
- Queried platform DB for active tenant operations.
- Inspected local processes to distinguish active extraction workers from old Trigger MCP/log-monitor processes.

Found:

- No live extraction process.
- No active tenant operations.
- Two stale `RUNNING` extraction rows from earlier Session 15/16 era:
  - `8b056729-b425-48e6-a842-7269900e383e`
  - `b8cd6da3-ec3b-43d9-8a8c-1fe3510fdf15`

Both had:

- status `RUNNING`
- 0 observations
- 0 promoted
- no updates after creation

Per user instruction, both were marked `CANCELLED` with metadata:

- `cancelledBy: platform-admin`
- reason: stale zero-observation `RUNNING` row; no active extraction process found

## Decisions

### Platform Admin Comes Before Generated Tenant

Confirmed sequence:

Day 30 closeout → Platform Admin → Tenant creation flow → Generated tenant → Role-aware rendering

Reason: generated tenants need an operator cockpit before they become production-survivable. Admin is not polish; it is the operational substrate.

### Tenant Operations Are Durable Records

Operator commands should create durable `TenantOperation` records before any heavy work runs.

This gives Corveaux:

- audit trail
- status tracking
- result visibility
- retry semantics
- room for async workers

### `generate_tenant` Is the First Real Worker Operation

Other controls can queue operations now, but `generate_tenant` is the first operation actually handled by a Trigger.dev task.

This is the correct first worker because it bridges the canonical model into generated tenant projections.

### Admin Authorization Must Be Canonical

Admin access must derive from canonical Tenant Zero graph state:

- Entra account → identity entity
- identity entity → person entity
- person entity → platform authority

`audienceContext` is a projection and cannot be the source of authority.

## Verification

Ran repeatedly through the session:

- `npx tsc --noEmit`
- `npm run build`

Final state:

- TypeScript passes.
- Production build passes.
- Dev server restarted cleanly at `http://localhost:3000`.
- Existing warnings remain in `src/lib/extraction/promoter.ts` for unused variables; not introduced by this session.

## Current Admin Capability Summary

Inside `/admin`, the operator can now:

Tenant:

- list tenants
- create tenant
- view tenant by slug
- edit tenant
- deactivate tenant
- use the tenant-level manual pipeline:
  - create tenant
  - add source
  - run crawl
  - run extraction
  - promote
  - generate tenant
  - review
- queue/run `generate_tenant`
- inspect operation result
- retry failed operations

Source:

- list sources
- add source
- view source
- queue validation
- queue crawl
- queue extraction
- queue cache purge
- inspect cache/WAF/coverage health

Extraction:

- list extraction runs
- view run details
- inspect failed URLs
- inspect observation breakdowns
- inspect conflicts
- attach validation
- mark Day 30 closed
- mark baseline
- queue retry failed URLs
- queue promote run

Actually worker-backed:

- `generate_tenant`
- `source.crawl`

Queued/audited but not yet worker-backed:

- `tenant.review`
- `source.validate`
- `source.cache.purge`
- `extraction.run`
- `extraction.retry_failed`
- `extraction.promote_run`

## Files Changed / Added

Key new files:

- `src/app/admin/**`
- `src/app/admin/_components/operation-result.tsx`
- `src/server/admin/data.ts`
- `src/server/admin/actions.ts`
- `src/lib/auth/admin.ts`
- `src/lib/content-blocks/regenerator.ts`
- `src/trigger/tenant-operations.ts`
- `prisma/platform-migrations/20260608000000_add_platform_operations/migration.sql`

Key modified files:

- `prisma/platform.schema.prisma`
- `src/app/globals.css`
- `src/middleware.ts`
- `src/lib/auth/config.ts`
- `src/server/institutional/entity.service.ts`
- `src/trigger/extraction.ts`

## Open Follow-Up

Next best increment:

1. Worker for `extraction.run`
2. Worker for `extraction.retry_failed`
3. Worker for `source.cache.purge`
4. Add canonical actor/request metadata to the `TenantOperation` audit trail
5. Operation detail page, if operation lists become too dense
6. Formalize admin UI components into reusable React primitives once the control vocabulary stabilizes

## Related

- [[Corveaux V2]]
- [[ADR-015 — Rendering Architecture]]
- [[ADR-018 — Canonical Attribute Standardization and Relationship-Attached Policies]]
- `project_stage` memory
- `known_bugs` memory
