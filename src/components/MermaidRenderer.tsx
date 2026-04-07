import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { DiagramError } from './DiagramError';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: '"Segoe UI", system-ui, sans-serif',
});

interface MermaidRendererProps {
  code: string;
  id: string;
}

export function MermaidRenderer({ code, id }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !code.trim()) return;

    let cancelled = false;

    async function render() {
      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, code.trim());
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(String(err));
        }
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [code, id]);

  if (error) {
    return <DiagramError type="Mermaid" error={error} />;
  }

  return (
    <div
      ref={containerRef}
      className="my-2 flex justify-center overflow-x-auto"
    />
  );
}
