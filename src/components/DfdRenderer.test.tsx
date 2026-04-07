import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

// Build a chainable mock for d3 selection methods
function createChainableMock() {
  const mock: any = {};
  const methods = ['select', 'selectAll', 'append', 'attr', 'text', 'remove'];
  for (const method of methods) {
    mock[method] = vi.fn().mockReturnValue(mock);
  }
  return mock;
}

const chainable = createChainableMock();

vi.mock('d3', () => ({
  select: vi.fn(() => chainable),
}));

vi.mock('../utils/dfd-parser', () => ({
  parseDfd: vi.fn(),
  layoutNodes: vi.fn(),
}));

import { DfdRenderer } from './DfdRenderer';
import { parseDfd, layoutNodes } from '../utils/dfd-parser';

const mockedParseDfd = vi.mocked(parseDfd);
const mockedLayoutNodes = vi.mocked(layoutNodes);

describe('DfdRenderer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset chainable mocks
    for (const method of Object.keys(chainable)) {
      chainable[method].mockReturnValue(chainable);
    }
  });

  it('renders successfully with valid DFD code', async () => {
    const nodes = [
      { id: 'P1', label: 'Process', type: 'process' as const, x: 350, y: 175 },
      { id: 'E1', label: 'External', type: 'external' as const, x: 116, y: 175 },
    ];
    const flows = [{ from: 'E1', to: 'P1', label: 'Data' }];

    mockedParseDfd.mockReturnValue({ nodes, flows });
    mockedLayoutNodes.mockReturnValue(nodes);

    render(
      <DfdRenderer
        code={'process P1 "Process"\nexternal E1 "External"\nflow E1 -> P1 "Data"'}
        id="dfd-1"
      />,
    );

    await waitFor(() => {
      expect(mockedParseDfd).toHaveBeenCalled();
      expect(mockedLayoutNodes).toHaveBeenCalled();
    });

    // Should not show error
    expect(screen.queryByText('DFD Error')).not.toBeInTheDocument();
  });

  it('shows error state when parseDfd throws', async () => {
    mockedParseDfd.mockImplementation(() => {
      throw new Error('Unexpected token in DFD');
    });

    render(<DfdRenderer code="invalid dfd code @@!" id="dfd-err" />);

    await waitFor(() => {
      expect(screen.getByText('DFD Error')).toBeInTheDocument();
    });

    expect(screen.getByText('Error: Unexpected token in DFD')).toBeInTheDocument();
  });

  it('shows error when parsed nodes array is empty', async () => {
    mockedParseDfd.mockReturnValue({ nodes: [], flows: [] });

    render(<DfdRenderer code="# just a comment" id="dfd-none" />);

    await waitFor(() => {
      expect(screen.getByText('DFD Error')).toBeInTheDocument();
    });
  });

  it('handles empty code gracefully', () => {
    render(<DfdRenderer code="" id="dfd-empty" />);

    expect(mockedParseDfd).not.toHaveBeenCalled();
    expect(screen.queryByText('DFD Error')).not.toBeInTheDocument();
  });

  it('handles whitespace-only code gracefully', () => {
    render(<DfdRenderer code="      " id="dfd-ws" />);

    expect(mockedParseDfd).not.toHaveBeenCalled();
    expect(screen.queryByText('DFD Error')).not.toBeInTheDocument();
  });
});
