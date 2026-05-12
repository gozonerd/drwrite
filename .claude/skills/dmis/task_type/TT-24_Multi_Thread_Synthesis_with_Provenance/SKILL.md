---
title: "Multi-Thread Synthesis with Provenance"
skill_id: "SK-24"
version: v02_I
date: 2026-03-06
task_type: "TT-24"
pipeline_assignments: [P1, P2, P3, P4]
owner: Martinez Methods
---

# Multi-Thread Synthesis with Provenance

## Purpose
Merge multiple thread outputs into single coherent document using audit recommendations, maintaining provenance chain. Handle unresolved divergences using structured decision tree.

## Pipeline Context
- **Pipelines**: P1, P2, P3, P4
- **Raw Tasks**: P1.4, P2.4, P3.4, P4.4
- **Thread Assignments**: P1 (15 threads), P2 (25 threads), P3 (5 threads), P4 (5 threads)
- **Category**: Orchestration

## Input Specification
- Multiple thread outputs (one per parallel thread)
- Audit recommendations and conflict resolution guidance
- Winner annotations from quality evaluation phase
- Known divergences and their decision status
- Reference baseline or ground truth (if available)

## Output Specification
Synthesized coherent document with embedded provenance metadata.
- Output must conform to: `schemas/tt24_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Provenance chain: thread_id → audit_decision → final_selection
- Divergence resolution log documenting all conflicts and decisions
- Source attribution for each major section

## Methodology
1. **Input Inventory**: Catalog all thread outputs and identify overlaps, gaps, and conflicts
2. **Audit Integration**: Apply audit recommendations to prioritize winning versions
3. **Divergence Classification**: Categorize unresolved divergences using decision tree:
   - Q1: Is this a factual ground truth issue? → RESOLVE-BEFORE-SYNTHESIS
   - Q2: Is there downstream dependency impact? → HALT and escalate
   - Q3: Is divergence framing only, not content? → DOCUMENT-ONLY
4. **Synthesis Assembly**: Merge winning sections; use provenance metadata to track source
5. **Conflict Resolution**: For remaining divergences, apply documented decision rules (audit guidance)
6. **Coherence Pass**: Ensure transitions between merged sections are smooth; verify internal references
7. **Provenance Logging**: Document every synthesis decision with audit trail
8. **Validation**: Verify no losing thread content was erroneously included

## Quality Criteria
- All audit recommendations successfully applied
- No unresolved divergences (all classified and documented)
- Provenance chain complete and traceable for every section
- Synthesized document reads coherently without seams
- No contradictions between merged sections
- Downstream reference integrity maintained

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
- AFR-001: Every factual claim requires a traceable source
- AFR-002: Never invent statistics, quotes, or regulatory citations
- AFR-003: When uncertain, flag as [NEEDS VERIFICATION]
- AFR-004: Cross-reference claims against Evidence Library
- AFR-005: Regulatory citations must reference specific statute sections
- AFR-006: Quote verification — fuzzy match ≥ 85% against source

## Anti-Patterns
- **Thread Bias**: Favoring one thread's perspective over audit recommendations
- **Divergence Avoidance**: Ignoring conflicts rather than classifying them
- **Provenance Loss**: Merging sections without tracking source attribution
- **Coherence Sacrifice**: Prioritizing individual thread integrity over document unity
- **Novel Content Injection**: Introducing synthesizer's own analysis or bridging content not in source threads

## Examples
See example outputs in `references/example_outputs/`

---
**Last Updated**: 2026-03-06 (v02_I validated - AFR canonical descriptions applied)
**Status**: Active
