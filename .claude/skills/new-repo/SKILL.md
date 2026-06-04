---
name: new-repo
description: "Create a new GitHub repo following Martinez Methods conventions. Handles the full workflow: org/name decision, gh repo create, scaffold files (.repo-manifest.yaml, CLAUDE.md, README.md, .gitignore, .asae-policy), registry entry in mm-claude-canonical, and local clone. Invoke with '/new-repo' or when Krystal says 'make a new repo', 'create a repo', 'spin up a repo', 'new repo for X'."
type: skill
classification: enforcement-class (per META-1; cross-thread methodology skill)
---

# /new-repo — Create a New Martinez Methods Repository

## Purpose

Walk through every step of creating a new repo that's correctly wired into the Martinez Methods canonical propagation system. No repo should exist without a manifest, registry entry, and scaffold.

## When NOT to create a new repo

Before creating anything, check these — if any apply, stop and tell Krystal:

- **Adding a feature to an existing app** → commit to that app's repo
- **New skill, rule, reference, or role-manifest** → commit to mm-claude-canonical; propagation distributes it
- **Throwaway experiment** → use `_experiments` repo
- **Sub-component of an existing system** → directory in the parent repo, unless it has its own independent build/deploy cycle

Only create a new repo when the work has **its own build cycle, its own audience, or its own domain**.

## Step 1: Determine repo type and org

Ask Krystal (or infer from context) what the repo is for. Map to a type:

| Type | When to use | Org |
|------|------------|-----|
| `application` | Has its own build/run/deploy cycle (app, API, CLI, Electron, etc.) | nerdykrystal (personal) or Martinez-Methods (MM tool) |
| `research` | Its own hypothesis/analysis cycle | Martinez-Methods |
| `portfolio` | Curated artifacts for an external audience | nerdykrystal |
| `methodology` | Methodology tool or resource collection | Martinez-Methods |
| `journal` | Structured journaling domain | Martinez-Methods |
| `workspace` | Coordination layer across repos | nerdykrystal |
| `operational` | Infrastructure, backups, docs for external systems | nerdykrystal |
| `source-vault` | a Source-of-truth vault holding reusable inputs (e.g. super-resume) that other repos reference, never fork | nerdykrystal |

> **Job-hunt portfolio types.** `source-vault` (above), and the **job-app** and **portfolio-artifact** repos created via the sub-flows in [Step 8](#step-8-type-specific-sub-flows), belong to the **portfolio-funnel** architecture. The four terms (Infrastructure / Source-of-truth / Artifact / Application materials), the three funnel layers, and the three load-bearing rules are defined in `references/Job_Hunt_Portfolio_Glossary_2026-06-04_v01_I.md` — the SSOT for this vocabulary. This skill references that glossary; it does not restate the definitions.

## Step 2: Name the repo

| Type | Org | Pattern | Examples |
|------|-----|---------|----------|
| `application` | nerdykrystal | `<app-name>` (kebab-case, no prefix) | `drwrite`, `orchestra` |
| `application` | Martinez-Methods | `mm-<tool-name>` | `mm-cross-product-bot` |
| `research` | Martinez-Methods | `mm-<topic-slug>` | `mm-anthropic-research` |
| `portfolio` | nerdykrystal | `<purpose-slug>` | `audacious-ask` |
| `methodology` | Martinez-Methods | `mm-<methodology-name>` | `mm-emergent-play` |
| `journal` | Martinez-Methods | `mm-<domain>-journals` | `mm-internal-states-journals` |
| `workspace` | nerdykrystal | `_<name>` (underscore prefix) | `_grand_repo`, `_experiments` |
| `operational` | nerdykrystal | descriptive name | `stahl-systems-docs` |
| `source-vault` | nerdykrystal | `_<name>` (underscore prefix) | `_job-hunt-ssot` |

## Step 3: Create the repo on GitHub

```bash
gh repo create <org>/<repo-name> --private
# Use --public only if going_public is true
```

Then clone it locally and cd into it:
```bash
# Martinez-Methods repos:
gh repo clone <org>/<repo-name> "C:\Users\NerdyKrystal\martinez-methods\<repo-name>"

# nerdykrystal repos:
gh repo clone <org>/<repo-name> "C:\Users\NerdyKrystal\repos\<repo-name>"
```

## Step 4: Create scaffold files

Create ALL of these files in the new repo. Every one is required.

### 4a. `.repo-manifest.yaml`

```yaml
schema_version: "1.0.0"

repo:
  name: "<REPO_NAME>"
  type: "<TYPE>"
  purpose: "<ONE SENTENCE — ask Krystal if unclear>"
  org: "<ORG>"

lifecycle:
  state: active
  created: "<TODAY YYYY-MM-DD>"

canonical:
  tier: full    # use 'skills' for lightweight repos

asae:
  audit_threshold: "<SEE DEFAULTS>"
  going_public: false
```

**ASAE audit_threshold defaults:**

| Type | Private | Public |
|------|---------|--------|
| `canonical` | strict-5 | strict-5 |
| `source-vault` | strict-5 | strict-5 |
| `application` | standard-2 | strict-3 |
| everything else | standard-2 | standard-2 |

> **`source-vault` defaults to strict-5 — it MUST NOT inherit the standard-2 "everything else" default.** A source-vault holds the strict-5 Source-of-truth content (super-resume, master bio, claims ledger) that every per-job deliverable tailors from; a defect there propagates into every application. Set `audit_threshold: strict-5` explicitly in both the manifest and `.asae-policy`.

### 4b. `CLAUDE.md`

Just a placeholder — propagation will prepend the full canonical preamble:

```markdown
# <repo-name>

<One sentence about what this repo is.>
```

### 4c. `README.md`

```markdown
# <repo-name>

<One paragraph: what this repo is, why it exists.>

## Directory structure

<Fill in as the repo develops.>
```

### 4d. `.gitignore`

Use the appropriate template for the language/framework. At minimum:

```
node_modules/
__pycache__/
*.pyc
.env
.DS_Store
Thumbs.db
```

### 4e. `.asae-policy`

```
audit_threshold: <match the manifest>
going_public: <true|false>
```

## Step 5: Commit and push the scaffold

```bash
git add .repo-manifest.yaml CLAUDE.md README.md .gitignore .asae-policy
git commit -m "Scaffold repo: <repo-name>

Type: <type>, Tier: <tier>, ASAE: <threshold>

Co-Authored-By: <your persona trailer>"
git push origin main
```

## Step 6: Register in mm-claude-canonical

This step wires the repo into the propagation system. You MUST do this.

Open `propagation/registry.yaml` in `Martinez-Methods/mm-claude-canonical` and add an entry in the appropriate section:

```yaml
  - repo: <org>/<repo-name>
    branch: main
    tier: full
    type: <type>
```

Commit and push to main on mm-claude-canonical. This triggers the propagation workflow, which will:
- Clone the new repo
- Copy all canonical content (skills, rules, references, memory, role-manifests, hooks, commands) into `.claude/`
- Write `_propagation.json`
- Update CLAUDE.md with the canonical preamble
- Push directly to the target branch (no PR)

## Step 7: Verify

After propagation runs (usually < 2 minutes), confirm:
- `.claude/skills/` populated with canonical skills
- `.claude/_propagation.json` exists with correct SHA and timestamp
- CLAUDE.md has the canonical orientation preamble prepended

## Step 8: Type-specific sub-flows

Most repos are done after Step 7. Two job-hunt portfolio types need extra wiring on top of Steps 1–7 so the **portfolio funnel** stays coherent. Read `references/Job_Hunt_Portfolio_Glossary_2026-06-04_v01_I.md` first — it is the SSOT for the four terms (Infrastructure / Source-of-truth / Artifact / Application materials), the three funnel layers, and the three load-bearing rules. The sub-flows below operationalize that architecture; they do not restate its definitions.

The funnel at a glance (defined fully in the glossary): **Infrastructure hub** (`_job-hunt-infrastructure`) → per-job **planning hub** (e.g. `rlti-application-planning`) and/or **`app-<company>-<role>`** spokes → per-artifact **portfolio-artifact** spokes (just-in-time; e.g. `rlti-rigor-rubric`) → per-job **portfolio websites** (VPS subdomains) that PRESENT the artifacts. Nesting is logical, not physical (Rule 3): flat repos + `.repo-manifest.yaml` + `propagation/registry.yaml`, with job→artifact and shared-vs-bespoke expressed via manifest `hub:`/`parent:` + `scope: bespoke|shared` fields — **no submodules.**

### Step 8a — Job-app repo sub-flow (per-job planning hub + `app-<company>-<role>` spokes)

Use when standing up Layer-2 of the funnel: a per-job planning hub and/or per-application spokes under the Infrastructure hub. These coordinate one job (or one campaign) and point at the artifacts that application will present. (Per the glossary, the resume variant / cover letter / website these produce are **Application materials** — per-job tailored output; the hub itself is coordination.)

1. **Confirm the Infrastructure hub exists** (e.g. `_job-hunt-infrastructure`). If it does not, create it first (`type: workspace` per Steps 1–7) — it holds the spoke registry, application tracker, and tailoring playbooks the spokes hang off.
2. **Name the repo** (Step 2 conventions):
   - per-job **planning hub** → `<campaign>-application-planning` (e.g. `rlti-application-planning`).
   - per-application **spoke** → `app-<company>-<role>` (e.g. `app-anthropic-research-engineer`).
   - org: nerdykrystal.
3. **Run Steps 3–7** to create, scaffold, commit, register, and verify the repo. `type: workspace` (planning hub) or `type: application`/`workspace` as fits the spoke; ASAE threshold per the defaults table (these are NOT source-vaults — do not set strict-5 unless going public makes them an `application` strict-3).
4. **Add the manifest fields that link the spoke → its hub** (Rule 3 — logical nesting). In the spoke's `.repo-manifest.yaml`, add a top-level block:
   ```yaml
   funnel:
     layer: 2                       # per-job planning hub / app spoke
     hub: _job-hunt-infrastructure  # ALWAYS the Layer-1 Infrastructure hub (the root the funnel hangs off)
     parent: rlti-application-planning  # OPTIONAL: the intermediate Layer-2 planning hub, IF this is an app-<company>-<role> spoke nested under one (omit if the spoke hangs directly off Infrastructure)
     scope: bespoke                 # bespoke = specific to this job/campaign; shared = reused across jobs
     presents_artifacts: []         # funnel.presents_artifacts — artifact-spoke repo names this application's website will present (fill as Step 8b spokes are created)
   ```
   Convention: **`hub:` always names the Layer-1 Infrastructure hub**; **`parent:` is the optional intermediate planning hub** for an `app-<company>-<role>` spoke nested under a planning hub. This expresses the job→hub relationship in metadata, not via a submodule. **Reference the Source-of-truth (`_job-hunt-ssot`); never fork it** (Rule 1) — the planning hub points at the super-resume/master bio/claims ledger; it does not copy them.
5. **Register the spoke** in `propagation/registry.yaml` (Step 6) and record it in the Infrastructure hub's spoke registry.

### Step 8b — Portfolio-artifact repo sub-flow (standing up an Artifact spoke)

Use when an application actually needs a demonstrable work product — an **Artifact** (per the glossary: *"the work examples on a portfolio website"*), e.g. the rigor-rubric. Stand these up **just-in-time** (Rule 2: a thing earns its own repo only with its own build cycle / audience / domain), not speculatively.

1. **Confirm the artifact earns its own repo** (Rule 2 + the "When NOT to create a new repo" section): it has its own build cycle, audience, or domain. If it does not, it is a directory in an existing repo, not a new spoke.
2. **Name the repo** `<campaign>-<artifact>` (Step 2 conventions), e.g. `rlti-rigor-rubric`; org nerdykrystal.
3. **Run Steps 3–7** to create, scaffold, commit, register, and verify. `type: portfolio` (or `application` if it has a build/deploy cycle); ASAE threshold per the defaults table.
4. **Register it** in `propagation/registry.yaml` (Step 6), AND add the funnel manifest fields (Rule 3 — logical nesting) to the artifact spoke's `.repo-manifest.yaml`:
   ```yaml
   funnel:
     layer: 3                       # per-artifact spoke
     hub: rlti-application-planning  # the Layer-2 planning hub (or app-<company>-<role> spoke) this artifact serves
     scope: bespoke                 # bespoke = built for one job; shared = reused across multiple jobs' websites
   ```
   `hub:`/`parent:` names which Layer-1/Layer-2 repo the artifact hangs off; `scope: bespoke|shared` records whether it is one-job-specific or reused. No submodule — the relationship lives in the manifest. Add this artifact's repo name to the serving application spoke's `funnel.presents_artifacts:` list (Step 8a step 4) so the website knows what to present.
5. **How the per-job website consumes it** (Rule 1 — copy freely at the website layer): the per-job **portfolio website** (a VPS subdomain — Application materials) **PRESENTS** the artifact. The website is a per-job tailored leaf, so it may **copy** the presentational material it needs from the artifact spoke freely (a copy at the website layer is just a leaf, not drift). What it must NOT do is copy a **Source-of-truth** input — those stay referenced (Rule 1). So: website copies from artifact spokes (fine, leaf-layer); website and spokes both reference `_job-hunt-ssot` (never fork, source-layer).

## Checklist (confirm all before done)

- [ ] Repo created on GitHub with correct org and name
- [ ] `.repo-manifest.yaml` with correct type, purpose, tier, ASAE threshold
- [ ] `CLAUDE.md` exists (placeholder is fine — propagation fills it)
- [ ] `README.md` with purpose
- [ ] `.gitignore` appropriate for the stack
- [ ] `.asae-policy` matches the manifest
- [ ] Scaffold committed and pushed
- [ ] Entry added to `propagation/registry.yaml` in mm-claude-canonical
- [ ] Registry change committed and pushed to mm-claude-canonical main
- [ ] Cloned locally to the correct path on Krystal's machine
- [ ] (`source-vault` only) `audit_threshold: strict-5` set explicitly in BOTH manifest and `.asae-policy` (did NOT inherit standard-2)
- [ ] (job-app / portfolio-artifact only) Step 8 sub-flow run: glossary read; `funnel:` manifest fields (`hub:`/`parent:` + `scope: bespoke|shared`) added; Source-of-truth referenced, never forked (Rule 1)
