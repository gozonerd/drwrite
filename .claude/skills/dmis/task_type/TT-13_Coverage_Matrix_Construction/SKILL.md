---
title: "Coverage Matrix Construction"
skill_id: "SK-13"
version: v02_I
date: 2026-03-06
task_type: "TT-13"
pipeline_assignments: [P1, P2, P3]
owner: Martinez Methods
---

# Coverage Matrix Construction

## Purpose
Build matrix of required elements × threads/sources, score coverage, and identify gaps. This task type provides quantitative measurement of how completely the DATS outputs address all required dimensions across all available evidence sources.

## Pipeline Context
- **Pipelines:** P1 (Raw Input Processing), P2 (Foundational Analysis), P3 (Synthesis & Integration)
- **Raw Tasks Covered:** P1.2-L4, P2.2-L5 (coverage part), P3.2-L5
- **Dependencies:** Thread specifications, element requirements from input specification
- **Purpose:** Establish completeness baseline and identify blind spots across pipelines

## Input Specification
Inputs to TT-13 include:
- Required elements specification (from input schema definition)
- Thread inventory from P1 raw processing
- Source material breakdown by pipeline stage
- Analysis output from P1, P2, P3 covering different required elements
- Thread count targets per pipeline (P1=15, P2=25, P3=5, P4=5, P5=1)

## Output Specification
- Output must conform to: `schemas/tt13_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Produce coverage matrix with:
  - Rows: Required elements (from specification)
  - Columns: Threads/sources available
  - Cell values: Coverage indicator (addressed/partial/missing)
  - Coverage percentage per element
  - Coverage percentage per thread
  - Gap identification and severity classification

## Methodology
1. **Element Extraction:** Enumerate all required elements from input specification
2. **Thread Inventory:** List all available threads/sources from P1 raw processing
3. **Matrix Construction:** Create rows × columns structure mapping elements to threads
4. **Coverage Scoring:** For each cell, determine if element is covered by thread (full/partial/none)
5. **Aggregation:** Calculate coverage % for each element and each thread
6. **Gap Analysis:** Identify missing coverage combinations and classify severity
7. **Remediation Mapping:** Document which gaps can be addressed by reprocessing vs. missing source material

## Quality Criteria
- **Completeness:** All required elements and threads represented in matrix
- **Consistency:** Coverage scoring aligns with actual content analysis from pipelines
- **Clarity:** Gap severity classification follows consistent criteria
- **Accuracy:** Coverage percentages calculate correctly and match source material review
- **Actionability:** Gap documentation provides clear remediation paths
- **Thread Compliance:** Matrix reflects actual thread counts per pipeline specifications (P1=15, P2=25, P3=5, P4=5, P5=1)

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
- **Thread Count Mismatch:** Creating matrix with incorrect thread counts that don't match pipeline specifications
- **Superficial Coverage:** Marking elements as "covered" without verifying depth or relevance of coverage
- **Gap Inflation:** Reporting gaps that actually reflect input specification errors rather than processing failures
- **Missing Cross-Thread Analysis:** Analyzing elements per thread independently without checking for aggregate coverage
- **Vague Remediation:** Identifying gaps without documenting feasible remediation paths

## Examples
See example outputs in `references/example_outputs/` for gold-standard coverage matrices showing proper element-to-thread mapping, gap identification, and remediation recommendations.
