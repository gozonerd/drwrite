---
title: "Structural Outline Generation"
skill_id: "SK-03"
version: v02_I
date: 2026-03-06
task_type: "TT-03"
pipeline_assignments: [P3]
owner: Martinez Methods
---

# Structural Outline Generation

## Purpose
Synthesize multiple upstream inputs → produce detailed structural blueprint. This task type creates comprehensive outlines that serve as detailed blueprints for downstream content generation, ensuring structural coherence and coverage completeness across complex multi-section documents.

## Pipeline Context
- **Pipeline Assignment**: P3
- **Raw Tasks**: P3.1
- **Thread Count**: 5 threads per section
- **Stage**: Content Structure
- **Primary Use**: Creating detailed structural plans before prose generation; ensuring comprehensive coverage across all required sections

## Input Specification
The agent receives:
- **Upstream Deliverables**: Content from P1 and P2 tasks (instructional documents, domain syntheses)
- **Document Specification**: Requirements for overall document structure, section hierarchy, and coverage areas
- **Organizational Standards**: Section ordering rules, formatting conventions, and consistency requirements
- **Integration Points**: Explicit mappings of how upstream content fits into the broader document structure

## Output Specification
The agent must produce a detailed structural outline document in YAML format conforming to the authoritative schema.
- Output must conform to: `schemas/tt03_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Key sections: Table of Contents, Section Descriptions, Subsection Details, Integration Points, Coverage Verification
- Outline must show clear hierarchy with explicit content assignments and placeholder annotations

## Methodology
1. **Analyze document specification** - Clarify overall structure requirements, section hierarchy, and coverage expectations
2. **Review upstream deliverables** - Inventory P1 and P2 outputs; understand their scope and key content
3. **Design section structure** - Create detailed section hierarchy that organizes upstream content logically
4. **Map content assignments** - Explicitly assign upstream materials to specific outline sections
5. **Identify gaps** - Determine where new content is needed beyond upstream deliverables
6. **Define section flows** - Specify how sections transition and reference each other
7. **Establish consistency framework** - Ensure section treatment is parallel across the document
8. **Validate coverage** - Cross-check outline against all document specification requirements

## Quality Criteria
- **Completeness**: All specification requirements are reflected in outline structure; no coverage gaps
- **Clarity**: Section purposes are explicitly stated; content boundaries are unambiguous
- **Hierarchy**: Section nesting is logical and consistent; levels are appropriate for document complexity
- **Integration**: All upstream deliverables are assigned to specific outline sections; no orphan content
- **Consistency**: Parallel sections receive parallel treatment in outline structure
- **Actionability**: Outline provides sufficient detail for downstream prose writers to execute without ambiguity

## Accuracy Rules
All outputs must comply with the 9 Critical Accuracy Rules (ACC-001 through ACC-009) defined in `ACCURACY_RULES.md`:
- **ACC-001**: CommCare current use vs. history (distinguish SMZ active deployment from Uganda pilot)
- **ACC-002**: Dimagi pilot = StrongMinds-wide (both Uganda and Zambia)
- **ACC-003**: Dimagi ≠ CommCare (platform vs. consulting firm)
- **ACC-004**: 4 offices always (SMU, SMZ, SMG, SM-US attribution required)
- **ACC-005**: DATS not DAD (correct terminology)
- **ACC-006**: EFD not RQ-RE (correct methodology name)
- **ACC-007**: α ≥ 0.70 QA / ≥ 0.75 methodology (convergence thresholds)
- **ACC-008**: CommCare IS a Digital Public Good (GID0090016)
- **ACC-009**: CommCare DET is standalone (separate Python CLI)

### Anti-Fabrication Rules
AFR-001 through AFR-006 from ACCURACY_RULES.md must be enforced:
- **AFR-001**: Every factual claim requires a traceable source
- **AFR-002**: Never invent statistics, quotes, or regulatory citations
- **AFR-003**: When uncertain, flag as [NEEDS VERIFICATION]
- **AFR-004**: Cross-reference claims against Evidence Library
- **AFR-005**: Regulatory citations must reference specific statute sections
- **AFR-006**: Quote verification — fuzzy match ≥ 85% against source

## Anti-Patterns
- **Structural Misalignment**: Creating outline structure that doesn't match specification or organizational standards
- **Floating Content**: Assigning upstream materials to outline sections without considering logical fit
- **Coverage Gaps**: Failing to account for all specification requirements; leaving sections without assigned content
- **Vague Boundaries**: Creating sections with ambiguous scope or overlapping coverage
- **Downstream Impossibility**: Designing outline structure that makes coherent prose generation impractical

## Examples
See example outputs in `references/example_outputs/` for gold-standard demonstrations of detailed structural outlines with explicit content mapping and gap identification.

---
**Last Updated**: 2026-03-06 (v02_I validated - AFR references added)
**Status**: Active
