# SLCC Catalog Extraction Review

_Generated for manual accuracy review. Ground truth: SLCC Academic Catalog 2024–25._

> **Update — Session 17 (2026-06-07):** This file documents an earlier individual catalog run (`16fc7832`, programs-only). The Day 30 gate's formal live re-sample was run against gate **Run 002** (the full topologically-ordered courses→programs→documents run) and scored **96.5% combined material-fact accuracy** (courses 95.2%, programs 97.7%) against ground truth fetched live from `catalog.slcc.edu` — clearing the >90% bar. Full results, methodology, and the 6 defects found: [[day-30-gate-resample-findings]] (validation/) and [[Corveaux V2 - Session 17 — Day 30 Gate Live Re-Sample]] (session note). This file remains useful as a per-entity manual-review artifact for the run it documents, but is no longer the basis for the gate determination.

---

## Run Summary

| Metric | Value |
|---|---|
| Run ID | `16fc7832-8d7f-49e2-8a93-4f322b4b1747` |
| Status | COMPLETED |
| Source | https://catalog.slcc.edu/content.php?catoid=28&navoid=9720 |
| Started | 2026-06-07 00:32:11 |
| Finished | 2026-06-07 00:42:46 |
| Observations written | 864 |
| Promoted | 348 |
| Conflicts | 516 |
| Errors | 99 |
| Avg confidence | 0.9270 |
| Tokens in / out | 115932 / 107802 |
| Estimated cost | $0.6549 |
| Entities created | 104 |

**Entities by type:**

- `committee`: 1
- `course`: 37
- `organization`: 16
- `person`: 1
- `position`: 1
- `program`: 36
- `service`: 12

---

## Programs (36)

_These are the primary Day 30 gate targets. Sample 10–20 for manual verification against catalog._

### Advanced Emergency Medical Technician: Technical Certificate

| Field | Value |
|---|---|
| Canonical key | `program:advanced-emergency-medical-technician-technical-certificate` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12988&returnto=9720 |
| credits | 6 |
| estimatedBooks | $360 |
| estimatedCourseFees | $695 |
| estimatedSupplies | $140 |
| estimatedTuition | variable |
| location | Miller Campus |
| programType | Technical Certificate |
| timeToCompletion | One semester |

<!-- REVIEW: [ x ] correct  [ ] incorrect  Notes: -->

### Advanced Manufacturing: AAS (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:advanced-manufacturing-aas-cte` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12764&returnto=9720 |
| admission_type | selective |
| credits | 62 |
| degree_type | Associate of Applied Science |
| duration_years | 3 |
| location | Westpointe Campus |
| program_model | apprenticeship |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Aerospace/Aviation Technology Maintenance: AAS (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:aerospace-aviation-technology-maintenance-aas` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12482&returnto=9720 |
| class_schedules | ["day","evening"] |
| credits_minimum | 87 |
| degree_type | Associate of Applied Science |
| entry_semesters | ["Fall","Spring"] |
| location | Westpointe Campus |
| time_to_completion_semesters | 5 |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Aircraft Electronics: Academic Certificate (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:aircraft-electronics-academic-certificate-cte` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12727&returnto=9720 |
| certificationFocus | NCATT AET (National Center for Aerospace & Transportation Technologies - Aircraft Electronics Technician) |
| credits | 17 |
| location | Westpointe Campus |
| timeToCompletion | Two semesters (Full-time) |
| type | Academic Certificate |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### American Sign Language: AA

| Field | Value |
|---|---|
| Canonical key | `program:american-sign-language-aa` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12483&returnto=9720 |
| completionSemesters | 4 |
| credits | 60 |
| degreeType | Associate of Arts |
| location | Taylorsville Redwood Campus |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### American Sign Language/English Interpreting: AAS (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:american-sign-language-english-interpreting-aas` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720 |
| credits | 65 |
| cteName | true |
| degreeType | Associate of Applied Science |
| locations | ["Taylorsville Redwood Campus"] |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Apprenticeship Electrical Independent Technology: AAS (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:apprenticeship-electrical-independent-technology-aas` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12495&returnto=9720 |
| credits | 60 |
| cte_designation | true |
| degree_type | Associate of Applied Science |
| locations | ["Taylorsville Redwood Campus"] |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Apprenticeship Facilities Maintenance Technology: AAS (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:apprenticeship-facilities-maintenance-technology-aas` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12496&returnto=9720 |
| completion_time | up to five years depending upon the craft |
| credits_minimum | 63 |
| cte_designation | true |
| degree_type | Associate of Applied Science |
| program_length | three year program requiring 6,000 hours of on-the-job training and 432 clock hours of related instruction |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Apprenticeship Heating, Cooling & Refrigeration (HVAC): AAS (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12497&returnto=9720 |
| certificationEligibility | ["Environmental Protection Agency (EPA)","Rocky Mountain Gas Association (RMGA)","Corrugated Stainless Steel Tubing (CSST)","Hydronics","ICE","North American Technical Excellence (NATE)"] |
| credits | 63 minimum |
| degreeType | Associate of Applied Science |
| duration | four-year program requiring 8,000 hours on-the-job-training and 576 minimum hours related instruction |
| location | Taylorsville Redwood Campus |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Architecture: AS

| Field | Value |
|---|---|
| Canonical key | `program:architecture-associate-of-science` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12506&returnto=9720 |
| credits | 60 |
| degree_type | Associate of Science |
| locations | ["Taylorsville Redwood Campus"] |
| time_to_completion_credits_per_semester | 15 |
| time_to_completion_semesters | 4 |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### ASL/English Interpreting AAS

| Field | Value |
|---|---|
| Canonical key | `program:asl-english-interpreting-aas` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12483&returnto=9720 |
| admissionType | competitive |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Automation Technology: Technical Certificate (SL Tech)(CTE)

| Field | Value |
|---|---|
| Canonical key | `program:automation-technology-technical-certificate` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720 |
| credits | 30 |
| cteDesignation | true |
| duration | Approximately 2 to 3 semesters |
| location | Westpointe Campus |
| programType | Technical Certificate |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Automotive Collision Repair: Academic Certificate (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:automotive-collision-repair-academic-certificate-cte` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12512&returnto=9720 |
| credits_minimum | 32 |
| delivery_mode | Full-time |
| location | Miller Campus |
| start_semester | Fall |
| time_to_completion_semesters | 2 |
| type | Academic Certificate |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Automotive Collision Repair and Refinishing: AAS (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:automotive-collision-repair-and-refinishing-aas-cte` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12509&returnto=9720 |
| credits_minimum | 64 |
| degree_type | Associate of Applied Science |
| duration_semesters | 4 |
| location | Miller Campus |
| program_code | AAS (CTE) |
| start_semester | Fall only |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Behavioral Health Technician: Academic Certificate (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:behavioral-health-technician-academic-certificate` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12788&returnto=9720 |
| credits | 22 |
| duration_semesters | 3 |
| format | Part-time |
| locations | ["Taylorsville Redwood Campus"] |
| type | Academic Certificate |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Biology: AS

| Field | Value |
|---|---|
| Canonical key | `program:biology-associate-of-science` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720 |
| degree_type | Associate of Science |
| emphasis_options | ["Anatomy and Physiology Emphasis","Integrative Biology Emphasis"] |
| locations | ["Taylorsville Redwood Campus"] |
| total_credits | 60 |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Business: AA

| Field | Value |
|---|---|
| Canonical key | `program:business-associate-of-arts` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12520&returnto=9720 |
| credits | 60 |
| degreeType | Associate of Arts |
| locations | ["Taylorsville Redwood Campus","SLCC Online"] |
| school | Gail Miller Business School |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Business: AS

| Field | Value |
|---|---|
| Canonical key | `program:business-associate-of-science` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12521&returnto=9720 |
| credits | 60 |
| degree_type | Associate of Science |
| locations | ["Taylorsville Redwood Campus","SLCC Online","Herriman Campus"] |
| school | Gail Miller Business School |
| time_to_completion_semesters | 4 |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Business Management: AAS (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:business-management-aas-cte` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12703&returnto=9720 |
| credits | 60 |
| degreeType | Associate of Applied Science |
| institution | Salt Lake Community College |
| locations | ["Taylorsville Redwood Campus","SLCC Online"] |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Cabinetmaking and Furniture Construction: Academic Certificate (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:cabinetmaking-and-furniture-construction-academic-certificate-cte` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12556&returnto=9720 |
| completionTime | one year |
| cteMark | true |
| estimatedCost | {"courseFees":"$110","tuitionAndFees":"See http://www.slcc.edu/student/financial/tuition-fees.aspx","studentProjects":"$700","booksAndSupplies":"$500","personalToolsEquipment":"$100-300"} |
| locations | ["Taylorsville Redwood Campus"] |
| minimumCredits | 33 |
| programType | Academic Certificate |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Chemistry: AS

| Field | Value |
|---|---|
| Canonical key | `program:chemistry-associate-of-science` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720 |
| catalog_year | 2026-2027 |
| credits | 60 |
| degree_type | Associate of Science |
| locations | ["Taylorsville Redwood Campus"] |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Commercial Driver's License-Class A: Technical Certificate (SL Tech)

| Field | Value |
|---|---|
| Canonical key | `program:commercial-drivers-license-class-a-technical-certificate` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12654&returnto=9720 |
| certificationType | Technical Certificate |
| credits | 6 |
| duration | One semester |
| location | Westpointe Campus |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Commercial Music: AAS (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:commercial-music-aas-cte` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720 |
| creditHours | 65-69 |
| degreeType | Associate of Applied Science |
| emphases | ["Recording Technology","Composition/Songwriting","Performance"] |
| location | South City Campus |
| programWebsite | true |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Community Health and Leadership: AS

| Field | Value |
|---|---|
| Canonical key | `program:community-health-and-leadership-as` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720 |
| admission_type | open admissions |
| credits_required | 62 |
| degree_type | Associate of Science |
| location | Jordan Campus |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Computer Science: AS

| Field | Value |
|---|---|
| Canonical key | `program:computer-science-as` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720 |
| credit_hours | 60 |
| degree_type | Associate of Science |
| emphasis_areas | ["Computer Science","Data Science","Software Development"] |
| locations | ["Taylorsville Redwood Campus"] |
| time_to_completion_credits_per_semester | 15-16 |
| time_to_completion_semesters | 4 |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Concrete Masonry Apprenticeship: Technical Certificate (SL Tech)(CTE)

| Field | Value |
|---|---|
| Canonical key | `program:concrete-masonry-apprenticeship-technical-certificate` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12776&returnto=9720 |
| credits | 12 |
| cte | true |
| duration | 2 years (four semesters) |
| format | Part-time |
| locations | ["Taylorsville Redwood Campus"] |
| type | Technical Certificate |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Construction Management and Sustainable Building: AAS (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:construction-management-and-sustainable-building-aas-cte` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720 |
| credits_minimum | 64 |
| degree_type | Associate of Applied Science |
| duration_full_time | two years |
| locations | ["Taylorsville Redwood Campus"] |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Construction Management: AS

| Field | Value |
|---|---|
| Canonical key | `program:construction-management-associate-of-science` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720 |
| credits | 60 |
| degreeType | Associate of Science |
| locations | ["Taylorsville Redwood Campus"] |
| transferable | true |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Criminal Justice: AAS (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:criminal-justice-aas-cte` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| catalogYear | 2026-2027 |
| cteDesignation | true |
| degreeType | Associate of Applied Science |
| locations | ["Miller Campus","SLCC Online"] |
| minimumCredits | 63 |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Criminal Justice: AS

| Field | Value |
|---|---|
| Canonical key | `program:criminal-justice-as` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720 |
| catalogYear | 2026-2027 |
| credits | 60 |
| degreeType | Associate of Science |
| locations | ["Miller Campus","SLCC Online"] |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Culinary Arts: AAS (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:culinary-arts-aas-cte` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720 |
| accreditation | American Culinary Federation Foundation Accrediting Commission (ACFFAC) |
| credits | 64 credits minimum |
| degreeType | Associate of Applied Science |
| duration | 5 semesters |
| location | Miller Campus |
| otjRequirement | 250 hours |
| tracks | ["Baking Track","Culinary Track"] |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Cultural Resource Management: Academic Certificate (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:cultural-resource-management-academic-certificate-cte` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12487&returnto=9720 |
| creditMinimum | 21 |
| financialAidEligible | false |
| locations | ["Taylorsville Redwood Campus"] |
| partTime | true |
| programType | Academic Certificate |
| timeToCompletion | 2 to 3 semesters |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Dental Hygiene: AAS (CTE)

| Field | Value |
|---|---|
| Canonical key | `program:dental-hygiene-aas-cte` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720 |
| accreditor | American Dental Association Commission on Dental Accreditation (CODA) |
| credits_minimum | 68 |
| credits_with_selective_admissions | 88 |
| degree_type | Associate of Applied Science |
| location | Jordan Campus |
| time_to_completion | Two academic years (full-time core program) |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Economics: AS

| Field | Value |
|---|---|
| Canonical key | `program:economics-associate-of-science` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12565&returnto=9720 |
| credit_minimum | 60 |
| degree_type | Associate of Science |
| locations | ["Taylorsville Redwood Campus","Herriman Campus"] |
| time_to_completion_semesters | 4 |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Electrical Apprenticeship: Technical Certificate (SL Tech)(CTE)

| Field | Value |
|---|---|
| Canonical key | `program:electrical-apprenticeship-technical-certificate` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12783&returnto=9720 |
| credential_type | Technical Certificate |
| credits | 24 |
| cte | true |
| duration_type | Part-time |
| duration_years | 4 |
| locations | ["Taylorsville Redwood Campus"] |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

### Electrician Apprenticeship Program

| Field | Value |
|---|---|
| Canonical key | `program:electrician-apprenticeship-program` |
| Confidence | 0.850 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12783&returnto=9720 |
| gainful_employment | true |

<!-- REVIEW: [ ] correct  [ ] incorrect  Notes: -->

---

## Committee entities (1)

### Selective Admissions Committee

| Field | Value |
|---|---|
| Canonical key | `committee:selective-admissions-advanced-manufacturing` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12764&returnto=9720 |
| composition | representatives from host company, USHE, and program coordinator |
| program | Advanced Manufacturing: AAS (CTE) |

---

## Course entities (37)

### American Institutions

| Field | Value |
|---|---|
| Canonical key | `course:pols-1100` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720 |
| courseCode | POLS 1100 |
| generalEducationCategory | AI |
| note | Recommended |

### Careers in Criminal Justice, Law, and Society

| Field | Value |
|---|---|
| Canonical key | `course:cj-2540` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Commercial Drivers License – Class A

| Field | Value |
|---|---|
| Canonical key | `course:tecd-1100` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12654&returnto=9720 |
| courseNumber | 1100 |
| credits | 6 |
| subjectCode | TECD |

### Concrete Masonry 1A

| Field | Value |
|---|---|
| Canonical key | `course:tecn-1000` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12776&returnto=9720 |
| courseNumber | 1000 |
| subjectCode | TECN |

### Concrete Masonry 1B

| Field | Value |
|---|---|
| Canonical key | `course:tecn-1100` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12776&returnto=9720 |
| courseNumber | 1100 |
| subjectCode | TECN |

### Concrete Masonry 2A

| Field | Value |
|---|---|
| Canonical key | `course:tecn-1200` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12776&returnto=9720 |
| courseNumber | 1200 |
| subjectCode | TECN |

### Concrete Masonry 2B

| Field | Value |
|---|---|
| Canonical key | `course:tecn-1210` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12776&returnto=9720 |
| courseNumber | 1210 |
| subjectCode | TECN |

### Crime Scene Investigation Techniques

| Field | Value |
|---|---|
| Canonical key | `course:cj-2480` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Criminal Investigations

| Field | Value |
|---|---|
| Canonical key | `course:cj-1340` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Criminal Justice Co-op

| Field | Value |
|---|---|
| Canonical key | `course:cj-2000` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Criminal Justice Supervision

| Field | Value |
|---|---|
| Canonical key | `course:cj-2020` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Criminal Law

| Field | Value |
|---|---|
| Canonical key | `course:cj-1330` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Forensic Photography

| Field | Value |
|---|---|
| Canonical key | `course:cj-2340` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Introduction to Corrections

| Field | Value |
|---|---|
| Canonical key | `course:cj-1300` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Introduction to Criminal Justice

| Field | Value |
|---|---|
| Canonical key | `course:cj-1010` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |
| generalEducationDesignation | SS |

### Introduction to Criminology

| Field | Value |
|---|---|
| Canonical key | `course:cj-2470` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Introduction to Forensic Science

| Field | Value |
|---|---|
| Canonical key | `course:cj-1350` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Introduction to Policing

| Field | Value |
|---|---|
| Canonical key | `course:cj-2300` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Introduction to Victimology

| Field | Value |
|---|---|
| Canonical key | `course:cj-2410` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Justice for All

| Field | Value |
|---|---|
| Canonical key | `course:cj-2570` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Justice, Peace and Conflict Studies

| Field | Value |
|---|---|
| Canonical key | `course:cj-1220` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Juvenile Justice

| Field | Value |
|---|---|
| Canonical key | `course:cj-2330` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Law Enforcement Academy

| Field | Value |
|---|---|
| Canonical key | `course:cj-1910` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Law Enforcement Academy

| Field | Value |
|---|---|
| Canonical key | `course:cj-1920` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Laws of Evidence

| Field | Value |
|---|---|
| Canonical key | `course:cj-2350` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Math for Industry

| Field | Value |
|---|---|
| Canonical key | `course:ind-1120` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12512&returnto=9720 |
| course_number | 1120 |
| qualifier | QS |
| subject_code | IND |

### Metallurgy/Nonstructural Parts

| Field | Value |
|---|---|
| Canonical key | `course:acr-1100` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12512&returnto=9720 |
| course_number | 1100 |
| subject_code | ACR |

### Non-structural Skill/Appl Dev

| Field | Value |
|---|---|
| Canonical key | `course:acr-1111` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12512&returnto=9720 |
| course_number | 1111 |
| subject_code | ACR |

### Psychological Profiling

| Field | Value |
|---|---|
| Canonical key | `course:cj-2460` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Psychology of Criminal Behavior

| Field | Value |
|---|---|
| Canonical key | `course:cj-2510` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Social Violence & Change: Gangs, Genocide, Revolution, War & Violence Prevention

| Field | Value |
|---|---|
| Canonical key | `course:cj-2500` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Special Studies in CJ

| Field | Value |
|---|---|
| Canonical key | `course:cj-1900` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Special Topics in CJ

| Field | Value |
|---|---|
| Canonical key | `course:cj-2920` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

### Struct. Analysis/Damage Repair

| Field | Value |
|---|---|
| Canonical key | `course:acr-1200` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12512&returnto=9720 |
| course_number | 1200 |
| subject_code | ACR |

### Structural Damage Repair

| Field | Value |
|---|---|
| Canonical key | `course:acr-1211` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12512&returnto=9720 |
| course_number | 1211 |
| subject_code | ACR |

### TEEM 1202 - Advanced Emergency Medical Technicians

| Field | Value |
|---|---|
| Canonical key | `course:teem-1202` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12988&returnto=9720 |
| credits | 6 |

### Terrorism

| Field | Value |
|---|---|
| Canonical key | `course:cj-2450` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| credits | — |

---

## Organization entities (16)

### American Culinary Federation Foundation Accrediting Commission

| Field | Value |
|---|---|
| Canonical key | `organization:american-culinary-federation-foundation-accrediting-commission` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720 |
| abbreviation | ACFFAC |

### Aviation and Transportation Related Technology Department

| Field | Value |
|---|---|
| Canonical key | `organization:aviation-and-transportation-related-technology-department` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12482&returnto=9720 |
| institution | Salt Lake Community College |

### Biology Department

| Field | Value |
|---|---|
| Canonical key | `organization:biology-department` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720 |

### Chemistry Department

| Field | Value |
|---|---|
| Canonical key | `organization:chemistry-department` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720 |
| parent_institution | Salt Lake Community College |

### Department of Criminal Justice

| Field | Value |
|---|---|
| Canonical key | `organization:department-of-criminal-justice` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| facilityName | Public Safety Education and Training Center |
| location | 9750 South 300 West Sandy, Utah 84070 |
| parentOrganization | Institute of Public Safety |

### Department of Labor Office of Apprenticeship

| Field | Value |
|---|---|
| Canonical key | `organization:department-of-labor-office-of-apprenticeship` |
| Confidence | 0.920 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12496&returnto=9720 |
| address | 125 South State Street, Suite 2412, Salt Lake City, UT 84138 |
| role | federal registering agency for all Utah programs |

### Gail Miller Business School

| Field | Value |
|---|---|
| Canonical key | `organization:gail-miller-business-school` |
| Confidence | 0.950 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12521&returnto=9720 |
| institution | Salt Lake Community College |

### Gail Miller Business School

| Field | Value |
|---|---|
| Canonical key | `organization:gail-miller-business-school` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12520&returnto=9720 |

### HVAC Program at SLCC

| Field | Value |
|---|---|
| Canonical key | `organization:hvac-program-slcc` |
| Confidence | 0.850 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12497&returnto=9720 |
| campus | Taylorsville Redwood Campus |
| parent | Salt Lake Community College |

### Institute of Public Safety

| Field | Value |
|---|---|
| Canonical key | `organization:institute-of-public-safety` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720 |
| parentOrganization | Salt Lake Community College |

### Retail Bakers Association

| Field | Value |
|---|---|
| Canonical key | `organization:retail-bakers-association` |
| Confidence | 0.850 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720 |
| abbreviation | RBA |

### School of Architecture

| Field | Value |
|---|---|
| Canonical key | `organization:school-of-architecture` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12506&returnto=9720 |
| institution | University of Utah |

### School of Humanities and Social Sciences

| Field | Value |
|---|---|
| Canonical key | `organization:school-of-humanities-and-social-sciences` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12788&returnto=9720 |

### Taylorsville Redwood Campus

| Field | Value |
|---|---|
| Canonical key | `organization:taylorsville-redwood-campus` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12556&returnto=9720 |
| parentOrganization | Salt Lake Community College |

### Utah Bureau of Emergency Medical Services

| Field | Value |
|---|---|
| Canonical key | `organization:utah-bureau-of-emergency-medical-services` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12988&returnto=9720 |
| role | Program Oversight |

### Utah State Division of Occupational and Professional Licensing

| Field | Value |
|---|---|
| Canonical key | `organization:utah-state-division-of-occupational-and-professional-licensing` |
| Confidence | 0.920 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12496&returnto=9720 |
| phone | (801) 530-6628 |

---

## Person entities (1)

### Connie Spanton-Jex

| Field | Value |
|---|---|
| Canonical key | `person:connie-spanton-jex` |
| Confidence | 0.650 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720 |
| email | cpanton@slcc.edu |
| phone | (801) 957-4642 |

---

## Position entities (1)

### Program Coordinator

| Field | Value |
|---|---|
| Canonical key | `position:program-coordinator-advanced-manufacturing` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12764&returnto=9720 |
| program | Advanced Manufacturing: AAS (CTE) |
| role | advisor, mentor, liaison |

---

## Service entities (12)

### Academic Advising

| Field | Value |
|---|---|
| Canonical key | `service:academic-advising` |
| Confidence | 0.850 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720 |

### Apprenticeship Office

| Field | Value |
|---|---|
| Canonical key | `service:apprenticeship-office` |
| Confidence | 0.920 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12496&returnto=9720 |
| campus_location | Taylorsville Redwood Campus, CT 274 |
| phone | 801-957-4066 |

### ASL/English Interpreting Program

| Field | Value |
|---|---|
| Canonical key | `service:asl-english-interpreting-program` |
| Confidence | 0.850 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720 |
| email | asli@slcc.edu |

### Bureau of Apprenticeship and Training

| Field | Value |
|---|---|
| Canonical key | `service:bureau-of-apprenticeship-and-training` |
| Confidence | 0.850 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12495&returnto=9720 |

### Department of Labor Office of Apprenticeship

| Field | Value |
|---|---|
| Canonical key | `service:department-of-labor-office-of-apprenticeship` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12495&returnto=9720 |
| address | 125 South State Street, Suite 2412, Salt Lake City, UT 84138 |

### Financial Aid

| Field | Value |
|---|---|
| Canonical key | `service:financial-aid` |
| Confidence | 0.850 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12482&returnto=9720 |

### Graduation Office

| Field | Value |
|---|---|
| Canonical key | `service:graduation-office` |
| Confidence | 0.850 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12495&returnto=9720 |

### Health Sciences Admissions Office

| Field | Value |
|---|---|
| Canonical key | `service:health-sciences-admissions-office` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720 |
| email | healthsciencesadmissions@slcc.edu |
| phone | 801-957-6253 |

### Program Advisor

| Field | Value |
|---|---|
| Canonical key | `service:program-advisor` |
| Confidence | 0.850 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720 |

### Program Website

| Field | Value |
|---|---|
| Canonical key | `service:automation-technology-program-website` |
| Confidence | 0.850 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720 |
| programName | Automation Technology |

### SLCC Culinary Institute

| Field | Value |
|---|---|
| Canonical key | `service:slcc-culinary-institute` |
| Confidence | 0.850 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720 |

### Utah State Division of Occupational and Professional Licensing

| Field | Value |
|---|---|
| Canonical key | `service:utah-state-division-of-occupational-and-professional-licensing` |
| Confidence | 0.900 |
| Source URL | https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12495&returnto=9720 |
| phone | (801) 530-6628 |

---

## Conflicts (516)

_Observations where the promoter detected a contradiction with existing canonical state._

### course — `course:math-1040`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.900
- **Citation**: RECOMMENDED: Quantitative Literacy (QL): MATH 1040
- **Payload**: ```json
{
  "attributes": {
    "note": "Recommended",
    "courseCode": "MATH 1040",
    "generalEducationCategory": "QL"
  },
  "entityType": "course",
  "displayName": "Quantitative Literacy",
  "canonicalKey": "course:math-1040"
}
```

### course — `course:cj-2350`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2350 - Laws of Evidence
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 2350"
  },
  "entityType": "course",
  "displayName": "Laws of Evidence",
  "canonicalKey": "course:cj-2350"
}
```

### course — `course:cj-1300`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 1300 - Introduction to Corrections
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 1300"
  },
  "entityType": "course",
  "displayName": "Introduction to Corrections",
  "canonicalKey": "course:cj-1300"
}
```

### course — `course:cj-1900`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 1900 - Special Studies in CJ
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 1900"
  },
  "entityType": "course",
  "displayName": "Special Studies in CJ",
  "canonicalKey": "course:cj-1900"
}
```

### course — `course:cj-2000`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2000 - Criminal Justice Co-op
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 2000"
  },
  "entityType": "course",
  "displayName": "Criminal Justice Co-op",
  "canonicalKey": "course:cj-2000"
}
```

### course — `course:cj-2020`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2020 - Criminal Justice Supervision
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 2020"
  },
  "entityType": "course",
  "displayName": "Criminal Justice Supervision",
  "canonicalKey": "course:cj-2020"
}
```

### course — `course:cj-2300`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2300 - Introduction to Policing
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 2300"
  },
  "entityType": "course",
  "displayName": "Introduction to Policing",
  "canonicalKey": "course:cj-2300"
}
```

### course — `course:cj-2330`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2330 - Juvenile Justice
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 2330"
  },
  "entityType": "course",
  "displayName": "Juvenile Justice",
  "canonicalKey": "course:cj-2330"
}
```

### course — `course:cj-2340`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2340 - Forensic Photography
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 2340"
  },
  "entityType": "course",
  "displayName": "Forensic Photography",
  "canonicalKey": "course:cj-2340"
}
```

### course — `course:cj-2410`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2410 - Introduction to Victimology
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 2410"
  },
  "entityType": "course",
  "displayName": "Introduction to Victimology",
  "canonicalKey": "course:cj-2410"
}
```

### course — `course:cj-2450`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2450 - Terrorism
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 2450"
  },
  "entityType": "course",
  "displayName": "Terrorism",
  "canonicalKey": "course:cj-2450"
}
```

### course — `course:cj-2460`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2460 - Psychological Profiling
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 2460"
  },
  "entityType": "course",
  "displayName": "Psychological Profiling",
  "canonicalKey": "course:cj-2460"
}
```

### course — `course:cj-2470`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2470 - Introduction to Criminology
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 2470"
  },
  "entityType": "course",
  "displayName": "Introduction to Criminology",
  "canonicalKey": "course:cj-2470"
}
```

### course — `course:cj-2480`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2480 - Crime Scene Investigation Techniques
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 2480"
  },
  "entityType": "course",
  "displayName": "Crime Scene Investigation Techniques",
  "canonicalKey": "course:cj-2480"
}
```

### course — `course:cj-2500`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2500 - Social Violence & Change: Gangs, Genocide, Revolution, War & Violence Prevention
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 2500"
  },
  "entityType": "course",
  "displayName": "Social Violence & Change: Gangs, Genocide, Revolution, War & Violence Prevention",
  "canonicalKey": "course:cj-2500"
}
```

### course — `course:cj-2510`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2510 - Psychology of Criminal Behavior
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 2510"
  },
  "entityType": "course",
  "displayName": "Psychology of Criminal Behavior",
  "canonicalKey": "course:cj-2510"
}
```

### course — `course:cj-2540`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2540 - Careers in Criminal Justice, Law, and Society
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 2540"
  },
  "entityType": "course",
  "displayName": "Careers in Criminal Justice, Law, and Society",
  "canonicalKey": "course:cj-2540"
}
```

### course — `course:cj-2570`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2570 - Justice for All
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 2570"
  },
  "entityType": "course",
  "displayName": "Justice for All",
  "canonicalKey": "course:cj-2570"
}
```

### course — `course:cj-2920`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2920 - Special Topics in CJ
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 2920"
  },
  "entityType": "course",
  "displayName": "Special Topics in CJ",
  "canonicalKey": "course:cj-2920"
}
```

### course — `course:cj-1910`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.900
- **Citation**: applicants that wish to pursue a career as a sworn law enforcement officers or corrections officer must attend a Law Enforcement Academy (CJ 1910 and CJ 1920)
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 1910"
  },
  "entityType": "course",
  "displayName": "Law Enforcement Academy Course 1",
  "canonicalKey": "course:cj-1910"
}
```

### course — `course:cj-1920`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.900
- **Citation**: applicants that wish to pursue a career as a sworn law enforcement officers or corrections officer must attend a Law Enforcement Academy (CJ 1910 and CJ 1920)
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 1920"
  },
  "entityType": "course",
  "displayName": "Law Enforcement Academy Course 2",
  "canonicalKey": "course:cj-1920"
}
```

### course — `course:cj-1220`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 1220 - Justice, Peace and Conflict Studies
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 1220"
  },
  "entityType": "course",
  "displayName": "Justice, Peace and Conflict Studies",
  "canonicalKey": "course:cj-1220"
}
```

### course — `course:amtt-1390`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12727&returnto=9720
- **Confidence**: 0.950
- **Citation**: AMTT 1390 - Aircraft Electronics Technician, NCATT Certification
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "AMTT 1390"
  },
  "entityType": "course",
  "displayName": "Aircraft Electronics Technician, NCATT Certification",
  "canonicalKey": "course:amtt-1390"
}
```

### course — `course:amtt-1400`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12727&returnto=9720
- **Confidence**: 0.950
- **Citation**: AMTT 1400 - Aircraft Electronic Systems
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "AMTT 1400"
  },
  "entityType": "course",
  "displayName": "Aircraft Electronic Systems",
  "canonicalKey": "course:amtt-1400"
}
```

### course — `course:cj-1010`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 1010 - Introduction to Criminal Justice (SS)
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 1010",
    "generalEducationCategory": "SS"
  },
  "entityType": "course",
  "displayName": "Introduction to Criminal Justice",
  "canonicalKey": "course:cj-1010"
}
```

### course — `course:amtt-1405`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12727&returnto=9720
- **Confidence**: 0.950
- **Citation**: AMTT 1405 - Aircraft Electronics Technician, NCATT Endorsements
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "AMTT 1405"
  },
  "entityType": "course",
  "displayName": "Aircraft Electronics Technician, NCATT Endorsements",
  "canonicalKey": "course:amtt-1405"
}
```

### course — `course:cj-1330`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 1330 - Criminal Law
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 1330"
  },
  "entityType": "course",
  "displayName": "Criminal Law",
  "canonicalKey": "course:cj-1330"
}
```

### course — `course:amtt-1420`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12727&returnto=9720
- **Confidence**: 0.950
- **Citation**: AMTT 1420 - Advanced Aircraft Electronic Systems/Troubleshooting
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "AMTT 1420"
  },
  "entityType": "course",
  "displayName": "Advanced Aircraft Electronic Systems/Troubleshooting",
  "canonicalKey": "course:amtt-1420"
}
```

### course — `course:cj-1340`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 1340 - Criminal Investigations
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 1340"
  },
  "entityType": "course",
  "displayName": "Criminal Investigations",
  "canonicalKey": "course:cj-1340"
}
```

### course — `course:amtt-1410`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12727&returnto=9720
- **Confidence**: 0.950
- **Citation**: AMTT 1410 - FCC General Radiotelephone Operator License Preparation
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "AMTT 1410"
  },
  "entityType": "course",
  "displayName": "FCC General Radiotelephone Operator License Preparation",
  "canonicalKey": "course:amtt-1410"
}
```

### course — `course:cj-1350`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 1350 - Introduction to Forensic Science
- **Payload**: ```json
{
  "attributes": {
    "courseCode": "CJ 1350"
  },
  "entityType": "course",
  "displayName": "Introduction to Forensic Science",
  "canonicalKey": "course:cj-1350"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College 4600 South Redwood Road Salt Lake City, UT 84123 801-957-7522
- **Payload**: ```json
{
  "attributes": {
    "phone": "801-957-7522",
    "address": "4600 South Redwood Road, Salt Lake City, UT 84123"
  },
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {},
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12783&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {
    "abbreviation": "SLCC"
  },
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12483&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {
    "abbreviation": "SLCC"
  },
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12521&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College 4600 South Redwood Road Salt Lake City, UT 84123
- **Payload**: ```json
{
  "attributes": {
    "location": "Salt Lake City, UT",
    "abbreviation": "SLCC"
  },
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {},
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12496&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {
    "abbreviation": "SLCC"
  },
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12727&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College 4600 South Redwood Road Salt Lake City, UT 84123 801-957-7522
- **Payload**: ```json
{
  "attributes": {
    "phone": "801-957-7522",
    "address": "4600 South Redwood Road, Salt Lake City, UT 84123"
  },
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12788&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College 4600 South Redwood Road Salt Lake City, UT 84123
- **Payload**: ```json
{
  "attributes": {
    "address": "4600 South Redwood Road",
    "location": "Salt Lake City, UT 84123"
  },
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:gail-miller-business-school`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12703&returnto=9720
- **Confidence**: 0.900
- **Citation**: Students planning to transfer to a bachelor s degree program should instead explore the AS and AA degree options offered at the Gail Miller Business School.
- **Payload**: ```json
{
  "attributes": {
    "institution": "Salt Lake Community College"
  },
  "entityType": "organization",
  "displayName": "Gail Miller Business School",
  "canonicalKey": "organization:gail-miller-business-school"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12495&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {
    "abbreviation": "SLCC"
  },
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12482&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College 4600 South Redwood Road Salt Lake City, UT 84123 801-957-7522
- **Payload**: ```json
{
  "attributes": {
    "phone": "801-957-7522",
    "address": "4600 South Redwood Road, Salt Lake City, UT 84123"
  },
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:department-of-criminal-justice`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.950
- **Citation**: The Department of Criminal Justice is part of the Institute of Public Safety at Salt Lake Community College (SLCC) located at the Larry H. Miller Campus in the Public Safety Education and Training Center (9750 South 300 West Sandy, Utah 84070).
- **Payload**: ```json
{
  "attributes": {
    "location": "Larry H. Miller Campus, Public Safety Education and Training Center, 9750 South 300 West Sandy, Utah 84070",
    "parentInstitution": "Salt Lake Community College"
  },
  "entityType": "organization",
  "displayName": "Department of Criminal Justice",
  "canonicalKey": "organization:department-of-criminal-justice"
}
```

### organization — `organization:institute-of-public-safety`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12558&returnto=9720
- **Confidence**: 0.900
- **Citation**: The Department of Criminal Justice is part of the Institute of Public Safety at Salt Lake Community College (SLCC)
- **Payload**: ```json
{
  "attributes": {
    "parentInstitution": "Salt Lake Community College"
  },
  "entityType": "organization",
  "displayName": "Institute of Public Safety",
  "canonicalKey": "organization:institute-of-public-safety"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {},
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12520&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {},
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College 4600 South Redwood Road Salt Lake City, UT 84123 801-957-7522
- **Payload**: ```json
{
  "attributes": {
    "phone": "801-957-7522",
    "address": "4600 South Redwood Road Salt Lake City, UT 84123",
    "abbreviation": "SLCC"
  },
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12654&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {
    "abbreviation": "SLCC"
  },
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12487&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {
    "abbreviation": "SLCC"
  },
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {
    "abbreviation": "SLCC"
  },
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {
    "abbreviation": "SLCC"
  },
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College 4600 South Redwood Road Salt Lake City, UT 84123
- **Payload**: ```json
{
  "attributes": {
    "address": "4600 South Redwood Road, Salt Lake City, UT 84123",
    "abbreviation": "SLCC"
  },
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12776&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {},
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### organization — `organization:salt-lake-community-college`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12565&returnto=9720
- **Confidence**: 0.950
- **Citation**: Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {
    "abbreviation": "SLCC"
  },
  "entityType": "organization",
  "displayName": "Salt Lake Community College",
  "canonicalKey": "organization:salt-lake-community-college"
}
```

### service — `service:apprenticeship-office`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12497&returnto=9720
- **Confidence**: 0.920
- **Citation**: For more information about this certificate, contact the Apprenticeship Office, Taylorsville Redwood Campus, CT 274, 801-957-4066.
- **Payload**: ```json
{
  "attributes": {
    "phone": "801-957-4066",
    "location": "Taylorsville Redwood Campus, CT 274"
  },
  "entityType": "service",
  "displayName": "Apprenticeship Office",
  "canonicalKey": "service:apprenticeship-office"
}
```

### governed_by — `program:advanced-emergency-medical-technician-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12988&returnto=9720
- **Confidence**: 0.900
- **Citation**: This program is overseen by the Utah Bureau of Emergency Medical Services.
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "organization:utah-bureau-of-emergency-medical-services",
  "fromCanonicalKey": "program:advanced-emergency-medical-technician-technical-certificate",
  "relationshipType": "governed_by"
}
```

### hosted_by — `program:automotive-collision-repair-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12512&returnto=9720
- **Confidence**: 0.950
- **Citation**: Automotive Collision Repair: Academic Certificate (CTE) - Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "organization:salt-lake-community-college",
  "fromCanonicalKey": "program:automotive-collision-repair-academic-certificate-cte",
  "relationshipType": "hosted_by"
}
```

### part_of — `course:tecd-1100`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12654&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (6 credits) TECD 1100 - Commercial Drivers License – Class A
- **Payload**: ```json
{
  "attributes": {
    "isRequired": true
  },
  "toCanonicalKey": "program:commercial-drivers-license-class-a-technical-certificate",
  "fromCanonicalKey": "course:tecd-1100",
  "relationshipType": "part_of"
}
```

### part_of — `program:business-associate-of-arts`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12520&returnto=9720
- **Confidence**: 0.900
- **Citation**: The Gail Miller Business School offers an Associate of Arts degree
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "organization:gail-miller-business-school",
  "fromCanonicalKey": "program:business-associate-of-arts",
  "relationshipType": "part_of"
}
```

### part_of — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.900
- **Citation**: The Biology Department offers a program leading to an associate of science degree.
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "organization:biology-department",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "part_of"
}
```

### part_of — `program:apprenticeship-electrical-independent-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12495&returnto=9720
- **Confidence**: 0.950
- **Citation**: Apprenticeship Electrical Independent Technology: AAS (CTE) - Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "organization:salt-lake-community-college",
  "fromCanonicalKey": "program:apprenticeship-electrical-independent-technology-aas",
  "relationshipType": "part_of"
}
```

### part_of — `program:aerospace-aviation-technology-maintenance-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12482&returnto=9720
- **Confidence**: 0.900
- **Citation**: The Aviation and Transportation Related Technology Department s Aviation Maintenance Program is designed to prepare students for a career in the maintenance and repair of various aircraft and powerplants.
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "organization:aviation-and-transportation-related-technology-department",
  "fromCanonicalKey": "program:aerospace-aviation-technology-maintenance-aas",
  "relationshipType": "part_of"
}
```

### part_of — `program:construction-management-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720
- **Confidence**: 0.950
- **Citation**: Construction Management: AS - Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "organization:salt-lake-community-college",
  "fromCanonicalKey": "program:construction-management-associate-of-science",
  "relationshipType": "part_of"
}
```

### part_of — `program:electrical-apprenticeship-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12783&returnto=9720
- **Confidence**: 0.950
- **Citation**: Electrical Apprenticeship: Technical Certificate (SL Tech)(CTE) - Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "organization:salt-lake-community-college",
  "fromCanonicalKey": "program:electrical-apprenticeship-technical-certificate",
  "relationshipType": "part_of"
}
```

### part_of — `program:aircraft-electronics-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12727&returnto=9720
- **Confidence**: 0.950
- **Citation**: Aircraft Electronics: Academic Certificate (CTE) - Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "organization:salt-lake-community-college",
  "fromCanonicalKey": "program:aircraft-electronics-academic-certificate-cte",
  "relationshipType": "part_of"
}
```

### part_of — `program:business-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12521&returnto=9720
- **Confidence**: 0.950
- **Citation**: The Gail Miller Business School offers an Associate of Science degree
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "organization:gail-miller-business-school",
  "fromCanonicalKey": "program:business-associate-of-science",
  "relationshipType": "part_of"
}
```

### part_of — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.950
- **Citation**: Dental Hygiene: AAS (CTE) - Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "organization:salt-lake-community-college",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "part_of"
}
```

### part_of — `organization:school-of-humanities-and-social-sciences`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12788&returnto=9720
- **Confidence**: 0.850
- **Citation**: declare a degree or certificate path in the School of Humanities and Social Sciences at Salt Lake Community College
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "organization:salt-lake-community-college",
  "fromCanonicalKey": "organization:school-of-humanities-and-social-sciences",
  "relationshipType": "part_of"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: MATH 1080 - Precalculus (QL)
- **Payload**: ```json
{
  "attributes": {
    "category": "Additional Transfer Course",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:math-1080",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: MATH 1210 - Calculus I (QL)
- **Payload**: ```json
{
  "attributes": {
    "category": "Additional Transfer Course",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:math-1210",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: MATH 1220 - Calculus II
- **Payload**: ```json
{
  "attributes": {
    "category": "Additional Transfer Course",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:math-1220",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: MATH 2200 - Introduction to Discrete Mathematics
- **Payload**: ```json
{
  "attributes": {
    "category": "Additional Transfer Course",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:math-2200",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: MATH 2210 - Multivariate Calculus: Calculus III
- **Payload**: ```json
{
  "attributes": {
    "category": "Additional Transfer Course",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:math-2210",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: MATH 2270 - Elementary Linear Algebra
- **Payload**: ```json
{
  "attributes": {
    "category": "Additional Transfer Course",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:math-2270",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: PHYS 2010 - College Physics I
- **Payload**: ```json
{
  "attributes": {
    "category": "Additional Transfer Course",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:phys-2010",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: PHYS 2015 - College Physics Lab I
- **Payload**: ```json
{
  "attributes": {
    "category": "Additional Transfer Course",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:phys-2015",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: PHYS 2210 - Physics for Science & Engineering I
- **Payload**: ```json
{
  "attributes": {
    "category": "Additional Transfer Course",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:phys-2210",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: PHYS 2215 - Physics for Sci & Eng Lab I
- **Payload**: ```json
{
  "attributes": {
    "category": "Additional Transfer Course",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:phys-2215",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:concrete-masonry-apprenticeship-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12776&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (12 credits) TECN 1210 - Concrete Masonry 2B
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:tecn-1210",
  "fromCanonicalKey": "program:concrete-masonry-apprenticeship-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: INTD 1450 - Basic CAD for Interior Design
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:intd-1450",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 1100 - Construction Math (QS)
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cmgt-1100",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 1130 - OSHA 30 for Construction
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "core"
  },
  "toCanonicalKey": "course:cmgt-1130",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 1410 - Construction Materials & Methods
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "core"
  },
  "toCanonicalKey": "course:cmgt-1410",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 1450 - Construction Print Reading & Layout
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "core"
  },
  "toCanonicalKey": "course:cmgt-1450",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 1660 - Civil Materials
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "core"
  },
  "toCanonicalKey": "course:cmgt-1660",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 2640 - Construction Estimating
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "core"
  },
  "toCanonicalKey": "course:cmgt-2640",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 2670 - Building Codes & Inspections
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "core"
  },
  "toCanonicalKey": "course:cmgt-2670",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 2810 - Construction Project Management
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "core"
  },
  "toCanonicalKey": "course:cmgt-2810",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 2820 - Construction Systems and Standards
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "core"
  },
  "toCanonicalKey": "course:cmgt-2820",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 2870 - Construction Law
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "core"
  },
  "toCanonicalKey": "course:cmgt-2870",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: ARCH 1632 - Basic Architectural Communication II
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:arch-1632",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 1220 - Woodworking & Millwork I
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cmgt-1220",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 1320 - Building Construction I
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cmgt-1320",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 1330 - Interior Finishes I
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cmgt-1330",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 1530 - Furniture Design & Construction I
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cmgt-1530",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 2220 - Woodworking & Millwork II
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cmgt-2220",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 2320 - Building Construction II
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cmgt-2320",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 2330 - Interior Finishes II
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cmgt-2330",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 2530 - Furniture Design & Construction II
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cmgt-2530",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 2710 - Computer Applications for Cabinetmaking & Woodworking
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cmgt-2710",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 2720 - CNC Operations in Cabinetmaking & Woodworking
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cmgt-2720",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 1120 - Acoustic Guitar Construction
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cmgt-1120",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: SVT 1010 - Introduction to Surveying
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:svt-1010",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: SVT 2060 - Ethics and Liability
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:svt-2060",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: SVT 2160 - Land Boundary Law I
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:svt-2160",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720
- **Confidence**: 0.900
- **Citation**: CMGT 1130 - OSHA 30 for Construction
- **Payload**: ```json
{
  "attributes": {
    "credits": 1
  },
  "toCanonicalKey": "course:cmgt-1130",
  "fromCanonicalKey": "program:construction-management-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720
- **Confidence**: 0.900
- **Citation**: CMGT 1410 - Construction Materials & Methods
- **Payload**: ```json
{
  "attributes": {
    "credits": 1
  },
  "toCanonicalKey": "course:cmgt-1410",
  "fromCanonicalKey": "program:construction-management-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720
- **Confidence**: 0.900
- **Citation**: CMGT 1450 - Construction Print Reading & Layout
- **Payload**: ```json
{
  "attributes": {
    "credits": 1
  },
  "toCanonicalKey": "course:cmgt-1450",
  "fromCanonicalKey": "program:construction-management-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720
- **Confidence**: 0.900
- **Citation**: CMGT 1660 - Civil Materials
- **Payload**: ```json
{
  "attributes": {
    "credits": 1
  },
  "toCanonicalKey": "course:cmgt-1660",
  "fromCanonicalKey": "program:construction-management-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720
- **Confidence**: 0.900
- **Citation**: CMGT 2640 - Construction Estimating
- **Payload**: ```json
{
  "attributes": {
    "credits": 1
  },
  "toCanonicalKey": "course:cmgt-2640",
  "fromCanonicalKey": "program:construction-management-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720
- **Confidence**: 0.900
- **Citation**: CMGT 2670 - Building Codes & Inspections
- **Payload**: ```json
{
  "attributes": {
    "credits": 1
  },
  "toCanonicalKey": "course:cmgt-2670",
  "fromCanonicalKey": "program:construction-management-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720
- **Confidence**: 0.900
- **Citation**: Life Science (LS): ENVS 1400
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "category": "Life Science (LS)"
  },
  "toCanonicalKey": "course:envs-1400",
  "fromCanonicalKey": "program:construction-management-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720
- **Confidence**: 0.900
- **Citation**: Quantitative Literacy (QL): (MATH 1050 and MATH 1060) or MATH 1080
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "category": "Quantitative Literacy (QL)"
  },
  "toCanonicalKey": "course:math-1080",
  "fromCanonicalKey": "program:construction-management-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720
- **Confidence**: 0.900
- **Citation**: CMGT 2810 - Construction Project Management
- **Payload**: ```json
{
  "attributes": {
    "credits": 1
  },
  "toCanonicalKey": "course:cmgt-2810",
  "fromCanonicalKey": "program:construction-management-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720
- **Confidence**: 0.900
- **Citation**: CMGT 2820 - Construction Systems and Standards
- **Payload**: ```json
{
  "attributes": {
    "credits": 1
  },
  "toCanonicalKey": "course:cmgt-2820",
  "fromCanonicalKey": "program:construction-management-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720
- **Confidence**: 0.900
- **Citation**: CMGT 2870 - Construction Law
- **Payload**: ```json
{
  "attributes": {
    "credits": 1
  },
  "toCanonicalKey": "course:cmgt-2870",
  "fromCanonicalKey": "program:construction-management-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720
- **Confidence**: 0.900
- **Citation**: Composition (EN): ENGL 2010
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "category": "Composition (EN)"
  },
  "toCanonicalKey": "course:engl-2010",
  "fromCanonicalKey": "program:construction-management-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720
- **Confidence**: 0.900
- **Citation**: Quantitative Literacy (QL): (MATH 1050 and MATH 1060) or MATH 1080
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "category": "Quantitative Literacy (QL)"
  },
  "toCanonicalKey": "course:math-1050",
  "fromCanonicalKey": "program:construction-management-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720
- **Confidence**: 0.900
- **Citation**: Quantitative Literacy (QL): (MATH 1050 and MATH 1060) or MATH 1080
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "category": "Quantitative Literacy (QL)"
  },
  "toCanonicalKey": "course:math-1060",
  "fromCanonicalKey": "program:construction-management-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:criminal-justice-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2460 - Psychological Profiling
- **Payload**: ```json
{
  "attributes": {
    "courseType": "elective"
  },
  "toCanonicalKey": "course:cj-2460",
  "fromCanonicalKey": "program:criminal-justice-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:criminal-justice-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2470 - Introduction to Criminology
- **Payload**: ```json
{
  "attributes": {
    "courseType": "elective"
  },
  "toCanonicalKey": "course:cj-2470",
  "fromCanonicalKey": "program:criminal-justice-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:criminal-justice-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 2480 - Crime Scene Investigation Techniques
- **Payload**: ```json
{
  "attributes": {
    "courseType": "elective"
  },
  "toCanonicalKey": "course:cj-2480",
  "fromCanonicalKey": "program:criminal-justice-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:cultural-resource-management-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12487&returnto=9720
- **Confidence**: 0.950
- **Citation**: GEOG 1800 - Mapping Our Changing World (CM)
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:geog-1800",
  "fromCanonicalKey": "program:cultural-resource-management-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:cultural-resource-management-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12487&returnto=9720
- **Confidence**: 0.950
- **Citation**: GEOG 2500 - Introduction to Geographic Information Systems
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:geog-2500",
  "fromCanonicalKey": "program:cultural-resource-management-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:cultural-resource-management-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12487&returnto=9720
- **Confidence**: 0.950
- **Citation**: HIST 2950 - Archival Internship
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:hist-2950",
  "fromCanonicalKey": "program:cultural-resource-management-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:culinary-arts-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEF 1110 - Sanitation
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:chef-1110",
  "fromCanonicalKey": "program:culinary-arts-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:culinary-arts-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEF 1120 - Introduction to Hospitality
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:chef-1120",
  "fromCanonicalKey": "program:culinary-arts-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:culinary-arts-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEF 1210 - Food and Beverage Service
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:chef-1210",
  "fromCanonicalKey": "program:culinary-arts-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:culinary-arts-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEF 1300 - Food Preparation I
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:chef-1300",
  "fromCanonicalKey": "program:culinary-arts-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:culinary-arts-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEF 1900 - Sustainable Food Systems
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:chef-1900",
  "fromCanonicalKey": "program:culinary-arts-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:culinary-arts-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEF 2000 - Culinary Arts Co-op
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:chef-2000",
  "fromCanonicalKey": "program:culinary-arts-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:culinary-arts-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEF 2420 - Baking
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:chef-2420",
  "fromCanonicalKey": "program:culinary-arts-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:culinary-arts-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEF 2425 - Baking I Lab
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:chef-2425",
  "fromCanonicalKey": "program:culinary-arts-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:culinary-arts-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEF 2520 - Nutrition
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:chef-2520",
  "fromCanonicalKey": "program:culinary-arts-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:culinary-arts-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEF 2610 - Menu Marketing & Management
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:chef-2610",
  "fromCanonicalKey": "program:culinary-arts-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:culinary-arts-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEF 2620 - Culinary Management
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:chef-2620",
  "fromCanonicalKey": "program:culinary-arts-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:culinary-arts-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEF 2680 - Catering Management
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:chef-2680",
  "fromCanonicalKey": "program:culinary-arts-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:culinary-arts-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEF 2430 - Baking II - Artisan Breads & Pastries
- **Payload**: ```json
{
  "attributes": {
    "trackSpecific": "Baking Track"
  },
  "toCanonicalKey": "course:chef-2430",
  "fromCanonicalKey": "program:culinary-arts-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:culinary-arts-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEF 2440 - Baking III - Classic European Tortes & Restaurant Desserts
- **Payload**: ```json
{
  "attributes": {
    "trackSpecific": "Baking Track"
  },
  "toCanonicalKey": "course:chef-2440",
  "fromCanonicalKey": "program:culinary-arts-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:culinary-arts-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEF 1500 - Food Preparation III
- **Payload**: ```json
{
  "attributes": {
    "trackSpecific": "Culinary Track"
  },
  "toCanonicalKey": "course:chef-1500",
  "fromCanonicalKey": "program:culinary-arts-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: BIOL 2060 - Microbiology
- **Payload**: ```json
{
  "attributes": {
    "minimum_grade": "C+",
    "requirement_type": "selective_admissions"
  },
  "toCanonicalKey": "course:biol-2060",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: BIOL 2065 - Microbiology Laboratory
- **Payload**: ```json
{
  "attributes": {
    "minimum_grade": "C+",
    "requirement_type": "selective_admissions"
  },
  "toCanonicalKey": "course:biol-2065",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: BIOL 2320 - Human Anatomy
- **Payload**: ```json
{
  "attributes": {
    "minimum_grade": "C+",
    "requirement_type": "selective_admissions"
  },
  "toCanonicalKey": "course:biol-2320",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: BIOL 2325 - Human Anatomy Lab
- **Payload**: ```json
{
  "attributes": {
    "minimum_grade": "C+",
    "requirement_type": "selective_admissions"
  },
  "toCanonicalKey": "course:biol-2325",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: BIOL 2420 - Human Physiology
- **Payload**: ```json
{
  "attributes": {
    "minimum_grade": "C+",
    "requirement_type": "selective_admissions"
  },
  "toCanonicalKey": "course:biol-2420",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: BIOL 2425 - Human Physiology Lab
- **Payload**: ```json
{
  "attributes": {
    "minimum_grade": "C+",
    "requirement_type": "selective_admissions"
  },
  "toCanonicalKey": "course:biol-2425",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: CHEM 1110 - Elementary Chemistry
- **Payload**: ```json
{
  "attributes": {
    "minimum_grade": "C+",
    "requirement_type": "selective_admissions"
  },
  "toCanonicalKey": "course:chem-1110",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: CHEM 1115 - Elementary Chemistry Lab
- **Payload**: ```json
{
  "attributes": {
    "minimum_grade": "C+",
    "requirement_type": "selective_admissions"
  },
  "toCanonicalKey": "course:chem-1115",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: ENGL 1010 - Introduction to College Writing (WC)
- **Payload**: ```json
{
  "attributes": {
    "minimum_grade": "C",
    "requirement_type": "selective_admissions"
  },
  "toCanonicalKey": "course:engl-1010",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: MATH 1010 - Intermediate Algebra (QS) , or MATH 1040 or higher
- **Payload**: ```json
{
  "attributes": {
    "minimum_grade": "C",
    "requirement_type": "selective_admissions"
  },
  "toCanonicalKey": "course:math-1010",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: COMM 1010 - Elements of Effective Communication (CM)
- **Payload**: ```json
{
  "attributes": {
    "minimum_grade": "C",
    "requirement_type": "selective_admissions"
  },
  "toCanonicalKey": "course:comm-1010",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: NUTR 1020 - Scientific Foundations of Human Nutrition (LS)
- **Payload**: ```json
{
  "attributes": {
    "minimum_grade": "C",
    "requirement_type": "selective_admissions"
  },
  "toCanonicalKey": "course:nutr-1020",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: SOC 1010 - Intro to Sociology (SS)
- **Payload**: ```json
{
  "attributes": {
    "minimum_grade": "C",
    "requirement_type": "selective_admissions"
  },
  "toCanonicalKey": "course:soc-1010",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: PSY 1010 - General Psychology (SS) or PSY 1100
- **Payload**: ```json
{
  "attributes": {
    "minimum_grade": "C",
    "requirement_type": "selective_admissions"
  },
  "toCanonicalKey": "course:psy-1010",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 1060 - Dental Radiology Lab
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-1060",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 1100 - Dental Hygiene Theory I
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-1100",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 1110 - Clinical Dental Hygiene I
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-1110",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 1150 - Dental Materials Lab
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-1150",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 1330 - Head and Neck Anatomy
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-1330",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 1340 - Dental Anatomy
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-1340",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 1350 - Dental Embryology/Histology
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-1350",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 1400 - Dental Hygiene Theory II
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-1400",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 1410 - Clinical Dental Hygiene II
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-1410",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 1540 - Pharmacology
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-1540",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 1640 - Compromised Patient Special Needs
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-1640",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 2050 - General and Oral Pathology
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-2050",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 2200 - Dental Hygiene Theory III
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-2200",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 2210 - Clinical Dental Hygiene III
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-2210",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 2220 - Community Dental Health
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-2220",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 2340 - Local Anesthesia
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-2340",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 2341 - Local Anesthesia Lab
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-2341",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 2450 - Periodontology
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-2450",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 2610 - Clinical Dental Hygiene IV
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-2610",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 2800 - Practice Management
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-2800",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:electrical-apprenticeship-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12783&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEEL 1120 - Electrician Apprentice IB
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:teel-1120",
  "fromCanonicalKey": "program:electrical-apprenticeship-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:electrical-apprenticeship-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12783&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEEL 1210 - Electrician Apprentice IIA
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:teel-1210",
  "fromCanonicalKey": "program:electrical-apprenticeship-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:electrical-apprenticeship-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12783&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEEL 1220 - Electrician Apprentice IIB
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:teel-1220",
  "fromCanonicalKey": "program:electrical-apprenticeship-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:electrical-apprenticeship-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12783&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEEL 1310 - Electrician Apprentice IIIA
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:teel-1310",
  "fromCanonicalKey": "program:electrical-apprenticeship-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:electrical-apprenticeship-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12783&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEEL 1320 - Electrician Apprentice IIIB
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:teel-1320",
  "fromCanonicalKey": "program:electrical-apprenticeship-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:electrical-apprenticeship-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12783&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEEL 1410 - Electrician Apprentice IVA
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:teel-1410",
  "fromCanonicalKey": "program:electrical-apprenticeship-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:electrical-apprenticeship-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12783&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEEL 1420 - Electrician Apprentice IVB
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:teel-1420",
  "fromCanonicalKey": "program:electrical-apprenticeship-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:electrical-apprenticeship-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12783&returnto=9720
- **Confidence**: 0.900
- **Citation**: All entering students must demonstrate competence for placement into MATH 1010 , or provide a transcript showing a grade of C or higher in MATH 0990 or equivalent, or complete ELI 1470 (Math for the Trades) with a grade of C or higher.
- **Payload**: ```json
{
  "attributes": {
    "alternatives": [
      "course:math-0990",
      "course:eli-1470"
    ],
    "placement_requirement": true
  },
  "toCanonicalKey": "course:math-1010",
  "fromCanonicalKey": "program:electrical-apprenticeship-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:economics-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12565&returnto=9720
- **Confidence**: 0.950
- **Citation**: ECON 1740 - Economic History of U.S. (AI)
- **Payload**: ```json
{
  "attributes": {
    "required": true
  },
  "toCanonicalKey": "course:econ-1740",
  "fromCanonicalKey": "program:economics-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:economics-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12565&returnto=9720
- **Confidence**: 0.950
- **Citation**: ECON 2020 - Principles of Macroeconomics (SS)
- **Payload**: ```json
{
  "attributes": {
    "required": true
  },
  "toCanonicalKey": "course:econ-2020",
  "fromCanonicalKey": "program:economics-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:economics-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12565&returnto=9720
- **Confidence**: 0.950
- **Citation**: MATH 1040 - Intro to Statistics (QL)
- **Payload**: ```json
{
  "attributes": {
    "required": true
  },
  "toCanonicalKey": "course:math-1040",
  "fromCanonicalKey": "program:economics-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:economics-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12565&returnto=9720
- **Confidence**: 0.900
- **Citation**: ECON 1010 - Economics as a Social Science (SS)
- **Payload**: ```json
{
  "attributes": {
    "credits": 6,
    "elective": true,
    "required": false
  },
  "toCanonicalKey": "course:econ-1010",
  "fromCanonicalKey": "program:economics-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:economics-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12565&returnto=9720
- **Confidence**: 0.900
- **Citation**: MATH 1210 - Calculus I (QL)
- **Payload**: ```json
{
  "attributes": {
    "credits": 6,
    "elective": true,
    "required": false
  },
  "toCanonicalKey": "course:math-1210",
  "fromCanonicalKey": "program:economics-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:economics-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12565&returnto=9720
- **Confidence**: 0.900
- **Citation**: MATH 1090 - College Algebra-Business (QL)
- **Payload**: ```json
{
  "attributes": {
    "credits": 6,
    "elective": true,
    "required": false
  },
  "toCanonicalKey": "course:math-1090",
  "fromCanonicalKey": "program:economics-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:economics-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12565&returnto=9720
- **Confidence**: 0.900
- **Citation**: MATH 1100 - Calculus Techniques
- **Payload**: ```json
{
  "attributes": {
    "credits": 6,
    "elective": true,
    "required": false
  },
  "toCanonicalKey": "course:math-1100",
  "fromCanonicalKey": "program:economics-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:economics-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12565&returnto=9720
- **Confidence**: 0.900
- **Citation**: ECON 2100 - Labor Economics
- **Payload**: ```json
{
  "attributes": {
    "credits": 6,
    "elective": true,
    "required": false
  },
  "toCanonicalKey": "course:econ-2100",
  "fromCanonicalKey": "program:economics-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:economics-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12565&returnto=9720
- **Confidence**: 0.900
- **Citation**: ECON 2990 - Special Studies in Economics
- **Payload**: ```json
{
  "attributes": {
    "credits": 6,
    "elective": true,
    "required": false
  },
  "toCanonicalKey": "course:econ-2990",
  "fromCanonicalKey": "program:economics-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:economics-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12565&returnto=9720
- **Confidence**: 0.900
- **Citation**: MATH 1050 - College Algebra (QL)
- **Payload**: ```json
{
  "attributes": {
    "credits": 6,
    "elective": true,
    "required": false
  },
  "toCanonicalKey": "course:math-1050",
  "fromCanonicalKey": "program:economics-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:advanced-manufacturing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12764&returnto=9720
- **Confidence**: 0.900
- **Citation**: ENGL 1010 - Introduction to College Writing (WC)
- **Payload**: ```json
{
  "attributes": {
    "note": "recommended for Written Communication",
    "course_name": "Introduction to College Writing",
    "course_type": "general_education"
  },
  "toCanonicalKey": "course:engl-1010",
  "fromCanonicalKey": "program:advanced-manufacturing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:advanced-manufacturing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12764&returnto=9720
- **Confidence**: 0.900
- **Citation**: STEM 1010 - Mathematics and Technology (QS)
- **Payload**: ```json
{
  "attributes": {
    "note": "recommended for Quantitative Studies",
    "course_name": "Mathematics and Technology",
    "course_type": "general_education"
  },
  "toCanonicalKey": "course:stem-1010",
  "fromCanonicalKey": "program:advanced-manufacturing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:advanced-manufacturing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12764&returnto=9720
- **Confidence**: 0.900
- **Citation**: CTEL 1010 - Leadership & Team Building (HR)
- **Payload**: ```json
{
  "attributes": {
    "note": "recommended for Human Relations",
    "course_name": "Leadership & Team Building",
    "course_type": "general_education"
  },
  "toCanonicalKey": "course:ctel-1010",
  "fromCanonicalKey": "program:advanced-manufacturing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:advanced-manufacturing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12764&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEAM 1117 - Fluid Power Systems
- **Payload**: ```json
{
  "attributes": {
    "course_name": "Fluid Power Systems",
    "course_type": "elective"
  },
  "toCanonicalKey": "course:team-1117",
  "fromCanonicalKey": "program:advanced-manufacturing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:advanced-manufacturing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12764&returnto=9720
- **Confidence**: 0.950
- **Citation**: EDDT 2260 - Machine Design
- **Payload**: ```json
{
  "attributes": {
    "course_name": "Machine Design",
    "course_type": "required"
  },
  "toCanonicalKey": "course:eddt-2260",
  "fromCanonicalKey": "program:advanced-manufacturing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:culinary-arts-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEF 2410 - Purchasing and Storeroom Management
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:chef-2410",
  "fromCanonicalKey": "program:culinary-arts-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:advanced-manufacturing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12764&returnto=9720
- **Confidence**: 0.950
- **Citation**: EDDT 1500 - Manual Machine Shop Theory and Lab
- **Payload**: ```json
{
  "attributes": {
    "course_name": "Manual Machine Shop Theory and Lab",
    "course_type": "elective"
  },
  "toCanonicalKey": "course:eddt-1500",
  "fromCanonicalKey": "program:advanced-manufacturing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:aircraft-electronics-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12727&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (17 Credits) AMTT 1420 - Advanced Aircraft Electronic Systems/Troubleshooting
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:amtt-1420",
  "fromCanonicalKey": "program:aircraft-electronics-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-english-interpreting-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720
- **Confidence**: 0.900
- **Citation**: INTR 1200 - Interpreting I
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:intr-1200",
  "fromCanonicalKey": "program:american-sign-language-english-interpreting-aas",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-aa`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12483&returnto=9720
- **Confidence**: 0.900
- **Citation**: ASL 2700 - Introduction to ASL Literature
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "isElective": true
  },
  "toCanonicalKey": "course:asl-2700",
  "fromCanonicalKey": "program:american-sign-language-aa",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-aa`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12483&returnto=9720
- **Confidence**: 0.850
- **Citation**: Arts (AR): THEA 1033 , FLM 1070 , or DANC 1010
- **Payload**: ```json
{
  "attributes": {
    "category": "Arts",
    "isElective": true
  },
  "toCanonicalKey": "course:flm-1070",
  "fromCanonicalKey": "program:american-sign-language-aa",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-facilities-maintenance-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12496&returnto=9720
- **Confidence**: 0.920
- **Citation**: FMTA 2410 - Mntnc. Welding/Trowel Trades
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "Elective Course"
  },
  "toCanonicalKey": "course:fmta-2410",
  "fromCanonicalKey": "program:apprenticeship-facilities-maintenance-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:cabinetmaking-and-furniture-construction-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12556&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 1110 - Birth of a Flute (AR)
- **Payload**: ```json
{
  "attributes": {
    "isElective": true,
    "isRequired": false,
    "courseTitle": "Birth of a Flute (AR)"
  },
  "toCanonicalKey": "course:cmgt-1110",
  "fromCanonicalKey": "program:cabinetmaking-and-furniture-construction-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-english-interpreting-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720
- **Confidence**: 0.900
- **Citation**: INTR 1000 - Introduction to ASL/English Interpreting
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:intr-1000",
  "fromCanonicalKey": "program:american-sign-language-english-interpreting-aas",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-english-interpreting-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720
- **Confidence**: 0.900
- **Citation**: INTR 1600 - Internship I
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:intr-1600",
  "fromCanonicalKey": "program:american-sign-language-english-interpreting-aas",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-english-interpreting-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720
- **Confidence**: 0.900
- **Citation**: INTR 2200 - ASL/English Interpreting III
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:intr-2200",
  "fromCanonicalKey": "program:american-sign-language-english-interpreting-aas",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-aa`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12483&returnto=9720
- **Confidence**: 0.850
- **Citation**: Humanities (HU): COMM 1020 , ENGL 1050 , ENGL 2610 , HIST 2200 , or PHIL 2050
- **Payload**: ```json
{
  "attributes": {
    "category": "Humanities",
    "isElective": true
  },
  "toCanonicalKey": "course:comm-1020",
  "fromCanonicalKey": "program:american-sign-language-aa",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-aa`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12483&returnto=9720
- **Confidence**: 0.850
- **Citation**: Humanities (HU): COMM 1020 , ENGL 1050 , ENGL 2610 , HIST 2200 , or PHIL 2050
- **Payload**: ```json
{
  "attributes": {
    "category": "Humanities",
    "isElective": true
  },
  "toCanonicalKey": "course:engl-1050",
  "fromCanonicalKey": "program:american-sign-language-aa",
  "relationshipType": "requires"
}
```

### requires — `program:architecture-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12506&returnto=9720
- **Confidence**: 0.900
- **Citation**: Note: PHYS 2010 - College Physics I is a required course for admission to the University of Utah Architecture Program
- **Payload**: ```json
{
  "attributes": {
    "note": "required for University of Utah Architecture Program admission"
  },
  "toCanonicalKey": "course:phys-2010",
  "fromCanonicalKey": "program:architecture-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:automotive-collision-repair-and-refinishing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12509&returnto=9720
- **Confidence**: 0.900
- **Citation**: AR 1200 - Advanced Auto Refinishing
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:ar-1200",
  "fromCanonicalKey": "program:automotive-collision-repair-and-refinishing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:automation-technology-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.900
- **Citation**: Emphasis Advanced Programmable Logic Controllers TEAM 2010 - Programmable Logic Controllers II
- **Payload**: ```json
{
  "attributes": {
    "credits": "Elective",
    "emphasis": "Advanced Programmable Logic Controllers"
  },
  "toCanonicalKey": "course:team-2010",
  "fromCanonicalKey": "program:automation-technology-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: All areas of emphasis require the following Biology AS Core Courses: BIOL 2035 - Genetics Lab
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "requirement_type": "core"
  },
  "toCanonicalKey": "course:biol-2035",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 1050 - Dental Radiology
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-1050",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:architecture-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12506&returnto=9720
- **Confidence**: 0.900
- **Citation**: Humanities (HU) : PHIL 2300 - Introduction to Environmental Ethics (HU)
- **Payload**: ```json
{
  "attributes": {
    "note": "recommended"
  },
  "toCanonicalKey": "course:phil-2300",
  "fromCanonicalKey": "program:architecture-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:automation-technology-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.900
- **Citation**: Emphasis Advanced Programmable Logic Controllers TEAM 2040 - PLC Troubleshooting
- **Payload**: ```json
{
  "attributes": {
    "credits": "Elective",
    "emphasis": "Advanced Programmable Logic Controllers"
  },
  "toCanonicalKey": "course:team-2040",
  "fromCanonicalKey": "program:automation-technology-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: Integrative Biology Emphasis Required Courses BIOL 1625 - College Biology II Laboratory
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "emphasis": "Integrative Biology Emphasis",
    "requirement_type": "emphasis"
  },
  "toCanonicalKey": "course:biol-1625",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:business-management-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12703&returnto=9720
- **Confidence**: 0.950
- **Citation**: MGT 2050 - Legal Environment of Business
- **Payload**: ```json
{
  "attributes": {
    "type": "required"
  },
  "toCanonicalKey": "course:mgt-2050",
  "fromCanonicalKey": "program:business-management-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12521&returnto=9720
- **Confidence**: 0.950
- **Citation**: MGT 2040 - Business Statistics
- **Payload**: ```json
{
  "attributes": {
    "required": true,
    "course_name": "Business Statistics"
  },
  "toCanonicalKey": "course:mgt-2040",
  "fromCanonicalKey": "program:business-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Biochemistry Electives : BIOL 1615 - College Biology I Lab
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Biochemistry Electives"
  },
  "toCanonicalKey": "course:biol-1615",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12521&returnto=9720
- **Confidence**: 0.850
- **Citation**: MATH 1050 College Algebra (QL) or MATH 1090 - College Algebra-Business (QL) is the recommended Quantitative Literacy course
- **Payload**: ```json
{
  "attributes": {
    "required": false,
    "course_name": "College Algebra",
    "recommendation": "Recommended for Quantitative Literacy",
    "general_education_designation": "QL"
  },
  "toCanonicalKey": "course:math-1050",
  "fromCanonicalKey": "program:business-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEM 1220 - General Chemistry II
- **Payload**: ```json
{
  "attributes": {
    "credits": 4,
    "category": "Program Requirements",
    "subcategory": "Required Courses"
  },
  "toCanonicalKey": "course:chem-1220",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEM 2315 - Organic Chemistry Lab I
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "category": "Program Requirements",
    "subcategory": "Required Courses"
  },
  "toCanonicalKey": "course:chem-2315",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Biochemistry Electives : ENVS 1400 - Environmental Science (LS)
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Biochemistry Electives"
  },
  "toCanonicalKey": "course:envs-1400",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 1300 - Money & Creative Professionals
- **Payload**: ```json
{
  "attributes": {
    "category": "Required Courses"
  },
  "toCanonicalKey": "course:musc-1300",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 2580 - Audio Production and Mixing for Live Performance
- **Payload**: ```json
{
  "attributes": {
    "category": "Recording Technology Emphasis",
    "emphasisRequired": true
  },
  "toCanonicalKey": "course:musc-2580",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: BIOL 1615 - College Biology I Lab
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:biol-1615",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: If beginning program with no prior programming experience , complete CS 1030 - Foundations of Computing as a program elective prior to starting the required courses below.
- **Payload**: ```json
{
  "attributes": {
    "condition": "if beginning program with no prior programming experience",
    "requirement_type": "conditional_elective"
  },
  "toCanonicalKey": "course:cs-1030",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 2520 - Music Scoring For Film
- **Payload**: ```json
{
  "attributes": {
    "category": "Composition/Songwriting Emphasis",
    "emphasisRequired": true
  },
  "toCanonicalKey": "course:musc-2520",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: HS 2500 - Community-Engaged Public Health: Introduction to the Social Determinants of Health
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:hs-2500",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: CSIS 1250 - Network Routing and Switching I
- **Payload**: ```json
{
  "attributes": {
    "emphasis_area": "Software Development",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:csis-1250",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 2340 - Cabinetmaking & Renewable Materials II
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cmgt-2340",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: ARCH 1310 - Intro. to AutoCAD
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:arch-1310",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 1340 - Cabinetmaking & Renewable Materials I
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cmgt-1340",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-and-sustainable-building-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12555&returnto=9720
- **Confidence**: 0.950
- **Citation**: SVT 1030 - Surveying Field Techniques I
- **Payload**: ```json
{
  "attributes": {
    "credits": null,
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:svt-1030",
  "fromCanonicalKey": "program:construction-management-and-sustainable-building-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:concrete-masonry-apprenticeship-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12776&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (12 credits) TECN 1200 - Concrete Masonry 2A
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:tecn-1200",
  "fromCanonicalKey": "program:concrete-masonry-apprenticeship-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:construction-management-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12554&returnto=9720
- **Confidence**: 0.900
- **Citation**: Social Science (SS): ECON 2010
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "category": "Social Science (SS)"
  },
  "toCanonicalKey": "course:econ-2010",
  "fromCanonicalKey": "program:construction-management-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:criminal-justice-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12559&returnto=9720
- **Confidence**: 0.950
- **Citation**: CJ 1350 - Introduction to Forensic Science
- **Payload**: ```json
{
  "attributes": {
    "courseType": "required"
  },
  "toCanonicalKey": "course:cj-1350",
  "fromCanonicalKey": "program:criminal-justice-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:culinary-arts-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12561&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEF 1400 - Food Preparation II
- **Payload**: ```json
{
  "attributes": {
    "trackSpecific": "Culinary Track"
  },
  "toCanonicalKey": "course:chef-1400",
  "fromCanonicalKey": "program:culinary-arts-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:economics-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12565&returnto=9720
- **Confidence**: 0.950
- **Citation**: ECON 2010 - Principles of Microeconomics (SS)
- **Payload**: ```json
{
  "attributes": {
    "required": true
  },
  "toCanonicalKey": "course:econ-2010",
  "fromCanonicalKey": "program:economics-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 1140 - Dental Materials
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-1140",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:dental-hygiene-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12562&returnto=9720
- **Confidence**: 0.900
- **Citation**: DH 2600 - Dental Hygiene Theory IV
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "core_program"
  },
  "toCanonicalKey": "course:dh-2600",
  "fromCanonicalKey": "program:dental-hygiene-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:electrical-apprenticeship-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12783&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEEL 1110 - Electrician Apprentice IA
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:teel-1110",
  "fromCanonicalKey": "program:electrical-apprenticeship-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:economics-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12565&returnto=9720
- **Confidence**: 0.900
- **Citation**: BUS 1100 - Applied Business Calculus
- **Payload**: ```json
{
  "attributes": {
    "credits": 6,
    "elective": true,
    "required": false
  },
  "toCanonicalKey": "course:bus-1100",
  "fromCanonicalKey": "program:economics-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:aerospace-aviation-technology-maintenance-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12482&returnto=9720
- **Confidence**: 0.950
- **Citation**: AMTT 1120 - Generals I - Aviation Fundamentals
- **Payload**: ```json
{
  "attributes": {
    "credits": null
  },
  "toCanonicalKey": "course:amtt-1120",
  "fromCanonicalKey": "program:aerospace-aviation-technology-maintenance-aas",
  "relationshipType": "requires"
}
```

### requires — `program:aerospace-aviation-technology-maintenance-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12482&returnto=9720
- **Confidence**: 0.950
- **Citation**: AMTT 1140 - Generals II - Aviation Fundamentals
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:amtt-1140",
  "fromCanonicalKey": "program:aerospace-aviation-technology-maintenance-aas",
  "relationshipType": "requires"
}
```

### requires — `program:aerospace-aviation-technology-maintenance-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12482&returnto=9720
- **Confidence**: 0.950
- **Citation**: AMTT 1220 - Airframe Systems I - Sheet Metal & Non-Metallic Structures
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:amtt-1220",
  "fromCanonicalKey": "program:aerospace-aviation-technology-maintenance-aas",
  "relationshipType": "requires"
}
```

### requires — `program:aerospace-aviation-technology-maintenance-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12482&returnto=9720
- **Confidence**: 0.950
- **Citation**: AMTT 1240 - Airframe Systems II - Aircraft Systems
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:amtt-1240",
  "fromCanonicalKey": "program:aerospace-aviation-technology-maintenance-aas",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-facilities-maintenance-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12496&returnto=9720
- **Confidence**: 0.920
- **Citation**: FMTA 1220 - Maintenance Plumbing
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "Required Course"
  },
  "toCanonicalKey": "course:fmta-1220",
  "fromCanonicalKey": "program:apprenticeship-facilities-maintenance-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:architecture-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12506&returnto=9720
- **Confidence**: 0.950
- **Citation**: ARCH 2630 - Design Foundations Workshop (AR)
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:arch-2630",
  "fromCanonicalKey": "program:architecture-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:advanced-manufacturing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12764&returnto=9720
- **Confidence**: 0.950
- **Citation**: EDDT 2340 - Manufacturing Processes
- **Payload**: ```json
{
  "attributes": {
    "course_name": "Manufacturing Processes",
    "course_type": "required"
  },
  "toCanonicalKey": "course:eddt-2340",
  "fromCanonicalKey": "program:advanced-manufacturing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:advanced-manufacturing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12764&returnto=9720
- **Confidence**: 0.950
- **Citation**: MFET 2410 - Quality Concepts and Statistical Applications
- **Payload**: ```json
{
  "attributes": {
    "course_name": "Quality Concepts and Statistical Applications",
    "course_type": "required"
  },
  "toCanonicalKey": "course:mfet-2410",
  "fromCanonicalKey": "program:advanced-manufacturing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:advanced-manufacturing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12764&returnto=9720
- **Confidence**: 0.950
- **Citation**: EDDT 1600 - CNC Programming and CNC Machining Theory and Lab
- **Payload**: ```json
{
  "attributes": {
    "course_name": "CNC Programming and CNC Machining Theory and Lab",
    "course_type": "elective"
  },
  "toCanonicalKey": "course:eddt-1600",
  "fromCanonicalKey": "program:advanced-manufacturing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:advanced-manufacturing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12764&returnto=9720
- **Confidence**: 0.950
- **Citation**: EDDT 2990 - Special Topics
- **Payload**: ```json
{
  "attributes": {
    "course_name": "Special Topics",
    "course_type": "elective"
  },
  "toCanonicalKey": "course:eddt-2990",
  "fromCanonicalKey": "program:advanced-manufacturing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:advanced-manufacturing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12764&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEET 1190 - Troubleshooting
- **Payload**: ```json
{
  "attributes": {
    "course_name": "Troubleshooting",
    "course_type": "elective"
  },
  "toCanonicalKey": "course:teet-1190",
  "fromCanonicalKey": "program:advanced-manufacturing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:advanced-manufacturing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12764&returnto=9720
- **Confidence**: 0.950
- **Citation**: WLD 1005 - Related Welding Time to Completion & Graduation Map
- **Payload**: ```json
{
  "attributes": {
    "course_name": "Related Welding Time to Completion & Graduation Map",
    "course_type": "elective"
  },
  "toCanonicalKey": "course:wld-1005",
  "fromCanonicalKey": "program:advanced-manufacturing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:advanced-manufacturing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12764&returnto=9720
- **Confidence**: 0.900
- **Citation**: ENGR 1070 - Robotics in the World (PS) is recommended.
- **Payload**: ```json
{
  "attributes": {
    "note": "recommended for Physical Science requirement",
    "course_name": "Robotics in the World",
    "course_type": "general_education"
  },
  "toCanonicalKey": "course:engr-1070",
  "fromCanonicalKey": "program:advanced-manufacturing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-facilities-maintenance-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12496&returnto=9720
- **Confidence**: 0.920
- **Citation**: FMTA 2310 - Maintenance Constr/Mechanic
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "Required Course"
  },
  "toCanonicalKey": "course:fmta-2310",
  "fromCanonicalKey": "program:apprenticeship-facilities-maintenance-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:advanced-manufacturing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12764&returnto=9720
- **Confidence**: 0.900
- **Citation**: COMM 1010 - Elements of Effective Communication (CM)
- **Payload**: ```json
{
  "attributes": {
    "note": "recommended for Communication",
    "course_name": "Elements of Effective Communication",
    "course_type": "general_education"
  },
  "toCanonicalKey": "course:comm-1010",
  "fromCanonicalKey": "program:advanced-manufacturing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:business-management-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12703&returnto=9720
- **Confidence**: 0.950
- **Citation**: MGT 1600 - Management Essentials
- **Payload**: ```json
{
  "attributes": {
    "type": "required"
  },
  "toCanonicalKey": "course:mgt-1600",
  "fromCanonicalKey": "program:business-management-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-english-interpreting-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720
- **Confidence**: 0.900
- **Citation**: INTR 1100 - Connections to Community I
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:intr-1100",
  "fromCanonicalKey": "program:american-sign-language-english-interpreting-aas",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-english-interpreting-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720
- **Confidence**: 0.900
- **Citation**: INTR 1110 - Connections to Community II
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:intr-1110",
  "fromCanonicalKey": "program:american-sign-language-english-interpreting-aas",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-english-interpreting-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720
- **Confidence**: 0.900
- **Citation**: INTR 1300 - Ethics/Professional Standards
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:intr-1300",
  "fromCanonicalKey": "program:american-sign-language-english-interpreting-aas",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-english-interpreting-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720
- **Confidence**: 0.900
- **Citation**: INTR 1400 - Interpreting II
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:intr-1400",
  "fromCanonicalKey": "program:american-sign-language-english-interpreting-aas",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-english-interpreting-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720
- **Confidence**: 0.900
- **Citation**: INTR 1500 - Comparative Linguistics
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:intr-1500",
  "fromCanonicalKey": "program:american-sign-language-english-interpreting-aas",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-english-interpreting-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720
- **Confidence**: 0.900
- **Citation**: INTR 2100 - Connections to Community III
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:intr-2100",
  "fromCanonicalKey": "program:american-sign-language-english-interpreting-aas",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-english-interpreting-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720
- **Confidence**: 0.900
- **Citation**: INTR 2400 - ASL/English Interpreting IV
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:intr-2400",
  "fromCanonicalKey": "program:american-sign-language-english-interpreting-aas",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-english-interpreting-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720
- **Confidence**: 0.900
- **Citation**: INTR 2600 - Internship II
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:intr-2600",
  "fromCanonicalKey": "program:american-sign-language-english-interpreting-aas",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-english-interpreting-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720
- **Confidence**: 0.900
- **Citation**: INTR 2910 - Educational Interpreting
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:intr-2910",
  "fromCanonicalKey": "program:american-sign-language-english-interpreting-aas",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-english-interpreting-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720
- **Confidence**: 0.900
- **Citation**: INTR 2920 - VRS Interpreting
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:intr-2920",
  "fromCanonicalKey": "program:american-sign-language-english-interpreting-aas",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-english-interpreting-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12484&returnto=9720
- **Confidence**: 0.900
- **Citation**: INTR 2930 - Community Interpreting
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:intr-2930",
  "fromCanonicalKey": "program:american-sign-language-english-interpreting-aas",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-facilities-maintenance-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12496&returnto=9720
- **Confidence**: 0.920
- **Citation**: FMTA 2320 - Maintenance Pipefitting
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "Required Course"
  },
  "toCanonicalKey": "course:fmta-2320",
  "fromCanonicalKey": "program:apprenticeship-facilities-maintenance-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-facilities-maintenance-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12496&returnto=9720
- **Confidence**: 0.920
- **Citation**: FMTA 1210 - Maintenance HVAC
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "Required Course"
  },
  "toCanonicalKey": "course:fmta-1210",
  "fromCanonicalKey": "program:apprenticeship-facilities-maintenance-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-aa`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12483&returnto=9720
- **Confidence**: 0.850
- **Citation**: RECOMMENDED: Quantitative Literacy (QL): MATH 1030 or MATH 1035
- **Payload**: ```json
{
  "attributes": {
    "category": "Quantitative Literacy",
    "isElective": true,
    "recommended": true
  },
  "toCanonicalKey": "course:math-1030",
  "fromCanonicalKey": "program:american-sign-language-aa",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-aa`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12483&returnto=9720
- **Confidence**: 0.850
- **Citation**: Arts (AR): THEA 1033 , FLM 1070 , or DANC 1010
- **Payload**: ```json
{
  "attributes": {
    "category": "Arts",
    "isElective": true
  },
  "toCanonicalKey": "course:thea-1033",
  "fromCanonicalKey": "program:american-sign-language-aa",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-aa`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12483&returnto=9720
- **Confidence**: 0.850
- **Citation**: Arts (AR): THEA 1033 , FLM 1070 , or DANC 1010
- **Payload**: ```json
{
  "attributes": {
    "category": "Arts",
    "isElective": true
  },
  "toCanonicalKey": "course:danc-1010",
  "fromCanonicalKey": "program:american-sign-language-aa",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-aa`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12483&returnto=9720
- **Confidence**: 0.850
- **Citation**: Humanities (HU): COMM 1020 , ENGL 1050 , ENGL 2610 , HIST 2200 , or PHIL 2050
- **Payload**: ```json
{
  "attributes": {
    "category": "Humanities",
    "isElective": true
  },
  "toCanonicalKey": "course:engl-2610",
  "fromCanonicalKey": "program:american-sign-language-aa",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-aa`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12483&returnto=9720
- **Confidence**: 0.850
- **Citation**: Humanities (HU): COMM 1020 , ENGL 1050 , ENGL 2610 , HIST 2200 , or PHIL 2050
- **Payload**: ```json
{
  "attributes": {
    "category": "Humanities",
    "isElective": true
  },
  "toCanonicalKey": "course:hist-2200",
  "fromCanonicalKey": "program:american-sign-language-aa",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-aa`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12483&returnto=9720
- **Confidence**: 0.850
- **Citation**: Humanities (HU): COMM 1020 , ENGL 1050 , ENGL 2610 , HIST 2200 , or PHIL 2050
- **Payload**: ```json
{
  "attributes": {
    "category": "Humanities",
    "isElective": true
  },
  "toCanonicalKey": "course:phil-2050",
  "fromCanonicalKey": "program:american-sign-language-aa",
  "relationshipType": "requires"
}
```

### requires — `program:advanced-emergency-medical-technician-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12988&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (6 credits) TEEM 1202 - Advanced Emergency Medical Technicians
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:teem-1202",
  "fromCanonicalKey": "program:advanced-emergency-medical-technician-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-aa`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12483&returnto=9720
- **Confidence**: 0.850
- **Citation**: Social Science (SS): ANTH 1040 , CJ 1010 , COMM 2110 , or EDU 1400
- **Payload**: ```json
{
  "attributes": {
    "category": "Social Science",
    "isElective": true
  },
  "toCanonicalKey": "course:cj-1010",
  "fromCanonicalKey": "program:american-sign-language-aa",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-aa`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12483&returnto=9720
- **Confidence**: 0.850
- **Citation**: Social Science (SS): ANTH 1040 , CJ 1010 , COMM 2110 , or EDU 1400
- **Payload**: ```json
{
  "attributes": {
    "category": "Social Science",
    "isElective": true
  },
  "toCanonicalKey": "course:comm-2110",
  "fromCanonicalKey": "program:american-sign-language-aa",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-aa`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12483&returnto=9720
- **Confidence**: 0.850
- **Citation**: Social Science (SS): ANTH 1040 , CJ 1010 , COMM 2110 , or EDU 1400
- **Payload**: ```json
{
  "attributes": {
    "category": "Social Science",
    "isElective": true
  },
  "toCanonicalKey": "course:edu-1400",
  "fromCanonicalKey": "program:american-sign-language-aa",
  "relationshipType": "requires"
}
```

### requires — `program:american-sign-language-aa`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12483&returnto=9720
- **Confidence**: 0.850
- **Citation**: For students intending to transfer into a Bachelor of Arts (B.A.) program, the language requirement may be satisfied by completing four progressive semesters of language courses ( LANG 2020) or an equivalent assessment.
- **Payload**: ```json
{
  "attributes": {
    "alternativeToAsl": true,
    "requiredSemesters": 4,
    "isLanguageRequirement": true
  },
  "toCanonicalKey": "course:lang-2020",
  "fromCanonicalKey": "program:american-sign-language-aa",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-facilities-maintenance-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12496&returnto=9720
- **Confidence**: 0.920
- **Citation**: FMTA 1120 - Maintenance Electricity II
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "Required Course"
  },
  "toCanonicalKey": "course:fmta-1120",
  "fromCanonicalKey": "program:apprenticeship-facilities-maintenance-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-facilities-maintenance-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12496&returnto=9720
- **Confidence**: 0.920
- **Citation**: REQUIRED: Quantitative Studies (QS): FMTA 1470 - Math for the Trades (QS)
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "General Education - Quantitative Studies"
  },
  "toCanonicalKey": "course:fmta-1470",
  "fromCanonicalKey": "program:apprenticeship-facilities-maintenance-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-facilities-maintenance-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12496&returnto=9720
- **Confidence**: 0.920
- **Citation**: FMTA 1110 - Maintenance Electricity I
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "Required Course"
  },
  "toCanonicalKey": "course:fmta-1110",
  "fromCanonicalKey": "program:apprenticeship-facilities-maintenance-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-electrical-independent-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12495&returnto=9720
- **Confidence**: 0.900
- **Citation**: All entering students must demonstrate competence for placement into MATH 1010 , or provide a transcript showing a grade of C or higher in MATH 0990 or equivalent, or complete ELI 1470 (Math for the Trades) with a grade of C or higher.
- **Payload**: ```json
{
  "attributes": {
    "alternative": true
  },
  "toCanonicalKey": "course:math-1010",
  "fromCanonicalKey": "program:apprenticeship-electrical-independent-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-electrical-independent-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12495&returnto=9720
- **Confidence**: 0.900
- **Citation**: RECOMMENDED: Quantitative Studies (QS): ELI 1470 - Math for the Trades (QS) (Preferred) OR MATH 1010 - Intermediate Algebra (QS) or higher
- **Payload**: ```json
{
  "attributes": {
    "preferred": true,
    "alternative": true
  },
  "toCanonicalKey": "course:eli-1470",
  "fromCanonicalKey": "program:apprenticeship-electrical-independent-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-electrical-independent-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12495&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEEL 1110 - Electrician Apprentice IA
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:teel-1110",
  "fromCanonicalKey": "program:apprenticeship-electrical-independent-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-electrical-independent-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12495&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEEL 1410 - Electrician Apprentice IVA
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:teel-1410",
  "fromCanonicalKey": "program:apprenticeship-electrical-independent-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-electrical-independent-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12495&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEEL 1120 - Electrician Apprentice IB
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:teel-1120",
  "fromCanonicalKey": "program:apprenticeship-electrical-independent-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-electrical-independent-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12495&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEEL 1210 - Electrician Apprentice IIA
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:teel-1210",
  "fromCanonicalKey": "program:apprenticeship-electrical-independent-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-electrical-independent-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12495&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEEL 1220 - Electrician Apprentice IIB
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:teel-1220",
  "fromCanonicalKey": "program:apprenticeship-electrical-independent-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-electrical-independent-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12495&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEEL 1310 - Electrician Apprentice IIIA
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:teel-1310",
  "fromCanonicalKey": "program:apprenticeship-electrical-independent-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-electrical-independent-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12495&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEEL 1320 - Electrician Apprentice IIIB
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:teel-1320",
  "fromCanonicalKey": "program:apprenticeship-electrical-independent-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-electrical-independent-technology-aas`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12495&returnto=9720
- **Confidence**: 0.950
- **Citation**: TEEL 1420 - Electrician Apprentice IVB
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:teel-1420",
  "fromCanonicalKey": "program:apprenticeship-electrical-independent-technology-aas",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12497&returnto=9720
- **Confidence**: 0.920
- **Citation**: REQUIRED: Quantitative Studies (QS): HVAC 1470 - Math Basics for HVAC (QS)
- **Payload**: ```json
{
  "attributes": {
    "courseType": "Math Basics for HVAC",
    "requirement": "Quantitative Studies"
  },
  "toCanonicalKey": "course:hvac-1470",
  "fromCanonicalKey": "program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12497&returnto=9720
- **Confidence**: 0.920
- **Citation**: HVAC 1110 - HVAC I A
- **Payload**: ```json
{
  "attributes": {
    "courseType": "Required"
  },
  "toCanonicalKey": "course:hvac-1110",
  "fromCanonicalKey": "program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12497&returnto=9720
- **Confidence**: 0.920
- **Citation**: HVAC 1120 - HVAC IB
- **Payload**: ```json
{
  "attributes": {
    "courseType": "Required"
  },
  "toCanonicalKey": "course:hvac-1120",
  "fromCanonicalKey": "program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12497&returnto=9720
- **Confidence**: 0.920
- **Citation**: HVAC 1210 - HVAC IIA
- **Payload**: ```json
{
  "attributes": {
    "courseType": "Required"
  },
  "toCanonicalKey": "course:hvac-1210",
  "fromCanonicalKey": "program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12497&returnto=9720
- **Confidence**: 0.920
- **Citation**: HVAC 1220 - HVAC IIB
- **Payload**: ```json
{
  "attributes": {
    "courseType": "Required"
  },
  "toCanonicalKey": "course:hvac-1220",
  "fromCanonicalKey": "program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12497&returnto=9720
- **Confidence**: 0.920
- **Citation**: HVAC 2310 - HVAC IIIA
- **Payload**: ```json
{
  "attributes": {
    "courseType": "Required"
  },
  "toCanonicalKey": "course:hvac-2310",
  "fromCanonicalKey": "program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12497&returnto=9720
- **Confidence**: 0.920
- **Citation**: HVAC 2320 - HVAC IIIB
- **Payload**: ```json
{
  "attributes": {
    "courseType": "Required"
  },
  "toCanonicalKey": "course:hvac-2320",
  "fromCanonicalKey": "program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12497&returnto=9720
- **Confidence**: 0.920
- **Citation**: HVAC 2410 - HVAC IVA
- **Payload**: ```json
{
  "attributes": {
    "courseType": "Required"
  },
  "toCanonicalKey": "course:hvac-2410",
  "fromCanonicalKey": "program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12497&returnto=9720
- **Confidence**: 0.920
- **Citation**: HVAC 2420 - HVAC IVB
- **Payload**: ```json
{
  "attributes": {
    "courseType": "Required"
  },
  "toCanonicalKey": "course:hvac-2420",
  "fromCanonicalKey": "program:apprenticeship-heating-cooling-refrigeration-hvac-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:architecture-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12506&returnto=9720
- **Confidence**: 0.950
- **Citation**: ARCH 1010 - Design Contexts
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:arch-1010",
  "fromCanonicalKey": "program:architecture-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:architecture-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12506&returnto=9720
- **Confidence**: 0.950
- **Citation**: ARCH 1630 - Basic Architectural Communication I
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:arch-1630",
  "fromCanonicalKey": "program:architecture-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:architecture-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12506&returnto=9720
- **Confidence**: 0.950
- **Citation**: ARCH 1632 - Basic Architectural Communication II
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:arch-1632",
  "fromCanonicalKey": "program:architecture-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:architecture-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12506&returnto=9720
- **Confidence**: 0.950
- **Citation**: ARCH 2010 - Design Ecologies
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:arch-2010",
  "fromCanonicalKey": "program:architecture-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:architecture-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12506&returnto=9720
- **Confidence**: 0.950
- **Citation**: ARCH 2030 - Basic Architectural Communication III
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:arch-2030",
  "fromCanonicalKey": "program:architecture-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:architecture-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12506&returnto=9720
- **Confidence**: 0.950
- **Citation**: ARCH 2212 - Survey of World Architecture I
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:arch-2212",
  "fromCanonicalKey": "program:architecture-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:architecture-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12506&returnto=9720
- **Confidence**: 0.950
- **Citation**: ARCH 2213 - Survey of World Architecture II
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:arch-2213",
  "fromCanonicalKey": "program:architecture-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:architecture-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12506&returnto=9720
- **Confidence**: 0.950
- **Citation**: ARCH 2632 - Advanced Architectural Design Workshop
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:arch-2632",
  "fromCanonicalKey": "program:architecture-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:architecture-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12506&returnto=9720
- **Confidence**: 0.950
- **Citation**: ARCH 2634 - Design Fundamentals Studio
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:arch-2634",
  "fromCanonicalKey": "program:architecture-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:architecture-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12506&returnto=9720
- **Confidence**: 0.950
- **Citation**: MATH 1210 - Calculus I (QL)
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:math-1210",
  "fromCanonicalKey": "program:architecture-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:architecture-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12506&returnto=9720
- **Confidence**: 0.900
- **Citation**: ENGL 2100 - Technical Writing (WC)
- **Payload**: ```json
{
  "attributes": {
    "note": "recommended"
  },
  "toCanonicalKey": "course:engl-2100",
  "fromCanonicalKey": "program:architecture-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:architecture-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12506&returnto=9720
- **Confidence**: 0.900
- **Citation**: Arts (AR) : ART 1080 - Photoshop & Digital Media (AR)
- **Payload**: ```json
{
  "attributes": {
    "note": "recommended"
  },
  "toCanonicalKey": "course:art-1080",
  "fromCanonicalKey": "program:architecture-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:automotive-collision-repair-and-refinishing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12509&returnto=9720
- **Confidence**: 0.900
- **Citation**: REQUIRED: Quantitative Studies (QS): IND 1120
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "Quantitative Studies (QS)"
  },
  "toCanonicalKey": "course:ind-1120",
  "fromCanonicalKey": "program:automotive-collision-repair-and-refinishing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:automotive-collision-repair-and-refinishing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12509&returnto=9720
- **Confidence**: 0.900
- **Citation**: AR 1230 - Auto Color and Design Theory
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:ar-1230",
  "fromCanonicalKey": "program:automotive-collision-repair-and-refinishing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:automotive-collision-repair-and-refinishing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12509&returnto=9720
- **Confidence**: 0.900
- **Citation**: ACR 1100 - Metallurgy/Nonstructural Parts
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:acr-1100",
  "fromCanonicalKey": "program:automotive-collision-repair-and-refinishing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:automotive-collision-repair-and-refinishing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12509&returnto=9720
- **Confidence**: 0.900
- **Citation**: ACR 1111 - Non-structural Skill/Appl Dev
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:acr-1111",
  "fromCanonicalKey": "program:automotive-collision-repair-and-refinishing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:automotive-collision-repair-and-refinishing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12509&returnto=9720
- **Confidence**: 0.900
- **Citation**: ACR 1200 - Struct. Analysis/Damage Repair
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:acr-1200",
  "fromCanonicalKey": "program:automotive-collision-repair-and-refinishing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:automotive-collision-repair-and-refinishing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12509&returnto=9720
- **Confidence**: 0.900
- **Citation**: ACR 1211 - Structural Damage Repair
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:acr-1211",
  "fromCanonicalKey": "program:automotive-collision-repair-and-refinishing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:automotive-collision-repair-and-refinishing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12509&returnto=9720
- **Confidence**: 0.900
- **Citation**: AR 1100 - Automotive Refinishing
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:ar-1100",
  "fromCanonicalKey": "program:automotive-collision-repair-and-refinishing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:automotive-collision-repair-and-refinishing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12509&returnto=9720
- **Confidence**: 0.900
- **Citation**: AR 1111 - Refinishing Skill Development
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:ar-1111",
  "fromCanonicalKey": "program:automotive-collision-repair-and-refinishing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:automotive-collision-repair-and-refinishing-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12509&returnto=9720
- **Confidence**: 0.900
- **Citation**: AR 1211 - Advanced Skill Development
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:ar-1211",
  "fromCanonicalKey": "program:automotive-collision-repair-and-refinishing-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:automation-technology-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (21 credits) TEAM 1010 - Essential Skills and Safety
- **Payload**: ```json
{
  "attributes": {
    "credits": "Required"
  },
  "toCanonicalKey": "course:team-1010",
  "fromCanonicalKey": "program:automation-technology-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:automation-technology-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (21 credits) TEAM 1020 - Pneumatics
- **Payload**: ```json
{
  "attributes": {
    "credits": "Required"
  },
  "toCanonicalKey": "course:team-1020",
  "fromCanonicalKey": "program:automation-technology-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:automation-technology-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (21 credits) TEAM 1030 - Hydraulics
- **Payload**: ```json
{
  "attributes": {
    "credits": "Required"
  },
  "toCanonicalKey": "course:team-1030",
  "fromCanonicalKey": "program:automation-technology-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:automation-technology-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (21 credits) TEAM 1040 - Industrial Mechanics
- **Payload**: ```json
{
  "attributes": {
    "credits": "Required"
  },
  "toCanonicalKey": "course:team-1040",
  "fromCanonicalKey": "program:automation-technology-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:automation-technology-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (21 credits) TEAM 1050 - Electrical Systems
- **Payload**: ```json
{
  "attributes": {
    "credits": "Required"
  },
  "toCanonicalKey": "course:team-1050",
  "fromCanonicalKey": "program:automation-technology-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:automation-technology-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (21 credits) TEAM 1060 - Motor Controls
- **Payload**: ```json
{
  "attributes": {
    "credits": "Required"
  },
  "toCanonicalKey": "course:team-1060",
  "fromCanonicalKey": "program:automation-technology-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:automation-technology-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (21 credits) TEAM 1070 - Programmable Logic Controllers
- **Payload**: ```json
{
  "attributes": {
    "credits": "Required"
  },
  "toCanonicalKey": "course:team-1070",
  "fromCanonicalKey": "program:automation-technology-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:automation-technology-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (21 credits) TEAM 1080 - Applied System Diagnostics
- **Payload**: ```json
{
  "attributes": {
    "credits": "Required"
  },
  "toCanonicalKey": "course:team-1080",
  "fromCanonicalKey": "program:automation-technology-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:automation-technology-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.900
- **Citation**: Emphasis Advanced Programmable Logic Controllers TEAM 2025 - HMI Programming
- **Payload**: ```json
{
  "attributes": {
    "credits": "Elective",
    "emphasis": "Advanced Programmable Logic Controllers"
  },
  "toCanonicalKey": "course:team-2025",
  "fromCanonicalKey": "program:automation-technology-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:automation-technology-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.900
- **Citation**: Emphasis Advanced Programmable Logic Controllers TEAM 2080 - PLC Capstone Project
- **Payload**: ```json
{
  "attributes": {
    "credits": "Elective",
    "emphasis": "Advanced Programmable Logic Controllers"
  },
  "toCanonicalKey": "course:team-2080",
  "fromCanonicalKey": "program:automation-technology-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:automation-technology-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.900
- **Citation**: Emphasis Process Control Level/Flow TEAM 1520 - Process Control Level/Flow
- **Payload**: ```json
{
  "attributes": {
    "credits": "Elective",
    "emphasis": "Process Control Level/Flow"
  },
  "toCanonicalKey": "course:team-1520",
  "fromCanonicalKey": "program:automation-technology-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:automation-technology-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.900
- **Citation**: Emphasis Process Control Level/Flow TEAM 1580 - Process Capstone Project
- **Payload**: ```json
{
  "attributes": {
    "credits": "Elective",
    "emphasis": "Process Control Level/Flow"
  },
  "toCanonicalKey": "course:team-1580",
  "fromCanonicalKey": "program:automation-technology-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:automation-technology-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.900
- **Citation**: TEAM 2200 - Troubleshooting Automated Systems
- **Payload**: ```json
{
  "attributes": {
    "credits": "Elective",
    "emphasis": "Process Control Level/Flow or Motor Control Systems"
  },
  "toCanonicalKey": "course:team-2200",
  "fromCanonicalKey": "program:automation-technology-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:automation-technology-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.900
- **Citation**: Emphasis Motor Control Systems TEAM 1610 - Electric Motor Control Systems
- **Payload**: ```json
{
  "attributes": {
    "credits": "Elective",
    "emphasis": "Motor Control Systems"
  },
  "toCanonicalKey": "course:team-1610",
  "fromCanonicalKey": "program:automation-technology-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:automation-technology-technical-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12571&returnto=9720
- **Confidence**: 0.900
- **Citation**: Emphasis Motor Control Systems TEAM 1680 - Motor Capstone Project
- **Payload**: ```json
{
  "attributes": {
    "credits": "Elective",
    "emphasis": "Motor Control Systems"
  },
  "toCanonicalKey": "course:team-1680",
  "fromCanonicalKey": "program:automation-technology-technical-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:automotive-collision-repair-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12512&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (32 Credits) ACR 1100 - Metallurgy/Nonstructural Parts
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:acr-1100",
  "fromCanonicalKey": "program:automotive-collision-repair-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:automotive-collision-repair-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12512&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (32 Credits) ACR 1111 - Non-structural Skill/Appl Dev
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:acr-1111",
  "fromCanonicalKey": "program:automotive-collision-repair-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:automotive-collision-repair-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12512&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (32 Credits) ACR 1200 - Struct. Analysis/Damage Repair
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:acr-1200",
  "fromCanonicalKey": "program:automotive-collision-repair-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:automotive-collision-repair-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12512&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (32 Credits) ACR 1211 - Structural Damage Repair
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:acr-1211",
  "fromCanonicalKey": "program:automotive-collision-repair-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:automotive-collision-repair-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12512&returnto=9720
- **Confidence**: 0.950
- **Citation**: Required Courses (32 Credits) IND 1120 - Math for Industry (QS)
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:ind-1120",
  "fromCanonicalKey": "program:automotive-collision-repair-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:behavioral-health-technician-academic-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12788&returnto=9720
- **Confidence**: 0.950
- **Citation**: SW 1010 - Social Work and Social Welfare: The Profession and Institution
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:sw-1010",
  "fromCanonicalKey": "program:behavioral-health-technician-academic-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:behavioral-health-technician-academic-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12788&returnto=9720
- **Confidence**: 0.950
- **Citation**: SW 2100 - Human Behavior in the Social Environment
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:sw-2100",
  "fromCanonicalKey": "program:behavioral-health-technician-academic-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:behavioral-health-technician-academic-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12788&returnto=9720
- **Confidence**: 0.950
- **Citation**: SW 2715 - Introduction to Dynamics of Addiction
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:sw-2715",
  "fromCanonicalKey": "program:behavioral-health-technician-academic-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:behavioral-health-technician-academic-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12788&returnto=9720
- **Confidence**: 0.950
- **Citation**: 4 credits of SW 2940 - Social Work and Behavioral Health Technician Internship
- **Payload**: ```json
{
  "attributes": {
    "credits": 4
  },
  "toCanonicalKey": "course:sw-2940",
  "fromCanonicalKey": "program:behavioral-health-technician-academic-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:behavioral-health-technician-academic-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12788&returnto=9720
- **Confidence**: 0.950
- **Citation**: SW 2990 - Practice for Behavioral Health
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:sw-2990",
  "fromCanonicalKey": "program:behavioral-health-technician-academic-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:behavioral-health-technician-academic-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12788&returnto=9720
- **Confidence**: 0.950
- **Citation**: SW 2750 - Ethics and the Social Work Professional
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:sw-2750",
  "fromCanonicalKey": "program:behavioral-health-technician-academic-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:behavioral-health-technician-academic-certificate`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12788&returnto=9720
- **Confidence**: 0.950
- **Citation**: SW 2720 - Case Management and Mental Health
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:sw-2720",
  "fromCanonicalKey": "program:behavioral-health-technician-academic-certificate",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: Life Sciences (LS): BIOL 1610 - College Biology I (LS)
- **Payload**: ```json
{
  "attributes": {
    "category": "Life Sciences",
    "requirement_type": "general_education"
  },
  "toCanonicalKey": "course:biol-1610",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: All areas of emphasis require the following Biology AS Core Courses: BIOL 1615 - College Biology I Lab
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "requirement_type": "core"
  },
  "toCanonicalKey": "course:biol-1615",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: All areas of emphasis require the following Biology AS Core Courses: BIOL 2030 - Genetics
- **Payload**: ```json
{
  "attributes": {
    "credits": 4,
    "requirement_type": "core"
  },
  "toCanonicalKey": "course:biol-2030",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: All areas of emphasis require the following Biology AS Core Courses: CHEM 1210 - General Chemistry I
- **Payload**: ```json
{
  "attributes": {
    "credits": 4,
    "requirement_type": "core"
  },
  "toCanonicalKey": "course:chem-1210",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: All areas of emphasis require the following Biology AS Core Courses: CHEM 1215 - General Chemistry Lab I
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "requirement_type": "core"
  },
  "toCanonicalKey": "course:chem-1215",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: All areas of emphasis require the following Biology AS Core Courses: CHEM 1220 - General Chemistry II
- **Payload**: ```json
{
  "attributes": {
    "credits": 4,
    "requirement_type": "core"
  },
  "toCanonicalKey": "course:chem-1220",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: All areas of emphasis require the following Biology AS Core Courses: CHEM 1225 - General Chemistry Lab II
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "requirement_type": "core"
  },
  "toCanonicalKey": "course:chem-1225",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: Anatomy and Physiology Emphasis Required Courses BIOL 2320 - Human Anatomy
- **Payload**: ```json
{
  "attributes": {
    "credits": 4,
    "emphasis": "Anatomy and Physiology Emphasis",
    "requirement_type": "emphasis"
  },
  "toCanonicalKey": "course:biol-2320",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: Anatomy and Physiology Emphasis Required Courses BIOL 2325 - Human Anatomy Lab
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "emphasis": "Anatomy and Physiology Emphasis",
    "requirement_type": "emphasis"
  },
  "toCanonicalKey": "course:biol-2325",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: Anatomy and Physiology Emphasis Required Courses BIOL 2420 - Human Physiology
- **Payload**: ```json
{
  "attributes": {
    "credits": 4,
    "emphasis": "Anatomy and Physiology Emphasis",
    "requirement_type": "emphasis"
  },
  "toCanonicalKey": "course:biol-2420",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: Anatomy and Physiology Emphasis Required Courses BIOL 2425 - Human Physiology Lab
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "emphasis": "Anatomy and Physiology Emphasis",
    "requirement_type": "emphasis"
  },
  "toCanonicalKey": "course:biol-2425",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: Integrative Biology Emphasis Required Courses BIOL 1620 - College Biology II
- **Payload**: ```json
{
  "attributes": {
    "credits": 4,
    "emphasis": "Integrative Biology Emphasis",
    "requirement_type": "emphasis"
  },
  "toCanonicalKey": "course:biol-1620",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: Integrative Biology Emphasis Required Courses BIOL 2020 - Cell Biology
- **Payload**: ```json
{
  "attributes": {
    "credits": 4,
    "emphasis": "Integrative Biology Emphasis",
    "requirement_type": "emphasis"
  },
  "toCanonicalKey": "course:biol-2020",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: Integrative Biology Emphasis Required Courses BIOL 2025 - Cell Biology Lab
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "emphasis": "Integrative Biology Emphasis",
    "requirement_type": "emphasis"
  },
  "toCanonicalKey": "course:biol-2025",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: REQUIRED: Quantitative Literacy (QL): MATH 1060 - Trigonometry (QL)
- **Payload**: ```json
{
  "attributes": {
    "category": "Quantitative Literacy",
    "optional": true,
    "requirement_type": "general_education"
  },
  "toCanonicalKey": "course:math-1060",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: REQUIRED: Quantitative Literacy (QL): MATH 1080 - Precalculus (QL)
- **Payload**: ```json
{
  "attributes": {
    "category": "Quantitative Literacy",
    "optional": true,
    "requirement_type": "general_education"
  },
  "toCanonicalKey": "course:math-1080",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: REQUIRED: Quantitative Literacy (QL): MATH 1210 - Calculus I (QL)
- **Payload**: ```json
{
  "attributes": {
    "category": "Quantitative Literacy",
    "optional": true,
    "requirement_type": "general_education"
  },
  "toCanonicalKey": "course:math-1210",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:biology-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12517&returnto=9720
- **Confidence**: 0.950
- **Citation**: RECOMMENDED: Written Communication (WC): ENGL 2100 - Technical Writing (WC)
- **Payload**: ```json
{
  "attributes": {
    "category": "Written Communication",
    "optional": true,
    "recommended": true,
    "requirement_type": "general_education"
  },
  "toCanonicalKey": "course:engl-2100",
  "fromCanonicalKey": "program:biology-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-arts`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12520&returnto=9720
- **Confidence**: 0.950
- **Citation**: ACCT 2010 - Survey of Financial Accounting
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:acct-2010",
  "fromCanonicalKey": "program:business-associate-of-arts",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-arts`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12520&returnto=9720
- **Confidence**: 0.950
- **Citation**: ACCT 2020 - Managerial Accounting
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:acct-2020",
  "fromCanonicalKey": "program:business-associate-of-arts",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-arts`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12520&returnto=9720
- **Confidence**: 0.950
- **Citation**: BUS 1010 - Introduction to Business (HR)
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:bus-1010",
  "fromCanonicalKey": "program:business-associate-of-arts",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-arts`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12520&returnto=9720
- **Confidence**: 0.950
- **Citation**: BUS 2200 - Business Communications (CM)
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:bus-2200",
  "fromCanonicalKey": "program:business-associate-of-arts",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-arts`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12520&returnto=9720
- **Confidence**: 0.950
- **Citation**: CSIS 2010 - Business Computer Proficiency - Spreadsheets and Databases
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:csis-2010",
  "fromCanonicalKey": "program:business-associate-of-arts",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-arts`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12520&returnto=9720
- **Confidence**: 0.950
- **Citation**: ECON 2010 - Principles of Microeconomics (SS)
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:econ-2010",
  "fromCanonicalKey": "program:business-associate-of-arts",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-arts`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12520&returnto=9720
- **Confidence**: 0.950
- **Citation**: MGT 1600 - Management Essentials
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:mgt-1600",
  "fromCanonicalKey": "program:business-associate-of-arts",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-arts`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12520&returnto=9720
- **Confidence**: 0.950
- **Citation**: MGT 2040 - Business Statistics
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:mgt-2040",
  "fromCanonicalKey": "program:business-associate-of-arts",
  "relationshipType": "requires"
}
```

### requires — `program:business-management-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12703&returnto=9720
- **Confidence**: 0.950
- **Citation**: ECON 2010 - Principles of Microeconomics (SS)
- **Payload**: ```json
{
  "attributes": {
    "type": "required",
    "designation": "SS"
  },
  "toCanonicalKey": "course:econ-2010",
  "fromCanonicalKey": "program:business-management-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:business-management-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12703&returnto=9720
- **Confidence**: 0.900
- **Citation**: RECOMMENDED: Quantitative Studies (QS): FIN 1380 - Financial Mathematics (QS)
- **Payload**: ```json
{
  "attributes": {
    "type": "recommended",
    "designation": "QS"
  },
  "toCanonicalKey": "course:fin-1380",
  "fromCanonicalKey": "program:business-management-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:business-management-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12703&returnto=9720
- **Confidence**: 0.900
- **Citation**: Communication (CM): BUS 2200 - Business Communications (CM)
- **Payload**: ```json
{
  "attributes": {
    "type": "recommended",
    "designation": "CM"
  },
  "toCanonicalKey": "course:bus-2200",
  "fromCanonicalKey": "program:business-management-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:business-management-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12703&returnto=9720
- **Confidence**: 0.900
- **Citation**: Communication (CM): BUS 2200 - Business Communications (CM) or COMM 1500 - Media and Society (CM)
- **Payload**: ```json
{
  "attributes": {
    "type": "recommended",
    "designation": "CM"
  },
  "toCanonicalKey": "course:comm-1500",
  "fromCanonicalKey": "program:business-management-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:business-management-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12703&returnto=9720
- **Confidence**: 0.900
- **Citation**: Human Relations (HR): MKTG 1960 - Professionalism in Business (HR)
- **Payload**: ```json
{
  "attributes": {
    "type": "recommended",
    "designation": "HR"
  },
  "toCanonicalKey": "course:mktg-1960",
  "fromCanonicalKey": "program:business-management-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:business-management-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12703&returnto=9720
- **Confidence**: 0.900
- **Citation**: Breadth Area: one course from one of the Breadth Areas is required; FIN 1050 - Personal Finance (SS) is the recommended option.
- **Payload**: ```json
{
  "attributes": {
    "type": "recommended",
    "designation": "SS"
  },
  "toCanonicalKey": "course:fin-1050",
  "fromCanonicalKey": "program:business-management-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:business-management-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12703&returnto=9720
- **Confidence**: 0.950
- **Citation**: BUS 1010 - Introduction to Business (HR)
- **Payload**: ```json
{
  "attributes": {
    "type": "required",
    "designation": "HR"
  },
  "toCanonicalKey": "course:bus-1010",
  "fromCanonicalKey": "program:business-management-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:business-management-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12703&returnto=9720
- **Confidence**: 0.950
- **Citation**: MGT 2070 - Human Resource Management
- **Payload**: ```json
{
  "attributes": {
    "type": "required"
  },
  "toCanonicalKey": "course:mgt-2070",
  "fromCanonicalKey": "program:business-management-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:business-management-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12703&returnto=9720
- **Confidence**: 0.950
- **Citation**: MGT 2500 - Management Capstone
- **Payload**: ```json
{
  "attributes": {
    "type": "required"
  },
  "toCanonicalKey": "course:mgt-2500",
  "fromCanonicalKey": "program:business-management-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:business-management-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12703&returnto=9720
- **Confidence**: 0.950
- **Citation**: MKTG 1030 - Introduction To Marketing
- **Payload**: ```json
{
  "attributes": {
    "type": "required"
  },
  "toCanonicalKey": "course:mktg-1030",
  "fromCanonicalKey": "program:business-management-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:cabinetmaking-and-furniture-construction-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12556&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 1220 - Woodworking & Millwork I
- **Payload**: ```json
{
  "attributes": {
    "isRequired": true,
    "courseTitle": "Woodworking & Millwork I"
  },
  "toCanonicalKey": "course:cmgt-1220",
  "fromCanonicalKey": "program:cabinetmaking-and-furniture-construction-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:cabinetmaking-and-furniture-construction-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12556&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 1340 - Cabinetmaking & Renewable Materials I
- **Payload**: ```json
{
  "attributes": {
    "isRequired": true,
    "courseTitle": "Cabinetmaking & Renewable Materials I"
  },
  "toCanonicalKey": "course:cmgt-1340",
  "fromCanonicalKey": "program:cabinetmaking-and-furniture-construction-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:cabinetmaking-and-furniture-construction-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12556&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 1530 - Furniture Design & Construction I
- **Payload**: ```json
{
  "attributes": {
    "isRequired": true,
    "courseTitle": "Furniture Design & Construction I"
  },
  "toCanonicalKey": "course:cmgt-1530",
  "fromCanonicalKey": "program:cabinetmaking-and-furniture-construction-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:cabinetmaking-and-furniture-construction-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12556&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 2530 - Furniture Design & Construction II
- **Payload**: ```json
{
  "attributes": {
    "isRequired": true,
    "courseTitle": "Furniture Design & Construction II"
  },
  "toCanonicalKey": "course:cmgt-2530",
  "fromCanonicalKey": "program:cabinetmaking-and-furniture-construction-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:cabinetmaking-and-furniture-construction-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12556&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 2340 - Cabinetmaking & Renewable Materials II
- **Payload**: ```json
{
  "attributes": {
    "isRequired": true,
    "courseTitle": "Cabinetmaking & Renewable Materials II"
  },
  "toCanonicalKey": "course:cmgt-2340",
  "fromCanonicalKey": "program:cabinetmaking-and-furniture-construction-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:cabinetmaking-and-furniture-construction-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12556&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 2220 - Woodworking & Millwork II
- **Payload**: ```json
{
  "attributes": {
    "isRequired": true,
    "courseTitle": "Woodworking & Millwork II"
  },
  "toCanonicalKey": "course:cmgt-2220",
  "fromCanonicalKey": "program:cabinetmaking-and-furniture-construction-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:cabinetmaking-and-furniture-construction-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12556&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 2710 - Computer Applications for Cabinetmaking & Woodworking or ARCH 1310 - Intro. to AutoCAD or EDDT 1040 - Introduction to AutoCAD
- **Payload**: ```json
{
  "attributes": {
    "isRequired": true,
    "courseTitle": "Computer Applications for Cabinetmaking & Woodworking",
    "alternateOptions": [
      "ARCH 1310",
      "EDDT 1040"
    ]
  },
  "toCanonicalKey": "course:cmgt-2710",
  "fromCanonicalKey": "program:cabinetmaking-and-furniture-construction-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:cabinetmaking-and-furniture-construction-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12556&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 1200 - Personal Projects
- **Payload**: ```json
{
  "attributes": {
    "isElective": true,
    "isRequired": false,
    "courseTitle": "Personal Projects"
  },
  "toCanonicalKey": "course:cmgt-1200",
  "fromCanonicalKey": "program:cabinetmaking-and-furniture-construction-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:cabinetmaking-and-furniture-construction-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12556&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 1350 - Wood Finishing
- **Payload**: ```json
{
  "attributes": {
    "isElective": true,
    "isRequired": false,
    "courseTitle": "Wood Finishing"
  },
  "toCanonicalKey": "course:cmgt-1350",
  "fromCanonicalKey": "program:cabinetmaking-and-furniture-construction-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:cabinetmaking-and-furniture-construction-academic-certificate-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12556&returnto=9720
- **Confidence**: 0.950
- **Citation**: CMGT 2720 - CNC Operations in Cabinetmaking & Woodworking
- **Payload**: ```json
{
  "attributes": {
    "isElective": true,
    "isRequired": false,
    "courseTitle": "CNC Operations in Cabinetmaking & Woodworking"
  },
  "toCanonicalKey": "course:cmgt-2720",
  "fromCanonicalKey": "program:cabinetmaking-and-furniture-construction-academic-certificate-cte",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12521&returnto=9720
- **Confidence**: 0.950
- **Citation**: ACCT 2010 - Survey of Financial Accounting
- **Payload**: ```json
{
  "attributes": {
    "required": true,
    "course_name": "Survey of Financial Accounting"
  },
  "toCanonicalKey": "course:acct-2010",
  "fromCanonicalKey": "program:business-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12521&returnto=9720
- **Confidence**: 0.950
- **Citation**: ACCT 2020 - Managerial Accounting
- **Payload**: ```json
{
  "attributes": {
    "required": true,
    "course_name": "Managerial Accounting"
  },
  "toCanonicalKey": "course:acct-2020",
  "fromCanonicalKey": "program:business-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12521&returnto=9720
- **Confidence**: 0.950
- **Citation**: BUS 1010 - Introduction to Business (HR)
- **Payload**: ```json
{
  "attributes": {
    "required": true,
    "course_name": "Introduction to Business",
    "general_education_designation": "HR"
  },
  "toCanonicalKey": "course:bus-1010",
  "fromCanonicalKey": "program:business-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12521&returnto=9720
- **Confidence**: 0.950
- **Citation**: BUS 2200 - Business Communications (CM)
- **Payload**: ```json
{
  "attributes": {
    "required": true,
    "course_name": "Business Communications",
    "general_education_designation": "CM"
  },
  "toCanonicalKey": "course:bus-2200",
  "fromCanonicalKey": "program:business-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12521&returnto=9720
- **Confidence**: 0.950
- **Citation**: CSIS 2010 - Business Computer Proficiency - Spreadsheets and Databases
- **Payload**: ```json
{
  "attributes": {
    "required": true,
    "course_name": "Business Computer Proficiency - Spreadsheets and Databases"
  },
  "toCanonicalKey": "course:csis-2010",
  "fromCanonicalKey": "program:business-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12521&returnto=9720
- **Confidence**: 0.950
- **Citation**: ECON 2010 - Principles of Microeconomics (SS)
- **Payload**: ```json
{
  "attributes": {
    "required": true,
    "course_name": "Principles of Microeconomics",
    "general_education_designation": "SS"
  },
  "toCanonicalKey": "course:econ-2010",
  "fromCanonicalKey": "program:business-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12521&returnto=9720
- **Confidence**: 0.950
- **Citation**: MGT 1600 - Management Essentials
- **Payload**: ```json
{
  "attributes": {
    "required": true,
    "course_name": "Management Essentials"
  },
  "toCanonicalKey": "course:mgt-1600",
  "fromCanonicalKey": "program:business-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12521&returnto=9720
- **Confidence**: 0.850
- **Citation**: MATH 1090 - College Algebra-Business (QL) is preferred for students who have not already received credit for MATH 1050
- **Payload**: ```json
{
  "attributes": {
    "required": false,
    "course_name": "College Algebra-Business",
    "recommendation": "Preferred for Quantitative Literacy",
    "general_education_designation": "QL"
  },
  "toCanonicalKey": "course:math-1090",
  "fromCanonicalKey": "program:business-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:business-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12521&returnto=9720
- **Confidence**: 0.850
- **Citation**: ECON 2020 - Principles of Macroeconomics (SS) is the recommended Social Science course
- **Payload**: ```json
{
  "attributes": {
    "required": false,
    "course_name": "Principles of Macroeconomics",
    "recommendation": "Recommended for Social Science",
    "general_education_designation": "SS"
  },
  "toCanonicalKey": "course:econ-2020",
  "fromCanonicalKey": "program:business-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEM 1215 - General Chemistry Lab I
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "category": "Program Requirements",
    "subcategory": "Required Courses"
  },
  "toCanonicalKey": "course:chem-1215",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.950
- **Citation**: REQUIRED: Written Communication (WC): ENGL 1010 - Introduction to College Writing (WC) and ENGL 2100 - Technical Writing (WC)
- **Payload**: ```json
{
  "attributes": {
    "category": "General Education",
    "subcategory": "Written Communication"
  },
  "toCanonicalKey": "course:engl-2100",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.950
- **Citation**: Quantitative Literacy (QL): MATH 1210 - Calculus I (QL)
- **Payload**: ```json
{
  "attributes": {
    "category": "General Education",
    "subcategory": "Quantitative Literacy"
  },
  "toCanonicalKey": "course:math-1210",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEM 1210 - General Chemistry I
- **Payload**: ```json
{
  "attributes": {
    "credits": 4,
    "category": "Program Requirements",
    "subcategory": "Required Courses"
  },
  "toCanonicalKey": "course:chem-1210",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEM 1225 - General Chemistry Lab II
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "category": "Program Requirements",
    "subcategory": "Required Courses"
  },
  "toCanonicalKey": "course:chem-1225",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEM 2310 - Organic Chemistry I
- **Payload**: ```json
{
  "attributes": {
    "credits": 4,
    "category": "Program Requirements",
    "subcategory": "Required Courses"
  },
  "toCanonicalKey": "course:chem-2310",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEM 2320 - Organic Chemistry II
- **Payload**: ```json
{
  "attributes": {
    "credits": 4,
    "category": "Program Requirements",
    "subcategory": "Required Courses"
  },
  "toCanonicalKey": "course:chem-2320",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.950
- **Citation**: CHEM 2325 - Organic Chemistry Lab II
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "category": "Program Requirements",
    "subcategory": "Required Courses"
  },
  "toCanonicalKey": "course:chem-2325",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.950
- **Citation**: MATH 1220 - Calculus II
- **Payload**: ```json
{
  "attributes": {
    "credits": 4,
    "category": "Program Requirements",
    "subcategory": "Required Courses"
  },
  "toCanonicalKey": "course:math-1220",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.950
- **Citation**: PHYS 2210 - Physics for Science & Engineering I
- **Payload**: ```json
{
  "attributes": {
    "credits": 4,
    "category": "Program Requirements",
    "subcategory": "Required Courses"
  },
  "toCanonicalKey": "course:phys-2210",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.950
- **Citation**: PHYS 2215 - Physics for Sci & Eng Lab I
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "category": "Program Requirements",
    "subcategory": "Required Courses"
  },
  "toCanonicalKey": "course:phys-2215",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.950
- **Citation**: PHYS 2220 - Physics for Science & Engineering II
- **Payload**: ```json
{
  "attributes": {
    "credits": 4,
    "category": "Program Requirements",
    "subcategory": "Required Courses"
  },
  "toCanonicalKey": "course:phys-2220",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.950
- **Citation**: PHYS 2225 - Physics for Sci & Eng Lab II
- **Payload**: ```json
{
  "attributes": {
    "credits": 1,
    "category": "Program Requirements",
    "subcategory": "Required Courses"
  },
  "toCanonicalKey": "course:phys-2225",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Preparatory Electives for Rigorous Program Coursework : CHEM 1010 - Introductory Chemistry (PS)
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Preparatory Electives for Rigorous Program Coursework"
  },
  "toCanonicalKey": "course:chem-1010",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Biochemistry Electives : BIOL 2035 - Genetics Lab
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Biochemistry Electives"
  },
  "toCanonicalKey": "course:biol-2035",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Preparatory Electives for Rigorous Program Coursework : MATH 1060 - Trigonometry (QL)
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Preparatory Electives for Rigorous Program Coursework"
  },
  "toCanonicalKey": "course:math-1060",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Preparatory Electives for Rigorous Program Coursework : MATH 1080 - Precalculus (QL)
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Preparatory Electives for Rigorous Program Coursework"
  },
  "toCanonicalKey": "course:math-1080",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Preparatory Electives for Rigorous Upper-Division Coursework : CHEM 1250 - Introduction to Chemical and Instrumental Analysis
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Preparatory Electives for Rigorous Upper-Division Coursework"
  },
  "toCanonicalKey": "course:chem-1250",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Preparatory Electives for Rigorous Upper-Division Coursework : CHEM 2900 - Special Projects in Chemistry
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Preparatory Electives for Rigorous Upper-Division Coursework"
  },
  "toCanonicalKey": "course:chem-2900",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Preparatory Electives for Rigorous Upper-Division Coursework : STEM 2010 - Writing a Research Proposal
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Preparatory Electives for Rigorous Upper-Division Coursework"
  },
  "toCanonicalKey": "course:stem-2010",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Advanced Math Electives : MATH 2210 - Multivariate Calculus: Calculus III
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Advanced Math Electives"
  },
  "toCanonicalKey": "course:math-2210",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Advanced Math Electives : MATH 2250 - Differential Eq/Linear Algebra
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Advanced Math Electives"
  },
  "toCanonicalKey": "course:math-2250",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Biochemistry Electives : BIOL 1610 - College Biology I (LS)
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Biochemistry Electives"
  },
  "toCanonicalKey": "course:biol-1610",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Biochemistry Electives : BIOL 2020 - Cell Biology
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Biochemistry Electives"
  },
  "toCanonicalKey": "course:biol-2020",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Biochemistry Electives : BIOL 2025 - Cell Biology Lab
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Biochemistry Electives"
  },
  "toCanonicalKey": "course:biol-2025",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Biochemistry Electives : BIOL 2030 - Genetics
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Biochemistry Electives"
  },
  "toCanonicalKey": "course:biol-2030",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Biochemistry Electives : ENVS 1405 - Environmental Science Lab
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Biochemistry Electives"
  },
  "toCanonicalKey": "course:envs-1405",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Business Electives : MGT 2040 - Business Statistics
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Business Electives"
  },
  "toCanonicalKey": "course:mgt-2040",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Chemical Engineering Electives : CHE 2800 - Fundamentals of Process Engineering
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Chemical Engineering Electives"
  },
  "toCanonicalKey": "course:che-2800",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Chemical Engineering Electives : ENGR 2300 - Engineering Thermodynamics
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Chemical Engineering Electives"
  },
  "toCanonicalKey": "course:engr-2300",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Geology Electives : GEO 1110 - Physical Geology
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Geology Electives"
  },
  "toCanonicalKey": "course:geo-1110",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Geology Electives : GEO 1115 - Physical Geology Lab
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Geology Electives"
  },
  "toCanonicalKey": "course:geo-1115",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Chemistry Teaching Electives : EDU 1010 - Orientation to Education
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Chemistry Teaching Electives"
  },
  "toCanonicalKey": "course:edu-1010",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Chemistry Teaching Electives : EDU 2150 - Intro to Multicultural Ed.
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Chemistry Teaching Electives"
  },
  "toCanonicalKey": "course:edu-2150",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Chemistry Teaching Electives : ETHS 2410 - African American Experiences (SS)
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Chemistry Teaching Electives"
  },
  "toCanonicalKey": "course:eths-2410",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Chemistry Teaching Electives : ETHS 2420 - Asian American Experiences (SS)
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Chemistry Teaching Electives"
  },
  "toCanonicalKey": "course:eths-2420",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:chemistry-associate-of-science`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12530&returnto=9720
- **Confidence**: 0.850
- **Citation**: Chemistry Teaching Electives : ETHS 2440 - Native American Experiences (SS)
- **Payload**: ```json
{
  "attributes": {
    "category": "Program Electives",
    "required": false,
    "subcategory": "Chemistry Teaching Electives"
  },
  "toCanonicalKey": "course:eths-2440",
  "fromCanonicalKey": "program:chemistry-associate-of-science",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 0990 - Recital Attendance (Fours semesters)
- **Payload**: ```json
{
  "attributes": {
    "category": "Required Courses",
    "repetitions": "Four semesters"
  },
  "toCanonicalKey": "course:musc-0990",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 1110 - Music Theory I
- **Payload**: ```json
{
  "attributes": {
    "category": "Required Courses"
  },
  "toCanonicalKey": "course:musc-1110",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 1120 - Music Theory II
- **Payload**: ```json
{
  "attributes": {
    "category": "Required Courses"
  },
  "toCanonicalKey": "course:musc-1120",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 2500 - Music Production Group (Must be taken 2 times)
- **Payload**: ```json
{
  "attributes": {
    "category": "Required Courses",
    "repetitions": "Must be taken 2 times"
  },
  "toCanonicalKey": "course:musc-2500",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 2540 - Sampling, Synthesis & Sound Design
- **Payload**: ```json
{
  "attributes": {
    "category": "Required Courses"
  },
  "toCanonicalKey": "course:musc-2540",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: Recording Technology Emphasis Complete all the following courses: MUSC 1530 - Music Recording Techniques
- **Payload**: ```json
{
  "attributes": {
    "category": "Recording Technology Emphasis",
    "emphasisRequired": true
  },
  "toCanonicalKey": "course:musc-1530",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 1550 - Musical Acoustics
- **Payload**: ```json
{
  "attributes": {
    "category": "Recording Technology Emphasis",
    "emphasisRequired": true
  },
  "toCanonicalKey": "course:musc-1550",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 1560 - Music Mixing Techniques
- **Payload**: ```json
{
  "attributes": {
    "category": "Recording Technology Emphasis",
    "emphasisRequired": true
  },
  "toCanonicalKey": "course:musc-1560",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 1130 - Sight Singing/Ear Training I
- **Payload**: ```json
{
  "attributes": {
    "category": "Required Courses"
  },
  "toCanonicalKey": "course:musc-1130",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 1140 - Sight Singing/Ear Training II
- **Payload**: ```json
{
  "attributes": {
    "category": "Required Courses"
  },
  "toCanonicalKey": "course:musc-1140",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 1150 - Group Piano I
- **Payload**: ```json
{
  "attributes": {
    "category": "Required Courses"
  },
  "toCanonicalKey": "course:musc-1150",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 1160 - Group Piano II
- **Payload**: ```json
{
  "attributes": {
    "category": "Required Courses"
  },
  "toCanonicalKey": "course:musc-1160",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 1200 - Introduction to the Music Industry
- **Payload**: ```json
{
  "attributes": {
    "category": "Required Courses"
  },
  "toCanonicalKey": "course:musc-1200",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 1515 - Basic Audio Production
- **Payload**: ```json
{
  "attributes": {
    "category": "Required Courses"
  },
  "toCanonicalKey": "course:musc-1515",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 1520 - Music Composition I (Introduction to Electronic Music Composition)
- **Payload**: ```json
{
  "attributes": {
    "category": "Required Courses"
  },
  "toCanonicalKey": "course:musc-1520",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 2110 - Music Theory III
- **Payload**: ```json
{
  "attributes": {
    "category": "Required Courses"
  },
  "toCanonicalKey": "course:musc-2110",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 2130 - Sight Singing/Ear Training III
- **Payload**: ```json
{
  "attributes": {
    "category": "Required Courses"
  },
  "toCanonicalKey": "course:musc-2130",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: Choose one of the following courses: FLM 2065 - Motion Picture Sound
- **Payload**: ```json
{
  "attributes": {
    "category": "Recording Technology Emphasis",
    "elective": true,
    "chooseOne": true
  },
  "toCanonicalKey": "course:flm-2065",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 2570 - Game Audio Design
- **Payload**: ```json
{
  "attributes": {
    "category": "Recording Technology Emphasis",
    "elective": true,
    "chooseOne": true
  },
  "toCanonicalKey": "course:musc-2570",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: Choose two of the following courses: ( MUSC 1100 may need to be taken as a pre-requisite course for MUSC 1110 ) MUSC 1100 - Introduction to Music Theory
- **Payload**: ```json
{
  "attributes": {
    "category": "Recording Technology Emphasis",
    "elective": true,
    "chooseTwo": true,
    "mayBePrerequisite": true
  },
  "toCanonicalKey": "course:musc-1100",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 2550 - Music Internship
- **Payload**: ```json
{
  "attributes": {
    "category": "Recording Technology Emphasis",
    "elective": true,
    "chooseTwo": true
  },
  "toCanonicalKey": "course:musc-2550",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 2120 - Music Theory IV
- **Payload**: ```json
{
  "attributes": {
    "category": "Recording Technology Emphasis",
    "elective": true,
    "chooseTwo": true
  },
  "toCanonicalKey": "course:musc-2120",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 2140 - Sight Singing/Ear Training IV
- **Payload**: ```json
{
  "attributes": {
    "category": "Recording Technology Emphasis",
    "elective": true,
    "chooseTwo": true
  },
  "toCanonicalKey": "course:musc-2140",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 1060 - Songwriting II
- **Payload**: ```json
{
  "attributes": {
    "category": "Recording Technology Emphasis",
    "elective": true,
    "chooseTwo": true
  },
  "toCanonicalKey": "course:musc-1060",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 2200 - Artist Promotion and Management
- **Payload**: ```json
{
  "attributes": {
    "category": "Recording Technology Emphasis",
    "elective": true,
    "chooseTwo": true
  },
  "toCanonicalKey": "course:musc-2200",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 2530 - Jingles and Music for Commercials
- **Payload**: ```json
{
  "attributes": {
    "category": "Recording Technology Emphasis",
    "elective": true,
    "chooseTwo": true
  },
  "toCanonicalKey": "course:musc-2530",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: Composition/Songwriting Emphasis MUSC 1050 - Songwriting & Creative Process (AR)
- **Payload**: ```json
{
  "attributes": {
    "category": "Composition/Songwriting Emphasis",
    "emphasisRequired": true
  },
  "toCanonicalKey": "course:musc-1050",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 1540 - Music Composition II
- **Payload**: ```json
{
  "attributes": {
    "category": "Composition/Songwriting Emphasis",
    "emphasisRequired": true
  },
  "toCanonicalKey": "course:musc-1540",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 2350 - Conducting Fundamentals
- **Payload**: ```json
{
  "attributes": {
    "category": "Composition/Songwriting Emphasis",
    "emphasisRequired": true
  },
  "toCanonicalKey": "course:musc-2350",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 2510 - Music Composition for Games and Interactive Media
- **Payload**: ```json
{
  "attributes": {
    "category": "Composition/Songwriting Emphasis",
    "emphasisRequired": true
  },
  "toCanonicalKey": "course:musc-2510",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: Choose one of the following courses: ( MUSC 1100 may need to be taken as a pre-requisite course for MUSC 1110 ) MUSC 1100 - Introduction to Music Theory MUSC 2550 - Music Internship MUSC 2200 - Artist Promotion and Management MUSC 1550 - Musical Acoustics
- **Payload**: ```json
{
  "attributes": {
    "category": "Composition/Songwriting Emphasis",
    "elective": true,
    "chooseOne": true,
    "emphasisRequired": false
  },
  "toCanonicalKey": "course:musc-2200",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: Performance Emphasis MUSC 1050 - Songwriting & Creative Process (AR) MUSC 2120 - Music Theory IV MUSC 2140 - Sight Singing/Ear Training IV
- **Payload**: ```json
{
  "attributes": {
    "category": "Performance Emphasis",
    "emphasisRequired": true
  },
  "toCanonicalKey": "course:musc-2140",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:commercial-music-aas-cte`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12790&returnto=9720
- **Confidence**: 0.950
- **Citation**: MUSC 2350 - Conducting Fundamentals
- **Payload**: ```json
{
  "attributes": {
    "category": "Performance Emphasis",
    "emphasisRequired": true
  },
  "toCanonicalKey": "course:musc-2350",
  "fromCanonicalKey": "program:commercial-music-aas-cte",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.900
- **Citation**: CHEM 1110 - Elementary Chemistry and CHEM 1115 - Elementary Chemistry Lab are strongly recommended
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:chem-1110",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.900
- **Citation**: CHEM 1115 - Elementary Chemistry Lab are strongly recommended
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:chem-1115",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: PSY 1100 - Lifespan Human Growth and Development (SS)
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:psy-1100",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: FHS 1500 - Lifespan Human Development (SS)
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:fhs-1500",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: ECON 1010 - Economics as a Social Science (SS)
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:econ-1010",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: ECON 2010 - Principles of Microeconomics (SS)
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:econ-2010",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.850
- **Citation**: RECOMMENDED: Quantitative Literacy (QL): MATH 1040 - Intro to Statistics (QL)
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:math-1040",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: Complete all of the following with a minimum grade of C : BIOL 2320 - Human Anatomy
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:biol-2320",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: BIOL 2325 - Human Anatomy Lab
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:biol-2325",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: BIOL 2420 - Human Physiology
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:biol-2420",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: BIOL 2425 - Human Physiology Lab
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:biol-2425",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: HS 2010 - Health and Diseases: Introduction to Epidemiology
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:hs-2010",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: REQUIRED: Life Sciences (LS): BIOL 1610 - College Biology I (LS)
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:biol-1610",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.850
- **Citation**: HS 1900 - Special Topics: Non-Clinical Health Concentrations is recommended as one of the general elective courses
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:hs-1900",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: HS 2800 - Healthcare Systems and Public Policy
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:hs-2800",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: HLTH 1500 - Lifetime Wellness and Fitness or ACCT 2010 - Survey of Financial Accounting
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:hlth-1500",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: ACCT 2010 - Survey of Financial Accounting
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:acct-2010",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: HS 1010 - Introduction to Health Professions
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:hs-1010",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: HS 1100 - Medical Terminology
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:hs-1100",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:community-health-and-leadership-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12771&returnto=9720
- **Confidence**: 0.950
- **Citation**: HS 2050 - Ethical, Social, and Legal Issues in Health Care (HR)
- **Payload**: ```json
{
  "attributes": {},
  "toCanonicalKey": "course:hs-2050",
  "fromCanonicalKey": "program:community-health-and-leadership-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.950
- **Citation**: Complete all of the following: CS 1400 - Fundamentals of Programming
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "required"
  },
  "toCanonicalKey": "course:cs-1400",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.950
- **Citation**: CS 1410 - Object-Oriented Programming
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "required"
  },
  "toCanonicalKey": "course:cs-1410",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.950
- **Citation**: CS 2420 - Algorithms & Data Structures
- **Payload**: ```json
{
  "attributes": {
    "requirement_type": "required"
  },
  "toCanonicalKey": "course:cs-2420",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: CS 2430 - Discrete Structures
- **Payload**: ```json
{
  "attributes": {
    "emphasis_area": "Computer Science",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cs-2430",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: CS 2450 - Software Engineering
- **Payload**: ```json
{
  "attributes": {
    "emphasis_area": "Computer Science",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cs-2450",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: CS 2810 - Computer Architecture
- **Payload**: ```json
{
  "attributes": {
    "emphasis_area": "Computer Science",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cs-2810",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: CS 2500 - Data Wrangling
- **Payload**: ```json
{
  "attributes": {
    "emphasis_area": "Data Science",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cs-2500",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: CSIS 1550 - SQL Programming
- **Payload**: ```json
{
  "attributes": {
    "emphasis_area": "Data Science",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:csis-1550",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: CS 2370 - C++ Programming
- **Payload**: ```json
{
  "attributes": {
    "emphasis_area": "Software Development",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:cs-2370",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: CSIS 1430 - Internet & XHTML Fundamentals
- **Payload**: ```json
{
  "attributes": {
    "emphasis_area": "Software Development",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:csis-1430",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: CSIS 2440 - Web Programming
- **Payload**: ```json
{
  "attributes": {
    "emphasis_area": "Software Development",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:csis-2440",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: BIOL 1610 - College Biology I (LS)
- **Payload**: ```json
{
  "attributes": {
    "category": "Additional Transfer Course",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:biol-1610",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: CHEM 1210 - General Chemistry I
- **Payload**: ```json
{
  "attributes": {
    "category": "Additional Transfer Course",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:chem-1210",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: ENGR 1010 - Engineering Math Techniques
- **Payload**: ```json
{
  "attributes": {
    "category": "Additional Transfer Course",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:engr-1010",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

### requires — `program:computer-science-as`

- **Source**: https://catalog.slcc.edu/preview_program.php?catoid=28&poid=12795&returnto=9720
- **Confidence**: 0.900
- **Citation**: ENGR 2550 - Applied Probability & Statistics for Engineers
- **Payload**: ```json
{
  "attributes": {
    "category": "Additional Transfer Course",
    "requirement_type": "elective"
  },
  "toCanonicalKey": "course:engr-2550",
  "fromCanonicalKey": "program:computer-science-as",
  "relationshipType": "requires"
}
```

---

## Promoted Observations by Type

- `entity`: 112
- `policy`: 96
- `relationship`: 140
