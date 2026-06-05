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
  
- [ ] What catalog platform does SLCC use?  
- [ ] What supporting systems are visible publicly?  
- [ ] What portions of the catalog are publicly accessible?  
  
### Structure  
  
- [ ] Are catalog pages paginated or single-page?  
- [ ] What is the URL pattern structure for program pages?  
- [ ] What is the URL pattern structure for course pages?  
- [ ] Are identifiers stable across academic years?  
  
### Machine Readability  
  
- [ ] Is there a machine-readable source available?  
- [ ] XML?  
- [ ] JSON?  
- [ ] RSS?  
- [ ] API?  
- [ ] Embedded structured data?  
  
### Extraction  
  
- [ ] What fields are consistently present?  
- [ ] What fields are inconsistently present?  
- [ ] Which entities require LLM extraction?  
- [ ] Which entities can be parsed deterministically?  
  
### Change Management  
  
- [ ] How frequently do URLs change?  
- [ ] How are catalog versions published?  
- [ ] Are historical catalogs preserved?  
- [ ] How are effective dates represented?  
  
### Validation  
  
- [ ] Which catalog elements are material facts?  
- [ ] Which catalog elements require citation?  
- [ ] Which catalog elements require confidence scoring?  
  
---  
  
## Survey Matrix  
  
| Institution | Platform | Program Pages | Course Pages | Structured Data | API | Notes |  
|------------|----------|---------------|--------------|-----------------|-----|-------|  
| SLCC | TBD | TBD | TBD | TBD | TBD | Day 30 control case |  
  
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
- [[Extraction Pipeline Spec]]  
- [[SLCC Validation Run]]