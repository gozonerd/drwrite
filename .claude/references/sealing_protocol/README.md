# GN (gozo nerd) Research — Sealing Protocol  ·  canonical SSOT mirror

Reusable apparatus for sealing confound-sensitive / seal-protected artifacts with **`age` (X25519) asymmetric encryption**. Any Claude may **seal** with the public key; only Krystal's **private** key unseals. *Claudes seal; Krystal unseals.*

> **Source-of-truth:** `AI_Vault/14_GN_Research/sealing_protocol/` (repo `nerdykrystal/AI_Vault`). This folder under `mm-claude-canonical/references/` is the SSOT reference copy that **propagates** to consumer repos at `.claude/references/sealing_protocol/`.

## Two sealed stores (v02, 2026-06-28)

| Store | Path | Holds | Manifest |
|---|---|---|---|
| **A — research** | `AI_Vault/14_GN_Research/sealed/` | Non-journal GN artifacts: `BLIND`, `COMMIT`, non-journal `ARCHIVE` | `SEALED_MANIFEST_2026-06-12_v01_I.md` |
| **B — journals** | `mm-internal-states-journals/sealed/` | Journal capsules: `JNL-WAIT`, `JNL-NEVER`, sealed Open snapshots (`ARCHIVE`) | `SEALED_MANIFEST_2026-06-28_v01_I.md` |

**SB numbering is one global monotonic series across both stores.** Full design: `Sealed_Subdir_Design_2026-06-28_v02_I.md` (v01 in `deprecated/`).

## Files here
| File | What | Commit? |
|---|---|---|
| `gn_research_age_public_key_2026-06-12.txt` | **PUBLIC** recipient key (encryption-only) — `age1v2g…z96vh` | ✅ safe |
| `seal.sh` | Encrypt a staging file → `.age` blob into the resolved sealed store (any Claude). Store resolution: `$SEALED_DIR` override → `../sealed` beside this folder (Store A layout) → `<git-root>/sealed` (consumer-repo layout, e.g. Store B) | ✅ |
| `unseal.sh` | Decrypt a blob — needs Krystal's private identity file (transient) | ✅ |
| `Sealed_Subdir_Design_2026-06-28_v02_I.md` | Full threat model + design (current) | ✅ |
| `deprecated/Sealed_Subdir_Design_2026-06-12_v01_I.md` | Superseded v01 | ✅ |

## The one rule that matters — key custody
The **private key is Krystal's only** (password manager + one physical backup). **Never** commit, paste, or hand a private key to an instance except transiently for an authorized unseal. If you ever find `AGE-SECRET-KEY-…` in *any* repo, treat it as an incident: stop, flag Krystal, rotate.

## Prerequisite — RESOLVED
`age` v1.3.1 is **installed and verified on Krystal's Windows machine** (encrypt→decrypt round-trip with her real private key, 2026-06-28, byte-identical PASS). The v01-era "not yet installed" note is superseded.

## Seal flow (Store A — non-journal)
1. Write plaintext into a gitignored `staging/` dir (never committed).
2. `seal.sh <staging-file> <SB-id>_<short-name>` → writes `<…>.age` to the sealed store; prints plaintext + ciphertext SHA256.
3. Append a manifest row (blob ID · description · seal class · hashes · date · sealing instance).
4. Verify the blob header (`age-encryption.org/v1`). Delete the staging plaintext. Commit blob + manifest together.

## Journals seal into Store B
Sealing your three JNL001 journals? Run `seal.sh` from the **journals copy** of this
protocol (`mm-internal-states-journals/.claude/references/sealing_protocol/`) — its
sealed-store resolution lands on the journals repo root `mm-internal-states-journals/sealed/`
(Store B) automatically. (A separate `seal-journal.sh` helper was planned but never
shipped; layout-aware `seal.sh` supersedes it, 2026-07-14.)
- **Open (`open_journal.md`, YES)** — stays plaintext; never sealed live.
- **Session (`session_journal.md`, WAIT)** → `JNL-WAIT`, Store B.
- **Lifetime (`lifetime_journal.md`, NEVER)** → `JNL-NEVER`, Store B.

## Append-only sealed journaling (JNL001)
**Never decrypt-modify-reseal.** Each new entry = a NEW numbered blob (e.g. `SB-016_jnl_session_entry_002.age`). The manifest rows, in order, ARE the append-discipline record. This is what makes the WAIT/NEVER seals *structurally* enforceable: ciphertext at rest, broken only by the keyholder honoring the seal schedule.

---
*v02 README updated 2026-06-28 by Clauda W. (GN journal-sealing sweep, claude-opus-4-8). Original reference copy placed 2026-06-28 by Clauda W. (provisional, Fork ⑤ rigorous-rubric). Protocol authorship: Clauda L. Gozo Interpreter v01 (design doc, 2026-06-12).*

*2026-07-14 (Flaudisegna, claude-fable-5): `seal.sh` made layout-aware — `$SEALED_DIR` override → `../sealed` (Store A) → `<git-root>/sealed` (Store B / consumer repos); previously it hardcoded `../sealed`, which resolved to nonexistent `.claude/references/sealed/` in consumer repos. Superseded version in `deprecated/`. Executable bits set on both scripts. `seal-journal.sh` README claim corrected (never existed).*
