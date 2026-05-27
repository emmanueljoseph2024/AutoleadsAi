// src/store/leadStore.ts

import { create } from 'zustand';

interface Lead {
  _id: string;
  name: string;
  email: string;
  company: string;
  source: string;
  sourceUrl: string;
  qualification: 'hot' | 'warm' | 'cold';
  status: string;
  intent?: { score: number };
  createdAt: string;
}

interface LeadFilters {
  search: string;
  qualification: string;
  status: string;
  source: string;
}

interface LeadState {
  leads: Lead[];
  selectedLeads: string[];
  filters: LeadFilters;
  page: number;
  totalPages: number;
  total: number;
  loading: boolean;
  error: string;
  setLeads: (leads: Lead[]) => void;
  setSelectedLeads: (ids: string[]) => void;
  setFilters: (filters: Partial<LeadFilters>) => void;
  clearFilters: () => void;
  setPage: (page: number) => void;
  setPagination: (total: number, totalPages: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

const defaultFilters: LeadFilters = {
  search: '',
  qualification: 'all',
  status: 'all',
  source: 'all',
};

export const useLeadStore = create<LeadState>((set) => ({
  leads: [],
  selectedLeads: [],
  filters: { ...defaultFilters },
  page: 1,
  totalPages: 1,
  total: 0,
  loading: false,
  error: '',
  setLeads: (leads) => set({ leads }),
  setSelectedLeads: (ids) => set({ selectedLeads: ids }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  clearFilters: () => set({ filters: { ...defaultFilters }, page: 1 }),
  setPage: (page) => set({ page }),
  setPagination: (total, totalPages) => set({ total, totalPages }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));