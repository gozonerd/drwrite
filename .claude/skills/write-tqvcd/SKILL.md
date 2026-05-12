---
name: write-tqvcd
description: "Use this skill to author a Test Quality + Verification Coverage Document as a prerequisite input to /dare-to-rise-code-plan. Triggers on: '/write-tqvcd', 'write-tqvcd', 'author a TQVCD', 'write a test quality and verification coverage document', 'generate TQVCD', 'draft TQVCD'. Requires a completed PRD + TRD as inputs. Loads the TQVCD template (v06_I per 2026-05-05 D2R Accessibility Floor Update — §6 expanded from WCAG 2.1 AA legal-floor-only to legal-floor PLUS lived-floor: cognitive ADHD-conscious design / reading dyslexia-conscious typography / vision user-controlled theme toggle). Walks the user through each required section applying the Verification-Coverage Principle (§5.0 headline metric: behaviors-verified / behaviors-claimed) + the Testing Taxonomy's 20 test categories + 39 stress categories + AI-driven selection strategy + the §5.4 banned-phrase list for user-facing copy + the §6 expanded accessibility floor (§6.1 legal + §6.5/§6.6/§6.7 lived + §6.8 mandatory cross-cut entries + §6.9 refusal table). Produces a validated filled-in instance. Renamed from /write-tqcd per Methodology Mods Batch 1 Mod 6.5 (TQCD→TQVCD full rename, 2026-04-27)."
---

# Write TQVCD

## Purpose

Author a Test Quality + Verification Coverage Document from the reusable template. Produces a filled-in TQVCD instance ready to serve as a prerequisite input to `/dare-to-rise-code-plan`.

The TQVCD is the OPERATIONALIZATION of verification (NOT just coverage) for the project. It converts the TRD's non-functional requirements and applicable standards into measurable exit criteria, AND it makes the load-bearing headline metric explicit: **behaviors-verified / behaviors-claimed** (§5.0). Coverage % is preserved as an internal CI metric (§5.1) but is never the user-facing headline. Stage 01 of D2R reads the TQVCD and designs QA FIRST before any implementation stages.

This skill renamed from `/write-tqcd` on 2026-04-27 per Mod 6.5 of Methodology Mods Batch 1. The prior name "Testing & Quality Criteria Document" framed "coverage" as the criterion; the new name "Test Quality + Verification Coverage Document" reframes around the Verification-Coverage Principle codified in `/asae SKILL.md` Section 0 (v07): ASAE measures verification, not passing.

## When to Use

- When `/ideate-to-d2r-ready` invokes this skill as Phase 01 Step 01.4 (usual orchestrated entry point)
- When the user invokes `/write-tqvcd` standalone (PRD + TRD already authored and approved)
- When `/dare-to-rise-code-plan` detects a missing TQVCD prerequisite
- When preparing inputs for an experimental D2R run
- The legacy trigger `/write-tqcd` is deprecated as of 2026-04-27 per Mod 6.5 full-rename discipline; users invoking the legacy trigger should be redirected to `/write-tqvcd`

## Inputs

- **Project name** — required
- **Project prefix** — required
- **PRD reference** — required
- **TRD reference** — required
- **AVD reference** — optional (recommended if AVD exists; pass the Skipped-Status file path if AVD was skipped)
- **Existing TQVCD draft** — optional
- **Invocation context** — optional marker: `called from /ideate-to-d2r-ready Phase 01 Step 01.4`, `called from /dare-to-rise-code-plan`, or `standalone` (default). Governs handoff behavior on approval.
- **Remediation target** — optional; a specific section identifier when invoked by `/ideate-to-d2r-ready` Phase 02 to remediate a cross-doc finding. In remediation mode, skip to Step 3 for that section only, then Step 6.

## Execution Protocol

### Step 1: Verify Prerequisites And Check Invocation Mode

PRD and TRD must exist and be approved. If either missing, refuse to proceed and offer `/ideate-to-d2r-ready` for the full four-doc flow or the appropriate individual authorship skill.

Read PRD, TRD, and AVD (if exists). Cache key facts: non-functional requirements (TRD Section 3), applicable standards (TRD Sections 3.3 / 3.4 / 3.5), constraints (TRD Section 6), platform targets.

Additionally cache counts for Step 5.2 cross-reference: TRD FR count, TRD BR count, PRD user-journey count.

Check the invocation context:

- **Orchestrated mode** (`called from /ideate-to-d2r-ready`): PRD + TRD (+ AVD) paths were passed in. Proceed directly. On approval in Step 7, return a structured handoff block instead of next-step guidance.
- **Remediation mode** (remediation target specified): read the existing TQVCD, identify the target section, route to Step 3 for that section only, then Step 6.
- **Standalone mode** (default): proceed with the user-facing protocol.

### Step 2: Load Template And Reference Taxonomy

Read `.claude/skills/dare-to-rise-code-plan/references/TQVCD_Template_2026-05-05_v06_I.md` and the Software Testing Taxonomy at `.claude/skills/dare-to-rise-code-plan/references/Software_Testing_Taxonomy_2026-04-17_v01_I.md`. (v06_I supersedes v05_I per the 2026-05-05 D2R Accessibility Floor Update — §6 expanded to codify the LIVED floor alongside the legal WCAG 2.1 AA floor.)

### Step 3: Gather Required Content

Walk through each required section. Testing Taxonomy applicability is the largest section and requires per-category evaluation. **§5.0 Verification Coverage Headline Metric is the load-bearing new section per Mod 6.5; do not skip its walkthrough.**

Required sections:
1. Document Identity (PRD/TRD/AVD references, revisions)
2. **Testing Taxonomy Applicability** — per-category YES/NO with exit criteria or skip reason. Cover all 20 test categories (Part 1) and apply AI-driven selection to all 39 stress categories (Part 2). **v06 note:** TQVCD-TC-14 (Accessibility Tests) exit criteria now require LIVED-floor coverage per §6.5/§6.6/§6.7, not just WCAG 2.1 AA legal floor.
3. Standards Operationalized As Exit Criteria (from TRD-applicable standards, converted to measurable criteria with verification methods)
4. Benchmarks With Target Scores
5. **Verification Coverage + Coverage Floors** — see Step 3a walkthrough below; this section's load-bearing change in v04 is §5.0 (headline metric) + §5.4 (banned-phrase list — v06 extends list with `fully accessible` / `WCAG-compliant` qualitative claims requiring scoped disclosure)
6. **Accessibility Criteria — Legal Floor + Lived Floor (NEW v06 expansion):** §6.1-§6.4 Legal floor (WCAG 2.1 AA hardwired) + §6.5 Cognitive accessibility (TQVCD-EC-Access-Cog-01..04: zen-focus / no-unsolicited-modal / cognitive-load-aware-defaults / friction-at-entry-minimized) + §6.6 Reading accessibility (TQVCD-EC-Access-Read-01..04: at-least-one dyslexic-friendly font / tunable type / code-surfaces-excluded / persistence) + §6.7 Vision accessibility (TQVCD-EC-Access-Vis-01..04: theme-toggle MANDATORY / both-themes-WCAG-AA / persistence / no-surprise-re-themes) + §6.8 Mandatory test-category cross-cut entries (visual-rendering both-themes; interaction theme-toggle/modal-firing/font-swap; accessibility-cross-cut dyslexic-font/theme-persists/aXe-both) + §6.9 Refusal table at gate. See Step 3b walkthrough below.
7. Performance Budgets (from TRD Section 3.1)
8. Security Quality Gates (pre-commit / CI / pre-deploy per TRD Section 3.3)
9. Quality Review Gates (code review, ASAE gate thresholds per stage type)
10. Open Quality Questions
11. Stakeholder Approvals

### Step 3a: Walk Through §5.0 Verification Coverage Headline Metric (NEW v04)

**This step is load-bearing for the Verification-Coverage Principle codified in `/asae SKILL.md` Section 0 (v07).** Do not auto-fill; walk through with the user.

**Procedure:**

1. **Enumerate `behaviors-claimed`** by sweeping every user-facing claim source:
   - PRD User Journeys (each UJ → 1+ behavior claims)
   - PRD Acceptance Criteria (each AC → 1 behavior claim)
   - TRD Functional Requirements (each FR → 1+ behavior claims)
   - TRD Non-Functional Requirements with measurable acceptance (e.g., "p95 < 250ms" is a claim)
   - README claims (e.g., "works offline", "AES-256 at rest", "no telemetry")
   - SECURITY.md claims (every security control mentioned is a claim)
   - Marketing pages / landing pages (every capability advertised is a claim)
   - LAUNCH/READINESS docs (every readiness assertion is a claim)
   - Each claim becomes one row in the §5.0 traceability table

2. **For each claim, identify or design the `mutation_killing_test`** — a test that fails when the claim breaks. Apply the falsification check:
   - "Search returns within 250ms at p95" → `tests/perf/search-p95.k6.js` would fail if the threshold were mutated to 1ms
   - "AES-256 encryption at rest" → `tests/security/encryption-at-rest.test.ts` would fail if the SQLCipher flag were swapped to plain SQLite
   - "Works offline" → `tests/integration/offline-mode.spec.ts` would fail if a network-dependent fetch were re-introduced
   - If no mutation-killing test exists for a claim, the claim is a fabrication risk; either author the test, retract the claim, or document as an honest gap with `disclosures.compliance_claims` block referencing the gap

3. **Verify `tautology_check`** for each test. Apply the test-tautology-bans catalog at `_grand_repo/docs/test-tautology-bans.md`:
   - `expect(true).toBe(true)` → tautology, FAIL
   - Component test that mocks the entire data layer + asserts mocked literal renders → tautology, FAIL
   - Mutation test that excludes every load-bearing module → tautology, FAIL
   - The test must fail when the behavior breaks, not when the test runner runs

4. **Compute `behaviors-verified / behaviors-claimed` ratio** at draft time and record in §5.0. Target: 1.0 at production-ready milestone. Below 1.0 ratios are honest-gap disclosures, not failures — the §5.0 ratio is the structural-honesty metric, not the perfection metric.

5. **Cross-reference §5.0 with `disclosures.coverage_mutation_scope`** (per /asae A11.NEW-3 / Mod 3) if user-facing copy mentions any coverage % or mutation score. The TQVCD-EXCLUSION sections referenced from `disclosures.coverage_mutation_scope.coverage.excluded_paths_documented_at` and `disclosures.coverage_mutation_scope.mutation.excluded_paths_documented_at` must enumerate per-path exclusion rationale; drift between TQVCD-documented exclusions and tool config exclusions is a refuse-grade audit finding.

6. **Run §5.4 banned-phrase scan** against all user-facing copy files (README, SECURITY.md, marketing pages, landing pages, LAUNCH/READINESS docs). Refuse banned phrases ("100% test coverage", "complete test coverage", "X tests passing", "comprehensive test suite", "production-grade testing", "fully tested", "thoroughly tested", "battle-tested", "X% mutation score" without honest-scope disclosure) unless one of the three exemption paths applies (populated `disclosures.coverage_mutation_scope` block, replacement with allowed phrasing, or per-claim `// metric-allowed: <rationale>` comment with valid disclosure reference). Hook v07 Tier 17 enforces refusal at commit time; this walkthrough catches violations BEFORE commit.

7. **Populate `production_pattern` field for every TQVCD-VC entry** (NEW v05 per Mod 8.1 of Methodology Mods Batch 2). For each TQVCD-VC row in §5.0, populate `production_pattern` field with one of:
   - **Canonical catalog id** from `_grand_repo/docs/Production_Pattern_Catalog_2026-04-27_v01_I.md` (preferred): e.g., `PAT-CONCURRENCY-LOCKFILE-SKIP`, `PAT-LATENCY-INJECTION-UPSTREAM-TIMEOUT`, etc.
   - **Inline `production_pattern_inline` block** (when no catalog pattern fits AND project hasn't yet promoted): includes description / input_load_sequence / detection_signature / candidate_for_catalog_promotion fields
   - **`PAT-GENERIC-NO-PRODUCTION-SHAPE` marker** with rationale (only when behavior genuinely has no production shape — build-config integrity, type-system tests, lint checks)
   This field is the structural linkage TQVCD ↔ PSCAD (the 6th D2R doc, per Mod 8). PSCAD §4 coverage matrix references TQVCD-VC entries by `entry_id`; the `production_pattern` field tells PSCAD which production patterns each TQVCD-VC's test exercises. /write-pscad Step 3a-3b consumes this field directly. Skipping this step returns to the pre-Mod-8 failure mode where pattern-space coverage was invisible (CDCC plugin Stage 05 lockfile skip — passed under tested load, would deviate under production concurrency; tests didn't fail because production-shaped concurrency wasn't applied).

The §5.0 walkthrough is mandatory for every TQVCD authorship; skipping it returns to the pre-Mod-6.5 failure mode (CDCC plugin shipped "100/100/100/100" with mutation scope carved to exclude every load-bearing module; claude-cost shipped "Stryker mutation testing" with Stryker not installed). The Verification-Coverage Principle gives the discipline teeth; §5.0 is where the teeth bite. Step 7 (production_pattern) gives PSCAD the structural linkage to audit pattern-space coverage as a separate axis.

### Step 3b: Walk Through §6 Accessibility Floor — Legal + Lived (NEW v06)

**This step is load-bearing for the lived-floor accessibility codified per the 2026-05-05 D2R Accessibility Floor Update.** Do not auto-fill; walk through with the user.

**Procedure:**

1. **§6.1 Legal floor (WCAG 2.1 AA hardwired) — confirm baseline.** Verify §6.1 target compliance is set to WCAG 2.1 AA minimum (continues hardwired); §6.2 automated testing tool declared (axe-core via Playwright is default); §6.3 manual testing protocol declared; §6.4 per-stage exit criteria (TQVCD-EC-Access-NN) populated.

2. **§6.5 Cognitive floor (LIVED, NEW v06).** For apps where users do focused work (writing, reading, coding, planning) — walk through TQVCD-EC-Access-Cog-01..04:
   - **Cog-01 Zen-focus default** — verify UXD §1.1 reference apps + §1.3 polish criteria support a chrome-quietness review path; populate test/review path
   - **Cog-02 No unsolicited modal interruption** — design an interaction test that injects controlled timer events and asserts no modal fires absent user action; populate test path
   - **Cog-03 Cognitive-load-aware defaults** — design a first-launch flow review (user opens app, can do primary task with zero configuration); populate review path
   - **Cog-04 Friction-at-entry minimized** — design a per-build performance test for time-to-first-productive-action p95; populate test path; cross-reference PRD §1.4 non-visual excellence anchors for the specific bound
   - NA only valid when product genuinely has no focused-work surface; explicit product-domain rationale required (per §6.9 refusal table — silent NA refuses at MEDIUM-strict)

3. **§6.6 Reading floor (LIVED, NEW v06).** For apps with rich-text/WYSIWYG/prose-rendering/document-viewer surfaces — walk through TQVCD-EC-Access-Read-01..04:
   - **Read-01 Dyslexic-friendly typography option** — confirm UXD §5.6 picked at least one from candidate set (Lexend / OpenDyslexic / Atkinson Hyperlegible — all free, OFL); populate accessibility-cross-cut test verifying font option present + swappable
   - **Read-02 Tunable letter-spacing/line-height/paragraph-width** — populate test verifying user override paths work
   - **Read-03 Code surfaces excluded from font swap** — populate test asserting code blocks retain monospace; rationale = code semantics depend on monospace alignment
   - **Read-04 Font option persists** — populate accessibility-cross-cut test (select dyslexic-font; reload; assert selection retained)
   - NA only valid when product has no rich-text/WYSIWYG/prose surface (e.g., CLI-only tool, numeric dashboard); explicit product-domain rationale required

4. **§6.7 Vision floor (LIVED, NEW v06; HIGHEST-SEVERITY refusal class).** For apps with significant text content — walk through TQVCD-EC-Access-Vis-01..04:
   - **Vis-01 Theme toggle MANDATORY** — confirm UXD §3.5 specifies user-controlled toggle (not just system-follow); REFUSE at HIGH severity if "system-follow only" proposed
   - **Vis-02 Both themes WCAG 2.1 AA contrast** — populate test running automated accessibility tool (axe-core / Lighthouse / equivalent) in EACH theme separately; manual contrast review for any custom-rendered text in BOTH themes; REFUSE at CRITICAL severity if test plan covers one theme only
   - **Vis-03 Theme persistence** — populate test verifying user's theme choice persists across sessions
   - **Vis-04 No surprise re-themes** — populate test verifying app does not auto-switch themes mid-session (excluding system-follow mode)
   - NA only valid when product has no significant text content (e.g., webcam-only video chat); explicit product-domain rationale required

5. **§6.8 Mandatory test-category cross-cut entries.** Verify the following entries exist as TQVCD-VC rows in §5.0 traceability table per Mod 8 schema:
   - `visual-rendering` category: both-themes pass automated contrast checks
   - `interaction` category: theme-toggle correctness; modal-firing discipline; font-option swap correctness
   - `accessibility-cross-cut` category: dyslexic-font option present + persists; theme persists; both themes pass aXe equivalent
   - Per TTB-discipline (test-tautology-bans), each new mandatory test must NOT be tautological per TTB-01..08; mutating the underlying behavior MUST fail the test

6. **§6.9 Refusal table audit.** Walk the §6.9 refusal table conditions and verify none apply to this TQVCD instance OR all applicable ones are remediated:
   - TQVCD that tests one theme but not both → CRITICAL refusal
   - UXD that omits dyslexic-font option for WYSIWYG/rich-text apps → HIGH refusal
   - App / PRD / TRD that assumes system-follow is sufficient substitute for user-controlled theme toggle → HIGH refusal
   - Stage 00 research that does not include accessibility-research track covering §6.5/§6.6/§6.7 → HIGH refusal
   - TQVCD with only "WCAG 2.1 AA" as accessibility scope (no cognitive/reading/vision-specific tests) → HIGH refusal
   - Any of TQVCD-EC-Access-Cog-01..04 / Read-01..04 / Vis-01..04 marked NA without explicit rationale tied to product domain → MEDIUM-strict refusal

7. **Cross-reference with UXD §3.5 + §5.5/§5.6/§5.7.** TQVCD §6.5/§6.6/§6.7 test entries should each map to a UXD §3.5/§5.5/§5.6/§5.7 design specification. The accessibility lived-floor chain (UXD ↔ TQVCD ↔ TRD) is audited at /ideate-to-d2r-ready Phase 02; missing legs are findings at HIGH severity.

The §6 walkthrough is mandatory for every TQVCD authorship; skipping it produces TQVCDs that satisfy the legal floor only and refuses at the §6.9 lived-floor refusal table. Per the larger principle codified in this update: accessibility floor = legal floor + lived floor. Both are mandatory for D2R-grade software targeting daily-driver-instrument use.

### Step 4: Apply AI-Driven Selection To Stress Categories

For each of the 39 stress test categories, apply the selection rule from the Testing Taxonomy Part 3:

For each category:
- Does this system have the component this test targets?
- Is failure in this component high-severity for this use case?
- Is this failure mode plausible given actual usage patterns?

If yes to all three: include with target scenario. If no to any: skip with specific reason (not "not applicable" — a specific reason).

### Step 5: Declare ASAE Thresholds Per Stage

Per the current D2R skill stage structure, the default ASAE Certainty Thresholds are:

- Stage 00 (research): 2
- Stage 01a (skeleton authorship): 2
- Stage 01b (full plan authorship): 3
- Stage 02 (project scaffold, Sonnet): 3
- Stage 03+ (feature implementation, Haiku): 3
- Stage QA (convergence loop): 5

Default behavior: author TQVCD Section 9.2 with these values exactly. These defaults are what `/ideate-to-d2r-ready` Phase 02 checks for alignment.

**Deviation rule:** if the user wants a different threshold for any stage, do NOT silently edit it in. Ask for rationale, then record BOTH the declared threshold AND the rationale in Section 9.2 under a "Deviations from defaults" subsection. The orchestrator's Phase 3 cross-doc audit treats an undocumented deviation as a finding.

Declare severity policy: `strict` for regulated domains, published research, production code in high-stakes contexts. `standard` otherwise.

**In addition**, when authoring Section 5.2 Test Coverage Beyond Code, explicitly state the counts cached in Step 1:

- "Every TRD FR (count: N) has at least one test"
- "Every TRD BR (count: M) has at least one test"
- "Every PRD user journey (count: K) has at least one E2E test"

Stating the counts explicitly makes the orchestrator's Phase 3 coverage-alignment check mechanical rather than inferential.

### Step 6: Run ASAE Gate On Draft

Invoke `/asae` with:
- target: TQVCD draft
- sources: template + Taxonomy + PRD + TRD + AVD (if exists) + user inputs
- prompt: "Author a TQVCD for [project name] per the template"
- domain: `document`
- asae_certainty_threshold: 2
- severity_policy: standard

Domain-specific checks for TQVCD:
- Testing Taxonomy applicability declared for all 20 test categories
- All 39 stress categories evaluated via AI-driven selection (included or skipped with reason)
- Every YES category has specific exit criteria (not "follow best practices")
- Every NO category has specific skip reason
- Standards operationalized with measurable exit criteria + verification methods
- Coverage floors declared (100% line + branch per D2R hardwired requirement; exceptions documented)
- **§6 Accessibility floor — LEGAL + LIVED (per v06 expansion):**
  - §6.1-§6.4 Legal floor (WCAG 2.1 AA) operationalized with specific TQVCD-EC-Access-NN entries + tools + protocols + both-themes-pass per §6.7
  - §6.5 Cognitive (TQVCD-EC-Access-Cog-01..04) populated OR explicit NA-with-product-domain-rationale
  - §6.6 Reading (TQVCD-EC-Access-Read-01..04) populated OR explicit NA-with-no-rich-text-surface-rationale
  - §6.7 Vision (TQVCD-EC-Access-Vis-01..04) populated OR explicit NA-with-no-significant-text-content-rationale
  - §6.8 Mandatory test-category cross-cut entries present in `visual-rendering` + `interaction` + `accessibility-cross-cut`
  - §6.9 Refusal table conditions audited with none present in this TQVCD instance
- Performance budgets measurable
- ASAE thresholds declared per stage type
- Severity policy declared

### Step 7: Save, Present, Approve

Filename: `[ProjectPrefix]_TQVCD_[YYYY-MM-DD]_v01_I.md`
Save to planning directory.

Present for approval. On `✓`: mark approved.

- **Orchestrated mode**: return a structured handoff block to the caller with `{status: approved, path: [TQVCD path], project_name, project_prefix, planning_directory, prd_path, trd_path, avd_path, threshold_deviations: [list or none]}`. Do not emit next-step guidance — the orchestrator handles the next step.
- **Standalone mode**: inform user the TQVCD is ready for D2R consumption. Recommend `/ideate-to-d2r-ready` as the usual path for the full four-doc bundle.

## Portable Prompt Mode

Same pattern as other write-* skills. Note: the portable prompt for TQVCD must include the Testing Taxonomy INLINE (the full Part 1 + Part 2 + Part 3 content) so a receiving LLM has the reference material.

## Anti-Patterns

- Kitchen-sink listing all 20 test categories as applicable without evaluation (dilutes the QA spec)
- Applying every stress category without AI-driven selection (Stage QA becomes unmanageable)
- Adjective-based exit criteria ("thoroughly tested") instead of specific measurable criteria
- Leaving ASAE thresholds undeclared (Stage 01 can't configure gates without them)

## Related Skills

- `/ideate-to-d2r-ready` — usual entry point; orchestrates this skill along with `/write-prd`, `/write-trd`, `/write-avd` from an app idea through cross-doc audit to approved bundle
- `/write-prd` (must exist first)
- `/write-trd` (must exist first)
- `/write-avd` (recommended if exists)
- `/dare-to-rise-code-plan` (consumes TQVCD as primary QA-first input)
- `/asae` (used at Step 6)

## Related References

- Template: `.claude/skills/dare-to-rise-code-plan/references/TQVCD_Template_2026-05-05_v06_I.md` (v06_I supersedes v05_I per 2026-05-05 D2R Accessibility Floor Update — §6 expanded to legal + lived floor)
- Taxonomy: `.claude/skills/dare-to-rise-code-plan/references/Software_Testing_Taxonomy_2026-04-17_v01_I.md`
- Companion UXD template: `.claude/skills/dare-to-rise-code-plan/references/UXD_Template_2026-05-05_v03_I.md` (v03_I §5.5/§5.6/§5.7 lived-floor design specs that this TQVCD §6.5/§6.6/§6.7 operationalizes as test entries)
