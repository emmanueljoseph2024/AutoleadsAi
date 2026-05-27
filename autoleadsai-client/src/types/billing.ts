// src/types/billing.ts

export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    scansPerMonth: number | string;
    emailsPerMonth: number | string;
    followUpSteps: number | string;
    teamMembers: number;
    crmConnections: number | string;
    slackAlerts: boolean;
    apiAccess: boolean;
    whiteLabel: boolean;
  };
  highlighted?: boolean;
  current?: boolean;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  currency: string;
  status: 'paid' | 'open' | 'void';
  pdfUrl?: string;
}

export interface CheckoutSession {
  checkoutUrl: string;
  sessionId: string;
}

export interface Usage {
  scansUsed: number;
  scansLimit: number;
  emailsUsed: number;
  emailsLimit: number;
  teamUsed: number;
  teamLimit: number;
}