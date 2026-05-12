---
name: Use /time-task for all bounded tasks
description: From 2026-04-27 forward, invoke /time-task at the start of any bounded task and close it at end; calibration data accretes for future estimate-vs-actual analysis
type: feedback
originSessionId: 5bbbce8a-f733-4014-ad8f-1544228ee698
user: krystal
---
From 2026-04-27 forward, every bounded task gets bracketed by `/time-task`: invoke at task start with a pre-task estimate, close at task end with actual end timestamp.

**Why:** Krystal is building calibration data so future sessions can divide LLM-default estimates by empirically-grounded ratios per task class. Without per-task timing, calibration is impossible. Without /time-task on EVERY bounded task, the dataset is biased toward whichever tasks Claude remembers to time — which selection-bias makes calibration worse than no data.

**How to apply:**
- At the start of any bounded task (a discrete deliverable with a definable end), invoke `/time-task` with a pre-task estimate
- A "bounded task" is a discrete unit with a definable end-state — e.g., a Phase 8 execution, a research deliverable, a PR cycle, an artifact authoring, a hook v06 spec, a propagation execution. NOT a free-form discussion or open-ended exploration
- Close the time-task at the actual end (when the deliverable is done or definitionally aborted)
- If a task is mid-flight when this rule was established (2026-04-27 mid-Phase-8), bracket the REMAINING bounded scope with /time-task; flag in the task notes that timing covers partial scope only
- Sub-tasks within a larger bounded task: prefer one /time-task at the parent level over per-sub-task fragmentation, unless sub-tasks are independently calibration-relevant (e.g., "rater spawn" is a recurring sub-task class worth its own timing)
- Do NOT call this "ceremony" or skip it for "small" tasks — small tasks are exactly the calibration-relevant ones because LLM estimates systematically underestimate them
