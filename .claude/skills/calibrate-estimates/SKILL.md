---
name: calibrate-estimates
description: "Use this skill to read accumulated task-timing data and produce a calibration analysis (estimate-vs-actual ratios per task class, recommended dividers for future estimates, outliers worth investigating). Triggers on '/calibrate-estimates', 'calibrate my estimates', 'how off are my task estimates', 'show me the timing data analysis'. Companion to /time-task which produces the underlying log."
---

# calibrate-estimates

## Purpose

Read the task-timing log produced by `/time-task` and produce a calibration analysis: per-class ratios, median estimate-vs-actual, outliers, recommended dividers for future estimates. The output is intended to inform the NEXT estimate the user (or the next Claudette/Clauda) makes.

## When to Use

- After accumulating ≥10 completed entries in the log (less is too noisy)
- Before starting a session where estimation accuracy matters (project planning, sprint scoping, time-budget-bounded work)
- Periodically (weekly / monthly / per-major-cycle) to track whether calibration is improving

## Inputs

- The current year's log: `_grand_repo/data/task_timing_log_<YEAR>.jsonl`
- Optional: prior year's log for trend analysis

## Algorithm

For each `task_class` in the log:

1. Filter to `status == "completed"` entries.
2. Compute median `ratio` (actual / estimate).
3. Compute count of entries.
4. Compute interquartile range (IQR) of ratios.
5. Identify outliers (>2× IQR from median).

For the OVERALL log:

1. Compute global median ratio.
2. Compute total count of completed entries.
3. Identify the single most-overestimated and single most-underestimated entries.

## Output format

```
## Task Estimate Calibration — <date>

Total completed entries: N

### Per-class summary

| Class | N | Median ratio | IQR | Recommendation |
|---|---|---|---|---|
| skill-authoring | 12 | 0.45 | 0.30-0.62 | Divide gut estimate by ~2.2 |
| substitution-edit | 8 | 0.10 | 0.05-0.20 | Divide gut estimate by ~10 |
| ... | | | | |

### Global insights

- Global median ratio: 0.40 (you overestimate by ~2.5× on average)
- Most overestimated: <task_id> (ratio 0.05) — <description>
- Most underestimated: <task_id> (ratio 4.2) — <description>

### Recommendations for next session

- For class X: gut-estimate Y minutes → use ~Y/2.2 = round(Y/2.2) minutes
- ...
```

## Interpretation guidance

- **Ratio < 1**: you overestimated. Actual was less than estimate.
- **Ratio = 1**: dead-on.
- **Ratio > 1**: you underestimated. Actual was more than estimate (this is the dangerous direction — leads to budget overruns).
- **Median, not mean**: outliers (rare disasters) shouldn't dominate; use median.
- **Don't apply the divider blindly**: if a task feels structurally different from prior similar tasks, override.

## Anti-patterns

- **Don't aggregate across very different task classes**: a "skill-authoring" estimate calibration shouldn't pollute a "debug" estimate calibration.
- **Don't apply yesterday's calibration to fundamentally new task types**: if `task_class = "other"` for a task, the calibration data is unreliable; estimate from first principles instead.
- **Don't game the calibration**: see `/time-task` anti-patterns. Calibration analysis is only valid if input data is honest.

## Implementation

This skill is procedural — invoking Claude reads the JSONL file with Bash/Read tools, computes statistics with awk or jq, formats the output. No separate executable.

Recommended bash for global median:

```bash
LOG="C:/Users/NerdyKrystal/_grand_repo/data/task_timing_log_$(date -u +%Y).jsonl"
jq -s 'map(select(.status == "completed")) | sort_by(.ratio) | .[length/2 | floor].ratio' "$LOG"
```

Per-class median:

```bash
jq -s 'group_by(.task_class) | map({class: .[0].task_class, n: length, median: (sort_by(.ratio) | .[length/2 | floor].ratio)})' "$LOG"
```

## Provenance

- Authored 2026-04-26 by Claudette the PEK Remediator v01 (Opus 4.7).
- Companion to `/time-task`.
- Reads from `data/task_timing_log_<YEAR>.jsonl`.
