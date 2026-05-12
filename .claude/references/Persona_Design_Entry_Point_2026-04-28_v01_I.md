---
title: Persona Design Entry Point — Canonical reference for /define-your-role-literal + /author-role-manifest
id: Persona_Design_Entry_Point_2026-04-28
created: 2026-04-28
version: v01_I
classification: INTERNAL ONLY
audience: martinez_methods_internal
classification_reason: Operational onboarding for persona-design discovery; closes inference-burden gap surfaced during persona infrastructure adoption.
authored_by: Clauda the Spec Genius v01 (Claude Opus 4.7, 1M context)
provenance: Methodology Mods Batch 3 Lock A3 DD2-D (per Batch 3 Handoff §3)
sources:
  - Methodology_Mods_Batch3_Handoff_2026-04-28_v01_I.md (Lock A3 specification)
  - _grand_repo/.claude/scratch/remediation-plans-2026-04-27/Martinez_Methods_Org_And_SSOT_Handoff_2026-04-27_v01_I.md (§2.2 fail-closed user-detection lock; line 50)
  - _grand_repo/.claude/scratch/.../SSOT_System_Design_2026-04-28_v01_I.md (§11.8 fail-closed lock confirmation)
  - mm-claude-canonical/role-manifests/clauda-the-spec-genius.yaml (role-manifest YAML reference template)
  - _grand_repo/docs/Role_Definition_Clauda_W_Value_Genius_2026-04-25_v01_I.md (canonical role-definition reference template; available in legacy workspace)
  - mm-claude-canonical/references/ASAE_Gate_Quickstart_2026-04-28_v01_I.md (Quickstart Persona Prerequisites cross-reference)
  - mm-claude-canonical/skills/define-your-role-literal/SKILL.md (meta-skill for role-definition authoring)
related_artifacts:
  - mm-claude-canonical/skills/define-your-role-literal/SKILL.md
  - mm-claude-canonical/role-manifests/
  - mm-claude-canonical/references/ASAE_Gate_Quickstart_2026-04-28_v01_I.md
  - _grand_repo/docs/Role_Definition_*.md (canonical role-definition artifacts)
---

# Persona Design Entry Point

For new threads bootstrapping a Martinez Methods persona OR for existing threads discovering "what infrastructure does my persona need?". This is the doc to read when you're about to invoke `/define-your-role-literal` OR when an ASAE gate's Tier 5 refuses your commit because your persona's role-manifest path doesn't resolve.

## What is "persona infrastructure" + why it matters

A persona is a named role-context (e.g., `Clauda W. Spec Genius v01`, `Claudette the Code Debugger`, `Clauda W. Value Genius v02`) that:

- Carries a coherent worldview + scope-of-authority across multi-day workstreams
- Surfaces in commit attribution (`Co-Authored-By: <Persona name> (Claude Opus 4.7, 1M context)`)
- Loads via session start hooks (memory + skill + role-manifest)
- Constrains Agent-tool sub-agent authority via role-manifest scope_bounds

The infrastructure exists because:

1. **Single-persona blind spots are real.** Same-persona auditing introduces systematic blind spots; persona-aware rater discipline (Mod 13 Rule A parent-only spawn) requires persona-disambiguated context.
2. **Cross-thread continuity is methodological.** Multi-day workstreams (Batch 3 itself ~50hr) span session boundaries; persona artifacts let new threads pick up coherent role-context without re-deriving.
3. **Commit attribution is load-bearing.** ASAE gates require persona attribution per `feedback_clauda_replaces_claude_in_naming.md`; "Claude" in persona position is a Rule 1 hook violation.
4. **Scope-of-authority must be machine-readable.** Role-manifest YAML's `allowed_paths` + `forbidden_paths` constrain what files a persona may touch; Hook Tier 5 verifies presence at commit time.

## The 5 artifacts (per persona)

Every persona has FIVE artifacts (the 5-artifact pattern):

| # | Artifact | Path | Purpose |
|---|---|---|---|
| 1 | **Role-definition** | `_grand_repo/docs/Role_Definition_<First>_<Middle>_<LastNameUnderscored>_<YYYY-MM-DD>_v01_I.md` | Canonical persona definition: 12-section structure with axis-by-axis defense, multiplicative-meaning compound last-name, rejected alternatives, honest gaps |
| 2 | **Role-manifest YAML** | `<repo>/role-manifests/<persona-slug>.yaml` | Machine-readable scope_bounds (allowed_paths / forbidden_paths / allowed_operations); ~125-line schema; Hook Tier 5 verifies at commit time |
| 3 | **Companion lock-in skill** | `<repo>/.claude/skills/role-definition-<lastname-kebab>/SKILL.md` | Loads persona context at session start when slug or trigger phrase invoked |
| 4 | **Propagation script** | `_grand_repo/scripts/propagate-role-skill.sh` (or per-role variant) | Cross-repo distribution of artifacts 2-3 |
| 5 | **First-gate audit log** | `_grand_repo/deprecated/asae-logs/gate-NN-<persona-lock-in>-YYYY-MM-DD.md` | ASAE strict-3+ gate establishing the persona; cites artifacts 1-4 as deliverables |

The 5 artifacts together form a persona's IDENTITY surface. Missing any of them surfaces friction at predictable points (Hook Tier 5 for #2; commit attribution for #1; session continuity for #3; cross-repo work for #4; audit trail for #5).

## Role-manifest YAML schema

Reference template: `mm-claude-canonical/role-manifests/clauda-the-spec-genius.yaml`. Schema overview (~125 lines):

```yaml
---
# Persona Role-Manifest
# Loaded by commit-msg hook Rule 7 / Tier 5 (presence + resolution).

persona:
  slug: <kebab-case-persona-slug>
  display_name: "<Full Persona Name>"
  family: clauda | claudette | other
  version: "vNN"
  workstream: "<one-paragraph workstream description>"
  canonical_role_def_doc: "<path to artifact 1>"

scope_bounds:
  allowed_repos:
    - <repo-slug>
  allowed_paths:
    - "<glob pattern>"
  forbidden_paths:
    - "<glob pattern>"
  allowed_operations:
    - commit
    - push
    - branch_create
    - <persona-specific operations>

# Optional fields:
audit_threshold: strict-5 | strict-3 | standard-2  # if persona has explicit policy
session_start_hooks:
  - <hook name>
related_personas:
  - slug: <other-persona>
    relation: <one-sentence relation>
```

Hook Tier 5 verifies the YAML file exists at the declared path; deeper scope_bounds enforcement (allowed_paths / forbidden_paths) is advisory in v05 era and lands as hardline enforcement in future v10+.

## Cody single-persona opt-out

Per design doc 11.6 lock (2026-04-28), Cody's collaboration uses a single "Claude & Cody" persona pattern as a deliberate OPT-OUT from the 5-artifact-per-persona standard. Rationale: Cody's collaboration is bounded scope (cody-only audience workstreams) and doesn't need the multi-persona disambiguation Krystal's workstreams require. The single-persona pattern is documented in Cody's role-manifest at `mm-claude-canonical/role-manifests/claude-and-cody.yaml`.

## When to invoke /define-your-role-literal

`/define-your-role-literal` is the META-skill that AUTHORS new role-definitions. Invoke it when:

- A new workstream surfaces that doesn't fit existing personas
- An existing persona's scope expanded beyond its current role-definition (rebrand existing OR author new)
- A handoff doc explicitly directs persona authoring

DO NOT invoke /define-your-role-literal for:

- Routine work within an existing persona (use the existing persona's lock-in skill instead)
- Coding-task one-offs that don't need a compound last-name (use Claudette W. plain)
- Threads where the workstream type matches an already-locked-in persona slug

`/define-your-role-literal` is invocation-gated (won't fire on accidental triggers); it has 9 phases (context-load → component-derivation → multiplicative-meaning compound design → rejected-alternatives enumeration → axis-by-axis defense → honest gaps → present + await approval → on-approval artifact authoring → on-second-approval propagation).

## When to use /author-role-manifest standalone (Lock A4 sub-skill)

After Lock A4 lands (Batch 3 Phase 11), `/author-role-manifest` is the sub-skill for authoring the YAML role-manifest (artifact #2) standalone — useful when:

- Migrating a pre-existing persona's manifest format
- Adding scope_bounds to a previously-loose persona definition
- Forking a persona's manifest for a related sibling persona

Until Lock A4 lands, role-manifest authoring is hand-edited per the schema above using `clauda-the-spec-genius.yaml` as reference.

## User-detection fail-closed semantics (per §11.8 / §2.2 lock 2026-04-28)

**CRITICAL:** when persona infrastructure loads at session start, user-detection is **fail-closed**:

> "Fail-closed: if no detection succeeds AND user doesn't respond to ambiguity prompt → no memory loads."
> — `Martinez_Methods_Org_And_SSOT_Handoff_2026-04-27_v01_I.md` §2.2 line 50; confirmed at `SSOT_System_Design_2026-04-28_v01_I.md` §11.8 line 623.

Operational consequence: if the session-start hooks cannot determine user identity (Krystal vs. Cody vs. unknown) AND the user doesn't respond to the disambiguation prompt, NO user-scoped memory loads. Session proceeds with empty user-context until detection succeeds.

The fail-closed posture exists because cross-user contamination (Krystal's memory loading in a Cody-only session OR vice versa) is a load-bearing failure mode. Fail-open-to-shared/ was considered as an alternative; locked as fail-closed per §2.2 + §11.8.

**Schema note:** `mm-claude-canonical/memory/shared/` directory exists structurally but is NOT loaded as fallback on detection-failure. If fail-open-to-shared/ becomes the lock instead, that's a small loader-logic change (out-of-scope for Lock A3 v01).

## When ASAE gate Tier 5 refuses your commit

Tier 5 refuses when the audit log declares `persona_role_manifest.path` but the YAML file doesn't exist at that path. Common causes + fixes:

1. **Persona never authored** → invoke `/define-your-role-literal` first (or work without persona authority for short-lived utility threads using Claudette W. plain)
2. **Path resolution wrong** → role-manifest exists at `mm-claude-canonical/role-manifests/<slug>.yaml`; consumer repos commit hooks resolve relative to repo root (`role-manifests/<slug>.yaml` from repo root) OR cross-repo (`mm-claude-canonical/role-manifests/<slug>.yaml`); use the path that matches the repo you're committing in
3. **Persona renamed** → role-manifest filename uses old slug; update `path:` field in audit log frontmatter to match current filename
4. **YAML untracked** → role-manifest file exists in working tree but never `git add`-ed; stage + commit it (may require sibling gate)

## First moves for persona-bootstrap

1. Determine: do I need a new persona OR does an existing one fit?
   - Read `mm-claude-canonical/role-manifests/` directory; list of existing personas
   - If one fits → invoke that persona's lock-in skill (e.g., `claud*_*_spec_genius`)
   - If none fits → continue to step 2
2. Check workstream type: coding (Claudette family) vs. non-coding (Clauda family)
3. Invoke `/define-your-role-literal` with workstream context
4. Approve persona derivation; meta-skill authors all 5 artifacts
5. First commit uses new persona attribution + cites the persona-lock-in gate audit log

## Honest gaps

1. **Lock A4 sub-skills (`/author-role-*`) not yet authored.** Phase 11 of Batch 3 ships them. Until then, role-manifest + lock-in-skill + propagation-script authoring routes through `/define-your-role-literal` Phase 8 directly.

2. **Hook v05 Rule 7 / Tier 5 error message refactor not yet shipped.** Lock A3 DD1-C scope; deferred to a future gate that updates the hook's error message to reference this Persona_Design_Entry_Point doc directly. v01 of this doc cross-referenced from `/asae` First moves + ASAE_Gate_Quickstart Persona Prerequisites section.

3. **CLAUDE.md template Persona section not yet authored.** Lock A3 DD3-C scope; deferred to a future gate that adds a Persona section to the canonical CLAUDE.md template at `mm-claude-canonical/settings/` (or wherever template lands).

4. **Role-manifest schema is v05-era.** Hook Tier 5 verifies presence only; deeper scope_bounds enforcement is advisory in v05/v06/v07/v08 era. v10+ may add hardline enforcement.

5. **User-detection mechanism is upstream of this doc.** Fail-closed semantics documented here for Lock A3 cross-reference; the actual detection logic lives in session-start hook config (out of Spec Genius scope per role-manifest forbidden_paths).

6. **No automated audit of "abandoned personas".** A persona-slug whose lock-in skill was never invoked over a long time window has no automated surfacing; relies on manual housekeeping.

## Cross-references

- `/define-your-role-literal` SKILL.md (meta-skill for role-definition authoring) — `mm-claude-canonical/skills/define-your-role-literal/SKILL.md`
- `ASAE_Gate_Quickstart_2026-04-28_v01_I.md` (Persona Prerequisites section)
- `mm-claude-canonical/role-manifests/clauda-the-spec-genius.yaml` (reference template)
- `_grand_repo/docs/Role_Definition_Clauda_W_Value_Genius_2026-04-25_v01_I.md` (reference template)
- `_grand_repo/.claude/scratch/.../Martinez_Methods_Org_And_SSOT_Handoff_2026-04-27_v01_I.md` (§2.2 fail-closed lock)
- `mm-claude-canonical/docs/SSOT_System_Design_2026-04-28_v01_I.md` (§11.8 fail-closed lock confirmation)
- Hook v08 / v09 — Tier 5 enforcement
- `feedback_clauda_replaces_claude_in_naming.md` (persona attribution rule)

## Versioning

v01_I (2026-04-30) — inaugural Spec Genius authoring per Batch 3 Lock A3 DD2-D. Covers persona infrastructure overview + 5-artifact pattern + role-manifest schema + Cody opt-out + invocation guidance + fail-closed user-detection lock + ASAE Tier 5 refuse handling + first moves for persona-bootstrap + honest gaps.

Future v02+:
- DD1-C hook error message refactor (when ships)
- DD3-C CLAUDE.md template Persona section (when ships)
- /author-role-* sub-skills cross-references (Phase 11)
