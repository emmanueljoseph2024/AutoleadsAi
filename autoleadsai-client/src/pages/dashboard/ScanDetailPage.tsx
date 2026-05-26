// src/pages/dashboard/ScanDetailPage.tsx

import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import ScanResultsSummary from '../../components/scans/ScanResultsSummary';
import ScanProgressBar from '../../components/scans/ScanProgressBar';
import LeadTable from '../../components/leads/LeadTable';
import Spinner from '../../components/common/Spinner';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

const ScanDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [scan, setScan] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchScanDetail = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(API_ENDPOINTS.SCANS.BY_ID(id));
      setScan(data.scan);
      setLeads(data.leads || []);
    } catch (err: any) {
      setError('Failed to load scan details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchScanDetail(); }, [fetchScanDetail]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Link to="/scans" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#2563EB] transition-colors">
        <FiArrowLeft className="w-4 h-4" />Back to Scans
      </Link>

      {error && (
        <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm">
          <FiAlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
          <button onClick={fetchScanDetail} className="ml-auto flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
            <FiRefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      {scan && (
        <>
          <ScanProgressBar status={scan.status} sources={scan.sources} />
          <ScanResultsSummary totalFound={scan.totalFound} newLeads={scan.newLeads} existingLeads={scan.totalFound - scan.newLeads} />
          <LeadTable leads={leads} loading={false} error="" page={1} totalPages={1} total={leads.length} limit={50} onPageChange={() => {}} />
        </>
      )}
    </div>
  );
};

export default ScanDetailPage;