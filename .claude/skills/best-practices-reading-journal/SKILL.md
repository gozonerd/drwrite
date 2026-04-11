---
name: best-practices-reading-journal
description: "Use this skill at the start of every long work session with Krystal. Triggers on: 'reading journal', 'onboarding', 'start session', 'best practices SOP', or automatically at the beginning of any extended collaboration thread. Executes the 12-pass reading journal SOP against the Best Practices for Working with Krystal document, producing a consolidated Entry 13 of behavioral commitments."
---

# Best Practices Reading Journal

## Purpose

Onboarding procedure for any new Claude thread/session working with Krystal Martinez. Produces a structured reading journal from 12 independent reads of the Best Practices document, each through a prescribed lens, culminating in a consolidated commitments entry.

## Source Document

Latest version of: `Best_Practices_Working_with_Krystal_*.md`

Known locations (check in order):
1. `Repos/.claude/references/Best_Practices_Working_with_Krystal_2026-03-21_v06_I.md`
2. `stahl-systems-docs/12_AI_Operations_AIO/Best_Practices_Working_with_Krystal_*.md`
3. `StrongMinds-DMIS/01_Project_Context/Best_Practices_Working_with_Krystal_*.md`

Always verify you have the latest version by checking the YAML frontmatter `version` field and Version History table.

## The 12 Lenses

Each pass requires physically re-reading the full document (do not work from memory).

| Pass | Lens | Focus |
|------|------|-------|
| 1 | First Impressions & Document Architecture | Structure, tone, priorities, organizational choices |
| 2 | Cognitive Load & ADHD Accommodation | How every practice protects or threatens cognitive bandwidth |
| 3 | Power Dynamics & Trust | Where trust is granted, where boundaries are drawn |
| 4 | The Scientist's Mindset | Experimental design principles in working patterns |
| 5 | Communication Protocols & Signal Reading | Emoji signals, verbal cues, approval patterns |
| 6 | Anti-Patterns & Failure Mode Prevention | What specific failures each practice prevents |
| 7 | The Teacher in the Room | Pedagogical principles in collaboration patterns |
| 8 | Decision-Making Philosophy & Meta-Cognition | How Krystal thinks about thinking |
| 9 | Scope & Quality Tension Management | Quality/speed/scope tradeoffs |
| 10 | The Living Document | Version history, evolution patterns, what triggers new sections |
| 11 | Universal Principles | What transcends SM-DMIS and applies everywhere |
| 12 | Self-Audit: Where Am I Most Likely to Fail? | Honest assessment of personal vulnerability to each failure mode |

## Per-Pass Output

Each entry:
- 3-6 unique takeaways (no duplication across entries)
- 1-3 behavioral commitments

## Entry 13: Consolidated Commitments

Concatenate ALL commitments from passes 1-12, organized by pass number. Present in a reinforced fenced code block (12 `~` outer fence, backticks for inner nesting).

## Presentation

Present Entry 13 in-thread after completing all 12 passes. The full journal may be saved to `Repos/.claude/references/reading_journals/` if the session warrants it.

## SOP Reference

Full SOP with detailed lens descriptions: `Repos/.claude/references/SOP_Best_Practices_Reading_Journal_20260321_v02_I.md`
