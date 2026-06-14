---
type: decision
domain: notifications
status: active
date: 2026-06-13
tags: [notifications, push, effects, channels, expo, adr-025, adr-029]
---

# ADR-035 — The Unified Notification Model

> Status: **active — server side BUILT (S45, PRs #27–28)**, additively on the
> [[ADR-029 — Effects Layer and Provider Rails]] bus; realizes
> [[ADR-025 — Push Companion App and Event-to-Device Projection]]. SHIPPED: push
> (Expo) + sms (Twilio) channels, push effector, device registration, the data
> category registry + per-person preferences, and the drain/matcher delivery-core
> (push → person → device tokens, filtered by category × channel pref). STILL TO
> DO: wire producers to emit `category` + `recipientPersonIds` (push is inert
> until a push `effect_policy` + a registered device exist), the preferences UI
> (the design session), and real push/SMS delivery (needs a device + EAS +
> `EXPO_ACCESS_TOKEN`/Twilio creds — untested locally).

## Decision

A notification is **channel-agnostic**: email, SMS, and push are interchangeable
delivery options on one stream. The model has two clean layers:

1. **What fires & to whom** — a canonical Event + an `effect_policy` (institutional
   logic, already built). This decides a notification is warranted and its audience.
2. **How each recipient receives it** — that person's **per-category × per-channel
   preferences**. The same notification reaches one person as a push and another as
   an email because each chose differently.

A delivered notification = *events targeting you* ∩ *your channel choices for that
category*. **Push and SMS are new effectors on the same dispatch pipeline as email.**

Two supporting principles:
- **Scoped by who you are.** Categories are capability-gated — a member sees member
  categories, a platform admin additionally sees Outages & health, etc.
- **The category taxonomy is DATA, not code** — a registry of
  `{ key, label, audienceScope, defaultChannels }`, same ethos as event/policy
  types ("a string; new types never need a migration"). Start wide, pare down by
  editing data.

## Context

Push is the reason a companion app beats the website. Rather than a bespoke push
system, the founder's insight: "if it could be an email or a text, push is just
another extension of those." The effects bus already turns events into outbound
email; push/SMS are additional channels. This also closes the on-call loop — the
watchdog's `operation.stalled` and status-page incidents become the platform
admin's "Outages & health" category, pushed to a phone.

## Options Considered
- **Bespoke push service** vs **another effector channel on the effects bus.** Chose
  the bus — reuses the matcher, dispatch outbox, drain, dead-letter, and audit;
  push inherits PII-minimal payloads for free.
- **Per-event preferences** vs **per-category.** Chose per-category (founder) —
  manageable for the user; events map to categories.
- **Hardcoded categories** vs **data-driven registry.** Chose the registry so
  "start wide, pare down" is configuration, not migrations.

## Rationale
One stream, many channels, recipient-controlled, audience-scoped, data-defined. It
generalizes ADR-029 (add device + SMS channels) and delivers ADR-025 without a new
subsystem. PII-minimal payloads (already mandated by the effects layer) make push
both good UX ("you have a new reply" + deep link) and FERPA-safe (never the content).

## Starter category taxonomy (wide; gated by capability)
- **Member:** Messages · Mentions/direct · Tasks & to-dos · Reviews due · Approvals ·
  Documents & signatures · Deadlines/calendar · Enrollment & academics *(SIS-gated)* ·
  Billing & receipts · Account & security · Announcements
- **Tenant admin:** Escalations · Inbox activity · Content review & governance ·
  Pipeline & CRM · Billing & contracts · People & HR · Data & extraction runs
- **Platform admin:** Outages & health · Stalled jobs · Deployments · Security &
  audit anomalies · Tenant lifecycle · Cost/usage thresholds

## To build (when scheduled)
- `push` (Expo) + `sms` (Twilio, already wired) added to `EFFECT_CHANNELS`; a push
  effector (`src/lib/effects/effectors/push.ts`) → Expo Push API; receipt-based dead-token pruning.
- Device registration: `POST /api/v1/{tenant}/me/devices` storing an `expo_push_token`
  EntityIdentifier per person (multi-device); removed on sign-out.
- A category registry + per-person **preferences** (category × channel), surfaced in
  member/operator settings (extends the S40 form-managed subscriptions).
- Recipient resolution extends the effects "parties" path: person → enabled channels
  for the event's category → email address / phone / device tokens.
- Route `operation.stalled` + status incidents into the platform-admin "Outages & health" category.
- **EAS push credentials** (APNs key + FCM) — the one external setup.

## Consequences
- Positive: one model for all outbound, push for free on the existing bus, on-call
  paging for the founder, PII-safe payloads, categories flex without migrations.
- Costs: device-token lifecycle + receipt handling; preferences UI; APNs/FCM setup;
  a likely volume bump on the effects outbox (watch with the existing DLQ/metrics).

## Related
- [[ADR-025 — Push Companion App and Event-to-Device Projection]]
- [[ADR-029 — Effects Layer and Provider Rails]]
- [[ADR-034 — Companion App Projection API and Mobile Auth]]
- [[Companion App]]
