---
name: User Experience Document — Template
description: Reusable template for authoring a UXD as a fifth prerequisite input to /dare-to-rise-code-plan. Defines the visual design system, interaction patterns, and polish criteria that bring an implementation up to the project's standard of excellence. Filled-in instances feed into Stage 00 research and Stage NN Design Polish.
type: template
skill: dare-to-rise-code-plan
version: v01_I
date: 2026-04-25
---

# User Experience Document — Template

## How To Use This Template

Copy this file. Rename to `[ProjectPrefix]_UXD_[YYYY-MM-DD]_v01_I.md`. Fill in every required section. Mark optional sections as NA if not applicable with a one-line reason.

Required sections must be completed before `/dare-to-rise-code-plan` Stage 00 can run. Incomplete UXDs produce implementations that pass acceptance tests against unspecified visual character — internally consistent, externally bland. The UXD is the F13-equivalent reality anchor for the visual layer: without it, the implementer falls back to generic-component-library defaults regardless of what the PRD/TRD/AVD specify.

Every section has instructions (italic) and a placeholder format. Replace instructions with the filled-in content. Keep the section headers.

---

## 1. Aesthetic Anchors (Reality Anchor)

### 1.1 Reference Apps With Screenshots

*Name 2-5 existing apps that capture the visual + interaction character this product should embody. For each: app name, what specifically about it is the reference (the layout, the typography, the interaction feel, the empty states, etc.), and a screenshot or link. The reference set is the load-bearing reality anchor that prevents generic-default output.*

*Required format per reference:*
- *App name*
- *What specifically is being referenced (layout / typography / interaction feel / state design / animation / etc.)*
- *Screenshot path or URL*
- *What from this reference does NOT apply to this product (avoids over-cloning)*

### 1.2 Brand Voice Expressed Visually

*State 5-10 concrete visual decisions that express the brand voice. Not "modern look" — concrete: "rounded corners on interactive elements, sharp on data-display surfaces"; "generous whitespace, never crowded"; "no purple gradients, ever"; "monospace only for data, never for prose"; etc. Named anti-patterns belong here too.*

### 1.3 Polish Criteria — Qualitative Bar With Examples

*State the qualitative bar for "feels finished." Reference apps in 1.1 are anchors; this section is the explicit checklist a human reviewer would use to call the build complete. Use concrete tests, not adjectives.*

*Required format per criterion:*
- *Criterion (specific observable property)*
- *How a reviewer would test it (a specific 3-step check)*
- *What "finished" looks like vs. what "needs more" looks like (with reference to 1.1 anchors when possible)*

---

## 2. Visual Design System

> **Cross-reference — Stage 00 Track 7 (Design System & Frontend Tooling):** the choices in §§ 2.1 – 2.4 are operationalized in TRD §6.7 (design system source, component library tooling, design tokens, theming, icons, typography stack, design-to-code handoff, visual regression). When this UXD is filled in, Track 7 research scopes against §§ 2.1 – 2.4; when Track 7 outputs land, they update TRD §6.7 (not this UXD — the UXD remains the design source-of-truth).

### 2.1 Color Palette

*Define the full color system. Each color has a hex value AND a semantic role (primary, surface, danger, success, etc.). Roles, not colors, are referenced in implementation. Specify dark-mode counterparts if the product supports dark mode.*

*Required format per color token:*
- *Token name (semantic, e.g., `surface-primary` not `gray-100`)*
- *Hex value (light mode)*
- *Hex value (dark mode, if applicable)*
- *Where it appears (which surfaces use this token)*
- *Contrast ratio against text it appears with (WCAG 2.1 AA minimum)*

### 2.2 Typographic Scale

*Define the type system: font families, sizes, weights, line heights, letter spacing. Every text element in the product uses a token from this scale. Justify the scale (why these sizes and not others).*

*Required format per type token:*
- *Token name (semantic, e.g., `heading-xl`, `body-default`, `caption`)*
- *Font family*
- *Font size (rem or px)*
- *Font weight*
- *Line height*
- *Letter spacing (if non-default)*
- *Where it appears*

### 2.3 Spacing System

*Define the spacing scale: 4px grid? 8px grid? hybrid? Every margin, padding, and gap value in the implementation comes from this scale. Specify the scale and the rationale.*

*Required format:*
- *Base unit (e.g., 4px, 8px)*
- *Scale steps (e.g., 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64)*
- *Semantic groupings (e.g., `space-tight` = 4-8px range, `space-default` = 16-24px, `space-loose` = 32-64px)*

### 2.4 Component Tokens

*List the base components the product needs (button, input, card, modal, timeline-item, etc.) with their visual specifications referencing 2.1, 2.2, 2.3 tokens. This is the "atoms and molecules" layer that implementation maps onto directly.*

*Required format per component:*
- *Component name*
- *Visual spec (color tokens used, typography tokens used, spacing tokens used, border radius if any, shadow if any)*
- *Default size / measurements*
- *Where it appears in the product*

---

## 3. Interaction Patterns

### 3.1 State Catalog (Per Component Class)

*For every interactive component class, specify all states: default, hover, focus (keyboard), focus-visible, active, disabled, loading, empty, error, success. Also specify the transition between states (timing curve, duration). The state machine for the user-facing surface.*

*Required format per component class:*
- *Component class*
- *States (default / hover / focus / focus-visible / active / disabled / loading / empty / error / success — mark each as applicable or NA)*
- *Visual spec per state (referencing 2.1, 2.2, 2.3 tokens)*
- *Transition between states (timing function, duration)*

### 3.2 Empty / Loading / Error / Success State Catalog

*Every screen and every data surface needs explicit empty / loading / error / success states. Specify the copy, visual treatment, and any actions available in each state.*

*Required format per screen-or-surface state:*
- *Screen/surface name*
- *State (empty / loading / error / success)*
- *Visual treatment (layout, illustration if any, copy)*
- *Copy (the actual text the user sees)*
- *Actions available (buttons, links, etc. — what can the user do from this state)*

### 3.3 Animation + Transition Guidelines

*State the policy on motion. When is animation allowed, how much, what curves, what durations? Specify the `prefers-reduced-motion` honoring strategy.*

*Required format:*
- *Allowed motion categories (e.g., subtle hover transitions; entrance/exit fades; scrolling parallax — ALLOWED or FORBIDDEN per category)*
- *Default durations (e.g., 150ms for hover, 250ms for entrance)*
- *Default timing curves (e.g., `cubic-bezier(0.4, 0, 0.2, 1)` for ease-out)*
- *`prefers-reduced-motion` policy: which animations are disabled / replaced / unchanged when reduced motion is requested*

---

## 4. Information Architecture

### 4.1 Hierarchy Rules

*State the rules for visual hierarchy. What gets visual weight at each level? What appears above the fold? What's secondary? How does density scale with content volume?*

*Required format:*
- *Hierarchy levels (primary / secondary / tertiary / supporting)*
- *Visual weight signals at each level (size, color, position, density)*
- *Above-the-fold rule (what MUST be visible without scrolling on desktop / mobile)*
- *Density rule (how spacing changes as content volume grows)*

### 4.2 Grouping And Prioritization

*State how related content is grouped visually. What's the rule for when items become a list vs. a grid? When is content tabbed vs. stacked? When does a section become its own page?*

### 4.3 Navigation Pattern

*Specify the primary navigation pattern (sidebar / topbar / tab bar / command palette / etc.) and the rationale. State what's reachable from each navigation surface and what isn't.*

---

## 5. Accessibility-As-Delight

*WCAG 2.1 AA compliance is hardwired (declared in PRD Section 6.4 and gated by TQCD). This section specifies the BEYOND-compliance accessibility quality: ARIA labels that are well-written for actual screen-reader experience, keyboard nav that is intuitive (not just functional), motion preferences honored thoughtfully (not just disabled). The goal: accessibility that feels intentional, not box-ticked.*

> **Cross-reference — Stage 00 Track 8 (Accessibility Tooling):** Track 8 selects the automated tooling (axe-core, pa11y, lighthouse-a11y, storybook-addon-a11y, etc.), the screen-reader testing matrix (NVDA / JAWS / VoiceOver × browser combinations), the keyboard-nav testing harness, and the CI integration that enforces this section. Track 8 outputs land in TRD §3.5 + TQCD §6 (accessibility criteria) and the AVD §6.5 (accessibility architecture). The criteria in §§ 5.1 – 5.4 below define WHAT must be true; Track 8 selects HOW it gets verified.

### 5.1 ARIA Label Quality Criteria

*State the criteria for "well-written" ARIA labels in this product. Examples: action verbs not nouns; describe outcome not mechanism; consistent vocabulary across the product; never abbreviated; reference content state when relevant ("Open menu" → "Open menu, currently closed" if state matters).*

### 5.2 Keyboard Navigation Quality Criteria

*State the criteria for keyboard nav beyond "all interactive elements are reachable by Tab." Examples: focus order matches visual reading order; skip-to-main-content link present and styled; focus-visible always rendered (never `outline: none` without a replacement); shortcuts documented; modal dialogs trap focus; Escape always exits the smallest relevant scope.*

### 5.3 Screen Reader Experience Criteria

*State the criteria for the screen-reader experience. Examples: page landmarks present (header / nav / main / footer); decorative images marked decorative; live regions used for asynchronous status updates; reading order matches visual order; tables have headers; forms have labels; errors are announced.*

### 5.4 Motion + Sensory Preferences

*State the policy for `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`, and any other sensory preferences. Each preference: how is it detected, what changes when it's on, how is it tested.*

---

## 6. Responsive + Mobile Behavior

### 6.1 Breakpoints

*State the breakpoint set (mobile / tablet / desktop / wide-desktop or whatever set the product needs) and the rationale for each.*

### 6.2 Per-Breakpoint Layout Changes

*For each breakpoint, specify what changes: navigation pattern shift (sidebar → bottom-bar?); column count change; component size adjustments; content priority changes (what disappears below a certain width).*

### 6.3 Touch-Target Sizing

*State the minimum touch target size (44x44px per Apple HIG / 48x48dp per Material is standard) and the policy on tappable areas being larger than visual elements when needed.*

### 6.4 Mobile-Only Patterns

*If the product has mobile-specific patterns (pull-to-refresh, swipe-to-action, bottom sheets, etc.), specify them here. Mark NA if the product is desktop-only or fully responsive without mobile-specific patterns.*

---

## 7. Anti-Patterns To Avoid

*Name the most-likely-bland anti-patterns the implementer is likely to fall into for this product type. Each anti-pattern: what it looks like, why it's anti, what to do instead. This section is load-bearing because it prevents the "implementer falls back to generic React defaults" failure mode that produces internally-consistent but externally-bland output.*

*Required format per anti-pattern:*
- *Anti-pattern name*
- *What it looks like (concrete example)*
- *Why it's anti (what it lacks vs. the polish criteria in Section 1.3)*
- *What to do instead (concrete replacement, referencing Sections 1-6 tokens)*

---

## 8. Reference Design Assets

### 8.1 Asset Inventory

*List the reference design assets shipped with this UXD. Assets MUST include: screenshots of reference apps (Section 1.1), color palette swatches with hex values (Section 2.1), typographic scale specimens (Section 2.2), spacing system grid visual (Section 2.3), and at least one mockup or wireframe of the primary screen of this product.*

*Required format per asset:*
- *Asset name*
- *Asset type (screenshot / mockup / wireframe / palette / specimen / etc.)*
- *Path (relative to UXD location, typically in a sibling `references/` or `mockups/` directory)*
- *What this asset is used for (which UXD section references it)*

### 8.2 Asset Storage And Versioning

*State where the reference assets are stored, how they're versioned, and how downstream stages access them. Default convention: `[planning-directory]/uxd-assets/[YYYY-MM-DD]/` with assets named per file-naming-and-versioning rule.*

---

## 9. Stakeholder Approvals

*Who has approved this UXD? Without documented approval, Stage 00 should not begin. Visual design approval is a load-bearing decision; treat the approver as a design stakeholder, not just a project owner.*

*Required format per stakeholder:*
- *Stakeholder name and role*
- *Approval date*
- *Approval notes (any conditions or flags, especially around design-system source-of-truth)*

---

## 10. Open Questions

*What design decisions are not yet made? Document them here so Stage 00 research can address them or Stage 01 can flag them for user decision. UXD open questions often include: dark-mode timing (now or later?); animation library choice; icon library choice; design-system source-of-truth (this UXD or an external system?).*

---

## Validation Checklist (Pre-Stage-00)

Before invoking `/dare-to-rise-code-plan`, verify:

- [ ] All required sections completed
- [ ] NA sections have one-line justifications
- [ ] At least 2 reference apps named with screenshots (Section 1.1)
- [ ] Brand voice expressed as 5+ concrete visual decisions, not adjectives (Section 1.2)
- [ ] Polish criteria are observable tests, not adjectives (Section 1.3)
- [ ] Color palette has semantic role names AND hex values AND contrast ratios (Section 2.1)
- [ ] Typographic scale has rationale (Section 2.2)
- [ ] State catalog covers all 10 standard states for every interactive component class (Section 3.1)
- [ ] Empty / loading / error / success states specified for every screen-or-surface (Section 3.2)
- [ ] Accessibility-as-delight criteria are concrete (Sections 5.1 - 5.4)
- [ ] Reference design assets exist at the declared paths (Section 8.1)
- [ ] Stakeholder approval documented (Section 9)

A UXD missing any of these is not ready for D2R. The validation checklist is the F13-equivalent reality-anchor proof.

---

## Companion Documents

This UXD is one of FIVE prerequisite inputs to `/dare-to-rise-code-plan`. The other four:

- **PRD (Product Requirements Document)** — what the product does
- **TRD (Technical Requirements Document)** — what the system does technically
- **AVD (Architecture Vision Document)** — system architecture, components, data flow
- **TQCD (Testing & Quality Criteria Document)** — quality gates, testing strategy

The UXD is downstream of PRD (which establishes the user segments + journeys) and complements TRD (which establishes the tech stack the visual system runs on). The UXD is upstream of Stage NN Design Polish in D2R execution.

See template files in the same `references/` directory.
