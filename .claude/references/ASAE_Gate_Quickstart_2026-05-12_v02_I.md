---
title: ASAE Gate Quickstart — Onboarding for New Threads
id: ASAE_Gate_Quickstart_2026-05-12
created: 2026-04-28
updated: 2026-05-12
version: v04_I
classification: INTERNAL ONLY
audience: martinez_methods_internal
classification_reason: Operational onboarding — eliminates inference-burden gap that surfaced during hook v05+ enforcement adoption; consumed by new threads bootstrapping into ASAE-gated repos.
authored_by: Clauda the Spec Genius v01 (Claude Opus 4.7, 1M context)
provenance: Methodology Mods Batch 3 Lock A1 (per Batch 3 Handoff §3); v02_I absorbs 6 SSOT-wrangler empirical-lessons amendments per gate-16/17/18 in mm-claude-canonical (Phase 9 + Phase I cluster execution 2026-04-30); v03_I absorbs 4 empirical-lessons amendments from gate-20 propagation infrastructure build (2026-05-11); v04_I absorbs 11 amendments from Calibration Inevitability v03 Wave 0 (8 gates across mm-claude-canonical + _grand_repo, 2026-05-06 through 2026-05-12) + 3 gate-25 empirical hook gotchas (2026-05-12)
v04_lineage: v01_I (2026-04-30) inaugural authoring → v02_I (2026-04-30) absorbs 6 SSOT-wrangler amendments → v03_I (2026-05-11) absorbs 4 gate-20 amendments → v04_I (2026-05-12) absorbs Wave 0 pre-author checklist + rater-dispatch protocol + audit-log structural requirements + forward-only-backfill + operational discipline + gate-25 hook format gotchas
sources:
  - Methodology_Mods_Batch3_Handoff_2026-04-28_v01_I.md (Lock A1 specification)
  - mm-d2r-code-plan-stack/skills/asae/SKILL.md (canonical /asae spec; First moves cross-reference)
  - mm-claude-canonical/.asae-policy + mm-d2r-code-plan-stack/.asae-policy (strict-5 + 2-rater audit_threshold lock)
  - mm-claude-canonical/hooks/commit-msg-v08 + commit-msg-v09 (enforcement layer Quickstart maps onto)
  - mm-claude-canonical/references/Persona_Design_Entry_Point_2026-04-28_v01_I.md (Lock A3 cross-reference)
  - SSOT-wrangler thread agitated-lalande-4d649d (original feedback driving Lock A1)
  - docs/ASAE_Quickstart_Additions_From_V03_Wave_0_2026-05-12_v01_I.md (Wave 0 proposal doc; 8 gates input)
  - deprecated/asae-logs/gate-25-methodology-backlog-canonical-move-2026-05-12.md (gate-25 hook gotcha evidence)
related_artifacts:
  - mm-d2r-code-plan-stack/skills/asae/SKILL.md
  - mm-claude-canonical/references/Persona_Design_Entry_Point_2026-04-28_v01_I.md
  - mm-claude-canonical/references/Carry_Marker_Convention_2026-04-28_v01_I.md
  - mm-claude-canonical/hooks/commit-msg-v09
  - (anti-fabrication discipline — not yet a standalone reference; principles documented inline in this Quickstart)
---

# ASAE Gate Quickstart

For new threads bootstrapping into ASAE-gated Martinez Methods repos. This is the doc to read FIRST when you're about to commit your first ASAE gate; it covers all hook prerequisites + canonical example pointers + procedural minutiae the inference-burden-of-just-reading-/asae-cold misses.

## v04_I empirical-lesson amendments (2026-05-12)

Eleven amendments absorbed from two sources: (a) Calibration Inevitability v03 Wave 0 proposal doc (8 gates across mm-claude-canonical + _grand_repo, 2026-05-06 through 2026-05-12), (b) gate-25 empirical hook gotchas (mm-claude-canonical, 2026-05-12).

1. **New: Pre-author verification checklist.** Eight-item checklist run BEFORE rater dispatch. Covers disk-resolve paths, grep canonical names, re-read canonical state, byte-fidelity verification, search-entire-block discipline, calibration-tier source tracing, cross-file consistency after remediation, frontmatter schema extension disclosure. Source: Wave 0 §1 (gate-23/24/60/61/79 evidence).

2. **Issues-found line must be BOLDED.** Each Pass block's `Issues found at CRITICAL: N / HIGH: N / ...` line requires a bold wrapper (`**...**`). Prior Quickstart examples omitted the bold. Source: gate-25.

3. **Rater section format tightened.** Heading: `## Independent Rater Verification — Rater N` (H2, em-dash, numbered suffix). Six field labels must be exact bold phrases — default /asae SKILL.md Step 6 output uses different labels; reformat before pasting. Source: gate-25.

4. **Rater-dispatch protocol additions.** Sonnet advisory rater at strict-5 for Doc-00-trigger outputs (PROPOSED — not yet ratified by Krystal). Byte-fidelity verification clause and path-resolution step now REQUIRED in standard rater brief for any gate citing verbatim content or absolute paths. Source: Wave 0 §2 (gate-24/23 evidence).

5. **Audit-log structural requirements.** Three MANDATORY sections in every gate log: rater agentIds (anti-fabrication traceability), wave-iteration trail, honest-disclosure section. Source: Wave 0 §3.

6. **Forward-only-backfill discipline.** Propagated errors discovered after gate close: correct forward-only; do NOT amend closed gate logs. Source: Wave 0 §4.

7. **Concurrency cap.** Budget is 2 Opus subagents; 1 Opus = 2.5 Sonnets = 6 Haikus. Maximums alone: 2 Opus, 5 Sonnets, or 12 Haikus. Mixed dispatches must sum to ≤ 2 Opus equivalents. Sequence rounds if dispatch exceeds cap. Source: Wave 0 §5.

8. **Subagent-timeout retry.** Parallel Sonnets hitting stream-idle timeouts: retry 1-file-per-Sonnet. Source: Wave 0 §6.

## v03_I empirical-lesson amendments (2026-05-11)

Four amendments absorbed from gate-20 propagation infrastructure build in mm-claude-canonical (2026-05-11). These address the four most common hook rejection causes that new threads hit during their first strict-5 gate:

1. **Pass block marker phrases must be in the BODY, not the heading.** The hook scans block content below `## Pass N —`, not the heading itself. Putting `Full checklist evaluation` in the heading title is NOT sufficient. Add a body line like `Full checklist evaluation of all N items against the defined audit scope.` See expanded "Pass block required-phrase markers" section with correct/wrong examples.

2. **Cross-shell Rule 5: hook does NOT read .asae-policy.** The hook grep-searches the audit log for literal mentions of "Git Bash" and "PowerShell". Having `cross-shell: not-applicable` in `.asae-policy` does NOT suppress the check. You must include both strings in the gate file body. GitHub Actions workflow files (`.github/workflows/`) ALWAYS trigger Rule 5. See expanded "Cross-shell exposure" section.

3. **`step_re_execution: []` triggers trailer requirement.** Including `step_re_execution:` in frontmatter — even with an empty list `[]` — makes the hook require a `Step-Re-Execution:` trailer in the commit message. If you had no re-executions, OMIT the field entirely.

4. **strict-5 requires 2 independent raters.** The hook counts `**Rater verdict:**` lines globally. Having only 1 rater in a strict-5 gate refuses the commit. Spawn two raters via Agent tool before committing.

## v02_I empirical-lesson amendments (2026-04-30)

Six amendments absorbed from SSOT-wrangler thread (`agitated-lalande-4d649d`) Phase 9 + Phase I cluster execution (gate-16/17/18 in mm-claude-canonical; 22 consumer Phase 9 wires + 16 Phase I deprecations 2026-04-30):

1. **Tier 0 propagation chain works at depth.** A Tier 0 propagation commit's `Propagation-From: gate-NN` source-gate is itself the OUTPUT of a strict-3 / strict-5 audited workstream — the audit chain bottoms out cleanly across phases. Cluster-wide operations can chain: each phase's summary becomes the next phase's source-gate. See "Tier 0 propagation" section below.

2. **Use short-form `Propagation-From: gate-NN` trailer** (number only, not full slug). Universally compatible across hook v04 / v05.1+ / v06 / v07.1 / v08 / v09. Hook v04 had a greedy-regex bug that captured full slug then failed to match `.md` files; short form sidesteps. Always prefer `Propagation-From: gate-75` over `Propagation-From: gate-75-rebrand-sweep-execution-2026-04-30`.

3. **Stage IMMEDIATELY before rater attestation.** Common pattern fail: stage → edit → forget to re-stage → rater verifies stale state. After editing the gate file, re-stage BEFORE spawning raters. Raters check actual `git status --short`. SSOT-wrangler caught this twice in gate-16 + once in gate-17.

4. **`rater_authored_by_context: parent` is REQUIRED** in canonical strict-5 gate frontmatter (Hook v09 Tier 33). Don't rely on legacy-compat prose marker only — explicit frontmatter field eliminates Tier 33 ambiguity. See "Required YAML frontmatter (strict-5+)" sub-block below.

5. **Avoid literal `[TO BE FILLED IN` strings in honest-gaps prose.** Tier 1c regex matches that string anywhere in the rater section. If you need to discuss pending-fill placeholders in honest-gaps prose, use phrasing like "pending-fill placeholder text" or "rater section template" instead of the literal string `[TO BE FILLED IN`.

6. **Tier 6 sources/inputs_processed parity is strict 1:1.** Each `sources:` entry MUST have exactly one corresponding `inputs_processed:` entry. Combining two sources into one inputs_processed entry refuses the commit. Expand bundled sources OR consolidate `sources:` first; never short-cut the parity rule.

Empirical-evidence source-gates: `mm-claude-canonical/deprecated/asae-logs/gate-16-*-2026-04-30.md`, `gate-17-*-2026-04-30.md`, `gate-18-*-2026-04-30.md`.

## Two paths

Pick yours:

| Repo | Threshold | Rater requirement | Trailer |
|---|---|---|---|
| Consumer repos (most apps) | strict-3 | 1 rater CONFIRMED | `ASAE-Gate: strict-3-PASS` |
| Canonical SSOT (`mm-claude-canonical`, `mm-d2r-code-plan-stack`) | strict-5 | 2 raters CONFIRMED | `ASAE-Gate: strict-5-PASS` |
| Private/stable-private | standard-2 | 1 rater CONFIRMED | `ASAE-Gate: standard-2-PASS` |

The `.asae-policy` file at the repo root declares `audit_threshold:` explicitly; if absent, hook derives from `going-public:` (false→2, true→3). strict-5 is opt-in via explicit `audit_threshold: strict-5` in `.asae-policy`.

## Required YAML frontmatter (all gates)

Below is the complete block to paste at the top of every new gate audit log. Fields marked `(strict-5+)` are required only for strict-5 gates; others are required for all gates.

```yaml
---
gate_id: gate-NN-<descriptor>-YYYY-MM-DD
target: |
  <multi-line target description>
sources:
  - <each source as bullet>
session_chain:
  - kind: gate | external | session_handoff
    path: <path>
    relation: <one-sentence relation>
persona_role_manifest:
  path: role-manifests/<persona-slug>.yaml
  loaded_at_gate_authoring: yes
  scope_bounds_satisfied: yes
inputs_processed:
  - source: <path matching one in sources:>
    processed: yes
    extracted: <what was extracted>
    influenced: <how it influenced the output>
disclosures:
  compliance_claims:
    - none: true
  shipping_attestation:
    - none: true
  coverage_mutation_scope:
    - none: true
  known_issues: []
  deviations_from_canonical: []
  omissions_with_reason: []
  partial_completions: []
  none: false
domain: documentation | code | document | research | instructional_design | legal | other
asae_certainty_threshold: strict-5 | strict-3 | standard-2
severity_policy: strict | standard
invoking_model: claude-opus-4-7 (<persona name>, <thread/worktree>, 1M context)
round: <YYYY-MM-DD short description of round>
Applied from:
  - <ruleset-or-doc>
---
```

**Critical schema requirements:**

- **`step_re_execution:` — OMIT if no re-executions occurred.** If this field exists in the frontmatter (even as `step_re_execution: []`), the hook requires a `Step-Re-Execution: gate-NN reason "<rationale>"` trailer in the commit message (Rule 3, Tier 1c-extended). Most gates have no re-executions — simply leave the field out entirely. Only add it when you actually re-executed a step per /asae Aspect 13.

- `inputs_processed:` MUST have one entry per `sources:` entry — STRICT 1:1 PARITY (Hook Tier 6 enforces; SSOT-wrangler v02_I amendment 6). Combining two sources into one inputs_processed entry refuses the commit. If a source bundles multiple files, expand `inputs_processed` accordingly OR consolidate `sources:` first.

  Example (CORRECT — 1:1 parity):
  ```yaml
  sources:
    - mm-claude-canonical/skills/asae/SKILL.md
    - mm-claude-canonical/.asae-policy
  inputs_processed:
    - source: mm-claude-canonical/skills/asae/SKILL.md
      processed: yes
      extracted: ...
      influenced: ...
    - source: mm-claude-canonical/.asae-policy
      processed: yes
      extracted: ...
      influenced: ...
  ```

  WRONG (consolidated; refuses commit):
  ```yaml
  sources:
    - mm-claude-canonical/skills/asae/SKILL.md
    - mm-claude-canonical/.asae-policy
  inputs_processed:
    - source: both files
      processed: yes
      extracted: ...
  ```

- `persona_role_manifest.path` MUST resolve to an actual YAML file in the repo (e.g., `role-manifests/clauda-the-spec-genius.yaml`). Hook Tier 5 verifies presence.

- **For strict-5 + 2-rater: `rater_authored_by_context: parent` field is REQUIRED** (Lock 7 Mod 13 Rule A; Hook v09 Tier 33 — SSOT-wrangler v02_I amendment 4). Place at top-level frontmatter alongside other gate fields. Don't rely on legacy-compat prose marker only — explicit frontmatter field eliminates Tier 33 ambiguity.

  ```yaml
  rater_authored_by_context: parent
  ```

  Legal values: `parent` (default; required for strict-5 + 2-rater) | `legacy_compat_prose_marker` (for pre-v07.1 gates that use prose marker only).

- **Calibration-tier claims must trace to ratified source** (v04_I addition). Any `asae_certainty_threshold` value must be derivable from the repo's `.asae-policy` file, plan backlog, or design spec. If proposing a tier not yet ratified, mark it explicitly as "PROPOSED (NOT YET RATIFIED by Krystal)" in `disclosures.deviations_from_canonical`. Do not present unratified tiers as canonical. (Evidence: gate-23 — invented strict-7 + 2-rater tiers not ratified in plan v06; R2 Opus caught it.)

- **Schema extensions must be disclosed** (v04_I addition). Any new fields beyond the canonical kind/path/relation triplet in `session_chain` entries, new sub-keys, or new top-level frontmatter blocks MUST be declared in `disclosures.deviations_from_canonical`. The v05+ schema is permissive (extensions are allowed) but extensions must be honest. (Evidence: gate-23 — `downstream_scope` field added to session_chain without disclosure; R2 caught as LOW finding.)

## Pass block required-phrase markers (Lock A2 tactical)

Each `## Pass N — <description>` block MUST contain at least one of these marker phrases **in the BODY TEXT of the block** (Tier 1b enforces). The phrase appearing only in the `## Pass N —` heading does NOT satisfy the requirement — the hook scans the block content below the heading.

**Accepted marker phrases** (hook regex, case-insensitive):

- `Full audit` / `Full checklist` / `Full domain` / `Full evaluation` / `Full re-evaluation`
- `Checklist evaluation`
- `Audit all items`
- `Same scope` / `Same audit` / `Same comprehensive` / `Same evaluation`
- `Per /asae SKILL.md Step 1` is sufficient if it appears in EACH Pass
- `third independent application` (acceptable for Pass 3+)

**Common mistake:** writing `## Pass 1 — Full checklist evaluation, identical scope` as the heading and then jumping straight to the results table. The heading is NOT scanned for the marker. Add a body line like `Full checklist evaluation of all N items against the defined audit scope.` before the results table.

**Example (CORRECT):**

```markdown
## Pass 1 — Full checklist evaluation, identical scope

Full checklist evaluation of all 9 items against the defined audit scope.

| # | Item | Result |
|---|------|--------|
| 1 | ... | PASS — ... |

**Issues found at CRITICAL: 0 / HIGH: 0 / MEDIUM (strict): 0 / LOW: 0**

Counter state: 1 / 5
```

**Example (WRONG — hook rejects):**

```markdown
## Pass 1 — Full checklist evaluation, identical scope

| # | Item | Result |
|---|------|--------|
| 1 | ... | PASS — ... |

Issues found at CRITICAL: 0 / HIGH: 0 / MEDIUM (strict): 0 / LOW: 0

Counter state: 1 / 5
```

Each Pass block MUST also contain:

- A results table (per-item PASS/FAIL/NA) OR equivalent prose
- **`**Issues found at CRITICAL: 0 / HIGH: 0 / MEDIUM (strict): 0 / LOW: 0**`** line — the bold wrapper (`**...**`) is REQUIRED (v04_I amendment 2; gate-25 evidence). Non-zero counts when applicable.
- `Counter state: N / threshold` line (e.g., `Counter state: 1 / 5`)

For strict-5: 5 Pass blocks total. For strict-3: 3 Pass blocks. For standard-2: 2 Pass blocks.

**Lock A2 strategic alternative (forward-only):** structured `passes:` YAML block in frontmatter; renderer at `mm-claude-canonical/scripts/lib/asae_pass_renderer.sh` produces canonical prose body; Hook v09 Tier 37 enforces equivalence. v01 lib script supports the contract; full schema lands in Phase 10 of Batch 3.

## Pre-author verification checklist (run BEFORE rater dispatch)

Eight checks to run after authoring but BEFORE dispatching raters. These catch the most common defect classes that historically required remediation waves. (Source: Calibration Inevitability v03 Wave 0 proposal; gate-23/24/60/61/79 evidence.)

1. **Disk-resolve every path you cite.** For every absolute path in frontmatter (`session_chain`, `inputs_processed`, `persona_role_manifest`, `disclosures`): verify the path exists on disk. Run `test -f "<path>"` or equivalent. Path-resolution failures are the most common low-effort / high-finding-class defect. (Gate-23: 3 CRITICAL paths in `session_chain` didn't resolve — cited `_grand_repo/.asae-logs/gate-79-...` when actual was `_grand_repo/deprecated/asae-logs/gate-79-...-step2-...`.)

2. **Grep canonical sources before introducing new names.** Before naming scripts, validators, hook wrappers, or cross-file referents: grep all canonical sources (adapter specs, references, plan backlog) for existing names. If a name exists, use it. If you must introduce a new name, declare the new-vs-existing relation in `deviations_from_canonical`. (Gate-61: 3 competing name systems landed across sibling files.)

3. **Re-read canonical state before propagating into new step.** Do not propagate state from earlier in-thread memory when canonical sources are authoritative. Open plan backlog section and confirm RATIFIED-vs-PENDING status for every referenced item. (Calibration Inevitability v03: propagated "Q2/Q3 PENDING" across 6 files after both were RATIFIED 2026-05-06.)

4. **Byte-fidelity verification for verbatim claims.** Any block labeled "verbatim," "transcluded," or "byte-for-byte" MUST be diffed against source byte-by-byte before rater dispatch. Trailing whitespace, double-spaces, ALL CAPS sections, and markdown autolink artifacts are load-bearing. (Gate-24: "verbatim recap" was actually paraphrased; R1 Opus passed CONFIRMED 5/5; R2 Opus caught it.)

5. **Single fix-pass on byte-load-bearing content is suspect.** When fixing byte-level content (trailing whitespace, indentation, line endings): search the ENTIRE source block for the same pattern, then verify the fix landed in every location. Do NOT fix one instance and move on. (Gate-79: Wave B fixed one bullet's whitespace; Wave C caught 3 more prose lines needing the same fix.)

6. **Calibration-tier claims must trace to ratified source.** See "Calibration-tier claims" note in Required YAML frontmatter section above.

7. **Cross-file consistency check after remediation.** After remediation edits, re-grep the SAME file for the OLD content. Frontmatter disclosure blocks frequently describe content already changed in the body. (Gate-61: `deviations_from_canonical` still said PreToolUse after body was updated to PostToolUse.)

8. **Frontmatter schema extension disclosure.** See "Schema extensions must be disclosed" note in Required YAML frontmatter section above.

## Independent rater spawn (Step 6)

Required for ALL /asae invocations regardless of severity policy. For strict-5 + 2-rater: spawn TWO independent raters via Agent tool from the parent thread (Mod 13 Rule A; sub-agents MUST NOT spawn raters). Each rater gets a self-contained brief (no shared context); each must return CONFIRMED for gate PASS.

**Canonical exemplar:** gate-69 Spec Genius role-definition lock-in rater spawn (2026-04-27, agentId `a091234b0ca0e3b05`). The exemplar's six load-bearing properties are documented at /asae SKILL.md Step 6 Exemplar section. Cite this when uncertain how to structure your brief.

**Rater section format (v04_I tightened — gate-25 evidence):**

The heading, field labels, and field order below are exact. The hook parses `## Independent Rater Verification` headings (Tier 1c) and counts `**Rater verdict:**` + `**Rater agentId:**` lines globally (Tier 1c-strict5). Default /asae SKILL.md Step 6 output uses different field labels — you MUST reformat rater output to match this template before pasting into your gate log.

```markdown
## Independent Rater Verification — Rater 1

**Subagent type used:** general-purpose

**Brief delivered to rater (verbatim summary):** <brief contents>

**Rater verdict:** CONFIRMED

**Rater per-item findings:** <per-item results>

**Rater honest gaps:** <rater's own gaps>

**Rater agentId:** <16-char hex prefix from Agent tool response>
```

For strict-5: TWO blocks (Rater 1 + Rater 2) with distinct agentIds.

**Rater agentIds are load-bearing** (v04_I addition — Wave 0 §3.1). A gate claiming "2 Opus + 1 Sonnet PASS" without recorded agentIds is unverifiable. Future audits of past audits depend on agentId traceability — without it, rater results cannot be distinguished from fabrication. Missing agentIds invalidate the gate.

**Standard rater brief must include** (v04_I additions — Wave 0 §2.2 + §2.3):

- **Path-resolution step:** "For every absolute path cited in frontmatter (`session_chain` / `inputs_processed` / `persona_role_manifest`), confirm the path exists on disk. Path-resolution failure = HIGH/CRITICAL finding."
- **Byte-fidelity clause** (when gate cites verbatim content): "Open source file. Diff cited block against authored block character-by-character including trailing whitespace, double-spaces, ALL CAPS sections, and non-visible bytes. CONFIRMED requires zero-byte-difference."

**Sonnet advisory rater for Doc-00-trigger outputs** (v04_I addition — Wave 0 §2.1; PROPOSED — not yet ratified by Krystal): When Doc 00 trigger conditions are met (output will be Krystal-printed / Krystal-verbatim-verified / Krystal-handwritten-feedback-target) AND calibration is strict-5 or strict-7: ADD a Sonnet advisory rater to the 2-Opus pool. The 2/2 Opus CONFIRM remains load-bearing for PASS; Sonnet advisory restarts the NULL-CLEAN-only counter if it surfaces a finding. (Gate-24: R1 Opus CONFIRMED paraphrased Doc 00 that was labeled "verbatim"; R2 Opus caught it. A Sonnet advisory third-eye would have provided earlier signal.)

## Audit-log structural requirements

Three sections are MANDATORY in every gate audit log (v04_I addition — Wave 0 §3; gate-21/22/23/24/60/61/79 evidence).

**1. Rater IDs section.** Per-rater entry with agentId + verdict + finding-count. Format:

```markdown
## Rater IDs

- [Rater 1] agentId: <hex> — verdict: CONFIRMED — findings: 0
- [Rater 2] agentId: <hex> — verdict: CONFIRMED — findings: 0
```

Missing agentIds invalidate the gate. This is the audit-trail anchor for verifying that rater results were not fabricated.

**2. Audit waves section.** Per-wave row recording the iteration trail. Do NOT delete earlier wave entries — the trail evidences that NULL-CLEAN-only counter discipline was honored. Forward-only-backfill. Format:

```markdown
## Audit waves

| Wave | Verdict | Findings | Remediation |
|------|---------|----------|-------------|
| Initial | PARTIAL | 2 HIGH | Fixed path references, added cross-shell section |
| Wave A | CONFIRMED | 0 | — |
```

Without this trail, a final 3/3 CONFIRM is indistinguishable from a first-pass clean result. (Gate-60: 4 remediation waves; the trail was the only evidence that the final PASS was iteration 4.)

**3. Honest disclosures section.** Enumerate: discipline-breaks (parent-foreground edits during subagent-only phases), single-model-family rater pool, rater calibration gaps observed, deferred backlog items still open. Empty section = honest declaration of no disclosures, NOT omission. Format:

```markdown
## Honest disclosures

- Parent-foreground Edit at SKILL.md:84 — 1-word fix, logged
- Rater pool: 2 Opus only (no Sonnet advisory)
```

(Calibration Inevitability v03: 2 parent-foreground-Edit discipline-breaks logged honestly in gate-60/61 §"Honest disclosures". Without this section, discipline-breaks would hide in the wave-iteration trail.)

## Gate numbering convention

```bash
ls deprecated/asae-logs/ | grep -oE 'gate-[0-9]+' | sort -V | tail -1
```

Next gate-id = highest numeric + 1. Each repo has its own sequence.

## Iterative hook-compliance pattern

Expect 2-5 refuse-fix cycles per gate commit. Budget 5-10 min per cycle. Common refuse causes (in order of frequency):

1. **Tier 1b required-phrase marker missing** → add a marker phrase (e.g., `Full checklist evaluation of all N items...`) to the BODY of each Pass block. The phrase in the heading alone does NOT count. See "Pass block required-phrase markers" section above.
2. **Tier 1c rater section missing** → spawn the rater via Agent tool, paste actual response reformatted to match exact field labels (see "Independent rater spawn" section), retry
3. **Tier 1c-strict5 (strict-5 only)** → need 2 distinct rater agentIds with both CONFIRMED; if you only have 1 rater, spawn a second via Agent tool
4. **Tier 6 sources/inputs_processed parity** → expand bundled sources OR consolidate (1:1 strict; SSOT-wrangler v02_I amendment 6)
5. **Rule 5 cross-shell verification missing** → if staged content includes GitHub Actions workflows (`.github/workflows/`), `.ps1`/`.cmd`/`.bat` files, or platform-conditional code, the hook requires both "Git Bash" and "PowerShell" to appear in the audit log body. See "Cross-shell exposure" section below.
6. **Rule 3 step-re-execution trailer** → if frontmatter contains `step_re_execution:` (even `step_re_execution: []`), the commit message MUST have a `Step-Re-Execution:` trailer. Fix: either remove `step_re_execution:` from frontmatter if no re-executions occurred, or add the trailer.
7. **Tier 5 role-manifest path** → ensure `persona_role_manifest.path` resolves to actual YAML file
8. **Rule 1 persona** → use Clauda or Claudette in `Co-Authored-By:`; never `Claude` in persona position
9. **Tier 33 strict-5** → `rater_authored_by_context: parent` field missing in frontmatter (SSOT-wrangler v02_I amendment 4). This is REQUIRED for all strict-5 gates.
10. **Rule 10 compliance_claims** → if staged files include any README, SECURITY.md, or user-facing copy, frontmatter must have `compliance_claims:` under `disclosures:`. Use `- none: true` when there are no compliance claims.

Hook is fail-fast (refuses on first violation). Fix one, re-attempt, fix next.

**Typical strict-5 refuse sequence (from gate-20 empirical data, 2026-05-11):**
The following is the actual sequence of 6 rejections encountered during the gate-20 commit, in order. Budget accordingly:

1. Tier 1b — marker phrase in heading only, not body → added body-level markers
2. Tier 1c-strict5 — only 1 rater, need 2 → spawned second rater
3. Rule 3 — `step_re_execution: []` in frontmatter → removed field
4. Rule 5 — GitHub Actions workflows triggered cross-shell → added observation block
5. Rule 10 — workspace/README.md triggered compliance_claims → added `- none: true`
6. Tier 33 — missing `rater_authored_by_context: parent` → added to frontmatter

**Stage IMMEDIATELY before rater attestation** (SSOT-wrangler v02_I amendment 3): common pattern fail is `stage → edit → forget to re-stage → rater verifies stale state`. After editing the gate file, re-stage BEFORE spawning raters. Raters check actual `git status --short`. SSOT-wrangler thread caught this 3 times across gate-16/17 in mm-claude-canonical 2026-04-30; it's the most common silent-failure mode in iterative hook-compliance cycles.

**Anti-fabrication: avoid literal `[TO BE FILLED IN` strings in honest-gaps prose** (SSOT-wrangler v02_I amendment 5). Tier 1c regex matches that string anywhere in the rater section. If discussing pending-fill placeholders in your honest-gaps section, use phrasing like "pending-fill placeholder text" or "rater section template" instead of the literal `[TO BE FILLED IN`.

## Tier 0 propagation (cross-repo bulk operations)

When a single source-gate authorizes propagation to N target repos (e.g., a hook v09 update propagated to 22 consumer repos; a Phase I deprecation propagated to 16 repos), each target-repo commit declares the source-gate via a `Propagation-From: gate-NN` trailer.

**Tier 0 propagation chain works at depth** (SSOT-wrangler v02_I amendment 1): the source-gate is itself the OUTPUT of a strict-3 / strict-5 audited workstream. Cluster-wide operations chain cleanly: each phase's summary becomes the next phase's source-gate. Example chain (from SSOT-wrangler 2026-04-30):

- gate-15 (Spec Genius Phase 15 close-out) → gate-75 (SSOT-wrangler Phase 9 plan execution; uses gate-15 as source)
- gate-75 → 22 Phase 9 wires (each uses gate-75 as `Propagation-From: gate-75`)
- gate-17 (SSOT-wrangler Phase I deprecation summary) → 16 Phase I deprecations (each uses gate-17)

**Use short-form `Propagation-From: gate-NN` trailer** (just the number, not full slug) for universal compatibility (SSOT-wrangler v02_I amendment 2). Hook v04 had a greedy-regex bug that captured full slug then appended `-` and failed to match `.md` files; short form sidesteps. Hook v05.1+ / v06 / v07.1 / v08 / v09 all accept the number-only regex.

**Correct:**
```
Propagation-From: gate-75
Co-Authored-By: ...
```

**Avoid (works on v05.1+ but breaks under hook v04):**
```
Propagation-From: gate-75-batch3-some-long-descriptor-2026-04-30
Co-Authored-By: ...
```

For Tier 0 commits, the staged change matches the source-gate's declared propagation scope; the hook accepts the trailer-based source-gate instead of requiring per-target rater spawns.

## Forward-only-backfill discipline

When a propagated error is discovered AFTER one or more gates have closed (v04_I addition — Wave 0 §4):

1. **Do NOT amend closed gate logs.** They were honest at gate-close time; they record what was true when the gate passed.
2. **Single substitution-pass** across all affected files to correct propagated state.
3. **Log correction in a new dated entry** — separate gate audit log OR memory rule — documenting what was corrected and why.
4. **Preserve closed gate logs verbatim.** The correction trail is forward-only.

(Evidence: Calibration Inevitability v03 propagated "Q2/Q3 PENDING" across 6 files before Krystal flagged 2026-05-12. Fix was: single Sonnet remediation pass + forward-only log entry. Closed gate-23/61 logs were NOT amended.)

## Operational discipline: concurrency + timeouts

**Concurrency cap** (v04_I addition — Wave 0 §5): Before any parallel subagent dispatch, count against a budget of **2 Opus subagent equivalents.** Exchange rate: **1 Opus = 2.5 Sonnets = 6 Haikus.** Maximums alone: 2 Opus, 5 Sonnets, or 12 Haikus. Mixed dispatches must sum to ≤ 2 Opus equivalents (e.g., 1 Opus + 2 Sonnets + 1 Haiku = 1 + 0.8 + 0.17 = 1.97 Opus equivalents → allowed). If proposed dispatch exceeds the budget, sequence rounds. Do NOT exceed cap "just this once." The cap is per-thread, not per-conversation.

**Subagent-timeout retry** (v04_I addition — Wave 0 §6): When parallel Sonnets hit stream-idle timeouts, retry with **1-file-per-Sonnet dispatch** (sequenced rounds). The timeout is per-stream-idle, not per-wallclock — a single Sonnet authoring a single file mostly completes within the idle window even when batch dispatches don't. Document the timeout pattern in the /time-task entry for future calibration analysis.

## Persona prerequisites (Lock A3 cross-reference)

Every gate requires a persona with:

1. **Role-definition artifact** at `_grand_repo/docs/Role_Definition_<First>_<Middle>_<LastNameUnderscored>_<YYYY-MM-DD>_v01_I.md` (canonical role-def)
2. **Role-manifest YAML** at `<repo>/role-manifests/<persona-slug>.yaml` (declared in audit log frontmatter; hook Tier 5 verifies presence)
3. **Lock-in skill** at `.claude/skills/role-definition-<lastname-kebab>/SKILL.md` (loads persona context)
4. **Propagation script** at `_grand_repo/scripts/propagate-role-skill.sh` (cross-repo distribution)
5. **First-gate audit log** establishing the persona (use /define-your-role-literal meta-skill if no persona exists yet)

If you don't yet have a persona for the workstream: invoke `/define-your-role-literal` first. See `Persona_Design_Entry_Point_2026-04-28_v01_I.md` for the 5-artifact discovery + authoring path.

## First moves for a new ASAE-gated commit

1. Compose your work-product changes (don't commit yet)
2. `ls deprecated/asae-logs/` → determine next gate-id
3. Read most recent gate audit log in same dir as format reference
4. Author audit log frontmatter — **do NOT include `step_re_execution:` unless you actually re-executed steps**
5. Run /asae 3-5 identical-scope passes against your work-product (per threshold)
6. **In each Pass block body**, include a marker phrase (e.g., `Full checklist evaluation of all N items...`) — heading alone doesn't count
7. **Bold the issues-found line:** `**Issues found at CRITICAL: 0 / HIGH: 0 / MEDIUM (strict): 0 / LOW: 0**`
8. **If staged files include GitHub Actions workflows:** add a cross-shell observation section mentioning both `Git Bash` and `PowerShell` — this satisfies Rule 5
9. **Run pre-author verification checklist** (see section above) — disk-resolve paths, check naming, verify byte-fidelity for any verbatim claims
10. Include MANDATORY audit-log sections: rater IDs, wave-iteration trail, honest disclosures (see "Audit-log structural requirements" section)
11. Spawn rater(s) via Agent tool with self-contained brief; capture verdicts + agentIds. **strict-5 needs 2 raters, not 1.** Include path-resolution + byte-fidelity clauses in brief.
12. Populate rater verification sections — **reformat rater output to match exact field labels** (see "Independent rater spawn" section)
13. Stage targeted files (audit log + work-product changes; never `git add -A`)
14. Commit with `ASAE-Gate: <threshold>-PASS` + `Co-Authored-By: <Persona> (<model>) <noreply@anthropic.com>` trailers
15. Iterate refuse-fix cycles as hook surfaces issues (expect 2-5 cycles)
16. Push when commit lands

## Cross-shell exposure (Rule 5 / Tier 3)

**When it triggers:** The hook scans staged files for platform-conditional patterns: `github/workflows` in any path, `.ps1`/`.cmd`/`.bat` extensions, `process.platform`/`os.homedir`/`pathToFileURL`/`path.sep` in staged diffs, config file extensions, `propagate-githooks`, and `installer`. If ANY pattern matches, Rule 5 activates.

**What the hook ACTUALLY checks:** It grep-searches your gate audit log file for:
- At least one mention of `Git Bash` (or `gitbash`, `bash msys`, `posix shell`) — case-insensitive
- At least one mention of `PowerShell` (or `pwsh`, `cmd.exe`) — case-insensitive

If either count is zero, the commit is refused.

**IMPORTANT:** The `.asae-policy` field `cross-shell: not-applicable` is NOT parsed by the hook. The hook only checks for the string mentions in the audit log. Even if `.asae-policy` says not-applicable, you still need both strings present in the gate file.

**How to satisfy Rule 5:**

Option A — Add a cross-shell observation section to your gate file:

```markdown
## Cross-shell observed behavior

Git Bash: YAML syntax validation on workflow files — EXIT=0; workflow
definitions: PRESENT. Bash scripts are POSIX-compatible, intended for
ubuntu-latest CI runner.

PowerShell: `gh workflow run` dispatch tested — EXIT=0; workflow
trigger: PRESENT. YAML files are GitHub-parsed, not locally interpreted.
```

Option B — If the content genuinely has no cross-shell exposure (e.g., CI-only scripts that never run locally), add the observation section anyway with a brief justification mentioning both shells:

```markdown
## Cross-shell observed behavior

Scripts run exclusively on GitHub Actions (ubuntu-latest). No local
shell execution path exists. Git Bash and PowerShell interaction is
limited to `gh` CLI dispatch, which is cross-shell by design.
```

**Common trigger:** GitHub Actions workflow YAML files (`.github/workflows/*.yaml`) always trigger Rule 5 because the hook matches `github/workflows` in the staged path. Plan for this whenever committing workflow files.

## When something goes wrong (DRR — Detect-Revert-Redelegate)

If your gate commit reveals a substantive failure mid-loop and you need to recover, see `/asae` SKILL.md Aspect 21 for the 5 DRR sub-shapes:

- `full_revert` — back out work-product entirely; new gate documents the revert
- `carry_forward` — preserve work-product; named carry-marker tracks what's deferred (see `Carry_Marker_Convention_2026-04-28_v01_I.md`)
- `carry_forward_sequenced` — multi-stage closure across multiple gates
- `uncommitted_revert` — pre-commit recovery; transcript-evident only
- `disclosure_inline_remediation` — audit-log-only correction (no work-product change)

## Honest gaps

1. **Quickstart is single-doc; full enforcement details live in /asae SKILL.md.** This doc is the entry point; deep cases route to /asae spec.
2. **Hook v09 Tiers 31-37 are forward-only (gates dated 2026-04-30+).** Older gates use v05/v06/v07/v08 enforcement; this Quickstart doesn't dive into per-version differences.
3. **Lock A2 strategic structured-frontmatter passes[] schema lands Phase 10.** Quickstart documents tactical (prose-pattern markers) + alternative (structured-frontmatter renderer) at v01.
4. **Persona prerequisites assume /define-your-role-literal availability.** If working in a repo without that skill propagated, persona authoring is manual (cite role-manifest YAML by hand).
5. **No fixture-test corpus.** Quickstart accuracy validated by adoption; feedback channels TBD.
6. **Sonnet advisory rater for Doc-00-trigger is PROPOSED, not ratified** (v04_I §2.1). The recommendation is included for procedural awareness but is not yet a binding requirement. Krystal's ratification converts it from advisory to mandatory.
7. **Pre-author verification checklist is operationally recommended, not hook-enforced.** Items 1-8 prevent rater-dispatch defects but the hook does not enforce them directly. Skipping the checklist risks remediation waves, not hook rejections.
8. **`anti-fabrication.md` does not yet exist as a standalone reference.** The Wave 0 proposal doc cited `references/anti-fabrication.md` as if it existed; the file has never been authored. Anti-fabrication principles (rater agentId traceability, audit-trail verifiability) are documented inline in this Quickstart's "Audit-log structural requirements" and "Independent rater spawn" sections. A standalone reference may be authored in a future version.

## Cross-references

- `/asae` SKILL.md (deep spec) — `mm-d2r-code-plan-stack/skills/asae/SKILL.md`
- `Persona_Design_Entry_Point_2026-04-28_v01_I.md` (persona discovery + authoring)
- `Carry_Marker_Convention_2026-04-28_v01_I.md` (carry-marker schema)
- `Production_Pattern_Catalog_2026-04-27_v01_I.md` (failure-mode catalog)
- `Fork_Origin_Catalog_2026-04-28_v01_I.md` (fork-event metadata)
- Anti-fabrication discipline (rater agentId traceability; not yet a standalone reference — principles documented in "Audit-log structural requirements" + "Independent rater spawn" sections above)
- Hook v08 / v09 — `mm-claude-canonical/hooks/`
- Lib scripts — `mm-claude-canonical/scripts/lib/`
- Wave 0 proposal doc — `docs/ASAE_Quickstart_Additions_From_V03_Wave_0_2026-05-12_v01_I.md`

## Versioning

v01_I (2026-04-30) — inaugural Spec Genius authoring per Batch 3 Lock A1. Covers strict-3 / strict-5 / standard-2 paths; frontmatter schema; Pass block markers; rater spawn; gate numbering; iterative hook-compliance; persona prerequisites; first moves; cross-shell; DRR; honest gaps; cross-references.

v02_I (2026-04-30) — absorbs 6 SSOT-wrangler empirical-lessons amendments per gate-16/17/18 in mm-claude-canonical (Phase 9 + Phase I cluster execution). Adds:
- v02_I amendments summary at top of body
- Tier 6 1:1 parity example (correct + wrong) in Required YAML frontmatter
- `rater_authored_by_context: parent` REQUIRED for strict-5 + 2-rater (frontmatter level, not just legacy-compat prose marker)
- "Stage IMMEDIATELY before rater attestation" pattern in iterative hook-compliance section
- Anti-fab note about literal `[TO BE FILLED IN` string matching Tier 1c regex
- New "Tier 0 propagation" section with chain-at-depth + short-form trailer guidance

v03_I (2026-05-11) — absorbs 4 empirical-lessons amendments from gate-20 propagation infrastructure build in mm-claude-canonical. Adds:
- Pass block marker phrases: clarified that markers must appear in BODY text, not heading; expanded accepted-phrase list to match hook regex (Full audit, Full checklist, Same scope, etc.); added correct/wrong examples
- Cross-shell (Rule 5): documented that hook does NOT parse .asae-policy cross-shell field; it grep-searches audit log for "Git Bash" and "PowerShell" string mentions; GitHub Actions workflow files always trigger Rule 5
- step_re_execution gotcha: documented that including `step_re_execution: []` in frontmatter triggers Step-Re-Execution trailer requirement; omit field entirely when no re-executions occurred
- strict-5 two-rater requirement: promoted to position 3 in iterative hook-compliance list; emphasized in First moves checklist
- Updated First moves checklist with in-line warnings for each gotcha point

v04_I (2026-05-12) — absorbs 11 amendments from Calibration Inevitability v03 Wave 0 (8 gates across mm-claude-canonical + _grand_repo, 2026-05-06 through 2026-05-12) + 3 gate-25 empirical hook gotchas. Adds:
- New "Pre-author verification checklist" section: 8-item checklist (disk-resolve, grep names, re-read state, byte-fidelity, search-entire-block, calibration-tier tracing, cross-file consistency, schema extension disclosure)
- Issues-found line bold requirement (gate-25 evidence)
- Rater section format tightened: exact H2 heading format + exact field labels (gate-25 evidence)
- Rater-dispatch protocol: Sonnet advisory for Doc-00-trigger (PROPOSED), byte-fidelity clause, path-resolution step in standard brief
- New "Audit-log structural requirements" section: rater agentIds mandatory, wave-iteration trail mandatory, honest-disclosure section mandatory
- New "Forward-only-backfill discipline" section: correct forward-only, never amend closed gate logs
- New "Operational discipline" section: concurrency cap (2 Opus equivalents; 1 Opus = 2.5 Sonnets = 6 Haikus), subagent-timeout retry (1-file-per-Sonnet)
- Updated First moves checklist with pre-author verification, audit-log structural sections, bold issues-found, rater brief requirements
- 2 new honest gaps (Sonnet advisory not ratified; pre-author checklist not hook-enforced)
- Anti-fabrication discipline documented inline (standalone `anti-fabrication.md` not yet authored) + cross-reference to Wave 0 proposal doc

Future v05+:
- Per-version hook detail expansion as v10+ ships
- Fixture-test corpus for adoption validation
- Common-error → fix index
- Empirical lessons from Phase E pilot wiring (when SSOT-wrangler executes)
- Sonnet advisory rater ratification decision (converts §2.1 from PROPOSED to MANDATORY or WITHDRAWN)
