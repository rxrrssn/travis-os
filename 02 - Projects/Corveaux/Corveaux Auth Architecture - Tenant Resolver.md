---
type: architecture-note
domain: corveaux
status: current
date: 2026-05-27
tags:
  - auth
  - sso
  - tenant-resolver
  - platform-access
  - recovery
---

# Corveaux Auth Architecture - Tenant Resolver

## Product Principle

Corveaux auth should feel institution-owned:

> Use the account you already have.

Users should not need to know whether their institution uses Microsoft Entra, Google, Okta, SAML, OIDC, CAS, or Shibboleth. Corveaux resolves the institution first, hydrates tenant branding, and then sends the user through the correct organization sign-in path.

## Current Login UX

The login screen is intentionally minimal:

- Corveaux branding on first load.
- One resolver input: `Email, institution domain, or organization code`.
- One visible action: `Continue`.
- After tenant resolution, the card shows the tenant display name/logo and the copy:
  - `Sign in with your organization account`
  - `Use the account you already have.`
  - `Continue with your organization`
- Provider details are hidden.
- There are no Microsoft, Google, Okta, SAML, or OIDC buttons.
- The lock fallback remains decorative and unlabeled.
- All fallback failures use generic language: `Unable to continue.`

## Tenant Resolver

Implemented utilities:

- `src/lib/auth/tenant-resolver.ts`
- `src/lib/auth/provider-resolver.ts`

The resolver normalizes input by trimming whitespace and lowercasing. It safely handles malformed email-like input.

Accepted identifier forms:

- Email address
- Institution domain
- Organization code
- Tenant slug

Current config-driven mappings:

| Input | Tenant | Provider |
| --- | --- | --- |
| `corveaux` | `corveaux` | `MICROSOFT_ENTRA` |
| `corveaux.app` | `corveaux` | `MICROSOFT_ENTRA` |
| `crvx.app` | `corveaux` | `MICROSOFT_ENTRA` |
| `travis@corveaux.app` | `corveaux` | `MICROSOFT_ENTRA` |
| `demo` | `corveaux-demo-college` | `DEMO` |
| `corveaux-demo-college` | `corveaux-demo-college` | `DEMO` |
| `demo.corveaux.app` | `corveaux-demo-college` | `DEMO` |
| `demo@corveaux.app` | `corveaux-demo-college` | `DEMO` |

Unknown inputs fail gracefully with `Unable to continue.`

## Provider Model

Conceptual provider types are modeled without adding provider-management schema yet:

- `MICROSOFT_ENTRA`
- `GOOGLE`
- `OKTA`
- `OIDC`
- `SAML`
- `DEMO`
- `RECOVERY_LOCAL`

Only Microsoft Entra is functional for organization SSO today. Demo credentials remain isolated to the demo tenant. Recovery local auth is gated separately.

## Branding Hydration

The resolver returns a lightweight branding object:

```json
{
  "displayName": "Corveaux",
  "logoUrl": null,
  "primaryColor": "#B68D57",
  "accentColor": "#1E1E1B"
}
```

Branding is derived from the existing `Tenant.theme` JSON and `Tenant.logoUrl`. No schema migration is required for this pass.

## Auth Routing

Primary unauthenticated flow:

```text
/login
  -> resolve tenant
  -> tenant-aware login card
  -> organization sign-in
  -> /auth-redirect
  -> final route by role and callbackUrl
```

Authenticated route behavior:

| User | Destination |
| --- | --- |
| `PLATFORM_OWNER` | `/admin` |
| `PLATFORM_RECOVERY_ADMIN` with recovery enabled | `/admin` |
| tenant-only user | `/t/[tenantSlug]/admin` |
| unauthenticated user requesting admin | `/login?callbackUrl=...` |

`callbackUrl` is sanitized before use:

- Must start with `/`.
- Must not start with `//`.
- Absolute URLs are rejected and fall back to `/admin`.

## PLATFORM_OWNER Model

Entra bootstrap users listed in `CORVEAUX_BOOTSTRAP_ADMINS` are linked to Corveaux users on sign-in:

- `systemRole: PLATFORM_OWNER`
- Internal tenant: `corveaux`
- Internal tenant role: `tenant-admin`

They can access `/admin` because platform guards allow `PLATFORM_*` roles.

## Demo Isolation Model

The seeded demo account is intentionally scoped away from platform admin:

- Email: `demo@corveaux.app`
- Name: `Samira Patel`
- `systemRole: USER`
- Tenant: `corveaux-demo-college`
- Tenant role: `tenant-admin`

It cannot access `/admin`. If it reaches platform admin, guards redirect it to:

```text
/t/corveaux-demo-college/admin
```

The demo email is mapped to Samira Patel in the demo tenant and is no longer linked to the internal Travis Hornbuckle person record.

## PLATFORM_RECOVERY_ADMIN

Recovery access is explicit and non-seeded.

CLI command:

```bash
npm run recovery:init
```

Required env:

```text
CORVEAUX_RECOVERY_AUTH_ENABLED=true
CORVEAUX_RECOVERY_EMAIL=recovery@corveaux.app
```

The command creates or rotates:

- `systemRole: PLATFORM_RECOVERY_ADMIN`
- Internal tenant membership: `corveaux`
- Role: `platform-recovery-admin`
- Local password hash
- Audit event: `PLATFORM_RECOVERY_ADMIN_INITIALIZED`

The recovery role is not `SUPER_ADMIN`.

Recovery auth is available only when:

```text
CORVEAUX_RECOVERY_AUTH_ENABLED=true
```

When the flag is disabled, recovery credentials are rejected and route guards no longer treat `PLATFORM_RECOVERY_ADMIN` as platform-capable.

## Hidden Fallback Philosophy

The lock fallback exists for controlled local recovery only. It should not be explained on the login page.

Rules:

- No visible `admin`, `breakglass`, `recovery`, `emergency`, or `local login` labels.
- Password field remains hidden until an eligible recovery email passes the gate.
- Invalid email and invalid password both return `Unable to continue.`
- Fallback eligibility requires the recovery env flag and the scoped recovery role.

## Guard Behavior

Platform admin guard:

- Allows `SUPER_ADMIN`.
- Allows `SUPPORT`.
- Allows `PLATFORM_*`, except `PLATFORM_RECOVERY_ADMIN` only when recovery auth is enabled.
- Redirects tenant-only users to their tenant admin.

Tenant admin guard:

- Platform users can access tenant admin routes.
- Tenant-only users can access only their own `tenantSlug`.
- Tenant-only users attempting another tenant are redirected to their tenant admin.

Tenant admin sidebar:

- Shows `Platform Admin` only if the current user can access platform admin.

## Future Provider Support

Future resolver/provider expansion should preserve the same product model: resolve the tenant first, then send the user to the correct organization-owned identity path.

Planned provider support:

- Okta
- Google Workspace
- SAML
- OIDC
- CAS/Shibboleth

Future schema direction:

- Tenant-owned provider configuration.
- Multiple providers per tenant.
- Domain and org-code aliases.
- Provider health/status metadata.
- Just-in-time user linking per provider identity.

## Current Implementation Boundary

This pass deliberately avoids:

- Auth provider schema migrations.
- Customer tenant SSO setup.
- Provider button grids.
- Exposing provider internals to users.
- Changing Entra provider configuration.
