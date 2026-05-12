# MARTINEZ METHODS — PRINT OPTIMIZED DOCX SPEC (AI REFERENCE)

**Version:** v03_I | **Date:** 2026-04-30 (Martinez Methods rebrand of v02 historical) | **Source doc: Print_Optimized_Spec_AI-REF_2026-03-22_v02.md (rebrand-copy)  
**Scope:** All print-optimized `.docx` files produced by or for Martinez Methods.  
**Applies to:** Claude Cowork, Claude Code, any AI agent generating print-ready deliverables.

---

## QUICK-REFERENCE SUMMARY

```
Font: Lato (all text)
Body: 12pt | H1: 16pt bold | H2: 14pt bold | H3: 13pt bold
Line spacing: 1.5 | Para after: 6pt (120 DXA)
Page: US Letter (8.5×11") | Margins: 1in all sides (1440 DXA) | Content width: 6.5in (9360 DXA)
Footer: "Page X of Y" centered | 9pt Lato #888888
Header: "Martinez Methods — [Document Title]" right-aligned | 9pt Lato italic #888888
Headings: Numbered (1. / 1.1 / 1.1.1) | Sentence case | Max 3 levels
Citations: APA 7th | In-text: (Author, Year, p. X) | Bibliography: hanging indent 0.5in (720 DXA)
First page: Version + date + author(s) + organization below title
```

---

## TYPOGRAPHY

| Element | Spec |
|---|---|
| Font (all elements) | Lato |
| Body text | 12pt |
| Heading 1 | 16pt bold |
| Heading 2 | 14pt bold |
| Heading 3 | 13pt bold |
| Header text | 9pt italic, color `#888888` |
| Footer text | 9pt (not italic), color `#888888` |

**Fallback:** If Lato is unavailable in the rendering environment, it falls back to system sans-serif. Install or embed Lato for guaranteed output.

---

## SPACING

| Element | Spec |
|---|---|
| Line spacing | 1.5 lines (360 DXA) |
| Paragraph spacing after | 6pt (120 DXA) |
| H1 before / after | 18pt / 12pt |
| H2 before / after | 14pt / 9pt |
| H3 before / after | 12pt / 6pt |

---

## PAGE LAYOUT

| Element | Spec |
|---|---|
| Paper size | US Letter — 8.5″ × 11″ |
| docx-js page size | width: 12240 DXA, height: 15840 DXA *(set explicitly — docx-js defaults to A4)* |
| Margins | 1 inch all sides (1440 DXA each) |
| Content width | 6.5 inches (9360 DXA) |

---

## HEADER

- **Position:** Right-aligned in header area
- **Content:** `Martinez Methods — [Document Title]` (or as specified by author)
- **Style:** 9pt Lato italic, color `#888888`

---

## FOOTER / PAGE NUMBERING

- **Format:** `Page X of Y`
- **Position:** Centered in footer
- **Style:** 9pt Lato, color `#888888`

---

## HEADINGS AND STRUCTURE

- **Numbering:** All headings and subheadings must be numbered — `1.` / `1.1` / `1.1.1`
- **Depth:** Maximum 3 levels (H1, H2, H3 only)
- **Case:** Sentence case — never Title Case or ALL CAPS

---

## DOCUMENT METADATA (first page, below title)

Required fields below the title, before body content:

1. Version number and date
2. Author(s)
3. Organization — default: `Martinez Methods`

---

## CITATIONS AND BIBLIOGRAPHY

| Element | Spec |
|---|---|
| Style | APA 7th edition |
| In-text format | `(Author, Year, p. X)` or `(Author, Year)` when page unavailable |
| Bibliography placement | End of document, alphabetized by first author surname |
| Hanging indent | 0.5 inch (720 DXA) |

---

## TECHNICAL IMPLEMENTATION (docx-js)

| Conversion | Value |
|---|---|
| 1 inch | 1440 DXA |
| 12pt font | size 24 (half-points) |
| 1.5 line spacing | 360 DXA |
| Content width | 9360 DXA |
| Page width (US Letter) | 12240 DXA |
| Page height (US Letter) | 15840 DXA |

**Table widths:** Always use `WidthType.DXA` — never `PERCENTAGE`.  
**Page size:** Always set explicitly. docx-js defaults to A4 and will produce incorrect output if not overridden.

---

## NOTES FOR AI AGENTS

- This spec applies to **all** Martinez Methods print-ready `.docx` output unless the author explicitly overrides a setting.
- Markdown is the default format for non-print documents. This spec activates only when `.docx` + print output is specified.
- PDF generation is **never suggested proactively** — only on explicit request.
- Versioning: follow the Martinez Methods Document Versioning System when naming and tagging output files.
