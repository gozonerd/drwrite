---
document_type: Quick Reference
version: v01_I
created: 2026-03-25
purpose: Git Bash command reference for Krystal's daily workflow
---

# Git Command Cheat Sheet

## Essential 10 Commands

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| `git status` | Shows what's changed, staged, untracked | First thing you run — "what's going on?" |
| `git pull` | Gets latest from GitHub | Start of every session |
| `git add <file>` | Stages a file for commit | After making changes you want to keep |
| `git commit -m "message"` | Saves a snapshot with a note | After each logical unit of work |
| `git push` | Sends your commits to GitHub | After every commit |
| `git stash` | Temporarily hides local changes | When you need to pull but have uncommitted work |
| `git stash pop` | Brings hidden changes back | After pulling with stashed changes |
| `git log --oneline -10` | Shows last 10 commits | To see recent history |
| `git diff` | Shows what changed (unstaged) | Before staging, to review your changes |
| `git checkout --theirs <file>` | Accepts someone else's version in a conflict | When Cody's version should win |

## Branching Commands

| Command | What It Does |
|---------|-------------|
| `git checkout -b my-experiment` | Create a new branch and switch to it |
| `git checkout main` | Switch back to the main branch |
| `git branch` | List all local branches (current one has a `*`) |
| `git branch -d my-experiment` | Delete a branch you're done with |
| `git merge my-experiment` | Merge a branch into whichever branch you're currently on |

## Conflict Resolution Commands

| Command | What It Does |
|---------|-------------|
| `git checkout --theirs <file>` | Accept the remote/other version |
| `git checkout --ours <file>` | Keep your local version |
| `git add <file>` | Mark a conflict as resolved |
| `git rm <file>` | Remove a file (for deleted-by-them conflicts) |
| `git stash drop` | Delete the most recent stash after resolving |

## Copy-Paste Patterns (Git Bash)

**Start of session:**
```
cd "/c/Users/NerdyKrystal/Repos/REPO_NAME" && git pull
```

**After making changes:**
```
cd "/c/Users/NerdyKrystal/Repos/REPO_NAME" && git add . && git status
```

**Commit + push:**
```
cd "/c/Users/NerdyKrystal/Repos/REPO_NAME" && git commit -m "Describe what you changed"
```
```
cd "/c/Users/NerdyKrystal/Repos/REPO_NAME" && git push
```

**When pull fails because of local changes:**
```
cd "/c/Users/NerdyKrystal/Repos/REPO_NAME" && git stash && git pull && git stash pop
```

---

*Stahl Systems Document — Git_Command_Cheat_Sheet_2026-03-25_v01_I.md*
