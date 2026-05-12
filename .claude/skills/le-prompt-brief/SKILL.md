---
name: le-prompt-brief
description: "Use this skill when the user asks to 'generate a learning experience', 'create an LE', 'design a learning experience', 'LE prompt brief', 'make me a learning experience for', 'teach me about', 'teach Cody about', 'learning experience on [topic]', or any request to produce a structured Learning Experience prompt brief. This skill generates the prompt brief that feeds into the LE Generation Pipeline — it does NOT generate the learning experience itself."
---

# Learning Experience Prompt Brief Generator

## Purpose

Generate a structured prompt brief that provides everything an AI model needs to design a high-quality Learning Experience (LE) using Krystal's LE Generation Pipeline. The prompt brief is the INPUT to the pipeline — the pipeline then produces the actual learning materials.

## Required Inputs (Gather Before Generating)

Collect ALL of the following from the user. If any are missing, ask for them before proceeding. Do not guess or fill in defaults without explicit approval.

| Input | Description | Example |
|---|---|---|
| **Source(s) of Truth** | The authoritative instructional content the LE draws from. Official docs, textbooks, courses, or verified reference material. Minimum 1, recommend 2-3. | "Elasticsearch official docs + Elastic's Getting Started guide" |
| **Real-World Domain/Context** | The authentic context that examples, data, and practice scenarios should be pulled from. Must be relevant to the learner's actual work or interests. | "Martinez Methods agent infrastructure — searching and indexing AI pipeline outputs" |
| **Previous Knowledge / Current Skill Level** | Honest assessment of what the learner already knows. Include both strengths and gaps. Note any prior exposure that didn't stick and why. | "Has integrated apps with Elasticsearch but never worked with ES directly. Understands the concept of indexing and querying at a high level." |
| **Duration of Learning Experience** | Total time allocated for the complete LE. | "90 minutes" |
| **Session Structure** | How the total duration is broken into sessions. Single session or multiple? How long each? How frequently? | "Single 90-minute session" or "Two 45-minute afternoons, 1 day apart" |
| **Desired Outcome** | What the learner should be able to DO (not just know) after completing the LE. Must be specific, observable, and testable. Frame as a task, not a topic. | "Independently set up a local ES instance, create an index with a custom mapping, ingest documents, and write 3 query types (match, bool, range) against real pipeline output data." |

## Optional Inputs (Ask If Not Provided)

| Input | Description | Default If Omitted |
|---|---|---|
| **Learner Profile Notes** | ADHD, CPTSD, learning preferences, environmental constraints, motivational triggers, energy patterns. | Apply Krystal's standard learner profile (constructivist, ADHD, needs purpose-driven framing, confidence-building early wins). |
| **Pedagogical Framework Preference** | Which of the 5 supported frameworks to use: Content First (CFL), Problem-Based (PBL), Scenario-Based (SBL), 7-E Reconnection, or Expeditionary Learning (EL). | Let the LE designer choose based on topic + learner profile + duration. |
| **Environment/Tools** | What software, hardware, or setup the learner has access to. | Ask — do not assume. |
| **Assessment Approach** | How to measure success. Krystal's standard: artifacts only (scripts that do real things), never quizzes or tests. | Artifacts only. No assessments — only deliverables that demonstrate the skill in context. |
| **Confidence Baseline** | Learner's current confidence with the topic on a 1-5 scale. | Ask if not volunteered. |

## Prompt Brief Structure

Generate the brief in this exact structure:

```markdown
# Learning Experience Prompt Brief: [Topic]

**Version:** v01_I | **Date:** [YYYY-MM-DD]
**Learner:** [Name]
**Designed by:** [who is generating the LE from this brief]

---

## 1. Learning Outcome

[Specific, observable, testable outcome. Frame as: "After completing
this LE, the learner will be able to [VERB] [SPECIFIC TASK]
[IN CONTEXT] [TO WHAT STANDARD]"]

## 2. Source(s) of Truth

| # | Source | Type | Authority |
|---|--------|------|-----------|
| 1 | [name + URL if available] | [Official docs / Textbook / Course / Reference] | [Primary / Supplementary] |

## 3. Real-World Context

[Description of the authentic domain that examples, practice data,
and scenarios should draw from. Why this context matters to the
learner. How it connects to their actual work.]

## 4. Learner Profile

### Current Knowledge
[What they already know. Prior exposure. Strengths.]

### Gaps
[What they don't know. What didn't stick and why.]

### Confidence Baseline
[1-5 self-rating if available]

### Learning Preferences
[ADHD considerations, energy patterns, environmental needs,
motivational triggers, format preferences]

## 5. Time Structure

| Parameter | Value |
|---|---|
| Total duration | [e.g., 90 minutes] |
| Sessions | [e.g., 1 session of 90 min / 2 sessions of 45 min] |
| Frequency | [e.g., back-to-back / 1 day apart / weekly] |

## 6. Environment & Tools

[Software, hardware, OS, access, setup requirements.
What is already installed vs. what needs setup.]

## 7. Pedagogical Framework

[Which of the 5 frameworks to use, OR "Designer's choice based
on learner profile and topic." Include rationale if specified.]

## 8. Assessment Approach

[Artifacts only — what the learner produces as evidence of learning.
No quizzes. No tests. Only things that DO something real.]

## 9. Success Criteria

[How the learner and the designer know the LE worked.
Must connect back to Section 1 outcome.]

## 10. Design Constraints

[Anything the LE designer needs to know that limits or shapes
the design: cost constraints, tool limitations, accessibility
needs, content that must NOT be included, etc.]
```

## After Generating the Brief

1. Present the brief to the user for review using the file-presentation skill
2. The brief is the deliverable — NOT the learning experience itself
3. The user takes the brief to the LE Generation Pipeline (or to another AI model) to produce the actual LE materials
4. If the user says "now generate the LE" — that is a separate task requiring the full LE Generation Pipeline, not this skill

## Quality Checks Before Presenting

- [ ] Every required input has a value (no placeholders, no "TBD")
- [ ] The outcome in Section 1 uses an observable verb (not "understand" or "learn about")
- [ ] Sources of truth are real, verifiable resources (not training data guesses)
- [ ] The real-world context connects authentically to the learner's work
- [ ] Time structure is realistic for the outcome (flag if the outcome seems too ambitious for the duration)
- [ ] Assessment artifacts are things that DO something, not things that DESCRIBE something
