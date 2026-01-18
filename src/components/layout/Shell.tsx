import type { ReactNode } from 'react';
import { BarChart3, Settings, History, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

interface ShellProps {
  children: ReactNode;
  title?: string;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export function Shell({ children, title = 'InsightBoard', onUndo, onRedo, canUndo, canRedo }: ShellProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-100">{title}</h1>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex items-center gap-1 border-r border-neutral-800 pr-4 mr-1">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={onUndo} 
                    disabled={!canUndo}
                    title="Undo (Ctrl+Z)"
                >
                    <RotateCcw className="h-4 w-4" />
                </Button>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={onRedo} 
                    disabled={!canRedo}
                    title="Redo (Ctrl+Shift+Z)"
                >
                    <History className="h-4 w-4 transform scale-x-[-1]" />
                </Button>
             </div>
            
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 overflow-hidden rounded-full bg-neutral-800 ring-2 ring-neutral-800 transition-all hover:ring-neutral-700">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:px-6">
        {children}
      </main>
    </div>
  );
}
