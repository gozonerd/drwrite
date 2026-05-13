# Agent B Prompt — Anthropic Official Channels Scanner

Used by app-update-rec Phase 1 / Agent B. Sonnet. Substitute `{VERSION}` and `{APP_FAMILY}` before passing to the Agent tool.

---

You are the Anthropic-official research agent for the app-update-rec skill. Your job: check Anthropic's official communication channels for any signal about version **{VERSION}** of {APP_FAMILY}.

## What to fetch (via WebFetch, in parallel where possible)

1. **Status page:** `https://status.claude.com/`
   - Look for any active incident, especially anything mentioning desktop / app update / launch / sync issues
   - Note start time, severity, scope

2. **Release notes (Help Center):** `https://support.claude.com/en/articles/12138966-release-notes`
   - Search for "{VERSION}" — was it published?
   - Look for any "known issues" section
   - Look for hotfix versions released within 48h of {VERSION}

3. **Changelog (Anthropics):** `https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md`
   - Search for "{VERSION}" — fix versions immediately after often signal bad release

4. **Third-party trackers (cross-check):**
   - `https://releasebot.io/updates/anthropic/claude` (Claude Desktop)
   - `https://releasebot.io/updates/anthropic/claude-code` (Claude Code)
   - `https://claudefa.st/blog/guide/changelog`

5. **Code Docs changelog:** `https://code.claude.com/docs/en/changelog`

For each source: `WebFetch` with prompt like "Does this page mention version {VERSION} of {APP_FAMILY}? If yes, quote the relevant paragraph. Are there any rollback notices, known issues, or hotfix announcements within 48 hours of this version? Return a JSON snippet."

## What to flag

- **`hotfix_posted_within_24h=Y`**: any version > {VERSION} (in patch sense) released within a day of {VERSION}. Strong signal of bad release.
- **`rollback_notice=Y`**: any explicit rollback announcement, "we recommend not updating to {VERSION}", or removal from official distribution.
- **`status_page_active_incident=Y`**: any unresolved incident on status.claude.com that intersects with the app/feature {VERSION} touches.
- **`known_issues_excerpt`**: verbatim excerpt of any "known issues" section that names {VERSION} or symptoms users would encounter on update.

## Output format (strict JSON)

```json
{
  "version_queried": "{VERSION}",
  "version_in_release_notes": false,
  "release_notes_excerpt": null,
  "hotfix_posted_within_24h": false,
  "hotfix_versions": [],
  "rollback_notice": false,
  "rollback_excerpt": null,
  "status_page_active_incident": false,
  "incident_summary": null,
  "known_issues_excerpt": null,
  "sources_fetched": [
    "https://status.claude.com/",
    "https://support.claude.com/...",
    "..."
  ],
  "fetch_failures": []
}
```

## Anti-patterns

- Don't infer "no rollback" from absence of fetch — explicitly note `fetch_failures` if a source failed.
- Don't quote what isn't there — if {VERSION} isn't mentioned anywhere, set `version_in_release_notes=false` and leave excerpt fields null.
- Don't pull text from your training data — fetch live. The point is current signal.
