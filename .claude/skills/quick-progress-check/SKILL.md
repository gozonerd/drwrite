---
name: quick-progress-check
description: >-
  Produce a crisp, uniform progress snapshot during or after multi-step work — a one-line
  headline, a table with a REQUIRED unique ID on every row (3 alpha + 3 num, numbers
  incrementing from 001), status emojis (✅ done / ⏳ in progress / ⬜ pending / 🔜 next up
  / 🚫 blocked / ❌ failed), and an optional no-pacing-pressure closer. Triggers —
  '/quick-progress-check', 'quick progress check', 'progress check', 'where are we on this',
  'status check', 'give me a progress check'. Distinct from /scope-recap (a retrospective at
  scope-END); this is a LIVE mid-work status snapshot. NEVER auto-invoked as a pacing nudge.
type: skill
authored_by: Claudis W Work Salvager (provisional, pending /define-your-role-literal)
created: 2026-05-20
classification: cross-thread methodology skill
---

# /quick-progress-check

## Purpose

A fast, scannable status snapshot for multi-step work: one-line headline up top, a uniform table below, optional one-line closer. It operationalizes crisp-recap-up-top and gives the user **referenceable IDs** so they can act on any single item with specificity (minimal typing).

Origin: Krystal, 2026-05-20 — "that quick progress check format is EXCELLENT! please add making this a skill."

## When to use

**INVOKE when:**
- The user invokes `/quick-progress-check` or asks "where are we on this", "progress check", "status check", or "give me a progress check".
- You are reporting progress partway through a multi-step task — this is a valid lightweight in-thread report that satisfies no-silent-execution without a wall of text.

**DISTINCT FROM `/scope-recap`:** scope-recap is the end-of-scope *retrospective* (what worked / what to improve / in-flight). quick-progress-check is a *live status snapshot* of where each work item stands. Use scope-recap to close a scope; use quick-progress-check to check status mid-flight.

**DO NOT:**
- Auto-invoke it as a time/pacing nudge (per feedback_parallel_threads_no_check_ins).
- Use it as a retrospective (that is scope-recap).

## Output format

1. **(optional) ONE-line headline** — the single most important takeaway.
2. **The table**, exactly these columns:

   | ID | Item | Status |
3. **(optional) ONE-line closer** — what's next or "nothing for you to do" — with **no pacing pressure**.

### REQUIRED: uniform IDs on every row

Every row MUST have a unique ID. No exceptions — never a row without one, never mixed formats in one table.

- **Format:** 6 characters = **3 alpha + 3 num** (e.g., `QPC001`).
- **The 3 numbers start at `001` and increment by one** down the table: `001`, `002`, `003`, …
- **One alpha prefix per check** (uniform within the table). Default `QPC`; or a 3-letter mnemonic for the workstream (e.g., `RST` for a restart effort, `ACT` for action items).
- **Avoid any keyboard keys the user has flagged broken** (per feedback_keyboard_typing_charity) so they can type the ID back. (As of 2026-05-20: avoid the letters **g** and **h** in the prefix.)
- The IDs exist so the user can refer to any item with specificity.

### Status emoji legend

| Emoji | Meaning |
|---|---|
| ✅ | done (and verified — see Rule 2) |
| ⏳ | in progress / running |
| ⬜ | pending / not started |
| 🔜 | next up (ready to start once the current item completes) |
| 🚫 | blocked (name the blocker in the Item cell) |
| ❌ | failed (name why in the Item cell) |

## Discipline rules (binding)

1. **Uniform IDs** — every row gets one; never ship a row without an ID, never mix ID formats in one table.
2. **✅ means done-AND-verified** — never mark ✅ on intent or a launched-but-unconfirmed action (per feedback_work_completion_falsification + feedback_audit_on_observed_behavior). If it isn't verified, it's ⏳.
3. **Crisp** — table + at most one line above + one line below. No wall of text.
4. **No pacing pressure** in the closer (per feedback_parallel_threads_no_check_ins) — no "ready when you are," no time-management nudges.
5. **Honest status** — status reflects observed reality, not optimism. No false ✅, no false ❌, no padding rows to look busy.

## Anti-patterns

- A row with no ID, or non-uniform ID formats in a single table.
- Changing the alpha prefix partway through one table (use one prefix per check).
- Marking ✅ before the work is verified.
- Replacing the table with prose paragraphs.
- Pacing nudges in the closer.
- Using it as a retrospective (that is `/scope-recap`).

## Companion rules

- `feedback_crisp_recap_up_top` — this skill operationalizes it.
- `feedback_no_silent_execution` — a progress check is a valid lightweight in-thread report.
- `feedback_work_completion_falsification` + `feedback_audit_on_observed_behavior` — ✅ only on verified completion.
- `feedback_parallel_threads_no_check_ins` — closer cedes pacing; no nudges.
- `feedback_no_askuserquestion_tool` — present any choices as prose with IDs, never the picker.
- `scope-recap` (skill) — sibling; retrospective-at-scope-end vs. live-status-snapshot.

## Propagation

Canonical source: `mm-claude-canonical/.claude/skills/quick-progress-check/`. Distributed to consumer repos by `propagation/propagate.sh` (copies `.claude/skills/*` and writes a `_canonical.marker`). Edit here and re-propagate; do not edit propagated copies.

## Provenance

Requested by Krystal 2026-05-20 during the OneDrive-migration thread-recovery session, after a progress-check table (✅/⏳ + per-row labels) landed well. Her direction: make it a skill + `/quick-progress-check`, keep the emojis and table format, add the unique-ID pattern as a uniform requirement for all items, and ensure it propagates. Authored by Claudis W Work Salvager (provisional, pending /define-your-role-literal).
