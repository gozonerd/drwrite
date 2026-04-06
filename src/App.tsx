import { useEffect } from 'react';
import { useEditorStore } from './store/editor-store';
import { Toolbar } from './components/Toolbar';
import { SplitView } from './components/SplitView';
import { StatusBar } from './components/StatusBar';

export function App() {
  const darkMode = useEditorStore((s) => s.darkMode);

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

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Toolbar */}
      <Toolbar />

      {/* Editor split view */}
      <SplitView />

      {/* Status bar */}
      <StatusBar />
    </div>
  );
}
