---
title: "Full Pipeline Chain Tracing"
skill_id: "SK-12"
version: v02_I
date: 2026-03-06
task_type: "TT-12"
pipeline_assignments: [P4]
owner: Martinez Methods
---

# Full Pipeline Chain Tracing

## Purpose
Trace claims backward through multiple pipeline stages to primary evidence, documenting the complete provenance chain. This task type ensures every assertion in the DATS output is grounded in verifiable source material and can be tracked through all intermediate processing steps.

## Pipeline Context
- **Pipelines:** P4 (Final Review & Integration)
- **Raw Tasks Covered:** P4.2-L2, P4.2-L6, P4.2-PS-d
- **Dependencies:** Outputs from P1, P2, P3 processing chains
- **Purpose:** Quality assurance at the final integration stage to establish complete provenance for all claims

## Input Specification
Inputs to TT-12 include:
- Integrated claim set from P4.2-L2 synthesis layer
- Complete audit trail documentation from P1, P2, P3 processing
- Source material references and thread counts per pipeline
- All working notes from intermediate analysis stages
- Convergence scoring matrices (QA α, Methodology α)

## Output Specification
- Output must conform to: `schemas/tt12_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Produce structured provenance trace for each primary claim:
  - Claim statement (as finalized in P4)
  - Backward trace through P3 synthesis → P2 analysis → P1 raw → source documents
  - Thread count supporting each stage
  - Convergence score at each transition
  - Primary evidence reference identifiers

## Methodology
1. **Claim Identification:** Extract all primary claims from P4.2-L2 integrated output
2. **Stage-Backward Mapping:** For each claim, identify where it appeared in P3 synthesis and trace its source in P2 analysis
3. **Thread Verification:** Confirm thread counts from P1 raw processing match documented input specifications
4. **Evidence Linkage:** Link each claim to original source material identifiers in P1 raw documents
5. **Convergence Validation:** Verify convergence scores (QA α ≥ 0.70, Methodology α ≥ 0.75) are maintained through trace
6. **Gap Documentation:** Flag any claims with broken or incomplete trace chains
7. **Provenance Report:** Generate structured output documenting complete provenance for each claim

## Quality Criteria
- **Completeness:** Every primary claim must have complete backward trace to source material
- **Consistency:** Trace documentation must match convergence scoring and thread counts from earlier stages
- **Clarity:** Provenance chain must be human-readable and auditable
- **No Gaps:** All intermediate stages (P1→P2→P3→P4) must be represented with supporting evidence
- **Source Attribution:** Original sources clearly identified with reference identifiers
- **Convergence Compliance:** All traces must show convergence thresholds met at decision points

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
- **Trace Incompleteness:** Skipping intermediate stages or assuming direct P1→P4 causation
- **Thread Count Mismatch:** Reporting convergence without verifying thread counts match original specifications
- **Circular References:** Using trace documentation as evidence for itself rather than linking to primary sources
- **Silent Gaps:** Documenting broken traces without flagging for remediation
- **Vague Attribution:** Using generic source labels instead of specific reference identifiers

## Examples
See example outputs in `references/example_outputs/` for gold-standard provenance trace demonstrations showing complete backward mapping from final claim to primary evidence.
