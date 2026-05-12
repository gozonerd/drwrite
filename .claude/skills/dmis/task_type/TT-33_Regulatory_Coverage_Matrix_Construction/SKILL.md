---
title: "Regulatory Coverage Matrix Construction"
skill_id: "SK-33"
version: v02_I
date: 2026-03-06
task_type: "TT-33"
pipeline_assignments: [P6]
owner: Martinez Methods
---

# Regulatory Coverage Matrix Construction

## Purpose
Build jurisdiction × requirement matrix across full document, verify complete coverage of applicable regulatory obligations, flag compliance gaps.

## Pipeline Context
- **Pipelines**: P6
- **Raw Tasks**: P6 L13
- **Thread Assignments**: P6 (16 threads distributed across 6 validation passes)
- **Category**: Regulatory

## Input Specification
- Complete synthesized multi-section document
- Applicable regulatory frameworks (by jurisdiction if multi-jurisdictional)
- Requirement inventory or compliance checklist (if available)
- Known regulatory obligations relevant to project/client
- Prior regulatory gap analysis or compliance audits (if available)
- Regulatory scope definition (which standards/frameworks are in scope?)

## Output Specification
Regulatory coverage matrix report in CSV/YAML format.
- Output must conform to: `schemas/tt33_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Matrix format: rows = regulations/requirements, columns = sections; cells = coverage status
- Coverage summary: % of requirements addressed by sections
- Gaps identified: requirements not addressed in document
- Gap severity: critical (must address) vs. minor (nice-to-have)
- Remediation: suggestions for closing critical gaps

## Methodology
1. **Regulatory Scope Definition**: Clarify which jurisdictions and regulatory frameworks apply
2. **Requirement Extraction**: Build list of applicable regulatory obligations/requirements from source framework documents
3. **Document Scan**: Search full document for content addressing each requirement
4. **Coverage Mapping**: Map each requirement to relevant section(s) or note as uncovered
5. **Coverage Validation**: Verify mapped content actually substantively addresses the requirement (not just mention)
6. **Gap Identification**: Compile list of requirements with no substantive coverage in document
7. **Severity Assessment**: Distinguish between critical gaps (must address for compliance) and minor gaps (enhancement)
8. **Remediation Planning**: For each gap, note what content would be needed to address it

## Quality Criteria
- Regulatory scope clearly defined and justified
- All applicable requirements extracted from regulatory frameworks
- Coverage mapping substantive (not just keyword matching; actual requirement address)
- Gap severity assessment calibrated to actual compliance risk
- No missed requirements (false negatives in coverage scan)
- Matrix is comprehensive and easy to interpret
- Remediation suggestions are specific (not vague)
- Coverage percentages are accurate

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
- **Regulatory Scope Creep**: Including requirements from inapplicable frameworks or jurisdictions
- **Shallow Coverage Assessment**: Checking for keyword mentions rather than substantive requirement address
- **False Completeness**: Claiming gaps are closed when document text is tangential or insufficient
- **No Severity Distinction**: Treating all gaps equally; failing to prioritize critical compliance gaps
- **Inaccessible Matrix**: Producing dense, incomprehensible matrix that obscures actual coverage status

## Examples
See example outputs in `references/example_outputs/`

---
**Last Updated**: 2026-03-06
**Status**: Active
