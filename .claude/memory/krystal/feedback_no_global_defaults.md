---
name: No Global Defaults — Per-Instance Configs Mandatory
description: Architectural rule: never define global defaults; per-instance configs (per-pipeline, per-persona, per-domain, per-repo) are mandatory. Global defaults flatten heterogeneity and re-introduce the problems we're trying to solve.
type: feedback
established: 2026-04-26
established_by_session: claude-code-cold-read-2026-04-25
---

## The Rule

For every architectural decision that has a "default behavior" axis, the answer is **per-instance config, not global default**. The system loads the per-instance config; if no config exists, the system **refuses to act** rather than falling back to a baked-in default.

## Why

Global defaults flatten the heterogeneity that the methodology exists to preserve. ASAE thresholds vary by domain. Maturity tier varies by pipeline. Failure-mode emphasis varies by task type. Honesty about what's strict vs lax varies by use case. A global default lies about all of these by claiming uniformity where there is none.

The Bobo Framework principle (mechanism articulation → rule production → structural enforcement) requires that the rule be enforced at the right granularity. Global defaults enforce at the wrong granularity by definition.

## Per-instance pattern

Each axis gets its config file at the instance scope:

| Axis | Per-instance config | Loader |
|------|--------------------|--------|
| Maturity tier | `<pipeline>/.maturity.yaml` | A25 MAVB hook |
| ASAE policy | `<repo>/.asae-policy` | commit-msg hook v03+ |
| Persona scope | `<persona>/role-manifest.yaml` | role-definition skill |
| Bidx routing | `<workflow>/BIDX-1.yaml` | bidx loader |
| Audit strategy | `<task-type>/.audit-strategy.yaml` | A23 TTAFMT hook |
| Maturity transitions | `<pipeline>/.maturity-history.jsonl` | A25 transition logic |

If the per-instance config is missing, the system MUST refuse to act with a clear message indicating what config is needed and where. Falling back to a global default is the F8-class regression.

## Anti-patterns (do NOT do)

- **"Sensible defaults":** any phrase containing "sensible default" is a flag — the question is whose sense, calibrated against what.
- **Configuration cascade:** repo-level → user-level → org-level → global. Composition is fine; falling back to GLOBAL when no instance config exists is not.
- **Hardcoded thresholds:** ASAE strict-3 baked into the skill. The skill should require the policy file; refuse to run without it.
- **Implicit class assignment:** "if no class label, assume `general`." No — refuse, demand class label.

## When NOT to apply

- **Bootstrap minimum:** the per-instance loader itself needs SOMETHING to load. The bootstrap loader's behavior IS the global default — but it should be a refusal-loader (refuse if no instance config) not a permissive-loader (proceed with hardcoded defaults).
- **Provably-uniform axes:** if an axis is truly uniform across all instances (e.g., "encoding is UTF-8"), per-instance is overhead. But these are rare and should be defended explicitly.

## Connection to other rules

- Composes with `feedback_use_time_task_for_all_tasks.md`: per-class median ratios live in per-pipeline `.maturity.yaml`.
- Composes with `feedback_no_silent_execution.md`: when refusing for missing config, surface what's missing (don't silently fail).
- Composes with A23 TTAFMT, A25 MAVB, BIDX-1.

**Why:** User explicit directive 2026-04-26: "make that a rule for all of our architecture decisions. and we should never be doing anything global as default."
**How to apply:** Whenever you're tempted to write "if X is unset, do Y," stop. Make the per-instance config required, refuse if missing, and provide the path + minimal-config example in the refusal message.
