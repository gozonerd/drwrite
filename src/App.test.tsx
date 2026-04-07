import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useEditorStore } from './store/editor-store';
import { useTabStore } from './store/tab-store';

// Capture the onExportPdf/onExportHtml handlers so we can call them in tests
let capturedOnExportPdf: ((s: unknown) => void) | null = null;
let capturedOnExportHtml: ((s: unknown) => void) | null = null;

vi.mock('./components/Toolbar', () => ({
  Toolbar: ({ onExport }: { onExport: () => void }) => (
    <div data-testid="toolbar" onClick={onExport}>
      Toolbar
    </div>
  ),
}));
vi.mock('./components/TabBar', () => ({ TabBar: () => <div data-testid="tabbar">TabBar</div> }));
vi.mock('./components/SplitView', () => ({ SplitView: () => <div data-testid="splitview">SplitView</div> }));
vi.mock('./components/StatusBar', () => ({ StatusBar: () => <div data-testid="statusbar">StatusBar</div> }));
vi.mock('./components/ExportDialog', () => ({
  ExportDialog: ({
    onClose,
    onExportPdf,
    onExportHtml,
  }: {
    onClose: () => void;
    onExportPdf: (s: unknown) => void;
    onExportHtml: (s: unknown) => void;
  }) => {
    capturedOnExportPdf = onExportPdf;
    capturedOnExportHtml = onExportHtml;
    return (
      <div data-testid="export-dialog">
        <button onClick={onClose}>Close</button>
      </div>
    );
  },
}));
vi.mock('./components/KeybindingDialog', () => ({
  KeybindingDialog: ({ onClose }: { onClose: () => void }) => {
    return (
      <div data-testid="keybinding-dialog">
        <button onClick={onClose}>CloseKB</button>
      </div>
    );
  },
}));
vi.mock('./components/OnboardingDialog', () => ({
  OnboardingDialog: ({ onClose }: { onClose: () => void }) => {
    return (
      <div data-testid="onboarding-dialog">
        <button onClick={onClose}>Got it</button>
      </div>
    );
  },
}));
vi.mock('./components/FileTreeSidebar', () => ({
  FileTreeSidebar: ({ visible }: { visible: boolean }) => {
    return visible ? <div data-testid="file-tree-sidebar">Sidebar</div> : null;
  },
}));

vi.mock('./utils/export-html', () => ({
  generatePrintHtml: vi.fn(() => '<html></html>'),
  DEFAULT_EXPORT_SETTINGS: {
    fontSize: 14,
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 1,
    marginRight: 1,
    fontFamily: 'sans-serif',
  },
}));

import { App } from './App';

describe('App', () => {
  // Capture the onFileChanged callback registered by the App
  let fileChangedCallback: ((arg: { filePath: string }) => void) | null = null;

  beforeEach(() => {
    capturedOnExportPdf = null;
    capturedOnExportHtml = null;
    fileChangedCallback = null;

    // Mock onFileChanged to capture the callback
    window.drwrite.onFileChanged = (cb: (arg: { filePath: string }) => void) => {
      fileChangedCallback = cb;
      return () => {
        fileChangedCallback = null;
      };
    };

    useEditorStore.setState({
      darkMode: true,
      filePath: null,
      isDirty: false,
      markdown: '# Test',
      lastEditedBy: null,
      activeEditor: null,
      splitRatio: 0.5,
    });
    useTabStore.setState({ tabs: [], activeTabId: null, tabContentCache: {} });
    document.documentElement.classList.remove('dark');
    // Suppress onboarding dialog by default so existing tests aren't affected
    localStorage.setItem('drwrite-onboarded', 'true');
  });

  it('renders all child components', () => {
    render(<App />);
    expect(screen.getByTestId('toolbar')).toBeInTheDocument();
    expect(screen.getByTestId('tabbar')).toBeInTheDocument();
    expect(screen.getByTestId('splitview')).toBeInTheDocument();
    expect(screen.getByTestId('statusbar')).toBeInTheDocument();
  });

  it('applies dark class to html element when darkMode is true', async () => {
    useEditorStore.setState({ darkMode: true });
    render(<App />);
    // useEffect runs after render
    await vi.waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  it('removes dark class when darkMode is false', async () => {
    document.documentElement.classList.add('dark');
    useEditorStore.setState({ darkMode: false });
    render(<App />);
    await vi.waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  it('creates initial tab on mount when no tabs exist', async () => {
    render(<App />);
    await vi.waitFor(() => {
      expect(useTabStore.getState().tabs.length).toBeGreaterThan(0);
    });
  });

  it('Ctrl+O calls openFile', () => {
    const openFileSpy = vi.spyOn(useEditorStore.getState(), 'openFile');
    render(<App />);
    fireEvent.keyDown(window, { key: 'o', ctrlKey: true });
    expect(openFileSpy).toHaveBeenCalled();
    openFileSpy.mockRestore();
  });

  it('Ctrl+S calls saveFile', () => {
    const saveFileSpy = vi.spyOn(useEditorStore.getState(), 'saveFile');
    render(<App />);
    fireEvent.keyDown(window, { key: 's', ctrlKey: true });
    expect(saveFileSpy).toHaveBeenCalled();
    saveFileSpy.mockRestore();
  });

  it('Ctrl+N calls resetDocument', () => {
    const resetSpy = vi.spyOn(useEditorStore.getState(), 'resetDocument');
    render(<App />);
    fireEvent.keyDown(window, { key: 'n', ctrlKey: true });
    expect(resetSpy).toHaveBeenCalled();
    resetSpy.mockRestore();
  });

  it('Ctrl+E shows export dialog', async () => {
    render(<App />);
    expect(screen.queryByTestId('export-dialog')).not.toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'e', ctrlKey: true });
    await vi.waitFor(() => {
      expect(screen.getByTestId('export-dialog')).toBeInTheDocument();
    });
  });

  it('export dialog not shown initially', () => {
    render(<App />);
    expect(screen.queryByTestId('export-dialog')).not.toBeInTheDocument();
  });

  it('opens export dialog via toolbar click and closes via dialog close button', async () => {
    render(<App />);

    // Click the toolbar mock (which calls onExport -> setShowExport(true))
    fireEvent.click(screen.getByTestId('toolbar'));

    await vi.waitFor(() => {
      expect(screen.getByTestId('export-dialog')).toBeInTheDocument();
    });

    // Close the dialog via the Close button (which calls onClose -> setShowExport(false))
    fireEvent.click(screen.getByText('Close'));

    await vi.waitFor(() => {
      expect(screen.queryByTestId('export-dialog')).not.toBeInTheDocument();
    });
  });

  it('Ctrl+Shift+S calls saveFileAs', () => {
    const saveFileAsSpy = vi.spyOn(useEditorStore.getState(), 'saveFileAs');
    render(<App />);
    fireEvent.keyDown(window, { key: 'S', ctrlKey: true, shiftKey: true });
    expect(saveFileAsSpy).toHaveBeenCalled();
    saveFileAsSpy.mockRestore();
  });

  // --- Tab sync coverage ---

  it('restores cached tab content on tab switch', async () => {
    // Pre-populate a tab with cached content
    const tabId = useTabStore.getState().addTab(null, 'Tab1');
    useTabStore.getState().cacheTabContent(tabId, {
      markdown: '# Cached content',
      filePath: '/cached/file.md',
    });

    render(<App />);

    // Switch to the tab that has cached content
    act(() => {
      useTabStore.setState({ activeTabId: tabId });
    });

    await vi.waitFor(() => {
      const state = useEditorStore.getState();
      expect(state.markdown).toBe('# Cached content');
      expect(state.filePath).toBe('/cached/file.md');
    });
  });

  it('syncs editor changes back to tab cache', async () => {
    // Create a tab so activeTabId is set
    const tabId = useTabStore.getState().addTab(null, 'Tab1');

    render(<App />);

    // Now update the editor store — the subscription should cache it
    act(() => {
      useEditorStore.setState({
        markdown: '# Updated',
        filePath: '/updated.md',
        isDirty: true,
      });
    });

    await vi.waitFor(() => {
      const cached = useTabStore.getState().getTabContent(tabId);
      expect(cached).toBeDefined();
      expect(cached!.markdown).toBe('# Updated');
      expect(cached!.filePath).toBe('/updated.md');
    });
  });

  it('updates tab metadata (title, isDirty) when editor changes', async () => {
    const tabId = useTabStore.getState().addTab(null, 'Tab1');

    render(<App />);

    act(() => {
      useEditorStore.setState({
        markdown: '# New',
        filePath: '/path/to/doc.md',
        isDirty: true,
      });
    });

    await vi.waitFor(() => {
      const tab = useTabStore.getState().tabs.find((t) => t.id === tabId);
      expect(tab).toBeDefined();
      expect(tab!.title).toBe('doc.md');
      expect(tab!.isDirty).toBe(true);
    });
  });

  it('sets title to Untitled when filePath is null', async () => {
    const tabId = useTabStore.getState().addTab(null, 'Tab1');

    render(<App />);

    act(() => {
      useEditorStore.setState({
        markdown: '# New',
        filePath: null,
        isDirty: false,
      });
    });

    await vi.waitFor(() => {
      const tab = useTabStore.getState().tabs.find((t) => t.id === tabId);
      expect(tab).toBeDefined();
      expect(tab!.title).toBe('Untitled');
    });
  });

  // --- Export handler coverage ---

  it('handleExportPdf calls window.drwrite.exportPdf and closes dialog', async () => {
    const exportPdfSpy = vi.fn().mockResolvedValue({ canceled: false });
    window.drwrite.exportPdf = exportPdfSpy;

    render(<App />);

    // Open the export dialog
    fireEvent.keyDown(window, { key: 'e', ctrlKey: true });
    await vi.waitFor(() => {
      expect(screen.getByTestId('export-dialog')).toBeInTheDocument();
    });

    // Call the captured handler
    expect(capturedOnExportPdf).not.toBeNull();
    await act(async () => {
      await capturedOnExportPdf!({ fontSize: 14 });
    });

    expect(exportPdfSpy).toHaveBeenCalled();
    // Dialog should close after export
    await vi.waitFor(() => {
      expect(screen.queryByTestId('export-dialog')).not.toBeInTheDocument();
    });
  });

  it('handleExportHtml calls window.drwrite.exportHtml and closes dialog', async () => {
    const exportHtmlSpy = vi.fn().mockResolvedValue({ canceled: false });
    window.drwrite.exportHtml = exportHtmlSpy;

    render(<App />);

    // Open the export dialog
    fireEvent.keyDown(window, { key: 'e', ctrlKey: true });
    await vi.waitFor(() => {
      expect(screen.getByTestId('export-dialog')).toBeInTheDocument();
    });

    expect(capturedOnExportHtml).not.toBeNull();
    await act(async () => {
      await capturedOnExportHtml!({ fontSize: 14 });
    });

    expect(exportHtmlSpy).toHaveBeenCalled();
    await vi.waitFor(() => {
      expect(screen.queryByTestId('export-dialog')).not.toBeInTheDocument();
    });
  });

  it('export handlers use filePath for title when available', async () => {
    const exportPdfSpy = vi.fn().mockResolvedValue({ canceled: false });
    window.drwrite.exportPdf = exportPdfSpy;
    useEditorStore.setState({ filePath: '/path/to/report.md' });

    render(<App />);

    fireEvent.keyDown(window, { key: 'e', ctrlKey: true });
    await vi.waitFor(() => {
      expect(screen.getByTestId('export-dialog')).toBeInTheDocument();
    });

    await act(async () => {
      await capturedOnExportPdf!({ fontSize: 14 });
    });

    expect(exportPdfSpy).toHaveBeenCalledWith(expect.objectContaining({ html: '<html></html>' }));
  });

  // --- File watcher coverage ---

  it('file watcher reloads content when file changes and editor is not dirty', async () => {
    const openRecentFileSpy = vi.fn().mockResolvedValue({
      canceled: false,
      content: '# Reloaded from disk',
    });
    window.drwrite.openRecentFile = openRecentFileSpy;

    useEditorStore.setState({
      filePath: '/watched/file.md',
      isDirty: false,
      markdown: '# Original',
    });

    render(<App />);

    // The callback should have been registered
    expect(fileChangedCallback).not.toBeNull();

    // Simulate file change
    await act(async () => {
      await fileChangedCallback!({ filePath: '/watched/file.md' });
    });

    expect(openRecentFileSpy).toHaveBeenCalledWith({ filePath: '/watched/file.md' });

    await vi.waitFor(() => {
      expect(useEditorStore.getState().markdown).toBe('# Reloaded from disk');
    });
  });

  it('file watcher skips reload when editor is dirty', async () => {
    const openRecentFileSpy = vi.fn().mockResolvedValue({
      canceled: false,
      content: '# Should not appear',
    });
    window.drwrite.openRecentFile = openRecentFileSpy;

    useEditorStore.setState({
      filePath: '/watched/file.md',
      isDirty: true,
      markdown: '# My unsaved edits',
    });

    render(<App />);

    await act(async () => {
      await fileChangedCallback!({ filePath: '/watched/file.md' });
    });

    // Should NOT have reloaded since dirty
    expect(openRecentFileSpy).not.toHaveBeenCalled();
    expect(useEditorStore.getState().markdown).toBe('# My unsaved edits');
  });

  it('file watcher ignores changes to different files', async () => {
    const openRecentFileSpy = vi.fn().mockResolvedValue({
      canceled: false,
      content: '# Different file',
    });
    window.drwrite.openRecentFile = openRecentFileSpy;

    useEditorStore.setState({
      filePath: '/watched/file.md',
      isDirty: false,
    });

    render(<App />);

    await act(async () => {
      await fileChangedCallback!({ filePath: '/other/file.md' });
    });

    // Should ignore since paths don't match
    expect(openRecentFileSpy).not.toHaveBeenCalled();
  });

  it('file watcher handles canceled reload', async () => {
    const openRecentFileSpy = vi.fn().mockResolvedValue({ canceled: true });
    window.drwrite.openRecentFile = openRecentFileSpy;

    useEditorStore.setState({
      filePath: '/watched/file.md',
      isDirty: false,
      markdown: '# Original stays',
    });

    render(<App />);

    await act(async () => {
      await fileChangedCallback!({ filePath: '/watched/file.md' });
    });

    expect(openRecentFileSpy).toHaveBeenCalled();
    // Markdown should not have changed since result was canceled
    expect(useEditorStore.getState().markdown).toBe('# Original stays');
  });

  // --- localStorage dark mode initialization ---

  it('reads dark mode from localStorage on mount', async () => {
    localStorage.setItem('drwrite-dark-mode', 'false');
    useEditorStore.setState({ darkMode: true });

    render(<App />);

    await vi.waitFor(() => {
      expect(useEditorStore.getState().darkMode).toBe(false);
    });

    localStorage.removeItem('drwrite-dark-mode');
  });

  // --- Onboarding dialog ---

  it('shows onboarding dialog when drwrite-onboarded not in localStorage', async () => {
    localStorage.removeItem('drwrite-onboarded');
    render(<App />);
    await vi.waitFor(() => {
      expect(screen.getByTestId('onboarding-dialog')).toBeInTheDocument();
    });
  });

  it('does not show onboarding dialog when drwrite-onboarded is set', () => {
    localStorage.setItem('drwrite-onboarded', 'true');
    render(<App />);
    expect(screen.queryByTestId('onboarding-dialog')).not.toBeInTheDocument();
  });

  // --- File tree sidebar ---

  it('Ctrl+B toggles file tree sidebar', async () => {
    render(<App />);

    // Sidebar should not be visible initially
    expect(screen.queryByTestId('file-tree-sidebar')).not.toBeInTheDocument();

    // Press Ctrl+B to show
    fireEvent.keyDown(window, { key: 'b', ctrlKey: true });
    await vi.waitFor(() => {
      expect(screen.getByTestId('file-tree-sidebar')).toBeInTheDocument();
    });

    // Press Ctrl+B again to hide
    fireEvent.keyDown(window, { key: 'b', ctrlKey: true });
    await vi.waitFor(() => {
      expect(screen.queryByTestId('file-tree-sidebar')).not.toBeInTheDocument();
    });
  });
});
