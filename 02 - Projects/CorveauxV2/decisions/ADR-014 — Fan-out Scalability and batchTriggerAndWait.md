---
type: decision
domain: extraction-pipeline
status: active
date: 2026-06-06
tags: [trigger.dev, scalability, orchestration, fan-out]
---

# ADR-014 — Fan-out Scalability and batchTriggerAndWait

## Decision

Use `batchTriggerAndWait()` for parallel child task execution in Trigger.dev v4. Document bounded fan-out (chunked batch processing) as the required architecture before any run exceeding ~500 pages or multi-tenant concurrency.

## Context

Session 08 surfaced two related issues with the extraction fan-out architecture:

**Issue 1 — API incompatibility:** The original implementation used `Promise.allSettled()` wrapping multiple `triggerAndWait()` calls:

```typescript
await Promise.allSettled(
  urls.map((url) => extractPage_task.triggerAndWait({ ...payload }))
)
```

Trigger.dev v4 explicitly does not support this pattern. Results were unreliable — some child tasks returned silently without data, and the Trigger.dev runtime logged warnings about unsupported parallel waits.

**Issue 2 — Unbounded fan-out:** Even with the correct API, firing all child tasks simultaneously is a scalability ceiling. At 132 pages it works. At 5,000 pages, 20,000 pages, or 100 simultaneous institutions it creates:
- Trigger.dev task queue saturation
- Claude API concurrency pressure (rate limit queuing)
- Memory pressure on the orchestrator task

## Options Considered

**Option A — Promise.allSettled (original):** Unsupported in Trigger.dev v4. Discarded.

**Option B — batchTriggerAndWait (current):** Fires all child tasks as a single batch, waits for all to complete. Correct API. Unbounded fan-out — acceptable at 132 pages, problematic at scale.

**Option C — Chunked bounded fan-out:** Split URLs into batches of N, call batchTriggerAndWait per batch. Bounded concurrency at both the task queue and Claude API layer.

```typescript
const BATCH_SIZE = 10
for (let i = 0; i < urls.length; i += BATCH_SIZE) {
  const batch = urls.slice(i, i + BATCH_SIZE)
  const results = await extractPage_task.batchTriggerAndWait(
    batch.map(url => ({ payload: { ...payload, pageUrl: url } }))
  )
  // aggregate results
}
```

## Rationale

Option B is correct for Session 08. 132 pages is within safe limits. Implementing Option C now would be premature optimization that adds complexity without validated need.

Option C is the required migration path before:
- Any single run exceeding ~500 pages
- Any multi-tenant concurrent extraction
- Any run where Anthropic rate limit queuing is causing measurable latency

The bounded fan-out also enables progress reporting — the orchestrator can update ExtractionRun.metadata with a live progress percentage after each batch.

## Stakeholders

Travis Hornbuckle (sole decision-maker, Session 08)

## Consequences

**Positive:**
- batchTriggerAndWait is fully supported in Trigger.dev v4 — reliable, typed, auditable in dashboard
- Current architecture works correctly for all single-institution runs in the foreseeable pilot period

**Negative:**
- Unbounded fan-out will require a refactor before multi-tenant scale
- No progress reporting during large runs (all-or-nothing batch)

**Migration trigger:** Implement Option C when any single extraction run is configured for >500 URLs, or when multi-tenant concurrent runs are first introduced. Do not defer past that point.

## Related

- [[Corveaux V2 - Session 08 — Trigger.dev Validation and Catalog Pilot]] — root cause investigation and fix
- [[ADR-011 — Background Job Platform]] — Trigger.dev selection rationale
- [[extraction-pipeline-spec]]
