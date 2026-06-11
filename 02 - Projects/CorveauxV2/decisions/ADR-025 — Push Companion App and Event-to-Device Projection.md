---
type: decision
domain: product-architecture
status: accepted-deferred
date: 2026-06-10
tags: [corveaux, mobile, push-notifications, projections, events, device-registry, branding, expo]
---

# ADR-025 — Push Companion App and Event-to-Device Projection

> Status: **accepted — build deferred** (approved as architectural direction, Session 29; build sequenced after [[ADR-023 — Page Reconstruction and Single-Source Page Binding]] Compositor v1 + [[ADR-022 — Canonical Entitlements, Typed Supporting Tables, and Role and Person Impersonation]] Phase 2 HRIS). Records the native-app thesis so dependent work (HRIS device registry, notification policy, JSON projection API) is designed knowing a push channel is coming. Extends ADR-002 (Events primitive), ADR-022 (identity/capabilities/audience), and the Impressionist `themeConfig` layer.

## The thesis

A native companion app for institutions is justified **not as another way to view pages** — web does that fine — but as a **push-notification channel** the web cannot match (iOS web push is too weak for real engagement), with **runtime per-tenant branding** once tenancy is resolved. This is the legitimate native thesis; a read-only page viewer is not.

Founder framing (Session 29): "a companion app that allows orgs to surface push notifications is a value-add, especially if once tenancy is resolved the app aligns with the institution's approved branding."

## The principle

A push notification is **a projection of a canonical Event to a Person's device.** It holds no canonical state. "One Reality, Many Projections" — the device is one more projection surface, governed by the same identity, capability, and audience machinery as every other surface.

## Decision

### 1. The app is a projection client, never canonical

The companion app authenticates a Person, resolves capabilities and audience (ADR-022), and renders projections delivered as **structured JSON** over a capability-scoped, tenant-isolated API. It stores no canonical facts. Everything it shows is a projection of the institutional model, identical in contract to the web projection.

### 2. Push = Event → device projection

An `InstitutionalEvent` (hold placed, registration opened, application admitted, approval needed) is canonical and immutable. A push notification is that event projected to a device channel. No event is duplicated into a notification store; the notification references the canonical event (with its citation + effective date, per ADR-021).

### 3. Notification rules are a Policy

"Which events notify whom, on which channel" is institutional logic → a **Policy** primitive (a `notification_policy` policy type, tenant-owned, effective-dated like ADR-022 grants). Audience/capability gating reuses ADR-022 resolution directly — a person is notified only of events their audience/capabilities permit. No special-case targeting logic.

### 4. Device registry = a typed supporting table

Push targeting needs `Person holds device(s)` — a `person_devices` typed supporting table (APNs/FCM token, platform, last-seen, audience snapshot), following the ADR-022 typed-supporting-table pattern (`person_profile` / `position_definition` precedent). This **lands alongside HRIS Phase 2**, because a device registry presumes populated Person records.

### 5. One tenant-keyed app, runtime-branded — not white-label per tenant

A single binary, tenant-keyed like Slack workspaces. On tenancy resolution the app pulls the institution's **Impressionist `themeConfig`** (colors/fonts/layout — already extracted today) and re-skins itself at runtime. N institutional skins from one app, zero per-tenant builds, no `if tenant ==` logic (rule 2 holds). Per-tenant white-label binaries are explicitly rejected (app-store + branding overhead; a far-future GTM call, if ever).

### 6. Stack: Expo / React Native

One TypeScript/React codebase for iOS + Android, OTA updates, reuse of the projection-rendering mental model (and potentially components). Full-native (Swift + Kotlin) is rejected: two codebases and skill sets, justified only by deep OS integration / performance an institutional OS doesn't need, and it contradicts "many projections from one reality."

## Context

Day 60, pre-first-buyer. The wedge (extraction → generated tenant → institutional intelligence) is demoed and sold on web; nothing in it needs native. The companion app is genuinely additive (a channel web can't provide), but it depends on substrate that does not exist yet — which is why it is **recorded now and built later**.

## Dependencies (why build is deferred, not the decision)

A push app has nothing to push until:

1. **People in the system** — HRIS Phase 2 (manual + Entra → SIS) populates Person records. SLCC today is catalog-only: zero people, zero devices.
2. **Events worth pushing** — canonical `InstitutionalEvent`s being generated about those people.
3. **Notification Policy layer** (§3) + **device registry** (§4).
4. **JSON projection API** — today projections render server-side to HTML (OpenNext on Workers); a native client needs structured projections. This is the same projection-API gap flagged for any native surface.

The **branding half is free today** (Impressionist `themeConfig` exists). The **push half waits on People + Events** (HRIS Phase 2).

## Options Considered

- **PWA / web push** — rejected as the primary channel; iOS web push is too constrained for reliable institutional engagement (the entire point).
- **Native page viewer** — rejected; redundant with the responsive web projection, no differentiated value.
- **White-label per-tenant native binaries** — rejected; app-store + maintenance overhead, branding can be runtime via `themeConfig`.
- **Full-native (Swift + Kotlin)** — rejected for Expo; cost unjustified for a projection client.
- **Push companion, one tenant-keyed Expo app, runtime-branded, Event→device projection** (chosen) — on-axiom, reuses identity/audience/Policy/Impressionist, defers cleanly behind HRIS Phase 2.

## Consequences

- **HRIS Phase 2 design must reserve a `person_devices` table and a `notification_policy` policy type** so the push channel isn't bolted on later.
- The **JSON projection API** becomes a shared prerequisite for both native and any structured-data integration — worth designing as a first-class projection surface, not app-specific plumbing.
- Impressionist gains a second consumer (`themeConfig` already serves web theming; the app re-skins from the same source) — no new extraction work.
- No code, schema, or app-store work is undertaken now. This ADR is a **placeholder decision**: thesis approved, dependencies named, build tabled.

## Open questions (settle at build time, post-Phase-2)

- Notification delivery infra (APNs/FCM directly vs a provider) and where the send worker lives in the CF Workers/Queues topology.
- Whether notification *preferences* (a Person opting out of a notification class) are a Person-held Policy or a profile attribute.
- Deep-link contract from a notification into a specific projection (page/entity).
- Auth flow for the app (reuse the web SSO/Entra path; token storage on device).

## Stakeholders

- Travis Hornbuckle (Founder & CEO) — thesis approved, build tabled, Session 29.

## Related

- [[ADR-002 — Institutional Model Primitives]]
- [[ADR-022 — Canonical Entitlements, Typed Supporting Tables, and Role and Person Impersonation]]
- [[ADR-023 — Page Reconstruction and Single-Source Page Binding]]
- [[ADR-005 — Capability-Based Authority Model]]
- [[ADR-021 — Effective Dating on Entity and Relationship]]
- [[Corveaux V2 - Session 29 — Entitlement Model (ADR-022 Phase 1)]]
