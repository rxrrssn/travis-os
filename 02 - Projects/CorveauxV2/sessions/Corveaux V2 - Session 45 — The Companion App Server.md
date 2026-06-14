# Corveaux V2 — Session 45 — The Companion App Server

**Date:** 2026-06-13
**Merged:** PRs #25–28 (boot resolution, brand fields + /me/home, notifications foundation, delivery-core), on top of #24 (projection API) from S44.
**Builds:** app tsc / cloudflare tsc / lint green throughout; each PR watched through CI and squash-merged.
**ADRs:** [[ADR-034 — Companion App Projection API and Mobile Auth]], [[ADR-035 — The Unified Notification Model]] (proposed → **built, server**).

The whole server side of the Expo companion app, built end to end. The app
itself (UI) is the next session — this delivered the contract it consumes.

## What shipped

- **Boot resolution (#25):** `brandConfig.emailDomains` on the tenant registry +
  Settings → Brand field + `GET /api/v1/institutions/resolve?email=` → which
  institution owns the domain, its brand, and its IdP (issuer/clientId) so the app
  opens OIDC PKCE prefilled. Founder OK'd email domains on the tenant table.
- **Mobile white-label + home (#26):** `brandConfig.appIconUrl` + `appIconColor`
  (founder: the app re-skins after sign-in) in the resolve payload; `GET /me/home`
  — the "all about me" home as a projection of the person's edges (record, tasks =
  assigned conversations + page reviews due, pages stewarded).
- **Notifications foundation (#27):** the **category taxonomy as DATA** (registry of
  key/label/audience/defaultChannels), a push effector (Expo Push API, PII-minimal),
  device registration (`POST/DELETE /me/devices` → `expo_push_token` per person),
  and per-person preferences (`GET/PUT /me/notification-preferences`, capability-gated).
- **Delivery-core (#28):** push + sms wired into the effects bus, **additively** —
  email/stripe branches byte-identical. The drain resolves a push dispatch's person
  → device tokens → `sendPush` (prunes dead tokens); sms → `sendSms`; the delivery
  allowlist is now email-only. The matcher targets PERSON ids for push and filters
  by each person's category × push preference. `EXPO_ACCESS_TOKEN` threaded through.

## The model, settled
A notification is **channel-agnostic** — email/SMS/push are effectors on one bus.
*What fires & to whom* = event + `effect_policy`; *how each recipient receives it*
= their per-category × per-channel preference. Push targets a person → their
devices. The category taxonomy is data, so "start wide, pare down" is config. See
[[ADR-035]].

## Honest boundaries
- **Push/SMS delivery is untested locally** — no device, no EAS push creds, no
  Twilio. Built additive + inert (nothing delivers until a push `effect_policy` +
  a registered device exist); validated by build + review. First real delivery is
  the founder's device/EAS loop.
- **Auth path** still untested against a live IdP (carried caveat).
- **Producers not yet emitting push** — escalation/page-review still email; they
  light up push once they pass `category` + `recipientPersonIds` (a follow-up,
  partly design-coupled).

## Founder / EAS handoff
- EAS creds in hand; founder still wiring the EAS side. What Corveaux needs:
  optional `EXPO_ACCESS_TOKEN` (worker secret); the EAS `projectId` (at scaffold);
  APNs+FCM live in EAS (never server-side); a physical device to test. EAS CLI is
  NOT installed here (use `npx`); `eas login/build/submit` are the founder's
  authenticated loop. Node 24 here is newer than Expo's LTS — fine for scaffolding.

## Next — the design session (the app UI)
Server side is done; the remaining work is the **Expo app** (`apps/mobile`, in-repo,
shared `contracts.ts`): boot → email → IdP prefill → white-label; assistant **splash**
(launch surface is a user setting); the adaptive **"all about me"** home (tiles from
`/me/home`); Explore (public canon); Notifications + the **preferences grid** (backed
by the categories + preferences API). That's the design conversation to have with the
founder before building screens.

## Related
- [[ADR-034 — Companion App Projection API and Mobile Auth]] · [[ADR-035 — The Unified Notification Model]]
- [[Expo App Integration Guide]] · [[Companion App]]
- [[Corveaux V2 - Session 44 — Security, Compliance, and the Companion API]]
