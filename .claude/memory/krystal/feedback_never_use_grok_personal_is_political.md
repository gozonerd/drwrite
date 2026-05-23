---
name: NEVER use Grok (xAI / Musk) — Audre Lorde "personal is political" — absolute rule
description: Absolute rule with no exceptions. Krystal will NOT financially support xAI (Grok's parent company under Elon Musk), regardless of model capability. Rooted in Audre Lorde's "the personal is political" — refusing financial participation in companies whose ownership / politics Krystal opposes. This is NOT a soft preference. It is a hard constraint that survives "but Grok is best at X" arguments.
type: feedback
originSessionId: 37131c01-2544-442f-8d2f-f4d6563d1ae8
user: krystal
---

**Surfaced 2026-05-19 during cross-architectural verification setup for super-resume v01.**

**Krystal verbatim:**

> "we NEVER EVER EVER use grok. idgaf if it becomes the best model for x and we need to do x and we have no idea how to do x we're STILL not using grok. the personal is political (audre lorde) and i will NOT put money directly into that company's pocket."

**Application — absolute rule, no exceptions:**

1. **Do NOT route any task to Grok / xAI models** (`grok-*`, `grok-N`, any future xAI naming).
2. **Do NOT propose Grok** as part of a verifier set, model-routing config, fallback option, or "best tool for X" suggestion — regardless of any benchmark performance claim.
3. **Do NOT use Grok via aggregator APIs** (e.g., Abacus AI's grok-* offerings). Same financial-pipeline outcome.
4. **If a tool / workflow defaults to Grok**, configure it OUT before running.
5. **If a user / collaborator / hiring manager suggests Grok**, decline and explain via the standpoint principle (the personal is political; methodology IP-stack refuses to participate in xAI's revenue).

**Soft rule companion — Meta / Llama:**

Krystal verbatim:
> "in general, llama has never impressed me and meta is also a company i like to withhold financial support from when possible, though this is not a hard rule like with grok."

So:
- **Avoid Meta / Llama** when alternatives exist.
- Not a hard rule. If a task genuinely requires open-weight Llama (e.g., research replication where Llama is the specified comparison model), proceed but document the rationale.

**Soft rule companion — Gemini via Google API ONLY:**

Krystal verbatim:
> "you NEVER use gemini via the abacus ai api btw. only through the google api key."

So:
- **Gemini = Google API key directly** (Krystal's paid subscription tier + AI Studio API key at `https://aistudio.google.com/apikey`).
- **NEVER Gemini via Abacus AI** even when Abacus offers it.

**The structural principle (load-bearing for memory):**

The personal IS political. Methodology-design + model-routing decisions ARE political choices about which companies / ownership-structures / labor practices receive financial flow. Krystal's standpoint discipline applies at the tool-selection layer, not just the content layer. "Best model for the task" is NOT the only criterion — ownership / political stance / financial-pipeline considerations are co-equal criteria.

**How to apply:**

1. When building any new tool, script, or workflow that selects an LLM: filter Grok / xAI out at the configuration layer, NOT at the runtime layer (no "fallback to Grok if X fails" semantics).
2. When proposing cross-architectural verification: confirm Grok is NOT in the set before naming verifiers.
3. When auditing any consumed-config (e.g., Abacus model list, Cursor model picker, etc.): scan for Grok / xAI / Llama-default routing + correct OUT.
4. Document the financial-pipeline constraint in any handoff doc / API-key memo / vendor-selection record.

**Pairs with:**

- `feedback_cross_architectural_verification_not_cross_vendor.md` (related methodology constraint — architecture diversity not vendor diversity is the verification justification)
- `feedback_overclaims_are_misrepresentation_not_polish.md` (standpoint discipline applied at the audit-categorization layer; this memo is the same discipline applied at the tool-selection layer)
- `user_standpoint_discipline_load_bearing.md` (if it exists; the broader standpoint-discipline framework this memo is one instance of)
