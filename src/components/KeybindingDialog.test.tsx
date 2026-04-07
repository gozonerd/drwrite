import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KeybindingDialog } from './KeybindingDialog';
import { useKeybindingStore } from '../store/keybinding-store';

describe('KeybindingDialog', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockReset();
    localStorage.clear();
    useKeybindingStore.getState().resetToDefaults();
  });

  it('renders all keybindings', () => {
    render(<KeybindingDialog onClose={onClose} />);
    const rows = screen.getAllByTestId('keybinding-row');
    expect(rows).toHaveLength(5);
  });

  it('shows keybinding labels', () => {
    render(<KeybindingDialog onClose={onClose} />);
    expect(screen.getByText('Open File')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Save As')).toBeInTheDocument();
    expect(screen.getByText('New File')).toBeInTheDocument();
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  it('shows current key combos', () => {
    render(<KeybindingDialog onClose={onClose} />);
    const combos = screen.getAllByTestId('keybinding-combo');
    const comboTexts = combos.map((c) => c.textContent);
    expect(comboTexts).toContain('Ctrl+O');
    expect(comboTexts).toContain('Ctrl+S');
    expect(comboTexts).toContain('Ctrl+Shift+S');
    expect(comboTexts).toContain('Ctrl+N');
    expect(comboTexts).toContain('Ctrl+E');
  });

  it('reset button calls resetToDefaults', async () => {
    const user = userEvent.setup();
    // First modify a binding
    useKeybindingStore.getState().updateBinding('file.open', { key: 'z' });

    render(<KeybindingDialog onClose={onClose} />);

    await user.click(screen.getByTestId('keybinding-reset'));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(useKeybindingStore.getState().getBinding('file.open')!.key).toBe('o');
  });

  it('close button calls onClose', async () => {
    const user = userEvent.setup();
    render(<KeybindingDialog onClose={onClose} />);

    await user.click(screen.getByTestId('keybinding-close'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('clicking a key combo enters listening mode', async () => {
    const user = userEvent.setup();
    render(<KeybindingDialog onClose={onClose} />);

    const combos = screen.getAllByTestId('keybinding-combo');
    await user.click(combos[0]); // Click first binding (Open File)

    expect(combos[0].textContent).toBe('Press a key...');
  });

  it('renders the dialog container with correct test id', () => {
    render(<KeybindingDialog onClose={onClose} />);
    expect(screen.getByTestId('keybinding-dialog')).toBeInTheDocument();
  });
});
