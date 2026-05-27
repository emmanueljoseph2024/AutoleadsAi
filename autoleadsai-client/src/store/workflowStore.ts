// src/store/workflowStore.ts

import { create } from 'zustand';

interface WorkflowStep {
  type: string;
  config: any;
  order: number;
}

interface Workflow {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  trigger: { type: string; config: any };
  steps: WorkflowStep[];
  runCount: number;
  lastRunAt?: string;
  createdAt: string;
}

interface WorkflowState {
  workflows: Workflow[];
  currentWorkflow: Workflow | null;
  loading: boolean;
  error: string;
  setWorkflows: (workflows: Workflow[]) => void;
  setCurrentWorkflow: (workflow: Workflow | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  workflows: [],
  currentWorkflow: null,
  loading: false,
  error: '',
  setWorkflows: (workflows) => set({ workflows }),
  setCurrentWorkflow: (workflow) => set({ currentWorkflow: workflow }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));