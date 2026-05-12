---
title: Fork-Origin Catalog — Fork-event metadata + cross-references to Brand_Rename_Catalog
id: Fork_Origin_Catalog_2026-04-28
created: 2026-04-28
version: v01_I
classification: INTERNAL ONLY
audience: martinez_methods_internal
classification_reason: Catalog enumerates fork-event provenance for Martinez Methods canonical content; reveals migration history (Stahl Systems → Martinez Methods 2026-04-16; subsequent SSOT extraction 2026-04-28); shipping externally would map private-history to public-artifact crosswalk
authored_by: Clauda the Spec Genius v01 (Claude Opus 4.7, 1M context)
provenance: Methodology Mods Batch 3 Lock 9 (META-10 Fork-Time / Rebrand-Time Sweep)
sources:
  - Methodology_Mods_Batch3_Handoff_2026-04-28_v01_I.md (Lock 9 specification)
  - Pre_Publication_IP_Scrub_Checklist_2026-04-22_v01_I.md (IP-leakage failure-mode source)
  - mm-claude-canonical/skills/rebrand-sweep/SKILL.md (companion skill that produces fork-event findings)
  - mm-claude-canonical/references/Production_Pattern_Catalog_2026-04-27_v01_I.md (PAT-INHERITED-BRAND-DEBT pattern; failure mode this catalog enumerates concretely)
  - mm-claude-canonical/CHANGELOG.md (Phase A-G migration record; primary fork-event provenance for this catalog's inaugural entries)
  - mm-claude-canonical/docs/Migration_Source_Locks_2026-04-27_v01_I.md (DMIS-folder-name preservation rationale informing structural-residue classification)
  - mm-claude-canonical/docs/SSOT_System_Design_2026-04-28_v01_I.md (SSOT extraction rationale for FORK-canonical-extraction entry)
  - mm-claude-canonical/docs/Phase9_Migration_Plan_2026-04-29_v01_I.md (Phase E admission gate cross-ref; downstream consumer of this catalog)
  - _grand_repo/CLAUDE.md (admission criterion #4 references)
related_artifacts:
  - mm-claude-canonical/skills/rebrand-sweep/SKILL.md
  - mm-claude-canonical/references/Production_Pattern_Catalog_2026-04-27_v01_I.md (PAT-INHERITED-BRAND-DEBT pattern)
  - _grand_repo/docs/Pre_Publication_IP_Scrub_Checklist_2026-04-22_v01_I.md
  - Brand_Rename_Catalog (NOT YET AUTHORED — see honest gap §6.1)
---

# Fork-Origin Catalog

## Purpose

Enumerates fork-event metadata for Martinez Methods canonical content. A "fork event" is any moment a body of methodology / code / documentation moves from one brand-context or one repository to another, leaving brand-residue debt that the `/rebrand-sweep` skill systematically detects.

This catalog answers, per fork event:

1. **What was forked** (source repo / brand context)
2. **What it became** (destination repo / brand context)
3. **When** (date + commit pointer)
4. **Why** (the structural reason for the fork — rebrand, SSOT extraction, migration, etc.)
5. **What residue persists** (brand-debt count + categorization at fork time + remediation status)
6. **Who's responsible** (which thread or persona handles remediation)

Fork-event findings from `/rebrand-sweep --fork-event` produce candidate entries here. Krystal or Spec Genius confirms before catalog landing.

## Sweep scope this catalog informs

`/rebrand-sweep` operates in two scope tiers (per the skill's BLOCKER vs ADVISORY pattern lists):

- **BLOCKER tier**: parallel-thread known-residue list — refuses Phase E canonical-consumer admission until 0 hits.
- **ADVISORY tier**: broader Pre-Publication IP Scrub Checklist scope — non-blocking, but expected to pass before any public release.

This catalog enumerates the fork events that produced the residue the BLOCKER and ADVISORY scans target.

## Schema

Each entry has the following fields. Required fields are mandatory; optional fields populated when known.

| Field | Required | Description |
|---|---|---|
| `fork_id` | yes | Unique stable identifier. Format: `FORK-<short-name>-<YYYY-MM-DD>`. |
| `event_kind` | yes | One of: `rebrand` (legal/branding rename of single repo), `ssot-extraction` (canonical content extracted from a workspace repo into dedicated SSOT repo), `submodule-split` (single repo split into multiple), `forked-from-external` (Martinez Methods adopts external project as starting point), `migration` (content moves between Martinez Methods repos without rebrand). |
| `source_repo` | yes | The pre-fork repo / context. Repo URL when applicable; otherwise descriptive label. |
| `source_brand` | yes | The brand-context of the source. Examples: `Stahl Systems`, `Martinez Methods (workspace)`, `external: <upstream-project>`. |
| `destination_repo` | yes | The post-fork repo. Repo URL when applicable. |
| `destination_brand` | yes | The brand-context of the destination. |
| `fork_date` | yes | ISO 8601 date. If exact unknown, mark approximate (`~2026-04-16`) and explain in `notes`. |
| `fork_commit` | optional | The destination repo's first-after-fork commit SHA, if a single commit captures the fork moment. |
| `reason` | yes | Free-prose. Why this fork happened. |
| `residue_at_fork` | yes | Findings count from `/rebrand-sweep --fork-event` against the destination, partitioned by category (mechanical-rename / contextual-phrase / structural / binary / manifest). |
| `residue_remediated` | yes | Findings count remediated to date. Updated as remediation lands. |
| `remediation_owner` | yes | Thread / persona / human responsible. Examples: `Spec Genius (Batch 3 Phase 2)`, `SSOT-wrangler (Phase E)`, `Krystal-direct`. |
| `remediation_status` | yes | One of: `not-started`, `in-progress`, `complete`, `partial-deferred-to-batch-N`, `accepted-as-historical`. |
| `cross_references` | optional | Related artifacts, gates, threads. |
| `notes` | optional | Free-prose. Approximations, caveats, parallel-fork-context. |

## Inaugural entries

### FORK-stahl-to-martinez-2026-04-16

```yaml
fork_id: FORK-stahl-to-martinez-2026-04-16
event_kind: rebrand
source_repo: (pre-2026-04-16 repos under Stahl Systems brand context)
source_brand: Stahl Systems
destination_repo: github.com/nerdykrystal/_grand_repo + github.com/nerdykrystal/repos (and ~24 sub-repos)
destination_brand: Martinez Methods
fork_date: 2026-04-16
fork_commit: (rebrand was distributed across many repos over a multi-day period; no single fork commit; per-repo first rebrand commit varies)
reason: |
  Legal / branding rename. Stahl Systems → Martinez Methods. Rebrand applies forward-going
  from 2026-04-16; pre-existing artifacts authored before that date preserve historical
  brand reference. Rationale documented in Krystal-thread (2026-04-15 / 2026-04-16
  conversations, not in artifact form).
residue_at_fork:
  mechanical-rename: ~hundreds (filenames, folder names, frontmatter owner fields)
  contextual-phrase: ~unknown (not yet swept comprehensively; Pre-Pub IP Scrub Checklist
    section 1.3 captures the grep patterns)
  structural: 0 known (no folder-cascade restructure tied to rebrand; folder names renamed
    in-place where they contained brand)
  binary: ~unknown (PDF / DOCX metadata across reference docs; manual inspection pending)
  manifest: ~unknown (per-repo package.json / pyproject.toml / Cargo.toml inspection
    pending)
residue_remediated:
  mechanical-rename: substantial (forward-going commits use Martinez Methods exclusively;
    historical commits preserve Stahl Systems for accuracy)
  contextual-phrase: pending /rebrand-sweep first run (Phase 2 of Batch 3 plan)
  structural: N/A
  binary: pending manual inspection
  manifest: pending
remediation_owner: Spec Genius (Batch 3 Phase 2 sweep + remediation)
remediation_status: in-progress
cross_references:
  - _grand_repo/CLAUDE.md admission criterion #4
  - Pre_Publication_IP_Scrub_Checklist_2026-04-22_v01_I.md
  - Production_Pattern_Catalog PAT-INHERITED-BRAND-DEBT
notes: |
  Rebrand is the canonical example for this catalog. Stahl Systems references in pre-
  2026-04-16 artifacts are NOT brand-debt — they are historical accuracy preserved per
  authoring discipline. The /rebrand-sweep skill's allowlist treats `deprecated/` paths
  as historical-by-default; forward-going files in working directories are the residue
  scope.
```

### FORK-canonical-extraction-2026-04-28

```yaml
fork_id: FORK-canonical-extraction-2026-04-28
event_kind: ssot-extraction
source_repo: github.com/nerdykrystal/repos (.claude/skills/ + references/) + github.com/nerdykrystal/_grand_repo (docs/ + .githooks/ + role-manifests/)
source_brand: Martinez Methods (workspace)
destination_repo: github.com/Martinez-Methods/mm-claude-canonical + github.com/Martinez-Methods/mm-d2r-code-plan-stack
destination_brand: Martinez Methods (canonical SSOT)
fork_date: 2026-04-28
fork_commit:
  mm-claude-canonical: 4ac4590 (initial scaffold) → 1e15fdc (Phase B content migration)
  mm-d2r-code-plan-stack: 34ff27c (initial scaffold) → f8eca32 (Phase F D2R stack migration v0.6.0)
reason: |
  SSOT-wrangler thread (charming-meitner-fb1c13) extracted Martinez Methods canonical
  methodology infrastructure from workspace repos into dedicated SSOT repos under the
  Martinez-Methods GitHub org. Extraction enables canonical-consumer submodule pattern
  (per Phase 9 plan) — consumer repos pull canonical SSOT via submodule, eliminating
  per-repo duplication of methodology infrastructure.
residue_at_fork:
  mechanical-rename: known to exist (CHANGELOG references "stahl"; Migration_Source_Locks
    + Phase9_Migration_Plan + SSOT_System_Design reference Stahl Systems for migration
    provenance accuracy; one references/Stahl_Systems_Brand_Colors filename intentionally
    preserves historical brand-asset name); 9-10 confirmed hits in Phase 0 grep
  contextual-phrase: not yet swept comprehensively (Phase 2 of Batch 3 plan)
  structural: 1 known (`skills/dmis/methodology/` folder name retained per Migration_Source_Locks
    decision; legacy methodology name pre-2026-04-16; intentional preservation tied to
    historical accuracy of methodology-naming-history; allowlist candidate)
  binary: pending manual inspection
  manifest: pending
residue_remediated:
  mechanical-rename: ~42 individual edits applied 2026-04-30 per gate-6 Phase 2 sweep
    (DMIS owner fields x45, rules/file-naming-and-versioning, LICENSE email both repos,
    d2r-stack 4 ref docs Krystal Stahl + email, print-docx skill + js + ref-file-rename,
    file-versioning skill + rules, le-prompt-brief example); 0 BLOCKER content hits
    remain in non-allowlisted paths
  contextual-phrase: 0 (none surfaced; all stahl content was either mechanical or
    historical/meta)
  structural: accepted-as-historical (DMIS folder name preserved per source-locks
    decision); 1 filename rename (stahl-systems-print-spec.md to martinez-methods-
    print-spec.md per Q2 broader-scope inference)
  binary: allowlisted at filename level (Stahl_Systems_Master_Rules_TOC docx; content-
    layer inspection pending future skill enhancement)
  manifest: 0 (LICENSE email is contact-info; updated to kjm2145@columbia.edu per
    Krystal Q1 directive 2026-04-30)
  q2_copy_rebrand: 2 NEW MM-rebrand versions authored alongside historical
    (Print_Optimized_Spec_AI-REF_2026-04-30_v03_I + Git_Command_Cheat_Sheet_2026-04-30_v02_I)
remediation_owner: Spec Genius (Batch 3 Phase 2 sweep + remediation completed 2026-04-30)
remediation_status: complete (BLOCKER tier; PHASE_E_ADMISSION PASS); pending (ADVISORY
  tier; deferred to pre-publication gate)
cross_references:
  - mm-claude-canonical/CHANGELOG.md (Phases A-G provenance)
  - mm-claude-canonical/docs/Migration_Source_Locks_2026-04-27_v01_I.md
  - mm-claude-canonical/docs/Phase9_Migration_Plan_2026-04-29_v01_I.md
  - mm-claude-canonical/docs/SSOT_System_Design_2026-04-28_v01_I.md
  - _grand_repo/CLAUDE.md admission criterion #4 (BLOCKER tier gate)
  - mm-claude-canonical/references/Stahl_Systems_Brand_Colors_2026-03-27_v01_I.md (allowlist
    candidate — historical brand-asset filename)
  - mm-claude-canonical/skills/dmis/methodology/* (allowlist candidate — Migration_Source_Locks
    structural preservation)
notes: |
  This is the fork event that motivates Lock 9 / META-10 in Batch 3. SSOT-wrangler's
  Phase E (canonical-consumer pilot wiring of _grand_repo) is BLOCKED on /rebrand-sweep
  remediation. Phase 1 (this catalog + skill authorship) unblocks Phase 2 (sweep + 
  remediate), which unblocks Phase E.
  
  Stahl Systems references in this catalog (and in mm-claude-canonical/CHANGELOG.md and
  the docs/Migration_Source_Locks + Phase9 + SSOT_System_Design files) are catalogued as
  intentional historical-provenance references — describing WHY the fork happened. Per
  /rebrand-sweep allowlist defaults, paths matching `references/Fork_Origin_Catalog_*`
  and the listed migration-provenance docs are skipped.
```

## Adding new entries

When `/rebrand-sweep --fork-event` produces a candidate entry:

1. Skill emits a draft entry block with as many fields populated as inspection permits
2. Spec Genius (or invoking thread) reviews + completes any optional fields
3. Krystal confirms `event_kind` + `reason` + `remediation_owner` (these are decision-level fields, not inspection-level)
4. Entry appended to this catalog under "Inaugural entries" → renamed "Catalog entries" once entry count > 2
5. Commit message includes `Cascade-Layer: 3` if catalog touch is part of a META-8 cascade event
6. Production_Pattern_Catalog cross-reference (PAT-INHERITED-BRAND-DEBT) updated if pattern frequency changes

## Honest gaps

1. **Brand_Rename_Catalog doesn't exist as a separate file yet.** META-4 was referenced in this catalog's placeholder comments and in the /rebrand-sweep skill, but no canonical Brand_Rename_Catalog reference doc has been authored. Until it exists, the term-rename mandates are ambient (Stahl Systems → Martinez Methods is the only canonical mapping and is documented per-fork-entry here). Future Brand_Rename_Catalog should formalize the mapping table; this catalog cross-references but doesn't duplicate.
2. **First fork (FORK-stahl-to-martinez-2026-04-16) residue counts are estimates, not measured.** Comprehensive sweep happens at Phase 2 of Batch 3 plan; this catalog's `residue_at_fork` counts will be updated post-sweep with measured numbers.
3. **Binary inspection is not in scope for this catalog.** The skill emits binary file lists; manual inspection results land in scrub reports, not here.
4. **Approximate fork dates may need correction.** FORK-stahl-to-martinez-2026-04-16 was a multi-day distributed rebrand; 2026-04-16 is the canonical "rebrand starts" date but per-repo first-rebrand-commit varies. If precise dating becomes load-bearing, this entry should grow per-repo subsection.
5. **The catalog is single-author at v01.** Independent rater verification at Phase 1 commit (per Mod 13 Rule A + 2-rater discipline) provides initial coverage; future updates should preserve the 2-rater gate per Batch 3 Phase boundary protocol.
6. **No automated catalog-coverage gate.** Nothing today prevents fork events from going un-catalogued. Future enhancement: hook tier that detects new repo creation under Martinez-Methods org + prompts catalog-entry authorship. Out of scope for Batch 3.

## Relationship to Production Pattern Catalog

`Production_Pattern_Catalog_2026-04-27_v01_I.md` entry `PAT-INHERITED-BRAND-DEBT` describes the failure mode that this catalog's entries enumerate concretely. When new fork events surface, both catalogs may need touch:
- This catalog: new fork-event entry
- Production_Pattern_Catalog: increment frequency / observed_in count for `PAT-INHERITED-BRAND-DEBT`

Cross-reference is informational; no automated linkage today (per honest gap §6 in Production_Pattern_Catalog about manual related_patterns links).

## Versioning

v01_I (2026-04-30) — inaugural Spec Genius authoring per Batch 3 Lock 9 (META-10). 2 inaugural entries (Stahl→Martinez rebrand + canonical extraction).

Future v02+ bumps:
- New fork events (additive entries)
- Schema changes (required→optional or new fields) trigger META-8 cascade attestation since /rebrand-sweep skill consumes this catalog's schema
- Residue-count updates as remediation lands (in-place edits, not version bumps unless schema changes)
