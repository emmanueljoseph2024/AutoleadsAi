// src/types/lead.ts

export interface Intent {
  score: number;
  keywords: string[];
  summary: string;
}

export interface Relevance {
  score: number;
  factors: {
    industryMatch: boolean;
    roleMatch: boolean;
    geoMatch: boolean;
  };
}

export interface SourceMeta {
  label: string;
  icon: string;
  color: string;
  canChat: boolean;
  chatUrl: string | null;
}

export interface Lead {
  _id: string;
  userId: string;
  email: string;
  name: string;
  company: string;
  source: string;
  sourceUrl: string;
  sourceMeta?: SourceMeta;
  nicheId?: string;
  qualification: 'hot' | 'warm' | 'cold';
  status: 'new' | 'scored' | 'qualified' | 'contacted' | 'replied' | 'converted' | 'disqualified';
  intent: Intent;
  relevance: Relevance;
  emailHistory?: EmailHistoryItem[];
  externalCrmId?: string;
  linkPreview?: LinkPreview;
  assignedTo?: string;
  lastContactedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailHistoryItem {
  emailId: string;
  type: string;
  sentAt: string;
  status: string;
}

export interface LinkPreview {
  title: string;
  description: string;
  image: string | null;
  favicon: string | null;
  domain: string;
  siteName: string;
}

export interface LeadFilter {
  search?: string;
  qualification?: string;
  status?: string;
  source?: string;
  sort?: string;
  page?: number;
  limit?: number;
}