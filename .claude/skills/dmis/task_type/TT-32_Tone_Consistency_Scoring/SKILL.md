---
title: "Tone Consistency Scoring"
skill_id: "SK-32"
version: v02_I
date: 2026-03-06
task_type: "TT-32"
pipeline_assignments: [P6]
owner: Martinez Methods
---

# Tone Consistency Scoring

## Purpose
Score each section on formality level, technicality, verbosity, active/passive voice ratio, and reader assumption level. Flag deviations from document mean and recommend standardization.

## Pipeline Context
- **Pipelines**: P6
- **Raw Tasks**: P6 L8
- **Thread Assignments**: P6 (16 threads distributed across 6 validation passes)
- **Category**: Quality Assurance

## Input Specification
- Complete synthesized multi-section document
- Style guide (if available) with tone/voice specifications
- Target reader profile and expected tone level
- Known tone inconsistencies from prior feedback
- Section purpose/audience breakdown (if some sections have different intended readers)

## Output Specification
Tone consistency audit report in YAML format.
- Output must conform to: `schemas/tt32_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Per-section tone scores: formality (0-10), technicality (0-10), verbosity (0-10)
- Active/passive voice ratio per section
- Reader assumption level (novice/intermediate/expert) per section
- Document tone mean and standard deviation by dimension
- Deviations identified and flagged by magnitude and type
- Recommendations: standardization suggestions by section

## Methodology
1. **Baseline Extraction**: Identify target tone profile from style guide and overall document purpose
2. **Section-by-Section Analysis**: For each section, assess:
   - Formality level (formal/professional language vs. conversational)
   - Technicality (specialized jargon vs. plain language)
   - Verbosity (dense/terse vs. elaborate/explanatory)
   - Active/passive voice ratio
   - Reader assumption level (what background knowledge is assumed)
3. **Statistical Profiling**: Calculate mean and standard deviation across all sections for each dimension
4. **Deviation Identification**: Flag sections more than 1.5 standard deviations from mean
5. **Contextual Assessment**: Determine whether deviations are problematic or justified by section purpose
6. **Recommendation Generation**: For problematic deviations, suggest specific rewording or restructuring

## Quality Criteria
- Tone scoring methodology is objective and consistently applied across sections
- Formality, technicality, and verbosity assessments are calibrated to actual document content
- Active/passive ratio is quantitatively accurate (spot-check sentences)
- Reader assumption levels accurately reflect background knowledge required
- Deviations from mean are statistically meaningful (not trivial variations)
- Contextual assessment distinguishes between problematic and justified deviations
- Recommendations are rewriting-specific, not vague

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
- **Tone Homogenization Bias**: Treating all deviations as problems; ignoring legitimate reasons for tone variation
- **Shallow Scoring**: Assessing formality only; ignoring technicality, verbosity, and reader assumptions
- **Arbitrary Thresholds**: Using inconsistent criteria to score tone dimensions across sections
- **No Context**: Flagging a highly technical section as "too technical" without considering its function in the document
- **Over-Prescriptiveness**: Demanding voice consistency across sections with genuinely different purposes

## Examples
See example outputs in `references/example_outputs/`

---
**Last Updated**: 2026-03-06
**Status**: Active
