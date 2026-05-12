---
name: Always use absolute file paths
description: When giving Krystal file paths, always use absolute paths — she works across multiple repos/worktrees and needs copy-pasteable paths
type: feedback
originSessionId: 84d99423-0afd-4a6e-a90e-fc30e3ff5668
---
Always use absolute file paths (e.g., `C:\Users\NerdyKrystal\martinez-methods\mm-anthropic-research\file.md`) when surfacing paths to Krystal, not relative paths.

**Why:** She works across multiple repos and worktrees simultaneously. Relative paths require her to figure out which repo context they're relative to. She needs to be able to copy-paste paths directly.

**How to apply:** Every time you mention a file path in user-facing text, use the full absolute path. This applies to all contexts — flagged items, status reports, handoff docs, in-thread references.
