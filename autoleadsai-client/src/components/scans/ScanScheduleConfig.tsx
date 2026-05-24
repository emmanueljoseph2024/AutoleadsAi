// src/components/scans/ScanScheduleConfig.tsx

import { useState } from 'react';
import { FiClock, FiCheck } from 'react-icons/fi';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import Toast from '../common/Toast';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

interface ScanScheduleConfigProps {
  nicheId?: string | null;
  currentInterval?: string;
  onScheduleUpdated?: (interval: string) => void;
}

const intervalOptions = [
  { value: 'manual', label: 'Manual Only' },
  { value: 'hourly', label: 'Every Hour' },
  { value: 'daily', label: 'Daily (6 AM)' },
  { value: 'weekly', label: 'Weekly (Monday 7 AM)' },
];

const ScanScheduleConfig = ({
  nicheId = null,
  currentInterval = 'manual',
  onScheduleUpdated,
}: ScanScheduleConfigProps) => {
  const [interval, setInterval] = useState(currentInterval);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.put(`${API_ENDPOINTS.SCANS.BASE}/schedule`, {
        nicheId,
        interval,
      });
      setToast({ message: 'Scan schedule updated!', type: 'success' });
      onScheduleUpdated?.(interval);
    } catch (err: any) {
      setToast({ message: err?.response?.data?.error || 'Failed to update schedule.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const intervalDescriptions: Record<string, string> = {
    manual: 'Only scan when you click "Scan Now"',
    hourly: 'Automatically scan every hour',
    daily: 'Automatically scan every day at 6 AM',
    weekly: 'Automatically scan every Monday at 7 AM',
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-5">
      <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-1">Auto-Scan Schedule</h3>
      <p className="text-xs sm:text-sm text-[#6B7280] mb-4">
        Set up recurring scans to automatically discover new leads.
      </p>

      <div className="space-y-4">
        <Dropdown
          label="Scan Frequency"
          options={intervalOptions}
          value={interval}
          onChange={setInterval}
        />

        <div className="bg-[#F9FAFB] rounded-xl p-3 flex items-start gap-2">
          <FiClock className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" />
          <p className="text-xs text-[#6B7280]">
            {intervalDescriptions[interval] || intervalDescriptions.manual}
          </p>
        </div>

        {interval !== currentInterval && (
          <Button
            onClick={handleSave}
            loading={loading}
            icon={<FiCheck className="w-4 h-4" />}
            className="w-full"
          >
            Save Schedule
          </Button>
        )}
      </div>

      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};

export default ScanScheduleConfig;