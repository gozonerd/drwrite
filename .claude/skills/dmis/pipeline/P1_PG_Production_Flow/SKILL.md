---
title: "P1 PG Production Flow"
skill_id: "SK-F01"
version: v02_I
date: 2026-03-06
owner: Martinez Methods
---

# P1 PG Production Flow

## Purpose
End-to-end pipeline for production-grade generation of DATS section content. Produces the primary narrative through threaded generation, convergence auditing, synthesis, and quality gating.

## Step Sequence

### Phase 1: Thread Generation
- **Agent**: TT-01 (thread generation)
- **Invocations**: 15 parallel threads
- **Input**: Section-specific prompt + evidence context
- **Output**: 15 candidate outputs (pg_thread_01 through pg_thread_15)
- **Token Budget**: Allocated from section generation pool

### Phase 2: Convergence Audit (8 Layers)

| Layer | Agent | Purpose |
|-------|-------|---------|
| L1 | TT-06 | Requirements Compliance Verification |
| L2 | TT-07 | Regulatory Cross-Reference Verification |
| L3 | TT-08 | Rule-Based Compliance Testing |
| L4 | TT-13 | Coverage Matrix Construction |
| L5 | TT-14 | Consensus Claim External Verification |
| L6 | TT-16 | Presupposition Archaeology |
| L7 | TT-10 | Source Reference Integrity Tracing |
| L8 | TT-15 | Contradiction Detection & Divergence Classification |

**Convergence Threshold**: α ≥ 0.70 (Krippendorff)
**Retry Budget**: 1 critique-rewrite cycle per layer (per OC-03 audit_layer_retries: 1)

### Phase 3: Convergence Judgment
- **Agent**: SA-J01 (convergence judge)
- **Decision**: All layers passed? → SYNTHESIS. Any layer failed? → HALT or REMEDIATE
- **Input**: Convergence audit results + layer remediation recommendations
- **Output**: SYNTHESIS-GO or REMEDIATION-REQUIRED

### Phase 4: Synthesis
- **Agent**: TT-24 (synthesis)
- **Input**: Winning thread from comparative ranking
- **Output**: pg_synthesis (integrated section)
- **Token Budget**: Section synthesis allocation
- **Retry Limit**: 2 cycles maximum

### Phase 5: Post-Synthesis Checks (4 Checks)

| Check | Agent | Validates |
|-------|-------|-----------|
| PS-a | TT-25 | Completeness: all required elements present |
| PS-b | TT-25 | Fidelity: synthesis faithful to source threads |
| PS-c | TT-25 | No new claims: no material added beyond source |
| PS-d | TT-25 | Constraint compliance: file size ≥ 10 KB, format correct |

**All 4 checks must pass**. If any fail, return to Synthesis with refined prompt.

### Phase 6: Quality Gate
- **Agent**: SA-J02 (quality gate judge)
- **Criteria**:
  - All 4 post-synthesis checks passed
  - Convergence α ≥ 0.70
  - File size: pg_synthesis_min_bytes ≥ 10240 (10 KB)
  - No [NEEDS VERIFICATION] flags in final output
- **Outcome**: GATE-PASS → Section marked complete, GATE-FAIL → HALT and report

## Notifications (Telegram)
- `step_complete`: P1 thread generation finished
- `step_complete`: Convergence audit Layer N completed
- `gate_pass`: Quality gate passed, section ready for downstream
- `gate_fail`: Quality gate failed, section blocked
- `double_failure`: Same layer failed twice (convergence judgment escalates)

## Error Handling
- Layer failure → TT-01 (remediation prompt engineer) assesses retry vs. halt
- Post-synthesis check failure → Return to TT-24 with refined synthesis prompt (max 2 retries)
- Quality gate failure → Escalate to Cody Stahl for human decision on rework vs. section redesign

## File Size Validation
- Minimum: pg_synthesis_min_bytes: 10240 (10 KB)
- If final output < 10 KB, quality gate fails automatically
- Rationale: P1 sections are narrative-heavy; undersized outputs indicate content gaps

## Timeline
- Thread generation: ~4–8 minutes (15 parallel invocations)
- Convergence audit: ~12–16 minutes (8 sequential layers)
- Synthesis + checks: ~6–10 minutes
- Quality gate decision: ~2–3 minutes
- **Total estimated**: 24–37 minutes per section

---
**Last Updated**: 2026-03-06 (v02_I validated - layer descriptions and retry budget updated)
**Status**: Active
