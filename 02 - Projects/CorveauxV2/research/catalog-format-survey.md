---
type: research
domain: corveaux
status: draft
date: 2026-06-05
tags:
  - corveaux
  - catalog
  - extraction
  - survey
---
# Catalog Format Survey  
  
**Status:** Draft. Research pending.  
  
## Purpose  
  
Understand the diversity of catalog formats encountered in the wild before finalizing the extraction pipeline.  
  
The Day 30 gate requires >90% accuracy on material facts at SLCC. This survey informs crawler design, parser design, extraction strategy, and validation requirements.  
  
The objective is not to support a single catalog platform. The objective is to support institutional catalogs as a category without institution-specific logic.  
  
---  
  
## Why This Matters  
  
Corveaux's entry wedge depends on extracting institutional knowledge from publicly available sources.  
  
Catalogs are one of the highest-value institutional sources because they contain:  
  
- Programs  
- Courses  
- Requirements  
- Academic policies  
- Degree structures  
- Department ownership  
- Contact information  
  
The extraction pipeline must accommodate significant variation in structure while producing a consistent institutional model.  
  
---  
  
## Known Catalog Platforms  
  
### Leepfrog CourseLeaf  
  
Common throughout higher education.  
  
Characteristics:  
  
- Structured catalog navigation  
- Program pages  
- Course pages  
- Search functionality  
- Relatively consistent HTML structure  
  
Potential advantages:  
  
- Predictable extraction targets  
- Strong program/course separation  
  
Potential challenges:  
  
- Client-side rendering  
- Platform customization  
  
---  
  
### Acalog ACMS  
  
Widely deployed catalog platform.  
  
Characteristics:  
  
- URL-driven navigation  
- Structured program and course records  
- Highly standardized rendering patterns  
  
Potential advantages:  
  
- Consistent structure  
- Strong machine extraction potential  
  
Potential challenges:  
  
- Institution-specific customizations  
  
---  
  
### Curriculog  
  
Governance and workflow platform.  
  
Not primarily a catalog renderer.  
  
Potential relevance:  
  
- Curriculum workflow extraction  
- Approval process visibility  
  
Potential challenges:  
  
- Often not publicly accessible  
- Different problem domain than catalogs  
  
---  
  
### Custom CMS Implementations  
  
Examples:  
  
- WordPress  
- Drupal  
- Cascade CMS  
- Omni CMS  
- Homegrown solutions  
  
Characteristics:  
  
- Highly variable structure  
- Inconsistent navigation  
- Inconsistent metadata  
  
Potential challenges:  
  
- Institution-specific parsing requirements  
- Mixed content quality  
  
---  
  
### PDF Catalogs  
  
Legacy but still encountered.  
  
Characteristics:  
  
- Unstructured text  
- Layout-dependent information  
- Limited machine readability  
  
Potential challenges:  
  
- OCR requirements  
- Table extraction  
- Structural reconstruction  
  
---  
  
## Catalog Information Model  
  
The survey should identify how commonly the following concepts appear and how consistently they are represented.  
  
### Programs  
  
Expected fields:  
  
- Program name  
- Degree type  
- Award level  
- CIP code  
- Department  
- Description  
- Outcomes  
- Requirements  
  
### Courses  
  
Expected fields:  
  
- Course code  
- Course title  
- Credit hours  
- Description  
- Prerequisites  
- Corequisites  
- Restrictions  
  
### Requirements  
  
Expected fields:  
  
- Requirement type  
- Credit totals  
- Required courses  
- Electives  
- Graduation requirements  
  
### Departments  
  
Expected fields:  
  
- Department name  
- Contact information  
- Location  
- Website  
  
### Policies  
  
Expected fields:  
  
- Policy title  
- Effective date  
- Policy body  
- Responsible office  
  
---  
  
## Research Questions  
  
### SLCC Control Case  
  
- [x] What catalog platform does SLCC use? — **Acalog CMS** (confirmed Session 06). Static HTML pages, not JavaScript-rendered. `catalog.slcc.edu` is the public catalog host.
- [x] What supporting systems are visible publicly? — Acalog catalog at `catalog.slcc.edu`. No public LMS or SIS integration visible.
- [x] What portions of the catalog are publicly accessible? — Programs (132), courses (~100+), degrees and certificates, academic policies. All public, no auth required.
  
### Structure  
  
- [x] Are catalog pages paginated or single-page? — **Single page per entity.** List pages (programs alphabetically, course descriptions) are discovery pages. Individual program and course pages are single-page with full data.
- [x] What is the URL pattern structure for program pages? — `catalog.slcc.edu/preview_program.php?catoid=28&poid=XXXX` where `catoid` is the catalog year ID and `poid` is the program ID. URL canonicalization required: `catoid` and `poid` may appear in either order.
- [x] What is the URL pattern structure for course pages? — `catalog.slcc.edu/preview_course.php?catoid=28&coid=XXXX` (assumed from pattern; not yet fully validated via crawl).
- [x] Are identifiers stable across academic years? — **No. poids are NOT stable across catalog years.** Each time a program is copied to a new catoid, it receives a new poid. Confirmed: Architecture AS is poid=52 in catoid=1 (2014-2015) and poid=12506 in catoid=28 (2026-2027). poids are globally auto-incrementing integers, unique across the entire Acalog instance. A poid identifies one specific year-edition of a program, not the program concept across years. catoid history confirmed: SLCC has 13 published catalogs since 2014-2015, with non-sequential catoid values (1, 3, 6, 10, 11, 12, 14, 17, 19, 21, 26, 27, 28). Cannot predict next catoid by adding 1 — must query `catalog.slcc.edu/misc/catalog_list.php`.
  
### Machine Readability  
  
- [x] Is there a machine-readable source available? — **No machine-readable source found.** Extraction is via HTML page parsing.
- [x] XML? — No
- [x] JSON? — No
- [x] RSS? — No
- [x] API? — None found publicly. Acalog has a vendor API but SLCC has not exposed it.
- [x] Embedded structured data? — No (no JSON-LD, Schema.org, or microdata observed in pages)
  
### Extraction  
  
- [x] What fields are consistently present? — Program name, degree type, total credit hours, required course list, program description (Session 08 pilot: all 6 programs had these fields).
- [x] What fields are inconsistently present? — Learning outcomes, accreditation status, department contact info, prerequisites (for programs), and effective date. Observed in some programs but not universal across the 132-program set. Session 08 pilot (6 programs) confirmed variability. Full 132-page run will provide definitive field coverage statistics.
- [x] Which entities require LLM extraction? — All. Program name, description, credits, degree type, courses, learning outcomes — none are parseable deterministically from HTML structure alone.
- [x] Which entities can be parsed deterministically? — `poid` and `catoid` from URL only. All data fields require LLM.
  
### Change Management  
  
- [x] How frequently do URLs change? — catoid changes once per academic year (annually). poid changes every time a program is copied to a new catalog year. Individual program URLs are stable for the lifetime of a catoid but must be re-discovered for each new catoid. navoid values (navigation pages) are not stable across catoid years — a navoid from catoid=27 may 404 in catoid=28.
- [x] How are catalog versions published? — Annual publication, one catoid per academic year. Published in May–June before the fall term. The catalog list endpoint (`catalog.slcc.edu/misc/catalog_list.php`) is the authoritative source for all published catoid values.
- [x] Are historical catalogs preserved? — Yes. All prior catoid values remain live with an "ARCHIVED CATALOG" banner. SLCC does not delete prior catalog years. Invalid catoid values (gaps in the sequence) silently redirect to the current catalog rather than returning 404.
- [x] How are effective dates represented? — Implicitly by catalog year (catoid). No explicit effective date, last-updated timestamp, or per-program revision date is surfaced publicly on program pages.
  
### Validation  
  
- [x] Which catalog elements are material facts? — Program name, degree type, total credit hours, required courses with credits. These are the Day 30 accuracy gate targets.
- [x] Which catalog elements require citation? — All extracted facts per architectural rule: every observation requires a `citationText` verbatim from the source page.
- [x] Which catalog elements require confidence scoring? — All. Minimum threshold 0.50; Day 30 gate target avg â‰¥ 0.90.  
  
---  
  
## Survey Matrix  
  
| Institution | Platform | Program Pages | Course Pages | Structured Data | API | Notes |  
|------------|----------|---------------|--------------|-----------------|-----|-------|  
| SLCC | Acalog CMS (Modern Campus) | `preview_program.php?catoid=28&poid=XXXX` | `preview_course.php?catoid=28&coid=XXXX` | None | None | 132 programs, ~100 courses. Static HTML. poids non-stable across catoid years. 13 archived catoids live. Session 08 pilot: 6 programs at 0.965 avg confidence. |  

## SLCC Confirmed Technology Stack

Confirmed via public sources (2026-06-06):

| Layer | Vendor | Confidence |
|-------|--------|-----------|
| SIS / ERP | Ellucian Banner 9 | Confirmed — `i.slcc.edu/bannerlinks` |
| LMS | Canvas (Instructure) | Confirmed — `slcc.instructure.com` |
| Catalog | Acalog / Modern Campus Catalog | Confirmed |
| Identity Provider / SSO | Microsoft Azure AD / Entra ID | Confirmed — Azure MFA enrollment documented |
| Degree Audit | Ellucian DegreeWorks | Confirmed |
| Student Portal | Ellucian Experience | Confirmed — `experience.elluciancloud.com/slcc/` |
| BI / Reporting | Cognos + ODS (over Banner) | Confirmed |
| eProcurement | Jaggaer ("SLCCBuy") | Confirmed |
| Document Management | SoftDocs | Confirmed |
| Productivity | Microsoft 365 | Confirmed |
| Web CMS | Unknown | Not publicly identified |
  
---  
  
## Working Hypotheses  
  
1. Most institutions use a small number of dominant catalog platforms.  
2. Program and course structures are more consistent than website structures.  
3. Deterministic extraction should handle a significant percentage of catalog data.  
4. LLM extraction should primarily resolve relationships, classifications, and inconsistencies.  
5. The extraction pipeline should normalize catalog data into canonical institutional primitives before any rendering occurs.  
  
---  
  
## Success Criteria  
  
The survey is complete when:  
  
- Major catalog platform categories are documented  
- SLCC catalog architecture is understood  
- Extraction strategies are identified per platform category  
- Validation requirements are documented  
- Parser requirements are sufficiently understood to begin implementation  
  
---  
  
## Related  
  
- [[ADR-001 — Entry Wedge Selection]]  
- [[ADR-002 — Institutional Model Primitives]]  
- [[ADR-007 — LLM Strategy Positioning]]  
- [[ADR-009 — Tech Stack]]  
- [[extraction-pipeline-spec]]  
- [[SLCC Validation Run]]