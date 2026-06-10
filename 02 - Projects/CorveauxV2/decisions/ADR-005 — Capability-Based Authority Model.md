---
type: decision
domain: corveaux
status: active
date: 2026-06-05
tags: [corveaux, architecture, auth, authority, rbac]
---

# ADR-005 — Capability-Based Authority Model

## Decision

Authority is capability-based, never tenant-type-based. No `if tenant == "corveaux"` code paths exist anywhere in the platform. Corveaux's platform operator access is granted through the `platform.operator` scope, which is available to any entity through the same authority model.

## Context

Corveaux is Tenant Zero — the first institutional tenant on its own platform. The platform must support this without creating special-case code for Corveaux. Any design that checks tenant identity to grant elevated access is fragile, hard to test, and impossible to extend to resellers or system-office partners.

The V4 framework also establishes that authority emerges from Relationships + Policies + Time rather than being directly assigned — but the capability scopes are the enforcement layer that maps that emergent authority to specific actions.

## Options Considered

1. **Role-based (tenant-type-check)** — `if tenant.type == "operator" then allow platform_admin`. Simple but creates the exact anti-pattern we want to avoid.
2. **Permission tables per tenant** — Each tenant has a table of granted permissions. Flexible but complex to manage and doesn't capture the emergent nature of institutional authority.
3. **Capability-based scopes** (chosen) — A set of named capability scopes. Any authenticated identity can hold any scope. The platform admin grants scopes; scope grants are stored as relationships in the institutional model.

## Rationale

Authority scopes:
- `institution.viewer` — read-only access to institutional layer
- `institution.contributor` — create and edit content blocks; no publish
- `institution.publisher` — publish within governed workflows
- `institution.admin` — full institutional layer administration
- `platform.operator` — platform layer administration

Corveaux staff hold `platform.operator` scope on the Corveaux tenant. A future reseller or system-office partner could also be granted `platform.operator` scope through the same model, without code changes.

The key rule: **No `if tenant == "corveaux"` in the codebase.** If the code needs to check whether an action is permitted, it checks the authority scope on the requesting identity, not the tenant identifier.

## Stakeholders

- Builder (Travis Hornbuckle)

## Consequences

- Authority checks throughout the codebase use scope checks: `identity.hasScope("platform.operator")`, not `tenant.id === "corveaux"`
- The `platform.operator` scope is special in effect but not special in mechanism
- All tests for platform-level operations use a test identity with `platform.operator` scope, not a hardcoded Corveaux tenant
- Scope grants are stored as Relationship primitives in the institutional model, making them auditable and temporal

## Related

- [[ADR-004 — Platform Tenant Architecture]]
- [[ADR-006 — Tenant Zero]]
- [[Corveaux V2 - Session 01]]
