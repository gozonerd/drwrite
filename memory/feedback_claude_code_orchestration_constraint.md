---
name: Claude Code Orchestration — Human-Driven Only (Per Max Subscription ToS)
description: Under Krystal's Claude Code Max-tier subscriptions, scripted/headless Claude Code use is NOT permitted. Human-orchestrated parallel use IS permitted (she runs 5+ parallel threads regularly). Shell scripts for setup/measurement that do NOT invoke Claude Code programmatically are fine.
type: feedback
originSessionId: 46056a33-f1c9-42ab-8260-97ba2f9b45f8
---
Under Krystal's Claude Code Max 20 and Max 5 subscriptions, Claude Code itself must be human-initiated. Scripted, headless, or unattended programmatic invocation of Claude Code is not permitted by subscription ToS.

Human-orchestrated parallel use IS permitted. Krystal regularly runs 5+ parallel Claude Code threads simultaneously as normal workflow — this is within scope.

**Why:** Stated explicitly on 2026-04-22 in context of the D2R Methodology Factorial pilot planning: "scripted/headless claude code use is not permitted, but i can human orchestrate it. i regularly run 5+ parallel claude code threads." This is a hard operational constraint on any automation design touching Claude Code.

**How to apply:**

1. **Never write a script that invokes `claude` headlessly / non-interactively.** No orchestration scripts, no Python/shell loops that spawn Claude Code processes, no CI pipelines that exec `claude` unattended.
2. **Do design human-orchestrated workflows.** The "orchestration host" for Krystal's Claude Code-based work is Krystal herself. Assume she is launching and monitoring each Claude Code thread manually.
3. **Parallelism via her habit.** She runs 5+ parallel Claude Code threads as normal workflow — design parallel work as multiple concurrent threads she launches, not as scripted fan-out.
4. **Setup and measurement shell scripts are fine.** Shell scripts that prepare a working directory (clone skill bundles, copy input docs, set env vars) or post-hoc measure a build (run axe-core, Lighthouse, ESLint on a completed workspace) do NOT invoke Claude Code programmatically — they prepare or measure around it. Those scripts are within scope.
5. **Sentinel monitoring is human.** "Watch for BUILD COMPLETE" is Krystal's job, not a script's.
6. **Factorial and experimental designs must be human-executable.** The D2R Methodology Factorial's full-factorial expansion (55 runs) is not feasible under human orchestration alone — that requires API-billed execution via one of Options B/C/D in `_grand_repo/docs/Orchestration_Host_Options_2026-04-22_v01_I.md`. Plan accordingly.
7. **Factorials at pilot scale (3 conditions × n=1 = 3 runs) ARE feasible** under human orchestration. Pilot runs over 1-2 days with 2-way parallelism (one thread per Max account).

**Scope of the rule:**

| Activity | Permitted under Max subscription |
|---|---|
| Human launches `claude` in a terminal, types prompts, watches output | YES |
| Human launches 5+ `claude` sessions in parallel, each manually | YES |
| Shell script creates a directory tree, copies files, installs npm packages | YES (no Claude Code) |
| Shell script runs axe-core / Lighthouse / ESLint on a completed build | YES (no Claude Code) |
| Python script runs `claude -p "<prompt>"` in a subprocess loop | NO (scripted Claude Code) |
| Cron job that invokes `claude` on a schedule | NO |
| CI pipeline that exec's `claude` during a build step | NO |
| API-key-based Claude Code use with paid API credits | N/A (different billing; see Options A-E of Orchestration Host doc) |

**Related:**
- `_grand_repo/docs/Orchestration_Host_Options_2026-04-22_v01_I.md` — Option F (subscription path) reflects this constraint
- `_experiments/experiments/d2r_methodology_factorial/pilot-3-condition-protocol.md` — pilot designed for human orchestration
