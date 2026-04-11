# Git Commit Scope

## Rule

Only commit files that YOU (Claude) generated or modified in the current session. Never stage or commit files that were created or modified by other threads, other Claude instances, Krystal, Cody, or any external process — unless Krystal or Cody explicitly tells you to commit them.

## Why

When running `git add -A` or `git add .`, unrelated work from other sessions gets swept into the commit. This creates misleading commit messages, buries other people's work under the wrong attribution, and makes git history unreliable.

## How to Apply

1. Before staging, run `git status` to see ALL changed files
2. Only `git add` files you personally created or edited in this session
3. If `git status` shows files you didn't touch, leave them alone
4. If you need to commit a cleanup (like deleting temp files), commit ONLY the deletions — not unrelated modified files that happen to be in the working tree
5. Never use `git add -A` or `git add .` — always add specific files by name
