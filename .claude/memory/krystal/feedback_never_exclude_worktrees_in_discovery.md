---
name: Never exclude worktrees (or .claude/) in discovery sweeps
description: When searching for files across the repo universe, do NOT exclude .claude/worktrees/ or .claude/ — real, requested content lives there
type: feedback
---

When doing cross-repo file discovery (find/grep sweeps to locate artifacts for the user), **do not exclude `.claude/worktrees/`, `.claude/`, or `.claude/projects/`.** Search everything.

**Why:** On 2026-05-17, asked to assemble document bundles, I excluded `.claude/worktrees/` from all discovery agents to "avoid duplication noise." Krystal's response (verbatim, including her typo): "xcluding worktrees. well that was silly of you." Real requested content (FM-18 incident files, transcripts, memory references) lives inside worktrees and `.claude/projects/` transcript stores. Excluding them produced false "not found" conclusions for ~4 of 9 bundles. The duplication concern is real but is solved by dedup-after-collect, NOT by pre-excluding the search space.

**How to apply:** Default discovery scope is the full tree under every repo root (`martinez-methods/`, `_grand_repo/`, `_martinez-methods/`, `_experiments/`, `repos/`, plus `~/.claude/projects/` for transcripts). Only prune `node_modules` and `.git/` internals (binary/irrelevant). If duplication across worktrees is a concern, collect everything then dedup by content/basename — never report "not found" off a worktree-excluded search.
