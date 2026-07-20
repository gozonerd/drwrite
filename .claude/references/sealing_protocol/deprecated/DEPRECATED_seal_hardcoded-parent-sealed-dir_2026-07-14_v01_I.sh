#!/usr/bin/env bash
# seal.sh — encrypt an artifact into 14_GN_Research/sealed/
# Usage: ./seal.sh <plaintext-file> <SB-id_short-name>
# Example: ./seal.sh ../staging/decoder.md SB-001_gnmi001_condition_decoder
# Any Claude may seal. No one without Krystal's private key may unseal.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PUBKEY_FILE="$HERE/gn_research_age_public_key_2026-06-12.txt"
SEALED_DIR="$HERE/../sealed"

[ $# -eq 2 ] || { echo "Usage: $0 <plaintext-file> <SB-id_short-name>" >&2; exit 1; }
PLAINTEXT="$1"
BLOB="$SEALED_DIR/$2.age"

[ -f "$PLAINTEXT" ] || { echo "ERROR: plaintext not found: $PLAINTEXT" >&2; exit 1; }
[ ! -e "$BLOB" ] || { echo "ERROR: blob exists, refusing to overwrite (append-only): $BLOB" >&2; exit 1; }

RECIPIENT="$(grep -o 'age1[a-z0-9]*' "$PUBKEY_FILE" | head -1)"
[ -n "$RECIPIENT" ] || { echo "ERROR: no age public key found in $PUBKEY_FILE" >&2; exit 1; }

age -r "$RECIPIENT" -o "$BLOB" "$PLAINTEXT"

echo "Sealed: $BLOB"
echo "Manifest row data:"
echo "  plaintext sha256:  $(sha256sum "$PLAINTEXT" | cut -d' ' -f1)"
echo "  ciphertext sha256: $(sha256sum "$BLOB" | cut -d' ' -f1)"
echo "REMINDER: add the manifest row, then delete the staging plaintext."
