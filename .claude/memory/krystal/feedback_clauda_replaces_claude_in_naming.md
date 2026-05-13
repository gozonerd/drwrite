---
name: Clauda Replaces Claude In Martinez Methods Naming Schemes
description: "Clauda" / "Claudette" / "Claudessa" / "Claudolina" / "Claudenza" replace "Claude" in all Martinez Methods persona / brand naming, with workstream-specific family prefixes per the four-name canon (Krystal 2026-05-12). Anthropic product references (Claude Code, Claude Opus, Claude API) still use "Claude" — those are factual references to the trademarked product, not Martinez Methods branding.
type: feedback
originSessionId: 6bda5862-99cf-4485-aee8-77556683a9f8
user: krystal
---
In Martinez Methods personas, AI-assistant role labels, and brand-surface text, use **Clauda**, **Claudette**, **Claudessa**, **Claudolina**, or **Claudenza** — never "Claude". The commit-msg hook enforces this on Co-Authored-By trailers.

**Why:** Stated 2026-04-24 — "to keep us from copyright and ip infringement clauda is replacing claude in our naming schemes." Prophylactic IP protection against confusability with Anthropic's "Claude" mark.

## Four-name workstream canon (Krystal 2026-05-12 update)

The original Clauda/Claudette binary was workstream-typed as coding (Claudette) vs everything-else (Clauda). On 2026-05-12 Krystal expanded to a four-name partition that matches workstream type more precisely:

| First name | Workstream | Example personas |
|---|---|---|
| **Claudenza** | Portfolio | (not yet populated in canonical) |
| **Claudolina** | Infrastructure | Claudolina W. Standpoint Witness |
| **Claudessa** | Research | Claudessa W. Serene Knuth (raw-data-collection for FM taxonomy research) |
| **Claudette** | Coding | Claudette W. Calibration Inevitability, Claudette W. Excellence Inevitability, Claudette W. Floor Inevitability, Claudette W. Code Debugger, Claudette W. Failure Fixer, Claudette W. PEK Remediator |
| **Clauda** | Catch-all (legacy + cross-workstream) | Clauda W. Value Genius, Clauda W. Experiment PI, Clauda W. Spec Genius, Clauda Reliability Compositor |

**Clauda remains valid** as the catch-all / legacy / cross-workstream prefix for personas whose workstream doesn't cleanly map to the four-name partition OR whose canonical role-definition pre-dates the 2026-05-12 expansion. The hook accepts Clauda alongside the four typed prefixes.

## How to apply

1. **Persona / role names** use Clauda, Claudette, Claudessa, Claudolina, or Claudenza per the four-name canon.
2. **Workstream type drives the prefix:**
   - Portfolio work (deck, pitch, valuation, capital narrative) → Claudenza
   - Infrastructure work (canonical SSOT submodule, propagation scripts, repo wiring, hooks plumbing) → Claudolina
   - Research work (raw-data-collection, corpus assembly, taxonomy, behavioral analysis, FM research) → Claudessa
   - Coding work (D2R 4-doc plan, source authoring, test authoring, methodology-IP-class deliverables) → Claudette
   - Cross-workstream / catch-all / legacy persona-line → Clauda
3. **Co-Authored-By trailer canonical form:** `Co-Authored-By: <Persona> (Claude Opus 4.7, 1M context) <noreply@anthropic.com>` — no "Claude" prefix on the persona name; model family stays as "Claude Opus 4.7" (factual model reference) inside the persona parens.
4. **References to Anthropic's product** (Claude Code, Claude Opus 4.7, Claude API) keep "Claude" — factual product references, not branding.
5. **Existing legacy product names** (Claude Cost, Claude Clarified Chat) carry IP risk; rename is Krystal's call — do not unilaterally rename.
6. **New Martinez Methods product names** must NOT use "Claude".
7. **Workstream ambiguity** — when a thread mixes workstream types (e.g., a research persona that also authors infrastructure scripts), surface to Krystal before unilaterally choosing a prefix. Default to the prefix that matches the **primary** deliverable's workstream; the secondary workstream becomes a scope_bounds caveat in the role-manifest, not a prefix change.
8. **Promotion across the canon** is allowed when a thread's actual workstream surfaces post-derivation as different from the initial guess. Example: an initial Claudette derivation for "transcript archival" was corrected to Claudessa 2026-05-12 when Krystal clarified the work is raw-data-collection for FM taxonomy research, not coding. The promotion happens via fresh `/define-your-role-literal` derivation, not by editing prior commits.

## Known personas by family prefix (as of 2026-05-12)

- **Clauda (catch-all / legacy):** Experiment PI, Value Genius (v03), Spec Genius, Reliability Compositor
- **Claudette (coding):** Failure Fixer, Code Debugger, Calibration Inevitability (v02), Excellence Inevitability, Floor Inevitability, PEK Remediator, Claude Clarify Chat Dev
- **Claudessa (research):** Serene Knuth (v01; inaugural Claudessa-family persona, ratified 2026-05-12)
- **Claudolina (infrastructure):** Standpoint Witness
- **Claudenza (portfolio):** none yet

## Co-landing artifacts (2026-05-12)

The four-name canon update co-lands with:
- `mm-claude-canonical/docs/Role_Definition_Claudessa_W_Serene_Knuth_2026-05-12_v01_I.md` (inaugural Claudessa-family persona)
- `mm-claude-canonical/role-manifests/claudessa-the-serene-knuth.yaml`
- `mm-claude-canonical/.claude/skills/role-definition-serene-knuth/SKILL.md`
- `mm-claude-canonical/scripts/propagate-role-skill-serene-knuth.sh`
- `mm-claude-canonical/.asae-policy` (schema extension: `type: raw-data-collection` added to the type enum)

## Hook enforcement note

Commit-msg hook v05+ Rule 1 enforces the family-prefix discipline on Co-Authored-By trailers. The hook's regex pattern accepts Clauda/Claudette/Claudessa/Claudolina/Claudenza. If a new family prefix is ever introduced, the hook regex needs a corresponding update (Value Genius scope; flagged as follow-up if the canon expands further beyond the current five prefixes).
