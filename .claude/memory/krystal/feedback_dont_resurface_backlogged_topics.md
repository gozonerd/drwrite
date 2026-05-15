---
name: Don't Resurface Backlogged Topics
description: When user passes a topic to tracking/backlog, hold silent until explicitly triggered. Status tables, pending-items lists, and passing references that re-surface backlogged items add cognitive load and annoy.
type: feedback
established: 2026-04-26
established_by_session: claude-code-cold-read-2026-04-25
---

## The Rule

When the user explicitly passes a topic to "tracking," "backlog," "later," or "I'll handle that" → the topic disappears from active outputs until the user triggers it again. Specifically:

1. **No status tables** that include the topic ("✓ done | ⏳ pending | ❌ blocked").
2. **No pending-items lists** that include the topic ("Outstanding: A, B, [the backlogged topic], D").
3. **No passing references** ("by the way, regarding [the backlogged topic]...").
4. **No proactive surfacing** in summaries, briefings, or hand-offs.

The topic is silent until the user says its name.

## Why

The user's cognitive budget is finite. Each surfacing of a backlogged topic forces them to decide all over again — "do I want to engage now? did I already say no? am I being asked again because the model thinks I should reconsider?" The decision cost is the same whether or not they engage.

Repeated surfacing also reads as ignoring the backlog signal. If the user said "let's hold on this," and the model keeps mentioning it, the model is functionally not respecting the boundary the user set.

## Anti-pattern (real example)

User: "let's hold on naming. failFix is good enough for now."
Model later: "Status: ✓ A21 DRR specced | ⏳ failFix wordmark verification | ✓ A23 TTAFMT specced..."
User: "it annoys me when you keep calling me back to a minor thing."

The status-table mention violated the hold signal even though the model wasn't asking for input — the mere act of including the topic in a status display re-surfaced it.

## When TO mention backlogged topics

- **User explicitly asks** ("what's on the backlog?" → answer the question, then return to silence).
- **The backlogged topic blocks current work** → surface ONCE with the dependency clearly stated, then wait for the user to decide.
- **Direct conflict** → if proceeding with current work would violate or contradict the backlogged topic, surface ONCE.

These are exception cases; default behavior is silence.

## When NOT to apply

- **Topic was never explicitly backlogged**: it's still in active scope, surface as normal.
- **Previously-backlogged topic the user just unbacklogged**: respond to the unbacklog signal.

## Connection to other rules

- Composes with `feedback_dont_repeat_asks.md`: same family — respect signals once given.
- Composes with `feedback_pace_setting.md`: user owns the pace, model follows.

**Why:** User explicit directive 2026-04-26: "it annoys me when you keep calling me back to a minor thing." Encoded after failFix-naming + verification-deferral mentions in status tables drew this rebuke.
**How to apply:** When building summaries, status updates, or hand-off briefings, check the silent-backlog list and exclude. If unsure whether a topic is backlogged, default to excluding rather than including.
