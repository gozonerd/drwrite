---
description: Git and GitHub workflow rules for all repos in this workspace
globs: "**/*"
---

# GitHub Discipline

## Session Start
- Always `git pull` before working in any repo
- Check `git status` to understand current state

## Commit Cadence
- Commit after each logical unit of work — not at end of session
- Never accumulate uncommitted changes across multiple tasks

## Commit Messages
- Descriptive, present tense
- Reference what changed and why (not just "updated files")
- Example: "Add asae skill with iterative loop and audit log generation"

## Push Cadence
- Push after every commit — don't accumulate local commits
- If push fails (auth, conflict), flag immediately

## Root Hygiene
- No loose files in any repo root except: CLAUDE.md, README.md, .gitignore, package.json, pyproject.toml, config files
- If loose files found at session start, propose sorted destinations

## Security
- Never commit secrets, API keys, credentials, or tokens
- Use `.gitignore` for temp files, lock files, OS artifacts (.DS_Store, Thumbs.db, .~lock.*)

## Status Checks
- Always run `git status` before committing to avoid accidental inclusions
- Review staged files before every commit

## File Lifecycle
- Deprecated files: move to `deprecated/` subfolder, never delete from git history
- Superseded versions stay in `deprecated/` for audit trail
