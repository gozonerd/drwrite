import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { DiagramError } from './DiagramError';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: '"Inter", system-ui, sans-serif',
  themeVariables: {
    primaryColor: '#4ec9b0',
    primaryTextColor: '#e6edf3',
    primaryBorderColor: '#4ec9b0',
    lineColor: '#8b949e',
    secondaryColor: '#1c2128',
    tertiaryColor: '#161b22',
    background: '#0d1117',
    mainBkg: '#1c2128',
    nodeBorder: '#4ec9b0',
    clusterBkg: '#161b22',
    clusterBorder: '#30363d',
    titleColor: '#e6edf3',
    edgeLabelBackground: '#161b22',
  },
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
