import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExportDialog } from './ExportDialog';

describe('ExportDialog', () => {
  const defaultProps = {
    onExportPdf: vi.fn(),
    onExportHtml: vi.fn(),
    onClose: vi.fn(),
  };

  it('renders the dialog title', () => {
    render(<ExportDialog {...defaultProps} />);
    expect(screen.getByText('Export Settings')).toBeInTheDocument();
  });

  it('renders font size slider', () => {
    render(<ExportDialog {...defaultProps} />);
    expect(screen.getByText(/Font Size:/)).toBeInTheDocument();
  });

  it('renders margin controls', () => {
    render(<ExportDialog {...defaultProps} />);
    expect(screen.getByText('Margins (inches)')).toBeInTheDocument();
    expect(screen.getByText('Top')).toBeInTheDocument();
    expect(screen.getByText('Bottom')).toBeInTheDocument();
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('renders font family selector', () => {
    render(<ExportDialog {...defaultProps} />);
    expect(screen.getByText('Font Family')).toBeInTheDocument();
  });

  it('renders Export PDF button', () => {
    render(<ExportDialog {...defaultProps} />);
    expect(screen.getByText('Export PDF')).toBeInTheDocument();
  });

  it('renders Export HTML button', () => {
    render(<ExportDialog {...defaultProps} />);
    expect(screen.getByText('Export HTML')).toBeInTheDocument();
  });

  it('renders Cancel button', () => {
    render(<ExportDialog {...defaultProps} />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onExportPdf when Export PDF is clicked', async () => {
    const user = userEvent.setup();
    const onExportPdf = vi.fn();
    render(<ExportDialog {...defaultProps} onExportPdf={onExportPdf} />);

    await user.click(screen.getByText('Export PDF'));
    expect(onExportPdf).toHaveBeenCalledOnce();
    expect(onExportPdf).toHaveBeenCalledWith(expect.objectContaining({
      fontSize: expect.any(Number),
      marginTop: expect.any(Number),
    }));
  });

  it('calls onExportHtml when Export HTML is clicked', async () => {
    const user = userEvent.setup();
    const onExportHtml = vi.fn();
    render(<ExportDialog {...defaultProps} onExportHtml={onExportHtml} />);

    await user.click(screen.getByText('Export HTML'));
    expect(onExportHtml).toHaveBeenCalledOnce();
  });

  it('calls onClose when Cancel is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ExportDialog {...defaultProps} onClose={onClose} />);

    await user.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(<ExportDialog {...defaultProps} onClose={onClose} />);

    // Click the backdrop (outermost div)
    const backdrop = container.querySelector('.fixed.inset-0');
    if (backdrop) {
      await user.click(backdrop);
      expect(onClose).toHaveBeenCalled();
    }
  });
});
