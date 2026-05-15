---
name: Laptop Migration — March 2026
description: Context on the laptop migration from old machine (Krystal Martinez) to new machine (NerdyKrystal) — fresh start, no configs carried over
type: project
---

On 2026-03-29/30, Krystal migrated from her old laptop (Windows user: "Krystal Martinez") to a new laptop (Windows user: "NerdyKrystal"). All repos were pushed to git before migration and cloned fresh on the new machine.

No Claude Code config files were brought over — fresh install. Only exported transcripts were transferred. The path mapping is: `C:\Users\Krystal Martinez\...` → `C:\Users\NerdyKrystal\...` — everything else in the path is identical.

**Why:** Krystal wanted a totally fresh start for anything not in the repos.
**How to apply:** All `.claude/` rules and skills that were in the repos survived (they're in git). Account-level Claude Code settings, MCP server configs, and any local-only state from the old machine are gone and would need to be reconfigured if needed.
