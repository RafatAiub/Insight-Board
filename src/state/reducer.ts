import type { Action } from './actions';
import type { AppState } from './types';

function pushHistory(state: AppState): AppState {
  // Limit history size to 50
  const newPast = [...state.past, state.simulation].slice(-50);
  return {
    ...state,
    past: newPast,
    future: [], // Clear future on new action
  };
}

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'INIT_LOAD':
      return { ...state, status: 'loading', error: null };

    case 'LOAD_SUCCESS':
      return {
        ...state,
        status: 'success',
        data: action.payload,
        // Reset simulation on new data load if needed, or keep it. Let's keep it clean.
        simulation: {
          activeScenarioId: action.payload.config.defaultScenarioId || null,
          customAdjustments: {},
        },
        past: [],
        future: [],
      };

    case 'LOAD_ERROR':
      return { ...state, status: 'error', error: action.payload };

    case 'SET_SCENARIO': {
      if (state.simulation.activeScenarioId === action.payload) return state;
      
      const newState = pushHistory(state);
      return {
        ...newState,
        simulation: {
          ...newState.simulation,
          activeScenarioId: action.payload,
          // We could choose to clear custom adjustments or keep them. 
          // Let's clear them to show the pure scenario state first.
          customAdjustments: {}, 
        },
      };
    }

    case 'UPDATE_ADJUSTMENT': {
      const newState = pushHistory(state);
      return {
        ...newState,
        simulation: {
          ...newState.simulation,
          customAdjustments: {
            ...newState.simulation.customAdjustments,
            [action.payload.metricId]: action.payload,
          },
        },
      };
    }

    case 'RESET_SIMULATION': {
        const newState = pushHistory(state);
        return {
            ...newState,
            simulation: {
                activeScenarioId: null,
                customAdjustments: {}
            }
        }
    }

    case 'UNDO': {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);
      
      return {
        ...state,
        past: newPast,
        future: [state.simulation, ...state.future],
        simulation: previous,
      };
    }

    case 'REDO': {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);

      return {
        ...state,
        past: [...state.past, state.simulation],
        future: newFuture,
        simulation: next,
      };
    }

    default:
      return state;
  }
}
