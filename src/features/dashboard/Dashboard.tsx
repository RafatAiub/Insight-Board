import { useEffect } from 'react';
import { useAppActions } from '../../hooks/useAppActions';
import { useAppState } from '../../state/context';
import { useSimulation } from '../../hooks/useSimulation';
import { Shell } from '../../components/layout/Shell';
import { MetricCard } from './MetricCard';
import { Button } from '../../components/ui/Button';
import { Loader2, RefreshCcw } from 'lucide-react';
import { ScenarioPanel } from './ScenarioPanel';
import { RevenueChart } from './RevenueChart';
import { CustomerGrowthChart } from './CustomerGrowthChart';
import { ChurnAnalysisChart } from './ChurnAnalysisChart';

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
      
      
      {/* Charts Section */}
      <div className="mt-8 grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4">
          <RevenueChart scenarioMultiplier={hasChanges ? 1.1 : 1} />
        </div>
        <div className="md:col-span-3">
          <ScenarioPanel />
        </div>
      </div>

      {/* Additional Charts */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <CustomerGrowthChart scenarioMultiplier={hasChanges ? 1.05 : 1} />
        <ChurnAnalysisChart scenarioMultiplier={hasChanges ? 1.15 : 1} />
      </div>
    </Shell>
  );
}
