---
name: bpmn-ai-orchestration
description: Use this skill to generate BPMN 2.0 XML diagrams for AI pipeline orchestration with human-AI swimlanes, decision gateways, exception handling, and multi-model thread assignment. Triggers on 'BPMN diagram', 'swimlane diagram', 'orchestration swimlanes', 'human-AI workflow diagram', 'BPMN for pipeline', 'enterprise workflow diagram', 'process model for AI', or when the user needs formal notation showing WHO does WHAT (human vs. AI agent vs. model) with gates and exception paths. Produces BPMN 2.0 XML importable into bpmn.io, Camunda, or Flowable.
version: 0.1.0
---

# BPMN AI Orchestration Diagrams

## Purpose

Generate professional, ISO-standard BPMN 2.0 XML for AI pipeline orchestration. This skill encodes both BPMN syntax AND the domain knowledge of agentic orchestration, multi-model workflows, and dependency-aware sequenced pipelines — so Claude can produce correct BPMN XML from a plain-language description of who does what, with what model, through what gates.

## Rendering

BPMN XML is rendered in:
- **bpmn.io** (free, browser-based) — paste XML or upload .bpmn file
- **Camunda Modeler** (free desktop app) — full BPMN editing
- **Flowable** — enterprise orchestration platform with AI extensions
- **Signavio, Bizagi, Lucidchart** — enterprise process modeling tools

Claude generates the XML as a code block or saves it as a `.bpmn` file.

## When to Use BPMN (vs. Other Diagram Types)

| Use Case | BPMN? | Why / Why Not |
|---|---|---|
| Human-AI orchestration (who does what) | **Yes — primary use** | Swimlanes formalize actor assignment |
| Decision gateways / QA gates | **Yes** | Exclusive/inclusive/parallel gateways are first-class |
| Exception handling paths | **Yes** | Error events, compensation, escalation built-in |
| Multi-model thread assignment | **Yes** | Each model gets its own lane |
| Dual-mode execution (ET vs. ST) | **Yes** | Conditional branching with gateway notation |
| Simple pipeline dependency DAG | **No** | Use Mermaid — BPMN is overkill for pure dependency graphs |
| Interactive exploration | **No** | Use HTML+JS for zoom/click interactivity |
| Quick in-thread sketch | **No** | Use Mermaid — BPMN XML is verbose and needs a renderer |

## Domain: AI Pipeline Orchestration Patterns

### BPMN Elements Mapped to AI Orchestration

| AI Concept | BPMN Element | Symbol |
|---|---|---|
| Pipeline / major stage | **Pool** or **Subprocess** | Rectangle container |
| Processing step | **Task** (Service Task for AI, User Task for human) | Rounded rectangle |
| Human QA gate | **User Task** + **Exclusive Gateway** | Person icon + diamond |
| Model routing decision | **Exclusive Gateway** | Diamond with X |
| Parallel execution | **Parallel Gateway** | Diamond with + |
| Conditional branching (ET vs. ST) | **Inclusive Gateway** | Diamond with O |
| AI agent / model | **Swimlane (Lane)** | Horizontal band within pool |
| Human reviewer | **Swimlane (Lane)** | Horizontal band within pool |
| Orchestrator | **Swimlane (Lane)** | Horizontal band within pool |
| Error / exception | **Error Boundary Event** | Circle with lightning bolt |
| Timer / deadline | **Timer Event** | Circle with clock |
| Data input | **Data Object** | Page with folded corner |
| Knowledge base | **Data Store** | Cylinder |
| Signal between pipelines | **Message Flow** | Dashed arrow with envelope |

### Swimlane Architecture for AI Workflows

Standard lane structure for multi-model orchestration:

```
Pool: [Pipeline Name]
├── Lane: Orchestrator (coordination logic)
├── Lane: Claude Opus 4.6 (complex reasoning tasks)
├── Lane: Claude Sonnet 4.6 (standard generation tasks)
├── Lane: Claude Haiku 4.5 (metadata, tagging, lightweight)
├── Lane: Human SME (review, approval, QA gates)
└── Lane: Human Orchestrator (override, exception handling)
```

### Gateway Patterns

| Pattern | Gateway Type | Use Case |
|---|---|---|
| Pass/Fail QA gate | Exclusive (XOR) | Human reviews output → approve or send back |
| ET vs. ST mode selection | Exclusive (XOR) | Route based on execution mode |
| Parallel pipeline branches | Parallel (AND) | P4 and P6 run simultaneously after P5 |
| Optional enrichment steps | Inclusive (OR) | Include if source material warrants it |
| Multi-model fan-out | Parallel (AND) | Same input sent to multiple models |

## BPMN 2.0 XML Structure

### Minimal Valid BPMN

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
             xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
             id="Definitions_1"
             targetNamespace="http://example.com/bpmn">

  <process id="Process_1" isExecutable="false">

    <!-- Lanes -->
    <laneSet id="LaneSet_1">
      <lane id="Lane_Orchestrator" name="Orchestrator">
        <flowNodeRef>StartEvent_1</flowNodeRef>
        <flowNodeRef>Task_Route</flowNodeRef>
      </lane>
      <lane id="Lane_ClaudeOpus" name="Claude Opus 4.6">
        <flowNodeRef>Task_Analyze</flowNodeRef>
      </lane>
      <lane id="Lane_HumanSME" name="Human SME">
        <flowNodeRef>Task_Review</flowNodeRef>
        <flowNodeRef>Gateway_QA</flowNodeRef>
      </lane>
    </laneSet>

    <!-- Events -->
    <startEvent id="StartEvent_1" name="Pipeline Start"/>
    <endEvent id="EndEvent_1" name="Pipeline Complete"/>

    <!-- Tasks -->
    <serviceTask id="Task_Route" name="Route to Model"/>
    <serviceTask id="Task_Analyze" name="Analyze Source Content"/>
    <userTask id="Task_Review" name="SME Quality Review"/>

    <!-- Gateways -->
    <exclusiveGateway id="Gateway_QA" name="QA Pass?"/>

    <!-- Sequence Flows -->
    <sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_Route"/>
    <sequenceFlow id="Flow_2" sourceRef="Task_Route" targetRef="Task_Analyze"/>
    <sequenceFlow id="Flow_3" sourceRef="Task_Analyze" targetRef="Task_Review"/>
    <sequenceFlow id="Flow_4" sourceRef="Task_Review" targetRef="Gateway_QA"/>
    <sequenceFlow id="Flow_5" sourceRef="Gateway_QA" targetRef="EndEvent_1" name="Pass">
      <conditionExpression>#{qaResult == 'pass'}</conditionExpression>
    </sequenceFlow>
    <sequenceFlow id="Flow_6" sourceRef="Gateway_QA" targetRef="Task_Analyze" name="Revise">
      <conditionExpression>#{qaResult == 'revise'}</conditionExpression>
    </sequenceFlow>

  </process>

  <!-- Diagram layout (required for visual rendering) -->
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <!-- Shape and edge positions go here -->
      <!-- bpmn.io will auto-layout if positions are omitted -->
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>

</definitions>
```

### Task Types

| BPMN Task | XML Element | AI Use |
|---|---|---|
| Service Task | `<serviceTask>` | AI model execution (generation, analysis) |
| User Task | `<userTask>` | Human review, approval, override |
| Script Task | `<scriptTask>` | Automated validation, format check |
| Send Task | `<sendTask>` | Notify human, trigger downstream pipeline |
| Receive Task | `<receiveTask>` | Wait for human input, external signal |
| Manual Task | `<manualTask>` | Fully manual step (e.g., print review) |
| Business Rule Task | `<businessRuleTask>` | Model routing logic, complexity scoring |

### Event Types

| Event | XML Element | AI Use |
|---|---|---|
| Start | `<startEvent>` | Pipeline begins |
| End | `<endEvent>` | Pipeline completes |
| Timer | `<timerEventDefinition>` | Deadline for human review |
| Error | `<errorEventDefinition>` | Model failure, hallucination detected |
| Signal | `<signalEventDefinition>` | Cross-pipeline coordination |
| Message | `<messageEventDefinition>` | Inter-thread communication |
| Escalation | `<escalationEventDefinition>` | Escalate to human orchestrator |

## Workflow

1. **Receive description.** User describes who does what in the AI workflow — actors, models, gates, exception paths.
2. **Identify actors.** Map humans, AI models, orchestrator to swimlanes.
3. **Identify gates.** Map QA checkpoints, routing decisions, mode selection to gateways.
4. **Identify exception paths.** Map error handling, revision loops, escalation to boundary events.
5. **Generate BPMN XML.** Produce complete, valid BPMN 2.0 XML with process definition and diagram stub.
6. **Present as code block** (```xml) or save as `.bpmn` file.

## Output Format

Always wrap in an xml fenced block:

````
```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions ...>
  ...
</definitions>
```
````

If saving to file, use `.bpmn` extension with standard naming:
`[PREFIX_]BPMN_Description_YYYY-MM-DD_vXX_I.bpmn`

## Rendering Instructions for User

After generating the XML, include:

> **To view this diagram:**
> 1. Go to [bpmn.io/modeler](https://demo.bpmn.io/) (free, no account needed)
> 2. Click the upload icon (folder) in the top-left
> 3. Paste or upload this XML
> 4. The diagram renders with auto-layout
