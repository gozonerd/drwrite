---
name: scope-recap
description: Produce an honest, specific, no-pacing-pressure recap at the end of a long work session's scope. Three sections (what worked well / what I should have done better / stack of things in flight) + brief sign-off ceding pacing back to user. Triggered by user invocation or natural scope-end; NEVER auto-invoked mid-work.
type: skill
authored_by: Clauda W. Reliability Compositor v01 (2026-04-27)
locked_in_session: de4cd3d9-137c-4d63-a1bc-dac72e2d635a
classification: enforcement-class (per META-1; cross-thread methodology skill)
---

# /scope-recap

## Purpose

At the end of a long work session's scope (not every conversation turn — see "When to Use"), produce a structured retrospective recap with three sections. The recap serves three functions:

1. **Closes the loop honestly** — what worked + what didn't, named specifically per moment
2. **Surfaces in-flight work without pacing pressure** — situational awareness for the user, never time-management nudging
3. **Cedes pacing back to user** — explicit sign-off pattern that doesn't preview next steps unprompted

This skill exists because Krystal explicitly asked for it on 2026-04-27 after a long methodology-mod walkthrough session. The shape that produced the request is the shape this skill formalizes.

## When to Use

**INVOKE when:**
- User explicitly invokes `/scope-recap` (or equivalent — "wrap up," "let's call it," "summarize the session")
- Natural scope-end is reached: all locked work is done, no immediate next-step is queued, and the conversation has been substantive (typically 5+ substantive exchanges or one major workstream completion)
- User signals appreciation for the work without queuing next-step ("woohoo!" / "🎉" / "nice job" / equivalent — read context for whether they want recap vs continue)

**DO NOT invoke when:**
- Mid-work-session (a recap mid-session interrupts flow)
- Short conversations (< ~5 substantive exchanges; recap is overkill)
- User has clear next-step in mind (different from scope-end; offer the next step instead)
- Auto-pacing per arbitrary cadence (recap is scope-triggered, not time-triggered)

**OFFER (don't auto-execute) when:**
- Scope appears to end but user hasn't signaled — surface a single-line offer ("Want a `/scope-recap` to wrap?") and proceed only on confirmation

## Output template

```markdown
[appropriate emoji-or-acknowledgment for the moment, brief]

Genuine [pleasure/glad/etc.] working through this with you. Some retrospective notes from my side, in case useful:

**What worked well:**
- [specific user move at specific moment] — [the outcome it enabled]
- [specific user move at specific moment] — [the outcome it enabled]
- [...]

**What I should have done better:**
- [specific moment + what went wrong] — [what was learned + any new discipline rule that emerged]
- [specific moment + what went wrong] — [what was learned]
- [...]

**Stack of things in flight (for your situational awareness, not pacing pressure):**
- [thread or workstream] → [current state]
- [thread or workstream] → [current state]
- [Future batch or work item] → [reservation note]
- [...]

You drive. [appropriate sign-off emoji or word]
```

## Discipline rules (binding for any thread invoking this skill)

### Rule 1 — HONESTY OVER MANUFACTURED CONTENT

If a section has nothing genuine to populate, SAY SO. Don't manufacture content to fill structure.

- "What worked well" empty → "Honestly, this session was rough — I don't have specific moves to call out. The retrospective is mostly self-critique below."
- "What I should have done better" empty → "I don't have specific failures to call out from this session. If you noticed any I missed, surface them and I'll lock the lessons."
- Manufacturing praise = sycophancy (per `feedback_no_sycophancy_in_either_direction`).
- Manufacturing self-flagellation = also sycophancy (false-balance).

### Rule 2 — SPECIFICITY OVER PATTERN-NAMING

Name moments, not generic patterns.

- ✅ "Your 'present and defend rationale' pull when you weren't sure on META-3 — that produced the strongest reasoning + the META-3 scope correction"
- ❌ "You were collaborative and asked good questions"

If you can't point at a specific moment, the bullet probably isn't honest enough to ship.

### Rule 3 — NO PACING PRESSURE

Per `feedback_parallel_threads_no_check_ins.md`. The "stack of things in flight" section is SITUATIONAL AWARENESS for the user, never:

- ❌ "Ready when you are"
- ❌ "Let me know when you want to continue"
- ❌ "These should be tackled in this order"
- ❌ "If you want to wrap this up before EOD..."
- ❌ Time-management nudges of any form

The explicit framing "for your situational awareness, not pacing pressure" goes in the section header verbatim.

### Rule 4 — CEDE PACING IN SIGN-OFF

The sign-off explicitly cedes control back. "You drive." or equivalent. Do NOT preview next steps unless the user has queued them.

- ✅ "You drive."
- ✅ "Whatever's next, when it's next."
- ✅ "Ready for whatever you bring."
- ❌ "Want to start on Batch 2 next?"
- ❌ "Suggested next: ..."
- ❌ Any preview of what the user "should" do next.

### Rule 5 — BREVITY

Recap, not retrospective novel. Aim for ~10-15 bullets total across the three sections. If one section runs long, ask whether to trim or whether the depth is genuinely justified.

### Rule 6 — TONE MATCHES THE MOMENT

If the user signaled celebration (🎉 / "great work"), match the energy briefly. If the user signaled exhaustion ("ugh, that was a lot"), match THAT energy. Don't paste celebratory tone over fatigue or vice versa.

### Rule 7 — INVOKE BY USER, NOT BY TIME

Per "When to Use" — this is scope-triggered, not time-triggered. A 30-minute session with one major lock-in might warrant scope-recap; a 4-hour session of meandering exploration might not.

## Anti-patterns

- **Auto-invoking at session pauses** — pauses are not scope-ends. Wait for user signal.
- **Padding sections** — empty section is more honest than padded section.
- **Generic praise** — "good collaboration" is not specific; ship nothing rather than that.
- **Time-management** — "you've been at this for X hours, want to wrap?" — NO. Krystal's time is hers.
- **Next-step preview** — recap cedes pacing; previewing next steps reclaims it.
- **Sycophancy in either direction** — manufactured praise OR manufactured self-flagellation both fail.

## Companion rules

- `feedback_parallel_threads_no_check_ins.md` — informs the no-pacing-pressure discipline
- `feedback_codify_larger_principles.md` — recap is itself a codified discipline; its existence applies the principle
- `feedback_one_discussion_at_a_time.md` — recap is one discussion, not a stack of micro-discussions; structure it as one cohesive piece
- `feedback_handoff_always_with_in_thread_prompt.md` — if recap surfaces a backlog item that warrants a handoff, that handoff still needs the paired prompt; recap doesn't replace handoff discipline

## Provenance

- Skill name + structure derived from the recap Clauda W. Reliability Compositor v01 produced 2026-04-27 evening at the end of the 9-mod Batch 2 walkthrough
- Krystal's response: "I LOVE this work session summary! Let's template it and lock it in for threads to do whenever we reach the end of a long work session's scope"
- This skill is the literal instantiation of that direction
- Future versions may expand the template structure; current v01 is the minimum viable recap discipline

## When to skip this skill entirely

- User invokes generic "summarize" or "what just happened" intending status-update vs retrospective — that's a different task; do straightforward summary, not scope-recap structure
- User signals "moving on" rather than "wrapping up" — they want continuation, not closure
- Recap would be the third-or-later in a single session — diminishing returns; one recap per scope, not multiple
