---
description: Where to place brand new files that are not modifications of existing ones
globs: "**/*"
---

# New File Placement

## Directory Placement Logic

When creating a new file, determine placement by:

1. **Does a relevant directory already exist?** Place it there.
2. **Does the content fit an existing category?** Place in the closest matching directory.
3. **Is this a new category?** Create a descriptive subfolder. Prefer granular subfolders over flat dumps.

## Never Place Content at Repo Root

New content files never go at a repo's root level. Only config and meta files (CLAUDE.md, README.md, .gitignore) belong at root.

## When to Create vs. Append

- **Create new file** when: the content is a distinct deliverable, a new topic, or a different version
- **Append to existing file** when: the content extends or updates an existing document and the document is <500 lines

## Subfolder Preference

Krystal prefers granular organization. When in doubt, create a subfolder to keep things separated by topic, type, or purpose rather than dumping multiple files in one flat directory.

## Mandatory Naming

All new files must follow the `file-naming-and-versioning` rule. No exceptions.
