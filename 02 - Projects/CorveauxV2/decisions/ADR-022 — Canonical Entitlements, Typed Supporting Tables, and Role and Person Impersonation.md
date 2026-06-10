---
type: decision
domain: data-architecture
status: active
date: 2026-06-10
tags: [corveaux, authority, rbac, entitlements, hris, schema, impersonation]
---

# ADR-022 — Canonical Entitlements, Typed Supporting Tables, and Role and Person Impersonation

> Status: **active** (approved Session 28 — Founder resolved all open questions). Supersedes the under-implemented enforcement half of [[ADR-005 — Capability-Based Authority Model]] and refines [[ADR-012 — Canonical Schema Architecture]].

## Decision

Everything is modelled on the canonical primitives (Entity, Relationship, Event, Policy, Time). Where an entity type needs dense, typed, integrity-critical data, it gains an optional typed **supporting table** — never a parallel system.

Crucially, **institutional structure and authorization structure stay separate.** Five distinct canonical concepts, wired by Relationships and Policies and never collapsed into one another:

- **Person** — a human (entity).
- **Position** — an institutional/HR object: *Academic Advisor II*, *Registrar*, *Dean of Students*, *Financial Aid Counselor* (entity).
- **Role** — an authorization object: *student.records.viewer*, *catalog.publisher*, *policy.admin*, *case.worker* (a **distinct** entity type — not the same as Position).
- **Capability** — an atomic permission, from a controlled vocabulary.
- **Policy** — grants Capabilities to Roles (effective-dated, cited).

The chain: **Person holds Position → Position is assigned Role(s) → Role grants Capabilities (via Policy)**. One Position can imply many Roles; one Role can apply to many Positions; Roles may also be assigned directly to a Person. HRIS, RBAC, and impersonation are all expressed on this fabric.

Five coupled decisions:

### 1. Typed supporting tables (generalises ADR-012)

- The canonical primitives remain the universal spine and **do not change**. Relationships, events, time, citations, and authority all hang off `Entity` uniformly.
- An entity type **MAY** have a 1:1 **supporting table** in the tenant schema, keyed by `entity.id`, for typed/constrained/indexed columns (e.g. `person_profile` for HR fields, `position_definition`, `role_definition`).
- Decision rule: `entity.attributes` (JSON) for sparse/variable/source-extracted facts; supporting table for first-class, constrained, frequently-queried, integrity-critical data (exactly HRIS and RBAC).
- Not new: ADR-012 already chose a dedicated `entity_identifiers` table over attributes-JSON for the same reasons (index, temporal, issuer). Supporting tables generalise that precedent.
- Constraints: **no `tenant_id`** (the connection is the tenant context, per ADR-010/012); never duplicate facts that belong in relationships/events; the `Entity` remains the temporal/identity authority (a satellite is the current typed snapshot; history lives in Events).

### 2. Configurable entitlement model (operationalises ADR-005)

- Capability grants become **data, not code**. Delete the hardcoded `authority_scope → {platform.operator | institution.admin}` map in `tenant-zero-identity.ts`.
- Resolution walks the canonical graph end to end: `Person → holds_position → Position → assigned_role → Role → (authority Policy) → Capabilities` (plus any Person-direct Role assignments). ADR-005 always intended scope grants to be Relationship/Policy data; this realises it.
- The capability/Role **vocabulary is layered**: a **global base** of stable, platform-contract capabilities, plus **per-tenant namespaced extensions** (tenant capabilities live under a tenant namespace so they never collide with the global base). The five ADR-005 scopes seed the global base, not the ceiling. Vocabulary lives in the type registry ([[ADR-013 — Canonical Type Registry]]).
- **Phase 1 Roles are flat** — a Role grants Capabilities directly. **Role inheritance is intentionally deferred; Phase 1 grants are explicit to preserve explainability and avoid hidden authority chains.**
- Assignment is normally `Position → assigned_role → Role`. **Person-direct Role assignment is first-class but exceptional** — for break-glass, temporary assignments, or non-HRIS cases — always effective-dated and flagged extra-visibly in the explanation trace.
- **Grants are effective-dated** ([[ADR-021 — Effective Dating on Entity and Relationship]]): a Policy granting a Capability to a Role carries `effectiveFrom`/`effectiveTo`, and Role↔Position/Person assignments are effective-dated Relationships. This is what lets Corveaux answer *"why did this person see this **then**?"* — e.g. `Policy: Advisor Role grants student.profile.read, effective_from 2026-06-01, effective_to null`.
- Audience/field visibility (the `rendering_visibility` Policy the renderer already reads but nothing seeds) is part of this same configurable layer — closing the "role-aware rendering is inert" gap found in the audit.

### 3. Tenant-owned entitlement configuration

- Institution-specific RBAC **belongs to the tenant**, not the platform operator — the same ownership boundary already drawn for content review. The institution owns its Roles, Positions, grants, and visibility policies.
- It is a **governed entitlement configuration surface owned by tenant admin**, *exposed through platform-admin tooling during early phases* while the tenant-facing surface matures. The platform **hosts and supervises** the control plane; it does not own the institution's authorization model.
- Net: RBAC is configured as canonical data (Roles, assignments, grant Policies, visibility Policies) with zero code changes — per the "institutions configure without forking the DB" goal of ADR-012.

### 4. Impersonation — two modes

The validation loop that makes configurable RBAC trustworthy (configure → impersonate → confirm). Two distinct modes, sharing the guardrails below:

- **Role impersonation** — preview as an abstract role / capability-set / audience (e.g. "as a current student", "as the Advisor role"). Validates the *entitlement configuration itself*. Needs no real-person data → available in **Phase 1**. Generalises the existing `?context=` render override (currently unaudited, unscoped, render-only) into a first-class governed mechanism.
- **Person impersonation** — preview as a *specific real `Person` entity*, resolving **their** actual effective entitlements through the graph. Answers "what does *this named individual* actually see, and why?" — the support/debugging tool. Depends on the HRIS substrate (**Phase 2**) and is **gated behind a dedicated capability** (e.g. a support role / `platform.impersonate_person`): requires an **explicit stated purpose**, strong audit, time-boxing, and is **view-only in Phase 2**. Consent logging where feasible; otherwise a documented support/legal basis per institutional policy. FERPA-relevant — viewing a named person's view.

Shared guardrails (both modes):
- **Authority ceiling** — impersonation can only ever *narrow*; it can never grant a capability the operator does not already hold. Person impersonation of a subject holding *more* authority than the operator is denied (or hard-capped to the intersection).
- **Audited** — every session writes an InstitutionalEvent / AuditEvent: actor, mode, impersonated role or `Person` id, resolved capability set, start/stop, purpose. Person impersonation carries the strongest audit weight.
- **Visible** — the UI always indicates an active impersonation; session-scoped and time-boxed.
- **Read-only by default** — "view as" first. "Act as" (writes under an impersonated identity) is a separate, later, even-more-guarded capability — out of scope here.

### 5. Entitlement explanation trace

Every entitlement resolution **MUST** be able to emit a machine-readable **explanation trace** showing the relationships, policies, effective dates, and citations that produced the final capability set. Corveaux must always answer *"why does this person have this capability?"*. Example shape:

> `person:travis` has `student.profile.read` because:
> — **holds** Position `position:academic-advisor-ii`
> — Position **is assigned** Role `role:advisor`
> — Policy `policy:advisor-grants-profile-read` **grants** `student.profile.read` to `role:advisor`
> — effective since `2026-06-01`, cited to `<sourceUrl>`

This trace powers admin debugging, impersonation review, and audit evidence. It is the same "every fact carries its provenance" discipline as extraction (CLAUDE.md Rule #1), applied to authority — a capability with no resolvable trace is not granted.

## Context

The Session 28 reality audit found authority is hardcoded and binary: `resolveAuthorityScopes()` maps one `authority_scope` attribute through two `if` statements to two of ADR-005's five scopes; `audienceContext` is `administrator | visitor` only. Role-aware rendering is fully coded but **inert** (no `rendering_visibility` policy is ever seeded; the projector tags every block with all six contexts). There is no entitlement-config surface and no HRIS-grade people/role substrate. The Founder's direction: **use the canonical model for everything, with typed supporting tables for expanded information**; keep `Position` (institutional/HR) and `Role` (authorization) as separate canonical types; make grants effective-dated and explainable; give the tenant ownership of its RBAC config; and support both role and person impersonation.

## Options Considered

- **Entitlements: separate per-tenant permission tables** (ADR-005 option 2) — rejected again; doesn't capture emergent institutional authority, sits outside the canonical model, risks tenant-type special-casing.
- **Entitlements: hardcoded scope map** (status quo) — rejected; not configurable, diverges from ADR-005's stated intent.
- **Entitlements: Policies grant Capabilities to Roles; Roles assigned to Positions/Persons** (chosen) — data-driven, temporal, auditable, tenant-owned, no code changes.
- **Authorization: Role ≡ Position** (collapse the two) — rejected; conflates institutional/HR structure with authorization, can't express one-Position-many-Roles or a Role shared across Positions, and bakes HR shape into permission checks.
- **Expanded data: everything in `attributes` JSON** — rejected for HRIS/RBAC; no constraints/indexes/integrity (the same reasoning ADR-012 used for identifiers).
- **Expanded data: typed supporting tables** (chosen) — first-class columns where integrity matters, canonical spine preserved.
- **Impersonation: keep `?context=` query override** — rejected as the end state; unscoped, unaudited, render-only. Acceptable only as the seed it already is.

## Consequences

- New tenant-schema supporting tables (e.g. `person_profile`, `position_definition`, `role_definition`) + a `Role` entity type and `assigned_role` relationship → tenant Prisma schema + migrations + **all three generated clients regenerated** (platform/tenant/workerd) — heed the stale-client lesson from Session 25.
- Authority resolution becomes a graph + policy walk that returns **not just a capability set but an explanation trace** (relationships, policies, effective dates, citations) — cache per session/request.
- Role↔Position/Person assignments and grant Policies are **effective-dated**; resolution is time-aware (as-of queries), so historical access is reconstructable.
- Capability/Role vocabulary moves into the type registry; the five ADR-005 scopes become seed data.
- Tenant-owned entitlement-authoring surface (exposed via platform-admin tooling early, tenant-facing later); impersonation requires an audit trail, a hard authority-ceiling check, and a persistent UI affordance.
- Revises ADR-012's "zero new canonical tables required" to: **zero new tables *required* to represent any domain; typed satellites *permitted* where integrity/query demands.**
- **Role impersonation ships in Phase 1** (no real-person data needed). **Person impersonation is Phase 2** — it depends on the populated HRIS substrate and is FERPA-relevant (viewing a named individual's view), so it needs the strongest audit, an explicit purpose, and likely restriction to a dedicated support capability.
- HRIS data population (assigning real people to positions/roles) is **Phase 2** — out of scope here; this ADR makes the model and the config/validation surfaces ready for it.

## Resolved

- **Role ≠ Position.** `Role` is a distinct canonical entity type (authorization); `Position` is the institutional/HR object. Policies grant Capabilities to Roles; Relationships assign Roles to Positions or Persons.
- **RBAC config is tenant-owned**, surfaced through platform-admin tooling in early phases.
- **Grants and impersonation validity are effective-dated** (ADR-021); resolution emits an **explanation trace** (§5).
- **Vocabulary is layered** — a global base of stable platform-contract capabilities + per-tenant namespaced extensions.
- **Phase 1 Roles are flat with explicit grants; role inheritance is intentionally deferred** to preserve explainability and avoid hidden authority chains.
- **`assigned_role`** is the assignment edge; **Person-direct Role assignment is first-class but exceptional** (break-glass / temporary / non-HRIS), effective-dated and extra-visible in the trace.
- **Person impersonation is a dedicated gated capability** — explicit purpose, strong audit, time-boxing, view-only in Phase 2.
- **Phase 2 HRIS source order: manual + Entra first, then SIS** — manual gives validation control, Entra gives identity/position-ish reality, SIS is highest-value but messiest and most sensitive.

## Intentionally deferred

- **Role inheritance** (Roles composing Roles) — past Phase 1; revisit once flat explicit grants are proven and the explanation trace is trusted.
- **"Act as"** (writes under an impersonated identity) — separate, even-more-guarded capability.
- Implementation-level details (namespace format, resolution caching, trace schema, identity-mapping strategy) settle during the Phase 1 build.

## Stakeholders

- Travis Hornbuckle (Founder & CEO) — direction set and all open questions resolved in Session 28; **approved → active**.

## Related

- [[ADR-005 — Capability-Based Authority Model]]
- [[ADR-012 — Canonical Schema Architecture]]
- [[ADR-013 — Canonical Type Registry]]
- [[ADR-021 — Effective Dating on Entity and Relationship]]
- [[Corveaux V2 - Session 28 — Status Page and Operation-Worker Backlog]]
