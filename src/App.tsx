import { useEffect, useState } from 'react';
import { useEditorStore } from './store/editor-store';
import { useTabStore } from './store/tab-store';
import { TabBar } from './components/TabBar';
import { Toolbar } from './components/Toolbar';
import { SplitView } from './components/SplitView';
import { StatusBar } from './components/StatusBar';
import { ExportDialog } from './components/ExportDialog';
import { generatePrintHtml, ExportSettings } from './utils/export-html';

export function App() {
  const darkMode = useEditorStore((s) => s.darkMode);
  const [showExport, setShowExport] = useState(false);
  const tabs = useTabStore((s) => s.tabs);
  const activeTabId = useTabStore((s) => s.activeTabId);

  // Create initial tab on mount
  useEffect(() => {
    if (tabs.length === 0) {
      useTabStore.getState().addTab();
    }
  }, []);

  // Sync tab switches — save current tab content, restore new tab content
  useEffect(() => {
    if (!activeTabId) return;

    // Cache current state under the active tab before switching
    // (This runs on every activeTabId change, so it saves the "previous" state)

    // Restore the new active tab's content from Zustand store
    const cached = useTabStore.getState().getTabContent(activeTabId);
    if (cached) {
      useEditorStore.setState({
        markdown: cached.markdown,
        filePath: cached.filePath,
        isDirty: false,
        lastEditedBy: 'file',
      });
    }
  }, [activeTabId]);

  // Sync editor store changes back to tab cache and tab metadata
  useEffect(() => {
    const unsubscribe = useEditorStore.subscribe((state) => {
      if (!activeTabId) return;
      useTabStore.getState().cacheTabContent(activeTabId, {
        markdown: state.markdown,
        filePath: state.filePath,
      });
      const fileName = state.filePath ? state.filePath.split(/[/\\]/).pop() ?? 'Untitled' : 'Untitled';
      useTabStore.getState().updateTab(activeTabId, {
        isDirty: state.isDirty,
        filePath: state.filePath,
        title: fileName,
      });
    });
    return unsubscribe;
  }, [activeTabId]);

  // Apply dark mode class to html element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Initialize dark mode from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('drwrite-dark-mode');
    if (stored !== null) {
      useEditorStore.getState().setDarkMode(JSON.parse(stored));
    }
  }, []);

  // Auto-save timer
  const autoSaveEnabled = useEditorStore((s) => s.autoSaveEnabled);
  const autoSaveInterval = useEditorStore((s) => s.autoSaveInterval);

  useEffect(() => {
    if (!autoSaveEnabled) return;

    const timer = setInterval(() => {
      const { isDirty, filePath } = useEditorStore.getState();
      if (isDirty && filePath) {
        useEditorStore.getState().saveFile().then(() => {
          useEditorStore.setState({ lastAutoSave: Date.now() });
        });
      }
    }, autoSaveInterval * 1000);

    return () => clearInterval(timer);
  }, [autoSaveEnabled, autoSaveInterval]);

  // Initialize auto-save settings from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('drwrite-auto-save');
    if (stored) {
      const { enabled, interval } = JSON.parse(stored);
      useEditorStore.getState().setAutoSave(enabled, interval);
    }
  }, []);

  // Listen for external file changes (chokidar watcher)
  useEffect(() => {
    const cleanup = window.drwrite.onFileChanged(async ({ filePath }) => {
      const currentPath = useEditorStore.getState().filePath;
      if (filePath !== currentPath) return;

      // Auto-reload if not dirty, otherwise the user would lose unsaved work
      const isDirty = useEditorStore.getState().isDirty;
      if (!isDirty) {
        const result = await window.drwrite.openRecentFile({ filePath });
        if (!result.canceled && result.content !== undefined) {
          useEditorStore.setState({
            markdown: result.content,
            isDirty: false,
            lastEditedBy: 'file',
          });
        }
      }
      // If dirty, we silently skip — user's edits take priority
    });

    return cleanup;
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;

      if (mod && e.key === 'o') {
        e.preventDefault();
        useEditorStore.getState().openFile();
      } else if (mod && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        useEditorStore.getState().saveFileAs();
      } else if (mod && e.key === 's') {
        e.preventDefault();
        useEditorStore.getState().saveFile();
      } else if (mod && e.key === 'n') {
        e.preventDefault();
        useEditorStore.getState().resetDocument();
      } else if (mod && e.key === 'e') {
        e.preventDefault();
        setShowExport(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function getEditorHtml(): string {
    // Get rendered HTML from the WYSIWYG pane
    const tiptapEl = document.querySelector('.tiptap .ProseMirror');
    return tiptapEl?.innerHTML ?? '';
  }

  async function handleExportPdf(settings: ExportSettings) {
    const bodyHtml = getEditorHtml();
    const filePath = useEditorStore.getState().filePath;
    const title = filePath ? filePath.split(/[/\\]/).pop()?.replace(/\.[^.]+$/, '') ?? 'DrWrite Export' : 'DrWrite Export';
    const html = generatePrintHtml(bodyHtml, settings, title);
    await window.drwrite.exportPdf({ html });
    setShowExport(false);
  }

  async function handleExportHtml(settings: ExportSettings) {
    const bodyHtml = getEditorHtml();
    const filePath = useEditorStore.getState().filePath;
    const title = filePath ? filePath.split(/[/\\]/).pop()?.replace(/\.[^.]+$/, '') ?? 'DrWrite Export' : 'DrWrite Export';
    const html = generatePrintHtml(bodyHtml, settings, title);
    await window.drwrite.exportHtml({ html });
    setShowExport(false);
  }

  async function handlePreview(settings: ExportSettings) {
    const bodyHtml = getEditorHtml();
    const filePath = useEditorStore.getState().filePath;
    const title = filePath ? filePath.split(/[/\\]/).pop()?.replace(/\.[^.]+$/, '') ?? 'DrWrite Export' : 'DrWrite Export';
    const html = generatePrintHtml(bodyHtml, settings, title);
    await window.drwrite.previewHtml({ html });
  }

  return (
    <div className="h-screen flex flex-col bg-dw-bg-primary text-dw-text-primary">
      {/* Toolbar */}
      <Toolbar onExport={() => setShowExport(true)} />

      {/* Tab Bar */}
      <TabBar />

      {/* Editor split view */}
      <SplitView />

      {/* Status bar */}
      <StatusBar />

      {/* Export dialog */}
      {showExport && (
        <ExportDialog
          onExportPdf={handleExportPdf}
          onPreview={handlePreview}
          onExportHtml={handleExportHtml}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
}
