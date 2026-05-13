# Research Playbook — app-update-rec Phase 1

This is the orchestration document the parent Claude follows when app-update-rec enters its research phase. Per SKILL.md Phase 1.

## Inputs

- `$Version` — the app version about to be installed (e.g., "1.7196.0"). May be `<undetected>`.
- `$AppFamily` — "claude-desktop" or "claude-code". (Auto-detect from update prompt context if user didn't specify.)

## Constraint

Per Krystal's [Background-agent concurrency caps memory](C:\Users\NerdyKrystal\.claude\projects\C--Users-NerdyKrystal--grand-repo\memory\feedback_extra_high_effort_concurrency_caps.md): all parent threads cap background spawns at 2 Opus / 4 Sonnet / 6 Haiku at once. This phase spawns 2 Sonnet + 1 Haiku — within the cap.

## Orchestration

Spawn three Agent calls in a **single message with three parallel tool uses** so they run concurrently. Use the Agent tool's `model` parameter to set Sonnet/Haiku per the concurrency cap; all three use `subagent_type: general-purpose` (no specialized agent type fits this research role tighter than general-purpose):

1. **Agent A — github-issues-scanner**
   - subagent_type: `general-purpose`
   - **model: `sonnet`**
   - Prompt: load from `research/github-issues.md`, substitute `{VERSION}` and `{APP_FAMILY}`
   - Expected response shape: JSON with fields `count_critical`, `count_total`, `top_issues` (URL + title + reaction-count + one-line summary), `version_specifically_named` (Y/N)

2. **Agent B — anthropic-official-scanner**
   - subagent_type: `general-purpose`
   - **model: `sonnet`**
   - Prompt: load from `research/anthropic-official.md`, substitute `{VERSION}` and `{APP_FAMILY}`
   - Expected response shape: JSON with fields `version_in_release_notes` (Y/N), `hotfix_posted_within_24h` (Y/N), `rollback_notice` (Y/N), `status_page_active_incident` (Y/N), `known_issues_excerpt`

3. **Agent C — community-scanner**
   - subagent_type: `general-purpose`
   - **model: `haiku`**
   - Prompt: load from `research/community.md`, substitute `{VERSION}` and `{APP_FAMILY}`
   - Expected response shape: JSON with fields `thread_count`, `sentiment_skew` (positive/neutral/negative/none), `top_threads` (URL + title), `version_specifically_named` (Y/N)

## Aggregation rules → verdict

Apply in order; first match wins:

| Trigger | Verdict |
|---|---|
| Agent B reports `status_page_active_incident=Y` OR `rollback_notice=Y` | 🔴 RED |
| Agent A reports `count_critical >= 1` (any data-loss / cannot-launch / unrecoverable issue) | 🔴 RED |
| Agent B reports `hotfix_posted_within_24h=Y` (suggests bad release) | 🔴 RED |
| Agent A reports `count_total >= 5` recent issues even if non-critical | 🟡 YELLOW |
| Agent C reports `sentiment_skew=negative` AND `thread_count >= 3` | 🟡 YELLOW |
| Agent B reports `version_in_release_notes=Y` AND no other negative signal | 🟢 GREEN |
| Version too new for any agent to find signal in either direction | 🟡 YELLOW |
| All three agents inconclusive AND network failures | ⚪ ABSTAIN |
| Default | 🟢 GREEN |

## Evidence ledger format

Aggregate every claim with its source. Display to user as:

```
=== Evidence ===
[Agent A — github-issues] count_critical=N count_total=M
  - <URL> — "<title>" (👍N) — <one-line>
  - ...
[Agent B — anthropic-official] version_in_release_notes=Y/N hotfix=Y/N
  - <URL> — <excerpt>
[Agent C — community] threads=N sentiment=<skew>
  - <URL> — "<title>"
=== Verdict: <emoji> <label> ===
Reason: <which trigger fired>
```

## After verdict

Pass `$Verdict` into `Backup-ClaudeState.ps1 -Verdict <verdict> -Version <version>`. The verdict is recorded in the manifest regardless of which path (acknowledgment-required or not) the user took.

## Failure modes

- **Agent timeout**: if any agent doesn't return within 5 minutes, treat its return as "inconclusive" for aggregation. Do not block.
- **Agent error**: log error, treat as inconclusive, surface in evidence ledger as "[Agent X] error: <msg>".
- **All three agents fail**: verdict ⚪ ABSTAIN; surface "no signal could be gathered — your call."

## Anti-patterns

- **Don't skip the parallel-spawn**: serial calls would multiply latency. The whole point of three lightweight agents is the parallel breadth.
- **Don't let Agent A's `count_total` drive 🔴 alone** — count alone isn't severity. Critical-issue presence does.
- **Don't synthesize the verdict from your own knowledge** — only from agent reports. The skill exists because your training-data cutoff cannot speak to "this specific version released yesterday."
