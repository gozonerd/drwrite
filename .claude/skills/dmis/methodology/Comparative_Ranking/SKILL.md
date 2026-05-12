---
title: "Comparative Ranking Methodology"
skill_id: "SK-M02"
version: v02_I
date: 2026-03-06
owner: Martinez Methods
---

# Comparative Ranking Methodology

## Purpose
Quality optimization through competitive selection. Generate multiple outputs from different prompt variants, rank them against quality criteria, and select the strongest output for downstream use.

## When to Use
- Thread generation phase where prompt variation is the diversity strategy
- Multiple valid approaches exist for the same task
- Quality criteria are well-defined enough for comparative scoring

## Procedure
1. Design N prompt variants (N = thread count per pipeline: P1=15, P2=25, P3=5, P4=5)
2. Execute all variants as parallel subagent invocations
3. Collect all outputs and validate each against the output schema
4. Score each output against quality criteria from the task-type SKILL.md
5. Rank outputs by composite quality score
6. Select top performer as primary thread for synthesis
7. Identify unique strengths from lower-ranked outputs for potential patch contributions
8. Document ranking rationale and scores in convergence audit input

## Constraints
- Prompt variants must differ meaningfully (not trivial rephrasing)
- Thread diversity is achieved through prompt variation, not model diversity (Kimi-native architecture)
- All variants must receive identical input documents and context
- Ranking criteria must be predefined before execution, not post-hoc

## Anti-Patterns
- Creating near-identical prompt variants that produce redundant outputs
- Post-hoc adjustment of ranking criteria to favor a preferred output
- Ignoring unique contributions from lower-ranked outputs
- Not documenting the specific variation strategy used for each prompt
