---
type: session
project: corveaux-v2
session: 29
date: 2026-06-10
tags: [corveaux, rbac, entitlements, authority, adr-022, role-aware-rendering, impersonation]
---

# Corveaux V2 - Session 29 — Entitlement Model (ADR-022 Phase 1)

## Focus

A reality audit (continuing Session 28) found the docs systematically understated
what was built — role-aware rendering, search, and generated-tenant rendering all
exist in code. The real gap surfaced by the Founder: authority is hardcoded + binary
(two scopes from one `authority_scope` attribute), there's no configurable entitlement
model, and role-aware rendering is *inert* (no visibility policy seeded). That became
[[ADR-022 — Canonical Entitlements, Typed Supporting Tables, and Role and Person Impersonation]]
(authored + approved this session), then implemented as Phase 1.

## ADR-022 (active)

Authored and iterated with the Founder to a tight decision set:
- **Canonical-for-everything + typed supporting tables** — generalizes ADR-012's own
  `entity_identifiers` precedent. (Supporting tables themselves deferred to Phase 2.)
- **Position ≠ Role** — Position is the HR object; Role is the authorization object.
  Chain: `Person holds Position → Position assigned Role(s) → Role grants Capabilities (via Policy)`.
- **Tenant-owned** entitlement config (platform-hosted in early phases).
- **Effective-dated, explainable** grants — every capability must emit a provenance trace.
- **Role + person impersonation**; layered capability vocabulary; flat Phase-1 roles
  (inheritance deferred); `assigned_role`; person-direct assignment first-class but
  exceptional; person impersonation a dedicated FERPA-gated capability (Phase 2).

## Phase 1 — implemented (all committed, held from push)

- **1a** (`4917630`) — `Role` entity type, `assigned_role` relationship, global-base
  capability vocabulary, `capability_grant` policy type, additive `Policy`
  effective-dating (+ migration). Tenant Zero seed creates roles, effective-dated
  grants, and position→role assignments (additive — keeps legacy `authority_scope`).
- **1b** (`cbe7c0f`) — shared `resolveEffectiveCapabilities` walks
  `Person → Position → Role → grant Policy` (effective-dated), emits the explanation
  trace, with a legacy `authority_scope` fallback (zero regression). Both the local
  and worker resolvers delegate to it.
- **1c** (`82f9ec7`) — default `rendering_visibility` policy authored + wired into the
  seed and `generate_tenant`; role-aware rendering now differentiates (visitor 6 →
  admin 10 fields, proven with the real filter). The filter moved to a shared
  dependency-free module.
- **1d** (`9a3f978`) — tenant entitlement config at `/t/[slug]/admin/entitlements`:
  manage roles/grants/assignments + an **Explain access** view that renders the full
  provenance trace for any person.
- **1e** (`5da11f6`) — governed view-as impersonation: persistent httpOnly time-boxed
  cookie, authority-ceiling (operators only, narrower audiences only — never escalate),
  audited start/stop, a persistent banner, enforced at the middleware chokepoint.

`root tsc`, `cf:typecheck`, `lint`, and `next build` all green throughout.

## State at close

- **Module code complete and shippable.** Held from push per the Founder's call
  ("hold the push until the module is ready to ship") — now met.
- **Activation after deploy:** the `Policy` effective-dating migration applies via the
  pipeline; role/grant data + the visibility policy land when the Tenant Zero seed and
  `generate_tenant` run for each tenant. The legacy `authority_scope` fallback keeps
  auth correct in the interim, so deploy order is not load-bearing.
- **Phase 2 (deferred):** typed supporting tables (`person_profile`/`position_definition`/
  `role_definition`), HRIS population (manual + Entra → SIS), person impersonation,
  role inheritance.

## Related

- [[ADR-022 — Canonical Entitlements, Typed Supporting Tables, and Role and Person Impersonation]]
- [[ADR-005 — Capability-Based Authority Model]]
- [[ADR-012 — Canonical Schema Architecture]]
- [[Corveaux V2 - Session 28 — Status Page and Operation-Worker Backlog]]
- [[Corveaux V2]]
