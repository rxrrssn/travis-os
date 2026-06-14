---
type: operations
status: draft
date: 2026-06-13
owner: Travis Hornbuckle
tags: [hecvat, soc2, dpa, subprocessors]
---

# Subprocessors and DPAs

Every outside service that stores or handles a school's data on Corveaux's behalf.
We keep this list current and share it openly — and we hold the one AI vendor to a
**no-personal-data** standard (personal details are removed before anything reaches
the AI). HECVAT and most institutional agreements require this disclosure.
**DPA status is ☐ until a signed agreement is on file.**

| Subprocessor | Role | Institutional data it sees | Region | DPA | SOC 2 / attestation |
|---|---|---|---|---|---|
| **Cloudflare** | Hosting (Workers), object storage (R2), CDN, WAF | All served content; R2 holds crawl HTML, mirror assets, generated documents, audit archives | *(to confirm)* | ☐ | SOC 2 / ISO — *(link report)* |
| **Neon** | Managed Postgres (platform registry + per-tenant canonical models) | The full institutional model + conversation records (incl. visitor-provided PII) | *(to confirm)* | ☐ | SOC 2 — *(link report)* |
| **Anthropic** | LLM inference (Claude) for the assistant, summaries, intent, drafts | **Redacted** prompt text only — visitor PII is tokenized out before every call (see [[Data Handling and Retention Policy]]); canon excerpts (already public); no raw emails/phones/SSNs | US | ☐ | *(confirm zero-retention / no-training terms on the API tier)* |
| **Resend** | Outbound email; inbound email (Phase F) | Recipient addresses + message bodies for notifications and conversation replies; inbound = sender address + email body | *(to confirm)* | ☐ | *(link)* |
| **Twilio** | SMS (Phase F — **WIRED, NOT CONNECTED**) | Will see phone numbers + message bodies once connected; **no data flows today** | US | ☐ (before connecting) | *(link)* |
| **Stripe** | Billing / invoicing | Institution billing contact + invoice metadata; **no student data** | US | ☐ | PCI DSS / SOC 2 — *(link)* |
| **Microsoft (Entra ID)** | Platform SSO (operator identity) | Operator identities (Corveaux staff); per-tenant IdPs are the institution's own | *(to confirm)* | n/a (platform identity) | Microsoft compliance portfolio |
| **GitHub** | Source control + CI | Source code; **no institutional data** | US | n/a | — |
| **GitGuardian** | CI secret scanning | Diffs of source code; **no institutional data** | *(to confirm)* | n/a | — |

## Notes
- **Anthropic is the sensitive one for FERPA** and its mitigation is the strongest selling point: visitor PII never reaches the model (tokenize-before / rehydrate-after, [[ADR-032|grounding + PII boundary]]). Confirm the API terms disallow training on inputs and document the data-flow diagram for HECVAT.
- **Twilio carries no data until connected** — keep it disconnected until its DPA is signed and signature verification is live ([[Inbound Channel Connection Runbook]]).
- Maintain this list as the **single source of truth** for the "subprocessors" question on every HECVAT.

## Open items
- ☐ Execute DPAs with Cloudflare, Neon, Anthropic, Resend, Stripe.
- ☐ Confirm data-residency / region for each (institutional buyers may require US-only).
- ☐ Collect each provider's SOC 2 Type 2 report (or equivalent) for the evidence binder.
- ☐ Publish a customer-facing subprocessor page + change-notification process (HECVAT expects notice before adding a subprocessor).

## Related
- [[Data Handling and Retention Policy]]
- [[Security Overview and SOC 2 Control Mapping]]
- [[ADR-032 — The Institutional Assistant, Canonical Grounding, and the PII Boundary]]
