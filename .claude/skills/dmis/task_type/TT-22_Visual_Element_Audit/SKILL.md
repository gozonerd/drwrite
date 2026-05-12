---
title: "Visual Element Audit"
skill_id: "SK-22"
version: v02_I
date: 2026-03-06
task_type: "TT-22"
pipeline_assignments: [P4, P6]
owner: Martinez Methods
---

# Visual Element Audit

## Purpose
Verify tables, figures, diagrams: labeling, referencing, sourcing, purpose, completeness. This task type performs comprehensive quality review of all visual elements in DATS outputs to ensure they support the narrative accurately and clearly.

## Pipeline Context
- **Pipelines:** P4 (Final Review & Integration), P6 (Distribution & Audience Adaptation)
- **Raw Tasks Covered:** P4.2-L15, P4.2-L16, P4.2-PS-m
- **Dependencies:** Complete integrated document with all visual elements, source data, figure/table specifications
- **Purpose:** Ensure all visual elements enhance understanding and meet quality standards

## Input Specification
Inputs to TT-22 include:
- Complete DATS document from P4 final integration with all embedded figures, tables, diagrams
- Source data for all tables and figures
- Figure/table captions and labels
- References to visual elements in narrative text
- Visual element specifications (axes, legends, color conventions)
- Design standards and style guide for visual elements
- Previously published visual elements for style consistency

## Output Specification
- Output must conform to: `schemas/tt22_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Produce comprehensive visual element audit with:
  - Inventory of all tables, figures, diagrams
  - Labeling audit (titles, axis labels, legends, captions)
  - Reference audit (all visual elements referenced in narrative)
  - Source verification (all data sourced and documented)
  - Purpose assessment (does each element serve clear purpose?)
  - Completeness verification (all required elements present, nothing missing)
  - Accuracy validation (visual representation matches source data)
  - Clarity assessment (can audience understand element without instruction?)
  - Accessibility evaluation (alt text, color contrast, size/readability)
  - Remediation recommendations for each issue identified

## Methodology
1. **Visual Inventory:** Identify all tables, figures, diagrams, charts in document
2. **Labeling Audit:** Check each element for clear title, axis labels, legends, and captions
3. **Reference Verification:** Confirm every visual element is referenced at least once in narrative
4. **Source Documentation:** Verify source data identified for every table/figure; trace to original source
5. **Purpose Clarity:** For each element, identify what understanding or claim it supports
6. **Data Accuracy:** Validate that visual representation accurately reflects source data
7. **Completeness Check:** Verify all necessary information/data included in each element
8. **Clarity Assessment:** Evaluate whether element is immediately understandable to target audience
9. **Design Consistency:** Check color schemes, fonts, layouts against style standards
10. **Accessibility Review:** Verify alt text provided, color-safe for colorblind readers, readable text size
11. **Comparison:** Check visual elements against published standards for similar information types

## Quality Criteria
- **Labeling Completeness:** All elements clearly labeled with titles, source citations, and interpretive captions
- **Narrative Integration:** Each visual element referenced and integrated into text flow
- **Source Integrity:** All data sourced, verified, and properly attributed
- **Visual Clarity:** Elements immediately understandable without additional explanation
- **Accuracy:** Visual representation faithfully reflects underlying data
- **Accessibility:** Elements usable by diverse audience (colorblind-friendly, readable text, proper contrast)
- **Consistency:** Visual style and design conventions consistent across all elements

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
- **Orphaned Figures:** Visual elements in document that aren't referenced or explained in text
- **Source Gaps:** Tables or figures without clear source attribution or with disputed data
- **Unreadable Details:** Text in figures too small, colors indistinguishable, legends missing
- **Misleading Representation:** Visual design choices (axis scaling, color choices) that distort data interpretation
- **Missing Context:** Visual elements lacking captions or narrative explanation of what they show
- **Accessibility Ignorance:** Color-only encoding of information, poor contrast ratios, no alt text

## Examples
See example outputs in `references/example_outputs/` for gold-standard visual element audits showing complete inventory with labeling verification, source documentation, purpose assessment, accuracy validation, and remediation recommendations for clarity and accessibility.
