// src/services/webhook.service.ts

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const triggerN8nWebhook = async (event: string, payload: Record<string, any>) => {
  const { data } = await api.post(`${API_ENDPOINTS.WEBHOOKS.N8N}/${event}`, payload);
  return data;
};