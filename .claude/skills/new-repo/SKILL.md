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
| `application` | standard-2 | strict-3 |
| everything else | standard-2 | standard-2 |

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
