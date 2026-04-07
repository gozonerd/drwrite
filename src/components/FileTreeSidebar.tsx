import { useCallback, useEffect, useState } from 'react';

interface DirEntry {
  name: string;
  isDirectory: boolean;
  path: string;
}

interface FileTreeSidebarProps {
  rootDir: string | null;
  onOpenFile: (filePath: string) => void;
  visible: boolean;
}

interface FolderNodeProps {
  entry: DirEntry;
  onOpenFile: (filePath: string) => void;
}

function FolderNode({ entry, onOpenFile }: FolderNodeProps) {
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState<DirEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  async function toggle() {
    if (!expanded && !loaded) {
      const result = await window.drwrite.readDirectory({ dirPath: entry.path });
      setChildren(result.entries);
      setLoaded(true);
    }
    setExpanded((prev) => !prev);
  }

  return (
    <div>
      <button
        type="button"
        className="flex items-center gap-1 w-full text-left px-2 py-0.5 text-sm hover:bg-dw-bg-card rounded transition-colors truncate"
        style={{ color: 'var(--dw-text-primary)' }}
        onClick={toggle}
        data-testid="folder-node"
      >
        <span className="flex-shrink-0">{expanded ? '📂' : '📁'}</span>
        <span className="truncate">{entry.name}</span>
      </button>
      {expanded && (
        <div className="pl-3" data-testid="folder-children">
          {children.map((child) =>
            child.isDirectory ? (
              <FolderNode key={child.path} entry={child} onOpenFile={onOpenFile} />
            ) : (
              <FileNode key={child.path} entry={child} onOpenFile={onOpenFile} />
            ),
          )}
          {children.length === 0 && (
            <div className="text-xs px-2 py-0.5" style={{ color: 'var(--dw-text-muted)' }}>
              Empty folder
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface FileNodeProps {
  entry: DirEntry;
  onOpenFile: (filePath: string) => void;
}

function FileNode({ entry, onOpenFile }: FileNodeProps) {
  const isMd = /\.(md|markdown|mdx|txt)$/i.test(entry.name);

  return (
    <button
      type="button"
      className={`flex items-center gap-1 w-full text-left px-2 py-0.5 text-sm rounded transition-colors truncate ${
        isMd ? 'hover:bg-dw-bg-card cursor-pointer' : 'opacity-60 cursor-default'
      }`}
      style={{ color: 'var(--dw-text-secondary)' }}
      onClick={() => isMd && onOpenFile(entry.path)}
      data-testid="file-node"
    >
      <span className="flex-shrink-0">📄</span>
      <span className="truncate">{entry.name}</span>
    </button>
  );
}

export function FileTreeSidebar({ rootDir, onOpenFile, visible }: FileTreeSidebarProps) {
  const [entries, setEntries] = useState<DirEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDir = useCallback(async (dir: string) => {
    setLoading(true);
    try {
      const result = await window.drwrite.readDirectory({ dirPath: dir });
      setEntries(result.entries);
    } catch {
      setEntries([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (visible && rootDir) {
      loadDir(rootDir);
    }
  }, [visible, rootDir, loadDir]);

  if (!visible) return null;

  return (
    <div
      className="flex flex-col border-r overflow-y-auto flex-shrink-0"
      style={{
        width: '220px',
        background: 'var(--dw-bg-panel)',
        borderColor: 'var(--dw-border)',
      }}
      data-testid="file-tree-sidebar"
    >
      {/* Header */}
      <div
        className="px-2 py-1 text-xs font-semibold uppercase tracking-wider border-b"
        style={{
          color: 'var(--dw-text-muted)',
          borderColor: 'var(--dw-border)',
        }}
      >
        Explorer
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto py-1">
        {loading && (
          <div className="px-2 py-1 text-xs" style={{ color: 'var(--dw-text-muted)' }}>
            Loading...
          </div>
        )}

        {!loading && entries.length === 0 && (
          <div
            className="px-2 py-2 text-xs text-center"
            style={{ color: 'var(--dw-text-muted)' }}
            data-testid="file-tree-empty"
          >
            No files to display
          </div>
        )}

        {!loading &&
          entries.map((entry) =>
            entry.isDirectory ? (
              <FolderNode key={entry.path} entry={entry} onOpenFile={onOpenFile} />
            ) : (
              <FileNode key={entry.path} entry={entry} onOpenFile={onOpenFile} />
            ),
          )}
      </div>
    </div>
  );
}
