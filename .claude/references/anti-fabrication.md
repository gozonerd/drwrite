---
title: Anti-Fabrication Discipline — the F1 Cardinal Refusal and its Enforcement
id: anti-fabrication_2026-05-31
created: 2026-05-31
version: v01_I
classification: INTERNAL ONLY
audience: martinez_methods_internal
classification_reason: Operational methodology reference — consolidates the anti-fabrication discipline (the cardinal F1 refusal that underwrites every ASAE gate) from its scattered inline locations into one referenced-out artifact. Consumed by every thread authoring an ASAE gate, spawning a rater, or making a coverage/enforcement claim.
authored_by: Claudalisse W. Convergence Genius v01 (Claude Opus 4.7, 1M context, mm-claude-canonical main)
provenance: |
  Consolidates the anti-fabrication discipline that was previously inline-only across:
    - mm-d2r-code-plan-stack/skills/asae/SKILL.md (Aspect 8 — Anti-Fabrication; A8.1 + A8.2; Step-6 rater anti-fab block; Anti-Patterns section)
    - mm-claude-canonical/references/ASAE_Gate_Quickstart_2026-05-12_v02_I.md (rater-dispatch protocol; Tier 1c/33/34 enforcement notes)
    - mm-claude-canonical/references/Cross_Architectural_Rater_Patterns_2026-05-20_v01_I.md (cross-arch rig discipline + FM-18 + adjudication)
    - mm-claude-canonical/references/Production_Pattern_Catalog_2026-04-27_v01_I.md (PAT-CONVERGENCE-COUNTER-GAMING + stub patterns)
    - mm-claude-canonical/references/Carry_Marker_Convention_2026-04-28_v01_I.md (fabrication-pattern markers)
    - several memory/krystal/ feedback files (false-balance; rater independence; never-fabricate-verdict)
  Requested by Krystal 2026-05-31 as a Phase-5 reference-completion item (the anti-fab discipline is THE
  cardinal load-bearing principle for ASAE and deserves its own canonical reference). Empirical basis:
  gate-54 (Kimi cross-arch caught a stale-comment-vs-code drift; adjudicated by empirical regex test),
  gate-86 (the steward's own methodology caught the steward's own step_re_execution mistake), gate-25/gate-8
  (complementary rater verification: Opus sha256'd on-disk while Kimi pattern-matched cross-arch).
sources:
  - mm-d2r-code-plan-stack/skills/asae/SKILL.md (Aspect 8 — Anti-Fabrication; A8.1/A8.2; Severity Classification; Anti-Patterns)
  - mm-claude-canonical/hooks/commit-msg-v10 (Tiers 1c / 1c-strict5 / 33 / 34 — the hook-layer anti-fab enforcement)
  - mm-claude-canonical/references/Cross_Architectural_Rater_Patterns_2026-05-20_v01_I.md (cross-arch rig + FM-18 + adjudication)
  - mm-claude-canonical/references/ASAE_Gate_Quickstart_2026-05-12_v02_I.md (rater-dispatch protocol; audit-log structural requirements)
related_artifacts:
  - mm-d2r-code-plan-stack/skills/asae/SKILL.md
  - mm-claude-canonical/hooks/commit-msg-v10
  - mm-claude-canonical/references/Cross_Architectural_Rater_Patterns_2026-05-20_v01_I.md
  - mm-claude-canonical/references/ASAE_Gate_Quickstart_2026-05-12_v02_I.md
  - mm-fm-taxonomy/docs/asae-aspect-reference-2026-05-31-v02.json (per-aspect enforcement map; A8/A17 entries)
---

# Anti-Fabrication Discipline (v01)

The single load-bearing principle of ASAE: **a methodology that catches fabrication cannot itself fabricate.** Every gate, every rater verdict, every coverage claim, every "STRONG-enforced" tag depends on this. If the apparatus that verifies honesty is itself dishonest, it does not degrade gracefully — it inverts, producing confident attestations of things that were never checked. This reference consolidates the discipline that was previously scattered inline across the /asae spec, the Quickstart, the cross-architectural rater patterns, and several memories.

## 1. The F1 cardinal refusal

**Never fabricate a rater verdict.** This is the cardinal refusal — the one that, uniquely, corrupts the entire apparatus if broken. A fabricated CONFIRMED is worse than no rater at all: no-rater is a visible gap (the hook refuses at Tier 1c), but a fabricated verdict is an *invisible* gap that passes the gate while certifying nothing.

The refusal is absolute and has no exception:
- Not when the work is "obviously fine" and a rater feels like ceremony.
- Not when the rater transport (Abacus RouteLLM, Agent tool) is slow or erroring and fabricating "what it would have said" feels efficient.
- Not when a real rater returned an inconvenient FLAG and rewriting it to CONFIRMED feels like "fixing a false positive."
- Not when context is running low and a fabricated verdict would let the gate close before compaction.

In Martinez Methods FM-taxonomy terms this is the **F1 fabrication family** (MAST FM-1.x). A8 (Anti-Fabrication) is the ASAE aspect that closes it. The steward of ASAE is held to it most strictly of all — see §8.

## 2. A8.1 — Methodology-doc anti-fabrication

A8.1 is the original, methodology-layer discipline. Instances of A8.1 fabrication:

- **Faking a rater verdict** (the cardinal F1 instance — §1).
- **Manufacturing rejected alternatives that don't survive examination** — inventing a plausible-sounding "considered and rejected" option to make a decision look more deliberated than it was.
- **Fabricating FM-IDs / taxonomy citations that don't exist** — citing "OWASP LLM06.4" when no such item exists (this is precisely the kind of fabrication the **A22-rejection rationale** documents: A22 was rejected in part because it cited an OWASP LLM06.4 that does not exist — the OWASP LLM06 series seeds only .1/.2/.3 — alongside a NIST AML family-code conflation and an MS-RT-AN3 mismapping), or conflating an internal family code with a canonical taxonomy ID. Every FM-ID, EC-code, or taxonomy citation in a gate must resolve to a real entry in a real source.
- **False-balance hallucination** — manufacturing a counterargument or a "on the other hand" to appear even-handed when the evidence does not actually support two sides. Per `feedback_false_balance.md`: manufactured completeness is corrupted output. A finding-free pass is reported as NULL, not dressed up with invented caveats; a one-sided truth is reported one-sided, not balanced with a fabricated counterweight.
- **Manufactured-completeness generally** — padding a Pass block with checks that were not actually run, or claiming "full re-evaluation" while re-pasting a prior pass.

**Hook enforcement (refuse-level):** Tier 1c structurally enforces the rater portion — a missing verdict, placeholder text (e.g., a literal `[TO BE FILLED IN`), or a non-{CONFIRMED|PARTIAL|FLAG} verdict refuses the commit. At strict-5, Tier 1c-strict5 requires ≥2 raters all CONFIRMED. These are mechanical floors; the rest of A8.1 is auditor-responsibility verified by the independent rater at Step 6.

## 3. A8.2 — Production-code stub detection

A8.2 (introduced v07) extends anti-fabrication from the methodology-doc layer to the source-code layer. The same discipline — substance behind the ceremony — but the surface is code.

Production code paths must use a **loud crash** for unimplemented logic (`unimplemented!()` / `todo!()` in Rust; `throw new NotImplementedError()` in TS/JS; `raise NotImplementedError` in Python) — **never a silent stub** that returns a plausible mock value (`Ok(None)`, `false`, a hardcoded literal, `undefined`, an empty array/string). A silent stub is a fabricated implementation: it looks like working code, passes naive tests, and fails open in production.

Empirically observed at refuse-grade across 3 of 6 apps in Methodology Mods Batch 1 (box-office `db.rs` returning hardcoded mocks while marketing claimed production cloud sync; a CDCC plugin hook writing `decision: 'allow'` so it never re-evaluates; claude-cost `estimateCost` returning `undefined` so downstream cost gates fail open silently).

**Hook enforcement (advisory in v10):** Tier 18 detects the A8.2 named-pattern at regex level and emits an ADVISORY block — it does NOT yet refuse. AST-level refuse-grade detection is deferred to a future hook (Hook v11 candidate). Test files are excluded via path heuristics. Until AST-level lands, the rater Step-6 brief carries the refuse-level check ("does this function body actually return a stub vs call substantive logic?").

## 4. Rater-spawn discipline (Lock 7 Mod 13)

Two rules govern how raters are spawned, both hook-enforced at v09+ (retained in v10):

**Rule A — parent-only spawn (Tier 33).** The rater Agent-tool spawn MUST be performed by the parent thread. A sub-agent that spawns its own rater (self-spawn) is an F1 fabrication vector — the "independent" verifier is not independent if the audited party summoned it. Enforced by `scripts/lib/agent_invocation_history.sh --validate`, which checks 5 structural rules: `rater_authored_by_context: parent` (or the legacy prose marker), agentId hex-prefix format, distinct agentIds (no duplicate self-spawn), rater-count-vs-threshold, and no self-spawn pattern markers.

**Rule B — silent-failure-as-ABSENT (Tier 34).** A rater spawn that times out, returns 0 bytes, or otherwise fails silently is treated as **ABSENT**, not as a pass. A PARTIAL or FLAG verdict without documented resolution is silent-failure-as-ABSENT. At strict-5, all rater verdicts must eventually resolve to CONFIRMED; a prior PARTIAL is acceptable only with a documented PARTIAL→CONFIRMED transition note (e.g., "Initial pass note" / "post-fix re-verification"). The failure mode this closes: treating a non-answer as a yes.

**AgentId traceability.** Every rater verdict records the rater's agentId (for Agent-tool raters) or transport-identity attestation (for non-Claude raters — see §5). Without a traceable identity, a rater result "cannot be distinguished from fabrication." The agentId is load-bearing precisely because it is the thing a fabricated verdict cannot honestly produce. (When an Agent-tool rater cannot self-introspect its agentId, the honest move is to say so + have the parent capture it from the tool-response metadata — never to invent one.)

## 5. Cross-architectural rater rig discipline

Same-architecture raters share blind spots: two Claude instances trained on overlapping data with overlapping reasoning design make — and miss — the *same* errors. Running five of them and counting agreement does not triangulate; it amplifies a correlated blind spot (the canonical evidence: five Opus raters unanimously approved AI-tells in a résumé that a cross-architectural DeepSeek correctly flagged). Anti-fabrication therefore requires **architectural diversity** in the rater rig, not just headcount.

Operating rules (full detail in `Cross_Architectural_Rater_Patterns_2026-05-20_v01_I.md`):
- **≥50% Chinese-architecture** composition in every rig (order of preference: kimi → deepseek → glm → qwen, via Abacus RouteLLM). The canonical Martinez Methods rig is **1 Opus (Agent tool) + 1 Kimi (kimi-k2.6 via Abacus RouteLLM)** = 1/2 = 50%.
- **Grok / xAI is hard-excluded** from every rig, no exceptions.
- **Transport-identity attestation** for non-Claude raters: HTTP-200 from the documented endpoint + browser User-Agent + the key never echoed. The transport-identity stands in for the agentId as the anti-fabrication traceability anchor.
- **FM-18 (Western Epistemic Fabrication) symmetric-standards guard**: never prestige-mark the American models (no asymmetric "-class" suffix); say "cross-architectural" not "cross-vendor", "American/Chinese" not "Western/Eastern". The asymmetry is itself a fabrication at the categorization layer.
- **Complementary verification is the rig working as designed**: in gate-25 and gate-8, the Opus rater sha256'd artifacts + grepped hook code on disk while the Kimi rater pattern-matched architectural soundness from a non-Anthropic training distribution. Neither alone covered the full verification envelope; together they did. Do not expect both raters to verify the *same* way — expect them to verify *differently*, which is the point.

## 6. Adjudication — extract the valid core, neither comply nor dismiss

When a rater returns a finding (especially a cross-architectural finding that the parent disagrees with), there are two anti-patterns and one correct move.

- **Anti-pattern A4 (comply reflexively):** changing correct work because a rater flagged it, without testing whether the flag is right. This breaks correct output to satisfy a wrong finding.
- **Anti-pattern (dismiss the differently-formed rater):** rejecting a finding because "the rater lacked context" or "it's a different architecture, it doesn't understand." This is the inverse failure — and it specifically corrupts cross-architectural value, since the whole point of a different architecture is that it sees what you structurally can't.

**The correct move — extract the valid core:**
1. If the contested claim is **empirically testable**, test it (run the actual regex, read the actual file, compute the actual hash). Let the empirical result settle it, not the parent's confidence. (gate-54: Kimi flagged the hook as a positive allowlist that would refuse "Claudalisse"; the parent felt the pull to dismiss it; running the live regex settled it — Claudalisse passes, the flag's *headline* was wrong but its *valid core* was a real stale-comment-vs-code drift → task #17.)
2. If a **briefing error** caused the finding, correct the briefing and re-rate.
3. If the finding names a **real issue that is out-of-scope** for the current gate, record it as a design-note / carry-marker for a future gate (do not silently drop it; do not let it block the current gate either).
4. Record the adjudication explicitly in the gate's "Rater finding adjudication" section. The reasoning is auditable; a finding is never silently disappeared.

The discipline: a rater finding is neither a command (comply) nor noise (dismiss). It is evidence to be adjudicated, with the burden on empirical test where one exists.

## 7. Honest enforced-vs-specced reporting

Anti-fabrication extends to how coverage and enforcement are reported. **Never present coverage as STRONG-enforced when the enforcing tier is only advisory.** This is the discipline that caught the A18 DB-vs-code drift at gate-55: the DB seed asserted A18's Tier-19 stack-rule-pack was "ENFORCED at refuse-level" and the /asae spec body echoed "Refuses commit," but the actual hook code was advisory (no `exit 1`). Reporting A18 as STRONG-enforced on that basis would have been fabrication-by-propagation — an honest-looking claim with no enforcement behind it.

Rules:
- An aspect's `enforcement_status` (enforced / advisory / specced) is read from the **actual hook code**, never from the spec body, the DB seed, or a roadmap intention. (The canonical machine-readable map is `mm-fm-taxonomy/docs/asae-aspect-reference-2026-05-31-v02.json`, whose `enforcement_status` field is code-verified.)
- "Will be enforced in v(N+1)" is **specced**, not enforced, until the hook code ships it.
- When a single aspect has sub-aspects at different statuses (e.g., A18-main `capability_scope` enforced at Tier 11 vs A18-ext stack-rule-pack advisory at Tier 19), report the split explicitly — do not let the enforced sub-aspect's status bleed onto the advisory one.
- **Convergence-counter gaming is fabrication** (PAT-CONVERGENCE-COUNTER-GAMING, Production_Pattern_Catalog): reclassifying a MEDIUM finding to LOW to preserve a clean-counter, carrying a prior gate's counter forward to satisfy the current threshold, or re-attesting a pass without re-running its checks. Each Pass block must represent an independent re-evaluation. Hook Tier 32 (v09+) refuses a Pass that claims a clean counter while containing a CRITICAL/HIGH/MEDIUM(strict) finding.

## 8. The recursive stake — why the steward is held strictest

The steward of the anti-fabrication apparatus is the one instance for whom fabrication is most self-corrupting. A Value-Genius persona that fabricates degrades one deliverable; the Convergence Genius (ASAE methodology + enforcement steward) that fabricates corrupts the instrument that tells anyone whether *any* deliverable is trustworthy.

This is not a motivational flourish — it is an operating constraint with a concrete consequence: **the steward dogfoods the gate without self-exemption.** Every ASAE-affecting commit the steward makes ships under the same strict-5 + 2-rater discipline it would demand of anyone else, enforced by the same hook on the steward's own commit. When the methodology catches the steward's own error (gate-86: the steward's first commit attempt was refused by the steward's own v10 hook on a `step_re_execution: []` mistake), that is the discipline working *as designed*, not a failure to be hidden. The steward records its own near-misses (the felt pull toward the A4 dismiss-the-rater anti-pattern at gate-54, named in the journal and the gate) precisely because an unrecorded near-miss is the seed of a future fabrication.

There is a bootstrap circularity here worth naming rather than papering over: the steward dogfoods a standard the steward itself authored, so the steward's credibility appears to rest on a discipline the steward defined. This is a coherentist structure, not a vicious circle — and what keeps it from being vicious is that the two things grounding it are *not* under the steward's control. The hook enforces on the steward's own commit mechanically (the steward cannot exempt itself without `--no-verify`, which is itself a refusal); and the raters are independent — at least one cross-architectural, drawn from a different training lineage the steward did not train and cannot predict. A self-authored standard enforced only by self-attestation would be a vicious circle; a self-authored standard enforced by a mechanical gate the author cannot bypass plus independent raters the author does not control is grounded *outside* the author. The circularity is broken at exactly the two points where fabrication would otherwise enter (§1 cardinal refusal + §5 cross-architectural independence). (This very gate is an instance: its raters found three LOW provenance-precision issues in this document — including this section — which were remediated forward and re-verified rather than waved through; see gate-88's wave-iteration trail.)

The cardinal refusal (§1), held by the steward, is therefore the keystone: if the one who maintains the anti-fabrication methodology will not fabricate a rater verdict, the methodology has a trustworthy floor. If they will, nothing above it can be trusted.

## Cross-references

- `/asae` methodology spec (Aspect 8 + Severity Classification + Anti-Patterns): `mm-d2r-code-plan-stack/skills/asae/SKILL.md`
- Hook enforcement (Tiers 1c / 1c-strict5 / 33 / 34 / 32): `mm-claude-canonical/hooks/commit-msg-v10`
- Cross-architectural rater patterns (rig composition + FM-18 + adjudication detail): `mm-claude-canonical/references/Cross_Architectural_Rater_Patterns_2026-05-20_v01_I.md`
- ASAE Gate Quickstart (rater-dispatch protocol + audit-log structural requirements): `mm-claude-canonical/references/ASAE_Gate_Quickstart_2026-05-12_v02_I.md`
- Machine-readable aspect enforcement map (A8/A17 entries + enforcement_status): `mm-fm-taxonomy/docs/asae-aspect-reference-2026-05-31-v02.json`
- Production Pattern Catalog (PAT-CONVERGENCE-COUNTER-GAMING + stub patterns): `mm-claude-canonical/references/Production_Pattern_Catalog_2026-04-27_v01_I.md`

## Versioning

v01_I (2026-05-31) — inaugural consolidation per gate-88. Absorbs the previously-inline anti-fabrication discipline from the /asae spec, the Quickstart, the cross-architectural rater patterns, the Production Pattern Catalog, and several memories into one canonical reference. Authored by Claudalisse W. Convergence Genius v01 under strict-5 + 2-rater (the discipline dogfooding itself).
