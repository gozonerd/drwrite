import { create } from 'zustand';

export type EditorSource = 'source' | 'wysiwyg' | 'file';

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
  /** Auto-save enabled */
  autoSaveEnabled: boolean;
  /** Auto-save interval in seconds */
  autoSaveInterval: number;
  /** Last auto-save timestamp for brief display */
  lastAutoSave: number | null;
  /** Scroll position as fraction 0.0–1.0, shared between panes for sync */
  scrollFraction: number;

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
  openFile: () => Promise<void>;
  saveFile: () => Promise<void>;
  saveFileAs: () => Promise<void>;
  setAutoSave: (enabled: boolean, interval?: number) => void;
  setScrollFraction: (fraction: number) => void;
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
  autoSaveEnabled: true,
  autoSaveInterval: 30,
  lastAutoSave: null,
  activeEditor: null,
  scrollFraction: 0,

  setMarkdown: (markdown, source) => set({ markdown, lastEditedBy: source, isDirty: true }),

  setMarkdownDebounced: (markdown, source) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      set({ markdown, lastEditedBy: source, isDirty: true });
    }, SYNC_DEBOUNCE_MS);
  },

  setFilePath: (filePath) => set({ filePath }),

  setIsDirty: (isDirty) => set({ isDirty }),

  clearLastEditedBy: () => set({ lastEditedBy: null }),

  setSplitRatio: (splitRatio) => set({ splitRatio: Math.max(0.15, Math.min(0.85, splitRatio)) }),

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

  setScrollFraction: (fraction) => set({ scrollFraction: Math.max(0, Math.min(1, fraction)) }),

  setAutoSave: (enabled, interval) => {
    const updates: Partial<EditorState> = { autoSaveEnabled: enabled };
    if (interval !== undefined) updates.autoSaveInterval = interval;
    localStorage.setItem(
      'drwrite-auto-save',
      JSON.stringify({ enabled, interval: interval ?? useEditorStore.getState().autoSaveInterval }),
    );
    set(updates);
  },

  openFile: async () => {
    const result = await window.drwrite.openFile();
    if (!result.canceled && result.content !== undefined) {
      const newPath = result.filePath ?? null;
      set({
        markdown: result.content,
        filePath: newPath,
        isDirty: false,
        lastEditedBy: 'file',
      });
      // Start watching the new file for external changes
      if (newPath) {
        window.drwrite.watchFile({ filePath: newPath });
      }
    }
  },

  saveFile: async () => {
    const { filePath, markdown } = useEditorStore.getState();
    if (!filePath) {
      // No path yet — fall through to Save As
      return useEditorStore.getState().saveFileAs();
    }
    const result = await window.drwrite.saveFile({ filePath, content: markdown });
    if (result.success) {
      set({ isDirty: false });
    }
  },

  saveFileAs: async () => {
    const { markdown } = useEditorStore.getState();
    const result = await window.drwrite.saveFileAs({ content: markdown });
    if (!result.canceled && result.success) {
      set({ filePath: result.filePath ?? null, isDirty: false });
    }
  },
}));
