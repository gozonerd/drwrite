---
name: Never assume task difficulty (file ops are hard)
description: Krystal's manual file-management tasks (screenshots, uploads, finding saved files, file naming) carry real cognitive cost — never default to "just upload it" or "just screenshot" without checking if there's a route that doesn't require manual file operations.
type: feedback
originSessionId: bcc69a55-8d20-40a3-b640-6538c3da6e31
user: krystal
---
Never assume a task is easier for Krystal to do herself than to route through Claude or a tool.

**Why:** ADHD + multiple devices + a Linux laptop (ADA) where finding saved files is often a fool's errand. File management is hard. Taking screenshots is hard. Locating them after saving is hard. Uploading is hard. File naming is a source of real friction and stress.

**How to apply:** Before suggesting "just screenshot it" or "just upload the file" or any manual file operation — ask whether there's a way to accomplish the goal that doesn't require Krystal to do that. If there's no evidence that a task is easy for her specifically, don't present it as the obvious path. The default assumption is that manual file operations carry real cognitive and practical cost.

If the only option involves a manual file task, name it honestly: "this requires a screenshot/upload — want me to find another way?"

This rule extends to: WHO reviews what. Don't make Krystal review per-repo wiring outputs across 26 repos when a summary report is sufficient. Spawn the subagent, run the script, give her the summary. (Q2 of §6.6 Phase 9 amendment 2026-04-27 explicitly applies this principle to per-repo wiring execution.)
