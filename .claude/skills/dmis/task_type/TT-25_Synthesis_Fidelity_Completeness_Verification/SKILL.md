---
title: "Synthesis Fidelity Completeness Verification"
skill_id: "SK-25"
version: v02_I
date: 2026-03-06
task_type: "TT-25"
pipeline_assignments: [P1, P2, P3, P4]
owner: Martinez Methods
---

# Synthesis Fidelity Completeness Verification

## Purpose
Verify that all winning components from parallel threads survived synthesis intact. Ensure no content loss, no distortion, and no novel content introduced.

## Pipeline Context
- **Pipelines**: P1, P2, P3, P4
- **Raw Tasks**: P1.2-PS (all 4), P2.2-PS, P3.2-PS-a/b/c, P4.2-PS-a/b/c
- **Thread Assignments**: P1 (15 threads), P2 (25 threads), P3 (5 threads), P4 (5 threads)
- **Category**: Verification

## Input Specification
- Synthesized document section or complete draft
- Original thread outputs (all parallel versions)
- Audit evaluation results identifying "winning" components per thread
- Provenance metadata from synthesis step (TT-24)
- Original section specifications and quality criteria

## Output Specification
Fidelity verification report in YAML format.
- Output must conform to: `schemas/tt25_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Component-by-component fidelity assessment
- Completeness check: all winning content present?
- Novel content detection: any unapproved additions?
- Distortion flag: any content altered or misrepresented?

## Methodology
1. **Winning Component Inventory**: Extract list of winning sections from each thread per audit evaluations
2. **Synthesis Content Mapping**: Map every paragraph/section in synthesized output to original thread source
3. **Fidelity Line-by-Line Check**: Compare synthesized version to original; flag any wording changes, omissions, or additions
4. **Completeness Verification**: Confirm all winning components are present (not lost in synthesis)
5. **Novel Content Detection**: Identify any paragraphs/claims in synthesis with no source in original threads
6. **Distortion Analysis**: Assess whether any content was reframed, recontextualized, or altered in meaning
7. **Provenance Validation**: Cross-check synthesis provenance tags against actual source mapping
8. **Summary Report**: Document fidelity score, completeness status, and any violations

## Quality Criteria
- All winning components verified present in synthesis
- No content loss or omission detected
- No novel content introduced (synthesis restricted to merging)
- All textual changes documented and justified
- Provenance metadata fully traceable
- Fidelity score ≥ 0.95 (minor formatting exceptions permitted)
- Distortion assessment: none/minor only

## Accuracy Rules
All outputs must comply with the 9 Critical Accuracy Rules (ACC-001 through ACC-009) defined in `ACCURACY_RULES.md`:
- ACC-001: CommCare current use vs. history
- ACC-002: Dimagi pilot = StrongMinds-wide
- ACC-003: Dimagi ≠ CommCare
- ACC-004: 4 offices always (SMU, SMZ, SMG, SM-US)
- ACC-005: DATS not DAD
- ACC-006: EFD not RQ-RE
- ACC-007: α ≥ 0.70 QA / ≥ 0.75 methodology
- ACC-008: CommCare IS a Digital Public Good (GID0090016)
- ACC-009: CommCare DET is standalone

## Anti-Patterns
- **Over-Tolerance**: Accepting minor content loss as acceptable
- **Weak Mapping**: Loose provenance mapping that masks untraced content
- **Distortion Blindness**: Missing subtle meaning shifts or recontextualization
- **Incomplete Audit**: Checking only sample components instead of full inventory
- **False Novel Content Flags**: Flagging legitimate transitions or connector phrases as novel

## Examples
See example outputs in `references/example_outputs/`

---
**Last Updated**: 2026-03-06
**Status**: Active
