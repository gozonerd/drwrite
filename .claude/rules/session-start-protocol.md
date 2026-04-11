---
description: Mandatory onboarding protocol for every long work session with Krystal
globs: "**/*"
---

# Session Start Protocol

## For Long Work Sessions

At the start of every extended collaboration thread with Krystal:

1. **Read Best Practices.** Load and read the latest `Best_Practices_Working_with_Krystal_*.md` from `.claude/references/` or the repos.
2. **Execute the SOP.** Run the `best-practices-reading-journal` skill (12-pass reading with Entry 13 consolidated commitments).
3. **Present Entry 13** in-thread using the `reinforced-fenced-block` skill format (12 `~` outer fence).
4. **Pull repos.** Run `git pull` in every repo being worked on.
5. **Check root.** Scan Repos/ root for loose files per `repo-root-maintenance` rule.

## For Quick Tasks

If the session is expected to be short (single task, <30 minutes), the full SOP is optional but the Best Practices document must still be read before engaging.

## Source Document Locations (check in order)

1. `Repos/.claude/references/Best_Practices_Working_with_Krystal_2026-03-21_v06_I.md`
2. `stahl-systems-docs/12_AI_Operations_AIO/Best_Practices_Working_with_Krystal_*.md`
