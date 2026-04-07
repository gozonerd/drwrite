interface DiagramErrorProps {
  type: string;
  error: string;
}

export function DiagramError({ type, error }: DiagramErrorProps) {
  return (
    <div className="border border-dw-error/30 rounded p-3 my-2 bg-dw-error/[0.08] text-dw-error text-sm font-mono">
      <div className="font-semibold mb-1">{type} Error</div>
      <pre className="whitespace-pre-wrap text-xs">{error}</pre>
    </div>
  );
}
