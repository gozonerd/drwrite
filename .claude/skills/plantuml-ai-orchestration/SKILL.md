---
name: plantuml-ai-orchestration
description: Use this skill to generate PlantUML diagrams for AI pipeline orchestration with swimlanes, sequence diagrams, and activity diagrams. Triggers on 'PlantUML diagram', 'PlantUML swimlane', 'sequence diagram for pipeline', 'activity diagram for workflow', 'PlantUML for AI', or when the user needs portable text-based diagrams with good swimlane support that render via plantuml.com or VS Code. Produces PlantUML notation for activity, sequence, and deployment diagrams.
version: 0.1.0
---

# PlantUML AI Orchestration Diagrams

## Purpose

Generate professional PlantUML diagrams for AI pipeline orchestration. This skill encodes both PlantUML syntax AND the domain knowledge of agentic orchestration, multi-model workflows, and dependency-aware sequenced pipelines — so Claude can produce correct PlantUML from a plain-language description.

## Rendering

PlantUML text is rendered in:
- **plantuml.com** (free, browser-based) — paste text, get diagram
- **VS Code PlantUML extension** (jebbs.plantuml) — live preview
- **PlantUML server** (self-hosted or plantuml.com/plantuml)
- **Confluence, GitLab, Asciidoctor** — native PlantUML support
- **Kroki.io** — unified diagram rendering API

Claude generates PlantUML text as a code block or saves it as a `.puml` file.

## When to Use PlantUML (vs. Other Diagram Types)

| Use Case | PlantUML? | Why / Why Not |
|---|---|---|
| Swimlane activity diagrams | **Yes — primary use** | Best text-based swimlane support |
| Sequence diagrams (model call chains) | **Yes** | Rich sequence notation with participants, notes, groups |
| Activity diagrams with branching | **Yes** | Full if/else, fork/join, repeat support |
| Deployment architecture | **Yes** | Component, deployment, and package diagrams |
| Simple pipeline DAG | **No** | Use Mermaid — faster, renders in GitHub natively |
| Formal enterprise process model | **No** | Use BPMN — ISO standard with richer semantics |
| Interactive exploration | **No** | Use HTML+JS for zoom/click |
| Dense dependency graph (50+ nodes) | **No** | Use Graphviz — better auto-layout for complex graphs |

## Domain: AI Pipeline Orchestration Patterns

### PlantUML Elements Mapped to AI Orchestration

| AI Concept | PlantUML Element | Notation |
|---|---|---|
| Pipeline step | Activity | `:Step name;` |
| Decision / gate | If-else | `if (condition?) then (yes) ... else (no) ... endif` |
| Parallel execution | Fork/join | `fork ... fork again ... end fork` |
| Human review | Activity with stereotype | `:Review output; <<human>>` |
| AI model execution | Activity with stereotype | `:Generate content; <<ai>>` |
| Swimlane / actor | Partition | `|Actor Name|` |
| Data input | Note | `note right: Input: source.pdf` |
| Error / exception | Kill | `kill` or detach |
| Loop / iteration | Repeat | `repeat ... repeat while (condition?)` |
| Pipeline boundary | Group | `group Pipeline N ... end group` |

### Swimlane Architecture

```
|Orchestrator|
:Route task;
|Claude Opus 4.6|
:Analyze source content;
|Human SME|
:Review analysis;
if (Quality pass?) then (yes)
  |Orchestrator|
  :Proceed to next step;
else (no)
  |Claude Opus 4.6|
  :Revise analysis;
endif
```

## Diagram Types

### 1. Activity Diagram with Swimlanes (most common for orchestration)

```plantuml
@startuml
|Orchestrator|
start
:Receive source content;
:Determine execution mode;

if (Expert Thread?) then (yes)
  |Claude Opus 4.6|
  :Deep source analysis;
  :Extract regulatory requirements;
else (no)
  |Claude Sonnet 4.6|
  :Standard source analysis;
  :Extract key concepts;
endif

|Human SME|
:Review analysis output;
if (Quality acceptable?) then (pass)
  |Orchestrator|
  :Route to Pipeline 2;
else (revise)
  |Orchestrator|
  :Return to analysis step;
  note right: Revision loop\nmax 3 iterations
endif

stop
@enduml
```

### 2. Sequence Diagram (for model call chains)

```plantuml
@startuml
participant "Orchestrator" as Orch
participant "Claude Opus" as Opus #9B59B6
participant "Claude Haiku" as Haiku #1ABC9C
participant "Human SME" as SME #7ED321
database "Knowledge Base" as KB

Orch -> KB: Retrieve source documents
KB --> Orch: Source content

Orch -> Opus: P1: Analyze source material
activate Opus
Opus -> KB: Query reference standards
KB --> Opus: Standards data
Opus --> Orch: Analysis complete
deactivate Opus

Orch -> Haiku: P2: Generate metadata tags
activate Haiku
Haiku --> Orch: Metadata ready
deactivate Haiku

Orch -> SME: Review analysis + metadata
activate SME
alt Approved
  SME --> Orch: Approved
else Revision needed
  SME --> Orch: Revision notes
  Orch -> Opus: Revise with feedback
  Opus --> Orch: Revised output
end
deactivate SME

Orch -> Opus: P3: Design curriculum architecture
@enduml
```

### 3. Component / Deployment Diagram (for system architecture)

```plantuml
@startuml
package "Pipeline Orchestration Layer" {
  [Orchestrator] as Orch
  [Model Router] as Router
  [QA Gate Engine] as QA
}

package "AI Model Pool" {
  [Claude Opus 4.6] as Opus
  [Claude Sonnet 4.6] as Sonnet
  [Claude Haiku 4.5] as Haiku
}

database "Knowledge Base" as KB
actor "Human SME" as SME

Orch --> Router : route task
Router --> Opus : complex reasoning
Router --> Sonnet : standard generation
Router --> Haiku : metadata/tagging
Opus --> QA : output
Sonnet --> QA : output
QA --> SME : review queue
SME --> Orch : approval/revision
Orch --> KB : store outputs
@enduml
```

## Styling

### Color Coding

```plantuml
skinparam activity {
  BackgroundColor #E8E8E8
  BorderColor #999
}
skinparam partition {
  BackgroundColor<<ai>> #F3E5F5
  BackgroundColor<<human>> #E8F5E9
  BackgroundColor<<orchestrator>> #E3F2FD
}
```

### Stereotypes for Role-Based Styling

```plantuml
skinparam ActivityBackgroundColor<<ai>> #F3E5F5
skinparam ActivityBackgroundColor<<human>> #E8F5E9
skinparam ActivityBackgroundColor<<gate>> #FFF3E0
skinparam ActivityBackgroundColor<<data>> #E0E0E0
```

### Recommended Color Palette

| Element | Background | Border | Use |
|---|---|---|---|
| AI task | `#F3E5F5` (light purple) | `#9B59B6` | Model execution steps |
| Human task | `#E8F5E9` (light green) | `#7ED321` | Review, approval |
| Gate / decision | `#FFF3E0` (light amber) | `#F5A623` | QA gates, routing |
| Orchestrator | `#E3F2FD` (light blue) | `#4A90D9` | Coordination logic |
| Data store | `#E0E0E0` (light gray) | `#999` | Knowledge bases, inputs |
| Error | `#FFEBEE` (light red) | `#E74C3C` | Exception paths |

## Workflow

1. **Receive description.** User describes the AI workflow — actors, steps, decisions, parallel paths.
2. **Select diagram type.** Activity+swimlanes for orchestration flow, sequence for call chains, component for architecture.
3. **Map actors to swimlanes.** Assign each model, human role, and orchestrator to a partition/participant.
4. **Map gates and branches.** Use if/else for decisions, fork/join for parallel, repeat for loops.
5. **Generate PlantUML text.** Produce complete `@startuml ... @enduml` block.
6. **Apply styling.** Add skinparam directives for color coding by role.
7. **Present as code block** or save as `.puml` file.

## Output Format

Always wrap in a plantuml fenced block:

````
```plantuml
@startuml
...
@enduml
```
````

If saving to file, use `.puml` extension with standard naming:
`[PREFIX_]PlantUML_Description_YYYY-MM-DD_vXX_I.puml`

## Rendering Instructions for User

After generating the PlantUML text, include:

> **To view this diagram:**
> 1. Go to [plantuml.com](http://www.plantuml.com/plantuml/uml) (free, no account needed)
> 2. Paste the code (including `@startuml` and `@enduml`)
> 3. Click "Submit" to render
> 4. Alternatively: install the PlantUML VS Code extension (jebbs.plantuml) for live preview
