---
type: system
domain: tdx
status: active
date: 2026-07-15
tags: [tdx, teamdynamix, kb, cti, ringcentral, patterns]
---

# TDX Build Patterns

Concrete build decisions inside the SLCC TeamDynamix tenant: how the Contact Center app is modeled, the HTML/merge-field patterns for recap email + surveys + KB, the custom-attribute URL technique and its limits, dashboards, time-off and scheduled/bulk ticket patterns, release/ITSM semantics, and the full RingCentral → TDX screen-pop integration design. This is the implementation layer under [[TDX]]. Environment specifics are real: ticketing **App 241**, primary intake **Form 2431 "Student Interaction Record"** (Type **409 Contact Center**, Classification **46**, Account **759 Contact Center**), sandbox host `support.slcc.edu/SBTDNext/...`.

---

## Contact Center data model

The load-bearing decision: **the data model lives in fields, not in the service tree.** TDX only gives you one meaningful selectable dimension (Service), so trying to encode hierarchy into Category → Service → sub-service fights the platform.

| TDX object | What it actually is | Use it for |
|---|---|---|
| **Category** | A folder/container for Services. Not a reporting field. | Grouping only |
| **Service** | The selectable thing. Drives routing + reporting. | Student **intent**, not departments |
| **Ticket fields (attributes)** | The real data model | Reason, Outcome, Channel, Business Area, phone, agent |

**Hard rules:**
- **Services = student intent, keep to 6–8.** Admissions Help, Financial Aid, Registration, Advising, Billing, General. Stable for years. Never make Services = departments (breaks when org changes, kills first-contact-resolution reporting) and never one giant "Contact Center" service (reporting black hole).
- **Drill-down = dependent fields, not nested services.** Service → dependent **Reason** dropdown → **Outcome** field. Every Reason must be mapped to a Service or it appears nowhere; include a "General" per Service; enforce naming consistency ("FAFSA Help" vs "FAFSA help" will fragment reporting).
- The Contact Center services are restricted to the team internally — they are reporting/triage infrastructure, not a public service catalog.

**Hidden + defaulted fields for speed.** The intake form should enforce values so agents type almost nothing:
- **Agent** = logged-in TDX user (use native Created By / Responsible before adding a custom Agent field).
- **Channel = Phone**, **Source = RingCentral** hardwired as form defaults on the intake form.
- Note the TDX gotcha: a field set hidden/read-only on a form keeps re-enforcing its value every time that form is used — deliberate for defaults, dangerous if unintended.

**ITSM ticket-type constraint.** TDX (ITSM) requires one of each classification to exist, so Incident cannot be deleted even though **Service Request is the real container**. The `+ Incident` button label is system-controlled and cannot be renamed. Control behavior at the **form (ticket type) layer**, which is role/group-restricted: put all real forms under Service Request, and disable Incident forms for end-user groups ("Allow ONLY the associated groups below to select this form for entry"). Result — Incident becomes a dead button, Service Request is the only thing that works. What the sole app admin sees is not what a group-restricted end user sees.

**Bulk attribute entry is a real pain point.** There is no clean UI bulk-import for attribute (dropdown) *values* — a 200-item Reason list cannot be entered cleanly by hand. Workarounds: paste newline- or semicolon-delimited chunks into the "Add Value" box (some instances split, some paste as one blob), build the list once and reuse across forms, or use the API. Start with ~40–60 reasons and expand from real call data rather than perfecting upfront.

---

## Custom attributes & the attribute-URL technique

**Finding an Attribute ID:** open the attribute in TDAdmin → Custom Attributes; the ID is in the config URL (`AttributeID=7176`). Do **not** use the name.

**The URL prefill pattern** (the theoretically-correct syntax):
```text
/TDClient/{OrgID}/{AppID}/Tickets/New?formId={FormID}&CustomAttribute_{AttributeID}={Value}
```
- Dropdowns require the **option ID**, not the label.
- URL-encode values: space → `%20`, `+` → `%2B` (a raw `+18015551234` silently fails).
- `{{#Attribute7176}}` seen in a form/template is a **Handlebars/mustache render token, not the input name** — its presence does not prove the query-string parameter works.

**Verified limitation — this does NOT work on TDNext `Tickets/New`.** Exhaustive live testing (correct form ID, real field, `%E`-formatted values, single-line integer test attributes 7227/7228 on test form 2445) confirmed the new-ticket page ignores `CustomAttribute_####` query params. It is not a formatting problem — **the environment does not accept custom-attribute prefills on the new-form URL.** `RequestorUid` passed via iPaaS does populate, which proves values *can* flow — just not custom attributes through the browser URL.

**Why `PeopleSearch` works but `Tickets/New` doesn't:** `TDNext/Apps/People/PeopleSearch?PhoneNumber=555-555-5555` works because that specific page is *built* to read a `PhoneNumber` page parameter (and it wants the `(801) 957-5057` format). That is page-level behavior, not a general "TDNext reads any query param" capability. The documented custom-attribute path is the **API/web-service body** (`Attributes` array of `{ID, Value}`), not URL prefill.

**Takeaway:** stop treating custom-attribute URL prefill as fixable. Either enforce the value on the form as a default, or set it post-save via workflow/API.

---

## Recap email, after-call survey & merge fields

Recap and survey emails are hand-built responsive HTML (table-based, inline CSS, mobile media queries) on the **SLCC brand palette** — primary `#0F4B90`, `#109AD6`, gold `#ECAA20`; type Roboto Condensed / Roboto / Arial fallback; a top gradient bar, rounded summary card, pill CTA, and a dedicated logo slot. Contact line: `801-957-SLCC (7522)`.

**TDX notification merge tokens** (Handlebars-style, usable in workflow email bodies):
- `{{FirstName}}`, `{{AgentName}}`, and plain custom placeholders like `{{ReasonForContact}}`.
- Conditional attribute block: `{{#Attribute7159}}{{Name}}: {{Value}}{{/Attribute7159}}` (7159 = Reason) — renders only if the attribute has a value.
- `{{{Description}}}` — triple-mustache to emit the ticket's rich-HTML description unescaped.

**After-call survey invite:** distinct from the recap email — reframe the whole message as feedback, not resources. Copy standard: "short 3-question survey," "less than 30 seconds," single CTA ("Share feedback"). Keep it under one card; drop the resource blocks a recap uses.

**Reply-to behavior — know which model you're in:**
- IT's default ticket notifications use **Reply-To `TDXReplies@domain.edu`** → replies ingest back into the ticket (closed-loop threading).
- A workflow **Send Notification** step instead sets **Reply-To = Creator or Primary Responsible** (person-based replies). Choose deliberately per template — closed-loop for support threading, person-based for a human touch.

---

## KB article / template / category patterns

**Authoring reality:** edit in **Source** mode; TDX supports HTML (incl. Bootstrap in supported areas) but **sanitizes on display**, stripping unsupported HTML/CSS/attributes per the org allowlist. So: clean HTML, **inline CSS, no JavaScript, no external dependencies**, and always **preview the published view** — the editor lies. Images go responsive by removing fixed width/height in source. Reusable layouts are saved as **KB article templates** (HTML defined in the Body field). Strip source-doc citation artifacts (`:contentReference[...]`, `oaicite`) before pasting.

**Template families:**
- **Help/how-to article** — hero, info cards (audience/time/updated), quick-links TOC (anchor `#id` jumps), overview, numbered step cards, tip/FAQ/related.
- **Policy / Procedure / SOP** — document-style: gradient header with type label, metadata table (owner, effective date, version, review date, applies-to, approval authority), TOC, purpose/scope/definitions/responsibilities/procedure/exceptions/related, and a **revision-history table**. Same shell, swap section 5 (Policy Statement vs Procedure Steps vs step cards + Required Tools/Preconditions/Quality Check).
- The live SLCC SOP variant uses a **gold `#FED301` header band with the SLCC logo on the right**, blue-left-border (`#2563eb`) step cards, and `When to Use` / `Important` / `Tips and Best Practices` callout blocks. Standing rule: convert vendor docs to **staff**-facing (never "faculty"), extract the actual workflow rather than copying wording.

**SOP vs Guide is a first-class distinction:**
- **SOP** = "this is the way, follow it" — directive, numbered, enforced. Must have Purpose, Procedure (numbered), Expected Outcome.
- **Guide** = "here's help if you need it" — supportive, flexible, screenshot-heavy. Must have Overview, Instructions.
- Enforce with **title prefixes `[SOP]` / `[Guide]`**.

**Category structure — topic-first, no duplication.** Do NOT split SOP-tree vs Guide-tree (creates dupes and "which do I open?" confusion). One category per topic (Scheduling & Availability, Student Interactions, Case/Ticket Management, Systems & Tools, Academic Processes, Communication & Outreach, Reporting & Data, Training & Onboarding); SOPs and Guides coexist inside, separated by prefix. Gut-check: "where do I go to fix this?" must have exactly one answer. Ban junk-drawer categories (General/Other/Misc/Resources).

**Category icons (Client Portal KB):** you can pick an icon from the **predefined TeamDynamix library** and set its **color (hex)** — but **no custom image/SVG/PNG uploads** and no HTML/CSS override. Fake "branded" by color-coding by type (e.g., blue = Guides, green = SOPs, red = Alerts) plus tight naming. System category descriptions run ~20 words, e.g. *"Central hub for EAB Navigate360 guides, SOPs, and resources supporting staff in student tracking, communication, scheduling, and success workflows."* (same pattern for Starfish, Banner 9).

---

## Dashboards (TDNext desktops vs Desktop Designer)

A **Desktop = a dashboard** (report widgets, ticket grids, charts). Two build surfaces with different permission levels:

| | TDNext Desktop | Desktop Designer |
|---|---|---|
| Location | TDNext (front end) | **TDAdmin, org level** |
| Permission | App admin can do it | **Org/Enterprise admin only** |
| Sharing | Manual → users/**groups** | Centralized, role-based |
| Default-per-role | No | **Yes** |

**Desktop Designer is not in App Admin** — being sole admin of App 241 does not surface it; it is a platform-level feature. Workaround without org rights: build desktops in **TDNext**, share to groups, standardize naming; migrate to Desktop Designer later (partial carryover, not a true promote pipeline).

**The group ≠ role trap.** Desktop visibility binds to **Security Roles / Functional Roles**, *not* to the app's **Associated / Responsibility Groups** (which are inherited from the org level and drive ticket ownership/routing). Bridge manually: each user gets a Responsibility Group (for tickets) **and** a Security Role (for dashboards); assign Dashboard A → Coaching role, Dashboard B → Contact Center role; set a default desktop per role so users land correctly. Reports-first: filter by **Responsibility Group** or **Assigned To** so one report serves multiple audiences and dashboards stay low-maintenance.

---

## Time-off, scheduled & bulk tickets

**Time off** is best modeled as a **ticket-based "Time Off Request" service** (Start/End date fields, Time Type, workflow approval, private + notification-suppressed on approval) — fully reportable, fits the existing hidden-field model. There is no native PTO calendar; get a calendar by running a **Ticket Search filtered to the service and switching the view to Calendar** (map Start/End date fields) and saving it as a shared view. Real calendar overlay = push approved tickets to a shared Outlook calendar via workflow/Power Automate. **No native business-day math** and multi-day tickets don't auto-split per day.

**Scheduled tickets** = time-driven auto-created tickets (recurring QA, weekly metric review, term-start outreach). Recurrence is "Outlook-lite":

| Pattern | Supported |
|---|---|
| Every 18 weeks | ✅ |
| First Monday of every 4th month (relative monthly) | ✅ |
| Every weekday | ⚠️ no holiday awareness |
| Last business day of month | ❌ |
| "Every 18 weeks except holidays" / conditional | ❌ |

**Snapshot gotcha:** a scheduled ticket clones a template snapshot — change the form/hidden fields later and old schedules keep the stale values; re-save/recreate after major changes.

**Bulk ticket generation** (many tickets on a cadence): don't create hundreds of per-agent schedules. Use one private **"Bulk Ticket Generator"** ticket on the schedule → **workflow explodes it** into child tickets. Limits: TDX has **no true dynamic looping** and no dynamic user queries — lean on predefined Responsibility Groups, one generator per team, and pre-staged templates.

**Bulk import of resolved tickets = a DIY campaign engine** (the no-budget outreach workaround). Create an **Outreach service**, **import an Excel sheet** (Requestor Name, Requestor Email, Service, Offering, dynamic fields) → each row = one ticket → workflow **sends the branded HTML email and closes the ticket**. Prefer **send-on-create** (true automation, no agent dependency) over send-on-resolve unless a human must review first. Guardrail: an **`Outreach Sent = Yes/No`** field, workflow only sends if No then flips to Yes, preventing resends on edit. You gain batching (avoids Outlook throttling), intact personalization (Requestor tokens), and a contact record; you lose open/click tracking.

---

## Release & ITSM ticket-type semantics

A **Release** in TDX is a coordinated deployment package bundling multiple **Changes** to go live together (ITIL-style) — not a single edit. Mapping to how this app actually operates:

| Type | Meaning here |
|---|---|
| **Incident** | Something broke (recap emails stopped, workflow didn't fire, RingCentral→TDX flow down) |
| **Service Request** | Normal work — logging a student interaction (the bulk of volume) |
| **Change** | Improving the system (workflow edits, new Reasons, template/reporting/bot updates) |
| **Release** | A coordinated go-live bundling several Changes (e.g. "Financial Aid Experience Upgrade") |

Current posture: operating as de-facto Change/Release manager **without** formal Release tickets — appropriate for now; formal Releases would only add friction. Substitute lightweight **operational release notes** (date, what changed, systems impacted, why) for governance without slowdown. Treat a prod backup as an informal version baseline. Service/category descriptions follow a house voice — all start "Used by…", state what's logged, and name the purpose (routing, reporting, tracking) so CC / OSC / Messaging read as one designed system.

---

## RingCentral → TDX CTI / screen-pop integration

**Goal:** inbound call → screen-pops a TDX intake for the agent → caller phone auto-populated → requestor resolved → zero manual typing. RingCentral can auto-launch a URL on incoming call (on first ring or on answer) and pass call tokens: **`%P`** formatted, **`%E`** E.164 (`+18019575057`), **`%C`**. Use **`%E`** — clean, no spaces/parens/encoding surprises.

**What was proven not to work (in this order):**
1. **Direct custom-attribute prefill** on `Tickets/New?formId=...&CustomAttribute_####=...` — the environment ignores it (see above).
2. **Zero-click browser redirect off the iPaaS flow** — `POST /tdapp/app/flow/api/v1/startdirect/{flowId}?flowversion=0` is **asynchronous**: it returns run metadata (`{flowOccurrenceId, status:"InProcess"}`), not the final ticket URL inline. `waitForResults=true` makes the caller wait but the flow still doesn't hand back navigation, and `callbackUrl` is a server-side follow-up call, **not** a browser redirect.
3. **A local launcher HTML file** — opens as `file://` so browser origin = `null`; CORS blocks the flow call. The flow's **Advanced Flow Security → CORS Allowed Origins** can whitelist the literal `null`, which clears CORS — but then hits **flow access control**: `403 "Attempt to access Flow 3377 by Customer 398 forbidden"` and `"0 resource access groups were checked."` The browser call is treated as an unauthenticated Client-Portal/customer context with no permission to run the flow. No self-hosted server, no SharePoint webpart/SPFx rights, and only-Client-Portal HTML rule out the relay-page path.

**The architecture that actually holds — resolver logic + form-first handoff.** The ideal flow is really **three layers**, and identity resolution must happen *before* the ticket UI, not inside the ticket form:

```text
Inbound call (RingCentral)
   → auto-launch URL, pass %E phone (+ agent/queue if available)
   → iPaaS resolver:
        normalize ANI (strip to 8019575057 / 18019575057)
        search TDX People by phone
        branch on match count:
          1  → resolve RequestorUid, proceed
          0  → create minimal person OR agent create/search/continue-unlinked
          >1 → never auto-attach; agent picks, OR create an
               "Needs Requestor Resolution" ticket with candidate UIDs in notes
   → present prefilled iPaaS form (phone + requestor already filled)
   → agent submits
   → flow creates the ticket (App 241 / Form 2431), phone in custom attribute
```

**Zero-click = create-first, display-second (API), not form prefill.** Because the operational goal is "no agent search," the strong pattern is: iPaaS/API **materializes the ticket** (via `POST /TDWebApi/api/{appId}/tickets`, auth `POST /TDWebApi/api/auth/loginadmin` with BEID + WebServicesKey → bearer), then open the **created** record `/SBTDNext/Apps/241/Tickets/TicketDet?TicketID={ID}` — never a blank `New` form. Do the thinking in the backend, then show a finished object; avoid mixing open-form state + workflow timing + redirect races.

**Given the current access ceiling** (can whitelist CORS, hold TDX service accounts, but no external hosting and admin creds must never sit in browser JS), the pragmatic build that succeeds is the **iPaaS form-first path** — all inside the platform, no CORS, no exposed credentials: `flow starts → lookup requestor by phone → show iPaaS form prefilled with phone + requestor → submit → flow creates ticket`. It meets the real requirement (phone + requestor populated, no manual lookup) without a synchronous browser redirect.

**Ticket-create field reference (real IDs):** `TypeID 409` (Contact Center), `FormID 2431` (Student Interaction Record), `AccountID 759` (Contact Center; = owning department, not requestor — find via existing ticket / Search Accounts / admin URL), plus required `Title/StatusID/PriorityID`, optional `RequestorUid`, and `Attributes:[{ID, Value}]`. Phone custom attributes in play: 7176/7177/7178 (called/incoming numbers), 7228 (test). **Creator ≠ Requestor:** Creator comes from the connector/service-account credentials (not passed in payload); Requestor is set explicitly.

**Identity model — phone is metadata, not identity.** Staff/faculty have only office phones in Entra, students have none, so caller ID never reliably identifies a person. Anchor on **Requestor (person record) + email**, not phone. Collect PII **minimum-necessary / tiered**: always capture Service/Reason/Outcome/Channel/Agent/timestamp; capture identity only when needed; capture phone only for callbacks/QA. Requestors *can* create contacts — use **controlled creation**: search first; if a current student isn't found, treat it as a sync gap (don't hand-create — the SIS owns students); for prospects, **create only with an email** ("no email = no new contact"). Missing phone does not break the model.

---

## Related

- [[TDX]]
- [[Contact Center]]
- [[Online Success Coaching]]
