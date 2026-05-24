// src/pages/auth/ResetPasswordPage.tsx

import { useState, useCallback } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { FiLock, FiEye, FiEyeOff, FiCheck, FiAlertCircle } from 'react-icons/fi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import Toast from '../../components/common/Toast';
import AutoleadsAiLogo from '../../assets/AutoleadsAiLogo.svg';
import { getPasswordStrength } from '../../utils/validators';
import { sanitizeString } from '../../utils/sanitizers';
import { API_ENDPOINTS } from '../../utils/constants';
import api from '../../services/api';

interface FormErrors {
  password?: string;
  confirmPassword?: string;
  token?: string;
}

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Sanitize token from URL immediately — strip any HTML/script content
  const rawToken = searchParams.get('token') || '';
  const token = sanitizeString(rawToken).slice(0, 256); // Max 256 chars for safety

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const passwordStrength = password ? getPasswordStrength(password) : { isValid: false, errors: [] };
  const passwordsMatch = confirmPassword ? password === confirmPassword : true;

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Token validation
    if (!token || token.length < 10) {
      newErrors.token = 'Invalid or expired reset token';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length > 128) {
      newErrors.password = 'Password is too long. Maximum 128 characters.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!passwordStrength.isValid) {
      newErrors.password = 'Password must include uppercase, lowercase, number, and special character';
    }

    // Check for common weak passwords
    const commonPasswords = [
      'password', 'password123', '12345678', 'qwerty123', 'letmein1',
      'admin123!', 'welcome1!', 'Password1!', 'Password123!',
    ];
    if (password && commonPasswords.includes(password.toLowerCase())) {
      newErrors.password = 'This password is too common. Please choose a stronger password.';
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword.length > 128) {
      newErrors.confirmPassword = 'Password confirmation is too long';
    } else if (!passwordsMatch) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [password, confirmPassword, passwordStrength.isValid, passwordsMatch, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    if (!validate()) return;

    // Sanitize the token again before sending (defense in depth)
    const sanitizedToken = sanitizeString(token).slice(0, 256);

    // Password is NOT sanitized — sanitizing would change the password value
    // Password will be hashed by bcrypt on the backend anyway

    setLoading(true);

    try {
      await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        token: sanitizedToken,
        password, // Sent as-is — backend hashes it
      });

      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      const status = err?.response?.status;
      const serverMessage = err?.response?.data?.error;

      if (status === 400) {
        setToast({
          message: serverMessage || 'Invalid or expired reset token. Please request a new one.',
          type: 'error',
        });
        setErrors({ token: 'This reset link is no longer valid' });
      } else if (status === 429) {
        setToast({
          message: 'Too many attempts. Please try again later.',
          type: 'error',
        });
      } else {
        setToast({
          message: 'Something went wrong. Please try again.',
          type: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Determine password strength color
  const getStrengthColor = (): string => {
    if (!password) return 'bg-[#E5E7EB]';
    const errorCount = passwordStrength.errors.length;
    if (errorCount === 0) return 'bg-[#22C55E]';
    if (errorCount <= 2) return 'bg-[#F59E0B]';
    return 'bg-[#EF4444]';
  };

  const getStrengthLabel = (): string => {
    if (!password) return '';
    const errorCount = passwordStrength.errors.length;
    if (errorCount === 0) return 'Strong';
    if (errorCount <= 2) return 'Moderate';
    return 'Weak';
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
          {/* Invalid Token State */}
          {!token || token.length < 10 ? (
            <div className="text-center animate-fade-in">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FEF3C7] rounded-2xl flex items-center justify-center mx-auto mb-5">
                <FiAlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-[#F59E0B]" />
              </div>
              <h2 className="text-xl font-bold text-[#111827] mb-2">Invalid Reset Link</h2>
              <p className="text-sm text-[#6B7280] mb-6">
                This password reset link is invalid or has expired. For security, reset links are only valid for one use and expire after 1 hour.
              </p>
              <Link
                to="/forgot-password"
                className="inline-flex items-center gap-1.5 text-[#2563EB] hover:text-[#1D4ED8] font-medium text-sm transition-colors"
              >
                Request a new reset link
              </Link>
            </div>
          ) : !success ? (
            <>
              {/* Form Header */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] text-center mb-1">
                Set a new password
              </h2>
              <p className="text-sm text-[#6B7280] text-center mb-6 sm:mb-8">
                Must be at least 8 characters with uppercase, lowercase, number, and special character.
              </p>

              {/* Token Error Banner */}
              {errors.token && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-2 sm:gap-3 text-[#EF4444] text-xs sm:text-sm animate-scale-in">
                  <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>{errors.token}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                {/* New Password */}
                <div>
                  <Input
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      const val = e.target.value.slice(0, 128);
                      setPassword(val);
                      if (errors.password) {
                        setErrors((prev) => ({ ...prev, password: undefined }));
                      }
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
                    error={errors.password}
                    autoComplete="new-password"
                    maxLength={128}
                  />

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-2 animate-fade-in">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                              level <= 5 - passwordStrength.errors.length
                                ? getStrengthColor()
                                : 'bg-[#E5E7EB]'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p
                          className={`text-[10px] sm:text-xs ${
                            passwordStrength.isValid
                              ? 'text-[#22C55E]'
                              : passwordStrength.errors.length <= 2
                              ? 'text-[#F59E0B]'
                              : 'text-[#EF4444]'
                          }`}
                        >
                          {getStrengthLabel()}
                        </p>
                        <ul className="text-[10px] text-[#9CA3AF] space-y-0.5 hidden sm:block">
                          {passwordStrength.errors.map((err) => (
                            <li key={err} className="flex items-center gap-1">
                              <span className="w-1 h-1 bg-[#9CA3AF] rounded-full" />
                              {err}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <Input
                  label="Confirm New Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    const val = e.target.value.slice(0, 128);
                    setConfirmPassword(val);
                    if (errors.confirmPassword) {
                      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                    }
                  }}
                  placeholder="••••••••"
                  icon={<FiLock className="w-4 h-4 sm:w-5 sm:h-5" />}
                  rightIcon={
                    showConfirmPassword ? (
                      <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )
                  }
                  onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                  maxLength={128}
                />

                {/* Password match indicator */}
                {confirmPassword && (
                  <div
                    className={`flex items-center gap-1.5 text-[10px] sm:text-xs animate-fade-in ${
                      passwordsMatch ? 'text-[#22C55E]' : 'text-[#EF4444]'
                    }`}
                  >
                    {passwordsMatch ? (
                      <FiCheck className="w-3 h-3" />
                    ) : (
                      <FiAlertCircle className="w-3 h-3" />
                    )}
                    {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading || !!errors.token}
                  className="w-full"
                  size="lg"
                >
                  {loading ? 'Resetting password...' : 'Reset Password'}
                </Button>
              </form>

              {/* Loading Overlay with Spinner */}
              {loading && (
                <div className="mt-6 flex items-center justify-center gap-3 py-3 animate-fade-in">
                  <Spinner size="sm" />
                  <p className="text-sm text-[#6B7280]">Updating your password...</p>
                </div>
              )}
            </>
          ) : (
            /* Success State */
            <div className="text-center animate-scale-in">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#DCFCE7] rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <FiCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#22C55E]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-2">
                Password Reset Successfully!
              </h2>
              <p className="text-sm text-[#6B7280] mb-1">
                Your password has been changed.
              </p>
              <p className="text-xs text-[#9CA3AF]">
                Redirecting to login in a few seconds...
              </p>
            </div>
          )}
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

export default ResetPasswordPage;