---
name: DrWrite App — Build Status
description: Desktop markdown editor — FULL APP complete, 49 features, 289 tests, v1.0.0 released, TS 5.7, CI/CD, public repo
type: project
---

DrWrite is a desktop markdown editor built with Electron Forge + React 19 + TypeScript 5.7 + CodeMirror 6 + TipTap + Tailwind v3 + Zustand. GitHub repo: `nerdykrystal/drwrite` (PUBLIC, MIT).

**Why:** Krystal wants an "Obsidian meets Typora meets Markdown Monster" tool. Also a portfolio artifact demonstrating technical depth.

**How to apply:** Tech stack is LOCKED. Source editor (CodeMirror) LEFT, WYSIWYG (TipTap) RIGHT. Markdown string is single source of truth in Zustand store. `lastEditedBy` flag prevents sync loops.

**Build status as of 2026-04-07: FULL APP COMPLETE**
- 49 features across 7 phases
- 289 tests (259 Vitest + 17 Node + 13 Playwright E2E)
- Test-to-source ratio: 1.03:1
- TypeScript 5.7 strict, zero `tsc --noEmit` errors
- ESLint 0 errors, 0 warnings, Prettier formatted
- Pre-push hooks: 4-stage gate (prettier → tsc → eslint → vitest)
- CI/CD: GitHub Actions (lint/test + Windows/macOS builds)
- v1.0.0 tagged and released
- 68 commits, 66 files, 3,635 source LOC, 3,730 test LOC
- Branded design system (teal/sage, Inter + JetBrains Mono, MD lettermark logo)
- Light mode + dark mode via CSS custom properties
- D3.js bundled offline (no CDN dependency)
- Auto-update via electron-updater + GitHub Releases

**Path:** `C:\Users\NerdyKrystal\Repos\drwrite\`
