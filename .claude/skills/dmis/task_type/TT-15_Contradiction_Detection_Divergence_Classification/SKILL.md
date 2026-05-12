---
title: "Contradiction Detection & Divergence Classification"
skill_id: "SK-15"
version: v02_I
date: 2026-03-06
task_type: "TT-15"
pipeline_assignments: [P1, P2, P4]
owner: Martinez Methods
---

# Contradiction Detection & Divergence Classification

## Purpose
Identify cross-source disagreements and classify using binary decision tree. This task type systematically categorizes source disagreements to determine whether they require resolution before synthesis, halting processing, or can be documented and included in final output.

## Pipeline Context
- **Pipelines:** P1 (Raw Input Processing), P2 (Foundational Analysis), P4 (Final Review & Integration)
- **Raw Tasks Covered:** P1.2-L8, P2.2-L5 (contradiction part), P2.2-L11, P4.2-L7
- **Dependencies:** Full thread inventory from P1, analysis comparisons from P2, convergence scoring from P4
- **Purpose:** Manage disagreement in source material with systematic classification framework

## Input Specification
Inputs to TT-15 include:
- Complete thread analysis from P1.2-L8 identifying contradictions
- Contradiction-scored analysis from P2.2-L5 and P2.2-L11
- Statement-level comparisons across threads
- Methodology documentation for each thread
- Framing/context information for each contradictory claim
- P4.2-L7 integration decisions and their justifications

## Output Specification
- Output must conform to: `schemas/tt15_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Produce contradiction classification report with:
  - List of identified contradictions (specific claims, threads involved)
  - Classification decision for each contradiction using decision tree
  - Resolution evidence (if Q1 applies)
  - Downstream dependency assessment (if Q2 applies)
  - Documentation of framing differences (if Q3 applies)
  - Recommendation per contradiction (RESOLVE-BEFORE-SYNTHESIS / HALT / DOCUMENT-ONLY)
  - Aggregate status: can proceed to synthesis or processing blocked

## Methodology
1. **Contradiction Extraction:** Identify all statement pairs where sources directly contradict (not just differ in emphasis)
2. **Context Preservation:** For each contradiction, document the specific thread sources, exact claims, and supporting evidence
3. **Decision Tree Application:** For each contradiction, apply the three-question decision tree:
   - **Q1: Is there factual ground truth available?** (Can this be definitively resolved by external evidence?)
   - **Q2: Does downstream synthesis depend on resolving this?** (Will the contradiction propagate and cause synthesis failure?)
   - **Q3: Is this framing/interpretation rather than factual?** (Can this be presented as legitimate alternative framing?)
4. **Classification Assignment:**
   - If Q1=YES → RESOLVE-BEFORE-SYNTHESIS (obtain ground truth)
   - If Q1=NO AND Q2=YES → HALT (processing blocked until contradiction addressed)
   - If Q3=YES → DOCUMENT-ONLY (include both framings in output)
5. **Resolution Documentation:** For RESOLVE classifications, document what evidence would resolve
6. **Halt Assessment:** For HALT classifications, assess if contradiction can be contextualized without resolution
7. **Integration Recommendation:** Determine if processing can proceed to synthesis stage

## Quality Criteria
- **Accuracy:** Contradictions accurately identified (genuine disagreement, not paraphrase variation)
- **Decision Tree Compliance:** All contradictions receive proper tree-based classification
- **Evidence Grounding:** Classification decisions supported by explicit reference to source material
- **Completeness:** All disagreements identified; no implicit assumptions about non-contradiction
- **Actionability:** Recommendations provide clear next steps for each classification
- **Transparency:** Decision reasoning documented for each contradiction

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

## Divergence Decision Tree
```
CONTRADICTION IDENTIFIED
↓
Q1: Is there factual ground truth available?
├─ YES → RESOLVE-BEFORE-SYNTHESIS
│        (Obtain external ground truth to determine correct claim)
│
└─ NO
   ↓
   Q2: Does downstream synthesis depend on resolving this?
   ├─ YES → HALT
   │        (Processing blocked; contradiction must be addressed before synthesis)
   │
   └─ NO
      ↓
      Q3: Is this framing/interpretation rather than factual?
      ├─ YES → DOCUMENT-ONLY
      │        (Include both framings in output as legitimate alternatives)
      │
      └─ NO → HALT
             (Unresolvable factual disagreement blocks processing)
```

## Anti-Patterns
- **False Contradictions:** Marking paraphrase variations or complementary points as contradictions
- **Shallow Tree Application:** Making classification decisions without properly evaluating all three questions
- **Missing Context:** Classifying contradictions without documenting the threads involved or supporting evidence
- **Ignoring Dependencies:** Missing downstream impacts of contradictions that should trigger HALT classification
- **Premature Documentation:** Applying DOCUMENT-ONLY when RESOLVE-BEFORE-SYNTHESIS would be more appropriate
- **Silent Halts:** Identifying HALT-classified contradictions without explicitly blocking processing

## Examples
See example outputs in `references/example_outputs/` for gold-standard contradiction classification showing proper decision tree application, evidence-grounded classifications, and remediation recommendations.
