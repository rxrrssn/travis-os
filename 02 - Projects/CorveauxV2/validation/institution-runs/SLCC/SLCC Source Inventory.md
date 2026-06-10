# SLCC Source Inventory — Day 30 Validation

**Project:** Corveaux V2  
**Purpose:** Seed source targets for the first SLCC extraction smoke test and Day 30 validation run.  
**Status:** Draft source inventory. Verify URLs before crawl.  
**Prepared:** 2026-06-05

---

## Validation Objective

Use public SLCC sources to test whether Corveaux can crawl, extract, observe, promote, and generate content blocks from a real institution.

The Day 30 goal is not full institutional coverage. The goal is to prove the pipeline can produce accurate canonical primitives and projections from a representative public source set.

---

## Source Categories

### 1. Core Website

| Source | URL | Expected Value | Suggested Source Type |
|---|---|---|---|
| SLCC Homepage | https://www.slcc.edu/ | General institutional identity, navigation, high-level services | website |
| Academics | https://www.slcc.edu/academics/ | Areas of study, academic positioning, program navigation | website |
| Programs | https://www.slcc.edu/academics/programs/index.aspx | Public program list and program-name surface validation | website |
| Degrees | https://www.slcc.edu/academics/degrees/index.aspx | Degree types and award-level terminology | website |
| Current Students | https://www.slcc.edu/student/index.aspx | Student services, registration, records, academic resources | website |
| Admissions | https://www.slcc.edu/admissions/ | Admissions process, registration references, contact pointers | website |
| Enroll | https://www.slcc.edu/enroll/ | Enrollment steps and registration/calendar routing | website |
| Financial Aid | https://www.slcc.edu/financialaid/ | Financial aid deadlines, rules, service ownership | website |
| Academic Calendar | https://www.slcc.edu/academiccalendar/ | Dates, deadlines, term structure | website |

---

### 2. Catalog

| Source | URL | Expected Value | Suggested Source Type |
|---|---|---|---|
| Current Catalog Root | https://catalog.slcc.edu/ | Current catalog year, catalog navigation, institutional catalog entry point | catalog |
| Catalog Index | https://catalog.slcc.edu/index.php?catoid=28 | Current catalog container, catalog metadata | catalog |
| Catalog List / Archive Entry | https://catalog.slcc.edu/misc/catalog_list.php?catoid=28 | Catalog version/archive discovery | catalog |
| Programs Listed Alphabetically | https://catalog.slcc.edu/content.php?catoid=28&navoid=9720 | Authoritative program list | catalog |
| Degrees and Certificates | https://catalog.slcc.edu/content.php?catoid=28&navoid=9697 | Degree types, award vocabulary | catalog |
| Programs and Areas of Study | https://catalog.slcc.edu/content.php?catoid=28&navoid=9705 | Program-area relationships | catalog |
| Course Descriptions | https://catalog.slcc.edu/content.php?catoid=28&navoid=9704 | Course codes, course titles, credits, prerequisites/corequisites | catalog |
| Student Services and Resources | https://catalog.slcc.edu/content.php?catoid=28&navoid=9721 | Catalog-backed service descriptions | catalog |
| Academic Policies & Procedures | https://catalog.slcc.edu/content.php?catoid=28&navoid=14 | Policy extraction target; verify current catalog nav ID before final run | catalog |

---

### 3. Areas of Study / Academic Program Context

| Source | URL | Expected Value | Suggested Source Type |
|---|---|---|---|
| Computer Science and Information Technology | https://www.slcc.edu/academics/areas-of-study/cs-it.aspx | Area/program context, advising language, related program discovery | website |
| Health Sciences | https://www.slcc.edu/academics/areas-of-study/hs.aspx | Area/program context, program list, award-type language | website |
| Arts, Communication and Digital Media | https://www.slcc.edu/academics/areas-of-study/arts-comm.aspx | Area/program context, program list, award-type language | website |

---

### 4. Directory / Contact / Service Sources

| Source | URL | Expected Value | Suggested Source Type |
|---|---|---|---|
| Contact SLCC | https://www.slcc.edu/contact/index.aspx | General information, operator numbers, admissions, help desk | directory |
| i.slcc.edu Contact Surface | https://i.slcc.edu/ | General institutional contact links, help desk email, directory entry point | directory |
| Academic Advising | https://www.slcc.edu/academicadvising/ | Advising service, campus front desk phone numbers | directory |
| Find Your Academic Advisor | https://www.slcc.edu/academicadvising/find-your-advisor.aspx | Advisor relationships and person/contact extraction stress test | directory |
| Academic Advising Locations and Hours | https://www.slcc.edu/academicadvising/locations-hours.aspx | Campus/service locations, hours, phone numbers | directory |
| Office of Student Success Contact | https://www.slcc.edu/oss/contact.aspx | Staff/person/contact extraction test | directory |
| International Student Services | https://www.slcc.edu/iss/ | Service purpose statement and institutional support area | directory |
| International Student Services Contact | https://www.slcc.edu/iss/contact.aspx | Service location, hours, phone, email | directory |
| Facilities Contact/Staff | https://i.slcc.edu/facilities/staff.aspx | Facilities service contact, work request routing, location | directory |

---

## Recommended Smoke Test URL Set

Use this before a full SLCC crawl.

| Priority | URL | Why |
|---|---|---|
| 1 | https://catalog.slcc.edu/content.php?catoid=28&navoid=9720 | Program list extraction |
| 2 | https://catalog.slcc.edu/content.php?catoid=28&navoid=9704 | Course extraction stress test |
| 3 | https://www.slcc.edu/academics/programs/index.aspx | Website-vs-catalog program comparison |
| 4 | https://www.slcc.edu/academicadvising/ | Service/contact extraction |
| 5 | https://www.slcc.edu/contact/index.aspx | General contact/service extraction |
| 6 | https://www.slcc.edu/financialaid/ | Policy/service/deadline extraction |
| 7 | https://www.slcc.edu/academiccalendar/ | Event/date extraction |

---

## Source Type Notes

### Website

Use for:
- Institution-facing content
- Service pages
- Contact pages
- Program marketing pages
- Audience-oriented explanations

### Catalog

Use for:
- Authoritative academic facts
- Programs
- Courses
- Requirements
- Academic policies
- Degree/award vocabulary

### Directory

Use for:
- People
- Offices
- Contact routes
- Service ownership
- Phone/email/location data

---

## Crawl Guardrails

- Do not crawl authenticated portals.
- Do not crawl MySLCC, Canvas, or forms requiring login.
- Do not treat third-party SEO pages as SLCC truth.
- Prefer `slcc.edu` and `catalog.slcc.edu`.
- For Day 30, prioritize authoritative pages over broad crawl volume.
- Preserve exact source URLs for every observation.
- No citation means no observation.

---

## First Questions for the Pipeline

1. Can the crawler fetch SLCC catalog pages reliably?
2. Can catalog programs become `Entity(type="program")` observations?
3. Can catalog courses become `Entity(type="course")` observations?
4. Can program/course relationships be extracted without hallucination?
5. Can website-vs-catalog conflicts be detected instead of overwritten?
6. Can service/contact pages produce useful organization, person, service, and contact-related observations?
7. Can block generation produce ProgramBlock, CourseBlock, DepartmentBlock, ServiceBlock, and ContactBlock projections from promoted canonical state?

---

## Notes for Claude / Implementation

Start with the smoke test URL set before attempting a broader crawl.

Expected source-type precedence for initial SLCC policy:

```json
{
  "precedence": [
    { "sourceType": "catalog", "rank": 1 },
    { "sourceType": "directory", "rank": 2 },
    { "sourceType": "website", "rank": 3 }
  ],
  "tiebreaker": "confidence",
  "scope": "all"
}
```

This should be stored as a `Policy(type="source_precedence")`, not hardcoded.

---

## Related

- [[extraction-pipeline-spec]]
- [[SLCC Material Facts Checklist]]
- [[ADR-001 — Entry Wedge Selection]]
- [[ADR-002 — Institutional Model Primitives]]
- [[ADR-011 — Background Job Platform]]
