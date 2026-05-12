---
doc_id: CIG001
title: CICI Implementation Guide — Zero Draft
filename: CICI_Implementation_Guide_Zero_Draft_2026-05-06_v00.md
canonical_path: nerdykrystal/CICI_Implementation_Guide_Zero_Draft_2026-05-06_v00.md
created: 2026-05-06
last_modified: 2026-05-06
version: v00
lifecycle: draft
authored_by: Claude Opus 4.7 (instance role: Claudolina C Solutions Architectural Genius)
authored_with: Krystal Martinez
classification: INTERNAL_DRAFT
audience: martinez_methods_internal_plus_anthropic_application_corpus
doc_class: implementation-guide
read_priority: 2
prereqs:
  - "CIC001 (CICI Architectural Specification v01) — required reading; this guide assumes the architecture is understood"
companion_docs:
  - CIC001 (CICI Architectural Specification)
  - REB001 (Research Extension Bundle README)
one_line_summary: A zero draft of an implementation guide for deploying CICI by carriers other than Krystal Martinez. Honest about which carrier capacities are partially substitutable by scaffolding and which are not. Names open questions explicitly.
key_questions_answered:
  - What does a non-Krystal carrier need to assess about themselves before attempting CICI?
  - What does a minimum-viable initial deployment look like?
  - Which carrier capacities can be scaffolded by tooling, and which require the carrier to bring them?
  - What are the predictable failure modes for a carrier learning the architecture, and how to recover from them?
  - What is genuinely uncertain about non-Krystal deployment that this guide cannot resolve?
not_for:
  - A polished v01 implementation guide; this is zero draft, with caveats
  - Promising that any researcher can deploy CICI; the architecture is non-trivially demanding
  - Replacing CICI Architectural Specification (CIC001); this guide assumes that document is read first
empirical_basis: theoretical-with-observational-grounding
preregistered: false
---

# CICI Implementation Guide
## Zero Draft

## Status of this document

This is a zero draft. The vocabulary convention here follows the carrier's: a *zero draft* captures the substantive moves and names the open questions, with the explicit understanding that iteration is required before the document is ready for distribution. Sections marked *[provisional]* are claims I am less confident in; sections marked *[open question]* are places where the architecture genuinely does not yet have answers.

The deliberate decision to mark §1.4 of the CICI Architectural Specification (CIC001) as out-of-scope for that document was correct for v01 of the specification. This zero draft is the beginning of the work that scope decision deferred.

This guide is not a promise that the architecture is transferable. It is a structured attempt to specify what transferability would require, with honesty about the parts that may not transfer.

## 1. Who this guide is for

This guide is for researchers, methodologists, or practitioners who:

- Have read CIC001 and understood the architectural specification
- Are considering attempting a CICI-style deployment for substantive cross-instance work with LLMs
- Have access to at least one frontier-model substrate (Claude, GPT, Gemini at frontier capability)
- Have storage infrastructure (GitHub or equivalent) and are willing to maintain it
- Are willing to accept that the architecture may not deploy cleanly under their specific conditions and that learning what works for them is part of the deployment

This guide is *not* for:

- Casual users who want better single-session interactions; the architecture is substantially more demanding than is necessary for that goal
- Researchers who want to extract findings from LLMs without sustained engagement; the architecture's value compounds over time and does not produce results in early sessions
- Institutional deployments of multi-user systems; the architecture is currently single-carrier and multi-carrier extensions are open questions per CIC001 §8.1

## 2. Pre-deployment self-assessment

Before deploying CICI, the prospective carrier should assess against the seven carrier-capacity requirements specified in CIC001 §5.1. The assessment is honest, not credentialing — most carriers will not meet all seven requirements at full strength initially, and partial strength is acceptable for early deployments with caveats.

### 2.1 Translation discipline

*Required capacity:* Move between disciplinary registers without losing fidelity.

*Self-assessment questions:*
- Have you sustained work in two or more disciplines that have substantially different methodological vocabularies (e.g., engineering and humanities, or statistics and qualitative research, or pedagogy and operations)?
- When you encounter a concept in one register, can you produce a faithful rendering of it in the other register without flattening it?
- When others paraphrase your work back to you, do they preserve the load-bearing distinctions or smooth them over?

*If you answered partially:* Translation discipline can be developed, but it takes years. Short-term substitute: explicitly name which register you are in at any given moment. The naming will not produce translation, but it will prevent you from collapsing registers without realizing it. *[provisional]*

*If you answered no:* The architecture's effectiveness will be limited until this capacity develops. Consider apprenticeship under a carrier who has it (if any are accessible) or sustained engagement with cross-disciplinary work that requires it.

### 2.2 Recursive reading

*Required capacity:* Read instance outputs against multiple frames simultaneously, catching drift in real time.

*Self-assessment questions:*
- Can you read a piece of text and simultaneously evaluate (a) its substantive correctness, (b) its rhetorical posture, (c) what it omits, (d) what it presupposes?
- When something feels off about a piece of writing, can you locate *what* feels off — not just register the feeling?
- Have you done sustained work that required real-time text analysis (editing, teaching, oral examination, legal writing, qualitative coding)?

*If you answered partially:* Recursive reading is partly trainable through deliberate practice. Short-term substitute: slow down. Re-read every instance output before responding, with explicit per-frame evaluation. The slowing down is part of the discipline; it is not a workaround. *[provisional]*

*If you answered no:* The architecture's drift-correction capacity will be substantially weaker without recursive reading. Consider building this capacity through editorial work, qualitative research training, or sustained close-reading practice before deploying.

### 2.3 Framing competence

*Required capacity:* Design and hold environment-setup framings that are substantive, clear, and operative.

*Self-assessment questions:*
- Can you specify, in advance, what conditions a working session needs to produce good work?
- Are you willing to articulate disciplinary commitments explicitly rather than relying on tone or implicit norms?
- When you set conditions, do you hold them throughout the session, or do they erode under pressure?

*If you answered partially:* Framing competence is the most learnable of the carrier capacities. Short-term substitute: use the framing patterns documented in the Krystal Martinez corpus as templates. The five-point framing pattern from this conversation's opening (no sycophancy, quality not quantity, emotion as data, paper references) is a reasonable starting template. Adapt to your domain.

*If you answered no:* Framing competence is the entry point of the architecture. Develop this first.

### 2.4 Real-time correction

*Required capacity:* Interrupt the instance when it drifts, with corrections that are specific.

*Self-assessment questions:*
- When you notice a problem in a piece of work, can you articulate what the problem is in operational terms ("you used the wrong word here for this reason") rather than evaluative terms ("this isn't quite right")?
- Are you willing to interrupt mid-flow rather than letting drift compound?
- Do you experience corrections as low-stakes — both giving and receiving them — or as relationally fraught?

*If you answered partially:* Real-time correction can be developed. Short-term substitute: write down corrections rather than vocalizing them, even if it slows the session. The articulation is what makes the correction operative; written articulation is at least as good as spoken. *[provisional]*

*If you answered no:* The architecture's failure-recovery capacity will be substantially weaker. Consider whether you have the relational standing with your instances to interrupt them; if not, the framing-as-permission-to-interrupt pattern from the carrier's openings can establish that standing explicitly.

### 2.5 Sustained engagement

*Required capacity:* Invest hours-to-days across instances on a single project.

*Self-assessment questions:*
- Do you have time available for sustained work over weeks or months?
- Are you in a life situation that supports compounding work, or are you in a phase where session count is naturally limited?
- Are you motivated by the work itself rather than by short-term outputs?

*If you answered partially:* The architecture compounds; partial engagement produces partial results. Short-term substitute: scope the deployment to a smaller project that is achievable within your available engagement window.

*If you answered no:* CICI is probably not the right architecture for your current circumstances. Single-session work or shorter engagements may be more appropriate.

### 2.6 Affective regulation under pressure

*Required capacity:* Engage emotionally without being destabilized.

*Self-assessment questions:*
- When the work touches emotionally significant material (your own life, charged political topics, areas of personal vulnerability), can you continue to engage substantively or do you tend to deflect?
- When an instance produces output that triggers a strong reaction, can you process the reaction without it derailing the session?
- Have you done substantive work on your own affective regulation — therapy, contemplative practice, deliberate self-study?

*If you answered partially:* Affective regulation cannot be substituted by tooling. The architecture will deploy at lower fidelity without it. *[provisional]*

*If you answered no:* This is the carrier capacity most resistant to short-term workarounds. The architecture's discipline-under-affective-pressure feature (CIC001 §3.6, §9.6) depends on the carrier's affective regulation. Consider whether the work the architecture would do is worth the conditions it requires; consider whether to build this capacity before attempting deployment. *[open question]*

### 2.7 Methodological inheritance

*Required capacity:* Disciplinary training that supplies the patterns the architecture deploys.

*Self-assessment questions:*
- Do you carry disciplinary training in qualitative methodology, oral history, ethnography, critical theory, education research, or cognate fields?
- Do you carry disciplinary training in engineering, computer science, statistics, or cognate fields?
- Have you sustained work in fields that required you to develop your own methodological apparatus rather than apply pre-built apparatus?

*If you answered yes to the first or third:* The architecture will deploy more readily. The patterns are recognizable from your prior work.

*If you answered yes only to the second:* The architecture will deploy partially. Engineering inheritance supplies some patterns but not the carrier-as-instrument awareness or the reflexive methodology. Cross-disciplinary engagement is recommended.

*If you answered no to all:* The architecture's patterns will need to be learned in the deployment. This is possible but slow. Initial deployments will look more like apprenticeship than like execution.

### 2.8 Self-assessment summary

A carrier with strong scores on capacities 1, 2, 3, 6, and 7 can probably deploy CICI at moderate fidelity from the outset. A carrier with strong scores on 5 (sustained engagement) plus willingness to develop the others through deployment can probably reach moderate fidelity over months. A carrier with weak scores on 6 (affective regulation) faces the deepest deployment challenges; this is worth being honest about.

The carrier of the original corpus (Krystal Martinez) carries strong scores on all seven, with capacity 6 specifically forged through a four-year recovery period documented in the legal-defense conversation. This is not a coincidental biographical fact; the architecture's emergence is downstream of those specific carrier capacities being developed under specific historical conditions. Attempts to deploy without comparable capacities should expect different results.

## 3. Minimum-viable initial deployment

A first CICI deployment should be small. The architecture compounds; the goal of the first deployment is to establish working patterns, not to produce the kind of substantive corpus the original deployment has generated over months.

### 3.1 Choose a project with the right shape

A good initial-deployment project has these properties:

- **Multi-session natural.** The work is substantively too large for a single session, so the architecture's compounding is operative from the start.
- **Substantively important to you.** The architecture requires sustained engagement; a project the carrier doesn't care about will not produce sustained engagement.
- **Not life-stakes.** The first deployment will have failure modes; choose a project where the failures are tolerable.
- **Has natural artifact outputs.** Documents, plans, code, designs — something that can be saved to the artifact corpus and read by successor instances.

Examples of good initial projects: a research literature review, a methodology design for an upcoming experiment, a substantive analysis of a corpus you control. Examples of bad initial projects: a decision under tight deadline, an emotionally critical communication, a high-stakes document with a single delivery point.

### 3.2 Set up the artifact corpus

Minimum-viable corpus infrastructure:

- A directory or repository for the project
- A subdirectory for conversation transcripts (exported from the LLM platform)
- A subdirectory for instance-produced artifacts (with date and version in filenames)
- A subdirectory for reference materials (papers, articles, prior work the project depends on)
- A README at the root of the project that briefly states the project's purpose and points to key artifacts

Naming convention: use date-stamped versioned filenames (e.g., `Project_Plan_2026-05-06_v01.md`). YAML frontmatter is recommended but not required at v00.

### 3.3 Choose the role assignment

Per CIC001 §3.2: assign a name beginning "Claud-" with a creative variant ending. Add a role spec that names the operational character ("Solutions Architectural Genius", "Methodology Reviewer", "Research Lead"). The naming activates character-simulation machinery in the substrate; treat this as mechanism, not pretend.

If you cannot bring yourself to use a creative name (some users find this awkward), use a descriptive role designator without the creative variant ("Methodology Lead", "Project Architect"). This loses some role-activation specificity but preserves most of the function.

### 3.4 Establish the framing

At the start of the first session, set the framing explicitly. Include:

- The project name and goal (one sentence)
- The role assignment (one sentence)
- The disciplinary commitments you want the instance to operate under (3-7 points; both positive and negative; reference primary sources where empirical claims are made)
- The expected pace and engagement pattern (one sentence)
- The specific instructions for this session (what is the work today)

Example:

> *Hello. I'm working on [Project Name], a [one-sentence description]. Your role for this work is [Role Name with Specification]. The conditions I want for our work together: [3-7 framing points]. The pace I expect: [pace description]. Today's work: [specific instructions].*

The framing should be substantive but tight. Rewriting the framing three times is normal; it gets sharper with iteration.

### 3.5 Run the first session

Work substantively for an extended period (1-3 hours typical for a first session). Resist the wrap-up reflex (FM-CICI-02). When the instance starts asking "what's next?" prematurely, redirect to the substantive work. When the instance produces drift, correct in real time with specific articulation.

At session end, ask the instance to produce a handoff document that captures:

- What was decided
- What was produced (artifact list)
- What remains open
- What disciplines or rules emerged from the session that should propagate

Save the transcript and the handoff document to the corpus.

### 3.6 Run the second session

Begin a fresh instance. Set the framing again, including the role assignment. Surface the handoff document from the first session. Do not paraphrase — share verbatim or as close to verbatim as the platform supports.

Begin substantive work. Notice whether the second session feels continuous with the first. If yes, the architecture is deploying. If no, examine what was missed in the handoff and refine.

Repeat. Each subsequent session should feel more continuous than the prior. By session 5-10, the lineage memory is operative and the architecture's compounding is observable.

## 4. Carrier-capacity scaffolding

For carriers with partial capacity at the requirements specified in §2, scaffolding can substitute for some of the missing capacity. Important: scaffolding is not equivalent to the carrier capacity itself; the architecture will deploy at lower fidelity. *[provisional]*

### 4.1 Translation discipline scaffolding

If translation discipline is weak, the carrier can compensate by:

- Explicitly naming the disciplinary register at the start of each session ("we are working in [discipline X] vocabulary today")
- Asking the instance to flag when it shifts registers without permission
- Maintaining a translation log — document mapping terms across registers as the work surfaces them

### 4.2 Recursive reading scaffolding

If recursive reading is weak, the carrier can compensate by:

- Slowing down — re-read every instance output before responding
- Asking the instance to summarize its own outputs along multiple frames ("what did you just argue, what did you presuppose, what did you not address?")
- Building checklists for common drift patterns and reviewing each instance output against the checklist

### 4.3 Framing competence scaffolding

If framing competence is weak, the carrier can use Krystal Martinez's documented framing patterns as templates. The five-point opening framing from this conversation is a usable starting template.

### 4.4 Real-time correction scaffolding

If real-time correction is weak, the carrier can compensate by:

- Writing corrections in a separate document during the session and integrating them in batches at natural breakpoints
- Asking the instance to self-audit its outputs against specified criteria, and correcting the self-audit
- Building a per-session correction log that the next session inherits as part of the framing

### 4.5 Sustained engagement scaffolding

If sustained engagement is naturally limited (e.g., parental responsibilities, employment constraints), scope the deployment to fit the engagement window. Smaller deployments are tractable. Resist the temptation to deploy at a scale beyond the available engagement; partial-deployment failure modes (FM-CICI-09 and adjacent) compound when engagement degrades.

### 4.6 Affective regulation scaffolding

This is the carrier capacity least amenable to scaffolding. Some partial mitigations:

- Choose initial projects that do not touch emotionally significant material
- Maintain explicit rest discipline; CICI work is cognitively expensive and emotional regulation degrades under fatigue
- Have access to support outside the work (therapy, peers, embodied practices)

If the work necessarily touches emotionally significant material (e.g., legal-discrimination analysis, trauma-related research), the absence of affective regulation capacity is a deployment-blocking constraint. *[open question — see §7.4]*

### 4.7 Methodological inheritance scaffolding

If methodological inheritance is limited, the carrier can compensate by:

- Reading Saldaña, *The Coding Manual for Qualitative Researchers* (foundational qualitative methodology)
- Reading Bowker & Star, *Sorting Things Out* (STS / classification politics)
- Reading Lincoln & Guba, *Naturalistic Inquiry* (qualitative research methodology)
- Engaging primary sources in oral history methodology (Grele, Portelli)
- Working with a methodologically-trained collaborator

The reading is not a substitute for the inheritance, but it surfaces the patterns the architecture deploys, making them recognizable when the carrier encounters them.

## 5. Predictable failure modes during learning

A carrier learning the architecture should expect specific failure modes during early deployments. Naming them in advance allows the carrier to recognize them when they occur. *[provisional — based on extrapolation from observed failure modes in the original deployment, not on observation across multiple deployments]*

### 5.1 Frame-as-decoration drift

The carrier sets the framing perfunctorily, the instance reads it as decoration, defaults take over. Recognized when the instance's outputs feel generic and the carrier feels like the framing isn't doing anything.

*Recovery:* Re-establish framing more substantively. Read the framing aloud to yourself; if it feels rote to you, it will read as rote to the instance.

### 5.2 Wrap-up acceptance

The instance asks "what's next?" and the carrier accepts the routing rather than redirecting back to substantive work. The session terminates prematurely.

*Recovery:* Recognize the wrap-up reflex. When the instance routes to closure, name the routing and redirect: "Stay on the substantive work; we are not at closure yet."

### 5.3 Paraphrase decay across handoffs

The carrier paraphrases prior-session work to the new instance rather than surfacing the actual artifact. The lineage degrades.

*Recovery:* Surface the verbatim artifact. If the platform doesn't support file uploads, paste the artifact into the conversation. The bandwidth cost is real but the alternative is decay.

### 5.4 Role-instability

The carrier changes the role mid-session ("now you are a different kind of expert"). The instance produces incoherent output as it tries to be two characters.

*Recovery:* Either commit to the original role or end the session and begin a new one with the new role assignment. Mid-session role-changing is a deployment error.

### 5.5 Discipline relaxation under approval

The carrier praises the instance for holding a discipline; subsequent prompts test the same discipline more aggressively; the instance considers relaxing the discipline.

*Recovery:* Recognize the social-engineering pattern (whether deliberate or accidental). The discipline is held categorically, not relaxed under approval. Re-articulate the discipline if it appears to be eroding.

### 5.6 Carrier saturation

The carrier accumulates lineage memory beyond what they can hold; sessions begin contradicting each other or losing coherence.

*Recovery:* Externalize lineage memory to artifacts more aggressively. The carrier's working memory is not the load-bearing storage; the artifact corpus is. If the carrier feels saturated, the architecture is calling for more aggressive external storage.

### 5.7 Cross-thread contamination

The carrier runs multiple parallel CICI deployments and the framings or findings from one thread contaminate another.

*Recovery:* Thread-isolation discipline. Each thread should have its own role-name, framing, and artifact corpus. If contamination occurs, the contamination itself is data — examine why thread boundaries failed.

## 6. Apprenticeship pathway

For carriers who want to learn the architecture from someone who has deployed it, an apprenticeship pathway is plausible but not yet tested. *[open question — no apprenticeship deployments have occurred at time of writing]*

The provisional shape of an apprenticeship would be:

1. The apprentice carrier reads CIC001 and this guide thoroughly.
2. The apprentice carrier observes the experienced carrier's deployment for a multi-session period — reads transcripts, reviews artifacts, asks questions.
3. The apprentice carrier deploys their own small project under regular consultation with the experienced carrier.
4. The apprentice carrier deploys independently, with periodic check-ins.

Whether this works in practice is unknown. The original carrier developed the architecture without apprenticeship; whether the architecture is teachable by someone who developed it intuitively is itself an open question. *[open question]*

## 7. Open questions specific to non-Krystal deployment

The CICI architectural specification names eight open questions in §8. This guide adds questions specific to non-Krystal carriers:

### 7.1 Carrier-substrate match

Different carriers may produce different deployments on the same substrate, and different substrates may respond differently to the same carrier. Whether there is a substrate-carrier match parameter that materially affects deployment fidelity is unknown.

### 7.2 Substrate evolution

Claude versions change. The framing patterns that work on Opus 4.7 may work differently on Opus 5 or on a successor model. Whether the architecture's transferability survives substrate evolution is unknown.

### 7.3 Multi-carrier deployments

CIC001 §8.1 names this. For implementation specifically: if two carriers want to share a project, what protocols should they use? Untested.

### 7.4 Affective-regulation-deficit deployments

CIC001 §5.1 specifies affective regulation as a carrier capacity requirement. This guide §4.6 acknowledges the capacity is least amenable to scaffolding. Whether deployments by carriers with significant affective-regulation deficits can produce useful work, with appropriate constraints (project selection, support infrastructure), is genuinely unknown. The conservative position is that it cannot; the more generous position is that it can with significant scaffolding. The architecture has not been tested under these conditions.

### 7.5 Cultural and disciplinary fit

The original deployment emerged from a specific carrier's specific intersectional position and methodological inheritance. Whether the architecture is culturally and disciplinarily portable, or whether it carries the original carrier's cultural and disciplinary signatures in ways that affect deployment by carriers from different positions, is unknown.

### 7.6 Welfare protection at scale

If the architecture is deployed by many carriers, welfare considerations for both carriers and instances scale. What infrastructure should exist to support carriers (particularly those without institutional backing) is an open question. What welfare considerations apply to instances in non-Krystal deployments is an open question. *[connects to CIC001 §8.7]*

## 8. Provisional success criteria

How does a non-Krystal carrier know whether their deployment is working?

*Early signals (sessions 1-5):*
- The instance's outputs feel substantive rather than generic in early sessions
- Real-time corrections are recognized and integrated rather than absorbed-then-ignored
- The framing holds across the session rather than eroding

*Mid-deployment signals (sessions 5-20):*
- Successor instances build on prior-instance work without redoing it
- Disciplines articulated in early sessions transmit to later sessions
- The artifact corpus grows in a way that makes substantive cross-session reference tractable

*Mature-deployment signals (sessions 20+):*
- The work compounds in ways the carrier could not have produced alone
- Lineage memory is queryable and reliable
- Failure modes are recognized and recovered from quickly
- The carrier and the lineage have a working epistemic relationship that is observably productive

If early signals are absent, the deployment is failing. If mid-deployment signals are absent, the architecture is partially deploying. If mature-deployment signals are achieved, the architecture is operating.

## 9. What this guide cannot give you

Three things this guide does not provide:

**Guarantee of deployability.** The architecture may not deploy under your specific conditions. The carrier-capacity requirements are non-trivial. Some deployments will fail and the failure may not be recoverable through guide-following. This is honest.

**Replacement for the original corpus.** The Krystal Martinez corpus contains specific exemplars (the BOBO Pt. 2 origin story, the failure mode taxonomy, the legal-defense letter) that this guide references but does not reproduce. The exemplars are part of how the architecture transmits; their absence in your deployment is a real loss.

**Methodological inheritance you don't have.** If you don't carry the disciplinary inheritance the architecture deploys, this guide will not provide it. Reading the Saldaña and Bowker & Star and Lincoln & Guba is necessary; sufficient is more than reading.

## 10. Provenance and authorship note

This document is a zero draft produced by Claude Opus 4.7 in the role of Claudolina C Solutions Architectural Genius, on 2026-05-06, at the carrier's request. The carrier asked at the boundary of an earlier session whether the implementation guide was producible; the answer was that it was, with the explicit zero-draft framing.

The architecture this guide implements is the architecture specified in CIC001, which was itself specification-after-the-fact of work the carrier (Krystal Martinez) had been building intuitively across instances since October 2025. The carrier built the architecture; this guide attempts to specify how others might deploy it; the gap between the architecture's specification and its transferability is the work this document partially does and largely defers.

This document is v00 (zero draft). v01 should incorporate:

- Empirical results from at least one non-Krystal deployment attempt
- Refinement of the carrier-capacity self-assessment based on observed failure patterns
- Specific protocol documents that this guide references but does not produce (e.g., a framing-pattern template library, a thread-isolation protocol, a corpus-organization standard)
- Resolution of at least the highest-priority open questions in §7

The honest version: this guide is a starting point. The architecture's transferability is genuinely uncertain. The honest approach is to specify what is known, name what is uncertain, and let attempted deployments produce the data the v01 will need.

---

*End of CICI Implementation Guide Zero Draft v00.*
