import { describe, it, expect, beforeEach } from 'vitest';
import { useTabStore } from './tab-store';

describe('tab-store', () => {
  beforeEach(() => {
    useTabStore.setState({ tabs: [], activeTabId: null });
  });

  describe('addTab', () => {
    it('creates a new tab with default title', () => {
      const id = useTabStore.getState().addTab();
      const { tabs, activeTabId } = useTabStore.getState();
      expect(tabs).toHaveLength(1);
      expect(tabs[0].title).toBe('Untitled');
      expect(tabs[0].filePath).toBeNull();
      expect(tabs[0].isDirty).toBe(false);
      expect(activeTabId).toBe(id);
    });

    it('creates a tab with custom title and path', () => {
      const id = useTabStore.getState().addTab('/path/to/file.md', 'file.md');
      const tab = useTabStore.getState().tabs[0];
      expect(tab.filePath).toBe('/path/to/file.md');
      expect(tab.title).toBe('file.md');
      expect(tab.id).toBe(id);
    });

    it('sets new tab as active', () => {
      useTabStore.getState().addTab();
      const id2 = useTabStore.getState().addTab();
      expect(useTabStore.getState().activeTabId).toBe(id2);
    });

    it('reuses existing tab if same file path is already open', () => {
      const id1 = useTabStore.getState().addTab('/path/file.md', 'file.md');
      const id2 = useTabStore.getState().addTab('/path/file.md', 'file.md');
      expect(id1).toBe(id2);
      expect(useTabStore.getState().tabs).toHaveLength(1);
    });

    it('does not deduplicate null file paths', () => {
      useTabStore.getState().addTab();
      useTabStore.getState().addTab();
      expect(useTabStore.getState().tabs).toHaveLength(2);
    });
  });

  describe('removeTab', () => {
    it('removes a tab by id', () => {
      const id = useTabStore.getState().addTab();
      useTabStore.getState().removeTab(id);
      expect(useTabStore.getState().tabs).toHaveLength(0);
      expect(useTabStore.getState().activeTabId).toBeNull();
    });

    it('activates adjacent tab when closing active tab', () => {
      const id1 = useTabStore.getState().addTab(null, 'Tab 1');
      const id2 = useTabStore.getState().addTab(null, 'Tab 2');
      useTabStore.getState().addTab(null, 'Tab 3');

      // Active is Tab 3, close it → Tab 2 becomes active
      useTabStore.getState().setActiveTab(id2);
      useTabStore.getState().removeTab(id2);
      // Should activate the tab at the same index (Tab 3) or previous (Tab 1)
      expect(useTabStore.getState().activeTabId).not.toBe(id2);
      expect(useTabStore.getState().tabs).toHaveLength(2);
    });

    it('activates last tab when closing the rightmost tab', () => {
      useTabStore.getState().addTab(null, 'Tab 1');
      useTabStore.getState().addTab(null, 'Tab 2');
      const id3 = useTabStore.getState().addTab(null, 'Tab 3');

      // Active is Tab 3 (last), close it → Tab 2 becomes active
      useTabStore.getState().removeTab(id3);
      const { tabs, activeTabId } = useTabStore.getState();
      expect(tabs).toHaveLength(2);
      expect(activeTabId).toBe(tabs[tabs.length - 1].id);
    });

    it('does nothing for nonexistent id', () => {
      useTabStore.getState().addTab();
      useTabStore.getState().removeTab('nonexistent');
      expect(useTabStore.getState().tabs).toHaveLength(1);
    });
  });

  describe('setActiveTab', () => {
    it('switches active tab', () => {
      const id1 = useTabStore.getState().addTab(null, 'Tab 1');
      useTabStore.getState().addTab(null, 'Tab 2');
      useTabStore.getState().setActiveTab(id1);
      expect(useTabStore.getState().activeTabId).toBe(id1);
    });
  });

  describe('updateTab', () => {
    it('updates tab properties', () => {
      const id = useTabStore.getState().addTab();
      useTabStore.getState().updateTab(id, { title: 'Updated', isDirty: true });
      const tab = useTabStore.getState().tabs[0];
      expect(tab.title).toBe('Updated');
      expect(tab.isDirty).toBe(true);
    });

    it('only updates specified properties', () => {
      const id = useTabStore.getState().addTab('/path/file.md', 'file.md');
      useTabStore.getState().updateTab(id, { isDirty: true });
      const tab = useTabStore.getState().tabs[0];
      expect(tab.isDirty).toBe(true);
      expect(tab.title).toBe('file.md');
      expect(tab.filePath).toBe('/path/file.md');
    });
  });

  describe('getActiveTab', () => {
    it('returns the active tab', () => {
      useTabStore.getState().addTab(null, 'Tab 1');
      const id2 = useTabStore.getState().addTab(null, 'Tab 2');
      const active = useTabStore.getState().getActiveTab();
      expect(active?.id).toBe(id2);
      expect(active?.title).toBe('Tab 2');
    });

    it('returns undefined when no tabs exist', () => {
      expect(useTabStore.getState().getActiveTab()).toBeUndefined();
    });
  });
});
