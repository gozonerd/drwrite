---
name: Calibration-exclude annotations for contaminated timing entries
description: When wall-clock duration in task_timing_log is contaminated by user-availability latency (Krystal away/AFK during permission grants), append a calibration_exclude annotation rather than fudging the original entry
type: feedback
originSessionId: 44fe220e-b9c9-410f-bb87-ae155aebf4a7
---
When the wall-clock duration recorded in `task_timing_log_2026.jsonl` is contaminated by user-availability latency — Krystal away from the keyboard, watching something, asleep, in a meeting, etc., during which permission grants are delayed — the recorded ratio reflects user-availability time, not Claude work time. Such entries must NOT be aggregated into `/calibrate-estimates` outputs.

**Why:** The task_timing_log convention has a hard rule against retroactive estimates and against padding actuals to make ratios look better. Modifying the original entry to "fix" the contaminated ratio violates that rule. But silently leaving contaminated data in the calibration corpus produces useless calibration insights (a 4.00 ratio that's actually 1.00 worth of work + 3.00 of waiting tells future estimation nothing useful).

**How to apply:** When Krystal flags that an entry's wall-clock is contaminated, append a NEW JSONL line — same task_id, new fields:

```json
{"task_id": "<same>", "annotation_type": "calibration_exclude", "calibration_exclude": true, "reason": "<honest specific cause>", "annotated_at": "<ISO 8601 UTC>", "status": "annotated"}
```

Original ts_start / ts_end / actual_minutes / ratio entries stay UNCHANGED. The annotation is meta-only.

`/calibrate-estimates` should be updated (when it exists or when next touched) to skip task_ids that have a `calibration_exclude: true` annotation in their lineage.

First instance: 2026-04-26 task-003-d2r-stage-00-expansion-bundle (wall-clock 300.1 min, actual work probably ~60-90 min, contaminated by Krystal watching a sports game for several hours during permission grants). Annotated at `_grand_repo@1f653f2`.

Convention is new as of 2026-04-26; refine if multiple instances arise (e.g., partial-exclude, time-range-exclude, etc.).
