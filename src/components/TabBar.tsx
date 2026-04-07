import { useTabStore } from '../store/tab-store';

export function TabBar() {
  const tabs = useTabStore((s) => s.tabs);
  const activeTabId = useTabStore((s) => s.activeTabId);
  const setActiveTab = useTabStore((s) => s.setActiveTab);
  const removeTab = useTabStore((s) => s.removeTab);
  const addTab = useTabStore((s) => s.addTab);

  if (tabs.length === 0) return null;

  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-850 border-b border-gray-200 dark:border-gray-700 overflow-x-auto select-none"
         style={{ minHeight: '32px' }}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`flex items-center gap-1 px-3 py-1 text-xs cursor-pointer border-r border-gray-200 dark:border-gray-700 whitespace-nowrap ${
            tab.id === activeTabId
              ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
              : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-750'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span>
            {tab.isDirty && '● '}
            {tab.title}
          </span>
          <button
            type="button"
            className="ml-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xs leading-none"
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
        className="px-2 py-1 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        onClick={() => addTab()}
        title="New tab"
      >
        +
      </button>
    </div>
  );
}
