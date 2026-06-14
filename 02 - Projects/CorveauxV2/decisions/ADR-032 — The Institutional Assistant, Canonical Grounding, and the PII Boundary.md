---
type: decision
domain: assistant
status: active
date: 2026-06-13
tags: [assistant, conversations, retrieval, privacy, canon, primitives]
---

# ADR-032 — The Institutional Assistant, Canonical Grounding, and the PII Boundary

## Decision

The institution-facing assistant answers as a **projection of the institutional model**, grounded in all five canonical primitives — Entities, Relationships, Policies, Events, each within Time — not from a single prose projection. Three commitments:

1. **Canonical grounding.** Retrieval assembles a structured, numbered, citable context from the primitives behind PUBLISHED canon. A PUBLISHED content-block projection is the visibility gate; the primitives hanging off those entities (their relationships, attached policies, institutional events) come along, each with its own `sourceUrl` citation, each time-scoped.
2. **The PII boundary.** Visitor PII never reaches the model. Email/SSN/phone/long-digit runs are redacted to opaque tokens before *every* model call and rehydrated on return; the conversation record keeps the real text (operator-visible, audited). Lead capture is pure pattern-matching with no model call.
3. **Canon-learning, not model training.** An operator-approved assistant answer is written as a PUBLISHED `answer_block` — citable canon the assistant retrieves next time. The record gets smarter; the model is never fine-tuned.

## Context

The assistant shipped (S42–43) doing lexical keyword search over **content blocks only**, with an unordered `take:60` candidate cap. For common query words ("program", "have"), the cap truncated to arbitrary rows and the real match never entered scoring — so "Does SLCC have a psychology program?" returned *no*, despite 120+ published programs and a working site search. It also never read Relationships, Policies, Events, or Time, so it could not answer relationship- or policy-shaped questions. This violated the founding axiom that pages, blocks, and **assistant responses are projections of the canonical model** — the assistant was bound to one lossy projection.

Separately, the assistant is public and unauthenticated, and the founder set a hard privacy rule: *"any PII needs to bypass the model entirely and then appended back in on return."*

## Options Considered

- **Embeddings / vector RAG over blocks.** Better fuzzy recall, but still block-only (no relationships/policies/time), new infra, and a fresh visibility-leak surface. Rejected for now — the failure was an unordered candidate cap, not a need for semantics; catalog Q&A is keyword-shaped.
- **Query the primitive tables directly, ungated.** Maximum recall, but entities/relationships/policies have no PUBLISHED flag — querying them raw would leak internal/draft canon to anonymous visitors. Rejected on the tenant-isolation/visibility boundary.
- **Anchor on the dependency graph (`ContentBlock.dependencies`).** Clean in theory, but the field is unpopulated in practice. Rejected as unreliable.
- **Chosen: entity-first retrieval gated by published projection.** Match public entities by name (recall fix: significant terms + whole-phrase signal + wide ordered pool), keep only those with a PUBLISHED block (the block is both authorization and citation), then expand relationships/policies/events around them — joined by the `block.canonicalKey = "{blockType}:" + entity.canonicalKey` correspondence.
- **PII: tokenize-and-rehydrate** vs. trusting a prompt rule. Chosen tokenize — a code-enforced boundary, not a request the model can ignore; the stream rehydrator buffers across chunks so a split token is restored whole.
- **Learning: fine-tune** vs. **canon blocks.** Chosen canon blocks — auditable, within the five primitives, no black box; "canon training, not model training."
- **Events scope:** all vs. guarded. Chosen guarded — only institutional events tied to a public entity that carry a `sourceUrl`; per-person/operational events stay private.

## Rationale

The axiom decides it: if the assistant is a projection of the institution, it must read the institution — the whole model, not the prose layer. Grounding in the five primitives both honors the doctrine and fixes the concrete failure (programs are Entities; existence questions are entity lookups). The published-projection gate keeps a public surface safe without inventing a new visibility model. Tokenizing PII makes the privacy guarantee structural rather than prompt-dependent. Canon-learning keeps every improvement inside the auditable record, consistent with "no fact without a citation."

## Stakeholders

Founder (set all three doctrines); prospective institutions (the assistant is the demo surface and the `module_assistant` SKU); operators (inbox, agent-assist, escalation); every tenant's visitors (closed-world answers, PII safety).

## Consequences

- **Positive:** correct, cited answers across programs/courses/relationships/policies; time-scoped (no superseded fact stated as current); a public surface that cannot leak unpublished canon; a privacy boundary that survives prompt-injection; an assistant that improves as operators answer, auditably.
- **Built on this ADR:** the Conversations hub — escalation engine (crisis + route tiers on the effects bus), omnichannel inbound/outbound (email live; SMS wired-not-connected), emoji control, intent routing.
- **Costs / debt:** entity-first retrieval needs a published projection to surface an entity (deliberate); the recall fix is lexical, not semantic (embeddings remain a future option if fuzzy recall is needed); name (not email) still reaches the model for greetings — accepted; inbound webhooks use a shared-token guard, with provider signature verification (Svix/Twilio) owed before production; `answer_block` canon has no public collection route (cited by `[n]` text, no link).
- **Doctrine reaffirmed:** no fact without a citation; tenant isolation is a security boundary; AI stays an implementation detail (the product is institutional answers, cited).

## Related
- [[ADR-002 — Institutional Model Primitives]]
- [[ADR-029 — Effects Layer and Provider Rails]] (escalation + outbound delivery)
- [[ADR-022 — Canonical Entitlements, Typed Supporting Tables, and Role and Person Impersonation]] (`module_assistant` gating)
- [[Corveaux V2 - Session 43 — The Conversations Hub and the Five-Primitive Assistant]]
