import { Component } from 'react'

/** Catches a render-time crash anywhere in the tree and prints the actual error
 *  on the page. Without this React unmounts everything and you get a blank
 *  window with the reason buried in the console — the worst thing that can
 *  happen while a client is watching. */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[Spice Junction] render failed:', error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <main className="shell section">
        <div className="empty">
          <p className="eyebrow" style={{ color: 'var(--tomato)' }}>Something broke while drawing the page</p>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              background: 'var(--warm-white)',
              border: '2px solid var(--char)',
              borderRadius: '12px',
              padding: '1rem',
              textAlign: 'left',
              font: '13px/1.5 ui-monospace, Consolas, monospace',
            }}
          >
            {String(this.state.error?.stack || this.state.error)}
          </pre>
          <button type="button" className="btn" onClick={() => window.location.reload()}>
            Reload the page
          </button>
        </div>
      </main>
    )
  }
}
