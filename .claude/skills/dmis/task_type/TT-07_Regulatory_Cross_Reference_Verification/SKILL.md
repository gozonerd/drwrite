---
title: "Regulatory Cross-Reference Verification"
skill_id: "SK-07"
version: v02_I
date: 2026-03-06
task_type: "TT-07"
pipeline_assignments: [P1, P2, P4]
owner: Martinez Methods
---

# Regulatory Cross-Reference Verification

## Purpose
Extract regulatory claims and verify against trusted regulatory pipeline outputs. This task type identifies all regulatory assertions made in deliverables and validates them against authoritative regulatory sources and prior verified regulatory analyses.

## Pipeline Context
- **Pipeline Assignments**: P1, P2, P4
- **Raw Tasks**: P1.2-L2, P2.2-L2, P4.2-L3
- **Stage**: Compliance Verification (Audit Layer 2)
- **Primary Use**: Verification that all regulatory citations are accurate and trustworthy

## Input Specification
The agent receives:
- **Deliverable Output**: The artifact(s) produced by P1, P2, or P4 that are being verified for regulatory content
- **Regulatory Claim Extraction**: Pre-identified regulatory assertions from the deliverable
- **Trusted Regulatory Sources**: Authoritative regulatory databases, official guidance, or prior verified regulatory analyses
- **Citation Standards**: Requirements for proper regulatory citation format and specificity

## Output Specification
The agent must produce a regulatory cross-reference verification report in YAML format conforming to the authoritative schema.
- Output must conform to: `schemas/tt07_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Key sections: Regulatory Claims Summary, Source Verification, Citation Accuracy, Discrepancy Analysis, Trust Assessment
- Report must show source of each regulatory assertion with verification status

## Methodology
1. **Extract regulatory claims** - Identify all assertions in the deliverable that reference regulatory sources, statutes, or compliance requirements
2. **Catalog claim specificity** - Note whether claims reference specific statute sections or are general
3. **Identify source documents** - Determine which regulatory documents are cited or implied in each claim
4. **Access trusted sources** - Consult authoritative regulatory databases or prior verified analyses
5. **Verify claim accuracy** - Check whether assertions match the content of cited sources
6. **Validate citation format** - Ensure regulatory citations include statute section numbers and regulatory authority
7. **Assess confidence** - Rate confidence in verification based on source clarity and direct evidence
8. **Report discrepancies** - Document any mismatches between claims and source materials

## Quality Criteria
- **Exhaustiveness**: All regulatory claims in the deliverable are identified and verified
- **Source Credibility**: Verification is based on authoritative regulatory sources or trusted prior analyses
- **Citation Accuracy**: Regulatory claims match cited sources; citations include specific statute sections
- **Discrepancy Detection**: Any mismatches between claims and sources are clearly identified
- **Confidence Rating**: Verification results include assessment of confidence based on available evidence
- **Traceability**: Each verification is traceable to authoritative regulatory source

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
- **Source Invisibility**: Verifying claims against memory or incomplete knowledge without consulting authoritative sources
- **Citation Drift**: Accepting citations that paraphrase sources without verifying specific statute sections
- **Confidence Overestimation**: Providing verification confidence ratings without assessing source accessibility and clarity
- **Selective Verification**: Omitting difficult-to-verify regulatory claims from the verification process
- **False Affirmation**: Marking claims as verified without explicitly checking source material

## Examples
See example outputs in `references/example_outputs/` for gold-standard demonstrations of thorough regulatory cross-reference verification with source traceability.
