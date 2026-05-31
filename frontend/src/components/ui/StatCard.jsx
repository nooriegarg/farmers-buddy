const colorMap = {
  green:  { icon: 'bg-green-100 text-green-600',  card: 'stat-card-green',  accent: 'text-green-600' },
  blue:   { icon: 'bg-blue-100 text-blue-600',    card: 'stat-card-blue',   accent: 'text-blue-600' },
  yellow: { icon: 'bg-amber-100 text-amber-600',  card: 'stat-card-yellow', accent: 'text-amber-600' },
  purple: { icon: 'bg-purple-100 text-purple-600',card: 'stat-card-purple', accent: 'text-purple-600' },
  red:    { icon: 'bg-red-100 text-red-600',      card: 'stat-card-red',    accent: 'text-red-600' },
};

const StatCard = ({ title, value, icon, color = 'green', subtitle, trend }) => {
  const c = colorMap[color] || colorMap.green;
  return (
    <div className={`stat-card ${c.card}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-800 tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              <span>{trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%</span>
              <span className="text-slate-400 font-normal">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${c.icon}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};
export default StatCard;