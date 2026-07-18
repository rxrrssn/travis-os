---
type: operations
status: draft
date: 2026-06-13
owner: Travis Hornbuckle
tags: [runbook, conversations, email, sms]
---

# Inbound Channel Connection Runbook

How to safely turn on inbound **email** and **SMS** so that messages from people
become conversations in the inbox. Written so it can't be turned on insecurely.

## Our posture, in plain language
An inbound channel only goes live once we can **prove a message really came from the
provider** (a verified signature) — until then, in production, the door stays shut.
We connect email first; SMS stays off until its agreement and verification are in
place.

## How it's protected (already built)
- Each inbound message must pass a check before it's accepted: a **provider
  signature** (preferred), or a **shared secret token** sent in a header.
- If neither is configured, inbound is **accepted only outside production** — in
  production it is refused. There is no "open by default."
- Per-sender requests are **rate-limited** to prevent flooding.
- Connecting SMS sends **nothing** until the Twilio credentials are set.

## Connect inbound EMAIL (Resend)
1. In Resend, set up inbound for the address the school will use (e.g. `ask@school.edu`).
2. Point Resend's inbound webhook at: `https://<host>/api/inbound/email/<tenant-slug>`
3. Copy Resend's signing secret into `RESEND_INBOUND_SIGNING_SECRET` (Worker secret). On **staging** this is now automated: set the `RESEND_INBOUND_SIGNING_SECRET_STAGING` GitHub secret and the deploy passes it to the app worker (do the prod equivalent at prod cutover).
4. Redeploy. From then on, every inbound email's signature is verified before it threads.
5. Test: send a real email to the address → confirm it appears as a conversation in the inbox.

## Connect inbound SMS (Twilio) — only when ready
1. Sign the Twilio DPA first ([[Subprocessors and DPAs]]).
2. Set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER` (Worker secrets).
3. In Twilio, point the number's inbound-message webhook at:
   `https://<host>/api/inbound/sms/<tenant-slug>`
4. Redeploy. Inbound texts are now signature-verified and thread into conversations;
   operator replies go back out as SMS.
5. Test with a real text → confirm the conversation + a reply round-trip.

## If you're not using provider signatures yet
Set `CONVERSATIONS_INBOUND_TOKEN` and include it as the `x-corveaux-inbound-token`
header on the webhook (or `?token=` in the URL for older setups). The provider
signature is preferred and required for production-grade assurance.

## Open items
- ☐ Decide the per-school inbound email address + who monitors the inbox.
- ☐ Connect email for the first live school; leave SMS off until needed.
- ☐ Add inbound to the status-page checks once a channel is live.

## Related
- [[Environment and Secrets Inventory]] · [[Subprocessors and DPAs]] · [[Security Overview and SOC 2 Control Mapping]]
