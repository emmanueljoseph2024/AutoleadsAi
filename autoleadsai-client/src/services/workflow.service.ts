// src/services/workflow.service.ts

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getWorkflows = async () => {
  const { data } = await api.get(API_ENDPOINTS.WORKFLOWS.BASE);
  return data;
};

export const getWorkflowById = async (id: string) => {
  const { data } = await api.get(API_ENDPOINTS.WORKFLOWS.BY_ID(id));
  return data;
};

export const createWorkflow = async (workflowData: Record<string, any>) => {
  const { data } = await api.post(API_ENDPOINTS.WORKFLOWS.BASE, workflowData);
  return data;
};

export const updateWorkflow = async (id: string, workflowData: Record<string, any>) => {
  const { data } = await api.put(API_ENDPOINTS.WORKFLOWS.BY_ID(id), workflowData);
  return data;
};

export const deleteWorkflow = async (id: string) => {
  const { data } = await api.delete(API_ENDPOINTS.WORKFLOWS.BY_ID(id));
  return data;
};

export const toggleWorkflow = async (id: string) => {
  const { data } = await api.patch(API_ENDPOINTS.WORKFLOWS.TOGGLE(id));
  return data;
};