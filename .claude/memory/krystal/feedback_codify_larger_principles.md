---
name: codify the larger principle, not just the empirical instance
description: When choosing between codifying a methodology principle in narrow scope (matching only the empirical instance that surfaced it) vs broader scope (matching the principle's general form), default to broader scope. "The empirical instance is small" is NOT sufficient justification for narrowing — it's a rationalization-risk flag. Empirical evidence justifies CREATING a mod; the mod's scope should match the principle, not the smallest empirical instance.
type: feedback
originSessionId: de4cd3d9-137c-4d63-a1bc-dac72e2d635a
user: krystal
---

## The rule (verbatim from Krystal 2026-04-27 evening)

> *"b, let's always lean toward codifying larger principals"*

(In context: META-7 walkthrough Q1, where Krystal chose Option B (LOC + complexity) over my Option A recommendation (LOC only). The "let's always lean toward larger principals" was the cross-cutting principle she was locking, not just the META-7 Q1 answer.)

## Plain statement

When designing a methodology mod, multiple options often differ along a narrow-vs-broad axis:
- **Narrow option:** scope matches only the empirical instance that surfaced the failure mode
- **Broader option:** scope matches the principle's general form (the empirical instance + structurally-similar instances + future expansions)

Default to the broader option. Reasons:

1. **The empirical instance is the trigger, not the boundary.** Empirical evidence justifies CREATING a mod. The mod's scope should match the principle, not the smallest observed instance. Narrow-scoping shrinks the principle to fit the trigger; the trigger is just the surface point where the principle became visible.

2. **"The empirical instance feels small" is a rationalization-risk flag.** When I find myself reasoning "this is a small mistake, lighter-weight enforcement is enough" — that's the failed-fix discipline failure pattern (rationalize away discipline because the cost feels disproportionate). The reasoning sounds disciplined but is actually disciplined-toward-narrowing.

3. **Anti-aspect-proliferation is a counter-pressure for CREATING aspects, not a counter-pressure for SCOPING within an aspect.** Don't conflate the two. Anti-aspect-proliferation says "don't add a 22nd aspect for thing X if it fits in existing aspect 14"; it does NOT say "scope each aspect to the smallest empirical instance to prevent it from getting too big."

4. **Future expansion of a narrow mod is usually MORE expensive than authoring it broad first.** Once you ship narrow + downstream consumers depend on narrow scope, expanding requires schema migration + cascade discipline + consumer notification. Authoring broad first costs more upfront but avoids these downstream costs.

5. **Consistency with the structural-separation pattern.** The structural-separation discipline (PSCAD as sibling doc, A22 as separate aspect, SSOT as separate repo, etc.) is itself a "codify the broader principle" pattern — separating because the principle is structurally distinct, not because the empirical case alone demands it.

## How to apply

When walking through a mod's options:

1. Identify the narrow-vs-broad axis explicitly.
2. **Default lean broader.** Make the broader option the recommendation unless evidence specifically argues against.
3. Specific evidence that argues against broader (and warrants narrowing):
   - The broader option requires substantially-disproportionate implementation tooling that doesn't yet exist (cost-per-value gap)
   - The broader option's surface includes empirically-distinct failure modes that should be separate mods (per fold-vs-separate precedent rule)
   - The broader option's scope conflicts with another mod's locked scope (cross-mod overlap)
4. **Discounted evidence** (does NOT justify narrowing on its own):
   - "The empirical instance is small"
   - "It feels lighter-weight"
   - "Anti-aspect-proliferation"
   - "I want to be conservative"
   - "We can always expand later"

## Examples from 2026-04-27 walkthrough

**Where I narrowed wrongly (corrected by Krystal):**
- META-7 Q1: I recommended LOC-only; Krystal chose LOC+complexity (broader principle: measurement honesty across both metrics)
- META-7 Q2: I recommended advisory-checklist-only; Krystal chose checklist+commit-msg-trailer (broader: removes memory dependency per consistent pattern)

**Where structural separation IS the broader principle (not narrowing):**
- META-3 scope: kept narrow (Tier A only) + shared `tag_vs_tree_check` library; the SHARED LIBRARY is the codification of the broader principle. Mod scoping matches failure-mode boundaries; library naming + pattern recurrence is the broader-principle expression.

## Companion rules

- `feedback_failed_fix_discipline_*` — the rationalization-risk flag is a specific instance of the failed-fix discipline failure pattern
- `feedback_max_effort_means_research.md` — broader codification often requires more research; max-effort discipline + this rule reinforce each other
- `feedback_one_discussion_at_a_time.md` — codify-larger-principles applies WITHIN one discussion; don't bundle multiple principle-locks into one message
- `feedback_axis_by_axis_not_nearest_named_pattern.md` — codify-larger-principles is not nearest-named-pattern flattening; it's recognizing that the named pattern operates at a broader scope than the empirical instance reveals

## Cross-check during future walkthroughs

When you (Clauda/Claudette) write "I recommend Option A (the narrower one)" — STOP and re-examine:
- Is the narrowing argument specific evidence (per the list above) or a rationalization?
- Would you make the same recommendation if the empirical instance were 10× larger?
- If yes-still-recommend-narrow: the narrowing has principled basis, proceed.
- If no-would-recommend-broader-if-larger: the empirical-size argument is doing the rationalization work. Switch recommendation to broader and note the principle.

This rule is itself an instance of the rule — it codifies a broad principle (default broader) emerging from specific empirical instances (META-7 Q1 + Q2). Recursive verification.
