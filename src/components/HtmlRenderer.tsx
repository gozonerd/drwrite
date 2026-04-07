import { useEffect, useRef, useState } from 'react';
import { DiagramError } from './DiagramError';

// Import D3.js source as a raw string for offline bundling
// Vite handles ?raw imports — the D3 source gets inlined at build time
// eslint-disable-next-line import/no-unresolved
import d3Source from 'd3/dist/d3.min.js?raw';

interface HtmlRendererProps {
  code: string;
  id: string;
}

/**
 * Renders user-provided HTML+JS in a sandboxed iframe.
 * The iframe has no access to the parent window (sandbox attribute).
 * D3.js is bundled locally (not loaded from CDN) for offline support.
 */
export function HtmlRenderer({ code, id }: HtmlRendererProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!iframeRef.current || !code.trim()) return;

    try {
      // Wrap user code in a full HTML document with D3 bundled inline
      const htmlDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script>${d3Source}</script>
  <style>
    body {
      margin: 0;
      padding: 12px;
      font-family: "Segoe UI", system-ui, sans-serif;
      background: var(--dw-bg-primary, #1e1e2e);
      color: var(--dw-text-primary, #cdd6f4);
      overflow: auto;
    }
    svg {
      max-width: 100%;
      height: auto;
    }
  </style>
</head>
<body>
${code.trim()}
</body>
</html>`;

      const blob = new Blob([htmlDoc], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      iframeRef.current.src = url;
      setError(null);

      return () => {
        URL.revokeObjectURL(url);
      };
    } catch (err) {
      setError(String(err));
    }
  }, [code, id]);

  if (error) {
    return <DiagramError type="HTML" error={error} />;
  }

  return (
    <div className="my-2 border border-dw-border rounded overflow-hidden">
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        title={`interactive-${id}`}
        className="w-full border-0"
        style={{ height: '400px', background: 'var(--dw-bg-primary, #1e1e2e)' }}
      />
    </div>
  );
}
