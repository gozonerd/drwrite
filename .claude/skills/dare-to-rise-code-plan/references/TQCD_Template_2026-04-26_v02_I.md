---
name: Testing & Quality Criteria Document — Template
description: Reusable template for authoring a TQCD as a prerequisite input to /dare-to-rise-code-plan. Defines what success looks like quality-wise — applicable Testing Taxonomy categories with exit criteria, applicable standards operationalized as exit criteria, applicable benchmarks with target scores, coverage floors, accessibility criteria, performance budgets. Filled-in instances feed into Stage 00 research and Stage 01 QA-first plan authorship.
type: template
skill: dare-to-rise-code-plan
version: v02_I
date: 2026-04-26
---

# Testing & Quality Criteria Document — Template

## How To Use This Template

Copy this file. Rename to `[ProjectPrefix]_TQCD_[YYYY-MM-DD]_v01_I.md`. Fill in every required section. Mark optional sections as NA if not applicable with a one-line reason.

The TQCD is downstream of the PRD (what the product IS) and TRD (what it MUST DO), and upstream of the D2R code plan. The TQCD defines EXIT CRITERIA — what quality looks like, measurably, in a form the plan can be backwards-planned from.

The D2R code plan Stage 01 uses the TQCD to design Stage QA BEFORE designing any implementation stages. This is the operationalization of backwards-planning-from-excellence.

Required sections must be completed before `/dare-to-rise-code-plan` Stage 00 can run. An incomplete TQCD means Stage 01 cannot QA-first-backwards-plan.

---

## 1. Document Identity

### 1.1 Project Name And Version

*State the project name (matching the PRD/TRD). State the version this TQCD applies to.*

### 1.2 PRD And TRD References

*Cite the PRD and TRD this TQCD is downstream of.*

### 1.3 Revision History

*Track revisions with version, date, changes, reviewer.*

---

## 2. Testing Taxonomy Applicability

The D2R skill's reference file at `.claude/skills/dare-to-rise-code-plan/references/Software_Testing_Taxonomy_2026-04-17_v01_I.md` documents 20 test categories (Part 1) and 39 stress test categories (Part 2) with an AI-driven selection strategy (Part 3).

For every category in the Taxonomy, this section declares applicability: YES (with exit criteria) or NO (with reason).

### 2.1 Test Categories (Part 1, 20 Categories)

For each category, declare: applies (yes/no), exit criteria if yes, reason for skipping if no.

**Unit Tests**
- Applies: [yes/no]
- Exit criteria if yes: [coverage threshold, specific testing patterns expected]
- Skip reason if no:

**Integration Tests**
- Applies: [yes/no]
- Exit criteria if yes:
- Skip reason if no:

**Component / Module Tests**
- Applies: [yes/no]
- Exit criteria if yes:
- Skip reason if no:

**End-to-End (E2E) Tests**
- Applies: [yes/no]
- Exit criteria if yes:
- Skip reason if no:

**Functional Tests**
- Applies: [yes/no]
- Exit criteria if yes:
- Skip reason if no:

**Regression Tests**
- Applies: [yes/no]
- Exit criteria if yes:
- Skip reason if no:

**Smoke Tests**
- Applies: [yes/no]
- Exit criteria if yes:
- Skip reason if no:

**Sanity Tests**
- Applies: [yes/no]
- Exit criteria if yes:
- Skip reason if no:

**Acceptance Tests (UAT)**
- Applies: [yes/no]
- Exit criteria if yes:
- Skip reason if no:

**Contract Tests (API-level)**
- Applies: [yes/no]
- Exit criteria if yes:
- Skip reason if no:

**Performance Tests**
- Applies: [yes/no]
- Exit criteria if yes: [specific p50/p95/p99 targets from TRD]
- Skip reason if no:

**Security Tests**
- Applies: [yes/no]
- Exit criteria if yes: [specific standards from TRD Section 3.3]
- Skip reason if no:

**Usability Tests**
- Applies: [yes/no]
- Exit criteria if yes:
- Skip reason if no:

**Accessibility Tests**
- Applies: [yes — always for UI, hardwired]
- Exit criteria: [WCAG 2.1 AA minimum; specific AAA items if required; automated tool results + manual testing protocol from TRD Section 3.5]
- Skip reason: [only valid if product has no UI at all]

**Snapshot / Visual Regression Tests**
- Applies: [yes/no]
- Exit criteria if yes:
- Skip reason if no:

**Property-Based / Fuzz Tests**
- Applies: [yes/no]
- Exit criteria if yes: [specific invariants the property tests enforce]
- Skip reason if no:

**Mutation Testing**
- Applies: [yes/no]
- Exit criteria if yes: [mutation score threshold]
- Skip reason if no:

**CI/CD Pipeline Tests**
- Applies: [yes — always if the project uses git]
- Exit criteria: [jobs run on every PR, merge protection, required statuses]
- Skip reason: [only valid if the project has no CI]

**Canary / A/B Testing (in production)**
- Applies: [yes/no]
- Exit criteria if yes:
- Skip reason if no: [typically MVP has single deploy target; skip with this reason]

**Monitoring / Observability (post-deploy)**
- Applies: [yes/no]
- Exit criteria if yes: [metrics captured, dashboards, alerts — typically tied to TRD Section 3.8]
- Skip reason if no: [typically MVP without production operation]

### 2.2 Stress Test Categories (Part 2, 39 Categories)

For stress tests, apply the AI-driven selection strategy from Part 3 of the Testing Taxonomy:

For each stress category:
- Does this system have the component this test targets?
- Is failure in this component high-severity for this use case?
- Is this failure mode plausible given actual usage patterns?

If yes to all three: include with target scenario. If no to any: skip with justification.

**Shortened per-category format:**

| # | Category | Applies | Scenario (if yes) / Skip Reason (if no) |
|---|----------|---------|----------------------------------------|
| 1 | Classic Stress Test | | |
| 2 | Spike Testing | | |
| 3 | Breakpoint Testing | | |
| 4 | Soak (Endurance) Testing | | |
| 5 | Volume Testing | | |
| 6 | Scalability Testing | | |
| 7 | Capacity Testing | | |
| 8 | CPU Stress Testing | | |
| 9 | Memory Stress Testing | | |
| 10 | Disk I/O Stress Testing | | |
| 11 | Network Bandwidth Stress | | |
| 12 | File Descriptor / Handle Exhaustion | | |
| 13 | Service Dependency Failure | | |
| 14 | Cascading Failure Simulation | | |
| 15 | Partition Testing (Network Splits) | | |
| 16 | Retry Storm Testing | | |
| 17 | Queue Backlog Stress | | |
| 18 | Chaos Engineering Tests | | |
| 19 | Fault Injection Testing | | |
| 20 | Latency Injection | | |
| 21 | Resource Throttling | | |
| 22 | Database Contention Testing | | |
| 23 | Cache Stress Testing | | |
| 24 | Data Corruption Simulation | | |
| 25 | Large Payload Testing | | |
| 26 | Concurrent User Stress | | |
| 27 | Peak Traffic Pattern Simulation | | |
| 28 | Abusive / Edge Behavior Testing | | |
| 29 | DDoS Simulation | | |
| 30 | Authentication Flood Testing | | |
| 31 | UI Stress Testing | | |
| 32 | Device Resource Stress | | |
| 33 | Auto-Scaling Stress | | |
| 34 | Cold Start Stress (serverless) | | |
| 35 | Deployment Stress | | |
| 36 | Configuration Stress | | |
| 37 | Mixed Workload Testing | | |
| 38 | Game Day / Fire Drill Testing | | |
| 39 | Recovery Testing (under stress) | | |

---

## 3. Standards Operationalized As Exit Criteria

From the TRD's applicable standards (Section 3.3 Security, 3.4 Privacy, 3.5 Accessibility, applicable regulations), operationalize each standard as measurable exit criteria.

### 3.1 Per-Standard Exit Criteria

*For each standard referenced in the TRD, list specific exit criteria that can be verified.*

*Required format per standard:*
- *Standard name and version*
- *Applicable requirements (specific section or rule numbers)*
- *Measurable exit criterion per requirement*
- *Verification method (automated test, manual audit, third-party certification, etc.)*
- *Pass threshold*

*Example for WCAG 2.1 AA:*
- *1.1.1 Non-text Content: all images have alt text or aria-label. Verified by axe-core. Pass: zero violations.*
- *1.4.3 Contrast (Minimum): all text meets 4.5:1 (3:1 for large text). Verified by axe-core + manual spot check. Pass: zero violations at AA level.*
- *2.1.1 Keyboard: all functionality accessible via keyboard. Verified by manual keyboard-only navigation. Pass: every interactive element reachable and operable.*

### 3.2 Regulatory Compliance Exit Criteria

*For each regulation applicable per TRD §3.4 (and Track 13 / Track 20), specific exit criteria that demonstrate compliance.*

### 3.3 Data Lifecycle & Privacy Exit Criteria (Track 13)

*Operationalizes TRD §3.4 Privacy Requirements as testable exit criteria.*

*Required fields:*
- *Data minimization verification (every collected field has documented purpose; orphan-field scan passes)*
- *Retention policy enforcement test (records past retention deleted or anonymized — verified by job + test)*
- *Subject access request (SAR) workflow tested end-to-end against TRD-declared SLA*
- *Right-to-deletion tested (data actually removed from primary + replicas + backups within policy window)*
- *Right-to-portability tested (export format machine-readable, complete, schema-documented)*
- *Cross-border transfer controls verified (data residency boundaries enforced in code, not just policy)*
- *PII redaction in logs verified (sample log scan passes redaction lint)*
- *Audit trail integrity for data access (tamper-evident, complete coverage of regulated data classes)*

---

## 4. Benchmarks With Target Scores

From the TRD's applicable benchmarks (if specified) or Stage 00 Track 3 research output, list specific benchmark targets.

### 4.1 Performance Benchmarks

*Required format:*
- *Benchmark name*
- *Target score*
- *Measurement tool*
- *Measurement methodology*

*Examples:*
- *Lighthouse Performance score ≥ 90*
- *Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1*
- *Bundle size < 200KB gzipped*

### 4.2 Code Quality Benchmarks

*Examples:*
- *TIOBE Quality Indicator score ≥ 80*
- *Maintainability Index ≥ 85*
- *Cyclomatic complexity median < 10, 95th percentile < 15*

### 4.3 Domain-Specific Benchmarks (If Applicable)

*For AI/ML products: SWE-bench, HumanEval, MMLU, etc. For data products: statistical accuracy benchmarks. For developer tools: adoption / satisfaction proxies.*

---

## 5. Coverage Floors

### 5.1 Code Coverage

Per the D2R hardwired test coverage principle:

- **Line coverage:** 100% of backend + 100% of frontend testable code (exclude generated code, scaffolding, and third-party imports)
- **Branch coverage:** 100% of decision points
- **Integration coverage:** 100% of integration points between layers

Exception: code that is provably unreachable or purely structural (type definitions, module declarations, etc.) can be excluded with documented rationale.

Document the coverage tool and the config that enforces these floors.

### 5.2 Test Coverage Beyond Code

- **Requirement coverage:** Every FR and BR from TRD Section 2 has at least one test covering it
- **User journey coverage:** Every user journey from PRD Section 4 has at least one E2E test covering it
- **Acceptance criterion coverage:** Every acceptance criterion from TRD Section 2 has a specific test asserting it

---

## 6. Accessibility Criteria (Detailed)

WCAG 2.1 AA is hardwired per D2R. This section declares specifics.

### 6.1 Target Compliance

- Minimum: WCAG 2.1 AA
- AAA items required: [list specific success criteria if any]
- Additional standards: [Section 508, EN 301 549, etc., from TRD]

### 6.2 Automated Testing

- Tool: [axe-core via Playwright is default]
- CI integration: axe-core violations at `critical` or `serious` level FAIL the build
- Scope: every page, every component variant, every state

### 6.3 Manual Testing Protocol

- Screen reader testing: [specific SR/browser combinations]
- Keyboard-only navigation: every interactive element reachable and operable
- Color contrast spot-checking: dynamic-color elements verified
- Motion sensitivity: `prefers-reduced-motion` honored

### 6.4 Accessibility Exit Criteria For Every UI Stage

- Zero axe-core `critical` or `serious` violations
- All functionality keyboard-operable
- All interactive elements have visible focus indicators
- All images have alt text or are marked decorative
- Color is never the sole indicator of meaning
- Contrast ratios meet 4.5:1 (normal text) and 3:1 (large text) minimums
- Touch targets ≥ 44x44px for any mobile-targeted element
- `prefers-reduced-motion` respected on all animations

---

## 7. Performance & Operational Budgets

From TRD §3.1 (Performance & Scale, Track 11), §3.2 (Reliability & Resilience, Track 14), §3.10 (Cost, Track 17), §3.11 (i18n, Track 18), convert targets into measurable budgets and gates.

### 7.1 User-Facing Performance Budgets (Track 11)

*Required fields:*
- *Page load p50/p95/p99 targets (mirrors TRD §3.1)*
- *Interactive time-to-ready targets*
- *Response time per key interaction targets*
- *Backend response p50/p95/p99 per critical endpoint*
- *Tail-latency floor (p99.9 if SLO requires)*

### 7.2 Resource Budgets

*Required fields:*
- *Bundle size budget (gzip and brotli, separately)*
- *Memory budget (client-side if web, total if desktop, RSS ceiling if server)*
- *Initial page weight budget*
- *CPU budget per request / per interaction*
- *Database query count and total query time budget per critical endpoint*

### 7.3 Performance Enforcement

- *How the budgets are measured (Lighthouse, WebPageTest, k6, Locust, JMeter, custom)*
- *Where enforcement happens (CI, pre-commit, pre-deploy, continuous synthetic monitoring)*
- *What happens when a budget is exceeded (fail build, warn, request manual review)*
- *Performance regression alarm thresholds (e.g., 10% regression vs. last release fails CI)*

### 7.4 Reliability & Stress Gates (Track 14)

*Operational acceptance criteria derived from TRD §3.2 (Reliability & Resilience).*

*Required fields:*
- *Stress test pass conditions (which categories from §2.2 must pass at what load level)*
- *Chaos / fault-injection pass conditions (target component recovers within RTO under simulated failures)*
- *Idempotency verification (replay-attack tests pass for all idempotent endpoints)*
- *Retry / backoff verification (retry storms do not amplify load beyond N% of baseline)*
- *Queue / DLQ verification (failed messages land in DLQ; replay restores state)*
- *Circuit breaker verification (open state prevents downstream pile-up; half-open recovery works)*
- *DR drill cadence and pass criteria (last drill date, restore-time observed vs. RTO target)*

### 7.5 Cost Gates (Track 17)

*Required fields (or "NA — [justification]" matching TRD §3.10):*
- *Monthly infrastructure spend ceiling enforcement (alert at 80% of ceiling, fail at 100%)*
- *Cost per active user / per request / per transaction observed-vs-target ratio*
- *Cost regression detection (deploy that increases cost per request by >10% triggers review)*
- *Reserved capacity utilization floor (avoid paying for unused commitments)*
- *Idle resource detection (orphaned LBs, zombie databases, unused IPs flagged)*

### 7.6 Internationalization Gates (Track 18)

*Required fields (or "NA — [justification]" matching TRD §3.11):*
- *String externalization completeness (zero hardcoded user-facing strings — verified by lint rule or scan)*
- *Translation completeness per locale (target % per release)*
- *Pseudo-locale rendering passes (no truncation, no overflow, no missing glyphs)*
- *RTL mirror rendering passes (for RTL-supported locales)*
- *Locale-aware date/time/number/currency formatting verified by automated test*
- *Translator-blind testing (functional tests pass with placeholder pseudo-translations)*

---

## 8. Security Quality Gates

From TRD §3.3 Security Requirements (Tracks 9 + 15), operationalize as pre-commit and CI gates.

### 8.1 Pre-Commit Gates

- *Secret scanning (tool: gitleaks / trufflehog / detect-secrets, threshold: zero detected)*
- *Dependency vulnerability scan (tool: npm audit / pip-audit / cargo-audit / snyk, severity threshold)*
- *Static analysis (tool: semgrep / sonarqube / language-native linter, severity threshold)*
- *License-policy lint (no GPL where prohibited, etc.)*

### 8.2 CI Gates

- *Full dependency audit (allowlisted CVEs only, with documented justification)*
- *Container image scanning (Trivy / Grype / Snyk Container, if containerized)*
- *SBOM generation (CycloneDX or SPDX format) and signing*
- *License compliance check (tool, policy)*
- *DAST / interactive scanning if web app (OWASP ZAP / Burp / commercial)*
- *IaC security scan if applicable (Checkov / tfsec / kics)*

### 8.3 Pre-Deploy Gates

- *Penetration testing cadence (if applicable; pass criteria for findings)*
- *Security review sign-off (named approvers per change class)*
- *Production configuration audit (no default credentials, MFA enforced for admins, audit log on)*
- *Threat-model coverage check: every top-threat from TRD §3.3 has a mitigation in code or config (Track 9)*

### 8.4 Authentication & Identity Gates (Track 15)

- *Auth provider integration tested end-to-end (real provider in staging, not mocked)*
- *Session management correctness (timeout, refresh, revocation tested)*
- *Authorization tests cover negative cases (user A cannot access user B's resources)*
- *MFA enrollment and enforcement tested for required roles*
- *Token validation correctness (expired, malformed, revoked, swapped) tested*
- *OAuth/OIDC flow conformance tested if used (state, nonce, PKCE)*
- *Brute-force protection verified (rate limiting + lockout)*
- *Password policy enforcement verified if applicable*

---

## 9. Quality Review Gates

### 9.1 Code Review

- Required reviewers per change type
- Review checklist (linked or inline)
- Approval requirements before merge

### 9.2 ASAE Gate Integration

Per D2R, every stage exit passes through an ASAE gate. This section declares ASAE Certainty Thresholds per stage type:

- Stage 00 (research): threshold [default 2]
- Stage 01 (plan authorship): threshold [default 3]
- Stage 02-NN (implementation): threshold [default 3]
- Stage QA (convergence loop): threshold [default 5]

Severity policy: [strict (default for regulated domains / published research / production code) OR standard]

---

## 10. Operational Acceptance Criteria

This section establishes operational gates that determine whether the system is genuinely deployable to production — distinct from §7 (performance budgets), §8 (security gates), and §9 (review gates). Operational acceptance covers what an SRE / platform team would refuse a launch for.

### 10.1 Observability Acceptance (Track 10)

Operationalizes TRD §3.8.

*Required fields:*
- *Structured logging emitted at every defined level (DEBUG / INFO / WARN / ERROR / FATAL) with required fields (request_id, user_id, span_id, timestamp ISO 8601 UTC, event, level)*
- *Log aggregation pipeline verified end-to-end (sample event from prod path appears in aggregator within target latency)*
- *Metrics exposed at /metrics or equivalent; RED method (Rate, Errors, Duration) covered for every critical endpoint*
- *USE method (Utilization, Saturation, Errors) covered for every critical resource*
- *Distributed tracing propagation verified across every service hop (no orphan spans)*
- *SLI / SLO definitions implemented in monitoring (queries written, dashboards live, alerts firing on threshold breach in staging)*
- *Error-budget burn-rate alerts configured (multi-window, multi-burn-rate per Google SRE practice)*
- *On-call runbook exists for every alert; alert → runbook → action chain tested in staging fire drill*
- *Dashboard inventory complete: per-service health, per-endpoint latency, per-dependency status, error budget*

### 10.2 Release Engineering Acceptance (Track 16)

Operationalizes TRD §3.9.

*Required fields:*
- *Versioning scheme adhered to in CI (CI fails on missing/malformed version)*
- *Changelog discipline verified (release without CHANGELOG entry fails or warns)*
- *Branching model enforced via branch protection rules (force-push blocked, required reviews, required status checks)*
- *CI pipeline executes the full declared scope (lint, typecheck, all test categories from §2 declared YES, security scans from §8, SBOM, sign)*
- *CD pipeline executes the full declared scope including staging-mirror-of-prod deploy + smoke test gate before prod*
- *Feature flag platform integration tested (new flag created, evaluated in staging, rolled out, killed) end-to-end*
- *Progressive delivery executed in staging (canary or equivalent verified against rollback trigger)*
- *Rollback procedure tested in staging within last release cycle (one-click rollback verified, time-to-rollback measured)*
- *Release approval gate enforced (no manual override path that bypasses)*

### 10.3 AI / ML Acceptance (Track 19, Applicability-Gated)

Required IFF the product has AI in the user-facing critical path (per /ideate-to-d2r-ready Q11). NA permitted otherwise.

*Required fields (or "NA — [justification]"):*
- *Model version pinning verified (production runs documented model version; no silent upgrades)*
- *Prompt / system-instruction versioning under git, with diffable history*
- *Eval suite executed pre-release (gold-set accuracy, regression vs. last release, OWASP LLM Top 10 jailbreak resistance per applicable items)*
- *Eval pass thresholds defined and enforced (specific pass scores, not "looks good")*
- *Output safety classifier integration verified (or hardcoded refusal patterns tested)*
- *Cost-per-call observability verified (cross-references §7.5 if Track 17 also applicable)*
- *Latency budget per AI call enforced (cross-references §7.1)*
- *Retraining / fine-tuning pipeline acceptance criteria (if applicable)*
- *Hallucination mitigation verified (RAG citation accuracy, structured output schema validation)*
- *Refusal behavior tested for prohibited topics*

### 10.4 Compliance & Regulatory Audit-Readiness (Track 20, Applicability-Gated)

Required IFF the product is in regulated scope (HIPAA, PCI-DSS, SOC 2, FedRAMP, GDPR Article 30, etc., per /ideate-to-d2r-ready Q12). NA permitted otherwise.

*Required fields (or "NA — [justification]"):*
- *Applicable framework(s) declared (matches TRD §3.4 + PRD §6.2)*
- *Control mapping document maintained (each control mapped to code/config/policy evidence)*
- *Audit log retention policy enforced and tested (records survive declared period, immutable storage if required)*
- *Access reviews scheduled (cadence, reviewer, evidence trail)*
- *Vendor / sub-processor list maintained (with DPA references if GDPR-scoped)*
- *Data processing agreement (DPA) or BAA references current*
- *Penetration test cadence and findings remediation SLA met*
- *Incident response runbook + breach notification timeline documented and tested*
- *Evidence collection automated where possible (control evidence pulled programmatically, not manually)*

---

## 11. Open Quality Questions

*Unresolved decisions about quality criteria. Stage 00 research should address these or the TQCD must be updated before Stage 01.*

---

## 12. Stakeholder Approvals

*Who has approved this TQCD? Without documented approval, Stage 00 should not begin.*

---

## Validation Checklist (Pre-Stage-00)

Before invoking `/dare-to-rise-code-plan`, verify:

- [ ] All required sections completed
- [ ] Testing Taxonomy applicability declared for every category in Part 1 (20 categories)
- [ ] Stress test applicability declared per AI-driven selection strategy
- [ ] Every YES category has specific exit criteria
- [ ] Every NO category has specific skip reason
- [ ] Standards operationalized with measurable exit criteria + verification method
- [ ] §3.3 Data lifecycle / privacy exit criteria specified (Track 13)
- [ ] Benchmarks specified with target scores + measurement methodology
- [ ] Code coverage floors declared (100% line + branch per D2R)
- [ ] Accessibility criteria specific (not "WCAG AA" — specific criteria + tools + protocols)
- [ ] §7.1 Performance budgets measurable and enforced (Track 11)
- [ ] §7.4 Reliability/stress gates specified (Track 14)
- [ ] §7.5 Cost gates specified, or NA-with-justification (Track 17)
- [ ] §7.6 Internationalization gates specified, or NA-with-justification (Track 18)
- [ ] §8 Security gates specified per stage (pre-commit / CI / pre-deploy)
- [ ] §8.4 Auth & identity gates specified (Track 15)
- [ ] §10.1 Observability acceptance criteria specified (Track 10)
- [ ] §10.2 Release engineering acceptance criteria specified (Track 16)
- [ ] §10.3 AI/ML acceptance criteria specified, or NA-with-justification (Track 19)
- [ ] §10.4 Compliance audit-readiness criteria specified, or NA-with-justification (Track 20)
- [ ] ASAE thresholds declared per stage type
- [ ] Severity policy declared (strict or standard)
- [ ] Stakeholder approval documented

A TQCD missing any of these is not ready for D2R.

---

## Companion Documents

This TQCD is one of three prerequisite inputs to `/dare-to-rise-code-plan`. The other two:

- **PRD (Product Requirements Document)** — what the product IS (must exist first)
- **TRD (Technical Requirements Document)** — what it MUST DO technically (must exist before this)

See template files in the same `references/` directory.

## Downstream Use

This TQCD feeds directly into:

- **Stage 00 ASAE gate:** audits whether research findings actually address the applicable standards and benchmarks declared here
- **Stage 01 Step 2:** the TQCD IS the QA specification. Stage 01 reads this document and backwards-plans implementation stages against the exit criteria declared here
- **Stage NN commit gates:** pre-commit hooks enforce the gates declared in Sections 8 and 9.1 + coverage floors from Section 5
- **Stage QA:** the convergence loop executes the Testing Taxonomy categories declared applicable in Sections 2.1 and 2.2, against the exit criteria declared throughout
