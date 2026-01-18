import { useEffect } from 'react';
import { useAppActions } from '../../hooks/useAppActions';
import { useAppState } from '../../state/context';
import { useSimulation } from '../../hooks/useSimulation';
import { Shell } from '../../components/layout/Shell';
import { MetricCard } from './MetricCard';
import { Button } from '../../components/ui/Button';
import { Loader2, RefreshCcw } from 'lucide-react';
import { ScenarioPanel } from './ScenarioPanel';

export function Dashboard() {
  const { loadData, redo, undo } = useAppActions();
  const { status, error, past, future } = useAppState();
  const { metrics, hasChanges } = useSimulation();

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-950 text-neutral-400">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-neutral-950 text-neutral-400 gap-4">
        <p className="text-red-400">Error: {error}</p>
        <Button onClick={loadData}>Retry</Button>
      </div>
    );
  }

  return (
    <Shell 
        onUndo={undo} 
        onRedo={redo} 
        canUndo={past.length > 0} 
        canRedo={future.length > 0}
    >
        <div className="mb-8 flex items-center justify-between">
            <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Executive Summary</h2>
                <p className="text-neutral-400">
                    {hasChanges 
                        ? "Simulating scenarios. Values are projected." 
                        : "Viewing actuals based on latest data snapshot."}
                </p>
            </div>
            
             {/* We will add Scenario Actions here later */}
             <Button variant="outline" size="sm" onClick={loadData}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Refresh Data
             </Button>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard 
            key={metric.id} 
            metric={metric} 
            onClick={() => console.log('Clicked metric', metric.name)}
          />
        ))}
      </div>
      
      {/* We will add charts and scenario builder in the next rows */}
      <div className="mt-8 grid gap-4 md:grid-cols-7">
        <div className="md:col-span-4 rounded-xl border border-neutral-800 bg-neutral-900/30 p-6 min-h-[400px]">
            <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
            <div className="flex items-center justify-center h-full text-neutral-500">
                Chart Placeholder
            </div>
        </div>
        <div className="md:col-span-3 rounded-xl min-h-[400px]">
             <ScenarioPanel />
        </div>
      </div>
    </Shell>
  );
}
