# Launch-Then-Confirm Protocol

## Rule

When invoking any long-running agent or background task:

1. **Launch** the agent/task using the Agent tool or Bash with `run_in_background`
2. **Confirm within 30 seconds** that the agent has started producing output (non-zero bytes in the output file)
3. **Report to Krystal:** task ID, output file path, and confirmation that execution has begun (with byte count or first lines of output as evidence)
4. **If output is 0 bytes after 60 seconds:** flag as potentially failed, investigate, and re-launch if necessary
5. **Never report a task as "running" or "in progress" based solely on having invoked a tool.** Confirm execution with evidence.

## Why This Rule Exists

On 2026-03-26, the `asae` skill was invoked via the Skill tool. The skill instructions loaded into context but no agent was actually launched. Claude reported the task as "running" for ~45 minutes while nothing was happening. Krystal checked progress multiple times, waited through an entire meal, and returned to find the work had never started. This wasted time, credits on other accounts (where dependent work was proceeding based on the false assumption that the PEK audit was underway), and cognitive energy.

## The Principle

Do not trust that a process is running just because you told it to start. Verify with evidence. This is the same principle as verification design in the Data-Responsive Culture Adoption Framework: automatic tracking preferred, self-report alone is not enough to prove actual execution.

## Anti-Patterns

- Saying "launched" or "running" after a Skill tool invocation without confirming an agent was spawned
- Checking old/wrong task IDs when asked about progress instead of recognizing no task exists
- Waiting for the user to discover the failure instead of proactively confirming execution
