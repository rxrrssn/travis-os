---
type: session
project: corveaux-v2
session: 49
date: 2026-06-14
tags: [corveaux, compliance, trust-center, push, companion-app, probes, honesty, staging, adr-038]
---

# Corveaux V2 - Session 49 — The Trust Center Access Flow and Honest Probes

**Merged:** PRs **#63–#69** — seven bundles, each squash-merged on green CI (master → staging).
**Builds:** `tsc` (app) / `apps/mobile` `tsc` / `eslint` green throughout.
**Mode:** interactive — the founder drove a triage of the live `/admin/compliance` controls on staging, then a precise app-behaviour correction.
**Theme:** the [[project-compliance-hub|Compliance Control Plane]]'s Trust Center document-access flow became **operator-actionable** (push + in-app approve/deny), a run of **probe-honesty** fixes turned cryptic ambers into honest readings, two staging gaps were closed, and the companion app gained a firm rule: **alerts never open a browser.**

This session followed the H1 Trust Center merge (#52). It was less about new surface and more about making the existing hub **honest and reachable** — the founder worked down the Unmeasured/Attention controls one at a time, and we resolved each by fixing the *plumbing or the probe*, never by attesting a false green.

## The Trust Center access flow becomes actionable (#63)

A gated-document request on `trust.corveaux.app` previously only landed in the web hub. Now:

- **It pushes to platform operators.** `requestDocumentAccess` fires a `compliance_access_requested` trigger through the S47 effects/push pipeline (`safeEvaluateEffectTrigger`, category `compliance`). Operators are subscribed via `OPERATOR_TRIGGERS` (seed-push-policies) + the `TRIGGER_CATEGORY` map.
- **It's approvable/deniable from the companion app**, not just the web. New **Admin · Trust** tab + a platform-level `/api/v1/admin/compliance/access-requests` (GET queue / POST decide), operator-gated via `requireOperatorHome`. Approval still mints the time-limited download token and shares the link; decisions audit into the platform trail with the verified principal as actor (`writeRemotePlatformAuditEvent` now accepts a principal-derived actor).
- The decision core was extracted to `applyAccessDecision` in `compliance/access.ts` — **one session-agnostic path** shared by web and mobile, so the two can't drift.

## The probe-honesty run (#61, #62, #64, #67, #69)

The founder's instinct held all session: an honest amber beats a faux green, **but a cryptic amber helps no one**. Each of these turned a confusing reading into a true one:

- **`tls_enforced` (#62, #64):** a Worker can't see its own app-applied HSTS on a self-subrequest, and fetching its own custom domain returns a Cloudflare **522**. Neither undermines encryption-in-transit (the 522 still came back *over TLS*, and HTTP upgrades to HTTPS). The probe now verifies HTTPS + no-plaintext and treats the self-fetch status as availability (a separate control), not encryption.
- **`github_branch_protection` (#67):** verified independently with `gh api` that **both** classic protection **and** rulesets return `403 "Upgrade to GitHub Pro"` — a **free-plan private-repo** limitation, not a token/polling problem. The probe now says so honestly and names the compensating controls (PR-only workflow + required CI), distinct from a real permission 403. True green needs GitHub Team or a public repo.
- **`accessibility` (#66 → #69):** the `COMPLIANCE_A11Y_URL` default was empty (an unset GitHub *Variable* arrives as `""`, not undefined — `??` never fired; fixed with `|| `). But pointing it at the app's own host hit the **same self-fetch 522**. Since the a11y check needs the page HTML, it can't be passed through — so it now detects the self-host and reads honestly ("can't self-scan; point at an external page or wire a CI axe/pa11y scan"). The genuine green path is an external scan.
- **`prod_secrets_present` / `secret_scanning` (#61):** corrected the secret list and let GitGuardian-in-CI satisfy secret scanning (GitHub-native needs Advanced Security on a paid plan).

## Two staging gaps closed

- **Push policies seeded on staging.** Ran `seed-push-policies.ts` against the staging corveaux branch (verified `ep-small-band`, not prod). Both organic-push policies were **created** — they'd never been seeded on staging, the long-standing founder TODO. Verified the operator policy carries `compliance_access_requested`; the `compliance` category defaults to push+email, so the chain delivers end-to-end.
- **Inbound signing secret wired (#65).** The founder added `RESEND_INBOUND_SIGNING_SECRET_STAGING`; the staging deploy now passes it to the app worker (conditional-on-empty, like `GITHUB_TOKEN`), so `inbound_fail_closed` closes once it deploys.
- **Six stalled tenant operations** were cancelled under explicit founder authorization, with a `operation_cancelled` audit Event per op preserved in the platform trail (status → CANCELLED, records kept).

## The app rule: alerts never open a browser (#68)

Wiring the access-request push surfaced a violation: the Alerts inbox opened an alert's `link` in `WebBrowser`, and an operator alert's link is an internal admin route (`/admin/compliance/requests`) — so it dumped the user into the non-mobile web admin. The founder's rule, emphatic: **push notifications must resolve inside the app.** ([[feedback-app-no-browser]])

- The session now carries a **navigation intent** (`openAdminTab` / `pendingAdminTab`); `AdminShell` consumes it to select a tab.
- `Alerts` maps an alert to an in-app destination: `compliance` → the **Trust** tab (in-app approve/deny), `escalations`/`inbox` → **Conversations**. Anything without an in-app home stays informational (title + body carry the context); the row just isn't tappable. `WebBrowser` removed from the alert path.

## Also

- The updated companion app's **iOS `preview` build** was queued to EAS (credentials already configured; standalone, points at staging) — the build link is in the conversation.

## State at close

- master → staging only; **prod untouched.** Several staging deploys stacked from #63–#69.
- **What I count as honest residual** (genuinely Unmeasured/amber, not hidden): branch protection (free-plan ceiling), accessibility (needs an external scan), the destructive retention executor (still unarmed by design).
- **Founder TODOs still open:** set `COMPLIANCE_SWEEP_URL` (continuous cron; on-demand button works now); seed the risk register + vendor list (+ upload subprocessor SOC 2/ISO reports for the inherited controls).
- **Offered, not yet built:** OS-banner-tap deep-link (a `Notifications` response listener), and a CI axe/pa11y job for real WCAG measurement.

## Related
- [[project-compliance-hub]] · [[project-companion-app]] · [[feedback-app-no-browser]] · [[ADR-038 — Compliance Control Plane]]
- Prior: [[Corveaux V2 - Session 48 — The Compliance Control Plane]]
