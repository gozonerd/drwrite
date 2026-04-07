import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { HtmlRenderer } from '../components/HtmlRenderer';

let htmlCounter = 0;

function HtmlNodeView({ node }: { node: { textContent: string } }) {
  const id = `html-${htmlCounter++}`;

  return (
    <NodeViewWrapper>
      <div className="relative group">
        <div className="absolute top-1 right-1 z-10 text-xs px-1.5 py-0.5 rounded bg-rose-700 text-rose-100 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none">
          interactive
        </div>
        <HtmlRenderer code={node.textContent} id={id} />
      </div>
    </NodeViewWrapper>
  );
}

export const HtmlBlock = Node.create({
  name: 'htmlBlock',
  group: 'block',
  content: 'text*',
  marks: '',
  code: true,
  defining: true,

  addAttributes() {
    return {
      language: {
        default: 'html-interactive',
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
            code?.classList.contains('language-html-interactive') ||
            code?.classList.contains('language-d3')
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
      ['code', { class: 'language-html-interactive' }, 0],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(HtmlNodeView);
  },
});
