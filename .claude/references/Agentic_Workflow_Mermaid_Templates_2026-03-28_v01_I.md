# Agentic Workflow Mermaid Templates
> Source: https://github.com/ThibautMelen/agentic-workflow-patterns
> Extracted: 2026-03-28

---

## Color Legend (used across all diagrams)

| Class | Color | Meaning |
|-------|-------|---------|
| `user` | Indigo `#6366f1` | User / input / output |
| `main` | Purple `#8b5cf6` | Main agent (orchestrator) |
| `subagent` | Pink `#ec4899` | Subagent (worker) |
| `parallel` | Blue `#3b82f6` | Parallel worker (identical clone) |
| `state` | Green `#10b981` | State / success / result |
| `gate` | Amber `#f59e0b` | Gate / checkpoint |
| `exit` | Red `#ef4444` | Exit / failure |
| `data` | Cyan `#06b6d4` | Data / environment |
| `idle` | Slate `#94a3b8` | Idle / inactive handler |

---

## 1. Foundations: Augmented LLM

### 1a. The Augmented LLM (Building Block)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart TB
    classDef retrieval fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#ffffff
    classDef tools fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#ffffff
    classDef memory fill:#06b6d4,stroke:#0891b2,stroke-width:2px,color:#ffffff
    classDef llm fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#ffffff

    R[("Retrieval<br/>RAG, search")]:::retrieval
    T{{"Tools<br/>MCP, Bash"}}:::tools
    M[/"Memory<br/>Context"/]:::memory

    LLM(["LLM<br/>Generates • Selects • Decides"]):::llm

    R --> LLM
    T --> LLM
    M --> LLM
```

### 1b. Agent Hierarchy (Flat — No Nested Subagents)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart LR
    classDef user fill:#6366f1,stroke:#4f46e5,stroke-width:2px,color:#ffffff
    classDef main fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#ffffff
    classDef sub fill:#ec4899,stroke:#db2777,stroke-width:2px,color:#ffffff
    classDef blocked fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#ffffff

    U1["🙋‍♀️📥 User"]:::user
    MA["🐔 Main Agent"]:::main
    SA["🐦 Subagent"]:::sub
    U2["💁‍♀️📤 User"]:::user

    U1 -->|request| MA
    MA -->|"🪺 spawn"| SA
    SA -->|result| MA
    MA -->|response| U2

    SA x-.-x|"❌ cannot spawn"| SA2["🐦 Subagent"]:::blocked
```

> **Rule:** Subagents CANNOT spawn other subagents (flat hierarchy only)

---

## 2. Baseline (Direct Execution)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart LR
    classDef user fill:#6366f1,stroke:#4f46e5,stroke-width:2px,color:#ffffff
    classDef main fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#ffffff

    USER["🙋‍♀️📥 User Request"]:::user --> MA["🐔💭 Main Agent"]:::main
    MA -->|"🐔📤"| OUT["💁‍♀️📤 User Receives"]:::user
```

> Single LLM call, no orchestration. Use for simple one-step tasks.

---

## 3. Prompt Chaining

### 3a. Sequential Chain with Gates

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart LR
    classDef user fill:#6366f1,stroke:#4f46e5,stroke-width:2px,color:#ffffff
    classDef main fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#ffffff
    classDef gate fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#ffffff
    classDef exit fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#ffffff

    USER["🙋‍♀️📥"]:::user --> P1["🐔💭 Step 1"]:::main
    P1 -->|"🐔📤"| G1{"🚧 Gate"}:::gate
    G1 -->|Pass| P2["🐔💭 Step 2"]:::main
    G1 -.->|Fail| EXIT["❌ Exit"]:::exit
    P2 -->|"🐔📤"| G2{"🚧 Gate"}:::gate
    G2 -->|Pass| P3["🐔💭 Step 3"]:::main
    G2 -.->|Fail| EXIT
    P3 -->|"🐔📤"| OUT["💁‍♀️📤"]:::user
```

### 3b. Variant — Wizard Workflow (Human Confirmation at Each Phase)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
stateDiagram-v2
    [*] --> Analysis: 🙋‍♀️📥 User Request

    Analysis --> Confirm1: Present findings
    Confirm1 --> Planning: 🙆‍♀️✅ User approves
    Confirm1 --> Analysis: 🙆‍♀️❓ User requests changes

    Planning --> Confirm2: Present plan
    Confirm2 --> Implementation: 🙆‍♀️✅ User approves
    Confirm2 --> Planning: 🙆‍♀️❓ User requests changes

    Implementation --> Confirm3: Show changes
    Confirm3 --> Verification: 🙆‍♀️✅ User approves
    Confirm3 --> Implementation: 🙆‍♀️❓ User requests changes

    Verification --> [*]: ✅ Complete
```

> Use Wizard for destructive operations, complex refactoring, multi-stakeholder decisions.

---

## 4. Routing

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart TB
    classDef user fill:#6366f1,stroke:#4f46e5,stroke-width:2px,color:#ffffff
    classDef main fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#ffffff
    classDef subagent fill:#ec4899,stroke:#db2777,stroke-width:2px,color:#ffffff
    classDef idle fill:#94a3b8,stroke:#64748b,stroke-width:2px,color:#ffffff

    INPUT["🙋‍♀️📥 User Request"]:::user --> ROUTER{"🐔🚦 Classify & Route"}:::main

    ROUTER -.->|"Type A"| HA["🐦💤 Handler A"]:::idle
    ROUTER -->|"🐔🪺 Type B"| HB["🐦⚡ Handler B"]:::subagent
    ROUTER -.->|"Type C"| HC["🐦💤 Handler C"]:::idle
    ROUTER -.->|"Unknown"| DEFAULT["🐔💤 Default"]:::idle

    HB -->|"🐦📤"| FINAL["💁‍♀️📤 User Receives"]:::user
```

> One input takes ONE track. Use when distinct categories exist and classification is reliable.

---

## 5. Parallelization

### 5a. Core Concept (Split + Merge)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart LR
    classDef user fill:#6366f1,stroke:#4f46e5,stroke-width:2px,color:#ffffff
    classDef main fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#ffffff
    classDef parallel fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#ffffff

    IN["🙋‍♀️📥"]:::user --> SPLIT["🐔🔀 Split"]:::main
    SPLIT -->|"🐔🪺"| A["🐦⚡"]:::parallel
    SPLIT -->|"🐔🪺"| B["🐦⚡"]:::parallel
    SPLIT -->|"🐔🪺"| C["🐦⚡"]:::parallel
    A -->|"🐦📤"| MERGE["🐔🌀 Merge"]:::main
    B -->|"🐦📤"| MERGE
    C -->|"🐦📤"| MERGE
    MERGE -->|"🐔📤"| OUT["💁‍♀️📤"]:::user
```

### 5b. Type 1 — Sectioning (Split Data, Combine All)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart LR
    classDef user fill:#6366f1,stroke:#4f46e5,stroke-width:2px,color:#ffffff
    classDef main fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#ffffff
    classDef parallel fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#ffffff

    S_IN["🙋‍♀️📥 100 files"]:::user --> S_SPLIT["🐔🛤️"]:::main
    S_SPLIT -->|"🐔🪺"| S1["🐦⚡ Files 1-50"]:::parallel
    S_SPLIT -->|"🐔🪺"| S2["🐦⚡ Files 51-100"]:::parallel
    S1 -->|"🐦📤"| S_MERGE["🐔🌀 Combine ALL"]:::main
    S2 -->|"🐦📤"| S_MERGE
    S_MERGE -->|"🐔📤"| S_OUT["💁‍♀️📤"]:::user
```

### 5c. Type 2 — Voting (Same Task, Pick Best)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart LR
    classDef user fill:#6366f1,stroke:#4f46e5,stroke-width:2px,color:#ffffff
    classDef main fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#ffffff
    classDef parallel fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#ffffff
    classDef success fill:#10b981,stroke:#059669,stroke-width:2px,color:#ffffff

    V_IN["🙋‍♀️📥 Write headline"]:::user --> V_COPY["🐔🔀 3 attempts"]:::main
    V_COPY -->|"🐔🪺"| V1["🐦⚡ Version A"]:::parallel
    V_COPY -->|"🐔🪺"| V2["🐦⚡ Version B"]:::parallel
    V_COPY -->|"🐔🪺"| V3["🐦⚡ Version C"]:::parallel
    V1 -->|"🐦📤"| VOTE{"🐔🗳️ Compare"}:::main
    V2 -->|"🐦📤"| VOTE
    V3 -->|"🐦📤"| VOTE
    VOTE -->|"🐔✅ B wins"| BEST["🏆 Best"]:::success
```

### 5d. Variant — Parallel Tool Calling

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart TB
    classDef main fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#ffffff
    classDef state fill:#10b981,stroke:#059669,stroke-width:2px,color:#ffffff

    MA["🐔 Main Agent"]:::main -->|Single Message| TOOLS

    subgraph TOOLS["🚂 Parallel Tool Calls"]
        T1["🔧 Read file1.ts"]
        T2["🔧 Read file2.ts"]
        T3["🔧 Read file3.ts"]
    end

    T1 --> RESULTS["✅ All Results"]:::state
    T2 --> RESULTS
    T3 --> RESULTS

    RESULTS --> MA

    classDef toolbox fill:#dbeafe,stroke:#3b82f6,stroke-width:2px,color:#1e40af
    TOOLS:::toolbox
```

### 5e. Variant — Master-Clone (Isolated Domains)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart TB
    classDef main fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#ffffff
    classDef subagent fill:#ec4899,stroke:#db2777,stroke-width:2px,color:#ffffff
    classDef state fill:#10b981,stroke:#059669,stroke-width:2px,color:#ffffff

    MA["🐔 Main Agent"]:::main

    MA -->|"Context: fr-FR"| C1["🐦 Clone: fr-FR"]:::subagent
    MA -->|"Context: es-ES"| C2["🐦 Clone: es-ES"]:::subagent
    MA -->|"Context: de-DE"| C3["🐦 Clone: de-DE"]:::subagent

    C1 -->|9 files| R1[Result: fr-FR]
    C2 -->|9 files| R2[Result: es-ES]
    C3 -->|9 files| R3[Result: de-DE]

    R1 --> MERGE["✅ Merge Results"]:::state
    R2 --> MERGE
    R3 --> MERGE

    MERGE --> MA
```

---

## 6. Orchestrator-Workers

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart TB
    classDef user fill:#6366f1,stroke:#4f46e5,stroke-width:2px,color:#ffffff
    classDef main fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#ffffff
    classDef subagent fill:#ec4899,stroke:#db2777,stroke-width:2px,color:#ffffff

    INPUT["🙋‍♀️📥 Review this PR"]:::user --> ORCH["🐔 Main Agent"]:::main

    ORCH -->|"🐔🪺 Check vulns"| W1["🐦🔒 Security Expert"]:::subagent
    ORCH -->|"🐔🪺 Check perf"| W2["🐦⚡ Performance Expert"]:::subagent
    ORCH -->|"🐔🪺 Check style"| W3["🐦🎨 Style Expert"]:::subagent

    W1 -->|"🐦📤 2 SQLi found"| SYNTH["🐔🌀 Synthesize"]:::main
    W2 -->|"🐦📤 O(n²) loop"| SYNTH
    W3 -->|"🐦📤 3 violations"| SYNTH

    SYNTH -->|"🐔📤"| OUTPUT["💁‍♀️📤 Final Report"]:::user
```

> Different specialists collaborate. Subtasks determined dynamically by the orchestrator.

---

## 7. Evaluator-Optimizer

### 7a. Main Generate-Evaluate Loop

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart TB
    classDef user fill:#6366f1,stroke:#4f46e5,stroke-width:2px,color:#ffffff
    classDef data fill:#06b6d4,stroke:#0891b2,stroke-width:2px,color:#ffffff
    classDef main fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#ffffff
    classDef wizard fill:#14b8a6,stroke:#0d9488,stroke-width:2px,color:#ffffff
    classDef success fill:#10b981,stroke:#059669,stroke-width:2px,color:#ffffff
    classDef error fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#ffffff

    INPUT["🙋‍♀️📥 Task"]:::user --> GEN["🐔💭 Generate"]:::main
    GEN --> CAND["🐔📤 Candidate"]:::data
    CAND --> EVAL{"🐔🩻 Evaluate"}:::wizard

    EVAL -->|"🐔✅ Pass"| OUTPUT["💁‍♀️📤 Output"]:::success
    EVAL -->|"🐔❌ Fail"| FEEDBACK["🐔🔄 Feedback"]:::error
    FEEDBACK --> GEN
```

### 7b. Detailed Sequence

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
sequenceDiagram
    participant U as 🙋‍♀️ User
    participant G as 🐔💭 Generator
    participant E as 🐔🩻 Evaluator

    U->>G: 🙋‍♀️📥 Request
    loop 🔄 Until quality threshold
        G->>G: 🐔💭 Generate candidate
        G->>E: 🐔📤 Submit for evaluation
        E->>E: 🐔👀 Score candidate
        alt ✅ Score >= threshold
            E->>U: 💁‍♀️📤 Accept
        else ❌ Score < threshold
            E->>G: 🐔🔄 Feedback for improvement
        end
    end
```

### 7c. Variant — Self-Correction Chain

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
sequenceDiagram
    participant U as 🙋‍♀️ User
    participant G as 🐔💭 Generator
    participant R as 🐔🔍 Reviewer

    U->>G: 🙋‍♀️📥 "Summarize this research paper"
    G->>G: 🐔💭 Generate summary
    G->>R: 🐔📤 Submit for self-review
    R->>R: 🐔🔍 Check accuracy, clarity, completeness
    alt ✅ Quality OK
        R->>U: 💁‍♀️📤 Final summary
    else ❌ Issues found
        R->>G: 🐔🔄 "Missing methodology details"
        G->>G: 🐔💭 Regenerate with feedback
        G->>R: 🐔📤 Submit improved version
    end
```

---

## 8. Autonomous Agent

### 8a. Plan-Act-Observe-Reflect Loop

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart TB
    classDef user fill:#6366f1,stroke:#4f46e5,stroke-width:2px,color:#ffffff
    classDef data fill:#06b6d4,stroke:#0891b2,stroke-width:2px,color:#ffffff
    classDef main fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#ffffff
    classDef state fill:#10b981,stroke:#059669,stroke-width:2px,color:#ffffff
    classDef wizard fill:#14b8a6,stroke:#0d9488,stroke-width:2px,color:#ffffff

    GOAL["🙋‍♀️📥 Goal"]:::user --> PLAN["🐔📋 Plan"]:::main
    PLAN --> ACT["🐔⚡ Act"]:::state
    ACT --> ENV["🌍 Environment"]:::data
    ENV --> OBSERVE["🐔👀 Observe"]:::data
    OBSERVE --> REFLECT{"🐔💭 Reflect"}:::wizard

    REFLECT -->|"🐔🔄 Adjust"| PLAN
    REFLECT -->|"🐔▶️ Continue"| ACT
    REFLECT -->|"🐔✅ Done"| DONE["💁‍♀️📤 Result"]:::user
```

### 8b. Agent Loop State Diagram

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
stateDiagram-v2
    [*] --> Planning: 🙋‍♀️📥 Receive goal
    Planning --> Executing: 🐔📋 Create plan
    Executing --> Observing: 🐔⚡ Take action
    Observing --> Reflecting: 🐔👀 Get feedback
    Reflecting --> Planning: 🐔🔄 Adjust
    Reflecting --> Executing: 🐔▶️ Continue
    Reflecting --> [*]: 💁‍♀️📤 Goal achieved
```

---

## 9. Multi-Window Context (Session Persistence)

### 9a. Cross-Session Resume

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart TB
    classDef checkpoint fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#ffffff
    classDef state fill:#10b981,stroke:#059669,stroke-width:2px,color:#ffffff

    subgraph Session1["Session 1"]
        S1P1["🏗️ Phase 1"] --> S1CP["🖥️ Checkpoint"]:::checkpoint
        S1CP --> S1P2["🔗 Phase 2"]
        S1P2 --> INTERRUPT["❌ Interrupt"]
    end

    subgraph Session2["Session 2 (Resume)"]
        RESUME["🔄 Resume"] --> S2P2["Continue Phase 2"]
        S2P2 --> S2P3["📝 Phase 3"]
        S2P3 --> DONE["✅ Complete"]
    end

    S1CP -.->|💾 State saved| STATE[("💾 State Store")]:::state
    STATE -.->|💾 State loaded| RESUME

    classDef session1Box fill:#fef2f2,stroke:#ef4444,stroke-width:2px,color:#991b1b
    classDef session2Box fill:#ecfdf5,stroke:#10b981,stroke-width:2px,color:#065f46

    Session1:::session1Box
    Session2:::session2Box
```

### 9b. Checkpointing for Long Workflows

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart LR
    classDef checkpoint fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#ffffff

    subgraph Workflow
        P1["🏗️ Phase 1"] --> CP1["🖥️ Checkpoint"]:::checkpoint
        CP1 --> P2["🔗 Phase 2"]
        P2 --> CP2["🖥️ Checkpoint"]:::checkpoint
        CP2 --> P3["📝 Phase 3"]
    end

    FAIL["❌ Failure/Interrupt"] -.->|Resume from| CP2
```

---

## 10. Implementation Components

### 10a. Hook — Pre/Post Execution Intercept

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
sequenceDiagram
    participant U as 🙋‍♀️ User
    participant H1 as 🪝 Pre-Hook
    participant A as 🐔 Main Agent
    participant T as 🔧 Tool
    participant H2 as 🪝 Post-Hook

    U->>H1: 🙋‍♀️📥 Prompt received
    H1->>A: Context injected
    A->>T: 🐔🔧 Execute tool
    T->>H2: Tool completed
    H2->>U: 💁‍♀️📤 Final response
```

> Hook events: `PreToolUse`, `PostToolUse`, `PermissionRequest`, `UserPromptSubmit`

### 10b. Skill — Dynamic Methodology Injection

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart TB
    classDef user fill:#6366f1,stroke:#4f46e5,stroke-width:2px,color:#ffffff
    classDef main fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#ffffff
    classDef skill fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#ffffff
    classDef decision fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#ffffff

    REQ["🙋‍♀️📥 User Request"]:::user --> CHECK{"📚 Skill Applicable?"}:::decision
    CHECK -->|Yes| LOAD["📚 Load Skill"]:::skill
    CHECK -->|No| DIRECT["🐔⚡ Direct Execution"]:::main
    LOAD --> APPLY["🐔📚 Apply Methodology"]:::main
    APPLY --> EXEC["🐔⚡ Execute with Skill"]:::main
    EXEC --> RESULT["💁‍♀️📤 Enhanced Result"]
    DIRECT --> RESULT
```

### 10c. Skill — Progressive Matching

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart TB
    classDef main fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#ffffff
    classDef skill fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#ffffff
    classDef decision fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#ffffff

    REQ["🙋‍♀️📥 User Request"] --> MA["🐔 Main Agent"]:::main
    MA --> CHECK{"📚 Match Skills?"}:::decision

    CHECK -->|TDD Task| TDD["📚 test-driven-development"]:::skill
    CHECK -->|Debug Task| DEBUG["📚 systematic-debugging"]:::skill
    CHECK -->|Review Task| REVIEW["📚 code-review"]:::skill
    CHECK -->|None| DIRECT[Direct Execution]

    TDD --> EXEC["✅ Enhanced Execution"]
    DEBUG --> EXEC
    REVIEW --> EXEC
    DIRECT --> EXEC
```

### 10d. Slash Command — Trigger to Execution

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
flowchart LR
    classDef user fill:#6366f1,stroke:#4f46e5,stroke-width:2px,color:#ffffff
    classDef main fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#ffffff

    U["🙋‍♀️📥 /generate fr-FR"]:::user --> CMD["🦴 Slash Command"]:::user
    CMD --> MA["🐔💭 Main Agent"]:::main
    MA --> W["Workflow Execution"]
    W --> R["💁‍♀️📤 Result"]
```

### 10e. Subagent — Spawn and Return

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
sequenceDiagram
    participant U as 🙋‍♀️ User
    participant MA as 🐔 Main Agent
    participant SA as 🐦 Subagent
    participant T as 🔧 Tools

    U->>MA: "Review my code"
    MA->>SA: 🪺 Task(subagent_type="code-reviewer")
    SA->>T: Read, Grep, Glob
    T-->>SA: Results
    SA-->>MA: 🐦📤 Review Report
    MA-->>U: 💁‍♀️📤 "Here's the review..."
```

### 10f. Subagent — Resume Across Sessions

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'lineColor': '#64748b'}}}%%
sequenceDiagram
    participant MA as 🐔 Main Agent
    participant SA as 🐦 Subagent
    participant FS as 💾 File System

    MA->>SA: Task(prompt="Research X")
    SA->>SA: Work on task...
    SA-->>MA: Return result + agentId
    SA->>FS: Save transcript (agent-{id}.jsonl)

    Note over MA,FS: Later...

    MA->>SA: Task(resume="abc123", prompt="Continue with Y")
    FS-->>SA: Load previous transcript
    SA->>SA: Resume with full context
    SA-->>MA: Return continued result
```
