// src/pages/auth/ResetPasswordPage.tsx

import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
import Toast from '../../components/common/Toast';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';
import AutoleadsAiLogo from '../../assets/AutoleadsAiLogo.svg';
import { sanitizeString } from '../../utils/sanitizers';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rawToken = searchParams.get('token') || '';
  const token = sanitizeString(rawToken).slice(0, 256);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (sanitizedToken: string, password: string) => {
    setLoading(true);
    try {
      await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token: sanitizedToken, password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      setToast({ message: err?.response?.data?.error || 'Something went wrong.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#F9FAFB]">
      <div className="w-full max-w-sm sm:max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br from-[#2563EB] to-[#4F46E5] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <img src={AutoleadsAiLogo} alt="AutoLeads AI" className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">AutoLeads AI</h1>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-[#E5E7EB] p-6 sm:p-8">
          {!token || token.length < 10 ? (
            <div className="text-center animate-fade-in">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FEF3C7] rounded-2xl flex items-center justify-center mx-auto mb-5">
                <FiAlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-[#F59E0B]" />
              </div>
              <h2 className="text-xl font-bold text-[#111827] mb-2">Invalid Reset Link</h2>
              <p className="text-sm text-[#6B7280] mb-6">This password reset link is invalid or has expired.</p>
              <Link to="/forgot-password" className="text-[#2563EB] hover:underline font-medium text-sm">Request a new reset link</Link>
            </div>
          ) : !success ? (
            <>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] text-center mb-1">Set a new password</h2>
              <p className="text-sm text-[#6B7280] text-center mb-6 sm:mb-8">Must be at least 8 characters with uppercase, lowercase, number, and special character.</p>
              <ResetPasswordForm token={token} onSubmit={handleSubmit} loading={loading} />
            </>
          ) : (
            <div className="text-center animate-scale-in">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#DCFCE7] rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <FiCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#22C55E]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-2">Password Reset Successfully!</h2>
              <p className="text-sm text-[#6B7280]">Your password has been changed. Redirecting to login...</p>
            </div>
          )}
        </div>
      </div>
      {toast && <div className="fixed top-4 right-4 z-50 animate-slide-down"><Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} /></div>}
    </div>
  );
};

export default ResetPasswordPage;