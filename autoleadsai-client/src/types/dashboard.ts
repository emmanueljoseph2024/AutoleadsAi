// src/types/dashboard.ts

export interface DashboardStats {
  leads: {
    total: { count: number; link: string };
    hot: { count: number; link: string };
    warm: { count: number; link: string };
    cold: { count: number; link: string };
    converted: { count: number; link: string };
    conversionRate: string;
    newThisWeek: { count: number; link: string };
    newThisMonth: { count: number; link: string };
  };
  emails: {
    sent: { count: number; link: string };
    opened: { count: number; link: string };
    replied: { count: number; link: string };
    openRate: string;
    replyRate: string;
  };
  scans: {
    total: { count: number; link: string };
    thisMonth: { count: number; link: string };
  };
  samples?: {
    hotLeads: any[];
    newThisWeek: any[];
    converted: any[];
  };
}

export interface PipelineData {
  statusBreakdown: { status: string; count: number; link: string }[];
  qualificationBreakdown: { qualification: string; count: number; link: string }[];
  sourceBreakdown: { source: string; count: number; link: string }[];
}

export interface ActivityItem {
  type: 'scan' | 'email' | 'lead_update';
  message: string;
  timestamp: string;
  link: string;
  data?: any;
}

export interface SourceAnalytics {
  source: string;
  total: number;
  hot: number;
  warm: number;
  cold: number;
  converted: number;
  hotRate: number;
  conversionRate: number;
  link: string;
  hotLink: string;
  convertedLink: string;
  samples?: any[];
}