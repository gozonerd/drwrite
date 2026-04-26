---
name: Technical Requirements Document — Template
description: Reusable template for authoring a TRD as a prerequisite input to /dare-to-rise-code-plan. Defines what the system must do technically — functional requirements, non-functional requirements, integration, data, technical constraints. Filled-in instances feed into Stage 00 research.
type: template
skill: dare-to-rise-code-plan
version: v01_I
date: 2026-04-17
---

# Technical Requirements Document — Template

## How To Use This Template

Copy this file. Rename to `[ProjectPrefix]_TRD_[YYYY-MM-DD]_v01_I.md`. Fill in every required section. Mark optional sections as NA if not applicable with a one-line reason.

The TRD is downstream of the PRD and upstream of the D2R code plan. The PRD says what the product IS. The TRD says what the system MUST DO technically. The D2R code plan says HOW it will be built.

Required sections must be completed before `/dare-to-rise-code-plan` Stage 00 can run. An incomplete TRD produces degraded Stage 00 research because the research cannot scope itself against requirements that don't exist.

Every section has instructions (italic) and a placeholder format. Replace instructions with the filled-in content. Keep the section headers.

---

## 1. Document Identity

### 1.1 Project Name And Version

*State the project name (matching the PRD). State the version this TRD applies to (matching the PRD version).*

### 1.2 PRD Reference

*Cite the PRD this TRD is downstream of. Include file path or URL.*

### 1.3 Revision History

*Track revisions to this document. Required fields per revision:*
- *Version*
- *Date*
- *Changes summary*
- *Reviewer name*

---

## 2. Functional Requirements

### 2.1 Core Functional Requirements

*What the system must do. Stated in testable terms. Each requirement should be concrete enough that a test can be written against it.*

*Required format per requirement:*
- *Requirement ID (FR-NN)*
- *Statement: "The system MUST [verb] [object] [under conditions]."*
- *Rationale: why this requirement exists (trace to PRD if possible)*
- *Acceptance criteria: specific measurable conditions that indicate the requirement is met*
- *Priority: Must-Have / Should-Have / Could-Have / Won't-Have-This-Version (MoSCoW)*

### 2.2 User-Facing Behavior Requirements

*How the system behaves from the user's perspective. Can restate PRD user journeys in technical terms or add behaviors the PRD didn't specify.*

*Required format per behavior:*
- *Behavior ID (BR-NN)*
- *Description*
- *Input/trigger*
- *Expected output/response*
- *Timing expectation (synchronous, async with max latency, etc.)*

### 2.3 System-Facing Behavior Requirements

*How the system behaves internally — background jobs, scheduled tasks, event processing, data transformations not directly user-visible.*

---

## 3. Non-Functional Requirements

### 3.1 Performance Requirements

*Specific performance targets. Not "fast" — specific numbers.*

*Required fields:*
- *Response time: p50, p95, p99 targets for user-facing operations*
- *Throughput: requests/second or operations/minute at target load*
- *Data volume: expected max size of inputs, outputs, stored data*
- *Concurrent usage: how many simultaneous users/sessions supported*
- *Degradation behavior: what happens beyond targets (graceful slowdown vs hard refusal)*

### 3.2 Reliability Requirements

*Required fields:*
- *Uptime target (% availability)*
- *MTBF (mean time between failures) target*
- *Recovery time objective (RTO) — max time to recover from failure*
- *Recovery point objective (RPO) — max acceptable data loss window*
- *Failure modes explicitly tolerated vs prohibited*

### 3.3 Security Requirements

*Required fields:*
- *Authentication mechanism (if applicable)*
- *Authorization model (if applicable)*
- *Data in transit encryption*
- *Data at rest encryption*
- *Secret management approach*
- *Audit logging requirements*
- *Applicable security standards (OWASP Top 10, OWASP LLM Top 10 if LLM-integrated, CERT secure coding for language)*
- *Threat model summary or reference*

### 3.4 Privacy Requirements

*Required fields:*
- *Personal data collected/processed (categories)*
- *Applicable privacy regulations (GDPR, CCPA, COPPA, FERPA, etc.)*
- *Data minimization posture*
- *Retention policy*
- *User data rights supported (access, deletion, portability, correction)*
- *Cross-border data transfer handling*

### 3.5 Accessibility Requirements

*WCAG 2.1 AA is hardwired — not an optional requirement to negotiate. If additional standards apply (AAA where relevant, Section 508, EN 301 549 for EU, ARIA Authoring Practices for specific widgets), specify them.*

*Required fields:*
- *Target compliance level (WCAG 2.1 AA minimum)*
- *Additional standards if any*
- *Keyboard navigation completeness target*
- *Screen reader compatibility targets (specific SR/browser combinations tested)*
- *Color contrast floors*
- *Motion/animation requirements (prefers-reduced-motion support)*
- *Automated testing tool (axe-core is default)*
- *Manual testing protocol (NVDA/JAWS/VoiceOver + keyboard-only)*

### 3.6 Maintainability Requirements

*Required fields:*
- *Expected lifespan of the codebase (months/years before planned deprecation)*
- *Team size that will maintain (solo / small / large)*
- *Code quality gates (cyclomatic complexity floor, coverage floor, linting rules)*
- *Documentation quality floor (every module documented, etc.)*

### 3.7 Portability Requirements

*Required fields:*
- *Target platforms (web browsers + versions, operating systems, mobile, etc.)*
- *Target runtime environments*
- *Deployment targets (cloud providers, on-prem, local-only)*
- *Binary size / bundle size constraints if any*

### 3.8 Observability Requirements

*If the system will be operated in production:*
- *Logging requirements (what gets logged, at what level, in what format)*
- *Metrics requirements (what's measured, what's reported)*
- *Tracing requirements (distributed tracing if applicable)*
- *Alerting requirements (thresholds, escalation paths)*

---

## 4. Integration Requirements

### 4.1 External Systems

*Every external service, API, or system the project integrates with. Required per integration:*
- *System name*
- *Integration purpose*
- *API or protocol used*
- *Data exchange patterns (sync/async, push/pull)*
- *Authentication / authorization for the integration*
- *Rate limits / quotas*
- *Fallback behavior if the integration is unavailable*

### 4.2 Internal Systems (If Applicable)

*Other internal systems or components this project integrates with.*

### 4.3 Data Sources

*Every data source consumed. Required per source:*
- *Source name*
- *Update frequency*
- *Data format and schema*
- *Authority/ownership*
- *Staleness tolerance*
- *Licensing and terms of use*

---

## 5. Data Requirements

### 5.1 Data Entities And Schema

*Major data entities the system works with. Schema for each. Can reference external schema files.*

### 5.2 Data Volume Expectations

*Required fields:*
- *Expected record counts (per entity)*
- *Expected data growth rate*
- *Peak data volumes (if burst patterns apply)*
- *Data retention timeline*

### 5.3 Data Sensitivity Classification

*Required fields:*
- *Sensitivity classification per entity (public / internal / confidential / restricted)*
- *Handling rules per classification*
- *Data subject to regulatory requirements flagged with applicable regulation*

### 5.4 Data Validation Requirements

*Required fields:*
- *Input validation rules*
- *Schema validation approach (Zod, Pydantic, JSON Schema, etc.)*
- *Invalid data handling (reject / quarantine / sanitize)*

---

## 6. Technical Constraints

### 6.1 Mandatory Technology Choices

*Technologies that MUST be used. Includes:*
- *Languages (if constrained)*
- *Frameworks (if constrained)*
- *Deployment targets (if constrained)*
- *Integration requirements that constrain the stack (e.g., "must use SDK X")*

*If no mandatory technology choices exist, write "None — Stage 00 research selects the stack on best-fit grounds."*

### 6.2 Prohibited Technology Choices

*Technologies that MUST NOT be used, with reasons. Can be for licensing, security, organizational policy, or principled reasons.*

### 6.3 Platform Target

*Required:*
- *Platform(s) the product runs on (web / desktop / CLI / mobile / SDK / plugin form / etc.)*
- *Rationale for platform choice (from PRD or Stage 00 research)*

### 6.4 Hook Orchestration Requirements (D2R-Specific)

*The D2R skill requires hook orchestration at three layers (Claude Code hooks, git hooks, ASAE gate). This section specifies:*

- *Claude Code hooks the project requires installed in its `.claude/settings.json`*
- *Git hooks the project requires in `.githooks/`*
- *ASAE gate thresholds per stage type (default 2 for Stage 00, 3 for implementation, 5 for Stage QA)*
- *Any project-specific hook behavior*

### 6.5 Skill / Plugin Ecosystem Requirements

*Which skills or Claude Code plugins MUST be available during the build. Which skills or plugins would be beneficial but are not required. Which are explicitly excluded (if any, with reason).*

---

## 7. Assumptions And Dependencies

### 7.1 Technical Assumptions

*What is assumed to be true in the technical environment. Each assumption should be testable or have a fallback plan.*

### 7.2 External Dependencies

*Dependencies on external services, data sources, or organizational decisions that must exist or be made for this project to proceed.*

### 7.3 Timing Dependencies

*If certain other projects or decisions must complete before this can proceed.*

---

## 8. Out Of Scope (Technical)

*Technical work explicitly deferred. Each item should have a rationale and, if applicable, a version/milestone for revisiting.*

---

## 9. Open Technical Questions

*Unresolved technical decisions. Stage 00 research should address these or the TRD must be updated with resolutions before Stage 01.*

---

## 10. Stakeholder Approvals

*Who has approved this TRD? Without documented approval, Stage 00 should not begin.*

*Required format per stakeholder:*
- *Stakeholder name and role*
- *Approval date*
- *Approval notes (any conditions or flags)*

---

## Validation Checklist (Pre-Stage-00)

Before invoking `/dare-to-rise-code-plan`, verify:

- [ ] All required sections completed
- [ ] NA sections have one-line justifications
- [ ] Functional requirements stated in testable terms with acceptance criteria
- [ ] Non-functional requirements have specific numbers (not "fast", "secure", "reliable")
- [ ] WCAG 2.1 AA minimum accessibility declared; any additional standards specified
- [ ] Security requirements include applicable standards (OWASP, CERT, etc.)
- [ ] Privacy requirements address applicable regulations or explicitly justify NA
- [ ] Integration requirements complete for every external system
- [ ] Data sensitivity classification assigned to all major entities
- [ ] Technical constraints explicit; platform target declared
- [ ] Hook orchestration requirements specified (D2R prerequisite)
- [ ] Skill/plugin ecosystem requirements specified (D2R prerequisite)
- [ ] Assumptions documented with fallback plans
- [ ] Out-of-scope items named
- [ ] Stakeholder approval documented

A TRD missing any of these is not ready for D2R.

---

## Companion Documents

This TRD is one of three prerequisite inputs to `/dare-to-rise-code-plan`. The other two:

- **PRD (Product Requirements Document)** — what the product IS (must exist first)
- **TQCD (Testing & Quality Criteria Document)** — what success looks like quality-wise

See template files in the same `references/` directory.

## Downstream Use

This TRD feeds directly into:

- **Stage 00 Track 1:** Tech stack research scopes against the TRD's functional + non-functional + integration requirements
- **Stage 00 Track 2:** Applicable standards research scopes against the TRD's security, privacy, accessibility, performance requirements
- **Stage 00 Track 3:** Applicable benchmarks research scopes against the TRD's performance and maintainability targets
- **Stage 00 Track 4:** Language-depth-of-spec research scopes against the platform target and mandatory technology choices
- **Stage 00 Track 5:** Skill/plugin ecosystem research scopes against the skill/plugin requirements
- **Stage 01:** The authored D2R code plan is backwards-planned from the TRD's functional requirements + non-functional requirements + TQCD acceptance criteria
