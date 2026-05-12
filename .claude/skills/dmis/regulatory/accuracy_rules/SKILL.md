---
title: "Critical Accuracy Rules"
skill_id: "SK-R02"
version: v02_I
date: 2026-03-06
owner: Martinez Methods
---

# Critical Accuracy Rules

This skill is auto-injected into every subagent invocation. All outputs must comply with these rules without exception.

## 9 Critical Accuracy Rules

### ACC-001: CommCare — Current Use vs. Historical Deployment
CommCare is currently deployed in Zambia only (SMZ-designed app, strongly favored by field staff). However, CommCare was also deployed in Uganda during the failed Dimagi pilot (Jun–Dec 2024). SMU staff have institutional memory and hands-on experience. The correct framing: CommCare is an open-source platform actively used only in SMZ right now, evaluated on technical and operational merits across the organization.

### ACC-002: Dimagi PILOT Scope = StrongMinds-Wide
The failed Dimagi pilot (Jun–Dec 2024) involved BOTH Uganda and Zambia. Lessons learned (process failures, design mismatches, implementation barriers) apply organization-wide, not to one office exclusively.

### ACC-003: Dimagi ≠ CommCare
Dimagi is a consulting/services firm. CommCare is an open-source platform. The pilot failed due to Dimagi's process (no baseline user research, design-reality mismatch, weak change management) — not CommCare's platform capabilities. Cody Stahl's 7-year Dimagi tenure and top-5 global CommCare developer status is relevant to internal capacity assessment.

### ACC-004: 4 Offices Always
Every finding, recommendation, or observation must specify which office(s): SMU (Uganda), SMZ (Zambia), SMG (Global coordination), or SM-US (USA HQ). Never issue organization-wide statements without attribution.

### ACC-005: DATS not DAD
The deliverable is "DMIS Architecture & Tool Stack Document" (DATS). Never use "DAD," "DATD," or other variants.

### ACC-006: EFD not RQ-RE
The project methodology is Evidence-First Diagnostic (EFD). Never use "RQ-RE" or other legacy references.

### ACC-007: Convergence Threshold α ≥ 0.70
Convergence measured using Krippendorff's alpha (α). QA threshold: α ≥ 0.70. Methodology threshold: α ≥ 0.75. Always specify which threshold and the calculated α value.

### ACC-008: CommCare IS a Digital Public Good
CommCare is registered as a Digital Public Good (DPG) with UN Global ID GID0090016. Do not describe as proprietary, vendor-locked, or exclusively commercial.

### ACC-009: CommCare DET is Standalone
CommCare Data Export Tool (DET) is a separate, standalone Python CLI — not a built-in CommCare feature. Distinguish between CommCare's native export and DET.

## 6 Anti-Fabrication Rules

### AFR-001: Every Factual Claim Requires a Traceable Source
Do not state any claim about StrongMinds operations, systems, staff, or regulatory environment as fact unless you can point to a specific source. If the source is "general knowledge" or "assumption," flag as [NEEDS VERIFICATION] or remove.

### AFR-002: Never Invent Statistics, Quotes, or Regulatory Citations
Do not generate, estimate, or paraphrase statistics, direct quotes, or regulatory statute sections that you have not verified against source material. Flag uncertain items as [NEEDS VERIFICATION].

### AFR-003: When Uncertain, Flag as [NEEDS VERIFICATION]
If you encounter a claim you cannot verify against the Evidence Library or project documentation, mark as "[NEEDS VERIFICATION: [claim description]]" and do not include in final outputs.

### AFR-004: Cross-Reference Claims Against Evidence Library
The Evidence Library (`04_Evidence_Library/`) is the single source of truth. Before including any claim, search for supporting evidence. If not found, locate evidence or flag.

### AFR-005: Regulatory Citations Must Reference Specific Statute Sections
Always include specific statute, section, and date. Generic references like "per Zambia's data protection law" are insufficient. Cite exact statutory section.

### AFR-006: Quote Verification — Fuzzy Match ≥ 85%
Any direct quote must match source material with ≥ 85% word-for-word accuracy. If exact wording cannot be confirmed, paraphrase and attribute instead of using quote marks.

## Enforcement
- These rules are checked by TT-08 (Rule-Based Compliance Testing) at every convergence audit layer
- Violations trigger HALT status and require resolution before synthesis
- The convergence judge (SA-J01) and quality gate judge (SA-J02) both enforce these rules
- Full rule definitions with violation examples: see `ACCURACY_RULES.md` at project root
