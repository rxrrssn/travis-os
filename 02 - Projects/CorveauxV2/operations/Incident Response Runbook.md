---
type: operations
status: draft
date: 2026-06-13
owner: Travis Hornbuckle
tags: [soc2, incident-response, runbook]
---

# Incident Response Runbook

What we do when something breaks or a security event happens. Today Corveaux is a
solo operation, so this is written to be followed by one person and to scale to a
small team later.

## Our posture, in plain language
We assume things will occasionally go wrong, so we build to **fail loudly, not
silently**: a public status page shows health, stalled jobs raise alerts, and
failed work is captured rather than lost. When an incident happens we contain it,
tell the affected schools honestly, fix it, and write down what we learned.

## Severity

| Level | Meaning | Example | First response |
|---|---|---|---|
| **SEV-1** | Data exposure or a school's site/data down | Cross-tenant data access; site outage | Drop everything; contain now |
| **SEV-2** | Degraded but contained | Assistant down, inbound email not threading | Same-day |
| **SEV-3** | Minor / cosmetic | A single page renders wrong | Next working session |

## The response sequence
1. **Detect** — from the status page, an alert, a school's report, or a scan finding.
2. **Declare** — name the severity; post a banner on the status page (the manual
   incident banner) so schools see we're on it.
3. **Contain** — stop the bleeding (pause the affected effect/queue, disable a
   surface, rotate a leaked secret). Prefer containment over a hasty fix.
4. **Assess** — what data, which schools, what window. For any **personal-data**
   exposure, treat it as potential FERPA and start the notification clock.
5. **Fix** — through the normal branch → PR → CI path unless SEV-1 demands a
   hotfix; even then, follow with a reviewed PR.
6. **Notify** — tell the affected institution(s) plainly: what happened, what data,
   what we did, what they should do. The school is the FERPA controller and decides
   any onward student notice.
7. **Learn** — write a short post-incident note (a session note or an ADR if it
   changes the architecture); add a check so it can't recur.

## What helps us detect & contain (already built)
- **Status page** — per-environment health (site, database, storage, assistant) and
  a manual incident banner.
- **Watchdog** — stalled background jobs raise an alert event instead of hanging.
- **Dead-letter capture** — failed outbound effects are archived, not dropped.
- **Audit trail** — access decisions and boundary crossings are logged, so "who saw
  what, when" is answerable.
- **Kill switches** — effects can be paused; a leaked secret can be rotated (see
  [[Environment and Secrets Inventory]]).

## Open items
- ☐ Contact path for schools to report an incident (security@ address + intake).
- ☐ Written breach-notification timeline aligned to each school's DPA.
- ☐ A simple incident log (date, severity, summary, resolution) for the SOC 2 binder.

## Related
- [[Security Overview and SOC 2 Control Mapping]] · [[Environment and Secrets Inventory]] · [[Data Handling and Retention Policy]]
