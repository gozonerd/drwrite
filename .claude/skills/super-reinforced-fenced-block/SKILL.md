---
name: super-reinforced-fenced-block
description: "Use this skill when content is so deeply nested that even a reinforced fenced block (12 tildes) might conflict, or when presenting content that itself contains tilde fences. Triggers on: 'super reinforced block', 'deep nested block', or when the reinforced-fenced-block skill is insufficient due to tilde conflicts in the content."
---

# Super Reinforced Fenced Block

## Purpose

Handle extreme nesting cases where content contains both backtick fences AND tilde fences, or where multiple layers of nesting are required.

## Strategy: Incremental Tilde Count

Markdown spec allows any number of tildes (minimum 3) as a fence delimiter. The fence closes only when it encounters the EXACT same number of tildes. This means nesting is unlimited:

### Layer 1 (outermost): 16 tildes

~~~~~~~~~~~~~~~~
[Layer 1 content]

~~~~~~~~~~~~
[Layer 2 content — 12 tildes, inside 16-tilde fence]

```
[Layer 3 content — backtick fence, inside 12-tilde fence]
```

~~~~~~~~~~~~

~~~~~~~~~~~~~~~~

### Rules

1. Outermost fence: 16 `~` characters
2. Next inner layer: 12 `~` characters
3. Innermost layers: backtick fences (```)
4. Each layer must use a DIFFERENT count of fence characters
5. Closing fence must EXACTLY match its opening fence count
6. Never exceed 3 nesting layers — if you need more, restructure the content

## When to Use

- Content that itself contains reinforced fenced blocks (12 tildes)
- Presenting skill files that demonstrate the reinforced-fenced-block skill
- Documentation about fencing conventions
- Any time 12-tilde fences appear in the content being presented

## Fallback

If even super-reinforced blocks are insufficient (content contains 16+ consecutive tildes), use HTML `<pre>` tags as the outermost container instead.
