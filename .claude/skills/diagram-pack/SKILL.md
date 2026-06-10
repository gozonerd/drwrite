---
name: diagram-pack
description: "Group skill that routes diagram requests to the right Martinez Methods diagram-orchestration skill. Triggers on 'I need a diagram', 'visualize this', 'diagram this', 'pick a diagram tool', 'what diagram should I use', 'route to diagram skill', 'diagram-pack', or any diagram request that doesn't already specify a format (mermaid / graphviz / plantuml / bpmn / html-interactive). Asks 2-4 routing questions if format is ambiguous (Q0 distinguishes human-reader artifacts from deterministic-validator/gate-consumed artifacts), then invokes the appropriate sibling skill. Gate-consumed artifacts route to schema-bearing formats (BPMN 2.0 XML / Graphviz DOT) — never Mermaid; threat-model DFDs (Threat Dragon JSON / pytm) are a documented gap. Companion to the 5 individual *-ai-orchestration skills (mermaid / graphviz / plantuml / bpmn / html-interactive); does NOT replace them — explicit format invocations bypass this router."
version: 0.2.0
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

### Q0 — Human reader or deterministic validator? *(added 2026-06-10 per June 2026 PipeKill research on machine-linted intake gates)*

Ask first, before everything else: **is this artifact consumed by a human reader, or by a deterministic validator / gate** (machine-linted intake gate, CI schema check, governance adjudication pipeline)?

| Answer | Routing |
|---|---|
| "A human reads it" (doc, README, slide, review, presentation) | Continue to Q1–Q3 below |
| "A machine validates / adjudicates it" (linted intake gate, schema validator, policy gate) | Use the **gate path** below; do NOT continue to Q1–Q3 and do NOT default to Mermaid |

**Gate path** — deterministic-validator consumers need a parseable, validatable grammar:

| Artifact needed | Format | Skill |
|---|---|---|
| Process / orchestration model with formal gateway-lane-event semantics | BPMN 2.0 XML (XSD-validatable; lintable by Camunda / Flowable tooling) | `/bpmn-ai-orchestration` |
| Dependency structure / DAG | Graphviz DOT (formal machine-parseable grammar; JSON DAG obtainable via `dot -Tdot_json`) | `/graphviz-ai-orchestration` |
| Threat-model DFD (trust-boundary + data-classification semantics for governance adjudication) | e.g., OWASP Threat Dragon JSON or pytm (threat-model-as-code) | **GAP — no current skill.** See guidance note below |
| Any other validator-consumed artifact (state machine, sequence contract, …) | Whatever schema the gate actually lints (XML/JSON with a published schema) | No sibling fits → author the schema directly in-thread + flag the gap to Krystal |

**Why the human-reader formats are wrong here:** Mermaid offers no machine-readable AST export for flowcharts — none in mermaid-cli at all (open upstream issue mermaid-js/mermaid-cli#978) — so a deterministic gate cannot lint what it cannot parse. HTML-interactive output is a rendering for human exploration, not a schema. Neither can be deterministically adjudicated.

**Threat-model-DFD guidance note (gap recorded 2026-06-10).** DFDs consumed by governance gates need trust-boundary and data-classification semantics carried in a parseable schema. Two widely used open-source carriers: **OWASP Threat Dragon JSON** (trust-boundary semantics in the v2 schema; note it carries no schema-enforced data-classification field as of v2) and **pytm** (threat model as Python code; trust boundaries + a Classification enum; emits DFDs and threat reports). Other carriers exist (e.g., Threagile YAML, OTM interchange JSON) — pick whichever the consuming gate actually validates. None of the five sibling skills produces any of these formats — `/mermaid-ai-orchestration` and `/html-interactive-ai-orchestration` produce human-reader DFDs only (each carries a matching not-for-deterministic-adjudication note). Until a dedicated skill exists, author the threat-model schema directly in-thread and flag to Krystal that the corpus gap is being exercised; do not route gate-consumed threat-model DFDs to any sibling skill.

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
| "Medium (10–20 nodes), shipped to ops or PM" | PlantUML; Mermaid OK up to ~15 |
| "Large (20+ nodes), publication or audit" | Graphviz |
| "Compliance / regulatory / formal review" | BPMN (notation auditors recognize) |
| "Stakeholder presentation, want zoom / drill-down" | HTML-interactive |

If after the questions multiple formats are still viable: **default to Mermaid** (lowest friction; renders in-thread; good enough for the majority of AI-orchestration cases). Note the alternatives so the user can switch later. **This default applies to the human-reader path (Q0) only** — never default a validator/gate-consumed artifact to Mermaid; it has no machine-readable AST export for flowcharts (mermaid-js/mermaid-cli#978) and cannot be deterministically adjudicated.

## Workflow

1. **Detect format-ambiguity.** If user named a format already, redirect to that individual skill and stop. Otherwise continue.
2. **Run routing decision tree.** Ask Q0 (human reader vs deterministic validator) first; a validator answer takes the gate path and ends the tree. Otherwise ask Q1; if format is uniquely indicated, skip to step 4. Otherwise ask Q2, then Q3.
3. **Confirm format with user** before invoking the individual skill. Format: "Routing to `/<format>-ai-orchestration` because [reason]. Switch?" — one-line. User says "yes" / "use <other>" / "switch to <other>".
4. **Invoke the sibling skill.** Pass the user's original description as input. Let the sibling skill produce the diagram.
5. **Optional: offer multi-format render.** If the user's use case spans multiple formats (e.g., "I want this in both Mermaid for the README and Graphviz for the slide deck"), offer to invoke both skills in sequence.

## Anti-patterns

- **Don't re-implement what the individual skill does.** This skill ROUTES; it does not produce diagrams directly. (One exception, by design: gate-consumed threat-model DFDs have no sibling skill — per the Q0 guidance note, those are authored directly in-thread until a dedicated skill exists.)
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
A few quick routing questions:
0. Who consumes it — a human reader, or a deterministic validator/gate (machine-linted intake, CI schema check)?
1. (If human) Where will this be consumed? (markdown doc / standalone image / interactive page / formal business-process model)
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
- Updated 2026-06-10 (v0.2.0, gate-95): added Q0 human-reader-vs-deterministic-validator routing branch + gate path + threat-model-DFD gap note, per June 2026 PipeKill research on machine-linted intake gates (Mermaid AST gap: mermaid-js/mermaid-cli#978; governance DFDs need Threat Dragon JSON / pytm). Q3 node thresholds reconciled to the corpus-wide ~15–20 Mermaid→Graphviz handoff (was 10–25 / 25+).

## Related skills

- `/mermaid-ai-orchestration`
- `/graphviz-ai-orchestration`
- `/plantuml-ai-orchestration`
- `/bpmn-ai-orchestration`
- `/html-interactive-ai-orchestration`

## Related rules

- `file-naming-and-versioning` — applies when saving the final diagram to a file
- `no-silent-execution` — every routing decision surfaces in-thread before invoking sibling
