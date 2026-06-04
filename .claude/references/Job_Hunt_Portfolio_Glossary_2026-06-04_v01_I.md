---
title: Job-Hunt Portfolio Glossary — Vocabulary, Architecture, and Load-Bearing Rules
id: Job_Hunt_Portfolio_Glossary_2026-06-04
created: 2026-06-04
version: v01_I
classification: INTERNAL ONLY
audience: martinez_methods_internal
classification_reason: Operational methodology reference — the canonical SSOT for the four job-hunt portfolio terms, the three-layer "portfolio funnel" architecture, and the three load-bearing rules that govern how job-hunt repos relate. Consumed by /new-repo (its source-vault, job-app, and portfolio-artifact sub-flows link here) and by any thread standing up a job-hunt infrastructure hub, source-vault, application-planning hub, app-spoke, portfolio-artifact spoke, or per-job portfolio website.
authored_by: Clauda W. Reliability Compositor v01 (Claude Opus 4.8, 1M context, mm-claude-canonical main)
provenance: |
  Encodes the vocabulary + architecture + rules Krystal locked 2026-06-04 for the job-hunt
  portfolio system. Authored as the SSOT the /new-repo enforcement-class skill references
  (rather than inlining the definitions in the skill), so the four terms have exactly one
  authoritative definition and the skill's type-specific sub-flows point here.
  The four-term vocabulary distinguishes the coordination hub (Infrastructure) from the
  reusable inputs (Source-of-truth) from the demonstrable work products (Artifact) from the
  per-job tailored output (Application materials). The Artifact definition is quoted verbatim
  from Krystal.
related_artifacts:
  - mm-claude-canonical/.claude/skills/new-repo/SKILL.md (the enforcement-class repo-creation skill whose source-vault / job-app / portfolio-artifact sub-flows link here)
  - mm-claude-canonical/references/GitHub_Org_Structure_2026-05-15_v01_I.md (org-placement + naming partition the repos created under this architecture land in)
  - mm-claude-canonical/propagation/registry.yaml (where every repo created under this architecture registers for propagation)
---

# Job-Hunt Portfolio Glossary (v01)

This reference is the **Single Source of Truth** for the job-hunt portfolio vocabulary. When the `/new-repo` skill, a planning hub, or a portfolio website needs to name what a repo *is*, it uses these four terms with these exact definitions. The definitions are not interchangeable: confusing **Source-of-truth** with **Artifact**, or **Infrastructure** with **Application materials**, is what produces the drift this system exists to prevent.

## 1. The four terms (locked definitions)

### Infrastructure

**The coordination hub that runs the job hunt.** It holds the spoke registry, the application tracker, the tailoring playbooks, the tooling, and pointers to sources — but it is not itself the inputs you tailor from, nor the work products you show, nor the per-job output. It is the hub that coordinates all of those.

- Repo shape: a single coordination repo, e.g. `_job-hunt-infrastructure`.
- What lives here: spoke registry, application tracker, tailoring playbooks, tooling, pointers (not copies) to the Source-of-truth and to artifact spokes.
- What does NOT live here: the raw inputs themselves (those are Source-of-truth), the demonstrable work products (those are Artifacts), the tailored per-job deliverables (those are Application materials).

### Source-of-truth

**Reusable raw INPUTS you tailor FROM.** These are the canonical inputs — the super-resume, the master bio, the claims ledger — that every per-job deliverable is derived from. They are referenced, never forked: a copy of a source is drift (see Rule 1).

- Repo shape: a dedicated source-vault repo, e.g. `_job-hunt-ssot`.
- What lives here: super-resume, master bio, claims ledger, and any other reusable raw input that multiple per-job deliverables tailor from.
- Defining property: it is an **input** you tailor *from*, not an output you tailor *into*, and not a work product you *show*.

### Artifact

Quoting Krystal verbatim: *"the work examples on a portfolio website."*

**A demonstrable work product with its own build cycle / audience / domain** (e.g. the rigor-rubric). It is a thing you can *show* — a work example — distinct from the raw inputs you tailor from (Source-of-truth) and from the per-job tailored output (Application materials). An artifact earns its own repo precisely because it has its own build cycle, its own audience, or its own domain (see Rule 2).

- Repo shape: its own portfolio-artifact spoke repo, just-in-time, e.g. `rlti-rigor-rubric`.
- What lives here: the artifact and its own build cycle (the rigor-rubric and how it is produced/maintained).
- Defining property: it is a **demonstrable work product** — a work example — with an independent build cycle / audience / domain of its own.

### Application materials

**The per-job TAILORED OUTPUT.** These are the deliverables produced for one specific job by tailoring *from* the Source-of-truth: the resume variant, the cover letter, and the portfolio website itself. They are per-job and they are output (not reusable input, not the coordination hub, not the standalone work product).

- Shape: per-job tailored deliverables — a resume variant, a cover letter, the portfolio website that presents the artifacts.
- Defining property: **per-job** and **tailored output**, derived by tailoring from Source-of-truth inputs for one specific application.

### One-line disambiguation table

| Term | One-line essence | Input or output? | Repo example |
|---|---|---|---|
| Infrastructure | the coordination hub that runs the job hunt | neither (coordinator) | `_job-hunt-infrastructure` |
| Source-of-truth | reusable raw inputs you tailor FROM | input (reusable) | `_job-hunt-ssot` |
| Artifact | a demonstrable work product (Krystal's verbatim definition: "the work examples on a portfolio website.") | work product (shown) | `rlti-rigor-rubric` |
| Application materials | the per-job TAILORED OUTPUT | output (per-job) | resume variant / cover letter / the portfolio website |

## 2. The architecture: the "portfolio funnel" (3 layers)

The system is a **portfolio funnel** with **three layers**, narrowing from one coordination hub down to the per-job websites that present the work. Krystal's locked chain is: **Infrastructure hub → per-job planning hub and/or `app-<company>-<role>` spokes → per-artifact spoke repos (just-in-time) → per-job portfolio websites (VPS subdomains) that PRESENT artifacts.** The three layers are the three repo tiers below; the per-job websites are the funnel's terminal **presentation tier** — the narrow end the chain feeds into. Nesting between tiers is **logical, not physical** (see Rule 3).

**Layer 1 — Infrastructure hub.** The coordination hub (e.g. `_job-hunt-infrastructure`) that runs the whole hunt: spoke registry, application tracker, tailoring playbooks, tooling, pointers to sources.

**Layer 2 — Per-job planning hub and/or `app-<company>-<role>` spokes.** Under the infrastructure hub sit the per-job coordination repos: a per-job planning hub (e.g. `rlti-application-planning`) and/or per-application spokes named `app-<company>-<role>`. These coordinate one job (or one campaign) and point at the artifacts that application will present.

**Layer 3 — Per-artifact spoke repos (just-in-time).** Each demonstrable work product (Artifact) gets its own spoke repo, created **just-in-time** when that artifact is actually needed for an application — e.g. `rlti-rigor-rubric`. Each carries its own build cycle / audience / domain.

**Presentation tier (the funnel's narrow end) — per-job portfolio websites (VPS subdomains) that PRESENT artifacts.** Krystal's chain terminates here: each job gets a portfolio website (a VPS subdomain) that **presents** the Layer-3 artifacts to that job's audience. The website itself is **Application materials** (per-job tailored output), so it is a per-job leaf rather than a fourth shared repo tier — which is why the architecture is "three layers" of repos plus this presentation tier they feed.

```
Layer 1       _job-hunt-infrastructure            (Infrastructure hub: registry, tracker, playbooks, tooling, source pointers)
                  |
Layer 2       rlti-application-planning  and/or   app-<company>-<role>   (per-job planning hub / per-app spokes)
                  |
Layer 3       rlti-rigor-rubric  ...              (per-artifact spokes, just-in-time; own build cycle/audience/domain)
                  |
presentation  per-job portfolio website           (VPS subdomain; PRESENTS the artifacts; per-job Application materials)
```

Source-of-truth (e.g. `_job-hunt-ssot`) is the reservoir the funnel draws from — not one of the three repo layers. The Layer-2 planning hubs, the Layer-3 artifact spokes, and the presentation-tier websites all **reference** the Source-of-truth inputs and tailor from them; they never fork them (Rule 1).

## 3. The three load-bearing rules

These three rules are what keep the funnel from degrading into a pile of drifting copies.

### Rule 1 — Reference-never-fork at the source layer; copy freely at the website layer.

At the **source layer**, the Source-of-truth inputs (super-resume, master bio, claims ledger) are **referenced, never forked**. A second copy of a source input is **drift**: the moment two repos each hold their own copy of the super-resume, they diverge, and "which one is true?" becomes unanswerable.

At the **website layer**, copying is **fine** — a per-job portfolio website may freely copy the presentational material it needs (including from a Layer-3 artifact spoke), because the website is a per-job tailored *output* (a leaf), not a shared source. A copy that lives at the source layer is drift; a copy that lives at the website layer is just a leaf.

So the cut is **source layer vs. website layer**, not "sources vs. everything else": the Source-of-truth inputs are referenced-never-forked at the source layer; the Layer-3 artifacts are *presented* by the websites and may be copied at the website layer (Step 8b spells this out). What you never copy is a Source-of-truth input.

> Litmus: if the thing being copied is something *other repos tailor from* (a Source-of-truth input), do not copy it — reference it. If the thing being copied is *this one job's presentation*, copy freely.

### Rule 2 — Granularity: a thing earns its own repo only with its own build cycle / audience / domain.

A new repo is justified **only** when the thing has **its own build cycle, its own audience, or its own domain.** This is the same granularity rule the `/new-repo` skill enforces in general ("Only create a new repo when the work has its own build cycle, its own audience, or its own domain"), applied to the portfolio funnel:

- An **Artifact** (e.g. the rigor-rubric) earns its own Layer-3 spoke because it has an independent build cycle / audience / domain.
- A per-job **planning hub** or `app-<company>-<role>` spoke earns its own Layer-2 repo because it coordinates a distinct job/campaign.
- Something WITHOUT its own build cycle / audience / domain does **not** earn a repo — it is a directory, a manifest entry, or a section inside an existing repo. Artifact spokes are stood up **just-in-time** (when an application actually needs them), not speculatively.

### Rule 3 — Nesting is logical, not physical.

The job→artifact relationships and the shared-vs-bespoke distinctions are expressed **logically through metadata, not physically through nested directories or git submodules.** Concretely:

- Repos are **flat** (no submodules tying the funnel together physically).
- Each repo carries a `.repo-manifest.yaml` and registers in `propagation/registry.yaml`.
- The job→artifact relationship and the shared-vs-bespoke status are expressed via **manifest fields**:
  - a **`hub:`** (or **`parent:`**) pointer naming the Layer-1/Layer-2 repo this spoke belongs to, and
  - a **`scope:`** field with value **`bespoke`** (specific to one job/application) or **`shared`** (reused across multiple jobs/applications).

So a Layer-3 artifact spoke says, in its manifest, *which* hub it hangs off (`hub:`/`parent:`) and *whether* it is bespoke to one job or shared across many (`scope: bespoke|shared`) — and that is the entire "nesting." No submodule, no physical directory tree. The funnel is a graph drawn in manifest metadata over a flat set of repos.

## 4. Cross-references

- `mm-claude-canonical/.claude/skills/new-repo/SKILL.md` — the enforcement-class repo-creation skill. Its **source-vault** repo type, its **job-app repo** sub-flow, and its **portfolio-artifact repo** sub-flow all reference this glossary for the definitions, the architecture, and the rules.
- `mm-claude-canonical/references/GitHub_Org_Structure_2026-05-15_v01_I.md` — org/naming partition (nerdykrystal vs Martinez-Methods) the funnel repos are created under.
- `mm-claude-canonical/propagation/registry.yaml` — every funnel repo registers here for canonical propagation (Rule 3's registry leg).

## Provenance

Authored 2026-06-04 by Clauda W. Reliability Compositor v01 (Claude Opus 4.8, 1M context, mm-claude-canonical main) at Krystal's direction, encoding the vocabulary + portfolio-funnel architecture + three load-bearing rules she locked the same day, as the SSOT the `/new-repo` skill links to. Gated strict-5 at gate-93 with two independent cross-architectural raters (Kimi `kimi-k2.6` + DeepSeek `DeepSeek-V3.2`, both via Abacus RouteLLM; the parent persona performed the disk-access verification, as no disk-access subagent rater was available in the authoring harness — see the gate's honest-disclosure section). Internal only; do not publish externally without a completed Pre-Publication IP Scrub.
