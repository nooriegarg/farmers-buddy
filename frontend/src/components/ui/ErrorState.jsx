const ErrorState = ({ message = 'Failed to load data', onRetry }) => (
  <div className="card text-center py-16 border-red-100">
    <div className="text-5xl mb-4">⚠️</div>
    <h3 className="text-lg font-semibold text-red-700 mb-1">Error</h3>
    <p className="text-sm text-gray-500 mb-4">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="btn-primary">Try Again</button>
    )}
  </div>
);
export default ErrorState;