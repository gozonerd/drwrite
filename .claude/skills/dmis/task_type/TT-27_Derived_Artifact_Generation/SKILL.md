---
title: "Derived Artifact Generation"
skill_id: "SK-27"
version: v02_I
date: 2026-03-06
task_type: "TT-27"
pipeline_assignments: [P5]
owner: Martinez Methods
---

# Derived Artifact Generation

## Purpose
Extract, consolidate, reformat content from completed section drafts into structured appendix/reference documents (glossaries, matrices, indices, reference libraries).

## Pipeline Context
- **Pipelines**: P5
- **Raw Tasks**: P5-Gen, P5-Aud-a through P5-Aud-f
- **Thread Assignments**: P5 (1 thread for generation and audience assessment)
- **Category**: Content Generation

## Input Specification
- Completed section drafts (main content)
- Terminology index or glossary requirements
- Reference matrix specifications (e.g., jurisdiction × requirement)
- Client-requested appendices or supplementary materials
- Existing reference materials or baseline artifacts (if available)
- Style guide and formatting requirements

## Output Specification
Structured derived artifacts in specified format (YAML, CSV, JSON, or markdown).
- Output must conform to: `schemas/tt27_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Artifacts: glossary, reference matrices, indices, bibliographies, supplementary tables
- Each artifact includes source attribution and extraction metadata
- Consistent formatting and cross-referencing

## Methodology
1. **Requirements Inventory**: Identify all derived artifacts needed (glossary, matrices, indices, etc.)
2. **Content Extraction**: Systematically extract relevant content from completed section drafts
3. **Consolidation**: Merge extracted content, deduplicating where appropriate
4. **Normalization**: Apply consistent formatting, terminology, and structure across artifacts
5. **Indexing/Structuring**: Organize content using client specifications (alphabetical, hierarchical, matrix-based)
6. **Cross-Referencing**: Ensure artifacts cross-link to main content and to each other where relevant
7. **Attribution Metadata**: Track source section and extraction method for each artifact entry
8. **Validation**: Verify artifacts are complete, consistent, and faithful to source material

## Quality Criteria
- All extracted content accurately represents source material
- No novel content introduced (extraction only; consolidation/formatting permitted)
- Artifacts complete per client requirements and specifications
- Consistent formatting and terminology across all artifacts
- Cross-references accurate and functional
- Source attribution clear for every entry
- Zero fabrication or invented data

## Accuracy Rules
All outputs must comply with the 9 Critical Accuracy Rules (ACC-001 through ACC-009) defined in `ACCURACY_RULES.md`:
- ACC-001: CommCare current use vs. history
- ACC-002: Dimagi pilot = StrongMinds-wide
- ACC-003: Dimagi ≠ CommCare
- ACC-004: 4 offices always (SMU, SMZ, SMG, SM-US)
- ACC-005: DATS not DAD
- ACC-006: EFD not RQ-RE
- ACC-007: α ≥ 0.70 QA / ≥ 0.75 methodology
- ACC-008: CommCare IS a Digital Public Good (GID0090016)
- ACC-009: CommCare DET is standalone

### Anti-Fabrication Rules
AFR-001 through AFR-006 from ACCURACY_RULES.md must be enforced:
- AFR-001: No hallucinated glossary entries or definitions
- AFR-002: No synthetic data in reference matrices or tables
- AFR-003: No extrapolated or inferred content beyond source material
- AFR-004: No invented citations, author attributions, or bibliographic entries
- AFR-005: No fabricated regulatory references or compliance mappings
- AFR-006: All artifact content must originate from extracted/consolidated source material; zero novel generation

## Anti-Patterns
- **Over-Extraction**: Including marginally relevant content that clutters artifacts
- **Terminology Drift**: Inconsistent use of terms across artifacts (violates ACC rules)
- **Lost Traceability**: Creating artifacts without source attribution or extraction provenance
- **Novel Content Injection**: Adding synthesizer's own definitions, interpretations, or examples
- **Incomplete Consolidation**: Missing content that should be included per requirements

## Examples
See example outputs in `references/example_outputs/`

---
**Last Updated**: 2026-03-06
**Status**: Active
