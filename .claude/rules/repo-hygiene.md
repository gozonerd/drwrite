---
description: Rules for repository file organization, root folder cleanliness, and version deprecation. Applies to all repos.
globs:
  - "**/*"
---

# Repo hygiene

## 1. No loose files in repo root

Never store files in the root of any repo folder. The only file that should exist as a loose file in the repo root is `CLAUDE.md`. All other files must live in an appropriate subfolder.

If you find yourself about to save a file to the repo root, stop and determine the correct subfolder. If no appropriate subfolder exists, create one with a descriptive name.

## 2. Version deprecation

When a new version of a document is added to a repo, the superseded version must be moved to a `deprecated/` subfolder within the same directory the file currently lives in. If no `deprecated/` subfolder exists, create one.

Only the latest version (vLatest) should remain in the working part of any subfolder. All prior versions live in `deprecated/`.

**Exception:** Files that are explicitly historical references (e.g., ECT incident reports, raw thread outputs) are not versioned documents and do not get deprecated — they are audit artifacts.

## 3. Deprecated folder naming

The subfolder is always named `deprecated` (lowercase, no version numbers, no dates in the folder name). The deprecated files inside retain their original filenames including version numbers.
