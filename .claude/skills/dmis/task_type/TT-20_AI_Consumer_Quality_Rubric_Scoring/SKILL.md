---
title: "AI Consumer Quality Rubric Scoring"
skill_id: "SK-20"
version: v02_I
date: 2026-03-06
task_type: "TT-20"
pipeline_assignments: [P2]
owner: Martinez Methods
---

# AI Consumer Quality Rubric Scoring

## Purpose
Multi-dimensional rubric-based quality scoring for documents consumed by downstream AI. This task type evaluates DATS outputs across dimensions relevant to downstream AI systems consuming the analysis results.

## Pipeline Context
- **Pipelines:** P2 (Foundational Analysis)
- **Raw Tasks Covered:** P2.2-L7
- **Dependencies:** Complete analyzed content from P1/P2 processing, AI consumer specifications, quality rubric definitions
- **Purpose:** Ensure DATS outputs meet quality requirements for downstream AI consumption

## Input Specification
Inputs to TT-20 include:
- Complete analysis output from P2 processing
- AI consumer specifications (what downstream AI systems need)
- Quality rubric with scoring dimensions and criteria
- Evidence quality metrics from P1/P2 analysis
- Clarity and structure assessment
- Actionability indicators for downstream AI use
- Previous quality scores for comparison/calibration

## Output Specification
- Output must conform to: `schemas/tt20_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Produce multi-dimensional quality report with:
  - Individual scores for each rubric dimension
  - Justification for each score with evidence
  - Aggregate quality score
  - Dimension-specific strengths and weaknesses
  - Comparison to quality thresholds/targets
  - Prioritized remediation recommendations
  - Assessment of readiness for downstream AI consumption

## Methodology
1. **Rubric Dimension Definition:** Establish scoring dimensions aligned to AI consumer needs
2. **Evidence Quality Scoring:** Evaluate source quality, coverage, and corroboration
3. **Clarity Assessment:** Score how clearly concepts and findings are explained for AI parsing
4. **Structured Readiness:** Score document structure, headings, sections for AI information extraction
5. **Actionability Scoring:** Score whether specifications are specific enough for AI decision-making
6. **Completeness Scoring:** Score coverage of required elements and absence of critical gaps
7. **Consistency Scoring:** Score terminological and categorical consistency for reliable parsing
8. **Confidence Scoring:** Score how clearly confidence/uncertainty is communicated
9. **Aggregate Scoring:** Combine dimension scores with appropriate weighting

## Quality Criteria
- **Dimension Clarity:** Each rubric dimension clearly defined and measurable
- **Scoring Consistency:** Same quality level receives same score across different sections
- **Evidence-Grounded:** Scores justified with specific references to content
- **AI-Relevant:** Dimensions reflect actual downstream AI consumer needs
- **Actionability:** Remediation recommendations prioritized by impact on AI consumption
- **Calibration:** Scores align with quality thresholds and comparison points

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
- **Human-Centric Scoring:** Using readability and clarity metrics for general readers rather than AI consumers
- **Inflation:** Scoring generously without grounding in concrete quality evidence
- **Missing Dimensions:** Focusing on limited dimensions while ignoring critical AI consumer needs
- **Vague Justification:** Providing scores without specific evidence from content
- **Ignorant Remediation:** Recommending fixes without understanding downstream AI processing requirements

## Examples
See example outputs in `references/example_outputs/` for gold-standard quality rubric scoring showing dimension-by-dimension evaluation, evidence-grounded justification, aggregate scoring, and prioritized remediation recommendations for downstream AI consumption.
