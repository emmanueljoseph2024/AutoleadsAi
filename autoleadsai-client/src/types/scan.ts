// src/types/scan.ts

export interface ScanSource {
  value: string;
  label: string;
  icon: string;
  description: string;
}

export interface Scan {
  _id: string;
  userId: string;
  nicheId?: string;
  sources: string[];
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  totalFound: number;
  newLeads: number;
  results?: ScanResult[];
  errorLog?: string[];
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScanResult {
  source: string;
  rawData: any;
  leadId?: string;
}

export interface ScanJob {
  _id: string;
  userId: string;
  scanId: string;
  source: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  jobData?: any;
  resultSummary?: {
    found: number;
    new: number;
  };
  attempts: number;
  maxAttempts: number;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}