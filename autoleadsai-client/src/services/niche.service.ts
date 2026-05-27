// src/services/niche.service.ts

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getNichesList = async () => {
  const { data } = await api.get(API_ENDPOINTS.NICHES.BASE);
  return data;
};

export const getNicheById = async (id: string) => {
  const { data } = await api.get(API_ENDPOINTS.NICHES.BY_ID(id));
  return data;
};

export const createNiche = async (nicheData: Record<string, any>) => {
  const { data } = await api.post(API_ENDPOINTS.NICHES.BASE, nicheData);
  return data;
};

export const updateNiche = async (id: string, nicheData: Record<string, any>) => {
  const { data } = await api.put(API_ENDPOINTS.NICHES.BY_ID(id), nicheData);
  return data;
};

export const deleteNiche = async (id: string) => {
  const { data } = await api.delete(API_ENDPOINTS.NICHES.BY_ID(id));
  return data;
};