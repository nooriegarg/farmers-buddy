const dots = {
  FARMER: '🌱', OFFICER: '👷', ADMIN: '🛡️',
  OPEN: '●', IN_PROGRESS: '◐', RESOLVED: '✓', CLOSED: '○',
  active: '●', inactive: '○',
};

const Badge = ({ label }) => {
  const key = label?.toString();
  return (
    <span className={`badge badge-${key}`}>
      {dots[key] && <span className="text-xs leading-none">{dots[key]}</span>}
      {key?.replace('_', ' ')}
    </span>
  );
};
export default Badge;