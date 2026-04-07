import { useCallback, useEffect, useRef, useState } from 'react';
import { useEditorStore } from '../store/editor-store';
import { SourceEditor } from './SourceEditor';
import { WysiwygEditor } from './WysiwygEditor';
import { Minimap } from './Minimap';

const MIN_PANEL_WIDTH = 200; // px

export function SplitView() {
  const splitRatio = useEditorStore((s) => s.splitRatio);
  const setSplitRatio = useEditorStore((s) => s.setSplitRatio);
  const markdown = useEditorStore((s) => s.markdown);
  const scrollFraction = useEditorStore((s) => s.scrollFraction);
  const setScrollFraction = useEditorStore((s) => s.setScrollFraction);
  const darkMode = useEditorStore((s) => s.darkMode);

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
      {/* Left panel — Source editor with minimap overlay */}
      <div className="relative overflow-auto bg-dw-bg-editor" style={{ width: leftWidth, minWidth: MIN_PANEL_WIDTH }}>
        <SourceEditor />
        <Minimap
          markdown={markdown}
          scrollFraction={scrollFraction}
          onScrollTo={setScrollFraction}
          darkMode={darkMode}
        />
      </div>

      {/* Drag handle */}
      <div
        className={`w-1.5 flex-shrink-0 cursor-col-resize transition-colors ${
          isDragging ? 'bg-dw-handle-active' : 'bg-dw-handle hover:bg-dw-handle-hover'
        }`}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize editor panels"
        tabIndex={0}
      />

      {/* Right panel — WYSIWYG editor */}
      <div className="overflow-auto bg-dw-bg-card" style={{ width: rightWidth, minWidth: MIN_PANEL_WIDTH }}>
        <WysiwygEditor />
      </div>
    </div>
  );
}
