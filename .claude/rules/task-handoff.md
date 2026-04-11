---
description: Rules for completing tasks and handing off to next steps
globs: "**/*"
---

# Task Completion & Handoff

When completing any task that is part of a multi-step workflow, provide:

## 1. File Storage Guidance

State where each output file should be stored with full path.

## 2. Next Step Input Files

List the files the next Claude thread/session will need:

```
## Files for Next Step
- [filename] — [purpose]
- [filename] — [purpose]
```

## 3. Confirmation Gate

```
## Confirmation Required

Please confirm file management is complete:
☐ Output file(s) moved to destination folder(s)
☐ Any git actions completed (add, commit, push)

Enter `✓` when confirmed.
```
