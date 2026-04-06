import { create } from 'zustand';

export type EditorSource = 'source' | 'wysiwyg';

interface EditorState {
  /** The markdown string — single source of truth */
  markdown: string;
  /** Path to the currently open file, null if untitled */
  filePath: string | null;
  /** Whether there are unsaved changes */
  isDirty: boolean;
  /** Which editor last made a change (for sync loop prevention) */
  lastEditedBy: EditorSource | null;
  /** Split ratio between source (left) and WYSIWYG (right), 0.0–1.0 */
  splitRatio: number;
  /** Dark mode enabled */
  darkMode: boolean;
  /** Which editor currently has focus */
  activeEditor: EditorSource | null;

  // Actions
  setMarkdown: (markdown: string, source: EditorSource) => void;
  setMarkdownDebounced: (markdown: string, source: EditorSource) => void;
  setFilePath: (path: string | null) => void;
  setIsDirty: (dirty: boolean) => void;
  clearLastEditedBy: () => void;
  setSplitRatio: (ratio: number) => void;
  setDarkMode: (enabled: boolean) => void;
  setActiveEditor: (editor: EditorSource | null) => void;
  resetDocument: () => void;
}

const DEFAULT_MARKDOWN = '# Welcome to DrWrite\n\nStart typing here...\n';
const SYNC_DEBOUNCE_MS = 200;

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export const useEditorStore = create<EditorState>((set) => ({
  markdown: DEFAULT_MARKDOWN,
  filePath: null,
  isDirty: false,
  lastEditedBy: null,
  splitRatio: 0.5,
  darkMode: window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true,
  activeEditor: null,

  setMarkdown: (markdown, source) =>
    set({ markdown, lastEditedBy: source, isDirty: true }),

  setMarkdownDebounced: (markdown, source) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      set({ markdown, lastEditedBy: source, isDirty: true });
    }, SYNC_DEBOUNCE_MS);
  },

  setFilePath: (filePath) => set({ filePath }),

  setIsDirty: (isDirty) => set({ isDirty }),

  clearLastEditedBy: () => set({ lastEditedBy: null }),

  setSplitRatio: (splitRatio) =>
    set({ splitRatio: Math.max(0.15, Math.min(0.85, splitRatio)) }),

  setDarkMode: (darkMode) => {
    localStorage.setItem('drwrite-dark-mode', JSON.stringify(darkMode));
    set({ darkMode });
  },

  setActiveEditor: (activeEditor) => set({ activeEditor }),

  resetDocument: () =>
    set({
      markdown: DEFAULT_MARKDOWN,
      filePath: null,
      isDirty: false,
      lastEditedBy: null,
    }),
}));
