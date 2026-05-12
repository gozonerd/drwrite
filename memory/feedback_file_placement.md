---
name: Pipeline materials go in learning-experiences repo
description: Krystal corrected file placement — pipeline system materials belong in learning-experiences/04_Pipeline/, not stahl-systems-docs
type: feedback
---

Pipeline materials (diagrams, playbook artifacts, generation system docs) belong in `learning-experiences/04_Pipeline/`, NOT in `stahl-systems-docs/12_AI_Operations_AIO/`.

**Why:** The learning-experiences repo is the home for everything related to the Learning Experience pipeline system — what is used to generate individual, topic-specific learning experiences. stahl-systems-docs is for Stahl Systems operational documentation.

**How to apply:** When creating any file related to the LE generation pipeline (diagrams, playbook updates, skill outputs, pipeline configs), place it in `learning-experiences/04_Pipeline/`. Research reference docs (like the orchestration diagram research) stay in `.claude/references/` since they're cross-cutting Claude config.
