---
title: "Client Readiness Assessment"
skill_id: "SK-26"
version: v02_I
date: 2026-03-06
task_type: "TT-26"
pipeline_assignments: [P4, P5]
owner: Martinez Methods
---

# Client Readiness Assessment

## Purpose
Read deliverable from client audience perspective; provide holistic assessment of whether content meets client objectives, readability, completeness, and delivery quality standards.

## Pipeline Context
- **Pipelines**: P4, P5
- **Raw Tasks**: P4.2-PS-i, P5-Aud-e
- **Thread Assignments**: P4 (5 threads), P5 (1 thread focused on client audit)
- **Category**: Delivery

## Input Specification
- Complete synthesized document or section draft
- Client stakeholder profile and primary objectives
- Acceptance criteria agreed with client
- Known client constraints (timeline, format, distribution channel)
- Target audience reading level and prior knowledge
- Client feedback from earlier drafts (if available)

## Output Specification
Client readiness assessment report in YAML format.
- Output must conform to: `schemas/tt26_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Readiness score (0-100)
- Dimension scores: completeness, clarity, accuracy, actionability, format compliance
- Critical blockers (if any) preventing client delivery
- Recommended refinements by priority
- Sign-off recommendation: ready/conditional/not ready

## Methodology
1. **Persona Adoption**: Assume client stakeholder role with stated objectives and constraints
2. **Objective Alignment Check**: Verify content addresses all stated client objectives
3. **Completeness Assessment**: Confirm no major deliverable gaps or promised sections missing
4. **Readability Evaluation**: Assess whether target audience can understand content without specialized training
5. **Actionability Review**: Verify recommendations are concrete, implementable, and scoped to client context
6. **Format Compliance**: Check document structure, formatting, and delivery format match client requirements
7. **Accuracy Verification**: Cross-check factual claims for accuracy and source reliability
8. **Client Context Alignment**: Assess whether recommendations account for client's known constraints, resources, timeline

## Quality Criteria
- Readiness assessment grounded in actual client profile and objectives (not generic criteria)
- Dimension scores calibrated to importance for client success
- Any blockers identified are genuine delivery impediments, not minor issues
- Recommendations are specific and prioritized
- Assessment distinguishes between "nice-to-have" refinements and critical blockers
- Clear rationale for readiness decision

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
- **Generic Assessment**: Applying boilerplate readiness criteria instead of client-specific evaluation
- **False Negatives**: Approving content for delivery despite substantive gaps
- **Scope Creep Demands**: Flagging improvements that exceed original client requirements
- **Audience Assumption**: Assessing readability without reference to actual target audience level
- **Missing Context**: Evaluating completeness without understanding client's known constraints or budget

## Examples
See example outputs in `references/example_outputs/`

---
**Last Updated**: 2026-03-06
**Status**: Active
