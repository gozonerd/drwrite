---
name: create-database
description: "Design and author a PostgreSQL database schema (DDL) and architecture document from domain source materials. Triggers on: '/create-database', '/create database', 'create-database', 'design a database', 'database schema for', 'write a schema for', 'build me a database', 'I need a database for'. Walks through requirements gathering, engine selection rationale, schema design (ENUM types, tables, constraints, indexes, views), architecture documentation, and optional print-ready HTML for partner review. Produces two artifacts: db/schema.sql and docs/architecture.md."
version: 1.1.0
authored_by: Claudette the Code Debugger v01 (2026-05-12)
type: skill
classification: authorship-class
provenance: Extracted from mm-fm-taxonomy Batch 2 database schema design session (gate-02, commit 49ce3ca). Schema pattern proven on 11-table + 3-view PostgreSQL design for the failure mode taxonomy audit trail.
changelog:
  - "1.0.0 (2026-05-12): Initial release. 9-step protocol, engine selection guide, 10 anti-patterns."
  - "1.1.0 (2026-05-12): Added singular-noun table naming convention as Step 4 sub-rule and as anti-pattern. Aligns with DBA-traditional convention (Joe Celko, Microsoft). Partner DB backgrounds typically expect singular. Includes worked example (a table of octopi: octopuses vs octopi vs octopodes) + table of 12 other irregular-noun cases (mouse, child, person, datum, criterion, phenomenon, index, etc.) where singular avoids the debate."
---

# /create-database

## Purpose

Design and author a relational database schema from domain source materials. Produces two load-bearing artifacts:

1. **`db/schema.sql`** — Full PostgreSQL DDL wrapped in a transaction (`BEGIN` / `COMMIT`), with ENUM types, tables, constraints, indexes, views, and `COMMENT ON` annotations
2. **`docs/architecture.md`** — Design rationale, ER overview, table descriptions, view explanations, deployment notes, migration strategy, and constraint inventory

The skill encodes the structural pattern that produced the mm-fm-taxonomy schema (11 tables, 3 views, 9 ENUM types, 17 indexes, strict-5 PASS with 2 independent raters). Any Opus persona can invoke it to get the same rigor on a new domain.

## When to Use

- Starting a new project that needs a relational database
- Migrating data from markdown/JSON/CSV into a structured relational store
- The user says "I need a database for X" and has source materials describing the domain
- A `/dare-to-rise-code-plan` TRD specifies a relational database and the schema needs authoring
- A repo scaffold (via `/new-repo`) created `db/` and `docs/` directories that need populating

## When NOT to Use

- The database already exists and needs migration scripts only (use `db/migrations/` pattern directly)
- The project needs a document store / key-value store / graph database (this skill is relational-first; PostgreSQL-first)
- The user wants to modify an existing schema (read the existing schema, design migrations, don't re-run this skill)

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| Domain description | Yes | What the database models (one sentence minimum) |
| Source materials | Yes | Paths to files that define the domain's entities, relationships, and vocabulary. These are the source-of-truth for table/column/ENUM design. |
| Deployment context | Yes | Where the database runs (VPS, cloud, local dev), who deploys, budget constraints |
| Target repo | Yes | Where `db/schema.sql` and `docs/architecture.md` will be written |
| Query patterns | Recommended | What questions the database needs to answer (drives view and index design) |
| Existing schema | No | If migrating from a prior version, path to the old DDL |

## Execution Protocol

### Step 1: Read All Source Materials

Read every file the user identifies as a source. For each one, extract:

- **Entities** — nouns that become tables (e.g., "taxonomies", "evidence entries", "aspects")
- **Relationships** — how entities connect (1:N, M:N, standalone)
- **Controlled vocabularies** — finite sets of values that become ENUM types (e.g., status values, category codes, type classifiers)
- **Identifier patterns** — how entities are referenced (e.g., `EE-{CATEGORY}-{BUILD}-{NN}`, `EC-01`, `F11`)
- **Constraints** — business rules that become CHECK constraints (e.g., "sub_shape only applies to DRR entries")
- **Append-only vs mutable** — which tables allow updates vs insert-only (drives `updated_at` column inclusion)

Present findings to the user as a structured extraction table before proceeding. Get confirmation.

### Step 2: Design Entity-Relationship Model

Produce a text-based ER diagram showing:

```
parent_table ─────< child_table ────< junction_table >──── other_parent
```

Use these symbols:
- `─────<` = one-to-many (FK in child)
- `>────` = many-to-one (FK in this table)
- `>──── ... ────<` through a junction = many-to-many
- `(standalone)` = no FK relationships

For each relationship, state:
- **Cardinality** — 1:N or M:N with expected row counts
- **Delete policy** — RESTRICT (prevent orphans), CASCADE (delete children), SET NULL (unlink)
- **Rationale** — why this policy (one sentence)

Present to user for confirmation before proceeding.

### Step 3: Design ENUM Types

For every controlled vocabulary extracted in Step 1, create a PostgreSQL ENUM:

```sql
CREATE TYPE status_name AS ENUM (
    'VALUE_1',    -- inline comment explaining this value
    'VALUE_2',    -- inline comment
    ...
);
```

**ENUM design rules:**
- Values come from source materials, not invention. Every value must trace to a source document.
- Use UPPER-CASE or lowercase consistently within one ENUM (match the domain's convention)
- Hyphenated values are allowed in PostgreSQL ENUMs (e.g., `'OUT-OF-SCOPE'`)
- Add inline comments explaining each value's meaning
- Order values by domain logic (e.g., severity high-to-low, lifecycle early-to-late), not alphabetically

### Step 4: Design Tables

For each table, produce the full `CREATE TABLE` with:

**Table naming rules:**

- Use **singular nouns** for table names: `taxonomy`, `family`, `equivalence_class`, `fm_extraction`, `gate_doc`. Each row represents one instance of the entity.
- Why singular: aligns with DBA-traditional convention (Joe Celko, Microsoft, traditional ANSI examples); JOIN clauses read naturally (`JOIN family ON ec.family_id = family.id` parses as "join family on..." rather than "join families on..."); avoids irregular-pluralization ambiguity (`person` vs `persons` vs `people`, `index` vs `indices` vs `indexes`, `datum` vs `data`); aligns with ORM conventions for several major frameworks (Hibernate, SQLAlchemy default to singular).
- Exception: collective nouns that describe a set or relationship and have no natural singular form (`remediation_coverage`, `audit_trail`, `session_chain`) keep their name unchanged. Distinguish "table name = the entity, singular" from "table name = the concept, collective". When in doubt, prefer singular; the collective-noun exception is rare.
- Junction tables for M:N relationships use the singular form: `fm_ec_mapping` not `fm_ec_mappings`. Each row is one mapping.
- Use `snake_case` for multi-word names: `equivalence_class`, `gate_doc`, `bobotax_classification`.
- Column names follow the same rule where applicable: FK columns are `{singular_target}_id` (`family_id` referencing `family.id`).
- Partner-facing rationale: a DB partner will almost always expect singular. If a project has shipped with plural names already and is mid-flight, plan a rename migration before any new code consumes the schema (the longer you wait, the more application code references the old names).

**Worked example: a table of octopi**

You're modeling an aquarium's inventory. You have an entity that needs its own table: one row per octopus. What do you name it?

**Anti-pattern — the plural trap:**

| Candidate | Problem |
|-----------|---------|
| `octopuses` | Standard English plural. Reads awkwardly: "FROM octopuses". |
| `octopi` | The common pick, but technically wrong. "Octopus" comes from Greek (*oktōpous*), not Latin — the Latinized `-i` plural doesn't apply. Linguists will side-eye it. |
| `octopodes` | Etymologically correct Greek plural. Almost nobody uses it. Looks bizarre in code. |
| `octopus_records` / `octopus_list` | Dodges the plural debate with a meaningless suffix. Adds noise. Doesn't scale (do you then have `tank_records`? `species_records`?). |

What happens with plural-as-policy: the team spends 20 minutes debating it in code review. Inconsistency creeps in — some PRs use `octopuses`, others use `octopi`. Every JOIN becomes a memory test: did we land on `JOIN octopuses` or `JOIN octopi`? Migrations become risky because a rename from `octopi` to `octopuses` (or vice versa) breaks application code in ways you only catch at runtime.

**Pattern — the singular path:**

Just name the table `octopus`. One row, one octopus. Decision made in 0 minutes.

```sql
CREATE TABLE octopus (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    tank_id     INT NOT NULL REFERENCES tank(id) ON DELETE RESTRICT,
    arm_count   INT DEFAULT 8 CHECK (arm_count BETWEEN 0 AND 8),
    species     species_type NOT NULL,
    acquired_at DATE NOT NULL
);

COMMENT ON TABLE octopus IS 'One row per individual cephalopod in inventory. Belongs to exactly one tank.';

-- Reads naturally:
SELECT o.name, t.location
FROM octopus o
JOIN tank t ON o.tank_id = t.id
WHERE o.species = 'giant-pacific';
```

The JOIN reads as "from octopus o, join tank t" — natural English, no plural-form decision required. Future maintainers don't even consider that there was a plural-form question to debate.

**The general rule this example illustrates:** when you'd have to stop and think about the correct plural form, that's the strongest signal to use singular. The naming convention exists precisely to make this decision unnecessary.

**Other irregular nouns where the singular rule pays off the same way:**

| Domain entity | Plural choices that would fight | Singular table name |
|---------------|--------------------------------|---------------------|
| `octopus` | octopuses / octopi / octopodes | `octopus` |
| `cactus` | cactuses / cacti | `cactus` |
| `mouse` (animal or input device) | mice / mouses | `mouse` |
| `child` | children / childs | `child` |
| `person` | people / persons | `person` |
| `datum` | data / datums | `datum` (or `measurement` if you mean the broader concept) |
| `criterion` | criteria / criterions | `criterion` |
| `analysis` | analyses / analysises | `analysis` |
| `phenomenon` | phenomena / phenomenons | `phenomenon` |
| `index` | indices / indexes | `index` |
| `appendix` | appendices / appendixes | `appendix` |
| `goose` | geese / gooses | `goose` |

Every row of that right-hand column is a debate you don't have to have. Singular is the rule that prevents the debate from existing in the first place.

**Column design rules:**
- `id SERIAL PRIMARY KEY` for surrogate keys (unless the domain has strong natural keys)
- `code VARCHAR(N) UNIQUE NOT NULL` for human-readable identifiers (e.g., `'F11'`, `'EC-42'`, `'A7'`)
- `TEXT` for unbounded strings (descriptions, narratives, rationale)
- `VARCHAR(N)` for bounded strings where the domain constrains length
- PostgreSQL ENUM types for controlled vocabularies (not TEXT + CHECK)
- `TIMESTAMPTZ DEFAULT NOW()` for `created_at` on all tables
- `TIMESTAMPTZ DEFAULT NOW()` for `updated_at` only on mutable tables (not on append-only tables like audit logs)
- `BOOLEAN DEFAULT FALSE` for flags with sensible defaults
- `INT` for counts; `DATE` for dates; `SERIAL` for auto-increment

**Foreign key rules:**
- Every FK gets an explicit `ON DELETE` policy (RESTRICT, CASCADE, or SET NULL)
- Junction tables (M:N) use CASCADE on the "child" side, RESTRICT on the "parent" side
- Evidence/audit mappings use SET NULL for optional linkages (so unlinking doesn't destroy the evidence record)

**Constraint rules:**
- Add `UNIQUE` constraints for natural keys and compound uniqueness (e.g., `UNIQUE(taxonomy_id, source_id)`)
- Add `CHECK` constraints for cross-column business rules
- Name CHECK constraints descriptively (e.g., `chk_sub_shape_category`)

**Comment rules:**
- `COMMENT ON TABLE` for every table (one sentence: what it holds + why it exists)
- `COMMENT ON COLUMN` for non-obvious columns (especially codes, ENUMs, patterns, FKs)
- Comments are the schema's inline documentation; a DBA reading only `\dt+` and `\d+ tablename` should understand the design

**Index rules:**
- Index every FK column (PostgreSQL does NOT auto-index FKs)
- Index columns used in WHERE clauses of expected queries (from Step 1 query patterns)
- Index `created_at` on audit/log tables (for time-range queries)
- Use descriptive index names: `idx_{table_abbrev}_{column}` (e.g., `idx_rc_ec`, `idx_at_gate`)

### Step 5: Design Views

Views answer the query patterns from Step 1 without requiring the user to write JOINs.

**View design rules:**
- Each view has a clear use case stated in its `COMMENT ON VIEW`
- Use `LEFT JOIN` for optional relationships (so rows aren't silently dropped)
- Use `COALESCE` for fallback logic (e.g., family from direct mapping OR from EC's family)
- Use subqueries for aggregation columns (counts, best-status, string_agg of related codes)
- Add an `ORDER BY` that matches the expected consumption pattern
- For gap-analysis views, use `CASE WHEN EXISTS(...)` for custom sort orders (e.g., UNCOVERED first, then weakest coverage)

### Step 6: Assemble schema.sql

Write the full DDL file with this structure:

```sql
-- {project} PostgreSQL Schema
-- Version: 1.0.0
-- Date: {date}
-- Author: {persona}
--
-- {summary line: N tables + N views for ...}
--
-- Designed for PostgreSQL 14+ on {deployment context}.

BEGIN;

-- ============================================================
-- ENUM TYPES
-- ============================================================

{all CREATE TYPE statements}

-- ============================================================
-- TABLE N: {TABLE_NAME} ({one-line description})
-- ============================================================

{CREATE TABLE}
{COMMENT ON TABLE / COLUMN}
{CREATE INDEX}
{ALTER TABLE ADD CONSTRAINT (if any)}

{repeat for each table}

-- ============================================================
-- VIEW N: {VIEW_NAME} ({one-line description})
-- ============================================================

{CREATE VIEW}
{COMMENT ON VIEW}

{repeat for each view}

COMMIT;
```

**Structural rules:**
- Wrap everything in `BEGIN` / `COMMIT` (single transaction — all or nothing)
- Separator bars between sections (`-- ====...====`)
- Tables numbered sequentially with one-line descriptions
- ENUMs before tables (dependency order)
- Tables before views (dependency order)
- Tables ordered by dependency (parents before children)

### Step 7: Author docs/architecture.md

Write the architecture document with these 7 sections:

#### Section 1: Design Rationale
- Why a relational database (what properties of the data make it relational)
- Why PostgreSQL specifically (enumerate concrete reasons, not generic "it's popular")
- Why NOT the alternatives considered (SQLite, MongoDB, flat files — state what was rejected and why)

#### Section 2: Entity-Relationship Overview
- Text-based ER diagram (same as Step 2 output)
- Cardinality table: Relationship | Type | Expected rows

#### Section 3: Table Descriptions
- Group tables by domain layer (e.g., "Source Layer", "Remediation Layer", "Evidence Layer", "Audit Layer")
- Each table gets a paragraph: what it holds, what its key columns mean, how it relates to neighbors
- Use `**backtick_table_name**` formatting for table names

#### Section 4: Views
- Each view gets a paragraph: what query it answers, when to use it

#### Section 5: Deployment Notes
- VPS/cloud setup commands (createdb, createuser, grant, run schema, run seeds)
- Connection string template (with `<password>` placeholder — never real credentials)
- Backup command

#### Section 6: Migration Strategy
- Where migrations live (`db/migrations/`)
- Naming convention (`001_description.sql`, `002_description.sql`)
- Transaction wrapping + idempotency expectation

#### Section 7: Data Integrity Constraints
- Table summarizing all CHECK, UNIQUE, FK, and ENUM constraints
- Columns: Constraint | Type | Purpose

### Step 8: ASAE Gate (if applicable)

If the repo has an `.asae-policy`, run `/asae` with:
- **target:** `db/schema.sql` + `docs/architecture.md`
- **sources:** all source materials from Step 1
- **domain:** `document` (the schema DDL is a specification document)
- **asae_certainty_threshold:** per repo's `.asae-policy`
- **severity_policy:** `strict`

**Audit checklist (10 items):**
1. Schema completeness — all planned tables present with correct names
2. ENUM types — all match domain vocabulary from source artifacts
3. Table columns — correct types, constraints, comments
4. FK relationships — referential integrity matches ER design
5. Indexes — all FKs indexed + query-critical columns
6. Views — correct JOINs, proper LEFT JOIN usage, ORDER BY
7. CHECK constraints — business rules enforced
8. Architecture doc — all 7 sections present and accurate
9. Internal consistency — column names/types match across tables and views; ENUM values match source
10. Factual accuracy — domain vocabulary matches source artifacts verbatim

### Step 9: Print-Ready HTML (optional)

If the user or their partner needs to review the schema on paper, generate print-ready HTML files:

- **`schema-sql-print.html`** — SQL with syntax highlighting (keywords bold blue, types purple, enum values green, comments italic gray), section bars between table blocks, print CSS with page-break avoidance
- **`architecture-md-print.html`** — Prose with formatted tables, code blocks, ER diagram in monospace, clean serif typography

Place on Desktop or user-specified location. Both files include a "Press Ctrl+P to print" banner (hidden in print) and page headers/footers.

## Output Artifacts

| Artifact | Path | Content |
|----------|------|---------|
| Schema DDL | `{repo}/db/schema.sql` | Full PostgreSQL DDL (transaction-wrapped) |
| Architecture doc | `{repo}/docs/architecture.md` | 7-section design document |
| Gate doc (if ASAE) | `{repo}/deprecated/asae-logs/gate-NN-*.md` | Audit log with pass blocks + rater verdicts |
| Print HTML (optional) | Desktop or specified | Two HTML files for paper review |

## Anti-Patterns

- **Plural table names.** Use singular nouns (`taxonomy` not `taxonomies`, `evidence_entry` not `evidence_entries`). Each row represents one instance of the entity. The plural-names habit comes from Rails-era convention; DBA-traditional convention is singular and is what partner reviewers with database backgrounds will expect. See Table naming rules in Step 4 for the full rationale. Collective-noun exceptions (`audit_trail`, `remediation_coverage`) are rare and must be justified.
- **Inventing domain vocabulary.** Every ENUM value, table name, and column name must trace to a source document. If you can't point to where a value came from, ask the user — don't invent.
- **Skipping COMMENT ON.** A schema without comments forces the next reader to reverse-engineer the design from column names alone. Every table and every non-obvious column gets a comment.
- **Forgetting FK indexes.** PostgreSQL does NOT auto-index foreign keys. Every FK column needs an explicit `CREATE INDEX`. Missing FK indexes turn JOINs into sequential scans.
- **Using TEXT + CHECK instead of ENUM.** PostgreSQL has native ENUM types. They enforce controlled vocabularies at the type level, appear in `\dT+` output, and make the schema self-documenting. Use them.
- **Mixing CREATE TABLE order.** Tables must be created in dependency order (parents before children). If table B references table A, table A's CREATE TABLE must come first. ENUMs before all tables.
- **Omitting the transaction wrapper.** `BEGIN` / `COMMIT` makes schema creation atomic. If any statement fails, nothing is created (no partial schemas).
- **Writing architecture.md as a list of tables.** Section 1 (Design Rationale) is the most important section. It answers "why this database exists and why PostgreSQL" — the information a partner or future maintainer needs most. Don't skip it.
- **Designing views that hide rows.** Use `LEFT JOIN` in views so optional relationships show NULL rather than silently dropping rows. An EC with no evidence should still appear in gap_analysis — with evidence_count = 0, not missing entirely.
- **Hardcoding credentials.** Connection strings use `<password>` placeholders. Deployment commands use `'<secure-password>'`. Never embed real credentials in schema files or architecture docs.
- **Putting seed data in schema.sql.** The schema file is DDL only (CREATE TYPE, CREATE TABLE, CREATE VIEW, CREATE INDEX, ALTER TABLE). INSERT statements go in `db/seed/` as numbered files (`01_*.sql`, `02_*.sql`). Schema and data are separate commits.

## Engine Selection Guide

This skill defaults to PostgreSQL but the rationale must be honest. Use this decision tree:

| If... | Then... | Because... |
|-------|---------|------------|
| Multi-user access needed | PostgreSQL | SQLite is single-writer |
| Controlled vocabularies (ENUMs) are central | PostgreSQL | Native ENUM types; SQLite requires TEXT + CHECK |
| Complex JOINs across 4+ tables | PostgreSQL | Query planner handles this well; SQLite's planner is simpler |
| Data volume < 100K rows AND single user AND no server | SQLite | Simpler deployment, no daemon |
| Zero budget + existing VPS | PostgreSQL | Free, runs on what you have |
| Cloud-managed preferred | PostgreSQL (RDS/Supabase/Neon) | Managed PostgreSQL is widely available |
| Partner/team has DB background | PostgreSQL | They already know it |
| Document-shaped data, no JOINs needed | Consider MongoDB/flat files | Relational is overhead without relationships |

If the decision tree points away from PostgreSQL, say so. Don't force relational on a non-relational problem.

## Seed Data Pattern (post-schema)

After schema.sql is committed, seed data goes in numbered files:

```
db/seed/
  01_<primary_entities>.sql
  02_<secondary_entities>.sql
  03_<tertiary_entities>.sql
  ...
```

Each seed file:
- Wrapped in `BEGIN` / `COMMIT`
- Uses explicit column lists in INSERT statements (not positional)
- Ordered by FK dependency (parents before children)
- Comments trace each row to its source document

Seed data is a separate commit from schema (separate ASAE gate if applicable).

## Reference Implementation

The mm-fm-taxonomy database (gate-02, commit `49ce3ca`, 2026-05-12) is the reference implementation of this skill's output:

- **Schema:** `C:\Users\NerdyKrystal\martinez-methods\mm-fm-taxonomy\db\schema.sql` — 426 lines, 9 ENUMs, 11 tables, 3 views, 17 indexes, 1 CHECK constraint
- **Architecture:** `C:\Users\NerdyKrystal\martinez-methods\mm-fm-taxonomy\docs\architecture.md` — 228 lines, 7 sections
- **Gate doc:** `C:\Users\NerdyKrystal\martinez-methods\mm-fm-taxonomy\deprecated\asae-logs\gate-02-fm-taxonomy-db-schema-2026-05-12.md` — strict-5 PASS, 2 raters CONFIRMED
- **Print HTML:** `C:\Users\NerdyKrystal\Desktop\schema-sql-print.html` + `architecture-md-print.html`

When in doubt about how to handle a design decision, read the reference implementation.

## Related Skills

- `/new-repo` — creates the repo scaffold that this skill populates (db/ and docs/ directories)
- `/asae` — gates the schema + architecture doc at the configured threshold
- `/dare-to-rise-code-plan` — may invoke this skill when a TRD specifies a database component
- `/diagram-pack` — can produce ER diagrams in Mermaid/Graphviz/PlantUML from the Step 2 ER model

## Related Rules

- `file-naming-and-versioning` — applies to architecture.md filename if the project uses versioned doc naming
- `no-silent-execution` — every design decision (engine, ENUM values, FK policies) surfaces for user confirmation before committing to the DDL
