import { create } from 'zustand';

export interface TabContent {
  markdown: string;
  filePath: string | null;
}

export interface Tab {
  id: string;
  filePath: string | null;
  title: string;
  isDirty: boolean;
}

interface TabState {
  tabs: Tab[];
  activeTabId: string | null;
  tabContentCache: Record<string, TabContent>;

  // Actions
  addTab: (filePath?: string | null, title?: string) => string;
  removeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  updateTab: (tabId: string, updates: Partial<Tab>) => void;
  getActiveTab: () => Tab | undefined;
  cacheTabContent: (tabId: string, content: TabContent) => void;
  getTabContent: (tabId: string) => TabContent | undefined;
  reorderTab: (tabId: string, newIndex: number) => void;
}

let tabCounter = 0;

function generateTabId(): string {
  return `tab-${Date.now()}-${tabCounter++}`;
}

export const useTabStore = create<TabState>((set, get) => ({
  tabs: [],
  activeTabId: null,
  tabContentCache: {},

  addTab: (filePath = null, title = 'Untitled') => {
    const id = generateTabId();

    // Check if file is already open in a tab
    if (filePath) {
      const existing = get().tabs.find((t) => t.filePath === filePath);
      if (existing) {
        set({ activeTabId: existing.id });
        return existing.id;
      }
    }

    const newTab: Tab = { id, filePath, title, isDirty: false };
    set((state) => ({
      tabs: [...state.tabs, newTab],
      activeTabId: id,
    }));
    return id;
  },

  removeTab: (tabId) => {
    const { tabs, activeTabId } = get();
    const index = tabs.findIndex((t) => t.id === tabId);
    if (index === -1) return;

    const newTabs = tabs.filter((t) => t.id !== tabId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [tabId]: _removed, ...remainingCache } = get().tabContentCache;

    // If we're closing the active tab, activate an adjacent one
    let newActiveId = activeTabId;
    if (activeTabId === tabId) {
      if (newTabs.length === 0) {
        newActiveId = null;
      } else if (index >= newTabs.length) {
        newActiveId = newTabs[newTabs.length - 1].id;
      } else {
        newActiveId = newTabs[index].id;
      }
    }

    set({ tabs: newTabs, activeTabId: newActiveId, tabContentCache: remainingCache });
  },

  setActiveTab: (tabId) => {
    set({ activeTabId: tabId });
  },

  updateTab: (tabId, updates) => {
    set((state) => ({
      tabs: state.tabs.map((t) => (t.id === tabId ? { ...t, ...updates } : t)),
    }));
  },

  getActiveTab: () => {
    const { tabs, activeTabId } = get();
    return tabs.find((t) => t.id === activeTabId);
  },

  cacheTabContent: (tabId, content) => {
    set((state) => ({
      tabContentCache: { ...state.tabContentCache, [tabId]: content },
    }));
  },

  getTabContent: (tabId) => {
    return get().tabContentCache[tabId];
  },

  reorderTab: (tabId, newIndex) => {
    const { tabs } = get();
    const currentIndex = tabs.findIndex((t) => t.id === tabId);
    if (currentIndex === -1) return;

    // Clamp newIndex to valid range
    const clampedIndex = Math.max(0, Math.min(tabs.length - 1, newIndex));
    if (currentIndex === clampedIndex) return;

    const newTabs = [...tabs];
    const [moved] = newTabs.splice(currentIndex, 1);
    newTabs.splice(clampedIndex, 0, moved);
    set({ tabs: newTabs });
  },
}));
