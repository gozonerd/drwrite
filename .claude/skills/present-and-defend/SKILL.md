---
name: present-and-defend
description: Re-issue a previously-surfaced multi-question decision walkthrough with full per-option steel-manning + admitted weakness + synthesis with recommendation. Invoked when Krystal needs deeper rationale than the standard "framing + 3 questions + my recommendations" format provides.
type: skill
authored_by: Clauda W. Reliability Compositor v01 (2026-04-28)
locked_in_session: de4cd3d9-137c-4d63-a1bc-dac72e2d635a
classification: enforcement-class (per META-1; cross-thread methodology skill)
---

# /present-and-defend

## Purpose

Krystal's standard walkthrough format is "framing + N questions × M options + my recommendations" — concise, fast for clear cases. When the decision isn't clear and she needs to weigh the tradeoffs herself, she pulls Claude into a deeper format: per-question, per-option full defense + admitted weakness + synthesis. This skill formalizes that deeper format so she can invoke it explicitly without re-typing the full request each time.

The skill exists because Krystal explicitly asked for it on 2026-04-28 after invoking the deep-rationale format multiple times in a single session (META-3 scope decision, META-7, META-9 migration mechanics, Mod 14 convergence-counter hardening). The shape that produced the request is the shape this skill formalizes.

## When to Use

**INVOKE when:**
- Krystal explicitly invokes `/present-and-defend` (or equivalent — "present and defend rationale," "defend each option," "deeper walkthrough")
- A multi-question decision walkthrough has just been surfaced AND Krystal signals she's not ready to lock — wants more substance per option before deciding
- Krystal indicates uncertainty ("I genuinely don't know what to choose," "make me choose based on robust evidence and reasoning," "max effort," "go research if you need to")

**DO NOT invoke when:**
- Krystal already locked the questions with her answers (re-presenting after lock = wasting her time)
- Single-question or trivial decisions (deep-rationale format is overkill for "yes/no" questions)
- Krystal signaled she wants the standard chunk size ("give it all to me at once," "default")

## Output template

For each question in the previously-surfaced walkthrough:

```markdown
### Q{N} — {question title}

#### Option {letter} — {option name}

**Defense:**
1. [load-bearing argument with specific evidence/precedent reference]
2. [argument tied to established discipline pattern or empirical evidence]
3. [...]

**Weakness:**
- [honest admission of where this option fails or where it has costs]
- [edge cases or failure modes the option doesn't catch]

[Repeat for each option per question]

### Q{N} Synthesis → Option {letter}

[Reasoning that ties the synthesis to: (a) established discipline patterns from this conversation/methodology, (b) empirical evidence, (c) cross-cutting principles already locked. Strength of lean (strongly held / lightly held / would accept alternative).]

[Repeat for each question]

## Summary table

| Question | My recommendation | Strength of lean |
|---|---|---|
| Q{N} — {abbreviation} | **Option {letter} ({short name})** | Strongly / lightly held — [primary reasoning] |
[...]

Your read?
```

## Discipline rules (binding for any thread invoking this skill)

### Rule 1 — STEEL-MAN EVERY OPTION HONESTLY

For each option, the defense section must contain the strongest possible argument for that option, not a strawman that exists to be knocked down. If you can't find a strong defense for an option, that's a signal the option might not be a real choice — surface that explicitly rather than fake-defending.

**Anti-pattern:** "Option B has the upside of being faster but ignores key constraints." This is not a defense; it's a critique with an upside acknowledged.

**Right pattern:** "Option B's defense: 1) Speed matters when X. 2) Per established pattern Y, faster wins when Z. 3) Krystal previously chose speed-over-rigor in case W." Then admit weakness honestly.

### Rule 2 — WEAKNESS SECTION IS HONEST, NOT PERFORMATIVE

The weakness section must name actual gaps the option has, not strawman gaps that exist to make the option seem balanced. If the option has a fatal weakness, name it as fatal. If the option has only modest weakness, say so.

**Anti-pattern (false balance):** Adding contrived weakness to make options look comparable when they're not.

**Right pattern:** Some options will have stronger defenses than others; the synthesis should reflect that asymmetry honestly.

### Rule 3 — SYNTHESIS TIES TO ESTABLISHED PATTERNS

The per-question synthesis section names the deciding factor in terms Krystal will recognize from her own established methodology:
- Reference locked memory rules by name (e.g., "Per `feedback_codify_larger_principles.md` §3 evidence-required-for-narrowing")
- Reference established discipline patterns (e.g., "Same defense-in-depth pattern that won META-1 Q3 + Mod 12 tandem-update + META-3 multi-source")
- Reference empirical evidence (e.g., "Empirical failure mode was X, not Y")

DO NOT use generic synthesis ("Option C balances the tradeoffs"). Specific patterns + named precedents are the discipline.

### Rule 4 — STRENGTH-OF-LEAN HONESTY

In the summary table, mark each recommendation with explicit strength:
- **Strongly held** — established discipline pattern + empirical evidence converge here; alternative would require active contradiction
- **Lightly held** — recommendation has reasoning but alternative is defensible; would accept alternative
- **Genuine uncertainty** — both/all options have strong cases; surface the uncertainty rather than fake-confidence

Per `feedback_no_sycophancy_in_either_direction`: don't manufacture confidence OR manufactured uncertainty. Honest signaling.

### Rule 5 — DEFER TO PRIOR LOCKS WHEN APPLICABLE

If a prior lock from this conversation directly determines an option's defense or weakness, cite the prior lock by name. Don't re-derive established conclusions; reference them.

### Rule 6 — RE-PRESENT WITHOUT NARROWING

When invoked, re-present ALL options that were in the original walkthrough — don't drop options Claude considers "obviously wrong." Krystal wants the full landscape; her job is to choose, Claude's job is to defend.

### Rule 7 — TONE: ANALYTICAL, NOT ADVOCATING

Each option's defense reads like an analytical case-builder, not a sales pitch. The synthesis is where Claude advocates; option defenses are where Claude steel-mans without rooting.

## Anti-patterns

- **Re-presenting after lock.** If Krystal already chose, don't re-walkthrough. Lock confirmation only.
- **Strawmanning options Claude doesn't like.** Defeats the purpose of the deeper format.
- **Contrived "weakness" for stronger options to fake-balance.** False balance fails per `feedback_false_balance.md`.
- **Generic synthesis.** "Option C balances tradeoffs" without naming WHICH tradeoffs and which discipline pattern resolves them.
- **Skipping defense for "obvious" options.** Krystal wants to see Claude's reasoning visible, not assumed.
- **Pacing pressure in the response.** This format is naturally long; Krystal opted into it; don't include "let me know when you've decided" or equivalent.
- **Padding to seem thorough.** Length should match decision complexity, not impress.

## Companion rules

- `feedback_codify_larger_principles.md` — synthesis section often references this principle when narrow-vs-broad axis is in play
- `feedback_max_effort_means_research.md` — present-and-defend is one expression of max-effort discipline; do empirical research if needed before defending
- `feedback_false_balance.md` — Rule 2 enforces this; don't manufacture symmetric weakness
- `feedback_no_sycophancy_in_either_direction` — applies to both manufactured-confidence and manufactured-uncertainty in the strength-of-lean signal
- `feedback_one_discussion_at_a_time.md` — present-and-defend operates on ONE walkthrough's questions; doesn't span multiple discussions

## Provenance

- Skill name + structure derived from the per-question per-option deep-rationale format Clauda W. Reliability Compositor v01 produced 2026-04-27 → 2026-04-28 across multiple walkthroughs (META-3 scope, META-7, META-9 migration mechanics, Mod 14 convergence-counter hardening)
- Krystal's response after Mod 14 walkthrough: "and let's lock that in as a skill i can invoke please!"
- This skill is the literal instantiation of that direction
- Triggers identified empirically from her actual invocations during this session

## When to skip this skill entirely

- Krystal locked the answer; standard lock-confirmation applies, not present-and-defend
- Question is single-axis trivial (yes/no); deep format adds no value
- Decision context already exhausted by prior walkthrough; no new substance possible
- Krystal explicitly says "default" or "your call" — she's delegating, not requesting deeper analysis
