import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecentFilesDropdown } from './RecentFilesDropdown';
import { useEditorStore } from '../store/editor-store';

describe('RecentFilesDropdown', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockReset();
    useEditorStore.setState({
      markdown: '# Test',
      filePath: null,
      isDirty: false,
      lastEditedBy: null,
    });
    // Reset to default mock
    window.drwrite.getRecentFiles = vi.fn().mockResolvedValue([]);
    window.drwrite.openRecentFile = vi.fn().mockResolvedValue({ canceled: true });
    window.drwrite.clearRecentFiles = vi.fn().mockResolvedValue({ success: true });
  });

  it('renders file list from getRecentFiles', async () => {
    window.drwrite.getRecentFiles = vi.fn().mockResolvedValue([
      { filePath: '/docs/readme.md', lastOpened: '2026-04-01', openCount: 3 },
      { filePath: '/projects/notes.md', lastOpened: '2026-04-02', openCount: 1 },
    ]);

    render(<RecentFilesDropdown onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByText('readme.md')).toBeInTheDocument();
      expect(screen.getByText('notes.md')).toBeInTheDocument();
    });
  });

  it('shows full path as tooltip on each file item', async () => {
    window.drwrite.getRecentFiles = vi.fn().mockResolvedValue([
      { filePath: '/docs/readme.md', lastOpened: '2026-04-01', openCount: 1 },
    ]);

    render(<RecentFilesDropdown onClose={onClose} />);

    await waitFor(() => {
      const item = screen.getByText('readme.md');
      expect(item.closest('button')).toHaveAttribute('title', '/docs/readme.md');
    });
  });

  it('calls openRecentFile and updates editor when file is clicked', async () => {
    const user = userEvent.setup();
    window.drwrite.getRecentFiles = vi.fn().mockResolvedValue([
      { filePath: '/docs/readme.md', lastOpened: '2026-04-01', openCount: 1 },
    ]);
    window.drwrite.openRecentFile = vi.fn().mockResolvedValue({
      canceled: false,
      filePath: '/docs/readme.md',
      content: '# Readme Content',
    });

    render(<RecentFilesDropdown onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByText('readme.md')).toBeInTheDocument();
    });

    await user.click(screen.getByText('readme.md'));

    expect(window.drwrite.openRecentFile).toHaveBeenCalledWith({ filePath: '/docs/readme.md' });
    expect(useEditorStore.getState().markdown).toBe('# Readme Content');
    expect(useEditorStore.getState().filePath).toBe('/docs/readme.md');
    expect(onClose).toHaveBeenCalled();
  });

  it('shows empty state when no recent files', async () => {
    window.drwrite.getRecentFiles = vi.fn().mockResolvedValue([]);

    render(<RecentFilesDropdown onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByTestId('recent-files-empty')).toBeInTheDocument();
      expect(screen.getByText('No recent files')).toBeInTheDocument();
    });
  });

  it('clear button calls clearRecentFiles and empties the list', async () => {
    const user = userEvent.setup();
    window.drwrite.getRecentFiles = vi.fn().mockResolvedValue([
      { filePath: '/docs/readme.md', lastOpened: '2026-04-01', openCount: 1 },
    ]);

    render(<RecentFilesDropdown onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByText('readme.md')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('clear-recent-files'));

    expect(window.drwrite.clearRecentFiles).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText('No recent files')).toBeInTheDocument();
    });
  });

  it('renders the dropdown container with correct test id', async () => {
    render(<RecentFilesDropdown onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByTestId('recent-files-dropdown')).toBeInTheDocument();
    });
  });

  it('extracts filename from Windows-style paths', async () => {
    window.drwrite.getRecentFiles = vi.fn().mockResolvedValue([
      { filePath: 'C:\\Users\\dev\\doc.md', lastOpened: '2026-04-01', openCount: 1 },
    ]);

    render(<RecentFilesDropdown onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByText('doc.md')).toBeInTheDocument();
    });
  });

  it('does not update editor when openRecentFile is canceled', async () => {
    const user = userEvent.setup();
    window.drwrite.getRecentFiles = vi.fn().mockResolvedValue([
      { filePath: '/docs/readme.md', lastOpened: '2026-04-01', openCount: 1 },
    ]);
    window.drwrite.openRecentFile = vi.fn().mockResolvedValue({ canceled: true });

    useEditorStore.setState({ markdown: '# Original' });

    render(<RecentFilesDropdown onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByText('readme.md')).toBeInTheDocument();
    });

    await user.click(screen.getByText('readme.md'));

    expect(useEditorStore.getState().markdown).toBe('# Original');
    expect(onClose).toHaveBeenCalled();
  });
});
