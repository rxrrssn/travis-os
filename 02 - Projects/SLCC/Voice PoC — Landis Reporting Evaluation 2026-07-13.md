---
type: reference
project: SLCC
date: 2026-07-13
tags: [slcc, contact-center, voice-poc, landis, vendor, reporting, evaluation]
---

# Voice PoC — Landis Reporting & Data Access Evaluation

Written 7/13 after PoC test session. Scope: reporting and data access only — supervisor
experience, agent UX, and call handling are evaluated separately by the tester group.
Doctrine: criteria first, indifferent to the outcome, indispensable to the process.

## Context

- PoC configuration: Teams Auto Attendant → native Teams call queue (Help Desk) vs
  Landis call queue (Contact Center); assignments swap daily so both teams test both
  queue types. Coordinator's own framing made reporting the evaluation axis: "pull
  reports for these dates/times of testing to see if they meet your needs for what
  types of reports you have to deliver."
- The Contact Center's reporting obligations are not optional: the demand-forecast
  scheduling model, the published DDR-169 dashboard, and weekly leadership reporting
  all consume programmatic call data today (currently from PBX exports).
- Selection context: Landis was reportedly selected as the lowest-cost vendor.

## The gate (requirements any voice platform must meet)

1. Programmatic access to historical call/queue data (API pull, scheduled export, or
   equivalent) — not portal-only.
2. Field coverage: interval volumes by queue, abandons, talk/hold durations, agent
   states, service level.
3. Delivery guarantees: missed data must be recoverable (retry/redelivery/backfill).
4. Sustainable operating cost: no permanent manual-export labor.

## Documented findings (vendor documentation, verified 7/13)

- **Export:** manual Excel export on some reports — current columns and filters only.
  No bulk historical pull.
- **Scheduled reports:** documented as a preview feature (email delivery on schedules);
  **not visible in our tenant.** Enablement/licensing status unknown.
- **Webhooks:** four event types (Queue, Agent, IVR, Recording) fire HTTP POST at call
  end. Field coverage is adequate for the demand model (wait/talk, service level,
  identities, wrap-up, sentiment). **Push-only:** no documented retry, redelivery, or
  backfill. A missed event is a silently lost record; the only reconciliation path is
  manual export.
- **Reporting API:** none documented.
- **Power BI integration:** publicly announced by Landis in 2021; absent from current
  documentation.

## Session findings (7/13 test session)

- The Landis representative left the session early.
- The data-access questions (API status, Power BI integration status, webhook delivery
  guarantees, scheduled-report enablement, Graph call-record generation) were posed to
  the PM; the answer on the record was **"we don't know."**
- Stated for the record in-session: this department's operation runs on exactly this
  data, and a platform choice cannot corner it into spending ~9 hours/week on manual
  reporting.
- **All five questions remain open. Recommendation: submit them to Landis in writing
  and require written answers before any procurement decision.**

## Cost of the gap (TCO framing)

- Manual reporting labor at the observed export ceiling: even a conservative 3–4
  hrs/week at the $32.43 blended rate is **$5,000–6,700/year, permanent** (the 9 hrs/week
  ceiling case stated in-session runs ~$15,200/yr) — a recurring cost comparable to the
  license savings that motivated the selection.
- Webhook compensation path (if pursued): premium connector or Azure ingestion
  infrastructure, build hours, and permanent monitoring (no retry policy means an
  unwatched endpoint silently loses data), plus manual reconciliation for gaps.
- Data-integrity exposure: a source that cannot be re-queried cannot serve a report of
  record without a compensating audit process.
- "Cheapest license, most expensive data": the low bid externalizes the data layer to
  customer-side labor and infrastructure.

## Comparison baseline

- **Native Teams queues:** thinner supervisor UX, but a documented programmatic story —
  Graph API call records plus Microsoft's published Power BI template for Auto
  Attendant/Call Queue analytics. Gaps on the open platform are fillable in-house;
  gaps behind a closed portal are not.
- **Dynamics 365 Contact Center** (the priced end-state for "reporting is the point"):
  Dataverse data layer, native Power BI/Fabric access, ~$95–110/user/month — several
  multiples of Landis. Defines what the requirement costs when a vendor prices it in.

## Criteria table

| Requirement | Landis (as tested) | Native Teams queues |
|---|---|---|
| Programmatic historical pull | ✗ none documented | ✓ Graph call records + published PBI template |
| Field coverage | ✓ (webhook payloads) | Partial (queue analytics granularity to verify) |
| Delivery guarantees / backfill | ✗ push-only, undocumented | ✓ pull model (retention window applies) |
| No permanent manual labor | ✗ manual export is the ceiling today | ✓ automated pull |
| Supervisor experience | ✓ (evaluated separately) | ✗ thin natively |

## Recommended architecture — the pick (decided 7/13)

Three data layers exist in the stack: Microsoft (Graph call records, call level),
Landis (queue semantics), Fusion Connect (PSTN/carrier CDRs). The canonical reporting
space is chosen for durability and access, not richness:

**Canon: Microsoft Graph call records.** The one layer that is vendor-neutral (every
call rides Teams regardless of which queue app wins now or later), pull-based and
re-queryable (delivery guarantees by construction), institutionally durable (already
licensed, versioned API, service-principal auth matching the service-account
architecture), and migration-proof (survives Landis in or out, and any future voice
decision). Build one harvester: scheduled pull → SharePoint/Fabric landing zone
(retention is ~30 days at the source, so continuous harvest is required — same pipeline
pattern as everything else in the model).

**Enrichment: the queue layer, from whichever queue app survives — treated as
replaceable.** Queue name, wait time, service level, agent states join to canon by call
correlation. If Landis stays, its webhooks feed this as a loss-tolerant stream (canon
doesn't depend on it); if native queues win, the published queue analytics fill the
same slot. The gate on any queue app shrinks to one requirement: reliably emit queue
events, or expose SL as a secondary metric.

**Reconciliation: Fusion Connect CDRs.** Carrier-grade volume truth for monthly
reconciliation and billing audit — the "did we see every call" check — never an
operational feed.

Strategic consequence: once canon is vendor-neutral, the queue-app decision stops being
a data decision and becomes a UX/feature/price decision. Landis's data weakness stops
being disqualifying and becomes merely priced.

**Load-bearing assumption to verify first (open item #2): Landis-queued calls must
appear in Graph call records.** If they do, this architecture stands. If they don't,
Landis actively removes calls from the institutional data layer, and the architecture
itself disqualifies it.

## Verdict (reporting axis only)

**Landis, as configured and documented, fails the data-access gate.** Conditional pass
is available only with written vendor commitments: a retry/redelivery policy for
webhooks, a pull mechanism for historical data (API or GA scheduled exports), and
confirmation of whether Landis-handled calls generate Microsoft Graph call records.
Absent those commitments, selecting Landis commits the department to permanent manual
reporting labor or customer-built ingestion infrastructure — costs that belong in the
procurement comparison.

## Open items

- [ ] Submit the five data-access questions to Landis in writing; request written answers.
- [ ] Verify whether Landis-queued calls appear in Graph call records (testable from the
  PoC tenant without vendor help).
- [ ] Confirm native-queue analytics granularity against the field list (PBI template).
- [ ] Pull the test-window reports from both queue types per the coordinator's ask;
  attach as exhibits.

## Related

[[Contact Center]]
[[Mainstay Contract Watch]]
[[SLCC Backlog]]
[[2026-07-13]]
