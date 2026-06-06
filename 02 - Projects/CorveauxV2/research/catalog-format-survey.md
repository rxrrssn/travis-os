---
type: research
domain: corveaux
status: draft
date: 2026-06-05
tags: [corveaux, catalog, extraction, survey]
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
- [ ] Are identifiers stable across academic years? — Unknown. `poid` is stable within `catoid=28`. Behavior across catalog year changes (new `catoid`) not yet investigated.
  
### Machine Readability  
  
- [x] Is there a machine-readable source available? — **No machine-readable source found.** Extraction is via HTML page parsing.
- [x] XML? — No
- [x] JSON? — No
- [x] RSS? — No
- [x] API? — None found publicly. Acalog has a vendor API but SLCC has not exposed it.
- [x] Embedded structured data? — No (no JSON-LD, Schema.org, or microdata observed in pages)
  
### Extraction  
  
- [x] What fields are consistently present? — Program name, degree type, total credit hours, required course list, program description (Session 08 pilot: all 6 programs had these fields).
- [ ] What fields are inconsistently present? — Learning outcomes, accreditation status, contact info, prerequisites, effective date. Observed in some programs; not universal.
- [x] Which entities require LLM extraction? — All. Program name, description, credits, degree type, courses, learning outcomes — none are parseable deterministically from HTML structure alone.
- [x] Which entities can be parsed deterministically? — `poid` and `catoid` from URL only. All data fields require LLM.
  
### Change Management  
  
- [ ] How frequently do URLs change? — Unknown. `catoid` likely increments each academic year.
- [ ] How are catalog versions published? — Unknown. Appears to be annual with `catoid` version bump.
- [ ] Are historical catalogs preserved? — Unknown. Prior `catoid` values may resolve or may 404.
- [ ] How are effective dates represented? — Implicit in catalog year (`catoid`). No explicit effective date field observed on program pages.
  
### Validation  
  
- [x] Which catalog elements are material facts? — Program name, degree type, total credit hours, required courses with credits. These are the Day 30 accuracy gate targets.
- [x] Which catalog elements require citation? — All extracted facts per architectural rule: every observation requires a `citationText` verbatim from the source page.
- [x] Which catalog elements require confidence scoring? — All. Minimum threshold 0.50; Day 30 gate target avg ≥ 0.90.  
  
---  
  
## Survey Matrix  
  
| Institution | Platform | Program Pages | Course Pages | Structured Data | API | Notes |  
|------------|----------|---------------|--------------|-----------------|-----|-------|  
| SLCC | Acalog CMS | `preview_program.php?catoid=28&poid=XXXX` | `preview_course.php?catoid=28&coid=XXXX` | None | None | 132 programs, ~100 courses. Static HTML. Session 08 pilot: 6 programs extracted at 0.965 avg confidence. |  
  
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