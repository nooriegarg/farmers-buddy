import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import { SkeletonDashboard } from '../../components/ui/Skeleton';
import Badge from '../../components/ui/Badge';
import userService from '../../services/userService';
import queryService from '../../services/queryService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FiUsers, FiArrowRight, FiMessageSquare } from 'react-icons/fi';

const ROLE_COLORS = ['#16a34a', '#3b82f6', '#7c3aed'];
const Q_COLORS = ['#f59e0b', '#3b82f6', '#16a34a', '#94a3b8'];

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [uRes, qRes] = await Promise.all([userService.getAll(), queryService.getAll()]);
        setUsers(uRes.data.data || []);
        setQueries(qRes.data.data || []);
      } catch { setUsers([]); setQueries([]); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const farmers = users.filter(u => u.role === 'FARMER');
  const officers = users.filter(u => u.role === 'OFFICER');
  const admins = users.filter(u => u.role === 'ADMIN');
  const openQ = queries.filter(q => q.status === 'OPEN');
  const resolvedQ = queries.filter(q => q.status === 'RESOLVED');

  const roleData = [
    { name: 'Farmers', value: farmers.length },
    { name: 'Officers', value: officers.length },
    { name: 'Admins', value: admins.length },
  ].filter(d => d.value > 0);

  const queryData = [
    { name: 'Open', value: openQ.length },
    { name: 'In Progress', value: queries.filter(q => q.status === 'IN_PROGRESS').length },
    { name: 'Resolved', value: resolvedQ.length },
    { name: 'Closed', value: queries.filter(q => q.status === 'CLOSED').length },
  ];

  const growthData = [
    { month: 'Sep', users: 12 }, { month: 'Oct', users: 24 }, { month: 'Nov', users: 35 },
    { month: 'Dec', users: 48 }, { month: 'Jan', users: users.length },
  ];

  if (loading) return <DashboardLayout><SkeletonDashboard /></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="page-header flex items-start justify-between">
        <div>
          <h1 className="page-title">Admin Dashboard 🛡️</h1>
          <p className="page-subtitle">System overview and platform management.</p>
        </div>
        <Link to="/admin/users" className="btn-primary hidden sm:flex">
          <FiUsers size={15} /> Manage Users
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <StatCard title="Total Users" value={users.length} icon={<FiUsers />} color="blue" subtitle={`+${users.length} registered`} />
        <StatCard title="Farmers" value={farmers.length} icon="👨‍🌾" color="green" />
        <StatCard title="Officers" value={officers.length} icon="👷" color="yellow" />
        <StatCard title="Open Queries" value={openQ.length} icon={<FiMessageSquare />} color="red" subtitle="Need attention" />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* User growth */}
        <div className="chart-container lg:col-span-2">
          <p className="chart-title">User Growth (5 Months)</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={growthData} barSize={32}>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: 8, color: 'white', fontSize: 12 }} />
              <Bar dataKey="users" fill="#7c3aed" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Role distribution pie */}
        <div className="chart-container">
          <p className="chart-title">User Roles</p>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={roleData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={3} dataKey="value">
                {roleData.map((_, i) => <Cell key={i} fill={ROLE_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: 8, color: 'white', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-1 mt-1">
            {roleData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: ROLE_COLORS[i] }} />
                  {d.name}
                </div>
                <span className="font-semibold text-slate-700">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Query breakdown */}
        <div className="chart-container">
          <p className="chart-title">Query Breakdown</p>
          <div className="flex gap-3">
            <ResponsiveContainer width="50%" height={140}>
              <PieChart>
                <Pie data={queryData} cx="50%" cy="50%" innerRadius={30} outerRadius={55} paddingAngle={2} dataKey="value">
                  {queryData.map((_, i) => <Cell key={i} fill={Q_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: 8, color: 'white', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col justify-center gap-2">
              {queryData.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: Q_COLORS[i] }} />
                    {d.name}
                  </div>
                  <span className="font-bold text-slate-700">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="chart-container">
          <p className="chart-title">Quick Actions</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { to: '/admin/users', icon: '👥', label: 'Manage Users', sub: `${users.length} users`, color: 'bg-blue-50 border-blue-100 hover:bg-blue-100' },
              { to: '/admin/queries', icon: '💬', label: 'All Queries', sub: `${openQ.length} open`, color: 'bg-amber-50 border-amber-100 hover:bg-amber-100' },
              { to: '/admin/recommendations', icon: '🌱', label: 'Crop Tips', sub: 'Manage all', color: 'bg-green-50 border-green-100 hover:bg-green-100' },
              { to: '/admin/training', icon: '🎓', label: 'Training', sub: 'Manage all', color: 'bg-purple-50 border-purple-100 hover:bg-purple-100' },
            ].map(({ to, icon, label, sub, color }) => (
              <Link key={to} to={to} className={`flex flex-col p-3.5 rounded-xl border transition-colors ${color}`}>
                <span className="text-xl mb-1.5">{icon}</span>
                <span className="text-sm font-semibold text-slate-700">{label}</span>
                <span className="text-xs text-slate-400 mt-0.5">{sub}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Users table */}
      <div className="chart-container">
        <div className="flex items-center justify-between mb-4">
          <p className="chart-title mb-0">Recent Users</p>
          <Link to="/admin/users" className="text-xs text-green-600 font-semibold flex items-center gap-1">
            View all <FiArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th><th>Email</th><th>Role</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 6).map(u => (
                <tr key={u.id}>
                  <td className="font-medium text-slate-800">{u.username}</td>
                  <td className="text-slate-500">{u.email}</td>
                  <td><Badge label={u.role} /></td>
                  <td>
                    <span className={`badge ${u.enabled ? 'badge-green' : 'badge-red'}`}>
                      {u.enabled ? '● Active' : '○ Disabled'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default AdminDashboard;