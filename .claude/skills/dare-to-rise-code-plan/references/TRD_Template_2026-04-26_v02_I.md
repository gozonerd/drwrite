---
name: Technical Requirements Document — Template
description: Reusable template for authoring a TRD as a prerequisite input to /dare-to-rise-code-plan. Defines what the system must do technically — functional requirements, non-functional requirements, integration, data, technical constraints. Filled-in instances feed into Stage 00 research.
type: template
skill: dare-to-rise-code-plan
version: v02_I
date: 2026-04-26
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

### 3.1 Performance & Scale Requirements

*Specific performance targets. Not "fast" — specific numbers. This section feeds directly from Stage 00 Track 11 (Performance & Scale Engineering) outputs.*

*Required fields:*
- *Response time: p50, p95, p99 targets for user-facing operations*
- *Throughput: requests/second or operations/minute at target load*
- *Data volume: expected max size of inputs, outputs, stored data*
- *Concurrent usage: how many simultaneous users/sessions supported*
- *Degradation behavior: what happens beyond targets (graceful slowdown vs hard refusal)*
- *Performance budget allocation across tiers (frontend, network, backend, database) — see Track 11*
- *Scale model: vertical / horizontal / both; expected scale-out triggers*
- *Caching strategy summary (CDN, application cache, database cache) — Track 11 details*
- *Load profile assumptions (steady / bursty / time-of-day patterns) and source of truth for the assumption*

### 3.2 Reliability & Resilience Requirements

*Feeds from Stage 00 Track 14 (Reliability & Resilience) outputs.*

*Required fields:*
- *Uptime target (% availability)*
- *MTBF (mean time between failures) target*
- *Recovery time objective (RTO) — max time to recover from failure*
- *Recovery point objective (RPO) — max acceptable data loss window*
- *Failure modes explicitly tolerated vs prohibited*
- *Resilience patterns required (retries with backoff, circuit breakers, bulkheads, timeouts, idempotency keys) — Track 14*
- *Queue / async patterns required (DLQ, replay, exactly-once vs at-least-once) — Track 14*
- *Chaos / fault-injection posture (none / staging-only / continuous) — Track 14*
- *Disaster recovery plan reference (DR runbook location, last-tested date target)*

### 3.3 Security Requirements

*Feeds from Stage 00 Track 9 (Threat Modeling) and Track 15 (Auth & Identity).*

*Required fields:*
- *Authentication mechanism (if applicable) — Track 15 details (provider, protocol, session model)*
- *Authorization model (if applicable) — Track 15 details (RBAC / ABAC / policy engine)*
- *Identity provider integration if any (Auth0, Cognito, Clerk, custom, etc.)*
- *Multi-factor authentication policy (required / optional / disabled, for which roles)*
- *Session management (timeout, refresh, revocation)*
- *Data in transit encryption*
- *Data at rest encryption*
- *Secret management approach (vault product, KMS, environment-only, etc.)*
- *Audit logging requirements (which events, retention, integrity protection)*
- *Applicable security standards (OWASP Top 10, OWASP LLM Top 10 if LLM-integrated, OWASP ASVS level, CERT secure coding for language, NIST SP 800-53 control set if applicable)*
- *Threat model summary or reference (STRIDE / PASTA / LINDDUN if privacy-relevant) — Track 9 outputs land here*
- *Top threats identified and mitigation references — Track 9*
- *Trust boundaries enumerated — Track 9*

### 3.4 Privacy Requirements

*Feeds from Stage 00 Track 13 (Data Lifecycle & Privacy Engineering).*

*Required fields:*
- *Personal data collected/processed (categories, with sensitivity classification)*
- *Applicable privacy regulations (GDPR, CCPA, COPPA, FERPA, HIPAA, PIPEDA, LGPD, etc.)*
- *Data minimization posture (and how minimization is enforced in code/schema)*
- *Retention policy per data category — Track 13 lifecycle outputs*
- *User data rights supported (access, deletion, portability, correction, restriction, objection)*
- *Cross-border data transfer handling (standard contractual clauses, data residency constraints) — Track 13*
- *Subject access request (SAR) workflow target SLA — Track 13*
- *Data processing activities log / record-of-processing approach — Track 13*
- *Privacy-impact assessment (PIA / DPIA) reference if required*

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

*Feeds from Stage 00 Track 10 (Observability Stack) outputs. If the system will be operated in production these are NOT optional — observability is a hard prerequisite for any production-deployable system, not a post-launch retrofit.*

*Required fields:*
- *Logging requirements (what gets logged, at what level, in what format — structured JSON expected by default)*
- *Log aggregation target (Datadog / Splunk / ELK / Loki / CloudWatch / etc.) — Track 10*
- *Log retention and PII redaction policy (cross-references §3.4 Privacy)*
- *Metrics requirements (what's measured, what's reported, RED / USE method coverage) — Track 10*
- *Metrics backend (Prometheus / Datadog / CloudWatch / etc.) — Track 10*
- *Tracing requirements (distributed tracing if applicable, sample rate, propagation format) — Track 10*
- *Tracing backend (Jaeger / Tempo / Datadog APM / Honeycomb / etc.) — Track 10*
- *Alerting requirements (thresholds, escalation paths, on-call rotation) — Track 10*
- *SLI / SLO definitions and error budget policy — Track 10 + Track 14 cross-reference*
- *Dashboard inventory (which dashboards must exist before launch) — Track 10*

### 3.9 Release Engineering Requirements

*Feeds from Stage 00 Track 16 (Release Engineering & Versioning) outputs. Defines how the system gets to production and how changes get rolled back.*

*Required fields:*
- *Versioning scheme (SemVer / CalVer / hash-based, applicable to which surfaces — API, package, binary)*
- *Release cadence target (continuous / weekly / monthly / on-demand) — Track 16*
- *Branching model (trunk-based / GitFlow / GitHub Flow / Release Flow) — Track 16*
- *CI pipeline scope (lint, typecheck, unit tests, integration tests, e2e, security scans, SBOM, sign) — Track 16*
- *CD pipeline scope (artifact build, registry push, deploy stages: dev → staging → prod, gates between) — Track 16 + Track 12*
- *Feature flag platform (LaunchDarkly / Unleash / Flipt / Statsig / homegrown) — Track 16*
- *Progressive delivery posture (canary / blue-green / ring-based / dark launches) — Track 16*
- *Rollback strategy (forward-fix-only / one-click rollback / time-bound rollback window) — Track 16*
- *Release notes and changelog discipline (CHANGELOG.md / GitHub Releases / customer-facing notes)*
- *Release approval gate(s) (who approves; automated vs human gate) — Track 16*

### 3.10 Cost Requirements

*Feeds from Stage 00 Track 17 (Cost Modeling & FinOps) outputs. NA-with-justification permitted ONLY when total expected infrastructure spend is trivial (e.g., personal/local apps, static sites with no compute). State the justification in this section if NA.*

*Required fields (or "NA — [justification]"):*
- *Monthly infrastructure budget ceiling (USD or local currency) — Track 17*
- *Cost per active user / per request / per transaction targets — Track 17*
- *Cost-driving components identified (compute, storage, egress, third-party API calls, AI inference)*
- *Cost-control mechanisms required (auto-scaling caps, budget alerts, rate limits, request quotas) — Track 17*
- *Reserved capacity / commitment posture if applicable*
- *Cost observability requirements (tagging strategy, cost dashboard, anomaly alerts) — Track 17*
- *Unit economics breakeven assumption (if commercial)*

### 3.11 Internationalization Requirements

*Feeds from Stage 00 Track 18 (Internationalization & Localization) outputs. NA-with-justification permitted when the product is single-locale and there is an explicit decision (with rationale) to remain single-locale through the planned lifespan.*

*Required fields (or "NA — [justification]"):*
- *Initial supported locales (language + region codes, BCP-47 format) — Track 18*
- *Locales planned for future addition (and target version)*
- *Translation workflow (in-house / vendor / community / machine + post-edit) — Track 18*
- *String externalization standard (ICU MessageFormat / gettext / framework-native) — Track 18*
- *RTL (right-to-left) support requirement and target locales — Track 18*
- *Date / time / number / currency formatting standard (ICU / Intl / framework-native)*
- *Locale-aware sort and search behavior expectations*
- *Pseudo-locale testing posture (required / optional / NA) — Track 18*
- *Content moderation / cultural review process if applicable*

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

### 6.6 Deployment Architecture & Infrastructure-as-Code

*Feeds from Stage 00 Track 12 (Deployment Architecture & Infrastructure-as-Code) outputs. Defines where the system runs and how its environment is reproduced.*

*Required fields:*
- *Hosting target (specific provider + service: AWS Fargate, GCP Cloud Run, Vercel, Fly.io, on-prem k8s, etc.) — Track 12*
- *Environment strategy (which environments exist: dev / staging / prod / preview-per-PR) — Track 12*
- *Environment parity expectations (how close staging mirrors prod) — Track 12*
- *Infrastructure-as-Code tooling (Terraform / Pulumi / CDK / SST / framework-native) — Track 12*
- *Container strategy (Docker base image, multi-stage build, distroless, non-root, image scanning) — Track 12*
- *Secrets injection mechanism (env vars / KMS-decrypted-at-runtime / sidecar / vault agent) — cross-references §3.3*
- *Network architecture (VPC layout, public/private subnets, ingress, egress, service mesh if any) — Track 12*
- *Backup and DR plan (where backups live, retention, restore-test cadence) — cross-references §3.2*
- *Local development parity strategy (docker-compose / dev container / cloud dev environment) — Track 12*
- *Deployment automation tool (GitHub Actions / GitLab CI / CircleCI / Argo CD / Flux) — cross-references §3.9*

### 6.7 Design System & Frontend Tooling

*Feeds from Stage 00 Track 7 (Design System & Frontend Tooling) outputs. Required for any project with a UI surface; NA only when there is no human-facing UI.*

*Required fields (or "NA — no UI surface"):*
- *Design system source (custom / shadcn-ui / Material / Chakra / Mantine / Radix / Anthropic Design / etc.) — Track 7*
- *Component library tooling (Storybook / Ladle / Histoire) — Track 7*
- *Design token strategy (CSS variables / Tailwind config / Style Dictionary / framework-native) — Track 7*
- *Theming / dark-mode requirement and mechanism — Track 7*
- *Icon system (Lucide / Heroicons / custom / icon-font) — Track 7*
- *Typography stack and font-loading strategy — Track 7*
- *Design-to-code handoff tool (Figma + Dev Mode / Penpot / direct-from-spec) — Track 7*
- *Visual regression testing tool (Chromatic / Percy / Playwright snapshots / Reg-Suit) — Track 7*
- *Cross-reference to UXD: this section operationalizes the UXD's component and design-token decisions*

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
- [ ] §3.1 Performance & Scale: p50/p95/p99 + throughput + budget allocation specified
- [ ] §3.2 Reliability & Resilience: RTO/RPO + resilience patterns + DR plan reference
- [ ] §3.3 Security: OWASP / CERT / ASVS standards declared + threat model referenced
- [ ] §3.4 Privacy: applicable regulations declared (GDPR/CCPA/etc.) or NA justified
- [ ] §3.5 WCAG 2.1 AA minimum accessibility declared; any additional standards specified
- [ ] §3.8 Observability: SLI/SLO + logging/metrics/tracing backends specified
- [ ] §3.9 Release Engineering: versioning + branching + CI/CD + flags + rollback specified
- [ ] §3.10 Cost: budget ceiling + cost-control mechanisms specified, or NA-with-justification
- [ ] §3.11 Internationalization: locale plan specified, or NA-with-justification (single-locale + lifespan rationale)
- [ ] Integration requirements complete for every external system
- [ ] Data sensitivity classification assigned to all major entities
- [ ] §6 Technical constraints explicit; platform target declared
- [ ] §6.4 Hook orchestration requirements specified (D2R prerequisite)
- [ ] §6.5 Skill/plugin ecosystem requirements specified (D2R prerequisite)
- [ ] §6.6 Deployment architecture + IaC tooling specified
- [ ] §6.7 Design system & frontend tooling specified, or NA (no UI)
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

This TRD feeds directly into Stage 00's 16 hardwired research tracks (plus 4 applicability-gated tracks). Specifically:

**Foundational tracks (1-5):**
- **Track 1 — Tech Stack:** scopes against TRD §2 (functional), §3 (non-functional), §4 (integration), §6.1/6.2 (mandatory/prohibited tech)
- **Track 2 — Applicable Standards:** scopes against TRD §3.3 (security), §3.4 (privacy), §3.5 (accessibility), §3.1 (performance)
- **Track 3 — Applicable Benchmarks:** scopes against TRD §3.1 (performance) and TRD §3.6 (maintainability) targets
- **Track 4 — Language Depth-of-Spec:** scopes against §6.3 (platform target) and §6.1 (mandatory tech)
- **Track 5 — Skill / Plugin Ecosystem:** scopes against §6.5

**Design + UX tracks (6-8):**
- **Track 6 — UX & Design System:** scopes against UXD + §6.7
- **Track 7 — Design System & Frontend Tooling:** scopes against §6.7 (and lands its outputs there)
- **Track 8 — Accessibility Tooling:** scopes against §3.5 + UXD

**Production engineering tracks (9-16):**
- **Track 9 — Threat Modeling:** scopes against §3.3 (lands threat model + top threats)
- **Track 10 — Observability Stack:** scopes against §3.8 (lands logging/metrics/tracing/alerting choices)
- **Track 11 — Performance & Scale Engineering:** scopes against §3.1 (lands budgets, cache strategy, scale model)
- **Track 12 — Deployment Architecture & IaC:** scopes against §6.3 + §6.6 (lands hosting + IaC + envs + DR)
- **Track 13 — Data Lifecycle & Privacy Engineering:** scopes against §3.4 + §5 (lands lifecycle + SAR workflow + retention)
- **Track 14 — Reliability & Resilience:** scopes against §3.2 (lands resilience patterns + queue + DR posture)
- **Track 15 — Auth & Identity:** scopes against §3.3 (lands provider + protocol + session model)
- **Track 16 — Release Engineering:** scopes against §3.9 (lands versioning + branching + CI/CD + flags + rollback)

**Applicability-gated tracks (17-20):**
- **Track 17 — Cost Modeling & FinOps:** scopes against §3.10 (NA permitted with justification)
- **Track 18 — Internationalization & Localization:** scopes against §3.11 (NA permitted with justification)
- **Track 19 — AI / ML Engineering:** scopes against §2 + §3.3 (NA permitted when no AI in user-facing critical path)
- **Track 20 — Compliance & Regulatory:** scopes against §3.4 + PRD §6.2 (NA permitted when no regulated scope)

**Stage 01 onward:** The authored D2R code plan is backwards-planned from TRD §2 (functional) + §3 (non-functional) + TQCD acceptance criteria + Stage 00 research findings across all 16+4 tracks.
