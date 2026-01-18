import type { AppData, ScenarioID, Adjustment } from '../domain/types';

export interface SimulationState {
  activeScenarioId: ScenarioID | null;
  // User overrides: Map of metricId -> Adjustment
  // These override the scenario's default adjustments if present
  customAdjustments: Record<string, Adjustment>; 
}

export interface AppState {
  status: 'idle' | 'loading' | 'error' | 'success';
  error: string | null;
  data: AppData | null;
  
  // The current editable state of the simulation
  simulation: SimulationState;
  
  // History for Undo/Redo (stores snapshots of SimulationState)
  past: SimulationState[];
  future: SimulationState[];
}

export const INITIAL_STATE: AppState = {
  status: 'idle',
  error: null,
  data: null,
  simulation: {
    activeScenarioId: null,
    customAdjustments: {},
  },
  past: [],
  future: [],
};
