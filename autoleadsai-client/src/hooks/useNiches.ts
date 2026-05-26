// src/hooks/useNiches.ts

import { useState, useCallback, useEffect } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../utils/constants';

interface Niche {
  _id: string;
  name: string;
  keywords: string[];
  location: string;
  sources: string[];
  stats: {
    totalLeads: number;
    hotLeads: number;
    totalScans: number;
  };
  lastScanAt: string | null;
  createdAt: string;
}

export const useNiches = () => {
  const [niches, setNiches] = useState<Niche[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNiches = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(API_ENDPOINTS.NICHES.BASE);
      setNiches(data.niches || []);
    } catch (err: any) {
      setError('Failed to load niches.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNiches();
  }, [fetchNiches]);

  const createNiche = useCallback(async (nicheData: Partial<Niche>) => {
    const { data } = await api.post(API_ENDPOINTS.NICHES.BASE, nicheData);
    await fetchNiches();
    return data.niche;
  }, [fetchNiches]);

  const updateNiche = useCallback(async (id: string, nicheData: Partial<Niche>) => {
    const { data } = await api.put(API_ENDPOINTS.NICHES.BY_ID(id), nicheData);
    await fetchNiches();
    return data.niche;
  }, [fetchNiches]);

  const deleteNiche = useCallback(async (id: string) => {
    await api.delete(API_ENDPOINTS.NICHES.BY_ID(id));
    await fetchNiches();
  }, [fetchNiches]);

  return {
    niches,
    loading,
    error,
    createNiche,
    updateNiche,
    deleteNiche,
    refetch: fetchNiches,
  };
};