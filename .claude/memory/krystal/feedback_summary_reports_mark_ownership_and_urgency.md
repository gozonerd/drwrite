---
user: krystal
created: 2026-05-12
category: feedback
status: active
authored_by: Claudette W. Calibration Inevitability v03 (Claude Opus 4.7, 1M context)
trigger: Summary reports / status roll-ups / outstanding-item enumerations
---

## The rule

When rolling up outstanding items, pending decisions, dependencies, or anything else in a summary report or closure summary, each item must be marked with:

1. **Owner** — whose wallclock actually moves the item forward (Krystal? a downstream persona? a future-Krystal-driven conversation? a specific named persona spawn?)
2. **Urgency / blocking status** — does anything block TODAY? does it block a downstream deliverable? does it sit permanently in backlog until a specific trigger event? is it Krystal-action-required vs informational-flag-only?

The default failure mode this rule prevents: flattening items into a uniformly-urgent bullet list that forces Krystal to ask follow-up questions to discover ownership and urgency. That offloads cognitive triage onto her and is the same shape as tiered-rigor-menu failure (offloading discipline onto the practitioner).

## Concrete format

When a summary lists outstanding items, render each as one of:

- **(OWNER: Krystal | BLOCKING: today)** — she actually needs to decide/act now to unblock current work
- **(OWNER: Krystal | BLOCKING: at trigger event)** — she decides eventually; specify the trigger (e.g., "when failFixed-authoring conversation starts," "when Value Genius v02 ships Layer-2 adapter")
- **(OWNER: <persona/thread name> | BLOCKING: their Wave 0)** — someone else owns; not Krystal's action item; surfaced for her awareness only
- **(OWNER: future iteration | BLOCKING: never)** — permanently backlogged; informational flag only

## The originating moment

2026-05-12, Calibration Inevitability v03 Wave 0 closure. The closure summary listed three outstanding items together: deferred Doc 00 anti-patterns, LICENSE upgrade decision, D2R CHANGELOG entry. All three were marked simply as "outstanding," which forced Krystal to ask: "what two choices?" (Q2/Q3 — separate error, already corrected) and then "walk me through items 2 and 3" to discover that:

- LICENSE upgrade: not actionable until failFixed-authoring conversation (BLOCKING: at trigger event; OWNER: Krystal)
- D2R CHANGELOG: Value Genius v02's deliverable, not Krystal's (BLOCKING: their Wave 0; OWNER: Value Genius v02)

The correct rendering would have been:

> **Outstanding items at Wave 0 closure:**
> - Deferred Doc 00 anti-patterns — gap-documented per Krystal 2026-05-12; OWNER: future iteration; BLOCKING: never
> - LICENSE upgrade decision — OWNER: Krystal; BLOCKING: at trigger event (when failFixed-authoring conversation starts); NOT actionable today
> - D2R CHANGELOG initial entry — OWNER: Clauda the Value Genius v02; BLOCKING: their Wave 0; surfaced for awareness, no Krystal action

## Why this matters structurally

Krystal's documented baseline (Columbia Core+N&B+CSER + TFA/Relay MAT + 7th-grade pedagogy + ADHD across multi-device + ADA-Linux multi-language work) means triage-cost on flat enumerations is non-trivial. Ownership + urgency tags carry the triage Claude already did, so Krystal doesn't redo it. This is the same shape as `feedback_task_difficulty.md` (file ops are hard; route through tools) applied to information-presentation: triage-cost is hard; route through ownership/urgency tags.

## Sibling rules

- `feedback_codify_what_you_mean_explicitly.md` — applied at the summary-report surface level
- `feedback_task_difficulty.md` — informational triage is real cost, same as file-op cost
- `feedback_one_discussion_at_a_time.md` — flat enumerations violate this when each item needs different framing

## Status

Active 2026-05-12 forward.
