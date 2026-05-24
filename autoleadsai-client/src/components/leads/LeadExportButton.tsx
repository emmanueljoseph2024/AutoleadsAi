// src/components/leads/LeadExportButton.tsx

import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import Button from '../common/Button';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

interface LeadExportButtonProps {
  filters?: Record<string, string>;
}

const LeadExportButton = ({ filters = {} }: LeadExportButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async (format: 'csv' | 'json') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ format, ...filters });
      const response = await api.get(`${API_ENDPOINTS.LEADS.BASE}?${params.toString()}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leads-export-${Date.now()}.${format}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-flex">
      <Button
        variant="outline"
        size="sm"
        loading={loading}
        icon={<FiDownload className="w-4 h-4" />}
        onClick={() => handleExport('csv')}
      >
        Export
      </Button>
    </div>
  );
};

export default LeadExportButton;