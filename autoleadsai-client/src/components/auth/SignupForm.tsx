// src/pages/auth/SignupPage.tsx

import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import Toast from '../../components/common/Toast';
import OAuthButtons from '../../components/auth/OAuthButtons';
import AutoleadsAiLogo from '../../assets/AutoleadsAiLogo.svg';
import { sanitizeString, normalizeName } from '../../utils/sanitizers';
import { isValidEmail, getPasswordStrength } from '../../utils/validators';

interface SignupError {
  field: string;
  message: string;
}

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<SignupError[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const passwordStrength = password ? getPasswordStrength(password) : { isValid: false, errors: [] };
  const passwordsMatch = confirmPassword ? password === confirmPassword : true;

  const validate = useCallback(() => {
    const newErrors: SignupError[] = [];

    if (!firstName.trim()) {
      newErrors.push({ field: 'firstName', message: 'First name is required' });
    } else if (firstName.length > 50) {
      newErrors.push({ field: 'firstName', message: 'First name is too long' });
    }

    if (!lastName.trim()) {
      newErrors.push({ field: 'lastName', message: 'Last name is required' });
    } else if (lastName.length > 50) {
      newErrors.push({ field: 'lastName', message: 'Last name is too long' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      newErrors.push({ field: 'email', message: 'Email is required' });
    } else if (!isValidEmail(trimmedEmail)) {
      newErrors.push({ field: 'email', message: 'Please enter a valid email address' });
    }

    if (!password) {
      newErrors.push({ field: 'password', message: 'Password is required' });
    } else if (!passwordStrength.isValid) {
      newErrors.push({ field: 'password', message: 'Password does not meet strength requirements' });
    }

    if (!confirmPassword) {
      newErrors.push({ field: 'confirmPassword', message: 'Please confirm your password' });
    } else if (!passwordsMatch) {
      newErrors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
    }

    if (!agreed) {
      newErrors.push({ field: 'terms', message: 'You must agree to the Terms of Service' });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  }, [firstName, lastName, email, password, confirmPassword, agreed, passwordStrength.isValid, passwordsMatch]);

  const getFieldError = (field: string) => errors.find((e) => e.field === field)?.message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const sanitizedData = {
      firstName: normalizeName(sanitizeString(firstName)),
      lastName: normalizeName(sanitizeString(lastName)),
      email: sanitizeString(email.trim().toLowerCase()),
      password,
    };

    setLoading(true);

    try {
      await signup(sanitizedData);
      navigate('/dashboard');
    } catch (err: any) {
      const status = err?.response?.status;
      const serverMessage = err?.response?.data?.error;

      if (status === 409) {
        setErrors([{ field: 'email', message: serverMessage || 'Email already registered' }]);
        setToast({ message: serverMessage || 'Email already registered', type: 'error' });
      } else if (status === 400) {
        setToast({ message: serverMessage || 'Invalid input. Please check your details.', type: 'error' });
      } else {
        setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  // Clear individual field errors when user types
  const clearFieldError = (field: string) => {
    setErrors((prev) => prev.filter((e) => e.field !== field));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F9FAFB]">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#4F46E5] to-[#2563EB] items-center justify-center p-8 xl:p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-48 h-48 xl:w-64 xl:h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 xl:w-96 xl:h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] xl:w-[500px] xl:h-[500px] border border-white/20 rounded-full" />
        </div>

        <div className="relative z-10 text-center max-w-lg animate-fade-in">
          <div className="w-16 h-16 xl:w-20 xl:h-20 bg-white/20 backdrop-blur-sm rounded-2xl xl:rounded-3xl flex items-center justify-center mx-auto mb-6 xl:mb-8 shadow-lg">
            <img src={AutoleadsAiLogo} alt="AutoLeads AI" className="w-8 h-8 xl:w-10 xl:h-10" />
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold text-white mb-3 xl:mb-4">Start Your Free Trial</h1>
          <p className="text-sm xl:text-lg text-blue-100 leading-relaxed">
            Join thousands of real estate professionals using AI to find and convert leads automatically.
          </p>

          <div className="mt-8 xl:mt-12 space-y-3 xl:space-y-4">
            {[
              '14-day free trial — no credit card required',
              'AI-powered lead discovery & scoring',
              '24/7 automated email outreach',
            ].map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 xl:p-4 transition-transform duration-200 hover:scale-[1.02]"
              >
                <FiCheck className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                <span className="text-sm xl:text-base text-white">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg animate-slide-up">
          <div className="lg:hidden text-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#2563EB] to-[#4F46E5] rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <img src={AutoleadsAiLogo} alt="AutoLeads AI" className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">AutoLeads AI</h1>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-[#E5E7EB] p-6 sm:p-8">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">Create Account</h2>
              <p className="text-sm sm:text-base text-[#6B7280] mt-1">Start your 14-day free trial</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  label="First Name"
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    clearFieldError('firstName');
                  }}
                  placeholder="John"
                  icon={<FiUser className="w-4 h-4 sm:w-5 sm:h-5" />}
                  error={getFieldError('firstName')}
                  autoComplete="given-name"
                  maxLength={50}
                />
                <Input
                  label="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    clearFieldError('lastName');
                  }}
                  placeholder="Doe"
                  icon={<FiUser className="w-4 h-4 sm:w-5 sm:h-5" />}
                  error={getFieldError('lastName')}
                  autoComplete="family-name"
                  maxLength={50}
                />
              </div>

              {/* Email */}
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearFieldError('email');
                }}
                placeholder="john@example.com"
                icon={<FiMail className="w-4 h-4 sm:w-5 sm:h-5" />}
                error={getFieldError('email')}
                autoComplete="email"
                maxLength={255}
              />

              {/* Password */}
              <div>
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearFieldError('password');
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
                  autoComplete="new-password"
                  maxLength={128}
                />
                {password && (
                  <div className="mt-2 animate-fade-in">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            level <= 5 - passwordStrength.errors.length
                              ? passwordStrength.isValid
                                ? 'bg-[#22C55E]'
                                : passwordStrength.errors.length <= 2
                                ? 'bg-[#F59E0B]'
                                : 'bg-[#EF4444]'
                              : 'bg-[#E5E7EB]'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] sm:text-xs text-[#6B7280] mt-1">
                      {passwordStrength.isValid
                        ? 'Strong password'
                        : 'Password strength: ' +
                          (passwordStrength.errors.length <= 2 ? 'Moderate' : 'Weak')}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    clearFieldError('confirmPassword');
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
                  error={getFieldError('confirmPassword')}
                  autoComplete="new-password"
                  maxLength={128}
                />
                {confirmPassword && (
                  <p
                    className={`text-[10px] sm:text-xs mt-1 flex items-center gap-1 animate-fade-in ${
                      passwordsMatch ? 'text-[#22C55E]' : 'text-[#EF4444]'
                    }`}
                  >
                    {passwordsMatch ? (
                      <>
                        <FiCheck className="w-3 h-3" /> Passwords match
                      </>
                    ) : (
                      <>
                        <FiX className="w-3 h-3" /> Passwords do not match
                      </>
                    )}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      clearFieldError('terms');
                    }}
                    className="mt-0.5 sm:mt-1 w-4 h-4 rounded border-[#D1D5DB] text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-xs sm:text-sm text-[#6B7280] cursor-pointer select-none">
                    I agree to the{' '}
                    <Link to="/terms" className="text-[#2563EB] hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-[#2563EB] hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {getFieldError('terms') && (
                  <p className="text-[10px] sm:text-xs text-[#EF4444] mt-1 flex items-center gap-1 animate-fade-in">
                    <FiAlertCircle className="w-3 h-3" />
                    {getFieldError('terms')}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" loading={loading} disabled={loading} className="w-full" size="lg">
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            {/* Loading Overlay with Spinner */}
            {loading && (
              <div className="mt-6 flex items-center justify-center gap-3 py-3 animate-fade-in">
                <Spinner size="sm" />
                <p className="text-sm text-[#6B7280]">Setting up your account...</p>
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
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[#2563EB] hover:text-[#1D4ED8] font-semibold transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};

export default SignupPage;