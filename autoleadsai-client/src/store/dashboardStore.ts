// src/store/dashboardStore.ts

import { create } from 'zustand';

interface DashboardStats {
  leads: {
    total: { count: number; link: string };
    hot: { count: number; link: string };
    warm: { count: number; link: string };
    cold: { count: number; link: string };
    converted: { count: number; link: string };
    conversionRate: string;
    newThisWeek: { count: number; link: string };
  };
  emails: {
    sent: { count: number; link: string };
    opened: { count: number; link: string };
    replied: { count: number; link: string };
    openRate: string;
    replyRate: string;
  };
  scans: {
    total: { count: number; link: string };
  };
}

interface ActivityItem {
  type: string;
  message: string;
  timestamp: string;
  link: string;
}

interface DashboardState {
  stats: DashboardStats | null;
  activities: ActivityItem[];
  selectedNicheId: string | null;
  loading: boolean;
  error: string;
  setStats: (stats: DashboardStats | null) => void;
  setActivities: (activities: ActivityItem[]) => void;
  setSelectedNicheId: (nicheId: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  activities: [],
  selectedNicheId: null,
  loading: true,
  error: '',
  setStats: (stats) => set({ stats }),
  setActivities: (activities) => set({ activities }),
  setSelectedNicheId: (nicheId) => set({ selectedNicheId: nicheId }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));