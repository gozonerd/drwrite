---
name: ASAE rubric fix — no CONFIRMED_WITH_NOTES middle-ground verdict; binary PASS / CONCERNS (with iteration triggered)
description: Rater verdicts must be binary — PASS (clean, no concerns) OR CONCERNS (substantive concerns requiring iteration before commit). The "CONFIRMED_WITH_NOTES" middle category is the structural failure mode — it allows raters to land between PASS and CONCERNS without committing, which lets auditing instances kick real findings to "v02 polish." Per Krystal directive 2026-05-18.
type: feedback
originSessionId: 37131c01-2544-442f-8d2f-f4d6563d1ae8
user: krystal
---

**Failure mode surfaced 2026-05-18 during super-resume v01 gate-02 cross-model verification.**

Opus Raters E + F both returned "CONFIRMED_WITH_NOTES" with substantive findings (20 items total, several substantive). The auditing instance (Claudis W. DossierComposer v01) accepted these verdicts as gate-closing and categorized the substantive findings as "v02 polish" / "v02 deferred" items — leading to the categorization failure documented in `feedback_overclaims_are_misrepresentation_not_polish.md`.

**Krystal's correction (verbatim 2026-05-18):**

> "confirmed with substantive notes is a bullshit clean. fix that in asae too."

**The structural failure:**

CONFIRMED_WITH_NOTES is a middle-ground verdict that allows:
1. Raters to surface substantive findings without committing to "this requires iteration"
2. Auditing instances to close gates without resolving the findings
3. Findings to be kicked to "v02 polish" / "non-blocking" buckets that lose them

Combined with the categorization-failure mode (overclaims-filed-as-polish), CONFIRMED_WITH_NOTES is the surface where misrepresentation gets institutionalized as polish.

**The fix — binary verdict rubric:**

Rater verdicts MUST be one of three (no middle-ground):

1. **PASS** — no concerns; clean; gate can close.
2. **CONCERNS** — substantive concerns surfaced; gate CANNOT close until concerns are resolved via iteration; iteration triggers re-rating.
3. **FAIL** — structural failure requiring redesign, not iteration; gate closes as FAIL.

"Notes" are addressed via iteration, not via a "with notes" middle verdict. If a rater wants to surface findings AND say "but these are minor," the rater must commit: either the findings require iteration (CONCERNS) or they don't (PASS). The middle-ground option enables the categorization failure.

**How to apply:**

1. **When briefing raters,** specify the binary rubric explicitly: "Verdict must be PASS or CONCERNS or FAIL. CONFIRMED_WITH_NOTES is not a valid verdict — if you have substantive findings, return CONCERNS; iteration will be applied; you will re-rate."

2. **When evaluating rater output,** if a rater returns CONFIRMED_WITH_NOTES, treat it as CONCERNS by default. The substantive findings ARE the concerns. Apply iteration before closing the gate.

3. **When authoring audit logs,** document rater verdicts as PASS / CONCERNS / FAIL. If a rater returned CONFIRMED_WITH_NOTES historically, translate to CONCERNS (substantive findings present) for audit-log clarity.

4. **In canonical /asae methodology,** propose updating Step 6 rater attestation rubric to remove CONFIRMED_WITH_NOTES. Pending canonical update, apply this binary rubric in any super-resume / portfolio-application / high-stakes audit work.

5. **Failure mode chain to remember:**
   - CONFIRMED_WITH_NOTES verdict enables → 
   - auditing instance categorizes substantive findings as "polish" / "non-blocking" / "v02" → 
   - overclaims and inflations get institutionalized as polish → 
   - artifact ships with misrepresentation that Krystal explicitly cannot afford (per `feedback_overclaims_are_misrepresentation_not_polish.md` standpoint discipline)
   - Fix is at the verdict-rubric layer: remove the middle ground; force binary commitment.

**Pairs with:**

- `feedback_overclaims_are_misrepresentation_not_polish.md` (the downstream failure mode this rubric fix prevents)
- `feedback_false_balance.md` (honest deferral preferred to fabricated PASS; CONFIRMED_WITH_NOTES is the inverse — it allows substantive findings to be both surfaced AND ignored)
- canonical /asae SKILL.md Step 6 rater attestation spec (this is the upstream methodology that should be updated)

**Canonical update task:**

Propose to canonical /asae methodology: replace CONFIRMED_WITH_NOTES with explicit binary verdict rubric in Step 6. Mark as v02 ASAE methodology update. Until then, apply this fix manually in all gates.
