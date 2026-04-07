import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { DfdRenderer } from '../components/DfdRenderer';

let dfdCounter = 0;

function DfdNodeView({ node }: { node: { textContent: string } }) {
  const id = `dfd-${dfdCounter++}`;

  return (
    <NodeViewWrapper>
      <div className="relative group">
        <div className="absolute top-1 right-1 z-10 text-xs px-1.5 py-0.5 rounded bg-green-700 text-green-100 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none">
          dfd
        </div>
        <DfdRenderer code={node.textContent} id={id} />
      </div>
    </NodeViewWrapper>
  );
}

export const DfdBlock = Node.create({
  name: 'dfdBlock',
  group: 'block',
  content: 'text*',
  marks: '',
  code: true,
  defining: true,

  addAttributes() {
    return {
      language: {
        default: 'dfd',
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
          if (code?.classList.contains('language-dfd')) {
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
      ['code', { class: 'language-dfd' }, 0],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DfdNodeView);
  },
});
