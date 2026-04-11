# Retrieval Index Maintenance

## What is the Retrieval Index

Every repo has a top-level `Retrieval_Index/` folder containing two files:

1. **File_Index.md** — Catalog of every file in the repo (filename, storage path, creation date, unique ID). Sorted by creation date, oldest to newest.
2. **ToC_Index.md** — Collection of tables of contents for all currently active (non-deprecated) files. Each ToC entry shares the same unique ID as its File Index entry.

Together these form the **Retrieval Index** — a dual-index system for locating files and understanding their contents.

## Unique ID Format

Every file gets a unique ID: `FI-{REPO_PREFIX}-{####}`

Repo prefixes:
- `AV` — ai_vault
- `DPO` — DATS_Pipeline_Orchestra
- `KWAI` — krystal-will-work-in-ai
- `LE` — learning-experiences
- `NKB` — nerdykrystal-backups
- `SSD` — stahl-systems-docs
- `DMIS` — StrongMinds-DMIS

Example: `FI-SSD-0042`

## When to Update

### File Index Updates (MANDATORY, IMMEDIATE)

Update the File Index whenever ANY of these occur:

- **New file created** — Add entry with filename, path, creation date, next sequential ID
- **File moved** — Update the storage path
- **File deprecated** — Update path to reflect `deprecated/` location, add `[DEPRECATED]` flag
- **File deleted** — Remove entry (rare — prefer deprecation)
- **File renamed** — Update filename

### ToC Index Updates (MANDATORY, IMMEDIATE)

Update the ToC Index whenever ANY of these occur:

- **New file created** — Generate a ToC for the file's content (regardless of whether the file itself contains a ToC) and add it using the same unique ID from the File Index
- **File content modified** — Regenerate the ToC for that file and update its entry
- **File deprecated** — Remove its ToC from the ToC Index (ToC Index only tracks active files)

## File Index Entry Format

```markdown
| ID | Filename | Storage Path | Created |
|----|----------|-------------|---------|
| FI-SSD-0001 | CLAUDE.md | /CLAUDE.md | 2026-01-07 |
| FI-SSD-0002 | git-workflow.md | /.claude/rules/git-workflow.md | 2026-03-22 |
```

## ToC Index Entry Format

```markdown
---

### FI-SSD-0001 — CLAUDE.md

- Stack & tooling
- Critical constraints
- Directory structure
- Git discipline
- References

---

### FI-SSD-0002 — git-workflow.md

- Pull cadence
- Commit-and-push rules
- Feature branch strategy
- Auto-actions

---
```

## Rules

1. **Never skip the update.** Every file operation triggers an index update in the same session.
2. **Same unique ID across both indexes.** The File Index ID and the ToC Index ID for the same file must always match.
3. **ToC generation is content-based.** Generate the ToC by reading the file's actual content — use headings, sections, key topics. Do not copy the file's own ToC if it has one; generate a standardized one.
4. **No deprecated files in the ToC Index.** When a file moves to `deprecated/`, remove its ToC entry. Its File Index entry stays (with updated path and `[DEPRECATED]` flag).
5. **Sequential IDs.** New files get the next available number. Never reuse IDs from deprecated files.
6. **Commit the index.** When committing file changes, include the updated Retrieval Index files in the same commit.
