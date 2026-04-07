import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { BpmnRenderer } from '../components/BpmnRenderer';

let bpmnCounter = 0;

function BpmnNodeView({ node }: { node: { textContent: string } }) {
  const id = `bpmn-${bpmnCounter++}`;

  return (
    <NodeViewWrapper>
      <div className="relative group">
        <div className="absolute top-1 right-1 z-10 text-xs px-1.5 py-0.5 rounded bg-blue-700 text-blue-100 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none">
          bpmn
        </div>
        <BpmnRenderer xml={node.textContent} id={id} />
      </div>
    </NodeViewWrapper>
  );
}

export const BpmnBlock = Node.create({
  name: 'bpmnBlock',
  group: 'block',
  content: 'text*',
  marks: '',
  code: true,
  defining: true,

  addAttributes() {
    return {
      language: {
        default: 'bpmn',
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
          if (code?.classList.contains('language-bpmn')) {
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
      ['code', { class: 'language-bpmn' }, 0],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(BpmnNodeView);
  },
});
