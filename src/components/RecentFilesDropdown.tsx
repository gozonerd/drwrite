import { useEffect, useState } from 'react';
import { useEditorStore } from '../store/editor-store';

interface RecentFileEntry {
  filePath: string;
  lastOpened: string;
  openCount: number;
}

interface RecentFilesDropdownProps {
  onClose: () => void;
}

export function RecentFilesDropdown({ onClose }: RecentFilesDropdownProps) {
  const [files, setFiles] = useState<RecentFileEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;
    window.drwrite.getRecentFiles().then((entries) => {
      if (!canceled) {
        setFiles(entries);
        setLoading(false);
      }
    });
    return () => {
      canceled = true;
    };
  }, []);

  async function handleFileClick(filePath: string) {
    const result = await window.drwrite.openRecentFile({ filePath });
    if (!result.canceled && result.content !== undefined) {
      useEditorStore.setState({
        markdown: result.content,
        filePath: result.filePath ?? filePath,
        isDirty: false,
        lastEditedBy: 'file',
      });
      if (result.filePath) {
        window.drwrite.watchFile({ filePath: result.filePath });
      }
    }
    onClose();
  }

  async function handleClear() {
    await window.drwrite.clearRecentFiles();
    setFiles([]);
  }

  function extractFilename(fullPath: string): string {
    return fullPath.split(/[/\\]/).pop() ?? fullPath;
  }

  if (loading) {
    return (
      <div
        className="absolute top-full left-0 z-50 mt-0.5 min-w-[240px] rounded border border-dw-border bg-dw-bg-card shadow-lg"
        data-testid="recent-files-dropdown"
      >
        <div className="px-3 py-2 text-xs text-dw-text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="absolute top-full left-0 z-50 mt-0.5 min-w-[240px] max-h-[300px] overflow-y-auto rounded border border-dw-border bg-dw-bg-card shadow-lg"
      data-testid="recent-files-dropdown"
    >
      {files.length === 0 ? (
        <div className="px-3 py-2 text-xs text-dw-text-muted" data-testid="recent-files-empty">
          No recent files
        </div>
      ) : (
        <>
          {files.map((entry) => (
            <button
              key={entry.filePath}
              type="button"
              className="w-full text-left px-3 py-1.5 text-xs text-dw-text-primary hover:bg-dw-bg-panel transition-colors truncate"
              title={entry.filePath}
              onClick={() => handleFileClick(entry.filePath)}
              data-testid="recent-file-item"
            >
              {extractFilename(entry.filePath)}
            </button>
          ))}
          <div className="border-t border-dw-border">
            <button
              type="button"
              className="w-full text-left px-3 py-1.5 text-xs text-dw-error hover:bg-dw-bg-panel transition-colors"
              onClick={handleClear}
              data-testid="clear-recent-files"
            >
              Clear recent files
            </button>
          </div>
        </>
      )}
    </div>
  );
}
