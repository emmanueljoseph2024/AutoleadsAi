// src/store/billingStore.ts

import { create } from 'zustand';

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: string;
  features: string[];
  highlighted?: boolean;
  current?: boolean;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  currency: string;
  status: 'paid' | 'open' | 'void';
  pdfUrl?: string;
}

interface Usage {
  scansUsed: number;
  scansLimit: number;
  emailsUsed: number;
  emailsLimit: number;
  teamUsed: number;
  teamLimit: number;
}

interface BillingState {
  plans: Plan[];
  invoices: Invoice[];
  usage: Usage | null;
  billingInterval: 'monthly' | 'yearly';
  loading: boolean;
  error: string;
  setPlans: (plans: Plan[]) => void;
  setInvoices: (invoices: Invoice[]) => void;
  setUsage: (usage: Usage | null) => void;
  setBillingInterval: (interval: 'monthly' | 'yearly') => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

export const useBillingStore = create<BillingState>((set) => ({
  plans: [],
  invoices: [],
  usage: null,
  billingInterval: 'monthly',
  loading: false,
  error: '',
  setPlans: (plans) => set({ plans }),
  setInvoices: (invoices) => set({ invoices }),
  setUsage: (usage) => set({ usage }),
  setBillingInterval: (interval) => set({ billingInterval: interval }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));