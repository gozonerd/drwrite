---
title: "P6 Full DATS Audit Flow"
skill_id: "SK-F06"
version: v02_I
date: 2026-03-06
owner: Martinez Methods
---

# P6 Full DATS Audit Flow

## Purpose
Comprehensive document-level audit of the complete DATS (sections 1–4 + appendices). Validates structural integrity, terminology consistency, regulatory coverage, and cross-reference resolution across all sections in 6 sequential audit passes.

## Step Sequence

### Phase 1: Structural Pass (Layers L1–L3)

| Layer | Agent | Purpose |
|-------|-------|---------|
| L1 | TT-29 | Cross-reference resolution: all internal references valid |
| L2 | TT-30 | Terminology consistency: definitions used consistently (ACC-005, ACC-006) |
| L3 | TT-18 | Ontological consistency: conceptual categories align throughout |

**Remediation**: If any layer fails, return to section authors with specific feedback

### Phase 2: Content Pass (Layers L4–L6)

| Layer | Agent | Purpose |
|-------|-------|---------|
| L4 | TT-22 | Visual element audit: all tables, figures, diagrams present and correct |
| L5 | TT-31 | Narrative arc: document flow is coherent and logical |
| L6 | TT-13 | Coverage matrix: all required content elements are addressed |

**Remediation**: If any layer fails, return to content team with specific guidance

### Phase 3: Quality Pass (Layers L7–L9)

| Layer | Agent | Purpose |
|-------|-------|---------|
| L7 | TT-31 | Reader journey: is the document navigable and accessible? |
| L8 | TT-32 | Tone consistency: voice is uniform across all sections |
| L9 | TT-21 | Writing quality: clarity, grammar, formatting throughout |

**Remediation**: If any layer fails, route to editing team

### Phase 4: Compliance Pass (Layers L10–L12)

| Layer | Agent | Purpose |
|-------|-------|---------|
| L10 | TT-29 | Cross-reference re-check: confirm all fixes from Pass 1 held |
| L11 | TT-30 | Terminology re-check: confirm all fixes from Pass 2 held |
| L12 | TT-08 | Accuracy rules re-check: all 15 accuracy rules (ACC-001 through ACC-009, AFR-001 through AFR-006) |

**Remediation**: If any layer fails, return to source for targeted fix

### Phase 5: Validation Pass (Layers L13–L15)

| Layer | Agent | Purpose |
|-------|-------|---------|
| L13 | TT-33 | Regulatory coverage matrix: all jurisdiction-specific requirements addressed (SMU, SMZ, SMG, SM-US) |
| L14 | TT-26 | Client readiness: is the document ready for client delivery? |
| L15 | TT-16 | Presupposition archaeology: final check for unstated assumptions |

**Remediation**: If any layer fails, identify source section and remediate

### Phase 6: Stress Pass (Layer L16)

| Layer | Agent | Purpose |
|-------|-------|---------|
| L16 | TT-23 | Adversarial stress test: can readers poke holes in the analysis? |

**Remediation**: If L16 identifies issues, route to relevant section authors for rebuttal or refinement

## Audit Gate for Each Pass
After each of the 6 passes, a mini-gate decision is made:
- **PASS**: All layers in this pass succeeded → Continue to next pass
- **REMEDIATE**: Some layers failed → Return outputs to source teams, re-run affected sections, return to start of same pass
- **HALT**: Multiple layers failed or unresolvable issues → Escalate to Cody Stahl

**Remediation Retry Limit**: 1 per pass

## Final Convergence Judgment
After all 6 passes complete:
- **Agent**: SA-J01 (convergence judge)
- **Input**: Full 16-layer audit matrix
- **Decision**: All layers and all passes clean? → QUALITY-GATE. Any outstanding issues? → HALT
- **Output**: FINAL-AUDIT-PASS or AUDIT-FAILED

## Quality Gate
- **Agent**: SA-J02 (quality gate judge)
- **Criteria**:
  - All 6 passes completed successfully
  - All 16 layers passed
  - No [NEEDS VERIFICATION] flags in any section
  - All remediation feedback addressed
  - Regulatory coverage matrix complete (all 4 jurisdictions)
  - Cross-reference resolution complete
- **Outcome**: GATE-PASS → DATS marked complete and ready for delivery, GATE-FAIL → Escalate

## Notifications (Telegram)
- `step_complete`: Audit Pass N completed
- `remediation_triggered`: Pass N requires return to sections (with specific feedback)
- `pass_complete`: Audit Pass N final gate passed
- `gate_pass`: P6 full audit passed, DATS ready for delivery
- `gate_fail`: P6 full audit failed, escalation required

## Error Handling
- Layer failure within a pass → Section authors remediate (max 1 retry per pass)
- Multiple pass failures → Escalate to Cody Stahl for document-level strategy
- Stress test (L16) failures → Route to section authors for rebuttal or refinement (no hard block)

## Timeline
- Structural Pass: ~6–8 minutes (3 layers)
- Content Pass: ~6–8 minutes (3 layers)
- Quality Pass: ~6–8 minutes (3 layers)
- Compliance Pass: ~6–8 minutes (3 layers)
- Validation Pass: ~6–8 minutes (3 layers)
- Stress Pass: ~4–6 minutes (1 layer)
- Remediation cycles: ~10–15 minutes each (if needed)
- Final convergence + gate: ~4–6 minutes
- **Total estimated**: 44–56 minutes (no remediation) + ~10–15 min per remediation cycle

## Relationship to Preceding Pipelines
P6 runs **after** P1–P5 are all complete and locked. It is the final document-level validation before delivery to client.

## Scope
P6 audits:
- Main sections (P1–P4 outputs)
- All appendices (P5 outputs)
- Cross-references between sections and appendices
- Regulatory compliance across all 4 jurisdictions
- Writing quality and reader experience
- Stress-testing of analysis and recommendations

P6 does **NOT** revisit upstream accuracy assessments (that happened in P1–P4 layers). It confirms that the final assembled document is coherent, compliant, and ready.
