import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-4 text-center text-neutral-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-900/20 mb-6">
                <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-neutral-400 max-w-md mb-8">
            An unexpected error occurred in the simulation engine.
          </p>
          <div className="flex gap-4">
              <Button onClick={() => window.location.reload()}>
                Reload Page
              </Button>
              <Button variant="ghost" onClick={() => this.setState({ hasError: false, error: null })}>
                Try Again
              </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
