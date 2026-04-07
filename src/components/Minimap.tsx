import { useCallback, useEffect, useRef, useState } from 'react';

export interface MinimapProps {
  markdown: string;
  scrollFraction: number;
  onScrollTo: (fraction: number) => void;
  darkMode: boolean;
}

/**
 * A minimap overlay for the source editor pane.
 * Renders the document at a tiny font size with a draggable viewport indicator.
 */
export function Minimap({ markdown, scrollFraction, onScrollTo, darkMode }: MinimapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  /** Convert a mouse Y position (relative to container) into a scroll fraction. */
  const yToFraction = useCallback(
    (clientY: number) => {
      const container = containerRef.current;
      if (!container) return 0;
      const rect = container.getBoundingClientRect();
      const y = clientY - rect.top;
      return Math.max(0, Math.min(1, y / rect.height));
    },
    [],
  );

  /** Click anywhere on the minimap to jump to that position. */
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      onScrollTo(yToFraction(e.clientY));
    },
    [onScrollTo, yToFraction],
  );

  /** Start dragging the viewport indicator. */
  const handleViewportMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation(); // Don't trigger the container click
      e.preventDefault();
      setIsDragging(true);
    },
    [],
  );

  // Global mousemove/mouseup during drag
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      onScrollTo(yToFraction(e.clientY));
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
  }, [isDragging, onScrollTo, yToFraction]);

  // Calculate viewport indicator position and height
  const viewportHeight = containerRef.current && contentRef.current
    ? Math.max(
        10,
        (containerRef.current.clientHeight / Math.max(contentRef.current.scrollHeight, 1)) *
          containerRef.current.clientHeight,
      )
    : 30; // fallback

  const maxTop = containerRef.current
    ? containerRef.current.clientHeight - viewportHeight
    : 0;
  const viewportTop = scrollFraction * maxTop;

  // Text color varies by dark mode
  const textColor = darkMode
    ? 'rgba(230, 237, 243, 0.4)'
    : 'rgba(36, 41, 46, 0.35)';

  return (
    <div
      ref={containerRef}
      className="minimap"
      onClick={handleClick}
      data-testid="minimap"
    >
      {/* Tiny text rendering of the document */}
      <div
        ref={contentRef}
        className="minimap-content"
        style={{ color: textColor }}
        data-testid="minimap-content"
      >
        {markdown}
      </div>

      {/* Viewport indicator rectangle */}
      <div
        className="minimap-viewport"
        style={{
          top: `${viewportTop}px`,
          height: `${viewportHeight}px`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleViewportMouseDown}
        data-testid="minimap-viewport"
      />
    </div>
  );
}
