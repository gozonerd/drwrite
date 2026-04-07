import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Minimap } from './Minimap';

const defaultProps = {
  markdown: '# Hello World\n\nSome content here.\n\nMore lines of text.',
  scrollFraction: 0,
  onScrollTo: vi.fn(),
  darkMode: true,
};

describe('Minimap', () => {
  it('renders the minimap container', () => {
    render(<Minimap {...defaultProps} />);
    expect(screen.getByTestId('minimap')).toBeInTheDocument();
  });

  it('shows viewport indicator', () => {
    render(<Minimap {...defaultProps} />);
    const viewport = screen.getByTestId('minimap-viewport');
    expect(viewport).toBeInTheDocument();
    expect(viewport).toHaveClass('minimap-viewport');
  });

  it('renders text content from markdown prop', () => {
    render(<Minimap {...defaultProps} />);
    const content = screen.getByTestId('minimap-content');
    expect(content).toBeInTheDocument();
    expect(content.textContent).toBe(defaultProps.markdown);
  });

  it('click on minimap calls onScrollTo with correct fraction', () => {
    const onScrollTo = vi.fn();
    render(<Minimap {...defaultProps} onScrollTo={onScrollTo} />);

    const minimap = screen.getByTestId('minimap');

    // Mock getBoundingClientRect to give us a known size
    vi.spyOn(minimap, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      left: 0,
      bottom: 400,
      right: 70,
      width: 70,
      height: 400,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    // Click at the midpoint (y=200 of 400px container → fraction 0.5)
    fireEvent.click(minimap, { clientY: 200 });

    expect(onScrollTo).toHaveBeenCalledWith(0.5);
  });

  it('adapts text color based on darkMode prop', () => {
    const { rerender } = render(<Minimap {...defaultProps} darkMode={true} />);
    const contentDark = screen.getByTestId('minimap-content');
    expect(contentDark.style.color).toBe('rgba(230, 237, 243, 0.4)');

    rerender(<Minimap {...defaultProps} darkMode={false} />);
    const contentLight = screen.getByTestId('minimap-content');
    expect(contentLight.style.color).toBe('rgba(36, 41, 46, 0.35)');
  });
});
