const EmptyState = ({ icon = '📭', title = 'No data found', subtitle = '', action }) => (
  <div className="card text-center py-16">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
    {subtitle && <p className="text-sm text-gray-400 mb-4">{subtitle}</p>}
    {action && (
      <button onClick={action.onClick} className="btn-primary mt-2">
        {action.label}
      </button>
    )}
  </div>
);
export default EmptyState;