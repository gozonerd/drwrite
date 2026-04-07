import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBar } from './StatusBar';
import { useEditorStore } from '../store/editor-store';

describe('StatusBar', () => {
  beforeEach(() => {
    useEditorStore.setState({
      markdown: '# Hello\n\nWorld\n',
      filePath: null,
      isDirty: false,
    });
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
});
