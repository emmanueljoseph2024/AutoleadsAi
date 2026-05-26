// src/pages/dashboard/LeadDetailPage.tsx

import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import { useWebSocketEvents } from '../../hooks/useWebSocket';
import LeadDetailPanel from '../../components/leads/LeadDetailPanel';
import Spinner from '../../components/common/Spinner';
import Toast from '../../components/common/Toast';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

const LeadDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const fetchLead = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(API_ENDPOINTS.LEADS.BY_ID(id));
      setLead(data.lead);
    } catch (err: any) {
      setError('Failed to load lead details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchLead(); }, [fetchLead]);

  useWebSocketEvents({
    'lead.scored': (data: any) => { if (data.leadId === id) fetchLead(); },
    'email.opened': (data: any) => { if (data.leadId === id) { fetchLead(); setToast({ message: 'Email opened!', type: 'info' }); } },
    'email.replied': (data: any) => { if (data.leadId === id) { fetchLead(); setToast({ message: 'Lead replied!', type: 'success' }); } },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-[#6B7280]">Loading lead details...</p>
        </div>
      </div>
    );
  }

  if (error && !lead) {
    return (
      <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm">
        <FiAlertCircle className="w-5 h-5 shrink-0" />
        <span>{error}</span>
        <button onClick={fetchLead} className="ml-auto flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
          <FiRefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Link to="/leads" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#2563EB] transition-colors">
        <FiArrowLeft className="w-4 h-4" />Back to Leads
      </Link>
      {lead && <LeadDetailPanel leadId={id!} />}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};

export default LeadDetailPage;