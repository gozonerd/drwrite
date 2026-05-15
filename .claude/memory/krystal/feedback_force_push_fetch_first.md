---
name: Always fetch + inspect + cherry-pick before force-push to shared remotes
description: Before any `git push --force` or `git push --force-with-lease` to a shared/canonical remote, fetch first, inspect new commits sibling Clauda instances may have pushed, cherry-pick anything I would clobber, THEN force-push. Codified after near-loss of mm-squashed-monocanon registration commit 2026-05-12.
type: feedback
originSessionId: awesome-lamport-428434
created: 2026-05-12
---

From 2026-05-12 forward, before issuing ANY `git push --force` or `git push --force-with-lease` to a canonical, _grand_repo, or other shared remote — fetch first, inspect what's changed since my local view, recover any commits I'd clobber, then force-push.

**Why:** On 2026-05-12, while amending the canonical commit for app-update-rec to add the ASAE-Gate trailer, my `git push --force-with-lease` blew away `d5397a3` — another Clauda instance's commit registering `mm-squashed-monocanon` for canonical propagation. `--force-with-lease` only protects against clobbering if MY local remote-tracking ref is current. Between my original push (20:05) and my amend attempts (21:30+), the sibling Clauda thread had pushed to canonical. My local `origin/main` was stale. Force-with-lease accepted the push because *my* lease-token matched (my local view was stale-but-internally-consistent), not because the actual remote state was unchanged. Result: the sibling's commit was overwritten. I recovered via cherry-pick + push (no net data loss) but the incident exposed the gap.

**The gap:** `--force-with-lease` is documented as safer than `--force` but it only checks against the *local* remote-tracking ref, not the live remote. If you haven't fetched recently, the lease is just a check against your stale view.

**SOP — before any force-push to canonical, _grand_repo, or other shared remote:**

1. `git fetch origin` (or the relevant remote)
2. `git log HEAD..origin/<branch>` — see what's on the remote that I don't have locally
3. If commits are present:
   - Read each commit's metadata (`git log -1 --format=fuller <SHA>`) to identify the author and purpose
   - Determine whether my planned force-push would clobber substantive work
   - If yes: cherry-pick the remote-only commits onto my local HEAD BEFORE force-pushing — this restores them on top of my work
   - If they're truly trivial (e.g., GitHub UI revert that's safe to drop), document the decision in the commit message of the force-push
4. ONLY THEN run `git push --force-with-lease origin <branch>`

**For non-shared / personal-branch remotes** (e.g., my own ephemeral worktree branches): standard `--force-with-lease` is fine. The SOP applies specifically to remotes where sibling Clauda instances or Krystal might push concurrently.

**Do NOT call this "ceremony" or skip it because the force-push is "small" or "just an amend."** The amend that triggered this incident WAS a small/expected-trivial change. The clobber happened anyway because the sibling thread was active during my edit window.

**Hook codification candidate (queued tech-debt):** a pre-push hook on canonical + _grand_repo that, on detecting `--force` or `--force-with-lease`, requires the user to confirm: "are there any commits on origin/<branch> that aren't in your local HEAD? Run `git fetch && git log HEAD..origin/<branch>` first." If the hook detects unfetched remote commits, refuse the push until they're handled.
