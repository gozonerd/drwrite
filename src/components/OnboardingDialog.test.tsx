import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OnboardingDialog } from './OnboardingDialog';

describe('OnboardingDialog', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockReset();
    localStorage.clear();
  });

  it('renders dialog with DrWrite title', () => {
    render(<OnboardingDialog onClose={onClose} />);
    expect(screen.getByText('DrWrite')).toBeInTheDocument();
  });

  it('renders the app description', () => {
    render(<OnboardingDialog onClose={onClose} />);
    expect(
      screen.getByText('Split-view markdown editor with diagram rendering and print export'),
    ).toBeInTheDocument();
  });

  it('renders keyboard shortcuts table with all entries', () => {
    render(<OnboardingDialog onClose={onClose} />);
    expect(screen.getByTestId('onboarding-shortcuts')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+O')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+E')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+F')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+K')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+B')).toBeInTheDocument();
  });

  it('renders shortcut action labels', () => {
    render(<OnboardingDialog onClose={onClose} />);
    expect(screen.getByText('Open file')).toBeInTheDocument();
    expect(screen.getByText('Save file')).toBeInTheDocument();
    expect(screen.getByText('Export to PDF/HTML')).toBeInTheDocument();
    expect(screen.getByText('Find in editor')).toBeInTheDocument();
    expect(screen.getByText('Keyboard shortcuts')).toBeInTheDocument();
    expect(screen.getByText('Toggle file sidebar')).toBeInTheDocument();
  });

  it('"Got it" button calls onClose and sets localStorage flag', async () => {
    const user = userEvent.setup();
    render(<OnboardingDialog onClose={onClose} />);

    const gotIt = screen.getByTestId('onboarding-got-it');
    expect(gotIt).toHaveTextContent('Got it');

    await user.click(gotIt);

    expect(localStorage.getItem('drwrite-onboarded')).toBe('true');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('clicking the backdrop calls onClose', async () => {
    const user = userEvent.setup();
    render(<OnboardingDialog onClose={onClose} />);

    const backdrop = screen.getByTestId('onboarding-backdrop');
    await user.click(backdrop);

    expect(onClose).toHaveBeenCalled();
  });

  it('clicking inside the dialog does not call onClose', async () => {
    const user = userEvent.setup();
    render(<OnboardingDialog onClose={onClose} />);

    const dialog = screen.getByTestId('onboarding-dialog');
    await user.click(dialog);

    expect(onClose).not.toHaveBeenCalled();
  });
});
