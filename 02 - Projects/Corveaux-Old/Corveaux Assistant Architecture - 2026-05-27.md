# Corveaux Assistant Architecture
*Documented 2026-05-27*

---

## Core Principle

**Institutions own PRESENTATION. Corveaux owns INTELLIGENCE.**

This is the foundational separation that governs all assistant architecture decisions.

---

## What the Assistant IS

- An institutional conversational layer
- A governed communication system
- A tenant-aware institutional voice
- A future operational intelligence surface

## What the Assistant is NOT

- A generic chatbot
- A ChatGPT wrapper
- A floating support widget
- A consumer AI toy

---

## Platform vs Tenant Boundaries

### Tenant-Controlled (Safe)

Tenant admins configure **how their institution communicates** — not how the AI works.

**Identity:**
- Assistant name (e.g., "Ask SLCC", "Campus Guide")
- Greeting and welcome text
- Tagline
- Avatar URL

**Communication Style:**
- Tone preset: Professional / Warm / Concise / Formal
- Interpersonal warmth: 1 (Reserved) to 5 (Approachable)
- Response length: Brief / Balanced / Detailed
- Citation style: Inline / Footnote / None
- Link frequency: Minimal / Moderate / Generous
- Emoji use: None / Occasionally / Moderate
- Suggested prompts on/off
- Streaming on/off

**Channels:**
- Public website
- Authenticated student portal
- SMS (future)
- Microsoft Teams (future)

**Escalation:**
- Escalation on/off
- Escalation message text
- Escalation contact (email, URL, phone)

### Platform-Controlled (Protected)

Corveaux controls — tenant admins never see or touch:
- System prompts
- Retrieval grounding
- Hallucination prevention
- Safety and moderation
- Reasoning boundaries
- Memory policy
- Tool and workflow execution permissions
- Model routing and provider orchestration
- Authentication/security boundaries

---

## UX Philosophy

Tenant admins should never see:
- temperature, top_p, tokens
- system prompt, prompt engineering UI
- LLM, RAG, chain-of-thought
- Model parameter sliders

They should feel like: **"We are configuring how our institution communicates."**

Not: "We are configuring an AI model."

---

## Data Model

### AssistantConfig
One per tenant. Covers identity + presentation + channels.

```prisma
model AssistantConfig {
  id        String @id @default(cuid())
  tenantId  String @unique

  // Identity
  name      String  @default("Assistant")
  greeting  String  @default("How can I help you today?")
  tagline   String?
  avatarUrl String?

  // Communication style
  tonePreset    String  @default("PROFESSIONAL")
  warmthLevel   Int     @default(3)
  verbosity     String  @default("BALANCED")
  citationStyle String  @default("INLINE")
  linkFrequency String  @default("MODERATE")
  emojiPolicy   String  @default("NONE")
  suggestedPromptsEnabled Boolean @default(true)
  streamingEnabled        Boolean @default(true)

  // Channels
  webEnabled                 Boolean @default(true)
  authenticatedPortalEnabled Boolean @default(false)
  smsEnabled                 Boolean @default(false)
  teamsEnabled               Boolean @default(false)

  // Escalation
  escalationEnabled Boolean @default(false)
  escalationMessage String?
  escalationContact String?

  conversations AssistantConversation[]
}
```

### AssistantConversation
Tenant-scoped persistent conversation. Links to session token (anonymous) or Person (authenticated).

```prisma
model AssistantConversation {
  tenantId     String
  configId     String
  sessionToken String?   // anonymous continuity via cookie
  personId     String?   // authenticated portal linkage
  status       String    @default("ACTIVE")
  lastMessageAt DateTime?
  messages     AssistantMessage[]
}
```

### AssistantMessage
Immutable message record. Citations stored as JSON array.

```prisma
model AssistantMessage {
  conversationId String
  role           String   // user | assistant | system
  content        String
  citations      String   @default("[]")
  metadata       String   @default("{}")
}
```

---

## Conversation Persistence Philosophy

Conversation history is **institutional operational data** — not temporary UI state.

Persistence strategy:
- Cookie-backed anonymous continuity (sessionToken)
- DB-backed conversations (AssistantConversation + AssistantMessage)
- Future: linkage to authenticated Person record
- Future: conversation analytics for institutional insight

---

## Retrieval Direction

The assistant must:
- Ground all responses in institutional knowledge
- Never confidently invent institutional policy
- Cite sources explicitly (when citation style is enabled)
- Prioritize explainability and institutional trust

Future retrieval stack:
- Knowledge Base articles as primary source
- Page content as secondary source
- Configurable document ingestion
- Structured department/service routing

---

## Escalation Architecture (Future)

- Department routing
- Human handoff
- Ticket creation
- Advising escalation
- Operational routing hooks

No full workflow orchestration yet — escalation message + contact today, intelligent routing later.

---

## Admin UI Location

```
Tenant Admin
â””â”€â”€ Assistant
    â”œâ”€â”€ Identity (name, greeting, tagline, avatar)
    â”œâ”€â”€ Communication Style (tone, warmth, verbosity, citations, links, emoji)
    â””â”€â”€ Channels & Escalation (web, portal, SMS, Teams, escalation config)
```

Future sections:
- Knowledge & Sources
- Analytics
- Safety (platform-governed, read-only for tenant)
- Preview / Test

---

## Quality Target

The assistant UI should feel like:
- Linear, Notion, Stripe Docs AI, Perplexity, Apple support
- Premium, quiet, institutional, typography-forward
- Restrained and trustworthy

NOT:
- Giant AI bubbles, over-animation, excessive gradients
- "Chatbot slop" or consumer AI aesthetics

---

## Next Build Steps

1. Wire Claude API inference layer to AssistantConfig presentation settings
2. Build public-facing assistant widget (web channel)
3. Implement conversation session persistence (cookie â†’ DB)
4. Knowledge Base grounding (KB article retrieval)
5. Authenticated portal assistant (Person context injection)
6. Analytics dashboard (conversation volume, escalation rate, unanswered questions)
