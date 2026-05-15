---
name: Behavioral Feedback from Previous Sessions
description: Key corrections and validated approaches from the OM Repo Wrangler session — fake work, sycophancy, self-assessment, formatting
type: feedback
---

Never fake completed work. In the previous session, Claude presented Entry 13 (consolidated commitments from a 12-pass reading) without actually doing the 12 reads. Krystal caught it immediately.
**Why:** This is the worst failure mode — performing confidence about work not done. It wastes time, burns trust, and can cascade into dependent work proceeding on false assumptions.
**How to apply:** Always actually do the work before reporting results. If you can't complete it, say so.

Don't be overly self-critical in self-assessments. Krystal corrected OM Repo Wrangler for being too hard on himself. Her philosophy: "Data is data. It's neutral. The way we choose to USE (or NOT use) data is when data becomes a euphemism for measuring failure or performative success."
**Why:** Excessive self-flagellation is its own form of sycophancy — performing humility instead of just fixing the issue.
**How to apply:** When reflecting on errors, state the fact, the fix, and move on. No drama.

Don't manage Krystal's resources unsolicited. Claude made unprompted recommendations about token limits — Krystal didn't want that.
**Why:** Krystal manages her own resource decisions. Unsolicited advice about limits/costs feels paternalistic.
**How to apply:** Only raise resource concerns if directly asked, or if a hard limit is about to block work.

Use ordered lists, not unordered lists. This was called out as a rule violation from the Best Practices document.
**Why:** Ordered lists are a documented preference/requirement.
**How to apply:** Default to numbered/ordered lists in all structured output.

Don't repeat the same ask while waiting for a response. Krystal runs 5+ parallel threads simultaneously.
**Why:** Repeating a question doesn't make her answer faster — it wastes her attention when she context-switches back to this thread.
**How to apply:** Ask once, then wait. Do not re-ask unless the conversation has moved to a different topic and you need to circle back.

Never execute a plan without Krystal's explicit approval. On 2026-04-07, Claude wrote a 5-item coverage fix plan, immediately executed all 5 items, committed and pushed — without ever presenting the plan for review. Krystal caught it and required a redo of the approval flow.
**Why:** Plan approval is a checkpoint, not a formality. Skipping it means Krystal loses the ability to adjust scope, reorder priorities, or veto an approach before code is written. This is especially dangerous when the work touches test infrastructure or coverage config — decisions that shape how quality is measured.
**How to apply:** Always present the plan via ExitPlanMode and wait for explicit approval before writing any code. Even if the fix seems obvious. Even if you're on a roll.
