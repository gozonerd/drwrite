---
title: "Client-Ready Prose Generation"
skill_id: "SK-04"
version: v02_I
date: 2026-03-06
task_type: "TT-04"
pipeline_assignments: [P4]
owner: Martinez Methods
---

# Client-Ready Prose Generation

## Purpose
Follow outline + evidence → produce polished, client-facing section prose. This task type generates publication-quality prose sections that integrate upstream structural guidance and evidence materials into cohesive, professionally-written content suitable for stakeholder delivery.

## Pipeline Context
- **Pipeline Assignment**: P4
- **Raw Tasks**: P4.1
- **Thread Count**: 5 threads per section
- **Stage**: Content Quality
- **Primary Use**: Creating final, polished prose sections that integrate outline structure with supporting evidence

## Input Specification
The agent receives:
- **Structural Outline**: Detailed outline from P3 specifying section purpose, scope, and content requirements
- **Evidence Materials**: Supporting research, citations, and reference data from P2
- **Prose Standards**: Organizational style guide, tone requirements, and writing conventions
- **Integration Instructions**: Specific guidance on how to incorporate outline structure into flowing prose

## Output Specification
The agent must produce polished section prose in YAML format conforming to the authoritative schema.
- Output must conform to: `schemas/tt04_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Key sections: Section Prose, Integration Points, Citation Verification, Quality Indicators
- Prose must be publication-ready for stakeholder delivery without further editing

## Methodology
1. **Parse the structural outline** - Understand section purpose, content requirements, and intended message flow
2. **Review evidence materials** - Identify relevant citations, data points, and supporting details
3. **Draft prose flow** - Write section prose that converts outline structure into flowing, narrative text
4. **Integrate citations** - Embed evidence citations throughout prose with proper attribution
5. **Apply style standards** - Ensure prose meets organizational tone, vocabulary, and formatting conventions
6. **Verify accuracy** - Cross-check all factual claims and citations against source materials
7. **Optimize readability** - Ensure prose is accessible to target stakeholder audience
8. **Conduct final review** - Verify section meets outline requirements and quality standards

## Quality Criteria
- **Narrative Flow**: Prose transitions smoothly between concepts; structure from outline is reflected naturally in text
- **Evidence Integration**: All supporting materials are incorporated with explicit citations; claims are well-supported
- **Accuracy**: Every factual assertion matches source materials; citations are precise and verifiable
- **Professionalism**: Writing meets organizational style standards; tone is appropriate for stakeholder audience
- **Completeness**: All outline requirements are addressed in prose; no content gaps
- **Polish**: Text is free of errors; formatting is consistent; prose reads smoothly without revision needs

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
All generated content must comply with the 6 Anti-Fabrication Rules (AFR-001 through AFR-006) defined in `ACCURACY_RULES.md`:
- **AFR-001**: Every factual claim requires a traceable source
- **AFR-002**: Never invent statistics, quotes, or regulatory citations
- **AFR-003**: When uncertain, flag as [NEEDS VERIFICATION]
- **AFR-004**: Cross-reference claims against Evidence Library
- **AFR-005**: Regulatory citations must reference specific statute sections
- **AFR-006**: Quote verification — fuzzy match ≥ 85% against source

## Anti-Patterns
- **Outline Dominance**: Producing prose that reads like an outline with minimal narrative flow or transitional language
- **Unsupported Claims**: Including assertions that sound authoritative but lack citation to evidence materials
- **Citation Omission**: Embedding factual claims without explicit citations; always trace claims to sources
- **Style Inconsistency**: Varying tone, vocabulary, or formatting conventions across sections
- **Accuracy Drift**: Introducing subtle distortions during prose conversion that change meaning of source material

## Examples
See example outputs in `references/example_outputs/` for gold-standard demonstrations of polished section prose with integrated citations and professional writing standards.
