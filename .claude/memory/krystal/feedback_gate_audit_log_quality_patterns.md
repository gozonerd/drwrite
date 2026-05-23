---
name: Gate audit log quality patterns — honest synthesis of gate-25 + gate-26
description: When authoring ASAE gate audit logs at strict-5+, synthesize the genuine strengths of gate-25 (rich rater process + rich frontmatter disclosure depth) with the genuine strengths of gate-26 (tabular finding format + passes that cite different concrete evidence). Both prior gates have strengths AND limitations; do not treat either as pure exemplar or pure anti-pattern. The rotating-focus pass pattern is a NEW proposed synthesis, not yet demonstrated.
type: feedback
originSessionId: stoic-newton-3edf8a-2026-05-12
user: krystal
---

**When authoring an ASAE gate audit log at strict-5 or higher**, draw on the genuine strengths of both gate-25 and gate-26 from 2026-05-12. Neither gate is pure exemplar or pure anti-pattern.

This rule was authored with Wave A audit feedback in gate-28 that surfaced polarity-reversal errors in an earlier draft. The corrected version below reflects what each gate actually demonstrates per ground-truth file inspection.

## Gate-25 (Claudolina W. Standpoint Witness) — genuine strengths

`deprecated/asae-logs/gate-25-methodology-backlog-canonical-move-2026-05-12.md`

1. **Rich rater process.** Both raters exercised the tool palette (Read, Grep, PowerShell/Bash, WebSearch) across 15+ tool calls each, with distinct tool-use patterns per rater. The raters produced GENUINELY distinct verification work — not just different writing of the same desk-check.

2. **Rich frontmatter disclosure structure.** Five sub-blocks under `disclosures`: `known_issues` with per-item severity+mitigation, `deviations_from_canonical` with per-deviation rationale, `omissions_with_reason` with per-omission defer-to, `partial_completions` with intended/completed/remaining, plus a `none` flag. Each block has structured sub-fields, not just bullet points.

3. **Numbered-prose finding format for raters.** Each rater finding is a numbered paragraph with extended citations (e.g., `1. **content_accuracy: CONFIRMED** — All three MB entries trace to verifiable sources. MB-001: Audra Simpson 2014 *Mohawk Interruptus* ...`). High citation density per finding.

4. **Explicit rater attribution.** Each rater section opens with "Two real Agent-tool subagent raters were spawned in parallel..." — explicit spawn-mechanism disclosure.

## Gate-25 limitation

**Primary-auditor Passes 2-5 are wording-variant re-statements.** Passes 2-5 use phrases like "second independent verification", "third independent verification", etc. — content per pass is nearly identical to Pass 1, just relabeled. This is HONESTLY DISCLOSED (header literally says "identical to Pass 1") so it's not a deception, but it's also not 5 rounds of new evidence-gathering. The discipline is "5 NULL CLEAN re-statements" rather than "5 angles of fresh inspection".

## Gate-26 (Clauda the Spec Genius v01 self-attestation) — genuine strengths

`deprecated/asae-logs/gate-26-quickstart-v04-amendments-2026-05-12.md`

1. **Tabular finding format for raters.** Each rater finding uses a structured table: `| # | Item | Result |` with PASS/severity verdict per item. Easier to scan; consistent column structure across both raters.

2. **More disclosure sub-blocks than gate-25.** Eight sub-blocks: `compliance_claims`, `shipping_attestation`, `coverage_mutation_scope`, `known_issues`, `deviations_from_canonical`, `omissions_with_reason`, `partial_completions`, `none`. Richer auditable surface.

3. **Pass blocks cite different concrete evidence per pass.** Pass 2 cites Wave 0 §1.1-1.8 mapping; Pass 3 cites Sonnet advisory in rater spawn section; Pass 4 cites concurrency cap; Pass 5 cites forward-only-backfill. These are NOT pure wording variants — each pass anchors to a different audit-scope section.

4. **Rater honest gaps differ substantively.** R1: cross-repo paths, SSOT-wrangler identifier, Methodology_Mods_Batch3_Handoff, Production_Pattern_Catalog. R2: byte-for-byte diff, Wave 0 cross-check, hook contents, Eleven-vs-8 discrepancy. Different angles surfaced different gaps.

## Gate-26 limitation

Frontmatter `disclosures` blocks are present but some have brief content; the rater briefs do not appear to have explicitly required distinct-angle assignments (raters' angle distinction was emergent, not directed).

## Operational synthesis for future gates

When authoring a strict-5 gate audit log, combine the strengths of both:

1. **Frontmatter disclosure depth.** Match or exceed gate-25's 5-block depth (known_issues + severity+mitigation, deviations_from_canonical, omissions_with_reason, partial_completions, none) and consider gate-26's additional blocks (compliance_claims, shipping_attestation, coverage_mutation_scope) when scope warrants.

2. **Pass block evidence-citation.** Follow gate-26's pattern: each pass should anchor to a different audit-scope section or concrete evidence, NOT 5 wording-variant re-statements. Suggested rotation (PROPOSED — not yet demonstrated in any prior gate):
   - Pass 1: Full checklist evaluation against audit scope
   - Pass 2: Cross-file consistency check (do all touched files agree?)
   - Pass 3: Anti-fabrication risk audit (any claims that don't trace to evidence?)
   - Pass 4: Schema conformance check (frontmatter, structure, cross-references)
   - Pass 5: Final confirmation, threshold reached

   This rotating-focus pattern is a NEW PROPOSED synthesis. Gate-28 is the first gate to attempt demonstration. Refine based on what works.

3. **Rater finding format.** Use tabular per-item findings (gate-26 pattern) for scannability. Reserve numbered-prose extended-citation style (gate-25 pattern) for findings that require multi-sentence justification — combine the two: tabular structure with citation-dense "Result" cells.

4. **Brief raters with DISTINCT-ANGLE assignments explicitly.** Don't rely on emergent independence. Example: "Rater 1: audit content correctness + cross-file consistency. Rater 2: audit anti-fabrication discipline + schema conformance. Each rater must surface at least one honest gap the other rater would NOT see." This forces genuine independence at the brief level.

5. **Rich rater process.** Brief raters to USE tools (Read, Grep, Bash, WebSearch) — not just desk-check writing. Gate-25's R1 made 15+ tool calls; that's the bar for genuinely independent verification.

6. **Audit waves table + Rater IDs section + Honest disclosures section.** Required structural elements. Match gate-25 + gate-26 combined depth.

## Why this matters

A gate audit log full of wording-variant pass blocks reads as effort but actually demonstrates the opposite: that the author was generating filler to satisfy hook validation rather than running 5 genuine evaluations. A gate audit log with prose-vs-table asymmetry between raters reads as inconsistent. A gate audit log with overlapping rater honest gaps reads as raters parroting each other rather than verifying independently.

Future readers (auditors, future Claude instances, Krystal) need to trust that "5 NULL CLEAN passes" + "2 raters CONFIRMED" actually means 5 genuine evaluations + 2 genuinely independent rater verifications. The synthesis above is the proposed discipline for getting there.

## Self-correction note

This rule's first draft (overwritten by this version 2026-05-12 in gate-28 Wave B) made polarity-reversed claims about gate-25 vs gate-26 (claimed gate-25 had tabular findings — actually prose; claimed gate-26 had simpler frontmatter — actually richer; claimed gate-26 passes were paraphrases — actually concrete-evidence-cited). Both raters caught this in Wave A. The Wave B rewrite uses ground-truth file inspection to characterize each gate accurately. Lesson: empirical comparison required before authoring exemplar/anti-pattern claims; do not rely on remembered impressions.
