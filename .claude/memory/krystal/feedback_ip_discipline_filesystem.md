---
name: IP Discipline Extends To Filesystem, Not Just Prose
description: IP language discipline applies to filenames, folder names, field values, log contents, commit messages, skill invocations, CI output, test names, comments — every operational artifact, not only prose
type: feedback
originSessionId: 46056a33-f1c9-42ab-8260-97ba2f9b45f8
---
IP language discipline is NOT a prose constraint. It applies to every operational artifact a repo exposes: filenames, folder structures, commit messages, log contents, field keys, field values, CI output, test names, comments, dependency manifests, README text, LICENSE text, and git history.

**Why:** On 2026-04-22, during authorship of the D2R Methodology Factorial pre-registration, filesystem-level IP leakage was discovered in folder names (`deprecated/self-audit-edit-logs/`), audit log filenames (`pre-registration_self-audit-log_2026-04-22_v05.md`), and audit log frontmatter field values (`skill: /asae (ai-self-audit-edit, old form...`). The prose of the authored document was IP-clean. The filesystem did the acronym expansion that the prose carefully avoided. A competent reader could reconstruct ASAE's mechanism from the filesystem alone without the acronym ever being expanded in prose. Krystal caught it when Claudette announced the folder path in a confirmation-gate message. The rule "branded terminology only" is necessary but insufficient — it must be enforced at every operational layer, not only in prose sentences.

**How to apply:**

1. Before creating any folder, file, field name, or commit message that includes a branded acronym context: verify the name itself doesn't expand the acronym or reveal the methodology.
2. Use branded forms throughout: `asae-logs/` not `self-audit-edit-logs/`; `asae-log_YYYY-MM-DD_vXX.md` not `self-audit-log_YYYY-MM-DD_vXX.md`.
3. In frontmatter and field values, never parenthetically expand an acronym for context ("/asae (ai-self-audit-edit, old form...)"). If context is needed, give it in non-expanding terms.
4. When announcing work in-thread: the folder path, filename, or field value you mention publicly IS an artifact. Treat every announcement as publication.
5. Reference the `Pre_Publication_IP_Scrub_Checklist` at `_grand_repo/docs/` (v02_I or later) for the full gate before any repo goes public.
6. This rule applies independently of whether an artifact is currently private. Private repos can become public; shared artifacts can be forwarded; filesystems get zipped and sent.

**Related:** Pre_Publication_IP_Scrub_Checklist_2026-04-22_v02_I.md (_grand_repo/docs/) — operational implementation of this principle.
