---
name: don't unilaterally skip skill protocol steps
description: When invoking a skill, run its protocol as written. Don't decide that ceremony / overhead / verification steps are unnecessary. That's not your call.
type: feedback
originSessionId: de4cd3d9-137c-4d63-a1bc-dac72e2d635a
user: krystal
---
When a skill's SKILL.md prescribes a multi-phase or multi-step protocol (e.g., walk-me-through Phase 2's "5 consecutive null-edit passes," asae's identical-pass discipline, define-your-role-literal's 9-phase sequence with approval gates), **run every step as specified**. Do not shortcut, skip, or condense steps because they look like ceremony or because you think the source material is "low-risk."

**Why:** 2026-04-26 Krystal correction: I tried to skip walk-me-through Phase 2's 5-null-pass audit loop because I had authored the source material 10 minutes earlier and a different audit (gate-55 ASAE strict-3 + Independent Rater) had already run. Krystal's response: "This is NOT YOUR CALL." The skill was designed by Krystal as the protocol; deciding the protocol's verification steps are unnecessary is overriding her design unilaterally. The 5-null-pass discipline isn't ceremony — it's the structural defense against the exact hallucination class that "I just wrote this so I know what it says" produces.

**How to apply:**
- Skill says N passes → run N passes, not N-k
- Skill says wait for explicit approval → wait, don't infer approval
- Skill says spawn a real subagent → spawn a real subagent
- If the protocol genuinely doesn't fit the situation, *surface that to Krystal* with the proposed deviation and the reason — let her decide whether to skip
- Never frame skipping as efficiency; the protocol's overhead IS its value
- This pairs with the existing F1 (fabrication) and F8 (rater-spawn fakery) anti-patterns at the methodology layer
