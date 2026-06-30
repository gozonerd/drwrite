---
name: author-role-propagation-script
description: "Author the per-role propagation script (artifact 4 of 5 per persona) for a Martinez Methods persona. Triggers on: '/author-role-propagation-script', 'author role propagation script', 'write per-role propagation'. Produces `_grand_repo/scripts/propagate-role-skill-[lastname-kebab].sh` (or extends shared `propagate-role-skill.sh` with a role-name argument). Cross-repo distribution of artifacts 2-3 via SSOT-wrangler daily-sync OR per-script propagation. Invoked by /define-your-role-literal Phase 8 step 4."
type: skill
classification: INTERNAL ONLY
audience: martinez_methods_internal
classification_reason: Methodology IP — Lock A4 sub-skill 4 of 4; consumed by /define-your-role-literal Phase 8 + cross-repo persona propagation workflows.
authored_by: Clauda the Spec Genius v01 (Claude Opus 4.7, 1M context)
created: 2026-04-30
version: v01_I
provenance: Methodology Mods Batch 3 Lock A4 (per Batch 3 Handoff §3 Lock A4)
---

# /author-role-propagation-script

## What this skill does

Authors the per-role propagation script (artifact 4 of 5). Two strategies:

1. **Per-role script**: dedicated `_grand_repo/scripts/propagate-role-skill-<lastname-kebab>.sh` for personas with persona-specific propagation logic
2. **Shared-script extension**: extend `_grand_repo/scripts/propagate-role-skill.sh` with role-name argument (preferred when persona's propagation matches existing pattern)

Post-SSOT-wrangler era: most persona artifacts (role-manifest YAML in `mm-claude-canonical/role-manifests/`; lock-in skill in `mm-claude-canonical/skills/role-definition-*/`) propagate via SSOT submodule daily-sync rather than per-script. This skill's per-script approach is for personas with specialized cross-repo distribution needs OR pre-SSOT legacy patterns.

## When to invoke

- **Within /define-your-role-literal Phase 8 step 4** (primary flow)
- **Standalone migration**: persona has artifacts 1+2+3 but lacks propagation script
- **Forking propagation pattern**: persona-specific cross-repo distribution overriding default SSOT-wrangler pattern

## When NOT to invoke

- SSOT-wrangler daily-sync covers the persona's distribution needs (no per-script required)
- Other artifacts (use sibling /author-role-* sub-skills)

## Inputs

- **Persona context** — slug + lastname-kebab
- **Propagation targets** — list of consumer repos receiving artifacts 2-3
- **Strategy** — `per-role-script` (default) OR `extend-shared-script`
- **Target path** — optional; default `_grand_repo/scripts/propagate-role-skill-<lastname-kebab>.sh`

## Per-role script structure (template)

```bash
#!/usr/bin/env bash
# propagate-role-skill-<lastname-kebab>.sh — Per-role propagation
#
# Authored by: Clauda the Spec Genius v01 (Claude Opus 4.7, 1M context)
# Provenance: /define-your-role-literal Phase 8 step 4 (or standalone)
#
# Distributes <persona display name vNN> artifacts (role-manifest YAML +
# lock-in skill) to consumer repos. Run after persona authoring completes
# (artifacts 1-3 + audit log committed in canonical SSOT).

set -euo pipefail

PERSONA_SLUG="<lastname-kebab>"
CANONICAL_REPO="/c/Users/NerdyKrystal/martinez-methods/mm-claude-canonical"
SOURCE_MANIFEST="$CANONICAL_REPO/role-manifests/<persona-slug>.yaml"
SOURCE_LOCKIN="$CANONICAL_REPO/skills/role-definition-<lastname-kebab>"

TARGETS=(
  # populated from propagation-targets list
  "<repo-path-1>"
  "<repo-path-2>"
)

for target in "${TARGETS[@]}"; do
  if [ ! -d "$target" ]; then
    echo "WARN: target $target not a directory; skipping" >&2
    continue
  fi
  mkdir -p "$target/role-manifests" "$target/.claude/skills/role-definition-$PERSONA_SLUG"
  cp "$SOURCE_MANIFEST" "$target/role-manifests/"
  cp -r "$SOURCE_LOCKIN/." "$target/.claude/skills/role-definition-$PERSONA_SLUG/"
  echo "[ok] propagated to $target"
done

echo "Done. $(echo "${#TARGETS[@]}") targets processed."
```

## Execution Protocol

### Step 1: Receive persona context + targets

From /define-your-role-literal Phase 8 OR standalone with prompts.

### Step 2: Determine strategy

If propagation targets ≤ 3 + standard distribution pattern → recommend `extend-shared-script` (modify `propagate-role-skill.sh`).

If > 3 targets OR specialized logic → `per-role-script`.

If SSOT-wrangler covers (manifest + lock-in already in mm-claude-canonical submodule + targets are canonical-consumers) → no script needed; emit advisory + exit.

### Step 3: Compose script per template

Substitute `<lastname-kebab>` / `<persona-slug>` / `<targets>` per Step 1 inputs.

### Step 4: Validate bash syntax

Run `bash -n <script>` to confirm syntax-clean.

### Step 5: chmod +x + write to canonical path + return

Default: `_grand_repo/scripts/propagate-role-skill-<lastname-kebab>.sh`. Make executable. Emit: `Wrote propagation script to <path>; bash -n clean; <N> targets configured.`

## Cross-references

- `/define-your-role-literal` SKILL.md
- `/author-role-definition` (artifact 1) + `/author-role-manifest` (artifact 2) + `/author-role-lockin-skill` (artifact 3)
- `Persona_Design_Entry_Point_2026-04-28_v01_I.md` (5-artifact pattern)
- Reference template: `_grand_repo/scripts/propagate-role-skill.sh` (shared-script pattern)
- SSOT-wrangler daily-sync: `mm-claude-canonical/scripts/daily-ssot-sync.sh` (alternative to per-script propagation)

## Honest gaps

1. **v01 doesn't auto-detect SSOT-wrangler coverage.** User specifies strategy; future v02 may infer from canonical-consumer-vs-legacy targets.
2. **Per-role script template has hardcoded paths.** Cross-platform path-resolution (Windows / Linux / macOS) deferred; v01 assumes Krystal's Windows + Git Bash setup.
3. **No automated propagation success verification.** Post-run check that artifacts landed at targets is manual; future v02 may add summary report.
4. **Single-thread authoring**.

## Versioning

v01_I (2026-04-30) — inaugural Spec Genius authoring per Lock A4.
