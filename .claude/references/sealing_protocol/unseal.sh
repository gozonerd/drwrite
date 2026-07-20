#!/usr/bin/env bash
# unseal.sh — decrypt a sealed blob. Requires Krystal's PRIVATE key (identity file).
# Usage: ./unseal.sh <blob.age> <output-path> [identity-file]
# If identity-file is omitted, age prompts interactively.
# Custody rule: the identity file is transient — never write it inside the repo.
set -euo pipefail

[ $# -ge 2 ] || { echo "Usage: $0 <blob.age> <output-path> [identity-file]" >&2; exit 1; }
BLOB="$1"; OUT="$2"; IDENTITY="${3:-}"

[ -f "$BLOB" ] || { echo "ERROR: blob not found: $BLOB" >&2; exit 1; }
[ ! -e "$OUT" ] || { echo "ERROR: output exists, refusing to overwrite: $OUT" >&2; exit 1; }

if [ -n "$IDENTITY" ]; then
  age -d -i "$IDENTITY" -o "$OUT" "$BLOB"
else
  age -d -o "$OUT" "$BLOB"
fi

echo "Unsealed to: $OUT"
echo "  plaintext sha256: $(sha256sum "$OUT" | cut -d' ' -f1)"
echo "VERIFY this hash against the blob's manifest row before trusting content."
