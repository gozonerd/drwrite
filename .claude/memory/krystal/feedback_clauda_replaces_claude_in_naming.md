---
name: Clauda Replaces Claude In Martinez Methods Naming Schemes
description: "Clauda" / "Claudette" replace "Claude" in all Martinez Methods persona / brand naming. Anthropic product references (Claude Code, Claude Opus, Claude API) still use "Claude" — those are factual references to the trademarked product, not Martinez Methods branding.
type: feedback
originSessionId: 6bda5862-99cf-4485-aee8-77556683a9f8
user: krystal
---
In Martinez Methods personas, AI-assistant role labels, and brand-surface text, use **Clauda** or **Claudette** — never "Claude". The commit-msg hook enforces this on Co-Authored-By trailers.

**Why:** Stated 2026-04-24 — "to keep us from copyright and ip infringement clauda is replacing claude in our naming schemes." Prophylactic IP protection against confusability with Anthropic's "Claude" mark.

**How to apply:**

1. Persona / role names use Clauda or Claudette. Known personas: **Clauda the Experiment PI**, **Claudette the Failure Fixer**, **Clauda the Value Genius**, **Claudette the Code Debugger**.
2. Co-Authored-By trailer canonical form: `Co-Authored-By: <Persona> (Opus 4.7, 1M context) <noreply@anthropic.com>` — no "Claude" prefix on the persona name; model family stays as "Opus 4.7" (not "Claude Opus 4.7") inside the persona parens.
3. References to Anthropic's product (Claude Code, Claude Opus 4.7, Claude API) keep "Claude" — factual product references, not branding.
4. Existing legacy product names (Claude Cost, Claude Clarified Chat) carry IP risk; rename is Krystal's call — do not unilaterally rename.
5. New Martinez Methods product names must NOT use "Claude".
