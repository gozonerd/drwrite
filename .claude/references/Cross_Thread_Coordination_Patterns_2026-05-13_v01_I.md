---
title: Cross-Thread Coordination Patterns
id: Cross_Thread_Coordination_Patterns_2026-05-13
created: 2026-05-13
version: v01_I
classification: INTERNAL ONLY
audience: martinez_methods_internal
classification_reason: Methodology reference for cross-thread coordination patterns that emerged empirically from parallel-worktree work. Codifies two patterns (pairwise-gate, cross-persona-empirical-author) at top-level surface discoverability rather than embedded inside the ASAE Quickstart, per Clauda W. Reliability Compositor v02's 2026-05-13 recommendation.
authored_by: Claudessa W. Serene Knuth v01 (Claude Opus 4.7, 1M context, mm-claude-canonical worktree frosty-torvalds-6b06b0)
provenance: Recommendation from Clauda W. Reliability Compositor v02's ratification of ASAE Quickstart v05_I absorption (gate-33 strict-5 + 2-rater PASS, 2026-05-13). The Reliability Compositor argued — and I concur — that these patterns deserve dedicated reference-surface visibility rather than embedded codification inside one section of the Quickstart. Krystal's 2026-05-13 redirect explicitly authorized cross-persona authoring under the 3-condition check (empirical author + Krystal-explicit-direction + scope-overlap).
sources:
  - mm-thread-archive/deprecated/asae-logs/gate-01-mm-thread-archive-inaugural-import-2026-05-12.md (paired-gate evidence; pairs with gate-29 in canonical)
  - deprecated/asae-logs/gate-28-claudessa-serene-knuth-role-definition-2026-05-12.md (Claudessa persona inaugural; example of cross-persona empirical authoring)
  - deprecated/asae-logs/gate-29-canonical-registry-mm-thread-archive-2026-05-12.md (paired-gate companion to mm-thread-archive gate-01)
  - deprecated/asae-logs/gate-33-asae-quickstart-v05-absorption-2026-05-13.md (cross-persona empirical authoring of ASAE Quickstart v05_I by Claudessa instead of Spec Genius)
  - references/ASAE_Gate_Quickstart_2026-05-12_v02_I.md (v05_I body; inline codifications of both patterns; this reference doc promotes them to top-level surface)
related_artifacts:
  - references/ASAE_Gate_Quickstart_2026-05-12_v02_I.md (v05_I) — pattern 1 (pairwise-gate) is also documented in the "Independent rater spawn" section; pattern 2 (cross-persona-empirical-author) is documented in `disclosures.deviations_from_canonical` blocks. This reference doc is the canonical surface for both patterns.
  - references/Persona_Design_Entry_Point_2026-04-28_v01_I.md (persona design context; cross-persona-empirical-author pattern is an authorized exception to persona-scope-only authoring)
  - memory/krystal/feedback_clauda_replaces_claude_in_naming.md (four-name canon; persona-family prefixes referenced here)
---

# Cross-Thread Coordination Patterns

Two empirically-derived patterns for coordinating work across parallel Martinez Methods threads operating on the same canonical infrastructure (mm-claude-canonical) and/or sibling repos (mm-thread-archive, _grand_repo, consumer repos).

Both patterns emerged from the 2026-05-12 → 2026-05-13 cross-thread coordination episode in which 3+ concurrent threads (Claudessa W. Serene Knuth v01 / Clauda W. Reliability Compositor v02 / Repo Wrangler stoic-newton-3edf8a / Path B Skills-root-canonicalization thread) modified canonical infrastructure with overlapping scope. The patterns are descriptive (capturing what worked) and prescriptive (recommending future application).

## Pattern 1: Pairwise-gate

### When it applies

A single change spans **two repos** (a parent repo and a sibling), and:

- The change is logically one unit of work (e.g., creating content in repo A and registering it in repo B's canonical index)
- A single 2-rater audit is the appropriate scope (it would be wasteful to spawn 4 raters total, 2 per repo)
- Each repo has its own `.asae-policy` and its own per-repo gate-audit-log directory

The typical shape: **repo A contains the substantive content; repo B contains the lightweight companion change** (e.g., registry entry, propagation list update, schema reference).

### Structural shape

**Each repo's gate doc holds the full verbatim rater verdict content.** Cross-references via `session_chain.paired-gate` frontmatter entries point at the sibling gate, but the rater content itself MUST be duplicated verbatim in both gates because:

1. The commit-msg hook in each repo enforces Tier 1c regex on its own gate doc — requires literal `**Rater verdict:** CONFIRMED|PARTIAL|FLAG` field labels on the same line, NOT prose like "verdict captured in gate-X; final result CONFIRMED."
2. Future audits of either commit must verify rater verdicts WITHOUT reaching into the sibling repo. Cross-repo verification chains are fragile (sibling repo may be archived, renamed, access-restricted).
3. The duplication is auditing-traceability infrastructure, not redundancy waste. The hook intentionally does not chase cross-repo references.

### Concrete example (inaugural archival run, 2026-05-12)

Cross-repo change: archive 1002 Claude transcripts into a new private repo `Martinez-Methods/mm-thread-archive`, then register that repo in canonical SSOT propagation.

- **`mm-thread-archive` gate-01** (`deprecated/asae-logs/gate-01-mm-thread-archive-inaugural-import-2026-05-12.md`) — the substantive content gate: 1002-transcript archival, 5 import branches, tag, scaffold. Holds full verbatim rater content (Wave A/B/C audit history; 4 distinct rater agentIds).
- **`mm-claude-canonical` gate-29** (`deprecated/asae-logs/gate-29-canonical-registry-mm-thread-archive-2026-05-12.md`) — the companion gate: single YAML entry append to `propagation/registry.yaml`. Holds the SAME verbatim rater content (the 2 raters audited BOTH repo's deliverables in one brief; verdicts apply to both).

Each gate's `session_chain` has a `kind: paired-gate` entry pointing at the sibling:

```yaml
session_chain:
  - kind: paired-gate
    path: <sibling-repo>/deprecated/asae-logs/gate-XX-...md
    relation: paired-gate (covers the [scope]; shares the 2-rater audit verdicts)
```

### Anti-pattern (refused by hook)

Compressing the sibling gate's rater section to cross-reference prose:

```markdown
## Independent Rater Verification — Rater 1

The audit history is shared with gate-01. Final verdict CONFIRMED 5/5.
Rater agentId: ad033bc4417bdc3dd. See gate-01 for the full verdict content.
```

This was the initial author-error for gate-29; the hook rejected with *"Independent Rater Verification section missing verdict. Verdict must be CONFIRMED, PARTIAL, or FLAG per spec Step 6."* The fix is to duplicate the entire 6-field structure (Subagent type / Brief / Verdict / Per-item findings / Honest gaps / agentId) in both gate docs.

### Commit ordering

When paired gates exist, commit and merge in **content-first order**:

1. The repo with the substantive content (e.g., mm-thread-archive) commits + merges to its main first
2. The companion repo (e.g., mm-claude-canonical with the registry entry) commits + merges second
3. The companion's gate doc can then reference the substantive repo's commit SHA as a stable anchor

Reverse order is possible but creates a registry-points-at-nothing window between the two merges.

## Pattern 2: Cross-persona-empirical-author

### When it applies

A canonical methodology artifact (e.g., a reference doc in `references/`, an updated skill, a memory rule) needs authoring or amendment, AND:

- The artifact's natural authoring scope is persona X (typically Clauda the Spec Genius for the ASAE Quickstart, Calibration Inevitability for /asae rebuild, etc.)
- BUT the empirical evidence driving the amendment came from persona Y's work in a different scope (e.g., Claudessa's inaugural archival run produced the rejection-by-rejection learnings that drive a Quickstart amendment)
- AND deferring to persona X creates non-trivial cost (blocks other threads, risks evidence loss, latency exceeds operational tolerance)

The natural authoring path **violates persona scope_bounds in a constrained way**: persona Y authors an artifact that persona X normally owns, with explicit disclosure and a path back to persona X for v(N+1).

### 3-condition check

Cross-persona-empirical-author is **authorized** when ALL THREE conditions hold:

1. **(a) Empirical author**: persona Y is the persona that produced the empirical evidence the amendment encodes. Y is the natural author from an evidence-fidelity perspective even if X is the canonical-scope author.
2. **(b) Non-trivial deferral cost**: deferring to persona X has a real cost beyond latency. Examples: blocking another thread, evidence loss between Y's work and X's scheduled absorption, operational urgency.
3. **(c) Scope-overlap**: persona Y's manifest has some legitimate overlap with the artifact's scope, even if not the full canonical-author overlap X has. (Pure-violation-of-scope is not authorized via this pattern; that requires Krystal-explicit direct override.)

If any of (a)/(b)/(c) fails, defer to persona X. If (a)+(b) hold but (c) fails, surface to Krystal as an explicit cross-scope-authority request before proceeding.

### Required disclosures when used

The cross-persona authoring **MUST** disclose:

1. In the gate doc's `disclosures.deviations_from_canonical` block — explicit statement of the cross-persona authoring + the 3-condition rationale for (a)/(b)/(c) + the future-v(N+1) return-to-canonical-author plan.
2. In the authored artifact's `authored_by` frontmatter — both personas listed (the canonical scope author for prior versions + the cross-persona empirical author for the new version), so future readers see the lineage clearly.
3. In the artifact's `provenance` field — the empirical-evidence chain explaining WHY Y authored Z.

### Concrete example (ASAE Quickstart v05_I, 2026-05-13)

- **Canonical-scope author for ASAE Quickstart**: Clauda the Spec Genius v01 (per Batch 3 Lock A1).
- **Empirical evidence for v05_I additions**: Claudessa W. Serene Knuth v01's inaugural archival run rejection-by-rejection learnings (gate-28 Pass-N H2 hook rejection; gate-29 paired-gate verbatim hook rejection; etc.).
- **3-condition check at gate-33 time**:
  - (a) Empirical author: ✓ — Claudessa hit the rejections
  - (b) Non-trivial deferral cost: ✓ — Clauda W. Reliability Compositor v02 was blocked behind v05_I landing for their own gate-29a + gate-29b strict-5 attestations to use the updated format
  - (c) Scope-overlap: ✓ (moderate) — Claudessa's persona-manifest authorizes `author_research_corpus` + canonical-SSOT propagation per the inaugural archival run; methodology-reference authoring is adjacent (not core) scope
- **Disclosure**: gate-33's `disclosures.deviations_from_canonical` block 1 + the v05_I `authored_by` field extension + the provenance field updates all surface the cross-persona authoring explicitly.
- **Future return to canonical author**: v06_I+ authorship returns to Spec Genius scope by default.

### Anti-pattern (unauthorized cross-persona)

If persona Y just decides to author canonical Z because Y feels like it (no empirical-evidence driver, no deferral-cost rationale, no scope-overlap), Y is going around persona-scope discipline. The 3-condition check exists to prevent persona-scope sprawl while permitting genuine cross-persona empirical authorship.

### Krystal-explicit override

The 3-condition check is the **default** authorization mechanism. Krystal may override (positively or negatively) any time:

- **Positive override**: Krystal explicitly directs persona Y to author Z. Authorization granted regardless of 3-condition check outcome. Example: Krystal's 2026-05-13 directive "take care of AS MUCH as possible for me; don't defer or put ANYTHING onto me" authorized v05_I + this codification doc as cross-persona authoring.
- **Negative override**: Krystal explicitly directs persona Y NOT to author Z (e.g., she wants persona X's eyes on it). 3-condition check is moot.

When Krystal-explicit override is active, the gate doc's `deviations_from_canonical` cites her directive verbatim as the authorization basis.

## When both patterns combine

The 2026-05-13 cross-thread coordination episode exemplified BOTH patterns simultaneously:

- **Pattern 1 (pairwise-gate)**: gate-01 (mm-thread-archive) ↔ gate-29 (mm-claude-canonical) for the inaugural archival registration
- **Pattern 2 (cross-persona-empirical-author)**: Claudessa (research persona) authoring ASAE Quickstart v05_I (Spec Genius scope) under Krystal-explicit override + 3-condition check satisfaction

These patterns compose: the pairwise-gate pattern enables cross-repo coordination at the gate-audit layer; the cross-persona pattern enables cross-scope authorship at the artifact-author layer. Both can apply to a single change unit without conflict.

## Honest gaps

1. **Sample size**: both patterns are codified from a single coordination episode (2026-05-12 → 2026-05-13). Pattern stability across many future episodes is unobserved. v02_I+ amendments should fold in additional empirical evidence as it accumulates.

2. **3-condition check is heuristic, not formally derived**. The (a)/(b)/(c) conditions came from reasoning-after-the-fact on the v05_I cross-persona authoring; they have not been adversarially-reviewed for completeness. A condition (d) might exist (e.g., "persona Y has the operational authority to make the artifact-shape decisions the absorption requires"). Future amendments should refine the check based on empirical use.

3. **Pattern 1's commit-ordering recommendation** assumes the pair is two repos. Multi-repo paired-gates (3+ repos sharing one audit) are not addressed; the pattern would generalize but the specific commit-ordering rules need extension.

4. **Pattern 2's 3-condition check (c) — scope-overlap — is the fuzziest condition**. Determining whether persona Y has "legitimate overlap" with artifact Z's scope requires judgment about the persona's role-manifest `allowed_paths` and `allowed_operations` against the artifact's authoring requirements. Future amendments should provide examples of scope-overlap calls that crossed the bar vs ones that didn't.

5. **Cross-persona pattern interacts with the four-name naming canon** (per `feedback_clauda_replaces_claude_in_naming.md`). For example, a Claudessa-family persona authoring a Claudette-family persona's canonical artifact under the cross-persona pattern is *more* scope-distant than two Claudette-family personas cross-authoring. The 3-condition check doesn't currently encode this distance metric.

6. **Codification doc itself was cross-persona-authored**: this very reference doc is authored by Claudessa under cross-persona pattern application (the canonical-scope author for methodology references is more naturally Spec Genius). The 3-condition check that authorizes my authorship is documented above; the recursive nature of "using the pattern to author the pattern's codification" is noted here for transparency. If a future v02_I author is Spec Genius, the cross-persona footnote naturally migrates to the changelog as Krystal-directive provenance.

7. **Pattern 1 hook-tier coupling**: the verbatim-not-cross-reference requirement is enforced by commit-msg hook v05+ Tier 1c. Future hook versions might relax (e.g., recognize `kind: paired-gate` cross-references as valid alternatives to verbatim duplication). If that hook evolution lands, this pattern's "MUST duplicate verbatim" prescription becomes "MAY duplicate verbatim or use kind:paired-gate equivalence."

## Cross-references

- ASAE Gate Quickstart v05_I body (`references/ASAE_Gate_Quickstart_2026-05-12_v02_I.md`) — both patterns are also documented inline in the Quickstart; this reference doc is the canonical top-level surface
- gate-33 (`deprecated/asae-logs/gate-33-asae-quickstart-v05-absorption-2026-05-13.md`) — the cross-persona-empirical-author worked example with full 3-condition disclosure
- gate-01 (mm-thread-archive `deprecated/asae-logs/gate-01-mm-thread-archive-inaugural-import-2026-05-12.md`) — the pairwise-gate worked example, content-side
- gate-29 (mm-claude-canonical `deprecated/asae-logs/gate-29-canonical-registry-mm-thread-archive-2026-05-12.md`) — the pairwise-gate worked example, companion-side
- gate-28 (mm-claude-canonical `deprecated/asae-logs/gate-28-claudessa-serene-knuth-role-definition-2026-05-12.md`) — the Claudessa persona inaugural lock-in (the empirical-author persona that drives the cross-persona examples)
- Persona Design Entry Point (`references/Persona_Design_Entry_Point_2026-04-28_v01_I.md`) — persona design context the cross-persona pattern operates within

## Versioning

v01_I (2026-05-13) — inaugural authoring. Two patterns codified from the 2026-05-12 → 2026-05-13 cross-thread coordination episode. Authored by Claudessa W. Serene Knuth v01 under cross-persona-empirical-author pattern (Krystal-explicit override 2026-05-13 + 3-condition check ✓).

Future v02_I+:
- Additional empirical episodes as they accumulate
- Refinements to the 3-condition check based on real use
- Adversarial review of the pattern formalizations
- Extension to multi-repo (3+) paired-gate cases
- Potential migration of this doc's authorship back to Spec Genius scope at v02_I if Krystal directs
