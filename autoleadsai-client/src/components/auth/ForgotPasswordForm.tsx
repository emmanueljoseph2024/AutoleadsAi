// src/pages/auth/ForgotPasswordPage.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import Toast from '../../components/common/Toast';
import AutoleadsAiLogo from '../../assets/AutoleadsAiLogo.svg';
import { sanitizeEmail } from '../../utils/sanitizers';
import { isValidEmail } from '../../utils/validators';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const validate = (): boolean => {
    const trimmed = email.trim();
    if (!trimmed) {
      setError('Email is required');
      return false;
    }
    if (trimmed.length > 255) {
      setError('Email is too long');
      return false;
    }
    if (!isValidEmail(trimmed)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const sanitizedEmail = sanitizeEmail(email);
    setLoading(true);
    setError('');

    try {
      await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email: sanitizedEmail });
      setSent(true);
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 429) {
        setToast({ message: 'Too many attempts. Please try again later.', type: 'error' });
      } else {
        setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#F9FAFB]">
      <div className="w-full max-w-sm sm:max-w-md animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#2563EB] to-[#4F46E5] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <img src={AutoleadsAiLogo} alt="AutoLeads AI" className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">AutoLeads AI</h1>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-[#E5E7EB] p-6 sm:p-8">
          {!sent ? (
            <>
              {/* Mail Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#EFF6FF] rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <FiMail className="w-7 h-7 sm:w-8 sm:h-8 text-[#2563EB]" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] text-center mb-2">
                Forgot your password?
              </h2>
              <p className="text-sm sm:text-base text-[#6B7280] text-center mb-6 sm:mb-8">
                Enter your email and we'll send you a reset link.
              </p>

              {/* Error Banner */}
              {error && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-2 sm:gap-3 text-[#EF4444] text-xs sm:text-sm animate-scale-in">
                  <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="john@example.com"
                  icon={<FiMail className="w-4 h-4 sm:w-5 sm:h-5" />}
                  error={error}
                  autoFocus
                  maxLength={255}
                  autoComplete="email"
                />

                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                  icon={!loading ? <FiSend className="w-4 h-4" /> : undefined}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>

              {/* Loading Overlay with Spinner */}
              {loading && (
                <div className="mt-6 flex items-center justify-center gap-3 py-3 animate-fade-in">
                  <Spinner size="sm" />
                  <p className="text-sm text-[#6B7280]">Sending reset link to your email...</p>
                </div>
              )}
            </>
          ) : (
            /* Success State */
            <div className="text-center animate-scale-in">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#DCFCE7] rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <FiCheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-[#22C55E]" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-2">
                Check your email
              </h2>
              <p className="text-sm sm:text-base text-[#6B7280] mb-1">
                We've sent a password reset link to
              </p>
              <p className="text-sm font-semibold text-[#111827] mb-6">{email}</p>

              <p className="text-xs text-[#9CA3AF] mb-6">
                Didn't receive it? Check your spam folder or{' '}
                <button
                  onClick={() => setSent(false)}
                  className="text-[#2563EB] hover:underline font-medium transition-colors"
                >
                  try another email
                </button>
              </p>
            </div>
          )}

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#2563EB] transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
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

export default ForgotPasswordPage;