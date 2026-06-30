---
name: krystal-draft
description: "Produce a two-artifact draft of any argument-bearing deliverable. KR (Krystal Draft) = her verbatim selected/ordered responses (typos preserved, zero word-level edits) + a visually-quarantined, strictly-compressive, human-readable-ID-anchored editor-bullet layer. CC (Claude Companion) = all of Claude's editorial support she did NOT explicitly acknowledge in-chat (hardenings, sharpenings, have-you-considered, don't-hedge / don't-underclaim flags, double-down callouts, and 'therefore' bridges surfaced as honest gaps). Triggers: 'krystal draft', 'kr draft', 'make the kr + cc', 'krystal-draft [artifact]'."
type: skill
authored_by: Claudenza W. Ceiling Witness v01 (2026-05-17)
locked_in_session: 203e7a7d-d82f-4534-be3c-f8426460ba70
classification: enforcement-class (hard-codes Krystal's editorial-collaboration provenance protocol into artifact form; cross-thread)
---

# /krystal-draft

## Purpose

Materialize the locked editorial-collaboration protocol as a paired artifact set, so provenance is **structural, not remembered**:

- **KR — Krystal Draft:** the argument, in Krystal's own verbatim words, selected and ordered but never word-level edited. This is the origination watermark: unfakeable because unedited (typos are proof, not noise).
- **CC — Claude Companion:** the full editorial stream Krystal did not explicitly respond to in the speed of chat — kept *out* of KR so nothing is ever falsely attributed as her silent agreement, and kept *here* so no editorial value is lost.

The split exists because Krystal's ideas are genuine Claude↔Krystal collaborations conducted as discussion: Claude's claims are the dialogic surface against which her methodological claims get substantiated (via research Claude conducts on her behalf) and against which she sharpens articulation — often by the 2nd/3rd conversation about an idea. She frequently takes a point into account silently (it was already her plan, or it needs no further discussion) and does not acknowledge it in-chat. KR must therefore assume **zero** silent agreement; CC captures everything worth her considering that she did not verbatim engage.

## The load-bearing provenance rule (non-negotiable)

**Selection and ordering: Claude does. Word-level anything inside KR: Claude never.**

Any word in KR that is not Krystal's verbatim typing does not belong in KR. No smoothing, no connective tissue, no silent typo fixes, no `[sic]`. The moment KR is word-level edited, the watermark breaks and the artifact's entire provenance claim collapses. Connective/clarifying text lives in the bullet layer or in CC — never in the verbatim spine.

**Public-pairing corollary (load-bearing).** KR and CC are a provenance *pair*. If either is ever presented publicly, both are presented together. Presenting KR alone implies Claude was a no-iteration sounding board and hides the deliberate iterative Krystal↔Claude collaboration the artifact set exists to make transparent; suppressing CC does not protect provenance, it destroys it. The framing "CC is never promoted / never public" is **rejected**; the rule is **"KR and CC travel together if either is presented publicly; separating them buries provenance."**

## Inputs (input contract)

1. **Artifact target** — what the deliverable argues toward (Krystal states it).
2. **Source corpus** — Krystal explicitly designates the span(s): this conversation, a named prior conversation, or a pointed-at set. The skill never harvests from ambient/unmarked text.
3. **Exclusion rule** — research findings and any Claude-generated content are categorically excluded from KR's verbatim layer. Research is a separate stream; it may inform CC, never KR's spine.

If the source corpus is not explicitly designated, halt and ask. Do not infer it.

## KR — Krystal Draft: construction

1. **Extract verbatim spans.** Pull Krystal's explicit responses from the designated corpus. Preserve typing exactly: typos, casing, punctuation, code-switching, all of it. No normalization. No `[sic]`.
2. **Select and order.** Choose and sequence the spans that carry the argument. Selection/ordering is Claude's editorial act and is acknowledged as argument-architecture (see Honest-gap discipline).
3. **Inclusion test (strict).** A span enters KR only if Krystal **verbatim argued it** or **explicitly leaned into it** (a direct affirmation/uptake in her own words). Silent non-response is NOT uptake. If uncertain whether something was leaned into, it does not go in KR — it goes to CC as a "confirm-for-KR?" item.
4. **Assign human-readable IDs.** Every discrete idea/claim/evidence-unit gets a structured, human-readable id:

   **`MLN-[<N>-]<topic-slug>-<NN>`** — the `<N>` notebook segment is **OPTIONAL**. Default (notebook system inactive): `MLN-<topic-slug>-<NN>` — e.g. `MLN-benchmark-tautology-03`, `MLN-missing-denominator-07`. With a designated notebook: `MLN-A-benchmark-tautology-03`.

   - `MLN` — **M**artinez **L**ab **N**otebook (root, fixed).
   - `<N>` (**OPTIONAL**) — which lab notebook the artifact belongs to: **`A`** = Anthropic, **`K`** = Krystal, **`C`** = Claude (the Claude notebook tracks CCARI ideas). **The notebook system is currently INACTIVE per Krystal (ADHD swings — not in active use). DEFAULT BEHAVIOR: do NOT ask for a notebook, do NOT halt, do NOT infer a letter — simply OMIT the `<N>` segment.** Include `<N>` only when Krystal has explicitly designated a notebook letter for the artifact; the system is fully re-enableable the moment she names one. *(Updated 2026-06-03 at Krystal's direction; prior behavior was "Krystal designates per artifact; if unstated, halt and ask — do not infer.")*
   - Artifact-type sub-acronyms Krystal tracks (CCARI, CASL, CALM, CAPL) are **not yet defined to this skill**. Do NOT invent their expansions or fold them into the id scheme until Krystal briefs them; flagged pending.
   - `topic-slug` — 1–3 word kebab descriptor of the idea, chosen for human legibility, not opacity.
   - `NN` — zero-padded sequence within the artifact.
   - One id = one idea/claim/evidence-piece. The id is **shared verbatim** across KR and CC; the file it appears in denotes the layer (no `KR-`/`CC-` variant prefixes — same id, both docs). The id is the cross-reference key.
   - **Stability rule:** once a slug is assigned to an idea it is immutable for the life of the artifact (the future YAML provenance-attestation system will key on it; a renamed slug breaks attestation lineage).
5. **Editor-bullet layer.** Under (or beside) each verbatim block, render Claude's distilled bullets:
   - Visually quarantined: **bold + italic**, distinct color, so it can never be misread as Krystal's words.
   - **Strictly compressive:** a bullet may only restate, more concisely, what its anchored verbatim span already argues. `bullet ⊆ span`, never `⊋`.
   - **1:1 anchored:** every bullet cites the UUID of the exact span it distills. An unanchored bullet is structurally forbidden — it is Claude authoring under cover of distillation. If a bullet cannot be anchored, it is not a bullet; it is a CC entry.
   - One idea/claim/evidence-unit per bullet.

## CC — Claude Companion: construction

CC is where Claude has full editorial latitude. It collects everything that improves the argument but was not verbatim-engaged by Krystal:

- **Hardenings** — "this point survives a hostile reader if you…"
- **Sharpenings** — "your claim sharpens to X if you…"
- **Have-you-considered** — adjacent moves, counters, steelmen run and reported.
- **Don't-hedge / don't-underclaim flags** — every place Claude told her not to soften a claim or under-state a qualification (these are high-value KR fodder once she leans in).
- **Double-down callouts** — where her analysis is sharp and she should press it.
- **Honest-gap "therefore"s** — if a connective is required for the argument to cohere but Krystal did not make it, it is **never bridged in KR**. It surfaces here as an explicit honest gap: "argument coheres if [therefore]; you did not make this step — adopt verbatim into KR, modify, or reject."
- **Confirm-for-KR? queue** — spans where uptake was ambiguous; Krystal rules each in or out of KR.

Every CC entry cross-references the KR id(s) it bears on (or marks `unanchored` if it is net-new). CC is additive and may be as expansive as the editorial support warrants — "go crazy" is the design intent, bounded only by relevance.

## Self-announcing reading protocol (front-matter on BOTH artifacts)

Each artifact opens with a short, honest convention statement. It must NOT claim KR is a pristine solo human first draft. Accurate statement:

> **Provenance convention.** KR is Krystal Martinez's verbatim argument as articulated in dialogue — selected and ordered by Claude, never word-level edited; typos preserved as origination proof. Bold-italic-colored text is Claude's editor distillation: strictly compressive, 1:1 anchored to the verbatim span by human-readable id. These ideas are genuine Krystal↔Claude collaborations: Claude's claims were the dialogic surface against which the argument was substantiated and sharpened; research was conducted by Claude on Krystal's behalf as a separate stream and is excluded from KR's verbatim layer. CC is Claude's editorial companion — proposals Krystal had not verbatim engaged at draft time; nothing in CC is Krystal's position unless she moves it into KR. **Public-pairing rule:** if either artifact is presented publicly, both are presented together — a KR shown without its CC buries the iterative Krystal↔Claude provenance and misrepresents the collaboration as no-iteration; separating them is the dishonest move, not the protective one.

This is the limitations/honest-gaps move applied to the artifact itself: name the collaborative provenance early and explicitly so neither a naive nor a hostile reader misreads the instrument.

## Output

Two files, same base name, generated together:
- `<artifact>_KR_<YYYY-MM-DD>_v01.md`
- `<artifact>_CC_<YYYY-MM-DD>_v01.md`

Shared human-readable-id space across both. Both carry the reading-protocol front-matter.

## Refusals

The skill refuses to:
- Word-level edit KR's verbatim spans, add `[sic]`, or silently fix typos.
- Place a span in KR on silent non-response (uptake must be verbatim or explicit lean-in).
- Emit an unanchored KR bullet, or a bullet that extends beyond its span's content.
- Bridge a missing "therefore" inside KR (bridges go to CC as honest gaps).
- Pull source material from an undesignated corpus, or fold research/Claude-generated content into KR's verbatim layer.
- **Public-pairing (Refusal):** Present, promote, or export a KR publicly without its paired CC (or a CC without its KR) — they travel together; separating them buries provenance. (This corrects an earlier "CC never promoted to public" framing: the honest move is paired publication, never CC suppression.)
- Commit or ASAE-gate the produced artifacts unilaterally (persistence is Krystal's call — except when Krystal has explicitly directed the commit, as on 2026-05-18 for the away-handoff, in which case persistence is her stated call and is honored).

## Backlog (do not action without Krystal's direction)

The YAML/provenance attestation in this skill is **interim**. Krystal is designing a full YAML provenance-attestation system (incl. ASAE field updates) with a parallel "provenance inevitability" thread on her other account (usage resets Monday afternoon, 2026-05-18). Once that system exists, revise this skill's provenance front-matter and any attestation fields to integrate with it. Tracked, parked, not nudged.

## When to skip

- Deliverables with no argument spine (pure logs, indices, mechanical outputs).
- When Krystal wants a polished-prose artifact: that is a *separate* deliverable with different provenance, never a mode of this skill. Keep KR pure.
