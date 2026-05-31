import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import { SkeletonDashboard } from '../../components/ui/Skeleton';
import { useAuth } from '../../context/useAuth';
import queryService from '../../services/queryService';
import cropService from '../../services/cropService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FiMessageSquare, FiFeather, FiArrowRight, FiClock } from 'react-icons/fi';

const OfficerDashboard = () => {
  const { user } = useAuth();
  const [queries, setQueries] = useState([]);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [qRes, cRes] = await Promise.all([queryService.getAll(), cropService.getAll()]);
        setQueries(qRes.data.data || []);
        setCrops(cRes.data.data || []);
      } catch { setQueries([]); setCrops([]); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const openQ = queries.filter(q => q.status === 'OPEN');
  const myQ = queries.filter(q => q.assignedOfficerUsername === user?.username);
  const resolvedQ = queries.filter(q => q.status === 'RESOLVED');
  const myRecs = crops.filter(c => c.createdByUsername === user?.username);

  const statusData = [
    { status: 'Open', count: openQ.length, fill: '#f59e0b' },
    { status: 'In Progress', count: queries.filter(q => q.status === 'IN_PROGRESS').length, fill: '#3b82f6' },
    { status: 'Resolved', count: resolvedQ.length, fill: '#16a34a' },
    { status: 'Closed', count: queries.filter(q => q.status === 'CLOSED').length, fill: '#94a3b8' },
  ];

  const trendData = [
    { day: 'Mon', answered: 2 }, { day: 'Tue', answered: 4 }, { day: 'Wed', answered: 3 },
    { day: 'Thu', answered: 6 }, { day: 'Fri', answered: 5 }, { day: 'Sat', answered: 1 }, { day: 'Sun', answered: resolvedQ.length },
  ];

  if (loading) return <DashboardLayout><SkeletonDashboard /></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="page-header flex items-start justify-between">
        <div>
          <h1 className="page-title">Officer Dashboard 👷</h1>
          <p className="page-subtitle">Manage queries and support farmers effectively.</p>
        </div>
        <Link to="/officer/queries" className="btn-primary hidden sm:flex">
          <FiMessageSquare size={15} /> View Queries
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <StatCard title="Total Queries" value={queries.length} icon={<FiMessageSquare />} color="blue" />
        <StatCard title="Open Queries" value={openQ.length} icon="📬" color="yellow" subtitle="Needs attention" />
        <StatCard title="Assigned to Me" value={myQ.length} icon="👤" color="purple" />
        <StatCard title="My Recommendations" value={myRecs.length} icon={<FiFeather />} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-7">
        <div className="chart-container lg:col-span-2">
          <p className="chart-title">Queries by Status</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={statusData} barSize={36}>
              <XAxis dataKey="status" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: 8, color: 'white', fontSize: 12 }} />
              <Bar dataKey="count" radius={[6,6,0,0]} fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <p className="chart-title">Answers This Week</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={trendData}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: 8, color: 'white', fontSize: 12 }} />
              <Line type="monotone" dataKey="answered" stroke="#16a34a" strokeWidth={2.5} dot={{ fill: '#16a34a', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="chart-container">
          <div className="flex items-center justify-between mb-4">
            <p className="chart-title mb-0">Open Queries</p>
            <Link to="/officer/queries" className="text-xs text-green-600 font-semibold flex items-center gap-1">View all <FiArrowRight size={12} /></Link>
          </div>
          {openQ.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <span className="text-3xl block mb-2">✅</span>
              <p className="text-sm">All queries answered! Great work.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {openQ.slice(0, 5).map(q => (
                <div key={q.id} className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <p className="text-sm font-semibold text-slate-800 truncate">{q.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <FiClock size={10} />
                    <span>by {q.farmerUsername}</span>
                    {q.category && <span className="bg-white px-1.5 py-0.5 rounded text-slate-400">{q.category}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="chart-container">
          <div className="flex items-center justify-between mb-4">
            <p className="chart-title mb-0">Quick Actions</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { to: '/officer/queries', icon: '💬', label: 'Answer Queries', sub: `${openQ.length} pending`, color: 'bg-amber-50 border-amber-100 hover:bg-amber-100' },
              { to: '/officer/recommendations', icon: '🌱', label: 'Add Crop Tip', sub: `${myRecs.length} posted`, color: 'bg-green-50 border-green-100 hover:bg-green-100' },
              { to: '/officer/mandi', icon: '📊', label: 'Post Prices', sub: 'Daily update', color: 'bg-blue-50 border-blue-100 hover:bg-blue-100' },
              { to: '/officer/training', icon: '🎓', label: 'Create Training', sub: 'New program', color: 'bg-purple-50 border-purple-100 hover:bg-purple-100' },
            ].map(({ to, icon, label, sub, color }) => (
              <Link key={to} to={to} className={`flex flex-col p-4 rounded-xl border transition-colors ${color}`}>
                <span className="text-2xl mb-2">{icon}</span>
                <span className="text-sm font-semibold text-slate-700">{label}</span>
                <span className="text-xs text-slate-400 mt-0.5">{sub}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default OfficerDashboard;