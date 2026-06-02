---
title: Independent Verification Brief — Best Practices & Cross-Architecture Adjudication Protocol
id: Independent_Verification_Brief_Best_Practices_2026-05-18
created: 2026-05-18
version: v01_I
classification: INTERNAL ONLY
audience: martinez_methods_internal
authored_by: Claudenza W. Ceiling Witness v01 (Claude Opus 4.7, 1M context, worktree funny-banzai-f048ca)
provenance: Authored at Krystal's explicit direction 2026-05-18, triggered by two empirical failures — (a) gate-34 Rater-2 NOT-CONFIRMED caused by a brief that tested a literal grep pattern the correct artifact did not match (the brief tested itself, not the work); (b) the 2026-05-18 "Qwen evidence-strike" incident: a non-Claude rater asserted Krystal's credentialed achievements "must be inflated" from an aggregate-GPA prior and a Claude was about to delete true evidence until deterministic recomputation showed she had UNDER-reported (CSER 3.92 reported as 3.9; Neuro 3.86 reported as 3.75).
sources:
  - deprecated/asae-logs/gate-34-krystal-draft-skill-phase4-fix-2026-05-18.md (the flawed-brief incident)
  - references/ASAE_Gate_Quickstart_2026-05-12_v02_I.md (rater-spawn baseline this refines)
  - .asae-policy (strict-5 + 2-rater canonical threshold)
  - In-session law from Krystal 2026-05-18: "BE SURE THAT YOU ARE ADJUDICATING RATER FINDINGS JUST AS YOU WOULD THE INPUT FROM A SIB CLAUDE … their word is input if it's not deterministic. adjudicate accordingly."
related: KB-18 (Zambia: same-substrate convergence anti-informative), KB-19 (experiments for selection, burden on exclusion), KB-20 (unanimous agreement is a red flag), HC-9 (slow orchestration), HC-12 (Chinese/American architecture = the instrument, no capability prior), HC-13 (no paid API outside subscription)
---

# Independent Verification Brief — Best Practices & Cross-Architecture Adjudication Protocol

## 0. The two failures this exists to prevent

**Failure A — the brief tests itself, not the work.** gate-34's Rater-2 brief said "verify `grep \"Public-pairing\"` returns ≥3 hits." The correct fix encoded the principle at three sites but only two used that literal token. Rater-2 honestly returned NOT-CONFIRMED and *itself* flagged "this may be a check-specification mismatch, not a substantive defect." A brief that prescribes a surface pattern the correct artifact need not match measures the brief author's guess, not the artifact's truth.

**Failure B — rater finding executed as authority (the evidence-strike).** A non-Claude rater asserted Krystal's major GPAs "must be inflated if her overall was 3.16" and recommended deletion; a Claude was *about to comply*. Deterministic recomputation from the Columbia transcript showed CSER = 3.92 and Neuro = 3.86 — she had **under-reported** (3.9, 3.75). The rater's plausibility prior was not just wrong, it was inverted, and deference would have destroyed true evidence. Context that makes this load-bearing, not hypothetical: much of Krystal's pre-cloud-era achievement has limited digital corroboration by circumstance, not by falsity. **Absence of digital corroboration is not evidence of inflation.**

## 1. The supreme law: raters are INPUT; the parent adjudicates

A rater verdict — any architecture, Opus or Kimi or otherwise — is **input to be adjudicated exactly as input from a sib Claude is adjudicated**: steelmanned, then checked against deterministic ground truth. It is never a verdict to execute. The gate PASS is the *parent's adjudicated judgment*, not a vote tally and not a rater's say-so.

Corollary (anti-evidence-strike, non-negotiable):

> **No finding of the form "remove / weaken X because it seems implausible / inflated / too high / unlikely" is ever actionable as stated.** It converts to: "deterministically verify X." If a deterministic test exists (recompute from a primary source, resolve a path, diff bytes, run the code), run it and act on the result. If no deterministic test exists, **the claimant's evidence STANDS** and the rater's concern is logged as an unverifiable hypothesis — not acted on. The burden is on the exclusion claim (KB-19), never on the claimant to satisfy a rater's prior.

## 2. Finding classes (classify every finding before acting)

| Class | Examples | Parent action |
|---|---|---|
| **Deterministic** | path doesn't resolve; file/field missing; math recomputable from a primary source; byte-diff mismatch; schema/hook rule violated; code fails a test | **Binding.** Verify independently, then act on the verified result. |
| **Non-deterministic** | "implausible", "inflated", "feels off", "too strong", "low quality", "probably wrong", tone/quality judgment | **Input only.** Steelman → seek a deterministic test → if found, run it → if none, evidence stands; log the concern + the adjudication reasoning. Never auto-execute. |

If a rater returns NOT-CONFIRMED, classify *why*. NOT-CONFIRMED on a deterministic ground = fix the work, re-run. NOT-CONFIRMED on a non-deterministic ground the parent adjudicates as unfounded (or as an artifact of a flawed brief, per Failure A) = document the adjudication, correct the brief/artifact as warranted, re-run with a corrected brief. Overriding a rater is legitimate **only** with recorded deterministic reasoning — never silently.

## 3. Writing the brief (derive checks from the artifact's truth, not a guessed surface)

1. **Self-contained.** No shared context. State the artifact's purpose, the exact claims to verify, and the ground-truth sources to verify *against* (not against the rater's priors).
2. **Check the requirement, not a proxy for it.** If the requirement is "principle P is encoded at sites A/B/C," ask the rater to read each site and judge whether it conveys P — do **not** prescribe a literal string/grep count unless the literal string is *itself* the requirement. Any mechanical check you prescribe MUST be one you have run against the correct artifact and seen pass; otherwise you are testing your brief.
3. **Point at ground truth.** "Recompute from `<primary source>`." "Resolve every path." "Diff the verbatim block byte-for-byte against `<source>`." Determinism where determinism exists.
4. **Constrain judgment findings to hypotheses + their resolving test.** Instruct verbatim: *"If you believe a claim is implausible, do NOT recommend removal or weakening. State the specific deterministic test that would confirm or refute it. Absent a deterministic refutation, treat the claim as standing. Unavailability of corroboration is not refutation."*
5. **Output contract.** Bounded length; per-item PASS/FAIL with one-line evidence; explicit `Rater verdict: CONFIRMED | NOT CONFIRMED`; capture the agentId (subagent) or the model id + request id (API rater). agentIds/request-ids are load-bearing anti-fabrication anchors.

## 4. Cross-architecture responsive rating rig (Opus ×2 + Kimi 2.6 ×2)

Per HC-12, Chinese and American architectures are the **instrument** — distinct epistemic bases, no capability prior in either direction. Per Krystal 2026-05-18: run them so each architecture can be *responsive to the other's findings*.

**Roster:** Rater A1, A2 = Opus, parent-spawned subagents (Mod 13 Rule A: subagents never spawn raters; parent only). Rater C1, C2 = Kimi 2.6 (`kimi-k2.6`) via Abacus RouteLLM (`https://routellm.abacus.ai/v1/chat/completions`, OpenAI-compatible).

**Sequence — ABAB responsive (default):**
1. A1 (Opus) rates → findings recorded.
2. C1 (Kimi) rates, brief includes A1's findings: "here is a prior independent rater's findings; verify the artifact yourself first, then state where you concur/diverge and why."
3. A2 (Opus) rates, brief includes A1 + C1 findings (same responsive instruction).
4. C2 (Kimi) rates, brief includes A1 + C1 + A2.
Parallel-pair variant (A1+C1 together blind, then A2+C2 with both prior sets) is acceptable when latency matters; responsiveness is the requirement, not the exact interleave.

**Adjudication:** the parent adjudicates all four as input per §1–§2. Cross-architecture *convergence* is corroborative (distinct substrates, not the Zambia same-substrate trap) **but is still checked against ground truth** — unanimous agreement is itself a prompt for one external deterministic check (KB-20), not a pass. *Divergence* is high-signal: preserved as data in the gate, adjudicated, never smoothed. A Kimi finding and an Opus finding get *identical* adjudication discipline — neither architecture's verdict is privileged.

**Operational constraints (hard):**
- **HC-9 slow orchestration:** API rater calls serialized, inter-call sleep + jitter, well under rate limits, resumable. No burst. No "fast path."
- **HC-13 subscription-only:** Kimi is reached via Abacus RouteLLM *within Krystal's ChatLLM/Teams subscription* (credit-metered). Never a paid standalone API. The Claude/Opus layer is the flat Claude Code subscription.
- **Key handling / canonical path:** the Abacus key lives at a fixed, out-of-every-git-repo path so it is structurally uncommittable and discoverable by any Claude in any repo: **`C:\Users\NerdyKrystal\.secrets\abacus_api_key`** (Git Bash: `/c/Users/NerdyKrystal/.secrets/abacus_api_key`). The Claude Code Bash sandbox does NOT inherit the interactive shell env, so env vars are unreliable — the file path is the contract. Read by indirection at call time (`KEY="$(tr -d ' \t\r\n' < /c/Users/NerdyKrystal/.secrets/abacus_api_key)"`), passed only as a curl `-H "Authorization: Bearer $KEY"`; never printed to chat, never `echo`'d, never under `set -x`, never committed. Presence-check (exists/readable) is allowed; contents-print is forbidden.
- **Credit-true costing (HC-11):** Kimi 2.6 ≈ $0.95/M in, $4.00/M out via the list; rating briefs are short-output; serialized. Log approximate spend in the gate's honest disclosures.
- **Data sensitivity:** content sent to the Abacus/Kimi rater is Martinez Methods internal methodology (skills, gate logs, handoff docs). This is NOT the diagnostic's competitor-research data path, so HC-10's no-train diagnostic-path rule is not the controlling constraint here; still, treat it as internal and disclose the cross-provider send in the gate. Never send secrets, credentials, or Krystal's personal-identifying records to an external rater.

## 5. The parent is the rater of the raters — recorded adjudication

For every finding from every rater, the gate log records: finding → class (deterministic/non-deterministic) → the deterministic test applied (or "none exists") → the verified result → the parent's action (acted / evidence-stands-logged / brief-corrected-and-re-run) → one-line reasoning. A reviewer of the gate must be able to see not just that raters CONFIRMED, but *what the parent did with each finding and why*. PASS = adjudicated, not tallied.

## 6. Checklist (run before dispatching any verification brief)

1. Brief is self-contained; ground-truth sources named explicitly.
2. Every prescribed mechanical check has been run by the author against the correct artifact and observed to pass (else replace with a semantic check).
3. Judgment findings are constrained to hypothesis-plus-resolving-test; the verbatim anti-evidence-strike instruction (§3.4) is present.
4. Output contract: bounded, per-item PASS/FAIL+evidence, explicit verdict line, agentId/request-id capture.
5. Cross-architecture rig: roster, ABAB-responsive sequence, HC-9/11/13 constraints, key-by-indirection — all specified.
6. Adjudication plan: parent will classify and record per §2/§5; no finding auto-executed; no exclusion-on-implausibility honored without a deterministic refutation.

## 7. Honest gaps

1. Responsiveness adds latency; HC-9 already mandates slow, so this is aligned, not additive cost beyond the serialization already required.
2. Cross-provider send of internal methodology is disclosed, not eliminated; a future no-send option (local-only Chinese-architecture host) is out of current scope.
3. This protocol raises the floor on rater-deference failure; it does not eliminate parent error — the recorded adjudication trail is the safeguard that makes parent error auditable after the fact.
4. v01: empirically grounded in exactly two incidents (Failure A, Failure B). Expect amendments as the cross-architecture rig accrues gate evidence.
