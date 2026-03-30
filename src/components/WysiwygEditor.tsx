import { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Markdown } from 'tiptap-markdown';
import { useEditorStore } from '../store/editor-store';

export function WysiwygEditor() {
  const setActiveEditor = useEditorStore((s) => s.setActiveEditor);
  const isUpdatingFromStore = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        codeBlock: {
          HTMLAttributes: { class: 'code-block' },
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-blue-500 underline cursor-pointer' },
      }),
      Markdown.configure({
        html: true,
        transformPastedText: true,
        transformCopiedText: true,
      }),
    ],
    content: useEditorStore.getState().markdown,
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none h-full p-4 outline-none',
      },
    },
    onUpdate: ({ editor: ed }) => {
      // Don't write back if we're applying a store update
      if (isUpdatingFromStore.current) return;

      const md = ed.storage.markdown.getMarkdown();
      useEditorStore.getState().setMarkdown(md, 'wysiwyg');
    },
    onFocus: () => {
      setActiveEditor('wysiwyg');
    },
  });

  // Subscribe to store changes from the source editor
  useEffect(() => {
    if (!editor) return;

    const unsubscribe = useEditorStore.subscribe((state, prevState) => {
      // Only update if the change came from the source editor
      if (state.lastEditedBy !== 'source') return;
      if (state.markdown === prevState.markdown) return;

      // Check if content actually differs from what TipTap has
      const currentMd = editor.storage.markdown.getMarkdown();
      if (state.markdown === currentMd) return;

      // Save cursor position
      const { from, to } = editor.state.selection;

      // Set flag to prevent onUpdate from writing back
      isUpdatingFromStore.current = true;

      editor.commands.setContent(state.markdown, false, {
        preserveWhitespace: 'full',
      });

      // Restore cursor, clamped to new document length
      const maxPos = editor.state.doc.content.size;
      editor.commands.setTextSelection({
        from: Math.min(from, maxPos),
        to: Math.min(to, maxPos),
      });

      isUpdatingFromStore.current = false;
    });

    return unsubscribe;
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="h-full overflow-auto" onFocus={() => setActiveEditor('wysiwyg')}>
      <EditorContent editor={editor} className="h-full" />
    </div>
  );
}
