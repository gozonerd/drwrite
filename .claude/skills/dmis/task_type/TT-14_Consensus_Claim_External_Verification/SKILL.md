---
title: "Consensus Claim External Verification"
skill_id: "SK-14"
version: v02_I
date: 2026-03-06
task_type: "TT-14"
pipeline_assignments: [P1, P2, P4]
owner: Martinez Methods
---

# Consensus Claim External Verification

## Purpose
Identify claims where all sources agree, then verify against external evidence (anti-shared-bias testing). This task type provides confidence that consensus-based claims are not artifacts of biased or limited source material by testing against independently-sourced evidence.

## Pipeline Context
- **Pipelines:** P1 (Raw Input Processing), P2 (Foundational Analysis), P4 (Final Review & Integration)
- **Raw Tasks Covered:** P1.2-L5, P2.2-L6, P4.2-L11
- **Dependencies:** Consensus scoring from P2 analysis, external reference database
- **Purpose:** Validate consensus findings against external ground truth to prevent shared-bias false consensus

## Input Specification
Inputs to TT-14 include:
- Consensus-scored claims from P2.2-L6 analysis (claims with 100% source agreement)
- Thread-by-thread coverage analysis from P1.2-L5
- External evidence reference database (public sources, domain expertise, published research)
- Convergence scoring matrices from P4.2-L11 final integration
- Documented assumptions and methodology references from all three pipelines

## Output Specification
- Output must conform to: `schemas/tt14_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Produce consensus verification report with:
  - List of consensus claims (100% source agreement)
  - External evidence check results for each consensus claim
  - Confidence scoring combining internal consensus + external corroboration
  - Shared-bias risk assessment by claim category
  - Discrepancy documentation (where consensus diverges from external evidence)
  - Remediation recommendations for high-risk claims

## Methodology
1. **Consensus Identification:** Extract claims with 100% source agreement from P2 analysis results
2. **Categorization:** Group consensus claims by domain/category to assess shared-bias risk
3. **External Search:** For each consensus claim, search external reference database for corroboration
4. **Evidence Evaluation:** Score external evidence quality, recency, and independence from original sources
5. **Bias Assessment:** Identify shared assumptions across all original sources that might produce false consensus
6. **Confidence Scoring:** Combine consensus strength with external corroboration into unified confidence metric
7. **Discrepancy Documentation:** For claims where external evidence diverges, document disagreement and implications
8. **Risk Reporting:** Flag consensus claims with weak external corroboration as requiring additional scrutiny

## Quality Criteria
- **Rigor:** External verification must use independent sources, not variations of same underlying data
- **Completeness:** All consensus claims must receive external verification attempt
- **Transparency:** Shared-bias risk assessment must document specific assumptions tested
- **Calibration:** Confidence scores must reflect both internal consensus strength and external corroboration quality
- **Actionability:** Discrepancies documented with sufficient detail for remediation decisions
- **Clarity:** Bias risk assessment distinguishes methodological limitations from actual disagreement

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
- **Echo Chamber Verification:** Using sources derived from or influenced by original source material
- **Selective Corroboration:** Only searching for external evidence that confirms consensus
- **Shallow Bias Analysis:** Assuming consensus validity without examining underlying methodology alignment
- **Overconfidence:** Assigning high confidence to consensus without sufficient external corroboration
- **Ignored Discrepancies:** Finding external disagreement but failing to assess implications

## Examples
See example outputs in `references/example_outputs/` for gold-standard external verification reports showing consensus identification, bias risk assessment, and corroboration analysis.
