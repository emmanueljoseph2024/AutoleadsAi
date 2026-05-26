// src/hooks/useDashboard.ts

import { useState, useCallback, useEffect } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../utils/constants';

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

export const useDashboard = (nicheId: string | null = null) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const nicheParam = nicheId ? `?nicheId=${nicheId}` : '';
      const [statsRes, activityRes] = await Promise.all([
        api.get(`${API_ENDPOINTS.DASHBOARD.STATS}${nicheParam}`),
        api.get(`${API_ENDPOINTS.DASHBOARD.ACTIVITY}?limit=8`),
      ]);
      setStats(statsRes.data);
      setActivities(activityRes.data.activities || []);
    } catch (err: any) {
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, [nicheId]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    stats,
    activities,
    loading,
    error,
    refetch: fetchDashboard,
  };
};