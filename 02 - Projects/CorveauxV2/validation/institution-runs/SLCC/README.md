---
type: validation
domain: corveaux
status: pending
date: 2026-06-05
tags: [corveaux, slcc, validation, day-30]
---
---
type: validation
domain: corveaux
status: pending
date: 2026-06-05
tags: [corveaux, slcc, validation, day-30]
---

# SLCC Validation Run

**Status:** Pending.

**Target:** Day 30 Gate (~2026-07-05)

## Purpose

SLCC is the Day 30 control case.

Ground truth is known to the builder.

The extraction pipeline must demonstrate that it can convert publicly available institutional information into a canonical institutional model with sufficient accuracy to support generated tenants.

No tenant is built until the validation gate is passed.

---

## Why SLCC

SLCC serves as the initial validation institution because:

- The institution is familiar to the builder
- Ground truth is known
- Expected outputs can be manually verified
- Success and failure can be measured objectively

The goal is not to prove that the pipeline works on SLCC.

The goal is to prove that the extraction architecture is fundamentally sound.

---

## Day 30 Gate Criteria

### Accuracy

- [ ] Greater than 90% accuracy on material facts

### Citations

- [ ] Source citations present on all extracted facts

### Hallucination Prevention

- [ ] No hallucinated entities
- [ ] No hallucinated relationships
- [ ] No hallucinated programs
- [ ] No hallucinated departments

### Confidence Calibration

- [ ] High confidence consistently corresponds to high accuracy
- [ ] Low confidence consistently identifies uncertain extractions

### Canonical Model Quality

- [ ] Extracted primitives successfully map into the institutional model
- [ ] Relationships are preserved
- [ ] Temporal information is preserved where available

---

## What Counts as a Material Fact

### Academic Programs

- Program name
- Degree type
- Certificate type
- CIP code
- Program description

### Program Requirements

- Credit hours
- Required courses
- Elective requirements
- Graduation requirements

### Courses

- Course code
- Course name
- Credit hours
- Course description
- Prerequisites
- Corequisites

### Departments

- Department name
- Department contact information
- Department location
- Department website

### Services

- Service name
- Contact information
- Hours
- Eligibility requirements

---

## Validation Methodology

### Ground Truth Comparison

Extracted facts are compared against known institutional reality.

### Citation Verification

Every extracted fact must be traceable to a source URL.

Rule:

> No citation = no fact.

### Hallucination Review

Random samples should be reviewed for:

- Invented entities
- Invented relationships
- Invented requirements
- Invented contacts

### Confidence Calibration Review

Compare confidence scores against actual correctness.

Questions:

- Does 95% confidence usually indicate correctness?
- Does 60% confidence usually indicate uncertainty?
- Are confidence scores meaningful?

---

## Validation Deliverables

Before the Day 30 gate is considered complete:

- [ ] Extraction run completed
- [ ] Accuracy report completed
- [ ] Citation audit completed
- [ ] Hallucination audit completed
- [ ] Confidence calibration review completed
- [ ] Findings documented

---

## Failure Conditions

The validation run fails if:

- Accuracy falls below 90%
- Citations are missing
- Hallucinations are detected
- Confidence scores are unreliable
- Canonical primitives cannot be consistently generated

If the gate fails:

- Improve extraction architecture
- Re-run validation
- Do not proceed to generated tenant construction

---

## Run History

### Run 001

Status: Not started

Results:

- Accuracy: TBD
- Citations: TBD
- Hallucinations: TBD
- Confidence Calibration: TBD

Notes:

TBD

---

## Success Criteria

The validation effort is complete when:

- The extraction pipeline consistently exceeds 90% accuracy
- Every extracted fact retains provenance
- Hallucinations are effectively eliminated
- Confidence scores are meaningful
- The institutional model can be generated reliably

Only then may generated tenant work begin.

---

## Related

- [[ADR-001 — Entry Wedge Selection]]
- [[extraction-pipeline-spec]]