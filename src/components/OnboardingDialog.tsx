interface OnboardingDialogProps {
  onClose: () => void;
}

const shortcuts = [
  { keys: 'Ctrl+O', action: 'Open file' },
  { keys: 'Ctrl+S', action: 'Save file' },
  { keys: 'Ctrl+E', action: 'Export to PDF/HTML' },
  { keys: 'Ctrl+F', action: 'Find in editor' },
  { keys: 'Ctrl+K', action: 'Keyboard shortcuts' },
  { keys: 'Ctrl+B', action: 'Toggle file sidebar' },
];

export function OnboardingDialog({ onClose }: OnboardingDialogProps) {
  function handleGotIt() {
    localStorage.setItem('drwrite-onboarded', 'true');
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      data-testid="onboarding-backdrop"
      onClick={onClose}
    >
      <div
        className="rounded-lg shadow-xl p-8 w-[28rem] max-w-[90vw]"
        style={{
          background: 'var(--dw-bg-card)',
          color: 'var(--dw-text-primary)',
          border: '1px solid var(--dw-border)',
        }}
        onClick={(e) => e.stopPropagation()}
        data-testid="onboarding-dialog"
      >
        {/* Header */}
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--dw-primary)' }}>
          DrWrite
        </h1>
        <p className="text-sm mb-4" style={{ color: 'var(--dw-text-secondary)' }}>
          Split-view markdown editor with diagram rendering and print export
        </p>

        {/* Shortcuts table */}
        <h2 className="text-sm font-semibold mb-2" style={{ color: 'var(--dw-text-primary)' }}>
          Keyboard Shortcuts
        </h2>
        <table className="w-full text-sm mb-6" data-testid="onboarding-shortcuts">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--dw-border)' }}>
              <th className="text-left py-1 font-medium" style={{ color: 'var(--dw-text-secondary)' }}>
                Shortcut
              </th>
              <th className="text-left py-1 font-medium" style={{ color: 'var(--dw-text-secondary)' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {shortcuts.map((s) => (
              <tr key={s.keys} style={{ borderBottom: '1px solid var(--dw-border-muted)' }}>
                <td className="py-1">
                  <kbd
                    className="px-1.5 py-0.5 rounded text-xs font-mono"
                    style={{
                      background: 'var(--dw-bg-panel)',
                      border: '1px solid var(--dw-border)',
                      color: 'var(--dw-text-primary)',
                    }}
                  >
                    {s.keys}
                  </kbd>
                </td>
                <td className="py-1" style={{ color: 'var(--dw-text-secondary)' }}>
                  {s.action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Got it button */}
        <button
          type="button"
          onClick={handleGotIt}
          className="w-full py-2 rounded font-medium transition-colors"
          style={{
            background: 'var(--dw-primary)',
            color: 'var(--dw-bg-primary)',
          }}
          data-testid="onboarding-got-it"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
