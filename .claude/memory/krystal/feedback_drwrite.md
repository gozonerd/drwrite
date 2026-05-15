---
name: DrWrite Build Feedback
description: Corrections from the DrWrite app builder session — git discipline, pane order, scope, renderer choices, Electron launch
type: feedback
---

Commit after every feature step, push immediately. Never accumulate uncommitted scaffolding work.
**Why:** Krystal caught zero commits after extensive work and called it out explicitly. This compounds the risk of losing work (laptop crashed mid-session).
**How to apply:** After each logical step, `git add` specific files, commit with descriptive message, push. Don't wait for "a good stopping point."

Source editor (CodeMirror) on LEFT, WYSIWYG (TipTap) on RIGHT. Do not flip them.
**Why:** Krystal caught the pane order was swapped. She has a specific mental model of the layout.
**How to apply:** Always verify pane order against spec before committing UI changes.

Use dedicated renderers (bpmn-js, D3.js), NOT Mermaid syntax for BPMN/DFD diagrams.
**Why:** Portfolio credibility — demonstrates technical depth beyond just wrapping Mermaid for everything.
**How to apply:** Each diagram type gets its own proper library. Mermaid only for flowcharts/sequence/etc.

DrWrite renders and exports diagrams only. It is NOT a diagram IDE.
**Why:** The diagram visualization IDE is a separate app project. Don't scope-creep the editor.
**How to apply:** Diagram features = read-only rendering + export. No diagram editing UI in DrWrite.

Launch Electron from PowerShell `Start-Process`, not bash directly.
**Why:** Bash shell timeouts kill the Electron process before it finishes loading.
**How to apply:** Use `Start-Process` to fully detach the process from the shell lifecycle.
