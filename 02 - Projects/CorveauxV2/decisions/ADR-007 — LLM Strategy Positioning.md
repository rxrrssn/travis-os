---
type: decision
domain: corveaux
status: active
date: 2026-06-05
tags: [corveaux, llm, positioning, gtm, ai]
---

# ADR-007 — LLM Strategy and Positioning

## Decision

LLMs are an implementation detail that enables extraction and synthesis at scale. They are never the product headline. Corveaux is never positioned as "AI for Higher Education." The product is an institutional knowledge and experience platform.

## Context

The 2025-2026 higher-ed buyer environment is saturated with "AI" pitches. Leading with AI triggers skepticism ("another AI thing"), invites questions about model training and data ownership, and positions Corveaux as a feature rather than a platform. The actual innovation is the institutional model — the cross-silo synthesis of institutional knowledge and its role-aware projection.

## Options Considered

1. **Lead with AI** — "AI-powered institutional discovery." Easier to explain in 2025-2026 but positions as a commodity.
2. **Never mention AI** — Misleading and potentially raises more questions than it answers.
3. **AI as implementation detail** (chosen) — AI is how we do the work at scale. The product is what the work produces. Mention when asked; never lead with it.

## Rationale

The actual value proposition doesn't require AI to exist:
- Institutional knowledge could be extracted manually (just slower)
- The canonical knowledge layer would still have value without AI-generated summaries
- Role-aware rendering is a data architecture decision, not an AI decision
- Governance and ownership workflows don't involve AI at all

If every LLM disappeared tomorrow, the core Corveaux concept would still exist. The extraction process would be slower. That's the correct relationship between AI and the product.

**External language to avoid:**
- "AI-powered"
- "Machine learning"
- "Large language model"
- "GPT" or "Claude"
- "AI for Higher Education"

**External language to use:**
- "Institutional knowledge platform"
- "Institutional operating system"
- "Institutional intelligence"
- "We model your institution and reintroduce it to itself"

**If asked what technology is used:**
Be specific and honest: Claude API (Anthropic), no training on customer data, data processed but not retained. But lead with the output, not the method.

## LLM Stack Decision (internal)

- Extraction: claude-sonnet-4-6 (structured extraction from web/catalog content)
- Synthesis and report generation: claude-opus-4-8 (higher reasoning for findings and synthesis)
- Confidence scoring: built into extraction prompts; not a separate LLM call

## Stakeholders

- Builder (Travis Hornbuckle)

## Consequences

- All external-facing copy, demos, and sales materials position Corveaux as an institutional knowledge platform, not an AI product
- The LLM stack is documented internally and disclosed when asked (data governance one-pager)
- LLM costs are a per-run operating cost that must be modeled into extraction pricing
- The LLM strategy is revisited whenever model capabilities change significantly

## Related

- [[ADR-001 — Entry Wedge Selection]]
- `Corveaux V2 - Session 01.md`
