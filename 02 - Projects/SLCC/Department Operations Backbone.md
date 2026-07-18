---
type: project
project: SLCC
date: 2026-07-13
tags: [slcc, contact-center, operations, overhead, automation]
---

# Department Operations Backbone

Program goal: consolidate the department's loose ends and make operational overhead as light as possible. Principle: overhead is stranded capacity — the Bruin Connect thesis applied inward. Automate the repetitive, document the judgment, meter everything, no single points of failure, service accounts everywhere.

**Acceptance test for every design in this file (Travis's tenet): the easy way must be the correct way.** For users AND maintainers — if the lazy path and the right path diverge, the design is wrong, not the people. Anything that requires discipline to maintain is a bug in the design. (Holds: student reads the label and already knows who/how. Catalog: offices update one page, everything else points to it. Register/panel/Teams: same test.)

Dual purpose: this is also the interim first-90-days program and the department transition plan. The Runbook doubles as director onboarding.

## Loose-ends inventory (as of 2026-07)

| Loose end | Current state | Target |
|---|---|---|
| Contracts & renewals | PDFs + memory + ad hoc AI brief | Contract Register (Lists) + T-120/T-90/T-30 flows |
| Vendor governance | Monthly rep 1:1s (was bi-weekly), undocumented | Register rows + standing agenda template + written confirmations |
| Contact/data hygiene | Ad hoc; 161K actives unaudited vs tier | Quarterly archive sweep as scheduled obligation |
| Reporting | DDR-169 in IE pipeline; refresh automating | Institutional platforms carry it; verify RLS post-publish |
| Data ingestion | Weekly manual export/macro | ShadowAgent service account (waiting on Infra); Fabric Dataflow later |
| SOPs / policies | Written; old editions just archived | SOP library, current-version-only surfaced, review dates |
| Systems & credentials | Tribal-ish | Systems inventory: platform, owner, service account, vendor contact |
| Recurring obligations | Memory + Outlook suggestions | Obligations calendar with automated nudges |
| Decisions | Chat threads and heads | Decision log (date, decision, why, owner) |
| Digital workspace (Teams) | 5+ contact-center teams incl. zombie "Team Formerly Known as the Contact Center"; files split across as many SharePoint sites; a Bruin Connect team already exists | Two-team model (NO private channels — they spawn separate site collections, the exact fragmentation being fixed): (1) Contact Center — everyone; channels for Outbound/Systems/Rush/Bruin Connect; hosts SOPs, runbook, obligations calendar, systems inventory. (2) Leadership — small, deliberate enclave; its site hosts the sensitive Ops Hub half (Contract Register, budget, vendor file). Leadership chatter in group chat; decisions/files in the enclave. OSC stays own team. Archive (never delete) zombies; migrate files to survivor sites. Audit now; EXECUTE from the seat, first 30 days — not during the search. |
| Ad hoc / annual / program-review reporting | Hand-built each time; definitions drift between documents (the 11% vs 57% resolution seam) | **Reporting factory**, gated on DDR-169 publication: one parameterized "Period Review" paginated report on the certified model (Fabric capacity enables Report Builder) — date-range parameter serves annual reports, program reviews, and ad hoc pulls; Power Automate scheduled PDF exports for recurring recaps; living views = dashboard pages incl. the milestone-annotated run chart (Dec '24 → present, definitional bridge marked at the model seam). Pitch: no report can ever disagree with another report again. |
| Chat vs channel norms | Channels are dead announcement boards; real work lives in group chats — unsearchable, membership frozen, files land in the SENDER'S OneDrive | Rule: chat = ephemeral, channel = anything needed later (decisions, files). Owners auto-show key channels; leadership models the redirect for ~6 weeks. Note: Seini transfers internally to IE (no deprovisioning; links survive) — but chat-shared files remain permission-routed through the OneDrive of someone now outside the department. Migrate canonical copies to team sites as ordinary Backbone work, no urgency. |

## Target architecture (M365-native, zero new spend)

One SharePoint Operations Hub site:

1. **Contract Register** (Microsoft List). Columns: vendor, term start/end, annual cost, total value, billing cadence + Net terms, notice period (days), auto-renew flag, price-escalation cap, metered limits + definition of the meter, overage terms, support rates, owner, AP contact, status, link to executed PDF (companion doc library). Key design: a calculated **action-by date = term end − notice period**. Track decision deadlines, not expiry dates.
2. **Flows** (Power Automate, service account): T-120 owner alert; T-90 owner + Teams channel; T-30 pre-invoice ping to AP + owner. Quarterly hygiene-sweep reminder.
3. **Obligations calendar**: every recurring departmental "owe" in one place.
4. **SOP library — ALREADY BUILT (May 2025), not aspirational:** 16 policy pages in SharePoint with governance metadata — category tags (Knowledge Base/Operations/Policy), Active status, named owner, review date 7/1/2025, 365-day review cycle (Confidentiality, Adjusted Time, Computer & Printer Use, Email Communication, Email Signatures, GPS-Meetings, Education/Coursework/Teaching, etc.). **The 365-day reviews came due ~7/1/2026 — two weeks ago.** The gap is ONLY the acknowledgement layer. Launch plan: pair them — annual review sweep bumps versions where changed, and each re-issue fires the attestation card ("annual policy review completed, current versions attested by all staff" = one motion, first-weeks-in-seat governance act with a paper trail). **The acknowledgement layer ALSO exists (~90% finished):** "Policy Acknowledgements" SP list (PolicyID, acknowledger, timestamp, policy link, expiration, status) fed by a PowerApp acknowledge button embedded AT THE BOTTOM OF EACH POLICY PAGE — point-of-reading attestation (reader must be on the policy to attest; superior to any notify-and-click design, which is compliance without reading). Acknowledgements EXPIRE after 1 year → forced annual re-attestation, synchronized with the 365-day page review cycle — two clocks, one rhythm. **The missing 10% = absence detection:** an acknowledgement list records presence; compliance asks about absence (who hasn't / whose lapsed generate no rows). Last mile: scheduled flow joining roster × active policies × valid acknowledgement → surface gaps, nudge holders (nudges COME TO people; acknowledgement makes them GO TO the policy), auto-assign pending set on team join. Compliance matrix = list view now, Operating Panel tile later. Design rules still standing: the PAGE is the policy (any PDF is downstream export); acknowledgement should bind to policy VERSION on major changes. Knowledge architecture split: student-facing knowledge lives where Brutus reads (webpages, per the 2/25 doctrine); internal policy/SOP lives here with attestation — two layers, each single-source, nothing duplicated. PARKED (next annual cycle — no negotiation needed, TRAVIS OWNS THE HANDBOOK): the handbook is parallel policy truth today; cure is unilateral — handbook stops being authored and starts being COMPILED from the policy pages (front matter + current versions). Edit a policy once, handbook inherits at next build; the annual update becomes a generation step, not an authoring project. Status: 2026 edition already updated + circulated for redline 7/6, window closed 7/13 → 2026 = the LAST authored edition; 2027 = first compiled edition. Sequencing gift: policy review sweep (due now) bumps pages → attestation debuts on re-issues → 2027 handbook generates from attested current versions. Three chores, one pipeline.
5. **Systems inventory**: RingCentral, RSI ShadowAgent, Mainstay, TDX, Navigate360, Registration Rush, service accounts, owners.
6. **Decision log**.
7. **Department Runbook** (capstone): how the center runs, what fires when, who owns what. = transition plan = interim onboarding.

## Sequencing (WIP limit 2-3; not posting-week work)

- **Now (small, justified by Mainstay metering question):** Contract Register with Mainstay as row one; the three flows.
- **First 30 days of the seat:** obligations calendar; systems inventory; correct the ownership table in the circulating billing brief.
- **First 90 days:** SOP library consolidation; decision log; Runbook v1.
- **Parked until owners exist:** ShadowAgent cutover (Infra), Fabric Dataflow, extension-exclusion attribute.

## TDX → Navigate360 migration (department decision, ~2026-07)

Rationale: student work lives where every care network keeps the student's record — record follows the student, not the department. Bonuses: FERPA posture improves (student data in the student-record system's permission model); data model simplifies (Success sources consolidate to Navigate — appointments, notes, and the deferred case/alert tables are Navigate-native); Journeys/outreach/appointments/cases converge in one platform for the same-call warm handoff.

**Provenance (the director story):** TDX is IT's platform; the Contact Center was never required to use it. Travis adopted it voluntarily (buildout from Sept 2025) as a TRAINING GROUND — the team had never documented calls, and TDX was the structured surface to instill the habit. The tool was scaffolding for a behavior change; the exit is possible because it worked. Lifecycle: adopt tool → instill discipline → outgrow tool → migrate the discipline to the student record system. Side effect: the buildout built the working relationship with the IT Help Desk.

Checklist (the items only Travis will remember):
1. **Historical TDX export EARLY** — trend lines, resolution analytics, and future case tables depend on historicals that get hard to retrieve post-divorce.
2. Ticket-type → case-type mapping; nothing falls in the gap.
3. Rebuild Power Automate intake flows against Navigate.
4. README/documentation v3 change-log entry when the model's TDX source swaps.
5. **Define the non-student remainder's home** (internal/IT-adjacent/facilities requests — Navigate is wrong for these) on day one, or it becomes the new loose end.
   - **Exit etiquette:** IT hears the exit from Travis FIRST, with the reasoning (student work → student record system; TDX taught the documentation culture and did its job) — before it circulates. Bring the remainder question to them as a shared design problem; some work may rightly stay in TDX. Timing note: exiting before the billing cycle is stewardship, not betrayal — per-tech seat savings stay at the college; the alliance is the durable asset and it's platform-independent.
6. Retired TDX per-tech licensing = budget savings line for the at-a-glance dashboard.
7. **The TDX instrumentation is the requirements spec, not sunk cost.** There is NO call QA capability — the ticket layer (forms, services, workflows, follow-up emails, surveys Travis designed) is the center's only quality signal; he built a proxy QA program out of intake metadata because the operation is otherwise blind to its own quality. Everything learned designing it = the blueprint for Navigate case-type/intake-field/follow-up configuration. Tool dies, design survives; he's the only holder.
8. **QA gap → voice-migration criteria line:** the Teams/Landis pilot may bring native call recording + QA scoring — the first time the center could actually hear itself. If the voice decision weighs only cost and dial tone, this goes unvalued. Only the person running the workaround knows to write the requirement.
9. **Voice pilot alliance + the Landis question:** the Contact Center and the IT Help Desk are the org's only two TRUE call centers — the two real users of call center analytics (Landis was added into the pilot for exactly this reason). Travis's engineering instinct: Landis (third-party Teams add-in, extra vendor, own roadmap risk) vs Microsoft's native contact center product (Dynamics 365 CC — likely native recording/transcription/conversation-intelligence, i.e., the QA gap closer; VERIFY current features + per-agent pricing before citing). Play: never a preference, always criteria — "native recording + QA scoring, analytics parity, minimal vendor count, roadmap durability," co-authored WITH the help desk (the only other team that speaks queueing/SLA/QA). Two operations behind one requirements doc; if Landis clears the bar, fine — the criteria decide, not opinions. Same geometry as the chatbot consolidation memo. Watch also: the eventual Cabinet question "why two call centers?" — answer ready: different domains, shared architecture; a shared front door routing between them is Bruin Connect's geometry extended one ring outward (Brutus already fields IT questions — password resets are in the top FAQ).

Interview line: "We moved student work into the student record system — the record should follow the student, not the department."

## Contact Center at a Glance (Semantic Model #2)

Design rule: **never replicate Banner — annotate it.** Banner Finance is the system of record (FOAPAL: fund/org/account/program; AP invoices, encumbrances, actuals). Budget-manager access to Banner Finance Self-Service comes WITH the director seat — the current opacity is a permission, not a missing system. The department layer adds what Banner can't know: contract terms and metering, asset assignments, loaded labor context, operational category meaning.

Panels:
1. Budget vs actuals + FY burn rate (Banner self-service export or the monthly budget status report to budget managers; later a governed extract via the DSA/IE pipeline — DDR-169 relationship is the channel).
2. Personnel: headcount, FTE, vacancies, loaded labor cost by role (the blended-rate model, formalized).
3. Vendors & contracts: fed by the Contract Register — value, action-by dates, metering status tiles.
4. Supplies / current expense trend.
5. Assets: SharePoint List (TDX asset module moot — department is exiting TDX).

Sequencing: register + asset question + labor model now (in-lane). Banner panel and publication with the seat. End state: the first department at the College where budget, staffing, vendor, and asset questions answer from one screen — and the next director transition is an hour, not a month.

## Operating Panel (the cockpit)

Distinct from the dashboard: dashboard = "how are we doing"; panel = "what's happening and what's about to." A COMPOSITION, not a system — surface existing sources in one pane, layered by cadence (information appears at the speed it can change):

1. **Live:** queue depth, agents staffed, SLA today, Brutus escalations — RSI ShadowAgent already IS this layer; embed, don't build.
2. **Daily pulse:** yesterday's volumes, refresh/flow health — Power BI, existing data.
3. **Weekly management:** the at-a-glance panels.
4. **Horizon (blindside-killer):** contract action-by ≤30 days, invoice windows, rush periods, known events — filtered List views.

Architecture: NO server. SharePoint page (Operations Hub homepage) composing ShadowAgent embed + Power BI web parts + List views, pinned as a tab in the Contact Center team. Fabric real-time later if streaming ever matters. The $800 VM only re-enters if manual ingestion survives the Dataflow decision (automation host: scheduled normalization scripts, API pulls, unattended PAD flows) — parked in Later with that condition.

## Bruin Connect II seed: The Messaging Ecosystem

The SMS estate is the text-channel version of the 107-IVR problem: RingCentral per-person texting, Mainstay org-level, Bursar on Text-Em-All, Admissions on Pardot (Salesforce) — 4+ uncoordinated senders, siloed histories, no institutional governance. Sharper than the voice version because of compliance: opt-outs are per-sender (STOP to one system stops nothing else) → carrier deliverability risk across ALL registered campaigns + TCPA exposure; per-person RingCentral threads = ungoverned FERPA-relevant 1:1 conversations with no retention posture; no text record follows the student.

Reframe of the cross-migration SMS gate: not just "don't delete SMS" — the Teams and Navigate migrations are the forcing function to UNIFY messaging: one consent registry, channel standards, purpose-routing, and the untotaled redundant licensing across four contracts as the budget case.

Artifact (cheap, start anytime): messaging ecosystem inventory — sender, tool, owner, volume, 10DLC status, opt-out handling, retention. The note to Seini gains a clause: gate both migrations on SMS continuity AND treat the transition as the chance to unify governance institution-wide.

**Hold campaigns (two-phase design + the metadata finding):**
- Phase 1 (runs today): Mainstay sees only the hold flag — fine. Message = plain language + link; the portal personalizes on arrival. Measure clicks → hold clearance within X days (Banner pull) → registration. Wave randomization = the RCT seed, zero new permissions.
- Phase 2: type-segmented lists built UPSTREAM from a Banner hold extract (Mainstay never needs to "see" details — the list carries the segmentation). The "segmentation fight" is actually a data-access fight; route via DSA with the demonstrated FERPA posture.
- **Hold metadata: the convention already exists and is GOOD — do not redesign it.** Hold names are deliberately engineered to be maximally descriptive within the field: what it is + who to call ("Unpaid Tuition - 957-4480"), with each number routing direct to the owning office (money → cashiers, academic → SEAA, advising → advising front desk). Distributed owner-direct routing, already the single source of truth, already rendered on every surface (portal, Brutus, agent view). No catalog, no naming standard, no program — any parallel artifact is a second copy of truth and invited drift; any "standard" duplicates a convention that already works.
- **The only work: a few outliers break the house pattern.** "Academic Standing Prevents Registration" describes but doesn't route (who do I call?); "P2 Hold - 975-4658" routes but doesn't describe (code corrupts in conversation — "P2" heard as "02" — and the student has no context to self-recover). The intervention is a sentence to the owning office, not a project: bring the outliers in line with the convention the other holds already follow. Hold campaigns ride on this metadata as-is.

**The vision (Travis's words): the school should have ONE number — one voice, one SMS — branching inside the org. Navigate as the vehicle. Centralize comms, cut the fat from everyone's budgets, enforce governance and audience segmentation. Use the tools you have, not buy more.**

- Student-experience frame (the pitch): today a student's phone shows 5 mystery numbers claiming to be SLCC — outreach dressed as spam. Vision: one saved contact ("SLCC") from orientation onward; every text and call arrives from an identity students already trust. Demo = two phones side by side.
- Architecture: Bruin Connect completed — same geometry as the voice front-door fix, applied to text. One identity, purpose-routing behind it, Navigate as system of record so conversation history follows the student, consent and segmentation enforced centrally.
- Engineering notes: consolidation strengthens 10DLC (one well-documented brand + unified consent beats four shaky registrations); STOP semantics may argue for a deliberate two-number family (conversational + alerts) — one identity by design, never five by accident.
- Budget: 4+ texting contracts collapse toward already-licensed tools; redundant spend surrendered to governance.
- **The frame under all of it — the communication topology:** a phone number is a published routing endpoint, and copies live everywhere (web pages, hold labels, IVR prompts, queue trees, print, Brutus KB, campaign templates). Routing architecture and published surface are one coupled system: pull any node, the graph moves — which is why every idea touches everything else (not scope creep; the system's shape). Org problem: everyone owns a node, nobody owns the graph — locally-sensible changes silently break references their owner can't see (the SMS-extinction catch is exactly this shape). One Number = indirection: a stable public identity decouples the published layer from routing, so back-end rewires/migrations/reorgs never invalidate anything printed. Hold labels are the deliberate exception — owner-direct coupling kept on purpose (load to owners, not the center): a graph-level choice, not an accident. Analysts optimize nodes; directors own topologies.

## Reorg positioning: the leading-indicator strategy

Fear on the floor: will we get cut; is our value perceived? Answer in two layers:
- **Value defense (necessary, insufficient):** the numbers — $6.54/interaction, 99.9% answered, transfer absorption relieving departments. Value alone can be outsourced/shrunk.
- **Necessity defense (the real play):** position the center as the institution's sensory organ. It hears students FIRST — 741K calls, Brutus's 194K questions, non-attendance reasons captured nowhere else = the largest continuous stream of unfiltered student signal at the College. Sensors don't get cut; they get wired into more dashboards.

Moves:
1. **Prove one lead relationship** from 18 months of instrumented history (e.g., FAFSA question spikes preceding aid backlog; registration-friction calls preceding enrollment dips; Brutus category shifts preceding melt). One documented "we saw it 3 weeks before the report" converts positioning into evidence.
2. **Monthly leading-indicators brief** to leadership: one page, what students are asking/struggling with now + the forward read. Hand-built v1; factory-built post-DDR-169. Goal: leadership habituates to opening planning with center signal.
3. Feed the DRR-as-KPI proposal; get center metrics into institutional dashboards.
4. Floor story: "we are the College's early-warning system" — turns disposition tagging and documentation quality into feeding the sensor. Fear becomes craft.

5. **Outcome attribution — REVISED per the Kaplan study (DSA, Dec 2023, "Contact Center Outreach: Effect on Student Registration").** Prior art exists: DSA analyzed three 2023 campaigns and found no detectable registration effect; quasi-controls (unable-to-contact) were tried and qualified as non-random; closing line ("boost unlikely to be very large") is quotable by budget-cutters. BUT the nulls attach to 2023's design — cold calls to long-lapsed students (1% base rate), phone layered redundantly on email, list-order execution, no holdout. Key: the Journeys/need-based redesign is already the correct response to this report — it retired the model the nulls describe.
   **The play: propose the sequel.** The report explicitly recommends a randomized trial (n≥1,000-2,000); current campaigns run 5,000+. Wave randomization (everyone contacted, order randomized) answers the equity objection and matches capacity reality. Pitch to DSA/Kaplan: "run the experiment your 2023 report asked for, on the new campaign design." Either result wins: lift → IE-validated revenue attribution (their finding, not self-report); null → reallocate outbound toward need-based support and Mainstay-first contact ($1.73/touch), publicly data-driven.
   **Do not hang outbound's value on registration lift alone.** Diversified story: sensing (non-attendance intelligence — untouched by any null), service outcomes (FAFSA support, resource connection), inbound cost math, persistence of engaged current students (Journeys caseload vs non-caseload, risk-adjusted). Retention IS revenue; the center is revenue protection — but claim it at the strength the evidence supports.

Frame for all money talk: dollars as means, students as end. ROI = stewardship; savings = redeployed capacity; cost-per-interaction = student-hours returned.

## Interview line

"My goal is that running this department is nobody's full-time job — the overhead lives in systems, the judgment lives in people, and the capacity we free goes to students."

## Related

[[Mainstay Contract Watch]]
[[Role Scope and Application Assets]]
[[SLCC Backlog]]
[[Interim Interview Prep]]
