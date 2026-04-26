---
name: asae
description: "Use this skill when a caller needs a convergence gate run on an output artifact against original sources and a specification. Triggers on: '/asae', 'asae', 'asae gate', 'run asae', 'asae on this', 'audit this against sources', 'convergence gate', or when a parent skill (e.g., /dare-to-rise-code-plan) invokes ASAE at a stage boundary. Takes a scope definition (target, sources, prompt, domain, ASAE Certainty Threshold, severity policy). Runs iterative comparison passes with severity-classified findings. Exits when the configured ASAE Certainty Threshold is reached or halts on max-iteration exceeded. Produces a versioned audit log."
---

# ASAE

## Purpose

ASAE is a convergence gate. The caller invokes it with a scope definition. The gate iterates until the configured ASAE Certainty Threshold is reached — a structural exit condition, not a self-reported one — or halts with escalation if a maximum iteration bound is exceeded.

This skill specifies execution. It does not document methodology. Methodology lives inside Martinez Methods.

## When to Use

- When invoked by a parent skill at a stage boundary (e.g., `/dare-to-rise-code-plan` at every `-A` sub-stage)
- When the user invokes `/asae`, `asae`, `run asae`, or equivalent
- When an output artifact needs a convergence gate before being treated as complete
- Before finalizing any versioned deliverable where the caller has specified a threshold

## Required Input: Scope Definition

Every invocation requires a scope definition. The caller provides:

| Field | Required | Description |
|-------|----------|-------------|
| `target` | Yes | Path(s) to the output artifact(s) being audited |
| `sources` | Yes | Path(s) to the original materials the output was produced from |
| `prompt` | Yes | Path to the original prompt or spec, or inline description |
| `domain` | Yes | One of: `document`, `code`, `design`, `research`, `instructional_design`, `legal`, `other` |
| `asae_certainty_threshold` | Yes | Integer (default 3). Number of consecutive passes required at the exit severity policy. |
| `severity_policy` | Yes | `strict` or `standard` (see Severity Classification below) |
| `max_iterations` | No | Default 10. Halt and escalate if exceeded. |

If the caller does not provide a scope definition, the skill requests one before proceeding. No audit runs without scope.

## Severity Classification

Every finding in every audit pass is classified at one of four severity levels:

| Severity | Definition | Counter Impact (standard policy) | Counter Impact (strict policy) |
|----------|------------|----------------------------------|--------------------------------|
| CRITICAL | Factual inaccuracy, hallucination, missing required content, security vulnerability, regulatory noncompliance | Resets counter to 0; must remediate before next pass | Resets counter to 0 |
| HIGH | Logic gap, structural error, misrepresentation of source, accessibility violation, incorrect type signatures, failed test assertion | Resets counter to 0; must remediate before next pass | Resets counter to 0 |
| MEDIUM | Formatting violation, inconsistent naming, minor omission, non-idiomatic patterns | Does NOT reset counter. Must remediate before loop exit. | Resets counter to 0 |
| LOW | Style preference, minor rewording opportunity, non-material improvement | Does NOT reset counter. Logged. Remediation optional. | Does NOT reset counter. Logged. |

Default policy is `standard` unless caller specifies `strict`. Strict is appropriate for high-stakes outputs (regulatory filings, published research, production code in regulated domains).

## Domain Audit Checklists

When `domain` is specified, ASAE applies the domain's audit checklist in every pass. Every checklist item must be evaluated and assigned a result: PASS, FAIL (with severity), or NA (with reason).

### domain: document
- Factual accuracy (every factual claim traced to a source)
- Source fidelity (no misrepresentation of source material)
- Completeness against prompt (every requested element present)
- Internal consistency (no contradictions within the document)
- Formatting compliance (per applicable style rules)
- File naming and versioning (per project conventions)
- Compliance audit-readiness (when the document is in a regulated domain or when Track 20 is APPLICABLE): control-mapping completeness (every applicable framework control mapped to evidence in the document or referenced from it); evidence freshness (timestamps within retention window for the framework); approver chain documented (named approvers with roles, dates, and any conditions); cross-references to primary sources current (not pointing at superseded versions of the standard); jurisdiction specificity where regulations vary by region; PII / regulated-data redaction verified for any document that may be shared externally

### domain: code
- Correctness (behavior matches specification)
- Test coverage (100% line + branch coverage of testable surface, per D2R hardwired requirement)
- Security compliance (OWASP Top 10 applicable items + OWASP LLM Top 10 if AI-integrated + CERT secure coding for language) — operationalizes TRD §3.3 + Track 9 threat model
- Auth flow correctness — authentication + authorization + session management exercised end-to-end against real provider in staging (not mocked); negative-case tests cover token validation (expired, malformed, revoked, swapped); MFA enforced for required roles per TRD §3.3 + Track 15
- Accessibility compliance (WCAG 2.1 AA if UI code, per D2R hardwired requirement) — this is layer 4 of the 6-layer accessibility model in D2R; the floor, not the ceiling
- Type correctness (no type errors, explicit types where language permits)
- Naming conventions (per project conventions)
- No secrets committed (verified by gitleaks/trufflehog/detect-secrets pre-commit hook output)
- Observability instrumentation present where TRD §3.8 + Track 10 require it: structured logging at every defined level with required fields (request_id, user_id, span_id, timestamp, event, level); metrics exposed at /metrics or equivalent; distributed-tracing propagation across service hops; SLI/SLO queries implemented; alerts firing on threshold breach in staging
- Performance budget compliance per TRD §3.1 + Track 11: p50/p95/p99 measured against budgets; bundle size + memory + CPU + DB-query budgets verified; performance regression alarm thresholds enforced in CI
- Reliability pattern adherence per TRD §3.2 + Track 14: retries with backoff use bounded budgets; circuit breakers wrap downstream dependencies that can fail; idempotency keys on all idempotent endpoints; queue / DLQ patterns implemented for async work; timeouts everywhere there is network or I/O
- Release-engineering practice per TRD §3.9 + Track 16: SemVer / CalVer adhered to (CI fails on missing/malformed version); CHANGELOG entry present; feature flags used for risky changes (not unconditional merges to main); rollback path verified in staging within current release cycle
- Audit-on-observed-behavior, NOT intent (F7 anti-pattern guard): the audit MUST execute tests, typecheck, lint, and build. Reading code without running these is incomplete. Sub-agents performing this audit MUST run tests before returning verdicts. Parent verifies sub-agent diffs against scope (F8 guard) and verifies sub-agent exit-code claims against literal shell output (F10 guard); never accept a "tests pass" verdict without seeing the actual test runner output

### domain: design

Used for UXD authorship gates (`/write-uxd` Step 3) and for D2R Stage NN+1 Design Polish convergence loops. Audits the visual + interaction surface of an application against the prerequisite UXD instance.

- Aesthetic anchor fidelity — rendered application is visually consistent with UXD Section 1.1 reference apps; UXD Section 1.2 brand-voice decisions are observable in the rendered output; UXD Section 1.3 polish criteria pass observable-test review
- Visual design system adherence — every color used in the application is in the UXD Section 2.1 palette; every type size is on the UXD Section 2.2 scale; every spacing value is on the UXD Section 2.3 grid; every component instance maps to a UXD Section 2.4 component token
- Interaction state completeness — every interactive component class has its full UXD Section 3.1 state set rendered (default / hover / focus / focus-visible / active / disabled / loading / empty / error / success — applicable subset)
- Empty / loading / error / success state coverage — every screen-or-surface state declared in UXD Section 3.2 is rendered with the specified copy + visual treatment + actions
- Animation and transition compliance — motion is allowed only in UXD Section 3.3 declared categories at declared durations + curves; `prefers-reduced-motion` policy honored per UXD Section 3.3
- Information architecture compliance — UXD Section 4 hierarchy rules + grouping/prioritization rules + navigation pattern observed in the rendered application
- Accessibility-as-delight (layer 6 of the 6-layer accessibility model in D2R; ABOVE WCAG 2.1 AA compliance which is gated at /asae domain=code) — ARIA label quality per UXD Section 5.1 (action verbs not nouns; describe outcome not mechanism; consistent vocabulary); keyboard nav quality per UXD Section 5.2 (focus order matches visual reading order; focus-visible always rendered; modal dialogs trap focus); screen-reader experience per UXD Section 5.3 (page landmarks present; decorative images marked decorative; live regions for async status; reading order matches visual order); motion + sensory preferences per UXD Section 5.4
- Responsive + mobile compliance — UXD Section 6 breakpoints, per-breakpoint layout changes, touch-target sizing, mobile-only patterns observed
- Anti-pattern absence — none of the UXD Section 7 named anti-patterns are present in the rendered application
- Reference design asset fidelity — rendered application visually consistent with the reference design assets at the paths declared in UXD Section 8.1 (this is the F13-equivalent reality-anchor check; without reference assets, the audit has no external anchor and re-introduces the fictional-validation tautology)

The design domain audit MUST run the application and observe the rendered output (capture screenshots; interact with components; verify state transitions). Reading code without rendering is the F7-equivalent failure mode at the design layer — the audit-on-intent-not-observed-behavior anti-pattern, applied to visual + interaction quality. A design audit that skips the render-and-observe pass is incomplete.

### domain: research
- Citation accuracy (every citation verifiable)
- Evidence grading (claims matched to evidence strength)
- Claim-source traceability (every claim traces to a source)
- Methodology disclosure (methods documented, limitations named)
- Null result handling (null findings treated as valid outputs, not failures)

### domain: instructional_design
- Learning objective alignment (every activity traces to an objective)
- Standards alignment (content maps to target standards framework)
- Scaffolding completeness (prerequisites addressed before new content)
- Assessment validity (assessments measure what objectives state)
- Accessibility of learning materials

### domain: legal
- Regulatory accuracy (every regulatory claim verifiable against primary source)
- Completeness of required disclosures
- Jurisdiction specificity (jurisdiction correctly identified for each provision)
- Citation to primary statutory sources (not only secondary summaries)

### domain: other
- Factual accuracy (every factual claim traced to a source)
- Source fidelity
- Completeness against prompt
- Internal consistency
- General formatting and naming

## The Loop

### Step 1: Audit

Re-read all sources. Re-read the target. For every checklist item in the domain (plus any caller-specified additional criteria), evaluate the target against the source. Classify every finding by severity.

Each audit pass is the SAME comprehensive check, repeated. Not different checks on different passes. The same full evaluation against the same full scope.

### Step 2: Apply Edits

Remediate findings per severity policy:
- CRITICAL: always fix before continuing
- HIGH: always fix before continuing
- MEDIUM: fix before loop exit (strict policy: fix before continuing)
- LOW: fix if trivial; log otherwise

### Step 3: Present Summary

In-thread summary after each loop iteration. Format:

```
## ASAE Loop [iteration] — Scope: [scope name]

**Threshold:** [asae_certainty_threshold]
**Severity Policy:** [standard|strict]
**Domain:** [domain]

**Findings this pass:**
| # | Severity | Checklist Item | Description | Source | Edit Applied |
|---|----------|----------------|-------------|--------|--------------|
| 1 | HIGH | source_fidelity | [description] | [source reference] | [what was changed] |

**Counter state:** [current] / [threshold] consecutive clean passes
**Remaining to exit:** [threshold - current] clean passes required
```

### Step 4: Update Counter

Apply the severity policy to update the consecutive-clean-pass counter per the Severity Classification table.

### Step 5: Version Bump (Target-Type-Dependent)

If target type is a document (domain: `document`, `research`, `instructional_design`, `legal`, or `other` with a document output):
- Increment version number per `file-naming-and-versioning` rule
- Move superseded version to `deprecated/` folder in the same directory

If target type is code (domain: `code`) and the target is tracked by git:
- Do NOT bump filename version. Git history carries version.
- Stage the edits for commit; the parent skill's commit gate will handle the git commit with ASAE metadata.

### Step 6: Independent Rater Verification (REQUIRED for all /asae invocations)

After the primary auditor reaches strict-N convergence (counter == threshold AND no blocking findings), spawn an independent rater to confirm the verdict BEFORE issuing PASS to the caller. REQUIRED for all /asae invocations regardless of severity policy.

**Why:** Single-persona audit is structurally vulnerable to systematic blind spots — the primary auditor is the same persona that authored the artifact. Independent verification by a different persona running the SAME identical-pass checklist against the SAME target catches discrepancies the primary missed. Per axis 3.10.I structural-prevention-vs-vigilance discipline: methodology should not require Krystal-vigilance.

**How:**

1. Spawn a subagent with no shared context with the primary auditor. Use the Agent tool with `subagent_type: general-purpose` (default; domain-specialized agent types may be substituted at caller's discretion if applicable to the audit's domain).

2. Brief the rater self-contained (independence requires zero context-leak from the primary auditor's reasoning):
   - Provide the canonical `/asae SKILL.md` path for methodology reference
   - Provide the audit log path (the primary auditor's strict-N PASS log)
   - Provide the target artifact paths
   - Direct the rater to independently re-evaluate the SAME N-item checklist defined in the audit log's Audit Scope section against the SAME target
   - Direct the rater NOT to fix anything — only rate
   - Direct the rater to return one of three verdicts: CONFIRMED | PARTIAL | FLAG
   - Direct the rater to be skeptical: do not assume good faith on individual claims; verify independently per item

3. Capture the rater's verdict in the audit log under section `## Independent Rater Verification` with:
   - Subagent type used
   - Verbatim summary of brief delivered to rater
   - Per-item or aggregate verdict
   - Specific findings (if PARTIAL or FLAG)
   - Rater's own honest gaps section

4. Disposition by verdict:
   - **CONFIRMED:** Audit proceeds to PASS. Rater verdict appended to audit log. Counter remains at threshold.
   - **PARTIAL:** Address rater's specific findings.
     - If findings are LOW severity (cosmetic): document corrected detail in a follow-up corrective gate (per gate-03-corrective-count-correction-2026-04-25.md pattern in `repos`); audit may still PASS with the corrective record committed.
     - If findings are MEDIUM/HIGH/CRITICAL: RESET counter and re-run the loop from Step 1 incorporating rater's findings as new audit-scope items.
   - **FLAG:** Audit does NOT pass. RESET counter to 0. Return rater findings to caller as new audit-scope items. Do not issue PASS.

5. PASS verdict requires CONFIRMED rater outcome OR PARTIAL with all findings classified as LOW severity and documented in a corrective gate. FLAG-verdict audits cannot exit PASS.

**CRITICAL — The rater spawn must be REAL, not simulated:**

If the rater step is reached and the verdict is not yet CONFIRMED (because no rater has been spawned yet), the ONLY correct action is to actually spawn the subagent. There is no shortcut.

**DO:**
- Use the Agent tool to spawn a real subagent with the self-contained brief specified above
- WAIT for the subagent's actual response
- Append the actual response verbatim (or faithful summary) into the audit log's `## Independent Rater Verification` section
- Include the subagent's `agentId` (returned by the Agent tool) in the audit log for traceability

**DO NOT:**
- Write a fake "CONFIRMED" verdict as if a rater confirmed it
- Author hypothetical rater findings as if they came from a subagent
- Self-write a "verdict" section by simulating what a rater might say
- Skip the rater step and proceed to PASS without actual rater verification
- Treat the rater step as ceremonial or formal-only
- Mark the rater section "[TO BE FILLED IN]" and then commit with PASS without filling it in
- Substitute the primary auditor's own re-read of the artifact for an independent rater's reading

**Why this matters:** if the audit log contains a rater verdict that was not produced by an actual subagent spawn, that is FABRICATION (per F1 fabrication failure mode + `feedback_false_balance.md` manufactured-completeness-is-corrupted-output rule). The audit log loses its evidentiary value AND reproduces the exact failure mode the rater step was added to close (single-persona audit blind spots).

The rater step exists BECAUSE single-persona audit is structurally insufficient. Faking the rater verdict is not just a process violation — it's the definitional opposite of what the rater step is for. A faked rater verdict is worse than no rater verdict, because it claims independence that does not exist.

If you find yourself about to write a "CONFIRMED" rater verdict without having spawned an actual subagent: STOP. Spawn the subagent. Wait for the real response. Then proceed.

**Rater spawn applicability:**
- **REQUIRED** for all /asae invocations regardless of severity policy
- **EXEMPT** for merge commits and revert commits (already exempt from Rule 2 ASAE attestation per commit-msg hook spec)

## Iteration Semantics

One loop = Steps 1 through 5. Continue iterating from Step 1 until exit condition.

### Exit Conditions

**Pass:** Counter reaches the configured ASAE Certainty Threshold AND no MEDIUM-severity findings are outstanding.

**Halt:** Iteration count exceeds `max_iterations` (default 10). Return status `HALT` to caller with a report of the final pass's findings. Parent skill decides whether to escalate, re-scope, or abandon.

### What Counts As A Pass

A pass requires ALL of:
1. The full audit (Step 1) returns zero findings at CRITICAL, HIGH, and (under strict policy) MEDIUM severity
2. Counter increments only on a full, comprehensive pass with no severity-resetting findings
3. **Independent rater verdict is CONFIRMED** (per Step 6) — required for all /asae invocations regardless of severity policy

Partial audits do not count. If an audit pass checks only some domain checklist items, it is not a pass — it is an incomplete audit. Run the full checklist every time.

Single-persona audits do not count. Independent rater verification per Step 6 is required for all /asae invocations.

## Consolidated Audit Log

On exit (PASS or HALT), concatenate all loop summaries into a single audit log file.

### Log Location

Determined by target type:
- Document targets: `deprecated/asae-logs/[target_name]_asae-log_[YYYY-MM-DD]_v[##].md` within the target's directory
- Code targets: `.asae-logs/[target_name]_asae-log_[YYYY-MM-DD]_v[##].md` at the repo root

Create the log directory if it does not exist.

### Log Contents

- Scope definition (complete)
- Every loop iteration's summary (Steps 1-3 output concatenated)
- Final counter state
- Exit status (PASS or HALT)
- Timestamp of exit
- Total iterations
- Total findings by severity
- Total edits applied
- **Independent Rater Verification section** (per Step 6): subagent type used, verbatim summary of brief delivered, verdict (CONFIRMED | PARTIAL | FLAG), specific findings if any, rater's own honest gaps section

The log is the audit artifact. It is the reproducibility evidence. It is not discarded.

## Return To Caller

Return a structured result to the parent skill:

```
{
  "status": "PASS" | "HALT",
  "asae_certainty_threshold": <integer>,
  "final_counter": <integer>,
  "total_iterations": <integer>,
  "severity_totals": {
    "critical": <integer>,
    "high": <integer>,
    "medium": <integer>,
    "low": <integer>
  },
  "independent_rater": {
    "verdict": "CONFIRMED" | "PARTIAL" | "FLAG",
    "subagent_type": "<agent type used; default general-purpose>",
    "findings_count": <integer>,
    "corrective_gate_path": "<path if PARTIAL>" | null
  },
  "log_path": "<path to audit log>",
  "exit_timestamp": "<ISO 8601>"
}
```

## Anti-Patterns

- Exiting after one clean pass when threshold is > 1
- Running partial audits and counting them as passes
- Skipping the Step 3 summary
- Allowing MEDIUM severity findings to prevent counter reset AND to block exit — MEDIUM does one or the other depending on policy, not both
- Not writing the audit log on exit
- Describing how convergence works in user-facing output (methodology is not exposed in this skill)
- Auditing from memory instead of re-reading sources
- Treating this skill as a one-shot self-review. It is iterative. The iteration is the point.
- **Skipping Step 6 (independent rater) on any /asae invocation.** Single-persona audit + structural enforcement at hook layer is necessary but not sufficient; independent rater catches blind spots structural enforcement cannot detect. Per axis 3.10.I structural-prevention-vs-vigilance: methodology should not require Krystal-vigilance.
- **Briefing the rater with shared context from the primary auditor's reasoning.** Independence requires zero context-leak. The rater must arrive at their verdict via their own reading of artifacts + the canonical /asae SKILL.md, not via the primary auditor's narrative.
- **Treating PARTIAL with LOW findings as silently acceptable.** PARTIAL with LOW findings still requires a corrective gate (per gate-03 pattern in `repos`) to document the corrected detail. The corrective gate is the audit-trail-of-record for the correction.
- **Authoring fake rater verdicts in the audit log without a real subagent spawn.** The Independent Rater Verification section must contain output from an actual Agent tool invocation, not self-authored content simulating what a rater might say. Per F1 (fabrication failure mode) + `feedback_false_balance.md` (manufactured completeness is corrupted output): faking the rater verdict produces CORRUPTED OUTPUT that loses evidentiary value AND reproduces the exact failure mode the rater step was designed to close. If the rater step is reached and the verdict is not yet CONFIRMED, the correct action is to ACTUALLY SPAWN THE SUBAGENT — not to fake the rating or verdict. There is no shortcut.

## Related Skills

- `/dare-to-rise-code-plan` — Invokes this skill at every stage boundary
- `/file-versioning` — Used in Step 5 for document outputs
- `/file-presentation` — Used when presenting the audit log file to the user

## Related Rules

- `file-naming-and-versioning` — Governs Step 5 document version bumps
- `no-silent-execution` — Every loop iteration produces the Step 3 in-thread summary
- `ip-language-discipline` — Branded terminology only in all outputs
