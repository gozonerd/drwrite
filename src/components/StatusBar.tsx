import { useEffect, useState } from 'react';
import { useEditorStore } from '../store/editor-store';

interface GitInfo {
  branch: string;
  isFileDirty: boolean;
}

export function StatusBar() {
  const isDirty = useEditorStore((s) => s.isDirty);
  const filePath = useEditorStore((s) => s.filePath);
  const markdown = useEditorStore((s) => s.markdown);
  const [gitInfo, setGitInfo] = useState<GitInfo | null>(null);

  const lineCount = markdown.split('\n').length;
  const fileName = filePath ? filePath.split(/[/\\]/).pop() : 'Untitled';

  // Fetch git status when file path changes
  useEffect(() => {
    if (!filePath) {
      setGitInfo(null);
      return;
    }

    let cancelled = false;

    async function fetchGitStatus() {
      try {
        const result = await window.drwrite.getGitStatus({ filePath: filePath as string });
        if (!cancelled && result.isRepo) {
          setGitInfo({
            branch: result.branch ?? 'unknown',
            isFileDirty: result.isFileDirty ?? false,
          });
        } else if (!cancelled) {
          setGitInfo(null);
        }
      } catch {
        if (!cancelled) setGitInfo(null);
      }
    }

    fetchGitStatus();
    return () => { cancelled = true; };
  }, [filePath]);

  return (
    <div className="flex items-center justify-between px-3 py-1 text-xs bg-dw-bg-panel text-dw-text-secondary border-t border-dw-border select-none">
      <div className="flex items-center gap-4">
        <span>{lineCount} lines</span>
        <span>Markdown</span>
        {gitInfo && (
          <span className="text-dw-info">
            {gitInfo.branch}
            {gitInfo.isFileDirty && ' *'}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        {isDirty && (
          <span className="text-dw-warning">
            ● Modified
          </span>
        )}
        <span>{fileName}</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
