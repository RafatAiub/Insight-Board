import type { Metric, Adjustment, DataPoint } from './types';

/**
 * Calculates the new value based on an adjustment.
 */
export function applyAdjustment(value: number, adjustment: Adjustment): number {
  switch (adjustment.type) {
    case 'growth_delta':
      // e.g. value 100, delta 0.12 (12%) -> 100 * (1 + 0.12) = 112
      return value * (1 + adjustment.value);
    case 'fixed_value':
      return adjustment.value;
    case 'percentage_of':
      // e.g. value 100, factor 0.5 -> 50
      return value * adjustment.value;
    default:
      const _exhaustiveCheck: never = adjustment.type;
      return value;
  }
}

/**
 * Applies a list of adjustments to a metric's baseline value.
 * Currently assumes one adjustment per metric per scenario for simplicity,
 * but designed to handle ordered list if needed.
 */
export function calculateSimulatedValue(
  metric: Metric,
  adjustments: ReadonlyArray<Adjustment>
): number {
  const specificSub = adjustments.find(a => a.metricId === metric.id);
  if (!specificSub) return metric.baselineValue;

  return applyAdjustment(metric.baselineValue, specificSub);
}

/**
 * Applies adjustments to the entire history of a metric.
 */
export function simulateHistory(
  history: ReadonlyArray<DataPoint>,
  adjustment?: Adjustment
): ReadonlyArray<DataPoint> {
  if (!adjustment) return history;

  return history.map(point => ({
    ...point,
    value: applyAdjustment(point.value, adjustment)
  }));
}

/**
 * Calculates the percentage delta between base and simulated.
 * Returns decimal (e.g. 0.15 for 15%).
 */
export function calculateDelta(base: number, simulated: number): number {
  if (base === 0) return 0;
  return (simulated - base) / base;
}

/**
 * Formats a number as currency or percentage based on type.
 */
export function formatMetricValue(value: number, type: Metric['type'], currency = 'USD'): string {
  switch (type) {
    case 'currency':
      return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
    case 'percentage':
      return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 }).format(value / 100);
    case 'number':
      return new Intl.NumberFormat('en-US').format(value);
      default:
        return String(value);
  }
}
