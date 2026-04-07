import { useEffect, useState } from 'react';
import plantumlEncoder from 'plantuml-encoder';
import { DiagramError } from './DiagramError';

interface PlantUmlRendererProps {
  code: string;
  id: string;
}

const PLANTUML_SERVER = 'https://www.plantuml.com/plantuml/svg';

export function PlantUmlRenderer({ code, id }: PlantUmlRendererProps) {
  const [svgUrl, setSvgUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code.trim()) return;

    try {
      const encoded = plantumlEncoder.encode(code.trim());
      const url = `${PLANTUML_SERVER}/${encoded}`;
      setSvgUrl(url);
      setError(null);
      setLoading(true);
    } catch (err) {
      setError(String(err));
      setLoading(false);
    }
  }, [code, id]);

  if (error) {
    return <DiagramError type="PlantUML" error={error} />;
  }

  return (
    <div className="my-2 flex justify-center overflow-x-auto">
      {loading && <div className="text-gray-400 text-sm py-4">Rendering PlantUML...</div>}
      {svgUrl && (
        <img
          src={svgUrl}
          alt="PlantUML diagram"
          className="max-w-full"
          style={{ display: loading ? 'none' : 'block', background: '#fff', borderRadius: '4px', padding: '8px' }}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError('Failed to render PlantUML diagram. Check syntax or network connection.');
            setLoading(false);
          }}
        />
      )}
    </div>
  );
}
