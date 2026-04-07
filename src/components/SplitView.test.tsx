import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SplitView } from './SplitView';
import { useEditorStore } from '../store/editor-store';

// Mock the heavy editor components to isolate SplitView testing
vi.mock('./SourceEditor', () => ({
  SourceEditor: () => <div data-testid="source-editor">Source</div>,
}));

vi.mock('./WysiwygEditor', () => ({
  WysiwygEditor: () => <div data-testid="wysiwyg-editor">WYSIWYG</div>,
}));

describe('SplitView', () => {
  beforeEach(() => {
    useEditorStore.setState({ splitRatio: 0.5 });
  });

  it('renders both editor panes', () => {
    render(<SplitView />);
    expect(screen.getByTestId('source-editor')).toBeInTheDocument();
    expect(screen.getByTestId('wysiwyg-editor')).toBeInTheDocument();
  });

  it('renders source editor before wysiwyg (left to right)', () => {
    render(<SplitView />);
    const source = screen.getByTestId('source-editor');
    const wysiwyg = screen.getByTestId('wysiwyg-editor');

    // Source should come before WYSIWYG in DOM order (flex layout = left to right)
    const container = source.closest('.flex');
    const children = Array.from(container?.children ?? []);
    const sourceIndex = children.findIndex((c) => c.contains(source));
    const wysiwygIndex = children.findIndex((c) => c.contains(wysiwyg));
    expect(sourceIndex).toBeLessThan(wysiwygIndex);
  });

  it('renders a drag handle separator', () => {
    render(<SplitView />);
    const separator = screen.getByRole('separator');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    expect(separator).toHaveAttribute('aria-label', 'Resize editor panels');
  });
});
