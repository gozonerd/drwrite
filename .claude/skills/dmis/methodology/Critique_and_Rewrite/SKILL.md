---
title: "Critique and Rewrite Methodology"
skill_id: "SK-M01"
version: v02_I
date: 2026-03-06
owner: Martinez Methods
---

# Critique and Rewrite Methodology

## Purpose
Iterative quality improvement through structured critique-and-rewrite cycles. Run a subagent to produce output, then critique the output against quality criteria, refine the prompt based on identified weaknesses, and rerun to produce an improved version.

## When to Use
- Thread output falls below quality thresholds but shows promise
- Specific weaknesses are identifiable and addressable through prompt refinement
- Available retry budget allows for additional invocation (check retry_limits in settings.yaml)

## Procedure
1. Execute initial subagent invocation with task-specific prompt
2. Evaluate output against quality criteria defined in the task-type SKILL.md
3. Identify specific weaknesses (structural gaps, missing coverage, accuracy violations)
4. Formulate critique as structured feedback (weakness → root cause → suggested fix)
5. Refine the original prompt by incorporating critique feedback
6. Rerun subagent with refined prompt
7. Compare v1 and v2 outputs; select the stronger version
8. Document the critique-rewrite cycle in the writing log

## Constraints
- Maximum 1 critique-rewrite cycle per audit layer (per OC-03 retry_limits.audit_layer_retries: 1)
- Maximum 2 cycles for thread generation (per OC-03 retry_limits.thread_generation_retries: 2)
- Maximum 2 cycles for synthesis (per OC-03 retry_limits.synthesis_retries: 2)
- Gate checks have 0 retries — they are pass/fail only
- Each cycle consumes token budget from the same task category allocation

## Anti-Patterns
- Running critique-rewrite without checking remaining retry budget
- Critiquing superficial issues while ignoring structural problems
- Prompt refinement that changes task scope rather than improving execution
- Not documenting the critique rationale for downstream traceability
