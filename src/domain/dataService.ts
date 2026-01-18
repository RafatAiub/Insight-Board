import type { Metric, Scenario, AppConfig, AppData } from './types';
import metricsData from '../data/metrics.json';
import scenariosData from '../data/scenarios.json';
import configData from '../data/config.json';

/**
 * Returns the application data.
 * In a real app, this would be an async API call.
 * For this demo, we're using imported JSON files directly.
 */
export function getData(): AppData {
  // Cast the imported JSON to our types
  const data: AppData = {
    metrics: metricsData as unknown as ReadonlyArray<Metric>,
    scenarios: scenariosData as unknown as ReadonlyArray<Scenario>,
    config: configData as unknown as AppConfig
  };

  return data;
}
