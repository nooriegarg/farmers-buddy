import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Loader from '../../components/ui/Loader';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/ui/EmptyState';
import ErrorState from '../../components/ui/ErrorState';
import { useAuth } from '../../context/useAuth';
import queryService from '../../services/queryService';
import { toast } from 'react-toastify';
import { FiPlus, FiSearch, FiTrash2, FiCheckCircle, FiUser } from 'react-icons/fi';

const STATUSES = ['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
const emptyForm = { title: '', description: '', category: '' };

const QueryPage = () => {
  const { user } = useAuth();
  const isFarmer = user?.role === 'FARMER';
  const isAdmin = user?.role === 'ADMIN';
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showCreate, setShowCreate] = useState(false);
  const [answerModal, setAnswerModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [answerText, setAnswerText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = isFarmer ? await queryService.getByFarmer(user?.userId) : await queryService.getAll();
      setQueries(res.data.data || []);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load queries');
    } finally { setLoading(false); }
  }, [isFarmer, user]);

  useEffect(() => { load(); }, [load]);

  const filtered = queries.filter(q => {
    const ms = statusFilter === 'ALL' || q.status === statusFilter;
    const mt = !search || [q.title, q.description, q.category, q.farmerUsername]
      .some(f => f?.toLowerCase().includes(search.toLowerCase()));
    return ms && mt;
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await queryService.create(form);
      toast.success('Query submitted!');
      setShowCreate(false); setForm(emptyForm); load();
    } catch (e) { toast.error(e.response?.data?.message || 'Failed'); }
    finally { setSubmitting(false); }
  };

  const handleAnswer = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await queryService.answer(answerModal.id, { answer: answerText });
      toast.success('Answer submitted!');
      setAnswerModal(null); setAnswerText(''); load();
    } catch (e) { toast.error(e.response?.data?.message || 'Failed'); }
    finally { setSubmitting(false); }
  };

  const handleStatus = async (id, status) => {
    try {
      await queryService.updateStatus(id, status);
      toast.success('Status updated'); load();
    } catch (_e) { toast.error('Failed to update status'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this query?')) return;
    try { await queryService.remove(id); toast.success('Deleted'); load(); }
    catch (_e) { toast.error('Failed to delete'); }
  };

  if (loading) return <DashboardLayout><Loader text="Loading queries..." /></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Query Forum</h1>
          <p className="text-sm text-gray-500 mt-1">{isFarmer ? 'Ask questions and get expert answers' : 'Manage farmer queries'}</p>
        </div>
        {isFarmer && (
          <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2">
            <FiPlus /> Ask Question
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total', val: queries.length, bg: 'bg-gray-50 text-gray-700' },
          { label: 'Open', val: queries.filter(q => q.status === 'OPEN').length, bg: 'bg-yellow-50 text-yellow-700' },
          { label: 'In Progress', val: queries.filter(q => q.status === 'IN_PROGRESS').length, bg: 'bg-blue-50 text-blue-700' },
          { label: 'Resolved', val: queries.filter(q => q.status === 'RESOLVED').length, bg: 'bg-green-50 text-green-700' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl p-3 text-center ${s.bg}`}>
            <p className="text-2xl font-bold">{s.val}</p>
            <p className="text-xs font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-52">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="input-field pl-9" placeholder="Search title, description, farmer..." />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${statusFilter === s ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {error && <ErrorState message={error} onRetry={load} />}
      {!error && filtered.length === 0 && (
        <EmptyState icon="💬" title="No queries found"
          subtitle={isFarmer ? 'Ask your first question' : 'No queries match your filter'}
          action={isFarmer ? { label: 'Ask Question', onClick: () => setShowCreate(true) } : null} />
      )}

      {!error && filtered.length > 0 && (
        <div className="space-y-4">
          {filtered.map(q => (
            <div key={q.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-800">{q.title}</h3>
                    <Badge label={q.status} />
                    {q.category && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{q.category}</span>}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{q.description}</p>
                  {q.answer && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-2">
                      <p className="text-xs font-semibold text-green-700 flex items-center gap-1 mb-1">
                        <FiCheckCircle size={11} /> Answered by {q.assignedOfficerUsername || 'Officer'}
                      </p>
                      <p className="text-sm text-gray-700">{q.answer}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><FiUser size={10} />{q.farmerUsername}</span>
                    <span>{new Date(q.createdAt).toLocaleDateString('en-IN')}</span>
                    {q.resolvedAt && <span className="text-green-500">Resolved: {new Date(q.resolvedAt).toLocaleDateString('en-IN')}</span>}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 shrink-0 min-w-20">
                  {!isFarmer && q.status === 'OPEN' && (
                    <button onClick={() => { setAnswerModal(q); setAnswerText(''); }}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-2 py-1.5 rounded-lg transition">
                      Answer
                    </button>
                  )}
                  {!isFarmer && q.status === 'OPEN' && (
                    <button onClick={() => handleStatus(q.id, 'IN_PROGRESS')}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1.5 rounded-lg transition">
                      Start
                    </button>
                  )}
                  {!isFarmer && q.status === 'IN_PROGRESS' && (
                    <button onClick={() => handleStatus(q.id, 'RESOLVED')}
                      className="bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold px-2 py-1.5 rounded-lg transition">
                      Resolve
                    </button>
                  )}
                  {!isFarmer && q.status === 'RESOLVED' && (
                    <button onClick={() => handleStatus(q.id, 'CLOSED')}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-1.5 rounded-lg transition">
                      Close
                    </button>
                  )}
                  {isAdmin && (
                    <button onClick={() => handleDelete(q.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-2 py-1.5 rounded-lg transition flex items-center gap-1 justify-center">
                      <FiTrash2 size={11} /> Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Ask a Question">
        <form onSubmit={handleCreate} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              className="input-field" placeholder="Briefly describe your question" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              className="input-field" rows={4} placeholder="Provide more details..." required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
              className="input-field" placeholder="e.g. Irrigation, Soil, Pest" />
          </div>
          <div className="flex gap-3 justify-end pt-1">
            <button type="button" onClick={() => setShowCreate(false)} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Submitting...' : 'Submit Query'}</button>
          </div>
        </form>
      </Modal>

      {/* Answer Modal */}
      <Modal isOpen={!!answerModal} onClose={() => setAnswerModal(null)} title="Answer Query">
        <form onSubmit={handleAnswer} className="space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs font-semibold text-gray-500 mb-1">Question:</p>
            <p className="text-sm font-medium text-gray-800">{answerModal?.title}</p>
            <p className="text-sm text-gray-600 mt-1">{answerModal?.description}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Answer *</label>
            <textarea value={answerText} onChange={e => setAnswerText(e.target.value)}
              className="input-field" rows={5} placeholder="Provide a detailed, helpful answer..." required />
          </div>
          <div className="flex gap-3 justify-end pt-1">
            <button type="button" onClick={() => setAnswerModal(null)} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Submitting...' : 'Submit Answer'}</button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
export default QueryPage;