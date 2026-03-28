import { useState } from 'react';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">DrWrite</h1>
      <p className="text-gray-400 mb-6">Desktop Markdown Editor</p>
      <button
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition-colors"
        onClick={() => setCount((c) => c + 1)}
      >
        Clicked {count} times
      </button>
    </div>
  );
}
