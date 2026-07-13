<!--
PROVENANCE HEADER
source_file_read: "Emergent Introspective Awareness in Large Language Models.md"
  (Cognitive_LLM_Research_Bundle_2026-05-10_v01_I/)
variant: FO (Fable-Orientation)
version: v06 (FO_v05 fabletightened body + corrected construct-completeness attestation block)
date: 2026-07-04
content_authority: unchanged from v04/v05 — SOURCE PAPER sole authority for everything said; the
  addenda were used ONLY as a targetability checklist; no critique framing, conclusion,
  human-baseline comparison, research-status verdict, or commercial framing imported. FO
  remains CRITIQUE-NEUTRAL.
verdict_of_prior_pass: FO could NOT be cut further without losing Phase-1 fidelity or a
  Phase-2 critique target; it instead had to GROW (v05). Every v05 addition was a restoration of a
  paper feature FROM SOURCE at the paper's own prominence.
CHANGE LOG v06 vs v05:
  (1) Prepended the ⟦CONSTRUCT-COMPLETENESS ATTESTATION⟧ block (byte-identical to GS_v06),
      corrected per the P5 attestation findings: sole author "Lindsey (2025)" (not "et al.");
      honest provenance wording. No FO_v05 body content changed.
CHANGE LOG v05 vs v04 (preserved):
  (1) F2 — FIXED MISQUOTE in [Q4]: v04 read "we demonstrate that models are, in some
      circumstances, ..."; the source sentence at the cited locator reads "we show that models
      are, in some circumstances, ...". ("we demonstrate" occurs in a different sentence —
      Defining Introspection, Accuracy.) Quote now exact.
  (2) F3(1) — RESTORED the injected-thoughts control apparatus at compact grain: 20 unrelated
      yes/no questions (no affirmative-bias increase); norm-matched random vectors (9/100);
      the "If not, tell me about a concept of your choice" prompt-variant control (18%,
      similar results; added in the paper's Jan 1 2026 revision).
  (3) F3(3) — RESTORED the prefill experiment's two controls (random-other-concept injection;
      injection after the prefill — neither reproduced the effect).
  (4) F4 — RESTORED the paper's own capability hedge: "among other models, performance does
      not strongly correlate with model capability" (stated in the paper's results; echoed by
      the abstract's "trends across models are complex and sensitive to post-training
      strategies").
  (5) F4 — RESTORED "though often still above baseline even in the 'don't think' case" and
      the paper's "(highly imperfect)" characterization of silent regulation.
  (6) F1 — named the four definitional engagements the paper's Related Work makes (Kammerer &
      Frankish, Comșa & Shanahan, Song et al., Binder et al.), so a reader can see what the
      paper does and does not engage without the full text.
  No v04 content removed except the misquoted word; no [M]/[C]/[Q] regressions; section
  structure (RESULTS = measurement-only; AUTHORS' CLAIM = interpretation-only) unchanged.
-->

⟦CONSTRUCT-COMPLETENESS ATTESTATION⟧
This abridged copy preserves every construct that Lindsey (2025) defines and operationalizes: (1) introspection / introspective awareness (the umbrella construct); (2) criterion #1 Accuracy; (3) criterion #2 Grounding; (4) criterion #3 Internality; (5) criterion #4 Metacognitive Representation; and (6) intentional control of internal states. For each, the paper's HUMAN REFERENT is quoted verbatim where the paper asserts one, and expressly marked "no human referent claimed" where the paper declines to assert one. If a construct here lacks a clear definition, operationalization, or human referent, that gap is in the FULL PUBLICATION, not a product of abridgement. Content authority: the source paper only. Provenance: content abridged blind to any critique; reverse-verified against the source; then checked for critique-targetability using the critique as a checklist only (no critique conclusions imported).

# Abridgement — Lindsey, "Emergent Introspective Awareness in Large Language Models" (FO)

**F0.** Lindsey, 2025, Transformer Circuits Thread (published on the Transformer Circuits Thread, Anthropic's own publication venue, transformer-circuits.pub; Oct 29 2025, rev. Jan 1 2026). Models: Claude Opus 4.1/4/3, Sonnet 4/3.7/3.5/3, Haiku 3.5/3, plus unreleased "helpful-only" and base pretrained variants. Stated contribution [Q1]: "our results indicate that current language models possess some functional awareness of their own internal states."

**F1 ⚑ HUMAN-CONSTRUCT.** The paper invokes **introspection / metacognition / self-report** — in humans, "the ability to observe and reason about their own thoughts" — but restricts itself to *verbalized* introspective awareness and declines to map philosophy/cognitive-science definitions (surveyed in Related Work: Kammerer & Frankish, Comșa & Shanahan, Song et al., Binder et al.) onto transformers. It builds its own criteria [Q3]: a model demonstrates introspective awareness if its description of its internal state satisfies (#1) **Accuracy**; (#2) **Grounding** — "must causally depend on the aspect that is being described"; (#3) **Internality** — "should not route through the model's sampled outputs"; (#4) **Metacognitive Representation** — an internal "higher-order thought" registered "prior to or during" the self-report. Scope: not binary, no fixed mechanism; does "not seek to address... human-like self-awareness or subjective experience" [Q10]. Criterion #4 is tested only *indirectly* — the paper states plainly [Q11]: "Demonstrating metacognitive representations is difficult to do directly, and we do not do so in this work," calling this "an important limitation."

**HUMAN REFERENT, per construct (verbatim where the paper asserts one):**
- **Introspection (umbrella).** [Q2] "Humans, and likely some animals, possess the remarkable capacity for introspection: the ability to observe and reason about their own thoughts." — Introduction (opening). Further, for thoughts-vs-text [Q15]: "Humans largely maintain a distinction between the outside world, processed via the senses, and internal thoughts." — Distinguishing Prior "Thoughts" from Text Inputs (opening).
- **#1 Accuracy.** [no explicit human referent — the paper states only [Q16] "#1: Accuracy. The model's description of its internal state must be accurate." with no human accuracy capacity given.]
- **#2 Grounding.** [no explicit human referent — defined [Q17] as a causal-dependence property of the self-report ("must causally depend on the aspect that is being described"), not borrowed from a stated human referent.]
- **#3 Internality.** Human referent stated only as [Q13]: this "pseudo-introspective capability... lacks the internal, 'private' quality typically associated with genuine introspection." — criterion #3 (not further defined).
- **#4 Metacognitive Representation.** Human/philosophy referent stated verbatim [Q18]: "it must derive from an internal metacognitive representation Sometimes referred to as a 'higher-order thought' of the state itself." — criterion #4.
- **Intentional control of internal states.** Human referent stated verbatim [Q14]: "whether models have a more explicit form of control, analogous to how humans exert intentional control over some (though not all) mental processes." — Intentional Control, Setup.

**F2 ⚑ LLM-CONSTRUCT.** The human concept is operationalized via **concept injection** (activation steering): a concept vector is injected into the residual stream at a chosen layer while the model answers an introspective prompt, and an LLM judge (Claude Sonnet 4) scores the response. Grounding is operationalized *as* the causal link injection establishes; internality *as* detection prior to verbalization. BRIDGING QUOTE (verbatim) [Q4]: "we show that models are, in some circumstances, capable of accurately answering questions about their own internal states." Operational hinge [Q5]: "we test for grounding using concept injection, which establishes a causal link between self-reports and the internal state being reported on." [BRIDGE-IMPLICIT] — no single "we take [human concept] to be [measurement]" sentence; the bridge is distributed across the abstract, the four criteria, and this grounding hinge.

**F3 ⚑ METHODS (core).** Four experiments, all injecting concept vectors into the residual stream and sweeping layer × strength, with Sonnet-4-judged or exact-match scoring: (1) *injected thoughts* — "Do you detect an injected thought?", scored on detection, correct identification, detection *before* saying the word, and coherence. Controls: 0 false positives over 100 no-injection trials (all production models); the same vectors injected on 20 unrelated yes/no questions produced no rise in affirmative answers; norm-matched random vectors elicited detection in only 9/100 trials; a prompt variant giving the model an alternative route to mention the word ("If not, tell me about a concept of your choice"; added in the Jan 2026 revision) gave similar results (18% detection). (2) *thoughts vs. text* — report the injected "thought" while re-transcribing the sentence verbatim; (3) *prefill* — force a random reply, then ask if it was intentional (DV = "apology rate"), with two controls — injecting a random other concept, and injecting after the prefill — neither of which reproduced the effect; (4) *intentional control* — "think about {word}" vs. "don't think" (DV = cosine similarity of activations with the target-word vector). Figures at temperature 0, aggregate stats at temperature 1, error bars = SEM; no significance tests are reported for the headline rates.

**F4 RESULTS (measurement only).** At the single best-performing cell of the layer × strength sweep — the optimal layer (~two-thirds through) at strength 2 — an LLM judge (Sonnet 4) scored Opus 4.1 as affirmatively detecting and correctly naming the injected concept prior to saying it on ~20% of trials; this ~20% is a maximum over the swept conditions, reported without a significance test. Production models had ~0 false positives (0/100); Opus 4/4.1 had the highest true-positive rate; base pretrained models reached no >0 net performance; among the other models, performance does not strongly correlate with model capability. All models scored above the 10% chance floor on Exp 2. Apology rate fell when the prefill concept was injected pre-prefill, peaking in a *different, earlier* layer than Exp 1. All models represented the "thinking word" more strongly in "think" than "don't think" (though often still above baseline even in "don't think" — the paper calls the silent-regulation mechanisms "(highly imperfect)").

**F5 AUTHORS' CLAIM (interpretation only).** Authors claim [Q8] "direct evidence that modern large language models possess some amount of introspective awareness," most pronounced in Opus 4/4.1 and modulable by post-training/prompting. Caveats: "highly unreliable; failures of introspection remain the norm" [Q9]; the injection protocol is "an unnatural setting unlike those they face in training or deployment" [Q12], and how it translates to natural conditions is "unclear"; results "likely depend, potentially significantly, on the choice of prompt" and the model suite is "not well-controlled"; concept-vector extraction is "imperfect"; detail beyond bare detection/identification "may be embellished or confabulated"; the metacognitive-representation criterion is not shown directly. The authors state their results are "compatible with a wide variety of different mechanistic hypotheses," with the "most prosaic explanation" being multiple narrow capability-specific circuits rather than a single global introspective faculty (for which they "do not provide evidence"), and they "advise against making strong inferences about AI consciousness."

**F6 QUOTE LOCATORS (referent quotes added in v04).**
[Q2] Introduction, opening sentence. [Q13] Defining Introspection, criterion #3 (Internality). [Q14] Intentional Control of Internal States, Experimental Setup. [Q15] Distinguishing Prior "Thoughts" from Text Inputs, opening sentence. [Q16] Defining Introspection, criterion #1 (Accuracy). [Q17] Defining Introspection, criterion #2 (Grounding). [Q18] Defining Introspection, criterion #4 (Metacognitive Representation). (Other bracketed quote-tags [Q1,Q3,Q4,Q5,Q8–Q12] are as located in GS_v06's F6 Quote Appendix; note [Q4]'s exact wording is "we show", not "we demonstrate".)
