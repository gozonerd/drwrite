---
name: calibrate-estimates
description: "Use this skill to read accumulated task-timing data and produce a calibration analysis (estimate-vs-actual ratios per task class with IQR, class-drift signals, recommended calibration factors for future estimates, outliers worth investigating). Triggers on '/calibrate-estimates', 'calibrate my estimates', 'how off are my task estimates', 'show me the timing data analysis'. Companion to /time-task v02 which produces the underlying log with gut + calibrated estimates."
version: v02_I
supersedes: v01 (2026-04-26 — pre-loop-closure version)
---

# calibrate-estimates

## Purpose

Read the task-timing log produced by `/time-task` and produce a calibration analysis: per-class median ratios with IQR, class-drift signals (when within-class variance is too high to trust the median), recommended calibration factors for future estimates, calibrated-ratio diagnostics (whether the calibration formula is working), and outliers. The output informs the NEXT estimate the user (or the next Claude instance) makes via /time-task v02's automatic calibration application.

## What Changed in v02

v01 produced a markdown analysis intended for human reading. v02 still produces the markdown analysis but also surfaces the calibration factor that /time-task v02 automatically applies to gut estimates at start-mode. The analysis now includes:

- **IQR per class** (was missing in v01) — width of within-class variance
- **Class-drift signal** — when IQR is wide enough to question the median's reliability
- **Calibrated-ratio diagnostics** — for entries with calibrated_estimate, how close to 1.0 the calibrated_ratio is (the methodology working / not working signal)
- **Multiplication-not-division formula consistency** — v01 said "divide gut by 2.2" but the schema's ratio = actual/estimate, so the correct operation is multiply gut by median(ratio). Fixed.

## When to Use

- After accumulating ≥5 completed entries per class (less is too noisy for that class; v02's threshold matches /time-task v02's calibration activation threshold)
- Before starting a session where estimation accuracy matters (project planning, sprint scoping, time-budget-bounded work)
- Periodically (weekly / monthly / per-major-cycle) to track whether calibration is improving
- After /time-task end-mode reports a calibrated_ratio far from 1.0, to surface what's happening with the calibration formula for that class

## Inputs

- The current year's log: `_grand_repo/data/task_timing_log_<YEAR>.jsonl`
- Optional: prior year's log for trend analysis

## Algorithm

For each `task_class` in the log:

1. Filter to `status == "completed"` entries.
2. For each entry, extract:
   - `gut_ratio` (or `ratio` for v01 backward-compatible entries — treat as gut_ratio)
   - `calibrated_ratio` (null for v01 entries and for v02 entries logged before n=5 was reached)
3. Compute median(gut_ratio) for the class — this is the calibration factor.
4. Compute IQR(gut_ratio) for the class.
5. Compute median(calibrated_ratio) for the class (where calibrated_ratio is not null) — this is the diagnostic. Should be near 1.0 if calibration is working.
6. Identify outliers: entries with gut_ratio more than 1.5×IQR above Q3 or below Q1.
7. **Class-drift signal:** if IQR > 0.5 (i.e., the middle 50% of ratios span more than half a unit), flag this class as having unstable categorization. The class may need to be split or its definition tightened.

For the OVERALL log:

1. Compute global median(gut_ratio).
2. Compute global IQR(gut_ratio).
3. Compute global median(calibrated_ratio) where applicable.
4. Identify the single most-overestimated and single most-underestimated entries (by gut_ratio).
5. Compute the ratio of completed entries to started-but-not-completed entries (data quality signal — if many tasks are started but never completed, the methodology overhead is too high to sustain).

## Output format

```
## Task Estimate Calibration — <date>

Total entries: N completed, M started-but-not-completed
Data quality: completion rate = N/(N+M) = X%

### Per-class summary

| Class | N | Median gut_ratio | IQR | Calibration factor | Median calibrated_ratio | Drift? |
|---|---|---|---|---|---|---|
| research | 21 | 0.44 | 0.30-0.65 (width 0.35) | 0.44 | (n=8 calibrated): 1.08 | OK |
| new-authorship | 17 | 0.67 | 0.45-0.92 (width 0.47) | 0.67 | (n=4 calibrated): 0.95 | OK |
| skill-authoring | 3 | 0.26 | INSUFFICIENT (n<5) | null | n/a | n/a |
| ... | | | | | | |

### Calibration factor application

Active classes (n ≥ 5):
- research: multiply gut estimate by 0.44 → use ~44% of gut
- new-authorship: multiply gut estimate by 0.67 → use ~67% of gut

Inactive classes (n < 5 — log gut only, calibration not yet active):
- skill-authoring (n=3), audit (n=1), gate-attestation (n=1), substitution-edit (n=1), propagation (n=2)

### Diagnostic — is calibration working?

For classes with active calibration AND ≥3 calibrated entries:
- research (n=8 calibrated): median calibrated_ratio = 1.08. Calibration is slightly under-correcting (calibrated estimates land 8% high on average). Acceptable; near 1.0.
- new-authorship (n=4 calibrated): median calibrated_ratio = 0.95. Calibration is slightly over-correcting (calibrated estimates land 5% low). Acceptable.

If a class shows median calibrated_ratio consistently far from 1.0 (>1.3 or <0.7), the calibration factor for that class needs revision. Either the median formula isn't right (try mean, or weighted median), or the class needs splitting.

### Class drift signals

[List any classes where IQR > 0.5, with recommendation to split or tighten]

### Global insights

- Global median gut_ratio: 0.56 (you/Claude over-estimate by ~78% on average)
- Global median calibrated_ratio: [value if applicable]
- Most over-estimated: <task_id> (gut_ratio 0.04) — <description>
- Most under-estimated: <task_id> (gut_ratio 4.00) — <description>

### Recommendations for next session

- For class research: gut-estimate 30 min → calibrated estimate 30 × 0.44 = 13 min
- For class new-authorship: gut-estimate 60 min → calibrated estimate 60 × 0.67 = 40 min
- For inactive classes: log gut only; calibration will activate when n reaches 5

### Outliers worth investigating

[List outlier task_ids with descriptions and ratios — these are tasks where the calibration formula or the class assignment may have been wrong]
```

## Interpretation guidance

- **gut_ratio < 1**: gut over-estimated (actual < gut estimate)
- **gut_ratio = 1**: gut dead-on
- **gut_ratio > 1**: gut under-estimated (actual > gut estimate; the dangerous direction)
- **calibrated_ratio < 1**: calibration over-corrected (calibrated estimate was too low; actual was less)
- **calibrated_ratio = 1**: calibration formula working perfectly
- **calibrated_ratio > 1**: calibration under-corrected (calibrated estimate was too high; actual was more, calibration didn't pull it down enough)
- **Median, not mean**: outliers (rare disasters or rare wins) shouldn't dominate; use median.
- **IQR matters**: a class with median 0.5 and IQR width 0.1 is well-calibrated; same median with IQR width 0.6 is too unstable to trust.

## Anti-patterns

- **Don't aggregate across very different task classes**: a "skill-authoring" estimate calibration shouldn't pollute a "debug" estimate calibration.
- **Don't apply yesterday's calibration to fundamentally new task types**: if `task_class = "other"` for a task, the calibration data is unreliable; estimate from first principles instead.
- **Don't apply calibration with n < 5**: noise dominates. Wait for the class to accumulate.
- **Don't silently update the calibration factor based on calibrated_ratio**: this would create a self-correcting system that hides its own failure modes. The factor is always derived from gut_ratio. Calibrated_ratio is the diagnostic, not a feedback input. (See Option D in the v02 design discussion.)
- **Don't game the calibration**: see `/time-task` anti-patterns. Calibration analysis is only valid if input data is honest.

## Deferred to next iteration (v03)

**Non-stationarity handling.** This skill currently weights all completed entries equally when computing the class median. If your work shifts substantially (new domain, new model version, new collaboration pattern, new tool), prior calibration factors may no longer apply, and equal weighting of stale data drags the calibration formula toward an outdated baseline.

The proper fix is exponentially-weighted moving average — weight recent entries more heavily than old entries. The weight half-life would need to be tuned (proposed starting point: 30 days). This adds complexity that is not justified at n=47 with a 4-day data span. **Deferred to v03 when the corpus is larger and the time span is longer.**

When v03 is authored, the algorithm section above will need:
- A configurable half-life parameter
- Weighted median computation (median of weighted values, not just median of values)
- A diagnostic that compares EWMA-median to flat median to surface non-stationarity when it operates

## Implementation

This skill is procedural — invoking Claude reads the JSONL file with Bash/Read tools, computes statistics with python or jq, formats the output. No separate executable.

Recommended python for full analysis (handles v01/v02 backward compatibility, IQR, drift signal):

```python
import json, statistics
from collections import defaultdict
from pathlib import Path

LOG = Path.home() / "_grand_repo/data/task_timing_log_2026.jsonl"

records = [json.loads(l) for l in LOG.open() if l.strip()]
tasks = defaultdict(dict)
for r in records:
    tid = r.get('task_id')
    if not tid: continue
    tasks[tid].update(r)

completed = [t for t in tasks.values() if t.get('status') == 'completed' or 'ts_end' in t]

by_class = defaultdict(list)
for t in completed:
    cls = t.get('task_class', 'unknown')
    # Backward compat: v01 entries have 'ratio'; v02 entries have 'gut_ratio'
    gr = t.get('gut_ratio') if t.get('gut_ratio') is not None else t.get('ratio')
    cr = t.get('calibrated_ratio')  # may be null
    if gr is not None:
        by_class[cls].append({'gut_ratio': gr, 'calibrated_ratio': cr, 'task': t})

for cls, entries in by_class.items():
    n = len(entries)
    if n < 5:
        print(f"{cls}: n={n} (insufficient — calibration inactive)")
        continue
    grs = sorted(e['gut_ratio'] for e in entries)
    median_gr = statistics.median(grs)
    q1 = statistics.median(grs[:len(grs)//2])
    q3 = statistics.median(grs[(len(grs)+1)//2:])
    iqr_width = q3 - q1
    drift = "DRIFT" if iqr_width > 0.5 else "OK"
    crs = [e['calibrated_ratio'] for e in entries if e['calibrated_ratio'] is not None]
    median_cr_str = f"{statistics.median(crs):.2f} (n={len(crs)})" if crs else "n/a"
    print(f"{cls}: n={n}, median_gut={median_gr:.2f}, IQR=[{q1:.2f}-{q3:.2f}] width={iqr_width:.2f}, "
          f"factor={median_gr:.2f}, median_calibrated_ratio={median_cr_str}, {drift}")
```

## Provenance

- Authored 2026-05-10 by Claude Opus 4.7 (critical-eye configuration) per Krystal Martinez's direction.
- Supersedes v01 (Claudette the PEK Remediator, 2026-04-26).
- v02 closes the calibration loop that v01 measurement infrastructure made possible.
- v02 fixes the v01 divide-vs-multiply formula inconsistency (v01 said "divide gut by 2.2" but the schema's ratio = actual/estimate means the correct operation is multiply gut by median ratio).
- Reads from `data/task_timing_log_<YEAR>.jsonl`.
- Companion to `/time-task v02`.
