import { useEffect, useState } from 'react';
import { useEditorStore } from './store/editor-store';
import { Toolbar } from './components/Toolbar';
import { SplitView } from './components/SplitView';
import { StatusBar } from './components/StatusBar';
import { ExportDialog } from './components/ExportDialog';
import { generatePrintHtml, ExportSettings } from './utils/export-html';

export function App() {
  const darkMode = useEditorStore((s) => s.darkMode);
  const [showExport, setShowExport] = useState(false);

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

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Toolbar */}
      <Toolbar onExport={() => setShowExport(true)} />

      {/* Editor split view */}
      <SplitView />

      {/* Status bar */}
      <StatusBar />

      {/* Export dialog */}
      {showExport && (
        <ExportDialog
          onExportPdf={handleExportPdf}
          onExportHtml={handleExportHtml}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
}
