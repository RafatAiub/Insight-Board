import { useCallback } from 'react';
import { useAppDispatch } from '../state/context';
import type { Adjustment, ScenarioID } from '../domain/types';
import { getData } from '../domain/dataService';

export function useAppActions() {
  const dispatch = useAppDispatch();

  const loadData = useCallback(() => {
    dispatch({ type: 'INIT_LOAD' });
    try {
      const data = getData();
      dispatch({ type: 'LOAD_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'LOAD_ERROR', payload: err instanceof Error ? err.message : 'Unknown error' });
    }
  }, [dispatch]);

  const setScenario = useCallback((scenarioId: ScenarioID | null) => {
    dispatch({ type: 'SET_SCENARIO', payload: scenarioId });
  }, [dispatch]);

  const updateAdjustment = useCallback((adjustment: Adjustment) => {
    dispatch({ type: 'UPDATE_ADJUSTMENT', payload: adjustment });
  }, [dispatch]);

  const resetSimulation = useCallback(() => {
      dispatch({ type: 'RESET_SIMULATION' });
  }, [dispatch]);

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, [dispatch]);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, [dispatch]);

  return {
    loadData,
    setScenario,
    updateAdjustment,
    resetSimulation,
    undo,
    redo,
  };
}
