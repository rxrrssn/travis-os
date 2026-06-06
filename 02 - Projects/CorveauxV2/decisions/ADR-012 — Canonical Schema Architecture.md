---
type: decision
domain: data-architecture
status: active
date: 2026-06-05
tags: [schema, prisma, multi-tenant, identifiers, ontology]
---

# ADR-012 — Canonical Schema Architecture

## Decision

One master schema definition. One database per tenant (production) or one PostgreSQL schema per tenant (local dev). No `tenant_id` on canonical primitive tables. The database connection IS the tenant context.

Two Prisma schema files. Two generated clients. Two migration paths.

- `prisma/platform.schema.prisma` → `corveaux_platform` schema → `tenants` table only
- `prisma/tenant.schema.prisma` → `corveaux_tenant_zero` (and future tenants) → all canonical primitives

Three identifier layers on every entity:
- `id` — internal UUID, database PK, FK target, never exposed
- `platformId` — stable Corveaux platform identifier, globally unique, exposed in URLs
- `canonicalKey` — natural key for dedup/upsert during import, unique in tenant DB

Institution-specific typed identifiers (student_id, employee_id, entra_object_id, etc.) are stored in `entity_identifiers`, not in `entity.attributes`.

`entity.attributes` holds ONLY intrinsic facts. Everything institutional derives from the graph.

`TenantOntologyField` includes `sourceType` and `sourcePath` for derived field resolution. Fields can resolve from: attribute, identifier, relationship, relationship_chain, event_latest, policy_evaluation.

## Context

Corveaux is a multi-tenant institutional platform. The canonical primitive model (Entity, Relationship, Event, Policy, Time) must represent any institution without schema changes. Institutions must be able to define their own identity vocabulary, field labels, and presentation rules without forking the database.

Three questions required architectural answers:
1. How are entities identified across the platform?
2. How are institution-specific identifiers (student ID, employee ID) modeled?
3. How does the field presentation layer support values that come from relationships, not flat attributes?

Existing ADR-010 established that shared-schema with `tenant_id` on canonical tables is rejected for production. This ADR implements the full schema architecture per that constraint.

## Options Considered

**Identifier architecture:**
- Option A: Single `id` field, expose the internal UUID. Rejected — exposes internal database key; can't change format later.
- Option B: `id` + `platformId`. Accepted. Clean separation between internal PK and public identifier. Future-safe.
- Option C: `id` + `platformId` + `canonicalKey`. Accepted. The third layer handles dedup/upsert during extraction.

**Institution-specific identifiers:**
- Option A: Store in `entity.attributes` JSONB. Rejected — no dedicated index, no temporal tracking, no issuer capture, makes "find person by student ID" require JSON path queries.
- Option B: Dedicated `entity_identifiers` table. Accepted — first-class lookup with dedicated index, temporal, issuer-scoped.

**Tenant field presentation:**
- Option A: `fieldKey` always maps to `entity.attributes[fieldKey]`. Rejected — institutional fields like "S Number", "Program", "Advisor" don't live in attributes; they derive from identifiers and relationships.
- Option B: `sourceType` + `sourcePath` on `TenantOntologyField`. Accepted — fields can resolve from any graph traversal path without schema changes.

## Rationale

The identifier architecture buys future flexibility: `platformId` can change format (CUID2, ULID, prefixed slugs) without touching FK constraints, because all FK references use `id`.

The dedicated identifiers table makes institution-specific IDs first-class. "Find the person with student_id = S12345" is a direct index lookup, not a JSON path query.

Persons are not flat records because flattening institutional state onto `person.attributes` would duplicate facts that already exist in the canonical graph, create denormalization that diverges on update, and defeat the purpose of the primitive model.

The `sourceType`/`sourcePath` field resolution system means the tenant UI field configuration is pure data — institutions configure their UI without code changes. The same entity renders completely differently across institutions.

## Stakeholders

Travis Hornbuckle (Founder & CEO) — approved in Session 03

## Consequences

- Tenant isolation is structural: database-per-tenant in production, schema-per-tenant in local dev
- No `tenant_id` on canonical tables; the database connection is the tenant context (per ADR-010)
- Any institutional domain (SIS, HR, ITSM, housing, parking) maps onto the canonical primitives
- Zero new canonical tables required for new institutional domains
- Institution-specific IDs are first-class, indexed, and temporal
- Field presentation is data — institutions configure their UI without code changes
- The same canonical entity record renders completely differently across institutions
- Onboarding a new tenant = migrate tenant schema to new database + seed ontology config rows

**Platform schema (one, operated by Corveaux):**
- `tenants` — tenant registry

**Tenant schema (one per institution, identical):**
- `entities`, `entity_identifiers`, `relationships`, `institutional_events`
- `policies`, `content_blocks`, `extraction_runs`
- `tenant_ontology_entity_types`, `tenant_ontology_fields`, `tenant_ontology_identifier_types`

**Local dev:**
- `corveaux_platform` PostgreSQL schema → platform tables
- `corveaux_tenant_zero` PostgreSQL schema → Tenant Zero canonical tables

## Related

- [[ADR-010 — Tenant Isolation Architecture]]
- [[ADR-013 — Canonical Type Registry]]
- [[ADR-006 — Tenant Zero]]
- [[ADR-002 — Institutional Model Primitives]]
