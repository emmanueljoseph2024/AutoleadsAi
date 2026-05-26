// src/hooks/useScans.ts

import { useState, useCallback, useEffect } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../utils/constants';

interface Scan {
  _id: string;
  sources: string[];
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  totalFound: number;
  newLeads: number;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}

interface ScanPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const useScans = () => {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState<ScanPagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });

  const fetchScans = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      params.append('page', pagination.page.toString());
      params.append('limit', pagination.limit.toString());

      const { data } = await api.get(`${API_ENDPOINTS.SCANS.BASE}?${params.toString()}`);
      setScans(data.scans || []);
      setPagination((prev) => ({
        ...prev,
        total: data.total || 0,
        totalPages: data.pages || 1,
      }));
    } catch (err: any) {
      setError('Failed to load scans.');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit]);

  useEffect(() => {
    fetchScans();
  }, [fetchScans]);

  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const triggerScan = useCallback(async (sources: string[], nicheId?: string) => {
    const payload: Record<string, any> = { sources };
    if (nicheId) payload.nicheId = nicheId;

    const { data } = await api.post(API_ENDPOINTS.SCANS.TRIGGER, payload);
    await fetchScans();
    return data.scan;
  }, [fetchScans]);

  const cancelScan = useCallback(async (scanId: string) => {
    await api.post(API_ENDPOINTS.SCANS.CANCEL(scanId));
    await fetchScans();
  }, [fetchScans]);

  return {
    scans,
    loading,
    error,
    pagination,
    setPage,
    triggerScan,
    cancelScan,
    refetch: fetchScans,
  };
};