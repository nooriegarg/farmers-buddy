import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Loader from '../../components/ui/Loader';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/ui/EmptyState';
import ErrorState from '../../components/ui/ErrorState';
import MandiPriceForm from '../../components/ui/MandiPriceForm';
import { useAuth } from '../../context/useAuth';
import mandiService from '../../services/mandiService';
import { toast } from 'react-toastify';
import { FiPlus, FiSearch, FiTrash2, FiEdit2 } from 'react-icons/fi';

const emptyForm = {
  cropName: '', marketName: '', state: '', district: '',
  minPrice: '', maxPrice: '', modalPrice: '', unit: 'Quintal', priceDate: ''
};

const MandiPricePage = () => {
  const { user } = useAuth();
  const canEdit = user?.role !== 'FARMER';
  const isAdmin = user?.role === 'ADMIN';
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await mandiService.getAll();
      setPrices(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load mandi prices');
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const setField = (f) => (e) => setForm(prev => ({ ...prev, [f]: e.target.value }));

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (p) => {
    setEditing(p);
    setForm({ cropName: p.cropName, marketName: p.marketName, state: p.state || '', district: p.district || '', minPrice: p.minPrice, maxPrice: p.maxPrice, modalPrice: p.modalPrice, unit: p.unit || 'Quintal', priceDate: p.priceDate });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editing) { await mandiService.update(editing.id, form); toast.success('Price updated!'); }
      else { await mandiService.create(form); toast.success('Price posted!'); }
      setShowModal(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this price entry?')) return;
    try { await mandiService.remove(id); toast.success('Deleted!'); load(); }
    catch (_e) { toast.error('Failed to delete'); }
  };

  const states = [...new Set(prices.map(p => p.state).filter(Boolean))];
  const filtered = prices.filter(p => {
    const ms = !search || [p.cropName, p.marketName, p.district].some(f => f?.toLowerCase().includes(search.toLowerCase()));
    const mst = !stateFilter || p.state === stateFilter;
    const md = !dateFilter || p.priceDate === dateFilter;
    return ms && mst && md;
  });

  if (loading) return <DashboardLayout><Loader text="Loading mandi prices..." /></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mandi Prices</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time agricultural market prices</p>
        </div>
        {canEdit && (
          <button onClick={openCreate} className="btn-primary flex items-center gap-2">
            <FiPlus /> Post Price
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-blue-50 text-blue-700 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{prices.length}</p>
          <p className="text-xs font-medium">Total Entries</p>
        </div>
        <div className="bg-green-50 text-green-700 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{new Set(prices.map(p => p.cropName)).size}</p>
          <p className="text-xs font-medium">Crops Tracked</p>
        </div>
        <div className="bg-purple-50 text-purple-700 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{new Set(prices.map(p => p.marketName)).size}</p>
          <p className="text-xs font-medium">Markets</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="input-field pl-9" placeholder="Search crop, market, district..." />
        </div>
        <select value={stateFilter} onChange={e => setStateFilter(e.target.value)} className="input-field w-36">
          <option value="">All States</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="input-field w-40" />
        {(search || stateFilter || dateFilter) && (
          <button onClick={() => { setSearch(''); setStateFilter(''); setDateFilter(''); }} className="btn-secondary text-xs px-3">Clear</button>
        )}
      </div>

      {error && <ErrorState message={error} onRetry={load} />}
      {!error && filtered.length === 0 && (
        <EmptyState icon="📊" title="No price data found"
          subtitle={canEdit ? 'Post the first mandi price entry' : 'No prices available yet'}
          action={canEdit ? { label: 'Post Price', onClick: openCreate } : null} />
      )}

      {!error && filtered.length > 0 && (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Crop', 'Market', 'Location', 'Min ₹', 'Max ₹', 'Modal ₹', 'Unit', 'Date', 'By', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-800">{p.cropName}</td>
                    <td className="px-4 py-3 text-gray-600">{p.marketName}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{p.state || '-'}{p.district ? `, ${p.district}` : ''}</td>
                    <td className="px-4 py-3 text-red-600 font-medium">₹{p.minPrice}</td>
                    <td className="px-4 py-3 text-green-600 font-medium">₹{p.maxPrice}</td>
                    <td className="px-4 py-3 font-bold text-blue-700">₹{p.modalPrice}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{p.unit}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{p.priceDate}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{p.postedByUsername}</td>
                    <td className="px-4 py-3">
                      {canEdit && (
                        <div className="flex gap-1">
                          <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-blue-600"><FiEdit2 size={13} /></button>
                          {isAdmin && <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-400 hover:text-red-600"><FiTrash2 size={13} /></button>}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 bg-gray-50 border-t text-xs text-gray-400">
            Showing {filtered.length} of {prices.length} entries
          </div>
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Price' : 'Post Mandi Price'}>
        <form onSubmit={handleSubmit}>
          <MandiPriceForm form={form} setField={setField} submitting={submitting}
            onCancel={() => setShowModal(false)} isEdit={!!editing} />
        </form>
      </Modal>
    </DashboardLayout>
  );
};
export default MandiPricePage;
