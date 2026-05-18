---
name: Repo topology + workstream acronym decodings
description: Where key Martinez Methods workstreams physically live, and what ambiguous acronyms (DPO, LE, FM-18, the experiment repo) actually mean/point to
type: reference
---

Repo-universe map and acronym decodings, learned 2026-05-17 while assembling document bundles. Verify paths still exist before relying (tree moves).

**Repo roots** (search ALL of these, not just `martinez-methods/`): `~/martinez-methods/`, `~/_grand_repo/` (primary working/consumer repo — holds `claude-cost`, `claudette-can-code`, `claudette-can-code-plugin`, mm-claude-canonical as submodule), `~/_martinez-methods/`, `~/_experiments/`, `~/repos/`, `~/.claude/projects/` (transcript + per-project memory stores).

**Acronym / workstream decodings:**
- **DPO = DATS Pipeline Orchestra** (NOT "Data Pipeline Orchestra", NOT the ML technique). The actual DPO repo/working area is **`repos/StrongMinds-DMIS/DATS_Pipeline_Orchestra/`** — it contains `00_Playbook/DPO_Playbook.md`, `01_Appendices/` (A_Glossary … V_POClaw_Skill_Catalog — 22 appendices, A–V; "appendices" is many files, not one), `02_Flow_Diagrams/` (FD_00–FD_08), `03_Execution_Artifacts/`, `04_Source_Reference/`. The confirmed **`DPO_Knowledge_Bank_2026-03-21.xlsx`** lives separately at `repos/Random Repo/Job Hunt/Krystal Job Hunt Materials/Krystal Job Deep Research Outputs/`. The `Encyclopedia_Krystal_V03*/V04*` and `PEK_Vol_03_DPO_*` docs under Job Hunt are job-hunt-portfolio *renderings* of DPO, NOT the source repo — do not mistake them for it (this was my 2026-05-17 error; Krystal: "in the dats pipeline orchesratra repo there is literally a subdir labeled appendix or appendices").
- **LE = Learning Experience.** The "learning experience repo" = `repos/Random Repo/Learning Experiences/` (sparse — one workbook as of 2026-05-17). LE Generation Playbook lives at `repos/stahl-systems-docs/12_AI_Operations_AIO/LRN_SPE_PBK_Learning_Experience_Generation_Playbook_*` (latest v04) and a v01 in the Job Deep Research Outputs dir. Distinct from the `le-prompt-brief` skill.
- **The "experiment repo"** = `~/_experiments/`. The d2r-vs-opus-only-vs-no-asae-gates study is `~/_experiments/experiments/d2r_methodology_factorial/` (pre-registration.md, protocol.md, pilot-3-condition-protocol.md, runs/, analysis/).
- **FM-18** — a failure mode in Krystal's FM taxonomy ("Disciplinary Supremacy" / credentialism family). Content-referenced as the literal string "FM-18", NOT in filenames. Related: `project_fm_disciplinary_supremacy_candidate.md` memory, FMT-v2-Preprint-Readiness docs in `repos/stahl-systems-docs/12_AI_Operations_AIO/agent-config/`, `mm-fm-taxonomy/`. To find FM-18 material, grep file CONTENTS for "FM-18" across all roots incl `.claude/`.
