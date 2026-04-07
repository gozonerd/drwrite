# DrWrite Implementation Handoff: Branding

**Date:** 2026-04-07
**From:** Designer
**To:** Builder thread
**Version:** v01_I

---

## Summary of Changes

Apply the DrWrite visual identity: teal/sage primary accent on cool-neutral backgrounds, Inter + JetBrains Mono typography, MD lettermark logo. Sibling to Orchestra (shared backgrounds, text, semantics; distinct accent and logo).

---

## 1. Tailwind Config — Custom Colors

Extend `tailwind.config.js` with the DrWrite design tokens. Replace raw Tailwind grays with semantic token names.

```javascript
// Add to tailwind.config.js extend.colors:
colors: {
  'dw-bg-primary': '#0d1117',
  'dw-bg-panel': '#161b22',
  'dw-bg-card': '#1c2128',
  'dw-bg-editor': '#0f1318',
  'dw-border': '#30363d',
  'dw-border-muted': '#21262d',
  'dw-primary': '#4ec9b0',
  'dw-primary-hover': '#5fd9c0',
  'dw-secondary': '#7b8daa',
  'dw-text-primary': '#e6edf3',
  'dw-text-secondary': '#8b949e',
  'dw-text-muted': '#636c76',
  'dw-success': '#3fb950',
  'dw-warning': '#d29922',
  'dw-error': '#f85149',
  'dw-info': '#58a6ff',
  'dw-handle': '#30363d',
  'dw-handle-hover': '#4ec9b0',
  'dw-handle-active': '#5fd9c0',
}
```

## 2. Component Updates

For every component, replace raw Tailwind colors with `dw-*` tokens:

| Raw Tailwind | Replace With |
|-------------|-------------|
| `bg-gray-900` | `bg-dw-bg-primary` |
| `bg-gray-800` | `bg-dw-bg-panel` |
| `bg-gray-50 dark:bg-gray-800` | `bg-dw-bg-panel` (dark-only app) |
| `bg-white dark:bg-gray-900` | `bg-dw-bg-card` |
| `bg-gray-50 dark:bg-gray-950` | `bg-dw-bg-editor` |
| `text-gray-100` / `text-gray-900 dark:text-gray-100` | `text-dw-text-primary` |
| `text-gray-400` / `text-gray-500` | `text-dw-text-secondary` |
| `text-gray-300` | `text-dw-text-secondary` |
| `bg-blue-500` | `bg-dw-primary` |
| `text-blue-500` | `text-dw-primary` |
| `text-yellow-600 dark:text-yellow-400` | `text-dw-warning` |
| `text-blue-400` | `text-dw-info` |
| `border-gray-200 dark:border-gray-700` | `border-dw-border` |
| `hover:bg-gray-200 dark:hover:bg-gray-700` | `hover:bg-dw-bg-card` |
| `bg-gray-200 dark:bg-gray-700` (handle) | `bg-dw-handle` |
| `hover:bg-blue-400` (handle) | `hover:bg-dw-handle-hover` |
| `bg-blue-500` (handle active) | `bg-dw-handle-active` |

## 3. Mermaid Theme

Update `MermaidRenderer.tsx` initialization:

```typescript
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: '"Inter", system-ui, sans-serif',
  themeVariables: {
    primaryColor: '#4ec9b0',
    primaryTextColor: '#e6edf3',
    primaryBorderColor: '#4ec9b0',
    lineColor: '#8b949e',
    secondaryColor: '#1c2128',
    tertiaryColor: '#161b22',
    background: '#0d1117',
    mainBkg: '#1c2128',
    nodeBorder: '#4ec9b0',
    clusterBkg: '#161b22',
    clusterBorder: '#30363d',
    titleColor: '#e6edf3',
    edgeLabelBackground: '#161b22',
  },
});
```

## 4. Typography

Add Inter and JetBrains Mono via Google Fonts in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Update `index.css` base styles:
```css
body { font-family: 'Inter', system-ui, sans-serif; }
```

Update CodeMirror font in `SourceEditor.tsx`:
```typescript
fontFamily: '"JetBrains Mono", monospace'
```

## 5. Diagram Badge Colors

Update `DiagramCodeBlock.tsx` badge classes per type:

| Type | Badge class |
|------|------------|
| mermaid | `bg-[rgba(78,201,176,0.80)] text-dw-bg-primary` |
| bpmn | `bg-[rgba(88,166,255,0.80)] text-dw-bg-primary` |
| dfd | `bg-[rgba(63,185,80,0.80)] text-dw-bg-primary` |
| plantuml | `bg-[rgba(210,153,34,0.80)] text-dw-bg-primary` |
| graphviz | `bg-[rgba(109,179,214,0.80)] text-dw-bg-primary` |
| interactive | `bg-[rgba(167,139,219,0.80)] text-dw-bg-primary` |

## 6. Logo

SVG logo mark at `docs/design/logo/drwrite-logo-mark.svg`. Teal "M" + white "D" in a circle — reads as both "markdown" and "medical degree."

## 7. Files to Update

| File | Changes |
|------|---------|
| `tailwind.config.js` | Add `dw-*` color tokens |
| `index.html` | Add Google Fonts links |
| `src/index.css` | Update base font-family, TipTap prose colors |
| `src/App.tsx` | Replace gray classes with dw-* tokens |
| `src/components/Toolbar.tsx` | Replace gray classes |
| `src/components/TabBar.tsx` | Replace gray classes, active tab accent |
| `src/components/StatusBar.tsx` | Replace gray classes |
| `src/components/SplitView.tsx` | Replace handle colors |
| `src/components/ExportDialog.tsx` | Replace dialog colors |
| `src/components/DiagramCodeBlock.tsx` (in extensions/) | Update badge colors |
| `src/components/DiagramError.tsx` | Update to use dw-error |
| `src/components/MermaidRenderer.tsx` | Apply Mermaid themeVariables |
| `src/components/SourceEditor.tsx` | Update CodeMirror font |

---

*Implementation sequence: tailwind config → index.html fonts → index.css base → components top-down (toolbar → tabs → split → status → export → diagrams)*
