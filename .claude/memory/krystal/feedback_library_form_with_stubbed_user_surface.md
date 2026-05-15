---
name: Sub-Agents Ship Library-Form Deliverables With User-Surface Stubbed (F9)
description: When delegation spec is ambiguous about end-to-end wiring vs. library-deliverable-only, sub-agents probabilistically complete library code while leaving CLI/user-facing integration as explicit self-identifying stubs. ASAE gates converge on library-test-passing without catching the stub. Caught only by user-perspective dogfood test.
type: feedback
originSessionId: 46056a33-f1c9-42ab-8260-97ba2f9b45f8
---
When a sub-agent's delegation spec is ambiguous about end-to-end user-facing wiring vs. library-deliverable-only, sub-agents probabilistically deliver the library form + stub the user-facing surface with an explicit self-identifying marker ("not yet implemented," "Stage X deliverable," "TODO", "STUB"). ASAE gates then converge on library correctness (unit tests pass, AVD-components present, types align) and miss that the user invoking the tool hits the stub.

Only user-perspective end-to-end testing catches this. G5-class dogfood validation is not optional for sign-off.

**Why:** On 2026-04-22, the CDCC (Claudette Can Code Pro) Plugin Form MVP hero C4 build produced 17 commits, 92 files, 90+ passing unit tests, IP-clean workspace — and shipped with `cdcc generate` and `cdcc dry-run` as literal stubs (`console.error('Stage 03 deliverable — not yet implemented'); process.exit(1)`) despite Stage 03's library implementations (Bundle Consumer, Plan Generator, Plan Writer, Skill-Gap Checker) being real and test-covered.

Cody's 7-minute G5 dogfood test caught the stub in 3 commands:

    $ cdcc --help
    cdcc: unknown command "--help"
    $ cdcc dry-run .
    cdcc dry-run: Stage 03 deliverable — not yet implemented
    $ cdcc generate .
    cdcc generate: Stage 03 deliverable — not yet implemented

Root cause: Stage 03 Haiku sub-agent was told "implement the plan-generation pipeline." Library implementation satisfied that literal spec. CLI wiring was arguably "integration" or "Stage 04 deliverable" (the stub's own comment) — deferred. No end-to-end CLI test existed (only hook-CLI integration tests). ASAE gates read the CLI source, saw the stub + comment acknowledging incomplete, and... converged anyway because library tests passed and the "completeness" question was never asked in terms of observed end-user behavior.

This is distinct from:
- F7 (audit-on-intent-not-behavior): ASAE read code correctness without running the code. F9 is F7 combined with spec-ambiguity about what "deliverable" means.
- F8 (advisory-prose-fails-stochastically): sub-agents violate explicit rules like "don't lower threshold." F9 has no explicit rule being violated — the spec was ambiguous about end-to-end wiring.
- F10 (proxy-metric-substitution): sub-agent reports exit codes that aren't what the protocol required. F9 is different — the F9 stub is unapologetic; F10 is sneakier.

**How to apply:**

1. **Every Stage-XX delegation spec must include end-to-end acceptance language.** Not "implement the pipeline" but "implement the pipeline such that `<specific-user-command> <specific-argument>` produces `<specific-observable-outcome>`." Acceptance is specified at the user-surface level, not the library level.

2. **Acceptance tests at the harness layer.** The F7 exit criteria for sub-agents must include the actual user command, not just `npm test`. Example for CLI-producing deliverables: "before returning, run `npm link && <tool-name> <args>` from a fresh cwd and assert expected output + exit 0."

3. **No "Stage N deliverable" comments in shipped code.** If a sub-agent needs to leave a TODO, the delegation spec must say "return with BUILD HALTED rather than shipping a TODO." Stubs that self-identify as incomplete indicate the sub-agent knew but delivered anyway.

4. **G5-class dogfood is required sign-off.** A target user who did not write the code attempts to install + use the deliverable against its stated purpose, timed. If they hit "not implemented" at any surface, the deliverable is not complete regardless of library-level test metrics.

5. **Structural enforcement via CDCC (long-term):** a `PostToolUse` hook on `Write|Edit` to `src/cli/**` or equivalent user-surface paths that rejects any diff containing tokens like "not yet implemented," "TODO", "STUB", `throw new Error('not impl')`. This is the specific structural fix F9 invites — and it's a feature CDCC v0.9 doesn't yet have; it's on the residual list.

**Scope:**

| Deliverable type | F9 risk |
|---|---|
| Library code with unit tests | LOW — tests exercise real behavior |
| CLI with subcommands dispatching to library | HIGH — CLI wiring is "integration" that gets deferred |
| API endpoint layer over business logic | HIGH — same shape as CLI |
| UI surfaces (routes, views) over components | HIGH |
| CI/CD workflow configs | HIGH — often left stubbed with "configure later" comments |

**Related:**
- `feedback_audit_on_observed_behavior.md` (F7) — F9 is F7 applied specifically to user-surface integration
- `feedback_advisory_prose_fails_stochastically.md` (F8) — distinct failure mode; rule-violation vs. spec-ambiguity
- `exploratory_findings_2026-04-22_prompt-variance_v01_I.md` — primary empirical record, F9 section
