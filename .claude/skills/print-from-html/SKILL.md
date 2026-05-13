---
name: print-from-html
description: "Generate a print-ready HTML file from any source file so Krystal can open it in a browser and Ctrl+P. Triggers on: '/print-from-html', '/print from html', 'print-from-html', 'make this printable', 'I need to print this', 'print this for my partner', 'give me a printable version', 'print-ready HTML', 'HTML for printing'. Handles any source format: SQL, Python, JS/TS, YAML, JSON, Markdown, plain text, CSV. Produces a single self-contained HTML file on the Desktop (or specified location) with format-appropriate styling, syntax highlighting for code, clean typography for prose, and print CSS (page breaks, margins, headers/footers, page numbers)."
version: 1.1.1
authored_by: Claudette the Code Debugger v01 (2026-05-12)
type: skill
classification: utility-class
provenance: Extracted from mm-fm-taxonomy Batch 2 partner-review workflow. Krystal needed schema.sql and architecture.md printed for her partner to review on paper. Pattern generalized to any source file.
changelog:
  - "1.0.0 (2026-05-12): Initial release. 16 file formats, syntax highlighting, markdown rendering, CSV tables, print CSS."
  - "1.1.0 (2026-05-12): Added Mermaid diagram handling — primary path via mmdc CLI pre-render to inline SVG (offline-capable); fallback via CDN-loaded mermaid.js (requires internet at print time). Anti-pattern about external dependencies updated to allow Mermaid CDN as documented exception."
  - "1.1.1 (2026-05-12): Default output location changed from Desktop root (`C:\\Users\\NerdyKrystal\\Desktop\\`) to Krystal's curated print-queue subfolder (`C:\\Users\\NerdyKrystal\\Desktop\\claude files to print\\`). Folder is `mkdir -p`'d if missing — no silent fallback to Desktop root. Surfaced during the 2026-05-12 BoB play-journal print-to-html invocation; Krystal directed the change inline. Gate-31 canonical (strict-5 / 2 raters PARTIAL → corrected inline → effectively CONFIRMED; first attempt as gate-26 FLAGged for ID collision, renamed gate-30 per next-unused-integer)."
---

# /print-from-html

## Purpose

Turn any file into a print-ready HTML page. Open in browser, Ctrl+P, done.

Krystal works with a partner who reviews on paper. This skill eliminates the friction of getting clean printouts from source files that don't print well natively (code files, markdown, YAML, raw SQL).

## When to Use

- Krystal says "I need to print this" or "make this printable"
- A partner, collaborator, or reviewer needs a paper copy of a technical artifact
- Any file needs to go from screen to paper with readable formatting
- Multiple files need printing — invoke once per file, or batch by listing all paths

## When NOT to Use

- The file is already HTML with print CSS (just print it directly)
- The user wants a PDF (this skill produces HTML; browser print-to-PDF covers that use case via Ctrl+P > Save as PDF)

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| Source file path(s) | Yes | One or more files to make printable |
| Output location | No | Where to write the HTML. Default: `C:\Users\NerdyKrystal\Desktop\claude files to print\` (Krystal's curated print-queue folder; keeps print-ready HTML separate from other Desktop clutter). Folder is created via `mkdir -p` if missing — no silent fallback to Desktop root (per Step 5). |
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

### Step 2: Generate the HTML

Every output file is a single self-contained HTML page (no external CSS/JS dependencies). Structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{document title}</title>
  <style>
    {all CSS inline — print + screen}
  </style>
</head>
<body>
  {screen-only print instructions banner}
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

Use a readable serif body font (`"Segoe UI", "Calibri", "Georgia", serif`) at 10.5pt with 1.55 line-height. Code blocks use the same monospace stack as code files.

#### Mermaid diagrams (special handling)

When a Markdown source contains ` ```mermaid ` fenced blocks, the resulting HTML must render them as visual diagrams (not as raw mermaid syntax that won't make sense on paper). Two strategies, in preference order:

**Primary: pre-render to inline SVG (offline-capable, cleanest)**

If `@mermaid-js/mermaid-cli` is installed (the `mmdc` command is on PATH):

1. Extract each ` ```mermaid ... ``` ` block to a temp file (e.g., `tmp/diagram-N.mmd`)
2. Run `mmdc -i tmp/diagram-N.mmd -o tmp/diagram-N.svg --backgroundColor transparent`
3. Read the resulting SVG file content
4. Inline the SVG (full `<svg>...</svg>` content) in place of the original mermaid fence
5. Wrap in `<figure class="mermaid-figure" style="page-break-inside: avoid; text-align: center; margin: 0.8em 0;">...</figure>`
6. Delete the temp files when done

Install command if `mmdc` is missing: `npm install -g @mermaid-js/mermaid-cli` (requires Node.js).

Check for availability cross-platform:
- Bash / Git Bash: `command -v mmdc` (returns path if present, empty if not)
- PowerShell: `Get-Command mmdc -ErrorAction SilentlyContinue`
- Windows cmd: `where mmdc`

Run the check as Step 1.5 (after reading the source, before generating HTML).

**Fallback: CDN-loaded mermaid.js (requires internet at print time)**

If `mmdc` is NOT available AND the user is online at print time (or has explicitly said network access is fine):

1. Keep mermaid blocks as `<pre class="mermaid">...mermaid syntax...</pre>` (Mermaid auto-detects this class)
2. Add the Mermaid ESM import to the HTML `<head>`:

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

3. Style `pre.mermaid` to remove the code-block background (transparent + centered):

```css
pre.mermaid {
  background: #fff;
  border: 1px solid #ddd;
  border-left: 1px solid #ddd;
  text-align: center;
  padding: 0.4em;
}
```

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

### Step 4: Apply Print CSS

Every HTML file includes both screen and print stylesheets:

```css
@media print {
  body { margin: 0.5in; }
  .no-print { display: none; }
  pre, table { page-break-inside: avoid; }
  h2, h3 { page-break-after: avoid; }
  @page {
    margin: 0.6in 0.5in;
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

**Print-specific rules:**
- Code files: 9-9.5pt monospace, `pre { white-space: pre-wrap; word-wrap: break-word; }` (wrap long lines rather than clip)
- Prose files: 10-10.5pt serif body
- Tables: `page-break-inside: avoid` (keep tables together when possible)
- Section headers: `page-break-after: avoid` (don't orphan a heading at page bottom)
- Links in prose: `a::after { content: " (" attr(href) ")"; font-size: 8pt; color: #666; }` (show URLs in print)

**Screen-only banner** (hidden in print):

```html
<div class="no-print">
  Press <strong>Ctrl+P</strong> to print this page.
  Optimized for letter/A4 paper.
</div>
```

Styled with light green background, centered, sans-serif.

### Step 5: Write the File

**Filename convention:** `{source-filename-without-ext}-print.html`

Examples:
- `schema.sql` → `schema-sql-print.html`
- `architecture.md` → `architecture-md-print.html`
- `registry.yaml` → `registry-yaml-print.html`
- `import_ssot.py` → `import-ssot-py-print.html`

**Default location:** `C:\Users\NerdyKrystal\Desktop\claude files to print\`

This is Krystal's curated print-queue folder — keeps print-ready HTML files in one place rather than scattered across Desktop. If the folder doesn't exist at invocation time, create it (`mkdir -p`) rather than falling back silently to Desktop root. If the user specifies a different location, use that instead.

*Added 2026-05-12 per Krystal's direction "put it in the claude files to print folder and add that step to the skill" (BoB play journal print-to-html invocation, this same date).*

### Step 6: Confirm

Tell the user:
- Filename and location
- Source format detected
- How to print ("Open in browser, Ctrl+P")

If multiple files were processed, list all output files.

## Batch Mode

When the user provides multiple files, process each one independently. Generate one HTML file per source file. Report all output paths at the end.

Example:
```
User: "print these for me: db/schema.sql, docs/architecture.md, .repo-manifest.yaml"

Output:
  Desktop/schema-sql-print.html        (SQL, syntax highlighted)
  Desktop/architecture-md-print.html   (Markdown, rendered prose)
  Desktop/repo-manifest-yaml-print.html (YAML, syntax highlighted)
```

## Anti-Patterns

- **External CSS/JS dependencies.** The HTML must be 100% self-contained. No CDN links, no Google Fonts imports, no highlight.js. Everything inline. The file must render correctly when opened from the local filesystem with no network. **Documented exception:** Mermaid.js via CDN is allowed as a fallback when `mmdc` (mermaid-cli) is not available AND the user has confirmed they'll be online at print time. See the "Mermaid diagrams" section under Step 3 for the decision rule. Always prefer SVG pre-render via `mmdc` when available — that's truly offline-capable.
- **Bright syntax highlighting colors.** Neon green, electric blue, hot pink — these look terrible when printed on a black-and-white laser printer (most office printers). Use the muted palette specified above. Bold weight carries better than color in B&W.
- **Fixed-width `<pre>` without wrapping.** Long lines clip at the page edge. Always use `pre { white-space: pre-wrap; }` so lines wrap at the margin rather than disappearing.
- **Tiny font sizes.** Below 8pt becomes unreadable on paper. Code at 9pt is the floor; prose at 10pt.
- **No page numbers.** Paper prints get shuffled. Page numbers + document title in header are essential for multi-page documents.
- **Rendering code as an image.** Screenshots of code don't scale, can't be searched, and waste toner. Always render as text with HTML/CSS.

## Reference Implementation

The mm-fm-taxonomy partner-review printouts are the reference:

- **SQL output:** `C:\Users\NerdyKrystal\Desktop\schema-sql-print.html` — 426-line schema with section bars, SQL keyword/type/string/comment highlighting
- **Markdown output:** `C:\Users\NerdyKrystal\Desktop\architecture-md-print.html` — 7-section architecture doc with ER diagram, cardinality table, constraint table, deployment commands

## Related Skills

- `/create-database` — produces schema.sql and architecture.md that often need printing for partner review
- `/diagram-pack` — produces diagrams; for printing diagrams, export to PNG/SVG and use browser print rather than this skill
