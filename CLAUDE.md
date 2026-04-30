# Canonical Session-Start Instruction (auto-prepended by wire-consumer-repo.sh)

## Session-Start Discipline (READ FIRST)

This repo consumes the Martinez Methods SSOT via two git submodules under
`.claude/canonical/`. Before reading any other file in this repo, including the
rest of this CLAUDE.md, the SessionStart hook should have run:

```bash
git submodule update --remote --recursive .claude/canonical/
```

If that hook did NOT run (e.g., older settings.json, hook disabled), run it
manually before reading skills. Stale canonical content is a load-bearing
failure mode.

### Skill resolution order

1. **Repo-local override** — `.claude/skills/<name>/SKILL.md`
2. **Canonical (general)** — `.claude/canonical/mm-claude-canonical/skills/<name>/SKILL.md`
3. **Canonical (D2R)** — `.claude/canonical/mm-d2r-code-plan-stack/skills/<name>/SKILL.md`

### Memory partition

Loaded from `.claude/canonical/mm-claude-canonical/memory/<detected-user>/`
where `<detected-user>` ∈ {krystal, cody, shared}. See
`.claude/canonical/mm-claude-canonical/skills/load-memory/SKILL.md` for the
detection algorithm.

**Fail-closed:** if user-detection cannot resolve to a definitive user AND the
session is non-interactive (no opportunity to ask), NO memory loads. Surface
warning at session top; continue session without memory. Cross-user
contamination is a load-bearing failure mode (handoff §2.2 + design doc §11.8).

### Failure mode — submodule update fails

If `git submodule update --remote` fails (network, conflict, auth):

1. The session continues with the existing local SHA (stale-but-functional).
2. Warning surfaces at session start (`session-start-pull.sh` writes to
   `~/.claude/sync-failure.log` and prints to stderr).
3. Investigate before authoring; running on stale canonical risks losing recent
   methodology updates.

### Persona attribution

- Krystal: Clauda or Claudette family persona (one-per-workstream pattern;
  see `_grand_repo/role-manifests/` and SSOT-migrated copies at
  `.claude/canonical/mm-claude-canonical/role-manifests/`).
- Cody: single persona "Claude & Cody" (`claude-and-cody.yaml`); broad scope;
  pronouns they/them. Cody opted out of multi-persona overhead per decision
  11.6 lock 2026-04-28.

### ASAE-Gate enforcement

Every commit goes through `.githooks/commit-msg` (or whatever hook this repo
has installed). Threshold derives from this repo's `.asae-policy`:
- `audit_threshold: strict-5` → 5 passes + 2 raters + both CONFIRMED (canonical SSOT repos)
- `going-public: true` → strict-3 + 1 rater (default for going-public repos)
- `going-public: false` → standard-2 (default for stable-private repos)

See `.claude/canonical/mm-claude-canonical/references/ASAE_Gate_Quickstart_*.md`
when Spec Genius authors it (Batch 3 Lock A1) for the full quickstart.

---

---

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
