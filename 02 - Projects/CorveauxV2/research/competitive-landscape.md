---
type: research
domain: corveaux
status: complete
date: 2026-06-06
tags: [corveaux, competitive, market]
---

# Competitive Landscape

**Status:** Complete. Researched 2026-06-06 via live web research.

---

## Research Questions — Resolved

- [x] Which vendors are actively pitching higher-ed AI?
- [x] What is the catalog platform lock-in story?
- [x] Who does the CIO already have contracts with?
- [x] What does a typical SLCC tech stack look like?
- [x] What does a competitive displacement conversation actually look like?

---

## 1. AI Vendors Actively Pitching Higher Education (2024–2026)

### Infrastructure / Platform Giants

**Microsoft**
- Copilot for Education and Azure OpenAI Service are the dominant entry points
- Confirmed deployments at UCLA Anderson, CSU Fullerton, University of Maryland, Case Western Reserve, University of South Florida, University of Sydney, University of Oslo
- Strategy: sell Azure as the FERPA/GDPR-compliant AI cloud layer; institutions build on top via wrappers like Cloudforce nebulaONE
- Per 2024 EDUCAUSE AI Landscape Study: 89% of institutions are engaged in AI strategic planning — Microsoft is the most-embedded infrastructure vendor

**OpenAI**
- Arizona State University partnership announced early 2024 — first major US university ChatGPT Enterprise deal
- Cal State system-wide partnership announced 2025

**Google**
- Part of Cal State's public-private AI partnership alongside Microsoft and OpenAI
- Pitching Vertex AI and Workspace AI to large systems

**Salesforce**
- Education Cloud 2.0 launched May 2024 — expanded enrollment management, student success, alumni relations
- Signed University of California system for core CRM June 2024 (marquee win)
- ~18% share in higher-ed CRM market
- $1.2B Data and AI ARR growing 120% YoY; Agentforce ARR ~$440M
- Strategy: wrap the student lifecycle in a CRM + AI layer; competes with Ellucian on student data ownership

### Incumbent ERP/SIS Vendors Adding AI

**Ellucian**
- Banner: 24% North American SIS market share — single largest vendor
- Ethos platform: integration/API layer connecting Banner/Colleague to third-party tools and AI features
- Institution-wide AI adoption among Ellucian clients: 49% (2024) → 66% (2025)
- AI embedded into Ellucian Student, Journey (advising), Student Financial Success
- Strategy: make AI a Banner extension; lock institutions deeper into the ecosystem
- 32 SaaS go-lives in 2025; migrating legacy Banner clients to cloud

**Anthology (Blackboard)**
- LMS + SIS + CRM combined platform
- AVA (Anthology Virtual Assistant) suite: AI Design Assistant, AVA Automations (nudges), AI Badge Creator
- 760+ global institutions; 2.8M AI tool uses as of July 2025 — included in core Blackboard license
- Tambellini 2024 names Anthology as one of the leading student system vendors selected by US institutions

**Oracle PeopleSoft**
- 10% SIS market share, stagnant; slow cloud migration
- Still significant at larger R1 universities

**Workday Student**
- 3% SIS market share but fastest growing
- 400+ institutions live; capturing migrants from Banner, Colleague, PeopleSoft, Jenzabar
- Strong play where Workday HCM/Finance is already deployed (unified platform sell)

**Jenzabar**
- 11% SIS market share (slow, steady decline)
- Primarily smaller private colleges and universities

### Purpose-Built Higher-Ed Platforms

**Modern Campus**
- Private equity-backed; Toronto, Canada
- Products: Omni CMS (550+ institutions), Acalog/Catalog, Curriculog, Section (scheduling), Register
- 850+ campuses on catalog/curriculum/scheduling suite
- Acquisitions: DIGARC (Acalog/Curriculog) June 2021, nuCloud (campus maps), Presence (engagement)
- Adding AI across the suite; cross-sell bundling is the growth engine
- **Most direct competitive overlap with Corveaux's knowledge layer**

**EAB Navigate360**
- Student success, advising automation, early alerts
- Hundreds of institutions; strong research/advisory arm that pre-conditions buyers
- Adding AI to Navigate in 2024–2025

**Civitas Learning**
- Predictive analytics and coordinated student support
- Direct EAB competitor — UT San Antonio replaced EAB Navigate with Civitas

**Coursedog**
- Academic operations: scheduling, curriculum, catalogs, assessment, analytics
- ~110 customers; growing
- Published 2025 StarChart vendor comparison report

**Kuali**
- Cloud-based curriculum and catalog management for community colleges
- Modular pricing; more affordable than CourseLeaf or Acalog
- Notable installs: Blue Mountain Community College, Leeward Community College

**Instructure / Canvas**
- LMS market leader alongside Blackboard
- Open ecosystem approach; adding AI features
- Owns student data through LMS but not a direct catalog/curriculum competitor

---

## 2. The Catalog Platform Market

### Market Size

- Global market: $1.28B in 2024; CAGR 11.2% through 2033 (projected $3.03B)
- Cloud deployment is the fastest-growing segment

### Market Share

| Vendor | Share | Installed Base |
|---|---|---|
| Modern Campus Catalog (formerly Acalog) | ~42% | 850+ campuses (across catalog + curriculum + scheduling suite) |
| CourseLeaf (Leepfrog Technologies) | ~25% | 500+ clients, 5.5M students |
| Kuali | small | Growing; community college focus |
| Watermark | small | Also does assessment/accreditation |
| Coursedog | growing | ~110 customers overall |
| Clean Catalog | niche | Low-cost; offers free migration |

### CourseLeaf Detail

- Revenue: $50–100M; 150 employees; Iowa City, IA; founded 1994
- Products: CourseLeaf CAT (catalog publication), CourseLeaf CIM (curriculum inventory management), plus scheduling and advising modules
- Strong community college penetration — Citrus College was first CA community college (2018); now many CA community colleges on CourseLeaf
- Native integration with Banner, PeopleSoft, Colleague

### Modern Campus / Acalog Detail

- Formerly DIGARC's Acalog product; acquired by Modern Campus June 2021
- Acalog = catalog product; Curriculog = curriculum workflow/approval; Section = scheduling; Register = registration
- Omni CMS (formerly OU Campus) integration available — sells across content + curriculum stack
- Cross-sell is the business model: institutions on Acalog get upsold Curriculog, then Section, then Register

### Stickiness and Lock-In

Both CourseLeaf and Acalog are deeply entrenched:

1. **Workflow ownership** — Every curriculum change flows through these systems. Approval chains, committee workflows, and governance are embedded in the software. Displacing the catalog tool means displacing governance itself.
2. **SIS integration** — Both push approved courses/programs directly into Banner or PeopleSoft. Rebuilding this integration is an IT project.
3. **Data migration** — Years of catalog history, program versions, policy language, and course archives live inside these platforms. Extraction + reformatting + validation is a multi-month project.
4. **Institutional memory** — Faculty and curriculum committees have learned the system. Change management costs are real.
5. **Accreditation ties** — Catalog content is cited in accreditation reports (HLC, SACSCOC, WASC). Institutions are risk-averse about system changes during accreditation cycles.

### What Displacement Actually Looks Like

- Displacement events are rare; typically triggered by: (a) vendor price increases, (b) failed product roadmap, (c) major SIS migration forcing reevaluation, or (d) new Registrar/CIO hire with a prior vendor preference
- Typical implementation timeline after decision: 12–18 months to go-live
- Parallel systems often run during transition
- Clean Catalog's "free migration" offer signals that data migration pain is the #1 barrier to switching

---

## 3. Typical Community College Tech Stack (SLCC-Scale)

### SLCC Confirmed Stack

- **SIS:** Ellucian Banner (confirmed — Banner Links and Banner 9 pages on SLCC site)
- **LMS:** Canvas (Instructure) — confirmed
- **Productivity:** Microsoft 365 / Office 365 — confirmed
- **Adobe Creative Cloud:** available to certain program students
- **Catalog:** catalog.slcc.edu — appears custom or Acalog-based (further verification needed)

### Industry-Wide Pattern (SLCC-Scale, ~60K students)

| Layer | Common Vendors |
|---|---|
| SIS / ERP | Banner (24%), Colleague (11%), Jenzabar (11%), Anthology (10%), PeopleSoft (10%), Workday (3%) |
| LMS | Canvas (Instructure), Blackboard (Anthology), D2L Brightspace |
| Course Catalog | Modern Campus/Acalog (42%), CourseLeaf (25%), Kuali |
| Curriculum Management | Curriculog (Modern Campus), CourseLeaf CIM, Kuali, Watermark |
| Web CMS | Omni CMS (Modern Campus, 550+ installs), Cascade CMS (Hannon Hill), WordPress, Drupal |
| CRM / Student Success | Salesforce Education Cloud (~18% HE CRM), EAB Navigate, Civitas Learning, Ellucian Recruit |
| Productivity | Microsoft 365 (dominant in community colleges), Google Workspace |
| Advising / Degree Audit | EAB Navigate, DegreeWorks (Ellucian), Civitas, Kuali Advisor |
| Identity / SSO | Microsoft Entra ID, Okta |
| Document Management | Softdocs, Hyland OnBase, DocuWare |

---

## 4. Incumbent Vendor Contracts — Who the CIO Already Has

### Tier 1 — Non-Negotiable Incumbents

Multi-year SaaS contracts, deep integration, near-zero displacement probability:

- **Ellucian** (Banner SIS — the system of record)
- **Microsoft** (M365 campus-wide; Azure cloud infrastructure)
- **Canvas / Instructure** (LMS — multi-year contract; enormous faculty training sunk cost)

### Tier 2 — Significant Incumbents

3–5 year contracts, moderate switching cost:

- **Modern Campus** or **CourseLeaf** (catalog/curriculum — governance-embedded)
- **EAB** or **Civitas Learning** (student success / advising)
- **Salesforce** (if Education Cloud bet has been made — very sticky CRM once deployed)
- **Adobe** (Creative Cloud licensing)
- **Microsoft Entra ID** or **Okta** (SSO/identity)

### Tier 3 — Replaceable but Entrenched

1–3 year contracts, lower switching cost:

- **Cascade CMS** or **Omni CMS** (web platform — often a single staff person "owns" this)
- **Softdocs / OnBase** (document management)
- **Zoom / Teams** (communication)

### Why These Are Hard to Displace

1. **Contract cycles:** Technology contracts are 3–5 years; community colleges budget annually or biennially. Entry requires hitting the right procurement window.
2. **Cooperative purchasing:** Most community colleges buy through OMNIA Partners, Sourcewell, or E&I Cooperative with pre-negotiated pricing. New vendors without cooperative contracts face 6–12 extra months of procurement friction.
3. **Small IT teams:** Community college IT may be 5–15 people; they concentrate on known vendors.
4. **FERPA/security review:** Any new vendor must pass a formal security review — adds months.
5. **Governance buy-in:** Curriculum tools require Faculty Senate and Academic Affairs approval, not just IT. Decision chain is 5–8 stakeholders deep.

---

## 5. The Competitive Displacement Conversation

### Stakeholders Who Must All Say Yes

- VP of Academic Affairs / Provost — accreditation, program quality, faculty workload
- Registrar — owns catalog and curriculum workflow; most attached to existing systems
- CIO / VP of Technology — integration, security, vendor count, budget
- VP of Marketing / Communications — website, student-facing content, brand
- Institutional Research — data quality and reporting

### Entry Points — Pain They Already Feel

Pick one based on context:

- "Your catalog is out of date before it publishes"
- "AI systems are answering questions about your programs with wrong information because your site isn't structured for extraction"
- "Your faculty spend 12–18 months in curriculum approval cycles"
- "When HLC asks for your program inventory, it takes weeks to assemble from multiple systems"

### Obstacle Handling

**"We already have Acalog / CourseLeaf."**
Corveaux does not replace your catalog workflow. It sits above it — reads what you've approved and structures it for AI, portals, advisors, and any other downstream system. Your Acalog stays.

**"We have to go through procurement / RFP."**
When does your procurement window open? (FY2027 = late 2026 positioning for most Utah community colleges.) Being on a cooperative purchasing vehicle removes this friction.

**"We don't have budget."**
What's the cost of an accreditation finding about catalog accuracy? What's the cost of wrong AI-generated answers about your programs reaching 10,000 prospective students? Reframe from cost to risk.

**"IT won't approve another vendor."**
Corveaux integrates with what you already have. Read access to your catalog and web content — no new database, no new SIS integration required.

**"Faculty governance will push back."**
Corveaux does not touch curriculum decisions. We read decisions that have already been made and make them structurally useful. Zero change to the approval process.

### The Proof Point

The Day 30 Gate (>90% accuracy on SLCC facts) is the conversation closer.

"Here is your institution. Here are the facts we extracted. Here is what AI systems now know about you correctly — and here is what they were getting wrong before."

The demo is the generated tenant against a real institution the buyer can verify, not a slide deck.

### The Land Footprint

Do not pitch displacing Banner, Acalog, or Canvas. Land as:
- A knowledge extraction layer (reads existing systems)
- An institutional intelligence product (structured facts, AI-ready)
- A single new budget line at $30–80K/year for a community college

Expand from there once trust and data value are established.

---

## Key Strategic Observations

**Modern Campus is the most direct competitive overlap** — 42% catalog share AND 550 web CMS deployments. But they are a workflow/authoring tool, not a knowledge extraction/AI layer. They own authoring. Corveaux wants to own structured canonical output. These are different surfaces that can coexist initially.

**Ellucian is simultaneously the biggest incumbent and the best potential channel** — Banner in 24% of all North American institutions. A clean Ethos/Banner read integration is a technical story that resonates immediately with CIOs already inside the Ellucian ecosystem.

**The AI narrative has commoditized** — Ellucian, Anthology, Modern Campus, EAB all say "AI-powered." Corveaux must differentiate on institutional accuracy, canonical truth, and the structured model that makes AI correct about a specific institution. Not "AI" generically.

**Community college procurement cycles are 6–18 months** — FY2027 positioning (July 2027 start) needs to begin in fall 2026. Budget conversations for FY2026 have largely closed.

**Cooperative purchasing is the fastest path** — OMNIA Partners, E&I Cooperative, Sourcewell. Without being on one of these vehicles, expect 6–12 months of additional procurement friction on every community college deal.

---

## Sources

- ListEdTech, North American SIS HigherEd Market Share — January 2025 Update
- Verified Market Research, Higher Ed Catalog Software Report: Market Share & Analyst Picks
- Gartner Peer Insights, Higher Education Catalog and Curriculum Management Solutions
- Modern Campus, DIGARC Acquisition Press Release (June 2021)
- Leepfrog Technologies, CourseLeaf About page
- Ellucian Newsroom, AI-Enabled Innovation and EDUCAUSE 2025
- Anthology, AI Innovations in Blackboard (July 2025)
- EDUCAUSE Review, AI Procurement in Higher Education (March 2025)
- Tambellini Group, 2025 Higher Education Market Trends and Leaders
- ListEdTech, Catalog Management — A New Product Category
- Coursedog, 2025 StarChart Academic Operations Vendor Report
- Microsoft Education Blog, AI-ready campuses (June 2025)
- SLCC public web presence (Banner Links, Banner 9, catalog.slcc.edu)

---

## Related

- [[GTM Hypothesis]]
- [[ADR-001 — Entry Wedge Selection]]
- [[buyer-personas]]
- [[Vendor Displacement Strategy]]
- [[SLCC Validation Run]]
