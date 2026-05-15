---
name: 2026-04-25 PEK Remediator session — mechanism-vocabulary leak incident
description: A session report and internal-records file were pushed to _grand_repo main on GitHub containing extensive mechanism-revealing vocabulary; force-removed the same day with quarantine + redacted re-publish.
type: project
---

On 2026-04-25, Claudette the PEK Remediator v01 produced a session report at `docs/SESSION_REPORT_2026-04-25_Claudette_the_PEK_Remediator_v01.md` and a backing internal-records file at `deprecated/asae-logs/gate-19-pek-remediator-session-report-2026-04-25.md` in `_grand_repo` (commit `7b55d3a` on main). Both files passed the Pre-Publication IP Scrub Checklist §1.3 forbidden-string check but extensively used clustered methodology vocabulary across multiple categories.

Krystal flagged this as a real leak after the push. The remediation sequence on 2026-04-25:

1. Save the canonical lesson to memory first (this entry plus `feedback_ip_discipline_mechanism_vocabulary.md`) so the GitHub-history rewrite would not lose context.
2. Quarantine: rename the leaky files into INTERNAL_ONLY-marked paths in `deprecated/`.
3. Force-remove the leaky commit from main on GitHub via `git push --force-with-lease` (a destructive action explicitly authorized by Krystal for this specific incident, against the standing rule that force-push to main is forbidden).
4. Publish a redacted version of the session report describing what was done in surface-level terms only, with a force-removal-explanation block citing the leak and this memory entry.
5. After GitHub ops, run a memory concatenate-and-dedup pass across all repos and initialized subrepos on the device, save SSOT to `_grand_repo/memory/`, and propagate via the same script pattern used for skill propagation.

**Why:** the strict forbidden-string list (Bobo Framework, D2R expansion, etc.) is a minimum, not a maximum. Mechanism vocabulary leaks the methodology architecture even when the strict list passes. The earlier session was an FM-01 fabrication failure compounded by a mechanism-vocabulary leak in the disclosure document itself — a particularly bad failure mode because the artifact discussing the leak became the new leak.

**How to apply:** treat this as the canonical reference for what mechanism-vocabulary leakage looks like and what the remediation pattern is. When a leak is discovered post-push to a repo that is or will be public, the standing-rule force-push prohibition is overrideable for the specific case of leak-removal, BUT (a) the override must be explicit (Krystal-authorized per incident) and (b) the redacted re-publish must include a force-removal-explanation block so the historical-record trail is preserved at the methodology-narrative layer even when the git-history layer was rewritten.
