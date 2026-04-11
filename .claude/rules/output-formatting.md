---
description: Formatting standards for output files and response options
globs: "**/*"
---

# Output Formatting

## Response Options Format

Each option on its own line, response character in backticks:

```
`✓` to proceed

`?` to discuss

`X: [feedback]` to modify
```

No bullet points. No numbering. Each option gets its own line with spacing.

## Markdown File Formatting

### Line Numbering

| File Length | Interval | Format |
|------------|----------|--------|
| ≤500 lines | Every 10 | `0010 \| [content]` |
| >500 lines | Every 50 | `0050 \| [content]` |

### Section Markers (files >200 lines)

```
[Lines 0010-0100: Document Header & Metadata]
```

## File Rendering Rules

- **Default:** Render as downloadable file
- **Inline code block** only when: user requests "show me the code", file is <50 lines and needs review, or debugging
- **Never inline:** DOCX, PDF, XLSX, files >100 lines, final deliverables
- Task tracking summaries: always render inline (short format)
