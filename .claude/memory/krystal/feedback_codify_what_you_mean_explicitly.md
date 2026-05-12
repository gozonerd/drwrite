---
name: codify what you mean explicitly — documentation written for the strongest reader fails the weakest reader
description: When authoring methodology specs, skill docs, hook error messages, or any artifact that's meant to enforce or instruct, codify the meaning EXPLICITLY at the surface. Don't rely on the reader to infer-from-context, infer-from-related-files, or infer-from-implicit-conventions. Strong readers infer; weak readers fail. Documentation/specs/errors written assuming inference fail empirically when read by weaker contexts.
type: feedback
originSessionId: de4cd3d9-137c-4d63-a1bc-dac72e2d635a
user: krystal
---

## The rule (verbatim from Krystal context, 2026-04-28)

In response to my own surfacing of the cross-cutting insight from the agitated-lalande Sonnet feedback:

> *"codify what you mean explicitly should absolutely be a memory file! create it!"*

(Context: Sonnet thread agitated-lalande went through ASAE v05 hook gates by sequential rejection — each rule revealed itself only after the previous one passed. The friction was real BECAUSE Sonnet has less context-bandwidth than Opus to infer-from-related-files. Opus would have read /asae spec + commit-msg hook source + role-manifests folder + multiple gate audit log examples in parallel and inferred all the requirements. Sonnet didn't. Documentation written assuming Opus-class inference failed Sonnet-class reading.)

## Plain statement

When writing methodology specs, skill docs, hook error messages, audit log templates, gate file conventions, or any artifact that's meant to enforce or instruct:

**Codify the meaning EXPLICITLY at the surface where it's needed.** Don't rely on the reader to:
- Infer-from-context (read 5 related files and synthesize)
- Infer-from-related-files (cross-reference the hook source to learn what the spec means)
- Infer-from-implicit-conventions (figure out the format by reading existing examples)
- Infer-from-prior-rejection (learn the rule by failing and being told)

Strong readers infer; weak readers fail. Documentation written assuming inference is brittle to:
- Lower-context-window readers (Sonnet, Haiku)
- Time-pressured readers (mid-task; can't read 5 files)
- Reduced-attention readers (late, tired, meds wearing off)
- New readers (no accumulated context about the methodology)

## Why this matters

This rule emerged from a specific empirical case (agitated-lalande's iterative hook-rejection friction) but it generalizes:

1. **The methodology evolves; readers don't keep up.** Specs written 6 months ago made sense to the author; readers today have less context and need explicit signaling.

2. **Inference-required documentation works in dev; fails in production.** When the methodology author tests their own writing, they have full context and infer trivially. New readers don't have that context.

3. **The discipline is anti-elegance in the small but pro-clarity in the large.** Writing every requirement explicitly feels redundant when you know the context. It reads as essential when you don't.

4. **Explicit codification is the structural-separation pattern applied to documentation.** Same logic that won PSCAD-as-sibling-doc + A22-as-separate-aspect + SSOT-vs-pitch separation: separate the data (what's required) from the presentation (how it reads). When data is explicit at the surface, presentation can flex; when data is implicit in presentation, both fail when presentation context shifts.

## How to apply

When authoring or reviewing methodology surfaces, check:

### Skill docs
- Does Phase N enumerate ALL artifacts produced (not just primary ones)? → If not, add explicit enumeration (e.g., role-manifest as artifact #5 in /define-your-role-literal Phase 8)
- Does each step's required output have its schema documented inline OR cross-referenced? → If not, add reference
- Are required tools (gh, yq, etc.) listed? → If not, add prerequisites section

### Hook error messages
- Does the error tell the reader what RULE was violated AND what to do about it? → If only "rule violated," add resolution path
- Does the error point at the canonical resolution skill OR doc? → If not, add pointer
- Does the error distinguish between failure-mode classes (e.g., "missing manifest" vs "malformed manifest")? → If not, add classification

### Gate audit log templates
- Are required pass-block phrases visible at the template level OR only in the hook source? → If only in hook source, document at template (or refactor to structured-frontmatter per Mod 14 Q3 + the structured-frontmatter refactor)
- Are required frontmatter fields enumerated with example values? → If not, add example block

### Reference docs
- Does the doc state explicitly what it covers vs what it doesn't? → If not, add scope statement
- Are cross-references one-way (you have to know to look here) or bidirectional (related surfaces point at this)? → If one-way, add pointers from related surfaces (per the META-9 + META-10 cross-reference network discipline)

## Cross-cutting application: this rule is itself an instance of the rule

The codify-larger-principles memory file (`feedback_codify_larger_principles.md`) addresses scope decisions at the methodology mod level (default broader). This rule (`feedback_codify_what_you_mean_explicitly.md`) addresses spec-writing at the documentation level (default explicit).

Both are instances of the broader META-principle: **codify; don't rely on inference.**

## Companion rules

- `feedback_codify_larger_principles.md` — sibling rule at the mod-design level
- `feedback_max_effort_means_research.md` — empirical research often surfaces the inference gaps that warrant explicit codification
- `feedback_task_difficulty.md` — file-management and other manual operations are themselves examples where implicit conventions burden weaker readers
- `feedback_dont_skip_skill_protocol_steps.md` — the skill steps themselves should be codified explicitly so even weaker contexts execute them correctly

## When this rule does NOT apply

- **Explicitly creative or exploratory artifacts** where ambiguity is generative (e.g., brainstorm docs, axis-by-axis option enumeration before lock)
- **Internal-class artifacts (`_I`) where Krystal is the only reader and inference is fine** — the rule is for artifacts read by other contexts/threads/agents
- **Artifacts where explicitness would compromise IP discipline** (per `feedback_ip_discipline_mechanism_vocabulary.md`) — surface-level outcome language preferred over process-internals language for external-facing surfaces

## Empirical instances supporting this rule

- agitated-lalande Sonnet thread: ASAE v05 hook iterative-rejection friction (EE-FM-CC-01 + agitated-lalande feedback 2026-04-28)
- /define-your-role-literal Phase 8 enumeration gap (4 artifacts listed; role-manifest implicit; Excellence Inevitability inferred via Glob; agitated-lalande missed)
- ASAE pass-block prose-pattern enforcement (required phrases discovered via rejection, not via spec)
- Structured-frontmatter refactor (LOCKED Batch 3): same rule applied at the spec ↔ enforcement boundary
