---
type: session
project: DDR-169
date: 2026-07-10
tags: [slcc, contact-center, power-platform, reporting, ddr-169]
---

# DDR-169 — Session 01 — Model Audit, Privacy Hardening, and Submission

## Scope

Take the Contact Center Dashboard from working internal report to publication-grade semantic model and submit under DDR-169 through the IE Team's departmental publishing procedure.

## What shipped

- **Full model audit.** Every measure, column, and relationship cross-checked against actual canvas usage across all six report pages, via DMV dependency dumps and report-layout extraction. Nothing in the published model is unused or undocumented.
- **SLA calculation corrected.** Legacy derived column computed Serviced / Abandoned, an incorrect ratio live on four pages. Removed the broken chain; standardized on the unweighted daily-average convention (`Avg % Serviced Text`), added a numeric `SLA %` measure for trend visuals, retained `SLA % (weighted)` for analysis and validation cross-checks.
- **PII minimized at load.** DimStudents stripped to relationship keys and academic context. Note and message content never loaded. FactCases and FactAlerts excluded from the published model pending student-data access review. Student relationships re-keyed from Student Name to Student ID.
- **Dead objects removed.** Roughly thirty unused measures, a duplicate raw call count, a test RLS role, and unused columns across every table. Auto date/time disabled.
- **RLS consolidated.** Single role, RLS W/ Admin: named admins see all, users see self, supervisors see direct reports, on DimEmployees.
- **Field list curated.** Plumbing hidden; ReportMeasures surfaces as a proper measure table; FactAppointments exposes three categorical slicers.
- **Documentation v2.0.** Full model inventory, calculation logic with DAX, per-dataset privacy classification, maintenance plan, versioned change log. README.md per the request, plus a styled PDF companion.
- **Submitted.** Final .pbix, README.md, and PDF in the DSA sprint folder; reply sent to K. DDR-169 moves to their sprint.

## Decisions

- Ship without the in-development case tables: cleanest privacy posture for a first publication, reintroduce after access review.
- Daily unweighted SLA convention over volume-weighted: SLA is managed at day grain.
- Scrapped the base-query and SharePoint.Contents ingestion experiment: broke twice, marginal value at a weekly refresh cadence. The Fabric Dataflow is the real fix post-publication.

## State at close

- DDR-169 is in DSA's sprint. Awaiting review feedback.
- Open: verify RLS W/ Admin role membership in the workspace after publish.
- Offered, not yet built: Fabric Dataflow ingestion, ShadowAgent automated intake (Infra in progress), extension exclusions to a DimEmployees attribute, FactAppointments Student Name and Email drop.

## Related

[[SLCC Backlog]]
[[Contact Center]]
[[Power Platform]]
[[2026-07-10]]
