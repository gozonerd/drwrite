import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExportDialog } from './ExportDialog';

describe('ExportDialog', () => {
  const defaultProps = {
    onExportPdf: vi.fn(),
    onExportHtml: vi.fn(),
    onClose: vi.fn(),
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

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
    expect(onExportPdf).toHaveBeenCalledWith(
      expect.objectContaining({
        fontSize: expect.any(Number),
        marginTop: expect.any(Number),
      }),
    );
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

  // --- Coverage gap: font size slider change ---
  it('updates font size when slider changes', () => {
    const onExportPdf = vi.fn();
    render(<ExportDialog {...defaultProps} onExportPdf={onExportPdf} />);

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '18' } });

    // Verify the display updated
    expect(screen.getByText(/Font Size: 18px/)).toBeInTheDocument();

    // Verify localStorage was updated
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const stored = JSON.parse(localStorage.getItem('drwrite-export-settings')!);
    expect(stored.fontSize).toBe(18);
  });

  // --- Coverage gap: margin input changes ---
  it('updates margin values when inputs change', () => {
    const onExportPdf = vi.fn();
    render(<ExportDialog {...defaultProps} onExportPdf={onExportPdf} />);

    // There are 4 number inputs for margins
    const numberInputs = screen.getAllByRole('spinbutton');
    expect(numberInputs.length).toBe(4);

    // Change marginTop (first input)
    fireEvent.change(numberInputs[0], { target: { value: '2' } });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const stored = JSON.parse(localStorage.getItem('drwrite-export-settings')!);
    expect(stored.marginTop).toBe(2);
  });

  it('updates marginBottom when its input changes', () => {
    render(<ExportDialog {...defaultProps} />);

    const numberInputs = screen.getAllByRole('spinbutton');
    fireEvent.change(numberInputs[1], { target: { value: '1.5' } });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const stored = JSON.parse(localStorage.getItem('drwrite-export-settings')!);
    expect(stored.marginBottom).toBe(1.5);
  });

  it('updates marginLeft when its input changes', () => {
    render(<ExportDialog {...defaultProps} />);

    const numberInputs = screen.getAllByRole('spinbutton');
    fireEvent.change(numberInputs[2], { target: { value: '0.75' } });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const stored = JSON.parse(localStorage.getItem('drwrite-export-settings')!);
    expect(stored.marginLeft).toBe(0.75);
  });

  it('updates marginRight when its input changes', () => {
    render(<ExportDialog {...defaultProps} />);

    const numberInputs = screen.getAllByRole('spinbutton');
    fireEvent.change(numberInputs[3], { target: { value: '2.5' } });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const stored = JSON.parse(localStorage.getItem('drwrite-export-settings')!);
    expect(stored.marginRight).toBe(2.5);
  });

  // --- Coverage gap: font family selector change ---
  it('updates font family when select changes', () => {
    render(<ExportDialog {...defaultProps} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '"Georgia", "Times New Roman", serif' } });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const stored = JSON.parse(localStorage.getItem('drwrite-export-settings')!);
    expect(stored.fontFamily).toBe('"Georgia", "Times New Roman", serif');
  });

  // --- Coverage gap: localStorage persistence round-trip ---
  it('persists settings to localStorage on every change', () => {
    render(<ExportDialog {...defaultProps} />);

    // Change font size
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '20' } });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const stored = JSON.parse(localStorage.getItem('drwrite-export-settings')!);
    expect(stored.fontSize).toBe(20);
    // Other settings should still be present
    expect(stored.marginTop).toBeDefined();
    expect(stored.fontFamily).toBeDefined();
  });

  it('loads stored settings from localStorage on mount', () => {
    localStorage.setItem(
      'drwrite-export-settings',
      JSON.stringify({
        fontSize: 22,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 1.5,
        marginRight: 1.5,
        fontFamily: '"Georgia", "Times New Roman", serif',
      }),
    );

    render(<ExportDialog {...defaultProps} />);

    // Should show the stored font size
    expect(screen.getByText(/Font Size: 22px/)).toBeInTheDocument();
  });

  it('passes updated settings to onExportPdf after changes', async () => {
    const user = userEvent.setup();
    const onExportPdf = vi.fn();
    render(<ExportDialog {...defaultProps} onExportPdf={onExportPdf} />);

    // Change font size first
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '16' } });

    // Now click export
    await user.click(screen.getByText('Export PDF'));

    expect(onExportPdf).toHaveBeenCalledWith(
      expect.objectContaining({
        fontSize: 16,
      }),
    );
  });
});
