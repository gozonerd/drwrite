---
title: "Progressive Complexity Methodology"
skill_id: "SK-M03"
version: v02_I
date: 2026-03-06
owner: Martinez Methods
---

# Progressive Complexity Methodology

## Purpose
Structured approach to complex task execution through layered complexity. Start with the simplest correct version, then progressively add nuance, domain specifics, and edge case handling.

## When to Use
- Complex generation tasks where attempting full complexity upfront risks incoherence
- Tasks spanning multiple domains or jurisdictions (e.g., regulatory content across SMU, SMZ, SMG, SM-US)
- Outline generation or structural tasks where hierarchy must be established before detail

## Procedure
1. **Layer 1 — Core Structure**: Generate the simplest correct output addressing only primary requirements
2. **Layer 2 — Domain Detail**: Enrich with domain-specific content, office-specific attributions (ACC-004), regulatory citations
3. **Layer 3 — Cross-References**: Add cross-document references, upstream traceability, provenance markers
4. **Layer 4 — Edge Cases**: Address exceptions, caveats, jurisdictional variations, alternative scenarios
5. **Layer 5 — Quality Polish**: Final pass for terminology consistency (ACC-005, ACC-006), tone, formatting
6. Validate final output against the full output schema
7. Document which layers were applied and any layers skipped with justification

## Constraints
- Each layer must produce a valid (though incomplete) output
- Layer ordering must not be reversed (core before detail, detail before edge cases)
- Skipping layers requires explicit justification in the writing log
- All 9 accuracy rules apply at every layer, not just the final output

## Anti-Patterns
- Attempting full complexity at Layer 1 (defeats the purpose)
- Adding edge cases before core structure is validated
- Skipping the cross-reference layer (Layer 3) to save time
- Treating layers as optional rather than progressive requirements
