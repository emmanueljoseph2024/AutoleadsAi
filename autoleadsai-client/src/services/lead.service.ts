// src/services/lead.service.ts

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getLeads = async (params: Record<string, string>) => {
  const query = new URLSearchParams(params).toString();
  const { data } = await api.get(`${API_ENDPOINTS.LEADS.BASE}?${query}`);
  return data;
};

export const getLeadById = async (id: string) => {
  const { data } = await api.get(API_ENDPOINTS.LEADS.BY_ID(id));
  return data;
};

export const createLead = async (leadData: Record<string, any>) => {
  const { data } = await api.post(API_ENDPOINTS.LEADS.BASE, leadData);
  return data;
};

export const updateLead = async (id: string, leadData: Record<string, any>) => {
  const { data } = await api.put(API_ENDPOINTS.LEADS.BY_ID(id), leadData);
  return data;
};

export const deleteLead = async (id: string) => {
  const { data } = await api.delete(API_ENDPOINTS.LEADS.BY_ID(id));
  return data;
};

export const bulkDeleteLeads = async (ids: string[]) => {
  const { data } = await api.post(API_ENDPOINTS.LEADS.BULK, { ids, action: 'delete' });
  return data;
};

export const importLeads = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post(`${API_ENDPOINTS.LEADS.BASE}/import`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};