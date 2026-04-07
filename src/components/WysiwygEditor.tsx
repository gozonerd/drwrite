import { useEffect, useRef, useMemo, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
// eslint-disable-next-line import/no-named-as-default
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import { Heading } from '@tiptap/extension-heading';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { DiagramCodeBlock } from '../extensions/DiagramCodeBlock';
import { useEditorStore } from '../store/editor-store';

// Generate a slug from heading text for auto-IDs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/** Simple debounce helper — returns a debounced version of `fn`. */
function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return ((...args: unknown[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as unknown as T;
}

export function WysiwygEditor() {
  const setActiveEditor = useEditorStore((s) => s.setActiveEditor);
  const isUpdatingFromStore = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Stable debounced setter for scroll fraction (50ms to prevent scroll storms)
  const debouncedSetScrollFraction = useMemo(
    () =>
      debounce((fraction: number) => {
        useEditorStore.getState().setScrollFraction(fraction);
      }, 50),
    [],
  );

  // Handle scroll events on the WYSIWYG wrapper
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    if (useEditorStore.getState().activeEditor !== 'wysiwyg') return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const maxScroll = scrollHeight - clientHeight;
    const fraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
    debouncedSetScrollFraction(fraction);
  }, [debouncedSetScrollFraction]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Use custom Heading extension below
        codeBlock: false, // Use DiagramCodeBlock instead
        link: {
          openOnClick: false,
          HTMLAttributes: { class: 'text-blue-500 underline cursor-pointer' },
        },
      }),
      DiagramCodeBlock,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }).extend({
        renderHTML({ node, HTMLAttributes }) {
          const level = node.attrs.level as number;
          const text = node.textContent;
          const id = slugify(text);
          return [`h${level}`, { ...HTMLAttributes, id }, 0];
        },
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
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
      useEditorStore.getState().setMarkdownDebounced(md, 'wysiwyg');
    },
    onFocus: () => {
      setActiveEditor('wysiwyg');
    },
  });

  // Subscribe to store changes from the source editor
  useEffect(() => {
    if (!editor) return;

    const unsubscribe = useEditorStore.subscribe((state, prevState) => {
      // Only update if the change came from the source editor or a file operation
      if (state.lastEditedBy !== 'source' && state.lastEditedBy !== 'file') return;
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

  // Subscribe to store scrollFraction changes — scroll this editor when the OTHER editor drives
  useEffect(() => {
    const unsubscribe = useEditorStore.subscribe((state, prevState) => {
      if (state.activeEditor === 'wysiwyg') return; // We are the driver, don't react
      if (state.scrollFraction === prevState.scrollFraction) return;

      const el = scrollContainerRef.current;
      if (!el) return;

      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll > 0) {
        el.scrollTop = state.scrollFraction * maxScroll;
      }
    });
    return unsubscribe;
  }, []);

  if (!editor) return null;

  return (
    <div
      ref={scrollContainerRef}
      className="h-full overflow-auto"
      onFocus={() => setActiveEditor('wysiwyg')}
      onScroll={handleScroll}
    >
      <EditorContent editor={editor} className="h-full" />
    </div>
  );
}
