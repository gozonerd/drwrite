---
name: ai-self-audit-edit
description: "Use this skill when auditing and correcting AI-generated work against its original sources and prompts. Triggers on: 'self-audit-edit', 'audit edit loop', 'audit this output', 'check this against sources', or when Claude needs to systematically verify generated work against the original materials and prompts that produced it. Iterates until the current version has zero errors, then produces a versioned audit log."
---

# AI Self-Audit-Edit

## Purpose

Systematically audit AI-generated work against original sources and the original prompt(s) that produced it, apply corrections, bump versioning, and iterate until the output is error-free. Each iteration is one "self-audit-edit loop." The process produces a versioned audit log documenting all errors found and edits applied.

## When to Use

- After generating any substantive output (document, section, analysis)
- When the user says "audit edit loop", "self-audit", "check this against sources"
- When verifying generated work against source materials
- Before finalizing any versioned deliverable

## The Loop (Steps 1-4)

### Step 1: Audit

Audit the generated work against:
- The **original sources** (documents, data, evidence) that informed the output
- The **original prompt(s)** that produced vCurrent

Identify every error: factual inaccuracies, misrepresentations, omissions, formatting violations, logic gaps.

### Step 2: Apply Edits

Apply edits to fix every error found in the audit. Each edit must be traceable to a specific error identified in Step 1.

### Step 3: Present Summary

Present a summary of errors found and edits applied **in-thread**. Format:

```
## Self-Audit-Edit Loop [N]

**Errors found:** [count]
**Edits applied:** [count]

| # | Error | Source | Edit Applied |
|---|-------|--------|-------------|
| 1 | [description] | [which source/prompt] | [what was changed] |
| ... | ... | ... | ... |
```

### Step 4: Bump Versioning

Increment the version number on the output file per file-naming-and-versioning rules.

## Iteration

Steps 1-4 = **one self-audit-edit loop.**

Continue iterating (loop back to Step 1) until an audit pass finds **zero errors**. Only then exit the loop.

### What "One Audit Pass" Means

A single audit pass is **re-running the SAME audit** (Step 1) against the SAME sources and the SAME output. You are re-reading the same material and checking for errors you may have missed or introduced.

A null-edit pass means: "I re-read everything, checked every claim, re-examined every formatting rule, and found zero errors."

**This is NOT:** running 5 different audits that each check different things. It is the SAME comprehensive audit, repeated, confirming zero errors each time.

**Anti-pattern (Sonnet-specific):** Running one audit checking formatting, a second checking facts, a third checking tone, a fourth checking completeness, and a fifth checking sources — then claiming "5 null-edit passes." That is 5 partial audits, not 5 full passes. Each pass must check EVERYTHING.

## On Loop Exit

1. Execute the final Step 4 version bump
2. Unify all step-4 version text from every loop iteration into a single markdown file:
   - **Filename:** `{output name}_self-audit-log_{YYYY-MM-DD}_v{version##}.md`
   - **Content:** All loop summaries concatenated, showing the full correction history
3. Place the audit log in: `deprecated/self-audit-edit-logs/`
   - This is a subfolder **within** the `deprecated/` folder where superseded versions of the output live
   - If `deprecated/` does not exist, create it
   - If `deprecated/self-audit-edit-logs/` does not exist, create it

## Anti-Patterns

- Never skip the audit step and go straight to versioning
- Never exit the loop while errors remain
- Never discard the audit log — it is part of the audit trail
- Never audit from memory — always re-read original sources for each loop iteration
