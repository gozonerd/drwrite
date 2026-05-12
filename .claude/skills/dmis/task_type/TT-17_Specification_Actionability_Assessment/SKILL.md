---
title: "Specification Actionability Assessment"
skill_id: "SK-17"
version: v02_I
date: 2026-03-06
task_type: "TT-17"
pipeline_assignments: [P2, P3]
owner: Martinez Methods
---

# Specification Actionability Assessment

## Purpose
Evaluate whether each element is sufficiently specified for downstream execution. This task type assesses the practical implementability of specifications, recommendations, and procedural guidance in DATS outputs.

## Pipeline Context
- **Pipelines:** P2 (Foundational Analysis), P3 (Synthesis & Integration)
- **Raw Tasks Covered:** P3.2-L6, P3.2-PS-g, P2.2-L8
- **Dependencies:** Specification elements from synthesis, implementation context, downstream consumer capabilities
- **Purpose:** Ensure specifications provide sufficient detail for effective downstream use

## Input Specification
Inputs to TT-17 include:
- Complete specification/recommendation text from P3 synthesis
- Implementation context documentation (what downstream systems can do)
- Evidence supporting each specification element
- Methodology documentation justifying specifications
- Use case scenarios for downstream consumption
- Constraints and capability limitations of downstream consumers

## Output Specification
- Output must conform to: `schemas/tt17_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Produce actionability assessment with:
  - List of specification elements evaluated
  - Actionability score per element (fully specified / partially specified / underspecified)
  - Gaps identified (missing details, missing context, missing criteria)
  - Use case validation (can downstream consumer act on this?)
  - Risk assessment (what could go wrong with this specification?)
  - Remediation recommendations with specific language additions

## Methodology
1. **Element Extraction:** Identify all distinct specifications, recommendations, or procedural elements in synthesis output
2. **Downstream Consumer Definition:** Establish who will use each specification and what they need to implement it
3. **Sufficiency Assessment:** For each element, determine whether specification includes:
   - Specific success criteria or measurable outcomes
   - Necessary preconditions or prerequisites
   - Resource requirements and constraints
   - Decision rules for different scenarios
   - Responsible parties and timelines
4. **Gap Identification:** For each underspecified element, identify specific missing details
5. **Risk Analysis:** For each specification, identify implementation risks from ambiguity or missing information
6. **Use Case Validation:** Walk through how downstream consumer would actually implement specification with provided details
7. **Remediation Planning:** Draft specific language additions to increase actionability
8. **Prioritization:** Flag critical gaps that block implementation vs. helpful details that enhance execution

## Quality Criteria
- **Specificity:** Each specification can be understood and acted upon without requiring interpretation
- **Completeness:** Specifications include success criteria, preconditions, resource needs, and decision rules
- **Reality-Based:** Assessment grounded in actual downstream consumer capabilities and constraints
- **Actionability:** Gap analysis focuses on practical implementability, not just theoretical completeness
- **Prioritization:** Clear distinction between showstopper gaps and enhancement opportunities
- **Evidence-Grounded:** Specifications assessed against supporting evidence and methodology documentation

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
- **Expert Assumption:** Assuming downstream consumers understand methodology or context better than they do
- **Theoretical Sufficiency:** Marking specifications as actionable that assume access to expertise not available downstream
- **Missing Contingencies:** Failing to identify gaps in guidance for non-standard situations or edge cases
- **Silent Ambiguity:** Not flagging specification language that appears clear to authors but could be misinterpreted
- **Scope Inflation:** Demanding implementation details beyond reasonable specification scope

## Examples
See example outputs in `references/example_outputs/` for gold-standard actionability assessments showing element-by-element evaluation, gap identification with specific missing details, and remediation recommendations.
