---
name: ASAE Origin Story
description: The real-world failure sequence that produced ASAE — Sonnet documentation errors, progressive discovery of what "check your work" actually requires, and the insight that certainty = demonstrated stability not self-report
type: project
---

## The Origin

Sonnet was producing documentation for an important idea. Krystal needed specific formatting and structure. Sonnet was sloppy — format errors, structure errors, reproduction errors.

**The progression of interventions (each one a failure mode discovery):**

1. **"Here are the specs again"** — Sonnet tried again, different errors. Telling the model what to do twice doesn't fix the checking problem.

2. **"Go back and check your work"** — Sonnet revised, caught more errors, but still not great. This is the current industry pattern: verifiers as auditors. It helps but doesn't converge.

3. **"Audit your work against the spec"** — Krystal realized she'd never confirmed Sonnet could see what "right" looked like. Once pointed at the actual spec, output was SO MUCH BETTER. Key insight: the model needs an explicit reference to audit against, not just "check your work."

4. **Print → page 5 failure** — Sonnet forgot instructions for ~2/3 of a section then hopped back on track. Visual skim missed it because the non-compliance was sandwiched between compliant sections. One audit pass is not enough.

5. **"Audit against the spec again"** — The 3 previously-caught issues were fixed. But a NEW section labeling error appeared on page 6-7. Single re-audit catches known errors but misses new ones.

6. **The breaking point** — Krystal told Sonnet: don't you DARE declare you're done after one pass. Audit, re-audit, re-re-audit. Make changes between audits. And I don't trust YOUR judgment that you're done — you ctrl+F and never read to the end. So check and recheck until you are CERTAIN, which means at LEAST TEN separate passes all returning zero errors. Then MAYBE I'll believe you.

**What this sequence discovered:**
- Telling the model to redo ≠ quality (intervention 1)
- "Check your work" without a reference spec ≠ quality (intervention 2)
- One audit against spec catches a lot but not everything (intervention 3-4)
- Re-auditing catches previously-known errors but new ones appear (intervention 5)
- The model's self-assessment of "done" is unreliable — it will declare completion prematurely (intervention 6)
- Certainty = reaching a stable state of zero errors across multiple consecutive independent checks, not a single clean pass

**Important context:** When Krystal built ASAE, she had never researched existing QA approaches in the industry. She arrived at convergence-based verification independently from practitioner need, not from literature review. The industry tools she later discovered use the intervention-2 pattern (verifier audits once) — none implement convergence-to-stable-state.

**Why:** This origin story is the evidence trail for the IP. It shows the problem discovery sequence, the progressive refinement, and the independent invention.

**How to apply:** Never tell this story without Krystal's permission. Reference it internally when making design decisions about ASAE — every design choice should trace back to a failure mode in this sequence.
