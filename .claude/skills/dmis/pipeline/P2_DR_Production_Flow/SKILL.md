---
title: "P2 DR Production Flow"
skill_id: "SK-F02"
version: v02_I
date: 2026-03-06
owner: Martinez Methods
---

# P2 DR Production Flow

## Purpose
Production pipeline for diagnostic and rationale generation. Combines dynamic prompt creation with extended threaded convergence audit to produce detailed reasoning and evidence chains.

## Step Sequence

### Phase 1: DR Prompt Creation
- **Agent**: TT-05 (prompt engineer)
- **Input**: P1 section output + evidence library + diagnostic requirements
- **Output**: Diagnostic-specific prompt with evidence citations
- **Purpose**: Tailor thread generation to specific diagnostic claims identified in P1

### Phase 2: Thread Generation
- **Agent**: TT-02 (thread generation for diagnostics)
- **Invocations**: 25 parallel threads
- **Input**: DR prompt + evidence context
- **Output**: 25 candidate diagnostic/rationale outputs
- **Token Budget**: Allocated from diagnostics generation pool

### Phase 3: Convergence Audit (11 Layers)

| Layer | Agent | Purpose |
|-------|-------|---------|
| L1 | TT-06 | Brief Compliance |
| L2 | TT-07 | Regulatory Pipeline Cross-Check |
| L3 | TT-08 | Critical Accuracy Rule Compliance |
| L4 | TT-11 | Source-Verified Factual Agreement |
| L5 | TT-13 + TT-15 | Coverage & Contradiction Detection (Interpretations) |
| L6 | TT-14 | Unanimous Agreement Audit |
| L7 | TT-20 | AI-Consumer Quality Rubric |
| L8 | TT-17 | Execution Readiness Test |
| L9 | TT-16 | Presupposition Archaeology |
| L10 | TT-10 | Reference Integrity |
| L11 | TT-15 | Contradiction Scan |

**Convergence Threshold**: α ≥ 0.70 (Krippendorff)
**Retry Budget**: 1 critique-rewrite cycle per layer

### Phase 4: Convergence Judgment
- **Agent**: SA-J01 (convergence judge)
- **Decision**: All 11 layers passed? → SYNTHESIS. Failures? → HALT or REMEDIATE
- **Input**: Full convergence audit matrix + remediation recommendations
- **Output**: SYNTHESIS-GO or REMEDIATION-REQUIRED

### Phase 5: Synthesis
- **Agent**: TT-24 (synthesis for P2)
- **Input**: Winning thread from comparative ranking
- **Output**: dr_synthesis (integrated diagnostic and rationale section)
- **Token Budget**: Diagnostics synthesis allocation
- **Retry Limit**: 2 cycles maximum

### Phase 6: Post-Synthesis Checks (4 Checks)

| Check | Agent | Validates |
|-------|-------|-----------|
| PS-a | TT-25 | Completeness: all diagnostic claims addressed |
| PS-b | TT-25 | Fidelity: synthesis faithful to source threads |
| PS-c | TT-25 | No new claims: no material beyond thread sources |
| PS-d | TT-25 | Constraint compliance: file size ≥ 15 KB, format correct |

**All 4 checks must pass**. If any fail, return to Synthesis with refined prompt.

### Phase 7: Quality Gate
- **Agent**: SA-J02 (quality gate judge)
- **Criteria**:
  - All 4 post-synthesis checks passed
  - Convergence α ≥ 0.70
  - File size: dr_synthesis_min_bytes ≥ 15360 (15 KB)
  - All evidence citations are traceable to Evidence Library
  - No [NEEDS VERIFICATION] flags in final output
- **Outcome**: GATE-PASS → Section marked complete, GATE-FAIL → HALT and report

## Notifications (Telegram)
- `step_complete`: P2 prompt creation finished
- `step_complete`: P2 thread generation finished
- `step_complete`: Convergence audit Layer N completed
- `gate_pass`: Quality gate passed, DR section ready
- `gate_fail`: Quality gate failed, DR section blocked
- `double_failure`: Same layer failed twice (escalates to convergence judge)

## Error Handling
- Layer failure → TT-05 (prompt engineer) revises DR prompt or TT-01 assesses halt
- Post-synthesis check failure → Return to TT-24 with refined synthesis prompt (max 2 retries)
- Quality gate failure → Escalate to Cody Stahl for human decision

## File Size Validation
- Minimum: dr_synthesis_min_bytes: 15360 (15 KB)
- If final output < 15 KB, quality gate fails automatically
- Rationale: P2 diagnostics are evidence-rich; undersized outputs indicate incomplete coverage

## Timeline
- DR prompt creation: ~2–3 minutes
- Thread generation: ~6–10 minutes (25 parallel invocations)
- Convergence audit: ~18–24 minutes (11 sequential layers)
- Synthesis + checks: ~8–12 minutes
- Quality gate decision: ~3–5 minutes
- **Total estimated**: 37–54 minutes per section

## Relationship to P1
P2 is tightly coupled to P1. All diagnostic claims must trace back to observations made in P1. If P1 output is revised after P2 completes, P2 must be re-run with updated evidence context.

---
**Last Updated**: 2026-03-06 (v02_I validated - layer descriptions corrected to canonical TT catalog names)
