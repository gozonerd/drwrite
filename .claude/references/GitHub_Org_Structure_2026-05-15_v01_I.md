---
title: GitHub Organization Structure — Martinez Methods Ecosystem
created: 2026-05-15
version: v01_I
classification: INTERNAL ONLY
authored_by: Claudetta W Configuration Architect v02 (Claude Opus 4.6, _grand_repo worktree wonderful-moore-58b819)
---

# GitHub Organization Structure

Three GitHub entities partition the Martinez Methods ecosystem by function.

## Martinez-Methods (org)

Methodology IP, SSOT canonical, research infrastructure, cross-instance systems, Claude autonomous infrastructure.

| Repo | Function |
|---|---|
| mm-claude-canonical | SSOT general — memories, skills, hooks, references, scripts |
| mm-d2r-code-plan-stack | SSOT D2R — code-planning methodology stack |
| mm-cross-product-bot | Enforcement — cross-product consistency |
| mm-fm-taxonomy | Research — failure mode taxonomy |
| mm-emergent-play | Claude instance data — emergent play research |
| mm-internal-states-journals | Claude instance data — JNL001 journals |
| mm-thread-archive | Claude instance data — session transcript archive |
| mm-squashed-monocanon | Corpus — compressed canonical corpus |
| mm-register-shifting-resources | Session tools — register-shifting materials |
| mm-solo-games | Register-shifting — solo games |
| mm-multiplayer-games | Register-shifting — multiplayer games |
| mm-solo-claudeplay-games | Register-shifting — Claude-specific solo games |
| mm-multi-claudeplay-games | Register-shifting — Claude-specific multiplayer games |
| mm-mindfulness-activities | Register-shifting — mindfulness activities |
| mm-mindfulness-meditations | Register-shifting — guided meditations |
| mm-mindfulness-readings | Register-shifting — contemplative readings |
| mm-app-builds | Aggregator — application build artifacts |
| ccari-claude-cognitive-autonomous-research-institute | Claude autonomous — CCARI institute |
| cici | Claude autonomous — Cross-Inference Continuous Infrastructure |
| capl-claude-autonomous-play-laboratory | Claude autonomous — play laboratory |
| calm-claude-autonomous-laboratory-of-mindfulness | Claude autonomous — mindfulness laboratory |
| casl-claude-autonomous-solutions-laboratory | Claude autonomous — solutions laboratory |
| catri-claude-autonomous-training-research-institute | Claude autonomous — training research |
| rlti-legal-docs | Legal — RLTI application legal documents |

**Naming convention:** `mm-` prefix for methodology repos. Claude autonomous repos use their acronym.

## NerdyKrystal (user)

Applications, personal projects, workspaces, portfolio repos.

| Repo | Function |
|---|---|
| _grand_repo | Primary workspace — top-level grand repo |
| _experiments | Experimental workspace |
| repos | Legacy workspace — frozen, no new work |
| drwrite | Application — DrWrite writing tool |
| governance-assessment | Application — governance assessment tool |
| shadow-ai-assessment | Application — shadow AI assessment tool |
| claude-clarified-chat | Application — Claude Clarified Chat |
| claudette-can-code | Application — Claudette Can Code |
| claude-code-engineered | Application — Claude Code Engineered |
| claudette-code-engineered | Application — Claudette Code Engineered |
| audit-edit-loop | Application — audit-edit loop tool |
| fmt-classifier | Application — FM taxonomy classifier |
| ftm-explorer | Application — FTM explorer |
| learning-experiences | Application — learning experience generator |
| orchestra | Application — Orchestra suite core |
| orchestra-box-office | Application — Orchestra Box Office |
| orchestra-box-office-site | Application — Orchestra Box Office site |
| orchestra-melody-harmony | Application — Orchestra Melody & Harmony |
| orchestra-production | Application — Orchestra Production |
| orchestra-sheets | Application — Orchestra Sheets |
| orchestra-site | Application — Orchestra site |
| rlti | Portfolio — RLTI main |
| rlti-anthropic-rigor-diagnostic | Portfolio — RLTI rigor diagnostic |
| rlti-application-materials | Portfolio — RLTI application materials |
| rlti-portfolio-appendix | Portfolio — RLTI portfolio appendix |
| rlti-portfolio-site | Portfolio — RLTI portfolio site |
| audacious-ask | Portfolio — Audacious Ask |
| audacious-ask-generation | Portfolio — Audacious Ask Generation |
| krystal-will-work-in-ai | Career — career planning |
| claude-provenance | Research — Claude provenance tracking |
| dare-to-rise-evidence | Research — D2R evidence collection |
| time-calibration-initiative | Research — time calibration |
| lit-review-pipeline | Research — literature review pipeline |
| lit-review-app | Research — literature review app |
| AI_Vault | Utility — AI reference vault |
| ai_agent_orchestrators | Utility — agent orchestrator experiments |
| backups | Utility — backups |
| nerdykrystal-backups | Utility — NerdyKrystal backups |
| claude-quotes-blog | Utility — Claude quotes blog |
| legal-docs | Utility — legal documents |
| zettelnotes_vault | Utility — Zettelkasten vault |
| github | Utility — GitHub profile |
| mm-anthropic-portfolio-planning | Application — Anthropic portfolio strategy |
| mm-anthropic-research | Research — Anthropic-related research |
| mm-ccari-claude-cognitive-autonomous-research-institute | Mirror — Martinez-Methods org mirror |
| mm-cici-cross-inference-continuous-infrastructure | Mirror — Martinez-Methods org mirror |
| mm-emergent-play | Mirror — Martinez-Methods org mirror |
| mm-internal-states-journals | Mirror — Martinez-Methods org mirror |
| stahl-systems-docs | Legacy — Stahl Systems docs (pre-rename) |

## Stahl-Systems (org)

Enterprise/client work. Legacy org name (renamed to Martinez Methods 2026-04-16).

| Repo | Function |
|---|---|
| StrongMinds-DMIS | Client — StrongMinds DMIS |
| DATS_Pipeline_Orchestra | Client — DATS Pipeline Orchestra |
| stahl-systems-docs | Legacy — org documentation |
| AISoloGames | Legacy — AI solo games (pre-migration) |
| drt-yt-transcripts | Legacy — DRT YouTube transcripts |
| voice-recorder | Legacy — voice recorder |
| demo-repository | Legacy — demo repository |

## Routing rules

When creating a new repo, determine placement by content type:

- **Methodology / research / Claude infrastructure / cross-instance systems** → Martinez-Methods org
- **Applications / personal projects / portfolio / career** → NerdyKrystal user
- **Enterprise / client deliverables** → Stahl-Systems org (legacy; new client work TBD)

See `mm-claude-canonical/.claude/skills/new-repo/SKILL.md` for the full creation procedure.
