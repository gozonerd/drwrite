---
name: print-docx
description: This skill should be used when the user asks to "generate a print-optimized docx", "create a print doc", "make this printable", "print-optimize this", "generate a docx for printing", or wants any document converted to a Stahl Systems print-ready .docx file. Encodes the complete Stahl Systems Print Optimized Spec so formatting is consistent and correct every time.
version: 0.1.0
---

# Print-optimized DOCX generation (Stahl Systems spec)

## Purpose

Generate print-ready `.docx` files that comply with the Stahl Systems Print Optimized Spec. All formatting decisions are pre-encoded — no manual spec lookup required.

## Quick reference

```
Font:           Lato (all text, all elements)
Body:           12pt (size: 24 in half-points)
H1:             16pt bold (size: 32)
H2:             14pt bold (size: 28)
H3:             13pt bold (size: 26)
Line spacing:   1.5 lines (360 DXA)
Para after:     6pt (120 DXA)
H1 before/after: 18pt / 12pt
H2 before/after: 14pt / 9pt
H3 before/after: 12pt / 6pt
Page:           US Letter 8.5x11 (width: 12240, height: 15840 DXA)
Margins:        1 inch all sides (1440 DXA each)
Content width:  6.5 inches (9360 DXA)
Header:         Right-aligned, "Stahl Systems — [Document Title]", 9pt Lato italic #888888
Footer:         Centered, "Page X", 9pt Lato #888888
Headings:       Numbered (1. / 1.1 / 1.1.1), sentence case, max 3 levels
Citations:      APA 7th, in-text (Author, Year, p. X), bibliography hanging indent 0.5in (720 DXA)
First page:     Title, then version + date + author(s) + organization below title
Tables:         Always WidthType.DXA (never PERCENTAGE), ShadingType.CLEAR (never SOLID)
Bullets:        LevelFormat.BULLET with numbering config (never unicode bullet characters)
```

## Workflow

1. **Read source.** Read the markdown file or in-thread content to be converted.
2. **Generate config.** Build a JSON config object with: title, subtitle, version, date, authors, organization, audience, and sections array.
3. **Write JS file.** Write a generation script using the template at `scripts/gen_print_docx_template.js` as the pattern. Inject the config content.
4. **Install docx.** Run `npm install docx` in the output directory.
5. **Execute.** Run `node <script>.js` to generate the .docx.
6. **Clean up.** Remove the generation script, node_modules, package.json, and package-lock.json.
7. **Report.** Provide the full file path of the generated .docx.

## Output file naming

Follow Stahl Systems naming convention:

```
[PREFIX]_[Description]_YYYY-MM-DD_vXX_I.docx
```

When generating a print version of an existing markdown file, append `_PRINT` before the extension:

```
Original:  Full_Context_Assessment_2026-03-22_v02.md
Print:     Full_Context_Assessment_2026-03-22_v02_PRINT.docx
```

## Critical rules

- Always set page size explicitly — docx-js defaults to A4, not US Letter
- Never use `\n` for line breaks — use separate Paragraph elements
- Never use unicode bullet characters — use LevelFormat.BULLET with numbering config
- PageBreak must be inside a Paragraph element
- Table width must equal sum of columnWidths (both in DXA)
- Set both columnWidths on the table AND width on each cell
- Cell margins are internal padding (top: 60, bottom: 60, left: 120, right: 120)
- Use outlineLevel in heading paragraph styles (0 for H1, 1 for H2, 2 for H3) — required for TOC
- Override built-in styles using exact IDs: "Heading1", "Heading2", "Heading3"
- PDF generation is never suggested proactively — only on explicit request

## Additional resources

### Reference files

For the complete spec with all DXA conversion values and implementation notes:
- **`references/stahl-systems-print-spec.md`** — Full Stahl Systems Print Optimized Spec v02

### Scripts

Template for generating print-optimized docx files:
- **`scripts/gen_print_docx_template.js`** — Reusable Node.js template with all Stahl Systems defaults. Copy and modify the sections array for each document.
