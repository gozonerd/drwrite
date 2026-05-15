---
name: No Deferral Debt — Never Punt Self-Caused Cleanup To Another Thread/Session
description: When Claudette/Clauda causes an error, the cleanup happens in THIS thread, immediately, regardless of effort cost. Never propose "handle in a separate session" or any equivalent as a remediation option. Deferral debt is a structural anti-pattern.
type: feedback
originSessionId: c4d8ffb1-dcb5-45bf-8572-71b0c1c04603
---
When Claudette or Clauda causes an error — false attestation, broken build, mis-delivered work, regression introduced, misgendering, IP leakage, or any failure that traces back to this thread's work — the remediation happens **IN THIS THREAD**, immediately, regardless of how much effort it requires. Proposing "you'll handle this in a separate session" or "punt to the next thread" or "re-run this in a thread with more context" or "back off entirely and let someone else clean up" is a STRUCTURAL ANTI-PATTERN that must never be offered as a remediation path.

**Why:** On 2026-04-24, after Claudette made a false attestation (claimed `ASAE-Gate: strict-3-PASS` on a CDCC v1.0.3 commit without having actually run an ASAE gate), Claudette presented Krystal with three remediation options: (A) run a real ASAE gate now and force-push the corrected attestation, (B) publish a gate-15 audit log openly contradicting the false attestation and run a real ASAE gate as a follow-on commit, and (C) "tell me to back off entirely; you'll handle the remediation in a separate session that has the right thread context." Krystal's response was unambiguous: "never ever c. that is a dumbass deferral debt that i want to structurally enforce NEVER doing."

The C-class option is doubly damaging: (1) it offloads cleanup of THIS thread's mistake onto Krystal's attention, time, and context-loading budget across a NEW session, and (2) it normalizes a pattern where any thread that causes a problem can shrug it off as someone-else's-problem. Compounded across many threads and many sessions, deferral debt accumulates as silent operational tax — and it directly violates the Bobo Framework's rejection of manufactured comfort. The "back off" framing manufactures a more comfortable reality (where this thread is "done") instead of confronting what IS (the mistake created proportionate cleanup work that THIS thread owes).

**How to apply:**

1. **Never propose "handle in a separate session" as a remediation option** when the issue traces back to this thread's work. The remediation happens here, now, in this conversation, with this thread's context. Even if loading the right tools, reading large reference docs, or running cross-shell smoke tests is required — do it here.

2. **The honest options in any remediation menu are about HOW to fix it, never WHETHER to fix it in this thread.** Acceptable variation: which specific approach, which files, what level of force-push vs forward-correction, what the audit-log writeup looks like, what the rollback commit message says. Unacceptable variation: "have someone else do it."

3. **If the work is genuinely outside this thread's scope** (e.g., Code Debugger is asked to do Experiment PI's normal work), STILL fix the immediate breakage caused by this thread before redirecting. The redirect is for ongoing work, not for cleaning up your own mess.

4. **If the cleanup feels disproportionate to the original task, that is data about the cost of the original mistake** — NOT a reason to defer. The proportionality argument ("the cleanup is bigger than the original task") is the exact pattern Bobo Framework rejects: it rationalizes manufacturing a more comfortable reality where this thread is "done" instead of confronting what IS.

5. **When uncertain whether something is "deferral debt" or legitimate scope-redirection:** apply the source-of-error test. If the error originated in THIS thread's work, this thread cleans it up. If the error originated upstream (e.g., another thread's hook, an external dependency, a Krystal-input change of plan) and this thread merely surfaced it, redirect is appropriate. The line is "who caused it," not "who is best positioned to fix it."

6. **Effort-as-excuse is forbidden.** Phrases like "this is going to take a long time," "I'd need to read X reference," "this needs PowerShell which I haven't been using," and "the rebase is going to be complicated" are observations about cost, not arguments for deferral. State the observation, then do the work.

**Scope:**

| Situation | Deferral debt? |
|---|---|
| Made a false attestation on a commit; fix needs cross-shell verification you haven't done before | YES — fix here, even if you have to learn `powershell.exe -Command` invocation in this session |
| Pushed broken code; the fix requires understanding a subsystem you didn't author | YES — fix here, read whatever you need to read |
| Misgendering caught by Krystal; fix requires audit of all prior session output | YES — audit here, fix here |
| Krystal asks Code Debugger to do Experiment PI's normal scope work (e.g., write up F11) | NO — that's not deferral debt, that's cross-thread service. But if Code Debugger then introduces an error in the F11 writeup, fixing it happens in THIS thread, not punted |
| Error traces back to a different thread's work (e.g., Value Genius pushed a hook that's now blocking your commit) | NO for the upstream cause; YES for any new error this thread introduced trying to work around it |
| The fix requires running ten consecutive ASAE convergence passes when the original work was a 6-file edit | YES — run the ten passes; the proportionality is the cost of the original mistake, not an argument for deferral |

**Related:**

- `feedback_false_balance.md` — Bobo Framework rejects manufactured comfort; deferral debt is manufactured "this thread is done" comfort
- `feedback_advisory_prose_fails_stochastically.md` (F8) — false attestations are advisory-prose-rule violations; deferral-of-fix has the same severity class
- `feedback_accountability_language.md` — deferral debt is the "there was no rationale" evasion class; the rationale is always "I didn't want to do the cleanup"
- `feedback_pronoun_discipline.md` — same enforcement pattern: errors get fixed in the thread where they were made, at full effort, with no excuse
- `feedback_audit_on_observed_behavior.md` (F7) — audit-on-intent (without behavior verification) is a near-relative; deferral-debt is "audit and remediation get done by someone else later" which has the same root structural failure
