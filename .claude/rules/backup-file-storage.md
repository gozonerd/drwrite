---
description: Where to store backup copies of files and when to create them
globs: "**/*"
---

# Backup File Storage

## When to Back Up

- Before any destructive operation (restructuring, bulk moves, repo reorganization)
- When explicitly requested
- When a file exists in only one location and has no git history yet

## Where Backups Go

### Primary: `nerdykrystal-backups` repo

For important backups that need to survive regardless of what happens to the source repo:
```
nerdykrystal-backups/
  documents/{source-category}/
  claude-code-configs/{repo-name}/
  one-offs/YYYY-MM-DD_description/
```

### Secondary: Local `deprecated/` folder

For version-level backups within the same project — superseded versions of files that stay with their project context.

## Backup Naming

Follow standard naming convention with `_BACKUP` appended before the extension:
```
Original:  Report_2026-03-25_v02_I.md
Backup:    Report_2026-03-25_v02_I_BACKUP.md
```

## Claude Code Config Backups

Before modifying any `.claude/` directory structure, snapshot the current state to:
```
nerdykrystal-backups/claude-code-configs/{repo-name}/YYYY-MM-DD/
```
