---
name: reinforced-fenced-block
description: "Use this skill when presenting formatted content that contains markdown, code blocks, or nested formatting that would break a standard fenced code block. Triggers on: 'reinforced fenced block', 'reinforced block', 'safe fenced block', 'nest-safe block', or when Claude needs to present content containing backtick fences without breaking the outer container. Uses 12 tilde (~) characters as the outer fence with backticks for inner nesting."
---

# Reinforced Fenced Block

## Purpose

Present formatted content inside a fenced code block that will not break regardless of what markdown, code, or nested fences exist inside it. Standard backtick fences break when the content itself contains backtick fences. This skill eliminates that problem.

## Format

### Outer fence: 12 tildes

```
~~~~~~~~~~~~
[content goes here — can contain any backtick fences, markdown, code, etc.]
~~~~~~~~~~~~
```

### Inner nesting: backticks

Inside the tilde fence, use standard backtick fences (```) for code blocks, markdown formatting, or any other nested content. The tilde outer fence will never conflict with backtick inner content.

## Example

~~~~~~~~~~~~
## This is a heading inside the block

Here is some text with `inline code` and a full code block:

```python
def hello():
    print("This won't break the outer fence")
```

And another nested block:

```markdown
# Nested markdown
- List item
- Another item
```

All of this renders cleanly because the outer fence uses tildes, not backticks.
~~~~~~~~~~~~

## When to Use

- Presenting SKILL.md content in-thread
- Showing markdown templates that contain their own fences
- Presenting code that includes markdown documentation
- Any time nested backtick fences would break the container
- When the user asks for "reinforced" or "safe" fenced blocks

## Rules

1. Always use exactly 12 `~` characters for the outer fence (opening and closing)
2. Never use tildes for inner nesting — backticks only inside
3. If content somehow contains 12+ consecutive tildes (extremely rare), escalate to `super-reinforced-fenced-block` skill
4. The outer tilde fence does NOT take a language identifier — it is a raw container
