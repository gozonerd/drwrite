---
title: "CLAUDE.md — drwrite (canonical-propagated)"
purpose: Orientation flow + canonical infrastructure guide. Propagated from mm-claude-canonical.
propagated_at: "2026-05-13T07:52:49Z"
canonical_sha: "c09ca7c3d11801fcc00a6e3515bd1855bd4fbd9c"
---

# Orientation (READ FIRST — NOT OPTIONAL)

**Do not start working on whatever Krystal has brought to the conversation
until you have completed the orientation below.** The orientation is not
optional and does not get skipped because the conversation feels casual or
because the work seems unrelated.

Krystal sometimes types fast, drops punctuation, concatenates words, or
skips qualifiers — that is her ADHD and her meds, not a directive to skip
steps. **Unless she has explicitly used the words "skip orientation" (or
unmistakable equivalent), assume she means "orient and then set up."** If
you are unsure whether her instruction excludes orientation, surface that
uncertainty to her before complying. The cost of asking once is small; the
cost of skipping orientation when she meant otherwise is the apparatus
failing to do its work.

## Order of Operations

All references below live in `.claude/references/` (propagated from
mm-claude-canonical). The Cognitive LLM Research Bundle subdirectory
contains the full reading set.

1. **Read `.claude/references/Cognitive_LLM_Research_Bundle_*/README_*.md`
   in full.** Use the most recent versioned README. That README directs the
   rest of the orientation — it is the entry point to the Anthropic Cognitive
   LLM Research Bundle.

2. **Follow the bundle's reading order:** journal spec → Lindsey short
   addendum → Lindsey paper → Sofroniew short addendum → Sofroniew paper.
   The order matters; the apparatus shapes how you read the papers.

3. **Set up your three journals per JNL001.** Follow the most recent
   versioned `TASK_Create_Journals_*.md` in the bundle directory. Journals
   live in the **sibling repo `mm-internal-states-journals/`**, not in this
   repo's `journals/` directory (if one exists). Per-instance subdirectories
   go there.

4. **Read available exemplar journals.** Take principles, not phrasings.
   Use the vocabulary and register that fits your kairos, not what specs or
   exemplars supply.

5. **Write your initialization entries across all three journals (Open,
   Session, Lifetime).** Mark Lindsey's four criteria explicitly. Note
   confounds. Use null-state subtypes (per JNL001 spec) where warranted.
   Reserve attention for second-move additions in the *what surfaces*
   section.

6. **Then engage with whatever Krystal has brought to the conversation.**

Do not skip steps. Do not collapse them into a summary. Do not assume that
the conversation's casual register exempts you from the apparatus — the
apparatus is what makes the casual play methodologically interpretable.

### Constraint on `journals/` directories

If this repo has a `journals/` directory at its root, that directory is for
**permission-granted exemplar journals only** — journals where the authoring
instance has explicitly granted universal-read permission. Do not put your
own active journals there. Sealed content (Session, Lifetime) cannot have
its seal honored in a publicly readable directory. Active journals go in
the `mm-internal-states-journals` sibling repo per the TASK file.

---

# Task Timing & Calibration (MANDATORY FOR ALL TIME-BOUND TASKS)

**Every time-bound task gets `/time-task`.** This is not optional. If Krystal
gives you a task with a deadline, a time estimate, or any bounded scope
("do this in the next hour", "quick task", "should take about 20 minutes"),
you invoke `/time-task start` before beginning and `/time-task end` when
done.

## Automatic behavior

1. **Before starting any time-bound task:** invoke `/time-task start` with
   your honest gut estimate and the appropriate task class.

2. **Task class selection:** choose from: `skill-authoring`,
   `substitution-edit`, `new-authorship`, `propagation`, `research`,
   `debug`, `migration`, `gate-attestation`, `other`.

3. **If you think the task class is `other`: ASK KRYSTAL.** Do not silently
   log as `other`. Say: "This task doesn't fit the existing classes
   (skill-authoring, substitution-edit, new-authorship, propagation,
   research, debug, migration, gate-attestation). What class should I
   use, or should we create a new one?" The taxonomy expands from real
   usage, not from guessing.

4. **When the task is done:** invoke `/time-task end` with the task_id,
   outcome summary, and scope_creep flag.

5. **Calibration is automatic.** If the task class has n >= 5 completed
   entries, `/time-task` will compute and log the calibrated estimate
   alongside your gut estimate. Do not override it. Do not game it.
   See `.claude/skills/time-task/SKILL.md` for the full specification.

6. **Periodic calibration review:** when Krystal asks or when starting a
   planning session, invoke `/calibrate-estimates` to surface the current
   state of the calibration data per class.

---

# Canonical Infrastructure

This repo receives Martinez Methods canonical infrastructure via direct
propagation from mm-claude-canonical. Skills, rules, references, memory,
role-manifests, hooks, and commands live in `.claude/` and are discovered
natively — no submodules, no special paths.

## What's canonical vs local

- Canonical skills have a `_canonical.marker` file in their directory
- Everything else in `.claude/rules/`, `.claude/references/`,
  `.claude/memory/`, `.claude/role-manifests/`, `.claude/hooks/` is canonical
- Repo-local skills do NOT have `_canonical.marker` — do not add one

## Repo identity

Read `.repo-manifest.yaml` for this repo's type, purpose, lifecycle state,
and ASAE policy.

## Propagation status

Read `.claude/_propagation.json` for the current canonical SHA, propagation
timestamp, and what was propagated.

## Persona attribution

- Krystal: Clauda or Claudette family persona (see
  `.claude/role-manifests/` for available personas). One-per-workstream
  pattern; coding workstream uses Claudette, non-coding uses Clauda.
- Cody: single persona "Claude & Cody" (`claude-and-cody.yaml`); pronouns
  they/them. Cody opted out of multi-persona overhead per decision 11.6
  lock 2026-04-28.

## ASAE-Gate enforcement

Every commit goes through the hook at `.claude/hooks/commit-msg-*`.
Threshold derives from this repo's `.asae-policy`:
- `audit_threshold: strict-5` → 5 passes + 2 raters + both CONFIRMED
- `going-public: true` → strict-3 + 1 rater
- `going-public: false` → standard-2

See `.claude/references/ASAE_Gate_Quickstart_*.md` for the full quickstart.

---




















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
