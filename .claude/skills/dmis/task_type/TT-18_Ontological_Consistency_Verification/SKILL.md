---
title: "Ontological Consistency Verification"
skill_id: "SK-18"
version: v02_I
date: 2026-03-06
task_type: "TT-18"
pipeline_assignments: [P4, P6]
owner: Martinez Methods
---

# Ontological Consistency Verification

## Purpose
Check terms, frameworks, and categories for consistent use within and across documents. This task type ensures semantic rigor by verifying that DATS outputs use defined terminology consistently and align categorical structures across all components.

## Pipeline Context
- **Pipelines:** P4 (Final Review & Integration), P6 (Distribution & Audience Adaptation)
- **Raw Tasks Covered:** P4.2-L9, P4.2-PS-h
- **Dependencies:** Complete DATS document set, terminology registry, framework definitions
- **Purpose:** Establish semantic consistency and ontological clarity for downstream use

## Input Specification
Inputs to TT-18 include:
- Complete DATS output document(s) from P4 final integration
- Terminology registry with definitions and scope notes
- Framework documentation (organizational structure, category definitions)
- Taxonomy/classification schemes used in analysis
- Definitions introduced in methodology sections
- All appendices and reference materials

## Output Specification
- Output must conform to: `schemas/tt18_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Produce ontological consistency report with:
  - Terminology inventory (all key terms, their definitions, usage frequency)
  - Consistency audit (instances of inconsistent usage)
  - Framework alignment verification (categories used consistently across sections)
  - Scope compliance check (terms used only within defined scope)
  - Cross-document alignment (consistency across multiple DATS documents if applicable)
  - Inconsistency classification (semantic drift / definition mismatch / category error)
  - Remediation recommendations with specific revisions

## Methodology
1. **Terminology Extraction:** Build comprehensive glossary of all technical/specialized terms in DATS output
2. **Definition Gathering:** For each term, extract definition from document (if provided) and scope of application
3. **Usage Audit:** Track every instance of each key term and note context
4. **Consistency Scanning:** Identify instances where same term is used with different meanings or different terms for same concept
5. **Framework Verification:** For categorical structures, verify categories applied consistently throughout
6. **Scope Compliance:** Check whether terms stay within defined scope (e.g., geographic, temporal, organizational)
7. **Cross-Reference Check:** Verify category assignments align across different sections/documents
8. **Inconsistency Classification:** For each inconsistency, determine whether it's semantic drift, definition shift, or category error
9. **Remediation Planning:** For each inconsistency, specify which usage should be standardized

## Quality Criteria
- **Comprehensiveness:** All key terms and categorical structures audited
- **Precision:** Distinguishing between acceptable context-dependent variation and problematic inconsistency
- **Clarity:** Terminology inventory provides clear definition and scope for each term
- **Consistency:** Inconsistencies identified systematically; no selective application of standards
- **Actionability:** Remediation recommendations specify preferred usage and justify standardization
- **Framework Integrity:** Categorical structures shown to be applied systematically

## Accuracy Rules
All outputs must comply with the 9 Critical Accuracy Rules (ACC-001 through ACC-009) defined in `ACCURACY_RULES.md`:
- ACC-001: CommCare current use vs. history (distinguish SMZ active deployment from Uganda pilot)
- ACC-002: Dimagi pilot = StrongMinds-wide (both Uganda and Zambia)
- ACC-003: Dimagi ≠ CommCare (platform vs. consulting firm)
- ACC-004: 4 offices always (SMU, SMZ, SMG, SM-US attribution required)
- ACC-005: DATS not DAD (correct terminology)
- ACC-006: EFD not RQ-RE (correct methodology name)
- ACC-007: α ≥ 0.70 QA / ≥ 0.75 methodology (convergence thresholds)
- ACC-008: CommCare IS a Digital Public Good (GID0090016)
- ACC-009: CommCare DET is standalone (separate Python CLI)

## Anti-Patterns
- **Over-Standardization:** Flagging acceptable context-dependent variation as inconsistency
- **Definition Inflation:** Creating strict definitions for terms that should allow flexibility
- **Selective Enforcement:** Applying consistency standards inconsistently across document sections
- **Silent Definitions:** Using terms without making definitions explicit, then accepting implicit definitions as adequate
- **Cross-Document Ignorance:** Checking consistency within document while missing misalignments across multiple DATS outputs

## Examples
See example outputs in `references/example_outputs/` for gold-standard ontological audits showing terminology inventory with scope notes, consistency analysis across sections, and remediation recommendations with justified standardization.
