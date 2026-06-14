# Corveaux V2 — Session 43 — The Conversations Hub and the Five-Primitive Assistant

**Date:** 2026-06-12 → 2026-06-13
**Commits (post-squash hashes):** `7cdf974` (the bundle — grounding + Phases D–G + status page), `8cbfa9b` (#21 — PII boundary + lead capture + contact resolution), `d1d72ae` (#20 — silent IP capture), `e95311b` (#19 — inbox summary). Earlier arc commits (#13–#18: widget, inbox, persistence) were absorbed by the 2026-06-13 history squash.
**Builds:** tsc / lint green throughout; PR #21 and PR #22 each merged on green CI. History trimmed to genesis + last 4; GitHub deployments pruned to the latest 4.
**ADR:** [[ADR-032 — The Institutional Assistant, Canonical Grounding, and the PII Boundary]]

The marathon turned the "assistant chat widget" into the full **Conversations communications hub** — and, mid-build, exposed that the assistant was answering from one lossy projection. Fixing that became the spine of the session.

## The arc that shipped (A–G)

- **A–C (widget + inbox + live sessions):** the public widget (vanilla JS, localStorage persistence, rAF streaming, launcher styles, typing bubbles), the three-pane email-style inbox (list · thread · contact panel, one feed), canned replies, live takeover (`handling` pauses the bot), conversation summary in the right panel.
- **Authed recognition (#22):** the public answer route now reads `auth()` — a signed-in visitor binds to their canonical person, the bot greets them by name and skips lead capture; the inbox links straight to the profile. (Founder: *"the bot does not recognize me as an authed user."*)
- **Intent routing:** conversations classify (platform / employment / enrollment / support) lazily + cached; the inbox routes the prospective record — platform → Institutions (built), job-seeker → HRIS applicant and student → Admissions (both shown as where it *will* route once those surfaces exist).
- **D — escalation engine:** crisis tier (safety/Title IX/emergency → immediate safe handoff, never a canon answer) + route tier (explicit "talk to a human", tenant keywords, canon gap, N repeated misses); auto-assign + notify via the effects bus (`conversation_escalated`). Configurable in Settings.
- **E — agent assist + canon learning:** "Draft with AI" in the composer (cited, PII-bypassed); an approved/edited reply that gets sent **canonizes** as a PUBLISHED `answer_block` — citable canon the assistant uses next time. Denied → `canon_gap_flagged`. **Canon training, not model training.**
- **F — omnichannel:** inbound email (`/api/inbound/email/{slug}`) and SMS (`/api/inbound/sms/{slug}`) thread into the sender's conversation; operator replies go back out over the channel (email live; **SMS wired but not connected** — effector + route env-gated until creds + webhook are set). Verified inbound threading + same-sender re-threading on dev.
- **G:** `scripts/seed-assistant-config.ts` (create-only) for assistant + escalation defaults.
- **Emoji control:** `none / minimal / expressive` selector, folded into the prompt like tone.

## The doctrine moment — ground the assistant in all five primitives

Founder, across three messages: *"the bot does not understand the relationships"* → *"the bot should be grounded in all five primitives"* → *"does it also not see programs? it said SLCC didn't have a psychology program or any IT programs."*

Diagnosed live: `retrieveCanon` did keyword search over **content blocks only**, with `take:60` and **no relevance ordering** — common words ("program", "have", "slcc") swamped the candidate pool so the real program block never made the cut. Yet `/search?q=psychology` found it and the Programs collection had 120+ published programs. **The canon was present; retrieval was the failure.** And it never touched Relationships, Policies, Events, or Time — a doctrine violation (assistant answers are projections of the *model*, not one prose view).

Fix (see ADR-032): new `canon-retrieval.ts` assembles **Entities + Relationships + Policies + Events, each within Time**, entity-first, every fact citable, gated by published-projection-only visibility; recall fixed (significant terms + whole-phrase signal + wide ordered pool). Result, verified on SLCC:
- "Does SLCC have a psychology program?" → *"Yes — Psychology Associate of Science (AS) [1]"* (was a flat no).
- "What IT programs?" → the IT Technical Certificate (was a GIS course + biotech lab).
- Prerequisite **relationships** and the SLCC Promise **policy** surface and cite; time scopes render.

## The PII boundary (#21)

Founder: *"on submission, any PII needs to bypass the model entirely and then appended back in on return."* `pii.ts` redacts email/SSN/phone/long-digit to opaque tokens before **every** model call (answer, summary, intent, draft), rehydrates on return (stream rehydrator buffers across chunks so a split token is restored whole). The conversation **record keeps the real text** — operators see it, it's audited; only the model boundary is redacted. Lead capture was rebuilt to **pure regex, no model call**, so visitor PII never leaves the tenant. Verified: a message with an email came back without the model ever echoing it.

## Process

- Founder: *"stop committing after everything. lets bundle."* → switched to one coherent PR per bundle; the whole D–G + grounding + status work landed as one squash-merge (PR #22).
- Status page (`cloudflare/status`) updated: new "Conversations & Assistant" component on a real `assistant` sub-check added to the tenant worker `/health`; SLCC relabeled as the live mirror; **all vendor names stripped** from the rendered page (founder: *"dont list providers"*) and the row reduced to *what it monitors*.
- Close-out: `merge and push` → PR #22 merged; then `trim the commits to current -4 and the same with deployments` → history grafted to genesis + last 4 (trees preserved via `commit-tree`, HEAD byte-identical to the merged head before force-push), 32 deployments pruned.

## Holds / next

- **SMS not connected** — add `TWILIO_*` + point a number's webhook at the inbound route to go live; inbound signature verification (Svix/Twilio) is the hardening step before production (currently a shared `?token=`).
- **Email-monitor question** (founder): inbound email already gives a watched shared address → conversations; a full ITSM mailbox monitor (IMAP polling, ticket queues, SLA) is deferred as ITSM territory.
- Founder still owed (carried): forge→PROVISIONING decision, attorney clause review, Stripe live keys at prod, prod promotion gate.
- HRIS applicant + Admissions pipelines remain unbuilt (intent routing points at them).

## Related
- [[ADR-032 — The Institutional Assistant, Canonical Grounding, and the PII Boundary]]
- [[ADR-029 — Effects Layer and Provider Rails]] (escalation + outbound ride this)
- [[Corveaux V2 - Session 42 — The Signature and the Boundary]]
