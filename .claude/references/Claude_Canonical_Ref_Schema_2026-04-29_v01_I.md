---
title: .claude-canonical-ref Schema (Consumer Repo Submodule Pinning)
id: Claude_Canonical_Ref_Schema_2026-04-29
created: 2026-04-29
version: v01_I
classification: INTERNAL ONLY
authored_by: Clauda W. Reliability Compositor v01 (Opus 4.7, 1M context, agitated-lalande-4d649d worktree)
purpose: |
  Specifies the YAML schema for `.claude-canonical-ref` files placed at every Martinez Methods
  consumer repo's root. This file declares which version of each SSOT submodule the consumer
  expects, pins the current SHA, tracks last-sync metadata, and lists any per-repo overrides.
  Auto-classified META-1 enforcement-class once META-1 lands per upstream handoff §6.1.
related_skills:
  - load-memory (mm-claude-canonical/skills/load-memory/SKILL.md — reads this file to confirm canonical wiring is healthy before loading memory)
related_scripts:
  - mm-claude-canonical/scripts/daily-ssot-sync.sh (consumes pinned_to_sha, version_constraint)
  - mm-claude-canonical/scripts/session-start-pull.sh (updates last_synced_at)
  - mm-claude-canonical/scripts/wire-consumer-repo.sh (creates this file at wiring time)
---

# .claude-canonical-ref Schema

## Where it lives

Every Martinez Methods consumer repo (~27 per the rescued registry) gets a single
`.claude-canonical-ref` file at the repo root. Phase 9 wiring creates it. Daily
sync + session-start-pull update its `last_synced_at`. The skill loader reads it
to confirm canonical wiring is healthy.

## Canonical YAML schema

```yaml
# .claude-canonical-ref — consumer-repo submodule pinning + override declaration
# Read by: load-memory skill, daily-ssot-sync.sh, session-start-pull.sh
# Written by: wire-consumer-repo.sh (initial); session-start-pull.sh (last_synced_at)
# Auto-classified META-1 enforcement-class once META-1 lands.

mm_claude_canonical:
  # Semver constraint pinning which versions of canonical the consumer is OK with.
  # Caret allows minor/patch updates within the same major version.
  # When canonical bumps major, consumer must explicitly opt in (manual edit here).
  version_constraint: ^1.0.0

  # Auto-derived from .gitmodules at wire time. Updated by daily-ssot-sync.sh
  # whenever a `git submodule update --remote` advances the SHA.
  pinned_to_sha: <40-char SHA>

  # Repo-local skills that should win over canonical (override semantics per
  # design doc §3.4). Each entry is a skill name (matches `skills/<name>/`).
  # Empty list = no overrides; canonical wins for all skills.
  override_skills: []

  # Repo-local memory directory wins over canonical when true.
  # Default false: memory/krystal/ + memory/cody/ + memory/shared/ resolve from
  # canonical via the load-memory skill's user-detection.
  override_memory: false

mm_d2r_code_plan_stack:
  # Pre-1.0 caret allows minor (0.5.0 → 0.5.1) but NOT major (0.5.0 → 1.0.0).
  # When the stack stabilizes at v1.0.0, consumers update this to ^1.0.0.
  version_constraint: ^0.5.0

  pinned_to_sha: <40-char SHA>

  override_skills: []

# Last successful submodule update timestamp (ISO 8601 UTC).
# Updated by session-start-pull.sh on success and by daily-ssot-sync.sh.
last_synced_at: 2026-04-29T00:00:00Z

# Identity that performed the last sync (cron | session | manual).
# Useful for post-hoc diagnosis if a sync goes wrong.
last_synced_by: cron

# Optional: notes specific to this consumer.
# wiring_audit ID from Phase 9 summary report; useful for traceability.
wiring_audit: phase-9-1-pilot-cluster-wire-2026-XX-XX
```

## Schema invariants

1. **`mm_claude_canonical` and `mm_d2r_code_plan_stack` are both required** (consumer repos pull both submodules; if a consumer doesn't need D2R stack, it still gets the submodule but can simply not invoke D2R skills).
2. **`version_constraint` must be a valid semver caret/tilde/pin expression.** Examples: `^1.0.0` (allow minor+patch), `~1.2.0` (allow patch only), `1.2.3` (pin exact). Invalid expressions get flagged at sync time.
3. **`pinned_to_sha` is auto-derived.** Manual edits get overwritten by sync. To pin to a specific SHA: edit `.gitmodules` instead.
4. **`override_skills` entries are skill-name strings** (not paths). Wildcards not supported — list each override skill explicitly. Empty list is the default.
5. **`override_memory` is per-repo all-or-nothing.** If you need partial memory override, that's an architectural decision out of scope for this schema (probably means the override-pattern itself needs revision).
6. **`last_synced_at` MUST be ISO 8601 UTC.** Local timezones not allowed (cross-machine sync depends on UTC ordering).
7. **`last_synced_by` MUST be one of: `cron`, `session`, `manual`.** Used for diagnosis.

## How wire-consumer-repo.sh creates it

When `scripts/wire-consumer-repo.sh` runs against a fresh consumer:

1. Adds both submodules under `.claude/canonical/`.
2. Reads the SHAs from `.gitmodules` (or current HEAD of each submodule clone).
3. Writes `.claude-canonical-ref` at repo root with default values:
   - `version_constraint: ^1.0.0` and `^0.5.0` respectively.
   - `pinned_to_sha`: the current SHA at submodule add time.
   - Empty `override_skills` lists.
   - `override_memory: false`.
   - `last_synced_at`: ISO 8601 UTC NOW.
   - `last_synced_by: manual` (since wire-consumer-repo.sh is invoked manually or scripted, not by cron/session).
   - `wiring_audit`: the Phase 9 summary-report ID.

## How session-start-pull.sh updates it

Per session start in a wired consumer:

1. Runs `git submodule update --remote --recursive .claude/canonical/`.
2. On success: reads new SHAs from `.gitmodules`; updates `pinned_to_sha` for both submodules; updates `last_synced_at` to NOW; sets `last_synced_by: session`.
3. On failure: leaves the file unchanged; logs to `~/.claude/sync-failure.log`; surfaces warning at session top.

## How daily-ssot-sync.sh updates it

Per cron run (typically 06:00 daily on each consumer):

1. Iterates the consumer registry.
2. For each consumer: same submodule-update logic as session-start-pull, but commits + pushes if changed.
3. Updates `pinned_to_sha`, `last_synced_at`, `last_synced_by: cron`.
4. Commits with persona attribution `Co-Authored-By: Daily-Sync-Bot <noreply@anthropic.com>` and skips ASAE gate enforcement (Tier 0 propagation class per hook v07.1+).

## Override mechanics

When a consumer repo's local `.claude/skills/<name>/` exists AND `<name>` is listed
in `override_skills`, the local copy wins for that skill. The override is logged
to `<consumer-repo>/.claude/canonical/audit/overrides-<date>.log` per design doc
§11.5 lock 2026-04-28 (per-repo audit log location).

If a skill is in `override_skills` but no local copy exists: warning at session
start ("override declared but no local skill found"). Hook can structurally
enforce this consistency in a future tier.

## Cascade — when canonical bumps major version

When `mm-claude-canonical` releases v2.0.0 (breaking change):
- `version_constraint: ^1.0.0` REJECTS the new major. Daily sync skips the bump.
- Consumers must MANUALLY update `version_constraint: ^2.0.0` to opt in.
- This protects against unexpected breaking changes propagating silently.

When `mm-d2r-code-plan-stack` reaches v1.0.0 (stack stabilizes):
- Default `version_constraint: ^0.5.0` REJECTS v1.0.0.
- Consumers update to `version_constraint: ^1.0.0` after reviewing release notes.

## Honest gaps

1. The `.claude-canonical-ref` is YAML, not enforced by hook v08 (yet). Schema
   validation is structural-only. v09 (Spec Genius Batch 3) may add Tier 38 for
   field-completeness check.
2. `override_skills` empty list default trusts the consumer to declare overrides
   rather than auto-detect. A skill loader could detect `<consumer>/.claude/skills/<x>/`
   without an entry in `override_skills` and warn — that's an enhancement.
3. `wiring_audit` ID format isn't fully spec'd until Phase 9.1 produces the first
   summary report.
