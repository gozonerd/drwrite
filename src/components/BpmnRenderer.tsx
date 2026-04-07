import { useEffect, useRef, useState } from 'react';
import { DiagramError } from './DiagramError';

interface BpmnRendererProps {
  xml: string;
  id: string;
}

export function BpmnRenderer({ xml, id }: BpmnRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<{
    destroy: () => void;
    importXML: (xml: string) => Promise<void>;
    get: (name: string) => unknown;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !xml.trim()) return;

    let cancelled = false;

    async function render() {
      try {
        // Dynamic import to avoid SSR issues and reduce initial bundle
        const { default: BpmnViewer } = await import('bpmn-js');

        if (cancelled || !containerRef.current) return;

        // Clean up previous viewer
        if (viewerRef.current) {
          viewerRef.current.destroy();
        }

        const viewer = new BpmnViewer({
          container: containerRef.current,
        });

        viewerRef.current = viewer;

        await viewer.importXML(xml.trim());

        if (!cancelled) {
          // Zoom to fit the diagram
          const canvas = viewer.get('canvas') as { zoom: (mode: string) => void };
          canvas.zoom('fit-viewport');
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
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [xml, id]);

  if (error) {
    return <DiagramError type="BPMN" error={error} />;
  }

  return (
    <div
      ref={containerRef}
      className="my-2 border border-gray-200 dark:border-gray-700 rounded bg-white"
      style={{ height: '400px', minHeight: '300px' }}
    />
  );
}
