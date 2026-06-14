---
type: decision
domain: api
status: active
date: 2026-06-13
tags: [api, mobile, expo, auth, projection, ferpa]
---

# ADR-034 — Companion App Projection API and Mobile Auth

## Decision

The Expo companion app is **another projection of the institutional model** with
**zero canonical logic on the client**. It consumes a typed, versioned
`/api/v1/{tenantSlug}/…` projection API. Three commitments:

1. **Typed projections, in-repo, no drift.** The app and server share the same DTO
   types (`src/lib/api/contracts.ts`); the app is a workspace package in this repo
   (`apps/mobile`) so it cannot fall out of sync with the contract.
2. **Mobile auth = verify the institution's IdP token; Corveaux issues no tokens.**
   The app does OIDC PKCE against the tenant's existing provider and sends the ID
   token as a Bearer header; the API verifies it against the provider's JWKS and
   resolves it to the canonical identity by the **same path the web callback uses**.
3. **Single app, email-domain boot, then white-label.** One store listing. First
   launch takes an institutional email → resolves the tenant by email domain →
   opens that tenant's IdP with the email prefilled (`login_hint`) → on success the
   app white-labels from the tenant's brand. The domain→tenant map lives on the
   **tenant registry** (`brandConfig.emailDomains`, mirroring `customDomains`), so
   the boot lookup reuses the existing platform host-resolution pattern — no
   separate index.

## Context

The companion app needed an end-user API; today's routes are cookie-session
(operator) or public/webhook, and native apps can't ride cookie sessions. The build
also had to honor the FERPA/SOC 2 posture (ADR-032, the ops docs): a new
authenticated surface that can touch a member's record.

## Options Considered
- **Auth: verify IdP token** vs **Corveaux mints its own API tokens.** Chose verify —
  standards-based (PKCE), reuses per-tenant auth, and we never become a token
  issuer or store refresh tokens (revocation stays with the IdP). Less to secure,
  the right posture for student data.
- **App location: in-repo package** vs **separate repo.** Chose in-repo (founder:
  "I don't want any drift… it's all projections of the same thing") — shared types
  can't diverge.
- **Email-domain canon: tenant registry** vs **auth_provider Policy** vs **org-entity
  identifiers.** Chose the tenant registry (`brandConfig.emailDomains`) because the
  platform host-resolution pattern already reads brand_config across tenant rows, so
  the pre-tenant boot lookup is trivial and needs no separate projection index. (If
  domains get reused beyond login, promote to org-entity identifiers later.)

## Rationale
Doctrine: the app is a projection, so it reads typed projections and holds no canon
logic. The identity boundary is the tenant boundary — verifying the institution's
own IdP token keeps that boundary intact on mobile exactly as on web, with no new
secret surface. Email-domain boot gives a single app that still *feels*
white-labeled, with the routing fact living where the analogous web-routing fact
already lives.

## Built (this session)
- `src/lib/api/{respond,contracts,auth}.ts` and `/api/v1/{tenant}/{home,collections,search,me}`.
- Public read endpoints reuse `loadTenantHome/loadCollection/loadBlock/searchTenant`
  (PUBLISHED-only); `/me` GET+PATCH reuses `getPersonDetail` + the self-edit pattern
  (`profile_updated`, origin self), audited.
- Verified on dev: public endpoints return the envelope; `/me` is 401 without a token.

## Still to build (planned)
- `brandConfig.emailDomains` + `GET /api/v1/institutions/resolve?email=` (boot resolution
  returning tenantSlug + brand + issuer/clientId for PKCE).
- `apps/mobile` Expo scaffold (boot → email → IdP prefill → white-label; assistant
  splash, configurable; the adaptive "all about me" home).
- A `/me/home` aggregation endpoint projecting the person's tiles (record, tasks =
  reviews-due + assigned conversations + approvals, pages stewarded, courses when
  enrollment is canon).
- Push + the unified notification model — see [[ADR-035 — The Unified Notification Model]].

## Consequences
- Positive: one typed contract drives web + mobile; mobile auth adds no secrets;
  public/`/me` boundaries match the web; FERPA-safe (own record only, PUBLISHED-only public).
- Caveat: the authed path is **untested against a live IdP** (same as per-tenant web auth) — first device sign-in is the test.
- jose rides in via next-auth; isolate as a direct dep if needed.

## Related
- [[ADR-022 — Canonical Entitlements, Typed Supporting Tables, and Role and Person Impersonation]]
- [[ADR-032 — The Institutional Assistant, Canonical Grounding, and the PII Boundary]]
- [[ADR-035 — The Unified Notification Model]]
- [[Expo App Integration Guide]] · [[Companion App]]
