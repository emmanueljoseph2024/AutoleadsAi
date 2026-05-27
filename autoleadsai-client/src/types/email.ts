// src/types/email.ts

export interface EmailLog {
  _id: string;
  userId: string;
  leadId?: string;
  leadName?: string;
  to: string;
  from: string;
  subject: string;
  body: string;
  templateId?: string;
  type: 'initial' | 'follow_up_1' | 'follow_up_2' | 'follow_up_3' | 'follow_up_4' | 'follow_up_5' | 'manual';
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'complained' | 'replied';
  messageId?: string;
  providerResponse?: any;
  sentAt?: string;
  deliveredAt?: string;
  openedAt?: string;
  clickedAt?: string;
  repliedAt?: string;
  createdAt: string;
}

export interface EmailPerformance {
  totalSent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  bounced: number;
  deliveryRate: string;
  openRate: string;
  clickRate: string;
  replyRate: string;
  bounceRate: string;
  dailyStats: {
    date: string;
    sent: number;
    opened: number;
    replied: number;
  }[];
}

export interface NurtureSequence {
  _id: string;
  userId: string;
  leadId: string;
  status: 'active' | 'paused' | 'conversation' | 'converted' | 'closed_lost' | 'closed_spam' | 'unsubscribed';
  currentStep: number;
  maxSteps: number;
  steps: {
    stepNumber: number;
    delayDays: number;
    emailSubject: string;
    status: string;
    sentAt?: string;
    aiGenerated: boolean;
  }[];
  conversionProbability: number;
  startedAt: string;
  completedAt?: string;
}