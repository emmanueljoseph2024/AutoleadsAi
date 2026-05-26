// src/hooks/useWorkflows.ts

import { useState, useCallback, useEffect } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../utils/constants';

interface Workflow {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  trigger: { type: string; config: any };
  steps: { type: string; config: any; order: number }[];
  runCount: number;
  lastRunAt?: string;
  createdAt: string;
}

export const useWorkflows = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWorkflows = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(API_ENDPOINTS.WORKFLOWS.BASE);
      setWorkflows(data.workflows || []);
    } catch (err: any) {
      setError('Failed to load workflows.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  const createWorkflow = useCallback(async (workflowData: Partial<Workflow>) => {
    const { data } = await api.post(API_ENDPOINTS.WORKFLOWS.BASE, workflowData);
    await fetchWorkflows();
    return data.workflow;
  }, [fetchWorkflows]);

  const updateWorkflow = useCallback(async (id: string, workflowData: Partial<Workflow>) => {
    const { data } = await api.put(API_ENDPOINTS.WORKFLOWS.BY_ID(id), workflowData);
    await fetchWorkflows();
    return data.workflow;
  }, [fetchWorkflows]);

  const deleteWorkflow = useCallback(async (id: string) => {
    await api.delete(API_ENDPOINTS.WORKFLOWS.BY_ID(id));
    await fetchWorkflows();
  }, [fetchWorkflows]);

  const toggleWorkflow = useCallback(async (id: string) => {
    const { data } = await api.patch(API_ENDPOINTS.WORKFLOWS.TOGGLE(id));
    await fetchWorkflows();
    return data.workflow;
  }, [fetchWorkflows]);

  const testWorkflow = useCallback(async (id: string) => {
    const { data } = await api.post(`/workflows/${id}/test`);
    return data;
  }, []);

  return {
    workflows,
    loading,
    error,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow,
    toggleWorkflow,
    testWorkflow,
    refetch: fetchWorkflows,
  };
};