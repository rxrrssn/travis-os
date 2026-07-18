---
type: session
date: 2026-06-07
project: CorveauxV2
---

# 2026-06-07 — Corveaux V2 Session 19

Full project session note:

- [[Corveaux V2 - Session 19 — Platform Admin and Tenant Operations]]

## Summary

Built the Day 60 platform admin foundation and moved it from read-only reporting into operational controls.

Major outcomes:

- Added `/admin` operator cockpit.
- Added tenant, source, extraction-run, and operation views.
- Added platform tables for `TenantSource` and `TenantOperation`.
- Added tenant/source/extraction controls as durable operation records.
- Tightened admin auth so platform admin access derives from canonical identity/person plus `platform.operator`, not from `audienceContext` alone.
- Added the first worker-backed operation: `generate_tenant`.
- Extracted shared content-block regeneration into `src/lib/content-blocks/regenerator.ts`.
- Added operation result visibility for `generate_tenant`.
- Added manual retry for failed operations.
- Added the tenant-level manual pipeline: Create Tenant → Add Source → Run Crawl → Run Extraction → Promote → Generate Tenant → Review.
- Clarified the audit trail shape: admin actions are durable `TenantOperation` records; canonical actor/request metadata is still a hardening follow-up.
- Added the second worker-backed operation: `source.crawl`, which runs Cartographer, updates `TenantSource` health/metadata, and renders crawl counts in operation results.
- Cancelled two stale zero-observation extraction runs after confirming no active extraction process existed.

## Current Operator Capability

Worker-backed:

- `generate_tenant`
- `source.crawl`

Queued/audited, worker pending:

- `tenant.review`
- `source.validate`
- `source.cache.purge`
- `extraction.run`
- `extraction.retry_failed`
- `extraction.promote_run`

## Verification

- `npx tsc --noEmit` passes.
- `npm run build` passes.
- Dev server restarted cleanly at `http://localhost:3000`.

## Next

Best next worker increment:

1. `extraction.run`
2. `extraction.retry_failed`
3. `source.cache.purge`
