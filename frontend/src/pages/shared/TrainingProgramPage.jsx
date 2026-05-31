import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Loader from '../../components/ui/Loader';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/ui/EmptyState';
import ErrorState from '../../components/ui/ErrorState';
import { useAuth } from '../../context/useAuth';
import trainingService from '../../services/trainingService';
import { toast } from 'react-toastify';
import { FiPlus, FiSearch } from 'react-icons/fi';
import ProgramCard from '../../components/ui/ProgramCard';

const emptyForm = {
  title: '', description: '', venue: '', startDate: '', endDate: '',
  maxParticipants: '', topic: '', trainerName: '', registrationDeadline: ''
};

const TrainingProgramPage = () => {
  const { user } = useAuth();
  const isFarmer = user?.role === 'FARMER';
  const isAdmin = user?.role === 'ADMIN';
  const canEdit = !isFarmer;

  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [upcomingOnly, setUpcomingOnly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await trainingService.getAll();
      setPrograms(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load programs');
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const sf = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (p) => {
    setEditing(p);
    setForm({ title: p.title, description: p.description, venue: p.venue || '', startDate: p.startDate, endDate: p.endDate || '', maxParticipants: p.maxParticipants || '', topic: p.topic || '', trainerName: p.trainerName || '', registrationDeadline: p.registrationDeadline || '' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editing) { await trainingService.update(editing.id, form); toast.success('Program updated!'); }
      else { await trainingService.create(form); toast.success('Program created!'); }
      setShowModal(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setSubmitting(false); }
  };

  const handleEnroll = async (id) => {
    try { await trainingService.enroll(id); toast.success('Enrolled successfully!'); load(); }
    catch (err) { toast.error(err.response?.data?.message || 'Enrollment failed'); }
  };

  const handleToggle = async (id) => {
    try { await trainingService.toggle(id); toast.success('Status toggled'); load(); }
    catch (_e) { toast.error('Failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this program?')) return;
    try { await trainingService.remove(id); toast.success('Deleted!'); load(); }
    catch (_e) { toast.error('Failed to delete'); }
  };

  const topics = [...new Set(programs.map(p => p.topic).filter(Boolean))];
  const today = new Date().toISOString().split('T')[0];

  const filtered = programs.filter(p => {
    const ms = !search || [p.title, p.description, p.trainerName, p.venue]
      .some(f => f?.toLowerCase().includes(search.toLowerCase()));
    const mt = !topicFilter || p.topic === topicFilter;
    const mu = !upcomingOnly || p.startDate >= today;
    return ms && mt && mu;
  });

  const upcoming = programs.filter(p => p.startDate >= today && p.active).length;

  if (loading) return <DashboardLayout><Loader text="Loading training programs..." /></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Training Programs</h1>
          <p className="text-sm text-gray-500 mt-1">Agricultural workshops and training sessions</p>
        </div>
        {canEdit && (
          <button onClick={openCreate} className="btn-primary flex items-center gap-2">
            <FiPlus /> Create Program
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-purple-50 text-purple-700 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{programs.length}</p>
          <p className="text-xs font-medium">Total Programs</p>
        </div>
        <div className="bg-green-50 text-green-700 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{upcoming}</p>
          <p className="text-xs font-medium">Upcoming</p>
        </div>
        <div className="bg-blue-50 text-blue-700 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{topics.length}</p>
          <p className="text-xs font-medium">Topics</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="input-field pl-9" placeholder="Search title, trainer, venue..." />
        </div>
        <select value={topicFilter} onChange={e => setTopicFilter(e.target.value)} className="input-field w-40">
          <option value="">All Topics</option>
          {topics.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
          <input type="checkbox" checked={upcomingOnly} onChange={e => setUpcomingOnly(e.target.checked)} className="w-4 h-4" />
          Upcoming only
        </label>
        {(search || topicFilter || upcomingOnly) && (
          <button onClick={() => { setSearch(''); setTopicFilter(''); setUpcomingOnly(false); }} className="btn-secondary text-xs px-3">Clear</button>
        )}
      </div>

      {error && <ErrorState message={error} onRetry={load} />}
      {!error && filtered.length === 0 && (
        <EmptyState icon="🎓" title="No programs found"
          subtitle={canEdit ? 'Create the first training program' : 'No programs available'}
          action={canEdit ? { label: 'Create Program', onClick: openCreate } : null} />
      )}

      {!error && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => (
            <ProgramCard key={p.id} p={p} isFarmer={isFarmer} isAdmin={isAdmin} canEdit={canEdit}
              today={today} onEnroll={handleEnroll} onEdit={openEdit}
              onDelete={handleDelete} onToggle={handleToggle} />
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Program' : 'Create Training Program'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Title *</label>
            <input value={form.title} onChange={sf('title')} className="input-field" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description *</label>
            <textarea value={form.description} onChange={sf('description')} className="input-field" rows={3} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Topic</label>
              <input value={form.topic} onChange={sf('topic')} className="input-field" placeholder="e.g. Irrigation" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Venue</label>
              <input value={form.venue} onChange={sf('venue')} className="input-field" placeholder="Location" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Start Date *</label>
              <input type="date" value={form.startDate} onChange={sf('startDate')} className="input-field" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
              <input type="date" value={form.endDate} onChange={sf('endDate')} className="input-field" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Trainer</label>
              <input value={form.trainerName} onChange={sf('trainerName')} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Max Participants</label>
              <input type="number" min="1" value={form.maxParticipants} onChange={sf('maxParticipants')} className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Registration Deadline</label>
            <input type="date" value={form.registrationDeadline} onChange={sf('registrationDeadline')} className="input-field" />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Saving...' : (editing ? 'Update' : 'Create')}</button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
export default TrainingProgramPage;
