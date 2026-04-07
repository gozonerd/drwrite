# DrWrite Design Handoff: Visual Identity & Branding

**Date:** 2026-04-07
**Version:** v01_I (internal)
**Purpose:** Everything a designer needs to create DrWrite's visual identity and produce implementation-ready design tokens.

---

## 1. Product Context

### What is DrWrite?

DrWrite is a **desktop markdown editor with split-view editing, embedded diagram rendering, and print-optimized export**. The name is a pun on markdown's "MD" abbreviation — "Dr. Write, MD."

### Target Users

- Technical writers who work in markdown daily
- AI practitioners documenting pipelines and methodologies
- Consultants producing deliverables, specs, and research outputs
- Anyone who needs to edit markdown, render diagrams, and export to PDF without internet

These users live in **dark-mode editors** and value **focus, clarity, and distraction-free writing**. Many have ADHD and specifically choose offline desktop tools to eliminate internet-based distraction vectors.

### Comparable Tools (for visual reference)

| Tool | What to reference |
|------|-------------------|
| **Obsidian** | Split-pane markdown editor, dark mode, plugin ecosystem |
| **Typora** | Clean WYSIWYG markdown with minimal chrome |
| **iA Writer** | Focus-mode writing, typographic precision |
| **VS Code** | Professional dark UI, sidebar + editor layout |
| **Bear** | Apple-quality markdown note-taking aesthetic |

### Platform

Desktop app built with Electron (React 19 + TypeScript). Ships on Windows and macOS. Full CSS support via Chromium.

### Current State

Functional MVP with all features working. The entire visual layer uses raw Tailwind utility classes with no design system. The toolbar, tab bar, split view, and status bar are functional but visually basic — gray backgrounds, default Tailwind colors, no brand identity.

---

## 2. Current Visual State (What Exists)

### Color Palette — Default Tailwind

No custom design tokens. All colors are Tailwind defaults:

| Usage | Current Value | Tailwind Class |
|-------|--------------|----------------|
| App background (dark) | `#111827` | `bg-gray-900` |
| Panel background | `#1f2937` | `bg-gray-800` |
| Card/toolbar background | `#f9fafb` / `#1f2937` | `bg-gray-50` / `bg-gray-800` |
| Primary text | `#f3f4f6` | `text-gray-100` |
| Secondary text | `#9ca3af` | `text-gray-400` |
| Accent (active states) | `#3b82f6` | `bg-blue-500` |
| Dirty indicator | `#ca8a04` | `text-yellow-600` |
| Links | `#3b82f6` | `text-blue-500` |
| Git branch | `#60a5fa` | `text-blue-400` |

### Typography

| Role | Current Font | Source |
|------|-------------|--------|
| Source editor | Fira Code, Cascadia Code, JetBrains Mono | System / Google Fonts |
| WYSIWYG body | System UI (Segoe UI) | System default |
| UI elements | System UI | Tailwind default |

No heading font. No intentional typographic hierarchy beyond Tailwind defaults.

### Icons

None. Toolbar uses text labels ("Open", "Save", "Export", "Light/Dark"). No icon set installed.

### Logo

None. Window title shows "DrWrite" as plain text. No app icon beyond the Electron default.

### Theme

Dark mode only (OS detection + toggle). No custom theme tokens.

---

## 3. CSS Architecture — Implementation Map

All styling is inline Tailwind utility classes. No CSS custom properties, no design tokens, no theme file.

### Structure

```
src/index.css          -- @tailwind directives + TipTap prose styling
tailwind.config.js     -- Tailwind v3 config with dark mode class strategy
```

### How Colors Are Consumed

1. **Tailwind utility classes** everywhere (e.g., `bg-gray-800`, `text-gray-300`)
2. **Inline styles** for split ratio widths and diagram container heights
3. **Mermaid.js** uses its own `theme: 'dark'` default — no custom token mapping

### What the Designer Delivers vs. What Gets Implemented

The designer provides a **token map** (YAML). The developer:
- Creates a `@theme {}` block or extends `tailwind.config.js` with custom colors
- Updates all components to reference semantic token names instead of raw Tailwind colors
- Maps tokens to Mermaid `themeVariables`

---

## 4. Required Deliverables

### 4.1 Color Palette

```yaml
# --- Backgrounds (3 tiers, dark mode) ---
bg-primary:       ""   # Deepest app background
bg-panel:         ""   # Toolbar, tab bar, status bar backgrounds
bg-card:          ""   # WYSIWYG pane, dialog surfaces, raised elements
bg-editor:        ""   # Source editor background (may differ from card)

# --- Primary ---
primary:          ""   # Main brand accent
primary-hover:    ""   # Hover state
primary-muted:    ""   # Focus rings, selection highlight

# --- Secondary ---
secondary:        ""   # Supporting accent (diagram labels, badges)
secondary-hover:  ""   # Hover state

# --- Text (3 tiers) ---
text-primary:     ""   # Main body text, headings
text-secondary:   ""   # Labels, metadata, status bar text
text-muted:       ""   # Placeholders, disabled text

# --- Semantic ---
success:          ""   # Save confirmed, file loaded
warning:          ""   # Unsaved changes, dirty indicator
error:            ""   # Render errors, file not found
info:             ""   # Git branch, line count

# --- Split Handle ---
handle-default:   ""   # Drag handle resting state
handle-hover:     ""   # Drag handle hover
handle-active:    ""   # Drag handle while dragging

# --- Focus / Selection ---
focus-highlight:  ""   # Focus ring glow (rgba)
selection-bg:     ""   # Text selection background
```

### 4.2 Logo

| Asset | Format | Sizes |
|-------|--------|-------|
| App icon (primary mark) | SVG (vector source) | Scalable |
| Favicon | ICO | 16x16, 32x32 |
| PNG exports | PNG | 32x32, 128x128, 256x256, 512x512 |
| Toolbar mark | SVG | Small mark for the toolbar branding area |

The logo should reference the "Dr. Write, MD" pun — a doctor who writes in markdown. Could go clinical/precise, academic, or playful-professional. Must work at 16x16 taskbar size.

### 4.3 Typography

| Role | Where it's used | Requirements |
|------|----------------|--------------|
| **Heading font** | H1-H6 in WYSIWYG pane, dialog titles | Technical but readable. Google Fonts. |
| **Body/UI font** | Toolbar, tabs, status bar, WYSIWYG body | Highly legible at 12-14px. Good for dense UI. |
| **Monospace font** | Source editor (CodeMirror), code blocks | True monospace. Must feel good to type in for extended periods. |

### 4.4 Component Styling Guidance

For each element, provide: fill color, border, radius, text color, hover, active, disabled states.

| Element | Notes |
|---------|-------|
| **Toolbar** | Top bar with filename, Open/Save/Export buttons, dark mode toggle |
| **Tab bar** | Below toolbar, tabs with dirty indicator and close button, + button |
| **Button (primary)** | Save, Export actions |
| **Button (secondary)** | Open, Cancel |
| **Button (ghost)** | Dark/Light toggle, tab close |
| **Split handle** | Vertical drag divider between source and WYSIWYG |
| **Status bar** | Bottom bar with line count, format, git branch, filename, encoding |
| **Export dialog** | Modal with font size slider, margin controls, font family selector, export buttons |
| **Diagram label badge** | Floating badge showing diagram type ("mermaid", "bpmn", etc.) |
| **Diagram error** | Error display for invalid diagram syntax |
| **Code block** | Fenced code in WYSIWYG pane |
| **Table** | Markdown tables in WYSIWYG pane |

---

## 5. UI Inventory — What Gets Branded

### Application Surfaces

| Surface | Description | Key branding touches |
|---------|-------------|---------------------|
| **Toolbar** | Filename + action buttons + dark mode toggle | Background, button styling, brand mark |
| **Tab bar** | Multi-file tabs with dirty indicators | Active/inactive tab colors, close button |
| **Source editor (left)** | CodeMirror with syntax highlighting | Background, line number gutter, cursor color |
| **WYSIWYG editor (right)** | TipTap rendered markdown | Background, heading styles, code block styling |
| **Split handle** | Draggable divider | Color states (rest, hover, active) |
| **Status bar** | Bottom info strip | Background, text colors, git branch highlight |
| **Export dialog** | Modal overlay | Card background, form controls, buttons |
| **Diagram renderers** | 6 types embedded in WYSIWYG | Type badge colors, error display, container borders |

### Diagram Type Badge Colors

Each diagram type renderer shows a floating label badge. Each needs a distinct, accessible color:

| Type | Current Color | Purpose |
|------|--------------|---------|
| `mermaid` | `bg-gray-700` | Flowcharts, sequence diagrams |
| `bpmn` | `bg-blue-700` | Business process diagrams |
| `dfd` | `bg-green-700` | Data flow diagrams |
| `plantuml` | `bg-orange-700` | UML diagrams |
| `graphviz` | `bg-teal-700` | Dependency graphs |
| `interactive` | `bg-rose-700` | HTML/JS sandboxed content |

---

## 6. Mermaid Diagram Theming

DrWrite renders Mermaid diagrams via mermaid.js. The current config uses `theme: 'dark'` with no customization.

### Current Mermaid Config

```javascript
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: '"Segoe UI", system-ui, sans-serif',
});
```

### What the Designer Provides

A token mapping for Mermaid's `themeVariables`:

```yaml
mermaid:
  primaryColor:        "{primary}"
  primaryTextColor:    "{text-primary}"
  primaryBorderColor:  "{primary}"
  lineColor:           "{text-secondary}"
  secondaryColor:      "{bg-card}"
  tertiaryColor:       "{bg-panel}"
  background:          "{bg-primary}"
  mainBkg:             "{bg-card}"
  nodeBorder:          "{primary}"
  clusterBkg:          "{bg-panel}"
  clusterBorder:       "{secondary}"
  titleColor:          "{text-primary}"
  edgeLabelBackground: "{bg-panel}"
```

---

## 7. Brand Positioning

### The Feel

| Attribute | Direction |
|-----------|-----------|
| **Focused** | A writing tool that eliminates distraction. Clean surfaces, no visual noise. |
| **Clinical precision** | The "Dr." in DrWrite suggests medical-level care and accuracy. Clean, sharp, intentional. |
| **Quietly confident** | Doesn't shout. Professional enough for client deliverables, personal enough for daily notes. |
| **Warm-dark** | Not cold sterile. A comfortable dark room with good lighting — like a late-night writing session. |

### What to Avoid

| Avoid | Why |
|-------|-----|
| Bright neon accents | This is a focus tool, not a gaming interface |
| Generic SaaS blue | DrWrite has personality; "doctor who writes" is specific |
| Overly clinical/hospital white | The medical metaphor is a pun, not a literal direction |
| Busy or decorative UI | Users with ADHD need minimal visual distraction |
| Excessive color coding | 6 diagram types need distinction but not a rainbow |

### The "Dr. Write" Metaphor

The name suggests:
- **Precision** — a doctor's careful, deliberate approach to their craft
- **Expertise** — "MD" implies mastery (of markdown)
- **Care** — writing that treats the document with attention and respect
- **Prescription** — the export is the final "prescription" — a clean, formatted document ready for the world

### Company Context

DrWrite is built by **Stahl Systems**. It should feel like a sibling to Orchestra — same family, different personality. Orchestra is the architect; DrWrite is the writer.

---

## 8. Technical Constraints

| Constraint | Detail |
|------------|--------|
| **Tailwind CSS v3** | Colors defined in `tailwind.config.js` `extend.colors`, consumed via utility classes |
| **Dark mode class strategy** | `dark:` prefix classes, toggled via `document.documentElement.classList` |
| **React 19 + TypeScript** | Components are `.tsx` files |
| **Mermaid.js theming** | Diagram colors via `mermaid.initialize({ themeVariables: {...} })` |
| **WCAG AA minimum** | 4.5:1 contrast for body text, 3:1 for large text and UI |
| **Chromium renderer** | Full modern CSS support |
| **Web fonts only** | Google Fonts or npm packages |
| **No icon library** | Currently text-only buttons. Designer may recommend an icon set. |

---

## 9. Relationship to Orchestra

DrWrite and Orchestra are both Stahl Systems desktop apps. They should feel like siblings — same family, different roles.

| Dimension | Orchestra | DrWrite |
|-----------|-----------|---------|
| **Role** | Pipeline architect | Document writer |
| **Metaphor** | Concert hall, conductor | Doctor, prescription |
| **Complexity** | Dense, multi-panel | Focused, two-panel |
| **Color temperature** | TBD by Orchestra designer | Should complement, not duplicate |
| **Typography** | Technical/precise | Readable/literary |

The designer should ensure DrWrite's palette is compatible with Orchestra's (once established) but distinct enough to have its own identity.

---

## 10. Deliverable Format

### Colors
YAML file mapping token names to hex values.

### Logo
SVG source + PNG exports (32, 128, 256, 512) + ICO (16, 32).

### Typography
Google Fonts names + weights needed.

### Component Guidance
Written spec per element (fill, border, radius, text color, states).

### Mermaid Theme
YAML mapping from design tokens to Mermaid themeVariables.

---

## 11. Files to Reference

| File | What it shows |
|------|---------------|
| `src/index.css` | TipTap prose styling, current CSS |
| `src/App.tsx` | Root layout, toolbar + tabbar + splitview + statusbar |
| `src/components/Toolbar.tsx` | Toolbar button structure |
| `src/components/TabBar.tsx` | Tab rendering and interaction |
| `src/components/StatusBar.tsx` | Status bar layout |
| `src/components/SplitView.tsx` | Split handle and pane structure |
| `src/components/ExportDialog.tsx` | Export dialog form layout |
| `src/components/DiagramCodeBlock.tsx` (in extensions/) | Diagram type routing and badge rendering |
| `src/components/MermaidRenderer.tsx` | Mermaid initialization config |
| `tailwind.config.js` | Current Tailwind configuration |

---

## 12. Questions for the Designer

1. **Color temperature:** Should DrWrite go cool (teal/blue-green), neutral-warm (amber/slate), or something that complements whatever Orchestra settles on?
2. **Accent color:** Single primary accent with semantic colors, or primary + secondary?
3. **Icon set:** Should DrWrite adopt Lucide (same as Orchestra) for visual family consistency, or use a different set?
4. **Logo direction:** Stethoscope-pen hybrid? Markdown "MD" styled as a medical degree? Abstract mark? Lettermark?
5. **Typography:** Should DrWrite share Orchestra's heading font for family consistency, or have its own?

---

*End of design handoff. All questions can be directed to the project lead.*
