---
type: spec
domain: corveaux
status: draft
date: 2026-06-05
tags: [corveaux, rendering, role-aware, spec]
---
# Role-Aware Rendering Spec  
  
**Status:** Draft. To be written before Day 60.  
  
## Purpose  
  
Define how the same institutional reality renders as different experiences for different audiences.  
  
Role-aware rendering is a projection concern, not a canonical-model concern.  
  
The canonical institutional model remains unchanged. Different audiences receive different projections of the same underlying reality.  
  
This is a practical implementation of:  
  
> One Reality. Many Projections.  
  
---  
  
## Goals  
  
- Present relevant information to each audience  
- Reduce information overload  
- Preserve a single source of institutional truth  
- Avoid duplicate content ownership  
- Support institution-specific experiences without creating institution-specific architecture  
  
---  
  
## Audience Matrix  
  
| Audience | Primary Questions |  
|-----------|-----------|  
| Visitor | What does this institution do? How do I connect? |  
| Prospective Student | What can I study? How do I apply? What will it cost? |  
| Current Student | What do I need to do next? What services are available to me? |  
| Faculty | What courses, committees, processes, and responsibilities apply to me? |  
| Staff | What services exist? Who owns them? What are the procedures? |  
| Administrator | What is stale? What is missing? Who owns what? Where are the governance gaps? |  
  
---  
  
## Rendering Model (Hypothesis)  
  
- Audience context influences which blocks render and in what order  
- Rendering decisions may be driven by block metadata, rendering rules, policy evaluation, or a combination  
- The same institutional reality can produce different experiences  
- The same URL may render differently depending on audience context  
- Audience-specific experiences should not require duplicate content ownership  
- Demo mode may simulate audience context without authentication  
  
---  
  
## Example  
  
### Program  
  
Canonical Reality:  
  
- Program  
- Department  
- Requirements  
- Contacts  
- Policies  
  
Visitor View:  
  
- Overview  
- Outcomes  
- Contact information  
  
Prospective Student View:  
  
- Program overview  
- Admissions information  
- Costs  
- Career outcomes  
  
Current Student View:  
  
- Requirements  
- Remaining coursework  
- Deadlines  
- Advisor information  
  
Administrator View:  
  
- Ownership  
- Freshness  
- Citations  
- Confidence  
- Governance gaps  
  
Same institutional reality.  
  
Different projection.  
  
---  
  
## Non-Negotiables  
  
- The institutional model remains canonical  
- Audience context must not create duplicate institutional records  
- Rendering decisions must not alter canonical data  
- Every rendered fact must retain source provenance  
- Role-aware rendering must function without institution-specific logic  
  
---  
  
## Open Questions  
  
- [ ] Is this implemented through React Server Components, middleware, client-side rendering, or a combination?  
- [ ] What is the routing structure?  
- [ ] How does demo mode work without exposing administrative views?  
- [ ] Is audience awareness represented through metadata, rendering rules, policies, or a combination?  
- [ ] Which rendering decisions belong in the policy layer versus the rendering layer?  
- [ ] How is personalization distinguished from audience-aware rendering?  
  
---  
  
## Success Criteria  
  
This spec is complete when:  
  
- Audience context is formally defined  
- Rendering decision points are identified  
- Routing strategy is defined  
- Demo mode is defined  
- Governance and security implications are understood  
- The same institutional reality can render appropriately for all supported audiences  
  
---  
  
## Related  
  
- [[ADR-003 — Content Block Architecture]]  
- [[generated-tenant-spec]]  
- [[ADR-009 — Tech Stack]]