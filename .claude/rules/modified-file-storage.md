---
description: Where to store modified versions of existing files and their superseded predecessors
globs: "**/*"
---

# Modified File Storage

## When You Modify an Existing File

1. The new version stays in the **same directory** as the original
2. The superseded version moves to `deprecated/` subfolder within that same directory
3. If `deprecated/` doesn't exist, create it

## Example

```
reports/
  CLI-SM-DATS_S03_Draft_2026-03-09_v02_I.md          ← current
  deprecated/
    CLI-SM-DATS_S03_Draft_2026-03-09_v01_I.md        ← superseded
```

## ASAE Logs

When the `asae` skill produces audit logs, they go in:
```
deprecated/asae-logs/
```
Create this subfolder if it doesn't exist.

## Never Delete from Git History

Deprecated files are moved, never deleted. The git history preserves the full lifecycle.
