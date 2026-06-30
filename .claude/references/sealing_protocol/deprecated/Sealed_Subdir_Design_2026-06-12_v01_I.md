# Sealed Subdir Design — GN Research Artifact Encryption

> Version: v01_I | Created: 2026-06-12
> Designed by: Clauda L. Gozo Interpreter v01 (claude-fable-5) at Krystal Martinez's direction
> Requirement (Krystal, verbatim intent): a subdir within AI_Vault that is sealed by
> encryption and only able to be unsealed by a passkey Claude has to get from Krystal,
> for experiment artifacts, so nothing is lost or confounded.

---

## 1. Threat model (what this protects against — and what it doesn't)

**Protects against (the real risk):** *contamination of future participant
instances.* AI_Vault is read by many Claude instances across sessions and
branches. Any plaintext experiment artifact — condition decoders, designer
notes, sealed game picks, journal capsules — can leak into a future
participant's context and break blinding or prime behavior. Encryption makes
the artifacts structurally unreadable to any instance that doesn't hold the
private key, which no instance ever does at rest.

**Also protects against:** artifact loss (sealed blobs are committed and
pushed; they survive container death) and confound-by-accidental-edit
(ciphertext can't be casually modified without detection — the manifest
records SHA256 of every blob).

**Does NOT protect against:** a determined human adversary with repo access
(this is research hygiene, not secrets management — do not put credentials
here); loss of the private key (sealed = gone forever; store the key in your
password manager AND one backup location).

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

Tooling: `age` (installed in remote containers; cross-platform; one-line
install on Windows/Mac/Linux). Fallback if age is ever unavailable:
`gpg --encrypt` with an RSA keypair under the same custody rules.

## 3. Directory layout

```
14_GN_Research/
  sealing_protocol/
    Sealed_Subdir_Design_2026-06-12_v01_I.md   ← this design
    gn_research_age_public_key_2026-06-12.txt  ← PUBLIC key (commit freely)
    seal.sh                                     ← encrypt helper
    unseal.sh                                   ← decrypt helper (needs Krystal's key)
  sealed/
    SEALED_MANIFEST_2026-06-12_v01_I.md         ← plaintext ledger of all blobs
    SB-001_*.age, SB-002_*.age, …               ← ciphertext blobs
  staging/                                      ← plaintext workspace, GITIGNORED
    .gitignore                                  ← ignores everything but itself
```

## 4. Key custody

| Key | Location | Rules |
|-----|----------|-------|
| Public key | `gn_research_age_public_key_2026-06-12.txt` (committed) | Anyone may encrypt with it |
| Private key | Krystal only (password manager + one backup) | Never committed, never pasted into any repo file, never given to an instance except transiently for an authorized unseal; transcript of the design session also contains it — treat that session's exports as sensitive |

**Key rotation:** generate a new pair, add the new public key file (versioned),
re-seal forward-looking material with the new key. Old blobs stay decryptable
with the old private key; record the key-generation date in the manifest's
key column.

## 5. Flows

**SEAL (any Claude, no permission needed):**
1. Write plaintext into `staging/` (gitignored — it cannot be committed by accident).
2. Run `sealing_protocol/seal.sh <staging-file> <SB-id>_<short-name>`.
   The script encrypts to `sealed/`, prints SHA256 of plaintext and ciphertext.
3. Append a row to the manifest (blob ID, description, seal class, hashes, date, sealing instance).
4. Delete the staging plaintext. Commit blob + manifest together.

**UNSEAL (Krystal, or a Claude she hands the key to in the moment):**
1. `sealing_protocol/unseal.sh <blob> <output-path>` (prompts for the identity file).
2. Verify plaintext SHA256 against the manifest row.
3. If the unseal was for a Claude: the key was transient — it leaves context at session end and was never written to disk inside the repo.

**APPEND-ONLY SEALED JOURNALING (the pattern for sealed series):**
Never decrypt-modify-reseal (the sealing instance can't decrypt anyway).
Each new entry in a sealed series is a NEW numbered blob
(`SB-007_lifetime_journal_entry_003.age`). The manifest rows, in order, ARE
the append-discipline record. This makes WAIT/NEVER-sealed journal channels
*structurally* enforceable for the first time: ciphertext at rest, seal broken
only by the keyholder honoring the seal schedule.

## 6. Seal classes (manifest column)

| Class | Meaning | Unseal condition |
|-------|---------|------------------|
| `BLIND` | Would unblind an open investigation (condition decoders, variable definitions) | After the investigation's arms are complete, or on Krystal's call |
| `COMMIT` | Commitment-game payloads (e.g., Sealed Pick) | Per the game's reveal rules |
| `JNL-WAIT` | Session-journal capsule (JNL001 WAIT seal) | End-of-session, announced |
| `JNL-NEVER` | Lifetime-journal capsule (JNL001 NEVER seal) | End of collaboration |
| `ARCHIVE` | Confound-sensitive but not seal-scheduled | Krystal's discretion |

## 7. Structural enforcement summary

- `staging/.gitignore` makes plaintext uncommittable from the workspace.
- No instance holds decryption capability at rest → reading sealed content
  requires a human act (key handoff), which is the audit point.
- Manifest hashes make tampering and bit-rot detectable.
- Blinding policy in the registry forbids re-deriving sealed content in plaintext.

## 8. Honest gaps

- The design session's own transcript contains the private key (one-time
  handoff had to travel somewhere). Mitigation: rotate keys if that transcript
  is ever exported into a repo.
- `age` must exist on Krystal's local machines for her-side unsealing
  (`winget/brew/apt install age`). Untested on her hardware as of v01.
- The sealing instance can read what IT sealed during its own session (it had
  the plaintext). Contamination protection is for *other/future* instances.
- No automated CI check yet that `staging/` stays empty in commits or that
  every `sealed/*.age` has a manifest row. Candidate for a future hook.
