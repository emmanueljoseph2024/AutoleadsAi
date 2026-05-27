// src/store/nicheStore.ts

import { create } from 'zustand';

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

interface NicheState {
  niches: Niche[];
  selectedNiche: Niche | null;
  loading: boolean;
  error: string;
  setNiches: (niches: Niche[]) => void;
  setSelectedNiche: (niche: Niche | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

export const useNicheStore = create<NicheState>((set) => ({
  niches: [],
  selectedNiche: null,
  loading: false,
  error: '',
  setNiches: (niches) => set({ niches }),
  setSelectedNiche: (niche) => set({ selectedNiche: niche }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));