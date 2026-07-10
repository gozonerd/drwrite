---
name: write-prd
description: "Use this skill to author a Product Requirements Document as a prerequisite input to /dare-to-rise-code-plan. Triggers on: '/write-prd', 'write-prd', 'author a PRD', 'write a product requirements document', 'generate PRD', 'draft PRD'. Loads the PRD template, walks the user through each required section, produces a validated filled-in instance. Output is a PRD file saved to the project's planning directory, ready for downstream D2R consumption."
---

<!-- v03: L7 anti-pattern pointer + Step-0 read + v03 template pointer (FORK-A Stage 8) -->

# Write PRD

## Dispatch Tier

This `/write-prd` authoring task is **closed-world** (dispatched per LEAD §5.3 world-openness criteria; closed-world authorship tier).

## Purpose

Author a Product Requirements Document from the reusable template. Produces a filled-in PRD instance ready to serve as a prerequisite input to `/dare-to-rise-code-plan`.

This skill is designed for transferability: it can run in any Claude thread, and its output feeds into D2R regardless of which thread authored the PRD.

## When to Use

- When `/ideate-to-d2r-ready` invokes this skill as Phase 01 Step 01.1 (usual orchestrated entry point)
- When the user invokes `/write-prd` standalone (idea already PRD-ready; no pre-PRD interrogation needed)
- When `/dare-to-rise-code-plan` detects a missing PRD prerequisite and redirects to this skill
- When preparing inputs for an experimental D2R run across multiple planner LLMs — the same PRD instance fed to each planner

## Inputs

- **Project name** — required
- **Project prefix** for filename (`CC` for Claude Cost, etc.) — required
- **Target D2R skill version** — optional (defaults to current)
- **Existing PRD draft** — optional; if provided, this skill refines rather than authors from scratch
- **Ideation summary** — optional path to the Phase 00 ideation summary file from `/ideate-to-d2r-ready`. When provided, use its captured answers as the starting content for Sections 2, 3, and 6 rather than asking the user to restate.
- **Invocation context** — optional marker: `called from /ideate-to-d2r-ready Phase 01 Step 01.1`, `called from /dare-to-rise-code-plan`, or `standalone` (default). Governs handoff behavior in Step 6.
- **Remediation target** — optional; a specific section identifier (e.g., `Section 2.1`) when invoked by `/ideate-to-d2r-ready` Phase 02 to remediate a cross-doc finding. In remediation mode, skip Steps 2–3 and edit only the target section.

## Execution Protocol

### Step 0: Required Pre-Authoring Read

Before doing anything else, read `references/anti-patterns/PRD_AntiPatterns_2026-07-06_v01_I.md` (relative to the `dare-to-rise-code-plan` skill directory). This is a REQUIRED read before authoring — it carries the full rationale and fix for every known PRD failure mode. Do not proceed to Step 1 until it has been read.

### Step 1: Load Template And Check Invocation Mode

Read the template at `.claude/skills/dare-to-rise-code-plan/references/PRD_Template_2026-04-26_v03_I.md`. Use it as the structural spec for the output.

Check the invocation context:

- **Orchestrated mode** (`called from /ideate-to-d2r-ready`): an ideation summary path should be provided. Read it and use the captured answers as starting content. Skip standalone readiness checks — the orchestrator has already run Phase 00 interrogation. In Step 6, return a structured handoff block instead of next-step guidance.
- **Remediation mode** (remediation target specified): read the existing PRD, load only the target section from the template, route to Step 3 for that section only, then Step 5.
- **Standalone mode** (default): before loading content, run a lightweight readiness check — confirm the user can answer each of the five interrogation questions (who specifically, what problem with evidence, why now with specific environment-change, one-line outcome-terms description, hard constraints). If any answer is under-baked, recommend invoking `/ideate-to-d2r-ready` instead and ask the user whether to proceed in standalone mode anyway.

### Step 2: Gather Required Content

Walk through each required section with the user. For each section:
- Present the section's instructions (from the template's italic text)
- Ask the user for the content, or offer a draft based on context available
- Capture the filled-in content

Required sections (see template for details):
1. Product Identity (name, version, one-line description)
2. Users And Problem (primary users, problem statement, why now)
3. Goals (primary goals, non-goals)
4. User Journeys (primary journeys at minimum)
5. Success Criteria (measurable outcomes)
6. Constraints (business, regulatory, technical, accessibility)
7. Assumptions
8. Open Questions
9. Out Of Scope
10. Stakeholder Approvals (at minimum the document author)

Optional sections can be filled or marked NA with one-line justification.

### Step 3: Run ASAE Gate On Draft

Before saving, invoke `/asae` with scope:
- target: the draft PRD content
- sources: the template + user-provided inputs + prior context
- prompt: "Author a PRD for [project name] per the template"
- domain: `document`
- asae_certainty_threshold: 2
- severity_policy: standard

Domain-specific checks for PRD:
- Every user segment described specifically (not "everyone" or "developers")
- Problem statement has evidence, not only intuition
- Goals measurable with targets and timeframes
- Non-goals explicitly named
- User journeys written from user perspective
- All required sections completed or NA-justified

### Step 4: Save The Instance

Filename: `[ProjectPrefix]_PRD_[YYYY-MM-DD]_v01_I.md`
Default location: `[project-root]/docs/planning/` (or a location the user specifies)

Use `/file-versioning` rules if the project already has versioning conventions.

### Step 5: Present For Approval

Present the saved PRD file path to the user with:
- Validation checklist status (all boxes checked, or which items remain pending)
- Stakeholder approval status

Wait for explicit `✓` from the user before marking the PRD approved.

### Step 6: On Approval

- Mark stakeholder approval section complete in the file
- **Orchestrated mode**: return a structured handoff block to the caller with `{status: approved, path: [PRD path], project_name, project_prefix, planning_directory}`. Do not emit next-step guidance — the orchestrator handles the next step.
- **Standalone mode**: inform user the PRD is ready for D2R consumption (alongside TRD, AVD, TQVCD if they're also ready). Recommend `/ideate-to-d2r-ready` as the usual path if the user intends to author the full six-doc bundle.

## Portable Prompt Mode

If the user is NOT in the environment where they want the PRD authored (e.g., the filled-in PRD needs to be produced by a different Claude thread or a different LLM), this skill can produce a PORTABLE PROMPT instead of running the authoring directly.

Portable prompt mode triggered by user saying: "give me a portable prompt to fill out the PRD" or equivalent.

The generated portable prompt must:
- Include the template content INLINE (so the receiving LLM doesn't need access to the template file)
- Include the user's project context inline
- Include the filename convention for the output
- Include ASAE gate instructions (run `/asae` if available; else manually verify against the domain-specific checks in Step 3)
- Include a self-contained validation checklist
- Be copyable and pasteable into any Claude thread or any capable LLM with no prerequisites

## Anti-Patterns

Full anti-pattern catalog with rationale and fixes lives in `references/anti-patterns/PRD_AntiPatterns_2026-07-06_v01_I.md` (relative to the `dare-to-rise-code-plan` skill directory) — covers template-skipping, validation-checklist-skipping, PRD/TRD/AVD content bleed, unapproved invention, ASAE threshold misuse, solutioning-in-problem-statement, unfalsifiable metrics, and scope creep via vague criteria. Read it before authoring (Step 0); this section is a pointer, not the full reference.

## Related Skills

- `/ideate-to-d2r-ready` — usual entry point; orchestrates this skill along with `/write-trd`, `/write-avd`, `/write-tqcd` from an app idea through cross-doc audit to approved bundle
- `/write-trd` — Technical Requirements Document (downstream of PRD)
- `/write-avd` — Architecture Vision Document (downstream of PRD + TRD)
- `/write-tqcd` — Testing & Quality Criteria Document (downstream of TRD)
- `/dare-to-rise-code-plan` — consumes the completed PRD as prerequisite input
- `/asae` — used at Step 3 to gate the draft
- `/file-versioning` — governs the output filename convention

## Related References

- Template: `.claude/skills/dare-to-rise-code-plan/references/PRD_Template_2026-04-26_v03_I.md`
- Anti-Patterns: `.claude/skills/dare-to-rise-code-plan/references/anti-patterns/PRD_AntiPatterns_2026-07-06_v01_I.md`
