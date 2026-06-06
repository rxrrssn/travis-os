---
type: daily
date: 2026-06-05
---

# 2026-06-05 — Session 03: Canonical Schema and Tenant Zero

## Focus

Ontology validation, schema architecture, and full canonical layer implementation.

## Tasks

- [x] Ontology validation across all institutional domains (SIS, ERP, ITSM, CRM, Housing, IAM, HR, Finance)
- [x] Design and validate ADR-012 (Canonical Schema Architecture)
- [x] Design and validate ADR-013 (Canonical Type Registry)
- [x] Implement two-schema Prisma architecture (platform + tenant)
- [x] Run platform migration (`init_platform`)
- [x] Run tenant migration (`init_canonical_model`)
- [x] Generate both Prisma clients
- [x] Create platform seed (Tenant Zero registration)
- [x] Create Tenant Zero seed (Corveaux org, Travis person, Founder position, relationships, ontology config)
- [x] Update `src/lib/db.ts` to platform client
- [x] Create `src/lib/tenant-db.ts`
- [x] Create four institutional services (entity, relationship, event, policy)
- [x] Write ADR-012 and ADR-013 to vault
- [x] Write session note
- [x] Design ExtractionObservation model (canonicalKey, observedType, payload, citationText, promotedRecordId, promotedRecordType)
- [x] Update ExtractionRun counters: observationCount, promotedCount, conflictCount (removed entityCount)
- [x] Migrate ExtractionObservation (`20260606030049_add_extraction_observation`)
- [x] Completely revise ContentBlock model — dependency graph model replacing single-entity FK
- [x] Manually write and apply ContentBlock migration with 3 GIN indexes (`20260606031500_revise_content_blocks`)
- [x] Write complete extraction pipeline spec to vault (`specs/extraction-pipeline-spec.md`)
- [x] Write complete content block schema spec to vault (`specs/content-block-schema.md`)
- [x] Write TypeScript types for content blocks (`src/types/content-blocks.ts`)

## Decisions

- **Three identifier layers** on every entity: `id` (internal PK), `platformId` (public Corveaux ID), `canonicalKey` (natural dedup key)
- **Dedicated `entity_identifiers` table** — institution-specific IDs (student_id, employee_id, entra_object_id) are NOT stored in `entity.attributes`
- **`TenantOntologyField` with `sourceType`/`sourcePath`** — fields resolve from attribute, identifier, relationship, relationship_chain, event_latest, policy_evaluation
- **`TenantOntologyIdentifierType`** — institutions define their identifier vocabulary as data, not schema
- **No `tenant_id` on canonical tables** — corrected mid-session after vault alignment check. ADR-010 governs this.
- **TypeScript constants are the V2 type registry** — DB metadata table deferred to V3
- **ExtractionRun = provenance only** — tells where a fact came from; does not version canonical state
- **Temporal canonical updates** — close old record (`validTo = now()`), create new record; never destructive overwrite
- **Source precedence is a Policy record** — `policyType: "source_precedence"`, not hardcoded extraction logic
- **ExtractionObservation as first-class layer** — raw extracted claim, immutable, sits between run and canonical
- **`promotedRecordId` + `promotedRecordType`** — generic soft references, not `promotedEntityId`; covers all canonical primitive types
- **Conflicts via InstitutionalEvent** — post-promotion conflicts surface as `InstitutionalEvent("extraction_conflict_detected")`; not stored in `entity.attributes`
- **Block identity: three identifiers** — `id`, `platformId`, `canonicalKey` (`{blockType}:{source-entity-canonical-key}`); stable across regenerations
- **Block dependencies as JSONB** — `{entities[], relationships[], policies[]}` with PostgreSQL `@>` containment for regeneration queries
- **Rendering contexts** — `renderingContexts: string[]` for targeting; Policy governs field-level visibility within context (Hybrid Option C)
- **Block regeneration: stored projections, event-driven** — previously PUBLISHED blocks revert to REVIEW after regeneration

## Wins

- Full ontology validation: all institutional domains (SIS, HR, ITSM, CRM, housing, parking, IAM, finance, academic) pass with five canonical primitives and zero special-case tables
- Platform DB: 1 table. Tenant DB: 10 tables. No `tenant_id` on any tenant table.
- Both migrations applied cleanly. Both seeds ran. Verification query confirmed all expected records.
- TypeScript compiles with zero errors across all service files and db clients.
- Corveaux Must Run Corveaux: Travis Hornbuckle person entity, Corveaux org entity, Founder & CEO position entity — all in Tenant Zero DB.
- ExtractionObservation model finalized — clean separation between raw observation, promoted canonical fact, and conflict review event
- ContentBlock model rebuilt from scratch around dependency graph — no more Entity FK, full provenance/governance fields, GIN-indexed JSONB for regeneration queries
- Complete extraction pipeline spec and content block schema spec written to vault — ADR-quality, implementation-ready

## Blockers

None at session close.

## Technical Notes

- Prisma 7 generated clients require `@prisma/adapter-pg` — `new PrismaClient()` without options throws `PrismaClientInitializationError`
- `PrismaPg` accepts `schema` as second argument: `new PrismaPg({ connectionString }, { schema: "corveaux_platform" })`
- The `?schema=` query parameter in connection URLs is Prisma CLI syntax (for migrations), NOT recognized by the `pg` driver at runtime
- Split the URL on `?schema=` in db clients and seed files to extract schema name and clean base URL

## Related

- [[ADR-012 — Canonical Schema Architecture]]
- [[ADR-013 — Canonical Type Registry]]
- [[ADR-010 — Tenant Isolation Architecture]]
- [[specs/extraction-pipeline-spec]]
- [[specs/content-block-schema]]
