---
type: project
domain: student-success
status: active
tags:
  - navigate360
  - starfish
  - osc
  - migration
  - case-management
  - mySuccess
---

# Navigate360 Transition

## What It Is

A platform migration from Starfish by Ellucian (currently branded as MySuccess at SLCC) to EAB Navigate360 for student success case management.

Status: imminent or actively underway.

Driver: institutional platform standardization and modernization -- not OSC specifically wanting to leave Starfish.

## Current State (Starfish / MySuccess)

OSC's primary case management platform. Current usage:
- Coaching notes and documentation
- Flag workflows (1,035 flags in SP26, 95.9% OSC-resolved)
- Caseload tracking
- Student progress visibility
- Segmentation categories (Emerging Learners, Star Students, OSC students)
- Reporting and outcome measurement

Starfish provides richer categorical and note granularity than Navigate360 is expected to offer.

## Concerns with Transition

The concern is not "new software scary." It is:

- **Workflow degradation**: Navigate360 appears operationally more condensed -- fidelity of coaching documentation workflows may be lost
- **Reporting degradation**: categorical richness and segmentation may be flattened
- **Historical continuity**: migration may break data export structures and semantic consistency
- **BI model breakage**: downstream Power BI pipelines, automated reporting, and BI semantic models depend on data structure consistency
- **Automation disruption**: operational automations (TDX integrations, triggered workflows) may break on category/field changes

Migrations like this often break:
- Historical data continuity
- Export structure / API contracts
- Semantic consistency across categories
- BI models and automated ingestion pipelines
- Operational automations

## Travis's Role

Not the formal implementation lead.

Functional role:
- Operational translator
- Analytics and governance layer
- Reporting continuity owner
- Systems implications advisor

Leadership decides the platform. Travis is one of the people ensuring the operational reality survives the transition -- flagging what breaks, preserving data structures, maintaining reporting continuity, translating technical implications for leadership.

Consistent with the broader pattern across Contact Center, OSC, and Mainstay work.

## What's at Risk

- OSC reporting continuity (outcome measurement depends on consistent flag/note categories)
- Power BI pipelines built on Starfish data structures
- TDX integration touchpoints if they reference Starfish categories or IDs
- Historical comparison data for semester-over-semester outcome metrics

## Sole-Source Procurement Justification

SLCC is procuring Navigate360 as a **sole source**, not through competitive bid, under Utah Procurement Code § 63G-6a-802. Mechanics: a Notice of Intent posted through U3P (Utah's procurement portal) naming EAB Global Inc as proposed sole-source supplier for "Navigate360 Software." It's explicitly not a solicitation -- outside vendors can respond only to argue capability, and those responses are used solely to decide whether to run a competitive procurement after the fact. Final call rests with SLCC Purchasing Services.

**Year 1 pricing:** $140,850 subscription + $58,098 implementation fee = **$198,948 total**.

**Written justification (verbatim reasoning submitted):** transitional cost to switch to a different vendor is "significant and unreasonable" given the institutional investment already sunk into shifting culture/practice around Starfish; upgrading to Navigate360 (same vendor family -- EAB owns both Starfish and Navigate360) "preserves the brand while modernizing the platform's capabilities"; additionally cites alignment with the **University of Utah's existing use of Navigate360** as a rationale -- framed as improving the transfer-student experience and inter-institutional collaboration between SLCC and the U.

**Read on the justification's strength:** it's a qualitative argument (culture, disruption, brand continuity) with no quantitative backing cited in the notice itself -- no figures for number of trained users, migration cost estimate, retraining hours avoided, workflows already configured, or integration costs avoided. That's a plausible soft spot if anyone challenges it, but Utah's bar for sole-source isn't "prove no alternative exists" -- it's "provide reasonable justification that competition would not produce a materially better outcome," which this clears without difficulty. Worth remembering: because Starfish and Navigate360 are both EAB products, this is functionally a same-vendor upgrade being justified as if it were a unique-capability purchase -- the switching-cost argument is really about the sunk cost of institutional behavior (advisor workflows, staff training, reporting structures, student-facing comms), not about Navigate360 lacking substitutes in the market.

## Related

[[Online Success Coaching]]
[[TDX]]
[[Power Platform]]
[[Megan Brandley]]
[[Seini Pahulu]]
[[Bruin Connect Transition]]
[[OSC Executive Summary and Program Report Spring 2026]]
[[SLCC Overview]]
