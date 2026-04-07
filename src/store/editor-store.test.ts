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

  describe('clearLastEditedBy', () => {
    it('sets lastEditedBy to null', () => {
      useEditorStore.getState().setMarkdown('# Test', 'source');
      expect(useEditorStore.getState().lastEditedBy).toBe('source');

      useEditorStore.getState().clearLastEditedBy();
      expect(useEditorStore.getState().lastEditedBy).toBeNull();
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

  describe('openFile', () => {
    it('opens a file and updates store with content and path', async () => {
      const mockOpenFile = vi.fn().mockResolvedValue({
        canceled: false,
        content: '# Opened file',
        filePath: '/docs/opened.md',
      });
      const mockWatchFile = vi.fn().mockResolvedValue({ success: true });
      window.drwrite.openFile = mockOpenFile;
      window.drwrite.watchFile = mockWatchFile;

      await useEditorStore.getState().openFile();

      const state = useEditorStore.getState();
      expect(state.markdown).toBe('# Opened file');
      expect(state.filePath).toBe('/docs/opened.md');
      expect(state.isDirty).toBe(false);
      expect(state.lastEditedBy).toBe('file');
      expect(mockWatchFile).toHaveBeenCalledWith({ filePath: '/docs/opened.md' });
    });

    it('does nothing when dialog is canceled', async () => {
      window.drwrite.openFile = vi.fn().mockResolvedValue({ canceled: true });

      const originalMarkdown = useEditorStore.getState().markdown;
      await useEditorStore.getState().openFile();

      expect(useEditorStore.getState().markdown).toBe(originalMarkdown);
      expect(useEditorStore.getState().filePath).toBeNull();
    });

    it('handles open with no filePath (null)', async () => {
      const mockWatchFile = vi.fn();
      window.drwrite.openFile = vi.fn().mockResolvedValue({
        canceled: false,
        content: '# No path',
        filePath: undefined,
      });
      window.drwrite.watchFile = mockWatchFile;

      await useEditorStore.getState().openFile();

      expect(useEditorStore.getState().markdown).toBe('# No path');
      expect(useEditorStore.getState().filePath).toBeNull();
      // watchFile should NOT be called when newPath is null
      expect(mockWatchFile).not.toHaveBeenCalled();
    });
  });

  describe('saveFile', () => {
    it('saves to existing path and clears dirty flag', async () => {
      window.drwrite.saveFile = vi.fn().mockResolvedValue({ success: true });

      useEditorStore.setState({
        filePath: '/docs/existing.md',
        markdown: '# Save me',
        isDirty: true,
      });

      await useEditorStore.getState().saveFile();

      expect(window.drwrite.saveFile).toHaveBeenCalledWith({
        filePath: '/docs/existing.md',
        content: '# Save me',
      });
      expect(useEditorStore.getState().isDirty).toBe(false);
    });

    it('falls through to saveFileAs when no filePath exists', async () => {
      window.drwrite.saveFileAs = vi.fn().mockResolvedValue({
        canceled: false,
        success: true,
        filePath: '/docs/new-file.md',
      });

      useEditorStore.setState({
        filePath: null,
        markdown: '# New doc',
        isDirty: true,
      });

      await useEditorStore.getState().saveFile();

      // Should have called saveFileAs since filePath was null
      expect(window.drwrite.saveFileAs).toHaveBeenCalledWith({
        content: '# New doc',
      });
    });

    it('does not clear dirty flag when save fails', async () => {
      window.drwrite.saveFile = vi.fn().mockResolvedValue({ success: false });

      useEditorStore.setState({
        filePath: '/docs/existing.md',
        markdown: '# Content',
        isDirty: true,
      });

      await useEditorStore.getState().saveFile();

      expect(useEditorStore.getState().isDirty).toBe(true);
    });
  });

  describe('saveFileAs', () => {
    it('saves with new path and updates store', async () => {
      window.drwrite.saveFileAs = vi.fn().mockResolvedValue({
        canceled: false,
        success: true,
        filePath: '/docs/saved-as.md',
      });

      useEditorStore.setState({
        markdown: '# Save as',
        isDirty: true,
      });

      await useEditorStore.getState().saveFileAs();

      expect(window.drwrite.saveFileAs).toHaveBeenCalledWith({
        content: '# Save as',
      });
      expect(useEditorStore.getState().filePath).toBe('/docs/saved-as.md');
      expect(useEditorStore.getState().isDirty).toBe(false);
    });

    it('does nothing when dialog is canceled', async () => {
      window.drwrite.saveFileAs = vi.fn().mockResolvedValue({
        canceled: true,
      });

      useEditorStore.setState({
        markdown: '# Content',
        filePath: '/original.md',
        isDirty: true,
      });

      await useEditorStore.getState().saveFileAs();

      // Should not have changed anything
      expect(useEditorStore.getState().filePath).toBe('/original.md');
      expect(useEditorStore.getState().isDirty).toBe(true);
    });

    it('handles saveFileAs with undefined filePath in result', async () => {
      window.drwrite.saveFileAs = vi.fn().mockResolvedValue({
        canceled: false,
        success: true,
        filePath: undefined,
      });

      useEditorStore.setState({
        markdown: '# No path',
        isDirty: true,
      });

      await useEditorStore.getState().saveFileAs();

      expect(useEditorStore.getState().filePath).toBeNull();
      expect(useEditorStore.getState().isDirty).toBe(false);
    });
  });
});
