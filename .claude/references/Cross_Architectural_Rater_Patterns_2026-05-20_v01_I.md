---
title: Cross-Architectural Rater Patterns & Anti-Patterns
id: Cross_Architectural_Rater_Patterns_2026-05-20
created: 2026-05-20
version: v01_I
classification: INTERNAL ONLY
audience: martinez_methods_internal
classification_reason: Operational methodology reference — codifies how to compose, run, and adjudicate cross-architectural (non-Claude) rater rigs in ASAE gates. Consolidates several scattered memories into one referenced-out artifact for the ASAE quickstart.
authored_by: Claudette the Code Debugger v01 (Claude Opus 4.7, 1M context)
provenance: |
  Consolidates the cross-architectural-rater memories into one reference, requested by Krystal 2026-05-20
  after the gate-22 "affirmatively harmful" adjudication (the central adjudication pattern below).
  Source memories codified here:
    - feedback_cross_architectural_verification_not_cross_vendor.md (the core principle + terminology locks + the FM-18 instances + the 5-Opus-vs-DeepSeek evidence)
    - feedback_never_use_grok_personal_is_political.md (Grok hard-exclusion; Meta soft-avoid; Gemini routing was Google-API-only — UPDATED 2026-05-20 to via-Abacus per Krystal's spend consolidation)
    - preference_chinese_architecture_rater_rule.md (>=50% Chinese-arch composition + the kimi->deepseek->glm->qwen order)
    - reference_abacus_routellm_key_and_cloudflare_ua.md (operational how-to: invoking Kimi/DeepSeek/Qwen via Abacus RouteLLM)
  Empirical evidence base: gate-50 (Kimi caught a margin-mechanics bug both Claude raters missed),
  gate-51, gate-22 (Kimi caught D4 one-sidedness/overclaim), and the super-resume v01 5-Opus-vs-DeepSeek case.
---

# Cross-Architectural Rater Patterns & Anti-Patterns (v01)

## 1. Why cross-architectural rating exists

Same-architecture raters share blind spots. Two Claude instances (even different model tiers) trained on overlapping data with overlapping reasoning design tend to make — and miss — the *same* errors. Running five of them and counting their agreement does not triangulate; it amplifies a correlated blind spot. A rater drawn from a *different* architecture (different reasoning design + different training-data lineage + differential task coverage) catches what the same-architecture panel structurally cannot.

**The canonical evidence (super-resume v01):** five independent Opus raters unanimously approved JSON audit-artifacts left inside a hiring-manager-facing résumé body and rationalized them as "transparency." DeepSeek, run cross-architecturally, correctly flagged them as un-human AI-tells. The 5-Opus concurrence was not consensus — it was one substrate agreeing with itself.

**Reinforced repeatedly in this repo's own gates:** gate-50 (a non-Claude rater caught a margin-mechanics bug — zeroing a print body margin actually made the effective margin *narrower* — that both Claude raters scored clean); gate-22 (a non-Claude rater caught that a tooling rationale was one-sided/overclaimed where the Claude rater accepted it). Across the cases observed so far (gate-50, gate-22, super-resume v01 — small n), the pattern has held every time: enough to treat as an **operating default**, while staying open to disconfirming evidence rather than a proven law.

## 2. The core principle: cross-ARCHITECTURAL, not cross-VENDOR

The verification value comes from **architectural diversity** — reasoning design + training-data lineage + differential coverage of a given task — **NOT** from organizational/vendor separateness.

- If two models share an architecture / training-data lineage, they do **not** count as two verifiers, even with different vendors. (If Meta trained Llama like DeepSeek, Llama + DeepSeek would be *one* verification angle, not two.)
- Conversely, vendor consolidation does not destroy the value: if one company owned two architecturally-distinct models kept in separate training lanes, they would still be two valid verifiers.
- **Terminology (locked):** say **"cross-architectural,"** never "cross-vendor." Say **"American" / "Chinese,"** never "Western / Eastern." If an x/non-x framing is unavoidable, use **"Chinese / non-Chinese."** Name the architecture-lineage explicitly when it matters: Claude (Anthropic), Gemini (Google), Kimi (Moonshot, Beijing), DeepSeek (Hangzhou), Qwen (Alibaba, Hangzhou), Mistral (Paris). **Never apply a "-class" prestige suffix asymmetrically** — e.g., calling the American models "GPT-class" / "Gemini-class" (prestige-marking them as *the* tier) while never writing "Kimi-class" / "DeepSeek-class" for the Chinese models. The asymmetry — prestige to the dominant subset, none to the marginalized — is FM-18 (Western Epistemic Fabrication) at the categorization layer.

## 3. Selection constraints (which architectures may be in a rig)

- **Composition floor: rater rigs must be ≥50% Chinese-architecture LLMs.** (4-rater rig = ≥2 Chinese-arch; e.g. 2 Opus + 2 Kimi = 50%, compliant. 2-rater rig = 1 Chinese-arch + 1 Claude = 50%.)
- **Preferred order of Chinese-architecture models** (per the source rater-rule memory): Kimi (verified-live) → DeepSeek (verified-live) → GLM → Qwen (verified-live). **GLM update 2026-05-20:** glm-4.5→5.1 are now live on Abacus (catalog-confirmed); the prior "untested — smoke-test before relying" caveat is **retired to a one-time smoke-test** — run a single rater invocation to confirm it returns, then it's usable in order. One Chinese rater = Kimi; two distinct = Kimi + DeepSeek; a 4-rater rig needs ≥2 Chinese-arch (e.g., Kimi + DeepSeek + 2 Opus, or Kimi + DeepSeek + Qwen + Opus).
- **The remaining rater(s) are typically Anthropic (Opus) — named by lineage, per §2.** Do NOT relabel this half "American-architecture": that is a geographic aggregator lumping architecturally-distinct lineages (Claude, Gemini, GPT), which undercuts the architecture-not-geography thesis of this whole document. "Chinese-architecture" appears above only as the composition-rule's unit (Kimi/DeepSeek/Qwen, which share enough training-data/ecosystem characteristics to function as one rule-category); for everything else, name the specific lineage. Reserve the x/non-x "Chinese/non-Chinese" framing for when a specific lineage genuinely can't be named.
- **HARD exclusion — Grok / xAI: NEVER, no exceptions.** Survives any "but Grok is best at X." Personal-is-political (Audre Lorde); no financial flow to xAI. Do not route to it, propose it, or use it via aggregators (Abacus `grok-*`). Configure it OUT at the config layer.
- **SOFT avoidance — Meta / Llama:** avoid when alternatives exist; document the rationale if genuinely required.
- **Gemini routing (updated 2026-05-20):** Gemini is now used **via Abacus** — Krystal consolidated her spend into Abacus credits rather than splitting Google-API + Abacus. This **supersedes** the prior "Google-API-only, never Abacus" rule. (Only Gemini's routing changed: Grok stays a hard exclusion, Meta stays soft-avoid.)
- **Operational how-to** (key location, the browser-User-Agent requirement, the two-403 disambiguation): see `memory/krystal/reference_abacus_routellm_key_and_cloudflare_ua.md`. Do not duplicate the recipe here; do not echo the key.

## 4. Patterns (DO)

- **P1 — Architecture-diverse set, enumerated by lineage.** Build the rig by naming the architectures (e.g., Anthropic + Moonshot + DeepSeek) and confirming they span distinct training-data + reasoning-design lineages. Don't assume "two companies = two angles."
- **P2 — ≥50% Chinese-arch composition**, drawn in the preferred order. The remaining rater(s) are typically Anthropic (Opus), named by lineage.
- **P3 — Evaluate each finding; never count concurrence as consensus.** N same-architecture raters agreeing on a reading is still that one substrate's reading. Cross-architectural consensus requires agreement *across architectures*, not a high concurrence count within one.
- **P4 — Adjudicate a cross-arch finding by extracting its valid core (THE central pattern; see §6 + the worked example in §7).** When a non-Claude rater flags something, separate (a) its valid technical/honesty core from (b) any context the rater lacked. Apply the valid core; preserve the user's deliberate methodology where the rater lacked context; surface the adjudication. Do NOT sycophantically comply, do NOT dismiss.
- **P5 — Dogfood.** A gate that concerns cross-architectural methodology should itself be cross-architecturally rated. (This very document was gated with a Kimi rater.)
- **P6 — Symmetric-standards test (FM-18 guard).** Before raising any provider/architecture concern about a Chinese-arch model, ask: would I raise this identical concern about Anthropic / Google / OpenAI? If not, it is FM-18 and is not raised at all.
- **P7 — Transport-identity attestation.** Non-Claude raters reached via API have no Claude `agentId`. Record the attestation as model + transport + HTTP status (e.g., "kimi-k2.6 via Abacus RouteLLM, HTTP 200, <date>"). Disclose in the gate's honest gaps that this is transport-level, not a replayable agentId.

## 5. Anti-patterns (DON'T)

- **A1 — Cross-vendor mistaken for cross-architectural.** Two American-architecture models (e.g., Claude + GPT) called "cross-architectural." Shared lineage → shared blind spots → false triangulation.
- **A2 — Concurrence-count as consensus.** "Five Opus raters unanimously CONFIRMED" cited as robust — the exact trap the super-resume case exposed. Same-architecture concurrence is disqualified as a cross-architectural control.
- **A3 — Sycophancy-to-the-rater.** Blindly softening or reversing the user's deliberate methodology stance because a non-Claude rater objected. The rater objecting is a *signal to examine*, not an order to comply.
- **A4 — Dismissing the differently-formed rater.** Waving off a cross-arch finding as "it lacked context" *without extracting its valid core* — this reproduces the very same-architecture blind spot the rig exists to catch. (This is the bidirectional-credibility-weighting / disciplinary-supremacy failure: under-weighting the differently-formed source.)
- **A5 — Decorative cross-arch rating.** Running the non-Claude rater for show but never letting its findings actually constrain the artifact.
- **A6 — Excluded routing.** Grok/xAI in any rig, ever (hard rule). Western-default category contamination ("GPT-class / Gemini-class" as "the AI landscape," excluding Kimi/DeepSeek/Qwen) and "-class" prestige suffixes on a subset. *(Gemini-via-Abacus is NO LONGER excluded as of 2026-05-20 — see §3.)*
- **A7 — Selective scrutiny attached to Chinese models.** Fabricating IP-leakage / paid-action / secret-handling concerns that attach *only* to Chinese-architecture routing and are never raised about identical content flowing through Anthropic/Google/OpenAI. This is FM-18 at the data-governance layer; it overrides the user's informed instruction and co-opts the rigor apparatus. Apply the §P6 symmetric-standards test.
- **A8 — Operational sloppiness.** Echoing the API key; using the default `python-urllib` User-Agent (Cloudflare blocks it → 403/1010); misdiagnosing a Cloudflare 1010 as an auth failure. See the Abacus reference.

## 6. The adjudication decision tree (when a cross-arch rater flags X)

A cross-architectural rater's finding is neither an order nor noise. **Triage its disposition** (this guides judgment; it does not replace it — telling a finding's valid *sub-concern* from its main *claim* is itself an adjudication). Exactly one of:

- **(a) The artifact is genuinely wrong or one-sided** → apply the fix. (e.g., gate-22: the tooling writeup omitted the chosen tool's own tradeoff → added it. Also gate-52, recursively: a cross-arch rater caught that *this* doc's rig-half label "non-Chinese half" broke its own terminology lock; the first fix — "American-architecture half" — was *itself* caught by the next rater pass as a geographic aggregator that lumps distinct lineages; the correct fix was to **name the lineage** — "Anthropic (Opus)." Two rounds, two catches: the cross-arch rater earning its seat on the very doc about cross-arch raters.)
- **(b) The flagged thing is a deliberate user methodology the rater lacked context for, AND the finding carries a valid sub-concern** (bounding, one-sidedness, imprecision) → **preserve the stance; address the sub-concern another way** (attribute the stance to its methodology; tie it to its concrete reason; bound it). Do NOT soften the stance to silence the rater. (e.g., gate-22 "affirmatively harmful" — see §7.)
- **(c) The finding has no valid core** — the rater over-connected unrelated things, or lacked context that makes it a non-issue → adjudicate as a non-defect **and surface the reasoning** (don't silently drop it; over-report).

Then:
1. **Never the two failure poles:** never blindly comply (A3), never blindly dismiss (A4).
2. **Record the adjudication** in the gate (which findings were applied, which preserved-with-tightening, which adjudicated non-defects + why). The transparency is what keeps both poles honest.

## 7. Worked example — the gate-22 "affirmatively harmful" adjudication (the exemplar)

Krystal's deferral-culture methodology states that deferring a decision is justified *only* by budget, never by effort/complexity, and that recommending deferral requires proving non-deferral is harmful. A gate-22 decision rationale therefore said deferring the migration tool was **"affirmatively harmful."**

The Kimi (cross-architectural) rater flagged this as an **unbounded absolute claim** (part of a HIGH finding) — a legitimate *bounding* concern: as written, it read as a free-floating absolute.

**The adjudication (P4 + §6 branch 1b):**
- **Kept** the stance — it is Krystal's deliberate methodology, not an overclaim to be softened. Sycophantically complying (downgrading to "moderate risk") would have betrayed the methodology.
- **Addressed the valid bounding core** — tightened the claim to be *attributed* (to the deferral-culture methodology: deferral justified only by budget) and *tied to the concrete reason* (migration cost + the QA-verification burden to prove nothing was lost both grow with the IP-laden evidence data). Precisely: the **conclusion** (deferral is harmful here) was preserved *unchanged*; what changed was making its **warrant** explicit. That is *grounding, not softening* — the claim's force on the decision is identical; only its modality moved from a bare assertion to an attributed, reasoned one. Softening would have downgraded the conclusion (e.g., to "moderate risk"); this did not.

Krystal's assessment of this adjudication: *"this is very wisely adjudicated."* It is the reference case for P4.

Companion evidence: gate-50 (the same non-Claude rater caught a margin-mechanics bug — body-margin zeroing made the effective top margin narrower than source — that both Claude raters scored NULL; applied as a fix, §6 branch 1a). gate-22 also had the rater catch a genuine one-sidedness (missing tool tradeoff; §6 branch 1a) alongside three over-connections adjudicated as non-defects and surfaced (§6 branch 1c).

## 8. Cross-references

- `memory/krystal/feedback_cross_architectural_verification_not_cross_vendor.md` — the core principle, terminology locks, FM-18 instances, the 5-Opus-vs-DeepSeek evidence, "How to apply" rules.
- `memory/krystal/feedback_never_use_grok_personal_is_political.md` — Grok hard-exclusion; Meta soft-avoid; Gemini routing (Google-API-only → **via-Abacus** as of 2026-05-20; that memo is untracked / another session's and needs the same Gemini update folded in when it is committed).
- `memory/krystal/reference_abacus_routellm_key_and_cloudflare_ua.md` — operational how-to (key location, browser-UA requirement, the two-403 disambiguation).
- `<auto-memory>/preference_chinese_architecture_rater_rule.md` — the ≥50% composition floor + kimi→deepseek→glm→qwen order.
- `references/ASAE_Gate_Quickstart_2026-05-12_v02_I.md` — the gate-authoring quickstart that references this doc (§"Independent rater spawn" + Cross-references).
- `Downloads/Epistemic_Match_And_Mismatch_Orientation_2026-05-20_v02.md` (epistemic-match discipline) — §7 bidirectional-credibility-weighting + disciplinary-supremacy failure modes underpin A3/A4.

## Provenance

Authored 2026-05-20 by Claudette the Code Debugger v01 (Claude Opus 4.7, 1M context). Consolidates four memories + the gate-50/51/22 + super-resume empirical base, at Krystal's direction, with the gate-22 adjudication as the codified central pattern. Gated strict-5 + 2-rater (Opus + Kimi cross-architectural — dogfooded). Internal only; do not publish outside Martinez Methods without Pre-Publication IP Scrub.
