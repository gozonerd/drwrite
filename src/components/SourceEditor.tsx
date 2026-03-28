import { useEffect, useRef, useCallback } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, lineNumbers, highlightActiveLineGutter, highlightActiveLine, keymap } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching } from '@codemirror/language';
import { oneDark } from '@codemirror/theme-one-dark';
import { useEditorStore } from '../store/editor-store';

export function SourceEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const darkMode = useEditorStore((s) => s.darkMode);
  const setActiveEditor = useEditorStore((s) => s.setActiveEditor);

  // Create the update listener that writes changes to the store
  const handleUpdate = useCallback((update: { docChanged: boolean; state: EditorState }) => {
    if (update.docChanged) {
      const content = update.state.doc.toString();
      useEditorStore.getState().setMarkdown(content, 'source');
    }
  }, []);

  // Initialize CodeMirror
  useEffect(() => {
    if (!containerRef.current) return;

    const initialMarkdown = useEditorStore.getState().markdown;

    const extensions = [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightActiveLine(),
      history(),
      bracketMatching(),
      markdown({ base: markdownLanguage, codeLanguages: languages }),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      EditorView.updateListener.of(handleUpdate),
      EditorView.theme({
        '&': { height: '100%' },
        '.cm-scroller': { overflow: 'auto' },
        '.cm-content': { fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace' },
      }),
      // Apply dark theme if needed
      ...(darkMode ? [oneDark] : []),
    ];

    const state = EditorState.create({
      doc: initialMarkdown,
      extensions,
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [darkMode, handleUpdate]); // Recreate when dark mode changes to swap theme

  // Subscribe to store changes from the WYSIWYG editor
  useEffect(() => {
    const unsubscribe = useEditorStore.subscribe((state, prevState) => {
      const view = viewRef.current;
      if (!view) return;

      // Only update if the change came from the other editor
      if (state.lastEditedBy !== 'wysiwyg') return;
      if (state.markdown === prevState.markdown) return;

      const currentContent = view.state.doc.toString();
      if (state.markdown === currentContent) return;

      // Save cursor position
      const selection = view.state.selection;

      // Replace document content without adding to undo history
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: state.markdown,
        },
        // Clamp selection to new document length
        selection: {
          anchor: Math.min(selection.main.anchor, state.markdown.length),
          head: Math.min(selection.main.head, state.markdown.length),
        },
        annotations: [EditorView.announce.of('')], // Prevent this from entering undo history
      });
    });

    return unsubscribe;
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full"
      onFocus={() => setActiveEditor('source')}
    />
  );
}
