---
name: write-pscad
description: "Use this skill to author a Pattern-Space Coverage Audit Document as the 6th D2R prerequisite input to /dare-to-rise-code-plan. Triggers on: '/write-pscad', 'write-pscad', 'author a PSCAD', 'write a pattern-space coverage audit document', 'generate PSCAD', 'draft PSCAD'. Requires a completed PRD + TRD + TQVCD as inputs (PSCAD audits TQVCD's verification coverage from the pattern-space angle). Loads the PSCAD template + Production Pattern Catalog, walks the user through pattern-space coverage analysis: which production patterns are in scope, which TQVCD-VC entries cover them, which patterns are gap (no covering test), what remediation closes each gap. Produces a validated filled-in instance ready for D2R consumption. PSCAD is the 6th sibling D2R doc joining PRD/TRD/AVD/TQVCD/UXD per Methodology Mods Batch 2 Mod 8."
---

<!-- v03: L7 anti-pattern pointer + Step-0 read + template pointer fix (FORK-A Stage 8) -->

# Write PSCAD

## Dispatch Tier

This `/write-pscad` authoring task is **closed-world** (dispatched per LEAD §5.3 world-openness criteria; closed-world authorship tier).

## Purpose

Author a Pattern-Space Coverage Audit Document from the reusable template. Produces a filled-in PSCAD instance ready to serve as the 6th prerequisite input to `/dare-to-rise-code-plan`.

The PSCAD audits PATTERN-SPACE coverage — a structurally separate axis from code coverage (TQVCD §5.1 internal CI metric) and verification coverage (TQVCD §5.0 behaviors-verified / behaviors-claimed). PSCAD asks: **what production input/load/sequence patterns are NOT covered by any test in TQVCD?**

PSCAD is authored DELIBERATELY AFTER TQVCD (per `/ideate-to-d2r-ready` Phase 01 Step 01.6, after TQVCD landed at Step 01.4). The gap between TQVCD-author time and PSCAD-author time simulates "production memory accumulating since the code was tested." This delay is structural, not accidental: PSCAD's value is that the author is in a different head-state from TQVCD-author and notices patterns the test surface didn't apply.

Empirically motivated by CDCC plugin Stage 05 proper-lockfile skip: passed under tested load, would deviate under production concurrency. The test surface ran tests but didn't apply production-shaped concurrency patterns. Pattern-space coverage was zero for that pattern class even though code coverage was high. PSCAD makes pattern-space coverage a structurally separate, adversarially-disciplined audit.

## When to Use

- When `/ideate-to-d2r-ready` invokes this skill as Phase 01 Step 01.6 (usual orchestrated entry point — the 6th and final document in the D2R bundle authorship sequence)
- When the user invokes `/write-pscad` standalone (PRD + TRD + TQVCD already authored and approved)
- When `/dare-to-rise-code-plan` detects a missing PSCAD prerequisite
- When preparing inputs for an experimental D2R run

## Inputs

- **Project name** — required
- **Project prefix** — required
- **PRD reference** — required
- **TRD reference** — required
- **AVD reference** — optional (recommended if AVD exists; pass the Skipped-Status file path if AVD was skipped)
- **TQVCD reference** — required (PSCAD audits TQVCD's coverage; PSCAD-PAT entries reference TQVCD-VC entries by ID)
- **UXD reference** — optional (for cross-doc alignment-chain verification)
- **Existing PSCAD draft** — optional
- **Invocation context** — optional marker: `called from /ideate-to-d2r-ready Phase 01 Step 01.6`, `called from /dare-to-rise-code-plan`, or `standalone` (default). Governs handoff behavior on approval.
- **Remediation target** — optional; a specific section identifier when invoked by `/ideate-to-d2r-ready` Phase 02 to remediate a cross-doc finding. In remediation mode, skip to Step 3 for that section only, then Step 7.

## Execution Protocol

### Step 0: Required Pre-Authoring Read

Before doing anything else, read `references/anti-patterns/PSCAD_AntiPatterns_2026-07-06_v01_I.md` (relative to the `dare-to-rise-code-plan` skill directory). This is a REQUIRED read before authoring — it carries the full rationale and fix for every known PSCAD failure mode. Do not proceed to Step 1 until it has been read.

### Step 1: Verify Prerequisites And Check Invocation Mode

PRD + TRD + TQVCD must exist and be approved. If any missing, refuse to proceed and offer `/ideate-to-d2r-ready` for the full six-doc flow or the appropriate individual authorship skill.

Read PRD, TRD, AVD (if exists), TQVCD, UXD (if exists). Cache key facts:
- PRD §6 operational constraints + PRD §1.1 user model (drives PSCAD §2 production conditions)
- TRD §3.1 perf budgets + TRD §3.2 reliability requirements (drives PSCAD §2 condition thresholds)
- AVD §3-4 architecture (drives plausibility check for PSCAD §2 conditions)
- TQVCD §5.0 traceability table (drives PSCAD §4 coverage matrix; every PSCAD-CC references a TQVCD-VC by ID)

Additionally cache count for Step 5.4 cross-reference: TQVCD §5.0 row count.

Check the invocation context:

- **Orchestrated mode** (`called from /ideate-to-d2r-ready`): all 5 prerequisite paths were passed in. Proceed directly. On approval in Step 7, return a structured handoff block instead of next-step guidance.
- **Remediation mode** (remediation target specified): read the existing PSCAD, identify the target section, route to Step 3 for that section only, then Step 7.
- **Standalone mode** (default): proceed with the user-facing protocol.

### Step 2: Load Template And Pattern Catalog

Read `.claude/skills/dare-to-rise-code-plan/references/PSCAD_Template_2026-04-27_v01_I.md` and the canonical Production Pattern Catalog at `_grand_repo/docs/Production_Pattern_Catalog_2026-04-27_v01_I.md`.

The template defines the 11-section structure. The catalog defines the canonical pattern set; PSCAD-PAT entries reference catalog patterns by id (`PAT-CONCURRENCY-LOCKFILE-SKIP`, etc.) OR mark themselves as "candidate for catalog promotion" if the pattern is novel to this project.

### Step 3: Gather Required Content

Walk through each required section. **§3 Patterns In Scope and §5 Gaps Identified are load-bearing per Mod 8; do not skip their walkthroughs (Step 3a + Step 3b below).**

Required sections:
1. Document Identity (PRD/TRD/AVD/TQVCD/UXD references; catalog reference; revisions)
2. **Audit Scope** — production conditions in scope (concurrency / volume / sequence / resource pressure / latency / failure injection) + out of scope with empirical narrowing reasons
3. **Patterns In Scope** — see Step 3a walkthrough; per-pattern catalog reference + description + detection signature + coverage status
4. **Coverage Matrix** — see Step 3b walkthrough; per PSCAD-CC links pattern to TQVCD-VC with non-tautological coverage rationale
5. **Gaps Identified** — see Step 3b walkthrough; per PSCAD-GAP enumerates not-covered patterns with severity + empirical evidence + honest-gap acknowledgment
6. **Remediation Plans** — per PSCAD-REM closes each gap via add_test / add_test_with_pattern_param / accept_gap_disclose / revise_pattern_scope
7. ASAE Gate Configuration (PSCAD authorship gate threshold; per-stage re-audit threshold; Stage QA convergence threshold)
8. Catalog Promotion Protocol (mark candidate patterns; cascade per META-8)
9. Open Pattern Questions
10. Amendment Protocol (canonical text)
11. Stakeholder Approvals

### Step 3a: Walk Through §3 Patterns In Scope (LOAD-BEARING per Mod 8)

**This step walks through every pattern in the canonical catalog AND any project-specific candidate patterns the user surfaces.**

**Procedure:**

1. **For each pattern in the canonical catalog** (`_grand_repo/docs/Production_Pattern_Catalog_2026-04-27_v01_I.md`):
   - Apply the in-scope test: does this project's PRD §1.1 user model + TRD §3 architecture + AVD §3-4 deployment topology make this pattern PLAUSIBLE in production?
   - If yes: author a `### PSCAD-PAT-NN` entry with catalog reference, description, detection signature, and `coverage_status: TBD` (will be populated in Step 3b)
   - If no: do NOT author a PSCAD-PAT entry; document the narrowing reason in §2.2 production conditions out of scope

2. **Surface project-specific candidate patterns** by asking:
   - "What production input/load/sequence pattern would be most likely to cause unexpected behavior given this app's deployment context?"
   - "What patterns have been observed in similar Martinez Methods builds (CDCC plugin, claude-cost, orchestra, drwrite, the trio) that might apply here?"
   - "What patterns has the FAANG-principal adversarial-review precedent surfaced that this app should anticipate?"
   - For each surfaced pattern, mark as "candidate for catalog promotion" per §8 Catalog Promotion Protocol

3. **Codify-larger-principles discipline:** when in doubt about scope inclusion, default broader. A pattern unverified is the default; narrowing requires empirical reason. The catalog grows by inclusion-with-honest-empirical-count, not by inclusion-only-when-empirically-verified.

### Step 3b: Walk Through §4 Coverage Matrix + §5 Gaps + §6 Remediations (LOAD-BEARING per Mod 8)

**This step is the heart of the PSCAD audit.** For each PSCAD-PAT entry from Step 3a, determine coverage status against TQVCD §5.0:

**Procedure:**

1. **For each PSCAD-PAT entry**, scan TQVCD §5.0 traceability table for any TQVCD-VC entry whose `mutation_killing_test` actually exercises this pattern:
   - The test must apply the production-shaped condition the pattern represents (not just call the function the pattern would affect)
   - The test must verify the detection signature from PSCAD-PAT (e.g., for PAT-CONCURRENCY-LOCKFILE-SKIP, the test must spawn N concurrent acquirers and assert that the retry/backoff path fires)
   - The test must apply production-realistic parameter values (not just N=2 for a pattern where production is N=10+)

2. **Author PSCAD-CC entries** for every covered pattern with non-tautological coverage rationale:
   - "TQVCD-VC-04 tests `lock_acquire()`" is INSUFFICIENT (tautological — code-coverage rationale, not pattern-space rationale)
   - "TQVCD-VC-04's test applies N=10 concurrent `lock_acquire()` calls and asserts that exactly one succeeds while the others retry per PAT-CONCURRENCY-LOCKFILE-SKIP detection signature" is SUFFICIENT (production-shaped condition + detection signature both verified)

3. **Author PSCAD-GAP entries** for every PSCAD-PAT with `coverage_status: not_covered`:
   - Empirical reason for the gap (was pattern not anticipated at TQVCD-authoring time? was a test designed but not implemented? does the test apply non-production-realistic parameters?)
   - Severity assessment (CRITICAL / HIGH / MEDIUM / LOW based on failure mode if pattern fires unverified)
   - Empirical evidence (similar patterns surfaced in adversarial reviews / production incidents / prior post-mortems; mark "speculative" if no prior evidence)
   - Honest-gap acknowledgment (1-line summary suitable for `disclosures.compliance_claims` block in /asae frontmatter if gap relates to user-facing claim)

4. **Author PSCAD-REM entries** for every PSCAD-GAP:
   - Remediation type: `add_test` / `add_test_with_pattern_param` / `accept_gap_disclose` / `revise_pattern_scope`
   - `accept_gap_disclose` allowed only when severity ≤ MEDIUM AND honest-gap disclosure path exists per A11.NEW-1 / Mod 1; CRITICAL/HIGH gaps cannot be accepted
   - Concrete action (specific test / parameter modification / disclosure language / scope-revision rationale)
   - Owner stage assignment (Stage 02 / Stage 03+ / Stage QA)
   - TQVCD impact (whether remediation requires TQVCD §5.0 entry update)
   - Acceptance criteria (specific test result / disclosure presence / scope-revision approval that closes remediation)

5. **Cross-reference §4 PSCAD-CC + §5 PSCAD-GAP with `disclosures.compliance_claims`** in the consuming `/asae` gate frontmatter (per A11.NEW-1 / Mod 1) if any pattern relates to a user-facing claim.

The §3-§6 walkthrough is mandatory for every PSCAD authorship; skipping it returns to the pre-Mod-8 failure mode (CDCC plugin shipped passing tests under tested load that would deviate under production concurrency; pattern-space coverage was invisible because there was no audit surface for it). PSCAD makes pattern-space coverage structurally visible.

### Step 4: Verify TQVCD §5.0 Production_Pattern Field Linkage (LOAD-BEARING per Mod 8.1)

For each TQVCD-VC entry in TQVCD §5.0 traceability table, verify the `production_pattern` field is populated. The PSCAD authorship surface is the natural moment to verify this — every TQVCD-VC entry that doesn't yet have a `production_pattern` field is either:

(a) An entry that should reference a PSCAD-PAT id authored in Step 3a — flag for TQVCD §5.0 update
(b) An entry whose claim is so generic that no specific production pattern applies — author `production_pattern: PAT-GENERIC-NO-PRODUCTION-SHAPE` (or equivalent honest-gap marker) with rationale

If any TQVCD-VC entry remains without `production_pattern` post-PSCAD-authorship, this is a finding for the cross-doc audit at /ideate-to-d2r-ready Phase 02.

### Step 5: Declare ASAE Thresholds Per Stage

Per the current D2R stage structure, the default ASAE Certainty Thresholds for PSCAD gates are:

- PSCAD authorship gate (this skill's Step 7): 2 standard (matches TQVCD authorship gate threshold for sequencing parity)
- Per-stage coverage matrix re-audit (after each implementation stage commit): matches the Stage's `/asae` threshold (Stage 02+ = 3, Stage QA = 5)
- Stage QA convergence: 5 (matches TQVCD §9.2 Stage QA threshold)

Default behavior: author PSCAD §7 with these values exactly. These defaults are what `/ideate-to-d2r-ready` Phase 02 checks for alignment.

**Deviation rule:** if the user wants a different threshold for any stage, do NOT silently edit it in. Ask for rationale, then record BOTH the declared threshold AND the rationale in §7 under a "Deviations from defaults" subsection.

Declare severity policy: matches TQVCD severity policy (strict for regulated domains; standard otherwise).

### Step 6: Run ASAE Gate On Draft

Invoke `/asae` with:
- target: PSCAD draft
- sources: PSCAD template + Production Pattern Catalog + PRD + TRD + AVD (if exists) + TQVCD + UXD (if exists) + user inputs
- prompt: "Author a PSCAD for [project name] per the template + catalog"
- domain: `document`
- asae_certainty_threshold: 2
- severity_policy: standard

Domain-specific checks for PSCAD:
- §3 every catalog pattern in scope has a PSCAD-PAT entry
- §3 every project-specific candidate pattern marked for catalog promotion per §8
- §4 every PSCAD-CC has non-tautological coverage rationale (not "the function is tested" but "the test applies the production-shaped condition")
- §4 every PSCAD-CC's TQVCD-VC reference resolves to an actual entry in TQVCD §5.0
- §5 every PSCAD-PAT with `coverage_status: not_covered` has a PSCAD-GAP entry
- §6 every PSCAD-GAP has a PSCAD-REM entry (or accept_gap_disclose with disclosure path)
- §6 no CRITICAL or HIGH severity gap accepts via `accept_gap_disclose` (must remediate via add_test / add_test_with_pattern_param / revise_pattern_scope)
- §7 ASAE thresholds declared per stage type
- TQVCD §5.0 `production_pattern` field populated for every TQVCD-VC (or honest-gap marker authored)

### Step 7: Save, Present, Approve

Filename: `[ProjectPrefix]_PSCAD_[YYYY-MM-DD]_v01_I.md`
Save to planning directory.

Present for approval. On `✓`: mark approved.

- **Orchestrated mode**: return a structured handoff block to the caller with `{status: approved, path: [PSCAD path], project_name, project_prefix, planning_directory, prd_path, trd_path, avd_path, tqvcd_path, uxd_path, threshold_deviations: [list or none], pattern_promotion_candidates: [list or none], gaps_with_disclosure: [list or none]}`. Do not emit next-step guidance — the orchestrator handles the next step.
- **Standalone mode**: inform user the PSCAD is ready for D2R consumption. If any pattern_promotion_candidates exist, recommend a separate ASAE strict-3 catalog-promotion gate to add the new PAT-* entries to `_grand_repo/docs/Production_Pattern_Catalog_2026-04-27_v01_I.md`. Recommend `/ideate-to-d2r-ready` as the usual path for the full six-doc bundle.

## Portable Prompt Mode

Same pattern as other write-* skills. Note: the portable prompt for PSCAD must include the Production Pattern Catalog INLINE (the full catalog content) so a receiving LLM has the reference material; PSCAD-PAT entries reference catalog patterns by id.

## Anti-Patterns

Full anti-pattern catalog with rationale and fixes lives in `PSCAD_AntiPatterns_2026-07-06_v01_I.md` (references/anti-patterns/) — covers tautological coverage rationale, skipped catalog-promotion marking, improper accept-with-disclosure on CRITICAL/HIGH gaps, out-of-sequence authorship before TQVCD, unmotivated scope narrowing, collapsed same-day authorship, broken production_pattern linkage, unresolved coverage status, and remediation entries missing acceptance criteria. Read it before authoring (Step 0); this section is a pointer, not the full reference.

## Related Skills

- `/ideate-to-d2r-ready` — usual entry point; orchestrates this skill along with `/write-prd`, `/write-trd`, `/write-avd`, `/write-tqvcd`, `/write-uxd` from an app idea through cross-doc audit to approved 6-doc bundle
- `/write-prd` (must exist first)
- `/write-trd` (must exist first)
- `/write-avd` (recommended if exists)
- `/write-tqvcd` (must exist first; PSCAD audits TQVCD's verification coverage from pattern-space angle)
- `/write-uxd` (recommended; PSCAD §3 may reference UXD §3.2 state catalog for coverage of error-state patterns)
- `/dare-to-rise-code-plan` (consumes PSCAD as 6th prerequisite alongside other 5)
- `/asae` (used at Step 6)

## Related References

- Template: `.claude/skills/dare-to-rise-code-plan/references/PSCAD_Template_2026-04-27_v01_I.md`
- Anti-Patterns: `.claude/skills/dare-to-rise-code-plan/references/anti-patterns/PSCAD_AntiPatterns_2026-07-06_v01_I.md`
- Production Pattern Catalog (canonical): `_grand_repo/docs/Production_Pattern_Catalog_2026-04-27_v01_I.md`
- TQVCD Template (sibling; PSCAD audits TQVCD coverage): `.claude/skills/dare-to-rise-code-plan/references/TQVCD_Template_2026-05-05_v06_I.md` (v06_I supersedes v05_I per 2026-05-05 D2R Accessibility Floor Update — §6 expanded with lived-floor entries §6.5/§6.6/§6.7/§6.8/§6.9 that PSCAD §4 coverage matrix may need to audit alongside the existing §5.0 production_pattern entries)
- /asae SKILL.md (used at Step 6): `.claude/skills/asae/SKILL.md`
- Methodology Mods Batch 2 Handoff (Mod 8 lock-in source): `_grand_repo/.claude/scratch/remediation-plans-2026-04-27/Methodology_Mods_Batch2_Handoff_2026-04-27_v01_I.md`
