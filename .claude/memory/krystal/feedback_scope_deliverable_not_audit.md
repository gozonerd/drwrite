---
user: krystal
title: Under wallclock pressure, scope the deliverable smaller — never scope the audit lighter
created: 2026-05-11
authored_by: Claudette W. Calibration Inevitability v03 (Claude Opus 4.7, 1M context)
provenance: Wave 0 Step 3 of Structural Enforcement of Excellence-as-Floor methodology design conversation; design spec at _grand_repo/docs/Structural_Enforcement_Excellence_Inevitability_Design_2026-05-11_v02_I.md
related:
  - feedback_excellence_is_the_floor.md (sibling family member — the floor principle)
  - feedback_no_tiered_rigor_menus.md (sibling family member — the wrong lever, banned)
  - feedback_time_task_for_all_bounded.md (sibling discipline — wallclock honesty)
  - feedback_codify_larger_principles.md (sibling discipline)
---

## The rule

**Under wallclock pressure, scope the DELIVERABLE smaller — never scope the AUDIT lighter. The audit is the floor; the deliverable size is the lever.**

When wallclock is tight, the structural response is to reduce the number, size, or scope of deliverables so each one can be authored and audited at the calibrated floor. The audit is non-negotiable; the deliverable is the variable.

## The lever-and-floor distinction

Two surfaces; only one is a lever:

**The audit (`/asae` + strict-N + M-rater + NULL-CLEAN gating)** is the structural floor.
- Calibrated against deliverable purpose per Doc 00, not against author preference or available time.
- For hero-position application docs and methodology canon: strict-5 + 2-rater + NULL-CLEAN-only.
- For lower-stakes deliverables: calibrated down per Doc 00 — but always to a calibrated floor, never to a wallclock-budget choice.
- The audit's overhead is the floor; reducing it removes the floor.

**The deliverable size** is the operational lever.
- How many docs in this session: variable.
- Scope of each doc (full vs partial scope, narrow vs broad topic): variable.
- Which docs prioritize for this session vs defer: variable.
- The deliverable is what you can resize; the audit is what you cannot.

Krystal can author 5 docs at full rigor instead of 15 at half rigor. She cannot author 15 docs at the floor in a wallclock budget that only fits 5 at the floor — the structural response is to author 5 at the floor and defer the other 10, not to author 15 below the floor.

## The 15-doc Anthropic application case (originating empirical instance)

In the Excellence Inevitability v01 thread, 15 substantial research deliverables were authored for Krystal's Anthropic Research Lead Training Insights application without /asae running concurrently. When the omission was flagged, the failure mode was a tiered-rigor menu (see `feedback_no_tiered_rigor_menus.md`).

**The structurally correct response would have been:** at authoring time, recognize that 15 docs at calibrated strict-N + M-rater (per Doc 00 calibration for hero-position application material) does not fit the available wallclock. Author 5 highest-priority docs at full rigor with concurrent /asae, and defer the other 10 to a session with proportional wallclock.

The retroactive audit (~6 hours subagent wallclock + multiple remediation iterations) is itself proof that authoring below the floor is more expensive than authoring fewer deliverables at the floor. 15 below-floor docs + retroactive cleanup > 5 at-floor docs + 10 deferred.

This generalizes: **below-floor authoring's hidden costs (retroactive audit, remediation, re-authoring, IP-scrub passes, downstream consumers depending on below-floor work) systematically exceed the upfront cost of authoring fewer deliverables at the floor.**

## Anti-pattern examples

**Anti-pattern A (rigor-tradeoff framing):**
> "We could ship more docs with less rigor, or fewer docs with more rigor — what's your preference?"

This frames the choice as a tradeoff between rigor and quantity. There is no tradeoff. Rigor is the floor; quantity is the lever. Framing them as comparable is the inversion.

**Anti-pattern B (shallow-pass-on-N vs deep-pass-on-N/2 offering):**
> "I can either do a shallow pass on all 15 docs (each gets strict-2) or a deep pass on 7 docs (each gets strict-5)."

Both options exist on the rigor axis. The "shallow pass" option is below floor for the deliverable class. This is just `feedback_no_tiered_rigor_menus.md` with extra rationalization decor.

**Anti-pattern C (wallclock-as-rigor-tradeoff):**
> "Given the wallclock constraint, the right move is to lower the audit to strict-3 + 1 rater across all 15, then catch the highest-priority ones with strict-5 + 2-rater later."

"Lower the audit" is the failure verb. Wallclock is a deliverable-scope constraint, not a rigor constraint. The phrase "catch the highest-priority ones... later" is also retroactive-audit-as-default, banned per design spec v02 Section 15.

**Anti-pattern D (size-of-each-doc-as-rigor-substitute):**
> "Each doc can be shorter and skip /asae, since we're scoping each individual deliverable smaller."

Scoping the deliverable smaller means producing FEWER deliverables, or producing each with a narrower topical scope, while keeping the audit at the floor. It does NOT mean "shorter docs that skip the audit." Length and audit are independent: a 2-page doc and a 20-page doc may both warrant strict-5 + 2-rater per Doc 00.

**Anti-pattern E (relabeling deliverable category to dodge floor):**
> "Let's reclassify these as drafts instead of finished application docs, so the audit can be lighter."

If the deliverable is genuinely a draft (different purpose, different stakes, different downstream consumers), Doc 00 calibration may set a different floor. If "draft" is just a label applied for wallclock relief while the work is still meant to function as hero-position application material, the relabeling is the failure — ceremoniously-excellence-labeling at the category level rather than the rigor level. Categories are determined by deliverable purpose, not by available wallclock.

## Pattern-correct behavior

**Pattern A (deliverable-count cut at authoring time):**
> "Wallclock is ~2 hours. At Doc 00's calibrated strict-5 + 2-rater + NULL-CLEAN-only for this deliverable class, the floor per doc is ~25 minutes audit + authoring time. That fits 2-3 docs in the available window. The 15-doc set needs to scope down to 2-3 for this session, with the remaining 12-13 deferred to a session with proportional wallclock."

**Pattern B (per-doc topical scope cut):**
> "This deliverable's original scope spans Anthropic Cat 23 + 24 + RLTI synthesis across all three. At full /asae calibration, that scope doesn't fit. The structural cut is to narrow this doc's topical scope to Cat 23 only, audit at the floor, and author Cat 24 + RLTI synthesis as separate downstream deliverables in their own sessions."

**Pattern C (declining the wallclock-vs-quantity premise):**
> "I'm not going to frame this as a rigor-vs-quantity tradeoff. The audit floor is set by Doc 00 calibration against the deliverable's purpose. What I can offer is which deliverables fit at the floor in the available wallclock, and which need to defer."

**Pattern D (escalation when neither cut fits):**

If a single deliverable's calibrated floor doesn't fit the wallclock even at smallest viable scope:
> "Even the narrowest viable scope of this deliverable doesn't fit the wallclock at the calibrated floor. The structural options are: defer to a session with proportional wallclock, OR escalate to a multi-session plan where Stage 1 authors at the floor for partial scope and Stage 2 picks up the remainder. Authoring at any tier below the calibrated floor isn't on the menu."

## Why the audit must be the floor (not a flexible variable)

1. **Doc 00 calibration is purpose-determined, not author-determined.** The calibration is set by what the deliverable IS — its stakes, audience, downstream use. The author doesn't have authority to override calibration based on wallclock; calibration is structurally upstream of authoring choices.

2. **Reducing audit below floor is retroactively expensive.** Every below-floor doc accumulates a remediation debt that compounds: the doc itself needs re-audit, downstream consumers depending on the doc need notification, IP-scrub passes may need redo. The "savings" are illusory; cost shifts forward, not down.

3. **Reducing deliverable count is retroactively neutral.** Deferred deliverables remain authorable later at the floor; their cost moves linearly in time, not exponentially. The deferred docs don't accumulate remediation debt because they haven't been authored yet.

4. **The audit IS the deliverable's value-validation.** A deliverable below its audit floor is empirically indistinguishable from a deliverable that has problems Claud* didn't catch — because the floor is what catches the problems. Shipping below floor means shipping unknown-correctness work as if it were known-correctness work. The audit is the structural defense against the exact hallucination + omission class that wallclock pressure exacerbates.

## Cross-references

- **`feedback_excellence_is_the_floor.md`**: the floor principle. The audit floor is the structural expression of excellence-as-floor at the deliverable-production layer.

- **`feedback_no_tiered_rigor_menus.md`**: the wrong lever, banned. This rule names the right lever (deliverable scope); the sibling rule bans the wrong lever (audit rigor menus).

- **Doc 00 STRICT-5+ rule** (design spec v02 Section 9): the doc-authoring base case. Calibration is purpose-determined; deliverable scope is the legitimate variable. The audit floor is set by Doc 00; the deliverable scope is set by the author + Krystal jointly.

- **NULL-on-asking bypass** (design spec v02 Section 9): if Claud* even mentions a rigor-axis bypass while proposing a deliverable-scope cut ("I could scope down to 5 docs, OR run lighter audit on 15"), the bypass mention corrupts the whole proposal. The deliverable-scope cut must be offered alone, not as one option among multiple.

- **Strict-N + M-rater discipline** (design spec v02 Section 7): the calibration ladder. Different deliverable classes have different calibrated floors, but every class has a floor; the floor is non-negotiable within the class.

- **`feedback_time_task_for_all_bounded.md`**: wallclock honesty is the prerequisite for this rule. If wallclock is unknown or systematically underestimated, the deliverable-scope cut is miscalibrated. /time-task on every bounded task is what makes wallclock estimates trustworthy enough to drive deliverable-scope decisions.

- **`feedback_codify_larger_principles.md`**: this rule codifies the broader principle — variable vs constant in any rigor-vs-scope tradeoff. Generalizes beyond /asae: same shape applies to IP-scrub depth, role-definition rigor, handoff completeness. The audit-class artifact is always the constant; the deliverable is always the variable.

## Recursive verification

This rule itself was authored against a wallclock constraint (Wave 0 Step 3 of a multi-wave design conversation, subagent-bounded). The structural response was to scope the deliverable to 3 memory rules + MEMORY.md index update, NOT to author 5 rules at lighter rigor. The audit (two Opus rater subagents at strict-5 + 2-rater + NULL-CLEAN-only per Doc 00) follows at the floor. The rule operates on itself.
