---
title: "Requirements Compliance Verification"
skill_id: "SK-06"
version: v02_I
date: 2026-03-06
task_type: "TT-06"
pipeline_assignments: [P1, P2, P3, P4]
owner: Martinez Methods
---

# Requirements Compliance Verification

## Purpose
Systematic checklist mapping of requirements to output locations. This task type verifies that all stated requirements from project specifications have been addressed in deliverable outputs, providing traceable mapping of each requirement to specific locations in the produced materials.

## Pipeline Context
- **Pipeline Assignments**: P1, P2, P3, P4
- **Raw Tasks**: P1.2-L1, P2.2-L1, P3.2-L1, P4.2-L1
- **Stage**: Compliance Verification (Audit Layer 1)
- **Primary Use**: Initial verification that all project requirements appear somewhere in outputs

## Input Specification
The agent receives:
- **Requirements Specification**: Complete list of project requirements (functional, content, quality, regulatory)
- **Deliverable Outputs**: The artifact(s) produced by P1, P2, P3, or P4 that are being verified
- **Traceability Standards**: Organizational standards for acceptable evidence of requirement satisfaction
- **Scope Definition**: Clear definition of which requirements apply to this specific deliverable

## Output Specification
The agent must produce a requirements compliance verification report in YAML format conforming to the authoritative schema.
- Output must conform to: `schemas/tt06_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Key sections: Compliance Summary, Requirement-by-Requirement Mapping, Gap Analysis, Traceability Details
- Report must show explicit location of each requirement's satisfaction in the output

## Methodology
1. **Parse requirements specification** - Extract and categorize all stated requirements with equal weight
2. **Catalog deliverable contents** - Create comprehensive inventory of what exists in the output artifact
3. **Map requirement to output** - For each requirement, identify specific sections/passages that address it
4. **Document evidence** - Record exact location in output where requirement satisfaction appears
5. **Identify gaps** - Flag any requirements with no corresponding output section or material
6. **Verify requirement clarity** - Ensure requirement language is sufficiently specific for traceability
7. **Assess coverage completeness** - Calculate percentage of requirements with identified output mappings
8. **Report findings** - Present mapping results with clear notation of gaps and marginal cases

## Quality Criteria
- **Completeness**: All requirements from specification are addressed in verification; no requirements omitted
- **Traceability**: Each requirement mapping includes specific output location with section reference or page number
- **Accuracy**: Mapped output content actually addresses the requirement; no false-positive mappings
- **Clarity**: Gap analysis clearly distinguishes missing content from marginally-addressed requirements
- **Documentation**: All findings are recorded with sufficient detail for remediation planning
- **Objectivity**: Mapping decisions are defensible and apply consistent standards across all requirements

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

## Anti-Patterns
- **Generous Mapping**: Accepting outputs that tangentially address requirements without clear evidence of satisfaction
- **Coverage Invisibility**: Failing to identify where requirements are actually satisfied in outputs; unclear traceability
- **Requirement Ambiguity**: Using imprecise requirement language to justify marginal mappings
- **Selective Reporting**: Omitting difficult-to-map requirements from gap analysis
- **Insufficient Evidence**: Listing requirement mappings without including specific location references

## Examples
See example outputs in `references/example_outputs/` for gold-standard demonstrations of clear, traceable requirements compliance verification with explicit location mapping.
