---
type: reference
project: SLCC
date: 2026-07-11
tags: [slcc, contact-center, mainstay, vendor, contract, budget]
---

# Mainstay Contract Watch

Working file for the vendor relationship and the metering question. Travis manages the relationship de facto; rep cadence is monthly one-on-ones (was bi-weekly during the GenAI turnaround, stepped down once stable). Next rep meeting: ~mid-August 2026.

## Current agreement (2025-2028)

- Term: August 31, 2025 - August 30, 2028 (3-year).
- Price: $97,507.50/year; total contract value $292,522.50 = exactly 3x annual, so pricing is flat-locked for the full term. No renewal negotiation until 2028.
- Billing: annually in advance, Net 30. Year-1 invoice #3122 paid 10/29/2025. Year-2 invoice expected ~late August 2026 (invoice processing only, not a negotiation).
- Fee increases: 90 days written notice, capped 5% "for the same product functionality." Relevant at the 2028 renewal, not now.
- **2028 watch item:** Mainstay granted the Generative AI knowledge base "at no additional cost" in Fall 2025. At 2028 renewal they could argue GenAI = new functionality, escaping the 5% cap. Counter: value expanded inside existing price; SLCC's 61%→89% match-rate gains are their case-study material; support-hour and retention leverage.
- Overage clause: if contracted contact limits are exceeded, Mainstay may bill $2 per additional contact for the remainder of the contract year. This is the live in-term exposure.

## Prior agreement (initial term, for reference)

- Order Form Jan 11, 2022 - Aug 30, 2025 (43.5 months). 40 blocks x 500 = 20,000 "Current Student contacts with valid phone numbers." List $217,500, discount -$72,493, net $145,007 (~$40K/yr effective).
- Current price (~2.4x prior) is consistent with a larger contact block, but the current tier quantity is UNVERIFIED.
- Support hours: $200/hr, billed quarterly in arrears (initial-term term; verify carryover).

## Navigate360 consolidation possibility (unconfirmed, strategic)

Travis believes the plan may be to nix Mainstay and integrate chatbot/messaging into Navigate360 (consistent with the TDX→Navigate ticketing move: everything student-touching into the student record system). Implications:
- Decision window aligns with contract end (Aug 2028; 90-day notice) — early 2028 is the real fork.
- Travis holds every lever: contract exit mechanics, KB content ownership, escalation logic, campaign designs (all platform-agnostic skills), and the benchmark: Brutus at 89% match. Any successor bot must clear acceptance criteria or students eat a regression.
- **Economics (Travis's estimate: Navigate "Virtual Agent" ≤$55K/yr vs Mainstay $97.5K → ~$42.5K recurring delta; full $97.5K frees departmentally if the module rides the institutional Navigate contract).** Two catches for the criteria memo: (1) **Mainstay is TWO products** — inbound Q&A bot AND the outbound SMS campaign engine (38K unique SMS contacts, nudge campaigns, Persist delivery). Virtual Agent likely replaces only the first; price replacement of BOTH or the comparison is fiction. WeChat channel = likely capability loss, equity optics. (2) **Year one ≠ steady state** — KB migration risk (89% match = 18 months of tuning; regression costs staff hours at $6.54/touch), parallel-run term, integration labor; savings are real from year two. Reinvestment narrative: recurring delta ≈ a PT→FT conversion ("consolidated platforms, turned the difference into a full-time human"). Rule: never surface the savings without the reinvestment proposal attached — FY29 budget development (spring 2028) lands right after the Fall 2027 reorg; unclaimed lapses get swept.
- **HARD GATE — SMS channel continuity (the cross-migration catch):** Navigate has campaigns but its 10DLC/A2P registration was NOT approved → Navigate texting is carrier-blocked today. Simultaneously, the voice pilot (Teams Phone + Landis Contact Center + Fusion Connect PSTN) would replace RingCentral/ShadowAgent — and Teams Phone has NO SMS. If both migrations complete as conceived, the institution deletes its only working A2P SMS path (Mainstay's approved 10DLC) with no successor: Persist goes dark on its primary channel to 38K students. Different teams own each migration; only Travis sees the intersection. **Rule: no Mainstay exit until a carrier-approved, deliverability-verified A2P path exists at parity.** 10DLC rejections are re-fileable — and the evidence a re-filing needs is Travis's own data (documented consent flows, 0.03-0.09% opt-out rates, educational use case, sending history). Natural owner: him.
- **Backlog knock-ons:** Teams/Landis winning = Graph API call records replace email-scraped PBX exports (better than ShadowAgent path — the "ShadowAgent cutover" backlog item may be OBE). Do NOT build the Fabric Dataflow against RingCentral's export format while the voice decision is open — pipeline modernization sequences BEHIND it.
- **Navigate texting mechanics (verified against public implementations, e.g. KU):** 1:1 texting sends from POOLED RANDOM numbers (students see mystery senders; institutions patch with manual name-tag prefixes) — natively violates the One Number vision for 1:1. Mass campaigns send from a stable dedicated number with STOP handling. Redeeming: all texts both directions log to the student record; replies route to staff Conversations. Net: Navigate natively unifies HISTORY, not IDENTITY. Five questions for R/EAB: (1) dedicated/branded numbers for 1:1 — possible, cost? (2) What number does Virtual Agent ride on — could the bot's stable line BE the One Number front door? (3) 10DLC re-filing path; does consolidated consent strengthen it? (4) Opt-out scoping — per number/campaign/platform? (5) Throughput + cost model. Likely end-state: two-number family (bot+campaigns on the saved "SLCC" identity; 1:1 behind it, prefix-tagged) — history unification is the unretrofittable half; identity can follow.
- **Question 6 — hosted SMS on owned DIDs:** SLCC owns the 801-957 block; third parties default to 385 inventory (brand disruption). Text-enabling owned numbers is a real capability (hosted SMS: voice route untouched, messaging route provisioned via aggregator + LOA). The killer move: text-enable the MAIN contact center line (the 85,719-call number) — call or text the same digits; bot handles Tier 0 texts; IVR/hold gains "or just text this same number." 10DLC vetting favors it (registered brand sending from its known exchange). Ask EAB (and any messaging vendor): "BYON/hosted SMS on institution-owned DIDs via LOA — supported?" Procurement lever at every renewal. **Landmine:** voice ports (Teams/Fusion Connect pilot) can silently break hosted SMS routes — re-confirm messaging routing on any ported number; add to the voice-migration checklist.
- **THE number: 801-957-7522 = 801-957-SLCC.** Currently a marketing-gimmick forward to 4111/4073. This is the One Number's hardware: hosted SMS provisions on the digits independent of the voice forward → "Call or text 801-957-SLCC" with zero disruption to current routing. Voice eventually upgrades from blind forward to the Bruin Connect smart front door; texts route to the Virtual Agent (Tier 0) with humans behind. Campaigns ride a sibling number for STOP sanity → two intentional identities, one of which spells the school's name. Ally: Institutional Marketing (existing chatbot content partners) — every printed instance of 957-SLCC becomes a retroactive text entry point.
- **Move when it ripens: author "chatbot consolidation criteria"** — match rate, after-hours coverage, escalation quality, cost/contact, KB migration plan, parallel-run comparison, go/no-go standard. Not a defense of Mainstay; a standard for any successor. Indifferent to the outcome, indispensable to the process.
- Role note: Mainstay oversight is a major JD leg — but migrations promote platform owners to migration owners. The analyst role dissolving into consolidated platforms is Travis's own program working; the landing is upward.

## One Number cutover — SCHEDULED 8/25 (from 7/7 monthly review)

- **Cutover day Aug 25, 2026: SLCC deletes all numbers except 385-338-3993.** Bot intro
  and reintro planned (enrolled students via reminders; unenrolled re-intro back 1 year).
  Retiring numbers may move to partner Sandbox with a redirect script (open item with
  Rebeka: number list).
- Note the tension with the 801-957-SLCC vision: the surviving number is 385 inventory,
  not the owned 801-957 block. The hosted-SMS-on-owned-DIDs play remains the better
  end-state; 8/25 consolidates identity but onto vendor inventory.
- **Campaign collision (caught 7/14): the Hold Relief window overlaps the cutover.**
  Texts sent from retiring numbers orphan reply threads on 8/25. Rule: hold-campaign
  sends ride the surviving number from day one, or waves sequence around the cutover
  with the reintro folded in. Logged as a campaign gate.

## Institutional KPIs stated in vendor reviews (7/7 — pitch fuel)

- **Admissions: enrollment to 50K by 2027 (current avg ~27K). Retention: timely
  completion to 50% (current ~16%, based on 21-22 data).** The hold campaign is
  measurable progress against leadership's own stated enrollment number.
- "3rd week churn — negate concerns before they become drops or withdraws" is already
  doctrine in these meetings; hold relief is the same doctrine applied pre-term.

## SFTP sync outage (open, urgent — logged 7/13)

- **PAPER TRAIL: Travis raised the outage in the 7/7 monthly review** (action item:
  "inbound SFTP integration stopped on 6/23?") — a week before the 7/13 email. Item
  stalled when Mari went OOO. Escalation timeline: flagged 7/7 (vendor's own notes) →
  written follow-up 7/13 → root-cause hypothesis + EA handoff with current spec 7/14.

- **No successful SFTP drops since 6/23/26 ~7:45 AM (MDT; sync ran same time daily).** Platform student data is ~3 weeks stale as of 7/13.
- Suspected cause (per Mari, Mainstay rep, before her vacation): Mainstay brought their SFTP provider in-house; whitelisting changes may be rejecting SLCC's files.
- Travis circled back 7/13 11:11 PM with Ryan (Ed.D., Partnership Director, Mainstay — covering while Mari is OOO). Ryan looped in Rebeka (Partner Support Associate). **Rebeka, 7/14 12:04 PM ET: "we haven't been receiving any files"** — Mainstay's side sees NOTHING inbound, which points the diagnosis at the SLCC-side sending job: their in-house SFTP migration likely changed endpoint/credentials/IP allowlist and the EA job has been pushing at a dead target since 6/23. She asked SLCC to verify send configuration + credentials; offered a joint review (after 2 PM ET availability).
- **7/14 status: Travis partnering with Enterprise Applications** (they own the job). EA asks: job logs for connection/auth failures since ~6/23; compare configured endpoint + credentials against Mainstay's current spec (requested from Rebeka). **Backfill confirmed needed** — nothing queued vendor-side; bulk push once restored.
- Vendor-accountability nuance softened: if the root cause is a migration-side spec change that was never communicated to partners, that's still their process gap (no partner notification of connection changes) — but the outage mechanism may be SLCC's job failing, not their whitelisting. Keep the 2028 file line honest either way.
- **Open questions for the reply:** (1) do the files pushed since 6/23 need re-pushing from SLCC's side, or are they queued at Mainstay? (2) timeline to restore.
- **Campaign collision — why this is urgent, not routine:** the FY27 stop-out re-engagement play (Ryan Farley's annual allocation spend-down) and the hold-cohort text campaign both fire on Mainstay in late July–August. Stale student data means stale hold lists, stale enrollment statuses, messaging students who already registered or left. **Rule: no campaign sends until the sync is restored AND a fresh full sync has landed.** Verify the sync-log shows a successful drop before any list is pulled.
- Vendor-accountability note for the file: a three-week silent data-feed outage caused by the vendor's own infrastructure migration, detected by the customer, is 2028-renewal-file material (service reliability), and near-term leverage if the allocation/overage conversation needs it.

## The metering question (open, material)

- **Campaign angle (7/14): if metering = unique users per contract year, the Hold Relief
  cohort (3,695, all texted within 300 days = within the current contract year) is
  already counted — the campaign draws zero new allocation. Kim Meyer's answer resolves
  this; if confirmed, it belongs in the campaign pitch and in the 2028 value file.**

- Platform shows **161,809 active SMS contacts** (excludes WeChat).
- Vendor report shows 38,354 unique students *contacted* via SMS in AY 25-26 — on-file vs contacted are very different denominators.
- If the current tier is anywhere near 20-50K and meters on active-on-file, latent exposure at $2/contact could reach six figures. If the tier is large/unlimited or meters on contacted/current-students only, there is no issue. Year-1 invoiced with no overage line — either fine, or unaudited.
- Old form's qualifiers ("Current Student," "valid phone numbers") suggest archived/non-current contacts likely do NOT count. Unverified.

## Action sequence (before next rep meeting)

1. **Read first, ask second.** Pull the current agreement's order form + SaaS Agreement definitions: contracted contact quantity, definition of "Contact" for metering, overage assessment mechanics, support-hour terms carryover.
2. **Hygiene sweep.** Inventory 161,809 actives: current students vs graduated/withdrawn/stale prospects/invalid numbers. Archive non-current and long-dormant records. Defensible data governance on its own; shrinks the metered surface before anyone measures it.
3. **Rep meeting (routine framing).** "As part of our invoice-cycle review, confirm our contracted contact quantity and how active vs archived contacts are metered." Get the answer in writing. Never ask "are we over?" — read the contract, clean the base, then ask the checklist-shaped question.
4. If post-cleanup actives still exceed tier: raise proactively as tier-sizing ("our growth is your case study"), not as discovered overage.

## Corrections to the circulating billing brief

- The "Suggested Ownership" table names a "Senior Director" — no such role exists. Vendor relationship is managed by Travis (Contact Center). Worth a corrected repost; also useful paper trail.
- The brief's "renewal tracking" framing overstates August: it's a year-2 invoice inside a fixed 3-year term, not a renewal.

## Unit economics (for budget/interview use)

- Bot-handled message: ~$1.73 ($97.5K / 56,207 AY25-26 bot-handled) vs ~$6.54 per human interaction — Tier 0 runs at ~1/4 of Tier 1's unit cost.
- Per active contact: $97.5K / 161.8K ≈ $0.60/contact/year (if tier supports it, this is the value story).

## Related

[[Mainstay Brutus]]
[[Role Scope and Application Assets]]
[[SLCC Backlog]]
