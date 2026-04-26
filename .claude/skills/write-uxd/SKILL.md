---
name: write-uxd
description: "Use this skill to author a User Experience Document as a prerequisite input to /dare-to-rise-code-plan. Triggers on: '/write-uxd', 'write-uxd', 'author a UXD', 'write a user experience document', 'generate UXD', 'draft UXD', 'design system doc'. Loads the UXD template, walks the user through each required section with reference-anchor discipline, produces a validated filled-in instance. Output is a UXD file saved to the project's planning directory, ready for downstream D2R consumption and Stage NN Design Polish."
---

# Write UXD

## Purpose

Author a User Experience Document from the reusable template. Produces a filled-in UXD instance ready to serve as a prerequisite input to `/dare-to-rise-code-plan`.

The UXD is the F13-equivalent reality anchor for the visual layer. Without it, the implementer falls back to generic-component-library defaults regardless of what the PRD/TRD/AVD specify, producing internally-consistent but externally-bland output. The UXD's reference apps + concrete brand-voice decisions + polish criteria + reference design assets are the load-bearing inputs that prevent that failure mode.

This skill is designed for transferability: it can run in any Claude thread, and its output feeds into D2R regardless of which thread authored the UXD.

## When to Use

- When `/ideate-to-d2r-ready` invokes this skill as Phase 2 Step 2.5 (usual orchestrated entry point)
- When the user invokes `/write-uxd` standalone (UXD-readiness already addressed; no pre-UXD interrogation needed)
- When `/dare-to-rise-code-plan` detects a missing UXD prerequisite and redirects to this skill
- When preparing inputs for an experimental D2R run across multiple planner LLMs — the same UXD instance fed to each planner

## Inputs

- **Project name** — required
- **Project prefix** for filename (`CC` for Claude Cost, `CCC` for Claude Clarified Chat, etc.) — required
- **Target D2R skill version** — optional (defaults to current)
- **Existing UXD draft** — optional; if provided, this skill refines rather than authors from scratch
- **Ideation summary** — optional path to the Phase 1 ideation summary file from `/ideate-to-d2r-ready`. When provided, use its captured answers (especially the brand voice + reference app questions added for UXD-readiness) as starting content
- **PRD reference** — optional path to the approved PRD; UXD draws user segments + journeys from PRD Sections 2 + 4
- **Reference design assets** — optional paths to existing screenshots, mockups, palettes, specimens. If not provided, the skill walks the user through capturing them
- **Invocation context** — optional marker: `called from /ideate-to-d2r-ready Phase 2 Step 2.5`, `called from /dare-to-rise-code-plan`, or `standalone` (default). Governs handoff behavior in Step 6
- **Remediation target** — optional; a specific section identifier (e.g., `Section 2.1`) when invoked by `/ideate-to-d2r-ready` Phase 3 to remediate a cross-doc finding. In remediation mode, skip Steps 2–3 and edit only the target section

## Execution Protocol

### Step 1: Load Template And Check Invocation Mode

Read the template at `.claude/skills/dare-to-rise-code-plan/references/UXD_Template_2026-04-25_v01_I.md`. Use it as the structural spec for the output.

Check the invocation context:

- **Orchestrated mode** (`called from /ideate-to-d2r-ready`): an ideation summary path should be provided; a PRD reference should also be available. Read both and use captured answers + PRD content as starting content. Skip standalone readiness checks — the orchestrator has already run Phase 1 interrogation including UXD-readiness questions. In Step 6, return a structured handoff block instead of next-step guidance.
- **Remediation mode** (remediation target specified): read the existing UXD, load only the target section from the template, route to Step 3 for that section only, then Step 5.
- **Standalone mode** (default): before loading content, run a lightweight readiness check — confirm the user can answer the UXD-readiness questions (named reference apps with screenshots; brand voice as concrete visual decisions; polish criteria as observable tests; reference design assets either provided or planned). If any answer is under-baked, recommend invoking `/ideate-to-d2r-ready` instead and ask the user whether to proceed in standalone mode anyway.

### Step 2: Gather Required Content

Walk through each required section with the user. For each section:
- Present the section's instructions (from the template's italic text)
- Ask the user for the content, or offer a draft based on context available (PRD content, existing reference assets, ideation summary)
- Capture the filled-in content

Required sections (see template for details):
1. Aesthetic Anchors — reference apps with screenshots, brand voice as concrete visual decisions, polish criteria as observable tests
2. Visual Design System — color palette (semantic + hex + contrast), typographic scale, spacing system, component tokens
3. Interaction Patterns — state catalog per component class, empty/loading/error/success state catalog per screen, animation guidelines
4. Information Architecture — hierarchy rules, grouping/prioritization, navigation pattern
5. Accessibility-As-Delight — ARIA label quality, keyboard nav quality, screen reader experience, motion preferences
6. Responsive + Mobile Behavior — breakpoints, per-breakpoint layout changes, touch-target sizing, mobile-only patterns
7. Anti-Patterns To Avoid — named anti-patterns with what-it-looks-like / why-anti / replacement
8. Reference Design Assets — asset inventory, storage and versioning
9. Stakeholder Approvals — at minimum the document author plus any design stakeholder
10. Open Questions

Optional sections can be filled or marked NA with one-line justification.

**Reference-anchor discipline (load-bearing):**

For Section 1.1 specifically, do NOT accept reference apps without screenshots. If the user names an app but does not have or cannot obtain a screenshot, walk through one of:

1. Capture the screenshot now (user takes it; provides path)
2. Use a publicly available screenshot (user provides URL; skill stores reference)
3. Defer the reference and mark Section 1.1 incomplete

Without screenshots, the reference anchor is words-only and re-introduces the F13-class failure (fictional reference). Hold the gate.

For Section 1.2, do NOT accept brand-voice decisions stated as adjectives ("modern", "clean", "professional"). Reject and walk through eliciting concrete visual decisions per the template's example format.

### Step 3: Run ASAE Gate On Draft

Before saving, invoke `/asae` with scope:
- target: the draft UXD content + the reference design assets in their declared locations
- sources: the template + user-provided inputs + PRD reference + prior context
- prompt: "Author a UXD for [project name] per the template, with reference-anchor discipline"
- domain: `design`
- asae_certainty_threshold: 2
- severity_policy: standard

Domain-specific checks for UXD (per /asae domain=design checklist):
- Reference apps named with concrete screenshots present at declared paths (not described in prose only)
- Brand voice expressed as 5+ concrete visual decisions, not adjectives
- Polish criteria are observable tests with 3-step checks, not adjectives
- Color palette has semantic role names AND hex values AND contrast ratios verified against text usage
- Typographic scale has rationale (why these sizes, this font)
- State catalog covers all 10 standard states for every interactive component class (default / hover / focus / focus-visible / active / disabled / loading / empty / error / success)
- Empty / loading / error / success states specified for every screen-or-surface with copy + visual treatment + actions
- Accessibility-as-delight criteria are concrete (e.g., "ARIA labels are action verbs not nouns" — observable, not "labels are good")
- Reference design assets exist at the declared paths and match the inventory in Section 8.1
- Anti-patterns named with concrete examples (Section 7), preventing generic-default fallback

### Step 4: Save The Instance

Filename: `[ProjectPrefix]_UXD_[YYYY-MM-DD]_v01_I.md`
Default location: `[project-root]/docs/planning/` (or a location the user specifies)

Reference design assets save to: `[project-root]/docs/planning/uxd-assets/[YYYY-MM-DD]/` per file-naming-and-versioning rule (or wherever the UXD's Section 8.2 declared).

Use `/file-versioning` rules if the project already has versioning conventions.

### Step 5: Present For Approval

Present the saved UXD file path AND the saved reference asset paths to the user with:
- Validation checklist status (all boxes checked, or which items remain pending)
- Reference asset existence status (each Section 8.1 asset confirmed present at declared path)
- Stakeholder approval status

Wait for explicit `✓` from the user before marking the UXD approved.

### Step 6: On Approval

- Mark stakeholder approval section complete in the file
- **Orchestrated mode**: return a structured handoff block to the caller with `{status: approved, path: [UXD path], assets_dir: [reference assets dir], project_name, project_prefix, planning_directory}`. Do not emit next-step guidance — the orchestrator handles the next step.
- **Standalone mode**: inform user the UXD is ready for D2R consumption (alongside PRD, TRD, AVD, TQCD if they're also ready). Recommend `/ideate-to-d2r-ready` as the usual path if the user intends to author the full five-doc bundle.

## Portable Prompt Mode

If the user is NOT in the environment where they want the UXD authored (e.g., the filled-in UXD needs to be produced by a different Claude thread or a different LLM), this skill can produce a PORTABLE PROMPT instead of running the authoring directly.

Portable prompt mode triggered by user saying: "give me a portable prompt to fill out the UXD" or equivalent.

The generated portable prompt must:
- Include the template content INLINE (so the receiving LLM doesn't need access to the template file)
- Include the user's project context inline (PRD content if available, existing reference assets if available)
- Include the filename convention for the output
- Include the reference-anchor discipline rules from Step 2 explicitly (no adjectives-only brand voice, no reference apps without screenshots)
- Include ASAE gate instructions (run `/asae` with domain=design if available; else manually verify against the domain-specific checks in Step 3)
- Include a self-contained validation checklist
- Be copyable and pasteable into any Claude thread or any capable LLM with no prerequisites

## Anti-Patterns

- Writing a UXD without the template (produces inconsistent output across projects)
- Skipping the reference-anchor discipline in Step 2 (re-introduces F13-class fictional-reference failure at the visual layer)
- Accepting brand-voice decisions stated as adjectives ("modern", "clean", "professional") — produces UXDs that fail to constrain implementer choices
- Accepting reference apps without screenshots — words-only references don't anchor implementation
- Filling in content the user hasn't approved (this is user-facing visual character, not Claude's invention)
- Running the ASAE gate at threshold > 2 (a UXD is pre-implementation content; threshold 2 is appropriate rigor for design-spec authorship; cross-doc gate at threshold 3 strict happens at Phase 3 in `/ideate-to-d2r-ready`)
- Treating the UXD as TRD or AVD content (these are separate documents by design — TRD is tech stack, AVD is system architecture, UXD is visual + interaction character)
- Merging the polish criteria into TQCD (TQCD is functional + accessibility quality gates; UXD polish criteria are visual character bars; they overlap on accessibility but are otherwise distinct)
- Saving reference design assets without versioning (assets evolve; un-versioned assets cause downstream stages to consume stale references)

## Related Skills

- `/ideate-to-d2r-ready` — usual entry point; orchestrates this skill along with `/write-prd`, `/write-trd`, `/write-avd`, `/write-tqcd` from an app idea through cross-doc audit to approved bundle
- `/write-prd` — Product Requirements Document (upstream — UXD references PRD's user segments + journeys)
- `/write-trd` — Technical Requirements Document (companion — UXD's design system runs on TRD's tech stack)
- `/write-avd` — Architecture Vision Document (companion — UXD's component tokens map to AVD's component inventory)
- `/write-tqcd` — Testing & Quality Criteria Document (companion — UXD's accessibility-as-delight extends TQCD's WCAG compliance)
- `/dare-to-rise-code-plan` — consumes the completed UXD as prerequisite input AND as the source for Stage NN Design Polish
- `/asae` — used at Step 3 to gate the draft (domain=design)
- `/file-versioning` — governs the output filename convention

## Related References

- Template: `.claude/skills/dare-to-rise-code-plan/references/UXD_Template_2026-04-25_v01_I.md`
- F13-class lessons (the reality-anchor argument): `_experiments/experiments/d2r_methodology_factorial/analysis/exploratory_findings_2026-04-22_prompt-variance_v03_I.md` Section "F13" (when added)
