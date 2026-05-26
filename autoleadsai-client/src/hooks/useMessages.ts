// src/hooks/useMessages.ts

import { useState, useCallback } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../utils/constants';

interface MessageTemplate {
  _id: string;
  leadId?: { _id: string; name: string };
  platform: string;
  type: string;
  body: string;
  tone: string;
  subject?: string;
  createdAt: string;
}

export const useMessages = () => {
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(API_ENDPOINTS.MESSAGES.BASE);
      setTemplates(data.templates || []);
    } catch (err: any) {
      setError('Failed to load message templates.');
    } finally {
      setLoading(false);
    }
  }, []);

  const generateMessage = useCallback(async (payload: {
    leadId?: string;
    platform: string;
    tone: string;
    type: string;
  }) => {
    setGenerating(true);
    setError('');
    try {
      const { data } = await api.post(API_ENDPOINTS.MESSAGES.GENERATE, payload);
      await fetchTemplates();
      return data.message;
    } catch (err: any) {
      setError('Failed to generate message.');
      return null;
    } finally {
      setGenerating(false);
    }
  }, [fetchTemplates]);

  return {
    templates,
    loading,
    generating,
    error,
    generateMessage,
    refetch: fetchTemplates,
  };
};