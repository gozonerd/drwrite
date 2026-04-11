---
name: dare-to-rise-code-plan
description: "Use this skill when planning ANY coding task that involves implementation. Triggers on: 'dare-to-rise-code-plan', 'dare-to-rise-code-planning', 'dare to rise code planning', 'd2r-code-plan', 'd2r code plan', '/dare-to-rise-code-plan', '/dare-to-rise-code-planning', '/d2r-code-plan', 'plan this code task', 'code plan with audit gates', or when Claude is about to produce an implementation plan for a coding task. Enforces minimum plan inclusion standards: mandatory Stage 00 research, n=5 null-edit self-audit-edit gates after every implementation step, and detailed git commits after each passed gate."
---

# Dare to Rise Code Plan

## Purpose

Enforce minimum plan inclusion standards for any coding task. Every implementation plan produced under this skill MUST include: (1) a mandatory research stage before any code is written, (2) a strict self-audit-edit quality gate after every implementation step, and (3) a detailed git commit after each passed gate. No exceptions. No shortcuts.

## When to Use

- When planning ANY coding task that involves implementation
- When the user says "dare-to-rise-code-plan", "dare-to-rise-code-planning", "dare to rise code planning", "d2r-code-plan", "d2r code plan"
- When the user invokes `/dare-to-rise-code-plan`, `/dare-to-rise-code-planning`, or `/d2r-code-plan`
- When the user says "plan this code task" or "code plan with audit gates"
- Before generating any multi-step implementation plan

## Built-In Quality Constraints (Never Afterthoughts)

### Accessibility (WCAG 2.1 AA)

Accessibility is NOT a polish stage. It is a constraint on every implementation stage that produces UI. Every component, every page, every interactive element must meet WCAG 2.1 AA at the time it is built — not in a later cleanup pass.

**Every UI stage's exit criteria MUST include:**
- Keyboard navigable (Tab, arrow keys, Enter/Space for activation)
- Visible focus indicators (`focus-visible:ring-2` or equivalent)
- Semantic HTML (correct roles, labels, `aria-*` attributes)
- Color is never the sole indicator of meaning — text labels always present
- Contrast ratios met (4.5:1 normal text, 3:1 large text)
- Touch targets ≥44x44px for any element intended for mobile
- `prefers-reduced-motion` respected on all animations

**Every UI stage's `-A` audit gate MUST check:**
- Can a keyboard-only user complete all interactions in this stage?
- Are all new elements properly labeled for screen readers?
- Does color alone convey any meaning without a text alternative?

If a stage adds UI and the audit gate does not check accessibility, the gate has not passed. Accessibility failures count as errors that reset the n=5 consecutive counter.

### Legal Pages (Web Deployments)

Any D2R plan that includes a deploy-to-web stage MUST include a legal pages stage **before** the deployment stage. This is not optional. Legal pages are not an afterthought — they ship with the first deployment.

**Required legal pages for any public web deployment:**
- Privacy Policy (`/privacy`) — data handling, analytics disclosure, cookie policy, GDPR/CCPA considerations
- Terms of Use (`/terms`) — disclaimer, limitation of liability, intellectual property

**Legal page stage requirements:**
- Pages must be accessible from a persistent footer on every page
- Pages must meet the same a11y constraints as all other UI
- Content must be reviewed in the `-A` audit gate for accuracy and completeness
- If the tool collects no PII and runs client-side only, the privacy policy must explicitly state this

**Anti-pattern:** Deploying a public-facing tool and adding legal pages later. The legal pages stage is sequenced before deployment in every plan skeleton.

---

## Plan Structure: Mandatory Stage Numbering

Every plan MUST use this stage numbering scheme:

| Stage | Purpose | Sub-Stages |
|-------|---------|------------|
| Stage 00 | Research Current Best Practices | 00-A: Audit Gate, 00-B: Commit Gate |
| Stage 01 | [First implementation step] | 01-A: Audit Gate, 01-B: Commit Gate |
| Stage 02 | [Second implementation step] | 02-A: Audit Gate, 02-B: Commit Gate |
| Stage NN | [Nth implementation step] | NN-A: Audit Gate, NN-B: Commit Gate |

- Stage 00 is ALWAYS research. It executes before any code is written.
- Stage 01+ are implementation steps. Each one gets its own audit gate and commit gate.
- The `-A` suffix is always the audit gate. The `-B` suffix is always the commit gate.
- No implementation step may lack its `-A` and `-B` sub-stages.

---

## Stage 00: Research Current Best Practices

### Purpose

Before ANY code is written, research current best practices for ALL proposed implementation steps. This stage produces a research findings document that informs every subsequent stage.

### Procedure

1. **Identify research targets.** List every technology, pattern, library, API, and architectural approach that the implementation steps will use.

2. **Research each target.** For each target, use ALL available research methods:
   - Web search for current best practices (prioritize official docs, recent guides, known-good sources)
   - Documentation lookups (Context7, library docs, framework docs)
   - Codebase exploration (find existing patterns, conventions, prior art in the repo)

3. **Document findings.** For each research target, record:
   - What the current best practice is
   - What sources confirm it
   - How it applies to the planned implementation
   - Any warnings, deprecations, or common pitfalls found

4. **Produce a Stage 00 Research Summary.** Present findings in-thread using this format:

```
## Stage 00: Research Summary

### [Research Target 1]
- **Best practice:** [finding]
- **Sources:** [what confirmed this]
- **Applies to:** [which implementation stage(s)]
- **Pitfalls:** [warnings found]

### [Research Target 2]
...
```

5. **Save the Research Summary as a file.** Before proceeding to 00-A, write the Research Summary to a file following naming conventions:
   - Filename: `D2R_Stage00_Research_Summary_YYYY-MM-DD_v01_I.md`
   - Location: appropriate subfolder in the working repo (e.g., `.claude/d2r-artifacts/` or `docs/`)
   - This file is what gets committed in Stage 00-B. Without a saved file, 00-B has nothing to commit.

6. **Proceed to Stage 00-A** (audit gate on the research findings themselves).

### Anti-Patterns

- Skipping Stage 00 because "I already know how to do this"
- Doing a shallow search and moving on — research must cover ALL implementation targets
- Starting to write code before Stage 00-B (commit gate) passes

---

## Sub-Stage A: Self-Audit-Edit Gate (n=5)

### Purpose

Quality gate that runs after every stage (including Stage 00). Uses the `ai-self-audit-edit` skill's 4-step loop but with a STRICTER exit condition.

### How It Differs from Standard Self-Audit-Edit

The standard `ai-self-audit-edit` skill exits after **1 audit pass returning zero errors.**

This skill requires **5 CONSECUTIVE audit passes returning zero errors / null edits** before the gate passes. If any pass finds even one error, the consecutive counter resets to zero.

### What "5 Consecutive Null-Edit Passes" Means

Each pass is the SAME comprehensive audit repeated from scratch. You re-read ALL sources, re-check ALL code, re-verify ALL requirements — the full audit — and find zero errors. Then you do that again. And again. Five times in a row.

**This is NOT 5 different audits.** It is NOT "pass 1 checks types, pass 2 checks tests, pass 3 checks a11y, pass 4 checks formatting, pass 5 checks naming." That is 5 partial audits, not 5 full passes.

**Each of the 5 passes must independently check EVERYTHING:**
- Correctness against requirements
- Correctness against Stage 00 research findings
- Code quality and conventions
- Test coverage and accuracy
- Accessibility (if UI stage)
- File naming and versioning
- All project rules

If pass 3 finds an error that passes 1 and 2 missed, the counter resets to zero. That's the point — repetition catches what single passes miss.

### Procedure

1. **Execute the self-audit-edit loop** per the `ai-self-audit-edit` skill:
   - Step 1: Audit (compare work against original sources, prompt, and Stage 00 research findings)
   - Step 2: Apply Edits (fix every error found)
   - Step 3: Present Summary (in-thread table)
   - Step 4: Bump Versioning — **document outputs only** (Research Summary, implementation notes, spec files). For code files tracked by git, skip the filename version bump; git history serves as the version record.

2. **Track the consecutive null-edit counter.** After each loop iteration:
   - If errors were found: reset counter to 0
   - If zero errors found: increment counter by 1

3. **Augment the Step 3 summary** with the counter:

```
## Self-Audit-Edit Loop [iteration] — D2R Gate [Stage XX-A]

**Errors found:** [count]
**Edits applied:** [count]
**Consecutive null-edit passes:** [M] / 5

| # | Error | Source | Edit Applied |
|---|-------|--------|-------------|
| 1 | [description] | [which source/prompt] | [what was changed] |
```

4. **Exit condition:** When the counter reaches 5 (five consecutive passes with zero errors), the gate passes. Proceed to Sub-Stage B.

5. **Hard gate.** This gate CANNOT be skipped, abbreviated, or overridden. If it takes 20 loops to get 5 consecutive clean passes, it takes 20 loops.

### What to Audit Against

Each audit pass compares the stage's output against:
- The original task requirements / user prompt
- Stage 00 research findings (best practices discovered)
- Project rules (`.claude/rules/`)
- Existing codebase conventions
- The specific stage's stated goal
- **Accessibility constraints** (if the stage produces UI) — see "Built-In Quality Constraints" above
- **Legal page completeness** (if the stage is the legal pages stage) — see "Built-In Quality Constraints" above

### Anti-Patterns

- Exiting after 1 clean pass (that is the standard skill, not this one)
- Declaring "looks good" without actually re-reading sources
- Counting non-consecutive clean passes toward the 5
- Skipping the gate because "nothing changed since last pass" — run the full audit anyway
- Skipping accessibility checks on a UI stage because "there's a polish stage later" — there isn't. A11y is checked NOW.
- Treating accessibility as cosmetic/LOW severity — a11y failures are HIGH severity and reset the counter

---

## Sub-Stage B: Commit Gate

### Purpose

After each passed audit gate (5 consecutive null-edit passes), commit the work with a detailed, descriptive commit message.

### Procedure

1. **Run `git status`** to see all changed files.

2. **Stage ONLY files created or modified in this step.** Add specific files by name. Never use `git add -A` or `git add .`. Follow `git-commit-scope` rules.

3. **Write the commit message** using this template:

```
Stage [NN]: [Brief description of what was implemented]

WHAT: [Specific files changed and what changed in each]
WHY: [The reasoning behind this implementation approach,
      referencing Stage 00 research findings where applicable]
VERIFIED: Self-audit-edit gate passed — [total audit loops] total loops,
          [total edits] total edits applied, 5 consecutive null-edit
          passes confirmed
RESEARCH BASIS: [Which Stage 00 findings informed this step]
```

4. **Commit** with the message above.

5. **Push** immediately after the commit. If push fails, flag immediately per `github-discipline` rules.

6. **Report the commit** in-thread:

```
## Stage [NN]-B: Commit Complete

**Commit:** [short hash]
**Files:** [list of committed files]
**Pushed:** [yes/no + remote]
```

### Anti-Patterns

- Accumulating uncommitted changes across multiple stages
- Using vague commit messages ("updated code", "fixed stuff")
- Committing files not touched in this stage
- Forgetting to push after commit
- Skipping `git status` before staging

---

## Execution Protocol (Full Sequence)

When this skill is active, the Claude instance MUST follow this exact sequence:

1. **Receive the coding task** from the user.

2. **Generate the plan skeleton.** List all implementation steps as Stage 01, 02, 03, etc. Present using this format and wait for user confirmation before proceeding:

```
## D2R Plan Skeleton — [Task Name]

| Stage | Description |
|-------|-------------|
| Stage 00 | Research Current Best Practices |
| Stage 01 | [first implementation step] |
| Stage 02 | [second implementation step] |
| Stage NN | [Nth step] |

`✓` to approve and begin Stage 00

`?` to discuss stages

`X: [feedback]` to modify the stage list
```

Do not begin Stage 00 until the user responds with `✓`.

3. **Execute Stage 00** (Research Current Best Practices).
   - 00: Research all targets
   - 00-A: Run n=5 self-audit-edit gate on research findings
   - 00-B: Commit research artifacts

4. **Execute each implementation stage in order:**
   - NN: Execute the implementation step
   - NN-A: Run n=5 self-audit-edit gate on the step's output
   - NN-B: Commit the step's output

5. **Never skip ahead.** Stage 02 cannot begin until Stage 01-B is complete. Stage 01 cannot begin until Stage 00-B is complete.

6. **Present final summary** after all stages complete:

```
## Dare to Rise Code Plan — Complete

| Stage | Description | Audit Loops | Total Edits | Commit |
|-------|-------------|-------------|-------------|--------|
| 00 | Research | [N] | [N] | [hash] |
| 01 | [desc] | [N] | [N] | [hash] |
| 02 | [desc] | [N] | [N] | [hash] |
| ... | ... | ... | ... | ... |

**Total audit loops:** [sum]
**Total edits applied:** [sum]
**Total commits:** [count]
```

---

## Related Skills

- `ai-self-audit-edit` — The base audit loop used in every `-A` sub-stage (with modified exit condition of n=5)
- `file-versioning` — Used in Step 4 of each audit loop for version bumps
- `file-presentation` — Used when presenting output files to Krystal

## Related Rules

- `git-commit-scope` — Only commit files from current session
- `github-discipline` — Push after every commit, descriptive messages
- `file-naming-and-versioning` — Versioning standards for all output files
