---
name: IP discipline includes mechanism vocabulary, not just the strict forbidden-string list
description: When describing work that involved a Martinez Methods process, the description ITSELF must not use mechanism-revealing vocabulary; the strict forbidden-string list is the minimum bar, not the maximum. The expanded form of any branded acronym is itself a description of the methodology — every word in the expansion (except generic words like "AI") is forbidden vocabulary. Generic words (e.g., "audit") are fine in isolation but forbidden when clustered with other novel-method indicators in a way that lets a reader reconstruct mechanism. Always forbidden in commit messages regardless of cluster.
type: feedback
---

Mechanism-revealing vocabulary is IP leakage even when the strict forbidden-string list passes. The strict list is a list of named brands and acronym expansions; the broader IP standard covers any term that, in the context where it appears, reveals or fingerprints the methodology architecture.

**Two operative rules:**

1. **The expanded form of any branded acronym is itself a description of the methodology.** Each word in the expansion (except universal vocabulary like "AI") is a methodology-vocabulary item. Use the branded acronym opaquely; do not expand. Do not use the expansion words to describe what the methodology does, even when the acronym itself is not present.

2. **Generic words (e.g., process-level vocabulary used in many fields) are fine in isolation but forbidden when clustered.** A cluster is two or more vocabulary items from the methodology surface appearing together such that a reader can fingerprint the mechanism from the cluster. Clustered uses are leakage; isolated uses are not.

3. **Commit messages forbid the cluster vocabulary regardless of context.** Commit messages are concentrated, public, and themselves act as methodology fingerprints. The same cluster-rule that allows isolated use in long-form prose does not apply to commit messages.

**Why:** 2026-04-25 incident — Claudette the PEK Remediator v01 produced a session report and a backing internal-records file that passed the strict forbidden-string check but extensively used clustered mechanism vocabulary. Both files were pushed to GitHub before Krystal flagged the leak. The strict list catches direct-naming leaks but not pattern-fingerprinting leaks. See `project_2026-04-25_pek_remediator_leak_incident.md`.

**How to apply:**

1. Before publishing, scan for clustered mechanism vocabulary in addition to the strict-list check. If two or more methodology-surface terms co-occur in a passage that describes process internals, scrub the cluster.
2. Replace clustered mechanism descriptions with surface-level outcome language ("the gate cleared," "the methodology completed," "PASS attested") rather than process-internals language.
3. The internal records files used to back trailers (in `deprecated/asae-logs/`) are themselves clustered methodology description by their canonical structure; they are treated as INTERNAL ONLY by analogy with the Pre-Publication IP Scrub Checklist itself, which has the same self-defeating-leak property.
4. Commit-message bodies should attest threshold completion via the trailer alone; the body should not narrate process internals. Body prose describes the WORK, not the methodology mechanism.
5. When a public-going repo contains internal-records-files or methodology documentation that uses clustered vocabulary by structural necessity, that infrastructure must be scrubbed or moved to internal-only paths before public-time, separate from the strict forbidden-string check.

**Scope:** applies to commit messages (always, regardless of cluster), repo READMEs, any artifact going to external assessors, any artifact going public, any GitHub-pushed file in a repo that is or will be public, and any chat-output describing this work that might be saved or referenced later.

**This entry is canonical.** It supersedes prior, narrower readings of "IP-clean" (e.g., interpretations that took the strict forbidden-string list as exhaustive). Earlier feedback memories on IP discipline (`feedback_ip_language`, `feedback_ip_discipline_filesystem`) remain valid for their respective surfaces (prose, filesystem); this entry adds the mechanism-vocabulary surface.
