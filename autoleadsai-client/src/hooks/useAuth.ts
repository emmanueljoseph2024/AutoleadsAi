// src/hooks/useAuth.ts

import { useCallback } from 'react';
import { useAuth as useAuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const { user, loading, login, signup, logout, refreshUser } = useAuthContext();

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isTrialing = user?.subscription?.status === 'trialing';
  const isSubscribed = user?.subscription?.status === 'active';
  const trialDaysLeft = user?.subscription?.trialEnd
    ? Math.max(0, Math.ceil((new Date(user.subscription.trialEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return {
    user,
    loading,
    login,
    signup,
    logout,
    refreshUser,
    isAuthenticated,
    isAdmin,
    isTrialing,
    isSubscribed,
    trialDaysLeft,
  };
};