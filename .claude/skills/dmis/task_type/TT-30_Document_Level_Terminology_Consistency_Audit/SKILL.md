---
title: "Document Level Terminology Consistency Audit"
skill_id: "SK-30"
version: v02_I
date: 2026-03-06
task_type: "TT-30"
pipeline_assignments: [P6]
owner: Martinez Methods
---

# Document Level Terminology Consistency Audit

## Purpose
Build terminology index across full document, flag inconsistencies in term usage and definition, verify glossary coverage.

## Pipeline Context
- **Pipelines**: P6
- **Raw Tasks**: P6 L2, P6 L11
- **Thread Assignments**: P6 (16 threads distributed across 6 validation passes)
- **Category**: Validation

## Input Specification
- Complete synthesized multi-section document
- Glossary (if present in draft)
- Domain-specific terminology reference (if available)
- Style guide terminology requirements
- Known acronyms and their definitions
- Prior terminology consistency errors or known problematic terms

## Output Specification
Terminology consistency audit report in YAML format.
- Output must conform to: `schemas/tt30_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Terminology index: all extracted terms with first occurrence location and all uses
- Inconsistency flags: terms with varying definitions or treatments
- Acronym audit: all acronyms with definitions and consistency check
- Glossary coverage audit: terms in index but missing from glossary
- Recommendations: standardization suggestions

## Methodology
1. **Term Extraction**: Scan full document for domain-specific terminology, technical terms, acronyms
2. **Occurrence Mapping**: Locate every occurrence of each term; track definition context if provided
3. **Consistency Analysis**: Compare term usage across sections; identify variations in definition or treatment
4. **Acronym Audit**: Extract all acronyms; verify each is defined on first use and consistently referenced
5. **Glossary Comparison**: Cross-check extracted terms against provided glossary; identify coverage gaps
6. **Definition Validation**: For multi-occurrence terms, ensure definitions are consistent or appropriately contextual
7. **Style Guide Alignment**: Verify terminology aligns with document style guide requirements
8. **Summary Report**: Document inconsistencies by type (definition variance, acronym issues, glossary gaps), with remediation

## Quality Criteria
- All significant domain terms extracted and indexed
- Consistency check covers ≥ 95% of multi-occurrence terms
- All acronyms defined on first use and consistently referenced thereafter
- Glossary coverage ≥ 0.90 (no more than 10% of indexed terms missing from glossary)
- Inconsistencies clearly documented with location and nature of variance
- Terminology aligns with domain standards and client conventions
- No missed inconsistencies (false negatives)

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
- **Over-Flagging Trivia**: Treating minor stylistic variations (e.g., "SMS" vs "text message" used intentionally) as inconsistencies
- **Glossary-Only Audit**: Checking glossary definitions but ignoring usage variations in the document itself
- **Acronym Blindness**: Missing undefined acronyms or overlooking inconsistent expansion
- **No Context**: Flagging inconsistencies without noting whether they're genuinely problematic or contextually appropriate
- **Incomplete Extraction**: Missing specialized terminology or domain-specific vocabulary

## Examples
See example outputs in `references/example_outputs/`

---
**Last Updated**: 2026-03-06
**Status**: Active
