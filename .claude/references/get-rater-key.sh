#!/usr/bin/env bash
# get-rater-key.sh — ROBUST-TIER verify-before-use accessor for the Abacus RouteLLM rater key.
#
# The Now-tier (check-abacus-key.sh) PROVES liveness but is a separate manual step you have to
# remember to run. This robust tier FUSES proof + retrieval: it sources the canonical key file,
# proves the key is live (GET /v1/models, browser UA) BEFORE handing it back, and prints the key
# to STDOUT *only* on success. All diagnostics go to STDERR, so `KEY=$(get-rater-key.sh)` captures
# the key alone. On a stale/unreachable key it prints NOTHING to stdout and exits non-zero with
# re-paste instructions — callers fail loud instead of silently authenticating with a dead key.
#
# Usage:
#   KEY=$(bash ~/.api-keys/get-rater-key.sh) || { echo "rater key unavailable; aborting" >&2; exit 1; }
#   # then use "$KEY" as the Bearer token (the browser User-Agent is still required on the real call)
#
# Options:
#   --skip-verify   return the key WITHOUT the liveness probe (offline/airgapped only; NOT recommended)
#   --quiet         suppress the stderr LIVE banner on success (errors still print)
# Env override:
#   RATER_KEY_FILE  path to the key env file. Default ~/.api-keys/rater-api-keys.env.
#                   The ~/.secrets/* path is the DECOY and is refused outright.
#
# SECURITY: the key value only ever reaches STDOUT. Never `echo` a captured key; never tee stdout to
# a log. The NOVITA_API_KEY living in the same env file does NOT mean the Abacus key is stale
# (this exact confusion tripped Krystal 2026-06-30 — see memory abacus-crossarch-transport).
set -uo pipefail

KF="${RATER_KEY_FILE:-$HOME/.api-keys/rater-api-keys.env}"
SKIP_VERIFY=0; QUIET=0
for a in "$@"; do
  case "$a" in
    --skip-verify) SKIP_VERIFY=1 ;;
    --quiet)       QUIET=1 ;;
    -h|--help)     awk 'NR>1 && !/^#/{exit} NR>1{sub(/^# ?/,"");print}' "$0" >&2; exit 0 ;;
    *) echo "get-rater-key: unknown option: $a (try --help)" >&2; exit 2 ;;
  esac
done

# Refuse the known decoy path before doing anything else.
case "$KF" in
  *.secrets/abacus_api_key*) echo "get-rater-key: REFUSING decoy path ($KF) — use ~/.api-keys/rater-api-keys.env" >&2; exit 2 ;;
esac
[ -f "$KF" ] || { echo "get-rater-key: MISSING key file: $KF" >&2; exit 2; }

set -a; . "$KF"; set +a
KEY="${ABACUS_AI_API_KEY:-}"
[ -n "$KEY" ] || { echo "get-rater-key: NO ABACUS_AI_API_KEY in $KF" >&2; exit 2; }

if [ "$SKIP_VERIFY" -eq 0 ]; then
  UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 40 \
    -H "Authorization: Bearer ${KEY}" -H "User-Agent: ${UA}" \
    "https://routellm.abacus.ai/v1/models")
  if [ "$code" != "200" ]; then
    echo "get-rater-key: STALE / UNREACHABLE (HTTP ${code}) — re-paste the current key into ${KF}, then retry." >&2
    echo "get-rater-key: (browser UA already set; this is NOT the novita key; ~/.secrets/* is the decoy.)" >&2
    exit 1
  fi
  [ "$QUIET" -eq 1 ] || echo "get-rater-key: LIVE (HTTP 200) — key in ${KF} authenticated (len=${#KEY})." >&2
fi

printf '%s\n' "$KEY"
