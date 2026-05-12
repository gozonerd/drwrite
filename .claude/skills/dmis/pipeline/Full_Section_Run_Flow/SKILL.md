---
title: "Full Section Run Flow"
skill_id: "SK-F07"
version: v02_I
date: 2026-03-06
owner: Martinez Methods
---

# Full Section Run Flow

## Purpose
Orchestrate the complete section processing pipeline: execute P1 through P4 for a single DATS section in sequence, including human gates at P3 and P4, with final handoff to appendix generation and document audit.

## Section Processing Sequence

The 10 DATS sections are processed in this order (per Critical Rules Section 8):
1. **S2** (Strategic Context)
2. **S4** (Tool Requirements & Specifications)
3. **S6** (Regulatory & Compliance Framework)
4. **S5** (Architecture & Integration Model)
5. **S3** (Current State Assessment)
6. **S7** (Implementation Roadmap)
7. **S9** (Transition & Change Management)
8. **S8** (Governance & Roles)
9. **S10** (Risk Management & Monitoring)
10. **S1** (Executive Summary — last, synthesizes all)

## For Each Section: P1 → P2 → P3 → P4

### Step 1: Execute P1 (PG Production Flow)
- **Skill**: SK-F01
- **Input**: Section requirements + evidence context
- **Output**: pg_synthesis (primary narrative)
- **Gate**: Quality gate (SA-J02) must pass
- **On Failure**: Section marked BLOCKED; escalate to Cody Stahl
- **On Success**: Proceed to P2

### Step 2: Execute P2 (DR Production Flow)
- **Skill**: SK-F02
- **Input**: P1 output + evidence context
- **Output**: dr_synthesis (diagnostic and rationale)
- **Gate**: Quality gate (SA-J02) must pass
- **On Failure**: Section marked BLOCKED; escalate to Cody Stahl
- **On Success**: Proceed to P3

### Step 3: Execute P3 (DO Pipeline Flow) — INCLUDES HUMAN GATE
- **Skill**: SK-F03
- **Input**: P1 + P2 outputs + design constraints
- **Output**: do_synthesis (design options)
- **Human Gate**: Awaits human approval of design options
  - **Timeout**: 24 hours; auto-proceed with top-ranked if not approved
  - **Options**: Approve thread, approve alternate, hybrid directive, or redesign required
- **Gate**: Quality gate (SA-J02) must pass
- **On Failure**: Section marked BLOCKED; escalate to Cody Stahl
- **On Success**: Proceed to P4

### Step 4: Execute P4 (DD Pipeline Flow) — INCLUDES HUMAN GATE
- **Skill**: SK-F04
- **Input**: P1 + P2 + P3 outputs + approved design options
- **Output**: dd_synthesis (detailed design + implementation guidance)
- **Human Gate**: Awaits human approval of implementation plan
  - **Timeout**: 36 hours; auto-proceed with top-ranked if not approved
  - **Options**: Approve thread, approve alternate, conditional approval, hybrid directive, or redesign required
- **Gate**: Quality gate (SA-J02) must pass
- **On Failure**: Section marked BLOCKED; escalate to Cody Stahl
- **On Success**: Section is COMPLETE

## Section Completion Criteria
A section is marked COMPLETE only when:
- P1 quality gate passed
- P2 quality gate passed
- P3 quality gate passed (with human gate decision documented)
- P4 quality gate passed (with human gate decision documented)
- All convergence audits (8 + 11 + 7 + 16 = 42 layers total per section) passed with α ≥ 0.70
- No [NEEDS VERIFICATION] flags remain in final output

## Notifications (Telegram)
- `section_start`: Processing section [ID] beginning with P1
- `p1_complete`: P1 pipeline complete for section [ID]
- `p2_complete`: P2 pipeline complete for section [ID]
- `p3_human_gate`: P3 human gate awaiting approval for section [ID] (24-hour timer)
- `p3_complete`: P3 pipeline complete for section [ID]
- `p4_human_gate`: P4 human gate awaiting approval for section [ID] (36-hour timer)
- `p4_complete`: P4 pipeline complete for section [ID]
- `section_complete`: Section [ID] fully processed and ready for document assembly
- `section_blocked`: Section [ID] failed final quality gate; escalation required

## Error Handling

### P1 Quality Gate Failure
- **Action**: HALT section processing
- **Escalation**: Notify Cody Stahl with specific failure details
- **Options**: Rework section, or reduce scope and restart

### P2 Quality Gate Failure
- **Action**: HALT section processing
- **Escalation**: Notify Cody Stahl with specific failure details
- **Options**: Rework diagnostic layer, or reduce scope and restart

### P3 Quality Gate Failure
- **Action**: HALT section processing
- **Escalation**: Notify Cody Stahl with human gate outcome + quality gate failure details
- **Options**: Human may request design options refinement, or reduce scope and restart

### P4 Quality Gate Failure
- **Action**: HALT section processing
- **Escalation**: Notify Cody Stahl with human gate outcome + quality gate failure details
- **Options**: Most critical layer; may require scope reduction or redesign

### Human Gate Timeout (P3 or P4)
- **Action**: Auto-proceed with top-ranked thread
- **Notification**: Telegram alert that timeout occurred, defaulting to specified thread
- **Log**: Document timeout and auto-decision in audit trail

### Human Rejects All Threads
- **Action**: If P3 rejects all design option threads → section requires redesign
- **Action**: If P4 rejects all detailed design threads → document may require scope reduction
- **Escalation**: Cody Stahl decides on re-scoping vs. section elimination

## Token Budget Tracking
- Track cumulative token usage across P1, P2, P3, P4 for this section
- If remaining budget < 20% of section allocation, notify Cody Stahl
- If budget exhausted, HALT section and escalate

## Timeline Per Section (Nominal)

| Phase | Time |
|-------|------|
| P1 (thread gen + audit + synthesis + gate) | 24–37 min |
| P2 (prompt eng + thread gen + audit + synthesis + gate) | 37–54 min |
| P3 (thread gen + audit + **human gate 0–24h** + synthesis + gate) | 19–31 min + 0–24h wait |
| P4 (thread gen + audit + **human gate 0–36h** + synthesis + gate) | 39–56 min + 0–36h wait |
| **Total per section** | 119–178 min automated + 0–60h human gates |

**In practice**, if human gates resolve within typical timeframes (30 min for P3, 1–2 hours for P4), each section takes **3–4 hours wall-clock time**.

## Parallel Execution Strategy
After a section completes P4 successfully, the next section in the queue can begin P1 immediately. This allows **pipeline parallelization** if multiple sections are being processed:
- Section S2 in P3 human gate → Section S4 begins P1
- Section S2 in P4 human gate → Section S4 in P3 human gate → Section S6 begins P1
- And so on, up to resource/token budget limits

## Relationship to P5 and P6
- All 10 sections must complete (all four pipelines P1–P4) before P5 (Appendix Generation) begins
- All 10 sections + appendices must complete before P6 (Full DATS Audit) begins
- P6 is the final document-level validation
