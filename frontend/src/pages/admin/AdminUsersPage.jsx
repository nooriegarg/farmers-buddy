import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Loader from '../../components/ui/Loader';
import Badge from '../../components/ui/Badge';
import userService from '../../services/userService';
import { toast } from 'react-toastify';
import { FiTrash2, FiCheck, FiX } from 'react-icons/fi';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const load = async () => {
    try {
      const res = await userService.getAll();
      setUsers(res.data.data || []);
    } catch { setUsers([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleToggle = async (id) => {
    try { await userService.toggle(id); toast.success('Status updated!'); load(); }
    catch { toast.error('Failed to update'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user permanently?')) return;
    try { await userService.remove(id); toast.success('User deleted!'); load(); }
    catch { toast.error('Delete failed'); }
  };

  const filtered = users.filter(u => {
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchSearch = !search ||
      u.username?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  if (loading) return <DashboardLayout><Loader /></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <p className="text-sm text-gray-500 mt-1">{users.length} total users registered</p>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        <input value={search} onChange={e => setSearch(e.target.value)}
          className="input-field max-w-xs" placeholder="Search by username or email..." />
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="input-field w-36">
          <option value="ALL">All Roles</option>
          <option value="FARMER">Farmer</option>
          <option value="OFFICER">Officer</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['ID', 'Username', 'Email', 'Full Name', 'Role', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">No users found</td>
                </tr>
              ) : filtered.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400 text-xs">{u.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{u.username}</td>
                  <td className="px-4 py-3 text-gray-600">{u.email}</td>
                  <td className="px-4 py-3 text-gray-600">{u.fullName || '-'}</td>
                  <td className="px-4 py-3"><Badge label={u.role} /></td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      u.enabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {u.enabled ? <FiCheck size={10} /> : <FiX size={10} />}
                      {u.enabled ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleToggle(u.id)}
                        className={`text-xs px-2 py-1 rounded font-medium transition ${
                          u.enabled
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                        }`}>
                        {u.enabled ? 'Disable' : 'Enable'}
                      </button>
                      <button onClick={() => handleDelete(u.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
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
export default AdminUsersPage;