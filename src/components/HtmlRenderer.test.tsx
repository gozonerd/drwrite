import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

// Mock URL.createObjectURL and revokeObjectURL for jsdom
const mockCreateObjectURL = vi.fn(() => 'blob:http://localhost/fake-blob-url');
const mockRevokeObjectURL = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  global.URL.createObjectURL = mockCreateObjectURL;
  global.URL.revokeObjectURL = mockRevokeObjectURL;
});

import { HtmlRenderer } from './HtmlRenderer';

describe('HtmlRenderer', () => {
  it('renders an iframe with sandboxed allow-scripts attribute', async () => {
    render(<HtmlRenderer code="<h1>Hello</h1>" id="html-1" />);

    const iframe = screen.getByTitle('interactive-html-1');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('sandbox', 'allow-scripts');
  });

  it('creates a blob URL from the HTML code and sets it as iframe src', async () => {
    render(<HtmlRenderer code="<p>Test</p>" id="html-blob" />);

    await waitFor(() => {
      expect(mockCreateObjectURL).toHaveBeenCalled();
    });

    // Verify a Blob was passed to createObjectURL
    const blobArg = mockCreateObjectURL.mock.calls[0][0];
    expect(blobArg).toBeInstanceOf(Blob);
    expect(blobArg.type).toBe('text/html');

    const iframe = screen.getByTitle('interactive-html-blob');
    expect(iframe).toHaveAttribute('src', 'blob:http://localhost/fake-blob-url');
  });

  it('shows error state when Blob creation throws', async () => {
    // Force Blob constructor to throw
    const OriginalBlob = global.Blob;
    global.Blob = function ThrowingBlob() {
      throw new Error('Blob creation failed');
    } as any;

    render(<HtmlRenderer code="<div>Broken</div>" id="html-err" />);

    await waitFor(() => {
      expect(screen.getByText('HTML Render Error')).toBeInTheDocument();
    });

    expect(screen.getByText('Error: Blob creation failed')).toBeInTheDocument();

    // Restore
    global.Blob = OriginalBlob;
  });

  it('handles empty code gracefully', () => {
    render(<HtmlRenderer code="" id="html-empty" />);

    expect(mockCreateObjectURL).not.toHaveBeenCalled();
    expect(screen.queryByText('HTML Render Error')).not.toBeInTheDocument();
  });

  it('handles whitespace-only code gracefully', () => {
    render(<HtmlRenderer code="      " id="html-ws" />);

    expect(mockCreateObjectURL).not.toHaveBeenCalled();
    expect(screen.queryByText('HTML Render Error')).not.toBeInTheDocument();
  });

  it('revokes the blob URL on cleanup', async () => {
    const { unmount } = render(<HtmlRenderer code="<p>Cleanup</p>" id="html-cleanup" />);

    await waitFor(() => {
      expect(mockCreateObjectURL).toHaveBeenCalled();
    });

    unmount();

    // The useEffect cleanup calls URL.revokeObjectURL
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:http://localhost/fake-blob-url');
  });
});
