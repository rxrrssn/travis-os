---
type: decision
domain: corveaux
status: active
date: 2026-06-05
tags: [corveaux, architecture, multi-tenant, platform]
---

# ADR-004 — Platform Tenant Architecture

## Decision

The platform is divided into two cleanly separated layers: the Platform Layer (Corveaux-operated) and the Institutional Layer (each tenant operates its own instance). Every institution is a tenant. Corveaux is Tenant Zero.

## Context

Multi-tenancy is a founding requirement. The architecture must support multiple institutions as isolated tenants while allowing Corveaux to operate the shared infrastructure. The separation must be clean enough that Corveaux's own use of the platform is indistinguishable from any other tenant's use — except for the `platform.operator` authority scope.

## Options Considered

1. **Single-layer architecture** — All tenants share one layer with tenant-scoped access controls. Simpler initially but doesn't cleanly separate platform operations from institutional operations.
2. **Monolith with tenant isolation** — One codebase, one database, row-level tenant isolation. Standard SaaS approach. Viable but creates risk of cross-tenant data leakage and makes platform administration harder to separate.
3. **Platform Layer / Institutional Layer separation** (chosen) — Clean conceptual separation with different operators. Platform Layer operated by Corveaux. Institutional Layer operated by each tenant independently.

## Rationale

**Platform Layer** — Corveaux-operated:
- Tenant Provisioning (create, configure, deactivate tenants)
- Capability Registry (what each tenant tier can do)
- Billing and Subscriptions
- Feature Management
- Platform Monitoring and Observability
- Shared Infrastructure (CDN, object storage, search)
- Platform Admin Interface

**Institutional Layer** — each tenant operates its own:
- Institutional Object Store (primitive layer, tenant-namespaced)
- Content Block Store (rendering layer, tenant-namespaced)
- Role Registry (audience types and projection rules)
- Rendering Engine (shared engine, institution-scoped execution — stateless)
- Governance Workflows (approval chains, ownership, publication policies)
- Discovery Pipeline (extraction runs, institution-scoped)
- Assistant Knowledge Layer (grounded in institution's block store)
- Analytics (institution-scoped data, shared engine)
- Tenant Admin Interface

The rendering engine is shared infrastructure but executes in an institution-scoped context. No institution can see another institution's data.

## Stakeholders

- Builder (Travis Hornbuckle)

## Consequences

- The rendering engine must be stateless and institution-scoped
- Corveaux Tenant Zero operates through the institutional layer; the only thing that makes Corveaux different is the `platform.operator` authority scope
- Future resellers or system-office partners could be granted `platform.operator` scope without code changes — the capability model supports this
- Shared services (CDN, search infrastructure) must be institution-scoped at the storage/index level

## Revision (2026-06-05)

The original Consequences section referenced "row-level security" as an acceptable isolation mechanism alongside schema-per-tenant.

This has been superseded by ADR-010.

The correct production position:
- Database-per-tenant, or
- Schema-per-tenant with strict operational controls

Shared-schema with RLS is rejected as a production isolation boundary. It is acceptable only for local development, tests, and prototypes.

See ADR-010 for the full isolation surface requirements (database, cache, jobs, storage, search, AI context).

## Implementation Revision (2026-06-09)

The conceptual Platform Layer / Institutional Layer split is now reflected in deployed infrastructure:

- Platform Layer:
  - dedicated Neon platform project
  - Cloudflare platform Worker
  - Hyperdrive connection
  - tenant provisioning Workflow
  - platform audit R2 bucket
- Institutional Layer, per tenant:
  - isolated Neon project
  - dedicated tenant Worker and Workflow
  - private tenant data bucket
  - private tenant audit bucket

Corveaux Tenant Zero and SLCC Validation are deployed using this shape. The platform registry stores non-secret resource metadata and dispatches tenant-scoped work; tenant credentials remain in tenant Worker secret storage.

## Related

- [[ADR-005 — Capability-Based Authority Model]]
- [[ADR-006 — Tenant Zero]]
- [[ADR-010 — Tenant Isolation Architecture]]
- [[ADR-019 — Cloudflare and Neon Runtime Architecture]]
- [[Corveaux V2 - Session 01]]
