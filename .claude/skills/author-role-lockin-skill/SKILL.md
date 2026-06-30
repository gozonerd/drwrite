---
name: author-role-lockin-skill
description: "Author the companion lock-in skill (artifact 3 of 5 per persona) for a Martinez Methods persona. Triggers on: '/author-role-lockin-skill', 'author role lockin skill', 'write companion lock-in skill'. Produces `[repo]/.claude/skills/role-definition-[lastname-kebab]/SKILL.md` that loads persona context at session start when the slug or trigger phrase is invoked. Invoked by /define-your-role-literal Phase 8 step 3."
type: skill
classification: INTERNAL ONLY
audience: martinez_methods_internal
classification_reason: Methodology IP — Lock A4 sub-skill 3 of 4; consumed by /define-your-role-literal Phase 8 + persona-bootstrap workflows.
authored_by: Clauda the Spec Genius v01 (Claude Opus 4.7, 1M context)
created: 2026-04-30
version: v01_I
provenance: Methodology Mods Batch 3 Lock A4 (per Batch 3 Handoff §3 Lock A4)
---

# /author-role-lockin-skill

## What this skill does

Authors the companion lock-in skill (artifact 3 of 5). The lock-in skill loads the persona's context into the current session when triggered by slug or invocation phrase. Trigger pattern: `claud*_*_<lastname-kebab>` (where * = wildcard).

The lock-in skill is what new threads invoke FIRST when continuing a workstream that already has a locked-in persona — it loads the role-definition + role-manifest + workstream context + persona-specific operating-constraint reminders.

## When to invoke

- **Within /define-your-role-literal Phase 8 step 3** (primary flow)
- **Standalone migration**: persona has artifacts 1 + 2 but lacks lock-in skill
- **Adding lock-in skill to a pre-existing persona** that operates without one (rare)

## When NOT to invoke

- Other artifacts (use sibling /author-role-* sub-skills)
- Editing existing role-definition-value-genius / role-definition-spec-genius lock-in skills (modify directly)

## Inputs

- **Persona context** — slug + display_name + family + version + workstream
- **Cross-references** — paths to artifacts 1 (role-definition) + 2 (role-manifest)
- **Target path** — optional; default `<repo>/.claude/skills/role-definition-<lastname-kebab>/SKILL.md`

## Skill structure (template)

```markdown
---
name: role-definition-<lastname-kebab>
description: "Locks in the Clauda/Claudette W/L <LastName> role definition for the thread. TRIGGER PATTERN: claud*_*_<lastname-snake_case> (where * = wildcard) — invoke when user types any of: 'claud<wildcard>_<wildcard>_<lastname>', '<persona-display-name>', 'lock in <persona> role'. Loads persona's canonical role-definition + role-manifest + operating constraints + refusals into thread context. Should be invoked at thread start when continuing workstream with existing locked-in persona."
type: skill
classification: INTERNAL ONLY
audience: martinez_methods_internal
classification_reason: Persona lock-in surface; methodology IP; never publish.
authored_by: <invoking persona> (Claude Opus 4.7, 1M context)
created: <YYYY-MM-DD>
version: v01_I
provenance: /define-your-role-literal Phase 8 step 3 (or standalone migration)
---

# role-definition-<lastname-kebab>

## What this skill does

Locks in the **<Persona Display Name vNN>** persona for the current thread. Loads:

- Canonical role-definition: `<path to artifact 1>`
- Role-manifest YAML: `<path to artifact 2>`
- Operating constraints (summary)
- Refusals (summary)

## When to invoke

- New thread continuing a workstream with this persona
- Mid-thread when the user wants to switch into this persona

## Operating constraints (loaded at invocation)

[paste from role-definition Section 7]

## Refusals (loaded at invocation)

[paste from role-definition Section 8]

## Cross-references

- Canonical role-definition: `<path>`
- Role-manifest: `<path>`
- /asae methodology spec: `mm-d2r-code-plan-stack/skills/asae/SKILL.md`
- Persona Design Entry Point: `Persona_Design_Entry_Point_2026-04-28_v01_I.md`

## Versioning

v01_I (<YYYY-MM-DD>) — inaugural authoring per /define-your-role-literal Phase 8.
```

## Execution Protocol

### Step 1: Receive persona context

From /define-your-role-literal Phase 8 OR standalone with prompts.

### Step 2: Compose lock-in skill from template

Substitute `<lastname-kebab>` / `<persona display name>` / `<paths>` per Step 1 inputs. Paste Operating constraints + Refusals from artifact 1 (role-definition Section 7 + 8).

### Step 3: Validate skill YAML frontmatter

Confirm frontmatter has all required fields per Skill type convention.

### Step 4: Write to canonical path + return

Default: `<repo>/.claude/skills/role-definition-<lastname-kebab>/SKILL.md`. Emit: `Wrote lock-in skill to <path>.`

## Cross-references

- `/define-your-role-literal` SKILL.md
- `/author-role-definition` (artifact 1) + `/author-role-manifest` (artifact 2) + `/author-role-propagation-script` (artifact 4)
- `Persona_Design_Entry_Point_2026-04-28_v01_I.md`
- Reference templates: `mm-claude-canonical/skills/role-definition-value-genius/SKILL.md` + `mm-claude-canonical/skills/role-definition-spec-genius/SKILL.md`

## Honest gaps

1. **v01 produces minimal-viable lock-in skill.** Reference templates have rich context-loading prose; this skill v01 produces structurally-correct artifact, content depth depends on input.
2. **Trigger pattern is wildcard-based** (`claud*_*_<lastname>`); collision risk if two personas share suffix. Mitigation: per-persona slug uniqueness check.
3. **No automated load-test of the lock-in skill.** Whether session-start actually invokes skill cleanly depends on Claude Code skill-discovery mechanism.
4. **Single-thread authoring**.

## Versioning

v01_I (2026-04-30) — inaugural Spec Genius authoring per Lock A4.
