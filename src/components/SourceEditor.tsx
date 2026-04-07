import { useEffect, useRef, useCallback, useMemo } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, lineNumbers, highlightActiveLineGutter, highlightActiveLine, keymap } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching } from '@codemirror/language';
import { oneDark } from '@codemirror/theme-one-dark';
import { search, searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { useEditorStore } from '../store/editor-store';

/** Simple debounce helper — returns a debounced version of `fn`. */
function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return ((...args: unknown[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as unknown as T;
}

export function SourceEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const darkMode = useEditorStore((s) => s.darkMode);
  const setActiveEditor = useEditorStore((s) => s.setActiveEditor);

  // Stable debounced setter for scroll fraction (50ms to prevent scroll storms)
  const debouncedSetScrollFraction = useMemo(
    () =>
      debounce((fraction: number) => {
        useEditorStore.getState().setScrollFraction(fraction);
      }, 50),
    [],
  );

  // Create the update listener that writes changes to the store (debounced for cross-editor sync)
  const handleUpdate = useCallback((update: { docChanged: boolean; state: EditorState }) => {
    if (update.docChanged) {
      const content = update.state.doc.toString();
      useEditorStore.getState().setMarkdownDebounced(content, 'source');
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
      search({ top: true }),
      highlightSelectionMatches(),
      keymap.of([...defaultKeymap, ...historyKeymap, ...searchKeymap]),
      // Enable browser-native spell check on the editor content (browser-verified in E2E)
      EditorView.contentAttributes.of({ spellcheck: 'true' }),
      EditorView.updateListener.of(handleUpdate),
      EditorView.theme({
        '&': { height: '100%' },
        '.cm-scroller': { overflow: 'auto' },
        '.cm-content': { fontFamily: '"JetBrains Mono", monospace' },
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

    // Listen to scroll events on the CodeMirror scroller for cross-pane sync
    const scroller = containerRef.current.querySelector('.cm-scroller') as HTMLElement | null;
    const handleScroll = () => {
      if (!scroller) return;
      if (useEditorStore.getState().activeEditor !== 'source') return;
      const { scrollTop, scrollHeight, clientHeight } = scroller;
      const maxScroll = scrollHeight - clientHeight;
      const fraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
      debouncedSetScrollFraction(fraction);
    };
    scroller?.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scroller?.removeEventListener('scroll', handleScroll);
      view.destroy();
      viewRef.current = null;
    };
  }, [darkMode, handleUpdate, debouncedSetScrollFraction]); // Recreate when dark mode changes to swap theme

  // Subscribe to store scrollFraction changes — scroll this editor when the OTHER editor drives
  useEffect(() => {
    const unsubscribe = useEditorStore.subscribe((state, prevState) => {
      if (state.activeEditor === 'source') return; // We are the driver, don't react
      if (state.scrollFraction === prevState.scrollFraction) return;

      const scroller = containerRef.current?.querySelector('.cm-scroller') as HTMLElement | null;
      if (!scroller) return;

      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      if (maxScroll > 0) {
        scroller.scrollTop = state.scrollFraction * maxScroll;
      }
    });
    return unsubscribe;
  }, []);

  // Subscribe to store changes from the WYSIWYG editor
  useEffect(() => {
    const unsubscribe = useEditorStore.subscribe((state, prevState) => {
      const view = viewRef.current;
      if (!view) return;

      // Only update if the change came from the other editor or a file operation
      if (state.lastEditedBy !== 'wysiwyg' && state.lastEditedBy !== 'file') return;
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

  return <div ref={containerRef} className="h-full" onFocus={() => setActiveEditor('source')} />;
}
