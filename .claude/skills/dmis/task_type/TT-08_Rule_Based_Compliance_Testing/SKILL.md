---
title: "Rule-Based Compliance Testing"
skill_id: "SK-08"
version: v02_I
date: 2026-03-06
task_type: "TT-08"
pipeline_assignments: [P1, P2, P3, P4, P6]
owner: Martinez Methods
---

# Rule-Based Compliance Testing

## Purpose
Test outputs against enumerated accuracy rules deterministically. This task type applies a fixed set of accuracy rules (ACC-001 through ACC-009) to deliverable outputs and reports pass/fail results for each rule with specific evidence of compliance or violation.

## Pipeline Context
- **Pipeline Assignments**: P1, P2, P3, P4, P6
- **Raw Tasks**: P1.2-L3, P2.2-L3, P3.2-L4, P4.2-L4
- **Stage**: Compliance Verification (Audit Layer 3)
- **Primary Use**: Deterministic testing of accuracy rules across all content artifacts

## Input Specification
The agent receives:
- **Deliverable Output**: The artifact(s) produced by earlier pipelines that are being rule-tested
- **Accuracy Rules**: The 9 Critical Accuracy Rules (ACC-001 through ACC-009) from `ACCURACY_RULES.md`
- **Rule Application Guide**: Context for how each rule applies to different content types
- **Baseline Content**: Reference materials showing correct usage patterns for comparison

## Output Specification
The agent must produce a rule-based compliance test report in YAML format conforming to the authoritative schema.
- Output must conform to: `schemas/tt08_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Key sections: Rule Compliance Summary, Rule-by-Rule Test Results, Evidence Details, Violation Log, Remediation Guidance
- Report must show pass/fail for each rule with specific evidence from the deliverable

## Methodology
1. **Load accuracy rules** - Retrieve all 9 Critical Accuracy Rules from authoritative source
2. **Prepare baseline comparisons** - Identify correct usage patterns for each rule type
3. **Scan for rule applicability** - Determine which rules apply to specific content sections
4. **Test Rule ACC-001** - Verify CommCare current use vs. history distinctions are maintained
5. **Test Rule ACC-002** - Verify Dimagi pilot = StrongMinds-wide framing is accurate
6. **Test Rule ACC-003** - Verify Dimagi ≠ CommCare distinction is maintained
7. **Test Rule ACC-004** - Verify all 4 offices (SMU, SMZ, SMG, SM-US) are properly attributed
8. **Test Rule ACC-005** - Verify DATS terminology (not DAD) is used consistently
9. **Test Rule ACC-006** - Verify EFD methodology name (not RQ-RE) is used correctly
10. **Test Rule ACC-007** - Verify convergence thresholds (α ≥ 0.70 QA, ≥ 0.75 methodology)
11. **Test Rule ACC-008** - Verify CommCare Digital Public Good status is accurately stated
12. **Test Rule ACC-009** - Verify CommCare DET standalone status is accurately represented
13. **Document results** - Record pass/fail status for each rule with specific evidence
14. **Identify violations** - Flag all rules that fail with explanation of violation details

## Quality Criteria
- **Completeness**: All 9 accuracy rules are tested; no rules omitted
- **Evidence**: Each rule result includes specific evidence from the deliverable supporting the determination
- **Consistency**: Rule application is consistent across the entire deliverable
- **Precision**: Pass/fail determinations are binary and defensible based on rule language
- **Traceability**: Violations include specific locations in the deliverable where violations occur
- **Clarity**: Report is clear about which rules pass, which fail, and why

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
- **Rule Opacity**: Failing to explain how specific passages in the deliverable relate to rule criteria
- **Selective Testing**: Omitting rules that would reveal violations; testing only easy rules
- **False Negatives**: Marking rules as passed when violations are present
- **Vague Evidence**: Recording rule violations without specific quotes or location references
- **Rule Confusion**: Misapplying rule criteria or testing for different conditions than rules specify

## Examples
See example outputs in `references/example_outputs/` for gold-standard demonstrations of thorough rule-based compliance testing with clear pass/fail determinations and supporting evidence.
