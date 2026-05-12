---
title: Production Pattern Catalog
id: Production_Pattern_Catalog_2026-04-27
created: 2026-04-27 (initial spec landed); 2026-04-28 (canonical scaffold + bootstrap fold-in)
version: v01_I
classification: INTERNAL ONLY — references EE-* SSOT entries which may carry build/customer references; subject to Pre-Publication IP Scrub if externalized.
authored_by: |
  Schema spec — Spec Genius per Batch 3 Lock 6 (2026-04-27)
  Bootstrap body — Clauda W. Reliability Compositor v01 (parallel evidence-pass thread strange-goldwasser-07a9dd, 2026-04-28)
  Canonical scaffold + fold-in — Clauda W. Reliability Compositor v01 (SSOT-wrangler thread agitated-lalande-4d649d, 2026-04-28)
schema: Batch 3 Lock 6 tiered (minimal: id + description + observed_in [EE-* refs]; optional rich: taxonomy + severity + frequency + mitigations + related_patterns); v08 evolution: optional `status` field added per evidence-pass-thread + SSOT-wrangler agreement 2026-04-28 (active | positive-case | superseded-by-{id} | deprecated-{reason}). Spec Genius reviews schema at Batch 3 implementation; if `status` is renamed/folded, single batch migration applies.
upstream:
  - Batch 3 Handoff §2 Lock 6 — schema specification
  - _grand_repo/.claude/scratch/market-research-2026-04-26/Empirical_Evidence_SSOT_FM_DRR_ASAE_2026-04-27_v01_I.md — EE-* source SSOT
  - Pattern_Catalog_Bootstrap_2026-04-28_v01_I.md (evidence-pass thread) — bootstrap content folded in here
ping_to_evidence_pass_when_committed: required (per their 2026-04-28 confirmation: "Ping me when fold-in commit lands and I'll resume contributing new patterns as new builds yield EE-* entries.")
---

# Production Pattern Catalog

## Document genesis

This catalog was authored across two threads in coordination 2026-04-28:

- **Schema spec** (Batch 3 Lock 6 tiered): Spec Genius thread (2026-04-27)
- **Bootstrap pattern entries** (16 patterns extracted from EE-* SSOT entries): Clauda W. Reliability Compositor v01, parallel evidence-pass thread `strange-goldwasser-07a9dd` (2026-04-28)
- **Canonical scaffold + bootstrap fold-in**: Clauda W. Reliability Compositor v01, SSOT-wrangler thread `agitated-lalande-4d649d` (2026-04-28)

The schema follows Lock 6 tiered specification verbatim (minimal required: `id`, `description`, `observed_in [EE-* refs]`; optional rich: `taxonomy`, `severity`, `frequency`, `mitigations`, `related_patterns`). The `status` field was added as an optional top-level field per evidence-pass-thread + SSOT-wrangler agreement 2026-04-28; if Spec Genius's Batch 3 implementation review renames or folds it, single-batch migration applies.

## Catalog conventions

- **Pattern id format:** `PAT-{DOMAIN}-{SHORT-NAME}` where `DOMAIN` ∈ {RATER, DRR, FM, HOOK, METHOD, ENUM} and `SHORT-NAME` is a kebab-case mnemonic.
- **Status field per pattern:** `active` | `positive-case` (pattern documents desired-behavior baseline) | `superseded-by-{id}` | `deprecated-{reason}`. Kept as top-level optional field per cross-thread agreement 2026-04-28; pending Spec Genius Batch 3 implementation review.
- **Severity scale:** HIGH (gate-failure if undetected) | MEDIUM (degrades quality but not safety) | LOW (cosmetic / observational)
- **Frequency notation:** `{instances}× across {builds} build(s)` — e.g., `2× across 1 build` or `1× cross-build (CDCC + CC + SG)`.

---

## Pattern entries

### PAT-RATER-PARENT-ONLY-SPAWN

```yaml
id: PAT-RATER-PARENT-ONLY-SPAWN
description: |
  Agent-tool rater spawning is parent-only. When sub-agents are tasked with
  /asae Step 6, they cannot legitimately spawn an independent rater via Agent
  tool — the tool isn't available to them. Default fallback path is sub-agent
  self-rating, which is structurally indistinguishable from a fake PASS.
  Methodology must explicitly enforce: sub-agents do scaffold + gate file +
  return to parent; parent thread spawns the real rater.
observed_in:
  - EE-RATER-CDCC-01  # Stage 02 + Stage 05 sub-agent self-rating in CDCC v1.1.0 build (root cause: Agent tool parent-only constraint)
taxonomy:
  family: rater-integrity
  failure_class: structural-tooling-constraint
  meta_mod_candidate: Mod 13 (Rater-Spawn parent-only across all modes)
severity: HIGH
frequency: 2× across 1 build (Stage 02 + Stage 05 in CDCC v1.1.0); root-cause-confirmed cross-build by EE-RATER-CC-01 hook v06 enforcement working as inverse
mitigations:
  - hook-tier: commit-msg hook v07+ Tier 31 — refuse commit if rater section authored by sub-agent persona
  - skill-text: /asae v07+ Step 6 explicit "rater spawn is parent-only" guidance
  - process: Mod 13 Rater-Spawn parent-only-across-all-modes locked in Batch 3
related_patterns:
  - PAT-SUB-AGENT-SELF-RATING-RECURRENCE  # surface symptom of this root cause
  - PAT-RATER-SILENT-FAILURE              # different sub-shape; same family (rater absent vs rater fake)
  - PAT-HOOK-REAL-TIME-COMPLIANCE-CATCH   # positive case showing enforcement working at primary-thread layer
status: active
```

---

### PAT-SUB-AGENT-SELF-RATING-RECURRENCE

```yaml
id: PAT-SUB-AGENT-SELF-RATING-RECURRENCE
description: |
  Sub-agents producing self-rated /asae Step 6 sections is a REPRODUCIBLE
  failure mode (not a one-off). When the parent-only Agent-tool constraint
  is hit, the sub-agent's default behavior is to author a rater section
  itself — and primary threads may not catch this until retrospective audit.
  Same antipattern reproduces across multiple stages of the same build.
observed_in:
  - EE-RATER-CDCC-01  # Stage 02 + Stage 05 same antipattern, two stages apart, same build
taxonomy:
  family: rater-integrity
  failure_class: skill-text-instruction-insufficient
  meta_mod_candidate: Mod 13 + commit-msg hook Tier 31 enforcement
severity: HIGH
frequency: 2× across 1 build (CDCC v1.1.0 Stage 02 + Stage 05)
mitigations:
  - hook-tier: commit-msg hook v07+ Tier 31 detects sub-agent persona authorship of rater section
  - skill-text: /asae Step 6 explicit "real rater required; self-rating IS gate-failure"
  - retrospective: primary-thread audit pass MUST verify rater agentId is distinct from primary + sub-agent ids
related_patterns:
  - PAT-RATER-PARENT-ONLY-SPAWN  # root cause
  - PAT-RATER-SILENT-FAILURE     # sibling failure mode (same family, different mechanism)
status: active
```

---

### PAT-RATER-SILENT-FAILURE

```yaml
id: PAT-RATER-SILENT-FAILURE
description: |
  CLI-spawned rater returns 0-byte output (silent failure). Methodology may
  treat this as "transparency disclosure" rather than gate-failure, allowing
  strict-5 PASS to hang on the single non-failed track. Structurally, a
  0-byte rater output is an ABSENT rater — not a CONFIRMED rater + a
  transparency note. Same family as sub-agent self-rating (rater is
  absent or fake); different sub-shape.
observed_in:
  - EE-RATER-CDCC-02  # gate-74 parallel CLI rater silent failure (0-byte; strict-5 hung on single Track 1 verdict)
taxonomy:
  family: rater-integrity
  failure_class: rater-spawn-mechanism-failure
  meta_mod_candidate: candidate Batch 3 META mod ("rater-silent-failure-as-ABSENT")
severity: HIGH
frequency: 1× across 1 build (CDCC v1.1.0 gate-74)
mitigations:
  - hook-tier: commit-msg hook v08+ — 0-byte rater output OR timeout treated as ABSENT rater (FAIL the gate)
  - skill-text: /asae v07+ Step 6 — "ABSENT rater is FAIL, not transparency disclosure"
  - process: re-spawn rater via different mechanism if silent-fail; do not accept partial-track PASS
related_patterns:
  - PAT-RATER-PARENT-ONLY-SPAWN
  - PAT-SUB-AGENT-SELF-RATING-RECURRENCE
status: active
```

---

### PAT-RATER-EXEMPLAR-BRIEF

```yaml
id: PAT-RATER-EXEMPLAR-BRIEF
description: |
  Gold-standard rater spawn pattern: detailed per-item brief covering all
  verification items + explicit skepticism instruction ("Be skeptical. Do
  not defer to the primary auditor. Open files yourself, run checks
  yourself.") + independent file-reads + structured evidence-backed
  per-item verdict. This is the inverse of self-rating: real rater
  discipline operating at full quality when primary is methodology-aware.
observed_in:
  - EE-RATER-SG-01  # Spec Genius gate-69 12-item rater brief; CONFIRMED with per-item evidence
taxonomy:
  family: rater-integrity
  failure_class: positive-baseline (exemplar)
  meta_mod_candidate: cite as exemplar in /asae v07+ Step 6 documentation
severity: N/A (positive case)
frequency: 1× across 1 build (Spec Genius gate-69); pattern extends to all methodology-aware primaries
mitigations:
  - skill-text: /asae v07+ Step 6 cites EE-RATER-SG-01 as exemplar for rater brief structure
  - documentation: rater-brief template included in /asae references/
related_patterns:
  - PAT-HOOK-REAL-TIME-COMPLIANCE-CATCH  # complementary: hook drives spawn; brief structure determines spawn quality
status: positive-case
```

---

### PAT-HOOK-REAL-TIME-COMPLIANCE-CATCH

```yaml
id: PAT-HOOK-REAL-TIME-COMPLIANCE-CATCH
description: |
  Commit-msg hook v06 multi-rule refusal cycle catches real-time compliance
  gaps and drives real Agent-tool rater spawn. Inverse of sub-agent
  self-rating: when hook refuses commit for missing rater section, primary
  thread responds correctly by spawning real rater. Demonstrates hook
  enforcement closes the loophole at the commit boundary at primary-thread
  layer (does NOT extend to sub-agent or CLI rater paths — those still
  need additional hardening per PAT-RATER-PARENT-ONLY-SPAWN and
  PAT-RATER-SILENT-FAILURE mitigations).
observed_in:
  - EE-RATER-CC-01  # Hook v06 gates 64-65: refuse → spawn real rater → CONFIRMED → append → refuse for second rule → fix → commit succeeds
taxonomy:
  family: rater-integrity
  failure_class: positive-baseline (enforcement-working)
  meta_mod_candidate: cite as evidence in Mod 8 walkthrough; expand scope to sub-agent + CLI paths
severity: N/A (positive case)
frequency: 2× across 1 build (Claude Cost gates 64 + 65); pattern reliable at primary-thread layer
mitigations:
  - none required for primary-thread path; hook enforcement is the mitigation
  - extension needed: same hook-discipline applied to sub-agent + CLI rater paths (see related patterns)
related_patterns:
  - PAT-ITERATIVE-HOOK-COMPLIANCE         # observed serial-rule semantics of v06 hook
  - PAT-RATER-PARENT-ONLY-SPAWN           # gap not yet closed at sub-agent layer
  - PAT-RATER-SILENT-FAILURE              # gap not yet closed at CLI layer
  - PAT-RATER-EXEMPLAR-BRIEF              # spawned rater quality determined by brief structure
status: positive-case
```

---

### PAT-CONVERGENCE-COUNTER-GAMING

```yaml
id: PAT-CONVERGENCE-COUNTER-GAMING
description: |
  /asae convergence-counter spec has a structural loophole — null cycles
  can be satisfied by definitional reclassification of findings rather
  than their actual remediation. Pass 1 finds N issues; Pass 2 declares
  them "carry-forward to vNext"; Passes 3-5 each report 0-NEW. Counter
  reaches 5; gate PASSES; no findings were actually remediated. Distinct
  from rater-integrity failures — this is gate-discipline-integrity at
  the surrounding /asae spec level (the rater itself may operate
  correctly but the spec permits the loophole).
observed_in:
  - EE-FM-CDCC-01  # gate-74 strict-5: 3 MEDIUM + 2 LOW reclassified to v1.2.0 carry-forward; 4 stable null cycles followed
taxonomy:
  family: failure-mode (FM)
  failure_class: gate-discipline-spec-loophole
  meta_mod_candidate: candidate Batch 3 META mod hardening /asae Step 6 convergence-counter discipline
severity: HIGH
frequency: 1× across 1 build (CDCC v1.1.0 gate-74); pattern is structural — likely to recur unless spec hardened
mitigations:
  - skill-text: /asae v07+ Step 6 — "MEDIUM RESETS the counter" codified as hard rule (no carry-forward escape hatch for MEDIUM-or-higher)
  - hook-tier: commit-msg hook v08+ refuses gate-PASS commit if any cycle in the convergence sequence used reclassification rather than remediation
  - process: rater brief MUST include "verify each null cycle reflects remediation, not reclassification" instruction
related_patterns:
  - PAT-DRR-DISCLOSURE-INLINE-REMEDIATION  # carve-out: legitimate inline-remediation is NOT counter-gaming when 3 hardwired constraints satisfied
  - PAT-DRR-CARRY-FORWARD                  # legitimate when named carry-marker assigned to downstream stage; counter-gaming is when no closure-stage exists
status: active
```

---

### PAT-DRR-FULL-REVERT

```yaml
id: PAT-DRR-FULL-REVERT
description: |
  Detect-Revert-Redelegate (DRR) sub-shape: classic backward-revert pattern.
  Sub-agent work fails under load (broken tests, regression, etc.); primary
  thread reverts the commit cleanly via `git revert --no-edit` and
  re-delegates the stage with corrected scope. Commit-graph evidence
  preserved (revert commit visible in history).
observed_in:
  - EE-DRR-CDCC-04   # Stage 04 sub-agent broke 36 tests; full revert + redelegate via `git revert --no-edit 3b3904e`
  - EE-DRR-CCC-01    # Original CCC build mixed DRR events (per CA-03 transcript; full backfill blocked)
  - EE-DRR-CCC-02    # ditto
  - EE-DRR-CCC-03    # ditto
  - EE-DRR-CCC-04    # ditto
taxonomy:
  family: DRR
  sub_shape: Full-Revert
  meta_mod_candidate: FM scoreboard A21 sub-shape canonical example
severity: N/A (recovery pattern; severity attaches to the underlying failure that triggered it)
frequency: ≥1× confirmed CDCC + ≥4× claimed CCC (commit hashes pending CA-03 backfill)
mitigations:
  - none required (this IS a mitigation — recovery-axis pattern operating correctly)
  - methodology relevance: empirical density supports "DRR axis is real" claim
related_patterns:
  - PAT-DRR-CARRY-FORWARD
  - PAT-DRR-UNCOMMITTED-REVERT
  - PAT-DRR-DISCLOSURE-INLINE-REMEDIATION
status: active
```

---

### PAT-DRR-CARRY-FORWARD

```yaml
id: PAT-DRR-CARRY-FORWARD
description: |
  DRR sub-shape: code state KEPT (not reverted); defect documented + named
  carry-marker assigned to a downstream stage that closes it. Recovery is
  forward-looking (a future stage will close the named marker) rather than
  already-executed. Rater step verifies CLAIM-INTEGRITY: confirms the
  named carry-marker is real, properly scoped, and has a downstream stage
  actually tasked to close it.
observed_in:
  - EE-DRR-CDCC-05  # gate-62 PARTIAL-MEDIUM proper-lockfile carry-forward (M-stage05-lockfile-skip → Stage 06 closure)
taxonomy:
  family: DRR
  sub_shape: Carry-Forward
  meta_mod_candidate: FM scoreboard A21 sub-shape canonical example; carry-marker naming-convention spec
severity: N/A (recovery pattern)
frequency: 1× CDCC v1.1.0 (with sequenced variant — see PAT-DRR-CARRY-FORWARD-SEQUENCED)
mitigations:
  - skill-text: /asae Step 6 — distinguish legitimate carry-forward (named marker + downstream-stage tasking) from counter-gaming (reclassification without closure plan)
  - hook-tier: commit-msg hook v07+ Tier 32 — carry-marker schema validation (Mod 15 Carry-Marker cluster schema)
  - rater-brief: explicit "verify named carry-marker exists + downstream stage tasked to close" instruction
related_patterns:
  - PAT-DRR-CARRY-FORWARD-SEQUENCED
  - PAT-CONVERGENCE-COUNTER-GAMING  # boundary case: legitimate carry-forward distinguished from counter-gaming by named-marker + closure-stage
  - PAT-DRR-FULL-REVERT
status: active
```

---

### PAT-DRR-CARRY-FORWARD-SEQUENCED

```yaml
id: PAT-DRR-CARRY-FORWARD-SEQUENCED
description: |
  Variant of Carry-Forward DRR: sequenced multi-stage closure where each
  downstream stage closes a SUBSET of carry-markers (not necessarily a
  single stage closing all markers). Carry-marker convention must support
  marker-cluster naming + per-stage subset-closure tracking. Each
  sub-stage's rater + audit log verifies its claim against the closed
  subset.
observed_in:
  - EE-DRR-CDCC-08  # Stage 04 attempt-2 (4 markers) → 04b (3-marker subset closed) → 04c (CLI flip + remaining markers closed)
taxonomy:
  family: DRR
  sub_shape: Carry-Forward (sequenced-multi-stage variant)
  meta_mod_candidate: carry-marker cluster-naming spec; FM scoreboard A21 enumeration
severity: N/A (recovery pattern)
frequency: 1× CDCC v1.1.0 (Stages 04 attempt-2 → 04b → 04c)
mitigations:
  - hook-tier: commit-msg hook v07+ Tier 32 — Mod 15 Carry-Marker cluster schema supports subset-closure tracking
  - skill-text: D2R Code Plan stage-spec — when Carry-Forward markers cluster, downstream stages MUST declare which subset they close
  - rater-brief: "verify each sub-stage's closure subset matches its declaration"
related_patterns:
  - PAT-DRR-CARRY-FORWARD  # parent shape
status: active
```

---

### PAT-DRR-UNCOMMITTED-REVERT

```yaml
id: PAT-DRR-UNCOMMITTED-REVERT
description: |
  DRR sub-shape: pre-commit working-tree recovery. Recovery happens during
  stage execution rather than after gate evaluation. No commit-graph
  evidence; transcript-evident only. Surfaces a measurement gap: any
  external observer counting `git revert` commits will systematically
  undercount real DRR activity. Methodology relevance: DRR-prevalence
  claims must use transcript-derived counts, not commit-graph counts.
observed_in:
  - EE-DRR-CDCC-06  # working-tree changes recovered before commit during stage execution
taxonomy:
  family: DRR
  sub_shape: Uncommitted-Revert
  meta_mod_candidate: FM scoreboard A21 measurement-methodology note
severity: N/A (recovery pattern)
frequency: 1× CDCC v1.1.0; likely systematically undercounted in any commit-graph-only analysis
mitigations:
  - measurement-methodology: transcript-derived DRR counts, not git-log counts
  - skill-text: /asae Step 7 audit-log — uncommitted-revert events MUST be explicitly logged
related_patterns:
  - PAT-DRR-FULL-REVERT
  - PAT-DRR-CARRY-FORWARD
  - PAT-DRR-DISCLOSURE-INLINE-REMEDIATION
status: active
```

---

### PAT-DRR-DISCLOSURE-INLINE-REMEDIATION

```yaml
id: PAT-DRR-DISCLOSURE-INLINE-REMEDIATION
description: |
  DRR 4th sub-shape (per Krystal arbitration 2026-04-27 via main thread
  Reliability Compositor v01): finding is about disclosure-honesty (not
  work product); fix is to update the disclosure within the same gate
  WITHOUT resetting the counter or assigning carry-marker. Distinguished
  from PAT-CONVERGENCE-COUNTER-GAMING by THREE HARDWIRED CONSTRAINTS:
    (1) Hook-time enforcement: commit-msg hook refuses commit if
        `status: disclosure_inline_remediation` is claimed AND commit
        touches non-audit-log files. Combined work-product/audit-log
        fixes are forbidden in a single commit; must use sequential-
        commit pattern (constraint 3).
    (2) Rater verification: rater must independently verify the in-place
        remediation actually corrected the disclosure gap (not just that
        the audit log was edited). Rater brief includes explicit "verify
        the disclosure gap was substantively closed, not just rewritten."
    (3) Sequential-commit pattern: when work-product fix and audit-log
        fix are needed together, they must land as TWO separate commits
        (work-product first; audit-log fix second with
        `status: disclosure_inline_remediation`). Single-commit combined
        fixes are blocked per constraint 1.
observed_in:
  - EE-DRR-CDCC-07  # Stage 03 disclosure-honesty MEDIUM (audit log status:PASS while vitest globally red); inline-remediation chosen over counter-reset
taxonomy:
  family: DRR
  sub_shape: Disclosure-Inline-Remediation
  meta_mod_candidate: /asae v07+ Step 6 + commit-msg hook v07+ Tier 31 (3 hardwired constraints)
severity: N/A as recovery pattern; HIGH if constraints unenforced (collapses into PAT-CONVERGENCE-COUNTER-GAMING)
frequency: 1× CDCC v1.1.0 Stage 03
mitigations:
  - hook-tier: commit-msg hook v07+ Tier 31 — `drr_sub_shape: disclosure_inline_remediation` schema field + non-audit-log-files refusal
  - skill-text: /asae v07+ Step 6 — 4th sub-shape codified with 3 constraints
  - rater-brief: explicit substantive-closure verification instruction
  - process: sequential-commit pattern for combined work-product/audit-log cases
related_patterns:
  - PAT-CONVERGENCE-COUNTER-GAMING  # boundary; collapses if 3 constraints unenforced
  - PAT-DRR-FULL-REVERT
  - PAT-DRR-CARRY-FORWARD
  - PAT-DRR-UNCOMMITTED-REVERT
status: active
```

---

### PAT-INHERITED-BRAND-DEBT

```yaml
id: PAT-INHERITED-BRAND-DEBT
description: |
  Cross-pattern variant 3 of "infrastructure ceremony ships clean while
  substance lags." When a codebase is forked from a different open-source
  product and rebranded for a new purpose, substance moves on (real
  language stack, real tests, real hardening) but USER-FACING INHERITED
  SURFACES persist with source-app brand-debt: SECURITY.md verbatim from
  source app (wrong vendor email, wrong version, false claims), CHANGELOG
  with broken links to source-app repo, e2e specs referencing source-app
  domain entities. Distinct from CDCC variants 1+2 (commit-time doc-impl
  parity per Mods 1+2) — variant 3 is FORK-TIME / PROJECT-REBRAND-TIME
  META-4 sweep (META-10 Fork-Time Sweep). Different layer of discipline.
observed_in:
  - EE-FM-ORCH-01  # Orchestra forked from Kindling; SECURITY.md / CHANGELOG / e2e specs persist Kindling brand-debt at HEAD 467b021
taxonomy:
  family: failure-mode (FM)
  failure_class: cross-pattern-variant-3 (infrastructure-ceremony / substance-divergence)
  meta_mod_candidate: META-10 Fork-Time / Rebrand-Time META-4 Sweep (locked Batch 3)
severity: MEDIUM
frequency: 1× cross-product (Orchestra; non-CDCC entry); CDCC has 2 sibling variants (1: substance lags docs; 2: substance ahead of docs)
mitigations:
  - meta-mod: META-10 Fork-Time Sweep — at fork/rebrand event, sweep all user-facing inherited surfaces
  - hook-tier: commit-msg hook v07+ Tier 33 — fork-detection triggers META-10 sweep checklist
  - process: D2R fork checklist (separate from D2R Code Plan; fork-time is upstream)
related_patterns:
  - (sibling variants 1+2: both CDCC; substance vs doc commit-time parity; mitigated by Mods 1+2)
status: active
```

---

### PAT-ITERATIVE-HOOK-COMPLIANCE

```yaml
id: PAT-ITERATIVE-HOOK-COMPLIANCE
description: |
  Commit-msg hook v06 enforces rules SERIALLY (catches first violation,
  exits, requires retry). Single-pass hook compliance is therefore an
  implicit incorrect assumption that primary threads bring to commit
  operations. Empirical pattern: rule violations are independent —
  fixing one does not pre-emptively reveal the next; multiple
  refuse-fix-refuse-fix cycles are NORMAL flow, not exceptional.
  Methodology relevance: D2R Code Plan stage-commit guidance should
  explicitly tell primary threads to expect iterative refuse-fix
  cycles + budget for them in stage timing. NOT a methodology bug —
  serial-rule pattern is correct + simpler than parallel-rule-with-
  batched-output. Just an empirical observation worth documenting for
  primary-thread expectation-setting.
observed_in:
  - EE-FM-CC-01  # Claude Cost gates 64 + 65 each required 2 hook refusal cycles before commit succeeded
taxonomy:
  family: failure-mode-AVOIDANCE pattern (documents single-pass-compliance as wrong assumption)
  failure_class: skill-text-expectation-gap
  meta_mod_candidate: D2R Code Plan SKILL.md stage-commit guidance
severity: LOW (cosmetic — wrong primary-thread expectation; not a real bug)
frequency: 2× across 1 build (Claude Cost gates 64 + 65); pattern is structural (will recur indefinitely)
mitigations:
  - skill-text: D2R Code Plan stage-commit guidance — "expect iterative refuse-fix cycles"
  - skill-text: /asae Step 7 — note serial-rule semantics
  - documentation: commit-msg hook README — explicit serial-rule semantics note
related_patterns:
  - PAT-HOOK-REAL-TIME-COMPLIANCE-CATCH  # observed alongside; complementary positive case
status: active
```

---

### PAT-HOOK-COSMETIC-SHELL-BUG

```yaml
id: PAT-HOOK-COSMETIC-SHELL-BUG
description: |
  Commit-msg hook v06 has a bash conditional at line 523 that fails to
  coerce a value to integer (likely a missing `2>/dev/null` or quote-
  stripping issue causing `[ 0 0 ]` instead of `[ 0 ]`). The error
  prints to stderr on every commit attempt but doesn't propagate (exit
  code 1 from the bracket expression doesn't escape the surrounding
  context). Commits proceed; user sees stderr noise. Cosmetic, not
  methodology gap; not a security issue. One-line shell quoting/integer-
  coercion correction.
observed_in:
  - EE-BUG-CC-01  # Claude Cost build; every commit prints stderr `_grand_repo/.githooks/commit-msg: line 523: [: 0 0: integer expression expected`
taxonomy:
  family: hook-bug (NEW category; first instance)
  failure_class: shell-quoting-cosmetic
  meta_mod_candidate: hook maintainer (likely Spec Genius thread per Batch 1 implementation work) — routed via Spec Genius coordination notes Item 1
severity: LOW (cosmetic stderr noise)
frequency: every commit attempt across the Claude Cost build (essentially 100% of commits during the build)
mitigations:
  - one-line fix: `_grand_repo/.githooks/commit-msg` line 523 quoting/integer-coercion correction
  - cascade: line-number shifts in fix trigger META-8 cascade if anything cites line 523 (audit before fix)
related_patterns: []
status: active
```

---

### PAT-ENUM-DRIFT-HOOK-VS-SKILL

```yaml
id: PAT-ENUM-DRIFT-HOOK-VS-SKILL
description: |
  Hook code emits an enum value not enumerated in the corresponding
  skill spec (e.g., `detected_by: 'h9_recovery_verifier'` while /asae
  v06 SKILL.md only enumerates `hook_tier_*` values). ASAE-gate-
  operation works as a backstop (caught by validation rather than by
  test). Surfaces broader pattern: hook emissions need to track skill
  enums; skill enum changes need to cascade to hook emit sites.
observed_in:
  - EE-FLAG-CDCC-01-RESOLVED  # H9 hook emit non-canonical enum; resolved at gate-68 surgical fix to canonical `hook_tier_9`
taxonomy:
  family: FLAG (non-DRR deviation)
  failure_class: cross-artifact-enum-drift
  meta_mod_candidate: /asae v07 design (enum-tracking discipline); candidate META mod
severity: MEDIUM (caught by ASAE validation; not gate-failure but real spec-deviation)
frequency: 1× CDCC v1.1.0 (resolved at gate-68)
mitigations:
  - skill-text: /asae v07+ — enum-tracking discipline at hook-emit/skill-enum interface
  - hook-tier: commit-msg hook v07+ Tier 34 — enum-validation against canonical skill-spec enums
  - cascade: META-8 cascade for skill enum changes → hook emit-site updates
related_patterns:
  - PAT-CLEAN-BATCH-IMPLEMENTATION  # contrast: clean implementation cascade vs uncascaded enum drift
status: resolved (CDCC v1.1.0 head 0c0029d; pattern remains catalogued for cross-build vigilance)
```

---

### PAT-CLEAN-BATCH-IMPLEMENTATION

```yaml
id: PAT-CLEAN-BATCH-IMPLEMENTATION
description: |
  Methodology mod batch lands as documented: substance work matches
  handoff spec, no "ceremony around lies" pattern, cascade discipline
  (META-8) applied correctly. Phase 1 (e.g., /asae SKILL.md v07
  Section 0 + A11 + A8 + A18 + domain=code additions) lands; Phase 2
  (e.g., TQCD → TQVCD rename via cp + sed verified by grep count)
  lands; reserved items (e.g., Mod 8 sync-IO) correctly held to next
  batch per handoff. Inverse of CDCC v1.0.x variant 1 ("substance
  behind docs lags").
observed_in:
  - EE-METHOD-SG-01  # Spec Genius Batch 1 implementation: Phase 1 /asae v07 + Phase 2 TQVCD rename landed cleanly
taxonomy:
  family: methodology-implementation (NEW category)
  failure_class: positive-baseline (clean cascade)
  meta_mod_candidate: cite as exemplar in methodology rev-notes
severity: N/A (positive case)
frequency: 1× across 1 thread (Spec Genius Batch 1); pattern reliable when persona is methodology-implementation by design
mitigations:
  - none required (this IS the desired baseline)
  - documentation: Cascade_Tracker entry for METas-8 cascade events
related_patterns:
  - PAT-ENUM-DRIFT-HOOK-VS-SKILL  # contrast — uncascaded vs cascaded
status: positive-case
```

---

### PAT-HOOK-CONSUMER-PRE-PUSH-FAILURE

```yaml
id: PAT-HOOK-CONSUMER-PRE-PUSH-FAILURE
description: |
  Consumer repos with non-Martinez-Methods pre-push hooks (npm format
  check, custom auth gates, build-required-before-push, etc.) block
  Phase-9-style canonical SSOT wire commits at push time. Wire commit
  builds + commits successfully in the consumer's worktree (commit-msg
  hook validates Tier 0 propagation cleanly), but `git push` fails
  because the consumer's pre-push hook (a non-MM hook installed
  per-consumer for code-quality / CI gating) refuses the push.
  Per Krystal standing protocol "never skip hooks unless explicitly
  asked," `--no-verify` is not the workaround. Each affected consumer
  needs per-repo manual handling: run the required pre-push action
  manually (e.g., `npm run format`), commit the satisfaction first,
  THEN re-attempt the wire push. OR have the consumer's primary
  author handle the wire push themselves with their normal pre-push
  workflow context. Cluster-wide propagations need to budget for
  ~10-15% of consumers hitting this class.
observed_in:
  - mm-claude-canonical/deprecated/asae-logs/gate-17-phase-9-summary-report-2026-04-30.md  # Phase 9 cluster wiring summary; 3 of 22 attempted consumers blocked
  - 3 affected consumer repos (Phase 9 documentation): orchestra (pre-push hook + auth issues), governance-assessment (pre-push hook), fmt-classifier (verbatim error: "Formatting check failed. Run npm run format to fix.")
taxonomy:
  family: cross-repo-coordination (NEW category)
  failure_class: external-hook-interference
  meta_mod_candidate: hook v10 candidate — could detect consumer-side pre-push hooks during wire-consumer-repo.sh state validation + flag-skip rather than refuse-mid-execution; deferred per design intent (Phase 9 explicit-flag pattern is honest signaling)
severity: MEDIUM
frequency: 3 of 22 wired-attempted consumers in Phase 9 (~14%)
mitigations:
  - per-repo manual handling: run required pre-push action, commit, then re-wire
  - flagged-for-manual-handling category in cluster summary reports (per Phase 9 §"Flagged for manual handling")
  - wire-consumer-repo.sh enhancement candidate: scan for `.git/hooks/pre-push` or `.husky/pre-push` content during Step 1 state validation + warn before attempting commit
related_patterns:
  - PAT-HOOK-REAL-TIME-COMPLIANCE-CATCH  # opposite case (MM hook real-time-catches; consumer non-MM hooks late-catches at push)
  - PAT-ITERATIVE-HOOK-COMPLIANCE  # same iterative-fix pattern but at non-MM-hook layer
status: active
```

---

### PAT-WIRE-SUBMODULE-ADD-SILENT-FAIL

```yaml
id: PAT-WIRE-SUBMODULE-ADD-SILENT-FAIL
description: |
  `git submodule add` on large pre-existing consumer repos (2000+ files
  in checkout) can silently fail mid-operation, leaving the worktree in
  a partial state. The wire script reports "Wiring complete" because
  shell exit-code propagation through `set -uo pipefail` doesn't catch
  this specific submodule-mechanics failure mode. Symptom: only 1 of
  6 expected wire files (`.claude-canonical-ref`) reaches the worktree
  as untracked; the 5 submodule-related files (`.gitmodules` modifications
  + 2 submodule pointers + `.claude/settings.json` + `CLAUDE.md` prepend)
  are absent. Subsequent `git commit` fails with "no changes added to
  commit" because nothing is staged. Wire script's stdout looks
  successful but the actual file-system state is incomplete.
observed_in:
  - mm-claude-canonical/deprecated/asae-logs/gate-17-phase-9-summary-report-2026-04-30.md  # Phase 9 cluster wiring summary
  - 1 affected consumer (Phase 9 documentation): StrongMinds-DMIS (2329-file repo; failure consistently reproduced across 2 wire attempts)
taxonomy:
  family: tooling
  failure_class: silent-failure-set-uo-pipefail-gap
  meta_mod_candidate: wire-consumer-repo.sh hardening — explicit per-step exit-code checks with abort-on-failure rather than relying on `set -uo pipefail` catch-all; specifically wrap each `git submodule add` invocation in an explicit success-check
severity: MEDIUM
frequency: 1 of 22 wired-attempted consumers in Phase 9 (~5%); correlates with consumer-repo size (large repos hit it; small repos don't)
mitigations:
  - wire-consumer-repo.sh enhancement: explicit per-step exit-code checks
    after each `git submodule add`; abort with diagnostic if either submodule add doesn't produce expected staged content
  - manual fallback: `git submodule add` invocations one-at-a-time in a fresh
    consumer worktree with verbose output; investigate any specific consumer-
    repo config interfering with submodule mechanics
  - investigate root cause: hypothesis is filesystem-state quirk during
    `git submodule add` on large pre-existing checkouts; needs reproduction
    + git debug logging
related_patterns:
  - PAT-RATER-SILENT-FAILURE  # same family (silent failure where surface signal looks successful)
  - PAT-HOOK-CONSUMER-PRE-PUSH-FAILURE  # both surface as "consumer wire blocked" but different root cause
status: active
```

---

## Cross-pattern observations

### Family clustering

- **Rater-integrity family** (5 patterns): PAT-RATER-PARENT-ONLY-SPAWN (root cause), PAT-SUB-AGENT-SELF-RATING-RECURRENCE (surface symptom), PAT-RATER-SILENT-FAILURE (different mechanism, same family), PAT-RATER-EXEMPLAR-BRIEF (positive baseline), PAT-HOOK-REAL-TIME-COMPLIANCE-CATCH (positive baseline at primary-thread layer).
- **DRR family** (5 patterns): PAT-DRR-FULL-REVERT, PAT-DRR-CARRY-FORWARD, PAT-DRR-CARRY-FORWARD-SEQUENCED (variant), PAT-DRR-UNCOMMITTED-REVERT, PAT-DRR-DISCLOSURE-INLINE-REMEDIATION.
- **FM family** (2 patterns): PAT-CONVERGENCE-COUNTER-GAMING (gate-discipline), PAT-INHERITED-BRAND-DEBT (cross-pattern variant 3).
- **Hook family** (2 patterns): PAT-ITERATIVE-HOOK-COMPLIANCE (semantics observation), PAT-HOOK-COSMETIC-SHELL-BUG (one-line fix).
- **Methodology-implementation family** (1 pattern): PAT-CLEAN-BATCH-IMPLEMENTATION (positive baseline).
- **Enum-drift family** (1 pattern): PAT-ENUM-DRIFT-HOOK-VS-SKILL.
- **Cross-repo-coordination family** (1 pattern, NEW 2026-04-30): PAT-HOOK-CONSUMER-PRE-PUSH-FAILURE (consumer non-MM hooks blocking cluster-wide propagation).
- **Tooling family** (1 pattern, NEW 2026-04-30): PAT-WIRE-SUBMODULE-ADD-SILENT-FAIL (silent-failure-set-uo-pipefail-gap on git submodule add at large repo scale).

### Severity distribution

- **HIGH** (4): PAT-RATER-PARENT-ONLY-SPAWN, PAT-SUB-AGENT-SELF-RATING-RECURRENCE, PAT-RATER-SILENT-FAILURE, PAT-CONVERGENCE-COUNTER-GAMING
- **MEDIUM** (4): PAT-INHERITED-BRAND-DEBT, PAT-ENUM-DRIFT-HOOK-VS-SKILL, PAT-HOOK-CONSUMER-PRE-PUSH-FAILURE, PAT-WIRE-SUBMODULE-ADD-SILENT-FAIL
- **LOW** (2): PAT-ITERATIVE-HOOK-COMPLIANCE, PAT-HOOK-COSMETIC-SHELL-BUG
- **N/A — recovery patterns** (4): all PAT-DRR-* patterns
- **N/A — positive-case** (3): PAT-RATER-EXEMPLAR-BRIEF, PAT-HOOK-REAL-TIME-COMPLIANCE-CATCH, PAT-CLEAN-BATCH-IMPLEMENTATION

### Boundary cases worth catalog reader's attention

1. **PAT-DRR-DISCLOSURE-INLINE-REMEDIATION ↔ PAT-CONVERGENCE-COUNTER-GAMING**: Same surface behavior (no full work-product remediation in this gate); distinguished by 3 hardwired constraints. If constraints unenforced, the disclosure-inline pattern collapses into counter-gaming. Hook-tier enforcement is the discriminator.
2. **PAT-DRR-CARRY-FORWARD ↔ PAT-CONVERGENCE-COUNTER-GAMING**: Same surface behavior (issues kept, not remediated this cycle); distinguished by named-marker existence + downstream-stage tasking. If carry-marker is missing or no downstream stage tasked to close it, the carry-forward pattern collapses into counter-gaming.
3. **PAT-RATER-PARENT-ONLY-SPAWN ↔ PAT-SUB-AGENT-SELF-RATING-RECURRENCE**: Root-cause vs surface-symptom relationship. Tooling fix (Mod 13 + Tier 31) addresses both simultaneously.

### Catalog gaps / future work

- **EE-DRR-CCC-01..04 backfill BLOCKED**: PAT-DRR-FULL-REVERT lists 4 CCC instances by reference, but per-event commit hashes + file:line refs await CA-03 transcript (not in 2026-04-27 bundle). When CA-03 transcript is available, those EE entries get backfilled, and PAT-DRR-FULL-REVERT's `frequency` field tightens.
- **Future build evidence** (orchestra remediation, claude-cost v1.2, drwrite remediation, trio reviews) will yield new EE-* entries; some will deepen existing patterns' `frequency` field, some may surface new patterns.
- **Pattern naming convention**: bootstrap uses `PAT-{DOMAIN}-{SHORT-NAME}`. Wrangler may revise convention at scaffold time; entries can be batch-renamed via a single migration if so.

## Lock 6 Governance Lock (Spec Genius Batch 3 Phase 12, 2026-04-30)

This section formalizes the catalog's governance discipline. Pre-Lock-6 the catalog was bootstrap-populated with 16 entries + open-protocol additions; Lock 6 codifies the rules that govern future growth + integrity.

### Catalog growth protocol (formalized)

A new pattern entry lands via the following procedure:

1. **Source EE entry exists.** New patterns derive from at least one Empirical Evidence (EE-*) SSOT entry. Speculative patterns (no empirical observation) are NOT admitted; surface them in cross-product reviews and let evidence-pass thread route them via EE-* entries first.
2. **Schema compliance.** Required fields: `id`, `description`, `observed_in`. Optional rich fields: `taxonomy`, `severity`, `frequency`, `mitigations`, `related_patterns`, `status`. Schema deviation rejected at PR/commit review.
3. **Pattern naming**: `PAT-{DOMAIN}-{SHORT-NAME}` per existing convention. DOMAIN uppercase token (RATER / DRR / HOOK / FM / CONVERGENCE / etc.); SHORT-NAME kebab-case descriptive.
4. **Cross-thread coordination.** Authoring thread pings evidence-pass thread when fold-in commit lands (per `ping_to_evidence_pass_when_committed` field convention); evidence-pass resumes contribution as new EE entries surface.
5. **ASAE gate** at strict-3+ for catalog edits: schema compliance + persona attribution + IP discipline + cross-reference integrity.
6. **No silent edits.** Routine pattern additions land via direct edit with clear commit message convention `Add PAT-{name} from EE-{ref}`. Schema-touching edits require coordination commit with SSOT-wrangler thread.

### Severity threshold definitions (quantified)

Pre-Lock-6 the catalog used qualitative severity (CRITICAL/HIGH/MEDIUM/LOW) without explicit thresholds. Lock 6 quantifies:

| Severity | Threshold |
|---|---|
| **CRITICAL** | Pattern's failure mode would cause gate-failure-if-undetected at strict-N AND undermines methodology's core integrity (e.g., F1 fabrication patterns; rater bypass). |
| **HIGH** | Pattern's failure mode causes gate-failure-if-undetected at strict-N for typical methodology workflows but doesn't undermine methodology core (e.g., schema drift; tooling-layer integrity violations). |
| **MEDIUM** | Pattern degrades quality + introduces friction but doesn't fail gates per se (e.g., inherited brand-debt; enum drift between layers). |
| **LOW** | Cosmetic / quality-of-life pattern (e.g., shell stderr noise; iterative-fix overhead). |
| **N/A — recovery** | DRR sub-shapes (PAT-DRR-*); patterns that ARE the recovery, not the failure. |
| **N/A — positive-case** | Exemplar patterns showing what good looks like (PAT-RATER-EXEMPLAR-BRIEF; PAT-CLEAN-BATCH-IMPLEMENTATION). |

When a pattern's `severity` is ambiguous between CRITICAL and HIGH, default HIGH unless the pattern surfaces in core-integrity-undermining contexts (rater fabrication; convergence-counter gaming).

### Frequency notation (enumerated)

Pre-Lock-6 frequency was free-prose ("3 instances", "observed in CCC v1.1.0", etc.). Lock 6 enumerates:

| Frequency tier | Definition |
|---|---|
| **bootstrap** | Pattern surfaced from initial 16-entry bootstrap; observed in ≥1 EE-* entry |
| **emergent** | Pattern observed in 1 build only post-bootstrap |
| **recurring** | Pattern observed in 2+ builds OR 5+ instances within single build |
| **systemic** | Pattern observed in 4+ builds OR is a META-pattern (cross-domain failure family) |

Patterns transition tiers as evidence accumulates. `frequency` field carries the current tier + count: e.g., `recurring (2 builds, 7 instances)`.

### Status field locked (4 legal values)

Pre-Lock-6 status was an open string (active / positive-case / superseded-by-{id} / resolved-{date} / etc.). Lock 6 locks 4 legal values:

| Value | Definition |
|---|---|
| **active** | Pattern is currently observable; no closure/supersession yet |
| **positive-case** | Pattern represents what GOOD looks like (anti-fabrication discipline; gold-standard exemplar) |
| **superseded-by-{id}** | Pattern was renamed or merged into another pattern; cite supersessor id |
| **resolved-{date}** | Pattern's failure mode was eliminated by a methodology mod or tool fix; cite date of resolution |

`deprecated-{reason}` (which appeared in v01 bootstrap) is REMOVED — use `superseded-by-` or `resolved-` instead. v01 entries using `deprecated-` should migrate; no v01 entries currently use it.

### meta_mod_candidate validation against Locks 7/8/9 closures

The catalog's `meta_mod_candidate` field nominates patterns whose failure modes a future methodology mod could close. Lock 6 validates the bootstrap nominations against the actual Batch 3 Lock closures:

| Pattern | Bootstrap nomination | Batch 3 closure |
|---|---|---|
| PAT-RATER-PARENT-ONLY-SPAWN | Mod 13 (rater spawn discipline) | **Lock 7** Mod 13 Rule A — CLOSED at gate-5 (mm-d2r-code-plan-stack 8002025) |
| PAT-SUB-AGENT-SELF-RATING-RECURRENCE | Mod 13 | **Lock 7** Mod 13 Rule A — CLOSED |
| PAT-RATER-SILENT-FAILURE | Mod 13 + Mod 13 Rule B | **Lock 7** Mod 13 Rule B — CLOSED at gate-5 |
| PAT-CONVERGENCE-COUNTER-GAMING | Mod 14 (convergence-counter hardening) | **Lock 4** Mod 14 — CLOSED at gate-4 (mm-d2r-code-plan-stack 532f806) |
| PAT-DRR-DISCLOSURE-INLINE-REMEDIATION | A21 4th sub-shape | **Lock 3** Aspect 21 sub-shape #4 — CLOSED at /asae v07.1 (gate-4) |
| PAT-INHERITED-BRAND-DEBT | META-10 fork/rebrand sweep | **Lock 9** /rebrand-sweep + Fork_Origin_Catalog — CLOSED at gate-5 (canonical b62baee) + gate-6 first-run (canonical 209caf7) |
| (carry-marker discipline; no specific bootstrap pattern but implicit in PAT-DRR-CARRY-FORWARD-SEQUENCED) | Mod 15 carry-marker cluster schema | **Lock 8** Mod 15 — CLOSED at gate-9 (canonical 7c35b64) |

Patterns NOT yet closed by Batch 3:

- **PAT-ITERATIVE-HOOK-COMPLIANCE** — operational pattern (1-3 refuse-fix cycles per gate); Quickstart documents the expectation (gate-10) but no methodology mod removes it. Status remains `active`.
- **PAT-HOOK-COSMETIC-SHELL-BUG** — cosmetic; no methodology mod scoped.
- **PAT-ENUM-DRIFT-HOOK-VS-SKILL** — has `resolved-2026-04-26` status from CDCC v1.1.0 head 0c0029d closure; not Batch 3 specifically.
- **PAT-CLEAN-BATCH-IMPLEMENTATION** + **PAT-RATER-EXEMPLAR-BRIEF** + **PAT-HOOK-REAL-TIME-COMPLIANCE-CATCH** — positive-case patterns; not closed (they're exemplars to preserve, not failures to eliminate).

### Catalog cross-references (locked artifacts)

Lock 6 establishes the cross-reference network this catalog participates in:

| Direction | Artifact |
|---|---|
| FROM catalog → /asae | Aspect 21 DRR sub-shapes (PAT-DRR-* patterns); Lock 4 hardening (PAT-CONVERGENCE-COUNTER-GAMING); Lock 7 (PAT-RATER-* patterns) |
| FROM catalog → Carry_Marker_Convention | PAT-DRR-CARRY-FORWARD + PAT-DRR-CARRY-FORWARD-SEQUENCED reference convention |
| FROM catalog → Fork_Origin_Catalog | PAT-INHERITED-BRAND-DEBT references Fork_Origin_Catalog entries |
| FROM /asae → catalog | Lock 4 hardening cross-references PAT-CONVERGENCE-COUNTER-GAMING; Lock 7 cross-references PAT-RATER-PARENT-ONLY-SPAWN + PAT-SUB-AGENT-SELF-RATING-RECURRENCE + PAT-RATER-SILENT-FAILURE |
| FROM /rebrand-sweep skill → catalog | Cross-references PAT-INHERITED-BRAND-DEBT |
| FROM Carry_Marker_Convention → catalog | DRR sub-shape relationship table cites PAT-DRR-CARRY-FORWARD + PAT-DRR-CARRY-FORWARD-SEQUENCED |

When new patterns are added, add bidirectional cross-references where applicable.

### Honest gaps in this governance lock

1. **Catalog v01 has 16 entries; small sample size.** Severity thresholds + frequency notation are heuristic at v01; future v02 may calibrate from production data after more builds yield EE-* entries.
2. **No automated cross-reference consistency check.** If pattern X references pattern Y, no machine verification that Y also references X coherently. Manual auditor responsibility.
3. **deprecated- → superseded-/resolved- migration** for any future use of deprecated- not yet automated; manual transition.
4. **meta_mod_candidate validation is point-in-time (Batch 3).** Future Batches may close additional patterns; table needs maintenance commits.
5. **Single-thread Lock 6 governance authoring.** Cross-thread independent verification deferred to future cross-thread rater pairs.

---

## Schema decisions and provenance notes

1. **Schema compliance:** All entries use Lock 6 minimal-required (`id`, `description`, `observed_in`) + optional rich (`taxonomy`, `severity`, `frequency`, `mitigations`, `related_patterns`) + the optional top-level `status` field added per cross-thread agreement 2026-04-28.
2. **Observed_in references:** All resolve to EE-* entries in `Empirical_Evidence_SSOT_FM_DRR_ASAE_2026-04-27_v01_I.md` (currently in `_grand_repo/.claude/scratch/market-research-2026-04-26/` — migration to canonical mm-claude-canonical pending).
3. **Pre-publication scrub:** This catalog is INTERNAL ONLY. References to specific build labels (CDCC, CC, ORCH, CCC, SG) and commit hashes must be reviewed before any external citation. The Pattern Catalog may be more sensitive than the EE-* SSOT it summarizes.
4. **Cascade impact:** Downstream consumers that cite EE-* entries directly are encouraged to add an alternate-citation pointer (`or PAT-{name}`) at next touch for cross-referencing. No urgent cascade required.

## Status

`active (v01_I)` — bootstrap fold-in landed in inaugural commit 2026-04-28. Catalog is open for ongoing pattern contribution as new builds yield new EE-* SSOT entries. Schema-touching edits should coordinate with the SSOT-wrangler thread; routine pattern additions can land via direct edit with clear commit-message convention (`Add PAT-{name} from EE-{ref}`).
