---
type: decision
domain: corveaux
status: active
date: 2026-06-05
tags: [corveaux, architecture, multi-tenant, isolation, security]
---

# ADR-010 — Tenant Isolation Architecture

## Decision

Production tenant data must not rely on shared-schema isolation as the primary boundary.

The preferred production architecture is:
- Database-per-tenant, or
- Schema-per-tenant with strict operational controls

Application-level tenant filtering is rejected as an isolation mechanism.

Shared-database / shared-schema with RLS may be used only in local development, automated tests, prototypes, or non-production validation contexts. It is not the production architecture.

The production choice is database/project-per-tenant on Neon. Schema-per-tenant remains a local-development convenience only.

## Implementation Revision (2026-06-09)

The deferred production choice is resolved:

- The platform registry is stored in a dedicated Neon platform project.
- Each institutional tenant receives an isolated Neon project.
- Corveaux Tenant Zero and SLCC Validation have been provisioned into separate projects.
- Tenant Workers receive only their own direct Neon connection secret.
- Platform records contain project, branch, database, role, region, schema version, Worker URL, and bucket identifiers; database passwords and connection strings are not persisted in platform tables.
- Each tenant has separate private R2 data and audit buckets.
- Provisioning records `tenant_region` and `tenant_residency_requirement`.

The local PostgreSQL schema-per-tenant layout is retained as a development and rollback source, not the production isolation boundary.

## Context

ADR-004 and ADR-009 both referenced PostgreSQL Row-Level Security (RLS) as the tenant isolation mechanism. That assumption has been evaluated and rejected for production.

The concern is not whether RLS works correctly when implemented correctly. The concern is:

1. RLS is an application-level policy enforced by the database engine — it does not prevent cross-tenant access at the infrastructure layer
2. A misconfigured RLS policy, a missing policy on a new table, a super-user query, a migration script, or a background job running outside RLS context can silently cross tenant boundaries
3. Tenant isolation must survive developer mistakes, not depend on their correctness
4. At the institutional data level, a cross-tenant breach is an existential risk

The institutional data Corveaux manages — programs, courses, enrollment, governance, identity, policies, contacts — is operationally sensitive. The isolation model must be defensive by design.

## Options Considered

1. **Shared database, shared schema, application-level filtering** — Rejected. Tenant scoping lives in application code. Every query must be authored correctly. No infrastructure-level boundary exists. A bug in application code can return cross-tenant data.

2. **Shared database, shared schema, RLS** — Rejected for production. RLS is better than application-level filtering but still shares the database process, buffer pool, and superuser access. Migrations must enable RLS on every new table or the policy silently fails. Background jobs and migrations typically run outside RLS context.

3. **Shared database, schema-per-tenant with strict operational controls** (acceptable for production) — Each tenant owns a dedicated PostgreSQL schema. Migrations are scoped to the tenant schema. Connection contexts are scoped. Operational controls prevent cross-schema access. Requires disciplined schema management tooling.

4. **Database-per-tenant** (preferred for production) — Each tenant owns a dedicated database. Cross-tenant access is impossible at the database level. Migrations, backups, and restores are naturally scoped. Operational overhead increases at scale but isolation is structurally enforced.

## Rationale

Tenant isolation is a security boundary, not an application convention.

The isolation model must hold under:
- Developer error (missing tenant scope in a query)
- Migration errors (new table without RLS policy)
- Background job context (running without session-level tenant context)
- Cache entries (keyed without tenant scope)
- File objects (stored without tenant namespace)
- Search index entries (not scoped to tenant)
- AI context (retrieval from one tenant returned to another)
- Superuser or administrative access

Database-per-tenant is structurally correct. Each tenant's data is physically separate. Cross-tenant access requires explicit, deliberate, elevated action — not merely a missing application-level guard.

Schema-per-tenant is acceptable if:
- Schema isolation is enforced at the connection/session level
- Migrations are strictly scoped to the target schema
- Operational runbooks explicitly prevent cross-schema queries
- CI/CD and migration tooling enforce schema boundaries
- Monitoring detects and alerts on cross-schema access

The choice between database-per-tenant and schema-per-tenant will be made at schema design time, informed by:
- Operational management tooling maturity
- Coolify/PostgreSQL deployment constraints
- Migration tooling (Prisma multi-schema support)

## The Full Isolation Surface

Tenant isolation is not only a database concern. Every data surface must be isolated:

| Surface | Isolation Requirement |
|---|---|
| Database queries | Database-per-tenant or schema-per-tenant; no shared-table access |
| Database migrations | Strictly scoped to tenant database or schema |
| Cache entries | Keyed with tenant-scoped prefix; no shared cache keys |
| Background jobs | Tenant context carried through job payload; no cross-tenant job queues without explicit design |
| File / object storage | Tenant-namespaced storage paths or buckets |
| Search index | Tenant-scoped index or tenant-namespaced index entries |
| AI context / retrieval | Tenant-scoped retrieval; extracted knowledge must not cross tenant boundaries |
| API responses | Every response validated to be within the requesting tenant's scope |
| Session and auth context | Tenant context established at authentication; carried through the request lifecycle |

## Development and Prototype Exceptions

Shared-schema with RLS is acceptable in:
- Local development
- Automated test suites
- Non-production prototypes
- SLCC Day 30 validation runs (if running single-tenant locally)

If a Day 30 validation run is executed locally against a single-tenant schema, this is acceptable. The moment multi-tenant data coexists, the production isolation model applies.

## Stakeholders

- Builder (Travis Hornbuckle)

## Consequences

- Database provisioning must be part of the tenant onboarding workflow from Day 1
- Prisma multi-database or multi-schema support must be evaluated before the first schema is committed
- Background job platform (Trigger.dev or Inngest) must carry tenant context in job payloads and enforce scoping
- Object storage must use tenant-namespaced paths or per-tenant buckets
- Search must be designed with tenant-scoped indexes or tenant-namespaced entries
- AI retrieval must be scoped to the tenant's knowledge layer; never cross-tenant
- Migration tooling must be designed to operate per-tenant, not globally
- The Cloudflare/Neon provisioning Workflow must create and record an isolated Neon project per tenant

## Supersedes

Replaces the RLS assumption in:
- ADR-004 (Consequences section — "Postgres with tenant-namespaced schemas or row-level security from Day 1")
- ADR-009 (Rationale section — "PostgreSQL supports multi-tenant RLS from Day 1")

## Related

- [[ADR-004 — Platform Tenant Architecture]]
- [[ADR-005 — Capability-Based Authority Model]]
- [[ADR-006 — Tenant Zero]]
- [[ADR-009 — Tech Stack]]
- [[ADR-019 — Cloudflare and Neon Runtime Architecture]]
- [[Corveaux V2 - Session 02 — Tech Stack and Vault Infrastructure]]
