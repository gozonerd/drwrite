import { useEffect, useState } from 'react';
import { useKeybindingStore, Keybinding } from '../store/keybinding-store';

interface KeybindingDialogProps {
  onClose: () => void;
}

function formatKeyCombo(binding: Keybinding): string {
  const parts: string[] = [];
  if (binding.ctrlKey) parts.push('Ctrl');
  if (binding.shiftKey) parts.push('Shift');
  if (binding.metaKey) parts.push('Meta');
  parts.push(binding.key.toUpperCase());
  return parts.join('+');
}

export function KeybindingDialog({ onClose }: KeybindingDialogProps) {
  const bindings = useKeybindingStore((s) => s.bindings);
  const updateBinding = useKeybindingStore((s) => s.updateBinding);
  const resetToDefaults = useKeybindingStore((s) => s.resetToDefaults);

  const [listeningId, setListeningId] = useState<string | null>(null);

  // Capture keystrokes when in listening mode
  useEffect(() => {
    if (!listeningId) return;

    function handleKeyDown(e: KeyboardEvent) {
      e.preventDefault();
      e.stopPropagation();

      // Ignore standalone modifier keys
      if (['Control', 'Shift', 'Meta', 'Alt'].includes(e.key)) return;

      updateBinding(listeningId!, {
        key: e.key,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        metaKey: e.metaKey,
      });
      setListeningId(null);
    }

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [listeningId, updateBinding]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      data-testid="keybinding-dialog"
    >
      <div className="bg-dw-bg-card border border-dw-border rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-dw-border">
          <h2 className="text-sm font-semibold text-dw-text-primary">Keyboard Shortcuts</h2>
          <button
            type="button"
            className="text-dw-text-muted hover:text-dw-text-primary text-lg leading-none"
            onClick={onClose}
            data-testid="keybinding-close"
          >
            ×
          </button>
        </div>

        {/* Bindings list */}
        <div className="px-4 py-2 max-h-[300px] overflow-y-auto">
          {bindings.map((binding) => (
            <div
              key={binding.id}
              className="flex items-center justify-between py-1.5 border-b border-dw-border last:border-b-0"
              data-testid="keybinding-row"
            >
              <span className="text-xs text-dw-text-primary">{binding.label}</span>
              <button
                type="button"
                className={`px-2 py-0.5 text-xs rounded border transition-colors ${
                  listeningId === binding.id
                    ? 'border-dw-primary bg-dw-primary/10 text-dw-primary animate-pulse'
                    : 'border-dw-border bg-dw-bg-panel text-dw-text-secondary hover:border-dw-primary'
                }`}
                onClick={() => setListeningId(listeningId === binding.id ? null : binding.id)}
                data-testid="keybinding-combo"
              >
                {listeningId === binding.id ? 'Press a key...' : formatKeyCombo(binding)}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between px-4 py-3 border-t border-dw-border">
          <button
            type="button"
            className="px-3 py-1 text-xs text-dw-error hover:bg-dw-bg-panel rounded transition-colors"
            onClick={resetToDefaults}
            data-testid="keybinding-reset"
          >
            Reset to Defaults
          </button>
          <button
            type="button"
            className="px-3 py-1 text-xs text-dw-text-secondary hover:bg-dw-bg-panel rounded transition-colors"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
