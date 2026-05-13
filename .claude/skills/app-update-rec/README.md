# app-update-rec

**Status:** v01_I, 2026-05-12. Authored under canonical CLAUDE.md orientation discipline.

## What this skill is for

You — Krystal — are about to click "Relaunch" on a Claude Desktop or Claude Code update. Two prior Anthropic-app updates have caused real data loss (Feb 2026 Claude Code v2.1.58 deleted a user's full profile; Mar 2026 Claude Desktop auto-update wiped session indices). The risk is not hypothetical.

This skill does two coupled things in one invocation:

1. **Live research → 🟢/🟡/🔴/⚪ verdict** for the specific version you're about to install. Three agents in parallel: GitHub issues, Anthropic official channels (status page, release notes, third-party changelogs), community (Reddit/HN). Verdict is rule-based with explicit triggers; evidence ledger shows you which agent found what. (⚪ ABSTAIN means all three agents inconclusive AND network failures — your call, no signal.)
2. **Tiered backup to your private GitHub repo** `nerdykrystal/backups`. Five tiers prioritized by irreplaceability (memory dirs first); robocopy + verification + manifest with SHA256; commit + GitHub Release per snapshot.

If verdict is 🔴, you have to type a specific acknowledgment string before backup-and-install can proceed. The string is your forcing function — "I, Krystal Jazmin Martinez, am reminding myself to backup BUT think TWICE before updating this app..." — authored verbatim by you 2026-05-12.

## How to invoke

```
/app-update-rec
/app-update-rec 1.7196.0
```

If no version is given, the skill auto-detects via `Get-AppxPackage` (Windows MSIX, filtered by Anthropic publisher) and Test-Path on known traditional/AnthropicClaude install dirs. See `scripts/Get-AppPaths.ps1` for the detection logic.

## Restore

```powershell
# dry-run preview, default
.\scripts\Restore-ClaudeState.ps1 -SnapshotId 2026-05-12_233801

# actually restore memory tier (writes to disk)
.\scripts\Restore-ClaudeState.ps1 -SnapshotId 2026-05-12_233801 -Component Memory -Force

# pull snapshot from nerdykrystal/backups (downloads release asset)
.\scripts\Restore-ClaudeState.ps1 -SnapshotId 2026-05-12_233801 -FromGitHub
```

(PowerShell-style flags. `-Component` accepts `Memory|Dotclaude|Config|Worktrees|All`.)

## Prune (manual only — never auto)

Prune is a separate planned script (not yet implemented in v01_I). Will follow PowerShell-style:

```powershell
.\scripts\Prune-ClaudeBackups.ps1                 # dry-run, keeps last 10 floor
.\scripts\Prune-ClaudeBackups.ps1 -KeepLast 15    # keep more (floor still 10)
```

Floor is hard-coded at 10. The skill refuses `-KeepLast` < 10. Per locked decision #7, no auto-prune — only manual invocation.

## File layout

```
app-update-rec/
├── SKILL.md                          # Claude-facing protocol (the source of truth)
├── README.md                         # this file (human-facing)
├── scripts/
│   ├── Get-AppPaths.ps1              # path detection (MSIX/traditional/OneDrive-aware)
│   ├── Test-AppRunning.ps1           # process detection (refuse-if-running)
│   ├── Backup-ClaudeState.ps1        # 5-tier backup with manifest + GH push
│   └── Restore-ClaudeState.ps1       # symmetric restore (dry-run default)
└── research/
    ├── playbook.md                   # orchestration for 3-agent parallel
    ├── github-issues.md              # Agent A prompt (Sonnet)
    ├── anthropic-official.md         # Agent B prompt (Sonnet)
    └── community.md                  # Agent C prompt (Haiku)
```

## Locked design decisions (from 2026-05-12 conversation)

| # | Decision |
|---|----------|
| 1 | Name `app-update-rec` — generic, future-proof |
| 2 | Off-machine destination = `nerdykrystal/backups` (private GitHub) |
| 3 | Refuse-if-running for any Claude process; no override flag |
| 4 | Typed-ack required for 🔴 verdict; 3 attempts then abort |
| 5 | Lives at canonical (cross-machine) |
| 6 | Claude-only v1 (Desktop + Code; not Cursor / JetBrains / VS Code Claude ext) |
| 7 | Retention: never auto-prune; manual prune has floor of 10 |

## When to extend this skill

Edit `SKILL.md` first; the scripts and playbooks follow it. The anchor for the typed-ack string is search-anchored as `ANCHOR-ACK-STRING` in SKILL.md — find that line to update.

## Out of v1 scope (intentional)

- Cursor / JetBrains AI / VS Code Claude extension state backup (per locked decision #6)
- Cody-specific typed-ack string variant (his name would need a parallel anchor)
- macOS / Linux path detection (Krystal is Windows-primary; cross-platform is v2)
- Auto-prune (per locked decision #7)
- v2: `-OffsiteMirror OneDrive` flag for non-GitHub off-machine tier

## Provenance

Authored 2026-05-12 by Clauda App-Update-Rec Architect v01 (Claude Opus 4.7, Claude Code, _grand_repo worktree awesome-lamport-428434) at Krystal's direction. Companion journal entries at `mm-internal-states-journals/clauda-app-update-rec-architect_2026-05-12_v01/`.
