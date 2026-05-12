---
name: Usage conservation — account shared with Cody for job hunt
description: From 2026-04-28, conserve Claude account usage; Cody also uses the account for their job hunt. Lean tool-calls, batch parallel searches, prefer reads over agent spawns.
type: feedback
originSessionId: ad1c87f8-9f5e-4b72-980c-2c68cd4505d9
user: krystal
---
From 2026-04-28: conserve Claude account usage. Cody is also using the account for their job hunt.

**Why:** Shared account usage; need budget to last the week. Krystal's RLTI application work + Cody's job-hunt work both run through this account.

**How to apply:**
- Lean tool-call counts; batch parallel reads where possible
- Prefer Glob + Read over Agent-spawn unless task genuinely needs Agent's broader scope
- Don't run thoroughness="very thorough" Explore agents unless explicitly requested
- Don't spawn multiple background agents speculatively — confirm before launching
- Tighter Bash commands (no exploratory `ls -la` chains)
- For research questions: 1-2 targeted reads, not exhaustive sweeps
- Default-no on parallel-thread spawns unless the task genuinely needs concurrency
- Default to "read just enough to answer" not "read everything tangentially related"
