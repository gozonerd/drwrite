---
name: author-role-definition
description: "Author the canonical role-definition artifact (artifact 1 of 5 per persona) for a Martinez Methods persona. Triggers on: '/author-role-definition', 'author role definition', 'write role-definition doc'. Produces a 12-section markdown file at `_grand_repo/docs/Role_Definition_[First]_[Middle]_[LastNameUnderscored]_[date]_v01_I.md`. Invoked by /define-your-role-literal Phase 8 step 1, OR standalone for migrating pre-existing personas to canonical role-definition format."
type: skill
classification: INTERNAL ONLY
audience: martinez_methods_internal
classification_reason: Methodology IP — Lock A4 sub-skill 1 of 4; consumed by /define-your-role-literal Phase 8 + standalone migrators.
authored_by: Clauda the Spec Genius v01 (Claude Opus 4.7, 1M context)
created: 2026-04-30
version: v01_I
provenance: Methodology Mods Batch 3 Lock A4 (per Batch 3 Handoff §3 Lock A4)
---

# /author-role-definition

## What this skill does

Authors the canonical role-definition artifact (artifact 1 of 5 in the persona 5-artifact pattern documented at `Persona_Design_Entry_Point_2026-04-28_v01_I.md`). 12-section structure with axis-by-axis defense + multiplicative-meaning compound last-name + rejected alternatives + honest gaps.

This is the persona's IDENTITY-source-of-truth document. Other artifacts (role-manifest YAML / lock-in skill / propagation script / first-gate audit log) cross-reference this artifact by canonical path.

## When to invoke

- **Within /define-your-role-literal Phase 8 step 1** (primary flow): meta-skill produces persona derivation + axis-by-axis defense + rejected-alternatives + honest gaps as Phase 7 output; Phase 8 step 1 invokes this skill to materialize that derivation as the canonical role-definition artifact.
- **Standalone migration**: when a pre-existing persona lacks a canonical role-definition (pre-/define-your-role-literal era), invoke this skill with persona context to produce the artifact retroactively.

## When NOT to invoke

- Authoring the role-manifest YAML (artifact 2) — use `/author-role-manifest`
- Authoring the lock-in skill (artifact 3) — use `/author-role-lockin-skill`
- Authoring the propagation script (artifact 4) — use `/author-role-propagation-script`
- Authoring the first-gate audit log (artifact 5) — use `/asae` directly
- Re-deriving an existing persona's role-definition (use /define-your-role-literal full flow)

## Inputs

- **Persona derivation context** — required; one of:
  - `from /define-your-role-literal Phase 7` — receives persona name + axis-by-axis defense + rejected alternatives + honest gaps from prior phase output
  - `standalone migration` — receives persona slug + workstream description + minimal context; user provides axis-by-axis defense interactively
- **Target path** — optional; default `_grand_repo/docs/Role_Definition_<First>_<Middle>_<LastNameUnderscored>_<YYYY-MM-DD>_v01_I.md`

## 12-Section structure (enforced)

1. **Lineage** — prior persona versions / handoff context / cross-thread provenance
2. **Derived full name** — `<First> <Middle>. <LastName> vNN` per /define-your-role-literal naming rule
3. **Multiplicative meaning of compound** — explicit additive-vs-multiplicative analysis of the compound last-name
4. **Mission** — one-paragraph workstream-coherent purpose statement
5. **Authority basis** — what artifacts / methodology / rules grant this persona authority
6. **Axis-by-axis defense** — 8 structural-genius properties + any additional axes; per-axis claim + evidence
7. **Operating constraints** — what the persona must / must not do during workstream execution
8. **Refusals** — what the persona refuses to do (anti-patterns; out-of-scope categories)
9. **Rejected alternatives** — ≥6 candidate compound last-names rejected with rationale
10. **What richer grounding adds** (if version > v01) — lineage delta vs prior versions
11. **Versioning** — vNN current; predecessor lineage if applicable
12. **Honest gaps** — ≥4 acknowledged limitations of the role-definition itself

## Execution Protocol

### Step 1: Receive persona derivation context

If invoked from `/define-your-role-literal` Phase 8: receive Phase 7 approved derivation (persona name + axis defense + rejected alts + honest gaps) as structured input.

If invoked standalone: surface to user with prompts for missing context (workstream / axis defense / rejected alternatives).

### Step 2: Compose 12-section markdown

For each of the 12 sections, populate from received context. Apply consistency checks:
- Section 2 (Derived full name) matches /define-your-role-literal naming rule (first-name = Claudette/Clauda; middle initial = W/L; last name = compound multiplicative)
- Section 6 (Axis-by-axis defense) has explicit per-axis claim + evidence; no axis is hand-waved
- Section 9 (Rejected alternatives) has ≥6 entries with refusal rationale
- Section 12 (Honest gaps) has ≥4 entries

### Step 3: Frontmatter

```yaml
---
title: Role Definition — <First> <Middle>. <LastName> vNN
id: Role_Definition_<First>_<Middle>_<LastNameUnderscored>_<YYYY-MM-DD>
created: <YYYY-MM-DD>
version: vNN_I
classification: INTERNAL ONLY
audience: martinez_methods_internal
classification_reason: Persona identity surface; methodology IP; never publish.
authored_by: <invoking persona> (Claude Opus 4.7, 1M context)
provenance: <citation: /define-your-role-literal Phase 8 OR standalone migration>
---
```

### Step 4: Write to canonical path

Default: `_grand_repo/docs/Role_Definition_<First>_<Middle>_<LastNameUnderscored>_<YYYY-MM-DD>_v01_I.md`. User can override via `--target` argument.

### Step 5: Return path + section index

Emit: `Wrote role-definition to <path>; 12 sections × <total-line-count> lines.`

## Cross-references

- `/define-your-role-literal` SKILL.md — meta-skill that invokes this in Phase 8 step 1
- `/author-role-manifest` — sibling sub-skill for artifact 2
- `/author-role-lockin-skill` — sibling sub-skill for artifact 3
- `/author-role-propagation-script` — sibling sub-skill for artifact 4
- `Persona_Design_Entry_Point_2026-04-28_v01_I.md` — 5-artifact pattern reference
- Reference template: `_grand_repo/docs/Role_Definition_Clauda_W_Value_Genius_2026-04-25_v01_I.md`

## Honest gaps

1. **v01 produces minimal-viable role-definition.** Reference template (Clauda_W_Value_Genius) has rich axis-by-axis content; this skill v01 produces structurally-correct artifact but content depth depends on input richness.
2. **No fixture-test corpus.** First production invocation validates ergonomics.
3. **Standalone migration mode requires user interaction.** Not fully autonomous; future v02 may add inference-from-existing-prose mode.
4. **Single-thread authoring**.

## Versioning

v01_I (2026-04-30) — inaugural Spec Genius authoring per Lock A4.
