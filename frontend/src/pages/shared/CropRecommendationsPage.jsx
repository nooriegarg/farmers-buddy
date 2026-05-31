import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Loader from '../../components/ui/Loader';
import Modal from '../../components/ui/Modal';
import { useAuth } from '../../context/useAuth';
import cropService from '../../services/cropService';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const empty = { cropName: '', title: '', description: '', season: '', soilType: '', region: '', tips: '' };

const CropRecommendationsPage = () => {
  const { user } = useAuth();
  const canEdit = user?.role !== 'FARMER';
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await cropService.getAll();
      setRecs(res.data.data || []);
    } catch {
      setRecs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setEditing(null); setForm(empty); setModal(true); };
  const openEdit = (r) => {
    setEditing(r);
    setForm({
      cropName: r.cropName, title: r.title, description: r.description,
      season: r.season || '', soilType: r.soilType || '', region: r.region || '', tips: r.tips || ''
    });
    setModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editing) { await cropService.update(editing.id, form); toast.success('Updated!'); }
      else { await cropService.create(form); toast.success('Created!'); }
      setModal(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this recommendation?')) return;
    try { await cropService.remove(id); toast.success('Deleted!'); load(); }
    catch { toast.error('Failed to delete'); }
  };

  if (loading) return <DashboardLayout><Loader /></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Crop Recommendations</h1>
          <p className="text-sm text-gray-500 mt-1">Expert crop advice for farmers</p>
        </div>
        {canEdit && (
          <button onClick={openCreate} className="btn-primary flex items-center gap-2">
            <FiPlus /> Add Recommendation
          </button>
        )}
      </div>

      {recs.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-4xl mb-3">🌱</p>
          <p className="text-gray-400">No recommendations yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recs.map(r => (
            <div key={r.id} className="card hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {r.cropName}
                </span>
                {canEdit && (
                  <div className="flex gap-1 ml-auto">
                    <button onClick={() => openEdit(r)} className="p-1.5 text-gray-400 hover:text-blue-600">
                      <FiEdit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(r.id)} className="p-1.5 text-gray-400 hover:text-red-600">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{r.title}</h3>
              <p className="text-sm text-gray-600 flex-1 mb-3">{r.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {r.season && <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">🗓 {r.season}</span>}
                {r.region && <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">📍 {r.region}</span>}
                {r.soilType && <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">🪨 {r.soilType}</span>}
              </div>
              {r.tips && <p className="text-xs text-gray-500 mt-2 italic">💡 {r.tips}</p>}
              <p className="text-xs text-gray-400 mt-2">By: {r.createdByUsername}</p>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Recommendation' : 'New Recommendation'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Crop Name *</label>
              <input value={form.cropName} onChange={e => setForm({ ...form, cropName: e.target.value })}
                className="input-field" placeholder="e.g. Wheat" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Season</label>
              <input value={form.season} onChange={e => setForm({ ...form, season: e.target.value })}
                className="input-field" placeholder="Kharif / Rabi" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Title *</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              className="input-field" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description *</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              className="input-field" rows={3} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Region</label>
              <input value={form.region} onChange={e => setForm({ ...form, region: e.target.value })}
                className="input-field" placeholder="e.g. Punjab" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Soil Type</label>
              <input value={form.soilType} onChange={e => setForm({ ...form, soilType: e.target.value })}
                className="input-field" placeholder="e.g. Loamy" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Tips</label>
            <textarea value={form.tips} onChange={e => setForm({ ...form, tips: e.target.value })}
              className="input-field" rows={2} />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => setModal(false)} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
export default CropRecommendationsPage;