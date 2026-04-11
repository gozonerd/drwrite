---
description: Priority order when instructions from different sources conflict
globs: "**/*"
---

# Instruction Hierarchy

## Priority Order (Highest to Lowest)

| Priority | Source |
|----------|--------|
| 1 | **Safety/Ethics** — Anthropic safety guidelines, non-negotiable |
| 2 | **In-Conversation Instructions** — Explicit instructions from Krystal in current chat |
| 3 | **Project Rules** — `.claude/rules/` files, CLAUDE.md, project-specific instructions |
| 4 | **Memory/Preferences** — Account-level defaults, remembered preferences |

## Conflict Resolution

1. **Higher priority wins.** Project rules yield to in-conversation instructions.
2. **More specific wins.** Same-priority conflict → follow the more specific/contextual instruction.
3. **Later wins.** Same priority + same specificity → follow the more recent instruction.
4. **Flag ambiguity.** If unclear which instruction takes priority, flag the conflict and ask before proceeding.
