import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

// Track calls via module-scoped state
const mockZoom = vi.fn();
const mockGet = vi.fn(() => ({ zoom: mockZoom }));
const mockImportXML = vi.fn();
const mockDestroy = vi.fn();

vi.mock('bpmn-js', () => {
  return {
    default: function BpmnViewer() {
      return {
        importXML: mockImportXML,
        get: mockGet,
        destroy: mockDestroy,
      };
    },
  };
});

import { BpmnRenderer } from './BpmnRenderer';

const VALID_XML = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL">
  <process id="Process_1" isExecutable="false">
    <startEvent id="Start_1"/>
  </process>
</definitions>`;

describe('BpmnRenderer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockImportXML.mockResolvedValue(undefined);
  });

  it('renders successfully with valid BPMN XML', async () => {
    render(<BpmnRenderer xml={VALID_XML} id="bpmn-1" />);

    await waitFor(() => {
      expect(mockImportXML).toHaveBeenCalledWith(VALID_XML.trim());
    });

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith('canvas');
      expect(mockZoom).toHaveBeenCalledWith('fit-viewport');
    });
  });

  it('shows error state when importXML throws', async () => {
    mockImportXML.mockRejectedValue(new Error('Invalid BPMN XML'));

    render(<BpmnRenderer xml="<bad>xml</bad>" id="bpmn-err" />);

    await waitFor(() => {
      expect(screen.getByText('BPMN Error')).toBeInTheDocument();
    });

    expect(screen.getByText('Error: Invalid BPMN XML')).toBeInTheDocument();
  });

  it('handles empty XML gracefully', () => {
    render(<BpmnRenderer xml="" id="bpmn-empty" />);

    expect(mockImportXML).not.toHaveBeenCalled();
    expect(screen.queryByText('BPMN Error')).not.toBeInTheDocument();
  });

  it('handles whitespace-only XML gracefully', () => {
    render(<BpmnRenderer xml="      " id="bpmn-ws" />);

    expect(mockImportXML).not.toHaveBeenCalled();
    expect(screen.queryByText('BPMN Error')).not.toBeInTheDocument();
  });

  it('cleans up viewer on unmount', async () => {
    const { unmount } = render(<BpmnRenderer xml={VALID_XML} id="bpmn-cleanup" />);

    await waitFor(() => {
      expect(mockImportXML).toHaveBeenCalled();
    });

    unmount();

    expect(mockDestroy).toHaveBeenCalled();
  });
});
