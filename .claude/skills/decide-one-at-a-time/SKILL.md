---
name: decide-one-at-a-time
description: "Present a queue of pending decisions to the user ONE AT A TIME with a discussion gate between each, so the user can rapid-fire decide without cognitive overload from a wall of stacked options. Triggers on: '/decide-one-at-a-time', '/decide one at a time', 'rapid fire decisions', 'one decision at a time', 'walk me through my decisions one by one', 'queue these decisions'. Modes: solo / explain / rec / defend. Each decision gets a human-readable code + count out of total (e.g., 'D1 of 8 — PHASE-A-SCOPE'). User can override per-decision to bundle by saying 'give me all of them at once' or 'cluster the rest'."
version: v01_I
authored_by: Clauda W. Value Genius v03 (Claude Opus 4.7, 1M context)
type: skill
classification: utility-class
provenance: "Authored 2026-05-18 by Clauda W. Value Genius v03 after Wave 0 RESUME close-out surfaced 8 follow-up decisions in a single dense Tier 1/2/3 breakdown. Krystal asked for them one at a time with mode-graded explanation depth: solo (options only) / explain (plain English per option) / rec (explain + recommendation + why) / defend (rec + per-option for/against + defense of why rec still wins). Pattern is the rapid-fire-decisions cousin of /bit-by-tiny-bit (which is for understanding-paced walkthroughs). Inaugural use 2026-05-18 on D1-D8 from Wave 0 close-out."
changelog:
  - "v01_I (2026-05-18): Initial release. 4 modes (solo / explain / rec / defend). Human-readable decision codes (UPPERCASE-KEBAB-CASE). Count-out-of-total accompanies each decision. User-level override per decision."
---

# /decide-one-at-a-time

## Purpose

Present a queue of pending decisions to the user ONE AT A TIME with a discussion gate between each. Each decision lands as a focused, scannable surface that the user can rapid-fire decide on without absorbing a wall of stacked options.

The skill exists because comprehensive decision-batches (e.g., "8 decisions you need to make") frequently overwhelm even when the user has explicitly asked for completeness. Surfacing one at a time + mode-graded explanation depth preserves the user's cognitive budget.

This is the **rapid-fire-decisions cousin** of `/bit-by-tiny-bit` (which is for understanding-paced walkthroughs of complex artifacts).

## When to Use

- User explicitly invokes `/decide-one-at-a-time` or any trigger phrase
- After a deliverable lands, multiple follow-up decisions are queued
- The session has accumulated 3+ pending decisions that would otherwise be presented as a stacked list
- User says they want to "rapid-fire decide" or "go through these one at a time"
- The decisions are independent enough that order isn't load-bearing (or you can sequence them by priority)

## When NOT to Use

- Only 1-2 decisions pending — just ask them directly
- Decisions are tightly coupled (one decision determines what the next decision IS) — use `/bit-by-tiny-bit` for sequenced clarification instead
- User is in "show me everything" mode and explicitly wants the full menu at once
- The decision space is genuinely open-ended (no enumerable options) — that's a discussion, not a decision-queue

## Modes (mode-graded explanation depth)

### `solo` mode

Just the options. No prose explanation. No recommendation. Fast for decisions the user already understands.

```
## D3 of 8 — TEST-RUNNER-SPAWN

**(i)** Spawn Test Runner persona now
**(ii)** Defer spawn to your convenience
**(iii)** Spawn but only for 1-month tests; defer 3/6-month spawns

Pick i / ii / iii.
```

### `explain` mode

Solo + plain-English explanation of what each option concretely means / what changes if you pick it.

```
## D3 of 8 — TEST-RUNNER-SPAWN

**(i)** Spawn Test Runner persona now
→ Means: I run /define-your-role-literal for a new "Test Runner" persona,
  author 3 artifacts (role-def + lock-in skill + role-manifest), and the
  1-month acceptance test clock starts immediately. ~30min of work for me.

**(ii)** Defer spawn to your convenience
→ Means: Wave 0 ship has happened but the acceptance test clock doesn't
  start until you direct the spawn. No work for me now; clock stays paused.

**(iii)** Spawn but only for 1-month tests; defer 3/6-month spawns
→ Means: Test Runner persona spawned now but scoped to 1-month tests only;
  3/6-month versions get separate spawns later. Splits the work; trades
  one decision now for two decisions later.

Pick i / ii / iii.
```

### `rec` mode

Explain + my recommendation + why.

```
## D3 of 8 — TEST-RUNNER-SPAWN

**(i)** Spawn Test Runner persona now
→ Means: [plain-English explanation]

**(ii)** Defer spawn to your convenience
→ Means: [plain-English explanation]

**(iii)** Spawn but only for 1-month tests; defer 3/6-month spawns
→ Means: [plain-English explanation]

**My recommendation: (ii) defer.**

Why: Wave 0 just shipped today; the acceptance criteria aren't time-pressured
(per Q3 ratification 2026-05-06, the 1-month clock just needs to anchor on
"Layer-2 adapter ship" — that anchor is now logged). You're already
multi-threading; adding a new persona spawn this session burns context for a
low-immediacy task.

Pick i / ii / iii — or override my rec.
```

### `defend` mode

Rec + per-option for-and-against rationale + defense of why my rec still wins under the alternatives.

```
## D3 of 8 — TEST-RUNNER-SPAWN

**(i)** Spawn Test Runner persona now
→ Means: [explanation]
→ For: Clock starts immediately; cleanest "ship + verify" loop; no
  forgetting-to-spawn risk; matches the Q3 ratification intent literally.
→ Against: Burns context this session on a non-urgent task; adds another
  active persona to track; you're already multi-threading.

**(ii)** Defer spawn to your convenience
→ Means: [explanation]
→ For: Saves your context now; you control when the verification work
  starts; the ship-date anchor is logged so spawn-later still produces
  valid 1/3/6-month timelines.
→ Against: Risk of forgetting-to-spawn; the "clock starts at ship" intent
  weakens if there's a long gap between ship and spawn.

**(iii)** Spawn but only for 1-month tests; defer 3/6-month spawns
→ Means: [explanation]
→ For: Splits the work; gets 1-month test infrastructure in place now
  without committing to all 3 spawn variants.
→ Against: Trades one decision now for two decisions later; muddies the
  Q3 ratification (which said ONE Test Runner persona for all 3 milestones).

**My recommendation: (ii) defer.**

Why (i) loses to (ii): the urgency argument doesn't hold — the
ship-date anchor is logged in gate-44 + gate-45 + gate-34; spawning later
still produces valid 1/3/6-month timelines. The "no forgetting" argument is
real but mitigated by the existing decision log + handoff doc patterns.

Why (iii) loses to (ii): violates the Q3 ratification literal reading
(one persona, all 3 milestones). Adds future-decision overhead.

Why (ii) is the best: saves your context now without breaking the
methodology contract; defers a low-immediacy task with full traceability
of when it should be picked up.

Pick i / ii / iii — or override my defense.
```

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| Decision queue | Yes | List of pending decisions, each with: code (UPPERCASE-KEBAB-CASE), title, options enumerated as (i)/(ii)/(iii)/... |
| Mode | Yes | One of: `solo` / `explain` / `rec` / `defend`. User can change mid-queue. |
| Decision codes | Yes | Human-readable identifier per decision; format: UPPERCASE-KEBAB-CASE; should evoke the decision substance (e.g., `PHASE-A-SCOPE`, `TEST-RUNNER-SPAWN`) |
| Total count | Yes | N (how many decisions in the queue) |
| Order | No | Default: present in input order. User can override ("D5 first" / "go in priority order"). |
| Recommendation policy | No | If mode = rec or defend, my recommendation comes from my own judgment + context. User can request "no rec" mid-queue. |

## Execution Protocol

### Step 0: Confirm scope + start (mandatory, single message)

Before any individual decision lands, write one message that:

1. Lists all decision codes with one-line titles (NO options, NO rec — just the menu)
2. States the total count
3. States the default mode
4. Notes any judgment calls (e.g., "I ordered by stakes; reorder if you want")
5. Ends with: **"Confirm scope + mode, then I'll start with D1."**

Example Step 0:

```
## /decide-one-at-a-time — scope confirmation

**Decisions queued (8 total):**

| # | Code | Substance |
|---|---|---|
| D1 | PHASE-A-SCOPE | Whether to accept the Phase A re-scope |
| D2 | MM-THREAD-ARCHIVE-COMMITS | Re-commit gate-03+04 properly or leave |
| D3 | TEST-RUNNER-SPAWN | Spawn the acceptance-test persona now or defer |
| ... | ... | ... |

**Default mode:** explain (rec on tied-stakes decisions; defend on request)

**Ordered by:** Tier 1 (close-out) → Tier 2 (spawns) → Tier 3 (housekeeping)
per my prior surface.

Confirm scope + mode, then I'll start with D1.
```

WAIT for explicit user confirmation before producing D1. If user adjusts mode or order, update + re-confirm.

### Step 1, 2, ... N: present one decision at a time

Each decision is one message structured per the active mode (see Mode templates above). Always include:

- `## DN of TOTAL — DECISION-CODE` header
- Options enumerated (i) (ii) (iii) ...
- Mode-appropriate body (none / explain / rec / defend)
- **"Pick i / ii / iii — or override."** prompt in bold

After sending, **STOP**. Do not produce DN+1. Do not anticipate the user's answer. Wait for their actual response.

### Responding to user input mid-queue

| User input | What to do |
|------------|------------|
| `i` / `ii` / `iii` (the option letter) | Log the decision; mark DN as resolved; send DN+1 in a new message |
| Brief affirmation ("yes" / "go with rec") in rec or defend mode | Apply my recommendation; log; send next |
| Question about current decision | Answer; offer "Decided? Or want more depth?" |
| Mode change ("switch to defend") | Re-send current decision in new mode; await answer |
| User wants to bundle remaining ("give me all the rest at once") | Honor it — emit remaining decisions stacked in current mode; user-level override accepted |
| User skips ("defer D4, give me D5") | Mark D4 as deferred (carry forward); send D5; mention D4 will come back at end |
| User stops ("stop / I'm done for now") | End with summary of decisions made + decisions still pending |

### End of queue: closing summary

After the final decision OR when user says "stop":

```
## Decisions resolved this session

| Code | Resolution |
|---|---|
| D1 PHASE-A-SCOPE | (i) accept re-scope |
| D2 MM-THREAD-ARCHIVE-COMMITS | (ii) leave as-is |
| ... | ... |

## Decisions deferred / pending

[List with one-line context each, OR explicit "all resolved"]

What's next?
```

## Decision code rules

- **UPPERCASE-KEBAB-CASE.** Distinct from prose. Easy to grep / reference.
- **Substance-evocative.** `PHASE-A-SCOPE` not `D7-MISC`. The code should give the reader an instant mental anchor.
- **Stable.** Once assigned, the code doesn't change mid-queue (so the user can reference "D3 PHASE-A-SCOPE" back to me).
- **Unique within queue.** Don't reuse codes.
- **No date/time stamps.** The decision-queue is session-scoped; if a decision recurs in a later session, it gets a fresh code or a `-V2` suffix.

## Count-out-of-total

Every decision header MUST include `DN of TOTAL`. This is the user's progress signal.

- `D1 of 8` → first of 8
- `D2 of 8` → 25% through
- `D8 of 8` → last

If new decisions surface mid-queue (rare; usually a bug in scope confirmation), append them as DN+1 / DN+2 with a one-line note: "**Heads up:** D9 added — [reason]. Now D9 of 9."

## Step sizing rules

Each decision message:

- **Solo:** ≤ 50 words of options
- **Explain:** ≤ 200 words total (options + explanations)
- **Rec:** ≤ 350 words total
- **Defend:** ≤ 600 words total

If a defend-mode decision needs more than 600 words, the decision is too complex for this skill — switch to `/bit-by-tiny-bit` for that one.

## Anti-patterns

- **Dumping multiple decisions in one message "for efficiency."** Defeats the entire purpose. Send one decision, wait, send the next. (User-level override DOES allow bundling — but only on explicit user direction.)
- **Continuing without explicit answer.** "Let me know if you want to proceed" is not a substitute for actually waiting. Send the decision, end the message, stop.
- **Mode-creep.** Don't escalate to rec or defend mode mid-queue unless the user asks. Mode is set at scope-confirmation; changes are user-initiated.
- **Pre-answering options the user didn't pick.** In rec / defend mode, present and stop. Don't pre-execute "since you'll probably pick (ii)..."
- **Skipping scope confirmation.** Step 0 exists so the user knows the full menu + can reorder. Always do it.
- **Inflating option counts.** If a decision genuinely has 2 options, don't manufacture a (iii) "hybrid" to look balanced. False balance corrupts the decision.
- **Burying the recommendation in defend mode.** The rec must be visible and bolded. Defense rationale supports it but doesn't bury it.

## User-level overrides (per Krystal's direction)

The user can always override the one-at-a-time pacing:

- **"Give me all of them at once"** — emit remaining decisions stacked in current mode
- **"Cluster the rest"** — same as above
- **"Just give me your recs"** — emit remaining decisions with rec-mode resolution-suggestions (user can override per-decision)
- **"Stop after this one"** — finish current decision, then close summary

Honor these overrides immediately. The skill defaults to one-at-a-time but the user has final pacing authority.

## Output format

- Each decision in its own message
- Headers using `## DN of TOTAL — DECISION-CODE`
- Body uses normal markdown (tables / bold / inline code as needed)
- Discussion prompt in **bold**, separated from body by `---` if body is long
- Decision codes always uppercase-kebab-case

## Related skills

- `/bit-by-tiny-bit` — understanding-paced walkthroughs (sequenced clarification of complex artifacts). This skill is for decision-paced rapid-fire (independent decisions; user picks fast).
- `/define-your-role-literal` — produces decision queues when ratifying role-derivation; this skill can present those queues.
- `/usage-limit-reached-transfer-protocol` — handoff docs contain pending-decision lists; this skill can be invoked by the successor to walk through them.

## Honest gaps (v01_I)

1. **Inaugural pattern; calibration uncertain.** Mode boundaries (50 / 200 / 350 / 600 word ceilings) are first-pass; will tune based on use.
2. **No automatic mode-selection heuristic.** User picks mode explicitly. Future: detect from context (decision-stakes / time-pressure / user familiarity).
3. **Decision-code conventions unenforced at the skill level.** I rely on the invoking instance to pick good codes. Bad codes (e.g., `D5-MISC`) degrade the user experience but don't fail the skill.
4. **No persistent decision-log file.** This skill is session-scoped. Future enhancement: write resolved decisions to a session-decision-log for cross-thread visibility.
5. **Override-bundling reduces the one-at-a-time discipline** but the user's authority over their own cognitive pacing supersedes the skill's default.

## Versioning / Changelog

- **v01_I (2026-05-18)** — Initial release. 4 modes; UPPERCASE-KEBAB-CASE codes; count-out-of-total; user-level pacing override. Inaugural use on Wave 0 close-out D1-D8 by Clauda W. Value Genius v03.
