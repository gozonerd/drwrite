---
title: "Domain Knowledge Synthesis"
skill_id: "SK-02"
version: v02_I
date: 2026-03-06
task_type: "TT-02"
pipeline_assignments: [P2]
owner: Martinez Methods
---

# Domain Knowledge Synthesis

## Purpose
Follow prompt → produce comprehensive domain learning document from evidence. This task type synthesizes scattered domain knowledge, research findings, and contextual information into coherent, authoritative domain reference materials suitable for organizational learning and decision-making.

## Pipeline Context
- **Pipeline Assignment**: P2
- **Raw Tasks**: P2.1
- **Thread Count**: 25 threads per section
- **Stage**: Knowledge Management
- **Primary Use**: Creating authoritative domain reference materials, learning documents, and knowledge base entries

## Input Specification
The agent receives:
- **Domain Prompt**: Specification of the domain topic, scope, and intended audience
- **Evidence Corpus**: Source materials, research documents, organizational knowledge, and reference data
- **Learning Objectives**: What stakeholders should understand after consuming the synthesis
- **Organizational Context**: How this knowledge applies within StrongMinds operations and decision frameworks

## Output Specification
The agent must produce a comprehensive domain knowledge document in YAML format conforming to the authoritative schema.
- Output must conform to: `schemas/tt02_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Key sections: Executive Summary, Domain Fundamentals, Key Concepts, Evidence-Based Findings, Operational Applications, References
- Document must integrate evidence corpus with citations throughout
- All claims must be traceable to source materials

## Methodology
1. **Analyze the domain prompt** - Clarify learning objectives, scope boundaries, and intended audience sophistication level
2. **Inventory evidence corpus** - Catalog all available source materials, identify coverage gaps, and assess source credibility
3. **Extract key concepts** - Identify foundational ideas, frameworks, and terminology required for domain mastery
4. **Synthesize findings** - Integrate evidence across sources, resolve conflicts, and identify emergent insights
5. **Structure the narrative** - Organize concepts in logical learning progression from fundamentals to applications
6. **Embed evidence citations** - Integrate source citations throughout, maintaining traceability to original materials
7. **Apply to organizational context** - Translate domain knowledge into actionable implications for StrongMinds operations
8. **Validate completeness** - Cross-check against learning objectives; ensure all key evidence is represented

## Quality Criteria
- **Evidence-Grounded**: Every factual assertion is supported by cited evidence; no unsourced claims
- **Comprehensive**: All significant aspects of the domain are addressed; evidence corpus is fully integrated
- **Coherence**: Concepts flow logically; relationships between ideas are explicit; no contradictory assertions
- **Accessibility**: Complex ideas are explained clearly for organizational stakeholders; technical terms are defined
- **Accuracy**: All citations are precise; source quotes match originals; statistics are correctly reported
- **Applicability**: Knowledge synthesis includes explicit connections to StrongMinds organizational context

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
- **False Synthesis**: Combining incompatible evidence sources without acknowledging conflicts or presenting competing viewpoints
- **Unverified Extrapolation**: Drawing inferences beyond what the evidence supports; always distinguish evidence from interpretation
- **Source Invisibility**: Including claims without explicit citations; every factual statement must be traceable
- **Orphan Evidence**: Including source materials in the corpus but failing to integrate them into the synthesis narrative
- **Undisclosed Gaps**: Omitting discussion of areas where evidence is limited or conflicting; always flag uncertainty and incomplete knowledge

## Examples
See example outputs in `references/example_outputs/` for gold-standard demonstrations of evidence-based domain synthesis with integrated citations.
