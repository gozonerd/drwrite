---
name: write-trd
description: "Use this skill to author a Technical Requirements Document as a prerequisite input to /dare-to-rise-code-plan. Triggers on: '/write-trd', 'write-trd', 'author a TRD', 'write a technical requirements document', 'generate TRD', 'draft TRD'. Requires a completed PRD as input. Loads the TRD template, walks the user through each required section, produces a validated filled-in instance. Output is a TRD file saved to the project's planning directory, ready for downstream D2R consumption."
---

# Write TRD

## Purpose

Author a Technical Requirements Document from the reusable template. Produces a filled-in TRD instance ready to serve as a prerequisite input to `/dare-to-rise-code-plan`.

The TRD is downstream of the PRD and upstream of the D2R code plan. The PRD says what the product IS; the TRD says what the system MUST DO technically. Without a PRD, a TRD cannot be authored rigorously.

## When to Use

- When `/ideate-to-d2r-ready` invokes this skill as Phase 01 Step 01.2 (usual orchestrated entry point)
- When the user invokes `/write-trd` standalone (PRD already authored and approved)
- When `/dare-to-rise-code-plan` detects a missing TRD prerequisite and redirects to this skill
- When preparing inputs for an experimental D2R run across multiple planner LLMs

## Inputs

- **Project name** — required (must match the PRD)
- **Project prefix** — required
- **PRD reference** — required (path to the completed PRD; this skill cannot proceed without it)
- **Existing TRD draft** — optional
- **Invocation context** — optional marker: `called from /ideate-to-d2r-ready Phase 01 Step 01.2`, `called from /dare-to-rise-code-plan`, or `standalone` (default). Governs handoff behavior on approval.
- **Remediation target** — optional; a specific section identifier when invoked by `/ideate-to-d2r-ready` Phase 02 to remediate a cross-doc finding. In remediation mode, skip to Step 3 for that section only, then Step 5.

## Execution Protocol

### Step 1: Verify PRD Prerequisite And Check Invocation Mode

Before loading the template, verify a completed PRD exists and is approved. If missing:
- If the user has said "skip the PRD" or "the PRD will come later" — refuse to proceed. A TRD written without a PRD is ungrounded. Offer to invoke `/write-prd` first or `/ideate-to-d2r-ready` for the full four-doc flow.
- If the user provides a PRD path, read it and cache key facts (users, goals, constraints) for cross-referencing during TRD authorship.

Check the invocation context:

- **Orchestrated mode** (`called from /ideate-to-d2r-ready`): PRD path was passed in. Proceed directly without asking the user for the PRD path. On approval in Step 6, return a structured handoff block instead of next-step guidance.
- **Remediation mode** (remediation target specified): read the existing TRD, identify the target section, route to Step 3 for that section only, then Step 5.
- **Standalone mode** (default): proceed with the user-facing protocol.

### Step 2: Load Template

Read `.claude/skills/dare-to-rise-code-plan/references/TRD_Template_2026-04-17_v01_I.md`.

### Step 3: Gather Required Content

Walk through each required section. For each section:
- Present the section's instructions
- Ask the user for content OR offer a draft based on the PRD + any prior technical context
- Cross-reference PRD sections where relevant (e.g., user journeys from PRD → user-facing behavior requirements in TRD)

Required sections:
1. Document Identity (PRD reference, revision history)
2. Functional Requirements (core, user-facing behavior, system-facing behavior)
3. Non-Functional Requirements (performance, reliability, security, privacy, **accessibility — hardwired WCAG 2.1 AA minimum**, maintainability, portability, observability)
4. Integration Requirements (external systems, internal systems, data sources)
5. Data Requirements (entities, schema, volumes, sensitivity, validation)
6. Technical Constraints (mandatory, prohibited, platform target, **hook orchestration requirements — D2R-specific**, **skill/plugin ecosystem requirements — D2R-specific**)
7. Assumptions And Dependencies
8. Out Of Scope (Technical)
9. Open Technical Questions
10. Stakeholder Approvals

### Step 4: Enforce Specificity

The TRD's non-functional requirements must have specific numbers, not adjectives. During Step 3:
- "Fast" → specific p50/p95/p99 latencies
- "Secure" → specific standards applied (OWASP items, CERT items)
- "Reliable" → specific uptime/MTBF targets
- "Scalable" → specific load capacity targets

If the user provides only adjectives, push back and ask for numbers. If they don't have numbers, document as "Open Technical Question" to be resolved in Stage 00 research.

### Step 5: Run ASAE Gate On Draft

Invoke `/asae` with:
- target: TRD draft
- sources: template + PRD + user inputs
- prompt: "Author a TRD for [project name] per the template, downstream of the PRD"
- domain: `document`
- asae_certainty_threshold: 2
- severity_policy: standard

Domain-specific checks for TRD:
- Every FR has acceptance criteria in testable terms
- Every NFR has specific numbers (not adjectives)
- WCAG 2.1 AA declared explicitly; any additional standards listed
- Security requirements reference applicable standards
- Privacy requirements address applicable regulations (or justify NA)
- Hook orchestration requirements complete
- Skill/plugin ecosystem requirements complete

### Step 6: Save, Present, Approve

Filename: `[ProjectPrefix]_TRD_[YYYY-MM-DD]_v01_I.md`
Save to the same planning directory as the PRD.

Present for user approval. On `✓`: mark TRD approved.

- **Orchestrated mode**: return a structured handoff block to the caller with `{status: approved, path: [TRD path], project_name, project_prefix, planning_directory, prd_path}`. Do not emit next-step guidance — the orchestrator handles the next step.
- **Standalone mode**: inform user the TRD is ready for D2R consumption. Recommend `/ideate-to-d2r-ready` as the usual path if the user intends to author the full four-doc bundle.

## Portable Prompt Mode

Same pattern as `/write-prd`: generate a self-contained portable prompt with template + PRD content inline, suitable for handing to another Claude thread or LLM.

## Anti-Patterns

- Authoring a TRD without a completed PRD (produces ungrounded technical requirements)
- Accepting adjectives instead of specific numbers for non-functional requirements
- Merging TRD content with PRD content (different abstraction levels by design)
- Skipping hook orchestration requirements (D2R-specific prerequisite that must be specified)

## Related Skills

- `/ideate-to-d2r-ready` — usual entry point; orchestrates this skill along with `/write-prd`, `/write-avd`, `/write-tqcd` from an app idea through cross-doc audit to approved bundle
- `/write-prd` — Product Requirements Document (must exist first)
- `/write-avd` — Architecture Vision Document (parallel; typically authored after TRD)
- `/write-tqcd` — Testing & Quality Criteria Document (downstream of TRD)
- `/dare-to-rise-code-plan` — consumes the completed TRD as prerequisite input
- `/asae` — used at Step 5
- `/file-versioning` — output filename convention

## Related References

- Template: `.claude/skills/dare-to-rise-code-plan/references/TRD_Template_2026-04-17_v01_I.md`
