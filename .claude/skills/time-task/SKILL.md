---
name: time-task
description: "Use this skill to record start and end timestamps for a discrete task with a pre-task estimate, so future sessions can calibrate estimates against actuals. Triggers on '/time-task', 'time this task', 'track this task', 'estimate and track', or when the user asks for task-timing data collection. Produces JSONL log entries that another skill (/calibrate-estimates) reads to produce calibration analysis."
---

# time-task

## Purpose

Record discrete-task start and end timestamps with a pre-task estimate so the gap between estimate and actual is captured as data. Calibration of LLM estimates is the long-term goal: data accumulates per task class (skill-authoring, substitution-edit, propagation, debug, research, etc.) so future sessions can divide their gut estimate by an empirically-derived calibration factor.

This skill is paired with `/calibrate-estimates` which reads the log and produces the calibration analysis.

## When to Use

- The user invokes `/time-task` or asks to "track this task" or "time this task"
- A task is bounded enough to have a meaningful estimate (a few minutes to a few hours; not "manage this entire session")
- Before starting non-trivial work where the estimate is genuinely uncertain (use this as a forcing function for honest pre-task estimation)

## Two Modes

### Start Mode

```
/time-task start "<task description>" est=<minutes> class=<task-class>
```

Where `<task-class>` is one of:

- `skill-authoring` — writing a new SKILL.md or extending an existing one
- `substitution-edit` — find/replace style edits on files you already understand
- `new-authorship` — writing a new document, prose, or report from scratch
- `propagation` — running a script that copies / installs canonical artifacts to target repos
- `research` — searching, reading, synthesizing across many files
- `debug` — diagnosing a failing test, broken build, or unexpected behavior
- `migration` — moving content between paths / repos / branches
- `gate-attestation` — writing a gate file + spawning rater (overhead per audited commit)
- `other` — anything else (record what it actually was for taxonomy expansion later)

What the skill does:

1. Reads the current task-timing log at `_grand_repo/data/task_timing_log_<YEAR>.jsonl`. If the file doesn't exist, creates it.
2. Generates a UUID `task_id`.
3. Captures the current UTC timestamp.
4. Appends a JSONL line: `{ "task_id": "...", "ts_start": "...", "task_class": "...", "description": "...", "estimate_minutes": N, "model": "<current model>", "session_id": "<current session>", "status": "started" }`
5. Returns the `task_id` to the user (and to itself for later closeout).

### End Mode

```
/time-task end <task_id> "<outcome summary>" [scope_creep=true|false] [actual_class=<override-class>]
```

What the skill does:

1. Finds the matching `task_id` in the log.
2. Captures the current UTC timestamp.
3. Computes `actual_minutes` = (ts_end - ts_start) in minutes, rounded to 1 decimal.
4. Computes `ratio` = actual_minutes / estimate_minutes.
5. Updates the log entry (writes a NEW JSONL line with `status: "completed"` and the new fields, OR rewrites the original line — implementation choice; rewriting is cleaner but JSONL-append-only is simpler).
6. Returns a calibration note to the user: e.g., "Estimated 30, actual 18.2, ratio 0.61 — you overestimated by 39%. Class `skill-authoring` running median: see /calibrate-estimates."

## Schema

See `_grand_repo/data/task_timing_log_schema_2026-04-26_v01_I.md` for the canonical schema.

Required fields per row:

| Field | Type | Notes |
|---|---|---|
| `task_id` | UUID string | Generated at start |
| `ts_start` | ISO 8601 UTC | Start timestamp |
| `ts_end` | ISO 8601 UTC | End timestamp (only on completion) |
| `task_class` | enum string | See list above |
| `description` | string | Free-form, ≤200 chars |
| `estimate_minutes` | integer | Pre-task estimate |
| `actual_minutes` | float | Post-task actual (only on completion) |
| `ratio` | float | actual / estimate (only on completion) |
| `model` | string | e.g., "opus-4.7" |
| `session_id` | string | If known, the Claude Code session id |
| `status` | enum | "started" or "completed" |
| `outcome` | string | Free-form, ≤200 chars (only on completion) |
| `scope_creep` | bool | True if scope expanded mid-task (only on completion) |

## Anti-patterns

- **Don't track tasks that don't have a meaningful estimate.** "Manage the session" is too vague. Track discrete bounded work.
- **Don't pad the estimate to make ratio look better.** This is a calibration tool, not a performance metric. Honest pre-task estimates produce honest calibration.
- **Don't track work that's already in progress.** Start tracking BEFORE the work starts — otherwise the start-timestamp is lying.
- **Don't track work after the fact ("retroactive estimation").** That's just retconning.

## Implementation notes

This skill spec establishes the pattern. The actual log-append behavior is performed by the invoking Claude (using Bash + Edit tools to append a JSONL line). There is no separate executable; the skill is procedural.

For consistency across sessions, the skill MUST resolve the log path the same way:

```
LOG_PATH=$(printf 'C:/Users/NerdyKrystal/_grand_repo/data/task_timing_log_%d.jsonl' "$(date -u +%Y)")
```

If `$_grand_repo` is not the user's filesystem, the skill resolves to wherever the canonical _grand_repo is on the device. (For NerdyKrystal: `C:/Users/NerdyKrystal/_grand_repo/`.)

## Companion skill

`/calibrate-estimates` reads the log and produces the calibration analysis. See its SKILL.md.

## Provenance

- Authored 2026-04-26 by Claudette the PEK Remediator v01 (Opus 4.7).
- Bootstrap entry recorded in `data/task_timing_log_2026.jsonl` at gate-31.
- Pair with `/calibrate-estimates` which reads this log.
