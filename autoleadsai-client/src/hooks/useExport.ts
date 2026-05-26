// src/hooks/useExport.ts

import { useState, useCallback } from 'react';
import api from '../services/api';

export const useExport = () => {
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');

  const exportData = useCallback(async (endpoint: string, filename: string, format: 'csv' | 'json' = 'csv') => {
    setExporting(true);
    setError('');
    try {
      const response = await api.get(endpoint, {
        params: { format },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${filename}-${Date.now()}.${format}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError('Export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  }, []);

  const exportLeads = useCallback(
    (filters?: Record<string, string>) => {
      const params = new URLSearchParams(filters || {}).toString();
      return exportData(`/leads?${params}`, 'leads-export', 'csv');
    },
    [exportData]
  );

  const exportEmailLogs = useCallback(
    () => exportData('/email-logs/export', 'email-logs-export', 'csv'),
    [exportData]
  );

  const exportScans = useCallback(
    () => exportData('/scans/export', 'scans-export', 'csv'),
    [exportData]
  );

  return {
    exporting,
    error,
    exportLeads,
    exportEmailLogs,
    exportScans,
    exportData,
  };
};