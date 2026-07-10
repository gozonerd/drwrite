---
name: write-avd
description: "Use this skill to author an Architecture Vision Document as a prerequisite input to /dare-to-rise-code-plan. Triggers on: '/write-avd', 'write-avd', 'author an AVD', 'write an architecture vision document', 'generate AVD', 'draft AVD'. Requires a completed PRD + TRD as inputs. Loads the AVD template, walks the user through each required section, produces a validated filled-in instance. Output is an AVD file saved to the project's planning directory, ready for downstream D2R consumption."
---

<!-- v03: L7 anti-pattern pointer + Step-0 read + v03 template pointer (FORK-A Stage 8) -->

# Write AVD

## Dispatch Tier

This `/write-avd` authoring task is **closed-world** (dispatched per LEAD §5.3 world-openness criteria; closed-world authorship tier).

## Purpose

Author an Architecture Vision Document from the reusable template. Produces a filled-in AVD instance ready to serve as a prerequisite input to `/dare-to-rise-code-plan`.

The AVD is downstream of the PRD (what the product IS) and TRD (what it MUST DO technically). The AVD describes the system's HIGH-LEVEL SHAPE before Stage 00 research picks specific libraries and before Stage 01 writes the implementation plan.

## When to Use

- When `/ideate-to-d2r-ready` invokes this skill as Phase 01 Step 01.3 (usual orchestrated entry point)
- When the user invokes `/write-avd` standalone (PRD + TRD already authored and approved)
- When `/dare-to-rise-code-plan` detects a missing AVD prerequisite and redirects to this skill
- When preparing inputs for an experimental D2R run

## When NOT To Use

A project does not require an AVD if:
- The system is trivially simple (single file, no cross-component boundaries, no architectural choices to make)

If the user invokes `/write-avd` for a trivially simple project, this skill offers to document "AVD-skipped" status with a justification statement the user reviews and approves. That skipped-status note becomes the AVD artifact the D2R prerequisite check looks for.

## Inputs

- **Project name** — required (must match PRD/TRD)
- **Project prefix** — required
- **PRD reference** — required
- **TRD reference** — required
- **Existing AVD draft** — optional
- **Invocation context** — optional marker: `called from /ideate-to-d2r-ready Phase 01 Step 01.3`, `called from /dare-to-rise-code-plan`, or `standalone` (default). Governs handoff behavior on approval.
- **Remediation target** — optional; a specific section identifier when invoked by `/ideate-to-d2r-ready` Phase 02 to remediate a cross-doc finding. In remediation mode, skip to Step 4 for that section only, then Step 5.

## Execution Protocol

### Step 0: Required Pre-Authoring Read

Before doing anything else, read `references/anti-patterns/AVD_AntiPatterns_2026-07-06_v01_I.md` (relative to the `dare-to-rise-code-plan` skill directory). This is a REQUIRED read before authoring — it carries the full rationale and fix for every known AVD failure mode. Do not proceed to Step 1 until it has been read.

### Step 1: Verify Prerequisites And Check Invocation Mode

PRD and TRD must exist and be approved. If either missing, refuse to proceed and offer `/ideate-to-d2r-ready` for the full four-doc flow or the appropriate individual authorship skill.

Read PRD and TRD. Cache key facts: product surfaces (from PRD), technical constraints (from TRD), platform targets (from TRD), integration requirements (from TRD).

Check the invocation context:

- **Orchestrated mode** (`called from /ideate-to-d2r-ready`): PRD + TRD paths were passed in. Proceed directly. On approval in Step 6, return a structured handoff block that explicitly flags whether the result is a full AVD or a Skipped-Status AVD, so the orchestrator's Phase 02 cross-doc check knows which checks are NA.
- **Remediation mode** (remediation target specified): read the existing AVD, identify the target section, route to Step 4 for that section only, then Step 5.
- **Standalone mode** (default): proceed with the user-facing protocol.

### Step 2: Assess Whether An AVD Is Needed

Ask the user — or assess from PRD/TRD — whether the project is trivially simple. Signals of trivially simple:
- Single file
- No cross-component boundaries
- No architectural decisions to make (no language choice, no framework choice, no sync/async choice, no monolith/services choice, no client/server choice)

If trivially simple: proceed to Step 2a (Skipped-Status AVD). Else: Step 3 (Full AVD).

#### Step 2a: Skipped-Status AVD

Produce a minimal file documenting that AVD was evaluated and skipped. Content:
- Project identity
- PRD + TRD references
- Statement: "AVD evaluated and determined inapplicable. Rationale: [specific reason, e.g., 'single-file utility with no cross-component boundaries']."
- Stakeholder acknowledgment

Skip to Step 6 (save + approve).

### Step 3: Load Template

Read `.claude/skills/dare-to-rise-code-plan/references/AVD_Template_2026-04-26_v03_I.md`.

### Step 4: Gather Required Content

Walk through each required section. For each:
- Present the section's instructions
- Ask the user or offer a draft based on PRD/TRD + prior architectural context
- Cross-reference PRD surfaces (PRD Section 4) and TRD constraints (TRD Section 6) throughout

Required sections:
1. Document Identity (PRD/TRD references, revisions)
2. System Shape (one-paragraph description, architectural style, surface layers)
3. Components And Boundaries (inventory, boundaries, diagram in prose)
4. Data Flow (primary flows, secondary flows, persistence points)
5. Deployment Architecture (targets, runtime environments, configuration, topology)
6. Cross-Cutting Concerns (logging, error handling, concurrency, security, accessibility)
7. Architectural Decisions (mini-ADRs per significant decision)
8. Technical Debt And Known Compromises
9. Open Architectural Questions
10. Stakeholder Approvals

### Step 5: Run ASAE Gate On Draft

Invoke `/asae` with:
- target: AVD draft
- sources: template + PRD + TRD + user inputs
- prompt: "Author an AVD for [project name] per the template, downstream of the PRD and TRD"
- domain: `document`
- asae_certainty_threshold: 2
- severity_policy: standard

Domain-specific checks for AVD:
- Every component has inputs, outputs, responsibility
- Every primary data flow traced end-to-end
- Every deployment target has runtime + build process
- Mini-ADRs present for significant decisions (not "we used Svelte because we liked it" — specific rationale)
- Cross-cutting concerns addressed or explicitly NA

### Step 6: Save, Present, Approve

Filename: `[ProjectPrefix]_AVD_[YYYY-MM-DD]_v01_I.md`
Save to planning directory.

Present for approval. On `✓`: mark approved.

- **Orchestrated mode**: return a structured handoff block to the caller with `{status: approved, path: [AVD path], avd_type: full | skipped_status, project_name, project_prefix, planning_directory, prd_path, trd_path}`. Do not emit next-step guidance — the orchestrator handles the next step.
- **Standalone mode**: inform user the AVD is ready for D2R consumption. Recommend `/ideate-to-d2r-ready` as the usual path for the full four-doc bundle.

## Portable Prompt Mode

Same pattern as other write-* skills.

## Anti-Patterns

Full anti-pattern catalog with rationale and fixes lives in `references/anti-patterns/AVD_AntiPatterns_2026-07-06_v01_I.md` (relative to the `dare-to-rise-code-plan` skill directory) — covers PRD/TRD-less authorship, Claude inventing architecture decisions, skipped or unrationaled mini-ADRs, misuse of the Skipped-Status escape hatch (both over- and under-application), components missing inputs/outputs/responsibility, and data flows not traced end-to-end. Read it before authoring (Step 0); this section is a pointer, not the full reference.

## Related Skills

- `/ideate-to-d2r-ready` — usual entry point; orchestrates this skill along with `/write-prd`, `/write-trd`, `/write-tqcd` from an app idea through cross-doc audit to approved bundle
- `/write-prd` (must exist first)
- `/write-trd` (must exist first)
- `/write-tqcd` (typically authored after AVD)
- `/dare-to-rise-code-plan` (consumes AVD)
- `/asae` (used at Step 5)

## Related References

- Template: `.claude/skills/dare-to-rise-code-plan/references/AVD_Template_2026-04-26_v03_I.md`
- Anti-Patterns: `.claude/skills/dare-to-rise-code-plan/references/anti-patterns/AVD_AntiPatterns_2026-07-06_v01_I.md`
