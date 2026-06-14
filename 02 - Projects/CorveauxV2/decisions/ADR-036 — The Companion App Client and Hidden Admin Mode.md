---
type: decision
domain: companion-app
status: active
date: 2026-06-13
tags: [mobile, expo, admin, auth, projection]
---

# ADR-036 — The Companion App Client and Hidden Admin Mode

## Decision

Build the Expo companion app's UI as a **thin, session-driven client** over the
typed `/api/v1` projection ([[ADR-034 — Companion App Projection API and Mobile Auth]]):
a five-tab member shell that white-labels to the institution after OIDC sign-in,
plus a **hidden, capability-gated admin mode** reached by triple-tapping the
header identity. Distribute via **EAS `preview` (standalone) builds**, not the
dev-client. Zero canonical logic on the client — every screen renders a
projection; shared DTO types are the only contract.

## Context

S45 delivered the whole server contract; S46 needed the app. Two forcing
realities shaped the client:

1. **The dev-client never connected** on the founder's device (tunnel reachable
   externally, but the launcher wouldn't attach). Iterating on a binary that
   won't run is worthless, so we needed a build that *just runs*.
2. The founder is **both a member and an operator** (tenant admin + platform
   admin) and wanted admin tooling *in the app*, "all of them," surfaced by a
   gesture — triple-tap the logo to flip the whole shell into admin.

## Options Considered

- **Dev-client + Metro/tunnel** (hot reload) — abandoned; would not connect.
- **EAS `preview` standalone** (embedded bundle, no Metro) — chosen; installs and
  runs, ~15-min rebuild to see changes (founder accepted no hot reload).
- Admin as a **separate app** / web-only — rejected; the founder wanted it in the
  one app, and capability-gating makes a separate surface unnecessary.
- Admin as a **5th always-visible tab** — rejected; members must never see it. A
  hidden gesture + server-side `platform.operator` gate keeps it invisible and safe.
- **react-navigation** — deferred; a hand-rolled state router avoids extra native
  modules (each one is another Windows-install / EAS-rebuild risk). Revisit if the
  app grows.

## Rationale

- **Thin client, shared DTOs:** the app imports the server's pure DTO types
  (`src/lib/api/dto.ts`) via a type-only relative import — one definition, no
  drift, consistent with One Reality / Many Projections.
- **Auth stays the IdP's:** OIDC PKCE against the institution's own provider; the
  id_token is the Bearer; Corveaux issues and stores no token (right FERPA/SOC 2
  posture). The assistant route now also accepts that Bearer so a signed-in
  member is recognized, not just web-cookie sessions.
- **Hidden admin mode** is defense-in-depth: the gesture is a no-op without
  `platform.operator` (read from `/me` capabilities), and every admin endpoint
  independently 403s — the client gate is convenience, the server gate is truth.
- **Guest browse** keeps the public projection reachable for institutions with no
  IdP yet (e.g. SLCC), so the app is demoable before per-tenant auth exists.

## Stakeholders

Founder (operator + member). Future tenant admins (admin mode), members
(member shell), and prospects (the demo).

## Consequences

- No hot reload in the working loop — every change is a rebuild. Acceptable for a
  solo operator; revisit if iteration speed bites.
- The admin API is now a real surface (`/api/v1/.../admin/*`) gated by
  `admin-guard`; it must stay capability-gated as it grows (no `if tenant ==`).
- Polling (not push) delivers operator replies to the app on the assistant
  channel — fine for v1; push is the eventual upgrade once delivery is proven.
- A new client codebase to maintain, but it holds no canon — it's a renderer.

## Related

- [[ADR-034 — Companion App Projection API and Mobile Auth]]
- [[ADR-035 — The Unified Notification Model]]
- [[ADR-032 — The Institutional Assistant, Canonical Grounding, and the PII Boundary]]
- [[Corveaux V2 - Session 46 — The Companion App, On Device]]
- [[Expo App Integration Guide]]
