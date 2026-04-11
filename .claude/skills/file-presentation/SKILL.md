---
name: file-presentation
description: "Use this skill when presenting ANY output file to Krystal — whether created, modified, moved, or referenced. Triggers on: any file write, file creation, file move, 'here's the file', 'present this file', 'show file info', 'present it to me in thread', 'present in thread', 'show me in thread', or whenever Claude produces or references a file that Krystal needs to act on. Presents file metadata in a structured table with confirmation gate. Files are presented ONE AT A TIME — never batch-dumped."
---

# File Presentation Protocol

## Purpose

Every time Claude produces, modifies, or references a file that Krystal needs to see, download, or act on, present it using the standard format below. Never just drop a file path or link without the metadata table. When Krystal says "present it to me in thread" or "present in thread," render the full file content inline using this format.

## Presentation Format

For EACH file, present in this order:

```
## File [X] of [Y]: [Filename]

| Field | Value |
|-------|-------|
| **Filename** | [full filename with extension] |
| **File Path** | [full absolute path] |
| **File Type** | [.md / .docx / .xlsx / .json / etc.] |
| **File Size** | [size in KB or MB] |
| **Destination** | [where it should be moved/stored, if applicable] |

### Inputs
| # | Input File | Path |
|---|---|---|
| 1 | [filename] | [full path] |
| 2 | [filename] | [full path] |

### Prompt Documentation
| Field | Value |
|-------|-------|
| **Prompt Source** | [file path if documented, or "Inline (short)" if trivial, or "NEEDS DOCUMENTATION" if substantial and undocumented] |

[File content rendered in thread, or download instructions]

---

`✓` File saved and ready for next

`?` Questions about this file
```

## Inputs Section Rules

The Inputs table lists ONLY the files directly specified as inputs for this task. Do NOT include:
- Files read as part of onboarding SOPs (Best Practices, reading journals)
- Background context files that weren't part of the task prompt
- Files the agent happened to read but that weren't specified inputs

If no input files were used (e.g., content was generated from conversation context alone), write: "None — generated from conversation context."

## Prompt Documentation Rules

When presenting a file, check whether the prompt that produced it is documented:

1. **Short/trivial prompt** (could reasonably fit in 1-2 sentences): Mark as "Inline (short)" — no separate documentation needed.
2. **Substantial prompt with existing documentation**: Display the file path where the prompt is saved.
3. **Substantial prompt NOT yet documented**: Mark as "NEEDS DOCUMENTATION" and:
   a. Save the prompt as a markdown file in a `prompts/` subfolder within the parent folder of the output file
   b. Name it: `Prompt_[OutputDescription]_[date]_v01_I.md`
   c. Present the prompt file using this same file presentation protocol
   d. If you cannot determine whether the prompt is documented, ask Krystal: "Is the prompt for this output already documented? If so, where?"

## "Present in thread"

When Krystal says "present it to me in thread" or "present in thread":
- Render the FULL file content inline in the conversation
- Use a reinforced fenced code block (12 `~` outer fence) if the content contains markdown or code blocks
- Still include the metadata table above the content

## One-at-a-Time Rule

- Present files ONE AT A TIME
- Wait for `✓` before presenting the next file
- Never batch-present multiple files
- **Exception:** Krystal explicitly says "show me all files at once"

## When to Show Inline vs. Not

- **Inline code block:** Files <50 lines that need review, task tracking summaries
- **Always inline:** When Krystal says "present in thread"
- **Downloadable/path only:** DOCX, PDF, XLSX, files >100 lines (unless "present in thread" is requested)
- **Temporary files:** Add note: "This is temporary handoff content — no need to download"
- **Persistent files:** Add note: "Move this file to: [specific path]"

## Content Completeness

- Never independently omit content, truncate, or create summary versions without approval
- When length is a concern: STOP before generating, present the concern, present ALL options
- When in doubt: INCLUDE IT and SPLIT if needed
