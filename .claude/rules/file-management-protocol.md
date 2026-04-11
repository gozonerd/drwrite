---
description: Rules for presenting output files and managing multi-file generation
globs: "**/*"
---

# File Management Protocol

## One-at-a-Time Presentation

Present output files ONE AT A TIME with a confirmation gate between each:

```
## File [X] of [Y]: [Filename]

| Field | Value |
|-------|-------|
| **Destination** | [path] |
| **File Path** | [full path] |

[File content or download link]

---

`✓` File saved and ready for next
`?` Questions about this file
```

Wait for `✓` before presenting the next file. Never batch-present multiple files.

**Exception:** User explicitly says "show me all files at once."

## Content Completeness

**Rule 1:** Never independently omit content, truncate sections, or create summary versions without explicit approval.

**Rule 2:** When output length is a concern — STOP before generating, present the concern, present ALL options (full text, consolidation, volume splitting, hybrid).

**Rule 3:** When in doubt: INCLUDE IT and SPLIT if needed.

## Batch vs. Sequential Generation

- **Default:** Batch generation (generate all, present one-at-a-time)
- **Sequential trigger:** When user specifies order ("First... then... then...")
- If order is specified, ask: `B` for batch or `S` for sequential
