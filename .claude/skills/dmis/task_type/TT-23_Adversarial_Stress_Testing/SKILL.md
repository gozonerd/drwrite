---
title: "Adversarial Stress Testing"
skill_id: "SK-23"
version: v02_I
date: 2026-03-06
task_type: "TT-23"
pipeline_assignments: [P4, P6]
owner: Martinez Methods
---

# Adversarial Stress Testing

## Purpose
Adopt hostile reviewer persona to systematically attack synthesized content for contradictions, regulatory gaps, feasibility issues, and edge cases. Produce structured attack cards documenting vulnerability vectors.

## Pipeline Context
- **Pipelines**: P4, P6
- **Raw Tasks**: P4.2-L10, P4.2-PS-g
- **Thread Assignments**: P4 (15 threads), P6 (16 threads for pass coverage)
- **Category**: Validation

## Input Specification
- Synthesized document section or complete draft
- Scope specification (regulatory domain, audience, use case)
- Known constraints and assumptions
- Reference standards or baselines for comparison

## Output Specification
Structured attack card set in YAML format.
- Output must conform to: `schemas/tt23_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Minimum 5 attack vectors per section
- Each card: attack_id, category, severity (critical/high/medium), description, evidence, remediation

## Methodology
1. **Persona Adoption**: Assume role of hostile/skeptical reviewer with deep domain expertise
2. **Systematic Scanning**: Scan all claims, data citations, recommendations, and assumptions for logical gaps
3. **Regulatory Alignment Check**: Cross-reference content against known regulatory/compliance requirements
4. **Feasibility Stress**: Identify resource, timeline, or technical feasibility concerns
5. **Edge Case Enumeration**: Document boundary conditions, exceptional scenarios, and failure modes
6. **Contradiction Detection**: Flag internal inconsistencies, contradictory recommendations, unresolved divergences
7. **Attack Card Generation**: Translate each vulnerability into structured card with evidence and remediation path
8. **Severity Calibration**: Rate each attack by impact and likelihood; prioritize critical attacks

## Quality Criteria
- Minimum 5 distinct attack vectors identified per section
- Each attack substantiated with direct textual evidence
- Severity ratings calibrated to actual business/regulatory impact
- Remediation paths are specific and actionable
- No attacks purely speculative or unfounded
- Coverage spans regulatory, technical, operational, and logical dimensions

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
- **False Positives**: Flagging non-issues or trivial inconsistencies as attacks
- **Bias Toward Critique**: Selecting only easy targets; missing substantive vulnerabilities
- **Regulatory Overreach**: Citing inapplicable standards or misinterpreting compliance requirements
- **Unfounded Speculation**: Creating attacks without supporting evidence from the content
- **Lack of Actionability**: Describing problems without viable remediation paths

## Examples
See example outputs in `references/example_outputs/`

---
**Last Updated**: 2026-03-06
**Status**: Active
