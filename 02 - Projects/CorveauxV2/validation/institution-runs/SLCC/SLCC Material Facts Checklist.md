# SLCC Material Facts Checklist — Day 30 Validation

**Project:** Corveaux V2  
**Purpose:** Manual scoring checklist for the SLCC Day 30 validation gate.  
**Status:** Draft. Fill in exact expected values during/after source review.  
**Prepared:** 2026-06-05

---

## Validation Goal

The Day 30 validation run succeeds only if Corveaux extracts and promotes SLCC material facts with:

- Greater than 90% accuracy on reviewed material facts
- Citations for every promoted observation
- No hallucinated programs, courses, departments, services, or policies
- No `tenant_id` on tenant database records
- Conflicts surfaced rather than silently overwritten

---

## Scoring Method

For each reviewed fact, mark:

| Result | Meaning |
|---|---|
| PASS | Correct value, correct source citation, promoted cleanly |
| PARTIAL | Mostly correct but missing relationship, weak citation, or minor normalization issue |
| FAIL | Incorrect, hallucinated, uncited, wrong source, or destructive overwrite |
| CONFLICT | Source disagreement detected and routed to review correctly |

Suggested scoring:

```text
PASS = 1.0
PARTIAL = 0.5
FAIL = 0
CONFLICT = not counted as failure if correctly surfaced
```

Accuracy:

```text
(PASS + 0.5 * PARTIAL) / reviewed non-conflict facts
```

---

## 1. Programs

Validate that programs are extracted as canonical entities.

Expected canonical representation:

```text
Entity(type="program")
canonicalKey="program:<normalized-program-name>"
```

### Program Fact Checks

| Program / Source Area | Fact | Expected Source | Expected Canonical Target | Result | Notes |
|---|---|---|---|---|---|
| Accounting | Program name | Catalog / Programs page | Entity(type="program") |  |  |
| Biology: AS | Program name + award type | Catalog programs list | Entity(type="program") |  |  |
| Computer Science / CSIT area | Program/area relationship | Catalog + website area page | Entity + Relationship |  |  |
| Health Sciences programs | Program names + award types | Website area page / catalog | Entity(type="program") |  |  |
| Business-related programs | Program names + area relationship | Programs page / catalog | Entity + Relationship |  |  |

### Required Program Fields

| Field | Required? | Notes |
|---|---:|---|
| displayName | Yes | Must match source name closely |
| canonicalKey | Yes | Normalized and stable |
| program_type / award type | If present | AA, AS, AAS, certificate, technical certificate, etc. |
| total_credits | If present | Catalog should outrank website if conflict exists |
| cip_code | If published | Do not hallucinate |
| description | If present | Citation required |
| owning organization / area | If inferable with citation | Prefer relationship over flat attribute |

---

## 2. Courses

Validate that courses are extracted as canonical entities.

Expected canonical representation:

```text
Entity(type="course")
canonicalKey="course:<subject-code>-<course-number>"
```

### Course Fact Checks

| Course | Fact | Expected Source | Expected Canonical Target | Result | Notes |
|---|---|---|---|---|---|
| MATH 1010 / MATH-1010 | Course code + title + credits | Catalog course descriptions | Entity(type="course") |  | Verify exact course existence/current listing |
| ENGL 1010 / ENGL-1010 | Course code + title + credits | Catalog course descriptions | Entity(type="course") |  | Verify exact course existence/current listing |
| BIOL 1010 / BIOL-1010 | Course code + title + credits | Catalog course descriptions | Entity(type="course") |  | Appears in catalog search snippets; verify page |
| POLS 1100 / POLS-1100 | Course code + title + relationship to AI requirement | Catalog program/Gen Ed page | Entity + Relationship/Policy |  | Verify exact title/current listing |
| HIST 1700 / HIST-1700 | Course code + title + relationship to AI requirement | Catalog program/Gen Ed page | Entity + Relationship/Policy |  | Verify exact title/current listing |

### Required Course Fields

| Field | Required? | Notes |
|---|---:|---|
| subject_code | Yes | Example: MATH |
| course_number | Yes | Example: 1010 |
| displayName/title | Yes | Must be cited |
| credits | If present | Must be cited |
| description | If present | Must be cited |
| prerequisites | If present | Relationship or policy; do not flatten blindly |
| corequisites | If present | Relationship or policy; do not flatten blindly |
| restrictions | If present | Policy candidate |

---

## 3. Organizations / Departments / Areas

Validate that departments, schools, offices, areas, and service units are extracted as organizations, not custom tables.

Expected canonical representation:

```text
Entity(type="organization")
attributes.org_type = "department" | "office" | "school" | "area" | "division"
```

### Organization Fact Checks

| Organization / Unit | Fact | Expected Source | Expected Canonical Target | Result | Notes |
|---|---|---|---|---|---|
| Academic Advising | Service/unit name + contact channels | SLCC Academic Advising page | Entity(type="organization" or "service") + relationships |  |  |
| Office of Student Success | Office name + staff contacts | OSS contact page | Entity(type="organization") + Person entities |  |  |
| International Student Services | Office/service name + purpose/contact | ISS pages | Entity(type="organization" or "service") |  |  |
| Facilities Services Division | Service/unit name + work request contact | Facilities page | Entity(type="organization" or "service") |  |  |
| Computer Science and Information Technology | Area of study / academic unit | CSIT area page | Entity(type="organization") or Entity(type="service"/area config) |  | Decide canonical type via registry |

### Required Organization Fields

| Field | Required? | Notes |
|---|---:|---|
| displayName | Yes | Source-exact enough |
| canonicalKey | Yes | Stable normalized key |
| org_type | If inferable | office, department, school, division, area |
| contact email | If present | Could be identifier/contact attribute depending design |
| phone | If present | Must be cited |
| location | If present | Location entity or attribute; avoid over-modeling at Day 30 |
| parent organization | If present | Relationship(type="part_of") |

---

## 4. Services

Validate that service pages become service-oriented records/projections.

Expected canonical representation:

```text
Entity(type="service")
```

or

```text
Entity(type="organization") + relationships/policies
```

depending on canonical type registry decision.

### Service Fact Checks

| Service | Fact | Expected Source | Expected Canonical Target | Result | Notes |
|---|---|---|---|---|---|
| Academic Advising | Front desk phone numbers and advising process | Academic Advising pages | Service/Organization + ContactBlock |  |  |
| Admissions | Admissions/registration support info | Admissions page | Service/Organization |  |  |
| Financial Aid | Summer 2026 financial aid information/deadline rules | Financial Aid page | Service + Policy/Event/date |  |  |
| MySLCC Help / Technical Support | Phone/email/help desk | Contact page / i.slcc.edu | Service + contact identifiers |  |  |
| International Student Services | Purpose, location, hours, email, phone | ISS pages | Service + location/contact |  |  |
| Facilities Work Request / FIX IT | Phone/email/work request routing | Facilities contact page | Service + routing/contact |  |  |

### Required Service Fields

| Field | Required? | Notes |
|---|---:|---|
| displayName | Yes | Service name |
| description/purpose | If present | Citation required |
| phone | If present | Citation required |
| email | If present | Citation required |
| hours | If present | Citation required |
| location | If present | Citation required |
| owning organization | If inferable | Relationship |

---

## 5. Policies / Rules / Dates

Validate that rules and institutional logic become Policy or Event records, not loose content.

### Policy / Event Fact Checks

| Policy / Rule / Date | Fact | Expected Source | Expected Canonical Target | Result | Notes |
|---|---|---|---|---|---|
| Source precedence policy | Catalog > directory > website for initial run | Seeded tenant policy | Policy(type="source_precedence") |  | Should be tenant config, not hardcoded |
| Academic Policies & Procedures | Policy titles/bodies | Catalog academic policies page | Policy observations |  | Verify current nav URL |
| Degree definitions | AA, AS, AAS, APE, certificates | Degrees page / catalog | Policy or attribute vocabulary |  |  |
| Financial aid freeze/deadline | Summer 2026 financial aid credit hour freeze date | Financial Aid page | Policy/Event observation |  |  |
| Academic calendar dates | Admissions deadlines, class start, tuition due, residency deadlines | Academic Calendar | Event observations |  | Use caution: term-specific |

### Required Policy/Event Fields

| Field | Required? | Notes |
|---|---:|---|
| policyType/eventType | Yes | Must use type registry |
| name | Yes for policies | Human-readable |
| rules/payload | Yes | Structured enough for review |
| occurredAt | If event | Dates only when directly stated |
| subject entity | If inferable | Link if possible |
| citationText | Always | No citation = no fact |

---

## 6. Relationships

Validate that Corveaux extracts relationships, not just isolated entities.

### Relationship Fact Checks

| Relationship | Expected Source | Expected Canonical Representation | Result | Notes |
|---|---|---|---|---|
| Program belongs to area/organization | Catalog/area pages | Relationship(type="part_of" or registry equivalent) |  |  |
| Course is required/elective within program/requirement | Catalog program pages | Relationship or Policy rules |  |  |
| Person works in / contact for office | OSS/contact pages | Relationship(type="member_of" or "contact_for") |  |  |
| Advisor supports program/area | Advisor pages | Relationship(type="advises" / "responsible_for") |  |  |
| Service located at campus/room | Service pages | Relationship(type="located_at") or LocationBlock dependency |  |  |
| Help desk supports MySLCC/tech support | Contact page | Relationship(type="responsible_for") |  |  |

### Relationship Quality Rules

- No dangling `fromCanonicalKey`.
- No dangling `toCanonicalKey`.
- Direction must make sense.
- Relationship type must use registry constants.
- Confidence below threshold should not promote.
- Weak person-name relationships should be flagged for review.

---

## 7. Content Blocks

Validate that promoted canonical state generates renderable projections.

### Block Checks

| Block Type | Minimum Expected Output | Result | Notes |
|---|---|---|---|
| ProgramBlock | Program title, award type, source URLs, confidence, dependencies |  |  |
| CourseBlock | Course code/title/credits, source URLs, dependencies |  |  |
| DepartmentBlock | Org name, contacts, related services/programs where present |  |  |
| ServiceBlock | Service name, purpose/contact/hours/location where present |  |  |
| ContactBlock | Person or office contact with phone/email/source |  |  |
| PolicyBlock | Policy title/rules/body/source |  |  |

### Block Non-Negotiables

- Blocks are projections.
- Blocks must not own canonical facts.
- Blocks must carry dependencies.
- Blocks must carry source URLs.
- Regenerated published blocks should return to REVIEW.
- Block `canonicalKey` should be stable.

---

## 8. ExtractionObservation Integrity

Validate that raw extraction is safely separated from canonical state.

| Check | Expected | Result | Notes |
|---|---|---|---|
| Every observation has `citationText` | Non-empty |  |  |
| Every observation has `sourceUrl` | Exact page URL |  |  |
| Every observation has `confidence` | Decimal 0.000–1.000 |  |  |
| No confidence below 0.50 written | True |  |  |
| Status transitions valid | pending â†’ promoted/conflict/rejected |  |  |
| Promoted observations have `promotedRecordId` | Non-null |  |  |
| Promoted observations have `promotedRecordType` | entity/relationship/policy/event |  |  |
| Rejected observations do not affect canonical state | True |  |  |
| Conflicts do not silently overwrite | True |  |  |

---

## 9. Tenant Isolation / Architecture Checks

| Check | Expected | Result | Notes |
|---|---|---|---|
| Platform DB has tenants table | Yes |  |  |
| Tenant DB has canonical/projection/pipeline tables | Yes |  |  |
| No `tenant_id` on tenant DB tables | Yes |  |  |
| Tenant context chosen by DB/schema connection | Yes |  |  |
| No `if tenant == "corveaux"` logic | Yes |  |  |
| Trigger.dev payload carries tenant context for routing | Yes |  |  |

---

## 10. Day 30 Gate Decision

### Pass Criteria

- [ ] Smoke test completes without crash
- [ ] SLCC extraction run completes
- [ ] Program/course/service/policy observations written
- [ ] Promotion engine creates canonical records
- [ ] Source precedence policy applied
- [ ] Conflicts detected where applicable
- [ ] Content blocks generated
- [ ] Manual accuracy score â‰¥ 90%
- [ ] Every promoted fact has citation/provenance
- [ ] No hallucinated material facts found in reviewed sample

### Gate Result

```text
[ ] PASS — proceed to generated tenant work
[ ] CONDITIONAL PASS — fix specific extraction defects, then proceed
[ ] FAIL — iterate extraction/promotion before generated tenant work
```

### Reviewer Notes

```text
Date:
Reviewer:
Run ID:
Source Set:
Accuracy Score:
Major Issues:
Decision:
```

---

## Related

- [[SLCC Source Inventory]]
- [[extraction-pipeline-spec]]
- [[content-block-schema]]
- [[ADR-001 — Entry Wedge Selection]]
- [[ADR-002 — Institutional Model Primitives]]
- [[ADR-012 — Canonical Schema Architecture]]
