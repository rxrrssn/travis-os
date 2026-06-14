---
type: session
project: corveaux-v2
session: 40
date: 2026-06-11
tags: [corveaux, sprint, admin-redesign, institutions, mirrors, dlq, builder, commit]
---

# Corveaux V2 - Session 40 — The Sprint

A full founder-at-the-keyboard sprint day (continuing from [[Corveaux V2 - Session 39 — Snapshot-on-Save Page History]], which folded into this commit). One large commit by design: **`8fc6828`** — 59 files, +4,014/−588. Push is the founder's action; CI→staging on push.

## Admin redesign (two passes, founder-steered)

First pass was onyx/gold/serif luxury — founder: "I don't like it. I want it to be more like apple or resend's UI." Pivoted to **Apple-light**: Inter via `next/font`, cool neutral palette scoped to `.admin-shell` (tenant-facing pages keep warm brand tokens), black primary buttons, gold surviving only as a trace (focus rings, sidebar hover/active indicator, canon-island markers). Sidebar icons (`NavIcon`, inline SVG, no icon library) + active-page state (`AdminNavLink`, `aria-current`). Nav coherence audit: kicker convention = area name on list pages, record type on detail pages, ADR numbers removed from UI copy; the Content queue got its missing header. **The black-on-black bug class**: Impressionist-injected theme CSS leaked into the admin (`.tenant-shell main a { color: primary }` painted admin link-buttons black-on-black) — fenced with `:not(.admin-shell *)` guards + admin font pinned; table/panel link rules exempt `.admin-button`. Tenant-branded `.admin-button.brand` (opt-in, hero actions only — Publish, builder Save) rides `--t-primary` with build-time-computed `--t-on-primary`/`--t-primary-hover`.

## Institutions (né Pipeline)

Founder: kanban felt hollow, "pipeline" felt wrong, and **"Institutions will eventually become the repository for all documents, files, notes, etc between the org and Corveaux."** Renamed surface (route `/admin/institutions`, labels, building icon; `pipeline_definition` mechanism names unchanged per module-naming doctrine). **Table-first**, kanban behind `?view=board` (HTML5 drag-drop commits `movePipelineStage`; dropping into the forge stage opens a confirm — ADR-030 makes that drop the provisioning authorization). Detail URLs use `proposedSlug` (`/admin/institutions/slcc`, relationship-id fallback). Manifest expansion: `PROSPECT_MANIFEST_KEYS` (~34 fields: identity/location/web-estate/catalog/brand-seed/deal) is the single source of truth — shared `ManifestFields` renders intake + edit-in-place; **forge brand handoff** (manifest → generated tenant `brandConfig` merge; colors seed `themeConfig` only when empty; `legalName` names the tenant). Contacts: 4 role slots as Person entities with title/phone. **Actor column on the timeline** — every pipeline write stamps `payload.actor` (events are immutable → stamped at write time). **Logo capture**: a pasted logo URL is fetched into the tenant bucket on save (`logoSourceUrl` keeps provenance), rendered natural-aspect (no box — founder caught the trimmed-background look).

## Builder

- **Page history** (from S39): snapshot-on-save + undoable restore at `/admin/builder/{slug}/history`; retention capped at 30 versions; `r2-objects.ts` dual-backend (CLOUDFLARE_API_TOKEN REST preferred — founder diagnosed the dead-scoped S3 keypair live).
- **Image upload** wired to tenant media (`/admin/builder-upload` → `media/builder/`).
- **Selection → reusable component** ("Make component" wraps selection in a `corveaux-component` marker; Save mints the `_component-{ref}` definition) + a palette category of existing shared components.
- **`@entity.field` islands** (founder: "like @course:math-1010.description"): two-stage picker (entity → full card | attribute), `data-field` on `corveaux-block`, rendered live from canon at every serve, inline mid-sentence, loud on missing values. Gap flagged: `.prerequisites` are Relationships post-ADR-018, not attributes — relationship-backed projections are the follow-up.
- GrapesJS reskinned light — the durable fix was repointing GrapesJS's CSS custom properties (`--gjs-secondary-color` etc.), not just the theme classes.

## Self-sufficient mirrors (founder: "completely self-sufficient")

- `<base href>` removed from all SLCC mirror docs via **absolutize-first** migration (`scripts/absolutize-mirror-base.ts`, dry-run default, bulk R2 backup); `rewriteInternalLinks` now derives the institution host from `page.sourceUrl` (it used to bail without a base tag).
- **All 168 subresources captured** into the tenant bucket (`scripts/capture-mirror-assets.ts`, manifest-keyed, CSS recursively rewritten incl. fonts) and documents rewritten to `/api/tenant-media`. Trackers denylisted (rehosting beacons is meaningless). **AdmitHub webchat stripped** — founder: "will be replaced with an internal assistant" (assistant = projection, per axioms; design pending).
- SLCC renders pixel-correct if slcc.edu disappears = the cutover posture. **Worker-side `page.reconstruct` parity (absolutize + asset capture at rip time) is now part of #34's definition.**

## DLQs (task #16 — no-silent-fails checklist closed)

`{slug}-extraction-dlq-{env}` behind both tenant queues; the worker consumes its own DLQ (`dead-letter.ts`): raw message archived to R2 `dlq/{runId}/`, work item → FAILED (+ finalizer enqueued if it was the last open item), dead finalize → run + operation FAILED via platform callback, `operation.stalled` effect fired (deduped per run+kind). Handler never throws — a dead letter must not dead-letter. Queues created dev+staging (+production names so the eventual prod deploy doesn't trip); renderer + dev configs updated; **dev workers deployed**. Founder's call: **notification trigger subscriptions are form-managed per tenant** (lifecycle checkboxes + event-type field on Settings → Notifications) — seed scripts demoted to non-clobbering bootstrap (the old full-replace was silently wiping form edits on every staging deploy). REMAINING: tick "Operation stalled / dead-lettered" in each tenant's Notifications form to arm the emails.

## Corveaux chrome (Corveaux-on-Corveaux opener)

`scripts/seed-corveaux-chrome.ts` mints a designed, fully self-sufficient `_chrome` (+ `corveaux-header`/`corveaux-footer` shared components) for the corveaux tenant — seeded in dev, verified: `/t/corveaux/m/home` serves the section-built home inside the onyx/gold chrome ("Home | Corveaux"; the chrome-fallback title hardcode to SLCC is fixed). The master site is now builder-editable through the same machinery as captured tenants. NOT flipped: corveaux into `MIRROR_ROOT_TENANTS` (changes public serving model — founder's call).

## Also

Stale memory corrected: staging `pipeline_definition` IS seeded by CI (deploy step exists); pipeline-definition seed's full-replace is correct (code-authored rules), unlike effect policies (form-owned). Dev-server orphan incident: TaskStop reported stopped while next dev survived holding :3000 — Bug 13 pattern again; killed by PID, restarted.

## State at close

- Commit `8fc6828` local on master, tree clean. **Founder pushes** → CI → staging (also auto-arms staging DLQ consumers + runs seeds).
- After push: run `absolutize-mirror-base.ts` + `capture-mirror-assets.ts` + `seed-corveaux-chrome.ts` against STAGING (dev-only data work today).
- Backlog: #34 recapture (held — money; now includes worker capture parity), relationship-backed field islands, board value rollups/optimistic moves, Institutions docs/notes panels, internal assistant design, #36/#37/#29/#25, ADR-031.

## Related

- [[Corveaux V2 - Session 39 — Snapshot-on-Save Page History]]
- [[Corveaux V2 - Session 38 — The Mirror Product]]
- [[Corveaux V2]]
