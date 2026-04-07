import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabBar } from './TabBar';
import { useTabStore } from '../store/tab-store';

describe('TabBar', () => {
  beforeEach(() => {
    useTabStore.setState({ tabs: [], activeTabId: null });
  });

  it('returns null when no tabs exist', () => {
    const { container } = render(<TabBar />);
    expect(container.innerHTML).toBe('');
  });

  it('renders tab titles', () => {
    useTabStore.getState().addTab(null, 'Document 1');
    useTabStore.getState().addTab(null, 'Document 2');
    render(<TabBar />);
    expect(screen.getByText('Document 1')).toBeInTheDocument();
    expect(screen.getByText('Document 2')).toBeInTheDocument();
  });

  it('shows dirty indicator on modified tabs', () => {
    const id = useTabStore.getState().addTab(null, 'Draft');
    useTabStore.getState().updateTab(id, { isDirty: true });
    render(<TabBar />);
    expect(screen.getByText('● Draft')).toBeInTheDocument();
  });

  it('renders + button for new tab', () => {
    useTabStore.getState().addTab();
    render(<TabBar />);
    expect(screen.getByTitle('New tab')).toBeInTheDocument();
  });

  it('clicking + creates a new tab', async () => {
    const user = userEvent.setup();
    useTabStore.getState().addTab(null, 'Existing');
    render(<TabBar />);

    await user.click(screen.getByTitle('New tab'));
    expect(useTabStore.getState().tabs).toHaveLength(2);
  });

  it('clicking a tab switches to it', async () => {
    const user = userEvent.setup();
    const id1 = useTabStore.getState().addTab(null, 'Tab A');
    useTabStore.getState().addTab(null, 'Tab B');

    render(<TabBar />);
    await user.click(screen.getByText('Tab A'));
    expect(useTabStore.getState().activeTabId).toBe(id1);
  });

  it('clicking close button removes the tab', async () => {
    const user = userEvent.setup();
    useTabStore.getState().addTab(null, 'To Close');
    render(<TabBar />);

    const closeButtons = screen.getAllByTitle('Close tab');
    await user.click(closeButtons[0]);
    expect(useTabStore.getState().tabs).toHaveLength(0);
  });

  it('renders close button for each tab', () => {
    useTabStore.getState().addTab(null, 'Tab 1');
    useTabStore.getState().addTab(null, 'Tab 2');
    useTabStore.getState().addTab(null, 'Tab 3');
    render(<TabBar />);
    expect(screen.getAllByTitle('Close tab')).toHaveLength(3);
  });

  it('tabs have draggable attribute set to true', () => {
    useTabStore.getState().addTab(null, 'Tab 1');
    useTabStore.getState().addTab(null, 'Tab 2');
    render(<TabBar />);
    const tabItems = screen.getAllByTestId('tab-item');
    expect(tabItems).toHaveLength(2);
    tabItems.forEach((item) => {
      expect(item).toHaveAttribute('draggable', 'true');
    });
  });
});
