---
title: "Structural Coherence Verification"
skill_id: "SK-19"
version: v02_I
date: 2026-03-06
task_type: "TT-19"
pipeline_assignments: [P3, P6]
owner: Martinez Methods
---

# Structural Coherence Verification

## Purpose
Verify heading hierarchy, logical flow, narrative arc, and absence of orphaned elements. This task type ensures DATS outputs have sound structural organization that supports reader comprehension and navigation.

## Pipeline Context
- **Pipelines:** P3 (Synthesis & Integration), P6 (Distribution & Audience Adaptation)
- **Raw Tasks Covered:** P3.2-PS-e, P3.2-PS-f
- **Dependencies:** Complete integrated document from P3, style guide, audience comprehension model
- **Purpose:** Establish structural integrity and clarity of document organization

## Input Specification
Inputs to TT-19 include:
- Complete DATS document from P3 final synthesis
- Document structure (heading hierarchy, sections, subsections)
- Style guide or organizational standards
- Content inventory (what topics are covered and where)
- Cross-references and internal links
- Table of contents or navigation aids
- Any required structural templates or formats

## Output Specification
- Output must conform to: `schemas/tt19_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Produce structural analysis report with:
  - Heading hierarchy audit (nesting levels, consistency)
  - Logical flow verification (section sequencing, prerequisite satisfaction)
  - Narrative arc assessment (introduction, development, conclusion integrity)
  - Orphaned element identification (unreferenced sections, dead links, floating content)
  - Cross-reference validation (internal links work, references accurate)
  - Reader navigation assessment (ease of finding topics, clarity of structure)
  - Remediation recommendations (restructuring, reorganization, reordering)

## Methodology
1. **Structure Mapping:** Extract complete document structure (all headings and nesting levels)
2. **Hierarchy Audit:** Verify heading levels follow logical progression and don't skip levels improperly
3. **Sequencing Review:** Check whether sections appear in logical order for reader comprehension
4. **Prerequisite Check:** Identify whether sections reference content introduced later and require reordering
5. **Orphan Detection:** Identify sections not referenced from navigation or table of contents
6. **Link Validation:** Test all internal cross-references to verify they point to valid locations
7. **Arc Analysis:** Trace narrative structure from introduction through development to conclusion
8. **Navigation Assessment:** Evaluate how easily a reader could locate specific topics in current structure
9. **Coherence Scoring:** Assess overall structural integrity on accessibility/clarity dimensions

## Quality Criteria
- **Hierarchy Integrity:** Heading levels properly nested with no illogical skips
- **Logical Sequence:** Sections ordered to build reader understanding progressively
- **Navigation Clarity:** Document structure supports finding and understanding content
- **No Orphans:** All content reachable from document navigation and referenced appropriately
- **Arc Integrity:** Document has clear introduction, development, and conclusion
- **Internal Consistency:** Cross-references and links accurate and functional

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
- **Bureaucratic Over-Structuring:** Creating excessive heading levels or categories that obscure rather than clarify
- **Hidden Dependencies:** Sections with forward references that require reading ahead to understand context
- **Flat Hierarchy:** Using all same heading level, losing organizational clarity
- **Lost Sections:** Content that exists but isn't integrated into navigation or document flow
- **Inconsistent Patterns:** Some sections well-structured while others poorly organized

## Examples
See example outputs in `references/example_outputs/` for gold-standard structural audits showing heading hierarchy analysis, logical flow verification, orphaned element detection, and reorganization recommendations.
