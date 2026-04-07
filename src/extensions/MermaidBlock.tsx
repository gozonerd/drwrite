import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { MermaidRenderer } from '../components/MermaidRenderer';

let mermaidCounter = 0;

function MermaidNodeView({ node }: { node: { textContent: string } }) {
  const id = `block-${mermaidCounter++}`;

  return (
    <NodeViewWrapper>
      <div className="relative group">
        <div className="absolute top-1 right-1 text-xs px-1.5 py-0.5 rounded bg-gray-700 text-gray-300 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none">
          mermaid
        </div>
        <MermaidRenderer code={node.textContent} id={id} />
      </div>
    </NodeViewWrapper>
  );
}

export const MermaidBlock = Node.create({
  name: 'mermaidBlock',
  group: 'block',
  content: 'text*',
  marks: '',
  code: true,
  defining: true,

  addAttributes() {
    return {
      language: {
        default: 'mermaid',
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
          if (code?.classList.contains('language-mermaid')) {
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
      ['code', { class: 'language-mermaid' }, 0],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MermaidNodeView);
  },
});
