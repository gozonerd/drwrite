import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

const mockDot = vi.fn();
const mockLoad = vi.fn();

vi.mock('@hpcc-js/wasm-graphviz', () => ({
  Graphviz: {
    load: mockLoad,
  },
}));

import { GraphvizRenderer } from './GraphvizRenderer';

describe('GraphvizRenderer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLoad.mockResolvedValue({ dot: mockDot });
  });

  it('renders successfully with valid DOT code', async () => {
    mockDot.mockReturnValue('<svg data-testid="gv-svg"><g>digraph</g></svg>');

    const { container } = render(
      <GraphvizRenderer code='digraph { A -> B; }' id="gv-1" />,
    );

    await waitFor(() => {
      expect(mockLoad).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockDot).toHaveBeenCalledWith('digraph { A -> B; }');
    });

    await waitFor(() => {
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });

  it('shows error state when Graphviz.load rejects', async () => {
    mockLoad.mockRejectedValue(new Error('WASM load failed'));

    render(<GraphvizRenderer code='digraph { X -> Y; }' id="gv-load-err" />);

    await waitFor(() => {
      expect(screen.getByText('Graphviz Error')).toBeInTheDocument();
    });

    expect(screen.getByText('Error: WASM load failed')).toBeInTheDocument();
  });

  it('shows error state when dot() throws', async () => {
    mockDot.mockImplementation(() => {
      throw new Error('Syntax error in DOT');
    });

    render(<GraphvizRenderer code="not valid dot" id="gv-dot-err" />);

    await waitFor(() => {
      expect(screen.getByText('Graphviz Error')).toBeInTheDocument();
    });

    expect(screen.getByText('Error: Syntax error in DOT')).toBeInTheDocument();
  });

  it('handles empty code gracefully', () => {
    render(<GraphvizRenderer code="" id="gv-empty" />);

    expect(mockLoad).not.toHaveBeenCalled();
    expect(screen.queryByText('Graphviz Error')).not.toBeInTheDocument();
  });

  it('handles whitespace-only code gracefully', () => {
    render(<GraphvizRenderer code="      " id="gv-ws" />);

    expect(mockLoad).not.toHaveBeenCalled();
    expect(screen.queryByText('Graphviz Error')).not.toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    mockLoad.mockReturnValue(new Promise(() => {})); // Never resolves

    render(<GraphvizRenderer code='digraph { A -> B; }' id="gv-loading" />);

    expect(screen.getByText('Rendering Graphviz...')).toBeInTheDocument();
  });
});
