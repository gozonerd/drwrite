import { useEditorStore } from '../store/editor-store';

export function StatusBar() {
  const isDirty = useEditorStore((s) => s.isDirty);
  const filePath = useEditorStore((s) => s.filePath);
  const markdown = useEditorStore((s) => s.markdown);

  const lineCount = markdown.split('\n').length;
  const fileName = filePath ? filePath.split(/[/\\]/).pop() : 'Untitled';

  return (
    <div className="flex items-center justify-between px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 select-none">
      <div className="flex items-center gap-4">
        <span>{lineCount} lines</span>
        <span>Markdown</span>
      </div>
      <div className="flex items-center gap-4">
        {isDirty && (
          <span className="text-yellow-600 dark:text-yellow-400">
            ● Modified
          </span>
        )}
        <span>{fileName}</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
