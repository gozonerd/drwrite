---
name: Testing & Quality Criteria Document — Template
description: Reusable template for authoring a TQCD as a prerequisite input to /dare-to-rise-code-plan. Defines what success looks like quality-wise — applicable Testing Taxonomy categories with exit criteria, applicable standards operationalized as exit criteria, applicable benchmarks with target scores, coverage floors, accessibility criteria, performance budgets. Filled-in instances feed into Stage 00 research and Stage 01 QA-first plan authorship.
type: template
skill: dare-to-rise-code-plan
version: v01_I
date: 2026-04-17
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

*For each regulation applicable per TRD Section 3.4, specific exit criteria that demonstrate compliance.*

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

## 7. Performance Budgets

From TRD Section 3.1 Performance Requirements, convert targets into budgets.

### 7.1 User-Facing Performance Budgets

*Required fields:*
- *Page load p50/p95/p99 targets*
- *Interactive time-to-ready targets*
- *Response time per key interaction targets*

### 7.2 Resource Budgets

*Required fields:*
- *Bundle size budget*
- *Memory budget (client-side if web, total if desktop)*
- *Initial page weight budget*

### 7.3 Enforcement

- How the budgets are measured (Lighthouse, WebPageTest, local performance testing)
- Where enforcement happens (CI, pre-commit, pre-deploy)
- What happens when a budget is exceeded (fail build, warn, request manual review)

---

## 8. Security Quality Gates

From TRD Section 3.3 Security Requirements, operationalize as pre-commit and CI gates.

### 8.1 Pre-Commit Gates

- Secret scanning (tool, threshold)
- Dependency vulnerability scan (tool, severity threshold)
- Static analysis (tool, severity threshold)

### 8.2 CI Gates

- Full dependency audit
- Container image scanning (if containerized)
- SBOM generation
- License compliance check

### 8.3 Pre-Deploy Gates

- Penetration testing cadence (if applicable)
- Security review sign-off
- Production configuration audit

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

## 10. Open Quality Questions

*Unresolved decisions about quality criteria. Stage 00 research should address these or the TQCD must be updated before Stage 01.*

---

## 11. Stakeholder Approvals

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
- [ ] Benchmarks specified with target scores + measurement methodology
- [ ] Code coverage floors declared (100% line + branch per D2R)
- [ ] Accessibility criteria specific (not "WCAG AA" — specific criteria + tools + protocols)
- [ ] Performance budgets measurable and enforced
- [ ] Security gates specified per stage (pre-commit / CI / pre-deploy)
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
