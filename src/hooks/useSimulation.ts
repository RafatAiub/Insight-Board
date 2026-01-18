import { useMemo } from 'react';
import { useAppState } from '../state/context';
import { calculateSimulatedValue, calculateDelta, simulateHistory } from '../domain/utils';
import type { Metric, Adjustment, MetricID } from '../domain/types';

export interface SimulatedMetric extends Metric {
  simulatedValue: number;
  delta: number; // percentage change
  isModified: boolean;
  simulatedHistory: Metric['history']; 
}

export function useSimulation() {
  const { data, simulation } = useAppState();

  const metrics = useMemo(() => {
    if (!data) return [];

    // 1. Resolve effective adjustments
    // Scenario adjustments are baseline
    const scenario = data.scenarios.find(s => s.id === simulation.activeScenarioId);
    const scenarioAdjustments = scenario ? scenario.adjustments : [];

    // Custom adjustments override scenario adjustments for the same metric
    // We create a map for O(1) lookup
    const adjustmentMap = new Map<MetricID, Adjustment>();

    // Apply scenario first
    scenarioAdjustments.forEach(adj => adjustmentMap.set(adj.metricId, adj));

    // Apply custom overrides
    Object.values(simulation.customAdjustments).forEach(adj => {
      adjustmentMap.set(adj.metricId, adj);
    });

    // 2. Compute simulated values
    return data.metrics.map((metric): SimulatedMetric => {
      const adjustment = adjustmentMap.get(metric.id);
      
      const simulatedValue = adjustment 
        ? calculateSimulatedValue(metric, [adjustment]) 
        : metric.baselineValue;
        
      const delta = calculateDelta(metric.baselineValue, simulatedValue);
      const isModified = adjustment !== undefined && delta !== 0;

      const simulatedHistory = simulateHistory(metric.history, adjustment);

      return {
        ...metric,
        simulatedValue,
        simulatedHistory,
        delta,
        isModified,
      };
    });
  }, [data, simulation.activeScenarioId, simulation.customAdjustments]);

  return {
    metrics,
    activeScenarioId: simulation.activeScenarioId,
    hasChanges: Object.keys(simulation.customAdjustments).length > 0 || simulation.activeScenarioId !== null
  };
}
