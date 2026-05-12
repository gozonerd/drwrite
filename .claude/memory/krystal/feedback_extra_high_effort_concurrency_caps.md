---
name: Background-agent concurrency caps — all parent threads, all effort levels
description: All parent threads (any model, any effort level) cap parallel background-agent spawns at 2 Opus equivalents (1 Opus = 2.5 Sonnets = 6 Haikus); sequence rounds if more agents are needed
type: feedback
originSessionId: 5bbbce8a-f733-4014-ad8f-1544228ee698
user: krystal
---
**All parent threads** — regardless of model (Opus, Sonnet, Haiku) or effort level — cap parallel **background-agent** spawns at a budget of **2 Opus subagent equivalents.**

Exchange rate: **1 Opus = 2.5 Sonnets = 6 Haikus.**

Maximums alone:
- **2 Opus background agents at once**
- **5 Sonnet background agents at once**
- **12 Haiku background agents at once**

Mixed dispatches must sum to ≤ 2 Opus equivalents (e.g., 1 Opus + 2 Sonnets + 1 Haiku = 1 + 0.8 + 0.17 = 1.97 → allowed).

If a job genuinely needs more agents than the cap allows (e.g., 10 Opus agents to do a job excellently), **sequence the work into rounds**: spawn the first batch up to cap, wait for completion, spawn the next batch, etc. Krystal will wait for as many rounds as needed.

**Why:** Krystal explicitly stated 2026-04-27: "If you need 10 Opus agents to do a job excellently, I will WAIT for 5 rounds of background agents to come back." The directive's purpose is to ENCOURAGE thoroughness/exhaustiveness/deliberateness — the cap is *not* a token-savings throttle; it is a universal concurrency guardrail. She wants quality over speed; she explicitly accepts multi-round latency. Updated 2026-04-28: cap applies to all parent threads regardless of effort level or model. Updated 2026-05-12: corrected from separate flat caps (2/4/6) to equivalence-based budget (1 Opus = 2.5 Sonnets = 6 Haikus; budget = 2 Opus equivalents).

**How to apply:**
- This rule applies to **background agents** specifically — agents spawned via the Agent tool with `run_in_background: true`. Foreground agent spawns (the default; results awaited inline) do NOT count against the cap.
- The cap is *equivalence-based* and *concurrent*: at the moment of spawn, sum all active background agents in Opus equivalents (1 Opus = 2.5 Sonnets = 6 Haikus). A new spawn is allowed if it does not push the total above 2 Opus equivalents.
- If a job needs N > cap agents, plan in rounds. Each round = up-to-cap parallel spawns, await all, then spawn next round. Document the rounds in any audit log.
- **Never** drop work, downscope, or shortcut to fit under the cap. The cap is an admission that work may take longer; it is not an instruction to do less.
- Applies to ALL parent threads: Opus, Sonnet, and Haiku parents; Default, Medium, Low, High, Extra High, and Max effort modes.
- Foreground rater spawns (e.g., /asae Step 6 independent rater) are the typical pattern for verification work; they do not count against the cap because they are foreground and inline-awaited.
