---
name: check-jd
description: "Source a job description correctly when working a job application — route by whether Krystal has applied yet. Triggers on: '/check-jd', '/check-job-description', '/reference-jd', 'check the jd', 'check job description', 'reference jd', 'refer to the job description', 'pull the jd'. PROSPECTIVE (drafting to apply) → the LIVE posting is canonical; fetch fresh from the web (or her just-grabbed paste); a saved Drive/repo copy is the drift-risk lookalike. RETROSPECTIVE (already applied) → the frozen copy she submitted under is canonical; the live web may have drifted. Never build on a paraphrase / handoff / search-summary — get the JD verbatim, with source + date."
---

# check-jd — source the job description correctly (route by apply-status)

When Krystal says "refer to / check the JD" while working a job application, **"the JD" is a specific artifact, not a topic to research.** The job of this skill is to put the *right copy* of it in front of you — and which copy is canonical flips depending on one fact.

## The one question that routes everything

Establish first: **has Krystal already submitted this application, or is she drafting to apply?**
If it isn't obvious from context, ask her in one line. This single fact inverts which copy is the source of truth.

## PROSPECTIVE — she is drafting to apply (default for cover-letter / résumé work)

- The **live posting is the source of truth.** She'll be judged against whatever the posting says *the moment she hits Submit.*
- **Reach for the web** — `WebFetch` the live posting URL (or use a copy she *just* grabbed). This is the **anti-drift** move, and it's what she wants here.
- A saved Drive/repo copy is the **lookalike to distrust** — it may predate an employer edit (new requirement, changed comp/tier, swapped boilerplate). Do **not** prefer it over the live posting.
- Source order: **live-page fetch ≈ her fresh paste  >  any saved copy.**

## RETROSPECTIVE — she already applied (follow-up, interview prep, "what did I commit to?")

- The **frozen copy she submitted under is canonical.** The live web may have drifted away from it since.
- Source order: **her saved / submitted copy  >  live web (flag: "may have changed since apply").**

## Always

- Get the JD **verbatim** — the literal posting text, never a paraphrase.
- Stamp **provenance**: source (URL / file) + **date** + mode (prospective / retrospective).
- A web **search-summary is a synthesis, not a source** — hearsay by Krystal's courtroom standard. If you must lean on one, tag it **"⚠️ web rendering — verify against the verbatim posting."**
- **Never** build a thesis on a **handoff, expertise summary, or anecdote bank.** Those are tertiary; they are *not* the JD. (This is the classic miss: reading the lit-review's conclusion and writing the paper on it.)

## If no canonical copy is in hand

**Stop and ask Krystal** — *"paste the posting, or give me the URL"* — rather than autonomously hunting repos/Drive and then settling for a lookalike. "Refer to the JD" points at a specific artifact; if you don't hold it, get it from her (or, prospective, fetch it live).

## The ladder, one line

> **Prospective:** live-fetch / fresh-paste **>** stale saved copy.
> **Retrospective:** frozen submitted copy **>** drifted live web.
> **Never:** paraphrase · handoff · search-summary.

## Output

Return the verbatim JD text **plus** a one-line stamp:
`JD source: <url|file> · <date> · <prospective|retrospective>`
