---
title: "P4 DD Pipeline Flow"
skill_id: "SK-F04"
version: v02_I
date: 2026-03-06
owner: Martinez Methods
---

# P4 DD Pipeline Flow

## Purpose
Detailed design pipeline with human gate and extended quality checks. Produces final implementation guidance, governance models, and transition plans with intensive upstream traceability and stress testing.

## Step Sequence

### Phase 1: Thread Generation
- **Agent**: TT-04 (thread generation for detailed design)
- **Invocations**: 5 parallel threads
- **Input**: Section-specific prompt + evidence context + design option selections + governance framework
- **Output**: 5 candidate detailed design outputs
- **Token Budget**: Allocated from detailed design generation pool

### Phase 2: Convergence Audit (16 Layers)

| Layer | Agent | Purpose |
|-------|-------|---------|
| L1 | TT-06 | Brief Compliance |
| L2 | TT-12 | Full Upstream Trace |
| L3 | TT-07 | Regulatory Pipeline Cross-Check |
| L4 | TT-08 | Critical Accuracy Rule Compliance |
| L5 | TT-11 | Source-Verified Factual Agreement |
| L6 | TT-12 | Upstream Trace (Recommendations) |
| L7 | TT-13 + TT-15 | Coverage & Contradiction Detection |
| L8 | TT-16 | Presupposition Archaeology (double-pass) |
| L9 | TT-18 | Ontological Consistency |
| L10 | TT-23 | Adversarial Stress Test |
| L11 | TT-14 | Unanimous Agreement Audit |
| L12 | TT-21 | Professional Polish |
| L13 | TT-21 | Writing Instructions Compliance |
| L14 | TT-32 | Tone Consistency |
| L15 | TT-22 | Table Audit |
| L16 | TT-22 | Diagram/Figure Audit |

**Convergence Threshold**: α ≥ 0.70 (Krippendorff)
**Retry Budget**: 1 critique-rewrite cycle per layer

### Phase 3: Convergence Judgment
- **Agent**: SA-J01 (convergence judge)
- **Decision**: All 16 layers passed? → HUMAN-GATE. Failures? → HALT or REMEDIATE
- **Input**: Full 16-layer convergence matrix + remediation recommendations
- **Output**: HUMAN-GATE-READY or REMEDIATION-REQUIRED

### Phase 4: HUMAN GATE (SYNCHRONOUS WAIT)
**This is a blocking decision point. The pipeline pauses here for human review.**

- **Input to Human**:
  - All 5 threads (ranked by quality score)
  - 16-layer convergence audit summary
  - Scoring rationale and layer-specific feedback
  - Implementation feasibility assessments by office (SMU, SMZ, SMG, SM-US)

- **Human Options**:
  1. **Approve top thread**: Proceed with best-ranked option → SYNTHESIS
  2. **Approve alternate thread**: Select different option → SYNTHESIS
  3. **Conditional approval**: "Approve if [specific remediation]" → REMEDIATION (refined prompt)
  4. **Hybrid directive**: "Use governance from thread 1, implementation from thread 3" → REMEDIATION
  5. **Reject all**: Requires section re-design or scope reduction → HALT

- **Human Notification**: Telegram message with detailed summary and approval interface

- **Timeout**: If no decision within 36 hours, default to top-ranked thread → SYNTHESIS

### Phase 5: Synthesis
- **Agent**: TT-24 (synthesis)
- **Input**: Human-approved thread(s) + human decision notes
- **Output**: dd_synthesis (integrated detailed design section)
- **Token Budget**: Detailed design synthesis allocation
- **Retry Limit**: 2 cycles maximum

### Phase 6: Post-Synthesis Checks (13 Checks)

| Check | Agent | Validates |
|-------|-------|-----------|
| PS-a | TT-25 | Completeness: all design elements present |
| PS-b | TT-25 | Fidelity: synthesis faithful to approved thread |
| PS-c | TT-25 | No new claims: material faithful to source |
| PS-d | TT-12 | Full upstream trace re-run (P1, P2, P3 alignment) |
| PS-e | TT-11 | Regulatory ground truth re-check (SK-R01) |
| PS-f | TT-16 | Presupposition archaeology (final implementation layer) |
| PS-g | TT-23 | Adversarial re-run (edge case stress) |
| PS-h | TT-09 + TT-18 | Cross-section consistency (governance + ops) |
| PS-i | TT-26 | Client readiness (is this implementation-ready?) |
| PS-j | TT-21 | Polish re-check (clarity, spelling, grammar) |
| PS-k | TT-21 | Writing instructions re-check (executor guidance) |
| PS-l | TT-32 | Tone re-check (consistency with DATS voice) |
| PS-m | TT-22 | Table/figure integrity (all referenced, correct format) |

**All 13 checks must pass**. If any fail, return to Synthesis with refined prompt.

### Phase 7: Quality Gate
- **Agent**: SA-J02 (quality gate judge)
- **Criteria**:
  - All 13 post-synthesis checks passed
  - Convergence α ≥ 0.70
  - File size: dd_section_min_bytes ≥ 15360 (15 KB)
  - Full upstream traceability documented
  - All regulatory claims verified (SK-R01, AFR-005)
  - Human gate decision documented
  - No [NEEDS VERIFICATION] flags in final output
- **Outcome**: GATE-PASS → Section marked complete and client-ready, GATE-FAIL → HALT and report

## Notifications (Telegram)
- `step_complete`: P4 thread generation finished
- `step_complete`: Convergence audit Layer N completed
- `human_gate_ready`: P4 awaiting human decision (includes approval link + 36-hour timer)
- `human_gate_timeout`: 36-hour timeout reached, defaulting to top thread
- `gate_pass`: Quality gate passed, DD section ready for client delivery
- `gate_fail`: Quality gate failed, DD section blocked
- `double_failure`: Same layer failed twice (escalates to convergence judge)

## Error Handling
- Layer failure → Assess retry vs. halt; human gate may override
- Post-synthesis check failure → Return to TT-24 with refined prompt (max 2 retries)
- Quality gate failure → Human escalation for rework vs. section redesign decision

## File Size Validation
- Minimum: dd_section_min_bytes: 15360 (15 KB)
- If final output < 15 KB, quality gate fails automatically
- Rationale: P4 is the most detailed layer; undersized output indicates incomplete design

## Timeline
- Thread generation: ~2–4 minutes (5 parallel invocations)
- Convergence audit: ~24–32 minutes (16 sequential layers with intensive checks)
- **HUMAN GATE WAIT**: 0–36 hours (median 1–2 hours in practice)
- Synthesis + checks: ~10–15 minutes (13 checks are comprehensive)
- Quality gate decision: ~3–5 minutes
- **Total estimated**: 39–56 minutes automated + 0–36 hours human gate

## Human Gate Escalation
If human does not approve any thread and complete redesign is required, contact Cody Stahl for scope review. This is the final section layer; rejection triggers document-level re-planning.

## Relationship to Preceding Sections
P4 is tightly coupled to P3 (design options). P4 must implement at least one option from P3. If P3 is revised after P4 completes, P4 must be re-run with updated option context.

---
**Last Updated**: 2026-03-06 (v02_I validated - 16 layer descriptions corrected to canonical TT catalog names)
