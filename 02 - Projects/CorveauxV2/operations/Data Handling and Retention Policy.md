---
type: operations
status: draft
date: 2026-06-13
owner: Travis Hornbuckle
tags: [ferpa, soc2, privacy, retention, pii]
---

# Data Handling and Retention Policy

How Corveaux classifies, protects, retains, and disposes of institutional data.
Supports FERPA (education records), SOC 2 (confidentiality / privacy), and HECVAT.

## Our posture, in plain language

- **Student privacy is the institution's, and we treat it that way.** The school
  owns its records; Corveaux holds them on the school's behalf and acts only on
  the school's direction.
- **The AI never sees personal details.** When someone chats with the assistant,
  any email, phone number, or ID they type is stripped out *before* it reaches the
  AI and put back only in what's shown to them. The AI works on placeholders.
- **The assistant can only repeat what's already public.** It answers from the
  institution's published information, with a citation for every fact, and it
  cannot reach into private staff or student records.
- **Each institution's data is kept separate.** Every school's information lives in
  its own database — there is no shared pool.
- **Everything sensitive is encrypted** in transit today, and the plan is to add
  per-school encryption on the private records themselves (see *Future: field-level
  encryption* below).
- **We keep only what we should, for as long as we should**, and can produce,
  correct, or delete a person's information when the school asks.

The rest of this document is the detail behind those commitments.

## Data categories

| Category | Examples | Sensitivity | Store |
|---|---|---|---|
| **Institutional canon** | Entities, Relationships, Policies, Events, content blocks, pages | Public-by-projection (PUBLISHED) or internal | Per-tenant Neon DB; R2 for artifacts |
| **People / HRIS records** | Staff person records, positions, comp, time-off | Internal — `visibility=internal` by default | Per-tenant Neon DB |
| **Conversation records** | Assistant/email/SMS threads, visitor-provided name/email/phone, contact panel, **silent IP** | Contains visitor PII; may reference education-record topics | Per-tenant Neon DB (message Events) |
| **Audit events** | Access decisions, tenant-boundary crossings, config changes, effect dispatches | Security record | Platform audit store |
| **Billing / contracts** | Invoices, signed agreements, signature certificates | Commercial / institutional | R2 artifacts + Neon |

## The PII boundary (FERPA-critical)

Visitor PII **never reaches the LLM**. Before every model call (assistant answer,
summary, intent, draft) email/SSN/phone/long-digit runs are redacted to opaque
tokens and rehydrated on return. The conversation **record keeps the real text**
(operator-visible, audited) — only the model boundary is redacted.

- Lead capture is pure pattern-matching — **no model call** — so contact details never leave the tenant.
- Operator-approved answers are **screened for PII before becoming public canon**; an answer containing PII is not canonized ([[ADR-032|PII gate]]).
- The assistant is **closed-world + PUBLISHED-only** and People are internal-by-default, so it cannot surface a student's record.

Document this flow as a diagram for HECVAT — it is the strongest privacy answer in the kit.

## Encryption
- **At rest:** Neon and Cloudflare R2 encrypt at rest by provider default *(confirm AES-256 + cite in each DPA)*.
- **In transit:** TLS everywhere (Workers, DB connections, provider APIs).
- **Secrets:** never in code or canon; held as Worker/CI secrets ([[Environment and Secrets Inventory]]).

## Tenant isolation
Each tenant's canon lives in its **own database** — every school's data is fully
separated, never a shared pool, and the assistant and inbound channels only ever
read the school they're serving. (Tenant isolation is a security boundary —
[[ADR-010 — Tenant Isolation Architecture]].)

## Future: field-level encryption for the expansion tables (FERPA)

Today, sensitive records are encrypted in transit (TLS) and at rest by the storage
provider's default disk encryption. As Corveaux begins to hold genuine **education
records** (the typed *expansion tables* — HRIS/People now, student records later),
the intended next control is **application-level field encryption** on those tables:

- Sensitive fields are encrypted in the application *before* they are written and
  decrypted only when read by an authorized surface — so even the database provider
  cannot read them.
- **Per-school encryption keys** (held as Worker secrets / a key-management service),
  which both protects the data and reinforces the separation between schools.
- Scope is the **expansion tables that carry private data** — the canonical
  primitives stay as they are (they're mostly public-by-projection).

This is a planned control, not yet built — it should be captured as its own ADR
before student records are onboarded. It is what lets Corveaux answer "is FERPA
data encrypted such that your provider can't read it?" with a yes.

## Retention windows *(set the values, then enforce in code)*

| Data | Proposed retention | Disposal | Enforced? |
|---|---|---|---|
| Audit events | 7 years (existing posture) | Hard delete after window | partial — confirm sweeper |
| Conversation records | ☐ *decide* (e.g. 24 months from last activity) | Delete entity + message Events | ☐ not yet enforced |
| Conversation IP attribute | ☐ shorter (e.g. 90 days) | Strip `attributes.ip` | ☐ not yet enforced |
| Institutional canon | Effective-dated; superseded rows retained per [[ADR-027 — Discontinued-Entity Retention]] | Per cutover / Data-Debt | yes (effective dating) |
| Billing / contracts | Per contract term + statutory (e.g. 7 yr) | Archive | manual |

> **Action:** the conversation and IP windows are policy decisions that then need a
> scheduled sweeper (a worker cron) to enforce — flag for a follow-up build.

## FERPA student rights (institution-facing)
The **institution** is the FERPA data controller; Corveaux is a school official /
processor acting under its direction. The platform must support the institution
to honor:
- **Access** — produce a student's conversation/record on request (inbox + record export).
- **Amendment / deletion** — correct or remove a record on the institution's instruction (the conversation entity + its message Events; canon corrections via the Data-Debt / governance flow).
- **Directory-information limits** — People internal-by-default keeps non-directory info off public projections.

☐ Build/define the operator workflow to fulfill an access/amend/delete request end to end (today it is manual via the admin surfaces).

## Open items
- ☐ Decide conversation + IP retention windows and build the enforcing sweeper.
- ☐ Define the student access/amendment/deletion operator workflow.
- ☐ Confirm encryption-at-rest specifics per subprocessor (for the DPA/HECVAT evidence).
- ☐ Data-flow diagram for the PII boundary (HECVAT exhibit).

## Related
- [[Subprocessors and DPAs]]
- [[Security Overview and SOC 2 Control Mapping]]
- [[ADR-032 — The Institutional Assistant, Canonical Grounding, and the PII Boundary]]
