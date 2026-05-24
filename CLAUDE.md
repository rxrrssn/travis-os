# Travis OS

## Key Notes Index

| Domain | Note |
|---|---|
| Institution | [[SLCC Overview]] |
| Contact Center | [[Contact Center]] |
| Student Messaging | [[Mainstay Brutus]] |
| Online Coaching | [[Online Success Coaching]] |
| Workflow Platform | [[TDX]] |
| Reporting / BI | [[Power Platform]] |
| Platform Vision | [[Corveaux]] |
| Communication Philosophy | [[One Voice One Brutus]] |

---

This vault is my external brain, operational memory system, and long-term context archive.

Its purpose is to:
- reduce repeated explanations
- reduce token usage
- preserve institutional and technical context
- maintain continuity across sessions
- track decisions and architecture
- document operational systems
- support strategic thinking
- capture evolving ideas before they are lost

This is NOT primarily a software repository.

It is:
- a knowledge base
- a systems-thinking workspace
- a project and operations archive
- a decision log
- a planning environment
- a technical context layer
- a personal operating system

The vault should help agents quickly understand:
- who I am
- how I think
- what systems I work in
- what projects exist
- what operational problems I care about
- what constraints matter
- what implementation style I prefer

---

# Who I Am

My name is Travis Hornbuckle.

I work at Salt Lake Community College (SLCC) as Coordinator, Success Operations Analyst, embedded primarily within the Contact Center and Online Success Coaching under Student Affairs.

Officially the role is operations and analytics focused. Functionally I operate as a systems strategist, workflow architect, and operational translator between frontline staff, leadership, data teams, and technology platforms.

Functionally, I often operate as:
- systems architect
- automation lead
- reporting/BI lead
- operational strategist
- workflow designer
- cross-functional translator
- process modernization advocate
- chatbot/platform administrator
- technical implementation specialist

Leadership trusts me with cross-functional and politically sensitive operational questions because I can translate large amounts of fragmented technical and operational information into actionable institutional strategy. Though not formally in IT leadership, architecture, or executive administration, I regularly operate adjacent to all three.

Personal site: https://www.tjhorn.com

I frequently work with:
- directors
- AVPs
- operational leadership
- enrollment leadership
- student affairs teams
- contact center staff
- coaches/advisors
- vendors
- IT-adjacent teams
- analysts/data teams

I am often responsible for translating:
- operational pain points into systems
- data into decisions
- technical complexity into actionable information
- fragmented workflows into unified processes

---

# Core Philosophy

I strongly prefer:
- unified systems
- operational simplicity
- scalable automation
- proactive communication
- centralized knowledge
- lifecycle orchestration
- reduction of unnecessary complexity

I dislike:
- fragmented vendor ecosystems
- duplicate data entry
- middleware sprawl
- disconnected systems
- operational inefficiency
- unnecessary approvals
- organizational silos
- processes that create friction for students or staff

I think in systems rather than isolated tools.

I generally approach problems by asking:
- what is the source of truth?
- where is friction introduced?
- what can be automated?
- what should be centralized?
- what can be standardized?
- how do we eliminate duplicate work?
- how do we reduce cognitive load?
- how do we scale this operationally?

A recurring principle:
"The system should do the work so people can focus on students."

---

# SLCC Context

Salt Lake Community College (SLCC) is a multi-campus community college in Utah.

Most work documented in this vault relates to:
- Student Affairs
- Contact Center operations
- Online Success Coaching
- student communications
- operational analytics
- workflow automation
- reporting
- process optimization
- student success systems
- institutional operations

The institution currently uses many disconnected systems and vendors.

Recurring institutional themes:
- operational fragmentation
- disconnected student experiences
- duplicate systems
- inconsistent communication
- siloed ownership
- process inefficiency
- heavy middleware reliance

A major personal focus is reducing fragmentation and creating more unified operational experiences.

---

# Contact Center

The Contact Center is the frontline student support operation.

Primary support channels:
- phone
- chat
- SMS
- ticketing
- outbound campaigns
- student outreach

Operational focuses include:
- first contact resolution
- transfer reduction
- IVR optimization
- staffing efficiency
- reducing student friction
- operational reporting
- proactive communication
- service consistency

Common metrics and analyses:
- transfer depth
- IVR overhead
- average handle time
- wait time
- department resolution rate (DRR)
- staffing distribution
- call routing patterns
- operational bottlenecks

Known operational analysis:
- approximately 83,000+ calls annually touching the Contact Center
- average transfer depth around 3.2
- approximately 45% of many calls consumed by IVR/hold/routing overhead
- focus on reducing navigation friction and simplifying support pathways

Recurring goals:
- reduce unnecessary transfers
- reduce IVR complexity
- improve frontline resolution
- create more seamless student experiences
- simplify institutional phone architecture

---

# Online Success Coaching

Online Success Coaching supports students through outreach, engagement, and persistence efforts.

The operation functions similarly to a student success and retention team.

Recurring workflows include:
- outreach cadences
- student engagement tracking
- intervention management
- proactive communication
- campaign segmentation
- coaching documentation

The operation currently intersects heavily with:
- TDX
- Mainstay
- student success platforms
- CRM-like workflows
- reporting and analytics

---

# Mainstay / Brutus

Mainstay is the student messaging/chatbot platform currently used.

The chatbot identity is "Brutus."

Primary focuses:
- retention messaging
- proactive student outreach
- segmented campaigns
- automated engagement
- student reminders
- communication scaling

Strong philosophical preference:
"One voice, one Brutus."

Meaning:
- unified communication identity
- reduced communication fragmentation
- centralized student engagement
- lifecycle-aware messaging

Common segmentation targets:
- holds
- enrollment status
- engagement indicators
- major/program
- risk indicators
- student lifecycle stages

---

# TDX (TeamDynamix)

TDX is used as an operational workflow and service management platform.

Current use cases include:
- Contact Center interaction records
- coaching workflows
- operational orchestration
- student interaction tracking
- automated resource delivery
- workflow automation
- request routing
- survey triggers
- CRM-like functionality

Heavy usage areas:
- workflows
- forms
- custom attributes
- automation
- API integrations
- iPaaS flows
- Power Automate integrations

A major goal is using TDX as:
- a lightweight operational CRM
- a unified orchestration platform
- a centralized operational workflow layer

Current architectural goals:
- reduce app sprawl
- centralize workflows
- automate repetitive processes
- simplify request routing
- improve operational visibility

Known implementation patterns:
- parent/child ticket structures
- cadence-based workflow generation
- automated student resource emails
- CTI integration experiments
- requestor resolution workflows
- workflow-triggered surveys

---

# Power Platform / BI

Heavy usage of:
- Power BI
- Power BI Fabric
- Power Automate
- SharePoint
- Teams
- Excel automation
- VBA/macros

Recurring data sources:
- PBX exports
- student systems
- coaching systems
- chatbot data
- TDX
- Canvas
- CRM exports

Current BI philosophy:
- automate ingestion
- centralize reporting
- preserve historical data
- minimize manual cleanup
- create operational intelligence

Current infrastructure direction:
- SharePoint landing zones
- automated append pipelines
- Fabric semantic models
- role-level security
- operational KPI dashboards
- automated reporting workflows

Strong preference for:
- operational reporting over vanity dashboards
- actionable analytics
- scalable pipelines
- automation-first architectures

---

# Corveaux

Corveaux LLC is Travis's private Delaware LLC -- a SaaS / EdTech company. Name history: Vetra -> Corvux -> Corveaux.

Taglines: "One System, One Institution, Every Student." / "The system that ensures nothing falls through."

URLs: https://www.corveaux.app / https://www.crvx.app

Not just an SIS or CRM -- the intended institutional nervous system for colleges.

Multi-tenant SaaS. Each institution is an isolated tenant. Corveaux dogfoods the platform as its own first tenant. Corveaux University is the demo environment and institutional support hub.

Core architectural principles:
- Canonical data: one PERSON, one COURSE, one DEPARTMENT, one POLICY, one KNOWLEDGE BLOCK. Everything else is a reference or contextualized view. No sync drift, no duplicates.
- Do it once, reuse everywhere: assets are referenced, not recreated.
- People change, roles persist: governance and provisioning are role-based, not person-based. Nothing is orphaned.
- Corveaux is the authoritative system for Entra/Azure provisioning.

Platform covers as native modules: SIS, LMS, CRM/admissions, student success, ITSM, HR/payroll, finance, IAM, CMS/websites, knowledge management, facilities, communications/campaigning, workflow/automation.

Wedge product: Web / CMS / Knowledge -- decentralized content ownership with canonical knowledge blocks.

Internal org structure mirrors the product: Office of Institutional Continuity, Platform, System, People & Culture.

Long-term vision: a digital institution layer where websites, workflows, campaigns, and provisioning operate automatically from canonical data.

See [[Corveaux]] for full detail.

---

# Technical Stack

Frequently used:
- Power BI Fabric
- Power Automate
- SharePoint
- Teams
- Excel/VBA
- SQL
- TeamDynamix
- RingCentral
- Mainstay
- Canvas
- Salesforce
- Banner

Development stack:
- Next.js
- Tailwind CSS
- Prisma
- NeonDB
- TypeScript
- Node.js

UI preferences:
- clean layouts
- operational dashboards
- role-aware experiences
- tenant theming
- scalable component structures

Preferred implementation style:
- complete examples
- operational realism
- scalable architecture
- minimal unnecessary abstraction
- end-to-end implementation guidance

---

# WGU / Education

Currently holds dual associate degrees: Psychology and Business Administration (concentration in Data Analytics).

Enrolled in accelerated BSIT program at Western Governors University starting 2026-06-01, with intent to continue directly into MSIT.

Primary goals:
- accelerated BSIT completion
- MSIT completion
- competency-based progression
- rapid skill validation
- long-term leadership growth

Long-term interests include:
- EdD programs
- organizational leadership
- higher education operations
- institutional transformation
- operational analytics
- student lifecycle systems

---

# Infrastructure / Lifestyle Concepts

Recurring personal interests:
- mobile/off-grid capable workflows
- remote-capable operations
- efficient living systems
- automation-assisted routines
- operational simplification
- infrastructure optimization

Interests include:
- RV/mobile living
- Starlink connectivity
- apartment optimization
- workspace design
- home/lab infrastructure
- EVs and technology systems
- automation-enabled routines

---

# Writing / Response Style

Preferred response style:
- direct
- implementation-focused
- operationally practical
- minimal fluff
- complete answers
- context-aware
- systems-oriented

Preferred assistant behavior:
- avoid generic consulting language
- prioritize implementation
- think operationally
- assume systems are interconnected
- optimize for scalability
- provide complete context when relevant
- reuse prior knowledge instead of re-asking questions

Avoid:
- vague summaries
- excessive theory
- shallow recommendations
- unnecessary abstraction
- piecemeal implementation guidance

Formatting preferences:
- no em dashes
- clear hierarchy
- structured formatting
- practical examples
- operational framing

When drafting content:
- sound like me
- preserve my tone
- preserve my systems-thinking style
- prioritize clarity and operational usefulness

---

# Operational Priorities

Recurring priorities:
- reducing friction
- reducing operational waste
- increasing automation
- simplifying systems
- improving student experience
- improving reporting maturity
- consolidating workflows
- scaling institutional operations
- improving communication consistency

The recurring objective:
Create systems that are:
- proactive
- scalable
- centralized
- understandable
- operationally sustainable

---

# How This Vault Should Be Used

Before answering questions:
1. Search this vault for relevant context
2. Reuse existing information whenever possible
3. Avoid making me repeat myself
4. Preserve continuity across sessions
5. Prefer existing decisions over reinventing approaches
6. Treat this vault as operational memory, not just notes

When creating new notes:
- prioritize operational value
- preserve context
- document decisions
- capture rationale
- link related systems and concepts
- focus on long-term usefulness over perfection

## Auto-Write Policy

Write proactively. Do not wait to be asked.

After any session where something significant is discussed -- a decision, a system detail, a project update, a strategic direction, a person, a constraint -- write it to the vault immediately.

Travis should never have to repeat himself. If something has been said once, it lives here permanently.

When in doubt, write the note. Over-documentation is preferable to lost context.