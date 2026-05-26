import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import api from '../services/api';

// ------------------------------------------------------------
// User type (adjust fields to match your actual backend response)
// ------------------------------------------------------------
export interface User {
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
    currentPeriodStart?: string;
    currentPeriodEnd?: string;
    paddleCustomerId?: string;
    paddleSubscriptionId?: string;
  };
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

// ------------------------------------------------------------
// API response types
// ------------------------------------------------------------
interface AuthResponse {
  user: User;
  accessToken: string;
}

// ------------------------------------------------------------
// Auth context shape
// ------------------------------------------------------------
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (formData: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// ------------------------------------------------------------
// Signup payload type
// ------------------------------------------------------------
interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// ------------------------------------------------------------
// Context
// ------------------------------------------------------------
const AuthContext = createContext<AuthContextType | null>(null);

// ------------------------------------------------------------
// Hook
// ------------------------------------------------------------
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// ------------------------------------------------------------
// Provider
// ------------------------------------------------------------
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get<{ user: User }>('/auth/me')
      .then((response: { data: { user: User } }) => setUser(response.data.user))
      .catch(() => {
        localStorage.removeItem('accessToken');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // ------------------------------------------------------------
  // Login
  // ------------------------------------------------------------
  const login = useCallback(async (email: string, password: string): Promise<void> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    localStorage.setItem('accessToken', response.data.accessToken);
    setUser(response.data.user);
  }, []);

  // ------------------------------------------------------------
  // Signup
  // ------------------------------------------------------------
  const signup = useCallback(async (formData: SignupPayload): Promise<void> => {
    const response = await api.post<AuthResponse>('/auth/signup', formData);
    localStorage.setItem('accessToken', response.data.accessToken);
    setUser(response.data.user);
  }, []);

  // ------------------------------------------------------------
  // Logout
  // ------------------------------------------------------------
  const logout = useCallback(async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Proceed with logout even if API call fails
    } finally {
      localStorage.removeItem('accessToken');
      setUser(null);
    }
  }, []);

  // ------------------------------------------------------------
  // Refresh user data
  // ------------------------------------------------------------
  const refreshUser = useCallback(async (): Promise<void> => {
    try {
      const response = await api.get<{ user: User }>('/auth/me');
      setUser(response.data.user);
    } catch {
      // Silently fail — user will be redirected by ProtectedRoute if token is invalid
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};