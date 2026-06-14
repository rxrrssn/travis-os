# Corveaux V2 — Session 42 — The Signature and the Boundary

**Date:** 2026-06-12
**Commits:** `9d1e262` (arc 1 — e-sign ceremony), `ade9985` (arc 2 — per-tenant auth providers + send-equals-internal-execution)
**Builds:** tsc / lint / production build green; CI → staging in flight at close.

## Arc 1 — The E-Sign Ceremony (9d1e262)

The launch-plan finale: buyer #1's first look behind the curtain is digitally signing inside the platform they just purchased.

- `src/lib/billing/signature.ts` — `createSigningRequest` (single-use 14-day token on the document, `document_sent_for_signature` Event, parties email with the ceremony link), `findCeremonyByToken`, `executeSignature` (seals the artifact with a Signature Certificate carrying the document SHA-256, flips SIGNED, `contract_signed` Event, then the choreography: stage → closed_won + tenant → ACTIVE when one exists — loud on failure, never silent).
- Public ceremony page `/t/{slug}/sign/{token}`: onyx header, sandboxed artifact iframe, typed-name adoption with explicit ESIGN/UETA consent. Founder verdict: *"the signing ceremony is gorgeous… very well themed."*
- Documents table: send-for-signature with signer select, cancel, out-for-signature pill, sealed ↗ link. Redlines blocked while a signing window is open.

## The Founder Doctrine of the Day — Send IS the Internal Execution

> "when the auth'd user in the corveaux tenant sends for signature, before its fired off to the institution, that should be the moment that it is signed internally. and then that whole module will be RBAC'd later."

Countersign-after died in design. `sendForSignatureAction` now executes the **provider side in the same stroke**: session name/email + canonical position as title → "Signature Certificate — Provider" seals into the artifact + `contract_signed_internally` Event → the artifact swaps to the provider-signed version, so the counterparty signs a document Corveaux has already executed. The hash chain proves ordering (provider cert records the reviewed document's SHA; counterparty cert records the provider-signed version's SHA). Cancel restores the pre-send artifact so a later redline never bakes a stale certificate into a revision.

Plus the presentation ask: adopted cursive signatures render **on the signature lines** with Name/Title/Date mapped into the form fields (provider block at send, counterparty block at execution), certificates as artifacts below. Template redesigns degrade to certificate-only, never error.

Rehearsed end-to-end twice (CON-2026-0011/0012): both certificates sealed in order, token retired, reuse blocked, stage restored to demo_requested, test documents lifecycle-closed.

## Arc 2 — Per-Tenant Auth Providers (ade9985)

**The identity boundary is the tenant boundary.**

- Each tenant's IdP = an `auth_provider` Policy: provider kind (Entra / generic OIDC), label, issuer, client id, and the **name** of the env var holding the secret (`TENANT_AUTH_SECRET_{SLUG}` convention) — the credential never enters canon; a missing env fails loudly on the Sign-in settings page.
- next-auth lazy initialization: `tenant-{slug}` providers load per request from the auth path; the login page leads with the destination tenant's sign-in and builds a one-off instance for the action. The platform Entra path is byte-for-byte unchanged — zero lockout risk.
- Tenant identities resolve in **their own** tenant DB (`auth_subject` identifier or email bootstrap of a pending identity entity, `has_identity` person link, capability resolution).
- Sessions carry `authTenantSlug`; `/t/{slug}/me` requires a home-tenant identity OR `platform.operator` (break-glass, audited `tenant_identity_boundary`). Pre-arc tokens grandfather to the platform home tenant.
- Settings → Sign-in: provider form, secret presence pill, and the IdP app setup instructions (exact redirect URI `{base}/api/auth/callback/tenant-{slug}`, Entra app-registration steps, OIDC discovery requirements).
- **Untested against a real second IdP** — no second Entra/Okta app exists yet. The next institution onboarding is the live test.

## Lifecycle Question Raised (undecided)

Founder asked what the forge sets tenant status to, and whether proposal-stage sends the contract. Findings: the forge mints tenants **ACTIVE** (so the signature choreography's ACTIVE-flip is currently a no-op for forged tenants), and nothing is wired to the proposal stage — the contract send is manual (correctly so). Recommended: forge → PROVISIONING with serving gates loosened, making the signature flip the real go-live; proposal-stage auto-generates the DRAFT contract (never auto-sends). Awaiting founder decision.

Also answered: these contracts need no notarization (commercial B2B MSAs under ESIGN/UETA); attorney review of the 24 clauses is still owed before buyer #1.

## Observed

SLCC's pipeline relationship sat at `closed_won` entering the first rehearsal despite the S41-close restore — possibly founder ceremony testing. Restored to `demo_requested` both times.

## Next

- **Arc 3:** entitlements third axis (task #36) — tenant MODULE entitlements as projection of contract canon; the signing module's RBAC rides this.
- Founder holds: forge-status redesign decision, attorney clause review, Stripe live keys at prod, prod promotion gate.
