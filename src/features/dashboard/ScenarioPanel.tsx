import { useAppActions } from '../../hooks/useAppActions';
import { useAppState } from '../../state/context';
import { useSimulation } from '../../hooks/useSimulation';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { SlidersHorizontal } from 'lucide-react';

import type { Scenario, Metric } from '../../domain/types'; 

export function ScenarioPanel() {
  const { setScenario, updateAdjustment, resetSimulation } = useAppActions();
  const { data, simulation } = useAppState();
  const { activeScenarioId } = useSimulation();

  if (!data) return null;

  return (
    <div className="space-y-6">
       <Card>
         <CardHeader>
           <CardTitle className="flex items-center gap-2">
             <SlidersHorizontal className="h-4 w-4" />
             Scenario Builder
           </CardTitle>
         </CardHeader>
         <CardContent className="space-y-4">
            
            {/* Scenario Selector */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">Pre-defined Scenarios</label>
                <div className="flex flex-col gap-2">
                    <Button 
                        variant={activeScenarioId === null ? "secondary" : "ghost"}
                        className="justify-start"
                        onClick={() => setScenario(null)}
                    >
                        None (Baseline)
                    </Button>
                    {data.scenarios.map((scenario: Scenario) => (
                         <Button 
                            key={scenario.id}
                            variant={activeScenarioId === scenario.id ? "primary" : "outline"}
                            className="justify-start text-left"
                            onClick={() => setScenario(scenario.id)}
                         >
                            <div className="flex flex-col items-start">
                                <span>{scenario.name}</span>
                                <span className="text-[10px] opacity-70 font-normal truncate max-w-[200px]">
                                    {scenario.description}
                                </span>
                            </div>
                         </Button>
                    ))}
                </div>
            </div>

            <div className="h-px bg-neutral-800 my-4" />

            {/* Custom Overrides */}
            {activeScenarioId && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-neutral-400">Variable Tuning</label>
                        <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={resetSimulation}>
                            Reset
                        </Button>
                    </div>
                
                    <p className="text-xs text-neutral-500">
                        Adjust generic growth factors. In a real app, these would be specific to the scenario.
                    </p>

                    {/* Hacky demo: Show sliders for top 3 metrics to override their growth */}
                    {data.metrics.slice(0, 3).map((metric: Metric) => {
                        // Find current adjustment
                        const currentAdj = simulation.customAdjustments[metric.id];
                        // Or simplify: just assume we are adjusting growth delta
                         const val = currentAdj?.value ?? 0;
                         // Display as percentage
                         const displayVal = Math.round(val * 100);

                         return (
                            <div key={metric.id} className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span>{metric.name} Growth</span>
                                    <span className={val !== 0 ? "text-blue-400" : "text-neutral-500"}>
                                        {val > 0 ? '+' : ''}{displayVal}%
                                    </span>
                                </div>
                                <input 
                                    type="range"
                                    min="-50"
                                    max="50"
                                    step="1"
                                    value={displayVal}
                                    className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                                    onChange={(e) => {
                                        const newValue = parseInt(e.target.value) / 100;
                                        updateAdjustment({
                                            metricId: metric.id,
                                            type: 'growth_delta',
                                            value: newValue
                                        });
                                    }}
                                />
                            </div>
                         )
                    })}
                </div>
            )}
         </CardContent>
       </Card>
    </div>
  );
}
