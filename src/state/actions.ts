import type { AppData, ScenarioID, Adjustment } from '../domain/types';

export type Action =
  | { type: 'INIT_LOAD' }
  | { type: 'LOAD_SUCCESS'; payload: AppData }
  | { type: 'LOAD_ERROR'; payload: string }
  | { type: 'SET_SCENARIO'; payload: ScenarioID | null }
  | { type: 'UPDATE_ADJUSTMENT'; payload: Adjustment }
  | { type: 'RESET_SIMULATION' }
  | { type: 'UNDO' }
  | { type: 'REDO' };
