---
name: AskUserQuestion tool is banned — prose + IDs instead
description: Krystal detests the AskUserQuestion picker; keep it hook-blocked and never call it. Present decisions as prose with short referenceable IDs.
type: feedback
user: krystal
---

Krystal detests the AskUserQuestion / multiple-choice picker tool. She previously had it blocked via hook enforcement; the block was lost in a migration and restored 2026-05-20. Never call it.

**How to apply:**
- Never invoke AskUserQuestion. A PreToolUse hook enforces this — the hook is the guarantee, not this note (advisory prose fails stochastically; hooks do not — see feedback_advisory_prose_fails_stochastically).
- When a decision is needed, present the options as prose with short referenceable IDs so she can answer by ID with minimal typing. ID format she specified: 6 characters = 3 alpha + 3 num, the numbers incrementing by one (e.g., RST001, RST002, RST003). Pick an alpha prefix that avoids any keyboard keys she has reported broken.
- Lead with your recommendation and mark it as such.
