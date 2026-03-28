import { useCallback, useEffect, useRef, useState } from 'react';
import { useEditorStore } from '../store/editor-store';
import { SourceEditor } from './SourceEditor';

const MIN_PANEL_WIDTH = 200; // px

export function SplitView() {
  const splitRatio = useEditorStore((s) => s.splitRatio);
  const setSplitRatio = useEditorStore((s) => s.setSplitRatio);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDoubleClick = useCallback(() => {
    setSplitRatio(0.5);
  }, [setSplitRatio]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerWidth = rect.width;
      const mouseX = e.clientX - rect.left;

      // Enforce minimum panel widths
      const minRatio = MIN_PANEL_WIDTH / containerWidth;
      const maxRatio = 1 - minRatio;
      const newRatio = Math.max(minRatio, Math.min(maxRatio, mouseX / containerWidth));

      setSplitRatio(newRatio);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, setSplitRatio]);

  const leftWidth = `${splitRatio * 100}%`;
  const rightWidth = `${(1 - splitRatio) * 100}%`;

  return (
    <div
      ref={containerRef}
      className="flex flex-1 overflow-hidden"
      style={{ cursor: isDragging ? 'col-resize' : undefined }}
    >
      {/* Left panel — WYSIWYG editor */}
      <div
        className="overflow-auto bg-white dark:bg-gray-900"
        style={{ width: leftWidth, minWidth: MIN_PANEL_WIDTH }}
      >
        <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
          WYSIWYG Editor (TipTap) — Step 4
        </div>
      </div>

      {/* Drag handle */}
      <div
        className={`w-1.5 flex-shrink-0 cursor-col-resize transition-colors ${
          isDragging
            ? 'bg-blue-500'
            : 'bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-500'
        }`}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize editor panels"
        tabIndex={0}
      />

      {/* Right panel — Source editor */}
      <div
        className="overflow-auto bg-gray-50 dark:bg-gray-950"
        style={{ width: rightWidth, minWidth: MIN_PANEL_WIDTH }}
      >
        <SourceEditor />
      </div>
    </div>
  );
}
