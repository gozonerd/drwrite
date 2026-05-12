---
title: "Writing Quality & Polish Assessment"
skill_id: "SK-21"
version: v02_I
date: 2026-03-06
task_type: "TT-21"
pipeline_assignments: [P4, P6]
owner: Martinez Methods
---

# Writing Quality & Polish Assessment

## Purpose
Proofread for grammar/spelling/tone, check style guide compliance, assess tone consistency. This task type performs comprehensive writing quality review to ensure DATS outputs meet publication standards and present a professional, consistent voice.

## Pipeline Context
- **Pipelines:** P4 (Final Review & Integration), P6 (Distribution & Audience Adaptation)
- **Raw Tasks Covered:** P4.2-L12, P4.2-L13, P4.2-L14, P4.2-PS-j, P4.2-PS-k, P4.2-PS-l
- **Dependencies:** Complete integrated document from P4, style guide, audience specification, previously published materials for tone calibration
- **Purpose:** Ensure professional presentation and consistency of voice

## Input Specification
Inputs to TT-21 include:
- Complete DATS document from P4 final integration
- Style guide (grammar, punctuation, formatting standards)
- Organization writing standards (tone, voice, house style)
- Audience specification (professional level, familiarity with subject)
- Previously published materials for tone calibration
- Technical terminology standards
- Formatting templates and examples

## Output Specification
- Output must conform to: `schemas/tt21_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Produce comprehensive quality review report with:
  - Grammar and mechanics errors identified with corrections
  - Spelling and punctuation issues flagged
  - Style guide compliance audit
  - Tone consistency assessment across sections
  - Voice calibration relative to audience expectations
  - Clarity and concision evaluation
  - Professional polish assessment
  - Specific remediation recommendations for each issue category
  - Confidence scoring for suggested corrections

## Methodology
1. **Mechanics Scan:** Read for grammar, syntax, and punctuation errors; flag each instance
2. **Spelling Audit:** Check spelling against standard dictionary and domain-specific terminology glossary
3. **Style Guide Compliance:** Verify capitalization, abbreviation conventions, citation format, list formatting
4. **Tone Inventory:** Sample paragraphs throughout document and assess tone/voice
5. **Consistency Check:** Verify tone remains consistent across different sections and authors
6. **Clarity Review:** Identify unnecessarily complex sentences or unclear phrasing
7. **Concision Assessment:** Flag verbosity or unnecessary repetition
8. **Professional Polish:** Evaluate overall presentation quality and professionalism
9. **Comparative Calibration:** Compare tone/voice to published materials from organization
10. **Remediation Drafting:** Provide corrected text for each issue identified

## Quality Criteria
- **Accuracy:** Grammar, spelling, and style corrections are correct and improve writing
- **Comprehensiveness:** All obvious errors identified; no false negatives on major issues
- **Consistency:** Style and tone standards applied uniformly throughout document
- **Context-Appropriate:** Corrections maintain intended meaning and professional tone
- **Confidence Calibration:** Less certain corrections flagged appropriately; high-confidence corrections justified
- **Non-Invasive:** Corrections respect author voice while improving clarity and correctness

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
- **Tone Flattening:** Imposing excessive uniformity that erases appropriate emphases or distinctions
- **Over-Correction:** Changing clear but informal phrasing to overly formal or awkward constructions
- **Style Rigidity:** Applying style rules without regard to context or technical necessity
- **Silent Errors:** Missing subtle grammatical issues or ambiguities in complex sentences
- **Inconsistent Standards:** Applying different standards to different sections or authors

## Examples
See example outputs in `references/example_outputs/` for gold-standard writing quality reviews showing error identification with corrections, style compliance verification, tone consistency assessment, and remediation recommendations that preserve author voice while improving clarity and professionalism.
