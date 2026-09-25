import { Component } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>

            <h1 className="font-heading text-3xl font-bold text-secondary mb-3">
              Oops! Something went wrong
            </h1>

            <p className="text-textSecondary mb-8">
              We encountered an unexpected error. Please try refreshing the page.
            </p>

            <button
              onClick={this.handleReload}
              className="btn-primary mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Page
            </button>

            {import.meta.env.DEV && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm text-textMuted hover:text-primary">
                  Error details (dev only)
                </summary>
                <pre className="mt-3 p-4 bg-red-50 rounded-xl text-xs text-red-700 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}