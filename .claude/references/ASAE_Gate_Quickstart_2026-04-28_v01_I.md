---
title: ASAE Gate Quickstart — Onboarding for New Threads
id: ASAE_Gate_Quickstart_2026-04-28
created: 2026-04-28
updated: 2026-05-11
version: v03_I
classification: INTERNAL ONLY
audience: martinez_methods_internal
classification_reason: Operational onboarding — eliminates inference-burden gap that surfaced during hook v05+ enforcement adoption; consumed by new threads bootstrapping into ASAE-gated repos.
authored_by: Clauda the Spec Genius v01 (Claude Opus 4.7, 1M context)
provenance: Methodology Mods Batch 3 Lock A1 (per Batch 3 Handoff §3); v02_I absorbs 6 SSOT-wrangler empirical-lessons amendments per gate-16/17/18 in mm-claude-canonical (Phase 9 + Phase I cluster execution 2026-04-30); v03_I absorbs 4 empirical-lessons amendments from gate-20 propagation infrastructure build (2026-05-11)
v03_lineage: v01_I (2026-04-30) inaugural authoring → v02_I (2026-04-30) absorbs 6 SSOT-wrangler amendments → v03_I (2026-05-11) absorbs 4 gate-20 empirical-lessons amendments (pass-block marker location, cross-shell hook behavior, step_re_execution gotcha, strict-5 two-rater emphasis)
sources:
  - Methodology_Mods_Batch3_Handoff_2026-04-28_v01_I.md (Lock A1 specification)
  - mm-d2r-code-plan-stack/skills/asae/SKILL.md (canonical /asae spec; First moves cross-reference)
  - mm-claude-canonical/.asae-policy + mm-d2r-code-plan-stack/.asae-policy (strict-5 + 2-rater audit_threshold lock)
  - mm-claude-canonical/hooks/commit-msg-v08 + commit-msg-v09 (enforcement layer Quickstart maps onto)
  - mm-claude-canonical/references/Persona_Design_Entry_Point_2026-04-28_v01_I.md (Lock A3 cross-reference)
  - SSOT-wrangler thread agitated-lalande-4d649d (original feedback driving Lock A1)
related_artifacts:
  - mm-d2r-code-plan-stack/skills/asae/SKILL.md
  - mm-claude-canonical/references/Persona_Design_Entry_Point_2026-04-28_v01_I.md
  - mm-claude-canonical/references/Carry_Marker_Convention_2026-04-28_v01_I.md
  - mm-claude-canonical/hooks/commit-msg-v09
---

# ASAE Gate Quickstart

For new threads bootstrapping into ASAE-gated Martinez Methods repos. This is the doc to read FIRST when you're about to commit your first ASAE gate; it covers all hook prerequisites + canonical example pointers + procedural minutiae the inference-burden-of-just-reading-/asae-cold misses.

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
```

**Example (WRONG — hook rejects):**

```markdown
## Pass 1 — Full checklist evaluation, identical scope

| # | Item | Result |
|---|------|--------|
| 1 | ... | PASS — ... |
```

Each Pass block MUST also contain:

- A results table (per-item PASS/FAIL/NA) OR equivalent prose
- `Issues found at CRITICAL: 0 / HIGH: 0 / MEDIUM (strict): 0 / LOW: 0` line (or with non-zero counts when applicable)
- `Counter state: N / threshold` line (e.g., `Counter state: 1 / 5`)

For strict-5: 5 Pass blocks total. For strict-3: 3 Pass blocks. For standard-2: 2 Pass blocks.

**Lock A2 strategic alternative (forward-only):** structured `passes:` YAML block in frontmatter; renderer at `mm-claude-canonical/scripts/lib/asae_pass_renderer.sh` produces canonical prose body; Hook v09 Tier 37 enforces equivalence. v01 lib script supports the contract; full schema lands in Phase 10 of Batch 3.

## Independent rater spawn (Step 6)

Required for ALL /asae invocations regardless of severity policy. For strict-5 + 2-rater: spawn TWO independent raters via Agent tool from the parent thread (Mod 13 Rule A; sub-agents MUST NOT spawn raters). Each rater gets a self-contained brief (no shared context); each must return CONFIRMED for gate PASS.

**Canonical exemplar:** gate-69 Spec Genius role-definition lock-in rater spawn (2026-04-27, agentId `a091234b0ca0e3b05`). The exemplar's six load-bearing properties are documented at /asae SKILL.md Step 6 Exemplar section. Cite this when uncertain how to structure your brief.

**Rater section minimum format:**

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

## Gate numbering convention

```bash
ls deprecated/asae-logs/ | grep -oE 'gate-[0-9]+' | sort -V | tail -1
```

Next gate-id = highest numeric + 1. Each repo has its own sequence.

## Iterative hook-compliance pattern

Expect 2-5 refuse-fix cycles per gate commit. Budget 5-10 min per cycle. Common refuse causes (in order of frequency):

1. **Tier 1b required-phrase marker missing** → add a marker phrase (e.g., `Full checklist evaluation of all N items...`) to the BODY of each Pass block. The phrase in the heading alone does NOT count. See "Pass block required-phrase markers" section above.
2. **Tier 1c rater section missing** → spawn the rater via Agent tool, paste actual response, retry
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
7. **If staged files include GitHub Actions workflows:** add a cross-shell observation section mentioning both `Git Bash` and `PowerShell` — this satisfies Rule 5
8. Spawn rater(s) via Agent tool with self-contained brief; capture verdicts + agentIds. **strict-5 needs 2 raters, not 1.**
9. Populate rater verification sections in audit log
10. Stage targeted files (audit log + work-product changes; never `git add -A`)
11. Commit with `ASAE-Gate: <threshold>-PASS` + `Co-Authored-By: <Persona> (<model>) <noreply@anthropic.com>` trailers
12. Iterate refuse-fix cycles as hook surfaces issues (expect 2-5 cycles)
13. Push when commit lands

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

## Cross-references

- `/asae` SKILL.md (deep spec) — `mm-d2r-code-plan-stack/skills/asae/SKILL.md`
- `Persona_Design_Entry_Point_2026-04-28_v01_I.md` (persona discovery + authoring)
- `Carry_Marker_Convention_2026-04-28_v01_I.md` (carry-marker schema)
- `Production_Pattern_Catalog_2026-04-27_v01_I.md` (failure-mode catalog)
- `Fork_Origin_Catalog_2026-04-28_v01_I.md` (fork-event metadata)
- Hook v08 / v09 — `mm-claude-canonical/hooks/`
- Lib scripts — `mm-claude-canonical/scripts/lib/`

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

Future v04+:
- Per-version hook detail expansion as v10+ ships
- Fixture-test corpus for adoption validation
- Common-error → fix index
- Empirical lessons from Phase E pilot wiring (when SSOT-wrangler executes)
