// src/types/user.ts

export interface Subscription {
  tier: 'starter' | 'pro' | 'scale';
  status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'inactive';
  trialStart: string;
  trialEnd: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  paddleCustomerId?: string;
  paddleSubscriptionId?: string;
}

export interface Trial {
  start: string;
  end: string;
  daysLeft: number;
  isActive: boolean;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string | null;
  emailVerified: boolean;
  role: 'user' | 'admin';
  subscription: Subscription;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}