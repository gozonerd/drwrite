import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

// Mock mermaid before importing the component
vi.mock('mermaid', () => {
  const initialize = vi.fn();
  const render = vi.fn();
  return {
    default: { initialize, render },
  };
});

import { MermaidRenderer } from './MermaidRenderer';
import mermaid from 'mermaid';

const mockedRender = vi.mocked(mermaid.render);

describe('MermaidRenderer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders successfully with valid mermaid code', async () => {
    mockedRender.mockResolvedValue({ svg: '<svg data-testid="mermaid-svg">diagram</svg>' });

    const { container } = render(<MermaidRenderer code="graph TD; A-->B;" id="test-1" />);

    await waitFor(() => {
      expect(mockedRender).toHaveBeenCalledWith('mermaid-test-1', 'graph TD; A-->B;');
    });

    await waitFor(() => {
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('shows error state when mermaid.render throws', async () => {
    mockedRender.mockRejectedValue(new Error('Parse error: invalid syntax'));

    render(<MermaidRenderer code="not valid mermaid" id="test-err" />);

    await waitFor(() => {
      expect(screen.getByText('Mermaid Error')).toBeInTheDocument();
    });

    expect(screen.getByText('Error: Parse error: invalid syntax')).toBeInTheDocument();
  });

  it('handles empty code gracefully', () => {
    render(<MermaidRenderer code="" id="test-empty" />);

    // Should not call mermaid.render and should not show error
    expect(mockedRender).not.toHaveBeenCalled();
    expect(screen.queryByText('Mermaid Error')).not.toBeInTheDocument();
  });

  it('handles whitespace-only code gracefully', () => {
    render(<MermaidRenderer code="      " id="test-ws" />);

    expect(mockedRender).not.toHaveBeenCalled();
    expect(screen.queryByText('Mermaid Error')).not.toBeInTheDocument();
  });

  it('trims code before passing to mermaid.render', async () => {
    mockedRender.mockResolvedValue({ svg: '<svg></svg>' });

    render(<MermaidRenderer code="  graph LR; X-->Y;  " id="test-trim" />);

    await waitFor(() => {
      expect(mockedRender).toHaveBeenCalledWith('mermaid-test-trim', 'graph LR; X-->Y;');
    });
  });
});
