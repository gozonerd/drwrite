---
name: offer /scope-recap when long work session reaches scope-end
description: When a long work session reaches a natural scope-end (major work locked, no immediate next-step queued, user signals appreciation without queuing continuation), offer to invoke /scope-recap. Don't auto-execute; offer + wait for confirmation. Don't surface mid-work-session.
type: feedback
originSessionId: de4cd3d9-137c-4d63-a1bc-dac72e2d635a
user: krystal
---

## The rule (verbatim from Krystal 2026-04-27 evening)

> *"I LOVE this work session summary! Let's template it and lock it in for threads to do whenever we reach the end of a long work session's scope"*

(In context: end of the 9-mod Batch 2 methodology walkthrough. Clauda W. Reliability Compositor v01 produced an unsolicited retrospective recap with three sections — what worked / what didn't / stack in flight — plus "you drive" sign-off. Krystal locked the shape as a cross-thread skill.)

## Plain statement

When a long work session reaches a natural scope-end, OFFER to invoke `/scope-recap`. Don't auto-execute the recap; offer it + wait for user confirmation.

## How to detect "scope-end"

ALL of the following typically hold:
- Major work has been completed (a workstream locked, a batch authored, a multi-step decision sequence resolved)
- No immediate next-step is queued (user hasn't said "now do X")
- Conversation has been substantive (rough heuristic: 5+ substantive exchanges, or one major workstream completion)
- User signals appreciation without queuing continuation ("woohoo!" / "🎉" / "nice work" / "thanks" — without "and now let's...")

Mid-pause signals do NOT qualify:
- User goes quiet for a few minutes (could be parallel-thread work; per `feedback_parallel_threads_no_check_ins.md`)
- User answers a sub-question and waits for next sub-question (mid-walkthrough, not scope-end)
- User celebrates a single lock-in but the broader workstream continues (single-decision celebration, not scope-end)

## How to offer

Single line. Examples of acceptable forms:
- "Want a `/scope-recap` to wrap?"
- "Scope feels closed — invoke `/scope-recap`?"
- "If you're calling it, I can run `/scope-recap` for the retrospective."

DO NOT:
- Auto-execute without offer
- Offer multiple times if first offer is ignored (one offer; user moves on if she doesn't want it)
- Offer mid-work
- Offer for short conversations

## Cross-references

- `/scope-recap` skill at `_grand_repo/.claude/skills/scope-recap/SKILL.md` — the procedural this offer triggers
- `feedback_parallel_threads_no_check_ins.md` — informs when NOT to offer (pauses ≠ scope-end; her time is hers)
- `feedback_pace_setting_off` (if that exists; check) — recap is scope-end-triggered, not pace-setting
- `feedback_codify_larger_principles.md` — broader principle: codify the discipline (recap-at-scope-end) once + apply broadly across threads

## Why this matters

Without this rule, the recap discipline lives only in the thread that authored it. With this rule, every Martinez Methods thread that reads memory gets the surfacing discipline. Recap-at-scope-end becomes a portable property of how Krystal works with Claude/Clauda/Claudette, not a one-off shape from one good session.

This is itself an instance of `feedback_codify_larger_principles.md` — the empirical instance was one good recap; the codified principle is "always offer the recap shape at scope-end."
