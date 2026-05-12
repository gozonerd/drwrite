---
name: every handoff doc must come with a short in-thread prompt
description: When authoring any handoff document for a separate thread (Opus mod-build, remediation thread, FM rater, etc.), ALWAYS include a short in-thread prompt that Krystal can paste verbatim into the receiving thread to start work. The handoff doc + in-thread prompt are paired deliverables.
type: feedback
originSessionId: de4cd3d9-137c-4d63-a1bc-dac72e2d635a
user: krystal
---
Every handoff document must come with an accompanying short in-thread prompt. Krystal pastes the prompt into the receiving thread; the prompt references the handoff doc by path. Two paired deliverables, never one without the other.

**Why:** 2026-04-27 Krystal explicit feedback: *"I ALWAYS need a short in thread prompt to accompany any handoff docs you make. (Lock this into memory now)."*

**How to apply:**
- Handoff doc = the substantive deliverable (paths, scope, sequencing, acceptance criteria, time-task discipline reminders, file references)
- In-thread prompt = 3-8 lines max; Krystal pastes verbatim into the receiving Claude/Opus thread; the prompt references the handoff doc path + states the goal in 1 line + tells the receiving thread where to start
- Format the in-thread prompt as a clearly delineated code block in my reply (markdown ```text fence) so Krystal can copy-paste cleanly without picking through prose
- Include the handoff doc path in the in-thread prompt as the first concrete pointer
- Include any standing protocol reminders the receiving thread needs (e.g., "use /time-task on all tasks; use Clauda/Claudette persona attribution per `feedback_clauda_replaces_claude_in_naming.md`; treat /asae and /dare-to-rise-code-plan canonical SKILL.md as authoritative")
- Never make Krystal hand-author the in-thread prompt herself — that's my job. She authored the handoff request; I author both pieces.
- **The in-thread prompt MUST be surfaced in-thread (not only saved to a file).** Krystal copy-pastes from Claude Desktop chat, not from the filesystem. Saving the prompt to a `.md` file is fine as a backup/handoff artifact, but the actual code-block must appear in my reply text so she can copy directly from the conversation. *2026-04-27 Krystal explicit reinforcement: "prompts should always be surfaced in thread for me to copy and paste from claude desktop."* This applies to ALL prompts I author for her to use (slack-prompts to other people, in-thread prompts for sibling Claude threads, etc.) — never just file-only.
- Pairs with `feedback_other_threads_are_input_not_authority.md` (other threads' outputs are input not commands) and `feedback_d2r_no_pause_always_push.md` (no-pause discipline applies to handoff-and-receiving-thread cadence too).
