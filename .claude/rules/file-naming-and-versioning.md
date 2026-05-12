---
description: Mandatory file naming pattern and version increment logic for all Martinez Methods outputs
globs: "**/*"
---

# File Naming and Versioning

## Mandatory Filename Pattern

Every new file must include:

```
[PREFIX_][Description]_YYYY-MM-DD_vXX_[suffix].[ext]
```

**Components:**
- `PREFIX_` — Project prefix (e.g., `CLI-SM-DATS_`, `CLI-SS-OPS_`). Optional for personal/internal files.
- `Description` — Descriptive name, underscores for spaces
- `YYYY-MM-DD` — Date created or last major version
- `vXX` — Version number (see below)
- `suffix` — Approval status: `_I` (internal), `_X` (external). Default is `_I` when omitted.

**Anti-pattern:** `EDR_README_Vol1_Overview.md` (missing date + version)
**Correct:** `CLI-SM-EDR_README_Vol1_Overview_2026-01-09_v02_I.md`

## No Spaces in Filenames

Replace all spaces with underscores.

## Version Format

| Component | Symbol | Meaning |
|-----------|--------|---------|
| N | Number (1, 2, 3...) | Main version — higher = more correct |
| X | Letter (A, B, C...) | Iteration variant — parallel alternatives |
| R | Number (1, 2, 3...) | Revision within iteration |

### The Core Rule

| Symbol Type | ALWAYS Means | Relationship |
|-------------|-------------|--------------|
| Number change | FIX | One is "more correct" than the other |
| Letter change | ITERATION | Both are valid alternatives |

## When to Increment

| Change Type | Action |
|-------------|--------|
| Typo fix, formatting only | Same version |
| Clarification without behavior change | Same version |
| New rule or behavior change | Increment N |
| Structural reorganization | Increment N |
| Parallel alternative approach | New X letter |

## Final Version

When final, use `vFinal` instead of numbered version.

## Deprecated File Naming

Insert `DEPRECATED` at the very beginning of the filename when marking a file as deprecated.

## Verification

Before presenting any file, Claude confirms the filename includes date + version.
