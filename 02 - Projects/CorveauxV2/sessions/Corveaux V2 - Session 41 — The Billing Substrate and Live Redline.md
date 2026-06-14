---
date: 2026-06-12
project: Corveaux V2
session: 41
commit: 823dad9
status: committed-and-pushed
---

# Session 41 — The Billing Substrate and Live Redline

One sprint commit (`823dad9`, pushed with `8fc6828`): the entire billing substrate, built as pure projections of the five primitives — **zero new tables, zero migrations**. Capability-gated by `pricing_matrix` Policy presence (rule 2); seeded only into corveaux for now.

## What shipped

### Pricing as Policy
- `pricing_matrix` Policy: SKUs × institution size tiers, integer cents everywhere in canon. Editable on Settings → Billing.
- Per-institution `pricing_schedule` Policy (`subjectKind: relationship`), superseded-never-overwritten. `computeSchedule()` in `src/lib/billing/contracts.ts` is the ONE place amounts compute — shared by server actions and the client Billing panel's live totals.

### Contracts composed of Policies
- `contract_clause` Policies — the full **24-clause Corveaux stack** minted from the Iowa State MSA gap analysis (scope-of-services → arbitration → miscellaneous). Edits supersede (`validTo` + new row); generated documents **pin `clausePolicyIds`** so past paper is provably unchanged. *Attorney review still owed before buyer #1.*
- Templates are `_doc-{kind}-{name}` TenantPages designed in the GrapesJS builder. Premium contract shape: editorial onyx/gold cover sheet, agreement body (`{clauses}`), signatures, Attachment A (`{lineItems}`).
- Print geometry fits 8.5×11 exactly: `@page { size: letter; margin: 0.75in 0 }` for continuation sheets + named `@page coverSheet { margin: 0 }` for the full-bleed cover; `.doc-clause { break-inside: avoid }`.

### Documents as Entities over immutable artifacts
- `business_document` Entities + R2 artifacts + `document_for` Relationships; every transition an actor-stamped Event (`pricing_schedule_set`, `document_generated`, `invoice_issued`, `payment_received/failed`, and now `document_revised`).
- PDF export: `/admin/documents/{id}/pdf` injects print chrome at serve time (artifact stays script-free).
- Email-on-generation rides the effects bus (`document_generated` trigger).

### Stripe as an effector channel
- New `stripe` channel on the EffectDispatch outbox — app-side drain only (worker email config untouched). No SDK; form-encoded REST. Missing `STRIPE_SECRET_KEY` → `NonRetryableEffectError` → loud DEAD on the Billing settings dispatch panel.
- Webhook `/api/webhooks/stripe/{slug}`: HMAC verify, idempotent by Stripe event id, `invoice.paid` → PAID + canonical `payment_received` Event.

### Live redline (founder ask, this session)
> "annotated and editable live in the doc — kinda like word docs where you can see the changes right on the doc and approve them — including ad-hoc changes to standard language without changing the master template."

- `/admin/documents/{id}/edit` — the document itself is the editing surface. `beforeinput` interception turns typing into `<ins data-cv>` and deletion into `<del data-cv>` marks at the caret; backspacing over already-deleted text steps across it (Word behavior); typing inside your own insertion extends the mark.
- Per-change **accept/reject**: click the mark in the doc (popover) or use the changes rail; Accept all / Reject all.
- **Save redline** → pending artifact with mark styling shipped (resumable, forwardable to counsel); the document of record is untouched (`pendingRevisionKey`).
- **Apply revision** → must be mark-free (unresolved marks rejected loudly) → new immutable artifact, prior version into `attributes.revisions[]`, `revision++`, `document_revised` Event with `changedBlocks`. DRAFT-status documents only.
- Ad-hoc language changes live ONLY on that document — master template and clause Policies untouched.
- Plus the block-level **redline compare** page between any two generated documents (`?a=&b=`), built on the pure `src/lib/billing/redline.ts` (LCS blocks + word diff).
- **Verified e2e**: draft → blocked-apply (unresolved mark) → apply on CON-2026-0007 — which now genuinely carries rev 2 "(as amended)" with rev 1 in history, a leftover of the live test.

### Settings & builder polish (founder asks, this session)
- **Business identity** panel on Settings → Billing (legalName, EIN, DUNS, VAT, billing email/phone/address, remit-to → focused `brandConfig` merge) replaced the static placeholders table.
- Token reference moved into the builder as a click-to-copy **Tokens** menu (only on `_doc-*` templates).
- **Live Preview** in the builder: POSTs the current canvas to `/admin/billing/preview`, merges against the newest real prospect + schedule (sample fixture fallback) + live clauses + seller letterhead, opens ribboned HTML — no writes.

## On the founder (standing)
- `git push` — DONE this session (1e9a0b6..823dad9).
- Paste Stripe test keys into `.env` (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`); allowlist the billing email.
- Notifications form: subscribe `document_generated` / `invoice_issued` / `document_revised` triggers; tick operation.stalled; run `npx tsx scripts/seed-effect-policy.ts`.
- Fill Business identity fields; set a clean absolute `logoUrl` (current is a localhost `/_next/image` URL).
- ~~After CI: run `absolutize-mirror-base.ts`, `capture-mirror-assets.ts`, `seed-corveaux-chrome.ts`, and the three billing seeds against STAGING.~~ **DONE same session** via `scripts/_staging-pass.ts` (Neon staging-branch resolver + sequential runner). Verified: corveaux staging has pricing_matrix, 24 clauses, stripe effect policy, `_chrome`; slcc staging mirrors have 0 base tags, webchat embeds stripped (new permanent `strip-mirror-webchat.ts`, dry-run default), 170 assets rehosted into `slcc-data-staging`, 0 failures. One accepted leftover: an iframe `src=https://www.slcc.edu/locations/index` on `future` (embedded page = content, not an asset) and an inert `<!-- AdmitHub Web Chat -->` comment. `serving-sys.com` added to the capture tracker denylist. Commit `e739371`.

## Known limits (accepted v1)
- Redline tracks text edits only — formatting changes are blocked with a status hint; reject is the undo.
- `changedBlocks` scans h1–h4/p/li/td/th — edits inside cover `<div>`s count 0 (advisory metadata only).
- Server-side sealed PDF (headless Chromium) still future work (#37 continuation: e-sign ceremony).

## Late-session adds (committed `0970f8b`, `54c109c`)
- Notifications form: billing + pipeline events are now **checkboxes** (Operations / Institutional events groups); free text remains for exotics. Billing template-vars hint row added.
- **Stripe dispatch Retry**: DEAD/SUPPRESSED dispatches redrive from Billing settings (reset → fresh budget → inline drain, audited). DEAD is loud, not a dead end.
- **Revision history** panel on institution Documents — every superseded artifact viewable forever.
- PDF button on the redline editor toolbar.
- **Data Debt Report moved into the tenant admin** (founder: "should be in the tenant and not in admin") — now a Sources-group tab (`/t/{slug}/admin/data-debt`); platform-admin deep links redirect; verdict cells/adjudication unchanged. The per-source report stays under platform `/admin/sources/{id}` (source plumbing).

## PEOPLE — the HRIS seed (committed `a919bb9`)
Founder: "a linked people table — as we look at expanding to a full-coverage HRIS." Built as pure projections (no people table, no module):
- **People surface** (`/admin/people`): linked table → person records with appointments *including closed rows* (employment history), direct reports, identifiers, event timeline. Add-person creates Entity + `person_added` Event, optional position (`holds_position` + `hired`) and reporting line in one stroke.
- **Internal by default** (founder: entities made here don't surface publicly): `visibility=internal` + the block projector skips internal entities — roles, people, and reporting lines only surface in People.
- **Directory block** (founder): `corveaux-directory` GrapesJS block, filter by any attribute (`department=Admissions`), renders a top-down org chart from `reports_to` at serve time — the deliberate public projection. Island lifecycle (expand on serve, strip on save).
- **Page stewardship** (founder: every page belongs to a department; stewards; 3-month cycle; "those controls should be in grapejs"): `page_stewardship` Policy per page, **Stewardship panel in the builder toolbar** (dot = unassigned/current/overdue; department filters steward picks; Mark reviewed restarts the clock); worker cron sweep fires `page_review_due` **to the stewards** (matcher now honors trigger-resolved recipients), one fire per cycle via due-date idempotency key; email links to the page's builder.
- ON FOUNDER: subscribe "Page review due" on a Notifications policy; workers need redeploy (dev manual, staging via CI) for the sweep to run.

### Employee lifecycle + self-service (committed `6e4b0a8`)
Founder: "more encompassing — basically full workday with end to end employee lifecycle… allow auth'd users to edit themselves."
- Lifecycle on the person record: position changes (history kept; rehire-after-termination = fresh `hired`), manager changes, **compensation as superseded Policy** with history table, leave start/end, terminate (closes lines, keeps every row; direct reports dangle visibly until reassigned). Status pills everywhere. New EventTypes: position_changed, manager_changed, compensation_changed, leave_started/ended, profile_updated.
- **Self-service `/t/{slug}/me`**: any authenticated person — the canonical identity link is the authorization; self-editable fields only (preferred name, pronouns, phone, address, emergency contact, bio); HR keeps role/department/email; every change is a `profile_updated` Event (origin: self).
- Workday-roadmap not yet built: time-off balances, benefits, performance, onboarding checklists, position CRUD.

## Completion mode (session close, 2026-06-12 evening)
The marathon back half, in order: per-user notifications ("MY settings"), Contacts = directory projection, `unresolved_contact` Data Debt findings, People card view, Stripe config end-to-end (test key, CLI installed, listener, whsec harvested; **caught a live key in dev — runtime now REFUSES `sk_live_` outside production**, keys env-resolved DEV/PROD), premium invoice skeleton from the founder mock → **unified on the MSA as design master** (invoice + PO share the commercial sheet), styled selects/file pickers, PO number on the manifest (`{poNumber}` on invoices), editable institution contacts + multi-person assignment (`assigned_to` + `assignment_changed`), **live invoice status** (Stripe truth synced on view; disputes → red pill + `payment_disputed` Event; API version pinned — 2025 Stripe API hides `payment_intent`), issuance notices to the parties trio (audience: subscriber vs parties on effect policies), **branded issuance email v3** (tenant's own R2 logo, Inter, pill download CTA — billed contacts get the artifact, not the admin), staging anchor self-heals (corveaux-llc entity; loud banner instead of 500), `push-doc-templates.ts` dev→staging rail, logo field accepts its own captured path, search stops leaking contact_blocks, Data Debt clean-tenant empty state.
**History squashed on founder request**: genesis + last 4 commits only (trees verified identical before force-push); GitHub deployments pruned 52 → 4. All old commit hashes in notes are narrative labels now.
**Completion sweep**: production build green across all routes; retired section-page creator now redirects to the builder; `_component-*` rows delisted from Pages; env example completed. tsc + lint green.

## Holds
- Prod untouched. Money holds: #34 estate recapture, Casper College clone.
