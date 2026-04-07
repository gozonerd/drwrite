import { useTabStore } from '../store/tab-store';

export function TabBar() {
  const tabs = useTabStore((s) => s.tabs);
  const activeTabId = useTabStore((s) => s.activeTabId);
  const setActiveTab = useTabStore((s) => s.setActiveTab);
  const removeTab = useTabStore((s) => s.removeTab);
  const addTab = useTabStore((s) => s.addTab);
  const reorderTab = useTabStore((s) => s.reorderTab);

  if (tabs.length === 0) return null;

  function handleDragStart(e: React.DragEvent<HTMLDivElement>, tabId: string) {
    e.dataTransfer.setData('text/plain', tabId);
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>, targetIndex: number) {
    e.preventDefault();
    const draggedTabId = e.dataTransfer.getData('text/plain');
    if (draggedTabId) {
      reorderTab(draggedTabId, targetIndex);
    }
  }

  return (
    <div className="flex items-center bg-dw-bg-primary border-b border-dw-border overflow-x-auto select-none"
         style={{ minHeight: '32px' }}>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, tab.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          className={`flex items-center gap-1 px-3 py-1 text-xs cursor-pointer border-r border-dw-border whitespace-nowrap ${
            tab.id === activeTabId
              ? 'bg-dw-bg-card text-dw-text-primary'
              : 'bg-transparent text-dw-text-secondary hover:bg-dw-bg-panel'
          }`}
          onClick={() => setActiveTab(tab.id)}
          data-testid="tab-item"
        >
          <span>
            {tab.isDirty && '● '}
            {tab.title}
          </span>
          <button
            type="button"
            className="ml-1 text-dw-text-muted hover:text-dw-error text-xs leading-none"
            onClick={(e) => {
              e.stopPropagation();
              removeTab(tab.id);
            }}
            title="Close tab"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        className="px-2 py-1 text-xs text-dw-text-muted hover:text-dw-primary"
        onClick={() => addTab()}
        title="New tab"
      >
        +
      </button>
    </div>
  );
}
