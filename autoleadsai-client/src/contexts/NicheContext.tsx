// src/contexts/NicheContext.tsx

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
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

interface NicheContextType {
  niches: Niche[];
  selectedNicheId: string | null;
  loading: boolean;
  error: string;
  selectNiche: (nicheId: string | null) => void;
  fetchNiches: () => Promise<void>;
  createNiche: (data: Partial<Niche>) => Promise<void>;
  updateNiche: (id: string, data: Partial<Niche>) => Promise<void>;
  deleteNiche: (id: string) => Promise<void>;
}

const NicheContext = createContext<NicheContextType | null>(null);

export const useNiche = (): NicheContextType => {
  const context = useContext(NicheContext);
  if (!context) {
    throw new Error('useNiche must be used within a NicheProvider');
  }
  return context;
};

export const NicheProvider = ({ children }: { children: ReactNode }) => {
  const [niches, setNiches] = useState<Niche[]>([]);
  const [selectedNicheId, setSelectedNicheId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNiches = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(API_ENDPOINTS.DASHBOARD.NICHES);
      setNiches(data.niches || []);
    } catch (err: any) {
      setError('Failed to load niches.');
    } finally {
      setLoading(false);
    }
  }, []);

  const selectNiche = useCallback((nicheId: string | null) => {
    setSelectedNicheId(nicheId);
  }, []);

  const createNiche = useCallback(async (data: Partial<Niche>) => {
    await api.post(API_ENDPOINTS.NICHES.BASE, data);
    await fetchNiches();
  }, [fetchNiches]);

  const updateNiche = useCallback(async (id: string, data: Partial<Niche>) => {
    await api.put(API_ENDPOINTS.NICHES.BY_ID(id), data);
    await fetchNiches();
  }, [fetchNiches]);

  const deleteNiche = useCallback(async (id: string) => {
    await api.delete(API_ENDPOINTS.NICHES.BY_ID(id));
    if (selectedNicheId === id) {
      setSelectedNicheId(null);
    }
    await fetchNiches();
  }, [fetchNiches, selectedNicheId]);

  return (
    <NicheContext.Provider
      value={{
        niches,
        selectedNicheId,
        loading,
        error,
        selectNiche,
        fetchNiches,
        createNiche,
        updateNiche,
        deleteNiche,
      }}
    >
      {children}
    </NicheContext.Provider>
  );
};