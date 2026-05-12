---
title: "StrongMinds Regulatory Context"
skill_id: "SK-R01"
version: v02_I
date: 2026-03-06
owner: Martinez Methods
---

# StrongMinds Regulatory Context

## Purpose
Provide jurisdiction-specific regulatory context for all DATS pipeline outputs. Ensures every regulatory claim, compliance assessment, and governance recommendation is grounded in the correct legal framework for the applicable office(s).

## Jurisdictions

### Ghana (SMG — Global Coordination Office)
- Data Protection Act, 2012 (Act 843)
- National Communications Authority Act, 2008 (Act 769)
- Cybersecurity Act, 2020 (Act 1038)
- Electronic Transactions Act, 2008 (Act 772)
- Health-sector data governance: National Health Insurance Authority regulations

### Zambia (SMZ)
- Data Protection Act No. 3 of 2021
- Electronic Communications and Transactions Act No. 4 of 2021
- Cyber Security and Cyber Crimes Act No. 2 of 2021
- Health Professions Act, 2009
- National Health Insurance Act, 2018
- CommCare deployment context: SMZ-designed app, actively deployed, field staff favorability

### Uganda (SMU)
- Data Protection and Privacy Act, 2019
- Computer Misuse Act, 2011 (amended 2022)
- Electronic Transactions Act, 2011
- National Information Technology Authority (NITA-U) regulations
- Health-sector: National eHealth Strategy and Standards
- CommCare context: Piloted during Dimagi engagement (Jun–Dec 2024); staff retain institutional memory

### United States (SM-US — HQ)
- HIPAA (where applicable to health data shared with US-based staff)
- State-specific data protection laws (varies by SM-US office location)
- International data transfer requirements (data flowing from SMU/SMZ/SMG to SM-US)

## Usage Rules
1. Every regulatory claim must specify which jurisdiction(s) it applies to (ACC-004)
2. Cite specific statute sections, not generic law names (AFR-005)
3. Distinguish between enacted law, regulation, and guidance
4. Note effective dates and any pending amendments
5. When a requirement applies across jurisdictions, state each jurisdiction's specific provision separately
6. CommCare regulatory context must distinguish platform governance (open-source DPG, GID0090016) from deployment-specific regulatory requirements (ACC-008)

## Anti-Patterns
- Generic "African data protection law" claims without jurisdiction specificity
- Assuming Uganda and Zambia share identical regulatory frameworks
- Citing GDPR as directly applicable without noting its relevance pathway (e.g., international data transfer to EU partners)
- Treating CommCare's DPG status as a regulatory compliance exemption
