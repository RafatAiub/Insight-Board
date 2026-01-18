import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react';
import { INITIAL_STATE, type AppState } from './types';
import type { Action } from './actions';
import { appReducer } from './reducer';

// Create Contexts
// We separate State and Dispatch to optimize renders if needed (standard pattern)
const StateContext = createContext<AppState | null>(null);
const DispatchContext = createContext<Dispatch<Action> | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  // In high-perf apps, you might memoize these, but here reference stability of dispatch is guaranteed by React
  // value={state} will cause consumers to rerender on any state change. 
  // We'll use selectors in hooks to mitigate this optimization need.

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// Low-level hooks (internal usage or primarily for the generic hook)
export function useAppState() {
    const context = useContext(StateContext);
    if (!context) throw new Error('useAppState must be used within AppProvider');
    return context;
}

export function useAppDispatch() {
    const context = useContext(DispatchContext);
    if (!context) throw new Error('useAppDispatch must be used within AppProvider');
    return context;
}
