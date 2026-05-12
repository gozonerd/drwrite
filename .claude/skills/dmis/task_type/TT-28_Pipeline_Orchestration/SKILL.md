---
title: "Pipeline Orchestration"
skill_id: "SK-28"
version: v02_I
date: 2026-03-06
task_type: "TT-28"
pipeline_assignments: [P1, P2, P3, P4, P5, P6]
owner: Martinez Methods
---

# Pipeline Orchestration

## Purpose
Coordinate prompt assembly, output validation, monitoring, retry logic, notification, and logging across all pipeline stages.

## Pipeline Context
- **Pipelines**: P1, P2, P3, P4, P5, P6
- **Raw Tasks**: ORCH-1, ORCH-2, ORCH-3, ORCH-4
- **Thread Assignments**: Orchestration layer manages P1 (15 threads), P2 (25 threads), P3 (5 threads), P4 (5 threads), P5 (1 thread), P6 (16 threads/6 passes)
- **Category**: Orchestration

## Input Specification
- Pipeline configuration (stage definitions, task types, expected outputs)
- Input data for current stage (section context, previous outputs)
- Task type skill definitions and validation schemas
- Retry policy and error thresholds
- Notification recipients and escalation rules
- Logging configuration and storage location

## Output Specification
Orchestration log and status report in JSON format.
- Output must conform to: `schemas/tt28_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Execution log: timestamp, stage, task_type, status (running/success/failed/retrying)
- Output validation results per task type
- Retry attempts and final disposition
- Notification delivery confirmations
- Stage completion summary with timing metrics

## Methodology
1. **Prompt Assembly**: Construct stage-specific prompts from skill definitions, input context, and prior outputs
2. **Execution Dispatch**: Submit assembled prompts to task type agents with appropriate thread count
3. **Output Collection**: Gather outputs from all parallel threads
4. **Validation**: Apply task type schemas to validate output structure and completeness
5. **Error Handling**: Detect validation failures; trigger retry logic (max 1 retry per audit spec)
6. **Monitoring**: Track stage progress, timing, and resource utilization
7. **Notification**: Send status updates to configured recipients on completion or critical errors
8. **Logging**: Record all decisions, validations, retries, and completion status with timestamps

## Quality Criteria
- All prompts assembled with complete context and accuracy
- Output validation applies correct schema for each task type
- Retry logic respected (max 1 retry per audit layer spec)
- All validation failures logged with remediation details
- Notifications delivered to appropriate recipients in timely manner
- Log entries complete with timestamps and decision rationale
- No task type outputs pass validation with known defects

## Accuracy Rules
All outputs must comply with the 9 Critical Accuracy Rules (ACC-001 through ACC-009) defined in `ACCURACY_RULES.md`:
- ACC-001: CommCare current use vs. history
- ACC-002: Dimagi pilot = StrongMinds-wide
- ACC-003: Dimagi ≠ CommCare
- ACC-004: 4 offices always (SMU, SMZ, SMG, SM-US)
- ACC-005: DATS not DAD
- ACC-006: EFD not RQ-RE
- ACC-007: α ≥ 0.70 QA / ≥ 0.75 methodology
- ACC-008: CommCare IS a Digital Public Good (GID0090016)
- ACC-009: CommCare DET is standalone

## Anti-Patterns
- **Context Loss**: Assembling prompts without critical input context or previous results
- **Schema Mismatch**: Validating outputs against wrong or outdated task type schema
- **Silent Failures**: Accepting failed outputs without logging or escalation
- **Retry Abuse**: Retrying beyond policy limits or on unretryable errors
- **Notification Fatigue**: Generating excessive alerts or including non-critical events

## Examples
See example outputs in `references/example_outputs/`

---
**Last Updated**: 2026-03-06
**Status**: Active
