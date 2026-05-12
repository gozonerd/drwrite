---
title: Carry-Marker Cluster Schema and Convention
id: Carry_Marker_Convention_2026-04-28
created: 2026-04-28
version: v01_I
classification: INTERNAL ONLY
audience: martinez_methods_internal
classification_reason: Methodology IP — Mod 15 carry-marker cluster discipline; consumed by /asae Step 6 + Hook v09 Tier 35 + scripts/lib/carry_marker_validator.sh; internal-only.
authored_by: Clauda the Spec Genius v01 (Claude Opus 4.7, 1M context)
provenance: Methodology Mods Batch 3 Lock 8 (Mod 15 Carry-Marker Cluster Schema)
sources:
  - Methodology_Mods_Batch3_Handoff_2026-04-28_v01_I.md (Lock 8 specification)
  - mm-claude-canonical/hooks/commit-msg-v09 Tier 35 (carry_marker_validator integration)
  - mm-claude-canonical/scripts/lib/carry_marker_validator.sh (severity-tiered enforcement: orphan REFUSE / double-closure WARN / cluster-size > 10 soft-WARN)
  - mm-d2r-code-plan-stack/skills/asae/SKILL.md Aspect 21 (DRR sub-shapes including carry_forward + carry_forward_sequenced)
  - mm-claude-canonical/references/Production_Pattern_Catalog_2026-04-27_v01_I.md (PAT-DRR-CARRY-FORWARD + PAT-DRR-CARRY-FORWARD-SEQUENCED patterns)
related_artifacts:
  - mm-claude-canonical/scripts/lib/carry_marker_validator.sh
  - mm-claude-canonical/hooks/commit-msg-v09
  - mm-d2r-code-plan-stack/skills/asae/SKILL.md
  - mm-claude-canonical/references/Production_Pattern_Catalog_2026-04-27_v01_I.md
---

# Carry-Marker Cluster Schema and Convention

## Purpose

Codifies the schema and hook-enforcement discipline for **carry-markers** — named identifiers that track findings deferred from one ASAE gate to a future stage's closure. Carry-markers exist because the DRR (Detect-Revert-Redelegate) sub-shape `carry_forward` (and its variant `carry_forward_sequenced`) preserves work-product across stage boundaries while explicitly tracking what remains open for downstream closure.

This convention closes the failure modes that surfaced in CCC build evidence: stages claim "carried forward to next stage" without naming what was carried OR without verifiable closure at the next stage. The hook-enforcement layer prevents orphan closures (claiming to close something that was never opened) and surfaces double-closures (a marker closed in two gates' closures fields).

## Carry-marker naming convention

A carry-marker is a stable, human-readable identifier. The convention:

```
<DOMAIN>-<SHORT-DESCRIPTOR>-cluster
```

- **DOMAIN**: short uppercase token identifying the work-product family (e.g., `CCC`, `D2R`, `ASAE`, `RATER`, `HOOK`)
- **SHORT-DESCRIPTOR**: kebab-case short name describing the cluster's content (e.g., `verification-coverage-stage-04`, `null-cycle-investigations-2026-04-23`)
- **`-cluster` suffix**: REQUIRED. Distinguishes carry-markers from one-off named findings.

**Why the `-cluster` suffix is mandatory:**

A carry-marker isn't a single finding — it's a cluster of related findings that travel together through stage closures. The suffix communicates this at the marker name itself, preventing readers from treating a carry-marker as a single-item TODO. The suffix is also the lexical handle hook enforcement uses to distinguish carry-marker cluster references from incidental marker-shaped strings in audit log prose.

**Examples:**

- `CCC-verification-coverage-stage-04-cluster` (verification-coverage findings deferred from CCC Stage 04 to Stage 05)
- `D2R-pscad-pattern-promotion-2026-04-27-cluster` (PSCAD pattern-promotion candidates deferred from D2R Stage 06 to next quarterly catalog gate)
- `ASAE-rater-extension-edge-cases-cluster` (rater extension edge cases surfaced in CCC v1.1.0 transcript; deferred to /asae spec evolution)
- `HOOK-v07-grep-c-bug-cluster` (4 separate audit logs flagged the bug; bundled for v07.1 fix gate)

## Schema — `carry_marker_closures` audit-log frontmatter field

When an ASAE gate closes one or more carry-markers, the gate's audit log frontmatter MUST include a `carry_marker_closures:` field with the closure evidence:

```yaml
carry_marker_closures:
  - cluster_id: <cluster-name-with-suffix>
    markers_closed:
      - <specific-marker-1>
      - <specific-marker-2>
    closure_evidence: <commit SHA / file:line / external doc reference>
    remaining: [<marker-not-yet-closed-1>, <marker-not-yet-closed-2>]
    next_stage_responsible: <thread/persona/stage that closes remaining>
```

Field semantics:

- **cluster_id** (required): name of the cluster (with `-cluster` suffix). Each cluster is one item in the closures list.
- **markers_closed** (required): list of specific markers within the cluster that THIS gate closes. May be a strict subset of the cluster's full member set.
- **closure_evidence** (required): concrete proof — commit SHA where work-product change lands, file:line citation, OR external doc reference. Must be verifiable against state-at-commit.
- **remaining** (required, may be empty list): markers in the cluster NOT yet closed. Empty list means cluster fully closed in this gate.
- **next_stage_responsible** (required if `remaining` non-empty; may be omitted if empty): which thread / persona / stage closes the remaining. Empty list → omit field OR use `none`.

**When closing only some markers in a cluster (carry_forward_sequenced sub-shape):**

The `remaining` field carries the names of markers still open. The next-stage gate's `carry_marker_closures` block adds another entry with the same `cluster_id` closing more markers. This is the carry_forward_sequenced DRR pattern: cluster opens at gate-N, partial closures at gates N+1 / N+2 / ..., final closure when `markers_closed` covers all originally-open markers + `remaining` is empty.

## Severity-tiered hook enforcement (Hook v09 Tier 35)

Hook v09 Tier 35 invokes `mm-claude-canonical/scripts/lib/carry_marker_validator.sh --validate <audit-log>` at commit time. Tier 35 maps lib script exit codes:

| Exit code | Severity | Hook action |
|---|---|---|
| 0 | PASS (all checks pass; or no carry_marker_closures field present) | Commit allowed |
| 1 | FAIL — orphan closure | Commit REFUSED |
| 2 | WARN — double-closure OR cluster-size > 10 soft-warn | Commit allowed; stderr WARN message flagged |

### Orphan closure (REFUSE)

A marker is **orphan** if it's listed in current gate's `markers_closed` but no prior gate's audit log opened it (either via prior `carry_marker_closures.remaining` field OR via prior gate prose explicitly naming the marker as deferred-to-future-closure).

Why REFUSE: orphan closures are either typos (marker name wrong; correct marker still open elsewhere) OR fabricated closures (claiming to close something that was never opened, breaking lineage integrity). Both are anti-fab per A8.1. Human review required before commit can proceed.

How to fix orphan: review the orphan marker name; either correct the marker name (typo) OR remove the closure entry (marker wasn't actually open in any prior gate; doesn't need closing here).

### Double-closure (WARN)

A marker is **double-closed** if it appears in `markers_closed` of CURRENT gate AND was already in `markers_closed` of a prior gate (not just `remaining`).

Why WARN (not REFUSE): a cluster may legitimately have layered closures (e.g., a closure was partial at gate-N, additional closure work at gate-N+1, both gates assert closure of the same marker for different sub-conditions). Hook surfaces the pattern but doesn't block.

How to handle WARN: review the prior gate's closure evidence vs. current gate's; either (a) confirm distinct sub-conditions justify dual closure, document in prose, OR (b) remove from current gate's markers_closed (truly redundant).

### Cluster-size > 10 soft-WARN

A cluster with `markers_closed` count > 10 in a single gate triggers soft warning. No action required; but signal that cluster may be too granular OR that closure is bundling too much in one gate (review DRR sub-shape: should this be carry_forward_sequenced across multiple gates instead?).

There is no hard cap on cluster size per Lock 8 spec. The threshold of 10 is heuristic; future v02 may calibrate.

## Relationship to DRR sub-shapes (Aspect 21)

| DRR sub-shape | Carry-marker usage |
|---|---|
| `full_revert` | NO carry-markers (work-product reverted; nothing deferred). |
| `carry_forward` | ALL findings represented as carry-markers; closure happens at next stage with single `carry_marker_closures` entry. |
| `carry_forward_sequenced` | Cluster opens at gate-N; partial closures at gates N+1 / N+2 / ...; final closure when `remaining` becomes empty. |
| `uncommitted_revert` | NO carry-markers (working-tree only; pre-commit recovery; nothing committed needs closure). |
| `disclosure_inline_remediation` | NO carry-markers in this gate (audit-log-only correction; no work-product deferred). The corrected gate may have had carry-markers; those carry their own closure path independently. |

## Adding new clusters mid-gate

When a finding is deferred-to-future-closure mid-gate, the gate's audit log MUST:

1. Open the cluster in the gate's body prose (e.g., honest gaps section): "Deferred to `<DOMAIN>-<SHORT-DESCRIPTOR>-cluster`; closure expected at <next stage>."
2. Optionally include the cluster + initial members in the gate's `carry_marker_closures` field with empty `markers_closed` and the to-be-deferred members in `remaining`. Some gates skip this when no closures are happening; the cluster simply opens via prose.
3. The next gate that closes from the cluster cites it via `cluster_id` in its `carry_marker_closures`.

## Cluster lifetime + closure

A cluster has 4 lifecycle states:

1. **Open** — at least one marker opened; none yet closed.
2. **Partially-closed** — one or more markers closed; `remaining` non-empty.
3. **Fully-closed** — all markers in `remaining` have been closed; final gate's `markers_closed` covers all original members + `remaining` is empty.
4. **Abandoned** — cluster opened but never closed; surface as honest gap in any gate that touches related work.

Future enhancement (v02): cluster-status-tracking doc that aggregates open + partially-closed + abandoned clusters across gates for periodic cleanup review.

## Honest gaps

1. **Cluster-tracking is per-gate-and-prior-gates filesystem-based.** Hook v09 Tier 35 + lib script scan `deprecated/asae-logs/` directory for prior gates. Doesn't follow git history if a prior cluster-opening gate was renamed or moved. Mitigation: keep gate audit logs in their authoring directory.

2. **Cluster size > 10 soft-warn threshold is heuristic.** No empirical basis for 10; future v02 may calibrate from production usage.

3. **Abandoned-cluster detection is manual.** No automated surfacing of clusters that opened but were never closed; relies on auditor catching the pattern. Future enhancement: aggregate cluster-status tracker.

4. **No cluster-graph visualization.** Can't visualize cluster lineage across many gates; current discipline is text-search (grep cluster_id across `deprecated/asae-logs/`).

5. **Cluster_id namespace is decentralized.** Two threads could accidentally pick the same cluster_id for unrelated work. Mitigation: include date + thread context in SHORT-DESCRIPTOR when ambiguity risk is high.

6. **Schema is flat, not hierarchical.** A cluster cannot contain sub-clusters. If a cluster grows beyond 10-15 markers, prefer creating a sibling cluster with a more specific SHORT-DESCRIPTOR rather than nesting.

## Versioning

v01_I (2026-04-30) — inaugural Spec Genius authoring per Batch 3 Lock 8 (Mod 15). Schema + naming convention + severity-tiered enforcement + DRR-sub-shape relationship + lifecycle + honest gaps.

Future v02+:
- Cluster-status-tracking doc (open / partially-closed / abandoned aggregation)
- Hook v10+ enforcement enhancements (calibrated cluster-size threshold; namespace collision detection)
- Cluster-graph visualization tooling
