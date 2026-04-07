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
      const firstId = useTabStore.getState().addTab('/path/file.md', 'file.md');
      const secondId = useTabStore.getState().addTab('/path/file.md', 'file.md');
      expect(firstId).toBe(secondId);
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
      useTabStore.getState().addTab(null, 'Tab 1');
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

  describe('reorderTab', () => {
    it('moves tab from index 0 to index 2', () => {
      const id1 = useTabStore.getState().addTab(null, 'Tab 1');
      const id2 = useTabStore.getState().addTab(null, 'Tab 2');
      const id3 = useTabStore.getState().addTab(null, 'Tab 3');

      useTabStore.getState().reorderTab(id1, 2);

      const titles = useTabStore.getState().tabs.map((t) => t.title);
      expect(titles).toEqual(['Tab 2', 'Tab 3', 'Tab 1']);
      // Verify IDs match
      const ids = useTabStore.getState().tabs.map((t) => t.id);
      expect(ids).toEqual([id2, id3, id1]);
    });

    it('moves tab from index 2 to index 0', () => {
      const id1 = useTabStore.getState().addTab(null, 'Tab 1');
      const id2 = useTabStore.getState().addTab(null, 'Tab 2');
      const id3 = useTabStore.getState().addTab(null, 'Tab 3');

      useTabStore.getState().reorderTab(id3, 0);

      const titles = useTabStore.getState().tabs.map((t) => t.title);
      expect(titles).toEqual(['Tab 3', 'Tab 1', 'Tab 2']);
      const ids = useTabStore.getState().tabs.map((t) => t.id);
      expect(ids).toEqual([id3, id1, id2]);
    });

    it('does nothing when moving to same position', () => {
      const id1 = useTabStore.getState().addTab(null, 'Tab 1');
      useTabStore.getState().addTab(null, 'Tab 2');
      useTabStore.getState().addTab(null, 'Tab 3');

      const tabsBefore = [...useTabStore.getState().tabs];
      useTabStore.getState().reorderTab(id1, 0);

      const tabsAfter = useTabStore.getState().tabs;
      expect(tabsAfter.map((t) => t.id)).toEqual(tabsBefore.map((t) => t.id));
    });

    it('clamps invalid index to valid range', () => {
      const id1 = useTabStore.getState().addTab(null, 'Tab 1');
      const id2 = useTabStore.getState().addTab(null, 'Tab 2');
      const id3 = useTabStore.getState().addTab(null, 'Tab 3');

      // Try to move to index 99 — should clamp to last position (2)
      useTabStore.getState().reorderTab(id1, 99);

      const titles = useTabStore.getState().tabs.map((t) => t.title);
      expect(titles).toEqual(['Tab 2', 'Tab 3', 'Tab 1']);

      // Try to move to index -5 — should clamp to 0
      useTabStore.getState().reorderTab(id1, -5);
      const titles2 = useTabStore.getState().tabs.map((t) => t.title);
      expect(titles2).toEqual(['Tab 1', 'Tab 2', 'Tab 3']);
    });

    it('does nothing for nonexistent tab id', () => {
      useTabStore.getState().addTab(null, 'Tab 1');
      useTabStore.getState().addTab(null, 'Tab 2');

      const tabsBefore = [...useTabStore.getState().tabs];
      useTabStore.getState().reorderTab('nonexistent', 0);

      const tabsAfter = useTabStore.getState().tabs;
      expect(tabsAfter.map((t) => t.id)).toEqual(tabsBefore.map((t) => t.id));
    });
  });
});
