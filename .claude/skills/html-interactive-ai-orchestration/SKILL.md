---
name: html-interactive-ai-orchestration
description: Use this skill to generate interactive HTML+JS browser-based diagrams for AI pipeline orchestration with zoom, click, tooltips, drag, and dynamic filtering. Triggers on 'interactive diagram', 'interactive pipeline', 'D3 diagram', 'HTML diagram', 'clickable pipeline visualization', 'interactive DFD', 'interactive data flow', 'zoomable pipeline', 'explorable workflow', or when the user needs a rich interactive visualization of AI orchestration that goes beyond static diagrams. Also use for full DFD (data flow diagram) rendering with interactive I/O mapping. Produces a self-contained HTML file openable in any browser.
version: 0.1.0
---

# HTML Interactive AI Orchestration Diagrams

## Purpose

Generate interactive, browser-based HTML+JS visualizations for AI pipeline orchestration. This skill encodes both web visualization techniques AND the domain knowledge of agentic orchestration, multi-model workflows, and dependency-aware sequenced pipelines — so Claude can produce a rich, explorable diagram from a plain-language description. Also the primary tool for interactive DFD (Data Flow Diagram) rendering.

## Rendering

The output is a single self-contained HTML file that opens in any modern browser. No server, no build step, no dependencies to install.

## When to Use HTML+JS (vs. Other Diagram Types)

| Use Case | HTML+JS? | Why / Why Not |
|---|---|---|
| Interactive exploration (zoom, click, filter) | **Yes — primary use** | Only format with real interactivity |
| Complex DFD with I/O drill-down | **Yes** | Click a node to see all inputs/outputs |
| Large pipeline systems (30+ nodes) | **Yes** | Zoom/pan handles scale that static diagrams can't |
| Presentation / demo to stakeholders | **Yes** | Impressive, explorable, self-explanatory |
| Dashboard-style overview | **Yes** | Can show status, metrics, live-updating data |
| Quick inline sketch | **No** | Use Mermaid for in-thread diagrams |
| Formal enterprise process model | **No** | Use BPMN for ISO-standard notation |
| Portable text-based diagram | **No** | Use PlantUML or Mermaid for text-only environments |
| Publication in academic paper | **No** | Use Graphviz for static high-resolution output |

## Domain: AI Pipeline Orchestration Patterns

### Interactive Features Mapped to AI Orchestration

| Feature | AI Orchestration Use |
|---|---|
| **Click node** → show detail panel | Click pipeline → see steps, model assignment, I/O, status |
| **Hover** → tooltip | Hover step → see description, estimated time, model used |
| **Zoom + pan** | Navigate large pipeline systems without losing context |
| **Filter by model** | Show only steps assigned to Claude Opus / Sonnet / Haiku |
| **Filter by status** | Show completed / in-progress / blocked / failed steps |
| **Highlight path** | Click a pipeline → highlight all upstream dependencies |
| **Drag to reposition** | Manually adjust layout for presentation |
| **Color legend** | Toggle color coding by role, phase, model, or status |
| **Collapsible clusters** | Expand/collapse pipeline phases to manage visual complexity |
| **Edge labels on hover** | Show data flow details only when hovering over connections |

### Node Data Model

Each node in the diagram should carry this metadata (shown on click/hover):

```javascript
{
  id: "P1",
  name: "Source Content Analysis",
  phase: "Foundation",
  model: "Claude Opus 4.6",
  estimatedTime: "15 min",
  status: "complete",  // complete | in-progress | blocked | pending | failed
  inputs: [
    { name: "Source Legislation PDF", source: "external" },
    { name: "Standards Reference", source: "knowledge_base" },
    { name: "Analysis Prompt Template", source: "prompt_library" }
  ],
  outputs: [
    { name: "Content Map", destination: "P2" },
    { name: "Gap Analysis", destination: "P3" }
  ],
  humanGate: true,
  gateType: "SME Review"
}
```

## Technology Options

### Option A: Vanilla JS + SVG (Recommended Default)

No dependencies. Single HTML file. Best for most pipeline diagrams.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Pipeline Orchestration</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; background: #0f172a; color: #e2e8f0; }

  .container { display: flex; height: 100vh; }
  .diagram-area { flex: 1; position: relative; overflow: hidden; }
  .detail-panel { width: 320px; background: #1e293b; border-left: 1px solid #334155;
                  padding: 24px; overflow-y: auto; display: none; }
  .detail-panel.active { display: block; }

  svg { width: 100%; height: 100%; }

  .node { cursor: pointer; transition: filter 0.2s; }
  .node:hover { filter: brightness(1.2) drop-shadow(0 0 8px rgba(255,255,255,0.3)); }
  .node.selected { filter: drop-shadow(0 0 12px rgba(74,144,217,0.8)); }

  .edge { stroke: #475569; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
  .edge.highlighted { stroke: #4A90D9; stroke-width: 3; }
  .edge.conditional { stroke-dasharray: 8,4; }

  .tooltip { position: absolute; background: #1e293b; border: 1px solid #4A90D9;
             border-radius: 8px; padding: 12px; font-size: 13px; pointer-events: none;
             opacity: 0; transition: opacity 0.15s; max-width: 280px; z-index: 100; }
  .tooltip.visible { opacity: 1; }

  .legend { position: absolute; bottom: 16px; left: 16px; background: #1e293b;
            border: 1px solid #334155; border-radius: 8px; padding: 16px; }
  .legend-item { display: flex; align-items: center; gap: 8px; margin: 4px 0; font-size: 12px; }
  .legend-swatch { width: 16px; height: 16px; border-radius: 4px; }

  .controls { position: absolute; top: 16px; right: 340px; display: flex; gap: 8px; }
  .control-btn { background: #1e293b; border: 1px solid #334155; color: #e2e8f0;
                 padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; }
  .control-btn:hover { background: #334155; }
  .control-btn.active { background: #4A90D9; border-color: #4A90D9; }

  h2 { font-size: 18px; margin-bottom: 16px; color: #f8fafc; }
  h3 { font-size: 14px; margin: 16px 0 8px; color: #94a3b8; text-transform: uppercase;
       letter-spacing: 0.05em; }
  .detail-field { margin: 6px 0; font-size: 13px; }
  .detail-label { color: #64748b; }
  .detail-value { color: #e2e8f0; }
  .status-badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px;
                  font-weight: 600; text-transform: uppercase; }
  .status-complete { background: #065f46; color: #6ee7b7; }
  .status-in-progress { background: #1e40af; color: #93c5fd; }
  .status-pending { background: #374151; color: #9ca3af; }
  .status-blocked { background: #7f1d1d; color: #fca5a5; }
  .io-list { list-style: none; padding: 0; }
  .io-list li { padding: 4px 0; font-size: 12px; border-bottom: 1px solid #1e293b; }
</style>
</head>
<body>
<div class="container">
  <div class="diagram-area" id="diagram">
    <!-- SVG diagram generated by JavaScript -->
    <div class="tooltip" id="tooltip"></div>

    <div class="legend">
      <div class="legend-item"><div class="legend-swatch" style="background:#4A90D9"></div> Pipeline Stage</div>
      <div class="legend-item"><div class="legend-swatch" style="background:#F5A623"></div> QA Gate</div>
      <div class="legend-item"><div class="legend-swatch" style="background:#7ED321"></div> Human Review</div>
      <div class="legend-item"><div class="legend-swatch" style="background:#9B59B6"></div> AI Model</div>
      <div class="legend-item"><div class="legend-swatch" style="background:#1ABC9C"></div> External Input</div>
      <div class="legend-item"><div class="legend-swatch" style="background:#E74C3C"></div> Error Path</div>
    </div>

    <div class="controls">
      <button class="control-btn" onclick="resetZoom()">Reset View</button>
      <button class="control-btn" onclick="filterByModel('all')">All Models</button>
      <button class="control-btn" onclick="filterByModel('opus')">Opus Only</button>
      <button class="control-btn" onclick="filterByModel('sonnet')">Sonnet Only</button>
    </div>
  </div>

  <div class="detail-panel" id="detailPanel">
    <h2 id="detailTitle">Select a node</h2>
    <div id="detailContent"></div>
  </div>
</div>

<script>
// ============================================================
// PIPELINE DATA — EDIT THIS SECTION FOR YOUR SPECIFIC WORKFLOW
// ============================================================

const nodes = [
  // FORMAT: { id, name, phase, model, x, y, type, status, inputs[], outputs[], gate? }
  // x,y are layout positions (0-1000 range, will be scaled to viewport)
  // type: "pipeline" | "gate" | "human" | "model" | "data" | "external"
  {
    id: "P1", name: "Source Content Analysis", phase: "Foundation",
    model: "Claude Opus 4.6", x: 100, y: 300, type: "pipeline", status: "complete",
    inputs: [
      { name: "Source Legislation PDF", source: "External" },
      { name: "Analysis Prompt Template", source: "Prompt Library" }
    ],
    outputs: [
      { name: "Content Map", destination: "P2" },
      { name: "Gap Analysis", destination: "P3" }
    ]
  },
  // ... add more nodes following this pattern
];

const edges = [
  // FORMAT: { from, to, label?, conditional? }
  { from: "P1", to: "P2", label: "content map" },
  // ... add more edges
];

// ============================================================
// RENDERING ENGINE — DO NOT EDIT BELOW UNLESS CUSTOMIZING
// ============================================================

const COLORS = {
  pipeline: "#4A90D9",
  gate: "#F5A623",
  human: "#7ED321",
  model: "#9B59B6",
  data: "#E8E8E8",
  external: "#1ABC9C",
  error: "#E74C3C"
};

const NODE_SIZES = { pipeline: { w: 160, h: 60 }, gate: { w: 80, h: 80 }, default: { w: 140, h: 50 } };

let svgElement, zoom = 1, panX = 0, panY = 0;

function init() {
  const diagram = document.getElementById("diagram");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 1200 800");
  svg.innerHTML = `<defs>
    <marker id="arrowhead" viewBox="0 0 10 10" refX="10" refY="5"
            markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569"/>
    </marker>
  </defs><g id="viewport"></g>`;
  diagram.prepend(svg);
  svgElement = svg;
  renderEdges();
  renderNodes();
  setupInteraction();
}

function renderNodes() {
  const vp = document.getElementById("viewport");
  nodes.forEach(node => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "node");
    g.setAttribute("data-id", node.id);
    g.setAttribute("transform", `translate(${node.x}, ${node.y})`);

    const size = NODE_SIZES[node.type] || NODE_SIZES.default;
    const color = COLORS[node.type] || COLORS.pipeline;

    if (node.type === "gate") {
      const diamond = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      const s = size.w / 2;
      diamond.setAttribute("points", `${s},0 ${size.w},${s} ${s},${size.w} 0,${s}`);
      diamond.setAttribute("fill", color);
      diamond.setAttribute("stroke", "#333");
      g.appendChild(diamond);
    } else {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("width", size.w);
      rect.setAttribute("height", size.h);
      rect.setAttribute("rx", "8");
      rect.setAttribute("fill", color);
      rect.setAttribute("stroke", "#1e293b");
      rect.setAttribute("stroke-width", "2");
      g.appendChild(rect);
    }

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", size.w / 2);
    text.setAttribute("y", (node.type === "gate" ? size.w : size.h) / 2 + 4);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "white");
    text.setAttribute("font-size", "12");
    text.setAttribute("font-family", "Segoe UI, system-ui, sans-serif");
    text.textContent = node.id + ": " + node.name.substring(0, 18);
    g.appendChild(text);

    g.addEventListener("click", () => showDetail(node));
    g.addEventListener("mouseenter", (e) => showTooltip(e, node));
    g.addEventListener("mouseleave", hideTooltip);

    vp.appendChild(g);
  });
}

function renderEdges() {
  const vp = document.getElementById("viewport");
  edges.forEach(edge => {
    const from = nodes.find(n => n.id === edge.from);
    const to = nodes.find(n => n.id === edge.to);
    if (!from || !to) return;

    const fromSize = NODE_SIZES[from.type] || NODE_SIZES.default;
    const toSize = NODE_SIZES[to.type] || NODE_SIZES.default;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", from.x + fromSize.w);
    line.setAttribute("y1", from.y + fromSize.h / 2);
    line.setAttribute("x2", to.x);
    line.setAttribute("y2", to.y + (to.type === "gate" ? toSize.w / 2 : toSize.h / 2));
    line.setAttribute("class", `edge${edge.conditional ? " conditional" : ""}`);
    vp.appendChild(line);
  });
}

function showDetail(node) {
  const panel = document.getElementById("detailPanel");
  const title = document.getElementById("detailTitle");
  const content = document.getElementById("detailContent");

  panel.classList.add("active");
  title.textContent = node.id + ": " + node.name;

  const statusClass = "status-" + (node.status || "pending").replace("_", "-");
  content.innerHTML = `
    <div class="detail-field"><span class="detail-label">Phase:</span> <span class="detail-value">${node.phase || "—"}</span></div>
    <div class="detail-field"><span class="detail-label">Model:</span> <span class="detail-value">${node.model || "—"}</span></div>
    <div class="detail-field"><span class="detail-label">Status:</span> <span class="status-badge ${statusClass}">${node.status || "pending"}</span></div>
    <h3>Inputs</h3>
    <ul class="io-list">${(node.inputs || []).map(i => `<li>${i.name} <span class="detail-label">← ${i.source}</span></li>`).join("") || "<li>None defined</li>"}</ul>
    <h3>Outputs</h3>
    <ul class="io-list">${(node.outputs || []).map(o => `<li>${o.name} <span class="detail-label">→ ${o.destination}</span></li>`).join("") || "<li>None defined</li>"}</ul>
  `;

  document.querySelectorAll(".node").forEach(n => n.classList.remove("selected"));
  document.querySelector(`.node[data-id="${node.id}"]`)?.classList.add("selected");
}

function showTooltip(event, node) {
  const tip = document.getElementById("tooltip");
  tip.innerHTML = `<strong>${node.name}</strong><br>${node.model || ""}<br>Status: ${node.status || "pending"}`;
  tip.style.left = (event.clientX + 16) + "px";
  tip.style.top = (event.clientY - 8) + "px";
  tip.classList.add("visible");
}

function hideTooltip() {
  document.getElementById("tooltip").classList.remove("visible");
}

function resetZoom() {
  const vp = document.getElementById("viewport");
  vp.setAttribute("transform", "");
}

function filterByModel(model) {
  document.querySelectorAll(".node").forEach(el => {
    const node = nodes.find(n => n.id === el.dataset.id);
    if (model === "all" || (node && node.model && node.model.toLowerCase().includes(model))) {
      el.style.opacity = "1";
    } else {
      el.style.opacity = "0.15";
    }
  });
}

function setupInteraction() {
  // Zoom with scroll wheel
  svgElement.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    zoom *= delta;
    zoom = Math.max(0.3, Math.min(3, zoom));
    const vp = document.getElementById("viewport");
    vp.setAttribute("transform", `scale(${zoom}) translate(${panX}, ${panY})`);
  });
}

document.addEventListener("DOMContentLoaded", init);
</script>
</body>
</html>
```

### Option B: D3.js (for force-directed layouts)

Use when nodes don't have fixed positions and you want physics-based layout:

```html
<script src="https://d3js.org/d3.v7.min.js"></script>
```

D3 adds ~90KB but provides force simulation, automatic collision avoidance, and smooth transitions. Use for graphs where the optimal layout isn't obvious.

### Option C: Cytoscape.js (for graph-heavy applications)

Use when you need advanced graph algorithms (shortest path, clustering, centrality):

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.28.1/cytoscape.min.js"></script>
```

## DFD (Data Flow Diagram) Mode

For interactive DFDs showing inputs/outputs per pipeline step, the HTML+JS approach excels because:

1. **Click any process node** → side panel shows all numbered inputs with sources and all outputs with destinations
2. **Hover a data flow arrow** → tooltip shows what data is being passed
3. **Filter by data store** → highlight all steps that read from a specific knowledge base
4. **Toggle I/O visibility** → show/hide input labels on edges

### DFD Node Types in HTML+JS

| DFD Element | Visual | Implementation |
|---|---|---|
| Process | Rounded rectangle | Same as pipeline node |
| Data flow | Labeled arrow | Edge with hover tooltip |
| Data store | Horizontal lines (open rectangle) | Custom SVG shape |
| External entity | Rectangle | Standard node with "external" type |

## Workflow

1. **Receive description.** User describes the pipeline system — nodes, dependencies, I/O, models, gates.
2. **Determine complexity.** If simple DAG, suggest Mermaid instead. HTML+JS is for interactivity, scale, or DFD drill-down.
3. **Choose technology.** Vanilla SVG (default), D3 (force layout), or Cytoscape (graph algorithms).
4. **Build node data array.** Map each pipeline step to the node data model with full metadata.
5. **Build edge array.** Map dependencies with labels and conditional flags.
6. **Generate HTML file.** Single self-contained file with embedded CSS + JS.
7. **Save as `.html` file** with standard naming.

## Output Format

Generate a single self-contained HTML file. Do not use external CDN dependencies unless the user requests D3 or Cytoscape.

File naming: `[PREFIX_]Interactive_Description_YYYY-MM-DD_vXX_I.html`

## Rendering Instructions for User

After generating the HTML file, include:

> **To view this diagram:**
> 1. Open the saved `.html` file in any modern browser (Chrome, Edge, Firefox)
> 2. Click nodes to see detail panels with inputs/outputs
> 3. Hover for tooltips
> 4. Scroll to zoom, drag to pan
> 5. Use filter buttons to focus on specific models or statuses

## Design Principles

1. **Dark theme by default** — professional, reduces eye strain, looks polished in presentations
2. **No external dependencies** (vanilla SVG) — single file, works offline, no CDN risk
3. **Responsive** — scales to any viewport
4. **Accessible** — keyboard navigable, high contrast, semantic HTML
5. **Self-documenting** — the DATA section at the top is clearly marked for editing
