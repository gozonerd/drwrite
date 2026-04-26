---
name: ideate-to-d2r-ready
description: "Walk a user from an app idea to all five D2R prerequisite documents (PRD, TRD, AVD, TQCD, UXD) completed and approved. Triggers on: '/ideate-to-d2r-ready', '/idea-to-d2r', 'ideate to d2r', 'app idea to D2R', 'prep D2R inputs', 'author D2R prerequisites'. Interrogates the idea for PRD-readiness AND UXD-readiness, orchestrates the five authorship skills in sequence, runs a cross-doc consistency audit (including the three-way TRD↔UXD↔TQCD standards alignment check), and presents the five approved documents ready for /dare-to-rise-code-plan consumption."
---

# Ideate To D2R Ready

## Purpose

Orchestrate an app idea from raw ideation to five approved D2R prerequisite documents. This is the recommended entry point when a user starts from an idea and wants to produce the full PRD + TRD + AVD + TQCD + UXD bundle that `/dare-to-rise-code-plan` requires.

The skill runs five phases:

1. Ideation interrogation (pre-authorship, surfaces under-baked ideas before authorship starts; covers both PRD-readiness AND UXD-readiness)
2. Sequential authorship of the five documents via the five `/write-*` skills
3. Cross-doc consistency audit via a convergence gate at threshold 3, strict (includes the three-way TRD↔UXD↔TQCD standards alignment check)
4. Bundle approval gate
5. Optional portable prompt generation for handoff to another thread or LLM

Individual authorship skills (`/write-prd`, `/write-trd`, `/write-avd`, `/write-tqcd`, `/write-uxd`) remain invokable standalone. This orchestrator is the recommended path when starting from an idea or when any of the five documents is missing.

## When to Use

- User has an app idea and wants to produce all D2R prerequisite documents end-to-end
- User invokes `/ideate-to-d2r-ready` or an equivalent trigger
- User is preparing inputs for an experimental D2R run across multiple planner LLMs — the same document bundle fed to each planner
- User has asked for help "getting ready for D2R" without having authored any of the five documents
- User has authored a subset and wants the missing documents plus a cross-doc audit — enter at the first missing document

## When NOT To Use

- User already has all five D2R documents authored, approved, and cross-doc consistent — invoke `/dare-to-rise-code-plan` directly
- User wants to draft in the PRD template themselves without interrogation — invoke `/write-prd` standalone
- User wants only the cross-doc audit with five already-authored documents — invoke `/asae` with the Phase 3 scope block from this skill inline

## Inputs

- **App idea** — required; free text describing the product
- **Project name** — required (surfaced during Phase 1 if absent)
- **Project prefix** for filenames — required (e.g., `CC`, `DW`, `LE`) — surfaced during Phase 1 if absent
- **Planning directory** — optional; defaults to `[project-root]/docs/planning/`
- **Existing drafts** — optional; any of PRD / TRD / AVD / TQCD / UXD already drafted will be consumed as starting points and refined rather than re-authored from scratch
- **Existing reference design assets** — optional; if user has Figma exports, screenshots, or palette specimens already prepared, paths captured for UXD authorship in Phase 2 Step 2.5

## Execution Protocol

### Phase 1: Ideation Interrogation

Before touching any authorship template, interrogate the idea for PRD-readiness AND UXD-readiness AND applicability-gate readiness. Each of the twelve questions below gets an explicit answer captured. Do not proceed to Phase 2 until all twelve pass.

Questions 1-5 cover PRD-readiness (the original interrogation set). Questions 6-8 cover UXD-readiness (added 2026-04-25 per the F13-class lesson: visual design needs reality-anchor inputs at ideation time, not after PRD/TRD/AVD/TQCD are already locked). Questions 9-12 cover applicability-gate readiness for D2R Stage 00's four applicability-gated tracks — Cost (17), Internationalization (18), AI/ML (19), Compliance (20) — added 2026-04-26 with the 16+4 track Stage 00 expansion. Applicability-gate questions establish the EXPLICIT decision (APPLICABLE or NA-with-justification) at ideation time; silent skips at Stage 00 are not permitted.

**Interrogation questions:**

1. **Who specifically is this for?**
   - Force segment specificity. Reject "everyone", "developers", "users", "people who need X".
   - Require: role, context, the constraints they operate under, and enough specificity that three real people could be named fitting the description.
   - Fail condition: the user answers with a generic demographic label.
   - Example pass: "Instructional designers working at NGOs in low-resource contexts who operate under $0 tooling budgets and need offline-capable authoring."
   - Example fail: "Developers who want better AI tools."

2. **What problem are you solving?**
   - Force evidence. Reject problems stated only as intuition or "it would be cool if".
   - Require at least one of: "I've observed X repeatedly in my work", documented pain point, user research finding, cited statistic, or a failure mode seen in production.
   - Fail condition: the user cannot describe the problem in the users' terms or cannot name evidence.
   - Example pass: "I've run 40+ Claude Code sessions for planning work and hit the same token-budget surprise on 31 of them — no tool surfaces a pre-run estimate or a post-run variance."
   - Example fail: "It would be great if there were a way to see costs."

3. **Why now?**
   - Force environment-change specificity. Reject "AI has made this possible" (too vague).
   - Require: a specific recent change in technology, market, user population, regulation, or organizational state that makes this solvable now when it wasn't before.
   - Fail condition: the user cannot name a specific change.
   - Example pass: "Claude 4.7's tokenizer change introduced ~35% per-call overhead vs. 4.6. No public library accounts for this yet; existing cost estimators are wrong by a measurable margin."
   - Example fail: "AI is moving fast."

4. **What's the one-line description?**
   - Force outcome terms, not implementation terms. Reject "uses LLMs to...", "built with Tauri to...", "is an AI agent that...".
   - Require: one sentence describing what the user achieves, not how it's built.
   - Fail condition: the sentence leads with technology or is longer than one sentence.
   - Example pass: "Users see an accurate pre-run cost estimate for a Claude Code session and a post-run variance report against that estimate."
   - Example fail: "A Tauri app that uses the Anthropic SDK and Zod schemas to estimate Claude costs."

5. **Any hard constraints from day one?**
   - Walk the user through each category explicitly so "none" is an informed answer: budget, timeline, regulatory, platform, accessibility, organizational, data-sensitivity, team-size.
   - Accept "none" per category only after explicit consideration.
   - Record any hard constraints for propagation into PRD Section 6 and TRD Section 6.

6. **What does excellence look like for this product visually? (Reference apps with screenshots)**
   - Force concrete reference apps with actual screenshots, not adjectives. Reject "modern", "clean", "professional", "polished" without specific named anchors.
   - Require: at least 2 named existing apps that capture the visual + interaction character this product should embody. For each: app name + what specifically about it is the reference (the layout, the typography, the interaction feel, the empty states, etc.) + screenshot path or URL.
   - Fail condition: the user cannot name reference apps OR cannot provide screenshots OR provides reference apps without specifying what about them is the anchor.
   - Example pass: "Linear (for the keyboard-first command palette + the way it renders empty states with concrete next-step suggestions); Vercel dashboard (for the typography system and the deliberate use of monospace only for data, never prose). Screenshots at `inputs/uxd-refs/linear-empty.png` and `inputs/uxd-refs/vercel-typography.png`."
   - Example fail: "Something modern and clean, like a typical SaaS app."
   - This is the F13-equivalent reality anchor for the visual layer. Without screenshots, the reference set is words-only and re-introduces the fictional-validation tautology. Hold the gate.

7. **What's the brand voice expressed visually? (5+ concrete decisions, not adjectives)**
   - Force concrete visual decisions, not aesthetic adjectives. Reject "modern", "minimal", "warm", "professional" without explicit downstream-implementable choices.
   - Require: 5-10 concrete visual decisions that express the brand voice. Named anti-patterns count and are encouraged ("no purple gradients ever"; "monospace only for data, never for prose").
   - Fail condition: the user answers with adjectives only OR fewer than 5 concrete decisions.
   - Example pass: "Rounded corners on interactive elements, sharp on data-display surfaces. Generous whitespace, never crowded. No purple gradients, ever. Monospace only for code/timestamps/IDs, never for prose. Color used sparingly for state (success/warning/danger) — most of the UI is grayscale + one accent. No drop shadows on cards; use 1px borders + background contrast instead."
   - Example fail: "Modern, clean, professional, and warm but serious."

8. **What's the most-likely-bland anti-pattern your implementer is going to fall into?**
   - Force articulation of the failure mode the visual layer is most likely to default to. This is the F13-prevention question explicitly: it makes the "implementer falls back to generic-component-library defaults" failure mode visible at ideation time, where it can be designed against, not at Stage NN+1 Design Polish where it's already shipped.
   - Require: at least 1 concrete anti-pattern named with what-it-looks-like + why-it's-anti + what-to-do-instead.
   - Fail condition: the user cannot name a specific anti-pattern, OR names a generic concern ("looks bad") without specificity.
   - Example pass: "Most likely fallback: generic React-component-library cards with default rounded corners + drop shadows + the 'professional SaaS' color palette of indigo-on-white. What it lacks: any of the brand-voice decisions in Question 7. Replacement: borders not shadows; grayscale base with single accent; rounded only on interactive, sharp on data surfaces."
   - Example fail: "I'm worried it'll look generic."

9. **Cost — non-trivial infrastructure spend expected? (Track 17 applicability gate)**
   - Force an explicit decision: APPLICABLE or NA-with-justification. Silent skip not permitted.
   - APPLICABLE answer requires: expected monthly infrastructure spend ceiling at MVP (USD), cost-driving components anticipated (compute / storage / egress / third-party APIs / AI inference / etc.), and unit-economics target if commercial.
   - NA answer requires a specific justification from the valid-justifications list: personal/local-only app with no hosted infra; static-site product with negligible serving cost; product where infra spend is bundled into a parent product's existing budget and out-of-scope here.
   - Fail condition: vague answer ("probably not much"), no spend ceiling for APPLICABLE, or NA without naming a justification.
   - Example pass (APPLICABLE): "APPLICABLE. Expected MVP spend ceiling: $400/month. Cost drivers: AI inference (~70%), compute (~20%), egress (~10%). Unit-economics target: <$0.05 per active user per month."
   - Example pass (NA): "NA. This is a personal CLI tool that runs locally with no hosted infrastructure; cost is bounded by the user's local machine."
   - This decision feeds into PRD §6.5 + TRD §3.10 + TQCD §7.5.

10. **Locale — non-English / multi-locale users? (Track 18 applicability gate)**
    - Force an explicit decision: APPLICABLE or NA-with-justification. Silent skip not permitted.
    - APPLICABLE answer requires: initial supported locales (BCP-47), locales planned for next 12 months, RTL support requirement, and locale-aware formatting requirement.
    - NA answer requires a specific justification: product is intentionally and durably single-locale through planned lifespan; product audience is internal-English-only with no realistic localization path; product is a developer tool with English-only API/CLI surface.
    - Fail condition: vague answer ("we'll add languages later"), no locale list for APPLICABLE, or NA without naming a justification.
    - Example pass (APPLICABLE): "APPLICABLE. Initial: en-US, es-ES. Next 12 months: ja-JP, de-DE. RTL: not yet but architecture must support. Locale-aware date/number/currency formatting required from day one."
    - Example pass (NA): "NA. Developer-facing CLI for an English-only Anthropic-internal audience. No localization path planned within the product's expected 18-month lifespan."
    - This decision feeds into PRD §6.6 + TRD §3.11 + TQCD §7.6.

11. **AI-native — AI in user-facing critical path? (Track 19 applicability gate)**
    - Force an explicit decision: APPLICABLE or NA-with-justification. Silent skip not permitted.
    - APPLICABLE answer requires: AI use cases in user-facing critical path (specific features), model(s) targeted (provider + model name + version pinning posture), eval-suite intent (gold-set source, accuracy targets, OWASP LLM Top 10 coverage targets), latency budget per AI call, and cost observability requirement (cross-references Q9 if cost is also APPLICABLE).
    - NA answer requires: AI is not in the user-facing critical path. AI used internally for development tooling (e.g., Claudette / D2R itself) does not require Track 19 acceptance for the product being built — only for the development tooling's own product.
    - Fail condition: vague answer ("it might use AI"), no model/eval plan for APPLICABLE, or NA when AI is clearly in the critical path.
    - Example pass (APPLICABLE): "APPLICABLE. Feature: real-time content suggestions. Model: Claude Sonnet 4.6 (pinned). Eval suite: 200-prompt gold set covering safety, accuracy, refusal-correctness; OWASP LLM Top 10 jailbreak resistance for items 1-3-6. Latency budget: p95 <2s. Cost observability: yes (cross-references Q9 cost APPLICABLE)."
    - Example pass (NA): "NA. The product has no AI in user-facing flows. Internal AI use (Claudette for the dev workflow) is out-of-scope for this product's Track 19."
    - This decision feeds into TQCD §10.3 (AI/ML acceptance criteria).

12. **Regulatory scope? (Track 20 applicability gate)**
    - Force an explicit decision: APPLICABLE or NA-with-justification. Silent skip not permitted.
    - APPLICABLE answer requires: applicable framework(s) (HIPAA / PCI-DSS / SOC 2 / FedRAMP / GDPR Article 30 / FERPA / COPPA / EU AI Act / state-law-equivalents like CCPA/CPRA), specific data classes triggering scope, evidence-collection posture (manual / programmatic / hybrid), audit-readiness target date if known, and incident-response runbook commitment.
    - NA answer requires: no regulated data classes processed AND no compliance framework imposed by customer/contract/jurisdiction. NA is harder to justify than other applicability gates because privacy regulations (GDPR / CCPA) often apply by default once any user data is processed.
    - Fail condition: vague answer ("we'll worry about compliance later"), no framework named for APPLICABLE, or NA without affirmatively ruling out the common-default frameworks (GDPR for any product reachable by EU users, CCPA for any product reachable by California users).
    - Example pass (APPLICABLE): "APPLICABLE. Frameworks: GDPR Article 30 (we have EU users), SOC 2 Type II (customer-required by Q4). Data classes triggering: user account data, content user creates, usage telemetry. Evidence collection: programmatic via vendor (Vanta) with manual review. Audit-readiness target: 2026-Q3."
    - Example pass (NA): "NA. Personal local-only product with no user-data persistence beyond the local machine. No EU/California user reach because the product is not distributed publicly."
    - This decision feeds into TQCD §10.4 (Compliance audit-readiness criteria) + cross-references PRD §6.2 (Regulatory Constraints) + TRD §3.4 (Privacy Requirements).

**On fail for any question:**

Surface the insufficiency explicitly. Do not soften. Use this format:

```
Phase 1 — Question [N] ([label]): insufficient.
Reason: [specific diagnosis — what the answer lacks].
Next-step questions:
- [specific follow-up 1]
- [specific follow-up 2]
- [specific follow-up 3]

This skill will not proceed to PRD authorship until Question [N] is answered adequately.
```

Where the user is stuck, offer 2–3 candidate drafts for the user to react to, drawn from the idea context. Drafts first, not open-ended questions.

**On pass:**

Produce a Phase 1 summary block containing:
- The twelve answers (Questions 1-5 PRD-readiness; Questions 6-8 UXD-readiness; Questions 9-12 applicability-gate readiness)
- Project name
- Project prefix
- Planning directory
- Captured hard constraints (per Question 5)
- Reference design assets paths (per Question 6) — screenshots stored at the user-specified or default `[planning-directory]/uxd-assets/[YYYY-MM-DD]/`
- Captured visual brand-voice decisions (per Question 7)
- Captured anti-pattern targets (per Question 8)
- Track applicability decisions table (Questions 9-12):

  | Track | Question | Decision | Justification or Detail |
  |-------|----------|----------|------------------------|
  | 17 (Cost) | Q9 | APPLICABLE / NA | [spend ceiling + drivers OR NA justification] |
  | 18 (i18n) | Q10 | APPLICABLE / NA | [locale plan OR NA justification] |
  | 19 (AI/ML) | Q11 | APPLICABLE / NA | [AI feature + model + eval plan OR NA justification] |
  | 20 (Compliance) | Q12 | APPLICABLE / NA | [frameworks + data classes OR NA justification] |

Save the Phase 1 summary to `[planning-directory]/[prefix]_Phase1_Ideation_Summary_[YYYY-MM-DD]_v01_I.md` per `/file-versioning` conventions. This file becomes the ideation context input for `/write-prd` in Phase 2 Step 2.1 AND for `/write-uxd` in Phase 2 Step 2.5.

Report completion in-thread with a one-line confirmation and the summary path. Present the summary for visual confirmation before proceeding.

### Phase 2: Sequential Authorship

Invoke the five authorship skills in order. Each skill runs its own convergence gate at threshold 2 (`/write-uxd` runs at `/asae domain=design` threshold 2; the others at `domain=document` threshold 2). Do not proceed to the next skill until the current document is user-approved.

Report phase-by-phase progress per the no-silent-execution rule: at minimum a short in-thread confirmation at the start of each step and the individual gate summary at the end.

**Step 2.1: PRD**

Invoke `/write-prd` with:
- Project name + project prefix from Phase 1 summary
- Phase 1 summary path (as ideation context)
- Planning directory
- Invocation context: `called from /ideate-to-d2r-ready Phase 2 Step 2.1`

Report: `/write-prd` starting against Phase 1 summary at [path].

Wait for `/write-prd` to complete its own convergence gate and Krystal's approval. Capture the resulting PRD file path.

**Step 2.2: TRD**

Invoke `/write-trd` with:
- Project name + project prefix
- PRD reference (path from Step 2.1)
- Planning directory
- Invocation context: `called from /ideate-to-d2r-ready Phase 2 Step 2.2`

Report: `/write-trd` starting against approved PRD at [path].

Wait for TRD to complete and be approved. Capture path.

**Step 2.3: AVD**

Invoke `/write-avd` with:
- Project name + project prefix
- PRD reference + TRD reference
- Planning directory
- Invocation context: `called from /ideate-to-d2r-ready Phase 2 Step 2.3`

Report: `/write-avd` starting against approved PRD + TRD.

The AVD skill assesses whether the project is trivially simple. If it produces a Skipped-Status AVD, accept that as the AVD artifact for downstream Phase 3 checks. Skipped-Status AVD is a valid artifact and does not block Phase 3.

Wait for AVD to complete and be approved. Capture path.

**Step 2.4: TQCD**

Invoke `/write-tqcd` with:
- Project name + project prefix
- PRD reference + TRD reference + AVD reference (path, whether full AVD or Skipped-Status)
- Planning directory
- Invocation context: `called from /ideate-to-d2r-ready Phase 2 Step 2.4`

Report: `/write-tqcd` starting against approved PRD + TRD (+ AVD).

Wait for TQCD to complete and be approved. Capture path.

**Step 2.5: UXD**

Invoke `/write-uxd` with:
- Project name + project prefix
- PRD reference (UXD draws user segments + journeys from PRD Sections 2 + 4)
- TRD reference (UXD's design system runs on the tech stack TRD specifies)
- Phase 1 summary path (Questions 6-8 captured the reference apps + brand voice + anti-pattern targets that seed UXD authorship)
- Reference design asset paths captured in Phase 1 (Question 6 screenshots, etc.)
- Planning directory
- Invocation context: `called from /ideate-to-d2r-ready Phase 2 Step 2.5`

Report: `/write-uxd` starting against approved PRD + TRD with reference design assets at [paths].

Wait for UXD to complete and be approved. Capture path AND reference assets directory path.

The UXD authorship gate runs at `/asae` `domain=design` threshold 2 standard (per `/write-uxd` Step 3). The cross-doc audit in Phase 3 runs at threshold 3 strict and includes the three-way TRD↔UXD↔TQCD standards alignment check.

**End of Phase 2:** all five documents authored, individually gated at threshold 2, individually approved. Paths captured for Phase 3 (six paths total: PRD, TRD, AVD-or-Skipped-Status, TQCD, UXD, plus the reference assets directory).

### Phase 3: Cross-Doc Consistency Audit

Individual gates catch per-document issues. This phase catches issues that only emerge when the five documents are read together.

**Cross-doc checklist:**

- **User consistency (PRD ↔ TRD ↔ TQCD ↔ UXD):** PRD Section 2 users appear consistently in TRD Section 2.2 user-facing behavior requirements, TQCD Section 6 accessibility criteria target populations, AND UXD Section 1.1 reference apps + Section 4 information architecture (the reference apps + IA decisions must serve the PRD user segments, not arbitrary user types). No TRD user-facing behavior references a user segment absent from the PRD. No TQCD accessibility target population inconsistent with PRD primary/secondary users. No UXD reference apps or anti-pattern targets that don't trace to a PRD user segment's needs.

- **Technical constraint propagation (TRD ↔ AVD ↔ UXD):** TRD Section 6.1 Mandatory and Section 6.2 Prohibited technology choices are reflected in the AVD Section 2.2 Architectural Style and Section 3.1 Component Inventory AND in UXD Section 2 Visual Design System (the UXD's design tokens + component definitions must be implementable in the TRD's tech stack — no "use Tailwind utilities" if TRD prohibits Tailwind; no 200ms transitions if TRD specifies a UI framework that doesn't support that easily). If AVD is Skipped-Status, the justification must either acknowledge the TRD constraints or explicitly state that they impose no architectural shape.

- **Three-way standards alignment (TRD ↔ UXD ↔ TQCD):** This is the load-bearing check for the 6-layer accessibility hardwiring documented in `/dare-to-rise-code-plan` skill. For each standard declared applicable in TRD (Security, Privacy, Accessibility, etc.):
  - **TRD** must declare the standard applicable AND name the tech-stack support for it (e.g., for accessibility: jsx-a11y eslint plugin, ARIA library, accessibility-aware framework choice)
  - **UXD** must specify the design-layer behavior for that standard (e.g., for accessibility: Section 5 Accessibility-As-Delight criteria — ARIA label quality, keyboard nav quality, screen reader experience, motion preferences)
  - **TQCD** must operationalize the test gates for that standard (e.g., for accessibility: Section 3.5 Per-Standard Exit Criteria — axe-core thresholds, Lighthouse Accessibility score, keyboard nav coverage)
  
  All three sides required for a hardwired standard. Missing in TRD → declaration is aspirational, no stack support. Missing in UXD → design-layer behavior unspecified, implementer falls back to generic defaults at Stage NN+1. Missing in TQCD → no test gate, no enforcement. Any 1-of-3 or 2-of-3 alignment is a finding; 3-of-3 alignment passes.

- **N-way alignment for production-engineering tracks:** Beyond the three-way TRD↔UXD↔TQCD check above, the Stage 00 16+4 expansion (2026-04-26) introduces additional alignment chains. Each chain enforces that a track's outputs land coherently across every document that should reference them. Missing any leg of a chain is a finding (severity HIGH on production-engineering tracks; severity MEDIUM on applicability-gated tracks where NA-with-justification is permitted but inconsistency between sides is still a finding).

  - **Security chain (TRD ↔ AVD ↔ TQCD):** TRD §3.3 declared standards + threat model (Track 9) + auth model (Track 15) → AVD §3.1 auth components + §6.4 security architecture + threat-model trust boundaries → TQCD §8 security gates (pre-commit / CI / pre-deploy) + §8.4 auth & identity gates. Missing in any leg → finding.
  - **Observability chain (TRD ↔ AVD ↔ TQCD ↔ runbook):** TRD §3.8 logging/metrics/tracing/alerting requirements (Track 10) → AVD §3.1 observability components + §6.1 logging-and-observability cross-cutting concern → TQCD §10.1 observability acceptance criteria → runbook(s) referenced from TQCD must exist with alert→runbook→action chain documented for every alert.
  - **Reliability chain (TRD ↔ AVD ↔ TQCD):** TRD §3.2 RTO/RPO + resilience patterns + queue/async patterns (Track 14) → AVD §3.1 queue components + §5.7 backup & DR plan with last-drill-date → TQCD §7.4 reliability/stress gates with chaos/fault-injection pass conditions + §2.2 stress test categories declared YES with target scenarios.
  - **Data lifecycle chain (TRD ↔ AVD ↔ TQCD ↔ PRD §6.2 regulatory):** TRD §3.4 privacy + retention + SAR workflow (Track 13) → AVD §4.3 persistence points + §6.4 security architecture for data → TQCD §3.3 data lifecycle & privacy exit criteria + §10.4 compliance audit-readiness if Track 20 APPLICABLE → PRD §6.2 regulatory constraints align with TRD §3.4 declared regulations.
  - **Auth chain (TRD ↔ AVD ↔ TQCD):** TRD §3.3 auth provider + protocol + session model (Track 15) → AVD §3.1 identity provider + session store + token validator components + §5.6 deployment topology auth between targets → TQCD §8.4 auth & identity gates with end-to-end staging tests against real provider.
  - **Release engineering chain (TRD ↔ TQCD ↔ runbook):** TRD §3.9 versioning + branching + CI/CD + flags + rollback (Track 16) → TQCD §10.2 release engineering acceptance criteria with canary/rollback verification → runbook(s) for rollback procedure with last-tested-date.
  - **Performance & scale chain (TRD ↔ AVD ↔ TQCD):** TRD §3.1 p50/p95/p99 + budget allocation + cache strategy + scale model (Track 11) → AVD §4 data flows latency expectations + §3.1 cache layer components → TQCD §7.1 user-facing performance budgets + §7.3 performance enforcement.
  - **Deployment architecture chain (TRD ↔ AVD ↔ TQCD §10.2):** TRD §6.6 hosting + envs + IaC tooling + DR plan (Track 12) → AVD §5 deployment architecture (now load-bearing in v02) → TQCD §10.2 release engineering acceptance criteria reference deployment topology.
  - **Cost chain (PRD §6.5 ↔ TRD §3.10 ↔ TQCD §7.5, applicability-gated):** Phase 1 Q9 decision → PRD §6.5 → TRD §3.10 → TQCD §7.5. If APPLICABLE, all four legs required. If NA, the justification must match across all four legs (no "APPLICABLE in PRD but NA in TQCD" inconsistencies).
  - **i18n chain (PRD §6.6 ↔ TRD §3.11 ↔ TQCD §7.6, applicability-gated):** Phase 1 Q10 → PRD §6.6 → TRD §3.11 → TQCD §7.6. Same APPLICABLE-or-NA-consistency rule as cost.
  - **AI/ML chain (Phase 1 Q11 ↔ TRD §2 + §3.3 ↔ AVD §3.1 ↔ TQCD §10.3, applicability-gated):** If Q11 APPLICABLE: TRD §2 must include the AI feature in functional requirements; TRD §3.3 must include OWASP LLM Top 10 in security standards; AVD §3.1 must include AI components (model serving, prompt store, eval harness); TQCD §10.3 must declare AI/ML acceptance criteria. If NA, all four legs declare NA with matching justification.
  - **Compliance chain (Phase 1 Q12 ↔ PRD §6.2 ↔ TRD §3.4 ↔ TQCD §10.4, applicability-gated):** If Q12 APPLICABLE: PRD §6.2 names the regulatory frameworks; TRD §3.4 lists matching regulations; TQCD §10.4 declares compliance audit-readiness criteria. If NA, all four legs consistent.

- **ASAE threshold alignment (TQCD ↔ D2R stage structure):** TQCD Section 9.2 declared thresholds match the current D2R stage structure:
  - Stage 00 = 2
  - Stage 01a = 2
  - Stage 01b = 3
  - Stage 02 = 3
  - Stage 03+ = 3
  - Stage QA = 5
  Any deviation from these defaults must have a written rationale in the TQCD; deviations without rationale are findings.

- **NFR operationalization (TRD ↔ TQCD):** Every TRD Section 3 non-functional requirement maps to at least one TQCD exit criterion in Sections 3–8. Any TRD NFR with no TQCD exit criterion is a finding. Any TQCD exit criterion with no corresponding TRD NFR is a finding.

- **Mini-ADR grounding (AVD ↔ TRD/PRD):** Every AVD Section 7 Mini-ADR rationale references at least one TRD constraint or PRD goal. Mini-ADRs with rationale unattached to any upstream requirement are findings. (Skipped-Status AVD is NA for this check.)

- **Coverage alignment (TQCD ↔ TRD/PRD):** TQCD Section 5.2 requires every TRD FR / BR has at least one test and every PRD user journey has at least one E2E test. Verify the TRD FR/BR count matches the TQCD requirement coverage statement and the PRD user journey count matches the TQCD user journey coverage statement.

- **UXD component-token alignment (UXD ↔ AVD):** UXD Section 2.4 component tokens map to AVD Section 3.1 component inventory. Every UXD-named component (button, input, card, modal, timeline-item, etc.) appears in the AVD component inventory; every AVD UI component has a UXD component token specifying its visual character. NA if AVD is Skipped-Status — but the UXD's component tokens must still be declared so Stage NN+1 Design Polish has a target. NA-with-rationale acceptable only if the project has zero UI components (rare).

- **UXD reality-anchor verification (UXD-internal):** UXD Section 8.1 Reference Design Assets must exist at the paths declared in the document. Audit verifies file existence — paths that resolve to missing files are findings. This is the F13-prevention check: a UXD without reference assets is words-only and re-introduces the fictional-validation tautology at the design layer.

- **UXD anti-pattern coverage (UXD ↔ Phase 1 Question 8):** UXD Section 7 anti-patterns must include the anti-pattern targets captured in Phase 1 Question 8. The UXD is the place where the implementer-falls-back-to-generic-defaults concern gets structurally addressed; if Question 8's named anti-patterns don't appear in UXD Section 7, the UXD is missing the most-likely-failure-mode prevention.

**Gate invocation:**

Invoke `/asae` with:
- `target`: the set of five document paths from Phase 2 + the reference design assets directory from Step 2.5
- `sources`: the five templates + the Phase 1 summary + any standards referenced in TRD/TQCD/UXD
- `prompt`: "Audit cross-doc consistency across PRD, TRD, AVD, TQCD, UXD per the Phase 3 checklist in /ideate-to-d2r-ready (including the three-way TRD↔UXD↔TQCD standards alignment check + the UXD reality-anchor verification + the N-way alignment chains for security / observability / reliability / data lifecycle / auth / release engineering / performance / deployment / cost / i18n / AI-ML / compliance — every chain leg verified)"
- `domain`: `document`
- `asae_certainty_threshold`: 3
- `severity_policy`: `strict`

Under `strict`, CRITICAL, HIGH, and MEDIUM findings all reset the counter and must remediate before loop exit. LOW findings are logged.

**Remediation routing:**

When the audit finds an inconsistency, route remediation to the appropriate authorship skill:

| Inconsistency locus | Route to |
|---|---|
| User segment mismatch | `/write-prd` (if PRD is root cause) or `/write-trd` / `/write-tqcd` / `/write-uxd` (if downstream misstatement) |
| Tech constraint propagation | `/write-avd` (re-author constraint-aware sections) or `/write-uxd` (if UXD design tokens incompatible with TRD stack) |
| Standards mismatch (any 1-of-3 or 2-of-3 in the TRD↔UXD↔TQCD three-way alignment) | Whichever side is missing. Standards declared in TRD with no UXD design-layer behavior → `/write-uxd` Section 5. Standards declared in TRD with no TQCD test gate → `/write-tqcd` Section 3. UXD design-layer behavior or TQCD test gate without TRD declaration → `/write-trd` (decide whether to declare or remove). Confirm with user. |
| ASAE threshold deviation | `/write-tqcd` (Section 9.2) |
| NFR–exit-criterion mismatch | `/write-tqcd` (add exit criterion) or `/write-trd` (remove orphan NFR) |
| Mini-ADR ungrounded | `/write-avd` (Section 7) |
| Coverage alignment gap | `/write-tqcd` (Section 5.2) |
| UXD component-token mismatch with AVD inventory | `/write-uxd` (add missing tokens) or `/write-avd` (add missing components); confirm with user which is source of truth |
| UXD reference asset missing at declared path | `/write-uxd` Section 8.1 (capture the missing asset OR remove the reference); the UXD reality-anchor cannot be aspirational |
| UXD anti-pattern coverage gap (Phase 1 Question 8 anti-patterns missing from UXD Section 7) | `/write-uxd` Section 7 (add the named anti-patterns from Phase 1) |
| Security chain leg missing (TRD↔AVD↔TQCD) | Whichever side missing: `/write-trd` §3.3 / `/write-avd` §3.1 + §6.4 / `/write-tqcd` §8 |
| Observability chain leg missing | `/write-trd` §3.8 / `/write-avd` §3.1 + §6.1 / `/write-tqcd` §10.1 / runbook author |
| Reliability chain leg missing | `/write-trd` §3.2 / `/write-avd` §3.1 + §5.7 / `/write-tqcd` §7.4 + §2.2 |
| Data-lifecycle chain leg missing | `/write-trd` §3.4 / `/write-avd` §4.3 + §6.4 / `/write-tqcd` §3.3 + §10.4 / `/write-prd` §6.2 |
| Auth chain leg missing | `/write-trd` §3.3 / `/write-avd` §3.1 + §5.6 / `/write-tqcd` §8.4 |
| Release-engineering chain leg missing | `/write-trd` §3.9 / `/write-tqcd` §10.2 / runbook author |
| Performance & scale chain leg missing | `/write-trd` §3.1 / `/write-avd` §4 + §3.1 / `/write-tqcd` §7.1 + §7.3 |
| Deployment-architecture chain leg missing | `/write-trd` §6.6 / `/write-avd` §5 (load-bearing) / `/write-tqcd` §10.2 |
| Cost applicability-gate inconsistency (Phase 1 Q9 ↔ PRD §6.5 ↔ TRD §3.10 ↔ TQCD §7.5) | Whichever leg disagrees; user confirms canonical decision |
| i18n applicability-gate inconsistency (Phase 1 Q10 ↔ PRD §6.6 ↔ TRD §3.11 ↔ TQCD §7.6) | Whichever leg disagrees; user confirms canonical decision |
| AI/ML applicability-gate inconsistency (Phase 1 Q11 ↔ TRD §2 + §3.3 ↔ AVD §3.1 ↔ TQCD §10.3) | Whichever leg disagrees; user confirms canonical decision |
| Compliance applicability-gate inconsistency (Phase 1 Q12 ↔ PRD §6.2 ↔ TRD §3.4 ↔ TQCD §10.4) | Whichever leg disagrees; user confirms canonical decision |

Between iterations, apply edits via the routed skill. Re-invoking `/write-*` in remediation mode is lightweight (target a specific section; do not re-run the full authorship protocol unless a section requires full re-authoring).

Report at the start of each iteration (one line) and present the full convergence gate summary table at gate completion per the no-silent-execution rule.

**Exit condition:**

Phase 3 exits successfully only when the convergence gate reaches its threshold under the strict severity policy. Any CRITICAL or HIGH finding blocks exit until remediated. On max-iteration halt, escalate to the user with the findings ledger; do not auto-advance.

### Phase 4: Approval Gate + Bundle Commit

Present the four completed docs to the user with:
- File paths
- Approval status per document
- Phase 3 convergence gate summary table (iterations, findings, edits applied, final status)

Format (use the output-formatting rule's response-options convention):

```
All five D2R prerequisite documents are authored and cross-doc consistent.

| Doc  | Path                                       | Status   |
|------|--------------------------------------------|----------|
| PRD  | [path]                                     | Approved |
| TRD  | [path]                                     | Approved |
| AVD  | [path] or Skipped-Status                   | Approved |
| TQCD | [path]                                     | Approved |
| UXD  | [path] (assets at [reference assets dir])  | Approved |

Phase 3 convergence gate summary:
[full summary table from /asae]

`✓` to mark the bundle ready for /dare-to-rise-code-plan AND commit + push to the repo

`✓ no-commit` to mark the bundle ready but skip the git commit + push step

`?` to discuss any document

`X: [feedback]` to request changes
```

Wait for explicit approval.

**On `✓` (approval + commit):**

1. **Mark approvals** — Update each document's Stakeholder Approvals section with current date and the role that approved.

2. **Identify the target repo.** Determine which git repo contains the planning directory:
   - If the planning dir is inside a git submodule, target that submodule's repo.
   - If the planning dir is inside a non-submodule directory of a parent grand repo, target the parent repo.
   - If the planning dir is not in a git repo, skip git operations, warn the user, and proceed to the bundle-ready report.

3. **Pre-commit state check.** Run `git status` on the target repo. Capture pre-existing modified / untracked files (these belong to other sessions per the `git-commit-scope` rule and MUST NOT be staged). Report the count of pre-existing files; proceed only with files generated by this orchestrator run.

4. **Stage specifically the 6 orchestrator-generated files + the reference assets directory** per the `git-commit-scope` rule. NEVER use `git add -A` or `git add .`. The 6 files to stage are the Phase 1 ideation summary + PRD + TRD + AVD (full or Skipped-Status) + TQCD + UXD, all by full path. Plus stage the reference design assets directory contents (each asset by full path). If any of the 6 files or the assets directory is outside the target repo (unusual), warn and skip staging that file with an explicit note.

5. **Commit** with a descriptive message per the `github-discipline` rule. Template (use a here-doc to preserve formatting):

    ```
    Add [Project Name] D2R prerequisite bundle via /ideate-to-d2r-ready

    Produced by /ideate-to-d2r-ready end-to-end on [YYYY-MM-DD]:
    - Phase 1 ideation summary (all 8 interrogation questions passed —
      5 PRD-readiness + 3 UXD-readiness)
    - PRD: [one-line description from PRD Section 1.3]
    - TRD: [one-line description]
    - AVD: [one-line description OR "Skipped-Status (rationale: <reason>)"]
    - TQCD: [one-line description]
    - UXD: [one-line description] + reference assets at [assets dir]
    - Phase 3 cross-doc audit: convergence gate PASS at threshold 3 strict,
      [N] iterations, [M] edits applied. Three-way TRD↔UXD↔TQCD standards
      alignment verified. UXD reality-anchor verified (reference assets
      exist at declared paths).

    Stakeholder approval: [stakeholder name + role], [YYYY-MM-DD].

    Co-Authored-By: Clauda the [persona] (Opus 4.7, 1M context) <noreply@anthropic.com>
    ASAE-Gate: strict-3-PASS
    ```

    If a pre-commit hook fails, report the failure verbatim and do NOT bypass (never pass `--no-verify`). User resolves the hook failure and re-approves.

6. **Push** per the `feedback_no_prs_default` rule:
   - On private repos where the user is the sole committer: push to `main` / `master` (whichever the repo uses as default) on the current branch. Direct commit to main is the default; no PR.
   - If the current branch is NOT main/master (e.g., a worktree branch), commit there, then report the branch state to the user and ask whether to fast-forward main or continue on the feature branch. Do not force-push master silently.
   - If push fails (auth, non-fast-forward, branch protection): report the failure verbatim and stop. Do not retry blindly. User resolves.

7. **Report** the commit SHA, branch, remote, and push status per the `no-silent-execution` rule. Confirm the bundle is ready for `/dare-to-rise-code-plan` and report the ordered set of paths the user will pass to D2R.

8. End the orchestrator.

**On `✓ no-commit` (approval without commit):**

- Mark approvals as in step 1 above.
- Skip steps 2–7 (no git operations).
- Confirm the bundle is ready for `/dare-to-rise-code-plan` and report the ordered set of paths.
- End the orchestrator.

**On discussion or change request:**

- Route the change to the appropriate authorship skill per the Phase 3 remediation-routing table.
- After the change is applied, re-run Phase 3 (cross-doc audit) — a change in one document may invalidate consistency elsewhere.
- Re-present Phase 4 with the updated bundle.

**Git operation failure modes and handling:**

| Failure | Response |
|---|---|
| Planning directory not in a git repo | Skip git ops; warn user; proceed to bundle-ready report |
| Pre-commit hook blocks | Report hook failure verbatim; do NOT bypass; user resolves + re-approves |
| Commit fails for other reasons | Report error; halt; user investigates |
| Push fails on auth | Report auth failure; halt; user resolves |
| Push fails on non-fast-forward | Report; halt; surface rebase / merge options; never force-push without explicit user instruction |
| Push fails on branch protection | Report protection rule; halt; user decides PR vs. direct commit by policy |
| Files outside target repo | Warn + skip staging those files; still commit the in-repo subset if non-empty |

### Phase 5 (Optional): Portable Prompt Generation

Triggered at any phase when the user says "give me a portable prompt", "export as a prompt", "I want to run this in another LLM", or equivalent.

The generated portable prompt must contain:

- **Current phase state** — which phase, which step within the phase, what the next action is
- **All completed documents' content inline** — receiving LLM does not need file access
- **Phase 1 summary content inline** — if Phase 1 is complete
- **The phase's continuation instructions** — copied from this skill's execution protocol
- **Convergence gate instructions** — for any outstanding gate (threshold + severity policy + scope)
- **In-flight pending actions** — e.g., "Step 2.3 AVD draft pending user approval"
- **Filename conventions** — for any documents the receiving LLM will author

The portable prompt is self-contained. A receiving Claude thread or capable LLM can resume the journey from the point the portable prompt was generated.

Save the portable prompt to `[planning-directory]/[prefix]_Portable_Prompt_[YYYY-MM-DD]_v01_I.md` per `/file-versioning` conventions.

## Orchestrator vs Standalone Behavior

The five authorship skills (`/write-prd`, `/write-trd`, `/write-avd`, `/write-tqcd`, `/write-uxd`) behave the same way whether invoked by this orchestrator or invoked standalone. This orchestrator passes context (Phase 1 summary, upstream document paths, invocation context marker) but does not change the authorship skills' internal execution protocols.

When invoked by this orchestrator, each authorship skill returns control to the orchestrator on user approval of its document. When invoked standalone, each skill returns control to the user.

Authorship skills detect orchestrated mode via the invocation context marker in the inputs. In orchestrated mode, they skip redundant next-step guidance (the orchestrator handles the next step) and return a structured handoff block with the approved document path.

## Anti-Patterns

- Skipping Phase 1 interrogation and jumping straight to `/write-prd` when the idea is under-baked. This produces a PRD against intuition and cascades into degraded downstream documents.
- Running Phase 3 cross-doc audit before all four individual gates pass. Individual gates catch per-doc issues; cross-doc audit is for relationships only.
- Running Phase 3 with `severity_policy: standard`. Cross-doc inconsistency is load-bearing for D2R planning; `strict` is appropriate.
- Presenting for approval before Phase 3 completes. The approval gate is the bundle gate, not individual gates.
- Treating Skipped-Status AVD as missing. A trivially simple project with an explicit Skipped-Status AVD artifact satisfies the D2R prerequisite.
- Generating a portable prompt without inlining all completed documents. The receiving LLM must be able to continue without file access.
- Soft-exiting on a failed interrogation question. Under-baked answers produce under-baked PRDs. Surface the insufficiency explicitly and hold the gate.
- Auto-advancing to Phase 4 on max-iteration halt in Phase 3. Escalate to the user with the findings ledger; the orchestrator does not self-approve.
- Using `git add -A` or `git add .` during the Phase 4 bundle commit. Per the `git-commit-scope` rule, stage specifically the 6 orchestrator-generated files plus the reference design assets directory contents by full path. Other sessions' work must never be swept into the bundle commit.
- Bypassing a pre-commit hook with `--no-verify`. If a hook blocks the bundle commit, report the failure and let the user resolve it; never bypass.
- Force-pushing master (or any shared branch) silently when the Phase 4 push fails on non-fast-forward. Report the state and let the user decide.
- Auto-creating a PR when a direct commit would do. Per `feedback_no_prs_default`, direct-to-main on private repos is the default; a PR requires an explicit load-bearing reason (branch protection, collaborator review, etc.).

## Related Skills

- `/write-prd` — Phase 2 Step 2.1 (authors the PRD)
- `/write-trd` — Phase 2 Step 2.2 (authors the TRD; requires approved PRD)
- `/write-avd` — Phase 2 Step 2.3 (authors the AVD or Skipped-Status artifact; requires approved PRD + TRD)
- `/write-tqcd` — Phase 2 Step 2.4 (authors the TQCD; requires approved PRD + TRD)
- `/write-uxd` — Phase 2 Step 2.5 (authors the UXD; requires approved PRD + TRD; references AVD if not Skipped-Status)
- `/asae` — used at every authorship skill's internal gate (threshold 2; standard for documents, design for UXD) and at Phase 3 cross-doc audit (threshold 3, strict)
- `/dare-to-rise-code-plan` — downstream consumer of the five approved documents
- `/file-versioning` — governs filename conventions across all artifacts produced in this skill
- `/file-presentation` — governs how documents are presented for approval (one-at-a-time with confirmation gates)

## Related References

- PRD template: `.claude/skills/dare-to-rise-code-plan/references/PRD_Template_2026-04-17_v01_I.md`
- TRD template: `.claude/skills/dare-to-rise-code-plan/references/TRD_Template_2026-04-17_v01_I.md`
- AVD template: `.claude/skills/dare-to-rise-code-plan/references/AVD_Template_2026-04-17_v01_I.md`
- TQCD template: `.claude/skills/dare-to-rise-code-plan/references/TQCD_Template_2026-04-17_v01_I.md`
- UXD template: `.claude/skills/dare-to-rise-code-plan/references/UXD_Template_2026-04-25_v01_I.md`
- Software Testing Taxonomy: `.claude/skills/dare-to-rise-code-plan/references/Software_Testing_Taxonomy_2026-04-17_v01_I.md`

## Related Rules (Phase 4 Bundle Commit)

- `git-commit-scope` — only commit files generated by this orchestrator run; never `git add -A` or `git add .`
- `github-discipline` — descriptive commit messages; push after every commit; never bypass hooks
- `feedback_no_prs_default` — direct commit to main on private repos; PRs only when load-bearing
- `feedback_ip_discipline_filesystem` — commit messages + branch names + log entries follow the same IP discipline as prose (branded terminology, no methodology exposure)
- `no-silent-execution` — report commit SHA + branch + push status after the Phase 4 git operations
