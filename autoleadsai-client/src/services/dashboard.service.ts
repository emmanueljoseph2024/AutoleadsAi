// src/services/dashboard.service.ts

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getDashboardStats = async (nicheId?: string) => {
  const params = nicheId ? `?nicheId=${nicheId}&expand=true` : '?expand=true';
  const { data } = await api.get(`${API_ENDPOINTS.DASHBOARD.STATS}${params}`);
  return data;
};

export const getPipelineData = async (nicheId?: string) => {
  const params = nicheId ? `?nicheId=${nicheId}` : '';
  const { data } = await api.get(`${API_ENDPOINTS.DASHBOARD.PIPELINE}${params}`);
  return data;
};

export const getRecentLeads = async (limit: number = 10) => {
  const { data } = await api.get(`${API_ENDPOINTS.DASHBOARD.RECENT_LEADS}?limit=${limit}`);
  return data;
};

export const getActivityFeed = async (limit: number = 8) => {
  const { data } = await api.get(`${API_ENDPOINTS.DASHBOARD.ACTIVITY}?limit=${limit}`);
  return data;
};

export const getNiches = async () => {
  const { data } = await api.get(API_ENDPOINTS.DASHBOARD.NICHES);
  return data;
};