---
type: decision
domain: companion-app
status: active
date: 2026-06-13
tags: [mobile, ia, context, theming, connectors, projection, day-planner]
---

# ADR-037 — Companion App Information Architecture and the Ambient Context Model

> **ACCEPTED 2026-06-13** (founder sign-off via PR #36, Session 47). **Slices A–D shipped**
> — appearance (dark/light) + App Settings, the Alerts inbox, the Home day-planner, and
> Profile manage-me. **Slice E (ambient context + shell manifest)** is the remaining piece,
> deferred pending the shell-config **Policy shape** decision (tenant-Policy-driven vs
> hardcoded defaults per relationship) — see Open Questions. The S46 app
> ([[ADR-036 — The Companion App Client and Hidden Admin Mode]]) evolves toward this; the
> triple-tap admin retires when E lands (operator becomes a context).

## Decision

The companion app's structure is governed by **three orthogonal projection axes** and an
**ambient (navigation-derived) context model**:

- **Brand** = the *institution* (accent, logo, name) — white-label.
- **Context** = *who you are here* — **ambient**: it follows the user as they enter
  domained spaces; it is never a forced upfront mode. The one exception is **Operator**, a
  deliberate, capability-gated break-glass mode.
- **Appearance** = dark / light — a user/device preference (tenant supplies both brand
  variants; user overrides or follows system).

The **"me" surfaces (Home + Profile) are holistic and role-agnostic** — the whole person,
unified, never filtered by role. Home is a **day-planner** ("here's your day") composed of
canon projections plus an optional live **connector** layer. Every surface is a projection;
the client holds zero canonical/role logic.

## Context

S46 shipped a working first client but with a *modal* shape (a fixed 5-tab member shell + a
hidden triple-tap admin). A founder design session reworked the model from first principles,
against the platform axiom (*One Reality, Many Projections; the institution is canonical*)
and the role/entitlement model ([[ADR-022 — Canonical Entitlements, Typed Supporting Tables, and Role and Person Impersonation]]).
Three realizations drove the change:

1. **Forcing a context is wrong.** People hold multiple relationships (a staff member taking
   a class). Making them *declare* a role up front and gating the app behind it is friction
   that doesn't match how they move. Better: **follow** the user's context from where they
   navigate.
2. **The "me" space should be whole.** A holistic, role-agnostic personal hub is more useful
   and more honest than a per-role filtered one.
3. **External systems are connectors, not canon.** A personal Outlook/Google calendar is the
   institution's *operational* data, not its canonical model — so it is read live and shown,
   never ingested.

## Options Considered

- **Modal context (pick a role → it filters everything)** — rejected. Forces a declaration,
  fights multi-role reality, adds a control nobody wants to manage.
- **Ambient context (follows navigation), me-hub context-null** — **chosen.** Context lives
  inside domained spaces and tracks the user into them; the assistant becomes context-aware
  for free (a question asked inside a course is course-aware).
- **Per-context filtered Home** vs **holistic Home** — chose **holistic.** Home is all of
  you at once.
- **Calendar via SSO scopes** (bundled into login) vs **user-connected connector**
  (Navigate-style incremental consent) — chose the **connector.** Keeps login consent clean,
  makes calendar an explicit per-user opt-in, keeps the data off Corveaux servers.
- **Triple-tap hidden admin** ([[ADR-036 — The Companion App Client and Hidden Admin Mode]])
  vs **Operator as an explicit context** — chose the explicit context. A break-glass mode
  should be *chosen and visible to the operator*, not a secret gesture; this supersedes the
  triple-tap.

## The model

### Axis 1 — Brand (theming)
`brandConfig` carries a **light and a dark brand variant plus a default**. The **platform
owns premium light + dark bases** (type scale, hairlines, elevation — the "not generic SaaS"
feel); the tenant **tints each mode** (accent, base tone). Effective palette resolves by
precedence: **user choice → follow system → tenant default.** (`readableInkOn` already
handles accent contrast on either base.)

### Axis 2 — Context (ambient)
A **context = a relationship/position the person holds** with the institution (`student_of`,
`holds_position`, …); the set of a person's contexts is the distinct relationship-types on
their Person node. Context is **derived from where the user is**, not selected: entering a
domained space *is* the context switch, and we follow them. The **me-hub (Home + Profile) is
context-null** (the whole person). The lone **deliberate** context is **Operator**
(capability-derived, `platform.operator`), a break-glass mode the operator *chooses* to
enter; the **tenant switcher lives inside the Operator context** (cross-tenant access is
verified + audited as a boundary crossing — the mobile break-glass path).

### Axis 3 — Appearance
Dark or light, a user setting that defaults to following the system, applied over whichever
brand variant the institution defined for that mode.

### Home — the day-planner
A **"now" view that advances with the clock**, not a calendar grid:
- **All-day band** (separate, pinned): all-day events + today's untimed todos/deadlines.
- **Happening Now** (conditional — only renders when something is live).
- **Up Next** with a relative countdown ("in 25 min").
- *(optional)* **Later today**, collapsed.
It re-buckets against `now` on a minute tick and self-advances. It **unifies three sources**
into one provenance-aware timeline: the person's **personal calendar** (connector — live,
external), their **todos** (canon — assigned conversations, reviews/approvals), and
**institutional deadlines** (canonical Events). Personal events render in *their own*
source-calendar colors; canon items carry the institution's brand accent — so "your life"
vs "the institution's stuff" reads at a glance. Tapping any row routes to its source.

### Profile — "manage me"
Identity hero (large photo, name, ambient context-title) → **relationships-as-self-service**
(my courses, my enrollments, my entitlements — each relationship is the gateway to what you
can manage for it) → **App Settings**. The test for "is it Profile?": *is it **my** X?*
Profile = the canonical you; **App Settings** = app behavior (appearance, notifications,
default landing, **connections**).

### Alerts — the inbox
The **durable ledger behind the ephemeral push** (organic push fires; the inbox persists it):
a reverse-chron feed of the person's notifications, an unread badge, each row deep-linking
**in-app** to its target — alerts resolve inside the app and **never open a browser** (founder
rule, S49: e.g. a compliance access-request alert lands on the admin **Trust** tab where you
approve/deny; an alert with no in-app home stays informational). A **gear** opens App Settings.
The inbox is a projection of the person's notification dispatches (already PII-minimal).

### Tabs + More
Surfaces are projected per the person's relationships into **domained spaces** you *enter*
(Courses, Work, …) + Home (agnostic) + Assistant + More. The top *N* are pinned as tabs; the
tail lives in More; **every item — tab or More — is its own navigable page.** **More holds
auxiliary institutional processes** (services/forms not about your own standing). The
institution configures the ordering; the client renders the manifest with **no role logic**.

### Connectors
A **connector** is a **live read** from a system the institution already runs (calendar
first; LMS/SIS later), **user-connected** via incremental consent, **display-only, never
canonized, never stored on Corveaux servers.** It projects into surfaces (the Home agenda)
alongside canon — visually unified, provenance-distinct.

## Consequences

- **Triple-tap admin retires**; Operator becomes the explicit, visible context (supersedes
  that part of [[ADR-036 — The Companion App Client and Hidden Admin Mode]]). The tenant
  switcher (already built) lives inside it.
- **The multi-role context cycle is unnecessary** — navigation drives context; nothing to
  pick.
- **New/changed server contracts:** `/me/today` (the canon agenda — dated, provenance-tagged
  items; now/next bucketing is purely client-side); a shell manifest the client renders;
  `brandConfig` gains the light/dark variant pair; a per-person Alerts read-state.
- **The assistant gains ambient awareness** for free (scoped by the current domain).
- **Connector pattern established** — extraction *canonizes*; connectors *federate live*.
  Calendar is the wedge.
- Honors [[ADR-013 — Canonical Type Registry]] (tenant owns presentation), [[ADR-022 — Canonical Entitlements, Typed Supporting Tables, and Role and Person Impersonation]]
  (role-aware, server-resolved), and the break-glass/boundary-audit doctrine.

## Open questions / deferred (explicit scope boundaries)

- **Shell-config Policy shape** — the on-doctrine heart (how an institution maps
  relationship/capability → ordered domained spaces). Named here; its concrete Policy schema
  is specified at build time, not in this ADR.
- **Forms / workflows** — drawn **OUT**. Institutional processes (add/drop, transcript
  request) are events + policies + approvals; a separate ADR. More menu links to them; the
  app does not model them here.
- **Calendar connector specifics** (scopes, incremental consent, admin-vs-user consent,
  token storage, per-provider Graph/Google API) — a **separate connector ADR**; this ADR
  names only the *pattern*.
- **Theming schema** (the `brandConfig` light/dark variant model) — to be specified with the
  appearance work.
- **Two-way calendar** (writing appointments, Navigate-style scheduling) — out of scope;
  overlaps forms/workflows.

## Stakeholders

- Travis Hornbuckle — Founder; drove the model in session.
- Institutions (tenants) — configure brand variants, the shell manifest, and which
  connectors/surfaces are enabled.
- Members (students/faculty/staff) — the holistic me-hub + ambient context.

## Related

- [[ADR-034 — Companion App Projection API and Mobile Auth]]
- [[ADR-035 — The Unified Notification Model]]
- [[ADR-036 — The Companion App Client and Hidden Admin Mode]]
- [[ADR-025 — Push Companion App and Event-to-Device Projection]]
- [[ADR-022 — Canonical Entitlements, Typed Supporting Tables, and Role and Person Impersonation]]
- [[ADR-013 — Canonical Type Registry]]
- [[project_companion_app]] (project memory)
