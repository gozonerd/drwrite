---
title: "Instructional Document Generation"
skill_id: "SK-01"
version: v02_I
date: 2026-03-06
task_type: "TT-01"
pipeline_assignments: [P1]
owner: Martinez Methods
---

# Instructional Document Generation

## Purpose
Follow brief → produce structured guidance document with prescriptive content. This task type generates instructional materials that provide clear, actionable guidance for implementation, training, or operational procedures.

## Pipeline Context
- **Pipeline Assignment**: P1
- **Raw Tasks**: P1.1
- **Thread Count**: 15 threads per section
- **Stage**: Content Generation
- **Primary Use**: Creating procedural and instructional materials for stakeholder consumption

## Input Specification
The agent receives:
- **Brief Document**: Concise requirements specifying the instructional scope, target audience, and content objectives
- **Reference Materials**: Related guidance, templates, or existing instructional precedents
- **Context Data**: Information about the audience level, regulatory constraints, and organizational context
- **Success Criteria**: Definition of what constitutes complete, actionable instruction

## Output Specification
The agent must produce a structured instructional document in YAML format conforming to the authoritative schema.
- Output must conform to: `schemas/tt01_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Key sections: Overview, Prerequisites, Step-by-Step Procedures, Quality Checkpoints, Troubleshooting, Appendices
- Document must be formatted for stakeholder readability and actionability

## Methodology
1. **Parse the brief** - Extract instructional objectives, scope boundaries, and audience profile
2. **Structure the content** - Design clear section hierarchy with numbered steps and decision points
3. **Draft prescriptive content** - Write clear, imperative instructions with specific actions and expected outcomes
4. **Embed quality checkpoints** - Insert verification steps and validation criteria throughout procedures
5. **Add contextual support** - Include prerequisites, assumptions, error conditions, and recovery procedures
6. **Cross-reference accuracy rules** - Verify all factual claims against source material and accuracy rules
7. **Validate completeness** - Ensure all objectives from the brief are addressed with actionable content
8. **Prepare for delivery** - Format for stakeholder consumption with appendices and supporting materials

## Quality Criteria
- **Clarity**: Instructions use imperative verbs and avoid ambiguous phrasing; every step is actionable by the target audience
- **Completeness**: All objectives specified in the brief are addressed; no gaps in procedure flow
- **Verification**: Each section includes checkpoints where users can confirm correct execution
- **Accessibility**: Prerequisites are explicitly stated; prior knowledge assumptions are disclosed
- **Accuracy**: All factual content verified against source materials; regulatory claims are precise and cited
- **Actionability**: Each step specifies what action to take, where to take it, and how to confirm success

## Accuracy Rules
All outputs must comply with the 9 Critical Accuracy Rules (ACC-001 through ACC-009) defined in `ACCURACY_RULES.md`:
- **ACC-001**: CommCare current use vs. history (distinguish SMZ active deployment from Uganda pilot)
- **ACC-002**: Dimagi pilot = StrongMinds-wide (both Uganda and Zambia)
- **ACC-003**: Dimagi ≠ CommCare (platform vs. consulting firm)
- **ACC-004**: 4 offices always (SMU, SMZ, SMG, SM-US attribution required)
- **ACC-005**: DATS not DAD (correct terminology)
- **ACC-006**: EFD not RQ-RE (correct methodology name)
- **ACC-007**: α ≥ 0.70 QA / ≥ 0.75 methodology (convergence thresholds)
- **ACC-008**: CommCare IS a Digital Public Good (GID0090016)
- **ACC-009**: CommCare DET is standalone (separate Python CLI)

### Anti-Fabrication Rules
All generated content must comply with the 6 Anti-Fabrication Rules (AFR-001 through AFR-006) defined in `ACCURACY_RULES.md`:
- **AFR-001**: Every factual claim requires a traceable source
- **AFR-002**: Never invent statistics, quotes, or regulatory citations
- **AFR-003**: When uncertain, flag as [NEEDS VERIFICATION]
- **AFR-004**: Cross-reference claims against Evidence Library
- **AFR-005**: Regulatory citations must reference specific statute sections
- **AFR-006**: Quote verification — fuzzy match ≥ 85% against source

## Anti-Patterns
- **Assumption Creep**: Assuming target audience knowledge without stating prerequisites; always explicitly enumerate required prior knowledge
- **Vague Directives**: Using qualitative language ("ensure quality," "do this properly") without concrete, measurable criteria
- **Missing Verification**: Omitting checkpoints where users can confirm successful execution; every procedure needs validation steps
- **Scope Drift**: Adding content beyond the brief's boundaries without explicit justification
- **Unverified Claims**: Including any factual assertion without traceable source documentation; always cite regulatory sources with specific section numbers

## Examples
See example outputs in `references/example_outputs/` for gold-standard demonstrations of properly structured instructional content.
