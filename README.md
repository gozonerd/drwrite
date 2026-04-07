# DrWrite

A desktop markdown editor with split-view editing, 6 diagram renderers, and print-optimized export.

[![CI](https://github.com/nerdykrystal/drwrite/actions/workflows/ci.yml/badge.svg)](https://github.com/nerdykrystal/drwrite/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/nerdykrystal/drwrite)](https://github.com/nerdykrystal/drwrite/releases/latest)

## Download

| Platform | Installer |
|----------|-----------|
| Windows | [drwrite Setup.exe](https://github.com/nerdykrystal/drwrite/releases/latest/download/drwrite-1.0.0.Setup.exe) |
| macOS (Apple Silicon) | [drwrite.dmg](https://github.com/nerdykrystal/drwrite/releases/latest/download/drwrite-1.0.0-arm64.dmg) |

Or grab the latest from the [Releases page](https://github.com/nerdykrystal/drwrite/releases).

> **macOS note:** The app is not code-signed. On first launch, right-click the app and select "Open" to bypass Gatekeeper.
>
> **Windows note:** You may see a SmartScreen warning. Click "More info" then "Run anyway".

## Why This Exists

I work with markdown constantly — pipeline documentation, deliverables, research outputs, learning experiences. Every day I need to edit markdown with a live preview, render embedded diagrams, and export to PDF without converting to .docx first.

No free markdown editor does all of this:

- **Obsidian** doesn't export to PDF natively (needs plugins)
- **Typora** isn't free
- **VS Code** doesn't render diagrams inline in its markdown preview
- None of them let you control print margins and font size from the app itself

I also need to work **offline**. Internet access is a distraction vector for ADHD. A desktop app that works without connectivity removes that entirely.

So I built the tool I needed.

## Features

### Core Editor
- Split-view: CodeMirror source (left) + TipTap WYSIWYG (right)
- Bidirectional sync with 200ms debounce and loop prevention
- Dark mode and light mode with OS detection and persistence
- Multi-file tabs with per-tab content caching and drag-to-reorder
- Search and replace (Ctrl+F / Ctrl+H)
- File watching — auto-reload on external changes
- SQLite database for recent files, preferences, window state
- Git status in status bar (branch name, file dirty state)
- Word count (live in status bar)
- Auto-save with configurable interval
- Recent files dropdown
- Custom keybindings (Ctrl+K chord system)
- Scroll sync between source and preview
- Spell check toggle
- Minimap navigation
- File tree sidebar (Ctrl+B)
- Onboarding flow for first-time users
- Auto-update support

### Diagram Rendering (6 types)

Each diagram type uses a dedicated renderer — not a single library wrapper.

| Diagram | Renderer | Approach |
|---------|----------|----------|
| Flowcharts, sequence | mermaid.js | Client-side JS |
| BPMN 2.0 | bpmn-js | Dedicated BPMN viewer |
| Data Flow Diagrams | D3.js | Custom-built from scratch |
| UML | PlantUML | Server API encoding |
| Dependency graphs | Graphviz | Client-side WASM |
| Interactive HTML/JS | Sandboxed iframe | D3.js auto-injected |

### Export
- PDF export via Electron printToPDF
- HTML export as self-contained document
- Configurable margins, font size, font family, page numbers
- Print preview before export
- Settings persist across sessions

## Architecture

```mermaid
graph TD
    subgraph Electron Main Process
        M[main.ts] --> IPC[IPC Handlers]
        M --> DB[(SQLite)]
        M --> GIT[simple-git]
        M --> WATCH[chokidar]
    end

    subgraph Preload
        P[preload.ts] --> CB[contextBridge]
    end

    subgraph React Renderer
        APP[App.tsx] --> TB[Toolbar]
        APP --> TABS[TabBar]
        APP --> SV[SplitView]
        APP --> SB[StatusBar]
        SV --> SE[SourceEditor<br/>CodeMirror 6]
        SV --> WE[WysiwygEditor<br/>TipTap]
        WE --> DCB[DiagramCodeBlock]
        DCB --> |mermaid| MR[MermaidRenderer]
        DCB --> |bpmn| BR[BpmnRenderer]
        DCB --> |dfd| DR[DfdRenderer]
        DCB --> |plantuml| PR[PlantUmlRenderer]
        DCB --> |graphviz| GR[GraphvizRenderer]
        DCB --> |html-interactive| HR[HtmlRenderer]
    end

    IPC <--> CB
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop shell | Electron Forge 7.11 |
| Frontend | React 19, TypeScript |
| Source editor | CodeMirror 6 |
| WYSIWYG editor | TipTap 3 / ProseMirror |
| State management | Zustand 5 |
| Styling | Tailwind CSS v3 + custom design tokens |
| Database | better-sqlite3 (WAL mode) |
| Testing | Vitest + React Testing Library + Playwright |
| Coverage | @vitest/coverage-v8 |
| Build | Vite 5 |

## Engineering Discipline

| Practice | Detail |
|----------|--------|
| Tests | 289 automated (259 Vitest jsdom + 17 Vitest Node + 13 Playwright E2E) |
| Test-to-source ratio | 1.03:1 (3,730 test LOC / 3,635 source LOC) |
| TypeScript | 5.7 strict mode, zero `tsc --noEmit` errors |
| Pre-push hooks | 4-stage gate: Prettier, tsc, ESLint, Vitest |
| Commit conventions | Enforced via commitlint (conventional commits) |
| Linting | ESLint 0 errors + 0 warnings, Prettier all files formatted |
| CI/CD | GitHub Actions: lint/test + Windows/macOS builds |
| Codebase | 66 TypeScript files, 68 commits, v1.0.0 tagged |
| Security | Sandboxed iframe for user HTML/JS, Electron Fuses, contextBridge IPC |

## Development

```bash
# Install dependencies
npm install

# Run in development
npm start

# Run tests
npm test                    # Unit + component tests (259 Vitest, 25 files)
npm run test:node           # Backend tests (17 tests, Node environment)
npm run test:e2e            # E2E tests (13 Playwright + Electron)
npm run test:all            # All 289 tests
npm run test:coverage       # Coverage report

# Quality checks
npm run lint                # ESLint
npx prettier --check .      # Prettier
npx tsc --noEmit            # TypeScript strict check

# Build installers
npm run make                # Windows .exe or macOS .dmg
```

**Known dev issue:** If blank screen on startup, run `rm -rf node_modules/.vite` and relaunch.

## License

MIT
