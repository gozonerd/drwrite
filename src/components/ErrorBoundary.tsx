import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-8">
          <div className="max-w-lg w-full border border-red-300 dark:border-red-700 rounded-lg p-6 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300">
            <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
            <p className="text-sm mb-4">The application encountered an unexpected error. Try reloading the window.</p>
            {this.state.error && (
              <pre className="whitespace-pre-wrap text-xs font-mono bg-red-100 dark:bg-red-900 rounded p-3 overflow-auto max-h-48">
                {this.state.error.message}
              </pre>
            )}
            <button
              className="mt-4 px-4 py-2 text-sm font-medium rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
