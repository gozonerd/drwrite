import { useTabStore } from '../store/tab-store';

export function TabBar() {
  const tabs = useTabStore((s) => s.tabs);
  const activeTabId = useTabStore((s) => s.activeTabId);
  const setActiveTab = useTabStore((s) => s.setActiveTab);
  const removeTab = useTabStore((s) => s.removeTab);
  const addTab = useTabStore((s) => s.addTab);

  if (tabs.length === 0) return null;

  return (
    <div className="flex items-center bg-dw-bg-primary border-b border-dw-border overflow-x-auto select-none"
         style={{ minHeight: '32px' }}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`flex items-center gap-1 px-3 py-1 text-xs cursor-pointer border-r border-dw-border whitespace-nowrap ${
            tab.id === activeTabId
              ? 'bg-dw-bg-card text-dw-text-primary'
              : 'bg-transparent text-dw-text-secondary hover:bg-dw-bg-panel'
          }`}
          onClick={() => setActiveTab(tab.id)}
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
