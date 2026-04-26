---
name: dare-to-rise-code-plan
description: "Use this skill when planning ANY coding task that involves implementation. Triggers on: 'dare-to-rise-code-plan', 'dare-to-rise-code-planning', 'dare to rise code planning', 'd2r-code-plan', 'd2r code plan', '/dare-to-rise-code-plan', '/dare-to-rise-code-planning', '/d2r-code-plan', 'plan this code task', 'code plan with governance gates'. Enforces backwards-planning from excellence, four-track Stage 00 research, QA-designed-first Stage 01 plan authorship, hook-orchestrated ASAE governance at every stage boundary, hardwired accessibility and test coverage, plan-specification-depth as a first-class parameter, and deterministic commit gates via Claude Code hooks and git hooks."
---

# Dare to Rise Code Plan

## Purpose

Excellence is the floor. This skill enforces backwards-planning from an excellent end state — not forward from current capacity. If the plan does not target excellence, it will not produce excellence. Every constraint in this skill is a structural commitment to that floor.

The skill produces a structured code plan whose execution is governed by deterministic hooks at every boundary. Governance is not advisory. It is enforced.

## When to Use

- Planning any coding task that will be implemented
- When the user invokes `/dare-to-rise-code-plan`, `/d2r-code-plan`, or equivalent triggers
- Before generating any multi-step implementation plan
- Before any code is written against a specification

## Prerequisite Inputs

This skill requires five standardized input documents to exist and be approved before Stage 00 can run. Without them, the plan is ungrounded and Stage 00 research has no scoping constraint.

| # | Document | Purpose | Template | Authorship Skill |
|---|----------|---------|----------|------------------|
| 1 | **PRD** (Product Requirements) | What the product IS | `references/PRD_Template_2026-04-17_v01_I.md` | `/write-prd` |
| 2 | **TRD** (Technical Requirements) | What the system MUST DO technically | `references/TRD_Template_2026-04-17_v01_I.md` | `/write-trd` |
| 3 | **AVD** (Architecture Vision) | The system's high-level shape and boundaries | `references/AVD_Template_2026-04-17_v01_I.md` | `/write-avd` |
| 4 | **TQCD** (Testing & Quality Criteria) | What success looks like quality-wise | `references/TQCD_Template_2026-04-17_v01_I.md` | `/write-tqcd` |
| 5 | **UXD** (User Experience) | What the product looks like + feels like + how every state is rendered (visual design system, interaction patterns, accessibility-as-delight, polish criteria) | `references/UXD_Template_2026-04-25_v01_I.md` | `/write-uxd` |

The five templates are reusable across projects and across LLMs. Any sufficiently capable planner LLM given the same filled-in PRD + TRD + AVD + TQCD + UXD should produce a D2R code plan of comparable structure. This transferability enables experimental comparison of planner LLM quality given identical inputs.

The UXD is the F13-equivalent reality anchor for the visual layer. Without it, the implementer falls back to generic-component-library defaults regardless of what the PRD/TRD/AVD specify, producing internally-consistent but externally-bland output. UXD ships with reference design assets (screenshots, mockups, palettes) that anchor implementation to a real visual standard — the same anti-tautology pattern that real-export fixtures provide for parser logic.

**If any of the five documents is missing or not approved**, the D2R skill does not proceed to Stage 00. Instead it offers three paths:

1. **Author in-thread:** invoke the appropriate `/write-prd`, `/write-trd`, `/write-avd`, `/write-tqcd`, or `/write-uxd` skill directly in this Claude session
2. **Portable prompt:** generate a self-contained portable prompt the user can hand to a different Claude thread or a different LLM entirely. The receiving LLM fills out the template(s) independently and returns the filled-in document(s) to the user for D2R consumption. Template content is embedded inline in the portable prompt so the receiving LLM needs no file access.
3. **Escalate:** tell the user the prerequisite is missing and stop.

Do not proceed to Stage 00 research against an incomplete input set. An incomplete prerequisite set produces degraded plans regardless of Stage 01 rigor.

## Portable Prompt Generation (When Prerequisite Docs Missing)

When the user requests a portable prompt for authoring missing prerequisites, the D2R skill generates a prompt that is:

- **Self-contained:** includes the template content inline, includes the user's project context inline, includes the filename convention, includes the validation checklist
- **Transferable:** works in any Claude thread or any capable LLM with no file-system access
- **ASAE-aware:** includes instructions to run `/asae` if the receiving environment has it; falls back to manual validation checklist if not
- **Output-format-rigorous:** specifies exact filename, exact section structure, exact markers for machine-parseable output

Receiving LLMs use this prompt to produce filled-in documents the user then brings back to the D2R environment. This pattern supports:

- Experimental comparison of planner LLMs (same inputs, different LLMs, comparable outputs)
- Separation of planning-thread compute from execution-thread compute
- Collaboration where the document author and the D2R executor are different people in different contexts

## Core Principles (Hardwired, Not Features)

These are pre-conditions on every plan produced by this skill. They are not optional stages, checklist items, or polish passes. A plan that lacks any of them is not a valid D2R plan.

### 1. Excellence As The Floor

Plans are backwards-planned from the excellent end state. Stage 01 authorship begins from "what does excellent look like for this output" and works backward through the stages required to produce it. Forward planning from current capacity is forbidden — it produces mediocre outputs because mediocre is what forward-from-here permits.

### 2. ASAE Governance At Every Stage Boundary

Every stage exit passes through an ASAE gate at the configured ASAE Certainty Threshold. Stage 00 research exits through an ASAE gate. Stage 01 plan authorship exits through an ASAE gate. Every implementation stage exits through an ASAE gate. Stage QA is itself a convergence loop.

Gate semantics are specified in this skill. Execution of the gate is delegated to the `/asae` skill. The D2R skill does not describe ASAE mechanics. It specifies when the gate runs, what it audits against, and what happens on failure.

### 3. Accessibility Hardwired

Every stage that produces UI produces WCAG 2.1 AA compliant UI at authorship time. Not checked at the end. Not added in a polish pass. Not a separate stage.

A stage that produces UI without WCAG 2.1 AA compliance has not completed its implementation, regardless of feature correctness. The stage's exit criteria include accessibility by default, always, without exception. The word "accessibility" does not appear as a feature name anywhere in any D2R plan because accessibility is not a feature. It is a condition of correctness.

### 4. Test Coverage Hardwired

Every stage that produces code produces code with 100% line and branch coverage of the implementation language's standard testable surface. Backend: 100%. Frontend: 100%. Integration points between the two: covered by contract tests. Not added later. Not deferred.

The word "testing" does not appear as a feature stage anywhere in any D2R plan. Tests are authored alongside implementation or before (TDD). Tests are part of what it means for a stage to have implemented anything.

### 5. Model Awareness Per Subagent (Hook-Enforced)

Every sub-agent and every stage is assigned a specific model and effort level in Stage 01. Assignments are enforced by PreToolUse hooks — not advised.

#### Model Tier Table

| Tier | Role | Examples |
|------|------|----------|
| **Opus** | Plans, decides, audits. Reserved for reasoning work. | Stage 00 research; Stage 01a skeleton authorship; Stage 01b full plan authorship; ASAE gate judgment; architectural decisions; content decisions for READMEs and docs (what to say); IP and license selection |
| **Sonnet** | Setup + judgment-requiring authoring + mid-complexity implementation. Handles work that requires knowing "what good looks like" but not architectural reasoning. | Stage 02 Project Scaffold (repo creation + README drafting per Opus's content decisions + LICENSE + package.json + tsconfig + eslint + vite + prettier + CI workflow + hook scripts + initial scaffolding + commit messages + initial push); mid-complexity implementation where Deep-spec would be fragile; security-sensitive code; nuanced error handling; setup error troubleshooting |
| **Haiku** | Rote transcription of Deep-spec content. Executes fully-specified operations. | Stage 03+ feature implementation at Deep spec depth; exact function writes per exact spec; exact file writes per exact spec; exact command runs per exact spec; test case implementation from exact test spec |

#### Hard Rules

- **Never Opus for implementation.** Opus plans and audits; it does not write the code.
- **Never Haiku for reasoning or QA judgment.** Haiku transcribes; it does not decide.
- **Never Haiku for Stage 02 Project Scaffold.** Setup requires judgment Haiku lacks — license selection, README voice, config-file conventions, troubleshooting.
- **Never Haiku for README or LICENSE authorship.** These are communication artifacts requiring audience judgment. Sonnet drafts from Opus's content decisions.

The hook layer makes violations structurally impossible. See "Hook Orchestration" below.

### 6. Plan-Specification-Depth Parameter

Every stage in Stage 01's output is tagged with a specification depth: `Shallow`, `Medium`, or `Deep`.

| Depth | What The Executing Model Decides | When To Use |
|-------|----------------------------------|-------------|
| Shallow | Library choice, API, error handling, types, iteration style | Only when the executing model has high training coverage of the target stack AND the task is well-within its discretion |
| Medium | API specifics, error handling patterns, types | When the executing model has moderate stack coverage and the library is pre-selected |
| Deep | Only syntax transcription. Plan specifies exact library versions, API signatures, error types, return types, iteration idioms, import styles | Default when executing model is Haiku. Required when target stack is less common in executing model's training data. |

Stage 01 must justify the depth choice per stage. Default assumption: if executing model is Haiku, depth is Deep unless justified otherwise.

## Hook Orchestration

Governance is enforced at three layers. Each layer is non-bypassable independently. Circumvention requires explicit opt-out at each layer and produces audit evidence.

### Layer 1: Claude Code Hooks (In-Session Enforcement)

Located in `.claude/settings.json` or `.claude/settings.local.json`.

**PreToolUse on `Write|Edit` in main session:**
- Block direct code writes from the main (planning) session
- Force delegation to an implementation sub-agent with the stage's assigned model
- Error message: "Main session is planning-only. Delegate this write to the sub-agent assigned to stage [NN] per the D2R plan."

**PreToolUse on `Bash` matching `git commit*`:**
- Verify ASAE summary for the current stage appears in recent thread context
- Verify test suite has passed (check exit code of most recent test command)
- Verify accessibility audit has passed if stage produced UI
- Block commit if any verification fails

**PreToolUse on `Bash` matching `git push*`:**
- Verify all stage commits are present
- Verify final D2R summary exists in repo
- Block push if any verification fails

**PostToolUse on `Write|Edit`:**
- Log every file write to the audit trail with timestamp, agent, stage, model, hash of content

**Stop / StopFailure:**
- Require ASAE summary table for the active stage to be in thread before allowing clean session end
- If missing, append warning to session end and log to audit trail

**UserPromptSubmit:**
- Inject current D2R plan state into Claude's context (active stage, depth tag, model assignment, ASAE gate status)

### Layer 2: Git Hooks (Platform-Level Enforcement)

Located in `.githooks/` in the repo root. Installed via `git config core.hooksPath .githooks` (typically auto-installed by the `prepare` script in `package.json`).

**`pre-commit`:**
- Run formatters (prettier, eslint, or language-appropriate) — refuse commit if violations
- Run type check — refuse commit on type errors
- Run test suite — refuse commit if any test fails or coverage drops below threshold
- Run accessibility audit (axe-core via Playwright, or equivalent) — refuse commit on WCAG 2.1 AA violations if stage produced UI
- Run ASAE log validator — refuse commit if the stage's ASAE artifacts are missing or malformed
- Run secret scanner — refuse commit on detected secrets

**`pre-push`:**
- Run full regression test suite — refuse push on any regression
- Run integration tests — refuse push on integration failure
- Run build — refuse push if build fails

### Layer 3: ASAE Gate (Invoked By Hooks, Executed By `/asae` Skill)

Stage boundaries invoke the `/asae` skill with a scope definition declaring:
- Target: the stage's output artifacts
- Sources: the stage's inputs (prior stage outputs, Stage 00 research findings, Testing Taxonomy categories applicable to this stage, prerequisite PRD/TRD/AVD/TQCD)
- Exit criteria: configured ASAE Certainty Threshold per stage (defaults: Stage 00 = 2, Stage 01a = 2, Stage 01b = 3, Stage 02 = 3, Stage 03+ = 3, Stage QA = 5)
- Severity policy: strict by default (any CRITICAL, HIGH, or MEDIUM finding resets the counter); standard policy permitted for non-regulated domains

The D2R skill does not describe ASAE internals. The `/asae` skill handles the gate. The D2R skill specifies when gates run, scope, and threshold.

### Layer 4: Meta-ASAE (Gates That Verify Prior Gates Fired)

Meta-ASAE is the defense-in-depth layer that verifies ASAE itself ran. Without meta-ASAE, a stage's ASAE gate can be silently skipped (e.g., Haiku claims the gate ran but didn't produce the log; a hook config error causes the gate to not fire; stochastic execution variance causes the gate to be bypassed).

Meta-ASAE operates at two levels:

**Hook-level meta-ASAE (automatic):**
- `PreToolUse` hook on `Bash` matching `git commit*`: checks for the current stage's ASAE log file at its expected path, with expected structure (status, timestamp, severity totals, log path), before allowing commit. Blocks commit if missing or malformed.
- Git `pre-commit` hook runs an ASAE log validator script: reads the most recent ASAE log for the current stage, verifies it parses as valid structured output, verifies status is PASS (not HALT — HALT means the gate didn't converge and the commit should not proceed without explicit escalation).

**Stage-level meta-ASAE (explicit sub-stage):**
- Every implementation stage (02, 03+, QA) has an explicit Stage NN-M sub-stage that runs between Stage NN-A (ASAE gate) and Stage NN-B (commit gate)
- Stage NN-M invokes `/asae` with:
  - domain: `document` (the ASAE log IS a document)
  - target: the Stage NN-A ASAE log file
  - sources: the Stage NN-A scope definition (target, sources, prompt, threshold, severity policy)
  - prompt: "Verify this ASAE log is well-formed, has PASS status, and its structure matches the declared scope"
  - asae_certainty_threshold: 2
  - severity_policy: strict
- Stage NN-M produces its own audit trail entry: "Meta-ASAE verified Stage NN-A produced valid gate output"

The two levels compose: hook-level meta-ASAE catches gate-was-skipped as a commit-blocker. Stage-level meta-ASAE catches gate-output-was-malformed as a stage-completion-blocker. Both fire before commit; both produce independent audit artifacts.

**What meta-ASAE does not do:** re-run the underlying ASAE gate. The underlying gate has already run and either produced a valid output or not. Meta-ASAE verifies the output exists and is well-formed; it does not re-audit the stage's content. Re-auditing is the gate's job, not the meta-gate's job.

### Hook Installation Verification

Every new repo initialized under D2R must ship with:
- `.claude/settings.json` containing the PreToolUse, PostToolUse, Stop, UserPromptSubmit hook configurations
- `.githooks/` containing `pre-commit` and `pre-push`
- `package.json` (or equivalent) `prepare` script that installs the git hooks path
- A hook verification test in CI that fails if any hook is missing or bypassed

Stage 00 research must confirm hook support for the target stack. Stage 01 must specify exact hook configurations in the plan output.

## Plan Structure

Every D2R plan follows this stage numbering:

| Stage | Purpose | Model |
|-------|---------|-------|
| Stage 00 | Five-track research. Exits through ASAE gate at threshold 2. | Opus |
| Stage 01a | Skeleton authorship — stage list with metadata. Exits through ASAE gate at threshold 2 + user approval gate. | Opus |
| Stage 01b | Full plan authorship — Deep / Medium / Shallow content per stage, exactly as required for the executing model to operate. Exits through ASAE gate at threshold 3. | Opus |
| Stage 02 | Project Scaffold — repo creation, README, LICENSE, configs, CI workflows, hook scripts, initial scaffolding, initial commit + push, Claude Code hook installation. Exits through ASAE gate at threshold 3 + commit gate. | Sonnet |
| Stage 03...NN | Feature implementation stages at Deep spec depth. Each exits through ASAE gate at threshold 3 + commit gate. | Haiku (default) |
| Stage NN+1 | Design Polish — visual + interaction polish pass against the prerequisite UXD. Iterates with `/asae` at `domain=design` until ASAE Certainty Threshold of 3 consecutive clean cycles. | Sonnet (visual judgment; Haiku is too generic for aesthetic-quality work per CCC empirical evidence) |
| Stage QA | Convergence loop. Testing Taxonomy full applicable sweep + stress testing. Exits when ASAE Certainty Threshold of 5 consecutive clean cycles is reached. | Opus for judgment; Sonnet for remediation authoring; Haiku for rote fix transcription |

No stage may begin until the prior stage has passed its ASAE gate. No implementation stage (Stage 02+) may begin until Stage 01b has passed its ASAE gate. Stage 01a must pass its gate + user approval before Stage 01b begins. Stage NN+1 Design Polish cannot begin until all implementation stages have passed. Stage QA cannot begin until Design Polish has passed.

Design Polish is a separate stage from Stage QA, not a sub-stage. Stage QA is convergence-loop testing (functional + accessibility-compliance + stress); Design Polish is visual + interaction quality against the UXD. Both gates must clear independently. Stage QA accessibility checks the WCAG 2.1 AA compliance floor (per the 6-layer accessibility model documented in this skill); Design Polish accessibility checks the accessibility-as-delight ceiling (per UXD Section 5).

## Stage 00: Comprehensive Research (16 Hardwired Tracks + 4 Applicability-Gated Tracks)

Stage 00 exits with a Research Findings document that Stage 01 uses as its input. The research is scoped by the prerequisite PRD, TRD, AVD, TQCD, and UXD documents.

The track set was expanded from 5 to 20 on 2026-04-26 in response to the empirical observation that production-ready / enterprise-deployment-ready applications need research scoping for security, observability, performance, deployment, data lifecycle, reliability, auth, release engineering, and design — none of which the original 5 tracks scoped. The expansion is hardwired to enforce production readiness from ideation through D2R execution; tracks 17-20 are hardwired with applicability assessment (a track's NA-with-justification path is honored, but every track is researched, not silently skipped).

Tracks group thematically:

- **Foundational (1-5):** tech stack, standards, benchmarks, depth-of-spec, ecosystem
- **Design + UX (6-8):** design system source / tooling / accessibility tooling
- **Production Engineering (9-16):** security, observability, performance, deployment, data, reliability, auth, release
- **Applicability-Gated Hardwired (17-20):** cost, i18n, AI-native, compliance ops

### Foundational Tracks

#### Track 1: Tech Stack Research (Best-For-Use-Case, Not Familiar)

Research what stack is structurally best for the specific code task being planned. The selection criterion is fit-to-use-case, not "what the executing model knows best." Under Deep plan-specification, executing-model training coverage is not a binding constraint.

Research must cover:
- Frontend framework options evaluated on accessibility defaults, bundle size, reactivity model, ecosystem maturity (per task type)
- Backend / data processing options evaluated on computational fit, deployment complexity, security posture
- Visualization, parsing, storage, export, testing, deployment libraries specifically applicable
- Hook orchestration support (does this stack support the three-layer hook pattern cleanly?)
- License audit + supply-chain attestation for each dependency (SLSA level, sigstore, npm provenance, etc.)
- Long-term-support availability for production deployment

Output: ranked stack recommendation with rejected alternatives and honest reasons for rejection. Feeds TRD §1, AVD §2.2.

#### Track 2: Applicable Standards

Research the enterprise standards and regulatory requirements that apply to this specific code task. Not aspirational — binding.

For any application type:
- ISO/IEC 25010:2023 (product quality model) — which sub-characteristics apply
- CERT secure coding standards for the implementation language
- CWE Top 25 (current year) vulnerabilities applicable to this task

For UI applications:
- WCAG 2.1 AA (or AAA where applicable) — hardwired, confirm no additional standard applies

For web applications:
- OWASP Top 10 Web Application Security Risks (current version)
- OWASP LLM Top 10 if any LLM integration exists
- OWASP API Security Top 10 if any API surface exists

For regulated domains:
- EU AI Act if AI output affects high-risk decisions
- Applicable state laws (Colorado SB 24-205 etc.) if US AI deployment
- FDA, FINRA, HIPAA, FERPA, GDPR, CCPA, PIPEDA per domain

Output: list of applicable standards with specific measurable exit criteria per standard. Feeds TRD §3.3-3.5, TQCD §3, PRD §6.

#### Track 3: Applicable Benchmarks

Research existing industry benchmarks that should be referenced or met. Benchmarks differ from standards — standards are binding requirements, benchmarks are measured comparisons.

Examples:
- Performance benchmarks (Core Web Vitals, Lighthouse, framework-specific)
- Security benchmarks (CIS Benchmarks, STIG, NIST CSF)
- Code quality benchmarks (TIOBE Quality Indicator, Maintainability Index thresholds)
- Reliability benchmarks (industry SLO baselines per app category)
- Domain-specific benchmarks (SWE-bench for code generation, MMLU for reasoning, etc.)

Output: list of applicable benchmarks with target scores and rationale. Feeds TQCD §6, AVD §4.

#### Track 4: Language-Depth-Of-Spec Research

Research whether the planning model (typically Opus) can produce Deep-level specifications for the chosen stack. This is a first-class research track specific to the D2R methodology.

Evaluate:
- For each stage's language/framework, can Opus produce a spec at Deep level (exact library versions, API signatures, error types, return types, iteration idioms)?
- Where Deep-level spec is producible, document the exact library-version-pinned API references available
- Where Deep-level spec is not producible (exotic languages, unstable libraries, undocumented internals), flag explicitly — those stages may need to run at Medium depth with Sonnet as executor, or may need to shift to better-documented stack components

Output: per-stage depth feasibility assessment. If any stage requires Deep depth but the planning model cannot produce it, Stage 01 must either shift the stack choice or escalate the executing model.

#### Track 5: Skill / Plugin Ecosystem Fit

Research the installed skill and plugin ecosystem for execution support of this specific build. Skills and plugins deepen the effective spec for executing models — a skill that specifies "use this exact pattern for Svelte 5 runes" eliminates a class of decisions the executing model would otherwise make.

Evaluate:
- Which installed skills are directly relevant to this build (list by name with rationale)
- Which installed plugins are directly relevant (list by name with rationale)
- Which installed MCP servers are directly relevant
- Which skills/plugins would help if installed but are not yet (gap analysis)
- Which installed skills/plugins might CONFLICT or confuse execution (e.g., contradictory guidance for the same task)
- Recommend install-before-Stage-02 additions (if any)
- Recommend skills/plugins to DISABLE during this build to prevent conflicts (if any)

Output: skill/plugin inventory with per-item relevance assessment, gap analysis, and recommended ecosystem configuration. Also serves experimental transferability — documenting the ecosystem loadout enables controlled comparison across LLMs.

### Design + UX Tracks

#### Track 6: Design System Source-Of-Truth + Reference Curation

Research where this project's visual language SHOULD live and what existing apps set the bar for it.

Evaluate:
- Is there an existing parent-org design system to inherit from? (brand kit, design tokens, component library)
- If yes — version pinned + asset paths + departure-rules
- If no — does this project become a design-system source-of-truth, or self-contained?
- Reference apps in the same category — capture screenshots of analog surfaces; annotate what about each is the reference (layout, typography, interaction feel, state design, animation)
- Anti-references — apps that look generic in this category and should be avoided

Output: design system source-of-truth determination + reference asset inventory with screenshots + anti-reference list. Feeds UXD §1.1, §1.2, §8.

#### Track 7: Design System Tooling For The Stack

Given the Track 1 stack, research design-system-implementation tooling.

Evaluate:
- Component library options (ShadCN / Radix primitives / headless UI / custom build) on design-token support, accessibility defaults, theming, bundle size, customization cost
- Styling approach (CSS-in-JS / Tailwind / CSS modules / vanilla) on design-token discipline, dark-mode support, theming, responsive primitives, type-safety
- Animation library (framer-motion / motion-one / CSS-only) on bundle size, prefers-reduced-motion honoring, choreography support
- Iconography (Lucide / Heroicons / Phosphor / custom) on visual consistency with Track 6 references, license, weight options

Output: ranked recommendation per category with rejected alternatives. Feeds UXD §2 component tokens, TRD §1.x design-tooling supplements.

#### Track 8: Accessibility Tooling For The 6-Layer Chain

Research accessibility tooling specifically for the 6-layer accessibility hardwiring chain documented later in this skill.

Evaluate:
- Layer 2 (TRD stack): lint plugins (jsx-a11y / vue-a11y / eslint-plugin-jsx-a11y), type-checked aria libraries, accessibility-aware framework integrations
- Layer 3 (TQCD gates): accessibility test libraries (axe-core, @axe-core/playwright, jest-axe, vitest-axe, pa11y) integrating with the Track 1 stack and TQCD's test framework
- Layer 5 (Stage QA): Lighthouse / pa11y / accessibility-monitoring tools
- Layer 6 (Stage NN+1 Design Polish): screen-reader testing tools (NVDA / JAWS / VoiceOver-automation), keyboard nav testing, focus-management libraries

Output: per-layer tooling recommendations. Feeds TRD §3.5, TQCD §3.5, UXD §5.

### Production Engineering Tracks

#### Track 9: Security Architecture

Research the threat model and security architecture for this app.

Evaluate:
- Threat model (STRIDE: spoofing / tampering / repudiation / information disclosure / denial of service / elevation of privilege per surface)
- Attack-surface inventory (every input from outside the trust boundary)
- OWASP Top 10 mapping for THIS app (which items apply, which mitigations)
- Supply-chain attestation strategy (SLSA level target, sigstore signing, npm provenance, dependency pinning)
- Secrets management (vault / sops / cloud secrets manager / env var hygiene; never plaintext in repo)
- SAST tooling (semgrep / CodeQL / sonarqube) integration with CI
- DAST tooling (OWASP ZAP / Burp suite) integration where applicable
- Dependency CVE scanning (npm audit / snyk / dependabot) integration
- Secure SDLC integration with the CI/CD chain

Output: threat model document + tooling recommendations + secure-SDLC integration plan. Feeds TRD §3.3, TQCD §3.3, AVD §4 (security boundaries), Stage 02 CI scanning setup.

#### Track 10: Observability & Operations

Research the observability + operations approach for this app.

Evaluate:
- Logging architecture (structured / sampled / retention; pinned log levels per environment)
- Metrics strategy (RED method for services / USE method for resources / business metrics for user-facing flows)
- Tracing strategy (OpenTelemetry / Datadog / Honeycomb / etc.) integrated with the Track 1 stack
- Alerting + on-call routing (PagerDuty / Opsgenie / built-in / etc.)
- SLO/SLI definitions per primary user journey (latency target, error budget, availability)
- Error tracking (Sentry / Rollbar / built-in)
- Monitoring dashboards (Grafana / Datadog / built-in)
- Runbook authoring framework (where do runbooks live? how versioned?)

Output: observability architecture + tooling integrations + SLO definitions + runbook plan. Feeds TRD §3.x new NFR section for observability, TQCD operational acceptance criteria, Stage 02 instrumentation setup.

#### Track 11: Performance & Scale

Research the performance + scale characteristics required.

Evaluate:
- Load profile prediction per primary user journey (concurrent users, request rate, payload size, peak vs. baseline)
- Performance budgets per surface (TTI / FCP / LCP / INP for web; latency p50/p95/p99 for backend)
- Caching strategy (browser / CDN / app-level / data-level — what's cacheable, what's not)
- Query optimization approach (database indexes, N+1 prevention, batch loading)
- Bundle-size budgets (initial / per-route / per-component if web)
- Stress-test infrastructure (k6 / artillery / locust / jmeter) integrated with CI

Output: performance budgets + caching strategy + load profile + stress-test plan. Feeds TRD §3.x performance NFR, TQCD §6 performance gates, AVD §4 caching topology.

#### Track 12: Deployment & Infrastructure

Research the deployment + infrastructure approach for production deployment.

Evaluate:
- Hosting target (serverless: Vercel / Netlify / Cloud Run; managed: Fly.io / Render / Heroku; container orchestration: ECS / GKE / k8s; bare metal — evaluated on app shape, scale, regulatory constraints, cost)
- CI/CD architecture per stack (GitHub Actions / GitLab CI / Buildkite / CircleCI; build → test → security-scan → deploy stages)
- Environment strategy (dev / staging / prod minimum; with optional preview / canary / DR-test environments)
- Secrets/config management at deploy time (env-var injection / vault integration / sealed-secrets / cloud KMS)
- Disaster recovery + backup strategy (RPO / RTO targets, backup frequency, restore drill cadence)
- Rollback semantics (atomic / blue-green / canary / feature-flag-based)
- Infrastructure-as-code tooling (terraform / pulumi / cdk / crossplane / native cloud)

Output: deployment architecture + CI/CD plan + environment strategy + DR/backup plan + IaC choice. Feeds TRD §1.x deployment, AVD §4 deployment view, Stage 02 CI/CD authoring, runbook.

#### Track 13: Data Architecture & Lifecycle

Research the data architecture and lifecycle policies.

Evaluate:
- Schema migration discipline (forward-only migrations with rollback / both-ways / hybrid)
- Migration tooling per stack (prisma migrate / drizzle / liquibase / flyway / native)
- Retention policies per data class (legal minimums + business retention + user-controlled)
- Encryption at rest (default cloud / explicit KMS / app-level encryption for sensitive fields)
- Encryption in transit (TLS 1.3 hardwired; mTLS where applicable; certificate management)
- Audit trails for data access (who accessed what when; per regulatory requirement)
- Data subject rights implementation (GDPR / CCPA / PIPEDA — access / deletion / portability flows)
- Data export/import flows (user-controlled; format choices; integrity verification)
- Data residency requirements (per regulation + customer contractual)

Output: data architecture + migration discipline + retention policy + encryption plan + DSR flows + residency map. Feeds TRD §3.4 privacy, AVD §3 data-flow components, TQCD §3.4 privacy gates.

#### Track 14: Reliability & Resilience

Research the reliability + resilience patterns required for production.

Evaluate:
- Fault tolerance patterns (graceful degradation / failover / read-replica / multi-region)
- Retry / circuit-breaker / bulkhead / timeout strategy (which patterns where; library choices)
- Rate limiting / quota (per user / per IP / per API key / global)
- Idempotency for external mutations (idempotency-key pattern; exactly-once semantics where required)
- Queue-based decoupling (where async processing is required; queue choice — SQS / RabbitMQ / Redis / etc.)
- Distributed transaction strategy (saga / 2pc / eventual-consistency-with-compensation; per use case)
- Chaos engineering / fault injection (planned vs. nope-not-now)

Output: reliability patterns + tooling + chaos engineering plan. Feeds TRD §3.x reliability NFR, AVD §4 resilience patterns, TQCD §6 stress-test gates.

#### Track 15: Auth & AuthZ

Research the authentication + authorization architecture.

Evaluate:
- Auth provider choice (Auth0 / Clerk / WorkOS / Supabase Auth / built-in / SAML SSO via vendor; evaluated on security posture, compliance certifications, integration cost, vendor lock-in)
- SSO support (SAML / OIDC; required for enterprise customers)
- MFA support (TOTP / WebAuthn / SMS — with recommendation hierarchy on security)
- Permission model (RBAC / ReBAC / ABAC / hybrid; per app's permission complexity)
- Session management (server-side sessions / JWT / opaque tokens / paseto)
- Token strategy (rotation, revocation, refresh)
- OAuth flows where 3rd-party (authorization-code-with-PKCE preferred)
- Account-recovery flow security (the most-attacked surface; explicit research required)

Output: auth provider choice + SSO + MFA strategy + permission model + session/token strategy + recovery flow design. Feeds TRD §3.3 security, AVD §3 auth components, TQCD §3.3 auth gates.

#### Track 16: Release Engineering

Research the release engineering + operational rollout approach.

Evaluate:
- Versioning strategy (semver / calver / build-number; for app + for any APIs it exposes)
- Release notes process (auto-generated from PRs / manually curated / hybrid)
- Feature flags / kill switches (LaunchDarkly / Unleash / Flagsmith / built-in / GrowthBook)
- Gradual rollout strategy (percentage / cohort / canary / blue-green; per release type)
- Hotfix workflow (fast-track for security; bypass criteria; on-call authority)
- Deprecation policy for breaking changes (notification window, grace period, removal cadence)
- Release calendar + freeze windows (where applicable for regulated / enterprise customers)

Output: release engineering plan + feature flag tooling + rollout strategy + hotfix workflow + deprecation policy. Feeds TRD §1.x release, Stage 02 versioning setup, runbook.

### Applicability-Gated Hardwired Tracks

Each of these tracks is researched in every Stage 00. The output may be "NA-with-justification" (e.g., this app is English-only, so i18n is NA), but Stage 00 explicitly evaluates applicability rather than silently skipping. The applicability gate becomes the first item of the track's output.

#### Track 17: Cost Engineering

**Applicability gate:** is this app expected to incur non-trivial infrastructure cost (cloud compute, AI API spend, data storage, third-party SaaS)? If unit economics matter (SaaS, AI-native at scale, multi-tenant), track is fully applicable. If single-user / hobby / negligible-cost, document NA with one-line justification.

When applicable, evaluate:
- Infra cost model (per service / per environment / per user)
- Per-user / per-MAU / per-request unit economics
- Scaling cost curve (cost at 10x / 100x / 1000x usage)
- Cost monitoring + alerting (cloud-native / Cloudability / Vantage / custom)
- AI API cost specifically (if AI-native — model selection on cost-per-task, caching strategy for prompt repetition, batch API usage)
- Cost optimization patterns (reserved capacity / spot instances / right-sizing / cold storage)

Output: cost model + per-unit economics + scaling cost projections + monitoring/alerting plan. Feeds TRD §3.x cost NFR (new), TQCD §6 cost gates (new), runbook cost-anomaly response.

#### Track 18: Internationalization & Localization

**Applicability gate:** does the PRD §2 user segment include non-English speakers, multi-locale users, or RTL-language users? If yes, track is fully applicable. If single-locale (e.g., English-only US-targeted), document NA with one-line justification but note the cost of retrofitting if the segment expands.

When applicable, evaluate:
- i18n architecture (string extraction discipline / message-id-as-source vs. natural-language-as-source / pluralization / gender / date-time / currency)
- Translation pipeline (in-house / vendor / TMS choice — Lokalise / Phrase / Crowdin / Smartling / Weblate)
- RTL support strategy (CSS logical properties / explicit RTL stylesheets / framework-native)
- Locale-aware formatting (Intl APIs / date-fns / luxon — per stack)
- Language fallback chains (per locale)
- Translation QA gates (placeholder integrity / character limit / context completeness)

Output: i18n architecture + translation pipeline + RTL plan + formatting strategy. Feeds TRD §3.x i18n NFR (new), UXD §6 responsive (RTL adjacency), TQCD §6 i18n gates.

#### Track 19: AI-Native App Concerns

**Applicability gate:** does this app use AI as a load-bearing functional component (LLM in the user-facing critical path, not just internal tooling)? If yes — fully applicable. If AI is only used in development/build tooling but not in the runtime app, document NA with justification.

When applicable, evaluate:
- Model selection rationale (Opus vs. Sonnet vs. Haiku vs. third-party — per task; cost-quality-latency Pareto)
- Prompt-injection defenses (per OWASP LLM Top 10 — input validation / output sanitization / privilege separation / sandboxing)
- Output safety filtering (content moderation / PII redaction / hallucination detection where applicable)
- AI decision audit trail (every AI-influenced decision logged with model + version + prompt + output + confidence)
- Model versioning + drift monitoring (lock model versions in config; monitor for behavior drift on canary tasks)
- Provider failover (primary + fallback model providers; circuit-breaker per provider)
- Rate limiting / spend limiting at AI provider boundary

Output: AI architecture + prompt-injection defense plan + audit trail design + model versioning policy + provider failover. Feeds TRD §3.3 (AI security), TQCD §3.3 + §6 (AI gates), AVD §3 (AI components), runbook (AI-specific incident response).

#### Track 20: Compliance Operationalization

**Applicability gate:** does PRD §6.2 declare regulatory scope (SOC2 / ISO 27001 / HIPAA / FedRAMP / PCI-DSS / GDPR-as-controller / etc.)? If yes — fully applicable. If genuinely no regulatory scope (rare for production apps; document with justification), NA permitted.

When applicable, evaluate:
- Per-control mapping (SOC2 CC1-CC9 / ISO 27001 Annex A / HIPAA Security Rule / etc. — which controls THIS app's architecture satisfies and how)
- Audit log requirements (what must be logged, retention, integrity protection, access controls)
- Data residency requirements (per jurisdiction in PRD §2)
- Vendor risk management (every third-party service evaluated for compliance certification + contractual data-protection terms)
- Audit readiness procedures (annual / triennial cycles; evidence-collection automation)
- Breach notification procedures (per regulation timeline + per contract)
- Privacy impact assessment (DPIA per GDPR / similar per CCPA where applicable)

Output: per-control matrix + audit log design + residency map + vendor risk register + audit readiness plan + breach response runbook. Feeds TRD §3.3 + §3.4, TQCD §3.3 + §3.4, AVD §4 (data flow + jurisdiction boundaries), runbook (compliance incident response).

### Stage 00 Exit

Stage 00 research findings exit through the ASAE gate at threshold 2 (research rigor gate). The gate audits:
- All 16 hardwired tracks complete
- All 4 applicability-gated tracks evaluated for applicability with explicit applicability gate decision documented (full evaluation if applicable; NA-with-justification if not)
- Claims in research findings traced to sources
- Standards and benchmarks actually applicable (not kitchen-sink listed)
- Depth-of-spec assessment honest about what the planning model can and cannot spec Deep for this stack
- Ecosystem inventory complete with gaps and conflicts flagged
- Cross-track consistency: e.g., Track 1 stack choice + Track 7 design tooling + Track 9 security tooling all integrate without conflict; Track 12 deployment target + Track 11 performance budgets + Track 17 cost model all align

On pass: proceed to Stage 01a. On fail: remediate research and re-run gate.

Stage 00 is intentionally heavy. Production-ready apps need this depth. A Stage 00 that takes a day for a serious app is appropriate; a Stage 00 that runs in 30 minutes for a serious app is incomplete. Where the user has expertise that pre-answers a track's question (e.g., "we've used this stack for 5 years in production"), Stage 00 still documents the research findings so the resulting plan is transferable across LLMs and across team members regardless of the original author's tacit expertise.

## Stage 01a: Skeleton Authorship (Opus)

Stage 01a produces the plan skeleton — the stage list with metadata required for user approval BEFORE Opus is invested in writing the full plan content. This gate catches scope errors early, before expensive full-plan-content authorship.

### Authorship Protocol

**Step 1: Define Excellent End State**

Describe, in concrete operational terms, what excellent looks like for the final output of this coding task. Include:
- Functional capability at excellence (not at MVP)
- Non-functional properties at excellence (performance, security, accessibility, reliability, maintainability)
- Specific exit criteria tied to Stage 00 standards and benchmarks + the prerequisite TQCD

This is not aspirational. It is the measurable target the plan backwards-plans from.

**Step 2: Design QA First (From Testing Taxonomy)**

Before designing any implementation stages, design the QA that verifies the excellent end state. This step primarily references the prerequisite TQCD which already declared Testing Taxonomy applicability per category — Stage 01a cross-checks that the TQCD's declarations align with Stage 00's research findings and surfaces any discrepancies.

Reference: `.claude/skills/dare-to-rise-code-plan/references/Software_Testing_Taxonomy_2026-04-17_v01_I.md` and the prerequisite TQCD instance.

Output: QA specification that defines Stage QA's exit criteria in advance of any implementation.

**Step 3: Backwards-Plan Implementation Stages (Skeleton-Level)**

With the excellent end state defined and the QA criteria specified, backwards-plan the implementation stages required to produce the end state that passes the QA.

For each stage, specify AT METADATA LEVEL ONLY:
- Stage name and one-line purpose
- Inputs (from which prior stages or from Stage 00 research)
- Outputs (specific artifacts — file paths, deliverables)
- Model assignment (Opus / Sonnet / Haiku) with justification
- Effort level (low / medium / high)
- Spec depth (Shallow / Medium / Deep) with justification
- ASAE gate scope summary and Certainty Threshold
- Commit gate hook configuration summary
- Accessibility exit criteria summary (if UI stage)
- Test coverage exit criteria summary (if code stage)
- Parallelization: which stages can run concurrently and which have hard dependencies

Stage 02 is ALWAYS Project Scaffold, executed by Sonnet. Stage 03+ are feature implementation stages, executed by Haiku at Deep spec depth (unless Stage 01a justifies a different model with explicit rationale tied to Stage 00 Track 4 depth-feasibility findings).

**Step 4: Specify Hook Configurations (Summary Level)**

Stage 01a names the hook configurations to install in Stage 02. Exact hook contents are authored in Stage 01b.

**Step 5: Present Plan Skeleton For Approval**

Present the skeleton to the user in table form. Wait for explicit approval before Stage 01b begins. Do not begin full plan authorship without approval.

### Stage 01a Exit

Stage 01a skeleton exits through the ASAE gate at threshold 2 (rapid-iteration gate), then the user approval gate. The ASAE gate audits:
- All stages traceable to Stage 00 research findings + prerequisite TRD
- QA designed from Testing Taxonomy + prerequisite TQCD
- Model + depth + ASAE threshold assigned per stage with justification
- Stage 02 is present and assigned to Sonnet
- Stage 03+ exist and default to Haiku unless justified otherwise
- No stage missing skeleton-level metadata

On ASAE pass: present skeleton for user approval. On user `✓`: proceed to Stage 01b. On ASAE fail or user redirect: remediate and re-run.

## Stage 01b: Full Plan Authorship (Opus)

Stage 01b is the stage that produces the actual executable D2R plan — the artifact Stage 02+ reads and operates against. Without Stage 01b, Haiku has no Deep-spec content to transcribe from. The skeleton alone is not executable.

### Authorship Protocol

For each stage in the approved skeleton, write the full plan content at the stage's declared depth. Depth-specific requirements:

#### Deep-Depth Stages (default for Haiku executors)

Stage 01b content for every Deep stage must include:

**File operations:**
- Exact file path(s) to create or modify (absolute paths within the repo)
- Exact file content structure (what goes at top vs bottom; section organization)

**Code specification:**
- Exact import statements with pinned library versions (e.g., `import { z } from 'zod@3.22.4'`)
- Exact function signatures with parameter types and return types
- Exact class / interface / type definitions
- Exact error types and their shape
- Exact error handling patterns (e.g., `Result<T, PlanParseError>`)
- Exact constants and configuration values

**Test specification:**
- Exact test case list with: test name, inputs, expected outputs, assertion patterns
- Exact test file paths
- Exact test framework patterns (Vitest `describe`/`it`/`expect` syntax)
- Exact property-based test invariants (for fast-check)

**Step operations:**
- Step-by-step enumeration of operations the executor performs
- Exact commands to run (not "run tests" — `npm test -- --coverage`)
- Exact sequence with ordering

**Validation criteria per step:**
- What output indicates the step succeeded
- What output indicates failure and what failure mode it represents

At Deep depth, Haiku is not making any language-level decisions. It is transcribing the plan into code. The plan-specification-depth hypothesis (that Haiku's training-data coverage ceases to gate execution quality at sufficient spec depth) can only be tested if Stage 01b actually produces Deep content.

#### Medium-Depth Stages (for Sonnet executors)

Stage 01b content for every Medium stage must include:

- Library selection with version constraints
- API usage pattern at high level (not exact idiomatic code)
- Error handling pattern (approach, not exact types)
- Type expectations
- Test requirements (what to test, not exact assertions)
- Exit criteria specific enough that completion is verifiable

Sonnet is making mid-level decisions at Medium depth (idiomatic patterns, specific error types, exact type names within declared type families) but the plan has constrained the space of choices.

#### Shallow-Depth Stages (rare; for Opus executors, or when Stage 00 Track 4 research determined Deep spec is infeasible)

Stage 01b content for every Shallow stage must include:

- Goal statement
- Exit criteria
- Reference to Stage 00 research that explains why deeper spec was not producible
- Acknowledgment that the executor is making significant decisions

Shallow depth is a flag that the D2R plan is less deterministic at this stage and downstream quality depends more on the executor's training. Should be rare; every Shallow-depth stage requires explicit justification.

#### Hook Configurations (Full Detail)

Stage 01b produces the exact hook scripts that Stage 02 installs:

- `.claude/settings.json` with complete PreToolUse / PostToolUse / Stop / UserPromptSubmit entries — exact JSON
- `.githooks/pre-commit` as complete executable script — exact shell content
- `.githooks/pre-push` as complete executable script — exact shell content
- Hook verification CI job as complete YAML — exact GitHub Actions workflow content

#### README And LICENSE Content Decisions

Stage 01b specifies (Opus-decided) the CONTENT the README and LICENSE should communicate. Sonnet's Stage 02 work drafts the prose from these decisions.

README content decisions include:
- Title, tagline, one-paragraph overview
- Key features (what to highlight)
- Installation / setup instructions outline
- Usage examples outline (what examples to show)
- Contributing / community section approach
- License declaration pointing to LICENSE file
- Acknowledgments / credits

LICENSE content decision: exact license selection with rationale (e.g., "MIT for permissive open source with Martinez Methods attribution clause in the NOTICE file").

### Stage 01b Output

The Stage 01b output is a single document (or structured set of documents) containing:
- Excellent end state definition
- QA specification (per Stage 01a Step 2)
- Full stage-by-stage content at declared depth
- Full hook configurations
- README and LICENSE content decisions
- Cross-references to PRD / TRD / TQCD / Stage 00 research findings throughout

Filename convention: `[ProjectPrefix]_D2R_Plan_[YYYY-MM-DD]_v01_I.md`, saved to the project's `docs/planning/` directory.

### Stage 01b Exit

Stage 01b output exits through the ASAE gate at threshold 3 (plan-content gate). The gate audits:
- Every Deep stage has all Deep-depth requirements present
- Every Medium stage has all Medium-depth requirements present
- Every Shallow stage has explicit justification for Shallow depth
- Hook configurations are complete and installable
- README/LICENSE content decisions are specified (not deferred)
- Traceability from plan content back to PRD / TRD / TQCD / Stage 00 research
- No stage has placeholder text ("TBD", "TODO", "fill in later")

On pass: proceed to Stage 02. On fail: remediate plan content and re-run gate.

## Stage 02: Project Scaffold (Sonnet)

Stage 02 is always Project Scaffold. Executed by Sonnet. This stage creates the working project environment that Stage 03+ Haiku implementation runs within.

### Scope

**Repo setup:**
- Create repo on GitHub if it doesn't exist (visibility per Stage 01b decisions; description per Stage 01b)
- Initialize local repo
- Configure remote
- Set up initial branch structure

**Documentation artifacts (drafted by Sonnet per Stage 01b content decisions):**
- README.md (Sonnet authors prose from Opus's content decisions)
- LICENSE (Sonnet authors per Opus's license selection)
- .gitignore (per applicable language/framework patterns; may be largely template-driven)
- Initial CLAUDE.md pointing to the D2R plan and project documentation

**Configuration artifacts (per Stage 01b specifications):**
- package.json or equivalent (exact dependencies per Stage 01b)
- tsconfig.json or equivalent (exact settings per Stage 01b)
- eslint.config.js or equivalent (exact rules per Stage 01b)
- prettier.config.js or equivalent
- Framework-specific configs (svelte.config.js, vite.config.ts, tailwind.config.js, etc. per Stage 01b)
- Test framework configs (vitest.config.ts, playwright.config.ts, etc.)

**Hook installation:**
- `.claude/settings.json` with hook configurations from Stage 01b
- `.githooks/pre-commit` script from Stage 01b
- `.githooks/pre-push` script from Stage 01b
- `prepare` script in package.json that installs the git hooks path

**CI/CD setup:**
- `.github/workflows/` with CI workflow from Stage 01b
- Verify workflow on initial commit

**Initial directory structure:**
- Create folders per Stage 01b's scaffolding spec
- Placeholder README.md in each empty folder explaining intended contents

**Initial commit + push:**
- Stage all scaffold files
- Commit with descriptive message per Stage 01b's content decisions
- Push to main (or default branch per Stage 01b)
- Verify CI runs and passes on initial commit

### Stage 02 Exit

Stage 02 exits through the ASAE gate at threshold 3 (scaffold completeness gate). The gate audits:
- Repo created and remote configured
- README, LICENSE, .gitignore, CLAUDE.md present and aligned with Stage 01b content decisions
- All configuration files per Stage 01b specifications
- Hook scripts installed and executable
- CI workflow runs and passes on initial commit
- Directory scaffolding matches Stage 01b
- Initial commit pushed successfully

Then commit gate: pre-commit hook runs on its own scaffold commit as the first self-test of the hook system.

On pass: proceed to Stage 03+. On fail: remediate scaffold and re-run gate. Common failures: missing dependencies, CI workflow errors, hook script syntax errors, permission issues on hook installation.

## Stage 03 through Stage NN: Feature Implementation (Haiku by default)

Each feature implementation stage executes per its Stage 01b full specification. Exit gates run at threshold configured in Stage 01a/01b (default 3 for implementation stages).

### Sub-Stage Structure Per Implementation Stage

**Stage NN: Execute** — Haiku transcribes Stage 01b content into code per exact spec

**Stage NN-A: ASAE gate** — invoke `/asae` with scope defined in Stage 01b. Gate runs until threshold is met. Returns structured result (status, counter, severity totals, log path).

**Stage NN-M: Meta-ASAE gate** — verify the Stage NN-A gate produced valid output. Invoke `/asae` at `domain: document`, target = the Stage NN-A ASAE log file, threshold 2, strict policy. Returns PASS only if the Stage NN-A log exists, parses correctly, has status PASS (not HALT), and matches the declared scope. Produces its own audit trail entry.

**Stage NN-B: Commit gate** — invoke git commit. Hook-level meta-ASAE fires automatically (PreToolUse on `git commit*` verifies Stage NN-A log exists in context; git pre-commit runs ASAE log validator). Pre-commit hook also runs format, lint, type check, tests, a11y (if UI), secret scan. Commit succeeds only if all checks pass.

**Stage NN-C: Audit trail entry** — PostToolUse hook logs stage completion with model used, artifacts produced, Stage NN-A gate result, Stage NN-M meta-gate result, commit hash, timestamps.

The NN-M sub-stage is not redundant with the hook-level meta-ASAE. NN-M runs before the commit is attempted and produces its own audit artifact; hook-level meta-ASAE runs at commit time. Defense-in-depth: either catching a missing or malformed gate output is sufficient to block commit; both running together produces belt-and-suspenders enforcement.

### Failure Handling

If ASAE gate fails after remediation iterations exceeding a reasonable bound (default 10 iterations), halt and escalate. Do not force-merge.

If commit gate fails, ASAE must re-run against the failure reason. The failure is a signal that either the implementation is incomplete or the QA criteria are wrong — both require governance.

If pre-push gate fails, push does not proceed. Do not bypass `--no-verify` without explicit session-logged justification that the user accepts responsibility.

## Stage NN+1: Design Polish (Sonnet)

Runs after all Stage 03-NN implementation stages pass their gates. Before Stage QA. Visual + interaction polish pass against the prerequisite UXD.

### Structure

The Design Polish stage takes the functionally-correct UI shipped by Stage 03-NN implementation and brings it up to the UXD's polish criteria. Implementation Haiku stages produce working UI; Design Polish Sonnet refines aesthetic + interaction quality. Empirically (per CCC v1.0 → v1.0.1 chain), Haiku-implemented UI ships with internally-consistent generic-default visual character; Sonnet's visual judgment is required to achieve the polish criteria the UXD specifies.

### Inputs

- Approved UXD (Section 1 aesthetic anchors, Section 2 visual design system, Section 3 interaction patterns, Section 4 information architecture, Section 5 accessibility-as-delight, Section 6 responsive behavior, Section 7 anti-patterns, Section 8 reference design assets)
- Reference design assets at the paths declared in UXD Section 8.1 (loaded as authoritative visual references)
- Current state of the implementation (post Stage 03-NN, all functional gates passed)
- Prior ASAE log entries from implementation stages (for context on what's been verified vs. what hasn't)

### Loop

Design Polish is a convergence loop on the visual + interaction layer. Each iteration:

1. **Render-and-observe pass:** run the application against representative real data (NOT synthesized fixtures — see F13). Capture screenshots of every screen in every state declared in UXD Section 3.2 (default / loading / empty / error / success). Compare to UXD Section 1.1 reference apps + Section 8 reference design assets.

2. **`/asae` invocation at `domain=design`** with scope:
   - target: the rendered-and-observed application + the screenshot set
   - sources: UXD instance + reference design assets + PRD user journeys
   - prompt: "Audit the application against the UXD per the Design Polish gate"
   - asae_certainty_threshold: 3
   - severity_policy: strict

3. **Apply polish edits** per ASAE findings. Sonnet edits the UI implementation to remediate severity-classified findings. Edits stay within the visual + interaction surface (CSS / component styles / interaction handlers / state-rendering logic); Sonnet does NOT modify functional logic, schemas, or data structures (those are Stage 03-NN scope).

4. **Re-run from step 1** until ASAE Certainty Threshold of 3 consecutive clean cycles is reached.

### Exit Criteria

Stage NN+1 exits successfully only when:

1. ASAE at `domain=design` threshold 3 strict has cleared 3 consecutive cycles
2. Every interactive component class in UXD Section 3.1 has its full state set (default / hover / focus / focus-visible / active / disabled / loading / empty / error / success — applicable subset) rendered and verified
3. Every screen-or-surface state in UXD Section 3.2 has its specified copy + visual treatment + actions rendered and verified
4. Accessibility-as-delight checks (UXD Section 5) pass — ARIA label quality verified by spot-check, keyboard nav focus order matches visual reading order, screen-reader experience verified against UXD Section 5.3 criteria, motion preferences honored per UXD Section 5.4
5. Anti-patterns named in UXD Section 7 are not present in the rendered application

### What Design Polish Does NOT Cover

- WCAG 2.1 AA compliance gating (that's the floor; covered at /asae domain=code in implementation stages + Stage QA)
- Functional acceptance tests (Stage QA scope)
- Performance / bundle size (Stage QA scope or implementation-stage scope)
- Test coverage thresholds (TQCD-declared, gated at implementation + QA)
- Stress / fault-injection testing (Stage QA scope)

The accessibility line is sharp: WCAG 2.1 AA compliance is checked at /asae domain=code (layers 4-5 of the 6-layer accessibility model). Accessibility-as-delight is checked at /asae domain=design (layer 6). A build can pass layers 4-5 and still fail layer 6 if the accessibility is technically compliant but feels box-ticked rather than intentional.

### Failure Modes

- **Stage NN+1 cannot reach convergence:** design intent is genuinely under-specified in UXD, OR implementation has structural problems Sonnet can't polish around. Halt; route back to UXD authorship for clarification or to Stage 01b for re-planning.
- **Stage NN+1 polishes regress functional tests:** Sonnet edited functional logic by mistake. Revert via parent governance (per F8 discipline), re-delegate with explicit forbidden-actions list naming the regressed area.
- **Stage NN+1 polishes pass /asae but Krystal's qualitative review fails:** the UXD polish criteria (Section 1.3) didn't match Krystal's actual standard of excellence. Update UXD; re-run Design Polish from iteration 1. This is the F13-equivalent failure at the design-criteria layer; capture as F-class corpus evidence.

## Stage QA: Convergence Loop

Terminal stage. Runs after all implementation stages pass their own gates.

### Structure

Stage QA executes the QA specification defined in Stage 01 Step 2 against the complete implementation.

Each QA cycle has three phases:

**Phase 1: Applicable Test Sweep** — execute every test category from Testing Taxonomy Part 1 that Stage 01 marked applicable. Collect results.

**Phase 2: Applicable Stress Sweep** — execute every stress category from Testing Taxonomy Part 2 that Stage 01 marked applicable, using the selection strategy from Part 3. Collect results.

**Phase 3: Remediation** — fix every issue found. Re-run sweeps.

### Exit

Stage QA exits when the ASAE Certainty Threshold of 5 consecutive QA cycles with zero new issues is reached.

This is the highest threshold in the plan because this is the final convergence before the artifact is considered complete.

### Stage QA Commit Gate

On exit, commit with the final D2R summary as the commit message:
- Total stages executed
- Total ASAE gate iterations across all stages
- Total issues found and remediated in Stage QA
- Standards verified with exit criteria met
- Benchmarks achieved with scores
- Testing Taxonomy categories executed (and skipped with justifications)

## Execution Protocol

1. **Receive coding task.** Any task triggering this skill.

2. **Verify prerequisite inputs exist and are approved.** PRD, TRD, TQCD instances must be present and approved. If any is missing, pause and author the missing document(s) using the templates in `references/` before proceeding.

3. **Execute Stage 00 (Opus).** Five-track research. Exit through ASAE gate at threshold 2.

4. **Execute Stage 01a (Opus).** Author plan skeleton — stage list with metadata only. Exit through ASAE gate at threshold 2.

5. **Present plan skeleton for user approval.** Wait for explicit `✓` before proceeding to Stage 01b. Do not begin full plan authorship without approval.

6. **Execute Stage 01b (Opus).** Author full plan content per approved skeleton at declared depth per stage. Includes exact file operations, code specs, test specs, step operations, hook configurations, README/LICENSE content decisions. Exit through ASAE gate at threshold 3.

7. **Execute Stage 02 (Sonnet): Project Scaffold.** Create repo, author README / LICENSE / configs / CI / hooks from Stage 01b specifications, initial commit and push. Exit through ASAE gate at threshold 3 + commit gate.

8. **Execute Stage 03+ feature implementation in order (Haiku by default, or parallel where Stage 01b permits).** Each stage passes ASAE gate + commit gate + audit trail entry.

9. **Execute Stage QA.** Convergence loop until 5 consecutive null cycles across applicable Testing Taxonomy categories.

10. **Final commit with D2R summary.** Push through pre-push hook.

11. **Present final summary to user.** Table of stages, gate iterations, standards verified, benchmarks achieved.

## Anti-Patterns

- Treating accessibility as a feature stage. It is a condition of correctness on every UI stage.
- Treating test coverage as a later concern. Tests are authored alongside implementation or before it.
- Shallow plan-specification depth without justification. Default to Deep when Haiku executes.
- Skipping Stage 00 research. Every plan begins with research.
- Skipping Stage 01 ASAE gate. The plan itself is the most upstream artifact; it requires the tightest gate.
- Skipping hook installation before Stage 02. Ungated execution is forbidden.
- Forward-planning from current capacity. Backwards-plan from excellence.
- Using Haiku for reasoning or QA judgment. Model assignment is hook-enforced.
- Committing without ASAE log. Pre-commit hook refuses.
- Describing ASAE mechanics in the plan. Plan specifies when gates run, not how they work.
- Listing test categories without applying the Testing Taxonomy selection rule. Each category must be evaluated for applicability with documented reasoning.

## Related Skills

- `/write-prd` — Authors a PRD instance. Invoked before D2R if PRD prerequisite missing.
- `/write-trd` — Authors a TRD instance. Invoked before D2R if TRD prerequisite missing.
- `/write-avd` — Authors an AVD instance. Invoked before D2R if AVD prerequisite missing.
- `/write-tqcd` — Authors a TQCD instance. Invoked before D2R if TQCD prerequisite missing.
- `/write-uxd` — Authors a UXD instance. Invoked before D2R if UXD prerequisite missing.
- `/asae` — Invoked at every stage exit for the primary gate, and at every Stage NN-M for the meta-gate. Stage NN+1 Design Polish uses `/asae` at `domain=design`. This skill does not describe ASAE mechanics; the `/asae` skill does.
- `/file-versioning` — For document outputs produced by the plan.
- `/file-presentation` — For presenting generated files to the user.
- `/walk-me-through` — For walking the user through research findings or results.

## Related References

- `references/PRD_Template_2026-04-17_v01_I.md` — Product Requirements Document template. Prerequisite input to D2R. Filled-in instance must exist and be approved before Stage 00. Authored via `/write-prd`.
- `references/TRD_Template_2026-04-17_v01_I.md` — Technical Requirements Document template. Prerequisite input. Authored via `/write-trd`.
- `references/AVD_Template_2026-04-17_v01_I.md` — Architecture Vision Document template. Prerequisite input. Authored via `/write-avd` (or skipped with justification for trivially simple projects).
- `references/TQCD_Template_2026-04-17_v01_I.md` — Testing & Quality Criteria Document template. Prerequisite input. Authored via `/write-tqcd`. Stage 01 QA-first design reads from the TQCD instance.
- `references/UXD_Template_2026-04-25_v01_I.md` — User Experience Document template. Prerequisite input. Authored via `/write-uxd`. Stage 01 reads UXD for visual + interaction scoping; Stage NN+1 Design Polish uses UXD as the convergence target.
- `references/Software_Testing_Taxonomy_2026-04-17_v01_I.md` — 20 test categories, 39 stress test categories, AI-driven test selection strategy. Used in TQCD authorship to declare applicability per category, in Stage 01 Step 2 for QA design, and in Stage QA for the applicable sweep.

## Six-Layer Accessibility Hardwiring

Accessibility is structurally enforced across six layers in the D2R cascade. Each layer is load-bearing — remove one and the chain breaks. WCAG 2.1 AA compliance is hardwired (not negotiable) at the first five layers; the UXD adds an accessibility-as-delight sixth layer on top.

| # | Layer | What's hardwired | What enforces it |
|---|---|---|---|
| 1 | **PRD Section 6.4** | "WCAG 2.1 AA compliance is hardwired — not a constraint to negotiate" | Cross-doc audit in `/ideate-to-d2r-ready` Phase 3 verifies declaration |
| 2 | **TRD Section 3.5** | Tech-stack choices that support accessibility (jsx-a11y eslint plugin, ARIA library, accessibility-aware framework) | Cross-doc audit checks TRD↔TQCD coverage |
| 3 | **TQCD Section 3.5** | Per-Standard Exit Criteria — axe-core CRITICAL+SERIOUS = 0, Lighthouse Accessibility ≥ target, keyboard nav coverage in test suite | TQCD declares applicable; Stage QA enforces |
| 4 | **`/asae` domain=code checklist** | "Accessibility compliance (WCAG 2.1 AA if UI code, per D2R hardwired requirement)" — fires at every Stage 03+ implementation gate at strict severity | The `/asae` skill itself; findings reset counter |
| 5 | **Stage QA convergence loop** | Full Testing Taxonomy applicable sweep including accessibility tests at threshold 5 | D2R Stage QA gate; findings reset cycle |
| 6 | **UXD Section 5 + `/asae` domain=design** | Accessibility-as-delight: ARIA labels are action verbs not nouns; keyboard nav focus order matches visual reading order; screen-reader experience is intentional (live regions, landmarks, decorative-image marking); motion/contrast/color-scheme preferences honored thoughtfully | Stage NN+1 Design Polish gate at `/asae domain=design` threshold 3 strict |

The 6-layer model is the structural-enforcement answer to "is accessibility hardwired?" — yes, at six independent gates, in different layers (declaration / tech / quality criteria / implementation audit / QA convergence / design polish). A bug that bypasses one layer is caught by the next; a build that ships missing accessibility is empirical evidence that one of the layer-enforcers regressed and triggers F-class corpus addition.

## Three-Way Standards Alignment Check (TRD ↔ UXD ↔ TQCD)

The cross-doc audit in `/ideate-to-d2r-ready` Phase 3 includes a three-way alignment check on accessibility (and any other standards declared applicable):

- **TRD declares the stack** (jsx-a11y, ARIA library, framework with accessibility defaults)
- **UXD specifies design-layer accessibility behavior** (Section 5: ARIA label quality criteria, keyboard nav quality, screen reader experience, motion preferences)
- **TQCD operationalizes test gates** (axe-core thresholds, Lighthouse Accessibility score, keyboard nav coverage requirements)

For each standard declared applicable in TRD: there must be a corresponding behavior specification in UXD AND a corresponding exit criterion in TQCD. Missing in UXD → design-layer behavior unspecified → implementer falls back to generic defaults at Stage NN+1. Missing in TQCD → no test gate → no enforcement. Missing in TRD → no stack support → declaration is aspirational. All three sides required for a hardwired standard.

## Related Rules

- `git-commit-scope` — Only commit files authored in the current session
- `github-discipline` — Push after every commit with descriptive messages
- `file-naming-and-versioning` — Versioning for all document outputs
- `no-silent-execution` — Every phase produces at minimum a short in-thread confirmation
- `ip-language-discipline` — Branded terminology only; methodology not exposed in skill files
