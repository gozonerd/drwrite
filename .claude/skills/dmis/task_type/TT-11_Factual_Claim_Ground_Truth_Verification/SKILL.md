---
title: "Factual Claim Ground Truth Verification"
skill_id: "SK-11"
version: v02_I
date: 2026-03-06
task_type: "TT-11"
pipeline_assignments: [P2, P4]
owner: Martinez Methods
---

# Factual Claim Ground Truth Verification

## Purpose
Extract factual claims, verify each against source material or external evidence. This task type identifies all assertions of fact in deliverables and verifies them against authoritative sources, evidence libraries, or external ground truth, reporting on factual accuracy.

## Pipeline Context
- **Pipeline Assignments**: P2, P4
- **Raw Tasks**: P2.2-L4, P4.2-L5, P4.2-PS-e
- **Stage**: Verification and Quality Assurance
- **Primary Use**: Comprehensive verification of factual accuracy across all content assertions

## Input Specification
The agent receives:
- **Deliverable Output**: The artifact(s) produced by P2 or P4 that contain factual assertions
- **Factual Claim Extraction**: Pre-identified list of factual claims from the deliverable
- **Evidence Library**: Authoritative sources, research databases, and reference materials for verification
- **Ground Truth Standards**: Criteria for what constitutes acceptable evidence of factual accuracy

## Output Specification
The agent must produce a factual claim ground truth verification report in YAML format conforming to the authoritative schema.
- Output must conform to: `schemas/tt11_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Key sections: Claim Inventory, Verification Results, Evidence Assessment, Discrepancy Analysis, Confidence Ratings
- Report must assess factual accuracy of all claims with supporting evidence

## Methodology
1. **Extract factual claims** - Identify all assertions in the deliverable that make claims about facts, data, or reality
2. **Categorize claims** - Organize claims by category (statistics, organizational facts, historical events, regulatory facts, etc.)
3. **Identify claim specificity** - Note whether claims are precise and measurable or vague and qualitative
4. **Access evidence sources** - Consult evidence library, external databases, and authoritative sources
5. **Verify statistics** - For any numerical claims, verify data accuracy and current validity
6. **Verify organizational facts** - Check factual claims about StrongMinds structure, operations, and history
7. **Verify external facts** - Confirm claims about external organizations, regulations, or events
8. **Rate confidence** - Assess confidence in each verification based on evidence quality and accessibility
9. **Identify conflicts** - Document any claims that conflict with evidence or have questionable accuracy
10. **Report findings** - Present verification results with evidence details and confidence ratings

## Quality Criteria
- **Completeness**: All factual claims in the deliverable are identified and verified
- **Evidence-Based**: Verification is grounded in authoritative sources and evidence materials
- **Specificity**: Verifications assess precise factual claims rather than general statements
- **Confidence Rating**: Each verification includes transparent assessment of confidence based on evidence quality
- **Discrepancy Detection**: Factual claims that conflict with evidence or cannot be verified are clearly flagged
- **Traceability**: Each verification is linked to specific evidence source material

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
- **Assertion Blindness**: Failing to identify factual claims embedded in narrative prose
- **Evidence Absence**: Marking claims as verified without consulting actual evidence sources
- **Confidence Inflation**: Assigning high confidence to verifications based on weak or inaccessible evidence
- **Selective Verification**: Testing only easily-verified claims while ignoring difficult or disputed factual claims
- **False Negatives**: Failing to flag factual claims that conflict with or cannot be supported by evidence

## Examples
See example outputs in `references/example_outputs/` for gold-standard demonstrations of thorough factual claim ground truth verification with evidence-based accuracy assessment.
