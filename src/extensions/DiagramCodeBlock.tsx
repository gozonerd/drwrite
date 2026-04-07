import { CodeBlock } from '@tiptap/extension-code-block';
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { MermaidRenderer } from '../components/MermaidRenderer';
import { BpmnRenderer } from '../components/BpmnRenderer';
import { DfdRenderer } from '../components/DfdRenderer';
import { PlantUmlRenderer } from '../components/PlantUmlRenderer';
import { GraphvizRenderer } from '../components/GraphvizRenderer';
import { HtmlRenderer } from '../components/HtmlRenderer';

const DIAGRAM_LANGUAGES = new Set([
  'mermaid',
  'bpmn',
  'dfd',
  'plantuml',
  'graphviz',
  'dot',
  'html-interactive',
  'd3',
]);

function DiagramCodeBlockView({ node }: { node: any }) {
  const language = (node.attrs.language || '').toLowerCase();
  const code = node.textContent;
  const id = `diagram-${crypto.randomUUID()}`;

  // If it's a diagram language, render the diagram
  if (DIAGRAM_LANGUAGES.has(language) && code.trim()) {
    let label = language;
    let renderer: React.ReactNode = null;

    switch (language) {
      case 'mermaid':
        renderer = <MermaidRenderer code={code} id={id} />;
        break;
      case 'bpmn':
        renderer = <BpmnRenderer xml={code} id={id} />;
        break;
      case 'dfd':
        renderer = <DfdRenderer code={code} id={id} />;
        break;
      case 'plantuml':
        renderer = <PlantUmlRenderer code={code} id={id} />;
        break;
      case 'graphviz':
      case 'dot':
        label = 'graphviz';
        renderer = <GraphvizRenderer code={code} id={id} />;
        break;
      case 'html-interactive':
      case 'd3':
        label = 'interactive';
        renderer = <HtmlRenderer code={code} id={id} />;
        break;
    }

    if (renderer) {
      return (
        <NodeViewWrapper>
          <div className="relative group my-2">
            <div className="absolute top-1 right-1 z-10 text-xs px-1.5 py-0.5 rounded bg-gray-700 text-gray-300 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none">
              {label}
            </div>
            {renderer}
            {/* Hidden editable content so TipTap can still edit the code */}
            <details className="mt-1">
              <summary className="text-xs text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-300">
                Show source
              </summary>
              <pre className="text-xs bg-gray-900 text-gray-300 p-2 rounded mt-1 overflow-x-auto">
                <NodeViewContent as="code" />
              </pre>
            </details>
          </div>
        </NodeViewWrapper>
      );
    }
  }

  // Default: render as normal code block
  return (
    <NodeViewWrapper>
      <pre className="code-block">
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
}

/**
 * Extended CodeBlock that renders diagram languages visually
 * while keeping regular code blocks as-is.
 */
export const DiagramCodeBlock = CodeBlock.extend({
  addNodeView() {
    return ReactNodeViewRenderer(DiagramCodeBlockView);
  },
});
