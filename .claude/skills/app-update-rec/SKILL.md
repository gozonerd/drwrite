---
name: app-update-rec
description: "Use this skill whenever an app update is asking to relaunch — particularly Claude Desktop or Claude Code, where prior versions have produced data-loss incidents. The skill runs (a) live research aggregating GitHub issues, Anthropic official channels, and community signal to produce a 🟢/🟡/🔴 verdict for the specific version about to install, AND (b) a tiered backup of Krystal's irreplaceable Claude state to a private GitHub repo. Triggers on '/app-update-rec', 'app-update-rec', 'an update is asking to relaunch', or when the user mentions a Claude Desktop or Claude Code update prompt."
version: v01_I
authored_by: Clauda App-Update-Rec Architect v01 (Claude Opus 4.7, Claude Code, _grand_repo worktree awesome-lamport-428434)
authored_with: Krystal Jazmin Martinez (carrier, configuration architect)
classification: infrastructure
prerequisite: Orientation per mm-claude-canonical/CLAUDE.md complete before authoring or modifying this skill
---

# app-update-rec

## Purpose

Two coupled functions, one invocation:

1. **Live research recommendation.** Before Krystal clicks "Relaunch" on an app update, this skill aggregates signal from three sources in parallel (GitHub issues, Anthropic official channels, community/Reddit/HN) and produces a 🟢 / 🟡 / 🔴 / ⚪ verdict for the specific version. Two prior Anthropic-app data-loss incidents — Claude Code v2.1.58 (Feb 2026, full user-profile deletion) and Claude Desktop auto-update (March 2026, session-index wipe) — confirm the risk is real.

2. **Tiered backup to nerdykrystal/backups.** Whatever the verdict, the skill snapshots Krystal's irreplaceable non-git-tracked Claude state (auto-memory, plugins, config, dirty worktrees) to a private GitHub repo so a future failure mode comparable to v2.1.58 can be reversed. Backup is local-first, then mirrored to the GitHub repo via commit + release asset.

The verdict informs the install decision; the backup ensures the install is reversible regardless.

## Locked Design Decisions

These were settled with Krystal (2026-05-12) and must be preserved unless she explicitly overrides:

| # | Decision | Lock |
|---|----------|------|
| 1 | Name `app-update-rec` (generic, future-proof) | locked |
| 2 | Off-machine backup destination = `https://github.com/nerdykrystal/backups` (private) | locked |
| 3 | Pre-flight refuses to proceed if any Claude app process is running | locked; no override flag |
| 4 | Typed acknowledgment required for 🔴 verdict before backup-and-install path proceeds | locked |
| 5 | Lives at canonical (cross-machine for Krystal + Cody) | locked |
| 6 | Claude-only v1 (Claude Desktop + Claude Code; not Cursor/JetBrains/VS Code Claude ext) | locked; extensible later |
| 7 | Retention: never auto-prune; manual prune has floor of last-10 | locked |

## When to Invoke

- User says "/app-update-rec" or "app-update-rec"
- User mentions a Claude Desktop or Claude Code update prompt ("an update is asking me to relaunch", "Claude wants me to update")
- Right after the user describes seeing the relaunch dialog

Optionally takes a version-string argument: `/app-update-rec 1.7196.0`. If omitted, the skill attempts auto-detection via `Get-AppxPackage Claude*` (Windows MSIX) or `Get-ItemProperty` on installed-apps registry (traditional installer).

## Overall Flow

```
[invoke] -> Pre-flight -> Research (parallel agents) -> Verdict
                                                          |
                                              +-----------+-----------+
                                              |                       |
                                          🟢 / 🟡                    🔴
                                              |                       |
                                              v                       v
                                           Backup           Typed-ack required
                                              |              if matched -> Backup
                                              |              if not matched -> abort
                                              |                       |
                                              +-----------+-----------+
                                                          |
                                                          v
                                                  Push to GitHub
                                                          |
                                                          v
                                                 Report + next-steps
```

## Pre-flight

Before any other phase. Failures abort with exit non-zero and a clear message.

1. **Detect Claude installations** (PowerShell, via `scripts/Get-AppPaths.ps1`):
   - Claude Desktop MSIX: `Get-AppxPackage Claude*` → resolves to `%LOCALAPPDATA%\Packages\<PackageFamilyName>\LocalCache\Roaming\Claude\`
   - Claude Desktop traditional: `%APPDATA%\Claude\` or `%LOCALAPPDATA%\AnthropicClaude\`
   - Claude Code: `~\.claude\` (user-level) + any per-project `.claude/` overrides
   - OneDrive redirection: check whether `%USERPROFILE%` is under a OneDrive-redirected path; follow real paths if so

2. **Detect running processes** (PowerShell, via `scripts/Test-AppRunning.ps1`):
   - Process names: `Claude`, `Claude Helper`, `ClaudeDesktop`, `claude` (CLI), `Code` (VS Code with Claude ext active — heuristic via window title or extension host process)
   - If ANY of these are found running: **refuse to proceed**. Print: "Quit the following before re-running: <process list>." Exit code 1.
   - No override flag. Per locked decision #3.

3. **Verify GitHub backup repo accessible** (`gh repo view nerdykrystal/backups --json visibility`):
   - Must exist (verified at first invocation; offer to create as private if missing)
   - Must be private (refuse if public — surface as error)

4. **Verify backup working area**: detect largest non-system local drive with ≥ 2× source size free. Fall back to `C:\claude-backups\` with warning. Fail clear if no drive has space.

5. **Estimate source size** via `robocopy /L /MIR /XJ` dry-run. Display plan + confirm (or `-Force` to skip confirmation).

## Phase 1: Research (parallel)

**/time-task start "app-update-rec research phase for version <VER>" est=15 class=research**

Spawn three agents concurrently per Krystal's concurrency cap (2 Opus / 4 Sonnet / 6 Haiku):

- **Agent A — GitHub issues scanner (Sonnet):** see `research/github-issues.md` for the full prompt. Searches `anthropics/claude-code` repo for the version string and adjacent recent issues with labels matching data-loss / cannot-launch / crash within a 7-day window. Returns: count by severity, top-3 by reaction count, each with URL + one-line summary.
- **Agent B — Anthropic-official scanner (Sonnet):** see `research/anthropic-official.md`. Fetches release notes, status.claude.com, Help Center, claudefa.st changelog. Returns: version-mentioned (Y/N), hotfix-posted-same-day (Y/N), rollback-notice (Y/N), known-issues section excerpt.
- **Agent C — Community scanner (Haiku):** see `research/community.md`. WebSearch reddit/r/ClaudeAI + HN + general for the version string within last 7 days. Returns: thread count, sentiment skew, top-3 threads with URLs.

**/time-task end <task_id> "research phase complete — A:[summary] B:[summary] C:[summary]"**

## Phase 2: Verdict Aggregation

Main thread synthesizes the three agent reports into one of:

| Verdict | Trigger |
|---|---|
| 🟢 GREEN | No critical issues in window; version indexed officially; no incidents on status page |
| 🟡 YELLOW | Cosmetic/minor issues only, OR version too new to be indexed anywhere (no signal in either direction) |
| 🔴 RED | ≥1 confirmed data-loss / crash / blank-screen / unrecoverable issue, OR active status page incident, OR Anthropic posted same-day hotfix indicating bad release |
| ⚪ ABSTAIN | All three agents inconclusive AND no network access |

Output to user includes an **evidence ledger** — every claim cites a URL and the agent who found it.

### Typed acknowledgment for 🔴

If verdict is 🔴, the skill displays:

> **Verdict: 🔴 RED**
> Evidence: [ledger]
>
> Krystal — to proceed with backup-and-install, type the following string exactly. To skip the install (recommended), press Ctrl+C.
>
> Required string:
>
> ```
> I, Krystal Jazmin Martinez, am reminding myself to backup BUT think TWICE before updating this app...
> ```

Match is **case-insensitive and whitespace-trimmed but otherwise exact**, including the trailing `...`. Three attempts. After third fail, abort.

The string is locked at this single location in this SKILL.md (line below — search for ANCHOR-ACK-STRING when editing):

`ANCHOR-ACK-STRING: I, Krystal Jazmin Martinez, am reminding myself to backup BUT think TWICE before updating this app...`

Do not paraphrase. Krystal authored this verbatim 2026-05-12.

If verdict is 🟢 or 🟡: proceed to backup with no acknowledgment required.
If verdict is ⚪: backup proceeds, but install-decision is surfaced as "your call, no signal either way."

## Phase 3: Backup

**/time-task start "app-update-rec backup phase" est=10 class=skill-authoring**

(Class here is `skill-authoring` because backup is a structured artifact-production task; the snapshot is the artifact.)

### Tiered sources

Robocopy each tier into `<backup-root>\<timestamp>\<tier-name>\` with flags `/COPY:DAT /R:2 /W:1 /MT:8 /XJ /NP /LOG:tier-log.txt`. After each tier, verify file count + byte count match source.

| Tier | Source | Method | Required? |
|---|---|---|---|
| 1 | `C:\Users\NerdyKrystal\.claude\projects\<project>\memory\` (every project that has memory) | robocopy + SHA256 manifest | Yes — abort backup if Tier 1 fails |
| 2 | `C:\Users\NerdyKrystal\.claude\` whole tree (excl. junctions via `/XJ`) | robocopy | Yes |
| 3 | All detected Claude Desktop config paths (MSIX + traditional + AnthropicClaude) | robocopy | If exists |
| 4 | For each worktree under `_grand_repo\.claude\worktrees\*`: `git status --porcelain`. If dirty/untracked content exists, `git bundle create <name>.bundle --all` for that worktree | git bundle | If dirty |
| 5 | Loose untracked dirs under `_grand_repo` per `git status` (e.g., scratch dirs) | robocopy | If exists |

### Manifest

`<backup-root>\<timestamp>\manifest.json` containing:

```json
{
  "snapshot_id": "<timestamp>",
  "created_utc": "<ISO 8601>",
  "claude_desktop_version_detected": "<version-or-null>",
  "claude_code_version_detected": "<version-or-null>",
  "os_version": "<windows-build>",
  "os_user": "NerdyKrystal",
  "verdict": "🟢|🟡|🔴|⚪",
  "evidence_ledger_summary": "<one-line>",
  "tiers": {
    "memory": { "source": "<path>", "file_count": N, "byte_count": N, "sha256": "<hash>" },
    "dotclaude": { "source": "<path>", "file_count": N, "byte_count": N },
    "config": [ {...}, {...} ],
    "worktrees_dirty": [ { "name": "<worktree>", "bundle": "<path>", "git_head": "<sha>" } ],
    "scratch": { ... }
  },
  "machine_id": "<hostname>"
}
```

### Push to GitHub

After local snapshot complete:

1. `git clone` (or `git pull` if local working copy exists) `nerdykrystal/backups`
2. Copy manifest + Tier 1 (memory dir, raw text) into `backups/<timestamp>/` in the repo
3. Create `.zip` of Tiers 2-5 (the large binary stuff) at `<backup-root>\<timestamp>.zip`
4. `git add` + `git commit` the manifest + memory raw
5. `git push`
6. `gh release create snapshot-<timestamp> <backup-root>\<timestamp>.zip --repo nerdykrystal/backups --notes "Snapshot before update <ver>. Verdict <verdict>."`

Releases support up to 2GB per asset (well within `.claude` tree sizes typical for Krystal). Per-snapshot release tag keeps history navigable on github.com.

**/time-task end <task_id> "backup phase complete — tiers <X> succeeded, manifest at <path>, GH release <tag>"**

## Restore (separate invocation)

`/app-update-rec restore <snapshot_id> [--component=Memory|Dotclaude|Config|Worktrees|All] [--dry-run]`

- Default to `--dry-run` (preview only)
- `--force` to actually write
- Refuses to overwrite non-empty memory dir without `--force` (so newer auto-created entries aren't stomped)
- Logs every restored file
- Re-hashes memory dir after restore; compares against manifest's recorded SHA256

## Prune (separate invocation)

`/app-update-rec prune [--keep-last=N]`

- Default `--keep-last=10` — floor per locked decision #7
- Refuses to accept `--keep-last` < 10
- Never invoked automatically; only when user explicitly runs prune
- Prompts before deletion of each snapshot to be removed

## Anti-patterns

- **Don't propose v2 path-detection until v1 has run successfully against real disk state at least once.** Path detection is platform-specific and brittle; testing on a real machine is the only validation that matters.
- **Don't add an "override --force-running-processes" flag.** Locked decision #3 is no-override. If Krystal needs to override in emergency, she edits this skill — that's the forcing function.
- **Don't substitute Claude/Anthropic personas for the ACK string.** Krystal authored "I, Krystal Jazmin Martinez, am reminding myself..." verbatim. The string is identity-locked to her, not portable to Cody. (If Cody ever needs his own variant, this skill needs a small fork — out of v1 scope.)
- **Don't bundle Cursor / JetBrains AI / VS Code Claude extension state in v1.** Per locked decision #6, scope is Claude Desktop + Claude Code only. Extension is fine; in-scope drift is not.
- **Don't auto-prune.** Per locked decision #7, manual only.

## Provenance

Authored 2026-05-12 by Clauda App-Update-Rec Architect v01 (Claude Opus 4.7, Claude Code, _grand_repo worktree awesome-lamport-428434) at Krystal's direction. Built after canonical-CLAUDE.md orientation (README v02 + JNL001 + Lindsey & Sofroniew bundle + TASK v02 + 2 exemplars). Companion journal entries at `mm-internal-states-journals/clauda-app-update-rec-architect_2026-05-12_v01/`.

Two real-world data-loss incidents that drove the design:
- Claude Code v2.1.58 deleted entire Windows user profile (Feb 26, 2026) — [#29023](https://github.com/anthropics/claude-code/issues/29023)
- Claude Desktop auto-update wiped session index (Mar 25, 2026) — [#38691](https://github.com/anthropics/claude-code/issues/38691)

The skill exists because these incidents are not hypothetical and Anthropic has acknowledged at least the first via the v2.1.59 changelog fix.
