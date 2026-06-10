---
type: session
project: corveaux-v2
session: 24
date: 2026-06-09
tags: [corveaux, tenant-admin, content-review, canonical-editor, effective-dating, projector]
---

# Corveaux V2 - Session 24 — Tenant Content Review and Canonical Editor

## Focus

Built the first tenant-scoped admin surface: `/t/[tenantSlug]/admin/content`, a
review queue and canonical editor for `ContentBlock` rows. Per CLAUDE.md ("the
institutional model is canonical... no content block is canonical"), the editor does
not let reviewers touch projections directly — it edits the underlying
`Entity`/`Relationship` canonical records, then re-casts the projection via the
Projector.

Implemented in risk order per user direction ("build by risk first... Highest
first"): schema migration first (touches canonical data model), then services,
middleware, projector export, server actions, data layer/config, UI routes,
verification.

## What shipped

1. **Schema migration (additive)** — `Entity` and `Relationship` gain
   `effectiveFrom`/`effectiveTo`/`catalogYear` + supporting indexes. See
   [[ADR-021 — Effective Dating on Entity and Relationship]] for the full rationale,
   in particular the **`validTo` (system record dead) vs `effectiveTo` (institutional
   period ended, row stays live)** distinction. Migration
   `20260609040000_add_entity_relationship_effective_dating` applied to both
   `corveaux` and `slcc` dev tenant databases, verified via direct
   `information_schema.columns` inspection.
2. **Service layer** — `entity.service.ts` / `relationship.service.ts` gained the
   three effective-dating fields on `create`/`upsert`/`createIfAbsent`, plus a new
   `updateEffectiveDates(id, { effectiveFrom, effectiveTo, catalogYear })` on each.
3. **Middleware** — `/t/[tenantSlug]/admin/*` now requires `platform.operator`, same
   gate as `/admin` (`isTenantAdminRoute` regex added alongside `isAdminRoute`).
4. **Projector** — exported `regenerateBlocksForEntity(db, entityId,
   sourceRunOrOperationId)`, a thin wrapper over the existing per-block-type
   `regenerateBlock` that looks up the entity's type and regenerates all its block
   types. Reuses existing status semantics for free: DRAFT stays DRAFT, PUBLISHED
   flips to REVIEW, and `generatedAt` is always bumped — which becomes the
   optimistic-concurrency token for publish.
5. **Canonical attribute field config** — `src/config/canonical-attribute-fields.ts`
   maps ADR-018's fixed `program`/`course` attribute sets to editable field configs
   (with textarea/number types); other entity types fall back to a generic
   key/value list derived from `Object.keys(attributes)`.
6. **Data layer** (`src/server/tenant-admin/data.ts`) — `listContentBlocksForReview`,
   `getContentBlockDetail` (derives canonical key from block, loads entity +
   active `fromRelationships`/`toRelationships`), `searchEntities` for the
   relationship-target picker.
7. **Server actions** (`src/server/tenant-admin/actions.ts`, all `"use server"`,
   all audit-then-`revalidatePath`):
   - `updateEntityAttributesAction` — merges posted `attr_*` fields through
     `normaliseAttributeKeys`, sets effective-dating fields, regenerates blocks,
     writes `tenant_entity_attributes_updated` audit event.
   - `addRelationshipAction` — resolves target by `canonicalKey`, creates the
     relationship via `createIfAbsent` with effective-dating fields.
   - `updateRelationshipEffectiveDatesAction` — the "this fact's catalog period
     ended" path (`effectiveTo`), distinct from...
   - `expireRelationshipAction` — "Supersede / Mark Record Invalid" (`validTo`),
     deliberately not named "expire" so reviewers don't reach for it to end an
     institutional period.
   - `publishContentBlockAction` / `returnToDraftAction` — both check a hidden
     `expectedGeneratedAt` against the current `ContentBlock.generatedAt`; mismatch
     redirects with `?error=stale_review` instead of publishing over a since-changed
     projection.
8. **UI routes** — `/t/[tenantSlug]/admin/layout.tsx` (thin shell, reuses
   `.admin-main`, not the platform `.admin-shell` grid), `/admin/content` (review
   queue with status filter links), `/admin/content/[id]` (full editor: current
   projection via `ContentBlockView`, read-only canonical-entity panel,
   attributes+effective-dating form, outgoing/incoming relationship tables each with
   inline "Update Dates" + "Supersede / Mark Record Invalid", "Add Relationship" form,
   "Find Entity" search).

## Verification

- `npx tsc --noEmit`, `npx next lint`, `npm run build`, `npm run cf:typecheck` all
  clean.
- Migration applied and verified on both dev tenant DBs (corveaux local Postgres,
  slcc Neon).
- Confirmed headlessly via `curl`: unauthenticated requests to
  `/t/slcc/admin/content` and `/admin` both 307-redirect to `/login` — the shared
  `platform.operator` gate covers the new tenant-admin namespace.
- **Not yet verified**: the full authenticated walkthrough (attribute edit +
  effective-dating round trip, add/update/supersede relationship, publish with fresh
  vs stale `expectedGeneratedAt`, audit events written per mutation, 403-not-redirect
  for an authenticated non-operator). This requires a signed-in platform-operator
  browser session and was not exercised this session — flagged as the first thing to
  do manually (or via a Playwright script) before relying on this editor for real
  SLCC content review.

## Note on memory continuity

This memory file (`project_stage.md`) had no entries for Sessions 21-23 (Trigger.dev
→ Cloudflare Workflows changeover plan, Cloudflare/Neon deployment closeout, GitHub
deployment pipeline + staging stabilization) before this session — those exist as
vault session notes but were not propagated into project memory. Not reconstructed
here (out of scope for this session); flagged so a future session can backfill if
the gap matters.

## How to apply

Future canonical-editing UI (tenant-admin or platform-admin) should follow this
session's pattern: edit `Entity`/`Relationship`, call `regenerateBlocksForEntity`,
never write to `ContentBlock.content` directly. The `validTo`/`effectiveTo`
distinction from ADR-021 applies anywhere institutional periods are edited, not just
this editor. Before using `/t/[tenantSlug]/admin/content` for real review work,
complete the authenticated walkthrough listed above.
