// src/services/billing.service.ts

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getPlans = async () => {
  const { data } = await api.get(API_ENDPOINTS.BILLING.PLANS);
  return data;
};

export const createCheckout = async (priceId: string, successUrl?: string) => {
  const { data } = await api.post(API_ENDPOINTS.BILLING.CHECKOUT, {
    priceId,
    successUrl: successUrl || `${window.location.origin}/dashboard?upgraded=true`,
  });
  return data;
};

export const openBillingPortal = async () => {
  const { data } = await api.post(API_ENDPOINTS.BILLING.PORTAL);
  return data;
};

export const getInvoices = async () => {
  const { data } = await api.get(API_ENDPOINTS.BILLING.INVOICES);
  return data;
};

export const cancelSubscription = async (reason?: string, feedback?: string) => {
  const { data } = await api.post(API_ENDPOINTS.BILLING.CANCEL, { reason, feedback });
  return data;
};