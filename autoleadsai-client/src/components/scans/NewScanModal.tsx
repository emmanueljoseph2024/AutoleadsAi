// src/components/scans/NewScanModal.tsx

import { useState } from 'react';
import { FiTarget } from 'react-icons/fi';
import Modal from '../common/Modal';
import Button from '../common/Button';
import ScanSourceSelector from './ScanSourceSelector';
import Dropdown from '../common/Dropdown';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

interface NicheOption {
  value: string;
  label: string;
}

interface NewScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  niches: NicheOption[];
  onScanQueued?: (scan: any) => void;
}

const NewScanModal = ({ isOpen, onClose, niches, onScanQueued }: NewScanModalProps) => {
  const [sources, setSources] = useState<string[]>(['linkedin', 'website']);
  const [nicheId, setNicheId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const nicheOptions = [
    { value: '', label: 'No niche (general scan)' },
    ...niches,
  ];

  const handleStartScan = async () => {
    if (sources.length === 0) {
      setError('Select at least one source.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const payload: Record<string, any> = { sources };
      if (nicheId) payload.nicheId = nicheId;

      const { data } = await api.post(API_ENDPOINTS.SCANS.TRIGGER, payload);
      onScanQueued?.(data.scan);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to start scan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Start New Scan" size="xl">
      <div className="space-y-5">
        {/* Source Selection */}
        <div>
          <p className="text-sm font-medium text-[#374151] mb-3">
            Select up to 5 sources to scan
          </p>
          <ScanSourceSelector
            selected={sources}
            onChange={setSources}
            maxSources={5}
          />
        </div>

        {/* Niche Selection */}
        {niches.length > 0 && (
          <Dropdown
            label="Associate with Niche (optional)"
            options={nicheOptions}
            value={nicheId}
            onChange={setNicheId}
          />
        )}

        {/* Error */}
        {error && (
          <div className="p-3 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl text-[#EF4444] text-xs">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={onClose} className="flex-1" type="button">
            Cancel
          </Button>
          <Button
            onClick={handleStartScan}
            loading={loading}
            disabled={sources.length === 0}
            icon={<FiTarget className="w-4 h-4" />}
            className="flex-1"
          >
            Start Scan
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NewScanModal;