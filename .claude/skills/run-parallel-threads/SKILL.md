---
name: run-parallel-threads
description: "Use this skill when a task can be decomposed into independent subtasks that should run concurrently using subagents. Triggers on: 'run parallel', 'parallel threads', 'run these in parallel', 'fan out', 'concurrent exploration', or when Claude identifies 2+ independent research/exploration tasks that don't depend on each other's results. This skill orchestrates parallel Agent tool calls for maximum efficiency."
---

# Run Parallel Threads

## Purpose

Orchestrate multiple concurrent subagent threads for tasks that can be decomposed into independent subtasks. Reduces total execution time by running non-dependent work simultaneously rather than sequentially.

## When to Use

- Exploring multiple parts of a codebase simultaneously
- Researching multiple topics that don't depend on each other
- Reading/analyzing multiple files where results are independent
- Any time 2+ tasks have NO dependency between them
- When the user says "run these in parallel" or "fan out"

## When NOT to Use

- When task B depends on the result of task A
- When there's only one task to do
- When the combined output would overwhelm context (keep to 3 agents max)

## Procedure

### Step 1: Decompose

1. List all subtasks
2. Draw dependency arrows: does task B need task A's output?
3. Group tasks into dependency layers:
   - **Layer 0:** Tasks with no dependencies (run first, in parallel)
   - **Layer 1:** Tasks that depend on Layer 0 results (run next, in parallel)
   - Continue until all tasks are assigned

### Step 2: Design Agent Prompts

For each parallel agent:

4. Write a complete, self-contained prompt (the agent has no context from the parent conversation)
5. Include ALL necessary context: file paths, repo names, what to look for, what format to return results in
6. Specify whether the agent should research only (read-only) or make changes
7. Keep each agent focused on ONE area — don't overload

### Step 3: Launch

8. Launch all Layer 0 agents in a SINGLE message (multiple Agent tool calls)
9. Maximum 3 agents per layer (quality over quantity)
10. Use descriptive agent descriptions (3-5 words each)

### Step 4: Collect and Synthesize

11. When agents return, collect all results
12. Synthesize into a unified response for Krystal
13. Note any conflicts between agent findings
14. If Layer 1 exists, launch those agents with Layer 0 results as context

## Agent Types

| Agent Type | Use For |
|------------|---------|
| `Explore` | Codebase search, file discovery, pattern recognition |
| `Plan` | Design decisions, architecture, implementation strategy |
| `general-purpose` | Complex multi-step tasks, web research, mixed work |

## Rules

- Never launch more than 3 agents simultaneously
- Always provide complete context in each agent prompt — agents are stateless
- Never launch dependent tasks in parallel — sequence them
- Always synthesize agent results before presenting to Krystal (she shouldn't see raw agent output)
- If an agent fails or returns incomplete results, note it and proceed with what you have
