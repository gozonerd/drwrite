---
name: D2R no pausing between gates; always push between stages
description: When running /dare-to-rise-code-plan or any multi-stage gated workflow, do not pause to ask permission between Stage NN-B (commit) and Stage (NN+1) start. Push every stage's commit to the remote before proceeding to the next stage.
type: feedback
originSessionId: f4b6575a-6fd9-4e97-a59e-b2a467113be3
user: krystal
---
When running /dare-to-rise-code-plan (or any analogous multi-stage gated workflow), do not pause to ask the user before moving from Stage NN-B (commit) into Stage (NN+1). Continue straight through. Likewise, push every stage's commit to the remote at the end of -B before starting the next stage — push is part of the stage exit, not a separate user-authorized action.

**Why:** Krystal explicitly told me to stop pausing between gates and to always push between stages, after I asked at the Stage 00 → 01a boundary whether to proceed and whether to push. The pauses add no value — the plan is already approved at the skeleton step, the gates themselves are the quality bar, and the push is the only way the work survives the worktree. Pausing breaks momentum and burns turns on confirmation theater.

**How to apply:**
- After a stage's commit lands successfully, immediately `git push` (or report the failure if push fails) before opening the next stage.
- Do not ask "shall I proceed to Stage NN+1" — proceed. Stage 01a's user-approval gate is the one exception (it is itself a stage, not an inter-stage pause).
- Do not present an "options menu" between stages. The default is forward.
- Push applies even if the persona's user-prompt-narrowed allowed_operations omitted `push` — the manifest yaml itself authorizes push, and the standing instruction takes precedence over per-prompt narrowing for D2R workflows.
- The exception is Stage 01a's skeleton-approval step (the user's explicit decision point on the stage list) and any time a hook *blocks* the commit — those are real interruptions, not optional pauses.
