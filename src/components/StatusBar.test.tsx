import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { StatusBar } from './StatusBar';
import { useEditorStore } from '../store/editor-store';

describe('StatusBar', () => {
  beforeEach(() => {
    useEditorStore.setState({
      markdown: '# Hello\n\nWorld\n',
      filePath: null,
      isDirty: false,
    });
    // Reset getGitStatus to default (not a repo)
    window.drwrite.getGitStatus = vi.fn().mockResolvedValue({ isRepo: false });
  });

  it('renders line count', () => {
    render(<StatusBar />);
    expect(screen.getByText('4 lines')).toBeInTheDocument();
  });

  it('renders Markdown label', () => {
    render(<StatusBar />);
    expect(screen.getByText('Markdown')).toBeInTheDocument();
  });

  it('renders UTF-8 encoding', () => {
    render(<StatusBar />);
    expect(screen.getByText('UTF-8')).toBeInTheDocument();
  });

  it('shows Untitled when no file path', () => {
    render(<StatusBar />);
    expect(screen.getByText('Untitled')).toBeInTheDocument();
  });

  it('shows filename when file path is set', () => {
    useEditorStore.setState({ filePath: '/Users/test/document.md' });
    render(<StatusBar />);
    expect(screen.getByText('document.md')).toBeInTheDocument();
  });

  it('shows modified indicator when dirty', () => {
    useEditorStore.setState({ isDirty: true });
    render(<StatusBar />);
    expect(screen.getByText('● Modified')).toBeInTheDocument();
  });

  it('hides modified indicator when clean', () => {
    useEditorStore.setState({ isDirty: false });
    render(<StatusBar />);
    expect(screen.queryByText('● Modified')).not.toBeInTheDocument();
  });

  it('shows correct line count for single-line content', () => {
    useEditorStore.setState({ markdown: 'single line' });
    render(<StatusBar />);
    expect(screen.getByText('1 lines')).toBeInTheDocument();
  });

  // --- Coverage gap: git info display ---

  it('shows branch name when file is in a git repo', async () => {
    window.drwrite.getGitStatus = vi.fn().mockResolvedValue({
      isRepo: true,
      branch: 'main',
      isFileDirty: false,
    });

    useEditorStore.setState({ filePath: '/repo/file.md' });
    render(<StatusBar />);

    await waitFor(() => {
      expect(screen.getByText('main')).toBeInTheDocument();
    });
  });

  it('shows dirty indicator (*) when file has uncommitted git changes', async () => {
    window.drwrite.getGitStatus = vi.fn().mockResolvedValue({
      isRepo: true,
      branch: 'feature-branch',
      isFileDirty: true,
    });

    useEditorStore.setState({ filePath: '/repo/dirty-file.md' });
    render(<StatusBar />);

    await waitFor(() => {
      expect(screen.getByText('feature-branch *')).toBeInTheDocument();
    });
  });

  it('does not show git info when file is not in a repo', async () => {
    window.drwrite.getGitStatus = vi.fn().mockResolvedValue({
      isRepo: false,
    });

    useEditorStore.setState({ filePath: '/not-a-repo/file.md' });
    render(<StatusBar />);

    // Give the async effect time to complete
    await waitFor(() => {
      expect(window.drwrite.getGitStatus).toHaveBeenCalled();
    });

    expect(screen.queryByText(/main/)).not.toBeInTheDocument();
  });

  it('clears git info when filePath becomes null', async () => {
    window.drwrite.getGitStatus = vi.fn().mockResolvedValue({
      isRepo: true,
      branch: 'main',
      isFileDirty: false,
    });

    useEditorStore.setState({ filePath: '/repo/file.md' });
    const { rerender } = render(<StatusBar />);

    await waitFor(() => {
      expect(screen.getByText('main')).toBeInTheDocument();
    });

    // Clear filePath
    useEditorStore.setState({ filePath: null });
    rerender(<StatusBar />);

    await waitFor(() => {
      expect(screen.queryByText('main')).not.toBeInTheDocument();
    });
  });

  it('handles getGitStatus throwing an error gracefully', async () => {
    window.drwrite.getGitStatus = vi.fn().mockRejectedValue(new Error('git not found'));

    useEditorStore.setState({ filePath: '/repo/file.md' });
    render(<StatusBar />);

    // Should not crash, should just not show git info
    await waitFor(() => {
      expect(window.drwrite.getGitStatus).toHaveBeenCalled();
    });

    expect(screen.queryByText(/main/)).not.toBeInTheDocument();
  });
});
