// src/store/authStore.ts

import { create } from 'zustand';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string | null;
  emailVerified: boolean;
  role: 'user' | 'admin';
  subscription: {
    tier: 'starter' | 'pro' | 'scale';
    status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'inactive';
    trialStart: string;
    trialEnd: string;
  };
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setAccessToken: (token) => {
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
    set({ accessToken: token, isAuthenticated: !!token });
  },
  setLoading: (loading) => set({ loading }),
  logout: () => {
    localStorage.removeItem('accessToken');
    set({ user: null, accessToken: null, isAuthenticated: false });
  },
}));