import { useState } from 'react';
import { DEFAULT_EXPORT_SETTINGS, ExportSettings } from '../utils/export-html';

interface ExportDialogProps {
  onExportPdf: (settings: ExportSettings) => void;
  onExportHtml: (settings: ExportSettings) => void;
  onClose: () => void;
}

export function ExportDialog({ onExportPdf, onExportHtml, onClose }: ExportDialogProps) {
  const [settings, setSettings] = useState<ExportSettings>(() => {
    const stored = localStorage.getItem('drwrite-export-settings');
    return stored ? { ...DEFAULT_EXPORT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_EXPORT_SETTINGS;
  });

  function update<K extends keyof ExportSettings>(key: K, value: ExportSettings[K]) {
    const next = { ...settings, [key]: value };
    setSettings(next);
    localStorage.setItem('drwrite-export-settings', JSON.stringify(next));
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-dw-bg-card rounded-lg shadow-xl p-6 w-96 max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4 text-dw-text-primary">Export Settings</h2>

        {/* Font Size */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-dw-text-secondary mb-1">
            Font Size: {settings.fontSize}px
          </label>
          <input
            type="range"
            min="10"
            max="24"
            step="1"
            value={settings.fontSize}
            onChange={(e) => update('fontSize', Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-dw-text-muted">
            <span>10px</span>
            <span>24px</span>
          </div>
        </div>

        {/* Margins */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-dw-text-secondary mb-2">
            Margins (inches)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['marginTop', 'marginBottom', 'marginLeft', 'marginRight'] as const).map((key) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-xs text-dw-text-secondary w-14">
                  {key.replace('margin', '')}
                </span>
                <input
                  type="number"
                  min="0"
                  max="3"
                  step="0.25"
                  value={settings[key]}
                  onChange={(e) => update(key, Number(e.target.value))}
                  className="w-full px-2 py-1 text-sm rounded border border-dw-border bg-dw-bg-panel text-dw-text-primary"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Font Family */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-dw-text-secondary mb-1">
            Font Family
          </label>
          <select
            value={settings.fontFamily}
            onChange={(e) => update('fontFamily', e.target.value)}
            className="w-full px-2 py-1 text-sm rounded border border-dw-border bg-dw-bg-panel text-dw-text-primary"
          >
            <option value='"Segoe UI", "Helvetica Neue", Arial, sans-serif'>Segoe UI (Default)</option>
            <option value='"Georgia", "Times New Roman", serif'>Georgia (Serif)</option>
            <option value='"Fira Code", "Cascadia Code", monospace'>Fira Code (Mono)</option>
            <option value='"Calibri", "Helvetica", sans-serif'>Calibri</option>
            <option value='"Cambria", "Georgia", serif'>Cambria</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onExportPdf(settings)}
            className="flex-1 px-3 py-2 text-sm font-medium rounded bg-dw-primary text-dw-bg-primary hover:bg-dw-primary-hover transition-colors"
          >
            Export PDF
          </button>
          <button
            onClick={() => onExportHtml(settings)}
            className="flex-1 px-3 py-2 text-sm font-medium rounded bg-dw-secondary text-dw-bg-primary hover:bg-dw-secondary transition-colors"
          >
            Export HTML
          </button>
          <button
            onClick={onClose}
            className="px-3 py-2 text-sm rounded border border-dw-border text-dw-text-secondary hover:bg-dw-bg-panel transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
