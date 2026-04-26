---
name: Product Requirements Document — Template
description: Reusable template for authoring a PRD as a prerequisite input to /dare-to-rise-code-plan. Defines what the product is, who it serves, what problem it solves, and what success looks like. Filled-in instances feed into Stage 00 research.
type: template
skill: dare-to-rise-code-plan
version: v01_I
date: 2026-04-17
---

# Product Requirements Document — Template

## How To Use This Template

Copy this file. Rename to `[ProjectPrefix]_PRD_[YYYY-MM-DD]_v01_I.md`. Fill in every required section. Mark optional sections as NA if not applicable with a one-line reason.

Required sections must be completed before `/dare-to-rise-code-plan` Stage 00 can run. Incomplete PRDs produce degraded plans.

Every section has instructions (italic) and a placeholder format. Replace instructions with the filled-in content. Keep the section headers.

---

## 1. Product Identity

### 1.1 Product Name

*State the product's name. If the product is part of a family or suite, name the family too.*

### 1.2 Version

*Version this PRD applies to. Use semantic versioning (v0.1, v1.0, etc.) or a version milestone descriptor (MVP, v0.2, v1.0, etc.).*

### 1.3 One-Line Description

*State the product in a single sentence. Describe what it does in outcome terms, not implementation terms. If you can't describe the product in one sentence, the product is not ready for a PRD.*

---

## 2. Users And Problem

### 2.1 Primary Users

*Who is this product for? Describe the primary user segment specifically. Not "everyone." Not "developers." Something specific enough that you could name three real people who fit the description.*

*Required fields per user segment:*
- *Segment name*
- *Representative user description (role, context, constraints they operate under)*
- *What they currently do without this product*
- *What they struggle with currently*

### 2.2 Secondary Users

*Optional. If the product has additional user segments with different needs, describe them here. Mark NA if not applicable.*

### 2.3 Problem Statement

*What specific problem does this product solve? Describe the problem in the users' terms, not in solution terms. Include evidence that the problem is real (user research, personal experience, documented pain points, relevant statistics).*

### 2.4 Why Now

*Why is this the right time to build this product? What has changed in the environment, technology, market, or user population that makes this solvable now when it wasn't before?*

---

## 3. Goals

### 3.1 Primary Goals

*What must the product achieve to be considered successful? Each goal must be specific and measurable. Not "users love it" — "users export reports at least twice per week in the first month."*

*Required format per goal:*
- *Goal statement*
- *Measurable criterion*
- *Timeframe to achievement*

### 3.2 Secondary Goals

*Optional. Goals that would be nice to achieve but are not required for the product to be considered successful. Mark NA if not applicable.*

### 3.3 Non-Goals

*What is explicitly NOT in scope for this product, or at least not for this version? Naming non-goals prevents scope creep during Stage 01 planning and during implementation.*

---

## 4. User Journeys

### 4.1 Primary User Journeys

*Walk through the key flows a user takes through the product. Each journey describes a user's goal, the steps they take, and the outcome. Describe journeys from the user's perspective, not the system's.*

*Required format per journey:*
- *Journey name*
- *User goal entering the journey*
- *Step-by-step narrative (high-level, not technical)*
- *Outcome achieved*
- *Pain points this journey is designed to eliminate*

### 4.2 Edge Case Journeys

*Optional. Journeys that handle unusual situations (errors, edge cases, recovery flows). Mark NA if all recovery flows are trivial.*

---

## 5. Success Criteria

### 5.1 Measurable Outcomes

*How will you know the product is working? What specific measurable outcomes would indicate success vs. failure?*

*Required format per outcome:*
- *Outcome name*
- *Metric definition*
- *Target value*
- *Measurement method*
- *Measurement frequency*

### 5.2 Qualitative Success Signals

*Optional. Qualitative signals that would indicate the product is working beyond the quantitative metrics. User testimonials, adoption patterns, organic usage behaviors.*

---

## 6. Constraints

### 6.1 Business Constraints

*Budget limits, timeline requirements, resource availability, organizational constraints.*

### 6.2 Regulatory Constraints

*Applicable regulations (GDPR, HIPAA, FERPA, EU AI Act, state laws, etc.). Required for products operating in regulated domains. Mark NA if not applicable (and justify).*

### 6.3 Technical Constraints

*Platforms, stacks, or technologies that MUST be used or MUST NOT be used. Includes constraints imposed by integration partners, existing infrastructure, or organizational standards. Mark NA if no binding technical constraints exist.*

### 6.4 Accessibility Constraints

*WCAG 2.1 AA compliance is hardwired — not a constraint to negotiate. If additional accessibility standards apply (Section 508, EN 301 549, etc.), list them here.*

---

## 7. Assumptions

*What are you treating as given? Assumptions that, if wrong, would invalidate the PRD. Each assumption should be testable or have a fallback plan.*

*Required format per assumption:*
- *Assumption statement*
- *Why this is treated as given*
- *What would invalidate it*
- *Fallback if invalidated*

---

## 8. Open Questions

*What decisions are not yet made? Document them here so Stage 00 research can address them or Stage 01 can flag them for user decision.*

---

## 9. Out Of Scope (Deferred)

*What features or capabilities have been considered and explicitly deferred? Name each, and note the version or milestone at which they might become in-scope.*

---

## 10. Stakeholder Approvals

*Who has approved this PRD? Without documented approval, Stage 00 should not begin.*

*Required format per stakeholder:*
- *Stakeholder name and role*
- *Approval date*
- *Approval notes (any conditions or flags)*

---

## Validation Checklist (Pre-Stage-00)

Before invoking `/dare-to-rise-code-plan`, verify:

- [ ] All required sections completed
- [ ] NA sections have one-line justifications
- [ ] Users described specifically (not "everyone" or "developers")
- [ ] Problem statement has evidence (not only intuition)
- [ ] Goals are measurable with targets and timeframes
- [ ] Non-goals explicitly named
- [ ] User journeys written from user perspective
- [ ] Success criteria quantitative where possible
- [ ] Regulatory constraints assessed (or NA justified)
- [ ] Accessibility constraints acknowledged (WCAG 2.1 AA minimum)
- [ ] Stakeholder approval documented

A PRD missing any of these is not ready for D2R.

---

## Companion Documents

This PRD is one of three prerequisite inputs to `/dare-to-rise-code-plan`. The other two:

- **TRD (Technical Requirements Document)** — what the system must do technically
- **TQCD (Testing & Quality Criteria Document)** — what success looks like quality-wise

See template files in the same `references/` directory.
