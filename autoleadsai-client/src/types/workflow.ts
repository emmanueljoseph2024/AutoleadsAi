// src/types/workflow.ts

export interface WorkflowStep {
  type: 'scoring' | 'filter' | 'email' | 'crm_sync' | 'slack_alert' | 'delay' | 'condition';
  config: Record<string, any>;
  order: number;
}

export interface WorkflowTrigger {
  type: 'new_lead' | 'lead_scored' | 'manual';
  config: Record<string, any>;
}

export interface Workflow {
  _id: string;
  userId: string;
  name: string;
  description: string;
  isActive: boolean;
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
  runCount: number;
  lastRunAt?: string;
  createdAt: string;
  updatedAt: string;
}