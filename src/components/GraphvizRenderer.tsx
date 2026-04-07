import { useEffect, useRef, useState } from 'react';
import { DiagramError } from './DiagramError';

interface GraphvizRendererProps {
  code: string;
  id: string;
}

export function GraphvizRenderer({ code, id }: GraphvizRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !code.trim()) return;

    let cancelled = false;

    async function render() {
      try {
        const { Graphviz } = await import('@hpcc-js/wasm-graphviz');
        const graphviz = await Graphviz.load();

        if (cancelled || !containerRef.current) return;

        const svg = graphviz.dot(code.trim());
        containerRef.current.innerHTML = svg;
        setError(null);
        setLoading(false);
      } catch (err) {
        if (!cancelled) {
          setError(String(err));
          setLoading(false);
        }
      }
    }

    setLoading(true);
    render();

    return () => {
      cancelled = true;
    };
  }, [code, id]);

  if (error) {
    return <DiagramError type="Graphviz" error={error} />;
  }

  return (
    <div className="my-2 flex justify-center overflow-x-auto">
      {loading && <div className="text-gray-400 text-sm py-4">Rendering Graphviz...</div>}
      <div ref={containerRef} style={{ display: loading ? 'none' : 'block' }} />
    </div>
  );
}
