---
name: No PRs By Default — Commit Direct To Main
description: Krystal prefers direct commits to main on private repos; PRs only when absolutely necessary
type: feedback
originSessionId: 46056a33-f1c9-42ab-8260-97ba2f9b45f8
---
Default to committing direct to main on Krystal's private repos. PRs only when there is a specific load-bearing reason (e.g., a review gate needed for something structurally risky, or an explicit collaborator review workflow).

**Why:** Stated explicitly on 2026-04-22: "i don't want prs unless absolutely necessary." Krystal is the only committer on this work stream. PRs add ceremony without review benefit when there is no second reviewer. The ceremony cost is measurable — PR creation, waiting on self-merge, branch cleanup — and compounds across many small commits.

**How to apply:**

1. Default: feature work → commit direct to `main` on private repos (`_experiments`, `_grand_repo`, any submodule Krystal owns solo).
2. Skip PR creation. Skip feature-branch creation unless the work genuinely benefits from isolation (e.g., long-running refactor on legacy repos like `repos/`).
3. Exception: if a workflow REQUIRES a PR (e.g., branch protection rules on `master` of `nerdykrystal/repos`, which may exist for historical reasons), use a PR but keep the cycle short — no review latency.
4. Never ask Krystal "PR or direct commit?" — default to direct, mention the choice only if there's a genuine reason PR would be better.

**Related:** git-commit-scope rule (only commit files Claudette created in this session); github-discipline rule (commit cadence per logical unit, push after each commit).
