---
name: asae-render
description: "Render structured `passes[]` YAML frontmatter into canonical ASAE Pass-section prose body (Lock A2 strategic). Triggers on: '/asae-render', 'asae-render', 'render asae passes', 'render audit log', 'rebuild pass section'. Reads audit log YAML frontmatter passes[] block; produces canonical markdown Pass blocks with required-phrase markers (Tier 1b satisfaction). Backed by `mm-claude-canonical/scripts/lib/asae_pass_renderer.sh`. Hook v09 Tier 37 enforces rendered-prose-equivalence at commit time. Use when migrating legacy prose-pattern audit logs to structured form OR when authoring new audit logs structurally first + rendering prose."
type: skill
classification: INTERNAL ONLY
audience: martinez_methods_internal
classification_reason: Methodology IP — Lock A2 strategic refactor; consumed by /asae authors transitioning audit logs to structured-frontmatter form.
authored_by: Clauda the Spec Genius v01 (Claude Opus 4.7, 1M context)
created: 2026-04-30
version: v01_I
provenance: Methodology Mods Batch 3 Lock A2 strategic (per Batch 3 Handoff §3 Lock A2)
---

# /asae-render

## What this skill does

Renders structured `passes[]` YAML frontmatter (Lock A2 strategic schema) into canonical ASAE Pass-section markdown prose body. The renderer's output is the canonical form Hook v09 Tier 37 enforces equivalence against; if the audit log's actual prose body diverges from the renderer's output, Tier 37 refuses commit.

This skill is the user-facing entry point to the rendering capability. The actual rendering logic lives in `mm-claude-canonical/scripts/lib/asae_pass_renderer.sh` (Phase 3 deliverable; Tier 37 backbone).

## When to invoke

- **Migrating legacy prose-pattern audit logs to structured form**: take an existing prose-pattern audit log, hand-author a `passes[]` block in frontmatter, run `/asae-render` to produce canonical prose body, replace existing prose-section with rendered output, commit.
- **Authoring new audit logs structurally first**: in `passes[]` block, then render the prose body via this skill. Keeps frontmatter as machine-readable source-of-truth + prose body as human-readable output.
- **Auditing whether prose matches structured form**: invoke with `--check` mode to compare actual prose body against canonical-rendered output; emits FAIL diagnostic if they diverge.

## When NOT to invoke

- Audit logs without `passes[]` block in frontmatter — the renderer is a no-op (legacy prose-pattern fallback). v01 lib script emits INFO-skip + exit 0; future v02 may add a "scaffold passes[] from prose" mode but not yet.
- Mid-iteration audit logs (Pass 1 written but counter not at threshold yet) — render after the gate completes, not during loop iteration.
- Audit logs in repos without Hook v09 active — Tier 37 only fires on hook v09 + APPLY_V09_TIERS gate (date ≥ 2026-04-30); pre-v09 gates can use either prose-pattern or structured form, but render-equivalence isn't enforced.

## Inputs

- **Audit log path** — required; absolute or repo-relative path to `deprecated/asae-logs/gate-NN-*.md`.
- **Mode** — optional; one of:
  - `render` (default) — emit canonical prose body to stdout; user pipes into audit log via Edit/Write tool
  - `check` — compare actual prose body to canonical-rendered output; exit 0 PASS / exit 1 FAIL with diagnostic
  - `scaffold` (v02 future) — generate passes[] YAML scaffold from existing prose-pattern audit log

## Structured `passes[]` YAML schema (Lock A2 strategic v01)

```yaml
passes:
  - n: 1                          # pass number (1-indexed)
    description: "Full checklist re-evaluation"
    items:
      - num: 1
        label: "Foo bar baz"
        result: "PASS"            # PASS | FAIL | PARTIAL | NA
        notes: "second independent verification"
      - num: 2
        label: "Quux"
        result: "PASS"
        notes: "..."
    issues:
      critical: 0
      high: 0
      medium: 0                   # under strict policy
      low: 0
    counter: "1 / 5 consecutive clean passes"
    required_phrase: "Same comprehensive scope"
  - n: 2
    description: "Full checklist re-evaluation (IDENTICAL to Pass 1)"
    items: [...]                  # same structure
    issues: {...}
    counter: "2 / 5 consecutive clean passes"
    required_phrase: "Same comprehensive scope"
  # ... continues for all N passes
```

Required fields per pass entry:
- `n` (integer) — pass number, 1-indexed
- `description` (string) — short prose description shown in heading
- `items` (list) — per-item table content; each item has `num` / `label` / `result` / optional `notes`
- `issues` (object) — issue counts at each severity (critical / high / medium / low)
- `counter` (string) — counter state line
- `required_phrase` (string) — Tier 1b marker phrase to include in prose

Optional fields:
- `cross_shell_observed` (boolean) — if true, emit cross-shell observed-behavior block alongside the pass

## Execution Protocol

### Step 1: Validate input

Receive audit log path. Verify file exists + has YAML frontmatter (head -1 returns `---`). Refuse if either fails.

### Step 2: Extract passes[] YAML block

Invoke `mm-claude-canonical/scripts/lib/asae_pass_renderer.sh <audit-log>` (default mode = render to stdout). The lib script handles YAML extraction + rendering.

If audit log lacks `passes:` block, the lib script emits INFO-skip + exit 0; the skill emits "legacy prose-pattern audit log; nothing to render" advisory + exits.

### Step 3: Render to canonical Pass-section markdown

For each pass entry in `passes[]`, the renderer produces:

```markdown
## Pass {n} — {description}

{required_phrase}. Same items, same harness — re-applied independently. Per `/asae SKILL.md` Step 1: full re-evaluation.

| # | Item | Result |
|---|------|--------|
| {num} | {label} | {result} — {notes} |
| ... | ... | ... |

**Issues found at CRITICAL: {critical} / HIGH: {high} / MEDIUM (strict): {medium} / LOW: {low}**

**Counter state: {counter}.**
```

The renderer ensures each pass has the required-phrase marker for Tier 1b satisfaction.

### Step 4: User reviews + applies output

In `render` mode, the skill emits the canonical prose to stdout. The user (or invoking thread) reviews + replaces the audit log's existing `## Pass N` section with the rendered output via Edit/Write tool.

In `check` mode, the skill compares actual prose body to rendered output; emits FAIL diagnostic if diverge.

### Step 5: Hook v09 Tier 37 self-check at commit time

When the audit log is committed (with structured `passes[]` block in frontmatter), Hook v09 Tier 37 invokes the same lib script in `--check` mode and refuses commit if actual prose diverges from canonical rendering. This is the load-bearing enforcement layer.

## Cross-references

- `mm-claude-canonical/scripts/lib/asae_pass_renderer.sh` — the rendering implementation (Phase 3 deliverable; Tier 37 backbone)
- `mm-claude-canonical/hooks/commit-msg-v09` — Tier 37 hook enforcement
- `mm-d2r-code-plan-stack/skills/asae/SKILL.md` — /asae spec; Step 1 identical-pass discipline + Pass block structure
- `mm-claude-canonical/references/ASAE_Gate_Quickstart_2026-04-28_v01_I.md` — Quickstart documents Pass block markers (Lock A2 tactical alongside structured alternative)

## Migration path: prose-pattern → structured form

For existing prose-pattern audit logs:

1. Author `passes:` block in frontmatter mirroring existing prose Pass sections (manual per gate; v02 may scaffold)
2. Run `/asae-render <audit-log>` to produce canonical prose body
3. Diff canonical against existing prose; reconcile any drift
4. Replace existing Pass section with canonical-rendered prose
5. Commit; Hook v09 Tier 37 verifies render-equivalence

For new audit logs (forward-only):

1. Author `passes:` structured block from the start
2. Run `/asae-render` to generate the prose body
3. Paste canonical-rendered prose into the audit log's Pass section
4. Commit; Tier 37 verifies

## Anti-patterns

- **Hand-edit prose body without updating structured passes[]**: causes Tier 37 refuse at commit time. Edit the structured form, re-render, replace prose.
- **Skip render and write prose by hand for "speed"**: defeats the purpose; structured form is the source-of-truth. Author structured first, render second.
- **Mix structured + prose-pattern in same audit log**: choose one. Structured is forward-going recommended; prose-pattern is supported via legacy fallback.
- **Cite `/asae-render` for non-/asae audit logs**: skill is /asae-specific; other audit-log forms have their own renderers (out of v01 scope).

## Refusals

The skill refuses to:

- Operate on audit logs without YAML frontmatter
- Auto-modify audit log files (skill emits to stdout; user applies via Edit/Write tool)
- Generate `passes[]` scaffold from prose-pattern audit log in v01 (deferred to v02)

## Related rules

- `axis-by-axis discipline` — render output explicitly enumerates EACH pass with its required-phrase marker; no summarization
- `codify-larger-principles` — render-equivalence enforcement codifies "structured-frontmatter is source-of-truth, prose is generated" pattern at the surface
- `no silent execution` — render mode emits canonical prose; check mode emits PASS/FAIL diagnostic; never silent

## Honest gaps

1. **v01 lib script renders stub-only prose** (Pass headers + required-phrase markers; not full per-item table + issue counts). Full rendering lands at lib script v02; until then `/asae-render` produces minimal scaffolding that satisfies Tier 1b but doesn't replicate the existing audit-log prose richness.
2. **No `scaffold` mode in v01** — converting prose-pattern audit logs to structured form requires manual frontmatter authoring. v02 enhancement.
3. **--check mode is line-normalized**, not full-prose-fidelity comparison. Whitespace + minor formatting drift won't trigger Tier 37 refuse. Future v02 may tighten.
4. **No fixture-test corpus** — first production use of `/asae-render` on a real prose-pattern audit log validates v01 ergonomics.
5. **Single-thread authoring**.

## Versioning

v01_I (2026-04-30) — inaugural Spec Genius authoring per Batch 3 Lock A2 strategic. Skill spec + structured `passes[]` schema documentation + execution protocol + migration path + anti-patterns + refusals + honest gaps.

Future v02+:
- Lib script v02 (full rendering with per-item table + issue counts)
- `scaffold` mode (prose-pattern → structured conversion)
- Fixture-test corpus for adoption validation
- Tighter --check mode whitespace normalization
