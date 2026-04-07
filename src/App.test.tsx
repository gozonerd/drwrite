import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useEditorStore } from './store/editor-store';
import { useTabStore } from './store/tab-store';

vi.mock('./components/Toolbar', () => ({ Toolbar: ({ onExport }: any) => <div data-testid="toolbar" onClick={onExport}>Toolbar</div> }));
vi.mock('./components/TabBar', () => ({ TabBar: () => <div data-testid="tabbar">TabBar</div> }));
vi.mock('./components/SplitView', () => ({ SplitView: () => <div data-testid="splitview">SplitView</div> }));
vi.mock('./components/StatusBar', () => ({ StatusBar: () => <div data-testid="statusbar">StatusBar</div> }));
vi.mock('./components/ExportDialog', () => ({ ExportDialog: ({ onClose }: any) => <div data-testid="export-dialog"><button onClick={onClose}>Close</button></div> }));

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
  beforeEach(() => {
    useEditorStore.setState({
      darkMode: true,
      filePath: null,
      isDirty: false,
      markdown: '# Test',
      lastEditedBy: null,
      activeEditor: null,
      splitRatio: 0.5,
    });
    useTabStore.setState({ tabs: [], activeTabId: null });
    document.documentElement.classList.remove('dark');
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
});
