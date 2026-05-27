// src/services/email.service.ts

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getEmailLogs = async (params: Record<string, string>) => {
  const query = new URLSearchParams(params).toString();
  const { data } = await api.get(`${API_ENDPOINTS.DASHBOARD.EMAIL_PERFORMANCE}?${query}`);
  return data;
};