# Stahl Systems Brand Colors

**Version:** v01_I | **Date:** 2026-03-27
**Purpose:** Canonical color reference for all Stahl Systems visual output — documents, presentations, portfolio sites, print materials, spreadsheets.

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| BRAND_DARK | #1B3A4B | H1 text, table headers (background) |
| BRAND_MED | #3D7A8A | H2 text |
| BRAND_LIGHT | #D5E8F0 | Light fill (alternating rows, callout backgrounds) |
| BRAND_ACCENT | #E8734A | Callout borders, accents, highlights, CTAs |
| GRAY_LIGHT | #F5F5F5 | Alternating row fill (with BRAND_LIGHT) |
| GRAY_MED | #666666 | Body text, secondary text, captions |
| WHITE | #FFFFFF | Table header text (on BRAND_DARK background) |

## Application Rules

- **Table headers:** BRAND_DARK background + WHITE text
- **Table alternating rows:** GRAY_LIGHT and BRAND_LIGHT
- **H1 headings:** BRAND_DARK
- **H2 headings:** BRAND_MED
- **Body text:** GRAY_MED (or black #333333 for high-contrast print)
- **Accent elements:** BRAND_ACCENT (borders, highlights, call-to-action buttons)
- **Links:** BRAND_MED (unvisited), BRAND_DARK (visited)

## Referenced By

- `print-docx` skill (for DOCX table formatting)
- `xlsx` generation (for spreadsheet formatting)
- Portfolio site CSS
- Any visual output requiring Stahl Systems branding
