---
name: Abacus RouteLLM key location + how to actually call it (Cloudflare UA + the two 403s)
description: Where the working Abacus RouteLLM API key lives, the verified recipe for a successful chat-completions call (a browser User-Agent is REQUIRED), and how to tell the two different 403s apart so you don't misdiagnose a Cloudflare block as a bad key
type: reference
---

The working Abacus RouteLLM API key — the one that can invoke `POST /v1/chat/completions` to call cross-architectural raters (Kimi `kimi-k2.6`, DeepSeek, Qwen) in ASAE gate rigs — lives in the file `super-resume-verification.env`.

**Key location (in-flight migration as of 2026-05-20):**
- **Today / active (OneDrive):** `~/OneDrive/.api-keys/super-resume-verification.env` — the *same* path in Git-Bash notation is `/c/Users/NerdyKrystal/OneDrive/.api-keys/super-resume-verification.env` (one location, two notations — not two files).
- **After ~2026-05-21 (home, post-migration):** `~/.api-keys/super-resume-verification.env` — Git-Bash notation `/c/Users/NerdyKrystal/.api-keys/super-resume-verification.env`.
- OneDrive breaks GitHub syncing, so `.api-keys` migrates back to the home dir after 2026-05-20. Try the OneDrive path first today; the home path after the migration day. If one is missing, try the other before concluding the key is gone.
- Variable name: `ABACUS_AI_API_KEY=` (value prefix `s2_`, classic Abacus format). The same file also holds `GEMINI_API_KEY=`.
- **Do NOT echo the key value.** Read it with e.g. `grep '^ABACUS_AI_API_KEY=' <file> | cut -d= -f2- | tr -d ' \t\r\n"'`, pass it as a Bearer token, and only ever print HTTP status codes.

**Verified working call recipe (2026-05-20, gate-50 — mm-claude-canonical 3-rater rig):**
- `POST https://routellm.abacus.ai/v1/chat/completions`
- Header `Authorization: Bearer <key>`, `Content-Type: application/json`
- Body `{"model": "kimi-k2.6", "messages": [...], "temperature": 0, "max_tokens": ...}` → **HTTP 200**
- **You MUST send a browser `User-Agent` header** (see the 1010 trap below), or Cloudflare blocks the request before it reaches Abacus.

**The TWO different 403s — read the response BODY to tell them apart (do not conflate):**
- **403 with an Abacus auth / JSON error body → WRONG KEY FILE.** A 403 on `chat/completions` while `/v1/models` returns 200 means wrong key file, not a header/tier/model problem — go straight to `super-resume-verification.env`. The decoy file `~/.secrets/abacus_api_key` (74 bytes, starts with `New-`) returns this 403; it is NOT a valid key.
- **403 with body `error code: 1010` → CLOUDFLARE USER-AGENT BLOCK, not auth.** The endpoint sits behind Cloudflare, which bans bot-signature User-Agents like the default `python-urllib/3.x` (and often bare `curl`). **The key is fine — do not go re-hunting key files.** Fix: send a browser User-Agent, e.g. `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36`. Right key file + browser UA → 200.

**Why this matters:** RouteLLM auth is plain Bearer, so a 403 is ambiguous on its face. Thread determined-jennings (2026-05-19) burned ~40 messages on the wrong-key-file 403. Thread gate-50 (2026-05-20) hit the Cloudflare `1010` 403 and nearly re-ran that same key-file diagnosis before recognizing it as a User-Agent block. Reading the 403 body is the disambiguator: auth/JSON body = key file; `error code: 1010` = User-Agent. (Cross-architectural raters are part of Krystal's rater discipline — see `feedback_cross_architectural_verification_not_cross_vendor.md`.)
