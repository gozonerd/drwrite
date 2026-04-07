import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useEditorStore } from './editor-store';

describe('editor-store', () => {
  beforeEach(() => {
    // Reset store to defaults before each test
    useEditorStore.setState({
      markdown: '# Welcome to DrWrite\n\nStart typing here...\n',
      filePath: null,
      isDirty: false,
      lastEditedBy: null,
      splitRatio: 0.5,
      activeEditor: null,
    });
  });

  describe('setMarkdown', () => {
    it('updates markdown and sets source', () => {
      useEditorStore.getState().setMarkdown('# Hello', 'source');
      const state = useEditorStore.getState();
      expect(state.markdown).toBe('# Hello');
      expect(state.lastEditedBy).toBe('source');
      expect(state.isDirty).toBe(true);
    });

    it('tracks wysiwyg as source', () => {
      useEditorStore.getState().setMarkdown('**bold**', 'wysiwyg');
      expect(useEditorStore.getState().lastEditedBy).toBe('wysiwyg');
    });
  });

  describe('setMarkdownDebounced', () => {
    it('updates markdown after debounce delay', async () => {
      vi.useFakeTimers();
      useEditorStore.getState().setMarkdownDebounced('# Debounced', 'source');

      // Not updated yet
      expect(useEditorStore.getState().markdown).not.toBe('# Debounced');

      // Advance past debounce
      vi.advanceTimersByTime(250);
      expect(useEditorStore.getState().markdown).toBe('# Debounced');
      expect(useEditorStore.getState().isDirty).toBe(true);

      vi.useRealTimers();
    });

    it('resets timer on rapid calls', async () => {
      vi.useFakeTimers();
      useEditorStore.getState().setMarkdownDebounced('first', 'source');
      vi.advanceTimersByTime(100);
      useEditorStore.getState().setMarkdownDebounced('second', 'source');
      vi.advanceTimersByTime(100);
      useEditorStore.getState().setMarkdownDebounced('third', 'source');

      // None applied yet
      expect(useEditorStore.getState().markdown).not.toBe('third');

      // Only the last one fires
      vi.advanceTimersByTime(200);
      expect(useEditorStore.getState().markdown).toBe('third');

      vi.useRealTimers();
    });
  });

  describe('file operations', () => {
    it('setFilePath updates path', () => {
      useEditorStore.getState().setFilePath('/test/file.md');
      expect(useEditorStore.getState().filePath).toBe('/test/file.md');
    });

    it('setIsDirty updates dirty flag', () => {
      useEditorStore.getState().setIsDirty(true);
      expect(useEditorStore.getState().isDirty).toBe(true);
      useEditorStore.getState().setIsDirty(false);
      expect(useEditorStore.getState().isDirty).toBe(false);
    });

    it('resetDocument restores defaults', () => {
      useEditorStore.getState().setMarkdown('modified', 'source');
      useEditorStore.getState().setFilePath('/some/file.md');

      useEditorStore.getState().resetDocument();
      const state = useEditorStore.getState();
      expect(state.markdown).toContain('Welcome to DrWrite');
      expect(state.filePath).toBeNull();
      expect(state.isDirty).toBe(false);
      expect(state.lastEditedBy).toBeNull();
    });
  });

  describe('splitRatio', () => {
    it('clamps to minimum 0.15', () => {
      useEditorStore.getState().setSplitRatio(0.05);
      expect(useEditorStore.getState().splitRatio).toBe(0.15);
    });

    it('clamps to maximum 0.85', () => {
      useEditorStore.getState().setSplitRatio(0.95);
      expect(useEditorStore.getState().splitRatio).toBe(0.85);
    });

    it('accepts valid ratio', () => {
      useEditorStore.getState().setSplitRatio(0.6);
      expect(useEditorStore.getState().splitRatio).toBe(0.6);
    });
  });

  describe('darkMode', () => {
    it('sets dark mode and persists to localStorage', () => {
      useEditorStore.getState().setDarkMode(false);
      expect(useEditorStore.getState().darkMode).toBe(false);
      expect(localStorage.getItem('drwrite-dark-mode')).toBe('false');

      useEditorStore.getState().setDarkMode(true);
      expect(useEditorStore.getState().darkMode).toBe(true);
      expect(localStorage.getItem('drwrite-dark-mode')).toBe('true');
    });
  });

  describe('activeEditor', () => {
    it('tracks which editor has focus', () => {
      useEditorStore.getState().setActiveEditor('source');
      expect(useEditorStore.getState().activeEditor).toBe('source');

      useEditorStore.getState().setActiveEditor('wysiwyg');
      expect(useEditorStore.getState().activeEditor).toBe('wysiwyg');
    });
  });
});
