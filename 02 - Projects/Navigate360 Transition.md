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

## Related

[[Online Success Coaching]]
[[TDX]]
[[Power Platform]]
[[Megan Brandly]]
[[Seini Pahulu]]
[[Bruin Connect Transition]]
[[OSC Executive Summary and Program Report Spring 2026]]
[[SLCC Overview]]
