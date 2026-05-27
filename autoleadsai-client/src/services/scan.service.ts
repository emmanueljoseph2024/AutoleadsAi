// src/services/scan.service.ts

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getScans = async (page: number, limit: number = 20) => {
  const { data } = await api.get(`${API_ENDPOINTS.SCANS.BASE}?page=${page}&limit=${limit}`);
  return data;
};

export const getScanById = async (id: string) => {
  const { data } = await api.get(API_ENDPOINTS.SCANS.BY_ID(id));
  return data;
};

export const triggerScan = async (sources: string[], nicheId?: string) => {
  const payload: Record<string, any> = { sources };
  if (nicheId) payload.nicheId = nicheId;
  const { data } = await api.post(API_ENDPOINTS.SCANS.TRIGGER, payload);
  return data;
};

export const cancelScan = async (id: string) => {
  const { data } = await api.post(API_ENDPOINTS.SCANS.CANCEL(id));
  return data;
};