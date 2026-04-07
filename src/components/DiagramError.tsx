interface DiagramErrorProps {
  type: string;
  error: string;
}

export function DiagramError({ type, error }: DiagramErrorProps) {
  return (
    <div className="border border-red-300 dark:border-red-700 rounded p-3 my-2 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 text-sm font-mono">
      <div className="font-semibold mb-1">{type} Error</div>
      <pre className="whitespace-pre-wrap text-xs">{error}</pre>
    </div>
  );
}
