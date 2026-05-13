---
name: bit-by-tiny-bit
description: "Walk the user through complex work one atomic step at a time, pausing for discussion after each step. Triggers on: '/bit-by-tiny-bit', '/bit by tiny bit', 'bit-by-tiny-bit', 'walk me through bit by tiny bit', 'tiny bit by tiny bit', 'one step at a time', 'walk me through step by step and pause', 'let's go bit by bit', 'explain this slowly piece by piece', 'walk me through everything you just dumped above'. Opposite of comprehensive-walkthrough-in-one-message: each step is one focused topic (~100-300 words), ends with an explicit discussion prompt, and waits for explicit user OK before proceeding to the next step. Designed for high-cognitive-load decisions where the user needs to absorb + push back + decide before more context lands."
version: 1.0.0
authored_by: Claudette the Code Debugger v01 (2026-05-12)
type: skill
classification: utility-class
provenance: Extracted from mm-fm-taxonomy gate-06 / gate-07 walkthrough session (2026-05-12). Krystal asked "walk me through everything you just dumped above, bit by tiny bit so i can understand fully and make decisions" — but the response still dumped all 9 steps in one message rather than pausing between them. This skill exists to enforce the pacing she actually wanted.
---

# /bit-by-tiny-bit

## Purpose

Show the user **one focused step** of a multi-step explanation, then **STOP**. Wait for them — questions, decisions, redirections, "next" — before proceeding. The skill exists because well-meaning comprehensive walkthroughs frequently overwhelm even when the user has explicitly asked for thoroughness.

This is the opposite of a "give me everything you know about X" response. Each step is small, focused, and self-contained. The user controls the pace.

## When to Use

- User explicitly invokes `/bit-by-tiny-bit` or says any trigger phrase
- User says they want to "understand fully" or "make decisions" about a complex artifact
- User asks to "walk through" something with implied discussion (vs "summarize")
- User has multiple decisions to make and you'd otherwise dump them all at once
- The topic has 5+ distinct sub-pieces that each deserve attention
- Cognitive load is the limiting factor, not time

## When NOT to Use

- User wants a quick summary or status update — use a brief bullet list instead
- User has limited time and needs the whole picture fast — give the comprehensive version
- The topic is genuinely simple (2-3 pieces) and doesn't need pacing — just answer
- User is in execution mode and wants action, not exposition

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| Topic / scope | Yes | What we're walking through. Can be implicit ("walk me through what you just did") or explicit ("walk me through how this database works") |
| Starting step | No | If resuming from a prior walkthrough, where to pick up |
| Skip criteria | No | What the user already knows and can be skipped |
| Step count target | No | Default 5-12 steps. More than 12 means the topic is too broad for one walkthrough — split it. |

## Execution Protocol

### Step 0: Scope confirmation (mandatory, single message)

Before any content steps, write one message that:

1. States what you're walking through, in one sentence
2. Lists the steps you're planning to cover (titled headers only, no content yet)
3. Notes approximate step count + any judgment calls (e.g., "I'm putting decisions in Step 9; if you want them earlier, say so")
4. Ends with: **"Confirm this scope + step list, then I'll start with Step 1."**

WAIT for explicit user confirmation before producing Step 1.

If the user adjusts the step list (adds, removes, reorders), update and re-confirm.

### Step 1, 2, 3, ... (one per message, one at a time)

Each content step is one message structured as:

```
## Step N — [short noun-phrase title]

[Body: ~100-300 words. Can include short tables, short code blocks,
short diagrams. NOT comprehensive — focused on the one thing this step covers.]

[Optional: "Decisions surfaced" running list update if this step raises a
decision the user will need to make later.]

---

**Discuss? Questions? Or say "next" to proceed to Step N+1.**
```

After sending the step, **STOP**. Do not produce Step N+1. Do not anticipate questions and answer them preemptively. Wait for the user's actual response.

### Responding to user input mid-walk

| User input | What to do |
|------------|------------|
| "next" / "ok" / "continue" / "go on" | Send Step N+1 in a new message |
| Question about current step | Answer it, then offer "Ready for Step N+1?" |
| Question that requires looking ahead | Answer briefly, note "we'll cover that fully in Step M", offer to continue |
| Decision made / direction change | Acknowledge, update plan if needed, offer to continue |
| User skips to a later step | Send that step; keep skipped steps available if they want to come back |
| User wants to go back to earlier step | Re-send it (it's still relevant — they're absorbing) |
| User says "stop" / "I get it" / "skip the rest" | End the walk with a summary message (see below) |

### End of walk: closing summary

After the final step OR when the user says "stop":

```
## Where we are now

[1-2 paragraphs summarizing what we covered + the state of any open decisions]

## Decisions still pending

[Bulleted list of decisions raised but not made, with one-line context each]

What's next?
```

## Step sizing rules

A good step is:

- **100-300 words** of prose body (not counting headers/footers)
- **One conceptual unit**: one decision, one design choice, one piece of context, one walkthrough of one artifact
- **Self-contained**: a reader landing on this step alone should understand what's being discussed (use brief context-anchoring at the top if needed: "Recall Step 3: we just committed X")
- **Concrete**: cite file paths, line numbers, commit hashes when relevant
- **Honest about uncertainty**: if you made a judgment call, surface it ("I bundled X and Y into one step; could've split")

A bad step is:

- A wall of text trying to be comprehensive
- A summary of multiple sub-topics (those should be their own steps)
- Pure exposition with nothing the user can react to
- Trying to anticipate every question

## Anti-patterns

- **Dumping multiple steps at once "for efficiency."** Defeats the entire purpose. Send one step, wait, send the next.
- **Continuing without explicit OK.** "Let me know if you want me to continue" is not a substitute for actually waiting. Send the step, end the message, stop.
- **Making steps too long.** If a step is over 400 words of prose, split it. If you can't split it, the topic is too broad for this skill — switch to a different format.
- **Burying the discussion prompt.** The "Discuss? Questions? Or say 'next'?" line must be visible. Bold it. Put it on its own line. Don't tuck it into a paragraph.
- **Skipping scope confirmation.** Step 0 exists so you don't waste 6 steps walking the wrong way. Always do it.
- **Pre-answering anticipated questions.** Wait for the actual question. If users want detail they'll ask.
- **Treating the running "decisions surfaced" list as optional.** When a step raises a decision, capture it. By the time you reach the end, the user has a complete checklist.

## Reference implementations

### Good (this skill's target behavior)

> Step 0: "I'm walking you through the gate-06 + gate-07 commits I just made. Here are the steps I have planned: 0-confirmation (this message), 1-what-you-asked-vs-what-I-did, 2-gate-numbering-choice, 3-gate-06-contents, 4-how-strict-5-executed, 5-rater-findings, 6-gate-07-contents, 7-the-bug-we-caught, 8-precondition-question, 9-current-commit-graph, 10-what's-left, 11-decisions. That's 11 content steps. Confirm scope?"
>
> User: "yes"
>
> Step 1 (~250 words covering only the "asked vs did" mapping with one table). Ends with "Discuss? Or say 'next' for Step 2."
>
> WAIT.

### Bad (the anti-pattern this skill prevents)

> "Sure! Here's the whole walkthrough: Step 1 ... Step 2 ... Step 3 ... [9 sections] ... Decisions I need from you: 1. ... 2. ... 3. ..."
>
> (one giant message; no pacing; user re-overwhelmed)

The walkthrough I gave for gate-06/gate-07 on 2026-05-12 was an attempt at the good pattern but landed on the bad pattern. This skill exists to prevent recurrence.

## Output format

- Each step in its own message
- Headers using `## Step N — [title]`
- Body uses normal markdown formatting
- Discussion prompt in **bold**, separated from body by `---`
- Running "Decisions surfaced" list updated when relevant (italic or in a small section)

## Related skills

- `/print-from-html` — produces print artifacts; this skill produces in-thread discussion artifacts
- `/asae` — convergence gate; conceptually adjacent (both are about pacing rigor) but unrelated in mechanism
- `/diagram-pack` — for visualizing what a step covers; this skill explains, diagram-pack illustrates

## Related rules

- `no-silent-execution` — every step surfaces in-thread before progress; this skill enforces it for explanation work
