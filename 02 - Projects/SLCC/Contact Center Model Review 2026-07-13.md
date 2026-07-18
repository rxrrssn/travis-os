---
type: reference
project: SLCC
date: 2026-07-13
tags: [slcc, contact-center, power-platform, reporting, review, ddr-169]
---

# Contact Center Model Review (from .pbit, 2026-07-13)

Structure-only review of the Contact Center report template: 13 tables, 42 measures, 7 pages (Dashboard, Agent, Daily Recap, Weekly Recap, Monthly Recap, OSC, OSC2), RLS role, SharePoint.Files ingestion across two sites. No data reviewed.

## What's solid (worth saying first)

- Clean two-grain call architecture: FactCallLegs (leg grain) grouped in PQ into FactCalls (call grain) with Has* flags — the right pattern, done upstream where it belongs.
- Auto date/time is OFF; single DimDate (DAX calendar) with sort columns and fiscal month. Correct.
- RLS design is sensible: admin allowlist + see-self + manager-sees-directs via USERPRINCIPALNAME.
- WoW measures use the REMOVEFILTERS + SELECTEDVALUE pattern correctly, with ISBLANK guards.
- Student relationships re-keyed to Student ID (names/emails not used as join keys for students).
- ReportMeasures dummy table for display measures; measures organized.

## Findings, priority order

### 1. ~~The UTC time bomb~~ — DOWNGRADED 7/13 (known behavior, documented)
Relative-date page filters on Dashboard, Agent, Weekly Recap, OSC, and OSC2, plus three pivotTable visual-level relative-date filters (Daily Recap, Weekly Recap, Agent). Every one evaluates "today" in UTC on the Service — after 6 PM Mountain, all five pages live in tomorrow. Additionally `FactCalls[Is Last Full Week]` computes `TODAY()` in DAX — same drift: Sunday evenings, "last full week" advances a day early on the Service.
**Fix:** refresh-anchored flag columns in DimDate (IsLast7Days, IsLastFullWeek, IsCurrentMonth etc., computed at load with timezone-corrected today); replace all relative-date filters and the TODAY() measure with flag filters. One change, five pages fixed, Desktop and Service agree forever.

**STATUS 7/13: downgraded, not fixed — deliberately.** Calibration: relative filters here are coarse day-anchors on weekly-refreshed data, refreshes run late morning (mid-UTC-day), and viewership is business hours. View-time drift shifts one edge day on windows fuzzier than the data's own weekly edge — imperceptible. `Is Last Full Week` (the TODAY() measure) was unused and DELETED outright. Flag columns remain the upgrade path if a tight window ever feeds a headline number. Doctrine captured: refresh-time logic is protected by the late-morning pull; only view-time logic (relative filters) rides UTC.

### 2. Hardcoded extension blacklist — RESOLVED BY DELETION 7/13
`NOT AgentEXT IN {"3141","3148","4237","4863","5057","5069","5090","5112"}` — magic numbers in DAX. Note: **4237 is Seini's extension, and she leaves Wednesday.** This list is already aging out. Turnover silently corrupts AHT (a new lead's extension gets counted; a reassigned extension gets wrongly excluded).
**Fix:** IsExcludedFromAHT flag column on DimEmployees (or DirEXTs), maintained as data, filtered in the measure. The exclusion becomes visible, documented, and survives personnel changes.

**STATUS 7/13: resolved by deletion.** The extension list turned out to be a testing relic (leadership test calls during instrumentation), not policy. Hardcode removed — then the entire handle-time measure family (8 measures) was found unused by any visual and deleted; full DAX preserved in [[Measure Archive 2026-07-13]]. Report's ASA/AHT figures come from implicit matrix column sums (cruder: all legs, no exclusions, no per-call MIN) — acceptable as directional; resurrect the refined measures from the archive if a document of record ever quotes them.

### 3. PII minimization — DONE 7/13 ✓
Still loaded: DimStudents[Student Name], DimStudents[Email], FactAppointments[Student Name], FactAppointments[Email], FactNotes[Email], DimEmployees[EmployeeEmail] (needed for RLS — keep). Student joins all run on Student ID, so the student name/email columns appear droppable at load. Hidden ≠ minimized — they're in the model, in exports, in any future "analyze in Excel."
**Fix:** Table.RemoveColumns at load for the five student PII columns. Matches the DDR-169 privacy classification story.

**STATUS 7/13: complete and verified in template** — all five student PII columns (DimStudents Student Name/Email, FactAppointments Student Name/Email, FactNotes Email) removed at load; zero measure/visual references existed. DimEmployees[EmployeeEmail] retained (RLS dependency). Closes the 7/10 deferred task. Remaining rider: one-line heads-up to DSA reviewer that live model schema has diverged from the submitted copy (PII drop + measure cleanup).

### 4. Two SLA measures that will disagree with each other
- `[SLA % (weighted)]` = SUM(Serviced) / (SUM(Serviced)+SUM(Abandoned)) — volume-weighted. Correct for "what % of demand was serviced."
- `ReportMeasures[SLA %]` = AVERAGEX over days of each day's ratio — every day counts equally, so a quiet Saturday moves the number as much as a slammed Monday. Despite the other's name, THIS one is the unweighted one.
- `FactSLA[Avg % Serviced Text]` = parses "% Serviced" strings ("-", "%") in DAX, returns TEXT.
Three answers to one question is a "your numbers don't match" complaint waiting to happen — today's average/total episode, next edition.
**Fix:** pick the weighted one as canonical, rename honestly (SLA % Weighted / SLA % Daily Avg), and move the string cleanup of FactSLA[% Serviced] upstream into PQ so the column lands numeric (the text measure then dies).

### 5. Inconsistent denominators across the call measures
- `[Total Calls]` requires HasEmployeeLeg = 1.
- `[Outbound Calls]` counts Direction IN {Outbound, Internal} with NO employee-leg condition (and quietly includes Internal under an "Outbound" label).
- `[Abandoned Calls]` = SUM(Abandoned) — abandoned calls presumably have no employee leg, so they're excluded from [Total Calls].
- Therefore `[Abandon Rate]` = Abandoned / handled-only ≈ abandoned over a denominator that excludes the abandoned population. Conventional abandon rate is abandoned / offered (answered + abandoned). Current form overstates vs convention.
Nothing here is necessarily wrong — but the definitions aren't written down in the measure names, Inbound+Outbound ≠ Total, and a DSA reviewer or a skeptical AD will eventually add two visuals together and file a complaint.
**Fix:** define Offered Calls = handled + abandoned (+missed?); make Abandon Rate = Abandoned / Offered, or rename current to "Abandon per Handled"; give Outbound its employee-leg condition or document why not; decide whether Internal is its own direction. One definitions pass, documented in measure descriptions.

### 6. RPT-Avg* N=1 problem — RESOLVED BY SUPERSESSION 7/13
`RPT-AvgConnects` / `RPT-AvgActivities` divide totals by count of ACTIVE employees. Filtered to one coach → average = total, guaranteed. This is this morning's argument, encoded.
**Fix:** N<=1 guard returning BLANK() or "n/a — single selection", and/or an "avg across N staff" caption fed by a visible N measure. Also note these return formatted TEXT — fine for cards, unusable for conditional formatting/sorting; keep numeric twins if visuals ever need them.

**STATUS 7/13: resolved by supersession.** RPT-AvgConnects / RPT-AvgActivities deleted (unused; archived). Replaced by RPT-TermAvgConnects / RPT-TermAvgActivities: current-term, date-filter-agnostic (REMOVEFILTERS on DimDate + DimCalendar), weekly-average grain (AVERAGEX over TermWeekLabel, active weeks only) — structurally immune to the average-equals-total collapse because the grain sits below any selectable window. Built on new numeric bases [Connects] and [Activities]. Tile label rename ("This Week" / "Term Wkly Avg") still recommended.

### 7. Name-based employee joins (the audit's root cause, structurally)
FactNotes[Creator], FactCommunications[Sender], FactAppointments[Staff Organizer Name], FactCases[Updated By (user list)] all join DimEmployees on FormattedName. Name drift, nicknames, or format changes silently orphan activity (it happens today: the multi-value "user list" columns cannot match when two names share a cell — those rows fall out of attribution entirely, which is why the contains-flag was needed).
**Constraint (confirmed 7/13):** the source exports only expose names — ID/email joins aren't available, and the export schema isn't Travis's to change. Reclassified from "fix" to "documented limitation + mitigations," all within model control: (1) normalize the name key at load on BOTH sides (Text.Trim / Text.Clean / consistent casing on DimEmployees[FormattedName] and every fact name column) so whitespace/case drift can't silently break joins; (2) a DimEmployeeAliases mapping table (variant name → canonical) merged in at load, so nickname/maiden-name/format changes get caught once and permanently; (3) an "Unattributed Activity" audit measure — count of fact rows with no employee match — surfaced on a QA page so orphaned attribution shows up as a number instead of a silent undercount; (4) measure descriptions state that per-person attribution from multi-user cells undercounts by design. Upstream ask stays on the systems list: whoever holds the director seat can request name+ID in the exports — "not up to me" has a September expiration date.

### 8. Housekeeping
- **UnappliedChanges is 208KB** — the template exported with pending, unapplied Power Query edits (likely today's scrub work). Apply or discard before this file becomes an artifact of record; a fresh open will prompt and confuse.
- Orphaned query helpers: a full Parameter9/Sample File (9)/Transform File (9) family for **FactAlerts** exists with no FactAlerts table in the model; FactCases has TWO helper families (8 and 11). Dead weight; delete.
- FactTickets (hidden, 3 cols, TDX) — with the TDX exit decided, this table and its helper family are removal candidates on their own timeline.
- DirEXTs column names carry trailing colons from Excel headers ("Department:", "Sub-Dept:") — rename at load.
- RLS allowlist check: role contains "spahulu@slcc.edu" but her mail signature shows seini.pahulu@slcc.edu. USERPRINCIPALNAME() returns the UPN — verify which form her UPN actually is, or her admin access silently no-ops. Also: allowlist needs a post-7/16 decision (remove/replace Seini; is Charlotte still correct?).
- FactSLA[Name] is the date column of that table (named by Excel import) — rename to SLADate for sanity.

### 8b. Status of housekeeping items (7/13 EOD)

- UnappliedChanges blob: **verified benign** — all 56 queries byte-identical to applied model; cosmetic export packaging, no action, struck.
- Orphaned helper families: **families (8) and (9) deleted** (old FactCases import + FactAlerts); dependency-mapped first — all surviving families have exactly one live consumer; group folders labeled per table. Family (4) still parked with FactTickets, dies with the TDX exit.
- Testing-relic sweep (new category, 7/13): OSC dept exclusion filter in DimEmployees **yanked** (hanger-on from testing, dept/title values changed in the flow anyway); AHT extension list (see finding 2); 16 unused measures **deleted** → [[Measure Archive 2026-07-13]] (handle-time family ×8, WoW family ×5, Is Last Full Week, RPT-Avg pair).
- Privacy levels: **root-caused and fixed** — sources were set Private with firewall historically off; enforcement re-enabled → 19 blocked queries. Both SharePoint sources set to **Organizational**. Runbook line: this model's combine-files pattern requires Organizational (or current-file ignore); Private blocks all refreshes.
- Still open (minor): FactSLA[Name]→SLADate rename; DirEXTs trailing-colon renames; FactSLA[% Serviced] numeric-at-load (folds into finding 4); RLS spahulu UPN verification + post-7/16 admin list decision (transition-critical, this week).

### Added 7/13 (beyond original findings)

- **DimCalendar term dimension built:** single-file folder-locked load with whitespace/nbsp scrub (Text.Trim/Clean — an invisible-character variant was blocking sort-by validation), TermWeekSort key, sorts set (Term→TermSort, TermWeekLabel→TermWeekSort), related to DimDate many-to-one cross-filter Both. Known semantics: terms overlap in early May (dates count toward both), winter break belongs to no term.
- **DimEmployees transition watch:** roster builds daily via recursive reports-to-Ryan traversal (Ryan = only hardcode); Seini is the bridge node until 7/16. Snapshot taken (DimEmployees_FROZEN). Thursday file check; no manual BI refreshes Wed→verified; long-term re-anchor to a department group ("people change, roles persist").
- **Runbook lines accrued today:** Monday 11:45-12:30 is a protected window (subs drain — no manual refreshes); persistent filters store per-user Service state (Reset to default / disable persistence for reports of record); relative date filters evaluate view-time UTC (drift begins 6 PM MT); subscriptions are decoupled from refreshes (after-refresh subs key off scheduled, once daily).

## Suggested sequence

~~1. Definitions pass (findings 4, 5) — cheap, kills future credibility fights, do before DSA asks.~~ **← THE ONLY SUBSTANTIVE WORK REMAINING**
~~2. DimDate flag columns + strip relative-date filters (finding 1)~~ — downgraded; upgrade path on file.
~~3. PII drop at load (finding 3)~~ — DONE.
~~4. Extension flag to DimEmployees (finding 2)~~ — resolved by deletion (testing relic).
~~5. N=1 guards (finding 6)~~ — resolved by supersession (term tiles).
~~6. Housekeeping (finding 8)~~ — substantially done; minor renames + RLS admin decision remain.

**Remaining as of 7/13 EOD:** findings 4+5 (SLA consolidation + denominator definitions pass), RLS UPN check + post-7/16 admin list, tile label renames, minor renames, republish to Service outside the Monday send window, DSA heads-up on schema divergence.

## Related

[[Power Platform]]
[[Contact Center]]
[[2026-07-13]]
