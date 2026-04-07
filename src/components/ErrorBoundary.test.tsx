import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

function Bomb(): JSX.Element {
  throw new Error('kaboom');
  return null as never;
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => { /* noop */ });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Hello World</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('shows fallback UI when child throws during render', () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows error message in fallback', () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    );
    expect(screen.getByText('kaboom')).toBeInTheDocument();
  });

  it('shows reload button in fallback', () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    );
    expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
  });

  it('catches the error', () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    );
    expect(console.error).toHaveBeenCalled();
  });

  it('reload button calls window.location.reload', () => {
    // Mock window.location.reload
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...window.location, reload: reloadMock },
    });

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    );

    const reloadButton = screen.getByRole('button', { name: 'Reload' });
    reloadButton.click();

    expect(reloadMock).toHaveBeenCalled();
  });
});
