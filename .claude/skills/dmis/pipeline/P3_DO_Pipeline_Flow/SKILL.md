---
title: "P3 DO Pipeline Flow"
skill_id: "SK-F03"
version: v02_I
date: 2026-03-06
owner: Martinez Methods
---

# P3 DO Pipeline Flow

## Purpose
Design options pipeline with human gate. Generates multiple design and implementation option outlines, audits them for structural integrity and actionability, and gates them for human review before synthesis.

## Step Sequence

### Phase 1: Thread Generation
- **Agent**: TT-03 (thread generation for design options)
- **Invocations**: 5 parallel threads
- **Input**: Section-specific prompt + evidence context + constraints
- **Output**: 5 candidate design option outlines
- **Token Budget**: Allocated from design options generation pool

### Phase 2: Convergence Audit (7 Layers)

| Layer | Agent | Purpose |
|-------|-------|---------|
| L1 | TT-06 | Brief Compliance |
| L2 | TT-09 | Upstream Consistency Verification |
| L3 | TT-10 | Reference Integrity |
| L4 | TT-08 | Critical Accuracy Rule Compliance |
| L5 | TT-13 | Structural Requirement Coverage Matrix |
| L6 | TT-17 | Specification Actionability |
| L7 | TT-16 | Presupposition Archaeology |

**Convergence Threshold**: α ≥ 0.70 (Krippendorff)
**Retry Budget**: 1 critique-rewrite cycle per layer

### Phase 3: Convergence Judgment
- **Agent**: SA-J01 (convergence judge)
- **Decision**: All 7 layers passed? → HUMAN-GATE. Failures? → HALT or REMEDIATE
- **Input**: Convergence audit results
- **Output**: HUMAN-GATE-READY or REMEDIATION-REQUIRED

### Phase 4: HUMAN GATE (SYNCHRONOUS WAIT)
**This is a blocking decision point. The pipeline pauses here for human review.**

- **Input to Human**:
  - All 5 threads (ranked by quality score)
  - Convergence audit summary for each thread
  - Scoring rationale from SA-J01

- **Human Options**:
  1. **Approve top thread**: Proceed with best-ranked option → SYNTHESIS
  2. **Approve alternate thread**: Select different option → SYNTHESIS
  3. **Hybrid directive**: "Combine strengths of thread 2 and thread 4" → REMEDIATION (refined prompt to TT-03 or TT-24)
  4. **Reject all and redesign**: Requires section redesign → HALT

- **Human Notification**: Telegram message with summary and approval link

- **Timeout**: If no human decision within 24 hours, default to top-ranked thread → SYNTHESIS

### Phase 5: Synthesis
- **Agent**: TT-24 (synthesis)
- **Input**: Human-approved thread(s)
- **Output**: do_synthesis (integrated design options section)
- **Token Budget**: Design options synthesis allocation
- **Retry Limit**: 2 cycles maximum

### Phase 6: Post-Synthesis Checks (7 Checks)

| Check | Agent | Validates |
|-------|-------|-----------|
| PS-a | TT-25 | Structural completeness: all option substructures present |
| PS-b | TT-25 | Specification fidelity: synthesis faithful to approved thread |
| PS-c | TT-25 | No new structure: no material added beyond approved option |
| PS-d | TT-09 | Upstream consistency: design aligned with P1/P2 findings |
| PS-e | TT-19 | Hierarchy integrity: option relationships logically sound |
| PS-f | TT-19 | Logic and flow: option progression is coherent |
| PS-g | TT-17 | Actionability re-check: each option is executable |

**All 7 checks must pass**. If any fail, return to Synthesis with refined prompt.

### Phase 7: Quality Gate
- **Agent**: SA-J02 (quality gate judge)
- **Criteria**:
  - All 7 post-synthesis checks passed
  - Convergence α ≥ 0.70
  - File size: do_thread_min_bytes ≥ 5120 (5 KB)
  - Human gate decision documented
  - No [NEEDS VERIFICATION] flags in final output
- **Outcome**: GATE-PASS → Section marked complete, GATE-FAIL → HALT and report

## Notifications (Telegram)
- `step_complete`: P3 thread generation finished
- `step_complete`: Convergence audit Layer N completed
- `human_gate_ready`: P3 awaiting human decision (includes approval link)
- `human_gate_timeout`: 24-hour timeout reached, defaulting to top thread
- `gate_pass`: Quality gate passed, DO section ready
- `gate_fail`: Quality gate failed, DO section blocked
- `double_failure`: Same layer failed twice (escalates to convergence judge)

## Error Handling
- Layer failure → Assess retry vs. halt; human gate may override
- Post-synthesis check failure → Return to TT-24 with refined prompt (max 2 retries)
- Quality gate failure → Human escalation for rework vs. section redesign decision
- Human gate timeout → Auto-proceed with top-ranked thread

## File Size Validation
- Minimum: do_thread_min_bytes: 5120 (5 KB)
- If final output < 5 KB, quality gate fails automatically
- Rationale: Even single design options should have sufficient detail

## Timeline
- Thread generation: ~2–4 minutes (5 parallel invocations)
- Convergence audit: ~9–14 minutes (7 sequential layers)
- **HUMAN GATE WAIT**: 0–24 hours (median 30 minutes in practice)
- Synthesis + checks: ~6–10 minutes
- Quality gate decision: ~2–3 minutes
- **Total estimated**: 19–31 minutes automated + 0–24 hours human gate

## Human Gate Escalation
If human does not approve any thread and redesign is needed, the entire section must be re-scoped. Contact Cody Stahl for re-planning.

---
**Last Updated**: 2026-03-06 (v02_I validated - layer descriptions corrected to canonical TT catalog names)
