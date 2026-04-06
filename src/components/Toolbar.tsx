import { useEditorStore } from '../store/editor-store';

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
        active
          ? 'bg-blue-500 text-white'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1" />;
}

export function Toolbar() {
  const darkMode = useEditorStore((s) => s.darkMode);
  const openFile = useEditorStore((s) => s.openFile);
  const saveFile = useEditorStore((s) => s.saveFile);
  const filePath = useEditorStore((s) => s.filePath);
  const isDirty = useEditorStore((s) => s.isDirty);

  const fileName = filePath ? filePath.split(/[/\\]/).pop() : 'Untitled';
  const title = `${isDirty ? '● ' : ''}${fileName}`;

  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 select-none">
      {/* File info */}
      <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 mr-2">
        {title}
      </span>

      <ToolbarDivider />

      {/* File operations */}
      <ToolbarButton label="Open" title="Open File (Ctrl+O)" onClick={openFile} />
      <ToolbarButton label="Save" title="Save (Ctrl+S)" onClick={saveFile} />

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
