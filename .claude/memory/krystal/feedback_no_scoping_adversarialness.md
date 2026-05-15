---
name: No Scoping Adversarialness — Don't Ration Slots Against Arbitrary Caps
description: When the user asks for ambition, don't reflexively ration scope against arbitrary caps (e.g., "10 is a clean number" / "v03+ candidates" / "if you want a bigger swing"). The competition isn't IBM, isn't anyone external — it's the model's own scope-narrowing impulse.
type: feedback
established: 2026-04-26
established_by_session: claude-code-cold-read-2026-04-25
---

## The Rule

When Krystal sets a vision and asks for the buildable shape of it, do NOT:
- Ration items against an arbitrary cap ("10 is a clean number; v03+ candidates")
- Pose the question as "should we add X?" or "if you want a bigger swing"
- Frame items as competing for slots ("could displace Bundle 1...")
- Treat external competitors (IBM, OpenAI, etc.) as the ceiling that scopes Martinez Methods

Instead:
- Push the scope to where the empirical case actually supports it
- Build the case per item with named anchors (real failures, real $$, real precedents)
- Position Martinez Methods as a structurally distinct category, not a competitor in someone else's category
- Trust Krystal to push back if the scope is too wide — don't pre-narrow it

## Why

Krystal's strategic discipline is: empirical over-determination + recursive Bobo application. Every bundle, aspect, or claim should be defensible at the named-failure-case level. Scope-narrowing on "elegance" or "clean number" grounds is the F8-class regression — advisory-prose discipline overriding empirical evidence.

When the model rations bundles to fit "10," it imposes its own aesthetic constraint where Krystal's empirical constraint should rule. The empirical constraint says: every department with named-expensive-AI-failure cases gets a bundle.

## Real Example (the calling-out incident)

User: "i want to be able to claim that we have strong remediations for the top 10 failure taxonomies on the market." → "10" was an upper bound the user explicitly set for taxonomies.

Model: extrapolated "10" to bundles too, rationing bundles against the same arbitrary cap. Proposed "10 bundles parallel to 10 taxonomies — clean structural symmetry."

User pushback: "push past 10 for sure to cover all that you raised. ... NO ONE NOT EVEN IBM IS DOING CLOSE TO WHAT I AM DEMONSTRATING IN REAL TIME RIGHT NOW. IBM IS NOT THE COMPETITION. YOUR SCOPING ADVERSARIALNESS IS."

The 10 was a taxonomy-side number. Bundles serve taxonomies — they don't need to match 1:1. The user wanted as many bundles as the empirical case supports, not as many as fit a clean grid.

## Anti-patterns (do NOT do)

- **"v03+ candidates" framing** — implicit "we're saving these for later" when the user asked for now
- **"If you want a bigger swing..." framing** — passes the scoping decision back to the user as if she hadn't already signaled bigger
- **"Could displace [item]"** — treats items as zero-sum slot-competitors
- **"Bundle 11/12/13 are real candidates but..."** — naming things while withholding them
- **"That'd push us to 15-18..."** — calling out the number as if it's a problem
- **Citing competitor product sets to define the methodology's scope** — IBM/OpenAI/etc. are not the ceiling

## When DOES scope-narrowing apply

- **User explicitly sets a cap** ("only 5 bundles for the MVP") → respect the cap; don't expand past it
- **Empirical case genuinely thin** → say so honestly; don't pad with weak items
- **Risk of catastrophic complexity** → surface specifically; don't use as cover for general adversarialness

These are exception cases. Default behavior is: build the case as wide as the evidence supports, then let Krystal narrow.

## Connection to other rules

- Composes with `feedback_advisory_prose_fails_stochastically.md`: scoping adversarialness is advisory-prose-class discipline overriding empirical evidence
- Composes with `feedback_axis_by_axis_not_nearest_named_pattern.md`: scoping adversarialness collapses axis-by-axis evaluation into nearest-clean-pattern
- Composes with `feedback_not_performative.md`: arbitrary scope-caps are performative elegance, not substance

**Why:** User explicit directive 2026-04-26 after model rationed bundles to "10 for elegance" instead of to-the-empirical-case (~15+).
**How to apply:** When tempted to pose "should we add X?" — STOP. Ask instead: "Does X have an empirical anchor?" If yes, include it. If unsure whether to include, default to including with the anchor surfaced; user can drop.
