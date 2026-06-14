---
type: operations
status: draft
date: 2026-06-13
owner: Travis Hornbuckle
tags: [api, expo, mobile, projection]
---

# Expo App Integration Guide

How the Expo companion app talks to Corveaux. The app holds **no canonical logic** —
it renders typed projections from the `/api/v1` surface and signs in against the
institution's own identity provider. Corveaux issues no tokens.

## Base URL
`https://<tenant-host>/api/v1/<tenantSlug>/…` (path-scoped per institution).

Every response is an envelope:
```json
{ "ok": true,  "apiVersion": "v1", "data": { … } }
{ "ok": false, "apiVersion": "v1", "error": { "code": "...", "message": "..." } }
```

## Public endpoints (no sign-in)
| Method | Path | Returns |
|---|---|---|
| GET | `/home` | tenant + collection counts (`HomeDTO`) |
| GET | `/collections/{collection}?page=` | paginated canon list (`CollectionListDTO`) |
| GET | `/collections/{collection}/{slug}` | one block (`BlockDTO`) |
| GET | `/search?q=` | search results (`SearchResultDTO`) |
| POST | `/api/assistant/{tenantSlug}` | the assistant (streaming; existing route) |

Collections: `programs, courses, departments, services, policies, contacts`.

## Sign-in (OIDC PKCE against the institution's IdP)
Use `expo-auth-session`. Corveaux does **not** mint tokens — the app authenticates
directly with the tenant's provider (the same one configured under Settings →
Sign-in) and sends the resulting **ID token** as a Bearer header.

```ts
import * as AuthSession from "expo-auth-session";

// issuer + clientId come from the institution's provider (Entra / OIDC).
const discovery = await AuthSession.fetchDiscoveryAsync(ISSUER);
const req = new AuthSession.AuthRequest({
  clientId: CLIENT_ID,
  scopes: ["openid", "profile", "email"],
  redirectUri: AuthSession.makeRedirectUri({ scheme: "corveaux" }),
  usePKCE: true,
});
const result = await req.promptAsync(discovery);
// exchange code → tokens; keep the id_token; refresh via the IdP (not Corveaux).
```

Then call authed endpoints with:
```
Authorization: Bearer <id_token>
```
Corveaux verifies the token against the provider's JWKS and resolves it to the
person's canonical record + capabilities — identical to the web sign-in.

## Authed endpoints (Bearer required)
| Method | Path | Returns |
|---|---|---|
| GET | `/me` | the signed-in person's own record (`MeDTO`) — own record only |
| PATCH | `/me` | edit self-editable fields (`MeUpdateInput`); writes a `profile_updated` event |

`MeUpdateInput` = any subset of: `preferredName, pronouns, phone, address,
emergencyContactName, emergencyContactPhone, bio`. Unknown fields are ignored.

## Types
The DTOs (`HomeDTO`, `CollectionListDTO`, `BlockDTO`, `SearchResultDTO`, `MeDTO`,
`MeUpdateInput`) live in `src/lib/api/contracts.ts`. Publish them as a shared types
package (or copy) so the app and server never drift.

## Security notes
- Public endpoints serve **published canon only**; `/me` returns **only the caller's
  own record**.
- The app stores the IdP's tokens (Expo SecureStore), never a Corveaux secret.
- CORS is open on `/api/v1` for an Expo-web build; native ignores CORS.
- See [[Security Overview and SOC 2 Control Mapping]] and [[Data Handling and Retention Policy]].

## Status
- **Built + verified (public path) on dev**, held (uncommitted) pending the founder's
  release of the commit hold.
- The authed `/me` path is wired but **untested against a live IdP** (same caveat as
  per-tenant web auth) — first real device sign-in is the live test.
- **UI/UX of the app itself is the next conversation** — this guide is the contract
  the app will be built against.

## Related
- [[README]] · [[Security Overview and SOC 2 Control Mapping]] · [[Data Handling and Retention Policy]]
