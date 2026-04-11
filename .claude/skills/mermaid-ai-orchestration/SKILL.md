---
name: mermaid-ai-orchestration
description: Use this skill to generate Mermaid diagrams for AI pipeline orchestration, agentic workflows, multi-model routing, and dependency-aware sequenced pipelines. Triggers on 'mermaid diagram', 'pipeline DAG', 'flowchart for pipeline', 'dependency graph in mermaid', 'visualize the pipeline', 'diagram this workflow', 'DFD in mermaid', or when the user describes an AI workflow and wants an in-thread or markdown-embeddable diagram. Produces industry-standard DAGs, flowcharts, sequence diagrams, and basic DFDs using Mermaid syntax.
version: 0.1.0
---

# Mermaid AI Orchestration Diagrams

## Purpose

Generate professional, industry-standard Mermaid diagrams for AI pipeline orchestration. This skill encodes both Mermaid syntax AND the domain knowledge of agentic orchestration, multi-model workflows, and dependency-aware sequenced pipelines — so Claude can produce a correct diagram from a plain-language description of the workflow.

## Rendering

Mermaid renders natively in: GitHub markdown, GitLab, VS Code (with extension), Notion, Obsidian, and many documentation platforms. Claude can produce Mermaid in-thread (inside a ```mermaid fenced block) or as a standalone .md file.

## When to Use Mermaid (vs. Other Diagram Types)

| Use Case | Mermaid? | Why / Why Not |
|---|---|---|
| Full pipeline dependency map (DAG) | **Yes — primary use** | Shows all pipelines, dependencies, parallel branches |
| Per-step flowchart within a pipeline | **Yes** | Decision diamonds, process boxes, conditional paths |
| Sequence of model calls (who calls what) | **Yes** | `sequenceDiagram` shows request/response between agents |
| Human-AI swimlane orchestration | **Limited** | Mermaid swimlanes are basic — use BPMN or PlantUML for rich lanes |
| Complex dependency graph (50+ nodes) | **No** | Use Graphviz for dense graphs — Mermaid layout struggles at scale |
| Interactive exploration with zoom/click | **No** | Use HTML+JS (D3.js) for interactivity |
| Basic data flow diagram (DFD) | **Yes** | Mermaid flowcharts can approximate DFD notation |
| Formal I/O mapping per pipeline step | **Partial** | Mermaid can show it; full DFD is better in HTML+JS |

## Domain: AI Pipeline Orchestration Patterns

When the user describes an AI workflow, map their description to these standard patterns:

### Node Types

| Pattern | Mermaid Shape | Example |
|---|---|---|
| Pipeline / major stage | Rounded rectangle `([text])` or stadium `([text])` | `P1([Source Content Analysis])` |
| Processing step | Rectangle `[text]` | `step1[Extract key concepts]` |
| Decision / gate | Diamond `{text}` | `gate1{Human QA: Pass?}` |
| Human review point | Hexagon `{{text}}` | `review1{{SME Review}}` |
| Model / agent | Subroutine `[[text]]` | `model1[[Claude Opus 4.6]]` |
| Data store / knowledge base | Cylinder `[(text)]` | `kb[(Source Documents)]` |
| External input/output | Parallelogram `[/text/]` | `input[/Legislation PDF/]` |
| Start / end | Circle `((text))` | `start((Begin))` |

### Edge Types

| Relationship | Mermaid Arrow | When to Use |
|---|---|---|
| Deterministic dependency | `-->` | P1 must complete before P2 starts |
| Conditional path | `-.->` | Only if QA passes |
| Data flow | `==>` (thick) | Showing what data feeds between steps |
| Bidirectional | `<-->` | Feedback loops, iterative refinement |
| Labeled dependency | `-->|label|` | `P1 -->|feeds curriculum map| P2` |

### Subgraph Patterns

Use subgraphs to group related steps — especially for:
- **Phase grouping**: `subgraph Phase1[Phase 1: Foundation]`
- **Parallel branches**: Multiple subgraphs at the same level
- **Model assignment**: `subgraph Claude_Opus[Claude Opus 4.6 Thread]`
- **Pipeline containment**: `subgraph P3[Pipeline 3: Instructional Design]`

## Diagram Types Available

### 1. Flowchart / DAG (most common for pipelines)

```
graph LR
    P1([Pipeline 1]) --> P2([Pipeline 2])
    P2 --> P3([Pipeline 3])
    P3 --> P5([Pipeline 5])
    P5 --> P4([Pipeline 4])
    P5 --> P6([Pipeline 6])
    P4 --> P7([Pipeline 7])
    P6 --> P7
```

Direction options: `LR` (left-right), `TD` (top-down), `RL`, `BT`

### 2. Sequence Diagram (for model call chains)

```
sequenceDiagram
    participant User
    participant Orchestrator
    participant Claude as Claude Opus
    participant Haiku as Claude Haiku

    User->>Orchestrator: Submit source content
    Orchestrator->>Claude: P1: Analyze source material
    Claude-->>Orchestrator: Analysis complete
    Orchestrator->>Haiku: P2: Generate metadata
    Haiku-->>Orchestrator: Metadata ready
    Orchestrator->>Claude: P3: Design curriculum
    Note over Orchestrator,Claude: Human QA gate here
```

### 3. Gantt Chart (for timeline/scheduling)

```
gantt
    title Pipeline Execution Timeline
    dateFormat YYYY-MM-DD
    section Foundation
        P1 Source Analysis    :p1, 2026-01-01, 2d
        P2 Curriculum Arch    :p2, after p1, 3d
    section Design
        P3 Instructional Design :p3, after p2, 4d
```

### 4. Basic DFD (using flowchart notation)

For data flow diagrams showing inputs/outputs per step:

```
graph LR
    subgraph Inputs
        doc1[/Source Legislation/]
        doc2[/Prompt Template/]
        doc3[(Knowledge Base)]
    end

    subgraph Process
        step1[P1: Source Analysis]
    end

    subgraph Outputs
        out1[/Content Map/]
        out2[/Gap Analysis/]
    end

    doc1 ==> step1
    doc2 ==> step1
    doc3 ==> step1
    step1 ==> out1
    step1 ==> out2
```

## Styling

### Color Coding by Role

```
%% After the diagram definition:
style P1 fill:#4A90D9,stroke:#2C5F8A,color:#fff
style gate1 fill:#F5A623,stroke:#D4891A,color:#fff
style review1 fill:#7ED321,stroke:#5B9A18,color:#fff

%% Or use classDef for reusable styles:
classDef pipeline fill:#4A90D9,stroke:#2C5F8A,color:#fff
classDef gate fill:#F5A623,stroke:#D4891A,color:#fff
classDef human fill:#7ED321,stroke:#5B9A18,color:#fff
classDef model fill:#9B59B6,stroke:#7D3C98,color:#fff
classDef data fill:#E8E8E8,stroke:#999,color:#333

class P1,P2,P3 pipeline
class gate1,gate2 gate
class review1 human
```

### Recommended Color Palette for AI Orchestration

| Element | Color | Hex |
|---|---|---|
| Pipeline / stage | Blue | `#4A90D9` |
| Decision / gate | Amber | `#F5A623` |
| Human review | Green | `#7ED321` |
| AI model / agent | Purple | `#9B59B6` |
| Data store | Light gray | `#E8E8E8` |
| Error / exception | Red | `#E74C3C` |
| External input | Teal | `#1ABC9C` |

## Workflow

1. **Receive description.** User describes the AI workflow, pipeline structure, or orchestration pattern.
2. **Identify diagram type.** DAG/flowchart for dependencies, sequence for call chains, Gantt for timelines, flowchart-DFD for I/O mapping.
3. **Map to domain patterns.** Identify pipelines, gates, models, parallel branches, data flows from the description.
4. **Select node shapes.** Use the node type table above to assign correct shapes.
5. **Generate Mermaid code.** Produce the complete diagram in a ```mermaid fenced block.
6. **Apply styling.** Add color coding using classDef for role-based visual distinction.
7. **Present in-thread** inside a mermaid code block, OR save as .md file if requested.

## Output Format

Always wrap the diagram in a mermaid fenced block:

````
```mermaid
graph LR
    ...
```
````

If saving to a file, use the standard naming convention:
`[PREFIX_]Diagram_Description_YYYY-MM-DD_vXX_I.md`
