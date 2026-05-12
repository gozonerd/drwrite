---
title: "Narrative Arc Reader Journey Assessment"
skill_id: "SK-31"
version: v02_I
date: 2026-03-06
task_type: "TT-31"
pipeline_assignments: [P6]
owner: Martinez Methods
---

# Narrative Arc Reader Journey Assessment

## Purpose
Evaluate document-level logical flow, section transition quality, story coherence, and executive summary alignment. Assess reader journey from start to finish.

## Pipeline Context
- **Pipelines**: P6
- **Raw Tasks**: P6 L5, P6 L7
- **Thread Assignments**: P6 (16 threads distributed across 6 validation passes)
- **Category**: Quality Assurance

## Input Specification
- Complete synthesized multi-section document
- Executive summary (if present)
- Target reader profile and reading expectations
- Document purpose statement and key messages
- Section sequence and outline
- Known narrative flow issues from prior feedback (if available)

## Output Specification
Narrative arc and reader journey assessment report in YAML format.
- Output must conform to: `schemas/tt31_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Flow assessment: logical progression score and rationale
- Transition evaluation: section-to-section flow quality
- Story coherence: thesis/key message maintenance throughout
- Exec summary alignment: summary accurately reflects document arc
- Reader journey markers: where reader may lose focus or clarity
- Recommendations: flow improvements by section

## Methodology
1. **Purpose and Thesis Identification**: Clarify document's primary purpose and key messages
2. **Logical Sequence Check**: Trace document outline; assess whether section order supports comprehension
3. **Transition Analysis**: Examine bridges between sections; identify abrupt shifts or weak connections
4. **Key Message Tracking**: Follow primary thesis and key messages through each section; detect drift or contradictions
5. **Reader Journey Simulation**: Imagine reading as target audience; note points of confusion, lost thread, or unclear direction
6. **Exec Summary Alignment**: Verify executive summary accurately encapsulates document arc and key conclusions
7. **Coherence Scoring**: Rate overall narrative coherence on scale of 0-10 with supporting evidence
8. **Remediation Recommendations**: Suggest flow improvements, reordering, transitions, or clarifications by section

## Quality Criteria
- Logical flow assessment grounded in actual document sequence and transitions
- Reader journey simulation reflects target audience perspective (not generic reader)
- Key message tracking accounts for nuance and contextual evolution (not just identical repetition)
- Transition evaluation identifies both strengths and areas for improvement
- Exec summary alignment assessment checks both content coverage and message fidelity
- Recommendations are section-specific and actionable
- Coherence score is calibrated and justified (not arbitrary)

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
- **Generic Flow Assessment**: Applying standard narrative structure checklist without tailoring to this document's specific purpose and audience
- **Missing Audience Context**: Evaluating flow from academic/journalistic perspective when client requires practical/action-oriented narrative
- **Ignoring Intentional Structure**: Flagging non-linear structure as incoherent when it serves deliberate purpose
- **Narrative Bias**: Favoring certain narrative styles without considering document objectives
- **Surface-Level Transition Review**: Checking topic consistency without assessing logical argument flow

## Examples
See example outputs in `references/example_outputs/`

---
**Last Updated**: 2026-03-06
**Status**: Active
