import { useEffect } from 'react';
import { useEditorStore } from './store/editor-store';
import { SplitView } from './components/SplitView';
import { StatusBar } from './components/StatusBar';

export function App() {
  const darkMode = useEditorStore((s) => s.darkMode);
  const filePath = useEditorStore((s) => s.filePath);
  const isDirty = useEditorStore((s) => s.isDirty);

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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fileName = filePath ? filePath.split(/[/\\]/).pop() : 'Untitled';
  const title = `${isDirty ? '● ' : ''}${fileName} — DrWrite`;

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Toolbar placeholder — Step 7 */}
      <div className="flex items-center px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 select-none">
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          {title}
        </span>
      </div>

      {/* Editor split view */}
      <SplitView />

      {/* Status bar */}
      <StatusBar />
    </div>
  );
}
