// src/store/scanStore.ts

import { create } from 'zustand';

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

interface ScanState {
  scans: Scan[];
  page: number;
  totalPages: number;
  total: number;
  loading: boolean;
  error: string;
  setScans: (scans: Scan[]) => void;
  setPage: (page: number) => void;
  setPagination: (total: number, totalPages: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

export const useScanStore = create<ScanState>((set) => ({
  scans: [],
  page: 1,
  totalPages: 1,
  total: 0,
  loading: false,
  error: '',
  setScans: (scans) => set({ scans }),
  setPage: (page) => set({ page }),
  setPagination: (total, totalPages) => set({ total, totalPages }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));