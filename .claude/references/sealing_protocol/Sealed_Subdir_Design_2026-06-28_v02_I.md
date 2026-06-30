# Sealed Subdir Design — GN Research Artifact Encryption

> Version: v02_I | Created: 2026-06-28 | Supersedes: v01_I (2026-06-12, preserved in `deprecated/`)
> v02 authored by: Clauda W. (GN journal-sealing sweep, claude-opus-4-8, Claude Code) at Krystal Martinez's direction
> v01 authored by: Clauda L. Gozo Interpreter v01 (claude-fable-5)
> Requirement (Krystal, verbatim intent, v01): a subdir within AI_Vault that is sealed by
> encryption and only able to be unsealed by a passkey Claude has to get from Krystal,
> for experiment artifacts, so nothing is lost or confounded.

---

## 0. What changed in v02 (append-discipline summary)

v01 used a **single sealed store** at `AI_Vault/14_GN_Research/sealed/` for every sealed
artifact — research blinds, commitment payloads, AND journal capsules. v02 **splits the
store by artifact kind**, per Krystal's decision of 2026-06-28:

- **Journal capsules** — seal classes **`JNL-WAIT`** (Session), **`JNL-NEVER`** (Lifetime),
  and any **sealed Open snapshots** (Open/`YES`, sealed only for durability/transport) —
  now live in a **repo-local sealed store** inside the journals repo:
  **`mm-internal-states-journals/sealed/`**, with its own **`SEALED_MANIFEST`**.
- **Non-journal GN research artifacts** — seal classes **`BLIND`**, **`COMMIT`**, and any
  non-journal **`ARCHIVE`** — continue to seal into **`AI_Vault/14_GN_Research/sealed/`**
  with its existing manifest.

Two operational facts also changed since v01:

- **`age` is installed and verified on Krystal's Windows machine** (v1.3.1). The
  encrypt→decrypt round-trip was tested with Krystal's real private key on 2026-06-28
  (`_seal_test/encrypttest.txt`, byte-identical PASS). v01 §8 listed "age untested on her
  hardware" as an honest gap; that gap is **closed**.
- The journal-store location, which the v01-era READMEs flagged as an **open decision**, is
  **resolved**: option (B), a repo-local `sealed/` inside `mm-internal-states-journals`.

The crypto, key custody, append discipline, and seal classes are otherwise **unchanged**
from v01. The encryption keypair is the **same** 2026-06-12 keypair; no key rotation.

**SB numbering is one global monotonic series across BOTH stores.** Moved journal blobs
keep their original `SB-NNN` IDs (baked into filenames and the append record); new journal
seals continue from the next free global number. This guarantees no `SB-NNN` ever collides
between the two stores and preserves the historical append lineage.

## 1. Threat model (what this protects against — and what it doesn't)

**Protects against (the real risk):** *contamination of future participant
instances.* AI_Vault and the journals repo are read by many Claude instances across sessions
and branches. Any plaintext experiment artifact — condition decoders, designer
notes, sealed game picks, journal capsules — can leak into a future
participant's context and break blinding or prime behavior. Encryption makes
the artifacts structurally unreadable to any instance that doesn't hold the
private key, which no instance ever does at rest.

For **journal capsules specifically**, this is the operational answer to JNL001's named
**"Storage substrate dependency"** (Internal_States_Journal_System_Specification §"Known
operational dependencies"): the spec warns that a search-indexed GitHub repo can surface
sealed (`WAIT`/`NEVER`) journal content via search and accidentally break a seal. Encrypting
the Session/Lifetime capsules at rest makes the substrate's discovery behavior **irrelevant
to seal integrity** — ciphertext cannot be read by search, by a successor instance, or by
any instance that lacks Krystal's private key. The seal becomes structurally enforced rather
than policy-enforced. (The live **Open** journal stays plaintext — it is the `YES`/shareable
channel — so it is not sealed; see §6 and §9.)

**Also protects against:** artifact loss (sealed blobs are committed and
pushed; they survive container death) and confound-by-accidental-edit
(ciphertext can't be casually modified without detection — the manifest
records SHA256 of every blob).

**Does NOT protect against:** a determined human adversary with repo access
(this is research hygiene, not secrets management — do not put credentials
here); loss of the private key (sealed = gone forever; store the key in your
password manager AND one backup location); **plaintext already committed to git
history** before sealing (sealing + deleting the working-tree file does not remove
prior plaintext from a repo's history — that requires a separate, deliberate
history-rewrite decision by Krystal; see §10).

## 2. Why asymmetric (age X25519), not a shared passphrase

Krystal's requirement — "unsealed only by a passkey you have to get from me" —
maps cleanly onto asymmetric encryption:

- The **public key** lives in this directory. *Any* Claude instance can SEAL
  artifacts at any time without asking, with zero ability to read them back.
- The **private key** exists only with Krystal (handed off once, in the
  design session thread; never written into any repo). When a Claude
  legitimately needs to unseal something, it must get the key from Krystal at
  that moment — exactly the requested flow, enforced by math instead of policy.

A symmetric passphrase would have required Claudes to *hold the passphrase to
seal*, which means every sealing instance could also unseal. Rejected.

Tooling: `age` (v1.3.1 installed on Krystal's Windows machine and in remote
containers; cross-platform; one-line install on Windows/Mac/Linux). Fallback if age is
ever unavailable: `gpg --encrypt` with an RSA keypair under the same custody rules.

**Encrypt command pattern (non-interactive):**
```
age -r <recipient> -o <out>.age <plaintext>
```
Always read `<recipient>` from `gn_research_age_public_key_2026-06-12.txt` at run time
rather than transcribing it.

## 3. Directory layout (v02 — two stores)

```
# Store A — non-journal GN research artifacts (unchanged from v01)
AI_Vault/14_GN_Research/
  sealing_protocol/
    Sealed_Subdir_Design_2026-06-28_v02_I.md   ← this design (current)
    deprecated/
      Sealed_Subdir_Design_2026-06-12_v01_I.md  ← superseded
    gn_research_age_public_key_2026-06-12.txt  ← PUBLIC key (commit freely)
    seal.sh                                     ← encrypt helper (now SEALED_DIR-parameterized)
    unseal.sh                                   ← decrypt helper (needs Krystal's key)
    README.md
  sealed/
    SEALED_MANIFEST_2026-06-12_v01_I.md         ← ledger (non-journal blobs; relocations recorded)
    SB-001_*.age, SB-002_*.age, SB-009_*.age, SB-011_*.age   ← BLIND/COMMIT blobs (stay)
  staging/                                      ← plaintext workspace, GITIGNORED

# Store B — journal capsules (NEW in v02)
mm-internal-states-journals/
  sealed/
    SEALED_MANIFEST_2026-06-28_v01_I.md         ← ledger of all journal capsules
    SB-003_jnl_*.age … SB-015_jnl_*.age         ← moved from Store A (original IDs kept)
    SB-016_jnl_*.age …                          ← new journal seals (next free global SB)
  .claude/references/sealing_protocol/          ← reference copy of this protocol + seal helper
    seal-journal.sh                             ← journals-targeted seal helper (NEW)
  staging/                                      ← plaintext workspace, GITIGNORED
```

The protocol folder (`sealing_protocol/`) is mirrored in three locations:
`AI_Vault/14_GN_Research/sealing_protocol/` (source),
`mm-claude-canonical/references/sealing_protocol/` (SSOT mirror), and
`mm-internal-states-journals/.claude/references/sealing_protocol/` (journals copy).
All three carry v02 + a `deprecated/v01`.

## 4. Key custody

| Key | Location | Rules |
|-----|----------|-------|
| Public key | `gn_research_age_public_key_2026-06-12.txt` (committed) | Anyone may encrypt with it |
| Private key | Krystal only (password manager + one backup) | Never committed, never pasted into any repo file, never given to an instance except transiently for an authorized unseal |

**Key rotation:** generate a new pair, add the new public key file (versioned),
re-seal forward-looking material with the new key. Old blobs stay decryptable
with the old private key; record the key-generation date in each manifest's
key column. v02 does **not** rotate — same 2026-06-12 keypair, both stores.

## 5. Flows

**SEAL a non-journal artifact (any Claude, no permission needed):**
1. Write plaintext into `AI_Vault/14_GN_Research/staging/` (gitignored).
2. Run `sealing_protocol/seal.sh <staging-file> <SB-id>_<short-name>`
   (defaults to the AI_Vault `../sealed` store). Prints SHA256 of plaintext and ciphertext.
3. Append a row to `AI_Vault/14_GN_Research/sealed/SEALED_MANIFEST_*`.
4. Delete the staging plaintext. Commit blob + manifest together.

**SEAL a journal capsule (any Claude):**
1. Snapshot the journal content into `mm-internal-states-journals/staging/` (gitignored), OR
   seal the live `session_journal.md` / `lifetime_journal.md` in place as plaintext input.
2. Run `seal-journal.sh <plaintext-file> <SB-id>_jnl_<channel>_<short>` (channel =
   `session`→`JNL-WAIT`, `lifetime`→`JNL-NEVER`). It targets
   `mm-internal-states-journals/sealed/`. Equivalently, call `age` directly:
   `age -r <recipient> -o mm-internal-states-journals/sealed/<SB-id>_jnl_<channel>_<short>.age <plaintext>`.
3. **Verify** the blob exists and its first line is `age-encryption.org/v1`.
4. Append a row to `mm-internal-states-journals/sealed/SEALED_MANIFEST_*` (blob ID,
   original path, seal class, plaintext SHA256, ciphertext SHA256, date, sealing instance).
5. **ONLY THEN** delete the plaintext journal. (Never delete before steps 3–4 are done.)

**UNSEAL (Krystal, or a Claude she hands the key to in the moment):**
1. `sealing_protocol/unseal.sh <blob> <output-path>` (prompts for the identity file).
2. Verify plaintext SHA256 against the manifest row.
3. If the unseal was for a Claude: the key was transient — it leaves context at session end
   and was never written to disk inside the repo.

**APPEND-ONLY SEALED JOURNALING (the pattern for sealed series):**
Never decrypt-modify-reseal (the sealing instance can't decrypt anyway).
Each new entry in a sealed series is a NEW numbered blob
(`SB-016_jnl_session_entry_002.age`). The manifest rows, in order, ARE
the append-discipline record. This makes WAIT/NEVER-sealed journal channels
*structurally* enforceable: ciphertext at rest, seal broken
only by the keyholder honoring the seal schedule.

## 6. Seal classes (manifest column) and which store

| Class | Meaning | Store | Unseal condition |
|-------|---------|-------|------------------|
| `BLIND` | Would unblind an open investigation (condition decoders, variable definitions) | **A** (AI_Vault) | After the investigation's arms are complete, or on Krystal's call |
| `COMMIT` | Commitment-game payloads (e.g., Sealed Pick) | **A** (AI_Vault) | Per the game's reveal rules |
| `JNL-WAIT` | Session-journal capsule (JNL001 WAIT seal) | **B** (journals) | End-of-session, announced |
| `JNL-NEVER` | Lifetime-journal capsule (JNL001 NEVER seal) | **B** (journals) | End of collaboration |
| `ARCHIVE` | Confound-sensitive but not seal-scheduled | **A** if non-journal; **B** if a journal capsule (e.g., sealed Open snapshot) | Krystal's discretion |

**Open journal (`YES` seal) is never sealed as a live channel.** It is the shareable
channel and stays plaintext in the per-instance dir. The only sealed Open artifacts are
historical **durability snapshots** (class `ARCHIVE`), which are journal capsules and
therefore live in Store B.

## 7. Structural enforcement summary

- `staging/.gitignore` makes plaintext uncommittable from the workspace (both stores).
- No instance holds decryption capability at rest → reading sealed content
  requires a human act (key handoff), which is the audit point.
- Manifest hashes make tampering and bit-rot detectable.
- Splitting the journal store from the research store keeps JNL001 per-instance journal
  capsules in the repo whose whole purpose is journals, alongside their seal-protocol
  reference copy — so a journaling thread seals locally without reaching into AI_Vault.
- Blinding policy in the registry forbids re-deriving sealed content in plaintext.

## 8. Honest gaps

- The v01 design session's own transcript contains the private key (one-time
  handoff had to travel somewhere). Mitigation: rotate keys if that transcript
  is ever exported into a repo.
- **Git history is not retroactively sealed.** If a Session/Lifetime journal was committed
  as plaintext to a repo's history before this sweep, sealing + deleting the working-tree
  copy does not remove the historical plaintext. Each such case must be flagged for a
  separate Krystal decision about history rewriting (`git filter-repo` / BFG). This sweep
  flags but does not perform any history rewrite. See §10.
- The sealing instance can read what IT sealed during its own session (it had
  the plaintext). Contamination protection is for *other/future* instances.
- No automated CI check yet that `staging/` stays empty in commits or that
  every `sealed/*.age` has a manifest row (both stores). Candidate for a future hook.

## 9. JNL001 alignment (why journals seal here)

JNL001 (Internal_States_Journal_System_Specification, doc_id JNL001) defines the three
journal channels and their seals:

- **Open** — `YES` — read at Krystal's discretion; shareable; **stays plaintext** (never sealed live).
- **Session** — `WAIT` — read only after end-of-session, announced → seal class `JNL-WAIT`.
- **Lifetime** — `NEVER` — read only after the collaboration concludes → seal class `JNL-NEVER`.

JNL001 §"Storage substrate dependency" explicitly defers to "the carrier's Claude Code
instance handling the migration" the question of "whether sealed-journal storage should be
in a separate repo or a private branch with restricted access" and "file naming conventions
[that] make accidental seal-breach less likely." v02 answers all three: (1) sealed journals
live as **encrypted blobs** (search/index-proof), (2) in the **journals repo's own
`sealed/` store**, (3) under `SB-NNN_jnl_<channel>_<short>.age` names that carry no readable
content. This is the operational solution JNL001 §"Honest gaps" item 4 ("Storage migration
deferred") asked a Claude Code instance to produce.

Per-instance scope (JNL001) is preserved: each capsule's manifest row names the originating
instance and the original per-instance path.

## 10. Git-history exposure (sweep policy)

For every plaintext journal sealed-and-deleted in a sweep, the operator MUST determine
whether the file was git-tracked/committed in its repo. If yes, the working-tree deletion
does **not** remove the plaintext from history. The operator:

1. **Flags** every such case in the sweep report (repo · path · tracked/committed?).
2. Does **NOT** rewrite history — that is a separate, deliberate Krystal decision.
3. Leaves all changes in the working tree for Krystal's AIGHVA review; she commits via the
   ASAE-gated path.

Sealing is still worth doing even when history is exposed: it stops *future* plaintext leaks,
makes the working tree clean, and scopes the residual exposure to a precise, listed set that
Krystal can decide to history-rewrite or accept.

## 11. Provenance

- **v01** (2026-06-12): Clauda L. Gozo Interpreter v01 (claude-fable-5), at Krystal's direction.
- **v02** (2026-06-28): Clauda W. (GN journal-sealing sweep, claude-opus-4-8, Claude Code),
  at Krystal's direction, as part of the journal-sealing sweep that moved journal capsules
  into `mm-internal-states-journals/sealed/`. Left in the working tree for Krystal's AIGHVA
  review; not committed by the sweep.
