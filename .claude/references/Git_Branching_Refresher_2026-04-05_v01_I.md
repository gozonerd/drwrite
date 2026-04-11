---
document_type: Quick Reference
version: v01_I
created: 2026-04-05
purpose: Git branching refresher for Krystal's daily workflow, companion to Git Command Cheat Sheet
---

# Git Branching Refresher

## The Core Concept

Right now you're working directly on `main` (or `master`). Every commit goes straight to the main timeline. Branches let you work on something without touching the main timeline until you're ready.

Think of it like drafting. `main` = the published version. A branch = your working draft. When the draft is good, you merge it in.

## When to Branch

1. **Experimenting** — trying something you might throw away
2. **Parallel work** — you and Cody working on different things in the same repo
3. **Big changes** — restructuring a folder, rewriting a section, anything you'd want to undo cleanly if it goes sideways

## When NOT to Branch

1. Quick fixes, typo corrections, file additions — just commit to main
2. You're the only one working in the repo and the change is straightforward

## The 5 Commands You Need

**1. Create a branch and switch to it:**

```bash
git checkout -b my-experiment
```

You're now on `my-experiment`. Everything you commit goes here, not on `main`.

**2. Switch back to main:**

```bash
git checkout main
```

Your branch work is still saved — you're just looking at main now.

**3. Switch back to your branch:**

```bash
git checkout my-experiment
```

**4. Merge your branch into main (when you're done):**

```bash
git checkout main
git merge my-experiment
```

This pulls all your branch commits into main. If there are no conflicts, it just works.

**5. Delete the branch (cleanup):**

```bash
git branch -d my-experiment
```

## What About Conflicts?

Conflicts happen when you and someone else (or another branch) changed the **same lines** in the **same file**. Git doesn't know which version to keep.

When this happens, git marks the file with conflict markers:

```
<<<<<<< HEAD
Your version of the line
=======
The other version of the line
>>>>>>> my-experiment
```

**To resolve:** Open the file, pick which version you want (or combine them), delete the `<<<<<<<` / `=======` / `>>>>>>>` markers, then:

```bash
git add the-file.md
git commit -m "Resolve merge conflict in the-file.md"
```

## Stash: The "Hold My Beer" Command

You're in the middle of work but need to switch branches or pull:

```bash
git stash          # hides your uncommitted changes
git pull           # or git checkout other-branch
git stash pop      # brings your changes back
```

## Real Example: You and Cody Both Working in stahl-systems-docs

```bash
# You start a branch for your work
git checkout -b krystal/update-ai-ops

# Do your work, commit as normal
git add 12_AI_Operations_AIO/new-file.md
git commit -m "Add new AI ops file"

# Push your branch to GitHub
git push -u origin krystal/update-ai-ops

# When done, merge into main
git checkout main
git pull                              # get Cody's latest changes first
git merge krystal/update-ai-ops      # merge yours in
git push                              # push the merged main
git branch -d krystal/update-ai-ops  # cleanup
```

## Branch Naming Convention

Use `yourname/short-description`:

- `krystal/update-ai-ops`
- `krystal/portfolio-draft`
- `cody/fix-pipeline-config`

This makes it obvious whose branch is whose.

---

*Stahl Systems Document — Git_Branching_Refresher_2026-04-05_v01_I.md*
