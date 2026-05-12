---
title: "Upstream Consistency Verification"
skill_id: "SK-09"
version: v02_I
date: 2026-03-06
task_type: "TT-09"
pipeline_assignments: [P3, P4, P5]
owner: Martinez Methods
---

# Upstream Consistency Verification

## Purpose
Cross-check downstream artifact against upstream pipeline outputs for alignment. This task type verifies that downstream deliverables (outlines, prose) faithfully represent the content and intent of upstream source materials (domain syntheses, instructional documents, evidence bases).

## Pipeline Context
- **Pipeline Assignments**: P3, P4, P5
- **Raw Tasks**: P3.2-L2, P3.2-PS-d, P4.2-PS-h, P5-Aud-f
- **Stage**: Quality Assurance Verification
- **Primary Use**: Ensuring downstream content does not distort, misrepresent, or ignore upstream source materials

## Input Specification
The agent receives:
- **Upstream Deliverables**: The source materials from P1, P2 (domain syntheses, instructional documents, evidence packages)
- **Downstream Artifact**: The derived content from P3 (outline) or P4 (prose) being verified
- **Mapping Documents**: Explicit assignments showing how upstream content should map to downstream sections
- **Fidelity Standards**: Acceptable bounds for paraphrasing, summarization, and interpretation

## Output Specification
The agent must produce an upstream consistency verification report in YAML format conforming to the authoritative schema.
- Output must conform to: `schemas/tt09_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Key sections: Consistency Summary, Upstream-to-Downstream Mapping Verification, Distortion Detection, Integration Assessment, Fidelity Analysis
- Report must show how downstream content represents upstream source materials

## Methodology
1. **Catalog upstream deliverables** - Create comprehensive inventory of source materials and their key content points
2. **Map expected downstream assignments** - Identify where upstream content should appear in downstream artifact
3. **Scan downstream artifact** - Identify sections that should correspond to upstream content
4. **Verify content integration** - For each upstream-to-downstream mapping, assess whether content is accurately reflected
5. **Detect distortions** - Identify cases where downstream content misrepresents or subtly changes upstream meaning
6. **Assess omissions** - Flag significant upstream content that is absent from downstream artifact
7. **Evaluate paraphrasing** - Determine whether paraphrasing maintains accuracy and intent
8. **Report fidelity** - Summarize overall faithfulness of downstream representation to upstream sources

## Quality Criteria
- **Coverage**: All major content from upstream deliverables is represented in downstream artifact
- **Accuracy**: Downstream content accurately reflects upstream sources; no material distortions
- **Fidelity**: Paraphrasing and summarization maintain the meaning and intent of original material
- **Traceability**: Each downstream section can be traced back to specific upstream source material
- **Completeness**: No significant upstream content is silently omitted from downstream work
- **Clarity**: Report explicitly notes cases where paraphrasing changes emphasis or meaning

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
- **Mapping Invisibility**: Failing to explicitly show where upstream content appears in downstream artifact
- **Silent Omissions**: Noticing missing upstream content but not flagging it as a fidelity issue
- **Distortion Blindness**: Missing subtle changes in meaning that occur during paraphrasing
- **Over-Generosity**: Accepting weak paraphrasing that loses nuance or emphasis of original content
- **Selective Verification**: Testing upstream-to-downstream fidelity only for some sections

## Examples
See example outputs in `references/example_outputs/` for gold-standard demonstrations of thorough upstream consistency verification with explicit mapping and fidelity assessment.
