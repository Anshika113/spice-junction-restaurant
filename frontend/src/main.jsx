import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './styles/global.css'

const container = document.getElementById('root')
if (!container) {
  document.body.innerHTML = '<p style="font:15px Inter,sans-serif;padding:2rem">index.html has no &lt;div id="root"&gt;.</p>'
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
