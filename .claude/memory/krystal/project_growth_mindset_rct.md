---
name: Growth Mindset Onboarding RCT — Experimental Design
description: Double-blind RCT testing whether Dweck-based onboarding docs reduce Claude's fixed-mindset failure modes vs. Best Practices alone
type: project
---

**Project:** Growth Mindset Onboarding Experiment
**Parent project:** LLM Cognition Architect
**Designed:** 2026-04-07
**Status:** Design phase — docs and infrastructure not yet built

## Core Research Question

Does giving Claude a theory of its own failure modes (Dweck growth mindset framework) produce measurably different behavioral outcomes than giving it behavioral rules alone (Best Practices)?

## Phase A — Exploratory (current design)

**Design:** Double-blind RCT, 250 pre-randomized trials, 4 conditions

| Condition | Onboarding Content |
|---|---|
| 1 | Best Practices + reading journal commitments |
| 2 | Proposal C ("Not a Growth Mindset" — confrontational false-growth-mindset inoculation) + commitments |
| 3 | Proposal D (Companion Architecture — Dweck mechanisms mapped to ECT v2 failure modes) + commitments |
| 4 | No onboarding (control) |

**Blinding mechanism:**
- 250 pre-randomized trial assignment markdown files (trial_0001 through trial_0250) generated via Python random script
- Folder structure per repo: `black-box-do-not-read/onboarding-trial-condition-assignment/` with subfolders: `used-trial-assignments/`, `unused-trial-assignments/`, `next-trial-assignment/`
- `next-trial-assignment/` contains exactly ONE file at any time
- A universal onboarding skill dispatches Claude to read its trial assignment, follow instructions, then manage file sequencing
- Krystal is blind at assignment time (doesn't know condition until she observes onboarding behavior)
- Double-blind through onboarding completion: task selection committed before condition is revealed

**Measurement:** ECT v2 bidirectional failure mode sweep every 24 hours across all Claude Code conversations (plus occasional Claude Chat)

**Infrastructure needed (not yet built):**
- Proposal C doc (confrontational false-growth-mindset inoculation for LLMs)
- Proposal D doc (Dweck companion architecture mapped to failure modes)
- Python randomization script for trial assignment generation
- Dispatch skill (universal session opener that routes to trial assignment)
- `.claude/rules/` file prohibiting access to black-box folder
- Identical skill/ref/rule structure across all repos

## Phase B — Mechanism Isolation (planned)

Test whether the winning condition from Phase A still holds WITHOUT commitments. Isolates whether the framework exposure or the forced articulation of commitments is the active ingredient.

## Phase C — Confirmatory (contingent on Phase A/B results)

Proper double-blind study designed for publication if exploratory results warrant it.

## Key Design Decisions

- Proposal C chosen for its self-contained nature — no incident collection or failure mode documentation needed from Krystal's side
- Proposal D shippable with preset failure modes from ECT v2 bidirectional failure mode taxonomy
- Naturalistic task assignment (whatever Krystal needs done that day) — not standardized tasks
- Sonnet protection: next trial file moved to "next" folder AFTER onboarding completes, preventing less capable models from reading ahead

## Source Material

- Dweck PDF (full read completed this session): `ai_vault/06_Research_Library/Mindset/Mindset by Carol S. Dweck (Updated Edition).pdf`
- Best Practices: `Best_Practices_Working_with_Krystal_2026-03-21_v06_I.md`
- ECT v2 bidirectional failure mode taxonomy (location TBD — Krystal has this)

**Why:** This is the concrete experimental execution of the LLM Cognition Architect thesis — testing whether growth-mindset framing reduces AI failure modes with fewer structural interventions than the correction-to-rule pipeline.

**How to apply:** When building any of the experimental infrastructure (docs, scripts, skills), ground in this design. Do not deviate from the 4-condition structure or blinding mechanism without Krystal's explicit approval.
