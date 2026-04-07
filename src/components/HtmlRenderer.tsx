import { useEffect, useRef, useState } from 'react';
import { DiagramError } from './DiagramError';

interface HtmlRendererProps {
  code: string;
  id: string;
}

/**
 * Renders user-provided HTML+JS in a sandboxed iframe.
 * The iframe has no access to the parent window (sandbox attribute).
 * D3.js is injected automatically so users can write D3 visualizations.
 */
export function HtmlRenderer({ code, id }: HtmlRendererProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!iframeRef.current || !code.trim()) return;

    try {
      // Wrap user code in a full HTML document with D3 available
      const htmlDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <style>
    body {
      margin: 0;
      padding: 12px;
      font-family: "Segoe UI", system-ui, sans-serif;
      background: #1e1e2e;
      color: #cdd6f4;
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
    <div className="my-2 border border-gray-200 dark:border-gray-700 rounded overflow-hidden">
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        title={`interactive-${id}`}
        className="w-full border-0"
        style={{ height: '400px', background: '#1e1e2e' }}
      />
    </div>
  );
}
