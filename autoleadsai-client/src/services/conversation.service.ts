// src/services/conversation.service.ts

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getConversations = async (platform?: string) => {
  const params = platform && platform !== 'all' ? `?platform=${platform}` : '';
  const { data } = await api.get(`${API_ENDPOINTS.CONVERSATIONS.BASE}${params}`);
  return data;
};

export const getConversationById = async (id: string) => {
  const { data } = await api.get(API_ENDPOINTS.CONVERSATIONS.BY_ID(id));
  return data;
};

export const sendMessage = async (conversationId: string, content: string) => {
  const { data } = await api.post(API_ENDPOINTS.CONVERSATIONS.REPLY(conversationId), {
    content,
    aiGenerated: false,
  });
  return data;
};