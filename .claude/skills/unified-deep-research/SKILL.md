---
name: unified-deep-research
description: "Use this skill when Krystal has multiple deep research (DR) thread outputs on the same topic that need to be unified into a single comprehensive document. Triggers on: 'unify the DR outputs', 'unified deep research', 'combine the research threads', 'deduplicate the research', 'merge DR outputs', 'synthesize the research', or when Krystal provides 2+ deep research thread files and needs them consolidated. Produces a print-optimized docx with executive summary, key points with verbatim quotes, and full deduplicated content."
---

# Unified Deep Research Synthesis

## Purpose

When Krystal has multiple deep research thread outputs on the same topic, this skill produces a single comprehensive, unified, and deduplicated document. The output is a print-optimized docx file.

## Input

- 2 or more deep research thread output files on the same topic
- These may come from different AI models, different sessions, or different research angles

## Output Structure

The unified document has three sections:

### Section 1: Executive Summary
- High-level synthesis of the entire research corpus
- What was researched, what was found, what it means
- Length: 1-2 pages

### Section 2: Key Points (2-3 pages)
- The most important findings distilled
- Each key point supported by **verbatim quotes** from the source DR threads
- Quotes attributed to their source thread
- This section should stand alone — someone reading only this section gets the essential picture

### Section 3: Full Unified Content
- All information from all DR threads, unified and deduplicated
- **Deduplication is by claim** — if multiple threads make the same claim, it appears once with all supporting sources cited
- Organized by topic/theme, not by source thread
- Preserves the depth and detail of the original threads
- Nothing is omitted — if a thread contained it, it's here (unless it's a duplicate claim already captured)

## Procedure

1. **Read all DR thread outputs** provided by Krystal
2. **Extract all claims** from each thread, tagged by source
3. **Deduplicate by claim** — identify claims that appear in multiple threads. Keep one instance, cite all sources.
4. **Organize by topic** — group claims thematically, not by source thread
5. **Identify key points** — select the most important findings for Section 2
6. **Pull verbatim quotes** — for each key point, find the strongest supporting quote from the source material
7. **Write executive summary** — synthesize the full picture into 1-2 pages
8. **Generate print-optimized docx** using the `print-docx` skill

## Critical Rules

- **Deduplication is by claim, not by paragraph.** Two threads may phrase the same finding differently — recognize the shared claim and consolidate.
- **Verbatim means verbatim.** Quotes in Section 2 must be exact text from the DR threads, not paraphrased.
- **Nothing is omitted from Section 3.** If a claim appeared in any source thread and is not a duplicate, it must appear in the unified output.
- **Source attribution throughout.** Every claim in Section 3 cites which DR thread(s) it came from.
- **Topic organization, not source organization.** The reader should never have to mentally merge information across sections — do that work for them.

## File Naming

```
[PREFIX_]Unified_DR_[Topic]_YYYY-MM-DD_v01_I.docx
```

## Related Skills

- `print-docx` — Used in step 8 for the final output format
- `file-presentation` — Used when presenting the final file to Krystal
