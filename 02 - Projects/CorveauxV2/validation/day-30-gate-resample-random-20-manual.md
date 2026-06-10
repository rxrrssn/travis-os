---
type: validation
domain: extraction
status: complete — gate closed
date: 2026-06-07
tags: [day-30-gate, resample, slcc, manual-review, session-17]
---

# Day 30 Gate — Random 20 Manual Review

For your own independent scoring, separate from the assistant's self-check ([[day-30-gate-resample-findings]]).

**How to use this file:** for each entity below, open `Live Page` in a browser, compare every field under `Stored Attributes` against what the live catalog page actually says, and mark each fact PASS / PARTIAL / FAIL in the scoring table beneath it. Add notes for anything questionable — especially anything that feels like a different entity than the one named, or a unit/number that looks off. Nothing here has been pre-scored or annotated by the assistant.

This is a **fresh random sample** (10 courses + 10 programs) drawn independently from the same promoted entity set gate Run 002 produced — not the same 40 entities the self-check scored, so this serves as an independent cross-section rather than a re-check of the same data.

---

## Courses (10)

### 1. CPA 2420 — Carpentry Completion

- **Canonical key**: `course:cpa-2420`
- **Live page**: https://catalog.slcc.edu/preview_course_nopop.php?catoid=28&coid=107629
- **Stored attributes**:
  - `title`: Carpentry Completion
  - `credits`: 5
  - `description`: "Advanced application of transits and leveling instruments. Scheduling and estimating costs, MSDS sheets, concrete testing, leadership skills and computer usage."
  - `subjectCode`: CPA 2420

| Fact        | Score (P/Pa/F) | Notes |
| ----------- | -------------- | ----- |
| title       | P              |       |
| credits     | P              |       |
| description | P              |       |
| subjectCode | P              |       |

### 2. PFA 2161 — Pipe Bending

- **Canonical key**: `course:pfa-2161`
- **Live page**: https://catalog.slcc.edu/preview_course_nopop.php?catoid=28&coid=108899
- **Stored attributes**:
  - `title`: Pipe Bending
  - `credits`: 2
  - `courseFee`: $5.00
  - `description`: "Theory and application of practical pipe bending and methods utilized in the industry."
  - `subjectCode`: PFA
  - `courseNumber`: 2161

| Fact                       | Score (P/Pa/F) | Notes                                                                                                                         |
| -------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| title                      | p              |                                                                                                                               |
| credits                    | p              |                                                                                                                               |
| courseFee                  | p              |                                                                                                                               |
| description                | p              |                                                                                                                               |
| subjectCode / courseNumber | p              | if we are going to separate subject code and course number it needs to be consistent across ALL courses.  (See above example) |

### 3. CJ 2470 — Introduction to Criminology

- **Canonical key**: `course:cj-2470`
- **Live page**: https://catalog.slcc.edu/preview_course_nopop.php?catoid=28&coid=107569
- **Stored attributes**:
  - `credits`: 3
  - `subjectCode`: CJ
  - `courseNumber`: 2470
  - `semestersOffered`: All

| Fact                       | Score (P/Pa/F) | Notes                       |
| -------------------------- | -------------- | --------------------------- |
| credits                    | P              |                             |
| subjectCode / courseNumber | P              | Missing Course Description. |
| semestersOffered           | P              |                             |

### 4. DST 1265 — Drivetrains Gear Drives

- **Canonical key**: `course:dst-1265`
- **Live page**: https://catalog.slcc.edu/preview_course_nopop.php?catoid=28&coid=107748
- **Stored attributes**:
  - `credits`: 4
  - `courseFee`: $112.00
  - `description`: "Classroom instruction and practical laboratory experience in clutch operation and adjusting of manual transmissions. Other topics to be covered include: twin countershaft transmissions both manual and automated, differential theory/operation and final drives. We will also cover track type undercarriages."
  - `semestersOffered`: [Spring]

| Fact             | Score (P/Pa/F) | Notes                                          |
| ---------------- | -------------- | ---------------------------------------------- |
| credits          | P              |                                                |
| courseFee        | P              |                                                |
| description      | P              | Missing pre-requisites TEDT 1100 and TEDT 1250 |
| semestersOffered | P              |                                                |

### 5. MSE 1820 — Fundamentals of Microscopy

- **Canonical key**: `course:mse-1820`
- **Live page**: https://catalog.slcc.edu/preview_course_nopop.php?catoid=28&coid=109485
- **Stored attributes**:
  - `title`: Fundamentals of Microscopy
  - `credits`: 2
  - `description`: "This course introduces students to the use of optical microscopes in scientific applications. Includes both theory and practical applications."
  - `subjectCode` / `courseNumber`: MSE 1820
  - `prerequisite`: "MATH 1050 w/C grade or better or appropriate placement score"
  - `semestersOffered`: [Spring]

| Fact             | Score (P/Pa/F) | Notes                                                                                                                                       |
| ---------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| title            | P              |                                                                                                                                             |
| credits          | P              |                                                                                                                                             |
| description      | P              |                                                                                                                                             |
| prerequisite     | P              | WE MAY NEED TO ADD THIS TO THE BACKLOG - MAYBE A MODIFIER ON THE RELATIONSHIP. EX: prerequisite: "course:math-1050" "C- or higher required" |
| semestersOffered | P              |                                                                                                                                             |

### 6. SLSS 990 — Effective Study Skills

- **Canonical key**: `course:slss-990`
- **Live page**: https://catalog.slcc.edu/preview_course_nopop.php?catoid=28&coid=109994
- **Stored attributes**:
  - `title`: Effective Study Skills
  - `credits`: 3
  - `description`: "This course emphasizes the development of effective, broad-based study strategies. The course covers learning preferences, anxiety and stress management, resource management, note-taking, motivation, time management, information gathering & processing, reading & writing strategies, and test-taking."
  - `subjectCode` / `courseNumber`: SLSS 990
  - `semestersOffered`: All

| Fact             | Score (P/Pa/F) | Notes |
| ---------------- | -------------- | ----- |
| title            | P              |       |
| credits          | P              |       |
| description      | P              |       |
| semestersOffered | P              |       |

### 7. TEEA 1172 — IPC-A-610G IPC Certified IPC Specialist - CIS

- **Canonical key**: `course:teea-1172`
- **Live page**: https://catalog.slcc.edu/preview_course_nopop.php?catoid=28&coid=108372
- **Stored attributes**:
  - `credits`: 2
  - `courseFee`: $75.00
  - `description`: "Designed and certified by IPC. Enables students to make correct accept or reject decisions for appropriate classes of electronic assemblies. Certification earned through examination."
  - `semestersOffered`: All

| Fact             | Score (P/Pa/F) | Notes |
| ---------------- | -------------- | ----- |
| credits          | P              |       |
| courseFee        | P              |       |
| description      | P              |       |
| semestersOffered | P              |       |

### 8. PTA 2350 — Data Collection for the PTA

- **Canonical key**: `course:pta-2350`
- **Live page**: https://catalog.slcc.edu/preview_course_nopop.php?catoid=28&coid=109038
- **Stored attributes**:
  - `title`: Data Collection for the PTA
  - `credits`: 2
  - `corequisite`: PTA 2360
  - `subjectCode` / `courseNumber`: PTA 2350
  - `semestersOffered`: [Spring]

| Fact             | Score (P/Pa/F) | Notes                                                                                   |
| ---------------- | -------------- | --------------------------------------------------------------------------------------- |
| title            | P              |                                                                                         |
| credits          | P              |                                                                                         |
| corequisite      | Pa             | Should be relational, right? Might actually be a pass depending on how that's rendered. |
| semestersOffered | P              |                                                                                         |

### 9. AMFG 2320 — Carpentry and Fabrication

- **Canonical key**: `course:amfg-2320`
- **Live page**: https://catalog.slcc.edu/preview_course_nopop.php?catoid=28&coid=109846
- **Stored attributes**:
  - `title`: Carpentry and Fabrication
  - `credits`: 4
  - `description`: "This course will teach students more advanced carpentry and woodworking skills to include, material-specific hardware, common joinery methods and cut-listing, cut-out and assembly techniques, precision alignment and leveling of panels and moving assemblies, composites cutting and drilling, and finishing techniques."
  - `subjectCode` / `courseNumber`: AMFG 2320
  - `semestersOffered`: All

| Fact             | Score (P/Pa/F) | Notes                |
| ---------------- | -------------- | -------------------- |
| title            | P              |                      |
| credits          | P              |                      |
| description      | P              | missing prerequisite |
| semestersOffered | P              |                      |

### 10. TEEM 1202 — Advanced Emergency Medical Technicians

- **Canonical key**: `course:teem-1202`
- **Live page**: https://catalog.slcc.edu/preview_course_nopop.php?catoid=28&coid=111337
- **Stored attributes**:
  - `title`: Advanced Emergency Medical Technicians
  - `credits`: 6
  - `description`: "Advanced Emergency Medical Technicians provide basic and limited advanced emergency medical care and transportation for critical and emergent patients who access the emergency medical system (EMS). Advanced Emergency Medical Technicians (AEMTs) possess the basic knowledge and skills necessary to provide patient care and transportation. Advanced Emergency Medical Technicians function as part of a comprehensive EMS response, under medical oversight. Advanced Emergency Medical Technicians perform interventions with the basic and advanced equipment typically found on an ambulance. The Advanced Emergency Medical Technician is a link from the scene to the emergency health care system."
  - `subjectCode` / `courseNumber`: TEEM 1202
  - `semestersOffered`: All

| Fact             | Score (P/Pa/F) | Notes                 |
| ---------------- | -------------- | --------------------- |
| title            | P              |                       |
| credits          | P              |                       |
| description      | P              | MISSING PREREQUISITES |
| semestersOffered | P              |                       |

---

## Programs (10)

### 11. Economics: AS

- **Canonical key**: `program:economics-as`
- **Live page**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12565&returnto=9720
- **Stored attributes**:
  - `locations`: [Taylorsville Redwood Campus, Herriman Campus]
  - `credentialType`: Associate of Science
  - `minimumCredits`: 60
  - `timeToCompletionSemesters`: 4

| Fact                      | Score (P/Pa/F) | Notes |
| ------------------------- | -------------- | ----- |
| locations                 | P              |       |
| credentialType            | P              |       |
| minimumCredits            | P              |       |
| timeToCompletionSemesters | P              |       |

### 12. General Studies: AS

- **Canonical key**: `program:general-studies-as`
- **Live page**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12611
- **Stored attributes**:
  - `locations`: [Taylorsville Redwood Campus, South City Campus, Jordan Campus, SLCC Online, Herriman Campus]
  - `minimum_gpa`: 2
  - `credit_hours`: 60
  - `credentialType`: Associate of Science
  - `recommended_gpa`: 2.5

| Fact            | Score (P/Pa/F) | Notes |
| --------------- | -------------- | ----- |
| locations       | P              |       |
| minimum_gpa     | P              |       |
| credit_hours    | P              |       |
| credentialType  | P              |       |
| recommended_gpa | P              |       |

### 13. Apprenticeship Plumber Independent Technology: AAS (CTE)

- **Canonical key**: `program:apprenticeship-plumber-independent-technology-aas`
- **Live page**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12501&returnto=9720
- **Stored attributes**:
  - `locations`: [Taylorsville Redwood Campus]
  - `credit_hours`: 60
  - `credentialType`: Associate of Applied Science
  - `delivery_modes`: [days, evenings, Saturdays]

| Fact           | Score (P/Pa/F) | Notes                  |
| -------------- | -------------- | ---------------------- |
| locations      | P              |                        |
| credit_hours   | P              |                        |
| credentialType | P              | MISSING PREPREQUISITES |
| delivery_modes | P              |                        |

### 14. Humanities: AS

- **Canonical key**: `program:humanities-associate-of-science`
- **Live page**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12779&returnto=9720
- **Stored attributes**:
  - `locations`: [Taylorsville Redwood Campus, South City Campus, SLCC Online]
  - `creditHours`: 60
  - `credentialType`: Associate of Science
  - `creditsPerSemester`: "15-16"
  - `timeToCompletionSemesters`: "4 Semesters (full-time)"

| Fact                      | Score (P/Pa/F) | Notes                                                                         |
| ------------------------- | -------------- | ----------------------------------------------------------------------------- |
| locations                 | P              |                                                                               |
| creditHours               | P              |                                                                               |
| credentialType            | P              |                                                                               |
| creditsPerSemester        | P              | NOT REALLY AN IMPORTANT FACT, BUT IS USED TO CALCULATE THE TIME TO COMPLETION |
| timeToCompletionSemesters | P              |                                                                               |

### 15. Breadth Areas

- **Canonical key**: `program:breadth-areas`
- **Live page**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12721
- **Stored attributes**:
  - `institution`: Salt Lake Community College

| Fact                                                                                                            | Score (P/Pa/F) | Notes                                    |
| --------------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------------- |
| institution                                                                                                     | P              |                                          |
| **Is "Breadth Areas" actually a `program` entity, or something else (e.g. a curriculum-requirement category)?** | P              | Breadth Area is a curriculum requirement |

### 16. Social & Behavioral Sciences: AA

- **Canonical key**: `program:social-and-behavioral-sciences-aa`
- **Live page**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12787&returnto=9720
- **Stored attributes**:
  - `locations`: [Taylorsville Redwood Campus]
  - `totalCredits`: 60
  - `credentialType`: Associate of Arts
  - `estimated_completion_semesters`: 4

| Fact                           | Score (P/Pa/F) | Notes |
| ------------------------------ | -------------- | ----- |
| locations                      | p              |       |
| totalCredits                   | p              |       |
| credentialType                 | p              |       |
| estimated_completion_semesters | p              |       |

### 17. Family and Human Studies: Academic Certificate (CTE)

- **Canonical key**: `program:family-and-human-studies-academic-certificate-cte`
- **Live page**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12598&returnto=9720
- **Stored attributes**:
  - `locations`: [Taylorsville Redwood Campus, SLCC Online, Herriman Campus]
  - `institution`: Salt Lake Community College
  - `credentialType`: Academic Certificate
  - `minimumCredits`: 36
  - `timeToCompletionSemesters`: "four semesters (part-time)"

| Fact                      | Score (P/Pa/F) | Notes |
| ------------------------- | -------------- | ----- |
| locations                 | p              |       |
| credentialType            | p              |       |
| minimumCredits            | p              |       |
| timeToCompletionSemesters | p              |       |

### 18. Networking and Cybersecurity: Technical Certificate (SL Tech)

- **Canonical key**: `program:networking-and-cybersecurity-technical-certificate`
- **Live page**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=13768&returnto=9720
- **Stored attributes**:
  - `locations`: [Taylorsville Redwood Campus]
  - `certificateType`: Technical Certificate
  - `creditsRequired`: 30
  - `electiveCredits`: 9
  - `requiredCredits`: 21
  - `timeToCompletionSemesters`: "3 semesters (full-time)"

| Fact                                                                                   | Score (P/Pa/F) | Notes |
| -------------------------------------------------------------------------------------- | -------------- | ----- |
| locations                                                                              | p              |       |
| certificateType                                                                        | p              |       |
| creditsRequired / electiveCredits / requiredCredits (do they sum correctly — 21+9=30?) | p              |       |
| timeToCompletionSemesters                                                              | p              |       |

### 19. Commercial Music: AAS (CTE)

- **Canonical key**: `program:commercial-music-aas-cte`
- **Live page**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Stored attributes**:
  - `emphases`: [recording technology, composition/songwriting, performance]
  - `location`: South City Campus
  - `totalCredits`: "65-69"
  - `credentialType`: Associate of Applied Science
  - `timeToCompletionSemesters`: "4 semesters"

| Fact                      | Score (P/Pa/F) | Notes |
| ------------------------- | -------------- | ----- |
| emphases                  | p              |       |
| location                  | p              |       |
| totalCredits              | p              |       |
| credentialType            | p              |       |
| timeToCompletionSemesters | p              |       |

### 20. Construction Management: AS

- **Canonical key**: `program:construction-management-associate-of-science`
- **Live page**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720
- **Stored attributes**:
  - `locations`: [Taylorsville Redwood Campus]
  - `credit_hours`: 60
  - `credentialType`: Associate of Science
  - `time_to_completion`: "2 years (full-time)"

| Fact                                                                                                                                                                              | Score (P/Pa/F) | Notes |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ----- |
| locations                                                                                                                                                                         | p              |       |
| credit_hours                                                                                                                                                                      | p              |       |
| credentialType                                                                                                                                                                    | p              |       |
| time_to_completion (note: stored in years here, not semesters — compare against Bug 16 in [[known_bugs]], where a different program mismapped years into a semesters-typed field) | p              |       |

---

## Scoring summary (fill in once done)

| | PASS | PARTIAL | FAIL | Total | Accuracy |
|---|---|---|---|---|---|
| Courses | 40 | 1 | 0 | 41 | 98.8% |
| Programs | 41 | 0 | 0 | 41 | 100% |
| **Combined** | 81 | 1 | 0 | 82 | 99.4% |

`Accuracy = (PASS + 0.5 × PARTIAL) / (Total − CONFLICT)`

**Tally derivation (from the per-entity tables above, scored by the user):**
- Courses: every fact scored P/p (PASS) across all 10 entities except #8 `course:pta-2350` → `corequisite` scored `Pa` (PARTIAL), with the note questioning whether a corequisite should be modeled relationally rather than as a literal attribute. 40 PASS + 1 PARTIAL over 41 reviewed facts → (40 + 0.5)/41 = 98.8%.
- Programs: all 41 reviewed facts across all 10 entities scored P/p (PASS) — zero PARTIAL, zero FAIL → 100%.
- Combined: 81 PASS + 1 PARTIAL over 82 facts → (81 + 0.5)/82 = 99.4%.

**This independent random-20 manual score (99.4%) corroborates the assistant's self-check (96.5%, [[day-30-gate-resample-findings]])** — both comfortably clear the >90% bar, and neither sample surfaced a FAIL on a different 40/41-fact cross-section of the same promoted entity set. The user's review surfaced no new defect classes beyond what the self-check already found (Bugs 15-17 in [[known_bugs]]), but did add useful backlog notes:
- `course:pta-2350` `corequisite` (and similarly `course:mse-1820` `prerequisite`) — flagged as candidates for relational modeling (`requires`/`co-requires` relationships with a modifier, e.g. `"C- or higher required"`) rather than flat string attributes. Generalizes the existing Bug 17 prerequisite-completeness concern: even when captured, prerequisite/corequisite facts may belong in the relationship layer, not `attributes`.
- `program:breadth-areas` — user confirms "Breadth Area is a curriculum requirement," not a standalone program; possible future entity-modeling question (parallel to the Policy-type-soup deferral noted in Bug 12).
- `course:pfa-2161` notes inconsistent `subjectCode`/`courseNumber` splitting vs. combined-string representation across courses — a normalization consistency item, not an accuracy defect.
- `program:construction-management-associate-of-science` stores `time_to_completion: "2 years (full-time)"` (a *different* attribute key than `timeToCompletionSemesters`) — correctly flagged by the user as the same risk class as Bug 16 (years vs. semesters), though here the source phrasing was preserved verbatim rather than mismapped, so it scored PASS as stated. Worth folding into the Bug 16 unit-normalization fix: the prompt instruction should also cover non-`timeToCompletionSemesters` time-description fields so they're normalized consistently.

## Related

- [[day-30-gate-resample-findings]] — the assistant's self-check (different 40-entity sample, full write-up of methodology and 6 defects found)
- [[Corveaux V2 - Session 17 — Day 30 Gate Live Re-Sample]] — session note
- `known_bugs` (memory) — Bugs 15-17, found in the self-check sample
