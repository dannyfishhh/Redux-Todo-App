import { ErrorBoundary } from 'react-error-boundary'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { StrictMode } from 'react'

import store from './store/store'
import App from './App'
import './index.css'

const ErrorFallback = () => <div>Something went wrong.</div>;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)
