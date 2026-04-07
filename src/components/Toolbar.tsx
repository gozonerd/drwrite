import { useEffect, useRef, useState } from 'react';
import { useEditorStore } from '../store/editor-store';
import { RecentFilesDropdown } from './RecentFilesDropdown';

interface ToolbarButtonProps {
  label: string;
  title: string;
  onClick: () => void;
  active?: boolean;
}

function ToolbarButton({ label, title, onClick, active }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`px-2 py-0.5 text-sm rounded transition-colors ${
        active ? 'bg-dw-primary text-dw-bg-primary' : 'text-dw-text-secondary hover:bg-dw-bg-card'
      }`}
    >
      {label}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-5 bg-dw-border mx-1" />;
}

interface ToolbarProps {
  onExport?: () => void;
}

export function Toolbar({ onExport }: ToolbarProps) {
  const darkMode = useEditorStore((s) => s.darkMode);
  const openFile = useEditorStore((s) => s.openFile);
  const saveFile = useEditorStore((s) => s.saveFile);
  const filePath = useEditorStore((s) => s.filePath);
  const isDirty = useEditorStore((s) => s.isDirty);
  const [showRecent, setShowRecent] = useState(false);
  const recentRef = useRef<HTMLDivElement>(null);

  const fileName = filePath ? filePath.split(/[/\\]/).pop() : 'Untitled';
  const title = `${isDirty ? '● ' : ''}${fileName}`;

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!showRecent) return;

    function handleClickOutside(e: MouseEvent) {
      if (recentRef.current && !recentRef.current.contains(e.target as Node)) {
        setShowRecent(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showRecent]);

  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-dw-bg-panel border-b border-dw-border select-none">
      {/* File info */}
      <span className="text-sm font-semibold text-dw-text-secondary mr-2">{title}</span>

      <ToolbarDivider />

      {/* File operations */}
      <div className="relative flex items-center" ref={recentRef}>
        <ToolbarButton label="Open" title="Open File (Ctrl+O)" onClick={openFile} />
        <button
          type="button"
          className="px-1 py-0.5 text-xs text-dw-text-secondary hover:bg-dw-bg-card rounded transition-colors"
          title="Recent files"
          onClick={() => setShowRecent((prev) => !prev)}
          data-testid="recent-files-toggle"
        >
          ▾
        </button>
        {showRecent && <RecentFilesDropdown onClose={() => setShowRecent(false)} />}
      </div>
      <ToolbarButton label="Save" title="Save (Ctrl+S)" onClick={saveFile} />
      {onExport && <ToolbarButton label="Export" title="Export PDF/HTML (Ctrl+E)" onClick={onExport} />}

      <ToolbarDivider />

      {/* Dark mode toggle */}
      <ToolbarButton
        label={darkMode ? 'Light' : 'Dark'}
        title="Toggle dark mode"
        onClick={() => useEditorStore.getState().setDarkMode(!darkMode)}
        active={darkMode}
      />
    </div>
  );
}
