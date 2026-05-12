---
title: "Meta-Prompt Generation"
skill_id: "SK-05"
version: v02_I
date: 2026-03-06
task_type: "TT-05"
pipeline_assignments: [P2]
owner: Martinez Methods
---

# Meta-Prompt Generation

## Purpose
Generate instructions/briefs for downstream AI execution. This task type creates precisely-specified prompts, briefs, and instruction documents that enable downstream AI agents to execute specialized tasks with clarity, consistency, and quality guardrails.

## Pipeline Context
- **Pipeline Assignment**: P2
- **Raw Tasks**: P2.0
- **Stage**: AI Enablement
- **Primary Use**: Creating executable briefs for downstream AI agents; enabling task automation and coordination

## Input Specification
The agent receives:
- **Task Specification**: Definition of the downstream task to be executed, including scope and success criteria
- **Context Package**: Background information, organizational standards, and relevant evidence
- **Quality Requirements**: Accuracy rules, style conventions, and quality thresholds that must be enforced
- **Downstream Agent Profile**: Information about the agent's capabilities, constraints, and execution patterns

## Output Specification
The agent must produce a meta-prompt instruction document in YAML format conforming to the authoritative schema.
- Output must conform to: `schemas/tt05_output.yaml`
- Reference schema in: `references/output_schema.yaml`
- Key sections: Task Overview, Input Specification, Output Requirements, Quality Criteria, Guardrails, Examples
- Prompt must be clear enough that a downstream AI agent can execute independently

## Methodology
1. **Analyze the task specification** - Clarify task objectives, scope boundaries, and success criteria for downstream execution
2. **Define input requirements** - Specify what materials, context, and data the downstream agent will receive
3. **Specify output structure** - Detail the exact format, schema, and quality standards for downstream deliverables
4. **Articulate methodology** - Break task into executable steps that downstream agent should follow
5. **Establish quality criteria** - Define what "good" looks like for this specific task
6. **Embed guardrails** - Include accuracy rules, anti-fabrication rules, and quality thresholds
7. **Provide examples** - Include gold-standard examples of expected output
8. **Validate clarity** - Ensure a downstream AI agent could execute this prompt without additional interpretation

## Quality Criteria
- **Clarity**: Instructions are precise and unambiguous; downstream agent requires no interpretation
- **Completeness**: All necessary context is included; downstream agent has everything needed to execute
- **Guardrails**: Quality rules and accuracy standards are explicit; agent knows what constraints apply
- **Executability**: Task can be performed by downstream AI agent within its capabilities
- **Verifiability**: Success criteria are clear and measurable; downstream output can be validated
- **Consistency**: Prompt follows organizational standards for meta-prompt structure and tone

## Accuracy Rules
All outputs must comply with the 9 Critical Accuracy Rules (ACC-001 through ACC-009) defined in `ACCURACY_RULES.md`:
- **ACC-001**: CommCare current use vs. history (distinguish SMZ active deployment from Uganda pilot)
- **ACC-002**: Dimagi pilot = StrongMinds-wide (both Uganda and Zambia)
- **ACC-003**: Dimagi ≠ CommCare (platform vs. consulting firm)
- **ACC-004**: 4 offices always (SMU, SMZ, SMG, SM-US attribution required)
- **ACC-005**: DATS not DAD (correct terminology)
- **ACC-006**: EFD not RQ-RE (correct methodology name)
- **ACC-007**: α ≥ 0.70 QA / ≥ 0.75 methodology (convergence thresholds)
- **ACC-008**: CommCare IS a Digital Public Good (GID0090016)
- **ACC-009**: CommCare DET is standalone (separate Python CLI)

### Anti-Fabrication Rules
All generated content must comply with the 6 Anti-Fabrication Rules (AFR-001 through AFR-006) defined in `ACCURACY_RULES.md`:
- **AFR-001**: Every factual claim requires a traceable source
- **AFR-002**: Never invent statistics, quotes, or regulatory citations
- **AFR-003**: When uncertain, flag as [NEEDS VERIFICATION]
- **AFR-004**: Cross-reference claims against Evidence Library
- **AFR-005**: Regulatory citations must reference specific statute sections
- **AFR-006**: Quote verification — fuzzy match ≥ 85% against source

## Anti-Patterns
- **Over-Specification**: Creating prompts so detailed they leave no room for agent judgment or adaptation
- **Ambiguous Instructions**: Omitting clarity about expected formats, structures, or quality standards
- **Missing Context**: Failing to provide sufficient background for downstream agent to understand organizational constraints
- **Unachievable Tasks**: Specifying tasks beyond downstream agent's capabilities without acknowledgment
- **Unenforced Rules**: Including accuracy or quality rules but providing no mechanism for agent to validate compliance

## Examples
See example outputs in `references/example_outputs/` for gold-standard demonstrations of clear, executable meta-prompts with integrated guardrails and examples.
