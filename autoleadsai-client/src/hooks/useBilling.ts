// src/hooks/useBilling.ts

import { useState, useCallback, useEffect } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../utils/constants';

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

interface Subscription {
  tier: 'starter' | 'pro' | 'scale';
  status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'inactive';
  currentPeriodEnd?: string;
  trialEnd?: string;
  cancelEffectiveAt?: string;
}

export const useBilling = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBillingData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [plansRes, invoicesRes, usageRes, subRes] = await Promise.all([
        api.get(API_ENDPOINTS.BILLING.PLANS),
        api.get(API_ENDPOINTS.BILLING.INVOICES),
        api.get(`${API_ENDPOINTS.BILLING.PLANS}/usage`),
        api.get(`${API_ENDPOINTS.BILLING.PLANS}/subscription`),
      ]);

      setPlans(plansRes.data.plans || []);
      setInvoices(invoicesRes.data.invoices || []);
      setUsage(usageRes.data.usage || null);
      setSubscription(subRes.data.subscription || null);
    } catch (err: any) {
      setError('Failed to load billing information.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBillingData();
  }, [fetchBillingData]);

  const createCheckout = useCallback(async (priceId: string, successUrl?: string) => {
    const { data } = await api.post(API_ENDPOINTS.BILLING.CHECKOUT, {
      priceId,
      successUrl: successUrl || `${window.location.origin}/dashboard?upgraded=true`,
    });
    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    }
    return data;
  }, []);

  const openBillingPortal = useCallback(async () => {
    const { data } = await api.post(API_ENDPOINTS.BILLING.PORTAL);
    if (data.portalUrl) {
      window.location.href = data.portalUrl;
    }
    return data;
  }, []);

  const cancelSubscription = useCallback(async (reason?: string, feedback?: string) => {
    const { data } = await api.post(API_ENDPOINTS.BILLING.CANCEL, { reason, feedback });
    await fetchBillingData();
    return data;
  }, [fetchBillingData]);

  const downloadInvoice = useCallback(async (invoiceId: string) => {
    const response = await api.get(`${API_ENDPOINTS.BILLING.INVOICES}/${invoiceId}/download`, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `invoice-${invoiceId}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, []);

  const getUsagePercent = useCallback((used: number, limit: number | string): number => {
    if (typeof limit === 'string') return 0;
    if (limit === 0) return 100;
    return Math.min(100, Math.round((used / limit) * 100));
  }, []);

  const isUsageWarning = useCallback((used: number, limit: number | string): boolean => {
    if (typeof limit === 'string') return false;
    const percent = getUsagePercent(used, limit);
    return percent >= 80;
  }, [getUsagePercent]);

  const isUsageCritical = useCallback((used: number, limit: number | string): boolean => {
    if (typeof limit === 'string') return false;
    const percent = getUsagePercent(used, limit);
    return percent >= 95;
  }, [getUsagePercent]);

  const isTrialing = subscription?.status === 'trialing';
  const isActive = subscription?.status === 'active';
  const isPastDue = subscription?.status === 'past_due';
  const isCanceled = subscription?.status === 'canceled';

  const trialDaysLeft = subscription?.trialEnd
    ? Math.max(0, Math.ceil((new Date(subscription.trialEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const currentPlan = plans.find((p) => p.current);

  return {
    plans,
    invoices,
    usage,
    subscription,
    loading,
    error,
    currentPlan,
    createCheckout,
    openBillingPortal,
    cancelSubscription,
    downloadInvoice,
    getUsagePercent,
    isUsageWarning,
    isUsageCritical,
    isTrialing,
    isActive,
    isPastDue,
    isCanceled,
    trialDaysLeft,
    refetch: fetchBillingData,
  };
};