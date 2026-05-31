export const SkeletonCard = () => (
  <div className="card space-y-4">
    <div className="flex items-center gap-3">
      <div className="skeleton skeleton-avatar w-10 h-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="skeleton skeleton-title h-4 rounded" />
        <div className="skeleton h-3 w-4/5 rounded" />
      </div>
    </div>
    <div className="skeleton h-3 w-full rounded" />
    <div className="skeleton h-3 w-3/4 rounded" />
  </div>
);

export const SkeletonStatCard = () => (
  <div className="stat-card">
    <div className="flex items-center gap-4">
      <div className="skeleton w-14 h-14 rounded-xl" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton h-8 w-16 rounded" />
      </div>
    </div>
  </div>
);

export const SkeletonRow = () => (
  <tr>
    {[1,2,3,4,5].map(i => (
      <td key={i} className="px-4 py-3"><div className="skeleton h-4 rounded" /></td>
    ))}
  </tr>
);

export const SkeletonDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1,2,3,4].map(i => <SkeletonStatCard key={i} />)}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SkeletonCard />
      <SkeletonCard />
    </div>
  </div>
);