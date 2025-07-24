"use client"

const ErrorMessage = ({ error, onRetry, onDismiss }) => {
  const getErrorIcon = (type) => {
    switch (type) {
      case "NETWORK_ERROR":
        return "🌐"
      case "TIMEOUT_ERROR":
        return "⏱️"
      case "AUTH_ERROR":
        return "🔒"
      case "HTTP_ERROR":
        return "⚠️"
      default:
        return "❌"
    }
  }

  const getErrorTitle = (type) => {
    switch (type) {
      case "NETWORK_ERROR":
        return "Connection Problem"
      case "TIMEOUT_ERROR":
        return "Request Timeout"
      case "AUTH_ERROR":
        return "Authentication Required"
      case "HTTP_ERROR":
        return "Server Error"
      default:
        return "Error"
    }
  }

  return (
    <div className="error-message-container">
      <div className="error-icon">{getErrorIcon(error.type)}</div>
      <div className="error-content">
        <h3 className="error-title">{getErrorTitle(error.type)}</h3>
        <p className="error-description">{error.message}</p>
        {error.status && <p className="error-status">Status Code: {error.status}</p>}
      </div>
      <div className="error-actions">
        {onRetry && (
          <button onClick={onRetry} className="btn btn-primary">
            Try Again
          </button>
        )}
        {onDismiss && (
          <button onClick={onDismiss} className="btn btn-secondary">
            Dismiss
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
