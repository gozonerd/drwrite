import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toolbar } from './Toolbar';
import { useEditorStore } from '../store/editor-store';

describe('Toolbar', () => {
  beforeEach(() => {
    useEditorStore.setState({
      filePath: null,
      isDirty: false,
      darkMode: true,
    });
  });

  it('shows Untitled when no file is open', () => {
    render(<Toolbar />);
    expect(screen.getByText('Untitled')).toBeInTheDocument();
  });

  it('shows filename when file is open', () => {
    useEditorStore.setState({ filePath: '/path/to/README.md' });
    render(<Toolbar />);
    expect(screen.getByText('README.md')).toBeInTheDocument();
  });

  it('shows dirty indicator with filename', () => {
    useEditorStore.setState({ filePath: '/path/to/doc.md', isDirty: true });
    render(<Toolbar />);
    expect(screen.getByText('● doc.md')).toBeInTheDocument();
  });

  it('renders Open button', () => {
    render(<Toolbar />);
    expect(screen.getByTitle('Open File (Ctrl+O)')).toBeInTheDocument();
  });

  it('renders Save button', () => {
    render(<Toolbar />);
    expect(screen.getByTitle('Save (Ctrl+S)')).toBeInTheDocument();
  });

  it('renders dark mode toggle showing Light when dark', () => {
    useEditorStore.setState({ darkMode: true });
    render(<Toolbar />);
    expect(screen.getByText('Light')).toBeInTheDocument();
  });

  it('renders dark mode toggle showing Dark when light', () => {
    useEditorStore.setState({ darkMode: false });
    render(<Toolbar />);
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  it('toggles dark mode on click', async () => {
    const user = userEvent.setup();
    useEditorStore.setState({ darkMode: true });
    render(<Toolbar />);

    await user.click(screen.getByText('Light'));
    expect(useEditorStore.getState().darkMode).toBe(false);
  });

  it('renders Export button when onExport provided', () => {
    const onExport = vi.fn();
    render(<Toolbar onExport={onExport} />);
    expect(screen.getByTitle('Export PDF/HTML (Ctrl+E)')).toBeInTheDocument();
  });

  it('calls onExport when Export button clicked', async () => {
    const user = userEvent.setup();
    const onExport = vi.fn();
    render(<Toolbar onExport={onExport} />);

    await user.click(screen.getByText('Export'));
    expect(onExport).toHaveBeenCalledOnce();
  });

  it('does not render Export button when onExport not provided', () => {
    render(<Toolbar />);
    expect(screen.queryByText('Export')).not.toBeInTheDocument();
  });
});
