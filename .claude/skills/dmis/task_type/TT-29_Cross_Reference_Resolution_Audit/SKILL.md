---
title: "Cross-Reference Resolution Audit"
skill_id: "SK-29"
version: v02_I
date: 2026-03-06
task_type: "TT-29"
pipeline_assignments: [P6]
owner: Martinez Methods
---

# Cross-Reference Resolution Audit

## Purpose
Extract all internal references across multi-section document and verify each resolves correctly (section links, figure citations, table references, footnote targets, etc.).

## Pipeline Context
- **Pipelines**: P6
- **Raw Tasks**: P6 L1, P6 L10
- **Thread Assignments**: P6 (16 threads distributed across 6 validation passes)
- **Category**: Integration

## Input Specification
- Complete synthesized multi-section document
- Reference index or content map (if available)
- Section numbering and title manifest
- Figure, table, and appendix inventory
- Known reference formats and link patterns
- Prior reference errors or known broken links (for regression testing)

## Output Specification
Cross-reference validation report in YAML format.
- Output must conform to: `schemas/tt29_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Reference inventory: all extracted internal links with context
- Validation results: resolved/unresolved per reference
- Broken reference details: missing targets, incorrect labels
- Recommendations: correct references or note as unfixable

## Methodology
1. **Reference Extraction**: Scan full document for internal references (section links, citations, footnotes, figure/table callouts)
2. **Pattern Recognition**: Classify references by type (section, figure, table, footnote, appendix)
3. **Target Mapping**: For each reference, locate intended target in document
4. **Resolution Verification**: Confirm target exists, is correctly labeled, and is accessible
5. **Format Validation**: Check reference format matches document style guide
6. **Context Check**: Verify reference makes sense in local context (correct figure for discussion point, etc.)
7. **Broken Link Documentation**: List any references with missing or incorrect targets
8. **Summary Report**: Document resolution rate, broken references by category, remediation steps

## Quality Criteria
- All internal references extracted and cataloged
- Resolution rate ≥ 0.95 (no more than 5% broken references)
- Broken references clearly documented with location and target description
- Reference format consistent throughout document
- No false negatives (missing broken references)
- Recommendations for remediation are concrete and implementable
- Cross-check against section inventory is exhaustive

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
- **Incomplete Extraction**: Missing some reference types (e.g., only checking section links, ignoring footnote references)
- **False Positives**: Flagging valid references as broken due to parsing errors
- **Shallow Validation**: Checking reference existence but not correctness in context
- **Format Inconsistency**: Allowing mixed reference styles without flagging
- **No Remediation Path**: Identifying broken references without suggesting fixes

## Examples
See example outputs in `references/example_outputs/`

---
**Last Updated**: 2026-03-06
**Status**: Active
