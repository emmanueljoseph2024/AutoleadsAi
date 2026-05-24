// src/components/scans/ScanTriggerButton.tsx

import { useState } from 'react';
import { FiTarget } from 'react-icons/fi';
import Button from '../common/Button';
import Toast from '../common/Toast';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

interface ScanTriggerButtonProps {
  sources: string[];
  nicheId?: string | null;
  onScanQueued?: (scan: any) => void;
  disabled?: boolean;
  className?: string;
}

const ScanTriggerButton = ({
  sources,
  nicheId = null,
  onScanQueued,
  disabled = false,
  className = '',
}: ScanTriggerButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleTriggerScan = async () => {
    if (sources.length === 0) {
      setToast({ message: 'Select at least one source to scan.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const payload: Record<string, any> = { sources };
      if (nicheId) payload.nicheId = nicheId;

      const { data } = await api.post(API_ENDPOINTS.SCANS.TRIGGER, payload);
      setToast({ message: 'Scan queued successfully!', type: 'success' });
      onScanQueued?.(data.scan);
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 429) {
        setToast({ message: 'Scan limit reached. Upgrade your plan to continue.', type: 'error' });
      } else {
        setToast({ message: err?.response?.data?.error || 'Failed to trigger scan.', type: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleTriggerScan}
        loading={loading}
        disabled={disabled || sources.length === 0}
        icon={<FiTarget className="w-4 h-4" />}
        className={className}
      >
        {loading ? 'Starting Scan...' : 'Scan Now'}
      </Button>

      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </>
  );
};

export default ScanTriggerButton;