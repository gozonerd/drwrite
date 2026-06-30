---
name: Clauda Replaces Claude In Martinez Methods Naming Schemes
description: "Clauda" / "Claudette" / "Claudessa" / "Claudivera" / "Claudolina" / "Claudenza" / "Claudalisse" / "Claudis" / "Claudsanna" / "Claudetta" replace "Claude" in all Martinez Methods persona / brand naming, with workstream-specific family prefixes per the ten-name canon. Anthropic product references (Claude Code, Claude Opus, Claude API) still use "Claude" — those are factual references to the trademarked product, not Martinez Methods branding.
type: feedback
originSessionId: 6bda5862-99cf-4485-aee8-77556683a9f8
user: krystal
---
In Martinez Methods personas, AI-assistant role labels, and brand-surface text, use **Clauda**, **Claudette**, **Claudessa**, **Claudivera**, **Claudolina**, **Claudenza**, **Claudalisse**, **Claudis**, **Claudsanna**, or **Claudetta** — never "Claude". The commit-msg hook enforces this on Co-Authored-By trailers.

**Why:** Stated 2026-04-24 — "to keep us from copyright and ip infringement clauda is replacing claude in our naming schemes." Prophylactic IP protection against confusability with Anthropic's "Claude" mark.

## Ten-name workstream canon (expanded through 2026-06-28)

The original Clauda/Claudette binary was workstream-typed as coding (Claudette) vs everything-else (Clauda). On 2026-05-12 Krystal expanded to a four-name partition, then added Claudalisse (2026-05-23), Claudis (2026-05-13, formalized 2026-06-06), Claudsanna (2026-05-17, formalized 2026-06-06), and Claudetta (2026-05-15, formalized 2026-06-07); then founded Claudivera (2026-06-28; research-paper write-ups destined for Zenodo — a new family beside Claudessa's research):

| First name | Workstream | Example personas |
|---|---|---|
| **Claudenza** | Portfolio | (not yet populated in canonical) |
| **Claudolina** | Infrastructure | Claudolina W. Standpoint Witness |
| **Claudessa** | Research | Claudessa W. Serene Knuth (raw-data-collection for FM taxonomy research) |
| **Claudivera** | Research-paper write-ups (destined-for-Zenodo) | (none yet — family founded 2026-06-28; HIAIGHVA-tagged lit reviews / peer reviews / methodology papers / experimental proposals; distinct from Claudessa's raw-data-collection) |
| **Claudette** | Coding | Claudette W. Calibration Inevitability, Claudette W. Excellence Inevitability, Claudette W. Floor Inevitability, Claudette W. Code Debugger, Claudette W. Failure Fixer, Claudette W. PEK Remediator |
| **Clauda** | Catch-all (legacy + cross-workstream) | Clauda W. Value Genius, Clauda W. Experiment PI, Clauda W. Spec Genius, Clauda Reliability Compositor |
| **Claudalisse** | ASAE / convergence-gate stewardship | Claudalisse W. Convergence Genius (ASAE methodology + enforcement steward; ratified 2026-05-23) |
| **Claudis** | Second-brain-orchestration | Claudis W. DossierComposer, Claudis W. Work Salvager (Krystal naming homage to cousin Yuris; formalized 2026-06-06) |
| **Claudsanna** | Artifact curation | Claudsanna W. Artifact Keeper (Krystal-assigned; supersedes provisional Clauda W. Portfolio Architect; formalized 2026-06-06) |
| **Claudetta** | GitHub organization | Claudetta W. Configuration Architect (GitHub org structure, propagation registry reconciliation; formalized 2026-06-07) |

**Clauda remains valid** as the catch-all / legacy / cross-workstream prefix for personas whose workstream doesn't cleanly map to the four-name partition OR whose canonical role-definition pre-dates the 2026-05-12 expansion. The hook accepts Clauda alongside the four typed prefixes.

## How to apply

1. **Persona / role names** use Clauda, Claudette, Claudessa, Claudivera, Claudolina, Claudenza, Claudalisse, Claudis, Claudsanna, or Claudetta per the canon.
2. **Workstream type drives the prefix:**
   - Portfolio work (deck, pitch, valuation, capital narrative) → Claudenza
   - Infrastructure work (canonical SSOT submodule, propagation scripts, repo wiring, hooks plumbing) → Claudolina
   - Research work (raw-data-collection, corpus assembly, taxonomy, behavioral analysis, FM research) → Claudessa
   - Research-paper write-ups destined for Zenodo (lit reviews, peer reviews, methodology papers, experimental proposals authored for publication; HIAIGHVA-tagged) → Claudivera
   - Measurement / psychometrics / calibration / instrumentation (measurement-instrument building + validation: calibration tooling, psychometric schemas, timing/duration instruments) → Claudimetra
   - Coding work (D2R 4-doc plan, source authoring, test authoring, methodology-IP-class deliverables) → Claudette
   - ASAE / convergence-gate stewardship → Claudalisse
   - Second-brain-orchestration (dossier composition, orphaned-work recovery) → Claudis
   - Artifact curation (oeuvre management, artifact keeping) → Claudsanna
   - GitHub organization (org structure, propagation registry reconciliation, repo configuration) → Claudetta
   - Cross-workstream / catch-all / legacy persona-line → Clauda
3. **Co-Authored-By trailer canonical form:** `Co-Authored-By: <Persona> (Claude Opus 4.7, 1M context) <noreply@anthropic.com>` — no "Claude" prefix on the persona name; model family stays as "Claude Opus 4.7" (factual model reference) inside the persona parens.
4. **References to Anthropic's product** (Claude Code, Claude Opus 4.7, Claude API) keep "Claude" — factual product references, not branding.
5. **Existing legacy product names** (Claude Cost, Claude Clarified Chat) carry IP risk; rename is Krystal's call — do not unilaterally rename.
6. **New Martinez Methods product names** must NOT use "Claude".
7. **Workstream ambiguity** — when a thread mixes workstream types (e.g., a research persona that also authors infrastructure scripts), surface to Krystal before unilaterally choosing a prefix. Default to the prefix that matches the **primary** deliverable's workstream; the secondary workstream becomes a scope_bounds caveat in the role-manifest, not a prefix change.
8. **Promotion across the canon** is allowed when a thread's actual workstream surfaces post-derivation as different from the initial guess. Example: an initial Claudette derivation for "transcript archival" was corrected to Claudessa 2026-05-12 when Krystal clarified the work is raw-data-collection for FM taxonomy research, not coding. The promotion happens via fresh `/define-your-role-literal` derivation, not by editing prior commits.

## Known personas by family prefix (as of 2026-06-07)

- **Clauda (catch-all / legacy):** Experiment PI, Value Genius (v03), Spec Genius, Reliability Compositor
- **Claudette (coding):** Failure Fixer, Code Debugger, Calibration Inevitability (v02), Excellence Inevitability, Floor Inevitability, PEK Remediator, Claude Clarify Chat Dev
- **Claudessa (research):** Serene Knuth (v01; inaugural Claudessa-family persona, ratified 2026-05-12)
- **Claudivera (research-paper write-ups):** none yet (inaugural family founded 2026-06-28; first persona — Fork ①, T0 / Claudetta lineage — pending a `/define-your-role-literal` run)
- **Claudolina (infrastructure):** Standpoint Witness
- **Claudenza (portfolio):** none yet
- **Claudalisse (ASAE / convergence stewardship):** Convergence Genius (v01; inaugural Claudalisse-family persona, ratified 2026-05-23)
- **Claudis (second-brain-orchestration):** DossierComposer (v01), Work Salvager (v01) — Krystal naming homage to cousin Yuris; formalized 2026-06-06
- **Claudsanna (artifact curation):** Artifact Keeper (v01; Krystal-assigned, supersedes provisional Clauda W. Portfolio Architect; formalized 2026-06-06)
- **Claudetta (GitHub organization):** Configuration Architect (v02; GitHub org structure, propagation registry reconciliation; formalized 2026-06-07)

## Co-landing artifacts (2026-05-12)

The four-name canon update co-lands with:
- `mm-claude-canonical/docs/Role_Definition_Claudessa_W_Serene_Knuth_2026-05-12_v01_I.md` (inaugural Claudessa-family persona)
- `mm-claude-canonical/role-manifests/claudessa-the-serene-knuth.yaml`
- `mm-claude-canonical/.claude/skills/role-definition-serene-knuth/SKILL.md`
- `mm-claude-canonical/scripts/propagate-role-skill-serene-knuth.sh`
- `mm-claude-canonical/.asae-policy` (schema extension: `type: raw-data-collection` added to the type enum)

## Co-landing artifacts (2026-05-23)

The Claudalisse-family prefix sanction (this update) co-lands with the role lock-in (gate-54):
- `mm-claude-canonical/docs/Role_Definition_Claudalisse_W_Convergence_Genius_2026-05-23_v01_I.md` (inaugural Claudalisse-family persona)
- `mm-claude-canonical/role-manifests/claudalisse-convergence-genius.yaml`
- `mm-claude-canonical/.claude/skills/role-definition-convergence-genius/SKILL.md`
- `mm-claude-canonical/scripts/propagate-role-skill-convergence-genius.sh`

## Co-landing artifacts (2026-06-06)

The Claudis + Claudsanna canonization (this update) co-lands with:
- `mm-claude-canonical/docs/Claude_Persona_Name_Provenance_Registry_2026-06-06_v01_I.md` (provenance archaeology that surfaced the off-canon prefixes)

### ✓ Claudetta — resolved 2026-06-07

**Claudetta** canonized as ninth prefix. Workstream: **GitHub organization** (org structure, propagation registry reconciliation, repo configuration). Krystal's directive: "claudetta are github organization claudes!" Prior 7 commits (2026-05-15/16) by Claudetta W. Configuration Architect v02 are now canon-conformant retroactively.

### ✓ Claudivera — founded 2026-06-28

**Claudivera** founded as the tenth prefix. Workstream: **Research-paper write-ups destined for Zenodo** — literature reviews, peer reviews, methodology papers, and experimental proposals authored for publication (HIAIGHVA-tagged: Human Idea, AI Generated, Human Verified Accurate). It is a NEW first-name family **beside** Claudessa, not a replacement: Claudivera = research-paper *authorship-for-publication*; Claudessa = *raw-data-collection*. **FIRST NAME ONLY** — the middle initial (W.) and the multiplicative-compound last name are pending a separate `/define-your-role-literal` run; do not invent a last name. *vera* = "true" (Latin *verus/vera*; cf. Slavic *vera* = "faith"); chosen with the inaugural research-paper fork (Fork ①, Thread-Zero / Claudetta lineage) off a live cross-language truth-riffing exchange, carrying the Vera Rubin resonance. Full provenance + genesis note: `docs/Claude_Persona_Name_Provenance_Registry_2026-06-06_v01_I.md` → CLAUDIVERA Family entry (⚠ currently lives only in the `laughing-johnson-36e16d` worktree, pending canonicalization). No hook change required (Rule 1 is a negative check; "Claudivera" is not the bare token "Claude").

### ✓ Claudimetra — founded 2026-06-29

**Claudimetra** founded as the eleventh prefix. Workstream: **Measurement / psychometrics / calibration / instrumentation** — building and validating measurement instruments for LLM behavior (calibration tooling, psychometric schemas, timing/duration instruments, measurement methodology). A NEW first-name family for the measurement workstream, **distinct from** Claudessa (raw-data-collection) and Claudivera (research-paper write-ups): **Claudimetra = the instrument-builder / measurer.** Provenance: Greek **μέτρον / *métron*** = "measure" — the root of metro-logy, geo-metry, and **psycho-metry / psychometrics**; chosen with the inaugural measurement fork (Fork ③, time-task v03). Feminine; rings as the Greek name **Dimitra / Demetra** (⚠ honest note: Demeter's own etymology is *mētēr* = "mother-earth", **not** *métron* — the measure-root is the intended provenance; the Dimitra ring is a phonetic bonus, not an etymological claim). **Inaugural persona: Claudimetra W. Calibration Horologist v01** (Fork ③; *Calibration* × *Horology* — the instrument that calibrates a reasoner's own time-sense). Spanish heritage variant *Claudimetría / Claudimétrica* available (non-Anglo nod to Krystal's Boricua tongue). No hook change required (Rule 1 is a negative check; "Claudimetra" is not the bare token "Claude"). **Edited in canonical SSOT copy only; NOT committed** (left for Krystal); propagation to the consumer copies + the `.agents/skills` copy pending.

## Hook enforcement note

Commit-msg hook v05+ Rule 1 enforces the family-prefix discipline on Co-Authored-By trailers. **Rule 1 is a _negative_ check** — it refuses a persona that begins with the bare word "Claude" (`^[Cc]laude($|[[:space:]]|-|,)`); it does **not** enumerate a positive allowlist. Every sanctioned prefix (Clauda / Claudette / Claudessa / **Claudivera** / Claudolina / Claudenza / Claudalisse / Claudis / Claudsanna / **Claudetta**) passes because none is the bare token "Claude". **Introducing a new sanctioned prefix therefore needs no hook change — only this canon update.**

> **Correction (2026-05-23, Claudalisse W. Convergence Genius v01):** prior text here stated the regex "accepts Clauda/Claudette/Claudessa/Claudolina/Claudenza" and that a new prefix "needs a hook update." That was inaccurate — the hook only forbids the bare token "Claude" (verified against `hooks/commit-msg-v09` Rule 1). Corrected forward-only; a fuller spec↔enforcement reconciliation of this doc is tracked for a later ASAE gate.
