---
title: "Source Reference Integrity Tracing"
skill_id: "SK-10"
version: v02_I
date: 2026-03-06
task_type: "TT-10"
pipeline_assignments: [P1, P2, P3]
owner: Martinez Methods
---

# Source Reference Integrity Tracing

## Purpose
Trace claims to input sources, verify citations exist and context is preserved. This task type verifies that all cited sources are accessible, that citations accurately reflect source content, and that quotations maintain proper context without distortion.

## Pipeline Context
- **Pipeline Assignments**: P1, P2, P3
- **Raw Tasks**: P1.2-L7, P2.2-L10, P3.2-L3
- **Stage**: Verification and Quality Assurance
- **Primary Use**: Ensuring all citations are valid, traceable, and contextually honest

## Input Specification
The agent receives:
- **Deliverable Output**: The artifact(s) produced by P1, P2, or P3 that contain citations and source references
- **Source Materials**: The actual source documents referenced in the deliverable
- **Citation Index**: Pre-compiled list of all citations in the deliverable with locations
- **Citation Standards**: Organizational standards for acceptable citation accuracy and context preservation

## Output Specification
The agent must produce a source reference integrity verification report in YAML format conforming to the authoritative schema.
- Output must conform to: `schemas/tt10_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Key sections: Citation Inventory, Source Accessibility Verification, Accuracy Assessment, Context Analysis, Integrity Summary
- Report must verify each citation against actual source material

## Methodology
1. **Extract all citations** - Identify every explicit reference to source materials in the deliverable
2. **Index citations** - Create comprehensive list of citations with location in deliverable and claimed page/section reference
3. **Verify source accessibility** - Confirm that each cited source document is available and accessible
4. **Locate cited passages** - Find the specific passages referenced in each citation
5. **Verify quotation accuracy** - For quotes, check that text matches source material word-for-word
6. **Assess context preservation** - Verify that quoted material is not taken out of context or misrepresented
7. **Evaluate paraphrasing** - For paraphrased citations, assess whether the paraphrase accurately reflects the source
8. **Report findings** - Document any citation inaccuracies, missing sources, or context distortions

## Quality Criteria
- **Accessibility**: All cited sources are locatable and available for verification
- **Accuracy**: Quoted material matches source text word-for-word; page references are correct
- **Context Preservation**: Quotes and citations do not distort or misrepresent source material intent
- **Completeness**: All citations in the deliverable are verified; no citations are skipped
- **Clarity**: Report identifies specific citation inaccuracies with details of the discrepancy
- **Traceability**: Each citation verification is traceable to specific source passage

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
- **Citation Invisibility**: Failing to actually locate source material for cited passages; assuming citations are correct
- **Context Blindness**: Verifying that quotations appear in the source without assessing whether they're taken out of context
- **Accessibility Assumption**: Assuming cited sources are available without attempting to locate them
- **Quotation Laxity**: Accepting minor word variations in quotations without flagging them as inaccuracies
- **Selective Verification**: Testing only some citations while ignoring others

## Examples
See example outputs in `references/example_outputs/` for gold-standard demonstrations of thorough source reference integrity verification with explicit traceability to source passages.
