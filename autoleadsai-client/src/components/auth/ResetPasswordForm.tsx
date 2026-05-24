// src/pages/auth/ResetPasswordPage.tsx

import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { FiLock, FiEye, FiEyeOff, FiAlertCircle, FiCheck } from 'react-icons/fi';
import AutoleadsAiLogo from '../../assets/AutoleadsAiLogo.svg';
import api from '../../services/api';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthColors = ['bg-[#EF4444]', 'bg-[#F59E0B]', 'bg-[#F59E0B]', 'bg-[#22C55E]', 'bg-[#22C55E]'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const passwordsMatch = confirmPassword ? password === confirmPassword : true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (strength < 3) {
      setError('Please use a stronger password');
      return;
    }

    if (!token) {
      setError('Invalid or expired reset token');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/reset-password', { token, password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
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
          {!success ? (
            <>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] text-center mb-1">
                Set a new password
              </h2>
              <p className="text-sm text-[#6B7280] text-center mb-6 sm:mb-8">
                Must be at least 8 characters with uppercase, lowercase, number, and special character.
              </p>

              {error && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-2 text-[#EF4444] text-xs sm:text-sm">
                  <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* New Password */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-1.5 sm:mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#9CA3AF]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm sm:text-base text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                              level <= strength ? strengthColors[strength - 1] : 'bg-[#E5E7EB]'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-[10px] sm:text-xs text-[#6B7280] mt-1">{strengthLabels[strength]}</p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-1.5 sm:mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#9CA3AF]" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-[#F9FAFB] border rounded-xl text-sm sm:text-base text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all ${
                        confirmPassword && !passwordsMatch ? 'border-[#EF4444]' : 'border-[#E5E7EB]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                  {confirmPassword && passwordsMatch && password && (
                    <p className="text-[10px] sm:text-xs text-[#22C55E] mt-1 flex items-center gap-1">
                      <FiCheck className="w-3 h-3" /> Passwords match
                    </p>
                  )}
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
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#DCFCE7] rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <FiCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#22C55E]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] text-center mb-2">
                Password Reset!
              </h2>
              <p className="text-sm text-[#6B7280] text-center">
                Your password has been changed successfully. Redirecting to login...
              </p>
            </>
          )}

          {!token && (
            <div className="mt-6 p-3 sm:p-4 bg-[#FEF3C7] border border-[#F59E0B]/20 rounded-xl text-[#92400E] text-xs sm:text-sm text-center">
              Invalid or expired reset token.{' '}
              <Link to="/forgot-password" className="text-[#2563EB] font-medium hover:underline">
                Request a new one
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;