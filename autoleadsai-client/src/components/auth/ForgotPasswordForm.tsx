// src/pages/auth/ForgotPasswordPage.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiArrowLeft, FiSend, FiCheckCircle } from 'react-icons/fi';
import AutoleadsAiLogo from '../../assets/AutoleadsAiLogo.svg';
import api from '../../services/api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#F9FAFB]">
      <div className="w-full max-w-sm sm:max-w-md">
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
              {/* Lock Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#EFF6FF] rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <FiLock className="w-7 h-7 sm:w-8 sm:h-8 text-[#2563EB]" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] text-center mb-2">
                Forgot your password?
              </h2>
              <p className="text-sm sm:text-base text-[#6B7280] text-center mb-6 sm:mb-8">
                Enter your email and we&apos;ll send you a reset link.
              </p>

              {error && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl text-[#EF4444] text-xs sm:text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-1.5 sm:mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#9CA3AF]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      required
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm sm:text-base text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white rounded-xl font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#DCFCE7] rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <FiCheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-[#22C55E]" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] text-center mb-2">
                Check your email
              </h2>
              <p className="text-sm sm:text-base text-[#6B7280] text-center mb-6">
                We&apos;ve sent a password reset link to{' '}
                <span className="font-semibold text-[#111827]">{email}</span>
              </p>

              <p className="text-xs sm:text-sm text-[#9CA3AF] text-center mb-6">
                Didn&apos;t receive it? Check your spam folder or try again.
              </p>

              <button
                onClick={() => setSent(false)}
                className="w-full py-2.5 sm:py-3 bg-white border border-[#D1D5DB] rounded-xl text-sm sm:text-base font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors"
              >
                Try another email
              </button>
            </>
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
    </div>
  );
};

export default ForgotPasswordPage;