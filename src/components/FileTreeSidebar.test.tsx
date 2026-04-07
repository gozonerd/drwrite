import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileTreeSidebar } from './FileTreeSidebar';

describe('FileTreeSidebar', () => {
  const onOpenFile = vi.fn();

  beforeEach(() => {
    onOpenFile.mockReset();
    // Reset the readDirectory mock to default
    window.drwrite.readDirectory = vi.fn().mockResolvedValue({ entries: [] });
  });

  it('renders nothing when visible is false', () => {
    render(<FileTreeSidebar rootDir="/test" onOpenFile={onOpenFile} visible={false} />);
    expect(screen.queryByTestId('file-tree-sidebar')).not.toBeInTheDocument();
  });

  it('renders sidebar with Explorer header when visible', async () => {
    render(<FileTreeSidebar rootDir="/test" onOpenFile={onOpenFile} visible={true} />);
    await vi.waitFor(() => {
      expect(screen.getByTestId('file-tree-sidebar')).toBeInTheDocument();
      expect(screen.getByText('Explorer')).toBeInTheDocument();
    });
  });

  it('renders file entries returned by readDirectory', async () => {
    window.drwrite.readDirectory = vi.fn().mockResolvedValue({
      entries: [
        { name: 'readme.md', isDirectory: false, path: '/test/readme.md' },
        { name: 'notes.txt', isDirectory: false, path: '/test/notes.txt' },
      ],
    });

    render(<FileTreeSidebar rootDir="/test" onOpenFile={onOpenFile} visible={true} />);

    await vi.waitFor(() => {
      expect(screen.getByText('readme.md')).toBeInTheDocument();
      expect(screen.getByText('notes.txt')).toBeInTheDocument();
    });

    const fileNodes = screen.getAllByTestId('file-node');
    expect(fileNodes).toHaveLength(2);
  });

  it('renders folder entries with expand/collapse', async () => {
    const user = userEvent.setup();

    // Root listing returns a folder
    window.drwrite.readDirectory = vi
      .fn()
      .mockResolvedValueOnce({
        entries: [{ name: 'docs', isDirectory: true, path: '/test/docs' }],
      })
      .mockResolvedValueOnce({
        entries: [{ name: 'guide.md', isDirectory: false, path: '/test/docs/guide.md' }],
      });

    render(<FileTreeSidebar rootDir="/test" onOpenFile={onOpenFile} visible={true} />);

    // Wait for folder to appear
    await vi.waitFor(() => {
      expect(screen.getByText('docs')).toBeInTheDocument();
    });

    const folderNode = screen.getByTestId('folder-node');
    expect(folderNode).toBeInTheDocument();

    // Click to expand
    await user.click(folderNode);

    await vi.waitFor(() => {
      expect(screen.getByTestId('folder-children')).toBeInTheDocument();
      expect(screen.getByText('guide.md')).toBeInTheDocument();
    });

    // Click again to collapse
    await user.click(folderNode);

    await vi.waitFor(() => {
      expect(screen.queryByTestId('folder-children')).not.toBeInTheDocument();
    });
  });

  it('clicking a .md file calls onOpenFile with the file path', async () => {
    const user = userEvent.setup();

    window.drwrite.readDirectory = vi.fn().mockResolvedValue({
      entries: [{ name: 'document.md', isDirectory: false, path: '/test/document.md' }],
    });

    render(<FileTreeSidebar rootDir="/test" onOpenFile={onOpenFile} visible={true} />);

    await vi.waitFor(() => {
      expect(screen.getByText('document.md')).toBeInTheDocument();
    });

    await user.click(screen.getByText('document.md'));

    expect(onOpenFile).toHaveBeenCalledWith('/test/document.md');
  });

  it('shows empty state when no entries are returned', async () => {
    window.drwrite.readDirectory = vi.fn().mockResolvedValue({ entries: [] });

    render(<FileTreeSidebar rootDir="/test" onOpenFile={onOpenFile} visible={true} />);

    await vi.waitFor(() => {
      expect(screen.getByTestId('file-tree-empty')).toBeInTheDocument();
      expect(screen.getByText('No files to display')).toBeInTheDocument();
    });
  });

  it('does not call onOpenFile for non-markdown files', async () => {
    const user = userEvent.setup();

    window.drwrite.readDirectory = vi.fn().mockResolvedValue({
      entries: [{ name: 'image.png', isDirectory: false, path: '/test/image.png' }],
    });

    render(<FileTreeSidebar rootDir="/test" onOpenFile={onOpenFile} visible={true} />);

    await vi.waitFor(() => {
      expect(screen.getByText('image.png')).toBeInTheDocument();
    });

    await user.click(screen.getByText('image.png'));

    expect(onOpenFile).not.toHaveBeenCalled();
  });

  it('reloads entries when rootDir changes', async () => {
    const readDirMock = vi
      .fn()
      .mockResolvedValueOnce({
        entries: [{ name: 'a.md', isDirectory: false, path: '/dir1/a.md' }],
      })
      .mockResolvedValueOnce({
        entries: [{ name: 'b.md', isDirectory: false, path: '/dir2/b.md' }],
      });
    window.drwrite.readDirectory = readDirMock;

    const { rerender } = render(<FileTreeSidebar rootDir="/dir1" onOpenFile={onOpenFile} visible={true} />);

    await vi.waitFor(() => {
      expect(screen.getByText('a.md')).toBeInTheDocument();
    });

    rerender(<FileTreeSidebar rootDir="/dir2" onOpenFile={onOpenFile} visible={true} />);

    await vi.waitFor(() => {
      expect(screen.getByText('b.md')).toBeInTheDocument();
    });

    expect(readDirMock).toHaveBeenCalledTimes(2);
  });
});
