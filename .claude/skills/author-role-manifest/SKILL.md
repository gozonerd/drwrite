---
name: author-role-manifest
description: "Author the role-manifest YAML file (artifact 2 of 5 per persona) for a Martinez Methods persona. Triggers on: '/author-role-manifest', 'author role manifest', 'write role-manifest yaml'. Produces machine-readable scope_bounds + allowed_paths + forbidden_paths + allowed_operations YAML at `[repo]/role-manifests/[persona-slug].yaml`. Hook v05+ Tier 5 verifies presence. Invoked by /define-your-role-literal Phase 8 step 2, OR standalone for migrating pre-existing personas to canonical manifest format."
type: skill
classification: INTERNAL ONLY
audience: martinez_methods_internal
classification_reason: Methodology IP — Lock A4 sub-skill 2 of 4; consumed by /define-your-role-literal Phase 8 + persona-bootstrap workflows.
authored_by: Clauda the Spec Genius v01 (Claude Opus 4.7, 1M context)
created: 2026-04-30
version: v01_I
provenance: Methodology Mods Batch 3 Lock A4 (per Batch 3 Handoff §3 Lock A4)
---

# /author-role-manifest

## What this skill does

Authors the role-manifest YAML file (artifact 2 of 5 in the persona 5-artifact pattern). ~125-line schema with persona metadata + scope_bounds + allowed_repos + allowed_paths + forbidden_paths + allowed_operations + optional cross-references.

This artifact is the MACHINE-READABLE scope authority for the persona. Hook v05+ Tier 5 verifies the manifest exists at the declared path; v10+ may add hardline scope_bounds enforcement.

## When to invoke

- **Within /define-your-role-literal Phase 8 step 2** (primary flow)
- **Standalone migration**: when a pre-existing persona has a role-definition (artifact 1) but lacks the YAML manifest
- **Forking a manifest**: creating a sibling persona's manifest with adjusted scope_bounds

## When NOT to invoke

- Other artifacts (use sibling /author-role-* sub-skills)
- Editing the canonical clauda-the-spec-genius.yaml (modify directly + commit; no skill invocation needed)

## Inputs

- **Persona context** — slug + display_name + family + version + workstream
- **Scope bounds** — allowed_repos + allowed_paths + forbidden_paths + allowed_operations
- **Target path** — optional; default `<repo>/role-manifests/<persona-slug>.yaml`

## YAML schema (~125-line full schema; key fields)

```yaml
---
# Persona Role-Manifest
# Loaded by commit-msg hook v05+ Rule 7 / Tier 5 (presence + resolution).

persona:
  slug: <kebab-case>
  display_name: "<Persona Name vNN>"
  family: clauda | claudette | other
  version: "vNN"
  workstream: "<one-paragraph workstream description>"
  canonical_role_def_doc: "<path to artifact 1>"

scope_bounds:
  allowed_repos:
    - <repo-slug>
  allowed_paths:
    - "<glob>"
  forbidden_paths:
    - "<glob>"
  allowed_operations:
    - commit
    - push
    - branch_create
    - <persona-specific>

# Optional fields
audit_threshold: strict-5 | strict-3 | standard-2  # if persona has explicit policy
session_start_hooks:
  - <hook>
related_personas:
  - slug: <other-persona>
    relation: <one-sentence relation>
```

## Execution Protocol

### Step 1: Receive persona context

If invoked from `/define-your-role-literal` Phase 8: receive persona derivation + scope_bounds inferred from workstream type (coding → Claudette family → broader code paths; non-coding → Clauda family → docs/methodology paths).

If standalone: surface prompts for missing context (workstream / scope bounds).

### Step 2: Apply scope-bounds heuristics

Default allowed_paths by family:
- **Clauda** (non-coding): `_grand_repo/docs/**` + `_grand_repo/.claude/skills/**` + persona-specific role-manifests + spec authoring paths
- **Claudette** (coding): `repos/<app-name>/**` (excluding plugin/src/** unless persona is plugin-author) + test paths + build configs

Default forbidden_paths (universal):
- `**/.env*` (secrets)
- `**/credentials.json` (secrets)
- Other persona-specific exclusions

### Step 3: Compose YAML

Populate template per Step 1+2 + optional fields (audit_threshold / session_start_hooks / related_personas) when applicable.

### Step 4: Validate YAML syntax

Run `yaml.parse` (Node.js) OR `python -c "import yaml; yaml.safe_load(open('<file>'))"` to confirm valid YAML.

### Step 5: Write to canonical path + return

Default: `<repo>/role-manifests/<persona-slug>.yaml`. For Martinez Methods canonical: `mm-claude-canonical/role-manifests/<slug>.yaml`. For consumer repos: `_grand_repo/role-manifests/<slug>.yaml` per Hook Tier 5 path resolution.

Emit: `Wrote role-manifest to <path>; YAML valid; <field-count> top-level fields.`

## Cross-references

- `/define-your-role-literal` SKILL.md
- `/author-role-definition` (artifact 1) + `/author-role-lockin-skill` (artifact 3) + `/author-role-propagation-script` (artifact 4)
- `Persona_Design_Entry_Point_2026-04-28_v01_I.md` (5-artifact pattern + role-manifest schema documentation)
- Reference template: `mm-claude-canonical/role-manifests/clauda-the-spec-genius.yaml`
- Hook v05+ Tier 5 enforcement: `mm-claude-canonical/hooks/commit-msg-v09`

## Honest gaps

1. **v01 default scope-bounds heuristics are coarse.** Family-based defaults (Clauda vs Claudette) are starting points; per-persona refinement at authoring time.
2. **No automated scope_bounds validation against actual paths.** Manifest may declare paths that don't exist; future v02 enhancement.
3. **No fixture-test corpus.**
4. **Single-thread authoring**.

## Versioning

v01_I (2026-04-30) — inaugural Spec Genius authoring per Lock A4.
