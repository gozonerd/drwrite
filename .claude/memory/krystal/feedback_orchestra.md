---
name: Orchestra Session Feedback
description: Corrections and validated approaches from the Orchestra app builder session
type: feedback
---

Pre-push hooks (Prettier/ESLint/commitlint) were blocking pushes after the domain rename because renamed files didn't match formatting rules yet. We bypassed with `--no-verify` for WIP pushes.
**Why:** The hooks were enforcing style on code mid-refactor — fixing formatting before the refactor is complete is wasted effort.
**How to apply:** For WIP commits during large refactors, `--no-verify` is acceptable. Once the refactor stabilizes, fix lint/format and re-enable hooks.

Git discipline protocol was established: commit after every logical feature, test at phase gates.
**Why:** Krystal's laptop died mid-session once. Frequent commits saved the work.
**How to apply:** Commit early, commit often. Don't accumulate uncommitted changes.

Agents at deep context depth default to planning instead of executing edits. Large mechanical refactors (2,000+ line file splits, 50+ repeated edits) need to be done directly, not delegated to subagents.
**Why:** In the session 2 remediation pass, 5 consecutive agents explored/planned but refused to edit files despite explicit instructions. The context window was too deep.
**How to apply:** For large mechanical refactors, either do them directly in the main thread or save them for a fresh session with clean context. Don't re-launch agents expecting different behavior.

Krystal hated the amber/copper accent color (#c28b4a). Changed to teal (#4ec9b0) to match DrWrite's color language.
**Why:** Personal preference. She wants visual consistency across her apps.
**How to apply:** Orchestra's accent is teal #4ec9b0. Don't revert to amber. DrWrite uses the same teal.

Krystal insists on "orchestration" being in the tagline — not just "Orchestra" the app name.
**Why:** The word "orchestration" is the domain keyword that matters for portfolio positioning.
**How to apply:** Taglines must include "orchestration" (e.g., "Design your orchestration pipelines").
