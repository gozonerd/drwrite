---
name: IP discipline includes mechanism vocabulary, not just forbidden-string list
description: When describing work that involved a Martinez Methods process, the description ITSELF must not use mechanism-revealing vocabulary; the strict forbidden-string list is the minimum bar, not the maximum.
type: feedback
---

Mechanism-revealing vocabulary is IP leakage even when the strict forbidden-string list passes. When publishing or committing any artifact that describes work involving a Martinez Methods process, scrub the vocabulary that describes HOW the methodology operates internally — not just the named brand strings.

Specifically (non-exhaustive):

- Threshold/pass-counting language: "null pass," "consecutive null passes," "Pass 1 / Pass 2 / Pass N," "counter resets," "N-PASS," any vocabulary that reveals the multi-iteration same-check structure.
- Convergence-loop language: "convergence loop," "convergence to stable state," "iterate until," "exit condition," "max-iteration."
- Severity-gating language: "severity-classified findings," "CRITICAL/HIGH/MEDIUM/LOW," "strict policy resets," "standard policy retains."
- Audit-pass-structure language: "same-pass-repeated," "identical-pass discipline," "full-checklist marker," "Step 1 / Step N" of the canonical methodology.
- Audit-log infrastructure language: gate-NN naming patterns, `deprecated/asae-logs/` paths, audit-log file structure (frontmatter + Pass-N blocks + severity summaries), full-audit-marker phrases required by the hook.
- Skill-name references that map to mechanism: invoking the canonical skill by path is itself a pointer to the mechanism doc.
- Hook-rule language: Rule 1 / Rule 2 / Rule 3 / Tier 1 / Tier 2-parse / Tier 3-parse / Tier 4 — these reveal the layered enforcement architecture.

**Why:** 2026-04-25 incident — Claudette the PEK Remediator v01 produced a session report and a backing audit log that passed the strict forbidden-string audit but extensively used the vocabulary above. Both files were committed to `_grand_repo` main and pushed to GitHub before Krystal flagged the leak. The strict list does not catch mechanism vocabulary because the strict list is a list of named brands and acronym expansions; the broader IP standard covers any term that lets a reader reconstruct mechanism.

**How to apply:**

1. Before publishing, run a SECOND scrub pass beyond the strict forbidden-string list, specifically targeting mechanism vocabulary categories above.
2. Replace mechanism-revealing terms with branded opaque references that name WHAT was done at the surface level only — e.g., "the gate cleared" instead of "N consecutive null passes converged"; "audited per the methodology" instead of "ran same-pass-repeated severity-classified convergence."
3. Audit logs themselves stay in `deprecated/asae-logs/` and are treated as INTERNAL ONLY by analogy with the Pre-Publication IP Scrub Checklist itself. They never appear in public-facing reports, READMEs, or external kits.
4. Commit-message bodies should attest threshold completion via the trailer alone; the body should not narrate HOW the threshold was reached. Body prose describes the WORK, not the audit mechanism.
5. When a public-going repo contains an audit-log directory or hook-rule documentation, that infrastructure must itself be redacted or moved internal before public-time, separate from the strict forbidden-string scrub.

**Scope:** applies to commit messages, repo READMEs, any artifact going to external assessors, any artifact going public, any GitHub-pushed file in a repo that is or will be public, and any chat-output describing this work that might be saved or referenced later.

**This entry is canonical.** It supersedes prior, narrower readings of "IP-clean" (e.g., interpretations that took the strict forbidden-string list as exhaustive). Earlier feedback memories on IP discipline (`feedback_ip_language`, `feedback_ip_discipline_filesystem`) remain valid for their respective surfaces (prose, filesystem); this entry adds the mechanism-vocabulary surface.
