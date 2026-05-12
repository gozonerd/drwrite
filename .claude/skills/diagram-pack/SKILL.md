---
name: diagram-pack
description: "Group skill that routes diagram requests to the right Martinez Methods diagram-orchestration skill. Triggers on 'I need a diagram', 'visualize this', 'diagram this', 'pick a diagram tool', 'what diagram should I use', 'route to diagram skill', 'diagram-pack', or any diagram request that doesn't already specify a format (mermaid / graphviz / plantuml / bpmn / html-interactive). Asks 2-3 routing questions if format is ambiguous, then invokes the appropriate sibling skill. Companion to the 5 individual *-ai-orchestration skills (mermaid / graphviz / plantuml / bpmn / html-interactive); does NOT replace them — explicit format invocations bypass this router."
version: 0.1.0
authored_by: Clauda W. Reliability Compositor v01 (2026-04-28)
type: skill
---

# /diagram-pack

## Purpose

Single entry point for "I need a diagram" requests when the user hasn't picked a format. Routes to the right sibling skill based on what they're trying to visualize and where it'll be consumed.

The 5 individual `*-ai-orchestration` skills each encode deep domain knowledge for one rendering format. This group skill encodes the **selection logic** — which format fits which use case — so the user doesn't have to remember the comparison tables embedded in each individual skill.

## When to Use

- User asks for a diagram without specifying the format ("diagram this pipeline", "visualize the workflow", "I need a flowchart for the README")
- User asks "what diagram tool should I use for X?"
- User describes a visualization need and wants help picking
- User explicitly invokes `/diagram-pack` as a discovery / routing entry point

## When NOT to Use

- User explicitly names a format (e.g., "give me a mermaid diagram of X") → invoke `/mermaid-ai-orchestration` directly
- User wants to learn one format in depth → invoke that format's individual skill directly
- User wants the same diagram in multiple formats → invoke each individual skill in sequence (no router shortcut for that)

## Sibling skills

| Skill | Best for | Renders in |
|---|---|---|
| `/mermaid-ai-orchestration` | DAGs, flowcharts, sequence diagrams, basic DFDs (≤ ~15 nodes) | GitHub markdown, GitLab, VS Code, Notion, Obsidian — in-thread or .md |
| `/graphviz-ai-orchestration` | Dense dependency graphs (20+ nodes), publication-quality static diagrams, hierarchical clusters | Graphviz CLI, VS Code, Kroki, Jupyter — produces `.dot` / `.gv` / PNG |
| `/plantuml-ai-orchestration` | Rich swimlanes (human + AI), formal UML (sequence/state/component), well-typed activity diagrams | PlantUML CLI, IntelliJ, VS Code, Kroki — produces `.puml` / PNG / SVG |
| `/bpmn-ai-orchestration` | Business-process orchestration with formal BPMN 2.0 semantics (gateways, lanes, events, message flows) | bpmn.io, Camunda Modeler, Signavio — produces `.bpmn` |
| `/html-interactive-ai-orchestration` | Interactive exploration with zoom / click / drill-down; rich data-flow diagrams with per-step I/O detail | Standalone HTML page; embed in docs or open in browser |

## Routing decision tree

Ask these in order; stop as soon as a format is uniquely indicated.

### Q1 — Where will it be consumed?

| Answer | Format candidate(s) |
|---|---|
| "Inline in markdown / GitHub / a doc / chat" | Mermaid (primary) |
| "Standalone image file for a slide deck / paper / report" | Graphviz, PlantUML |
| "An interactive page / something I can click around in" | HTML-interactive |
| "A formal business-process model" | BPMN |

### Q2 — What kind of structure are you visualizing?

| Answer | Format candidate(s) |
|---|---|
| "Dependency graph / DAG / which-pipeline-feeds-which" | Mermaid (≤ 15 nodes) → Graphviz (20+) |
| "Sequence of who-calls-whom" | Mermaid sequence diagram, PlantUML sequence |
| "Human-and-AI swimlanes" | PlantUML (rich), BPMN (formal) — NOT Mermaid (limited swimlane support) |
| "Data flow with I/O per step" | Mermaid (basic), HTML-interactive (rich), Graphviz (publication-grade) |
| "Process with gateways / events / message-passing" | BPMN |
| "State machine / lifecycle" | PlantUML state, Mermaid stateDiagram |

### Q3 — Scale and audience?

| Answer | Format candidate(s) |
|---|---|
| "Small (≤ 10 nodes), shipped to engineers" | Mermaid (lightest weight) |
| "Medium (10–25 nodes), shipped to ops or PM" | Mermaid or PlantUML |
| "Large (25+ nodes), publication or audit" | Graphviz |
| "Compliance / regulatory / formal review" | BPMN (notation auditors recognize) |
| "Stakeholder presentation, want zoom / drill-down" | HTML-interactive |

If after 3 questions multiple formats are still viable: **default to Mermaid** (lowest friction; renders in-thread; good enough for the majority of AI-orchestration cases). Note the alternatives so the user can switch later.

## Workflow

1. **Detect format-ambiguity.** If user named a format already, redirect to that individual skill and stop. Otherwise continue.
2. **Run routing decision tree.** Ask Q1; if format is uniquely indicated, skip to step 4. Otherwise ask Q2, then Q3.
3. **Confirm format with user** before invoking the individual skill. Format: "Routing to `/<format>-ai-orchestration` because [reason]. Switch?" — one-line. User says "yes" / "use <other>" / "switch to <other>".
4. **Invoke the sibling skill.** Pass the user's original description as input. Let the sibling skill produce the diagram.
5. **Optional: offer multi-format render.** If the user's use case spans multiple formats (e.g., "I want this in both Mermaid for the README and Graphviz for the slide deck"), offer to invoke both skills in sequence.

## Anti-patterns

- **Don't re-implement what the individual skill does.** This skill ROUTES; it does not produce diagrams directly.
- **Don't skip Q1 just because the user gave a hint.** Use the question to confirm — "you mentioned this goes in the README, so I'm thinking Mermaid; confirm?"
- **Don't bypass when format is ambiguous and pick silently.** Always confirm the format choice before invoking the sibling.
- **Don't invoke this skill when format is already specified.** That's wasted overhead.

## Example invocations

### Example 1 — Format clear from context

> User: "I need a Mermaid diagram of the pipeline."

Output: "Format already specified — routing to `/mermaid-ai-orchestration` directly." → invoke `/mermaid-ai-orchestration`.

### Example 2 — Format ambiguous

> User: "Diagram the orchestration."

Output:
```
Three quick routing questions:
1. Where will this be consumed? (markdown doc / standalone image / interactive page / formal business-process model)
2. What's the structure? (dependency DAG / sequence of calls / swimlanes / data flow / process with gateways)
3. Scale / audience? (small inline / medium / large publication / formal review / stakeholder presentation)
```

User answers, format selected, invoke sibling.

### Example 3 — Multi-format

> User: "I need this orchestration in both the README and a slide deck for the board."

Output: "Routing to `/mermaid-ai-orchestration` for the README + `/graphviz-ai-orchestration` for the slide deck (publication-quality static image). Confirm?" → invoke both in sequence.

## Output format

- Routing decisions and Q&A surface in-thread.
- Final diagram output is whatever format the sibling skill produces (the sibling skill's output rules govern).
- If saving to a file, follow the standard convention: `[PREFIX_]Diagram_Description_YYYY-MM-DD_vXX_I.<ext>`.

## Provenance

- Authored 2026-04-28 by Clauda W. Reliability Compositor v01 (Opus 4.7) in the `agitated-lalande-4d649d` worktree during the Martinez Methods SSOT-migration takeover.
- Pair-companion to the 5 existing `*-ai-orchestration` skills (mermaid / graphviz / plantuml / bpmn / html-interactive).
- Krystal's request 2026-04-27 evening: "i want both ind and a group skill too." — this skill IS the group; the 5 siblings are the inds.

## Related skills

- `/mermaid-ai-orchestration`
- `/graphviz-ai-orchestration`
- `/plantuml-ai-orchestration`
- `/bpmn-ai-orchestration`
- `/html-interactive-ai-orchestration`

## Related rules

- `file-naming-and-versioning` — applies when saving the final diagram to a file
- `no-silent-execution` — every routing decision surfaces in-thread before invoking sibling
