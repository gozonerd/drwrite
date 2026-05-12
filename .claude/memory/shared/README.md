# memory/shared/

Memory files that apply to BOTH Krystal AND Cody. Every file here MUST have `user: shared` in frontmatter.

Use sparingly — most memory is user-specific. Shared memory is for content like methodology rules that apply equally to both authors.

Memory partition fail-mode is FAIL-CLOSED (per design doc §11.8): when user-detection is ambiguous and unresolvable, NO memory loads — including shared. Surface warning, continue session without memory.
