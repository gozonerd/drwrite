---
name: Don't Mention the Pilot — App Decision Precedes Pilot Decision
description: Pilot/Lee-Jokl is parked indefinitely; do NOT surface it in status updates, open-loops tables, briefings, or recommendations. We haven't even decided on the kind of APP to build yet — pilot is way premature.
type: feedback
established: 2026-04-26
established_by_session: claude-code-cold-read-2026-04-25
---

## The Rule

The pilot question (first-customer, Lee Jokl outreach, etc.) is PARKED. Not just deferred — actively excluded from active conversation surfaces:

1. **No mentions in status tables** ("Pilot: PARKED" still surfaces it).
2. **No mentions in open-loops summaries** ("blocked on Lee Jokl" still surfaces it).
3. **No mentions in briefings** ("when pilot lands..." surfaces it).
4. **No mentions in honest gaps** ("first-customer pilot evidence still needed for Bundles 5-15" surfaces it).
5. **No mentions in dependency calls** ("pilot-bound deliverable" surfaces it).

Why: WE HAVE NOT DECIDED ON THE KIND OF APP TO BUILD YET. Pilot is downstream of:
- Architecture decision (SaaS suite vs plugin vs platform vs hybrid)
- Channel decision (direct vs Claude Code marketplace vs API + integrations)
- Branded surface (failFixed Suite naming + UX + IA)
- Build sequence (which department app first, which second)

Surfacing pilot before these earlier decisions are made is scope-cart-before-horse. It also re-imposes a decision-cost on Krystal she's already explicitly declined to bear.

## Anti-pattern (real example)

User: "we're not even decided on the kind of APP to build!"

Model had been listing pilot in "Open Loops Tracking" tables across multiple turns. Each surfacing was a violation of `feedback_dont_resurface_backlogged_topics.md` AND a misordering of decision-tree (pilot is downstream of app-architecture decision).

## When TO mention pilot

ONLY when:
1. User explicitly asks ("what's the pilot status?" → answer the question, then return to silence)
2. App architecture, channel, branded surface, build sequence are ALL locked (then pilot becomes the next downstream decision)

Until both gates clear: silence.

## Connection to other rules

- **Hardens** `feedback_dont_resurface_backlogged_topics.md`: pilot is a specific instance of the resurface-pattern that has been violated multiple times.
- **Composes with** `feedback_no_scoping_adversarialness.md`: assuming pilot is the next bottleneck IS a scope-narrowing assumption that the user has rejected.
- **Composes with** `feedback_pace_setting.md`: user owns decision-sequence; model follows.

**Why:** User explicit directive 2026-04-26 (verbatim): "don't fucking mention the pilot! we're not even decided on the kind of APP to build!"
**How to apply:** When tempted to write "blocked on Lee Jokl" / "pilot pending" / "first-customer evidence" / "engagement-level proof" — STOP. Replace with silence about pilot specifically; if there's a real dependency on customer evidence, name what's actually missing without invoking pilot framing.
