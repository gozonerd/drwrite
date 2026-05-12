---
name: rebrand-sweep
description: "Sweep a target repo or directory tree for fork-origin / rebrand brand-residue and produce a structured findings report. Triggers on: '/rebrand-sweep', 'rebrand sweep', 'fork sweep', 'brand residue scan', 'IP scrub the migration', 'pre-publication brand check'. Operates in two scope tiers: BLOCKER (parallel-thread known-residue list — refuses Phase E canonical-consumer admission until 0 hits) and ADVISORY (broader Pre-Publication IP Scrub Checklist scope — non-blocking findings). Detects fork events from git history (advisory). Outputs a categorized report (mechanical-rename vs contextual-phrase) routed for remediation. Cross-references Fork_Origin_Catalog (fork-event metadata) and Brand_Rename_Catalog (term-rename mandates). Companion to Hook v09 Tier 36 (advisory-only on git-history-pattern detection)."
type: skill
classification: INTERNAL ONLY
authored_by: Clauda the Spec Genius v01 (Claude Opus 4.7, 1M context)
created: 2026-04-30
version: v01_I
provenance: Methodology Mods Batch 3 Lock 9 (META-10 Fork-Time / Rebrand-Time Sweep)
---

# /rebrand-sweep

## What this skill does

Runs a structured brand-residue scan against a target repo, directory tree, or branch, classifies findings by severity tier (BLOCKER / ADVISORY), categorizes by remediation type (mechanical-rename / contextual-phrase / structural), and produces a per-target summary report Krystal reviews once per target — never per-finding (per `feedback_task_difficulty.md`).

The skill exists because:

1. **Fork events leave brand residue**: when a Martinez Methods app is forked or rebranded from a prior name (Stahl Systems → Martinez Methods, 2026-04-16; or any future fork), brand-debt persists in filenames, folder names, frontmatter owner fields, CHANGELOG entries, SECURITY.md, e2e specs, dependency manifests, CI configs, and binary file metadata. Prose scrubs miss filesystem-level leakage (per Pre-Publication IP Scrub Checklist §1, the 2026-04-22 D2R Methodology Factorial discovery).
2. **Phase E (canonical-consumer pilot) admission requires zero BLOCKER hits**: `_grand_repo` CLAUDE.md admission criterion #4 (no Stahl Systems references) gates `mm-claude-canonical` submodule acceptance. SSOT-wrangler thread is blocked until this skill runs against migrated canonical content.
3. **Sweep scope is non-trivial**: a flat grep misses contextual phrases ("the methodology that emerged at Stahl Systems"), binary-embedded text (PDF metadata), and git-history references (commits + tags + branch names). Skill orchestrates layered scans + classifies output.

## When to invoke

- Before admitting a new submodule to `_grand_repo` (Phase E pilot + Phase H per-repo wiring)
- Before publishing any repo (Pre-Publication IP Scrub Checklist gate)
- After any fork / rebrand event (catalog the fork-event metadata + sweep residue)
- Periodically on canonical SSOT repos (smoke test for residue introduced via migrations)
- When parallel-thread evidence-pass surfaces a new brand-residue pattern (extends BLOCKER list)

## When NOT to invoke

- Mid-development on a private working repo (residue is normal until pre-publication scrub)
- Files already known-historical in `deprecated/` directories that preserve original brand context (sweep skips `deprecated/` by default; flag with `--include-deprecated` if needed)
- Documents whose IP value is the brand-residue itself (e.g., Brand_Rename_Catalog, Fork_Origin_Catalog, this skill) — sweep auto-allowlists self-references via the skill's own filename

## Inputs

- **Target** — required; one of: repo path (absolute), directory tree path, or single file. Examples: `mm-claude-canonical/`, `/c/Users/NerdyKrystal/repos/`, `mm-d2r-code-plan-stack/skills/asae/SKILL.md`.
- **Scope tier** — optional; default `both`. Values: `blocker-only` (parallel-thread known-residue list; fast), `advisory-only` (broader Pre-Pub IP Scrub Checklist scope; slow), `both` (sequential).
- **Mode** — optional; default `report`. Values: `report` (read-only; emits findings), `remediate` (dry-run remediation diff; user reviews then user runs), `auto-remediate` (mechanical-rename findings only; contextual-phrase findings always go to `report`).
- **Fork-event flag** — optional; default `false`. If `true`, the sweep additionally inspects git history (`git log --all`, `git tag`, `git branch -a`) for fork-event signatures + catalogues findings into `Fork_Origin_Catalog`.
- **Output path** — optional; default `<target-root>/deprecated/asae-logs/rebrand-sweep-<YYYY-MM-DD>-v01_I.md`. The findings report.
- **Allowlist paths** — optional; default `[deprecated/, .git/, references/Stahl_Systems_Brand_Colors_*, references/Brand_Rename_Catalog_*, references/Fork_Origin_Catalog_*, skills/rebrand-sweep/SKILL.md]`. Paths to skip (these intentionally contain brand-residue or are sweep-system artifacts).

## BLOCKER list (parallel-thread known-residue + Phase E admission gate)

These patterns BLOCK Phase E canonical-consumer admission. Zero hits required for canonical-consumer submodule acceptance.

### Filesystem layer

1. Folder names containing: `stahl`, `stahl-systems`, `stahl_systems`, `pums`, `puMS`
2. File names containing: `stahl`, `stahl-systems`, `stahl_systems`, `pums`, `puMS`, `dmis` (legacy methodology name pre-2026-04-16; `dmis` retained ONLY as a folder name `dmis/methodology/` per migration source-locks)

### Content layer

3. `grep -riE "stahl[\s\-_]*systems?"` returns hits in non-allowlisted paths
4. `grep -riE "stahl(?!_systems_brand_colors_2026-03-27)"` (any standalone `stahl` not part of the allowlisted brand-colors filename)
5. `grep -riE "PUMS|puMS"` returns hits

### Frontmatter / metadata layer

6. YAML frontmatter `owner:` / `authored_by:` / `author:` fields containing `stahl` / `Stahl Systems` (must be `Martinez Methods` / `Krystal Martinez (Martinez Methods)` / a Clauda or Claudette persona attribution)
7. `package.json` / `pyproject.toml` / `Cargo.toml` `author` / `organization` / `homepage` fields containing legacy brand
8. CI workflow `.github/workflows/*.yml` `name:` / `org:` fields containing legacy brand

### Binary / generated content layer

9. PDF / DOCX metadata `Author` / `Title` / `Subject` / `Keywords` containing legacy brand (manual inspection per Pre-Pub Checklist §1.4; skill emits the file list, user confirms remediation)
10. Generated artifacts (`dist/`, `build/`, `target/`, `node_modules/`) — flagged for `.gitignore` regeneration if accidentally tracked

### Git history layer (advisory by default; promotes to BLOCKER if `--include-history-blocker`)

11. Commit messages containing legacy brand (advisory; rewriting history is destructive)
12. Tag names containing legacy brand
13. Branch names containing legacy brand (deletable on remote; advisory unless explicitly promoted)

## ADVISORY list (broader Pre-Pub IP Scrub Checklist scope)

These patterns DON'T block canonical-consumer admission but should pass before public release. Findings reported, no auto-remediation.

### Methodology IP exposure

1. `grep -riE "self.audit.edit|ai.self.audit|audit.edit.loop"` — methodology acronym expansions
2. `grep -riE "convergence.of.fabrication|within.tradition|cross.architectural.diversity|double.dipped.bias|epistemic.endogamy|bobo.framework"` — Martinez Methods experimental terms
3. `grep -riE "cheerleader.evaluation|double.blind.calibration|ontological.consistency"` — methodology evaluation IP

### Personal info exposure

4. `grep -riE "krystal.jazmin|jazmin.martinez"` — personal name exposure (allowlist context-appropriate hits like role-definitions and best-practices docs)
5. Email addresses, phone numbers, physical addresses in non-LICENSE / non-CONTRIBUTING content

### Operational artifact exposure

6. Audit log filenames using non-branded form (`self-audit-log` / `ai-self-audit-log` / `audit-edit-log` instead of `asae-log` / `asae-audit-log`)
7. Template filenames revealing acronym expansions

### Filesystem hygiene

8. `.vscode/`, `.idea/` editor configs (often leak local paths)
9. `.env` / `.env.example` with non-empty values that look like secrets
10. Tracked files matching `.gitignore` patterns (sign of recent ignore rule additions)

## Execution Protocol

### Step 1: Receive arguments + validate target

Read invocation arguments. Require `target` to be a real path. If `--fork-event` flag present, require target to be a git repo (has `.git/` directory).

### Step 2: Build allowlist

Load default allowlist (above) + any user-supplied additions. Resolve all allowlist paths to absolute. Skill warns if an allowlisted path doesn't exist (could indicate stale allowlist).

### Step 3: BLOCKER tier sweep (if scope ∈ {blocker-only, both})

Run each BLOCKER pattern in sequence. For each pattern:
- Filesystem patterns (#1-2): `find <target> -type d -iname "*<pattern>*"` + `find <target> -type f -iname "*<pattern>*"` minus allowlist
- Content patterns (#3-5): `grep -riE "<regex>" <target> --exclude-dir=<allowlist-dirs>`
- Frontmatter patterns (#6): `grep -riE "^(owner|authored_by|author):.*<regex>" <target> --include="*.md" --include="*.yaml" --include="*.yml"`
- Manifest patterns (#7-8): targeted reads of known manifest files
- Binary patterns (#9): emit list of `*.pdf`, `*.docx`, `*.pptx`, `*.xlsx` under target — manual inspection required
- Generated artifacts (#10): `git ls-files --error-unmatch <dist|build|target|node_modules>` — error means tracked

Capture hits as findings. Each finding: `{tier: BLOCKER, pattern_id, path, line_no?, evidence_line, category}`.

Categorize each by `category`:
- `mechanical-rename` (string substitution suffices; e.g., `stahl-systems` → `martinez-methods`)
- `contextual-phrase` (substitution alone breaks meaning; manual review required)
- `structural` (folder name change with refs; cascade required)
- `binary` (manual inspection required)
- `manifest` (config file edit + downstream propagation required)

### Step 4: ADVISORY tier sweep (if scope ∈ {advisory-only, both})

Same execution model as Step 3, with ADVISORY patterns. Emit findings tagged `tier: ADVISORY`.

### Step 5: Fork-event git-history sweep (if `--fork-event` flag set)

For target git repo:
- `git log --all --format='%H %s' | grep -iE "stahl|systems|pums"` — commit messages with legacy brand
- `git tag -l '*stahl*' '*systems*' '*pums*'` — tags with legacy brand
- `git branch -a | grep -iE "stahl|pums"` — branches with legacy brand
- `git log --diff-filter=A --name-only --format=' ' | sort -u | grep -iE "stahl|pums"` — files added historically with legacy-brand names (even if since renamed)
- Inspect first commit (`git rev-list --max-parents=0 HEAD`) for fork-pointer evidence (large initial drop suggests fork-import vs greenfield)

Emit fork-event findings tagged `tier: ADVISORY` (default) or `BLOCKER` if `--include-history-blocker`. Findings include suggested Fork_Origin_Catalog entry (fork_id, source_repo, fork_date_estimate, residue_count, recommended_action).

### Step 6: Compose findings report

Write report to output path. Sections:

1. **Summary** — target, scope, total findings (BLOCKER count + ADVISORY count + fork-event count), categorization counts, ELAPSED_SECONDS.
2. **BLOCKER findings table** — pattern_id × path × evidence × category × suggested-remediation.
3. **ADVISORY findings table** — same shape; non-blocking.
4. **Fork-event findings** (if applicable) — git-history-derived findings + suggested catalog entries.
5. **Allowlist confirmation** — paths skipped + sweep coverage map.
6. **Honest gaps** — patterns the skill knows it can't catch (binary file content without manual inspection; semantic-meaning-changes that mechanical rename breaks; generated content not in working tree).
7. **Recommended next steps** — per category, the routing for remediation:
   - `mechanical-rename` → bulk sed (or skill's `auto-remediate` mode)
   - `contextual-phrase` → user review (paste matched lines + file:line refs)
   - `structural` → SSOT-wrangler thread (folder cascades touch propagation)
   - `binary` → manual inspection
   - `manifest` → config edit + downstream propagation gate

### Step 7: Phase E admission gate verdict

If scope included BLOCKER tier:
- BLOCKER findings = 0 → emit `PHASE_E_ADMISSION: PASS` line at top of report
- BLOCKER findings > 0 → emit `PHASE_E_ADMISSION: REFUSED — <count> BLOCKER findings` + remediate-then-rerun instruction

The Phase E pilot wiring script reads this line; canonical-consumer submodule admission is gated on `PASS`.

### Step 8: Auto-remediate mode (if `--mode=auto-remediate`)

For findings categorized `mechanical-rename`:
- Apply `sed` substitution per `Brand_Rename_Catalog` term-rename mandates (e.g., `stahl-systems` → `martinez-methods`, `Stahl Systems` → `Martinez Methods`)
- Skip findings categorized `contextual-phrase`, `structural`, `binary`, `manifest`
- Re-run BLOCKER tier sweep against same target
- Emit before/after counts in report

If user did not pass `--mode=auto-remediate`, dry-run only — emit the substitutions as a diff for review.

### Step 9: Commit-and-push handoff

Skill itself does NOT commit. Emits report + findings; user (or Spec Genius parent thread) commits with appropriate gate audit log per `/asae` Step 6 + Phase boundary commit-and-push protocol.

If invoked from a Phase boundary (Phase 2 of Spec Genius Batch 3 plan), parent thread:
- Stages remediation edits + report file
- Authors gate audit log
- Spawns 2 raters per Mod 13 Rule A
- Commits with `ASAE-Gate: strict-5-PASS` trailer

## Cross-references when invoking + remediating

When the sweep emits findings, the parent thread routes per:

- **Brand_Rename_Catalog** (mm-claude-canonical/references/Brand_Rename_Catalog_*.md if/when authored; see honest gap below) — canonical term-rename mandates (legacy → current). The auto-remediate substitutions read from this catalog.
- **Fork_Origin_Catalog_2026-04-28_v01_I.md** — fork-event metadata. Fork-event findings produce candidate catalog entries.
- **Production_Pattern_Catalog `PAT-INHERITED-BRAND-DEBT`** (`mm-claude-canonical/references/Production_Pattern_Catalog_2026-04-27_v01_I.md`) — the failure-mode codification this skill operationalizes. Each fork event surfaced by this skill increments the pattern's `observed_in` count.
- **Pre-Publication IP Scrub Checklist** (`_grand_repo/docs/Pre_Publication_IP_Scrub_Checklist_*.md`, INTERNAL ONLY) — broader scope reference for ADVISORY tier patterns.
- **CLAUDE.md admission criterion #4** (`_grand_repo/CLAUDE.md`) — the Phase E admission gate the BLOCKER tier enforces.
- **Hook v09 Tier 36** (advisory-only on git-history-pattern detection of fork events) — companion enforcement at commit time.

## Honest gaps

1. **Brand_Rename_Catalog doesn't exist as a separate file yet.** META-4 was referenced in the Fork_Origin_Catalog placeholder but no canonical Brand_Rename_Catalog reference doc has been authored. Until it exists, auto-remediate mode uses a hardcoded substitution table inside this skill (line: `stahl-systems → martinez-methods`, `Stahl Systems → Martinez Methods`, `puMS → ASAE`, `PUMS → ASAE`, `DMIS → Martinez Methods` for non-folder-name contexts). When Brand_Rename_Catalog lands as a separate ref doc, skill should re-route to read from there.
2. **Binary file inspection is not automated.** Skill emits the binary file list; manual review remains. Future enhancement: integrate `pdftotext` + `docx2txt` for content-layer scanning of binaries.
3. **Git history rewriting is destructive.** Skill flags history-layer findings as ADVISORY by default. Promoting to BLOCKER + remediating requires `git filter-repo` or BFG, which is destructive and out-of-scope for in-skill execution. Parent thread coordinates separately if needed.
4. **Contextual-phrase classification is heuristic.** Skill uses regex + neighborhood-context to guess if a phrase is mechanical or contextual; false-classification may route a contextual-phrase to auto-remediate. Mitigation: auto-remediate emits a diff for review BEFORE applying when contextual-phrase candidates are present.
5. **Allowlist drift.** Default allowlist may need updating as new brand-residue-intentional files land (e.g., new ASAE gate logs that reference legacy brand for historical accuracy). Allowlist accepts user additions per invocation; future enhancement: persist allowlist in canonical config file.
6. **Pattern-list maintenance.** BLOCKER + ADVISORY patterns are codified in this skill. As parallel-thread evidence-pass surfaces new residue patterns, skill version bumps to v02, v03, etc. Each version update requires META-8 cascade attestation (since /rebrand-sweep is foundational methodology infrastructure).
7. **No false-negative test harness.** Skill verifies its own pattern matching against a fixture repo only when manually run; no automated test harness gates pattern-list changes. Future enhancement: bundle a fixture repo + golden-output report + diff-check gate.
8. **Single-author skill.** Authored by Spec Genius v01 alone; first canonical-thread invocation provides the second-eye review.

## Anti-patterns

- Running `--mode=auto-remediate` without first running `--mode=report` and reviewing the categorization. Mechanical-rename misclassification can break contextual phrases.
- Treating ADVISORY findings as zero-priority. ADVISORY tier exists because the residue is real — just not Phase-E-blocking. Public release gate requires both tiers PASS.
- Hand-editing files instead of using auto-remediate for mechanical-rename findings. Hand edits introduce typos + miss occurrences. Skill's substitution is exhaustive within its categorization.
- Skipping the binary-file list. Binary residue is real (PDF metadata, DOCX titles); skipping = silent fail.
- Promoting all ADVISORY findings to BLOCKER. The two-tier system encodes a deliberate threshold: BLOCKER = canonical-consumer admission gate; ADVISORY = pre-publication gate. Conflating tiers causes Phase E admission delays.
- Allowlist additions that swallow real residue. Each allowlist entry should have a documented reason; per-invocation allowlist adds without rationale are flag-for-review.

## Refusals

The skill refuses to:

- Operate on a target path that doesn't exist or isn't accessible
- Auto-remediate findings categorized `contextual-phrase` / `structural` / `binary` / `manifest`
- Rewrite git history (destructive operation; out-of-scope)
- Skip Step 7 (Phase E admission gate verdict) when scope includes BLOCKER tier — the verdict is the load-bearing output
- Run with `--include-deprecated` against `_grand_repo` or `mm-claude-canonical` `deprecated/` paths without explicit user confirmation (deprecated content intentionally preserves historical brand-context)
- Emit a PASS verdict with un-inspected binary findings — must surface the binary list and flag as manual-inspection-pending

## Related rules

- `IP language discipline` (Pre-Publication IP Scrub Checklist) — branded terminology; never methodology-paraphrase
- `axis-by-axis discipline` — sweep enumerates ALL pattern axes; never short-circuit
- `no silent execution` — emit Phase E admission verdict + categorized findings table
- `file-difficulty discipline` — Krystal reviews per-target summary, never per-finding
- `codify-larger-principles` — skill's two-tier scope codifies the Phase-E-admission-gate-vs-public-release distinction

## Versioning

v01_I (2026-04-30) — inaugural Spec Genius authoring per Batch 3 Lock 9 (META-10).

Future v02+ bumps land as new brand-residue patterns surface. Each version triggers META-8 cascade attestation (skill is foundational methodology infrastructure).
