# Corveaux V2 — Session 46 — The Companion App, On Device

**Date:** 2026-06-13
**Merged:** PRs #32 (expo-dev-client), #33 (premium tab shell + OIDC + white-label + app icon), #34 (admin mode, in-app canon, profile photo, assistant auth recognition), #35 (admin Institutions/Audit/Health + assistant persistence/delivery + image fix + test push).
**Builds:** app tsc / cloudflare tsc green throughout; every PR watched through CI and squash-merged. Multiple EAS iOS **preview** builds (standalone, embedded bundle — the dev-client tunnel path was abandoned after repeated connection failures).
**ADRs:** [[ADR-036 — The Companion App Client and Hidden Admin Mode]] (new).

The session the server contract became a real app you can hold. Boot → OIDC
sign-in → white-label → a premium five-tab member shell, plus a hidden
operator **admin mode**. Validated on a physical iPhone against **staging**.

## The connection saga, resolved
The Expo **dev-client + tunnel** path never connected on the founder's device
(QR + manual URL both "failed to connect"), despite the tunnel being externally
reachable (HTTP 200 + valid manifest). We stopped fighting it and switched to
**EAS `preview` builds** — standalone, JS bundle embedded, no Metro/tunnel/URL.
It just installs and runs. Tradeoff the founder accepted: no hot reload, rebuild
(~15 min) to see changes. This is the working loop now.

## What shipped (mobile, `apps/mobile`)
- **Design system** (`theme.ts`): ink palette, gold-as-accent, hairlines,
  editorial type scale; re-tints to the institution's brand color after
  white-label. Founder bar: "suuuuuper premium… not generic SaaS."
- **Session** (`session.tsx`): OIDC PKCE (`expo-auth-session`) against the
  **institution's own** provider; id_token as Bearer; SecureStore persistence;
  silent refresh on 401; push-token registration. Corveaux issues no token.
- **Member shell:** Home (`/me/home` "all about me"), Explore (public canon +
  search, rendered **in-app**), Assistant (cited answers), Alerts (per-category ×
  per-channel prefs grid + **test push**), Profile (self-service `/me` edit,
  landing toggle, sign out). Guest browse for institutions without an IdP.
- **App iconography** generated from the brand mark (mark on ink) + on-brand splash.
- **Hidden admin mode** (operator only): **triple-tap the header identity** →
  the shell swaps to a gold-railed admin tab bar (Conversations, Institutions,
  Audit, Health). **Conversations** is fully actionable (list → thread → reply,
  delivered over the conversation's channel). Institutions / Audit / Health are
  read projections. No-op for non-operators; every admin endpoint 403s without
  `platform.operator`.

## What shipped (server, `/api/v1/.../admin` + `/me`)
- `/me` now projects `avatarUrl` (canon photo) + `capabilities` (authority scopes,
  so the client can gate admin mode).
- `/api/v1/{tenant}/admin/conversations[/{id}[/reply]]` — operator-gated inbox
  list / thread / reply, reusing the web inbox data + the canonical
  `operatorReply` delivery path. New `admin-guard` (`platform.operator`).
- `/admin/institutions` (pipeline board flattened), `/admin/audit` (tenant
  `auditEvent` + boundary crossings), `/admin/health` (effects DLQ, backlog, 24h
  failures, last extraction run) — read projections reusing existing functions.
- **Assistant recognizes a Bearer id_token** (not just the cookie) — greets the
  signed-in member by name, binds the conversation to their person.
- `POST /me/test-push` — self-serve test notification to the caller's devices.

## Fixes from on-device review (in order the founder hit them)
1. **Resolve worked, both branches** — SLCC (no IdP → guest) and Corveaux (Entra
   → sign-in) verified on device.
2. **401 on first sign-in** → just Entra redirect-URI propagation + the app
   caching old config; a relaunch fixed it. The founder registered
   `corveaux://auth` under the Entra app's **Mobile and desktop** platform.
3. **Explore opened content in the system browser** → now a native `BlockDetail`
   (attributes, related links you navigate between, sources). Only external
   source citations open the browser.
4. **Assistant "JSON error"** → defensive parsing (read text, parse safely).
5. **Assistant didn't recognize auth** → app sends Bearer; route accepts it.
6. **Position pills showed `member_of`** → humanized to "Member of".
7. **Profile image didn't load** → absolutize relative canon photo URLs (RN
   `<Image>` can't resolve relatives like the web `<img>`).
8. **Operator replies weren't reaching the app user** → the assistant screen now
   **polls** the existing `/messages` widget endpoint for new operator turns.
9. **Assistant context didn't persist** → module store survives tab switches;
   conversationKey persisted to SecureStore; full-transcript rehydrate on open.

## Honest boundaries
- **Push delivery still unproven end-to-end** — the test-push button + endpoint
  exist; whether APNs delivers on the ad-hoc preview build is the next thing to
  watch. Producers (escalation / page-review) still don't emit
  `category` + `recipientPersonIds`, so organic push doesn't fire yet.
- **Profile photo fix is a hypothesis** — if the canon `photoUrl` is absolute and
  still doesn't load, the cause is elsewhere (private/authed media URL); revisit
  with the actual stored value.
- **Admin reads are v1** — flat lists, no detail drill-down beyond Conversations;
  gated on `platform.operator` only (no finer tenant-admin matrix yet).
- Everything validated by tsc + on-device smoke, not automated tests.

## Next
- Watch a real push land (test button), then wire producers to emit
  `category` + `recipientPersonIds`.
- Admin depth: institution detail, audit drill-down, health → tap-into-failure.
- Confirm the photo fix; if relative-URL wasn't it, trace the media URL.
