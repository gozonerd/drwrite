import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { GraphvizRenderer } from '../components/GraphvizRenderer';

let graphvizCounter = 0;

function GraphvizNodeView({ node }: { node: { textContent: string } }) {
  const id = `graphviz-${graphvizCounter++}`;

  return (
    <NodeViewWrapper>
      <div className="relative group">
        <div className="absolute top-1 right-1 z-10 text-xs px-1.5 py-0.5 rounded bg-teal-700 text-teal-100 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none">
          graphviz
        </div>
        <GraphvizRenderer code={node.textContent} id={id} />
      </div>
    </NodeViewWrapper>
  );
}

export const GraphvizBlock = Node.create({
  name: 'graphvizBlock',
  group: 'block',
  content: 'text*',
  marks: '',
  code: true,
  defining: true,

  addAttributes() {
    return {
      language: {
        default: 'graphviz',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'pre',
        preserveWhitespace: 'full',
        getAttrs: (node) => {
          const el = node as HTMLElement;
          const code = el.querySelector('code');
          if (
            code?.classList.contains('language-graphviz') ||
            code?.classList.contains('language-dot')
          ) {
            return {};
          }
          return false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'pre',
      mergeAttributes(HTMLAttributes),
      ['code', { class: 'language-graphviz' }, 0],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(GraphvizNodeView);
  },
});
