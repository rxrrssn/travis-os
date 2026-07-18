---
type: system
domain: power-platform
status: active
date: 2026-07-15
tags: [powerbi, dax, power-query, vba, techniques]
---

# Power BI Techniques & Patterns

Concrete, reusable techniques for the Contact Center / Online Success Coaching reporting stack. This is the "how" layer that sits under [[Power Platform]] — the philosophy (ingestion-first, SharePoint landing zones, Fabric semantic models, star schema) lives there; the working patterns live here.

---

## Duplicate detection & join hygiene

**Fastest "only duplicates" check** — Power Query, not DAX:
1. Select the key column (e.g. `CallID`) → **Home → Group By**
2. Group by key, new column `RowCount`, Operation = **Count Rows**
3. Filter `RowCount > 1`

That table shows **only keys that duplicate**. To see the full duplicate rows (not grouped), merge the grouped table back to the original on the key, expand, filter `RowCount > 1`.

**Duplicate-only calculated table (DAX equivalent)** when you need it in the model:

```DAX
DuplicateRows =
FILTER(
    ADDCOLUMNS(
        YourTable,
        "RowCount",
        CALCULATE(COUNTROWS(YourTable), ALLEXCEPT(YourTable, YourTable[CallID]))
    ),
    [RowCount] > 1
)
```

**Join multiplication is not "duplicates."** When `FactInbound` × `FactOutbound` explodes, it's a many-to-many key. If inbound has 2 rows for a CallID and outbound has 3, the join yields 2 × 3 = 6. **Never fix this with "Remove Duplicates."** Fix it by pre-aggregating one side to the correct grain before the join, or — better — keep the fact tables separate and relate both to shared dimensions (Date, Agent, Phone). Merging is usually unnecessary.

**Fake-precision keys are the real duplicate source.** The outbound key `[Phone] & "_" & DateTime.ToText([CallStart], "yyyyMMddHHmmss")` collides whenever the log grain is coarser than the key (the PBX outbound log is only granular to the **minute**), so it reduces to `Phone + Minute` — not unique. Rules:

- **Use the system's real ID if one exists** (InteractionID, CallGUID, SessionID, AttemptID). Stop generating a key.
- **If none exists, add an Index column** (Add Column → Index From 1) *before any joins/appends*, and build a prefixed surrogate: `"O_" & [Phone] & "_" & Text.From([Ext]) & "_" & Text.From([Index])`. Prefix inbound differently (`"I_" & ...`) so keys never clash cross-table.
- Add the index in the base table, never inside a grouped table.

Before touching keys, answer **"what is the correct grain?"** — one row per call, per leg, or per dial attempt. Every key and measure follows from that answer.

---

## Power Query patterns

- **Reference, not Duplicate**, when deriving a table (e.g. building `DimDate` off a fact query). Reference links to the source query so upstream changes flow through; Duplicate forks a static copy that drifts.
- **Split multi-select fields to rows.** TDX Service Area / Reason come back comma-joined in one cell. Select column → **Transform → Split Column → By Delimiter → `,` → Advanced → Split into Rows**, then **Trim** immediately (`Text.Trim`) — `"Advising"` vs `" Advising"` otherwise count as two categories. **Caveat:** if two independent multi-selects are both split naively you get a Cartesian explosion (2 depts × 2 reasons = 4 rows). Only split both when they align positionally (then zip lists by index); if they're independent, split one and report "mentions," or push the source form toward a hierarchical taxonomy (`ADV - Registration`).
- **Connection Only + Add to Data Model** for everything except the primary analysis grain. Right-click query → Load To → Only Create Connection, and check **Add this data to the Data Model**. Fully loading 250k+ leg rows to a worksheet *and* the model bloats the workbook and kills refresh. Keep only QA/spot-check tables loaded to sheets.
- **Add source metadata in PQ, not the workbook** — `SourceFileName`, `LoadTimestamp`, derived `LoadID` from the filename or SharePoint modified-time. Keeps the raw artifact pristine and puts lineage in the governed layer.

**DimDate as a blank query (Excel M)** — continuous calendar with fiscal-month ordering (Jul–Jun = 1–12) and a sortable `YearMonth`. Anchors ticket-vs-PBX comparison to one shared date spine:

```powerquery
let
    SourceMinDate = Date.From(List.Min(FactCalls[CallDate])),
    SourceMaxDate = Date.From(List.Max(FactCalls[CallDate])),
    DateList = List.Dates(SourceMinDate, Duration.Days(SourceMaxDate - SourceMinDate) + 1, #duration(1,0,0,0)),
    DimDate = Table.FromList(DateList, Splitter.SplitByNothing(), {"Date"}),
    WeekStart = Table.AddColumn(DimDate, "Week Start", each Date.StartOfWeek([Date], Day.Monday), type date),
    WeekNum = Table.AddColumn(WeekStart, "Week Num", each Date.WeekOfYear([Date], Day.Monday), Int64.Type),
    Yr = Table.AddColumn(WeekNum, "Year", each Date.Year([Date]), Int64.Type),
    MoNum = Table.AddColumn(Yr, "Month Num", each Date.Month([Date]), Int64.Type),
    MoName = Table.AddColumn(MoNum, "Month Name", each Date.MonthName([Date]), type text),
    FiscalMo = Table.AddColumn(MoName, "Fiscal Month Num", each if Date.Month([Date]) >= 7 then Date.Month([Date]) - 6 else Date.Month([Date]) + 6, Int64.Type),
    YrMo = Table.AddColumn(FiscalMo, "YearMonth", each Date.ToText([Date], "yyyy-MM"), type text),
    YrMoSort = Table.AddColumn(YrMo, "YearMonth Sort", each Date.Year([Date]) * 100 + Date.Month([Date]), Int64.Type)
in
    YrMoSort
```

DAX `CALENDAR ( MIN(FactCalls[CallDate]), MAX(FactCalls[CallDate]) )` + `ADDCOLUMNS` is the equivalent when building the date table inside the model instead of PQ.

---

## DAX measure patterns

**Duration formatting — the #1 "wrong number" trap.** Power BI/Excel time is measured in **days**, so a seconds value must be divided by **86,400** and the measure formatted as `mm:ss` (or `[h]:mm:ss` in Excel to allow >24h):

```DAX
AHT (Time) := DIVIDE( [AHT Seconds], 86400 )   -- format string: mm:ss
```

If AHT shows ~12:00 when reality is ~01:32, it's almost never formatting — it's **leg-grain inflation**: `SUM(Duration)` sums every segment/leg while `[Handled Calls]` is a distinct count of CallID, so the numerator is inflated against a correct denominator. Sanity math: 309 calls × 92s ≈ 28,428 handle-seconds (~7.9h); if handle-seconds are far higher, extra legs are being summed.

**Aggregate per CallID first, then average across calls** so a transferred call with 3 legs isn't tripled:

```DAX
AHT Seconds :=
VAR EmpCalls =
    CALCULATETABLE( VALUES(FactCallLegs[CallID]), FactCallLegs[IsEmployeeLeg] = 1 )
RETURN
AVERAGEX(
    EmpCalls,
    CALCULATE( SUM(FactCallLegs[Duration Seconds]), FactCallLegs[IsEmployeeLeg] = 1 )
)
```

**Keep numerator and denominator on the same call set / same leg logic.** Filtering the count on a legs-table column (`CALCULATE(DISTINCTCOUNT(FactCalls[CallID]), FactCallLegs[IsEmployeeLeg]=1)`) while duration sums a different set is exactly what blows AHT up. When duration lives on the legs table, do **everything on the legs table** and don't drag `FactCalls` in.

**`TREATAS` for a call-set filter** — required because you can't use a measure or table-returning placeholder directly as a `CALCULATE` filter (error: *"...used in a True/False expression that is used as a table filter"*). Keep the set as a VAR:

```DAX
Agent Handled Calls :=
VAR EmpCalls =
    CALCULATETABLE( VALUES(FactCallLegs[CallID]), FactCallLegs[IsEmployeeLeg] = 1 )
RETURN
CALCULATE( DISTINCTCOUNT(FactCalls[CallID]), TREATAS(EmpCalls, FactCalls[CallID]) )
```

**Always `DIVIDE()`**, never `/` — handles divide-by-zero and filter context cleanly.

**Keep measures as pure definitions** (see layer rule below). DRR should read like its definition, not rescue the data:

```DAX
Resolved Calls = COUNTROWS(FILTER(Calls, Calls[Resolved] = "Yes"))
Handled Calls  = COUNTROWS(FILTER(Calls, Calls[Handled] = "Yes"))
DRR            = DIVIDE([Resolved Calls], [Handled Calls])
```

Hardcoded `"Yes"`/`1`/`"Resolved"` **is fine** when it's the actual business definition. Hardcoded `Queue <> "Test"`, `Agent <> ""`, or `Date >= DATE(2024,1,1)` is cleanup/governance logic leaking into the metric — move it upstream.

**Bridge legs correctly.** Never relate `FactCallLegs` directly to `Tickets` — one call has many legs, so ticket counts multiply during transfers. Chain it: `Tickets ↔ FactCalls ↔ FactCallLegs`. For PBX-to-TDX reconciliation, build an explicit bridge (`CallID | TicketID | MatchType` — ANI+Time / Manual / No Ticket) rather than a direct many-to-many.

---

## Layer separation ("duct tape" = logic in the wrong layer)

The recurring architecture rule. When responsibilities blur, fragility appears.

| Layer | Should handle |
|---|---|
| Source | raw truth |
| Power Query / Dataflow | cleaning, shaping |
| Model | relationships |
| Measures | business logic |
| Visuals | presentation |

Duct-tape smells: macros that break when a column moves, measures doing cleanup + definition + time-scoping at once, "magic" visual-level filters no one can explain, the same exclusion copy-pasted across six measures, bi-directional filters added "because it fixed it." Fix = clean upstream, model as a star, keep measures simple.

---

## Excel styled like Power BI (Power Pivot + CUBEVALUE)

When a workbook has to exist for distribution but should behave like BI:

- **Import BI tables → build star relationships in Power Pivot → all KPIs become DAX measures.** Once relational, row-level worksheet formulas break; aggregations must respect filter context. `#REF!` in a KPI grid means cells still point at old manual-upload ranges — repoint them at measures.
- **Three-layer split:** Dashboard sheet = design layer, hidden `_Model` / `_KPI` sheet = data-binding layer, Power Pivot = calculation engine. No ratio math or scattered cube formulas in the dashboard.
- **Drive cards from the model with CUBEVALUE**, stored on the hidden sheet:
  ```
  =CUBEVALUE("ThisWorkbookDataModel","[Measures].[Total Calls]")
  ```
  Then link a shape/text box to that cell with `=_KPI!B2`. The card is pure display; the model is the engine. For long date series use a pivot (`pvtTrend`) instead — CUBE formulas over date ranges are painful.
- **One dashboard + a period slicer** (Today / WTD / MTD) beats three duplicated Daily/Weekly/Monthly tables. `DATESINPERIOD(DimDate[Date], TODAY(), -7, DAY)`, `DATESMTD(...)`, `DimDate[Date] = TODAY()` drive the period measures.
- **`######` on a time cell** = column too narrow or the measure isn't returning seconds/86400 with a `[h]:mm:ss` format.

**Cross-tool design transfer:** Excel shapes, text boxes, cube formulas, and formatting do **not** copy into Power BI — only the *layout blueprint* transfers (grid, spacing, palette, font hierarchy, KPI order). The one asset that does move: design a static background (cards, section dividers, header bar — no numbers) in PowerPoint, export at the exact Power BI canvas pixel size (e.g. 1280×720), set it as **Canvas background → Fit → 0% transparency**, then float borderless card visuals on top. That's how the modern look is faked in both tools.

---

## Ingestion: VBA macro vs Power Automate / Office Scripts / PQ / Fabric

Decision order, most-correct first for emailed Excel/CSV reports:

1. **Power Query / Dataflow Gen2 does the shaping.** Delete junk rows, promote headers, set types, append folder files, add metadata — this is ETL and belongs in PQ. "If the report can be read by Power Query at all, do the work in PQ."
2. **Power Automate is the mailroom only** — Outlook trigger → save attachment **unchanged** to a raw SharePoint landing folder. No transformation logic in the mail flow.
3. **Office Scripts (TypeScript) only for workbook-object manipulation** that must happen *before* ingestion. They *do* run fully unattended via Power Automate → Excel Online (Business) → **Run script** (headless, server-side, no machine/session), which is the cloud replacement for VBA — but they are not the right home for ETL.
4. **Fabric orchestrates.** Pipeline schedules → Dataflow Gen2 reads the SharePoint folder (**note: SharePoint Folder connector works in Dataflow Gen2, not directly in Fabric pipelines**) → writes to a Lakehouse table (**Append** for historical fact accumulation, **Replace** for full snapshots) → semantic model refresh downstream. Bronze (raw folder) / Silver (curated table) / Gold (semantic model).

**VBA cannot run in a Power Automate cloud flow.** Keeping the exact macro means Power Automate Desktop opening Excel + Run macro — machine/session dependent, not truly unattended. Derive `LoadID` in the curated layer from filename / modified-time, not by stamping the workbook.

**The standardized Fact ingestion macro** (the durable manual-step pattern used for the weekly pull — one per report type: FactCallLegs, FactCalls, FactCRM→FactNotes, etc.):

1. Set the source sheet (`Set ws = Sheets("notes_report")`), delete any junk `Contents` sheet.
2. Find last row/col safely with `Cells.Find(..., SearchDirection:=xlPrevious)`.
3. Add a **LoadID** column stamped `Format(Now, "yyyymmdd_hhnnss")` — batch identifier for every row in the file.
4. Delete any existing table of that name, then `ListObjects.Add` and rename to the Fact name.
5. `SaveAs` to the SharePoint raw-uploads folder, date-stamped:
   `.../PowerBIData/01_Fact_RawUploads/<FactName>/<FactName>_YYYYMMDD.xlsx`
6. Delete the original download from `Downloads` via `Scripting.FileSystemObject`.

Naming choice: `Format(Date, "yyyymmdd")` = one date-stamped file per pull, reruns overwrite (correct for weekly imports / "latest snapshot" ingestion). `Format(Now, "yyyymmdd_hhnnss")` = every run preserved for history. Wrap with `Application.DisplayAlerts = False` / `ScreenUpdating = False` (reset at end) to kill SaveAs popups and make it feel instant. To modernize a macro to a new source system, only three things usually change: source **sheet name**, downloaded **file name**, and the output **table/folder name** — the transform skeleton is stable.

---

## PBIX documentation template (Markdown handoff)

Every published/handoff PBIX gets a README so a "non-official" dashboard reads like it came from a data team. Durable section list to reuse:

- **Report Name / Owner / Last Updated**
- **Purpose** and **Audience**
- **Key Business Questions**
- **Data Sources** table — Source | Type | Owner | Refresh Method | Notes (call out manual exports, and gaps like TDX not consistently storing ANI which limits joins)
- **Data Refresh Process** — numbered export/macro/refresh/validate/publish steps + **Refresh Frequency** + **Known Limitations**
- **Data Model Overview** — fact tables, dimension tables, relationships, modeling notes (semi-star, missing shared keys, ANI-as-future-bridge)
- **Key Measures** table — Measure | Definition | Business Meaning
- **Strategic Metric (In Progress)** — e.g. DRR, with definition/purpose/status
- **Filters & Slicers**, **Report Pages**, **Definitions**
- **Security & Access** (intended RLS model vs current state), **Privacy / Data Handling** (PII, "not institutional official reporting")
- **Validation Checks** (compare totals to source exports, validate date ranges, spot-check distributions)
- **Known Issues**, **Change Log**, **Support**, **Publishing Notes**, **Future Enhancements**

---

## Weekly recap automation

The Contact Center weekly recap is a self-running distribution pipeline, not a written email:

- **Report page filtered to a rolling window** (`Today() - 6` through today) so no dates are ever hardcoded and no weekly report is duplicated — the window rolls forward automatically.
- **Runs Saturday** (closed day): clean weekly cutoff, no partial in-day metrics, ready before Monday ramp-up.
- **Only manual step:** Friday-after-close, export ~6 reports (adjust filters per report), run the ingestion macro (clean → save to shared SharePoint location → delete local original), close. Six locked source systems with no API — this is an acceptable **data-steward checkpoint**, not a failure to automate.
- Dataset refreshes daily at a set time → **Power BI generates the emails** → a **Power Automate flow matches on report-name convention** and fans out to the person channel, the team channel, and a **locked private archival channel** (immutable-ish history / recovery source). Standardized naming → conditional routing scales far better than per-report flows.
- **Known clean failure mode:** if imports are skipped, visuals render but the rolling date window has no rows (empty dashboard) — the model is intact, the window is just starved. Mitigation worth adding: a **Data Freshness card** ("Last Successful Import: …" with 🟢 Current / 🟡 Partial / 🔴 Awaiting Import).

---

## Workforce metrics automation (expected-hours model)

Migrating hours-based team metrics from a spreadsheet where a manager manually edits "worked hours" 40→32. **Stop editing worked hours; calculate them.**

Separate the concerns into three tables so nothing is manually overwritten:

| Table | Purpose |
|---|---|
| `AcademicWeekMapping` (DimDate) | date → academic week / fiscal / term / holiday |
| `FactExpectedHours` (or `EmployeeSchedule` + `WorkforceExceptions`) | person/date → expected hours |
| `DimMetricTargets` | term / team / role → target per 40 hours |

Expected hours = scheduled − approved exceptions. Target rate is **term-aware** (e.g. 125 connections/40h in Fall, 95 in Summer), so pull it from the targets table:

```DAX
Expected Connections =
VAR HoursWorked = SUM( FactExpectedHours[ExpectedHours] )
VAR TargetPer40  = MAX( DimMetricTargets[TargetPer40Hours] )
RETURN DIVIDE( HoursWorked, 40 ) * TargetPer40

Connection Attainment % = DIVIDE( [Actual Connections], [Expected Connections] )
```

Operational plumbing: **Power App form → SharePoint Lists → Power Automate → calendars + BI** (not Excel — Lists give concurrency safety, item IDs, audit fields, clean BI ingestion). One approval writes an exception row plus the calendar events (requester OOO, manager Free, channel visibility); still surface it through the Teams **Approvals app** via "Start and wait for an approval." Join requests to the existing nightly `DimEmployees` on **UPN**, and snapshot `TeamAtRequest` / `RoleAtRequest` at approval time so historical org views survive people moving teams. Add a `HoursType` dimension (Scheduled / Productive / Available / PTO / Training / Meeting / Coaching) so PTO can reduce a productivity expectation without touching a QA expectation.

---

## Related
- [[Power Platform]]
- [[Contact Center]]
- [[Online Success Coaching]]
