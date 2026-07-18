---
type: reference
project: SLCC
date: 2026-07-13
tags: [slcc, contact-center, power-platform, reporting, archive]
---

# Measure Archive — Contact Center model cleanup 2026-07-13

Sixteen measures removed from the Contact Center model (dataset feeds only its own report; verified zero visual, filter, dynamic-text, or live dependency references). Full DAX preserved here for two-minute resurrection. Note: ASA/AHT figures on the report come from implicit column sums in a matrix, not these measures — these were the refined versions (employee-leg filtered, per-call MIN ring). If precise versions are ever needed again, start here.

## Handle time / ASA family

### FactCalls[Agent Handle Seconds]  `fmt: 0`

```dax
CALCULATE(
    SUM(FactCallLegs[LegDurationSecond]),
    FactCallLegs[IsEmployeeLeg] = 1
)
```

### FactCalls[Agent Handled Calls]  `fmt: 0`

```dax
CALCULATE(
    DISTINCTCOUNT(FactCalls[CallID]),
    FactCallLegs[IsEmployeeLeg] = 1
)
```

### FactCalls[ACH Seconds]  `fmt: 0`

```dax
DIVIDE([Agent Handle Seconds], [Agent Handled Calls])
```

### FactCalls[ACH (mm:ss)]

```dax
VAR s = [ACH Seconds]
RETURN FORMAT( s / 86400, "mm:ss" )
```

### FactCalls[Agent Hold Seconds]  `fmt: 0`

```dax
CALCULATE(
    SUM(FactCallLegs[HoldSeconds]),
    FactCallLegs[IsEmployeeLeg] = 1
)
```

### FactCalls[Avg Hold Seconds]  `fmt: 0`

```dax
DIVIDE([Agent Hold Seconds], [Agent Handled Calls])
```

### FactCalls[Avg Hold (mm:ss)]

```dax
VAR s = [Avg Hold Seconds]
RETURN FORMAT( s / 86400, "mm:ss" )
```

### FactCalls[ASA Seconds]

```dax
VAR CallsToInclude =
    CALCULATETABLE(
        VALUES(FactCalls[CallID]),
        FactCalls[HasEmployeeLeg] = 1,
        FactCalls[Abandoned] = 0,
        FactCalls[Missed] = 0
    )
VAR PerCallRing =
    ADDCOLUMNS(
        CallsToInclude,
        "CallRingSec",
            CALCULATE(
                MIN(FactCallLegs[RingSeconds]),
                FactCallLegs[IsEmployeeLeg] = 1
            )
    )
RETURN
AVERAGEX(
    FILTER(PerCallRing, NOT ISBLANK([CallRingSec])),
    [CallRingSec]
)
```

## Week-over-week family

### DimDate[Selected Week Start]  `fmt: General Date`

```dax
SELECTEDVALUE(DimDate[Week Start])
```

### ReportMeasures[Total Calls LW]  `fmt: 0`

```dax
VAR ws = [Selected Week Start]
RETURN
CALCULATE(
    [Total Calls],
    REMOVEFILTERS(DimDate[Week Start]),
    DimDate[Week Start] = ws - 7
)
```

### ReportMeasures[Total Calls WoW %]

```dax
VAR ws = SELECTEDVALUE(DimDate[Week Start])
VAR lw =
    CALCULATE(
        [Total Calls],
        REMOVEFILTERS(DimDate[Week Start]),
        DimDate[Week Start] = ws - 7
    )
VAR pct = DIVIDE([Total Calls] - lw, lw)
RETURN
IF(
    ISBLANK(lw),
    BLANK(),
    SWITCH(
        TRUE(),
        pct > 0, "▲ " & FORMAT(pct, "0.0%"),
        pct < 0, "▼ " & FORMAT(ABS(pct), "0.0%"),
        "0.0%"
    )
)
```

### ReportMeasures[Res WoW %]

```dax
VAR ws = SELECTEDVALUE(DimDate[Week Start])
VAR lw =
    CALCULATE(
        [Resolved Calls],
        REMOVEFILTERS(DimDate[Week Start]),
        DimDate[Week Start] = ws - 7
    )
VAR pct = DIVIDE([Resolved Calls] - lw, lw)
RETURN
IF(
    ISBLANK(lw),
    BLANK(),
    SWITCH(
        TRUE(),
        pct > 0, "▲ " & FORMAT(pct, "0.0%"),
        pct < 0, "▼ " & FORMAT(ABS(pct), "0.0%"),
        "0.0%"
    )
)
```

### ReportMeasures[Tran WoW %]

```dax
VAR ws = SELECTEDVALUE(DimDate[Week Start])
VAR lw =
    CALCULATE(
        [Transfer Calls],
        REMOVEFILTERS(DimDate[Week Start]),
        DimDate[Week Start] = ws - 7
    )
VAR pct = DIVIDE([Transfer Calls] - lw, lw)
RETURN
IF(
    ISBLANK(lw),
    BLANK(),
    SWITCH(
        TRUE(),
        pct > 0, "▲ " & FORMAT(pct, "0.0%"),
        pct < 0, "▼ " & FORMAT(ABS(pct), "0.0%"),
        "0.0%"
    )
)
```

## UTC-drift relic

### FactCalls[Is Last Full Week]  `fmt: 0`

```dax
VAR ThisWeekStart = TODAY() - WEEKDAY(TODAY(),2) + 1
VAR LastWeekStart = ThisWeekStart - 7
VAR RowWeekStart = MAX(DimDate[Week Start])
RETURN IF(RowWeekStart = LastWeekStart, 1, 0)
```

## Superseded by term tiles

### FactNotes[RPT-AvgConnects]

```dax
VAR TotalConnects =
    SUM(FactNotes[IsTextConnect])
    + SUM(FactNotes[IsPhoneConnect])
    + SUM(FactNotes[IsEmailConnect])
        + SUM(FactCases[IsOSCCase])
    + SUM(FactAppointments[IsAppointment])
    - SUM(FactAppointments[WasCancelled])

VAR ActiveEmployees =
    COUNTROWS(
        FILTER(
            VALUES(DimEmployees[FormattedName]),
            CALCULATE(
                SUM(FactNotes[IsTextConnect])
                + SUM(FactNotes[IsPhoneConnect])
                    + SUM(FactCases[IsOSCCase])
                + SUM(FactNotes[IsEmailConnect])
                + SUM(FactAppointments[IsAppointment])
                - SUM(FactAppointments[WasCancelled])
            ) > 0
        )
    )

RETURN
FORMAT(
    DIVIDE(TotalConnects, ActiveEmployees),
    "#,##0"
)
```

### FactNotes[RPT-AvgActivities]

```dax
VAR TotalActivities =
    SUM(FactNotes[IsText])
    + SUM(FactNotes[IsPhoneCall])
    + SUM(FactNotes[IsEmailConnect])
    + SUM(FactCommunications[RecipientCount])
    + SUM(FactCases[IsOSCCase])
    + SUM(FactAppointments[IsAppointment])
    - SUM(FactAppointments[WasCancelled])

VAR ActiveEmployees =
    COUNTROWS(
        FILTER(
            VALUES(DimEmployees[FormattedName]),
            CALCULATE(
                SUM(FactNotes[IsText])
                + SUM(FactNotes[IsPhoneCall])
    + SUM(FactCommunications[RecipientCount])
    + SUM(FactCases[IsOSCCase])
                + SUM(FactNotes[IsEmailConnect])
                + SUM(FactAppointments[IsAppointment])
                - SUM(FactAppointments[WasCancelled])
            ) > 0
        )
    )

RETURN
FORMAT(
    DIVIDE(TotalActivities, ActiveEmployees),
    "#,##0"
)
```

## Related

[[Contact Center Model Review 2026-07-13]]
[[2026-07-13]]
