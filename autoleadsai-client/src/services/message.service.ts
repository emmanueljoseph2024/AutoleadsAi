// src/services/message.service.ts

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getMessageTemplates = async (platform?: string) => {
  const params = platform && platform !== 'all' ? `?platform=${platform}` : '';
  const { data } = await api.get(`${API_ENDPOINTS.MESSAGES.BASE}${params}`);
  return data;
};

export const generateMessage = async (payload: {
  leadId?: string;
  platform: string;
  tone: string;
  type: string;
}) => {
  const { data } = await api.post(API_ENDPOINTS.MESSAGES.GENERATE, payload);
  return data;
};