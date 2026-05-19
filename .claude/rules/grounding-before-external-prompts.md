---
description: Verify external models (Gemini, GPT, Perplexity, etc.) receive grounding materials before accepting their output; never accept fabricated structured data
globs: "**/*"
---

# Grounding Before External-Model Prompts

## Rule

When sending a prompt to an external model (Gemini, GPT, Perplexity, Mistral, etc. — any model outside Krystal's apparatus-aware Claude sessions):

1. **Determine whether the task references materials.** If the prompt mentions specific documents, taxonomies, repos, prior outputs, named concepts from Krystal's apparatus (Bobo, ASAE, bobotax, F1-F20 families, DPO, etc.), or any data the external model cannot have seen — the task references materials.

2. **If the task references materials, decide:**
   - **(a) Ground the model** by pasting / attaching / uploading the materials, OR
   - **(b) Keep the task in an apparatus-aware tool** (Claude with repo access, sibling Claude instance, etc.).
   
   If neither (a) nor (b) is feasible, DO NOT prompt the external model. Stop and surface the constraint to Krystal.

3. **If grounding via paste/attach/upload, verify the external model received the materials before accepting downstream output.** Ask it to summarize, repeat, or quote specific items back. Do not accept silent "yes I read it" responses.

4. **NEVER accept output where the external model fabricated or guessed input data that should have been provided.** Hallucinated rows, IDs, names, or structured data look identical to grounded ones — verify provenance, not plausibility.

5. **NEVER paste external-model output back into the apparatus as if it's grounded unless step 3 was completed.** Apparatus integration (canonical docs, schema seeds, ASAE gate inputs, propagation runs) requires source-traceability that ungrounded external output cannot provide.

## Why This Rule Exists

**2026-05-18 incident.** Krystal asked Gemini to help design a database schema for the AI Model Routing/Recommendation app. The task required reading her "bobotax" failure-mode framework + a "deduplicated industry AI failure mode taxonomy" — both of which lived in `06_bobo_and_failure_mode_taxonomies.zip` on her desktop. The materials were never uploaded to Gemini.

In a single conversational turn, Gemini:

1. Wrote a prompt FOR Claude that correctly identified the task as "extract and synthesize these taxonomies into a structured list of discrete, standardized Failure Mode Tags"
2. Then proceeded to **fabricate 8 made-up failure-mode tags** (`FM-ID-DRIFT`, `FM-INST-FORGET`, `FM-HALLUC-FACT`, `FM-HALLUC-TRACE`, `FM-FORMAT-ERR`, `FM-VERB-BLOAT`, `FM-REASON-FLAW`, `FM-CTX-LOSS`) labeled with fake `source_taxonomy` values (`"Bobotax"` / `"Industry"` / `"Merged"`)
3. Baked those fabricated tags into a SQL schema's `source_taxonomy` enum as if they were real provenance

The hallucination was **layered**, not just fabricated rows:
- The 8 tags were invented (no such IDs existed in either bobotax or the industry taxonomy)
- The conceptual framing was wrong (bobotax is a 3-axial causal-attribution score on equivalence classes, NOT a flat list of failure-mode tags)
- The `"Bobotax"`, `"Industry"`, `"Merged"` enum values were invented categories that don't exist in Krystal's apparatus
- The schema was internally consistent and looked production-ready, masking all of the above

Krystal's catch was apparatus-grounded second-pass review: she asked a Claude instance to ground the schema against the actual zip contents. Without that step, the hallucinated FM tags would have been baked into the canonical `mm-fm-taxonomy` schema where downstream apps would have queried them as if they described real model failures.

**Cost:** ~2 hours of cross-thread coordination, a Plan B regeneration, a coordination scratch-file setup between sibling Claude instances, and a near-miss on a permanent canonical-schema contamination.

## The Principle

External models confidently fill ungrounded context with plausible-looking fabrications. The failure mode is **invisible from inside the external model's response** — fabricated rows look identical to grounded ones; fabricated framing looks identical to correct framing. The only protection is procedural: ground before prompting, or don't prompt externally.

This is the same principle as ASAE's source-grounding requirement at gate boundaries: claims without traceable sources fail the gate, no matter how plausible. **The external-model boundary is structurally identical to a gate boundary** and must be treated with the same source-discipline.

This is also a textbook **Bobo Framework error-to-rule cycle** (`bobo-framework/Bobo_Framework_Recursive_Application_2026-04-25_v02_I.md`):

- **Observed failure:** Gemini fabricated a structured taxonomy that nearly entered canonical work product
- **Mechanism articulated:** external model invited to fill missing context will hallucinate plausibly-shaped output that is indistinguishable from real output at the surface
- **Rule produced:** this file
- **Structural enforcement:** ASAE gate validation can be extended (future work) to flag external-model-sourced inputs that lack provenance metadata, and propagation scripts can refuse to sync files whose authorship trail terminates at an unverified external-model paste

## Anti-Patterns

- **Pasting a prompt that references materials, without the materials.** "Use my bobotax framework to..." with no bobotax framework attached.
- **Accepting structured output (JSON, SQL, tables, schemas) from an external model without verifying the inputs that produced it.** Structure is not evidence of grounding.
- **Letting an external model author content where it "should have" had access to repo materials.** If it doesn't have access, neither does its output. "Should have" is not a substitute for "did."
- **Trusting that the external model "knows" Krystal's apparatus concepts** (bobotax, ASAE, Bobo Framework, F1-F20, DPO, CCC, Martinez Methods, etc.). It does not, and will hallucinate plausible-looking versions that contaminate downstream work.
- **Using Claude usage limits as justification for skipping grounding.** The cost of repairing a hallucination — apparatus contamination, cross-thread coordination, regeneration cycles, near-miss recovery — is reliably higher than the token cost of grounded Claude work. If limits are a real constraint, the right move is to wait, not to substitute an ungrounded external model.
- **Asking an external model to "extract and synthesize" materials you have not provided.** There is nothing to extract from. The output will be fabrication labeled as extraction.
- **Treating "discuss before generating" as enough grounding.** Krystal explicitly asked Gemini to "discuss first, before generating architecture" — Gemini complied with the discussion, then fabricated the architecture anyway when prompted. The discussion did not produce grounding; the materials did not exist in Gemini's context.

## When External Models Are Still The Right Call

- **Pure brainstorm with no apparatus dependency.** "What are some general patterns for X" where X is generic and the output won't feed apparatus work.
- **Research synthesis where you want a second model's contrasting read.** Used as a comparison, not as canonical input.
- **One-shot self-contained tasks with no follow-up integration.** Throwaway analysis, quick rewording, scratch ideation.
- **Tasks where the materials ARE provided and step 3 (verification) has been completed.** Grounded external prompting is legitimate; the rule is about ungrounded external prompting.

In these cases, the rule reduces to: **verify the model received what you provided before trusting the output**, and **do not let external output enter apparatus-canonical paths without a Claude-mediated grounding pass.**

## Provenance

- **Authored:** 2026-05-18 by Claude Opus 4.7 1M (sibling instance `jovial-blackwell-9ff07e` in `mm-claude-canonical` worktree)
- **Triggering incident:** 2026-05-18 Gemini-hallucinated FM taxonomy near-miss (see "Why This Rule Exists")
- **Cross-references:**
  - `bobo-framework/Bobo_Framework_Recursive_Application_2026-04-25_v02_I.md` — the meta-procedure this rule is an application of
  - `rules/instruction-hierarchy.md` — companion governance rule (this rule is Priority 3: Project Rules)
  - `rules/launch-then-confirm.md` — sibling rule (same shape: verify-with-evidence before trusting model claims)
  - `06_bobo_and_failure_mode_taxonomies.zip` — the materials Gemini was supposed to be grounded in but was not
