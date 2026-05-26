// src/pages/dashboard/ScansPage.tsx

import { useState, useEffect, useCallback } from 'react';
import { FiPlus, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import { useWebSocketEvents } from '../../hooks/useWebSocket';
import ScanHistoryTable from '../../components/scans/ScanHistoryTable';
import NewScanModal from '../../components/scans/NewScanModal';
import Button from '../../components/common/Button';
import Toast from '../../components/common/Toast';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

const ScansPage = () => {
  const [scans, setScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showNewScan, setShowNewScan] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const fetchScans = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '20');
      const { data } = await api.get(`${API_ENDPOINTS.SCANS.BASE}?${params.toString()}`);
      setScans(data.scans || []);
      setTotalPages(data.pages || 1);
      setTotal(data.total || 0);
    } catch (err: any) {
      setError('Failed to load scans.');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchScans(); }, [fetchScans]);

  useWebSocketEvents({
    'scan.completed': () => { fetchScans(); setToast({ message: 'Scan completed!', type: 'success' }); },
    'scan.failed': (data: any) => { fetchScans(); setToast({ message: `Scan failed: ${data.error || 'Unknown error'}`, type: 'error' }); },
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">Scans</h1>
          <p className="text-sm text-[#6B7280]">{total.toLocaleString()} total scans</p>
        </div>
        <Button size="sm" icon={<FiPlus className="w-4 h-4" />} onClick={() => setShowNewScan(true)}>New Scan</Button>
      </div>

      {error && (
        <div className="p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-3 text-[#EF4444] text-sm animate-scale-in">
          <FiAlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
          <button onClick={fetchScans} className="ml-auto flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
            <FiRefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      <ScanHistoryTable
        scans={scans}
        loading={loading}
        error={error}
        onRetry={fetchScans}
        page={page}
        totalPages={totalPages}
        total={total}
        limit={20}
        onPageChange={setPage}
      />

      <NewScanModal
        isOpen={showNewScan}
        onClose={() => setShowNewScan(false)}
        niches={[]}
        onScanQueued={() => { setToast({ message: 'Scan queued!', type: 'success' }); fetchScans(); }}
      />

      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};

export default ScansPage;