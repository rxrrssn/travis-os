---
type: session-note
domain: corveaux
status: complete
date: 2026-06-05
tags:
  - catalog
  - academic-catalog
  - courses
  - programs
  - schema
  - seed-data
  - session-log
---

# Corveaux Platform Build — Session 13

## What Was Built

Academic Catalog management module. Built from scratch, fully aligned with Corveaux canonical-data principles: one course record per course per tenant, programs reference courses they never duplicate, prerequisites and corequisites are explicit typed relationships, and programs link to the existing Organization model so departmental ownership is always clear.

SLCC's catalog (catalog.slcc.edu) was reviewed as reference before designing the data model.

---

## Data Model — `Cat` prefix

### `CatSubject`
Course prefix/discipline area (e.g. MATH, BIOL, CS). Links to `Organization` so academic departments own their subject areas.

Fields: `tenantId`, `orgId → Organization`, `code`, `name`, `description`, `isActive`, `sortOrder`

Unique: `[tenantId, code]`

### `CatCourse`
Canonical course record. One instance per course per tenant.

Fields: `tenantId`, `subjectId → CatSubject`, `number` (e.g. "1010"), `title`, `description`, `credits`, `creditMin`, `creditMax`, `level` (DEVELOPMENTAL | UNDERGRADUATE | GRADUATE), `status` (ACTIVE | INACTIVE | PENDING), `isGenEd`, `genEdAreas` (JSON array), `notes`

Unique: `[tenantId, subjectId, number]`

### `CatCourseRequisite`
Typed prerequisite/corequisite relationship between two courses. Never embedded as strings — explicit FK relationships.

Fields: `tenantId`, `courseId → CatCourse`, `requisiteId → CatCourse`, `requisiteType` (PREREQUISITE | COREQUISITE | RECOMMENDED), `canConcurrent`, `minGrade`, `notes`

Unique: `[tenantId, courseId, requisiteId, requisiteType]`

### `CatProgram`
Degree or certificate. Links to `Organization` (administering department). Never stores course data — references `CatCourse` through `CatProgramCourse`.

Fields: `tenantId`, `orgId → Organization`, `title`, `slug`, `degreeType` (AA | AS | AAS | AAS_CTE | TECH_CERT | ACADEMIC_CERT | APE | BS | BA | TRANSFER), `description`, `totalCredits`, `minGPA`, `outcomes`, `catalogYear`, `status`, `notes`

Unique: `[tenantId, slug]`

### `CatProgramCourse`
Join table between program and course. Tracks requirement type and optional group label (for elective groups).

Fields: `tenantId`, `programId → CatProgram`, `courseId → CatCourse`, `requirementType` (REQUIRED | CORE | ELECTIVE | RECOMMENDED), `groupLabel`, `sortOrder`, `notes`

Unique: `[tenantId, programId, courseId]`

---

## Organization model update

Added reverse relations to `Organization`:
- `catSubjects  CatSubject[]`
- `catPrograms  CatProgram[]`

Added reverse relations to `Tenant`:
- `catSubjects`, `catCourses`, `catCourseRequisites`, `catPrograms`, `catProgramCourses`

---

## Migration

`prisma/migrations/20260605144424_add_academic_catalog`

---

## UI Routes Built

All under `/t/[slug]/admin/catalog/`:

| Route | Purpose |
|-------|---------|
| `/catalog` | Dashboard with subject/course/program counts and quick links |
| `/catalog/subjects` | Subject list (code, name, org, course count) |
| `/catalog/subjects/new` | Create subject form |
| `/catalog/subjects/[subjectId]` | Subject detail + course list; inline edit form |
| `/catalog/courses` | Course list with subject filter and search |
| `/catalog/courses/new` | Create course form (subject, number, credits, level, gen ed) |
| `/catalog/courses/[courseId]` | Course detail: description, requisites panel, program membership, "prerequisite for" panel; inline edit form |
| `/catalog/programs` | Program list (grouped by degree type) |
| `/catalog/programs/new` | Create program form |
| `/catalog/programs/[programId]` | Program detail: credit summary, course requirement groups, add/remove courses, learning outcomes; inline edit form |

### Server actions (`actions.ts`)
- `createSubject`, `updateSubject`
- `createCourse`, `updateCourse`
- `addRequisite`, `removeRequisite`
- `createProgram`, `updateProgram`
- `addProgramCourse`, `removeProgramCourse`

---

## Shell Updates

**`TenantAdminShell.tsx`:** Added `Catalog` nav item (GraduationCap icon) between Organizations and Assistant.

**`/t/[slug]/admin/page.tsx`:** Added Catalog module card ("Courses & programs") to the dashboard grid.

---

## Seed Data — Corveaux Community College (Demo Tenant)

### Academic Organizations Created

Hierarchy under `corveaux-demo-college`:

```
Corveaux Community College
├── College of STEM
│   ├── Department of Mathematics
│   ├── Department of Computer Science
│   ├── Department of Biology
│   └── Department of Chemistry
├── College of Humanities & Social Sciences
│   ├── Department of English
│   ├── Department of History
│   ├── Department of Communication
│   ├── Department of Psychology
│   └── Department of Sociology
├── College of Business
│   ├── Department of Accounting
│   └── Department of Business
└── College of Health Sciences
    └── Department of Nursing & Allied Health
```

### Subjects (12)

| Code | Name | Department |
|------|------|-----------|
| ENGL | English | Dept. of English |
| MATH | Mathematics | Dept. of Mathematics |
| CS | Computer Science | Dept. of Computer Science |
| BIOL | Biology | Dept. of Biology |
| CHEM | Chemistry | Dept. of Chemistry |
| PSYC | Psychology | Dept. of Psychology |
| SOC | Sociology | Dept. of Sociology |
| HIST | History | Dept. of History |
| COMM | Communication | Dept. of Communication |
| ACCT | Accounting | Dept. of Accounting |
| BUS | Business | Dept. of Business |
| HIM | Health Information Management | Dept. of Nursing & Allied Health |

### Courses (53)

**ENGL (6):** 0900 Developmental Writing, 1010 Intro College Writing (Gen Ed EN), 1020 Intermediate College Writing (Gen Ed EN), 2100 Intro to Literature (Gen Ed HU), 2200 Creative Writing, 2400 Technical Writing

**MATH (8):** 0900 Developmental Mathematics, 1010 Quantitative Reasoning (Gen Ed QS), 1030 Intro Statistics (Gen Ed QS), 1050 College Algebra (Gen Ed QS), 1060 Trigonometry, 2010 Calculus I, 2020 Calculus II, 2030 Multivariable Calculus

**CS (8):** 1030 Intro to Computer Science (Gen Ed QS), 1400 Intro Programming, 1410 OOP, 2300 Database Systems, 2420 Data Structures & Algorithms, 2450 Software Engineering I, 2810 Web Development I, 2820 Web Development II

**BIOL (6):** 1010 General Biology (Gen Ed LS), 1610 Biology for Majors I, 1620 Biology for Majors II, 2060 Human Anatomy, 2065 Human Physiology, 2100 Microbiology

**CHEM (3):** 1010 Intro Chemistry (Gen Ed PS), 1110 General Chemistry I, 1120 General Chemistry II

**PSYC (4):** 1010 Intro Psychology (Gen Ed SS), 2010 Human Development (Gen Ed SS), 2100 Stats for Behavioral Science, 2300 Abnormal Psychology

**SOC (3):** 1010 Intro Sociology (Gen Ed SS), 1020 Social Problems (Gen Ed SS), 2400 Research Methods in Social Science

**HIST (4):** 1700 US History I (Gen Ed DV), 1710 US History II (Gen Ed DV), 2700 World History I (Gen Ed DV), 2710 World History II (Gen Ed DV)

**COMM (3):** 1010 Intro Mass Communication (Gen Ed HU), 1020 Public Speaking (Gen Ed CO), 2110 Interpersonal Communication (Gen Ed CO)

**ACCT (4):** 1010 Intro Accounting, 1110 Financial Accounting I, 1120 Financial Accounting II, 2010 Managerial Accounting

**BUS (7):** 1010 Intro Business, 1020 Business Ethics (Gen Ed ET), 1150 Business Communications, 2100 Principles of Management, 2110 Principles of Marketing, 2120 Human Resources Management, 2200 Entrepreneurship & Innovation

**HIM (3):** 1010 Intro Health Information Management, 1020 Medical Terminology, 2010 Clinical Classification Systems

### Prerequisite Chains

- ENGL: 0900 → 1010 → 1020 → 2100/2200/2400
- MATH: 0900 → 1010/1050 → 1060 (coreq) → 2010 → 2020 → 2030
- CS: 1400 → 1410 → 2420/2450; 2810 → 2820; 2420 requires MATH 1050
- BIOL: 1610 → 1620; 1610 → 2060 → 2065; 1610 → 2100
- CHEM: MATH 1050 → 1110 → 1120
- PSYC: 1010 → 2100, 2300
- ACCT: 1010 (recommended) → 1110 → 1120; 1110 → 2010

### Programs (6)

| Program | Degree | Credits | Department |
|---------|--------|---------|-----------|
| Associate of Arts — General Studies | AA | 60 | Institution |
| Associate of Science — Computer Science | AS | 63 | Dept. of CS |
| Associate of Science — Biology | AS | 62 | Dept. of Biology |
| Associate of Applied Science — Business Management | AAS | 60 | Dept. of Business |
| Technical Certificate — Web Development | TECH_CERT | 30 | Dept. of CS |
| Associate of Applied Science — Accounting | AAS | 60 | Dept. of Accounting |

Each program has: description, learning outcomes, total credit hours, catalog year (2026-2027), and a full course list with REQUIRED / ELECTIVE / CORE classification and group labels for elective choices.

---

## Validation

- `npx prisma generate` — clean
- `npx tsc --noEmit` — clean
- `npm run build` — clean; all 10 catalog routes compiled
- `npx prisma db seed` — clean; 12 subjects, 53 courses, 6 programs seeded
- Dev server smoke test — all catalog routes respond (307 auth redirect, as expected)

---

## Not Yet Built

- Public catalog pages for prospective students (`/t/[slug]/academic-catalog/`)
- Program comparison view
- Degree audit / student program progress tracker
- Course section scheduling (when/where a course is offered)
- Cross-listed courses (same content across multiple subjects)
- Transfer articulation tables
- RBAC enforcement on catalog admin routes

---

## Files Created / Modified

**New:**
- `prisma/migrations/20260605144424_add_academic_catalog/migration.sql`
- `src/app/t/[slug]/admin/catalog/layout.tsx`
- `src/app/t/[slug]/admin/catalog/page.tsx`
- `src/app/t/[slug]/admin/catalog/actions.ts`
- `src/app/t/[slug]/admin/catalog/subjects/page.tsx`
- `src/app/t/[slug]/admin/catalog/subjects/new/page.tsx`
- `src/app/t/[slug]/admin/catalog/subjects/[subjectId]/page.tsx`
- `src/app/t/[slug]/admin/catalog/courses/page.tsx`
- `src/app/t/[slug]/admin/catalog/courses/new/page.tsx`
- `src/app/t/[slug]/admin/catalog/courses/[courseId]/page.tsx`
- `src/app/t/[slug]/admin/catalog/programs/page.tsx`
- `src/app/t/[slug]/admin/catalog/programs/new/page.tsx`
- `src/app/t/[slug]/admin/catalog/programs/[programId]/page.tsx`

**Modified:**
- `prisma/schema.prisma` — 5 new Cat* models; Organization + Tenant reverse relations
- `prisma/seed.ts` — full academic catalog seed for Corveaux Community College
- `src/components/shell/TenantAdminShell.tsx` — Catalog nav item added
- `src/app/t/[slug]/admin/page.tsx` — Catalog module card added

---

## Related

[[Corveaux]]
[[Corveaux Platform Build - Session 12]]
[[Corveaux Architecture Session - 2026-05-27]]
