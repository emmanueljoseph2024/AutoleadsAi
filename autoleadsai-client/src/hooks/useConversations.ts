// src/hooks/useConversations.ts

import { useState, useCallback, useEffect } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../utils/constants';

interface Conversation {
  _id: string;
  leadId?: { _id: string; name: string; email: string };
  platform: string;
  status: string;
  messages: {
    direction: 'inbound' | 'outbound';
    content: string;
    aiGenerated: boolean;
    createdAt: string;
  }[];
  aiEscalated: boolean;
  lastActivityAt: string;
}

export const useConversations = (platform: string = 'all') => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchConversations = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (platform !== 'all') params.append('platform', platform);

      const { data } = await api.get(`${API_ENDPOINTS.CONVERSATIONS.BASE}?${params.toString()}`);
      setConversations(data.conversations || []);
    } catch (err: any) {
      setError('Failed to load conversations.');
    } finally {
      setLoading(false);
    }
  }, [platform]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const sendMessage = useCallback(async (conversationId: string, content: string) => {
    const { data } = await api.post(API_ENDPOINTS.CONVERSATIONS.REPLY(conversationId), {
      content,
      aiGenerated: false,
    });
    await fetchConversations();
    return data;
  }, [fetchConversations]);

  return {
    conversations,
    loading,
    error,
    sendMessage,
    refetch: fetchConversations,
  };
};