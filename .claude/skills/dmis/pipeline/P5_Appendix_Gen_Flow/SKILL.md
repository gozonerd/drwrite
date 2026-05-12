---
title: "P5 Appendix Generation Flow"
skill_id: "SK-F05"
version: v02_I
date: 2026-03-06
owner: Martinez Methods
---

# P5 Appendix Generation Flow

## Purpose
Per-appendix generation and validation pipeline. Produces appendices (evidence tables, regulatory matrices, reference guides, detailed technical specs) with source fidelity and cross-reference integrity checks.

## Step Sequence

### Phase 1: Appendix Generation
- **Agent**: TT-27 (appendix generation)
- **Invocations**: 1 thread per appendix
- **Input**: Appendix-specific requirements + source materials from Evidence Library + DATS sections 1–4
- **Output**: appendix_[ID] (single appendix output per invocation)
- **Token Budget**: Allocated from appendix generation pool
- **Appendices Covered**: As defined in DATS structure (evidence tables, regulatory frameworks, technical reference, jurisdiction-specific guides, etc.)

### Phase 2: Audit Layer (6 Checks)

| Check | Agent | Purpose |
|-------|-------|---------|
| Aud-a | TT-25 | Source fidelity: all citations traceable to Evidence Library |
| Aud-b | TT-25 | Completeness: all required elements for this appendix present |
| Aud-c | TT-15 | Internal consistency: no contradictions within appendix |
| Aud-d | TT-29 | Cross-reference integrity: all DATS references to this appendix are valid |
| Aud-e | TT-26 | Standalone readability: appendix usable independently if needed |
| Aud-f | TT-09 | Upstream consistency: appendix consistent with main DATS sections (1–4) |

**Convergence Threshold**: α ≥ 0.70 (Krippendorff)
**Retry Budget**: 1 critique-rewrite cycle per check (if needed)

### Phase 3: Quality Gate
- **Agent**: SA-J02 (quality gate judge)
- **Criteria**:
  - All 6 audit checks passed
  - File size: appendix_min_bytes ≥ 3072 (3 KB)
  - No [NEEDS VERIFICATION] flags in final output
  - All citations verified against Evidence Library (AFR-004)
  - Cross-references to this appendix from main sections are all valid
- **Outcome**: GATE-PASS → Appendix marked complete, GATE-FAIL → Return to TT-27 with refined prompt

## Notifications (Telegram)
- `step_complete`: Appendix [ID] audit completed
- `gate_pass`: Appendix [ID] passed quality gate
- `gate_fail`: Appendix [ID] failed quality gate (specific check noted)

## Error Handling
- Audit check failure → Return to TT-27 with refined prompt (retry limit: 1 per check)
- Quality gate failure → Escalate to TT-27 for remediation
- If multiple retries fail → Escalate to Cody Stahl for content redesign decision

## File Size Validation
- Minimum: appendix_min_bytes: 3072 (3 KB)
- If final output < 3 KB, quality gate fails automatically
- Rationale: Appendices must have sufficient reference value

## Timeline Per Appendix
- Generation: ~2–4 minutes (1 invocation)
- Audit checks: ~4–6 minutes (6 sequential checks)
- Quality gate decision: ~1–2 minutes
- **Total estimated per appendix**: 7–12 minutes

## Execution Strategy
- Run all appendices in **parallel** if token budget allows
- If token budget constrained, sequence by priority (evidence tables first, then technical reference, then regulatory guides)
- Final cross-reference resolution (Aud-d) requires all appendices to exist before full validation

## Relationship to Main DATS Sections
- P5 runs **after** P1–P4 main sections are complete and locked
- Appendices serve as reference material for sections 1–4
- Cross-references between sections and appendices are validated in P6

## Appendix Types Supported
- **Evidence Tables**: Structured data from field research, interviews, system audits
- **Regulatory Matrices**: Jurisdiction-specific compliance requirements (SMU, SMZ, SMG, SM-US)
- **Technical Reference**: System architecture diagrams, API reference, data schema
- **Governance Framework**: Decision-making structures, role definitions, authority matrices
- **Implementation Guide**: Step-by-step procedures for each recommended tool/process
- **Risk Register**: Identified risks, mitigation strategies, monitoring indicators
- **Change Management Plan**: Stakeholder communication, training, transition milestones
