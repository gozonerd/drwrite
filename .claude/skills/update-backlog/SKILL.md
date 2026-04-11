---
name: update-backlog
description: "Use this skill when tracking incremental document updates without regenerating entire files. Triggers on: 'add to backlog', 'start backlog', 'show backlog', 'apply backlog', 'generate vFinal', or when a change to a 100+ line document is localized (<30% of content). Reduces token waste by batching corrections, replacements, and insertions as discrete update entries rather than regenerating files."
---

# Update Backlog System

## Purpose

Track document iterations as discrete update tasks rather than regenerating entire files. Reduces token waste and provides an audit trail of incremental changes.

## When to Activate

**USE when ALL true:**
- Document is 100+ lines
- Change is localized (affects <30% of document)
- Change type is: correction, bounded replacement, or additive insertion

**DO NOT use when ANY true:**
- Document is <100 lines
- Change requires structural reorganization
- Change is tonal/stylistic sweep
- User explicitly requests full regeneration ("full regen")

## Trigger Phrases

| User Says | Claude Does |
|-----------|-------------|
| "add to backlog" | Create backlog entry |
| "start backlog for [doc]" | Initialize new backlog |
| "show backlog" | Display current state |
| "apply backlog" / "generate vFinal" | Generate vFinal Integration Prompt |
| "full regen" | Bypass backlog, regenerate entire document |

## Backlog Entry Format

Each entry must include:

| Field | Required | Content |
|-------|----------|---------|
| Update ID | Always | UPD-XXX (sequential) |
| Created | Always | ISO 8601 timestamp |
| Type | Always | CORRECTION / BOUNDED REPLACEMENT / ADDITIVE INSERTION |
| Target | Always | Section + line range OR "after line X" |
| Context | Always | 1-3 sentences explaining WHY |
| Instruction | Always | Exact content to apply |
| Dependencies | If applicable | Which other UPD-XXX must be applied first |

## Sync Threshold Warnings

| Entry Count | Action |
|-------------|--------|
| 5 unresolved entries | Flag to user: sync is highly recommended |
| 8 unresolved entries | Escalate: "Strong Sync Recommendation" |

**Never refuse to add an entry based on count.** Warnings are advisory only.

## vLatest Reference Rule

When user references "vlatest", "latest version", or similar:

1. Check for highest version number in project
2. Check for active backlog (`UPDATE_BACKLOG_{filename}`)
3. If backlog exists: state base version + pending update count, ask whether to work from base only or apply backlog mentally
