---
name: Force-push override permitted for leak remediation, with disclosure requirements
description: The standing rule against force-push to main is overrideable for the specific case of removing IP-leaked content already pushed to a public-or-going-public repo, when explicitly authorized by Krystal per incident; the redacted re-publish must include a force-removal-explanation block.
type: feedback
---

Standing rule (unchanged): never force-push to main / master, never rewrite shared history, do not use destructive operations as shortcuts.

**Override condition for leak remediation:** when content already pushed to GitHub on a private-but-going-public or public repo is discovered to leak IP (mechanism vocabulary, forbidden strings, or other Pre-Pub Checklist failures), Krystal can explicitly authorize a force-push to remove the leaky commit from public history. The override applies only to the specific incident; it does NOT generalize to other force-push uses.

**When override is in effect, the remediation must:**

1. Save the lesson to memory FIRST, before any GitHub ops, so the context is not lost in the history rewrite.
2. Quarantine the leaky files locally (rename to INTERNAL_ONLY-marked paths under `deprecated/`) before destroying remote history. This preserves the artifact for reference even when public-history is rewritten.
3. Use `git push --force-with-lease` (not bare `--force`) to avoid clobbering concurrent work.
4. Re-publish a redacted version that includes a **force-removal-explanation block** citing: (a) the leak that motivated the override, (b) the incident-specific authorization, (c) the memory entry where the canonical lesson is recorded, (d) acknowledgment that this violates the typical audit-log-preservation rule and why the leak severity justified the override.
5. The redacted version must pass BOTH the strict forbidden-string audit AND the mechanism-vocabulary scrub before commit.

**Why:** 2026-04-25 incident with the PEK Remediator session report. The standing audit-trail-preservation principle is normally load-bearing — git history is the proof-of-work surface. But when the artifact preserved in history is itself the leak, preserving it does more harm than the audit-trail loss. The force-removal-explanation block partially compensates for the audit-trail loss by recording what was removed and why, at the narrative layer, even when the git-history layer can no longer attest.

**How to apply:** when a leak is discovered post-push, do not act unilaterally. Surface the leak, surface the proposed force-removal as one of multiple options (alongside leave-and-document and quarantine-only), and act only on Krystal's explicit per-incident authorization. The override is not a standing exception; it is per-incident.
