---
name: FIXES — Canonical Branded Term for the Methodology's Failure-Mode Output
description: FIXES is the branded term replacing solution/prevention/remediation/mitigation/intervention etc. when referring to what the methodology produces against named failure modes. Use FIXES consistently in product copy, marketing, internal docs, and skill specs.
type: feedback
established: 2026-04-26
established_by_session: claude-code-cold-read-2026-04-25
---

## The Term

**FIXES** (capitalized, plural-form-default) — the canonical Martinez Methods branded term for what the methodology produces against named AI failure modes.

Singular form: **a FIX**.
Plural form: **FIXES**.
Verb form: **to FIX** (a failure mode).

## What FIXES Replaces

| Generic term | Use FIXES instead |
|--------------|---------------------|
| solution | a FIX |
| prevention | FIXES (or "preventive FIXES" if needing the prevention-axis distinction) |
| remediation | FIXES (or "remediative FIXES" if needing the recovery-axis distinction) |
| mitigation | FIXES |
| intervention | FIXES |
| corrective action | a FIX |
| safeguard | a FIX |
| control (as in "AI control") | a FIX |
| countermeasure | a FIX |

The branded term unifies prevention-axis and recovery-axis outputs under one consumer-legible noun. Customers buy FIXES (plural). Bundles produce FIXES. Aspects govern FIXES. ASAE attests FIXES.

## Where to Use FIXES

- **Product copy** (landing pages, sales decks, brochures, audit packets): always FIXES; never the generic synonyms.
- **Skill specs** (SKILL.md, role manifests, hook docs): FIXES preferred; legacy generic terms acceptable in technical clauses where regulatory text mandates specific terminology (e.g., NIST RMF "controls").
- **Bundle docs** (PRD/TRD/AVD/TQCD/UXD): FIXES in user-facing prose; technical-precise generic terms acceptable in low-level spec clauses.
- **Internal communications + memos**: FIXES.
- **Code comments + commit messages**: FIXES preferred.

## Where Generic Terms Are Acceptable

- Direct quotation of regulatory text (NIST RMF "control", EU AI Act "measure", ISO 42001 "risk treatment")
- Cross-mapping tables to external taxonomies (where the external taxonomy uses its own term)
- Academic citations
- Historical context within deprecated docs

## When TO Translate Generic → FIXES

When authoring or re-authoring docs:
1. Identify generic term in context
2. Determine if context is product-copy / skill-spec / bundle / internal (use FIXES) OR regulatory / academic / historical (keep generic)
3. Replace with FIXES if appropriate
4. Add cross-mapping note ONCE in the doc if the regulatory term needs alignment ("NIST RMF 'controls' map to FIXES in the methodology layer; we use FIXES because...")

## Anti-patterns

- **Diluting with synonyms in product copy** ("FIXES, solutions, and remediations" — pick FIXES, drop the synonyms)
- **Inverting** ("solutions" in user-facing copy when FIXES is canonical)
- **Acronym-substitution** (don't invent "F.I.X.E.S." acronym; FIXES stands as the branded noun, not an initialism)

## Connection to other rules

- Composes with `feedback_ip_language.md` (Martinez Methods naming discipline).
- Composes with `feedback_clauda_replaces_claude_in_naming.md` (branded-term-substitution pattern).

**Why:** User explicit directive 2026-04-26 (verbatim): "expanded asae hook governeed ai failure mode FIXES (branded term for solution/prevention/remediation etc)"
**How to apply:** Whenever about to write solution/prevention/remediation/mitigation/intervention/corrective-action/safeguard/control/countermeasure in product, skill, bundle, internal, or commit context — write FIXES instead unless one of the regulatory/academic/historical exceptions applies.
