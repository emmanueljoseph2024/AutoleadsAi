// src/pages/auth/LoginPage.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import AutoleadsAiLogo from '../../assets/AutoleadsAiLogo.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2563EB] to-[#4F46E5] items-center justify-center p-8 xl:p-12 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-48 h-48 xl:w-64 xl:h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 xl:w-96 xl:h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] xl:w-[500px] xl:h-[500px] border border-white/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] xl:w-[600px] xl:h-[600px] border border-white/10 rounded-full" />
        </div>

        <div className="relative z-10 text-center max-w-lg">
          <div className="w-16 h-16 xl:w-20 xl:h-20 bg-white/20 backdrop-blur-sm rounded-2xl xl:rounded-3xl flex items-center justify-center mx-auto mb-6 xl:mb-8 shadow-lg">
            <img src={AutoleadsAiLogo} alt="AutoLeads AI" className="w-8 h-8 xl:w-10 xl:h-10" />
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold text-white mb-3 xl:mb-4">Welcome Back</h1>
          <p className="text-sm xl:text-lg text-blue-100 leading-relaxed">
            Log in to access your AI-powered lead generation dashboard and continue converting prospects.
          </p>

          <div className="mt-8 xl:mt-12 grid grid-cols-3 gap-3 xl:gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl xl:rounded-2xl p-3 xl:p-4">
              <div className="text-lg xl:text-2xl font-bold text-white">10k+</div>
              <div className="text-[10px] xl:text-sm text-blue-200">Leads Generated</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl xl:rounded-2xl p-3 xl:p-4">
              <div className="text-lg xl:text-2xl font-bold text-white">24/7</div>
              <div className="text-[10px] xl:text-sm text-blue-200">AI Automation</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl xl:rounded-2xl p-3 xl:p-4">
              <div className="text-lg xl:text-2xl font-bold text-white">98%</div>
              <div className="text-[10px] xl:text-sm text-blue-200">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#F9FAFB] min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm sm:max-w-md">
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

            {error && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-2 sm:gap-3 text-[#EF4444] text-xs sm:text-sm">
                <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Email */}
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

              {/* Password */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-1.5 sm:mb-2">
                  Password
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
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-xs sm:text-sm text-[#2563EB] hover:text-[#1D4ED8] font-medium transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
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
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5 sm:my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]" />
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-3 sm:px-4 bg-white text-[#9CA3AF]">or continue with</span>
              </div>
            </div>

            {/* Google OAuth */}
            <button className="w-full py-2.5 sm:py-3 bg-white border border-[#D1D5DB] rounded-xl text-sm sm:text-base font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors flex items-center justify-center gap-2 sm:gap-3">
              <FcGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
              Continue with Google
            </button>

            {/* Signup link */}
            <p className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-[#6B7280]">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-[#2563EB] hover:text-[#1D4ED8] font-semibold transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;