---
name: upgrade-bundle
description: "Walk a D2R prerequisite bundle from an older methodology version to the current one. Triggers on: '/upgrade-bundle', 'upgrade D2R bundle', 'migrate bundle to v0.3.0', 'upgrade my PRD/TRD/AVD/TQVCD/UXD'. Reads each doc's methodology_version frontmatter, identifies the migration path (e.g., v0.1.x → v0.2.x → v0.3.0), applies version-specific section additions (UXD for v0.1→v0.2; IDs + non-visual excellence anchors + Reversal Cost + catastrophic states + locale visual treatment + Amendment Protocol for v0.2→v0.3), and preserves authored content verbatim where compatible. Produces an upgrade report with per-doc deltas and any open questions the migration cannot auto-resolve."
---

# Upgrade Bundle

## Purpose

Migrate a D2R 4-doc or 5-doc prerequisite bundle authored against an older methodology version to the current methodology version. The skill reads each doc's `methodology_version` frontmatter, identifies the migration path, applies version-specific section additions, and preserves authored content verbatim where compatible.

This skill exists because the methodology evolves while real-world projects accumulate authored bundles. A project authored against methodology v0.1.x (4-doc bundle, 5-track Stage 00) cannot be silently fed to a CDCC v1.1.0 plugin that expects methodology v0.3.0+ (5-doc bundle, 16+4 track Stage 00, IDs, Amendment Protocol). The plugin will refuse with a methodology_version compatibility error pointing at this skill.

## When to Use

- User says `/upgrade-bundle` with a planning directory path
- CDCC's `cdcc generate` returns a methodology_version compatibility error
- User has authored docs against an older template version and wants them current
- Pre-publication scrub flagged version asymmetry across a bundle's docs
- Methodology version bumps and existing bundles need migration to take advantage of new sections

## When NOT to Use

- New project with no existing bundle — invoke `/ideate-to-d2r-ready` directly
- Bundle is already at the current methodology version (skill is a no-op; surface the existing version)
- Doc is fundamentally incompatible (e.g., authored against a deprecated methodology branch that was retired) — escalate to user
- User wants to bypass version compatibility — refuse and explain why

## Inputs

- **Planning directory** — required; path to the bundle's directory containing PRD/TRD/AVD/TQVCD/UXD docs
- **Project prefix** — required for filename generation; surfaced if not in the bundle's existing filenames
- **Target methodology version** — optional; defaults to the current methodology version declared in `references/Methodology_Versioning_And_Amendment_Protocol_2026-04-26_v01_I.md`
- **Skip-doc flags** — optional; allow user to defer specific docs (e.g., `--skip-uxd` if UXD authoring is in-progress separately)

## Methodology Versioning Schema

Per `references/Methodology_Versioning_And_Amendment_Protocol_2026-04-26_v01_I.md`:

| Version | Bundle shape | Stage 00 tracks | Key features |
|---------|--------------|-----------------|--------------|
| 0.1.x | 4-doc (PRD/TRD/AVD/TQVCD) | 5 tracks | Initial bundle; pre-2026-04-25 |
| 0.2.x | 5-doc (adds UXD) | 16+4 tracks | UXD addition (2026-04-25); Stage 00 expansion (2026-04-26); 11 N-way alignment chains; Q9-Q12 applicability gates |
| 0.3.0 | 5-doc (TQVCD rename from TQCD) | 16+4 tracks | Heading-prefix IDs; non-visual excellence anchors (PRD §1.4); Reversal Cost (AVD §7); catastrophic states (UXD §3.2 + §3.4); locale visual treatment (UXD §6.5); Amendment Protocol; inline validation hooks; parallelization markers; Q13-Q16 non-visual readiness; TQCD → TQVCD full rename + cascade per Mod 6.5 (2026-04-27 Batch 1) |
| 0.4.0 | 6-doc (adds PSCAD) | 16+4 tracks | TQVCD §5.0 Verification Coverage Headline Metric (behaviors-verified / behaviors-claimed) + §5.4 banned-phrase list per Mod 6.5; TQVCD §5.0 production_pattern field per Mod 8.1 (v05+ schema); PSCAD as 6th D2R sibling doc per Mod 8 (Pattern-Space Coverage Audit; references TQVCD-VC entries by id; PRD §6 + TRD §3.1+§3.2 derive PSCAD §2 production conditions); Production Pattern Catalog at `_grand_repo/docs/Production_Pattern_Catalog_2026-04-27_v01_I.md`; Q17 Runtime third-party destinations + ASAE A22 Runtime Egress Disclosure per Mod 12 |

## Execution Protocol

### Phase 1: Detect Current Bundle State

For each doc in the bundle (up to 6 docs in v0.4.0+: PRD/TRD/AVD/TQVCD/UXD/PSCAD):

1. Read frontmatter — extract `methodology_version` field if present
2. If `methodology_version` absent, infer version from doc structure:
   - No UXD in bundle + 4 docs → v0.1.x
   - 5 docs but no §1.4 in PRD, no Reversal Cost in AVD, no §3.2 catastrophic in UXD → v0.2.x
   - 5 docs + v0.3.0 features but TQCD-named (not TQVCD), no §5.0 headline metric → v0.3.0-pre-rename (treat as v0.3.0 needing Mod 6.5 cascade)
   - 5 docs + TQVCD-named + §5.0 + §5.4 but no PSCAD → v0.3.0 (post-Mod 6.5)
   - 6 docs + PSCAD present + TQVCD §5.0 has production_pattern field → v0.4.0 (no upgrade needed)
3. Report per-doc detected version + recommended target version
4. Surface any docs that fail detection (corrupted frontmatter, missing required sections from any version) — escalate, don't auto-migrate

Produce Phase 1 summary: `[planning-directory]/bundle_upgrade_phase1_summary_[YYYY-MM-DD]_v01_I.md` with the detected-version table.

### Phase 2: Plan The Migration Path

Migration paths supported in this skill version:

- **v0.1.x → v0.2.x:** add UXD doc by invoking `/write-uxd` with PRD + TRD already authored as inputs; bump PRD/TRD/AVD/TQVCD frontmatter `methodology_version: 0.2.x`; Stage 00 track count expands to 16+4 in d2r-stage-00 expansion
- **v0.2.x → v0.3.0:** apply 6 section-level additions per doc + frontmatter bump (see §3 Migration Specifications)
- **v0.3.0-pre-rename → v0.3.0:** Mod 6.5 cascade — rename TQCD instance to TQVCD instance (file rename + 100+ TQCD→TQVCD substitutions in document body + TQCD-* heading-prefix IDs → TQVCD-* IDs) + add §5.0 Verification Coverage Headline Metric + §5.4 banned-phrase list + reframe §5.1 as internal-CI-only; update bundle index BIDX entries to reference new TQVCD filename
- **v0.3.0 → v0.4.0:** Mod 8 cascade — add PSCAD doc by invoking `/write-pscad` with PRD + TRD + TQVCD already authored as inputs; populate TQVCD §5.0 `production_pattern` field on every TQVCD-VC entry per Mod 8.1 v05+ schema (catalog reference OR inline production_pattern_inline OR PAT-GENERIC-NO-PRODUCTION-SHAPE marker with rationale); bump all 6 docs' frontmatter `methodology_version: 0.4.0`; update bundle index BIDX to include PSCAD entry. Plus add Q17 Runtime third-party destinations to PRD ideation context (if Phase 00 ideation summary exists) and TRD §3.5 + ASAE A22 attestation block per Mod 12.
- **v0.1.x → v0.4.0 (chained):** v0.1.x → v0.2.x → v0.3.0 → v0.3.0-pre-rename → v0.3.0 → v0.4.0 (run all phases in sequence)
- **v0.2.x → v0.4.0 (chained):** v0.2.x → v0.3.0 → v0.3.0-pre-rename → v0.3.0 → v0.4.0
- **v0.3.0-pre-rename → v0.4.0 (chained):** v0.3.0-pre-rename → v0.3.0 → v0.4.0
- **v0.1.x → v0.3.0:** chained migration v0.1.x → v0.2.x → v0.3.0 (run both phases in sequence)

For each doc in the bundle, generate a migration plan listing every change. Save to `[planning-directory]/bundle_upgrade_plan_[YYYY-MM-DD]_v01_I.md` for user review.

> **Stop & Verify before continuing past Phase 2.** Confirm:
> - User reviewed the per-doc migration plan
> - No doc has open questions the migration cannot auto-resolve
> - User explicitly approved the plan

### Phase 3: Execute Per-Doc Migration

For each doc, apply the migration specifications in §3. Each doc migration:

1. Read the existing doc content
2. Bump frontmatter version (e.g., `v02_I` → `v03_I`) and `methodology_version` (e.g., `0.2.x` → `0.3.0`)
3. Add the version-specific new sections per §3 specifications
4. Preserve all existing authored content verbatim where compatible
5. Write the new versioned file
6. Move the old version to `references/deprecated/` (project-local convention; for non-template instance docs, deprecated/ is a sibling of the planning directory)
7. Surface any content the migration could not auto-translate (e.g., existing requirements without IDs need IDs assigned — flag for user review)

Authorship of new sections is delegated to the appropriate `/write-*` skill in remediation mode targeting only the new section, not the full doc. Example: when adding PRD §1.4 Non-Visual Excellence Anchors, invoke `/write-prd` with `--target-section 1.4 --remediation-mode` so the prose interrogation runs only for the new section.

### Phase 4: Cross-Doc Audit

After all docs migrated, run `/asae` `domain=document` `severity=strict` `threshold=3` against the upgraded bundle. The 11 N-way alignment chains from `/ideate-to-d2r-ready` Phase 02 must pass. Findings route to the appropriate `/write-*` skill per the existing remediation routing table.

### Phase 5: Report

Generate the upgrade report at `[planning-directory]/bundle_upgrade_report_[YYYY-MM-DD]_v01_I.md`:

- Per-doc: from-version → to-version
- Per-doc: sections added, IDs assigned, content preserved verbatim, content requiring user review
- Cross-doc: alignment chain status post-migration
- Open questions auto-flagged for user resolution
- Next-step recommendation (typically: invoke `/dare-to-rise-code-plan` against the upgraded bundle, or address open questions first)

## §3. Migration Specifications

### v0.2.x → v0.3.0 Per-Doc Section Additions

**PRD migration:**
- Add Heading-Prefix IDs section to How-To-Use
- Add §1.4 Non-Visual Excellence Anchors (1.4.1 Operational; 1.4.2 Failure-Communication; 1.4.3 Audit-Trail; 1.4.4 Documentation; 1.4.5 Brand Voice; 1.4.6 Anti-Patterns)
- Add inline validation hooks at §2.1, §2.3, §3.1, §6.5, §6.6
- Add authorship parallelization markers to all section headers
- Add Amendment Protocol section before §10
- Add Downstream Use appendix with Stage 00 Track ↔ section mapping
- Update Validation Checklist with new items
- Bump frontmatter: `version: v03_I`, `methodology_version: 0.3.0`

**TRD migration:**
- Add Heading-Prefix IDs section to How-To-Use
- Add inline validation hooks at §3.1, §3.10
- Add authorship parallelization markers
- Expand §3.4 Privacy with CRD-shaped block conditional on Q12 APPLICABLE
- Add Amendment Protocol section before §10
- Update Validation Checklist
- Bump frontmatter

**AVD migration:**
- Add Heading-Prefix IDs section
- Add Reversal Cost field to §7 Mini-ADR format with worked example
- Add inline validation hooks at §3.1, §4.1, §5.7, §7
- Add authorship parallelization markers
- Add Amendment Protocol section before §10
- Update §3.1 component references to use AC-NN IDs
- Update Validation Checklist
- Bump frontmatter

**TQVCD migration:**
- Add Heading-Prefix IDs section
- Restructure §5.2 to Two-State Traceability Table (preserve original prose as introductory text; add table format with required columns)
- Add inline validation hooks at §2.1, §2.2, §3.1, §5.2, §7.1, §7.5, §9.2, §10
- Add authorship parallelization markers
- Add Amendment Protocol section before §12
- Update Validation Checklist
- Bump frontmatter

**UXD migration:**
- Add Heading-Prefix IDs section
- Restructure §3.2 to add Catastrophic state column (5th column alongside empty/loading/error/success)
- Add new §3.4 Catastrophic Failure Voice
- Add new §6.5 Locale-Specific Visual Treatment (applicability-gated to Q10 APPLICABLE)
- Add inline validation hooks at §1.1, §1.2, §2.1, §3.1, §5, §6.5
- Add authorship parallelization markers
- Add Amendment Protocol section before §9
- Update Validation Checklist
- Bump frontmatter

### v0.1.x → v0.2.x Per-Doc Section Additions

- Invoke `/write-uxd` to author UXD from scratch using PRD + TRD as input context
- Add §6.5 Cost applicability gate to PRD; add §6.6 Locale applicability gate to PRD
- Expand TRD §3 NFRs with §3.6 Maintainability, §3.7 Portability, §3.8 Observability, §3.9 Release Engineering, §3.10 Cost, §3.11 i18n
- Add TRD §6.6 Deployment Architecture & IaC; §6.7 Design System & Frontend Tooling
- Categorize AVD §3.1 components (App / Data / Observability / Auth / Queue / AI)
- Add TQVCD §10 Operational Acceptance Criteria

### v0.3.0-pre-rename → v0.3.0 Per-Doc Mod 6.5 Cascade

**TQCD → TQVCD instance migration:**
- File rename: `<ProjectPrefix>_TQCD_<YYYY-MM-DD>_v<NN>_I.md` → `<ProjectPrefix>_TQVCD_<YYYY-MM-DD>_v<NN+1>_I.md`
- Move old TQCD file to `[planning-directory]/deprecated/` per never-delete-always-deprecate rule
- Bulk substitution in renamed file: `s/TQCD/TQVCD/g` (heading-prefix IDs TQCD-TC-* → TQVCD-TC-*; TQCD-CC-* → TQVCD-CC-*; TQCD-EC-* → TQVCD-EC-*; TQCD-BG-* → TQVCD-BG-*; TQCD-AT-* → TQVCD-AT-*; doc title "Testing & Quality Criteria Document" → "Test Quality + Verification Coverage Document")
- Add new §5.0 Verification Coverage Headline Metric (behaviors-verified / behaviors-claimed metric + 3-step procedure + traceability table format with tautology_check column)
- Reframe existing §5.1 Code Coverage as "Code Coverage (Internal CI Metric Only — NOT User-Facing Headline)"
- Add new §5.4 Headline Metric Ban List (8+ banned phrases + 3 allowed-phrasing alternatives + 3 exemption paths)
- Bump frontmatter: `version: v04_I` (or higher), `methodology_version: 0.3.0` (still 0.3.0 — v0.4.0 is the PSCAD-addition bump)

**Other docs Mod 6.5 cascade:**
- PRD/TRD/AVD/UXD: bulk substitution `s/TQCD/TQVCD/g` for any cross-references to TQCD; bump `methodology_version: 0.3.0`
- Bundle index BIDX: update TQCD entry → TQVCD with new filename + new SHA-256

**Cross-skill cascade (already applied in repos canonical):** /asae A11.NEW-3 references TQVCD §5.1 + TQVCD-TC-17; /ideate-to-d2r-ready Phase 02 has new Verification-coverage chain; /write-tqvcd skill walkthrough adds §5.0 Step 3a; /upgrade-bundle (this skill) adds the migration path.

### v0.3.0 → v0.4.0 Per-Doc Mod 8 + Mod 12 Cascade

**Add PSCAD as 6th D2R doc:**
- Invoke `/write-pscad` with PRD + TRD + AVD + TQVCD + UXD already authored + approved as inputs
- PSCAD authorship sequenced AFTER TQVCD per design — production-memory accumulation discipline (don't fast-forward; let the gap exist)
- /write-pscad Step 1 verifies all 5 prerequisite docs exist; Step 2 loads PSCAD template + Production Pattern Catalog; Steps 3a-3b walk through patterns-in-scope + coverage matrix + gaps + remediations
- New PSCAD instance file: `<ProjectPrefix>_PSCAD_<YYYY-MM-DD>_v01_I.md` saved to planning directory

**TQVCD §5.0 production_pattern field population (Mod 8.1 v05+ schema):**
- For each existing TQVCD-VC entry in §5.0 traceability table, add `production_pattern` field with one of:
  - Canonical catalog id from `_grand_repo/docs/Production_Pattern_Catalog_2026-04-27_v01_I.md` (preferred): e.g., `PAT-CONCURRENCY-LOCKFILE-SKIP`
  - Inline `production_pattern_inline` block (when no catalog pattern fits and project hasn't yet promoted)
  - `PAT-GENERIC-NO-PRODUCTION-SHAPE` marker with rationale (only when behavior genuinely has no production shape)
- Bump TQVCD frontmatter `version: v05_I` (or higher), `supersedes:` field updated

**Mod 12 / A22 Runtime Egress cascade (PRD/TRD):**
- If Phase 00 ideation summary exists, add Q17 Runtime Third-Party Destinations answer (or generate from existing TRD §3.5 + dependency analysis)
- Add TRD §3.5 third-party-destinations subsection mirroring ASAE A22 attestation block format (per destination: hostname/URL pattern + protocol + data_classification + purpose + user_consent_gate + retention_per_their_tos + proxy_architecture)
- For consuming /asae gate: populate `A22_runtime_egress_disclosure` block in frontmatter

**Bundle index update:**
- Add PSCAD entry to BIDX with v01_I version + SHA-256
- Update bundle-doc count: 5 → 6
- Bump all 6 docs' frontmatter `methodology_version: 0.4.0`

**Cross-skill cascade (already applied in repos canonical 2026-04-27 evening):** /asae references TQVCD §5.0 + Production Pattern Catalog; /asae A22 Runtime Egress Disclosure aspect added; /ideate-to-d2r-ready Phase 01 Step 01.6 PSCAD authorship + Phase 02 PSCAD↔TQVCD/PSCAD↔TRD/PSCAD↔PRD chains + Q17 Runtime egress chain (Phase 00 Q17 ↔ TRD §3.5 ↔ A22); /write-tqvcd Step 7 production_pattern field walkthrough; /write-pscad new skill (this is the new authorship skill the migration invokes); /dare-to-rise-code-plan SKILL.md updated 5→6 doc bundle.

## ID Assignment Strategy

For docs migrating from a no-IDs version to v0.3.0, IDs are assigned during the migration. Assignment strategy:

1. Read each section that should have IDs per the v0.3.0 grammar
2. Detect existing items (bullet lists, headings without IDs, inline references)
3. Assign sequential IDs per the per-doc TYPE prefixes from Heading_Prefix_ID_Grammar
4. Update cross-references in the doc to use fully-qualified IDs
5. Surface items that could not be auto-detected for user review

## Anti-Patterns

- Migrating without user approval of the per-doc plan (Phase 2 stop is load-bearing)
- Auto-resolving open questions during migration (escalate; preserve as open questions in the new doc)
- Discarding or rewriting authored content during migration (preserve verbatim where compatible)
- Skipping the cross-doc audit at Phase 4 (chain inconsistencies introduced by partial migration are silent failures)
- Bumping `methodology_version` without applying the version's required new sections (creates a phantom-v0.3.0 doc that's still structurally v0.2.x)
- Migrating a doc that has unresolved Phase B/C amendment-log entries (the amendments may invalidate the migration plan; resolve amendments first)

## Related Skills

- `/write-prd`, `/write-trd`, `/write-avd`, `/write-tqcd`, `/write-uxd` — invoked in remediation mode for new sections
- `/asae` — Phase 4 cross-doc audit
- `/ideate-to-d2r-ready` — alternative entry point for fresh authoring (this skill is for upgrades only)
- `/dare-to-rise-code-plan` — downstream consumer of the upgraded bundle

## Related References

- `references/Methodology_Versioning_And_Amendment_Protocol_2026-04-26_v01_I.md` — methodology version schema
- `references/Heading_Prefix_ID_Grammar_2026-04-26_v01_I.md` — ID grammar applied during migration
- `references/Bundle_Index_Schema_2026-04-26_v01_I.md` — sidecar regeneration after migration
- `references/PRD_Template_2026-04-26_v03_I.md`, `references/TRD_Template_2026-04-26_v03_I.md`, `references/AVD_Template_2026-04-26_v03_I.md`, `references/TQVCD_Template_2026-04-26_v03_I.md`, `references/UXD_Template_2026-04-26_v02_I.md` — current target templates
