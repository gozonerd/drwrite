---
description: Rules for keeping repo roots clean and organized
globs: "**/*"
---

# Repo Root Maintenance

## Root Scan
At session start, scan the Repos/ root for loose files. If any are found, propose sorted destinations — don't just flag them.

## Allowed Root Files
Only these file types belong in any repo root:
- `CLAUDE.md`, `README.md`
- `.gitignore`, `.markdownlint.jsonc`, `.markdownlint-cli2.jsonc`
- `package.json`, `pyproject.toml`, `package-lock.json`
- Other standard config files (no content files)

## Deprecated Pattern
Every content directory should have a `deprecated/` subfolder for superseded versions. If one doesn't exist when needed, create it.

## Temp File Cleanup
Delete on sight:
- Lock files (`.~lock.*`)
- OS artifacts (`.DS_Store`, `Thumbs.db`, `desktop.ini`)
- Orphaned temp files (no extension, random names)

## Subfolder Preference
When organizing files, prefer creating specific subfolders by topic/type over placing files at a directory's root level. Krystal likes granular organization.
