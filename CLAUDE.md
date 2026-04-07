# DrWrite — Claude Code Project Guide

## Build & Run

```bash
npm start              # Launch in dev mode (Electron Forge + Vite)
npm test               # Run all Vitest tests (259 tests, 25 files)
npm run test:node      # Backend tests (17 tests, Node environment)
npm run test:e2e       # E2E tests (13 Playwright + Electron)
npm run test:all       # All 289 tests
npm run test:watch     # Watch mode
npm run test:coverage  # Tests with V8 coverage report
npm run lint           # ESLint
npx tsc --noEmit       # TypeScript strict check (zero errors)
npm run make           # Build Windows installer (.exe via Squirrel)
```

**Dev launch note:** If blank screen on startup, clear `node_modules/.vite` and relaunch. Launch via `powershell Start-Process cmd.exe` — bash kills Electron processes on timeout.

## Architecture

```
Electron Main Process (src/main.ts)
  ├── File I/O (open, save, save-as, export PDF/HTML)
  ├── SQLite database (recent files, preferences, window state)
  ├── Git status queries (simple-git)
  ├── File watching (chokidar)
  ├── Auto-save (configurable interval)
  ├── Auto-update (electron-updater)
  └── IPC handlers for all renderer requests

Preload (src/preload.ts)
  └── contextBridge exposes `window.drwrite` API

React Renderer
  ├── App.tsx — root component, keyboard shortcuts, file watcher listener
  ├── Toolbar — filename, open/save/export, dark mode toggle, recent files dropdown
  ├── TabBar — multi-file tab management with drag-to-reorder
  ├── FileTreeSidebar — directory browser (Ctrl+B toggle)
  ├── SplitView — draggable split between source and WYSIWYG, scroll sync
  │   ├── SourceEditor (CodeMirror 6) — left pane, minimap
  │   └── WysiwygEditor (TipTap/ProseMirror) — right pane
  ├── StatusBar — word count, line count, git branch, dirty state, encoding
  ├── ExportDialog — configurable margins, font, page numbers, print preview
  ├── KeybindingsDialog — custom keybindings (Ctrl+K chord system)
  ├── OnboardingFlow — first-time user walkthrough
  └── ErrorBoundary — graceful error recovery
```

## State Management

- **Zustand** stores in `src/store/`
- `editor-store.ts` — markdown content (single source of truth), file path, dirty state, dark mode
- `tab-store.ts` — tab lifecycle, active tab tracking
- Sync pattern: `lastEditedBy` flag prevents infinite loops between CodeMirror ↔ TipTap. `'file'` source type signals both editors to update.
- 200ms debounce on cross-editor sync via `setMarkdownDebounced`

## Diagram Rendering

`DiagramCodeBlock.tsx` extends TipTap's CodeBlock — routes code fences by language attribute:

| Language tag | Renderer | Library |
|-------------|----------|---------|
| `mermaid` | MermaidRenderer | mermaid.js |
| `bpmn` | BpmnRenderer | bpmn-js |
| `dfd` | DfdRenderer | D3.js (custom) |
| `plantuml` | PlantUmlRenderer | plantuml-encoder + server API |
| `graphviz` / `dot` | GraphvizRenderer | @hpcc-js/wasm-graphviz |
| `html-interactive` / `d3` | HtmlRenderer | Sandboxed iframe |

## Conventions

- **Pane order:** Source (CodeMirror) LEFT, WYSIWYG (TipTap) RIGHT. Never flip.
- **Tech stack is locked.** Do not swap libraries without explicit approval.
- **Commit cadence:** Commit and push after every logical feature. Never accumulate.
- **Tailwind CSS v3** for all styling. Dark mode via `class` strategy.
- **Native modules** (better-sqlite3, simple-git, chokidar) must be externalized in `vite.main.config.ts`.

## Testing

- **289 total tests:** 259 Vitest (25 files) + 17 Node backend (2 files) + 13 Playwright E2E (4 files)
- **Test-to-source ratio:** 1.03:1 (3,730 test LOC / 3,635 source LOC)
- Setup: `src/test/setup.ts` (mocks for matchMedia, localStorage, window.drwrite API)
- Coverage: V8 provider, excludes main/preload/renderer entry points
- Pre-push hooks: 4-stage gate (prettier, tsc, eslint, vitest)
- Run: `npm test` (Vitest), `npm run test:node` (backend), `npm run test:e2e` (Playwright), `npm run test:all` (all 289)

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+O | Open file |
| Ctrl+S | Save |
| Ctrl+Shift+S | Save as |
| Ctrl+F | Search |
| Ctrl+H | Replace |
| Ctrl+B | Toggle file tree sidebar |
| Ctrl+K | Chord prefix for custom keybindings |
| Ctrl+P | Print / export |

## Known Issues

- `electron-squirrel-startup` wrapped in try/catch — can cause immediate exit on Windows dev
- Renderer components (CodeMirror, TipTap) cannot be unit tested in jsdom — need E2E
