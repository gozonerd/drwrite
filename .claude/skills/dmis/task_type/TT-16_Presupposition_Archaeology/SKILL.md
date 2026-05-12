---
title: "Presupposition Archaeology"
skill_id: "SK-16"
version: v02_I
date: 2026-03-06
task_type: "TT-16"
pipeline_assignments: [P1, P2, P3, P4, P6]
owner: Martinez Methods
---

# Presupposition Archaeology

## Purpose
Read from specified audience perspective, flag every implicit assumption not grounded in the document. This task type performs deep analysis of unstated assumptions embedded in DATS narratives to ensure clarity and transparency for the intended audience.

## Pipeline Context
- **Pipelines:** P1 (Raw Input Processing), P2 (Foundational Analysis), P3 (Synthesis & Integration), P4 (Final Review & Integration), P6 (Distribution & Audience Adaptation)
- **Raw Tasks Covered:** P1.2-L6, P2.2-L9, P3.2-L7, P4.2-L8, P4.2-PS-f
- **Dependencies:** Document text from all synthesis stages, audience specification, supporting evidence registry
- **Purpose:** Ensure transparency by surfacing and grounding all implicit assumptions

## Input Specification
Inputs to TT-16 include:
- Complete DATS narrative text (from P4 final integration)
- Audience specification (who is intended to read this?)
- Full evidence database with source citations
- Methodology documentation for analysis approaches
- Definitions and framing documents
- Any domain-specific background materials referenced

## Output Specification
- Output must conform to: `schemas/tt16_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Produce presupposition audit with:
  - List of implicit assumptions identified by location in document
  - Assumption grounding assessment (documented in text / implied only / external prerequisite)
  - Audience perspective assessment (what this assumes the reader knows)
  - Gap classification (missing definition / missing citation / missing justification)
  - Remediation for each ungrounded assumption
  - Revised text incorporating explicit grounding (where feasible)

## Methodology
1. **Audience Definition:** Establish baseline knowledge and context for target audience
2. **Close Reading:** Read narrative from audience perspective, noting where comprehension depends on unstated background
3. **Assumption Extraction:** For each key claim, identify prerequisite assumptions (factual, methodological, definitional)
4. **Grounding Check:** Verify whether each assumption is:
   - Explicitly stated in document
   - Supported by cited evidence
   - Defined or referenced earlier in text
   - Reasonable to expect from target audience
5. **Gap Documentation:** For ungrounded assumptions, classify whether missing definition, citation, or justification
6. **Audience Impact:** For each ungrounded assumption, assess whether target audience can understand without it
7. **Remediation Planning:** For critical assumptions, draft language to make explicit in document
8. **Transparency Report:** Document all excavated assumptions with grounding status

## Quality Criteria
- **Comprehensiveness:** All key assumptions identified, not just obvious ones
- **Audience Accuracy:** Assumptions identified from target audience perspective, not domain-expert perspective
- **Precision:** Distinguishing between missing definitions, missing evidence, and missing context
- **Actionability:** Remediation recommendations provide specific language changes or citations needed
- **Transparency:** Report makes visible the assumptions undergirding narrative structure
- **Feasibility:** Remediation options realistic given document scope and audience needs

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
- **Expert Blindspot:** Identifying assumptions from domain-expert perspective rather than target audience perspective
- **Assumption Inflation:** Flagging every logical prerequisite, including those too obvious for explicit statement
- **Missing Context Gaps:** Focusing only on factual assumptions while missing definitional or methodological ones
- **Unactionable Flags:** Identifying assumptions without clarity on whether they impede audience understanding
- **Shallow Archaeology:** Stopping at surface-level assumptions without examining underlying presuppositions

## Examples
See example outputs in `references/example_outputs/` for gold-standard presupposition audits showing assumption identification from audience perspective, grounding assessment, and remediation recommendations.
