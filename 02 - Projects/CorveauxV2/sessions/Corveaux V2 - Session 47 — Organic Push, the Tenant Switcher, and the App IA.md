---
type: session
project: corveaux-v2
session: 47
date: 2026-06-13
tags: [corveaux, mobile, push, notifications, break-glass, ia, ambient-context, theming, adr, commit]
---

# Corveaux V2 - Session 47 — Organic Push, the Tenant Switcher, and the App IA

**Merged:** PR **#36** (`organic-push-wiring`) — one bundle, squash-merged on green CI.
**Builds:** `tsc` (app) / `cf:typecheck` / `eslint src` / `apps/mobile` `tsc` all green throughout.
**ADRs:** [[ADR-035 — The Unified Notification Model]] (organic push), [[ADR-037 — Companion App Information Architecture and the Ambient Context Model]] (new — drafted this session, slices A–D built).

A long session in two halves: first a vault reconciliation + a string of concrete companion-app builds (organic push, the tenant switcher, an assistant bug fix), then a founder design marathon that produced ADR-037 (the app's information architecture) and four implemented slices of it.

## Vault reconciliation (start of session)

Swept the whole vault for stale todos and reconciled docs against reality (the codebase/memory were current through S46 but several living docs froze earlier): refreshed `Corveaux V2.md` through S46, corrected the `extraction-pipeline-spec` (Trigger.dev→Cloudflare Workflows/Queues, Crawlee→Cartographer — both removed long ago) and checked off the closed Day 30 gate, marked the SLCC Material Facts gate PASS, resolved the content-block-schema block-generator question. Flagged (not silently edited): the Tenant Zero Checklist (needs live-DB verification) and a stuck `RUNNING` header in `metrics.md`.

## Organic push (ADR-035) — the dormant subsystem fires

Push *delivery* was proven on device 2026-06-13 (the `/me/test-push` button → APNs); the gap was that **no producer emitted `category` or `recipientPersonIds`**, and **no push `effect_policy` was seeded**, so nothing fired from real events.

- **Central category map:** `TRIGGER_CATEGORY` + `categoryForTrigger()` in `effects/contracts.ts`; the matcher derives `trigger.category ?? categoryForTrigger(type)` — so every producer (incl. the worker-side `operation.*`) is categorized without an edit.
- **Direct-subject producers** carry `recipientPersonIds`: escalation → the assignee; page-review → the stewards.
- **`scripts/seed-push-policies.ts`** (new, idempotent): a *parties* push policy (escalations/reviews → producer-resolved persons) and an *operator-subscriber* push policy (operation lifecycle/stalled, pipeline, billing/document lifecycle → the operator's person). The registry's per-category default channels decide what actually pushes by default (escalations/reviews/documents/stalled_jobs on; the rest opt-in). Subscribing `operation.stalled` to push also closes a standing loose end.

## The tenant switcher (operator break-glass on the mobile API)

Founder asked for an easy tenant switch in the app for platform admins. The finding that shaped it: the mobile projection API verifies the Bearer against **the requested tenant's own IdP**, so a Corveaux-operator token won't authorize another tenant's endpoints — cross-tenant operator access didn't exist on mobile. Built it the doctrine-correct way:

- **`admin-guard.ts`**: an `x-corveaux-operator-home` header names the operator's home tenant; the token is verified against *that* IdP and `platform.operator` is required there — the client can forge neither, so the header only selects the verifier. A crossing is **audited into the visited tenant's trail** (`recordApiBoundaryCrossing` + `actorFromPrincipal` — the mobile twin of the web break-glass).
- **`GET /api/v1/admin/tenants`** (platform-level, operator-gated) for the picker; new `AdminTenantDTO`.
- **Mobile:** `session.adminTenant` + `adminAuthed` (sends the home header on cross-tenant calls); a tenant picker on the Profile avatar; the admin screens + shell retarget the selected tenant. Scope: **admin surfaces only** — member `/me` stays on the home tenant.

## Assistant bug fix

Founder: "when I send a message I get 'unexpected response', then come back and the real reply is there." Diagnosed: the assistant route **streams** real answers (line 1 = `{conversationKey, sources}` JSON, then the answer text), but mobile `askAssistant` did `JSON.parse(whole body)` → threw on every real (non-small-talk) question, while the server's `finally` still recorded the turn (hence the reopen showing it). Fixed client-side: parse both shapes (single JSON object for early-exits; first-line-JSON + text for the stream). No server change.

## The design marathon → ADR-037

A multi-message founder design session reworked the app from first principles. The result ([[ADR-037 — Companion App Information Architecture and the Ambient Context Model]], drafted this session):

- **Three orthogonal axes:** Brand (institution) · Context (ambient) · Appearance (dark/light).
- **Ambient context** (the keystone): context = a relationship the person holds; it **follows** the user into domained spaces — never a forced upfront mode. The me-hub (Home + Profile) is **context-null** (the whole person). The lone *deliberate* context is **Operator** (break-glass; the tenant switcher lives inside it), which **retires the triple-tap admin gesture**.
- **Home = day-planner:** a present-tense now/next list (all-day band + conditional "Happening now" + "Up next"), self-advancing, unifying personal calendar (a future *connector*) ⊕ todos ⊕ deadlines, color-by-source.
- **Profile = manage-me** (relationships-as-self-service), **Alerts = the inbox behind push**, **More = auxiliary processes**, **connectors = live-read-never-canonized** (calendar first, Navigate-style per-user consent).
- Explicit boundaries: forms/workflows OUT (separate ADR), calendar-connector specifics OUT (separate ADR), this ADR names only the pattern.

## ADR-037 slices built (A–D)

- **A — Appearance + App Settings:** premium light base + mode-aware `paletteForBrand`; System/Light/Dark setting (user→system→dark); new App Settings home.
- **B — Alerts inbox:** `/me/alerts` (projection of the person's dispatches, deduped by trigger key) + `/me/alerts/read` (a `notificationsReadAt` marker, no new table); the Alerts tab becomes the inbox; prefs moved to App Settings; unread tab badge.
- **C — Home day-planner:** `/me/today` canon agenda (assigned conversations + steward reviews with real due dates; noisy institution-wide events deferred to the connector); self-advancing now/next UI with a minute tick.
- **D — Profile manage-me:** relationships promoted up under identity as the self-service hub; record edits + App Settings below.

## Deferred / next

- **Slice E — ambient context + shell manifest** (operator-as-context retiring triple-tap, domained spaces): blocked on the **shell-config Policy shape** decision (tenant-Policy-driven vs hardcoded defaults per relationship). The one open keystone for ADR-037.
- **Connectors / calendar** (its own ADR): per-user incremental consent, display-only, never canonized.
- **Per-tenant light/dark brand variants** (data model + tenant UI): appearance currently uses the existing accent over both platform bases.
- Founder signalled a **gear change** after this merge.

## Related

- [[ADR-035 — The Unified Notification Model]]
- [[ADR-037 — Companion App Information Architecture and the Ambient Context Model]]
- [[ADR-034 — Companion App Projection API and Mobile Auth]]
- [[ADR-036 — The Companion App Client and Hidden Admin Mode]]
- [[Corveaux V2 - Session 46 — The Companion App, On Device]]
