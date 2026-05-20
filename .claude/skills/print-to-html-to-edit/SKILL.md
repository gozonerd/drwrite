---
name: print-to-html-to-edit
description: "Generate a print-ready HTML file optimized for HAND-EDITING — double-spaced body + wider margins so Krystal (or a reviewer) can mark up the printout with a pen. Identical to /print-from-html in every other respect. Triggers on: '/print-to-html-to-edit', '/print to html to edit', 'print to html to edit', 'printable I can edit', 'print this so I can mark it up', 'double-spaced printable', 'print for markup', 'print with room to write', 'editable printout', 'print this for review on paper'. Handles any source format: SQL, Python, JS/TS, YAML, JSON, Markdown, plain text, CSV. Produces a single self-contained HTML file in the curated print folder with format-appropriate styling, syntax highlighting for code, clean typography for prose, double-spaced lines, wide margins for marginalia, and print CSS (page breaks, headers/footers, page numbers)."
version: 1.0.0
authored_by: Claudette the Code Debugger v01 (2026-05-20)
type: skill
classification: utility-class
provenance: Fork of /print-from-html (v1.1.1), created 2026-05-20 at Krystal's direction. Same skill, two baked-in differences for the editing use case — (1) double-spacing is MANDATORY (not optional), (2) margins are WIDER than print-from-html (0.9in×1.0in vs 0.6in×0.5in) to leave room for handwritten margin notes. Surfaced when Krystal printed double-spaced methodology docs from /print-from-html and found the margins too narrow for marginalia, while the standard explainer-doc margins were fine. This skill is the "give me a copy I can edit on paper" sibling; /print-from-html remains the "give me a clean final copy" tool.
changelog:
  - "1.0.0 (2026-05-20): Initial release. Forked from print-from-html v1.1.1. Differences: double-spacing mandatory (prose line-height ~2.0-2.2, code line-height ~1.8); wider print margins (only the @page margin changes — 0.6in 0.5in → 0.9in 1.0in; print body margin 0.5in preserved, so effective margins are wider on every edge) for handwritten margin notes; output filename suffix `-print-edit.html`; two new anti-patterns (single-spaced body, margins too narrow for marginalia). All other behavior — 16 formats, syntax-highlighting palette, Mermaid handling, CSV tables, batch mode, self-containment, page numbers — identical to print-from-html."
---

# /print-to-html-to-edit

## Purpose

Turn any file into a print-ready HTML page **built for hand-editing**. Open in browser, Ctrl+P, then mark it up with a pen. Same as `/print-from-html`, but with two differences baked in: the body is **double-spaced** (room to write between lines) and the **margins are wider** (room for marginalia).

Krystal works with a partner who reviews on paper, and Krystal herself edits drafts on paper. This skill eliminates the friction of getting a clean *editable* printout from source files that don't print well natively (code files, markdown, YAML, raw SQL) — without having to ask for double-spacing and wider margins every time.

Use `/print-from-html` instead when the goal is a clean *final* copy, not an editing draft.

## When to Use

- Krystal says "print this so I can edit/mark it up," "I need to edit this on paper," "double-spaced printable," "print with room to write"
- A draft (doc, schema, methodology spec) needs a paper review pass with handwritten edits
- A partner, collaborator, or reviewer needs a markup-able paper copy of a technical artifact
- Any file needs to go from screen to paper with editing room — double-spacing + wide margins
- Multiple files need editable printouts — invoke once per file, or batch by listing all paths

## When NOT to Use

- The goal is a clean *final* printout, not an editing draft → use `/print-from-html` (single-spaced, standard margins)
- The file is already HTML with print CSS (just print it directly)
- The user wants a PDF (this skill produces HTML; browser print-to-PDF covers that via Ctrl+P > Save as PDF)

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| Source file path(s) | Yes | One or more files to make into editable printouts |
| Output location | No | Where to write the HTML. Default: `C:\Users\NerdyKrystal\Desktop\claude files to print\` (Krystal's curated print-queue folder). Folder is created via `mkdir -p` if missing — no silent fallback to Desktop root. |
| Paper size | No | Default: letter. Also supports A4. |
| Custom title | No | Override the document title (default: filename) |

## Execution Protocol

### Step 1: Read the Source File

Read the full file. Determine format from extension:

| Extension | Format | Rendering strategy |
|-----------|--------|-------------------|
| `.sql` | SQL | Monospace + SQL syntax highlighting |
| `.py` | Python | Monospace + Python syntax highlighting |
| `.js`, `.ts`, `.tsx`, `.jsx` | JavaScript/TypeScript | Monospace + JS syntax highlighting |
| `.yaml`, `.yml` | YAML | Monospace + YAML syntax highlighting |
| `.json` | JSON | Monospace + JSON syntax highlighting |
| `.md` | Markdown | Rendered prose (headings, tables, code blocks, lists) |
| `.sh`, `.bash` | Shell | Monospace + shell syntax highlighting |
| `.csv` | CSV | Rendered as HTML table |
| `.toml` | TOML | Monospace + TOML syntax highlighting |
| `.html`, `.htm` | HTML | Source view with monospace + HTML syntax highlighting |
| `.rs` | Rust | Monospace + Rust syntax highlighting |
| `.go` | Go | Monospace + Go syntax highlighting |
| `.rb` | Ruby | Monospace + Ruby syntax highlighting |
| `.java` | Java | Monospace + Java syntax highlighting |
| `.css`, `.scss` | CSS | Monospace + CSS syntax highlighting |
| `.xml` | XML | Monospace + XML syntax highlighting |
| `.txt`, other | Plain text | Monospace, no highlighting |

If the file has no extension or an unrecognized one, treat as plain text.

### Step 1.5: Check `mmdc` availability (only if the source has Mermaid)

Same as print-from-html — see the Mermaid section under Step 3. Run the availability check before generating HTML if any ` ```mermaid ` block is present.

### Step 2: Generate the HTML

Every output file is a single self-contained HTML page (no external CSS/JS dependencies; Mermaid CDN is the one documented exception — see Step 3). Structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{document title}</title>
  <style>
    {all CSS inline — print + screen; double-spaced + wide-margin defaults}
  </style>
</head>
<body>
  {screen-only print instructions banner — note "double-spaced for editing"}
  {document header: title + metadata}
  {rendered content}
</body>
</html>
```

### Step 3: Apply Format-Specific Rendering

#### For code files (SQL, Python, JS, YAML, JSON, shell, etc.)

Use `<pre>` with `<span>` tags for syntax highlighting. Highlighting is print-friendly — no bright neon colors. Palette:

| Token type | Style | Print-safe rationale |
|------------|-------|---------------------|
| Keywords | `font-weight: bold; color: #1a1a8a;` | Bold blue — visible in B&W as bold |
| Types / built-ins | `font-weight: bold; color: #5a1a5a;` | Bold purple — distinguishable from keywords |
| Strings / values | `color: #2a6a2a;` | Dark green — readable in B&W as lighter gray |
| Comments | `color: #666; font-style: italic;` | Gray italic — clearly secondary |
| Numbers | `color: #8a4a1a;` | Dark orange/brown — distinct from strings |
| Operators / punctuation | `color: #333;` | Near-black — blends with structure |
| Section headers / decorators | `background: #e8e8e8; border-left: 3px solid #333; font-weight: bold;` | Gray bar — visual section breaks |

**EDITING DIFFERENCE — code line-height:** code blocks use `line-height: 1.8` (looser than a standard single-spaced code block) so there's room to annotate between lines of code on the printout. (print-from-html does not specify a code-block line-height; this skill sets one explicitly for editing room.)

**Language-specific keyword lists:**

- **SQL:** `CREATE`, `TABLE`, `VIEW`, `TYPE`, `AS`, `ENUM`, `SELECT`, `FROM`, `JOIN`, `LEFT JOIN`, `WHERE`, `ON`, `ORDER BY`, `GROUP BY`, `INDEX`, `UNIQUE`, `NOT NULL`, `PRIMARY KEY`, `REFERENCES`, `DEFAULT`, `CASCADE`, `RESTRICT`, `SET NULL`, `CHECK`, `ALTER`, `ADD CONSTRAINT`, `COMMENT ON`, `COLUMN`, `IS`, `BEGIN`, `COMMIT`, `INSERT`, `INTO`, `VALUES`, `UPDATE`, `DELETE`, `AND`, `OR`, `IN`, `EXISTS`, `CASE`, `WHEN`, `THEN`, `ELSE`, `END`, `COALESCE`, `COUNT`, `MAX`, `MIN`, `SUM`, `DISTINCT`, `NULL`, `TRUE`, `FALSE`, `SERIAL`, `INT`, `TEXT`, `VARCHAR`, `BOOLEAN`, `DATE`, `TIMESTAMPTZ`, `NOW()`
- **Python:** `def`, `class`, `import`, `from`, `return`, `if`, `elif`, `else`, `for`, `while`, `try`, `except`, `finally`, `with`, `as`, `yield`, `lambda`, `pass`, `break`, `continue`, `raise`, `True`, `False`, `None`, `and`, `or`, `not`, `in`, `is`, `self`
- **YAML:** Keys (text before `:`), `true`, `false`, `null`, `yes`, `no`
- **JSON:** Keys (text in quotes before `:`), `true`, `false`, `null`
- **Shell:** `if`, `then`, `else`, `fi`, `for`, `do`, `done`, `while`, `case`, `esac`, `function`, `sudo`, `echo`, `export`, `source`, `cd`, `mkdir`, `rm`, `cp`, `mv`, `cat`, `grep`, `sed`, `awk`, `chmod`, `chown`
- **JS/TS:** `function`, `const`, `let`, `var`, `return`, `if`, `else`, `for`, `while`, `class`, `extends`, `import`, `export`, `from`, `async`, `await`, `try`, `catch`, `finally`, `new`, `this`, `typeof`, `instanceof`, `true`, `false`, `null`, `undefined`, `interface`, `type`, `enum`

For languages not listed, apply comment detection (`//`, `#`, `--`, `/* */`) and string detection (`'...'`, `"..."`) at minimum. Keywords can be omitted — monospace + comments/strings is still a major improvement over raw text.

#### For Markdown files

Render to HTML prose:

- `# Heading` → `<h1>` through `<h6>`
- `**bold**` → `<strong>`
- `*italic*` → `<em>`
- `` `code` `` → `<code>` with gray background
- Code fences → `<pre>` with syntax highlighting (apply the code rules above to the fenced language)
- ` ```mermaid ` fences → see "Mermaid diagrams" below (special handling)
- `- item` → `<ul><li>`
- `1. item` → `<ol><li>`
- `| table |` → `<table>` with borders and alternating row shading
- `> blockquote` → `<blockquote>` with left border
- `---` → `<hr>`
- `[text](url)` → `<a>` (print stylesheet appends URL after link text)
- Bare URLs → `<a>`

Use the same readable serif body font as print-from-html (`"Segoe UI", "Calibri", "Georgia", serif`) at 10.5pt. (print-from-html pairs this with 1.55 line-height; this skill double-spaces it — see the editing difference below.)

**EDITING DIFFERENCE — MANDATORY double-spacing:** prose body uses `line-height: 2.0`; paragraphs and list items use `line-height: 2.2` with generous bottom margins. This is NOT optional in this skill — it is the defining feature. Headings stay at `line-height: 1.25`, table cells at `~1.5`, and code blocks at `1.8` (legibility), but the running prose is double-spaced so the reader can write corrections between lines.

#### Mermaid diagrams (special handling)

Identical to print-from-html. When a Markdown source contains ` ```mermaid ` fenced blocks, the resulting HTML must render them as visual diagrams (not raw mermaid syntax). Two strategies, in preference order:

**Primary: pre-render to inline SVG (offline-capable, cleanest)**

If `@mermaid-js/mermaid-cli` is installed (`mmdc` on PATH):

1. Extract each ` ```mermaid ... ``` ` block to a temp file (e.g., `tmp/diagram-N.mmd`)
2. Run `mmdc -i tmp/diagram-N.mmd -o tmp/diagram-N.svg --backgroundColor transparent`
3. Read the resulting SVG file content
4. Inline the SVG in place of the original mermaid fence
5. Wrap in `<figure class="mermaid-figure" style="page-break-inside: avoid; text-align: center; margin: 0.8em 0;">...</figure>`
6. Delete the temp files when done

Install command if missing: `npm install -g @mermaid-js/mermaid-cli` (requires Node.js). Availability checks: Bash `command -v mmdc`; PowerShell `Get-Command mmdc -ErrorAction SilentlyContinue`; cmd `where mmdc`.

**Fallback: CDN-loaded mermaid.js (requires internet at print time)**

If `mmdc` is NOT available AND the user is online at print time:

1. Keep mermaid blocks as `<pre class="mermaid">...mermaid syntax...</pre>`
2. Add the Mermaid ESM import to `<head>`:

```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    flowchart: { useMaxWidth: true, htmlLabels: true },
    er: { useMaxWidth: true },
    gantt: { useMaxWidth: true }
  });
</script>
```

3. Style `pre.mermaid` transparent + centered.
4. Document in the on-screen banner: "Wait for diagrams to render (~3-5 sec), then Ctrl+P. Needs internet."

**Decision rule:**

| Situation | Strategy |
|-----------|----------|
| `mmdc` on PATH | Use primary (SVG pre-render) — always |
| `mmdc` NOT on PATH, user offline / wants offline-capable file | Offer to install `mmdc` first, then SVG pre-render |
| `mmdc` NOT on PATH, user confirms online at print time | Use fallback (CDN), document the network requirement in the on-screen banner |
| `mmdc` NOT on PATH, user preference unclear | Ask before falling back — don't silently use CDN |

**Always check `mmdc` availability before bypassing the self-contained rule.** The CDN fallback is a documented exception, not a free pass.

#### For CSV files

Parse into an HTML `<table>`:

- First row → `<thead>` with bold headers and gray background
- Subsequent rows → `<tbody>` with alternating row shading
- Auto-detect numeric columns and right-align them
- Handle quoted fields with commas inside
- If the CSV has more than 20 columns, use landscape orientation hint via `@page { size: landscape; }`
- **EDITING DIFFERENCE:** table rows use generous cell padding (`padding: .55em .7em`) so values can be struck through / corrected by hand.

### Step 4: Apply Print CSS

Every HTML file includes both screen and print stylesheets. **The two editing differences (double-spacing + wider margins) are mandatory here.**

```css
@media print {
  body { margin: 0.5in; }   /* unchanged from print-from-html; the @page widening below is the only margin change */
  .no-print { display: none; }
  pre, table { page-break-inside: avoid; }
  h2, h3 { page-break-after: avoid; }
  @page {
    margin: 0.9in 1.0in;   /* WIDER than print-from-html's 0.6in 0.5in — room for margin notes */
    @top-right {
      content: "{document title}";
      font-size: 8pt;
      color: #666;
    }
    @bottom-center {
      content: "Page " counter(page) " of " counter(pages);
      font-size: 8pt;
      color: #666;
    }
  }
}
```

**Editing-specific rules (the heart of this skill):**
- **Double-spacing (MANDATORY):** body `line-height: 2.0`; `p`, `li` `line-height: 2.2` with `margin-bottom` ≥ 1em. Code blocks `line-height: 1.8`. Headings `1.25`, table cells `~1.5`.
- **Wider margins (MANDATORY):** the ONLY margin change from print-from-html is the print `@page` margin, widened from `0.6in 0.5in` to `0.9in 1.0in`. The source's print `body { margin: 0.5in }` is preserved unchanged, so effective print margins (`@page` + body) are genuinely wider than the source's on every edge — the writable gutter for marginalia. Do NOT zero out the body margin to "let @page own it": that interaction can make the effective top margin *narrower* than the source's, defeating the purpose. Widen `@page`, keep the body margin.

**Other print rules (same as print-from-html):**
- Code files: 9-9.5pt monospace, `pre { white-space: pre-wrap; word-wrap: break-word; }`
- Prose files: 10.5pt serif body (same as print-from-html; the editing room comes from line-height + margins, not larger type)
- Tables: `page-break-inside: avoid`
- Section headers: `page-break-after: avoid`
- Links in prose: `a::after { content: " (" attr(href) ")"; font-size: 8pt; color: #666; }`

**Screen-only banner** (hidden in print):

```html
<div class="no-print">
  Press <strong>Ctrl+P</strong> to print this page.
  <strong>Double-spaced with wide margins for hand-editing.</strong>
  Optimized for letter/A4 paper.
</div>
```

Styled with light green background, centered, sans-serif.

### Step 5: Write the File

**Filename convention:** `{source-filename-without-ext}-print-edit.html` (the `-edit` distinguishes editing copies from `/print-from-html`'s `-print.html`).

Examples:
- `schema.sql` → `schema-sql-print-edit.html`
- `architecture.md` → `architecture-md-print-edit.html`
- `methodology-spec.md` → `methodology-spec-md-print-edit.html`

**Default location:** `C:\Users\NerdyKrystal\Desktop\claude files to print\`

Krystal's curated print-queue folder. If it doesn't exist, create it (`mkdir -p`) rather than falling back silently to Desktop root. If the user specifies a different location, use that.

### Step 6: Confirm

Tell the user:
- Filename and location
- Source format detected
- That it is **double-spaced with wide margins for editing**
- How to print ("Open in browser, Ctrl+P")

If multiple files were processed, list all output files.

## Batch Mode

When the user provides multiple files, process each independently. One HTML file per source file. Report all output paths at the end.

Example:
```
User: "print these for me to edit: db/schema.sql, docs/architecture.md"

Output:
  Desktop/claude files to print/schema-sql-print-edit.html        (SQL, double-spaced, wide margins)
  Desktop/claude files to print/architecture-md-print-edit.html   (Markdown prose, double-spaced, wide margins)
```

## Anti-Patterns

- **Single-spaced body.** Defeats the entire purpose of this skill. The body MUST be double-spaced (prose line-height ~2.0-2.2). If a clean single-spaced copy is wanted, that's `/print-from-html`, not this skill.
- **Margins too narrow for marginalia.** This skill exists partly because print-from-html's 0.6in×0.5in margins were too tight for handwritten notes on double-spaced docs. Use `@page { margin: 0.9in 1.0in; }` or wider. Don't shrink margins to fit more on a page — fewer pages with editing room beats dense pages with none.
- **External CSS/JS dependencies.** The HTML must be 100% self-contained. No CDN links, no Google Fonts, no highlight.js. Everything inline. **Documented exception:** Mermaid.js via CDN when `mmdc` is unavailable AND the user confirmed they're online at print time (see Step 3). Always prefer SVG pre-render via `mmdc`.
- **Bright syntax highlighting colors.** Neon looks terrible on B&W laser printers. Use the muted palette above. Bold weight carries better than color in B&W.
- **Fixed-width `<pre>` without wrapping.** Long lines clip at the page edge. Always `pre { white-space: pre-wrap; }`.
- **Tiny font sizes.** Below 8pt is unreadable on paper. Code at 9pt floor; prose at 10pt floor (same as print-from-html — the editing room comes from line-height + margins, not type size).
- **No page numbers.** Paper prints get shuffled. Page numbers + document title in header/footer are essential.
- **Rendering code as an image.** Render as text with HTML/CSS — searchable, scalable, toner-thrifty.

## Reference Implementation

The 2026-05-20 BoboTax explainer editing printouts are the reference for this skill:

- `C:\Users\NerdyKrystal\Desktop\claude files to print\bobotax-asae-explainer-plain-english-2026-05-20-v01-print.html` — double-spaced prose, 1 table
- `C:\Users\NerdyKrystal\Desktop\claude files to print\bobotax-asae-explainer-for-claude-2026-05-20-v01-print.html` — double-spaced prose, 4 tables, 2 SQL blocks

(Those were produced with double-spacing but print-from-html margins; this skill widens the margins per Krystal's feedback that methodology docs needed more marginalia room.)

## Related Skills

- `/print-from-html` — the clean-final-copy sibling (single-spaced, standard 0.6in×0.5in margins). Use it when no editing is needed. This skill (`/print-to-html-to-edit`) is the editing-draft version.
- `/create-database` — produces schema.sql and architecture.md that often need an editing pass before partner review.
- `/diagram-pack` — produces diagrams; for printing diagrams, export to PNG/SVG and use browser print rather than this skill.
