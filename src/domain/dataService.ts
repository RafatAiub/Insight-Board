import type { Metric, Scenario, AppConfig, AppData } from './types';
import metricsData from '../data/metrics.json';
import scenariosData from '../data/scenarios.json';
import configData from '../data/config.json';

// Simulated delay to mimic network request
const SIMULATED_DELAY_MS = 800;
const SHOULD_ERROR = false; // Toggle for testing error boundaries

/**
 * Simulates fetching data from an API.
 */
export async function fetchData(): Promise<AppData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (SHOULD_ERROR) {
        reject(new Error("Failed to fetch data from data engine."));
        return;
      }

      // In a real app, we would validate the JSON schema here (e.g. using Zod)
      // For now, we cast assuming the mock data matches the types.
      const data: AppData = {
        metrics: metricsData as unknown as ReadonlyArray<Metric>,
        scenarios: scenariosData as unknown as ReadonlyArray<Scenario>,
        config: configData as AppConfig
      };

      resolve(data);
    }, SIMULATED_DELAY_MS);
  });
}
