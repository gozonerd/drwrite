import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SplitView } from './SplitView';
import { useEditorStore } from '../store/editor-store';

// Mock the heavy editor components to isolate SplitView testing
vi.mock('./SourceEditor', () => ({
  SourceEditor: () => <div data-testid="source-editor">Source</div>,
}));

vi.mock('./WysiwygEditor', () => ({
  WysiwygEditor: () => <div data-testid="wysiwyg-editor">WYSIWYG</div>,
}));

vi.mock('./Minimap', () => ({
  Minimap: () => <div data-testid="minimap-mock">Minimap</div>,
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

  // --- Coverage gap: drag handle logic ---

  it('mousedown on handle starts dragging (sets isDragging)', () => {
    render(<SplitView />);
    const handle = screen.getByRole('separator');

    // Before drag: handle should not have active class
    expect(handle.className).toContain('bg-dw-handle');
    expect(handle.className).not.toContain('bg-dw-handle-active');

    // Start drag
    fireEvent.mouseDown(handle, { preventDefault: vi.fn() });

    // After mousedown: handle should show active styling
    expect(handle.className).toContain('bg-dw-handle-active');
  });

  it('mousemove during drag updates split ratio', () => {
    const { container } = render(<SplitView />);
    const handle = screen.getByRole('separator');
    const flexContainer = container.querySelector('.flex.flex-1');

    // Mock getBoundingClientRect on the container
    if (flexContainer) {
      vi.spyOn(flexContainer, 'getBoundingClientRect').mockReturnValue({
        left: 0,
        top: 0,
        right: 1000,
        bottom: 600,
        width: 1000,
        height: 600,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });
    }

    // Start drag
    fireEvent.mouseDown(handle, { preventDefault: vi.fn() });

    // Move mouse to 70% of container width
    act(() => {
      fireEvent.mouseMove(document, { clientX: 700, clientY: 300 });
    });

    // The split ratio should have been updated
    const ratio = useEditorStore.getState().splitRatio;
    expect(ratio).toBeGreaterThan(0.5);
    expect(ratio).toBeLessThanOrEqual(0.85);
  });

  it('mouseup ends dragging', () => {
    render(<SplitView />);
    const handle = screen.getByRole('separator');

    // Start drag
    fireEvent.mouseDown(handle, { preventDefault: vi.fn() });
    expect(handle.className).toContain('bg-dw-handle-active');

    // End drag
    act(() => {
      fireEvent.mouseUp(document);
    });

    // Handle should go back to non-active styling
    expect(handle.className).not.toContain('bg-dw-handle-active');
  });

  it('double-click on handle resets split ratio to 0.5', () => {
    useEditorStore.setState({ splitRatio: 0.7 });
    render(<SplitView />);
    const handle = screen.getByRole('separator');

    fireEvent.doubleClick(handle);

    expect(useEditorStore.getState().splitRatio).toBe(0.5);
  });

  it('sets cursor to col-resize on container during drag', () => {
    const { container } = render(<SplitView />);
    const handle = screen.getByRole('separator');
    const flexContainer = container.querySelector('.flex.flex-1') as HTMLElement;

    // Before drag, cursor should not be set
    expect(flexContainer.style.cursor).toBe('');

    // Start drag
    fireEvent.mouseDown(handle, { preventDefault: vi.fn() });

    // During drag, cursor should be col-resize
    expect(flexContainer.style.cursor).toBe('col-resize');

    // End drag
    act(() => {
      fireEvent.mouseUp(document);
    });

    // After drag, cursor should be cleared
    expect(flexContainer.style.cursor).toBe('');
  });
});
