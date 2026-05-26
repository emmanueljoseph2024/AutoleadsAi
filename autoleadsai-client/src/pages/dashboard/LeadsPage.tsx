// src/pages/dashboard/LeadsPage.tsx

import { useState, useEffect, useCallback } from 'react';
import { FiPlus, FiDownload, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import { useWebSocketEvents } from '../../hooks/useWebSocket';
import LeadTable from '../../components/leads/LeadTable';
import LeadFilterBar from '../../components/leads/LeadFilterBar';
import LeadBulkActions from '../../components/leads/LeadBulkActions';
import LeadImportModal from '../../components/leads/LeadImportModal';
import LeadExportButton from '../../components/leads/LeadExportButton';
import Button from '../../components/common/Button';
import Toast from '../../components/common/Toast';
import { sanitizeString } from '../../utils/sanitizers';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

const LeadsPage = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [qualification, setQualification] = useState('all');
  const [status, setStatus] = useState('all');
  const [source, setSource] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showImport, setShowImport] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '25');
      if (search) params.append('search', sanitizeString(search));
      if (qualification !== 'all') params.append('qualification', qualification);
      if (status !== 'all') params.append('status', status);
      if (source !== 'all') params.append('source', source);

      const { data } = await api.get(`${API_ENDPOINTS.LEADS.BASE}?${params.toString()}`);
      setLeads(data.leads || []);
      setTotalPages(data.pages || 1);
      setTotal(data.total || 0);
    } catch (err: any) {
      setError('Failed to load leads.');
    } finally {
      setLoading(false);
    }
  }, [page, search, qualification, status, source]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  useWebSocketEvents({
    'lead.discovered': () => { fetchLeads(); setToast({ message: 'New lead discovered!', type: 'info' }); },
    'lead.scored': () => fetchLeads(),
  });

  const handleClearFilters = () => {
    setSearch('');
    setQualification('all');
    setStatus('all');
    setSource('all');
    setPage(1);
  };

  const handleImport = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    await api.post(`${API_ENDPOINTS.LEADS.BASE}/import`, formData);
    fetchLeads();
    setToast({ message: 'Leads imported successfully!', type: 'success' });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">Leads</h1>
          <p className="text-sm text-[#6B7280]">{total.toLocaleString()} total leads</p>
        </div>
        <div className="flex items-center gap-2">
          <LeadExportButton filters={{ search, qualification, status, source }} />
          <Button variant="outline" size="sm" icon={<FiDownload className="w-4 h-4" />} onClick={() => setShowImport(true)}>Import</Button>
          <Button size="sm" icon={<FiPlus className="w-4 h-4" />} onClick={() => window.location.href = '/leads/new'}>Add Lead</Button>
        </div>
      </div>

      <LeadFilterBar search={search} onSearchChange={(v) => { setSearch(v); setPage(1); }} qualification={qualification} onQualificationChange={(v) => { setQualification(v); setPage(1); }} status={status} onStatusChange={(v) => { setStatus(v); setPage(1); }} source={source} onSourceChange={(v) => { setSource(v); setPage(1); }} onClear={handleClearFilters} />

      {error && (
        <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm animate-scale-in">
          <FiAlertCircle className="w-5 h-5 shrink-0" /><span>{error}</span>
          <button onClick={fetchLeads} className="ml-auto flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium"><FiRefreshCw className="w-4 h-4" /> Retry</button>
        </div>
      )}

      <LeadBulkActions selectedCount={selectedIds.length} onAssign={() => {}} onExport={() => {}} onDelete={async () => { await api.post(API_ENDPOINTS.LEADS.BULK, { ids: selectedIds, action: 'delete' }); setSelectedIds([]); fetchLeads(); }} />

      <LeadTable leads={leads} loading={loading} error={error} page={page} totalPages={totalPages} total={total} limit={25} onPageChange={setPage} selectedIds={selectedIds} onSelectChange={setSelectedIds} onRowClick={(lead) => window.location.href = `/leads/${lead._id}`} />

      <LeadImportModal isOpen={showImport} onClose={() => setShowImport(false)} onImport={handleImport} />

      {toast && <div className="fixed top-4 right-4 z-50 animate-slide-down"><Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} /></div>}
    </div>
  );
};

export default LeadsPage;