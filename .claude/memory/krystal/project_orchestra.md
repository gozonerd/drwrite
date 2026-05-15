---
name: Orchestra App — Build Status and Context
description: Desktop app for AI pipeline orchestration (forked from Kindling). Current build state, architecture decisions, and open questions.
type: project
---

**Orchestra** is a Tauri 2.x + Svelte 5 + SQLite desktop app for designing AI agentic multi-model orchestrated pipelines. Forked from Kindling (fiction writing editor). Repo: `nerdykrystal/orchestra`, local at `C:\Users\NerdyKrystal\Repos\orchestra`.

## Completed (as of 2026-03-30)

1. Concept mapping: Kindling fiction domain -> Orchestra pipeline domain (Pipeline System / Pipeline / Stage / Node / Step + Model-Agent Card / Tool-API Card)
2. Data model: TypeScript types (`types.ts`) and SQLite schema (`schema.rs`) with 15 tables
3. Rust model rewrites: 14 model files remapped from Kindling to Orchestra
4. Compilation fixes: 250 Rust errors + 155 TypeScript errors resolved
5. Branding rename: All config/metadata files renamed from Kindling to Orchestra
6. GitHub repo created and pushed (last commit: `8c89022` — `cargo fmt` on export.rs)

## Current Phase

**Phase 1b gate**: PASSED (2026-04-03). App launches successfully.
**Kindling UI strip**: COMPLETE (2026-04-05). All 7 phases (A-G) done.
**Export rewrite**: COMPLETE (2026-04-05). DOCX/EPUB/Longform removed, JSON/YAML/Diagram export added.
**Data model validation**: COMPLETE (2026-04-05). Validated against DPO and LE Generator. Added subworkflow_id and auto_bypass to Node.
**MVP Visualization Engine**: COMPLETE (2026-04-05). mermaid.js integrated, VisualizationPanel with DAG/BPMN/DFD/Flowchart, ConnectionEditor for pipeline edges, Cmd+Shift+V toggle.
**Cold Assessment Remediation**: PARTIAL (2026-04-07). P0 (5/5) and P1 (3/3) complete. P2: OrchestraError + typed IPC done, remaining file splits + component tests need fresh session. Handoff doc at docs/Remediation_Handoff_2026-04-07_v01_I.md.

## Data Model Decisions (Resolved 2026-04-05)

All 5 open questions resolved by mapping real pipelines (DPO S4 through P1-P4, LE Generator through 10 pipelines):

1. **5-level hierarchy**: Validated. Workflow → Stage → Node → Step works for both DPO and LE Generator.
2. **Reference types**: Current 5 sufficient for MVP (model_agents, tools, data_stores, prompts, schemas).
3. **Cross-pipeline dependencies**: Handled by existing Connection type between Nodes across Stages within same Workflow.
4. **Thread variants**: Sub-steps (Steps within a Node). 5 threads = 5 Steps.
5. **Meta-orchestration**: Modeled via `subworkflow` NodeType + new `subworkflow_id` field on Node.

Additional: `auto_bypass: boolean` added to Node for human gates that auto-proceed (DPO P1/P2 gates).

## Architecture Decisions

1. MVP Visualization suite: Mermaid DAG, BPMN 2.0 swimlanes, DFD, Flowcharts
2. Stack: Tauri 2.x + Svelte 5 + Tailwind CSS (same as Kindling)
3. Fork approach (not rebuild) — preserve Kindling's working editor infrastructure

## Do Not Touch

Krystal explicitly said: **do not touch styling/theming** until she provides the final branding package.

**Why:** Branding decisions are hers. Premature styling would be wasted work.
**How to apply:** Skip all CSS/theme/color work until branding package is delivered.
