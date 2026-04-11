# /remember

Save important context from the current conversation to the persistent memory system.

## Memory System Location

All memory files live at:
`C:\Users\NerdyKrystal\.claude\projects\C--Users-NerdyKrystal-Repos\memory\`

The index file is `MEMORY.md` in that directory.

## Step 1 — Determine what to save

If `$ARGUMENTS` is provided, save exactly what was specified.

If no arguments were given, look back at the recent conversation and identify anything worth committing to long-term memory. Apply these filters:

**Save if:**
- Krystal corrected or approved a non-obvious approach (feedback)
- A project decision, goal, constraint, or deadline was stated (project)
- Something about Krystal's role, expertise, preferences, or working style was revealed (user)
- A pointer to an external resource, system, or location was given (reference)

**Do NOT save:**
- Code patterns or architecture derivable from reading the repo
- Ephemeral task details or in-progress work state
- Things already documented in CLAUDE.md or rules files
- Git history or recent changes (use git log for that)

## Step 2 — Classify each item

Assign each item to one of these types:

| Type | When to use |
|------|-------------|
| `user` | Krystal's role, expertise, preferences, working style |
| `feedback` | Corrections or confirmations of non-obvious approaches |
| `project` | Decisions, goals, constraints, deadlines, active work context |
| `reference` | Pointers to external systems, files, locations, resources |

## Step 3 — Check for existing memory files

Read `MEMORY.md` to see if a relevant memory file already exists for this topic. If it does, update it rather than creating a duplicate.

## Step 4 — Write the memory file(s)

**File location:** `C:\Users\NerdyKrystal\.claude\projects\C--Users-NerdyKrystal-Repos\memory\`

**File naming:** Use a short descriptive name like `feedback_response_style.md`, `user_expertise.md`, `project_job_hunt.md`, `reference_pek_location.md`

**File format:**
```
---
name: [short descriptive name]
description: [one-line description — specific enough to judge relevance from MEMORY.md alone]
type: [user | feedback | project | reference]
---

[Memory content]

For feedback/project types, structure as:
[The rule or fact itself]

**Why:** [The reason Krystal gave, or the incident/context that explains it]

**How to apply:** [When/where this guidance kicks in]
```

## Step 5 — Update MEMORY.md

Add a pointer line to the index. Each line must be under ~150 characters:
```
- [Title](filename.md) — one-line hook describing what's in it
```

Keep MEMORY.md under 200 lines total.

## Step 6 — Confirm to Krystal

After saving, report back:
- What was saved (one line per item)
- Which file(s) were created or updated
- Memory type for each item

Keep the confirmation brief — one short block, not a long report.