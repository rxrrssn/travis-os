---
type: system
domain: contact-center
status: active
tags:
  - phone
  - student-support
  - IVR
  - routing
  - RingCentral
---

# Contact Center

## What It Is

Frontline student support hub and institutional triage layer.

Channels: phone, chat, SMS, email/ticketing, outbound campaigns.

Student contact reasons: admissions, financial aid routing, registration, account support, general navigation, policy clarification, troubleshooting, referrals.

## Known Data

**Direct Contact Center inbound (2024-25 Annual Report):**
- 48,416 inbound calls
- 99.901% answer rate
- 1:38 average call length
- 30s average time to agent (including IVR navigation)
- 45s average hold time with agent
- ~11-12% average monthly resolution rate (88% of calls require transfer)

**Institutional call volume (IVR analysis scope):**
- ~85,000 calls across all departments
- 3.2 average transfer depth
- 24 seconds average IVR menu time
- ~2,500 hours of student time lost to IVR/hold/transfer overhead

Both figures are the same scope (Contact Center), different time windows:
- 48,416 = 07/01/2024 - 06/30/2025 (academic year, annual report)
- ~85,000 = trailing 365 days pulled late March / early April 2026

The 85k is the more current figure and the one used in the active IVR and call flow analysis.

**Outbound (2024-25):**
- 38,141 unique points of contact
- 20,948 students reached
- 13 outreach campaigns
- 13,884 students registered after outbound contact

Main number: 801-957-4073

See [[Contact Center Annual Report 2024-25]] for full detail.

Key people: [[Seini Pahulu]] (Director), [[Annalise Karr]] (Manager).

## Current Problems

Phone environment is heavily fragmented:
- Many departmental phone numbers
- Layered IVRs with inconsistent logic
- Repeated transfers
- Duplicated menus
- Unclear ownership

Active analysis areas: transfer depth, IVR overhead, operational inefficiency, student frustration cost.

## Key Metrics Tracked

- Transfer depth
- IVR overhead
- Average handle time
- Wait time
- Department resolution rate (DRR)
- Staffing distribution
- Call routing patterns

## Strategic Direction

- Fewer public numbers
- More centralized intake
- Simplified routing
- Higher first-contact resolution
- Reduced transfer chains
- Proactive communication
- More intelligent escalation

## Active Initiative (as of 2026-05-23)

Analyzing institutional call flows and IVR overhead across the college. See [[IVR Call Routing Analysis]] for full detail.

Evaluation scope:
- Transfer depth across departments
- Departmental phone routing logic
- Contact Center containment opportunities
- Student friction points
- Operational inefficiency
- Estimated time overhead imposed on students by fragmented phone systems

Broader goal: help leadership rethink how the institution presents itself operationally, with emphasis on centralized support and reducing institutional complexity.

## Platform

RingCentral (PBX). CTI integration experiments in progress via TDX.

## Staffing: Workload Fairness & Schedule Building

### FT vs PT "fairness" diagnostic model

When leadership raises FT vs PT productivity/cost questions (e.g. "PT does similar output in fewer hours, is this fair"), the trap is answering with raw totals (calls handled, total cost) -- that framing always lands as "FT are inefficient / replace FT with PT," which is the wrong conclusion. The correct model separates two distinct questions usually blended into one scary ratio:

- **Utilization story** (fixable via scheduling): when staff are actively working, FT and PT throughput is consistent. The apparent gap is driven by *when* each group is available relative to demand, not performance.
- **Structural cost story** (not fixable via scheduling): FT carries fully-loaded cost (benefits, PTO, sick time, retirement, non-productive paid time) that PT doesn't. This alone can make FT 2-4x more expensive per productive hour and is expected/by design.

A blended metric like "11x cost-per-call gap" is actually `(structural cost multiplier) × (utilization/timing multiplier)`. Decompose before presenting: (1) Are FT inherently more expensive? Yes, by design -- not a finding, not actionable on its own. (2) Are we getting value from that cost? The real question -- answer it by isolating peak-hours-only and active-time-only comparisons before touching total/loaded numbers.

Supporting metrics to build the case: **Peak Alignment Score** = % of staffed hours during the top 25% demand windows, FT vs PT; **Coverage Efficiency** = calls handled per staffed hour, peak windows only; a demand-vs-coverage overlay (volume line vs active-agent bars by hour); and cost-per-call in two views, active-only (talk time) vs fully-loaded. Root-cause pattern found in SLCC data: FT overstaffed in the low-demand morning, then hitting scheduled lunch as midday volume peaks, so PT absorbs the afternoon peak -- manufacturing the appearance that PT "does more with less" when it's really a break/lunch-placement failure.

### Schedule-building method (demand-driven, constraint-based)

Labor rule constraints as coded for the Contact Center: FT = 40 paid hours/week + two paid 15s/day + one unpaid 1-hour meal/day (not counted toward 40), a 9-hour presence span for 8 paid hours; PT = exactly 31 hours/week including paid breaks (one paid 15 per 4 hrs worked), and over 6 hours worked requires an unpaid 1-hour meal (extends span only). Treat unreliable-but-high-cost slots as non-core, 0-FTE baseline capacity -- the schedule must survive without them; fixed/non-negotiable constraint shifts are not optimization variables, build around the gap they create.

**Peak protection:** identify the true peak window empirically; hard no-meals zone inside peak; cap simultaneous off-phone bodies during peak at 2 ideal / 3 max; never overlap breaks/lunches in the same interval during peak; FT = distributed full-day backbone, PT = peak-compression layer. **Staggered/"waterfall" construction:** offset FT and PT start times ~1 hour apart so coverage ramps and tapers gradually instead of in blocks, eliminating coverage cliffs without headcount changes. **4-day-week / fixed-off-day method:** assign permanent (non-rotating) off-days deliberately paired to patch structural weak points (complementary anchors take opposite edge days off); never let two structurally important roles share an off-day; treat short operating days as inherently leaner rather than forcing a compressed 10-hour shift into them.

## Related

[[SLCC Overview]]
[[TDX]]
[[One Voice One Brutus]]
[[Power Platform]]
[[Seini Pahulu]]
[[Annalise Karr]]
[[Bruin Connect Transition]]
[[IVR Call Routing Analysis]]
[[Contact Center Annual Report 2024-25]]
[[Brutus Engagement Report Spring 2026]]
[[Mainstay Brutus]]
