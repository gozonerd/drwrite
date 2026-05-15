---
name: Use /time-task for All Bounded Tasks
description: Every bounded task gets /time-task wrapping; calibration data accumulates per class. Padding estimates, retroactive estimation, and skipping "small" tasks are anti-patterns.
type: feedback
established: 2026-04-26
established_by_session: claude-code-cold-read-2026-04-25
---

## The Rule

Every bounded task gets `/time-task` wrapping with:
1. **Class label** at start (e.g., `new-authorship`, `substitution-edit`, `debug`, `gate-attestation-authoring`, `aspect-spec-authoring`).
2. **Estimated duration** at start (in minutes; honest, not padded).
3. **Actual duration** at end with ratio (actual / estimated).
4. **Append to** `data/task_timing_log_2026.jsonl` per-pipeline; per-class median ratios calibrate over time.

## Why

Calibration discipline is load-bearing for honest cost claims. Without it, every estimate is fiction and every "this took 3x longer than expected" is invisible. Per-class median ratios drift toward 1.0 only when calibration data accumulates — which only happens if every bounded task contributes a data point.

## Anti-patterns (do NOT do)

- **Padding estimate:** "I'll say 30 min to be safe" → calibration data is corrupted, model never learns its real ratio for the class.
- **Retroactive estimation:** estimating after the fact → reverses the calibration arrow; useless for forward planning.
- **Skipping "small" tasks:** "This is too small to bother timing" → small-task class has no median, so future small-task estimates remain blind guesses.
- **No class label:** "I'll just track minutes" → class-blind data can't drive class-specific calibration.

## When NOT to use

- **Conversation-only turns:** answering a question with no file edits or research → no time-task.
- **Single-line trivial edits:** changing one variable name → time-task overhead exceeds task duration.
- **User-paced exploratory dialogue:** when the user is steering and the work boundary is fuzzy → wait until a bounded task crystallizes.

## Connection to other rules

- Composes with `feedback_no_global_defaults.md`: per-pipeline `.maturity.yaml` overrides where time-task class definitions and acceptable median ratios live.
- Composes with A25 MAVB (Maturity-Aware Variance Budgeting): higher-maturity pipelines have tighter ratio bounds.
- Composes with /time-task SKILL.md (canonical implementation).

**Why:** User explicit directive 2026-04-26: "use the /time-task skill for all your tasks from here on out. and add that to memory that this should just be done."
**How to apply:** Before starting any bounded task, decide its class, estimate honestly, log the start. After the task, log the end with actual + ratio. Trust the data; don't fudge it.
