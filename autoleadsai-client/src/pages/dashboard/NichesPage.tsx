// src/pages/dashboard/NichesPage.tsx

import { useState, useEffect, useCallback } from 'react';
import { FiPlus, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import NicheList from '../../components/niches/NicheList';
import NicheForm from '../../components/niches/NicheForm';
import NicheDeleteDialog from '../../components/niches/NicheDeleteDialog';
import Button from '../../components/common/Button';
import Toast from '../../components/common/Toast';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

const NichesPage = () => {
  const [niches, setNiches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNiche, setEditingNiche] = useState<any>(null);
  const [deletingNiche, setDeletingNiche] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchNiches = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(API_ENDPOINTS.NICHES.BASE);
      setNiches(data.niches || []);
    } catch (err: any) {
      setError('Failed to load niches.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchNiches(); }, [fetchNiches]);

  const handleCreate = async (data: any) => {
    await api.post(API_ENDPOINTS.NICHES.BASE, data);
    fetchNiches();
    setToast({ message: 'Niche created!', type: 'success' });
    setShowForm(false);
  };

  const handleUpdate = async (data: any) => {
    if (!editingNiche) return;
    await api.put(API_ENDPOINTS.NICHES.BY_ID(editingNiche._id), data);
    fetchNiches();
    setToast({ message: 'Niche updated!', type: 'success' });
    setShowForm(false);
    setEditingNiche(null);
  };

  const handleDelete = async () => {
    if (!deletingNiche) return;
    await api.delete(API_ENDPOINTS.NICHES.BY_ID(deletingNiche._id));
    fetchNiches();
    setToast({ message: 'Niche deleted!', type: 'success' });
    setDeletingNiche(null);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">Niches</h1>
          <p className="text-sm text-[#6B7280]">{niches.length} niches</p>
        </div>
        <Button size="sm" icon={<FiPlus className="w-4 h-4" />} onClick={() => { setEditingNiche(null); setShowForm(true); }}>Create Niche</Button>
      </div>

      {error && (
        <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm">
          <FiAlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
          <button onClick={fetchNiches} className="ml-auto flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
            <FiRefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      <NicheList
        niches={niches}
        loading={loading}
        onViewDashboard={(niche) => window.location.href = `/dashboard?nicheId=${niche._id}`}
        onEdit={(niche) => { setEditingNiche(niche); setShowForm(true); }}
        onDelete={(niche) => setDeletingNiche(niche)}
      />

      <NicheForm
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditingNiche(null); }}
        onSubmit={editingNiche ? handleUpdate : handleCreate}
        initialData={editingNiche}
      />

      <NicheDeleteDialog
        isOpen={!!deletingNiche}
        onClose={() => setDeletingNiche(null)}
        onConfirm={handleDelete}
        nicheName={deletingNiche?.name || ''}
      />

      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};

export default NichesPage;