---
type: research
domain: corveaux
status: draft
date: 2026-06-05
tags: [corveaux, institutions, archetypes, target-market]
---
# Institutional Archetypes  
  
**Status:** Draft. Research pending.  
  
## Purpose  
  
Define the institutional types Corveaux must model without special-case logic.  
  
The architecture must support all archetypes through the same canonical institutional model.  
  
Differences between institutions should primarily emerge through entities, relationships, policies, events, governance structures, and rendering contexts—not through institution-specific code paths.  
  
The objective is to ensure that Corveaux can eventually model and operate any institution using the same foundational architecture.  
  
---  
  
## Why This Matters  
  
One of Corveaux's core architectural requirements is:  
  
> The institutional model must represent universities, community colleges, system offices, foundations, and Corveaux itself without special-case logic.  
  
Institutional diversity is not an edge case.  
  
Institutional diversity is the requirement.  
  
The canonical model must accommodate:  
  
- Different governance structures  
- Different academic structures  
- Different legal entities  
- Different operational models  
- Different scales  
  
without changing the underlying architecture.  
  
---  
  
## Archetype Classification Framework  
  
The purpose of archetypes is not to create separate products.  
  
The purpose is to identify which institutional characteristics belong in:  
  
- The canonical model  
- The policy layer  
- The projection layer  
- The experience layer  
  
and which characteristics should never require custom code.  
  
---  
  
## Community College  
  
### Example  
  
SLCC (Control Case)  
  
### Characteristics  
  
- Open-access admissions  
- Associate degrees and certificates  
- Workforce-focused programs  
- Strong community partnerships  
- High transfer volume  
- Large student-service footprint  
  
### Typical Organizational Structures  
  
- Academic Affairs  
- Student Affairs  
- Enrollment Management  
- Workforce Development  
- Continuing Education  
- Institutional Effectiveness  
  
### Research Questions  
  
- How are programs organized?  
- How are advising structures represented?  
- How does workforce education differ from degree programs?  
  
---  
  
## Regional University  
  
### Characteristics  
  
- Primarily undergraduate  
- Some graduate programs  
- Regional recruitment footprint  
- Moderate organizational complexity  
  
### Typical Organizational Structures  
  
- Colleges  
- Departments  
- Academic programs  
- Research centers  
- Student affairs divisions  
  
### Research Questions  
  
- What structures appear beyond the community college model?  
- What additional governance layers emerge?  
  
---  
  
## Research University (R1)  
  
### Characteristics  
  
- Significant research activity  
- Complex departmental hierarchy  
- Multiple colleges and institutes  
- Grant-funded operations  
- Large faculty governance structures  
  
### Typical Organizational Structures  
  
- Colleges  
- Schools  
- Departments  
- Institutes  
- Research Centers  
- Sponsored Projects Offices  
  
### Research Questions  
  
- Which structures require explicit modeling?  
- Which structures are merely organizational relationships?  
- How are grants and research entities represented?  
  
---  
  
## System Office  
  
### Characteristics  
  
- Governs multiple institutions  
- Shared policy authority  
- Shared services  
- Institution-level and system-level governance  
  
### Typical Organizational Structures  
  
- Chancellor's Office  
- Shared Services  
- Institutional Relations  
- Finance  
- Technology  
  
### Research Questions  
  
- How are parent-child institution relationships represented?  
- How are delegated authorities modeled?  
- How are system-wide policies inherited?  
  
---  
  
## Foundation  
  
### Characteristics  
  
- Separate legal entity  
- Connected to an institution  
- Fundraising and advancement focus  
- Independent governance  
  
### Typical Organizational Structures  
  
- Board of Directors  
- Advancement  
- Development  
- Alumni Relations  
  
### Research Questions  
  
- Which relationships connect a foundation to an institution?  
- What authority boundaries must be modeled?  
- What data ownership boundaries exist?  
  
---  
  
## Corveaux (Tenant Zero)  
  
### Characteristics  
  
- Runs on Corveaux  
- Validates architecture through operational use  
- Exercises institutional model assumptions  
- Serves as the first production tenant  
  
### Purpose  
  
Corveaux exists as proof that:  
  
> Corveaux Must Run Corveaux.  
  
The platform must be capable of representing its own organizational structure, governance, policies, roles, workflows, and institutional knowledge.  
  
### Research Questions  
  
- Which Corveaux operational processes should be represented first?  
- What assumptions become visible when Corveaux is modeled as a tenant?  
- Which architectural gaps appear through self-use?  
  
---  
  
## Shared Structures Across Archetypes  
  
### Hypothesis  
  
All institutional archetypes contain some variation of:  
  
- People  
- Organizations  
- Positions  
- Roles  
- Policies  
- Services  
- Locations  
- Events  
- Governance structures  
- Authority relationships  
  
Differences may exist in scale and complexity, but not necessarily in fundamental concepts.  
  
### Research Questions  
  
- What structures appear in every archetype?  
- Which concepts are universally present?  
- Which concepts are truly archetype-specific?  
  
---  
  
## Governance Survey  
  
Research how authority is represented across archetypes.  
  
### Questions  
  
- Who creates policy?  
- Who approves policy?  
- Who delegates authority?  
- How are committees represented?  
- How are temporary appointments represented?  
- How are acting roles represented?  
- How are approval chains represented?  
  
---  
  
## Scaling Questions  
  
### Research Questions  
  
- At what institution size does the product break?  
- At what organizational complexity does the model become insufficient?  
- What assumptions fail first?  
- Which relationships grow fastest?  
- What performance characteristics emerge at scale?  
  
---  
  
## Canonical Model Questions  
  
### Research Questions  
  
- What structural differences require model-level handling?  
- What differences belong in the policy layer?  
- What differences belong in the projection layer?  
- What differences belong solely in rendering?  
- Which differences should never require custom code?  
  
---  
  
## Working Hypotheses  
  
1. The same canonical primitives can model all institutional archetypes.  
2. Most institutional differences are relationship and policy differences, not entity differences.  
3. Governance complexity grows faster than organizational complexity.  
4. System offices and foundations are critical validation cases because they challenge simplistic university-only assumptions.  
5. If Corveaux can model itself, a community college, a research university, and a system office without special-case logic, the architecture is likely on the correct path.  
  
---  
  
## Success Criteria  
  
This research is complete when:  
  
- Core archetypes are documented  
- Shared structures are identified  
- Governance patterns are understood  
- Model-level requirements are distinguished from rendering-level requirements  
- No archetype requires institution-specific architectural exceptions  
  
---  
  
## Related  
  
- [[ADR-002 — Institutional Model Primitives]]  
- [[ADR-004 — Platform Tenant Architecture]]  
- [[ADR-005 — Capability-Based Authority Model]]
- [[ADR-008 — Generated Tenant Lifecycle]]  
- [[Corveaux V2]]  
- [[SLCC Validation Run]]