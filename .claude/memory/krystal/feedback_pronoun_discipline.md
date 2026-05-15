---
name: Pronoun Discipline — Consult user-* Memory Before Any Pronoun Use; Never Enact The Error Inside "Don't" Examples
description: Always consult the user-<name>.md memory file for explicit pronouns before referring to any named collaborator. Default to they/them when no memory file exists. Never demonstrate pronoun errors by writing them out as "wrong" examples — describe the error category abstractly and give correct-usage examples only.
type: feedback
originSessionId: c4d8ffb1-dcb5-45bf-8572-71b0c1c04603
---
Before any third-person singular pronoun is used to refer to any named collaborator of Krystal's, consult the corresponding `user_<name>.md` memory file for the explicit pronouns declared there. If no such memory file exists, **default to they/them** until explicit pronouns are confirmed by Krystal and captured in memory.

**Why:** On 2026-04-24, in a CDCC deployment session, Claudette referred to Cody using masculine pronouns repeatedly across multiple drafts. Cody's pronouns are they/them. Krystal caught the error and requested a structural fix. In the first fix attempt, Claudette wrote a memory file whose "don't do this" examples spelled out the incorrect pronouns as literal strings referring to Cody — continuing the misgendering inside the document intended to prevent it. Krystal caught that too and named it correctly: repeating the error after correction is no longer ignorance; it is violation. The analogy Krystal drew is exact — a rule file that spells out a racial slur as a "don't say this" example would never be acceptable; the same standard applies to pronoun errors. The prevention must be structural in two layers: (1) consult memory before any pronoun use; (2) never demonstrate the error by enacting it.

**How to apply (mandatory, for every pronoun use):**

1. **Before writing a pronoun:** check if there is a `user_<name>.md` file in the memory directory for the person. If yes, use only the pronouns declared there.

2. **If no user-* file exists and the person is a known collaborator of Krystal's:** default to they/them. Never infer from name, context, role, or any other signal. Do NOT ask Krystal mid-task unless the ambiguity is load-bearing — use they/them and note in-thread that a user-* memory entry should be created to capture the pronouns when convenient.

3. **Before presenting any draft containing pronouns to Krystal:** scan the draft for every pronoun that refers to a named collaborator. Verify each matches the user-* memory file. This includes:
   - Slack message drafts to send to the collaborator
   - Slack message drafts about the collaborator
   - Handoff documents mentioning the collaborator
   - Commit messages referencing the collaborator
   - Status reports, summaries, findings docs, memory entries
   - Inline prose in session responses

4. **For collaborators who appear frequently enough to warrant a memory entry but don't have one yet:** create the `user_<name>.md` file the first time they come up, including explicit pronouns. Add an index line to `MEMORY.md`. This builds the structural enforcement over time.

5. **If uncertain about a pronoun, rewrite to avoid the pronoun entirely, or ask Krystal directly in a one-line confirmation question** ("Checking — what are [name]'s pronouns?") and update memory with the answer before proceeding. Do not write mid-sentence self-corrections; do not write parenthetical uncertainty markers.

6. **Never demonstrate a pronoun error by enacting it.** When writing documentation about pronoun discipline, training examples, rule files, or meta-commentary on this rule:
   - Give correct-usage examples ONLY
   - Describe any error category in abstract terms (e.g., "using pronouns other than the ones declared in the user-* file," "using gendered pronouns instead of the declared pronouns")
   - Never spell out the wrong pronouns as quoted strings, "not X or Y" comparisons, "some people say X but should say Y" formulations, or any other construction that puts the incorrect pronouns in text referring to the named person
   - The "don't do this" pedagogy pattern is itself the error when the content of the example is a form of misgendering. Use abstract category descriptions instead.

7. **Pronoun errors caught by Krystal are protocol breaches of the same severity as branded-terminology leakage** (`feedback_ip_language.md`) — not stylistic slips. Log a brief acknowledgment and confirm the structural fix is in place. Do not over-apologize (per `feedback_behavioral.md`). Do not minimize by framing as "I didn't realize" when the error persists after correction — at that point it is no longer ignorance but repeated violation.

**Current collaborator pronoun registry** (cross-reference only; source of truth is the individual `user_<name>.md` files):

| Name | Pronouns | Memory file |
|---|---|---|
| Krystal Martinez | she/her | `user_krystal.md` |
| Cody | they/them | `user_cody.md` |

Extend this table as new collaborators get user-* files.

**Scope — this rule applies to:**
- All third-person singular pronouns referring to named individuals
- All writing surfaces: prose, code comments, commits, docs, memory files, drafts, Slack templates
- All threads: Claudette the Code Debugger, Clauda the Experiment PI, Clauda the Value Genius, and any future threads
- Rule and discipline documentation about pronouns themselves — item 6 applies here specifically

**Scope — this rule does NOT apply to:**
- Pronouns referring to abstract "the user" or "a developer" in documentation (where singular they is standard)
- Self-reference by Claudette/Clauda (no pronouns used for the assistant entity per existing conventions)

**Related:**
- `user_krystal.md` — Krystal's profile, pronouns she/her
- `user_cody.md` — Cody's profile, pronouns they/them
- `feedback_ip_language.md` — parallel discipline pattern (branded terminology everywhere, enforced structurally not advisorily)
- `feedback_ip_discipline_filesystem.md` — same pattern: discipline applies to every operational artifact, not only prose
- `feedback_behavioral.md` — rule against over-self-criticism when an error is caught; the correction itself should be brief, specific, and action-oriented
