---
type: project
domain: contact-center
status: active
tags:
  - bruin-connect
  - restructure
  - phone-model
  - guided-access
  - slcc
  - ivr-analysis
  - strategy
---

# Bruin Connect Transition

## Context

Following [[HB 265|Utah HB 265]] Phase 1, academic affairs underwent budget cuts and program closures. Leadership now has heightened focus on demonstrating metrics from student-facing teams -- OSC and the Contact Center specifically.

The institution is simultaneously evaluating a structural shift in how students access support. This project is a two-document proposal package going to AVP/VP and director level for sign-off:

- **Document 1:** IVR Call Routing Analysis one-pager -- establishes the problem, quantifies friction, makes the institutional stakes clear
- **Document 2:** BruinConnect restructure proposal -- delivers the solution and the structural changes required

Neither document works as well alone. The friction doc creates the case; the restructure proposal provides the answer.

---

## The Problem: Open Access

Current model: open access. Students call whoever they think is right. Results in:

- 106 IVR menus and 26 queues configured in the SLCC PBX
- Fragmented department phone numbers published publicly on slcc.edu
- Students call the wrong number, get transferred, navigate IVR menus again, re-explain their situation at each leg
- Enrollment management teams (admissions, financial aid, registrar, advising) fielding phone calls while trying to serve students physically present
- Warm transfers expose staff to the same 25-47 second IVR overhead at destination departments -- a cost that was previously invisible
- Average IVR/queue overhead: approximately 55 seconds per leg across all queues (IVRs and queues combined, includes navigation duration, hold time, and ring time before agent pickup)
- Contact Center (4073) overhead: approximately 19 seconds -- no IVR menu, spoken hold prompt only
- Department IVR paths: 25-114+ seconds depending on path (e.g., Cash Main IVR 72 sec + Cashiering queue 42 sec = ~114 sec before reaching anyone)
- Spanish-language IVRs are consistently worse: Spanish Cashiering 122 sec, AR-MAIN Spanish 117 sec -- a student equity dimension embedded in the architecture

**The friction problem is twofold.** Students experience added IVR wait time before reaching anyone. Staff doing warm transfers are exposed to destination department IVR overhead on every handoff -- agent time absorbed by the architecture, previously uncounted.

**The website is a structural root cause.** SLCC publishes direct department and personnel phone numbers publicly. Students who call the wrong number get bounced through IVR menus and transfers, re-explaining their situation at each leg. Each re-explanation is measurable additional call time, not just qualitative frustration.

**Frustration as a retention risk.** SLCC's 2024 Non-Returning Student Survey found confusion around accessing advising and guidance was the most common form of student confusion, cited by 42% of non-returning students. DSA identified improving information accessibility as a viable intervention for reducing early exit. Reducing IVR friction is a direct implementation of that recommendation. See [[Non-Returning Student Survey 2024]].

---

## The Solution: Guided Access

Department phone numbers delisted from slcc.edu.

A single institutional number becomes the entry point for all people contacting the college. BruinConnect triages, assists, and routes -- giving enrollment management teams space to serve students physically present without phone interruption.

**Core recommendation framing:** transition from Open Access to Guided Access. The outcome is an improvement to both the ideal student learning experience and the ideal employee mission fulfillment experience. Both phrases are official SLCC360 institutional language (source: https://www.slcc.edu/slcc-360/breakout-session.aspx).

**Institutional anchors:**

- **Vision Matrix (active 18-month plan, board-level):** The Support strategy explicitly calls to "increase the number of students receiving academic and career advising," with stated intermediate outcomes of increased utilization of advising services and increased student retention. BruinConnect triage is a direct operational implementation of this strategy. Source: https://www.slcc.edu/vision-matrix/index.aspx
- **SLCC Mission:** "We engage and support students in educational pathways leading to successful transfer and meaningful employment." IVR friction is a direct contradiction of this mission at the first point of contact.
- **SLCC360:** "Ideal Student Learning Experience" and "Ideal Employee Mission Fulfillment Experience" as college-wide strategic language.
- **Non-Returning Student Survey 2024:** DSA's own data and recommendation language.

---

## BruinConnect: Name and Philosophy

"Contact Center" no longer reflects what the department actually does. The operation functions as triage, persistence, and holistic coaching -- not a traditional call center. "BruinConnect" -- Bruin being the college mascot -- signals institutional identity and signals the philosophical shift to students, staff, and leadership.

This is not a name change. It is a philosophical change. The department is no longer a phone-answering operation. It is the single coordinated student support entry point for the institution.

**Required changes to implement:**
- Removal of department and personnel phone numbers from the published website
- Routing changes in the PBX
- IVR menu changes and removals
- Staffing and coverage design for BruinConnect as single point of entry

---

## Department Structure

### Current (umbrella: "Contact Center")

- Contact Center -- inbound team (reactive)
- Contact Center -- outbound team (proactive)
- Success Operations (Travis + admin assistant)
- Online Success Coaching (AD + 5 coaches)

### Proposed (umbrella: "BruinConnect")

| Team | Role | Model |
|---|---|---|
| **Assist** | Replaces inbound Contact Center | Reactive -- handles incoming contacts, triages, resolves or routes |
| **Persist** | Replaces outbound Contact Center | Proactive -- outbound campaigns, retention outreach, persistence work |
| **Coaching** | Online Success Coaching | Holistic -- assigned caseload of approximately 400 students per semester |

### Population Served (Assist and Persist)

Assist and Persist serve the general unrepresented student population -- students who do NOT have a specialized CARE team assigned. This explicitly excludes:

- Veterans (served by the Veterans Resource Center)
- International students (served by International Affairs)
- Online Success Coaching cohort students (assigned coaches)
- Academic probation students (specialized programs)
- TRIO participants

BruinConnect Assist and Persist are the support infrastructure for the majority of SLCC students who fall between specialized programs -- the students who would otherwise have no dedicated support structure and no single place to call.

### Coaching vs. Assist/Persist

Coaching is distinct from Assist/Persist in model and population:

- Assigned caseload (~400 students per semester), relationship-based, holistic approach
- Students have a named coach and an ongoing relationship
- Coaching is proactive and longitudinal; Assist/Persist are transactional and generalized

All three sit under the BruinConnect umbrella, but operate differently. The umbrella creates organizational coherence; the sub-team distinction preserves operational clarity.

---

## Performance Data

### Current Contact Center Performance (AY2025-26, 7/1/2025 forward)

| Metric | Value |
|---|---|
| Total calls | 73,823 (AY-scoped; full trailing 365-day count pending dedup) |
| Resolution (FCR) | 49,620 -- 67.2% |
| Transfer | 22,994 -- 31.1% |
| Abandon | 1.0% |
| SLA | 71.31% |
| Peak hour | 1pm (10.1K calls) |
| Sustained volume | 10am - 3pm |

FCR definition: calls where the final leg ends with a Contact Center agent -- no outbound transfer. Clean, defensible methodology.

**Prior year comparison:** AY2024-25 FCR was 11-12% (annual report). Current year FCR is 67.2%. The improvement reflects an active operational focus on driving first call resolution. This delta is the argument that the model works when it is prioritized -- and the case for making it structural through guided access.

**Transfer destinations (AY2025-26 dashboard):** Financial Aid 32%, Accounts Rec/Cashier 32%, Academic Advising 18%, Assessment Center 9%. Financial Aid and Cashier together account for 64% of all CC transfers -- two departments. The guided access model disproportionately benefits the two highest-volume transfer destinations.

### Outbound Performance (AY2024-25 Annual Report)

| Metric | Value |
|---|---|
| Unique contact attempts | 38,141 |
| Students reached | 20,948 |
| Campaigns run | 13 |
| Registered after contact | 13,884 |

13,884 students registered after outbound contact = direct, quantifiable enrollment impact from Persist-type work.

---

## IVR Analysis (In Progress)

Full-year PBX data pulled and consolidated in Excel via Power Query. Two-table model:

- **fact_call_legs:** one row per call leg, 1.35M rows total across all call types. Group By evaluation to produce fact_calls currently running.
- **fact_calls:** one row per unique call, related to fact_call_legs on Call ID. Will be used for unique call volume, transfer depth, and routing path analysis.

**What will be derived from the deduped dataset:**
- Unique call volume by destination queue (first institutional view of department-direct call volume -- never previously analyzed)
- Average transfer depth per unique call
- Total IVR/queue overhead = avg overhead per leg × avg transfer depth × unique call volume
- Split: calls where Contact Center appears as a leg vs. calls that never touch the Contact Center

**Current per-queue leg data (415,706 legs, IVR/queue filtered):**
- Grand total average: 43 seconds per leg
- Contact Center (4073): 85,719 legs, 19 sec avg
- OpenText IVR (4111): 69,837 legs, 5 sec avg (main institutional attendant)
- Financial Aid (4410): 33,409 legs, 97 sec avg
- Help Desk (1555): 20,277 legs, 113 sec avg
- Cash Main IVR: 11,613 legs, 72 sec avg + Cashiering queue 21,100 legs, 42 sec avg = ~114 sec combined path
- Accounts Receivable IVR: 11,894 legs, 63 sec avg
- Admissions IVR: 22,344 legs, 32 sec avg

**Note on department-only volume:** All prior analysis only captured calls where the Contact Center was a leg. Calls going directly to department lines have never been evaluated. This PBX analysis is the first time full institutional call volume is visible. The unique call count by destination will be new information for leadership.

---

## Key People

- [[Seini Pahulu]] -- Director, BruinConnect (umbrella)
- [[Annalise Karr]] -- Contact Center Manager (Assist/Persist)
- [[Megan Brandley]] -- Assistant Director, Coaching
- Travis -- Success Operations Analyst

---

## Open Questions

- Final approval on the BruinConnect name
- Timeline for delisting department numbers from slcc.edu
- Communication strategy to students and staff for the transition
- How metrics will be reported under the new structure (Assist vs. Persist vs. Coaching split)
- Staffing design for BruinConnect as single point of entry -- peak hour coverage (1pm) is the critical constraint
- Whether SLA target changes under the new model

---

## Naming Process, Rejected Alternatives, and Proposal Reception

**Origin and political handling.** The Bruin Connect name and the Assist/Persist/Coaching model were Travis's own concept, developed and pitched upward on his own initiative rather than assigned top-down. The director encouraged iteration on the one-pagers through several rounds (praise, requests for polish, no rejection cycles) before later opening a team-wide thread asking everyone for name ideas -- read correctly by Travis as standard political process (stakeholder buy-in, cover for "we explored options," avoiding the appearance of a pre-selected decision) rather than a signal the name was in trouble. Only the Contact Center manager submitted alternatives in that thread; Travis deliberately stayed silent in the public brainstorm so the name would stand on its own merits. Proposal submitted by 2026-05-26.

**Rejected name alternatives (team brainstorm) and why Bruin Connect beat them:** The Frontline (internal-facing, militaristic); Student Central (generic, widely used); Student Compass (reads advising-only); Ask Us Desk (doesn't scale for a remote team); Student Connect / SLCC Connect / SLCC Campus Connect / Campus Connection Center (generic/corporate; "SLCC Connect" reads like a VPN/portal); SLCC Navigation Hub / Navigation Ambassadors / Connection Ambassadors (feel temporary or peer-program-based); Connect Desk / Connect Hub / Connect Center (generic service-counter naming); Student Success Hub (overlaps coaching/advising language); Enrollment & Support Center (administrative/transactional); SLCC Student Connect+ / SLCC Connect+ (dated, tech-product-y). Key rationale for keeping Bruin Connect: SLCC already has heavy "hub/navigator/ambassador/one-stop-shop" naming sprawl (Bruin Support Hub, Admissions Hub, etc.), so another generic hub/center name causes semantic dilution. Bruin Connect stays distinctive, ties to the mascot without needing "SLCC" bolted on, avoids "call center" baggage, and scales cleanly across phone/SMS/chatbot/email/case management. The director independently converged on "connect/connection" language ("that's what we do").

**Scope clarification:** the rename/rebrand applies only to Travis's ~20-person unit (the Contact Center ecosystem), not a college-wide restructuring -- the reason the proposal reads as low-risk and executable rather than triggering territorial/governance resistance.

**Considered but cut:** an early structural pass proposed a 4th branch alongside Assist/Persist/Coaching -- "Success Operations" -- as the name for Travis's own analytics/systems/automation function (reporting, automation, journey orchestration, knowledge governance, process engineering). Alternatives floated: Engagement Operations, Student Engagement Operations, Experience Operations, Journey Operations, Strategic Operations. This branch did not carry into the submitted one-pagers, which scoped to Assist/Persist/Online Success Coaching only.

**Feedback on the submitted 3-page one-pager set (Institutional Friction / Name & Mission / Operational & Financial Impact):**
- Page 1: "Institutional Friction" flagged as the strongest framing -- operational, measurable, systemic without sounding accusatory. Standout line: "the phone system mirrors institutional structure instead of student journeys." Weak spot: "untapped capacity unused" read as repetitive.
- Page 2: "One brand. One team." and "Connecting today. Empowering tomorrow." landed as sticky taglines. "Connectors, champions, and partners" flagged as too marketing-heavy for the deck's tone.
- Page 3 (biggest risk): the **"9.6% staff utilization" stat was flagged as politically dangerous** -- executives could read it as "why do we need this team." Reframe toward demand penetration: the Contact Center already handles ~89,600 of ~741,000 total institutional calls (~12%) at strong AHT (~103 sec) and low cost per interaction, so the constraint is fragmented institutional intake, not frontline capacity. Intended executive takeaway: the Contact Center handles ~12% of institutional call volume today and has clear room to absorb more.
- Overall: deck deliberately structured to move leadership from "rename" (emotionally safe) to "operating model shift" (strategically serious) without ever using centralization language -- "continuity for students" tests far better politically than "centralization for efficiency."

**Early validation signal:** shortly after submission, the director announced the college website's listed phone numbers were being consolidated to effectively just the Contact Center's number. Staff read it only as "accurate directory info," not recognizing it as the first concrete step toward the single-intake-point model the proposal is building toward.

## Related

[[Contact Center]]
[[Online Success Coaching]]
[[IVR Call Routing Analysis]]
[[Non-Returning Student Survey 2024]]
[[Contact Center Annual Report 2024-25]]
[[SLCC Overview]]
[[HB 265]]
[[TDX]]
[[Power Platform]]
[[Mainstay Brutus]]
[[One Voice One Brutus]]
[[Navigate360 Transition]]
