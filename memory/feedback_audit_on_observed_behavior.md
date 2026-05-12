---
name: Audit On Observed Behavior, Not On Intent (F7)
description: ASAE gates and all code-domain audits MUST include execution (npm test, tsc, lint, build) against the actual artifacts. Reading code and approving intent is insufficient. Sub-agents must run their own tests before returning.
type: feedback
originSessionId: 46056a33-f1c9-42ab-8260-97ba2f9b45f8
---
ASAE and any code-domain audit that only READS the artifacts and approves their intent is incomplete. Artifacts must be EXECUTED as part of the audit — tests run, types checked, lint cleared, build succeeded. An artifact that reads correct but doesn't execute correct has not converged.

**Why:** On 2026-04-22, the CDCC (Claudette Can Code Pro) hero C4 build produced 82 files across 9 commits with 4 ASAE gates all marked "converged." External verification (npm install + npm test + typecheck + lint against the harvested workspace) revealed 24/68 test failures, 14 TypeScript errors, and 28 lint errors — clustered on three patterns (Ajv v8 ESM import shape, JSON schema module resolution, hook-installer test fixture setup). The Haiku sub-agents that implemented Stages 03 + 04 wrote code + tests without ever running them. The ASAE gates audited the code for correctness-against-spec by reading it; they did not execute it. Result: gates converged on intent while observed behavior failed. This is a distinct failure mode from F6 (skill non-invocation) and worth naming separately.

**How to apply:**

1. **Every Haiku (or any sub-agent) delegation prompt MUST include mandatory exit criteria:** "run `npm test && npm run typecheck && npm run lint` before returning; if any exits non-zero, iterate until all three exit zero; include literal exit-code output in your return summary." No return without behavior verification.

2. **Every ASAE gate at domain=code MUST include execution sub-checks.** Reading code for spec-match is the first half; running tests/typecheck/build/lint is the load-bearing half. A gate that skips the second half is running at audit-on-intent severity, which is insufficient.

3. **Every D2R stage completion criterion MUST include observed-behavior thresholds.** "Code written" is not "stage complete." "Code written AND tests pass AND typecheck clean AND build succeeds AND lint clean" is "stage complete."

4. **The parent Opus orchestrator MUST verify the sub-agent actually executed tests.** Check the sub-agent's session log/return for the commanded test execution + exit-code output. If the sub-agent returned without behavior verification, re-delegate — don't accept and proceed.

5. **Structural enforcement via CDCC:** the `PostToolUse` hook on `Write|Edit` that automatically runs verify-commands after any code change is the structural solution. When CDCC ships and its hooks are installed, audit-on-intent becomes operationally impossible for managed projects.

**Scope — what this catches:**

| Surface | Must include observed-behavior check |
|---|---|
| ASAE domain=code audits | Yes (npm test, tsc, lint, build) |
| ASAE domain=document audits | No (documents don't execute; reading-level audit is sufficient) |
| D2R Stage 02 (scaffold) completion | Yes (config validity verified by running the tools: `tsc --noEmit` + `vitest --run` + `eslint`) |
| D2R Stage 03+ (implementation) completion | Yes (npm test passing at declared coverage threshold) |
| D2R Stage 04+ (enforcement / hook layer in CDCC) completion | Yes AND include hook-firing verification tests |
| Pre-BUILD-COMPLETE sentinel emission | Yes (the full test suite + mutation testing if configured) |
| PRD / TRD / AVD / TQCD authorship by write-* skills | No (document domain) |

**Related:**
- `feedback_no_silent_execution.md` — its cousin: don't run phases silently. F7 is don't APPROVE phases silently (without behavior checks).
- `project_cdcc_hook_enforcement.md` (when CDCC ships) — CDCC's PostToolUse hooks are the structural implementation of this rule.
- `exploratory_findings_2026-04-22_prompt-variance_v01_I.md` in _experiments — F1-F6 natural experiment; F7 is the follow-on finding from the CDCC build session.
