// src/pages/auth/LoginPage.tsx

import { useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import Toast from '../../components/common/Toast';
import OAuthButtons from '../../components/auth/OAuthButtons';
import AutoleadsAiLogo from '../../assets/AutoleadsAiLogo.svg';
import { sanitizeString } from '../../utils/sanitizers';
import { isValidEmail } from '../../utils/validators';

interface LoginError {
  field: string;
  message: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = (location.state as { from?: string })?.from || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginError[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const validate = useCallback(() => {
    const newErrors: LoginError[] = [];
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      newErrors.push({ field: 'email', message: 'Email is required' });
    } else if (!isValidEmail(trimmedEmail)) {
      newErrors.push({ field: 'email', message: 'Please enter a valid email address' });
    } else if (trimmedEmail.length > 255) {
      newErrors.push({ field: 'email', message: 'Email is too long' });
    }

    if (!password) {
      newErrors.push({ field: 'password', message: 'Password is required' });
    } else if (password.length > 128) {
      newErrors.push({ field: 'password', message: 'Password is too long' });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  }, [email, password]);

  const getFieldError = (field: string) => errors.find((e) => e.field === field)?.message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const sanitizedEmail = sanitizeString(email.trim().toLowerCase());

    setLoading(true);

    try {
      await login(sanitizedEmail, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      const status = err?.response?.status;
      const serverMessage = err?.response?.data?.error;

      if (status === 401) {
        setErrors([
          { field: 'email', message: '' },
          { field: 'password', message: serverMessage || 'Invalid email or password' },
        ]);
        setToast({ message: serverMessage || 'Invalid email or password', type: 'error' });
      } else if (status === 403) {
        setToast({ message: serverMessage || 'Account deactivated. Contact support.', type: 'error' });
      } else if (status === 429) {
        setToast({ message: 'Too many attempts. Please try again later.', type: 'error' });
      } else {
        setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F9FAFB]">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2563EB] to-[#4F46E5] items-center justify-center p-8 xl:p-12 relative overflow-hidden">
        {/* Decorative background elements — GPU accelerated */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-48 h-48 xl:w-64 xl:h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 xl:w-96 xl:h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] xl:w-[500px] xl:h-[500px] border border-white/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] xl:w-[600px] xl:h-[600px] border border-white/10 rounded-full" />
        </div>

        <div className="relative z-10 text-center max-w-lg animate-fade-in">
          <div className="w-16 h-16 xl:w-20 xl:h-20 bg-white/20 backdrop-blur-sm rounded-2xl xl:rounded-3xl flex items-center justify-center mx-auto mb-6 xl:mb-8 shadow-lg">
            <img src={AutoleadsAiLogo} alt="AutoLeads AI" className="w-8 h-8 xl:w-10 xl:h-10" />
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold text-white mb-3 xl:mb-4">Welcome Back</h1>
          <p className="text-sm xl:text-lg text-blue-100 leading-relaxed">
            Log in to access your AI-powered lead generation dashboard and continue converting prospects.
          </p>

          <div className="mt-8 xl:mt-12 grid grid-cols-3 gap-3 xl:gap-6">
            {[
              { value: '10k+', label: 'Leads Generated' },
              { value: '24/7', label: 'AI Automation' },
              { value: '98%', label: 'Accuracy Rate' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-xl xl:rounded-2xl p-3 xl:p-4 transition-transform duration-200 hover:scale-105"
              >
                <div className="text-lg xl:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-[10px] xl:text-sm text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm sm:max-w-md animate-slide-up">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#2563EB] to-[#4F46E5] rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <img src={AutoleadsAiLogo} alt="AutoLeads AI" className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">AutoLeads AI</h1>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-[#E5E7EB] p-6 sm:p-8">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">Sign In</h2>
              <p className="text-sm sm:text-base text-[#6B7280] mt-1">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              {/* Server Error Banner */}
              {getFieldError('password') && getFieldError('email') === '' && (
                <div className="p-3 sm:p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-2 sm:gap-3 animate-scale-in">
                  <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#EF4444] flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-[#EF4444]">{getFieldError('password')}</p>
                </div>
              )}

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => prev.filter((err) => err.field !== 'email' && err.field !== 'password'));
                }}
                placeholder="john@example.com"
                icon={<FiMail className="w-4 h-4 sm:w-5 sm:h-5" />}
                error={getFieldError('email')}
                autoComplete="email"
                autoFocus
                maxLength={255}
              />

              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => prev.filter((err) => err.field === 'password'));
                }}
                placeholder="••••••••"
                icon={<FiLock className="w-4 h-4 sm:w-5 sm:h-5" />}
                rightIcon={
                  showPassword ? (
                    <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )
                }
                onRightIconClick={() => setShowPassword(!showPassword)}
                error={getFieldError('password')}
                autoComplete="current-password"
                maxLength={128}
              />

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-xs sm:text-sm text-[#2563EB] hover:text-[#1D4ED8] font-medium transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                loading={loading}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Loading Overlay with Spinner */}
            {loading && (
              <div className="mt-6 flex items-center justify-center gap-3 py-4 animate-fade-in">
                <Spinner size="sm" />
                <p className="text-sm text-[#6B7280]">Verifying your credentials...</p>
              </div>
            )}

            {/* Divider */}
            <div className="relative my-5 sm:my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]" />
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-3 sm:px-4 bg-white text-[#9CA3AF]">or continue with</span>
              </div>
            </div>

            <OAuthButtons />

            <p className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-[#6B7280]">
              Don&apos;t have an account?{' '}
              <Link
                to="/signup"
                className="text-[#2563EB] hover:text-[#1D4ED8] font-semibold transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}
    </div>
  );
};

export default LoginPage;