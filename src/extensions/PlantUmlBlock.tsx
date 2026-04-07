import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { PlantUmlRenderer } from '../components/PlantUmlRenderer';

let plantumlCounter = 0;

function PlantUmlNodeView({ node }: { node: { textContent: string } }) {
  const id = `plantuml-${plantumlCounter++}`;

  return (
    <NodeViewWrapper>
      <div className="relative group">
        <div className="absolute top-1 right-1 z-10 text-xs px-1.5 py-0.5 rounded bg-orange-700 text-orange-100 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none">
          plantuml
        </div>
        <PlantUmlRenderer code={node.textContent} id={id} />
      </div>
    </NodeViewWrapper>
  );
}

export const PlantUmlBlock = Node.create({
  name: 'plantumlBlock',
  group: 'block',
  content: 'text*',
  marks: '',
  code: true,
  defining: true,

  addAttributes() {
    return {
      language: {
        default: 'plantuml',
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
          if (code?.classList.contains('language-plantuml')) {
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
      ['code', { class: 'language-plantuml' }, 0],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(PlantUmlNodeView);
  },
});
