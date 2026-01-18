import { AppProvider } from './state/context';
import { Dashboard } from './features/dashboard/Dashboard';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
        <AppProvider>
            <Dashboard />
        </AppProvider>
    </ErrorBoundary>
  )
}

export default App
