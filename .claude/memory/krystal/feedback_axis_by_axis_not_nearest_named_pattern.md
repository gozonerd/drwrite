---
name: When Comparing Martinez Methods Work Against Market, Check Axis-by-Axis — Not Nearest-Named-Pattern
description: Default research failure mode: agent sees a Martinez Methods component, identifies the nearest published pattern, reports "productized [pattern]" and collapses 6 novel axes into 1 shared axis. Corrective discipline: list each aspect explicitly, check each against published work individually.
type: feedback
originSessionId: 46056a33-f1c9-42ab-8260-97ba2f9b45f8
---
When researching competitive positioning or novelty of Martinez Methods components (ASAE, D2R, CDCC, Claude Cost, Claude Clarified Chat, etc.), default to **axis-by-axis comparison** — enumerate each constituent aspect of the Martinez Methods component and check each aspect independently against published work. DO NOT default to nearest-named-pattern shorthand.

Nearest-named-pattern shorthand is the failure mode where the researcher (agent, Claudette, or any synthesis layer) sees a Martinez Methods component with N structural properties, identifies the single nearest published pattern that shares SOME subset of those N properties, and reports the component as "productized [nearest-pattern]." This collapses the novelty of the combinatorial structure (all N together) into the novelty of packaging alone (N-1 or fewer shared; ignores the rest).

**Why:** On 2026-04-24 a market research agent evaluating ASAE's competitive position reported "ASAE = productized Self-Refine; pattern is known, product is rare." Krystal pushed back: ASAE combines seven critical aspects (external-spec-as-source-of-truth + deterministic severity-classified termination + stable-state N-consecutive-zero-error convergence + domain-agnostic packaging with domain-specific adapters + self-remediation iterate-fix-reaudit + permanent documented audit artifacts + meta-ASAE auditor-audits-itself). Axis-by-axis check revealed Self-Refine shares only ONE of those seven (self-remediation). The other six absent. ASAE is meaningfully distinct, not productized Self-Refine. The flattening ("productized [nearest-pattern]") under-characterized novelty by a factor of ~6 — if that characterization had leaked into a pitch, PRD, or paper, it would have undersold Martinez Methods' commercial story materially.

This is a general research-discipline failure, not specific to ASAE. Same risk applies to every component:
- D2R vs. Spec Kit / Kiro / Plan-before-code: not "productized planning"; check per-stage model assignments, four-document structure, severity-classified audit gates, factorial-experiment pedigree individually
- CDCC vs. Claude Code hooks generally: not "another hook plugin"; check non-bypassable workflow-discipline vs. security-governance vs. compliance framing individually
- Claude Cost vs. token calculators: not "another calculator"; check pipeline-estimation vs. single-prompt, plan-driven vs. ad hoc, reproducibility-package vs. none individually
- F1-F10 corpus vs. MAST / Microsoft failure taxonomy: not "parallel academic work"; check each F# against each published failure mode individually

**How to apply:**

1. **Before synthesizing any "Martinez Methods X is Y" claim, enumerate the constituent aspects of X.** Make a bulleted list. Be exhaustive.

2. **For each aspect, independently check whether Y (the candidate comparator) has that aspect.** Mark ✓ / ❌ / partial with source.

3. **Count the shared aspects vs. the total.** If sharing is <50% of aspects, "productized Y" is wrong — the thing is structurally different, not a packaging of Y.

4. **For Martinez Methods combinations specifically, check whether the COMBINATION is found anywhere.** Individual aspects are often found in isolation; the combination may be novel even when components are not.

5. **When commissioning research from sub-agents, the research brief must require axis-by-axis delivery** — not "closest analogue" or "dominant pattern." Phrase the brief as "for each of the following N aspects of X, find: published work that has this aspect; published work that has this aspect combined with aspect M; published work that has the full combination."

6. **If Krystal pushes back on a market-comparison claim, take it seriously.** She catches these. The "don't fall into sycophancy" discipline includes not over-weighting published research agents' claims — the research layer has its own biases toward flattening.

**What NOT to do:**

- Don't say "ASAE is productized Self-Refine." (It shares one axis of seven.)
- Don't say "D2R is productized spec-driven development." (Too reductive — check the specific axes.)
- Don't say "F1-F10 parallels MAST." (Parallel on some entries, novel on others — check each.)
- Don't say "CDCC is Claude Code governance." (It's workflow-discipline, not security-governance — different layer.)
- Don't trust any research-agent output that uses "productized [pattern]" or "parallel to [published work]" without axis-by-axis backing.

**Related:**
- `feedback_false_balance.md` — cousin rule: manufactured completeness is corrupted output. Nearest-named-pattern shorthand is a specific case of "manufactured completeness" — the synthesis layer manufactures an apparent competitive context by mapping to a known pattern, losing the combinatorial novelty.
- `feedback_no_silent_execution.md` — research runs must produce axis-by-axis reasoning, not just conclusions.
- `project_asae_origin.md` — ASAE is not productized Self-Refine; see the origin story for what it actually is.
