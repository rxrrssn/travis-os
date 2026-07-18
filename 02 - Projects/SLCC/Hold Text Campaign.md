---
type: project
project: SLCC
date: 2026-07-13
tags: [slcc, contact-center, mainstay, enrollment, campaign, holds, sem]
---

# Hold Text Campaign — design (built 7/13, ~11:30 PM)

Service-notification campaign to students blocked from fall registration by active
holds. Not marketing: an account-status alert from the support center. Rides Mainstay
(already licensed); Brutus handles replies 24/7; humans behind it in the queue.

## Cohort definition (Travis's query, all filters verified 7/13)

Registration-BLOCKING holds only, active, placed since 1/1/2025 → student is in the
textable universe (texted within 300 days, not opted out; 39,579 total) → registered
in any of 202540 / 202620 / 202630 → NOT registered for 202640 → graduation terms
202620/202630 excluded. Plain language: recently active students who should be back
this fall, aren't registered, didn't graduate, and have a real wall in front of them.

Interim figures from tonight's pull (pre-term-filter): 6,300 blocking holds since
1/1/25 → 4,206 unique textable students. Final count after term filters: pending.
Math anchor: $778 = resident 3-credit tuition+fees, published 2026-27 table.

## Message tiers by hold type (deduped type list, 7/13)

**Tier 1 — process holds (friendliest copy; NOTE: almost none are self-clearable —
the embedded phone number IS the institution's entire remediation path; every hold
resolution is a mandatory synchronous human interaction):**
Orientation Needed (957-4299) · Call Advising (957-4978) · Re-Admit (957-4485) ·
Concurrent Update (957-4485) · Health Clinic (957-4268) · Loaned Textbook ·
Athletics (957-4526) · ID Discrepancy (957-4840)
> Copy pattern: "You're almost set to register for fall! There's one item on your
> account: [X]. The [office] can clear it with you: [NUMBER]. Questions? Just reply —
> we're on 24/7."

**COPY DOCTRINE (Travis, 7/14): the student never hears the word "hold."** Messages
are procedural guidance ("you're one step away from fall registration, here's the
step"), never account warnings. The hold is the college's bookkeeping, not the
student's identity. Holds stay in internal docs only. ("For now" — revisit for the
financial tier, where the Bursar conversation may need plainer language.)

**THE THESIS (Travis, 7/14, for every pitch of this campaign):** these are, by the
numbers, the least expensive enrollments the college can earn, because it already
earned every one of them once. Recruiting new students costs marketing and months;
re-opening the door for one already here costs a text. Persistence framing and fiscal
framing are the same argument said once.

**Measurement without hold-resolution visibility** (bound outside Travis's access):
registration (202640) is the observable outcome, per student, in Banner. The paced
waves double as a natural comparison group — texted-early vs not-yet-texted
registration rates = defensible lift, no service withheld, no hold data needed.

**Voice notes (7/14):** corny mascot puns approved for these sends, one per message,
groan-grade ("I can bear-ly wait" &#128059; / "paw-sitive" &#128062; / "take my advice");
say "Academic Advising," never "Advising Front Desk." Section label on outward docs:
"What students COULD see" (illustrative, not final copy).

**CAPABILITY RULE (7/14): Brutus cannot book appointments.** Copy never promises
"reply and I'll set you up" for advising. Paths: book online or call the office.
Brutus CAN answer questions (reply is fine for question CTAs).

Live links + numbers (7/14): **orientation mainst.ai/J7LJ** (online, self-clears;
orientation help line 801-957-4299) · **advising mainst.ai/Jq3y** (online booking; Academic Advising 801-957-4978). Advising copy: booking link first, front desk number as the fallback.

**Tier 2 — financial, service-framed (NEVER include amounts; never dunning language):**
Unpaid Tuition - Fees (957-4480) · Past Due Tuition Fees (957-4480) · Return Check
(957-4480) · [WO Accts Receivable + WO Check — write-offs; include only if Bursar
rules they're not with collections]
> Copy pattern: "There's a hold on your account that will block fall registration.
> The Bursar's office can walk you through options, including payment plans:
> 801-957-4480."

**Tier 3 — EXCLUDED from all sends:**
- **Bankruptcy Ch. 7 + Ch. 13 (957-4633): HARD EXCLUDE — automatic-stay risk.**
  Texting about a hold rooted in a debt during active bankruptcy can violate the
  federal automatic stay. Never in any send list. Flag to Bursar that the campaign
  deliberately excludes them (shows diligence).
- Past Due Bal Collection (x4480) + Parking fines in collections: charged-off /
  agency-held balances — contact rules may be governed by the collection agreement.
  Bursar ruling required before these ever get a message.
- Dean's Hold: conduct-adjacent; wrong instrument. Individual outreach if anything.

## Blocking verification + resolution map — COMPLETE (7/14)

**Documented registration-blocking (public sources):** all bursar/delinquency types
(SFRA: "registration holds may be placed"; covers Unpaid/Past Due/Return Check/WO/
collections family) · Orientation + Advising (Advising FAQ lists both as
registration-preventing) · Parking (Policy 2.5.030: registration, grades, transcripts,
AND graduation — the harshest hold family).

**Tail resolved by operational knowledge (Travis, 7/14):**
- Concurrent Update + Re-Admit: application needs updating — link-shaped fix, a
  second mini self-service group (application portal CTA).
- Athletics: athletics dept approval — one phone call.
- Intl Doc Verification / International Student: SEVIS/legal compliance — careful
  copy, office contact only.
- Loaned Textbook: fine on the student account — behaves as a financial hold, Bursar
  family copy.

Every type now has: blocking status verified + resolution path + message class. The
copy table is complete.

## Gates before any send (all logged elsewhere, consolidated here)

0. **One Number cutover coordination (added 7/14):** all numbers except 385-338-3993
   die 8/25 with bot reintro. Sends ride the surviving number from day one, or waves
   sequence around the cutover — otherwise reply threads orphan mid-campaign. Also:
   pitch alignment — the campaign is measurable progress toward leadership's stated
   50K-by-2027 enrollment KPI (from 7/7 vendor review).

1. **Allocation confirmed** — Kim Meyer's answer inbound (Seini's 7/13 ask; Travis cc'd).
   **KEY INSIGHT (Travis, 7/14 ~2 AM): the cohort is allocation-neutral by construction.**
   The textable filter = messaged within 300 days, which reaches back only to mid-Sept
   2025 — inside the current contract year (8/31/25 start). Every cohort member already
   consumed their unique-user unit this year; under unique-user metering, re-texting
   them draws ZERO new allocation, leaving the full remaining balance for new stop-outs.
   Caveat: hinges on the metering definition (the exact open question with the vendor) —
   Kim's answer confirms it. If confirmed, the pitch upgrades: "this campaign doesn't
   even spend the allocation you're trying to use before it resets."
2. **SFTP sync restored + fresh drop landed** — platform data stale since 6/23 (see
   [[Mainstay Contract Watch]]). No list pulls into Mainstay until a clean sync.
3. **Seini's re-confirmation** — she greenlit the concept months ago; re-up in writing
   before execution (ask alongside the interim min-quals question, morning of 7/14).
4. **Bursar consult** — GradGuard thread = warm channel (Ryan Thoroman). Rulings needed:
   WO holds, collections holds, and a courtesy heads-up on Tier 2 copy. Also fits the
   "hold-outlier conversation" channel already noted in Role Scope.

## CANON: combination profile (7/14 ~2 AM, code-level dedupe — 4,192 holds on 3,695 students)

Reapplication noise removed (same hold reapplied to same student). Survived four
cleaning passes. Headline: 3,695 × $778 = **$2,874,710 at one class per student**
(most take 2+; realized full value $5M+). Floor 10% ≈ $288K; moderate ≈ $431K.

| Student group (by combination) | Students | Path |
|---|---|---|
| Unpaid tuition only (TD) | 1,671 | Bursar, payment plans |
| Write-off only (WR) | 890 | Gated on Bursar ruling |
| **Orientation only (O1)** | **389** | **PILOT: self-clearing link, ~$303K** |
| Bursar-internal stacks (TD/PD/RC/WC/WR/WA combos) | 198 | One Bursar conversation each |
| Advising only (PA) | 157 | ~11 calls/day paced |
| Orientation + tuition (O1 + TD) | 108 | Wave-2 warm list: link + Bursar handoff |
| Parking-collections only (P2) | 74 | **The $15 argument** (see below) |
| All other + cross-office combos | 208 | Specific or multi-item copy |
| **Total** | **3,695** | **4,192 distinct holds; 464 students carry 2+** |

**THE $15 ARGUMENT (Travis → Seini, 7/14, pre-SEM):** the 74 parking-collections
students carry fines as small as ~$15 — the college is declining ~$700 of tuition per
student rather than waive a parking ticket. Total cohort fine debt ≈ half of ONE
existing $2,500 single-student tuition waiver; clearing it reintroduces **~$51K** in
registrations. The waiver is the COMPARISON, not the funding plan (fines sit in
collections; mechanism is the Bursar's call: forgiveness, threshold policy, or
paydown). Systemic version for later: a de minimis threshold — registration holds
don't trigger under $X. Sharpest one-liner in the campaign: "we spend $2,500 to
enroll one new student; $1,250 total would re-enroll seventy-four."
**The click comparison (Travis, 7/14):** Marketing pays ~$11 per "Apply Now" CLICK,
and clicks convert to enrollments at single digits — true cost per NEW enrolled
student runs $100-200+. The $15 fine removal buys barrier removal for a student who
already applied, enrolled, and attended. Call-ready: "Marketing pays eleven dollars
for a click that usually never becomes a student. Fifteen removes the last barrier
for one who already is."

**Moral-hazard rebuttal (rehearsed 7/14):** the hold teaches nothing — students don't
know it exists until registration fails; the FINE survives as the accountability
instrument (still owed, still in collections). The gate is a second penalty that
costs the student a semester and the college $700 while recovering pennies on the
debt. One breath: "The fine doesn't go away — accountability survives. We're not
removing the consequence; we're removing the part where we punish ourselves too."

Read-outs: **two-thirds of the entire problem is one hold type, one office, one
message** (TD sole + Bursar stacks ≈ 1,870 students). Cross-office combos are a thin
tail; the truly generic message serves only a few dozen students. Orientation total
512 (389 pure + 123 stacked). Full combination table lives in the workbook.

## Superseded: counts v2 (7/14 ~1 AM, row-dedupe only — 4,503 holds on 4,203 students)

Persons held at 4,203 through every cleaning pass (funnel is sound; dupes were hold rows).
Stacking nearly vanished: ~300 students carry 2+ holds → 90%+ of messages can be the
specific single-hold text.

| Hold type | Final v2 | Category |
|---|---|---|
| Unpaid Tuition - Fees | 2,173 | Bursar-active (M$) |
| WO Accts Receivable | 1,208 | Money-gated (MG) |
| Orientation Needed | 524 | **PILOT** — 389 orientation-only (pure pilot, ~$303K); 135 stacked (~2 ea) route to multi-hold copy |
| Call Advising | 250 | Tier 1 (~18 calls/day paced) |
| Parking fines in collections | 140 | Money-gated |
| Past Due Tuition Fees | 81 | Bursar-active |
| WO Check | 39 | Money-gated |
| International Student | 34 | Tier 1, careful |
| Return Check | 14 | Bursar-active |
| Athletics 13 · Re-Admit 9 · Intl Doc 7 · Health 4 · Textbook 3 · Concurrent 1 · Past Due Bal Coll 3 · ID 0 | 40 | Micro-batches |
| **Total** | **4,503** | **4,203 persons** |

Category totals: Bursar-active 2,268 · Money-gated 1,390 (31% of holds behind the
Bursar ruling) · Financial overall 3,658 = 81%. Headline unchanged: 4,203 × $778 =
**$3,269,934 at ONE class per student** (most take 2+; realized full value $6M+).
Proposal doc rebuilt from these finals 7/14 ~1 AM.

## Superseded: counts v1 (7/14 ~12:30 AM, pre row-dedupe — 5,458 holds, ~1.3/student)

| Hold type | Final | Tier |
|---|---|---|
| Unpaid Tuition - Fees | 2,396 | Tier 2 |
| WO Accts Receivable | 1,481 | Gated (Bursar ruling) |
| Orientation Needed | 860 | **Tier 1 PILOT** (~$670K at one class each) |
| Call Advising | 321 | Tier 1 (~23 calls/day paced) |
| Parking fines in collections | 150 | Gated |
| Past Due Tuition Fees | 95 | Tier 2 |
| WO Check | 47 | Gated |
| International Student | 44 | Tier 1, careful |
| Return Check | 15 | Tier 2 |
| Athletics 13 · Re-Admit 12 · Intl Doc 8 · Health 7 · Textbook 3 · Concurrent 1 · ID 1 | 45 | Micro-batches |
| **Total** | **5,458** | **4,203 persons** |

Headline math: 4,203 × $778 = **$3,269,934 at ONE class per student** (most take 2+, realized full value $6M+); floor 10% ≈ $327K; pilot 860 × $778 ≈ **$669K**, all one-class figures.
Proposal doc (docx + pdf) built 7/14 from these finals — "Registration Hold Relief Campaign."

**Existing in-tenant scripts found (7/14):** Mainstay already runs multi-touch orientation
cadences (intro → "don't mean to pester" reminder → final yes/no check-in → next-steps
with links). Precedent: bot-led nudge sequences are an established pattern in the tenant.
BUT existing copy targets excited incoming first-years ("kicks off their college
experience," housing links) — the pilot's 860 are RETURNING students facing a wall.
Reuse the cadence, re-aim the copy:

- **Touch 1 (day 0):** "Hey {first}, it's Brutus with SLCC! Quick heads up: there's an
  orientation item on your account that will block fall registration. Good news: you
  can knock it out online: mainst.ai/J7LJ. The hold clears as soon as you finish. Questions?
  Just reply, I'm on 24/7."
- **Touch 2 (day 4):** "Hey {first}, Brutus again. That orientation step is still
  showing on your account, and fall registration is coming up fast. It clears the
  moment you finish: mainst.ai/J7LJ."
- **Touch 3 (day 10, final):** "Last check-in from me, my human helpers at SLCC asked
  me to follow up. Have you had a chance to finish orientation? Reply Yes or No and
  I'll point you the right way."

## Superseded counts (7/13 pre-term-filter pull — 6,290 holds on 4,206 students, ~1.5/student)

| Hold type | Count | Tier / note |
|---|---|---|
| Unpaid Tuition - Fees (957-4480) | 2,970 | Tier 2 — the center of gravity |
| WO Accts Receivable (957-4480) | 1,570 | Gated on Bursar collections ruling |
| Orientation Needed (957-4299) | 911 | **Tier 1 PILOT — self-clears via link** |
| Call Advising (957-4978) | 379 | Tier 1 — ~27 calls/day over 2 weeks, absorbable |
| Parking fines in collections | 179 | Gated on collections ruling |
| Past Due Tuition Fees (957-4480) | 100 | Tier 2 |
| International Student (957-4528) | 54 | Tier 1, SEVIS-careful copy |
| WO Check (957-4480) | 51 | Gated on collections ruling |
| Return Check (957-4480) | 21 | Tier 2 |
| Athletics (957-4526) | 15 | Micro-batch |
| Re-Admit (957-4485) | 13 | Micro-batch — the literal come-back hold |
| Intl Doc Verification (957-4528) | 10 | Micro-batch, careful |
| Health Clinic (957-4268) | 7 | Micro-batch |
| Loaned Textbook | 3 | Micro-batch |
| Past Due Bal Collection (x4480) | 5 | Gated on collections ruling |
| Concurrent Update (957-4485) | 1 | Individual outreach |
| ID Discrepancy (957-4840) | 1 | Individual outreach |
| **Total** | **6,290** | |

Read-outs: financial ≈ 75% of all holds → the Bursar partnership IS the campaign;
1,806 holds (WO ×2 + collections ×2) sit gated behind the collections ruling;
no Dean's Hold or bankruptcy rows survived the cohort filters (exclusion rules stay
for future runs). Pilot ceiling: 911 × $778 ≈ $709K on the orientation batch alone.

**Send rule (forced by stacking): one message per STUDENT, never per hold.** Students
average 1.5 holds; per-hold sends triple-text the worst-blocked kids. Stacked students
get the "a couple of items on your account — reply and we'll walk you through them"
variant; Brutus enumerates. The pure pilot = students whose ONLY hold is orientation
(one link → one clear → one registration unblocked). Pivot pending: single-hold
students by type.

## Capacity & routing design (added 7/13 — because nothing is self-service)

Since every hold resolution requires a human at one of eight numbers, an unshaped send
is a self-inflicted DDoS on the owning offices. Design:
- **Staggered batches**, paced in coordination with each owning office (Bursar tiers carry the volume; size their batches smallest).
- **Brutus triages replies first**; the text invites "just reply" before "just call."
- **Callback intake as the pressure valve** — the Registration Rush pattern, reused.
- **Heads-up to each owning office before its tier fires** (Bursar, Advising,
  Orientation, Health Clinic, International, Athletics, Records). Courtesy + capacity
  warning + it makes the campaign theirs too.
- Send timing avoids Monday reporting pulls and any protected refresh windows.

## Fragmentation exhibit (folio material, not campaign material)

The deduped hold-type list embeds EIGHT different phone numbers across 21 labels —
every hold type is its own front door, and (per Travis, 7/13) **for most types the
label's phone number is the only remediation path — self-service endings exist for a
minority (e.g., orientation completion; online payment that releases on posting), and
it depends on the hold.** The hold system still manufactures large mandatory call
volume and blocks ~$3M of registrations.
The 107-IVR friction thesis reproduced inside the hold system — with a revenue number
attached. Short-term fix: this campaign with triage in front. Long-term fix:
self-service hold resolution — a Friction Analysis appendix and another standing
argument for the unified front door (Bruin Connect).

## Strategic frame

- **Timing: run BEFORE Registration Rush.** Every hold still standing when Rush opens
  converts into a peak-period call or counter visit at some office; clearing the queue
  now flattens the Rush curve college-wide. The campaign is Rush pressure relief in
  advance — which ties it to the Fall Rush agenda item, not just the brainstorm.

- This is Ryan's own annual stop-out play (remaining-allocation spend-down), sharpened
  from "past semester or two, as far as quantity allows" to a precision list where
  every recipient is verified blocked, reachable, and non-graduated.
- Seini authorized the concept months ago; execution window lands in the director
  vacancy; platform admin, segmentation, and outbound floor are all Travis's.
- SEM 7/14 carries only the one sentence + the money beat (see
  [[SEM 2026-07-14 Pocket Card]]). The design stays in the vault until the gates clear.

## Open items

- [ ] Final cohort count after term filters (Travis re-running; card updates when it lands)
- [ ] Split: stop-out (202540-only) vs melt (attended 202620/630, no 202640) for copy targeting
- [ ] Bursar rulings: WO + collections types; Tier 2 copy courtesy review
- [ ] Build the resolution-path map per hold type (self-service link vs office contact)
  — this IS the copy table. Confirmed 7/13: **Orientation self-clears on completion**
  (auto-repeal) → best CTA in the whole campaign: a direct link, zero office load,
  conversion measurable end to end. Lead the send order with it.
- [ ] Per-type counts (which tiers carry the volume — shapes send order)
- [ ] Allocation answer + sync restoration (gates 1-2)

## STVHLDD config reconciliation (7/16)

Rebased the cohort on the Banner hold-type table (STVHLDD, the master list of all 119 codes) instead of the hand-curated blocking list. Kicked off by [[Ryan Farley]]'s holds email.

**Registration-blocking is a per-code flag.** 87 of 119 codes carry the Registration indicator; 32 do not. Cohort is now keyed to that flag.

- **Small Balance confirmed non-blocking.** Small Bal Past Due (BD) and Small Bal Hard Hold (EH) both have Registration OFF (they hold grades/graduation, permit registration). Correctly excluded — confirms Ryan Farley's note.
- **FC dropped.** Concurrent Update (FC) does not block registration; removed (was 1 student).
- **Transcripts already clean.** No tuition/balance/collections hold blocks transcripts. Only records/identity holds (Registrar's Hold, Transcript Review, ID Discrepancy, Duplicate SID, VP Office, Data Center, Cont Education, Intl-Grades, UTC Transcript) plus retired "Do Not Use" codes carry the transcript flag. Answers the transcript-law audit ([[Jeremiah]]'s to confirm).
- **Refresh confirmed.** Codes re-mapped/split since the old breakdown: parking now P1/P2/PF/PN/PW; SC repurposed from SLTC to "SAT Hold" (SAT / applied-tech family: SC/SB/SW/OR). BD/EH still exist as small-balance codes.
- **Completeness.** Registration-blocking codes not in-cohort (NP, FH, IB, WF, PW, PF, MA, EE) have zero students in the population — nothing missing.

### Refreshed cohort (7/16, two days after Monday's one-pager pull)

Textable = opted in within Mainstay's last 300 days AND opted in for texting in Banner. **3,493 students / 3,995 registration-blocking holds** (FC excluded). ~$2.72M at one class each (3,493 × $778). Orientation-only pilot 377 (~$293K). 86.6% carry exactly one hold; 13.4% carry 2+.

Populations, Monday vs today:

| Group | Monday | Today |
|---|---|---|
| Unpaid tuition only | 1,671 | 1,548 |
| Written-off balance only | 890 | 854 |
| Orientation only (pilot) | 389 | 377 |
| Advising contact only | 157 | 131 |
| Orientation + tuition | 108 | 97 |
| Parking (collections) only | 74 | 69 |
| Other combinations | 406 | 417 |
| Total students | 3,695 | 3,493 |

Codes in cohort (by hold): TD 1,921 · WR 1,049 · O1 490 · PA 187 · P2 124 · PD 117 · WC 39 · IS 26 · RC 11 · RA 9 · AA 8 · IV 6 · HC 4 · BL 2 · WA 2 = 3,995.

### Status update sent (7/16)

Emailed [[Ryan Farley]] (AVP) + [[Jeremiah]] (Assoc Registrar): scope = registration-blocking holds, in-cohort only; BD confirmed non-blocking; STVHLDD rebase + refresh noted; Monday-vs-today population table + per-code table included; transcript passage left out (Jeremiah's to answer); Concurrent Enrollment raised as an open question ([[Ken]] texts CE manually; excluded by IM in Mainstay until conversion; consent/minor considerations).

## Related

[[SEM 2026-07-14 Pocket Card]]
[[Mainstay Contract Watch]]
[[Interim Interview Prep]]
[[SLCC Trajectory and the Unmasking]]
[[2026-07-13]]
[[2026-07-16]]
