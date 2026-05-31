import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import { SkeletonDashboard } from '../../components/ui/Skeleton';
import Badge from '../../components/ui/Badge';
import { useAuth } from '../../context/useAuth';
import queryService from '../../services/queryService';
import trainingService from '../../services/trainingService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FiMessageSquare, FiCalendar, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const COLORS = ['#f59e0b', '#3b82f6', '#16a34a', '#64748b'];

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [queries, setQueries] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [qRes, tRes] = await Promise.all([
          queryService.getByFarmer(user?.userId),
          trainingService.getUpcoming(),
        ]);
        setQueries(qRes.data.data || []);
        setTrainings(tRes.data.data || []);
      } catch { setQueries([]); setTrainings([]); }
      finally { setLoading(false); }
    };
    load();
  }, [user]);

  const openCount = queries.filter(q => q.status === 'OPEN').length;
  const inProgressCount = queries.filter(q => q.status === 'IN_PROGRESS').length;
  const resolvedCount = queries.filter(q => q.status === 'RESOLVED').length;
  const closedCount = queries.filter(q => q.status === 'CLOSED').length;

  const pieData = [
    { name: 'Open', value: openCount },
    { name: 'In Progress', value: inProgressCount },
    { name: 'Resolved', value: resolvedCount },
    { name: 'Closed', value: closedCount },
  ].filter(d => d.value > 0);

  const barData = [
    { month: 'Oct', queries: 3 },
    { month: 'Nov', queries: 5 },
    { month: 'Dec', queries: 2 },
    { month: 'Jan', queries: queries.length },
  ];

  if (loading) return <DashboardLayout><SkeletonDashboard /></DashboardLayout>;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="page-header flex items-start justify-between">
        <div>
          <h1 className="page-title">Good evening, {user?.username}! 👨‍🌾</h1>
          <p className="page-subtitle">Here is what is happening with your farm today.</p>
        </div>
        <Link to="/farmer/queries" className="btn-primary hidden sm:flex">
          <FiMessageSquare size={15} /> Ask a Question
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <StatCard title="Total Queries" value={queries.length} icon={<FiMessageSquare />} color="blue" />
        <StatCard title="Open" value={openCount} icon="📬" color="yellow" subtitle="Awaiting answer" />
        <StatCard title="Resolved" value={resolvedCount} icon={<FiCheckCircle />} color="green" />
        <StatCard title="Upcoming Training" value={trainings.length} icon={<FiCalendar />} color="purple" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-7">
        {/* Bar chart */}
        <div className="chart-container lg:col-span-2">
          <p className="chart-title">Query Activity (Last 4 Months)</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barData} barSize={32}>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: 8, color: 'white', fontSize: 12 }} />
              <Bar dataKey="queries" fill="#16a34a" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="chart-container">
          <p className="chart-title">Query Status</p>
          {pieData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: 8, color: 'white', fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                {pieData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs text-slate-500">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                    <span>{d.name}: {d.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-slate-400">
              <span className="text-3xl mb-2">💬</span>
              <p className="text-sm">No queries yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Queries */}
        <div className="chart-container">
          <div className="flex items-center justify-between mb-4">
            <p className="chart-title mb-0">Recent Queries</p>
            <Link to="/farmer/queries" className="text-xs text-green-600 hover:text-green-700 font-semibold flex items-center gap-1">
              View all <FiArrowRight size={12} />
            </Link>
          </div>
          {queries.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <FiMessageSquare size={24} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No queries yet. Ask your first question!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {queries.slice(0, 5).map(q => (
                <div key={q.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <p className="text-sm text-slate-700 truncate flex-1 mr-3">{q.title}</p>
                  <Badge label={q.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Training */}
        <div className="chart-container">
          <div className="flex items-center justify-between mb-4">
            <p className="chart-title mb-0">Upcoming Training</p>
            <Link to="/farmer/training" className="text-xs text-green-600 hover:text-green-700 font-semibold flex items-center gap-1">
              View all <FiArrowRight size={12} />
            </Link>
          </div>
          {trainings.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <FiCalendar size={24} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No upcoming training programs.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {trainings.slice(0, 4).map(t => (
                <div key={t.id} className="p-3 bg-slate-50 rounded-xl hover:bg-green-50 transition-colors">
                  <p className="font-semibold text-slate-800 text-sm">{t.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span>📅 {t.startDate}</span>
                    <span>📍 {t.venue || 'Online'}</span>
                    <span>{t.currentParticipants}/{t.maxParticipants || '∞'} enrolled</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
export default FarmerDashboard;
