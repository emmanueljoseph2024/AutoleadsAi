// src/pages/auth/SignupPage.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import Toast from '../../components/common/Toast';
import SignupForm from '../../components/auth/SignupForm';
import OAuthButtons from '../../components/auth/OAuthButtons';
import AutoleadsAiLogo from '../../assets/AutoleadsAiLogo.svg';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleSignup = async (data: { firstName: string; lastName: string; email: string; password: string }) => {
    setLoading(true);
    try {
      await signup(data);
      navigate('/dashboard');
    } catch (err: any) {
      const serverMessage = err?.response?.data?.error;
      if (err?.response?.status === 409) setToast({ message: serverMessage || 'Email already registered', type: 'error' });
      else setToast({ message: serverMessage || 'Something went wrong.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F9FAFB]">
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#4F46E5] to-[#2563EB] items-center justify-center p-8 xl:p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-48 h-48 xl:w-64 xl:h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 xl:w-96 xl:h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center max-w-lg animate-fade-in">
          <div className="w-16 h-16 xl:w-20 xl:h-20 bg-white/20 backdrop-blur-sm rounded-2xl xl:rounded-3xl flex items-center justify-center mx-auto mb-6 xl:mb-8 shadow-lg">
            <img src={AutoleadsAiLogo} alt="AutoLeads AI" className="w-8 h-8 xl:w-10 xl:h-10" />
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold text-white mb-3 xl:mb-4">Start Your Free Trial</h1>
          <p className="text-sm xl:text-lg text-blue-100 leading-relaxed">Join thousands of real estate professionals using AI to find and convert leads.</p>
          <div className="mt-8 xl:mt-12 space-y-3 xl:space-y-4">
            {['14-day free trial', 'AI-powered lead discovery', '24/7 automated outreach'].map((b) => (
              <div key={b} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 xl:p-4">
                <FiCheck className="w-5 h-5 text-[#22C55E] shrink-0" /><span className="text-sm xl:text-base text-white">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg animate-slide-up">
          <div className="lg:hidden text-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br from-[#2563EB] to-[#4F46E5] rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <img src={AutoleadsAiLogo} alt="AutoLeads AI" className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">AutoLeads AI</h1>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-[#E5E7EB] p-6 sm:p-8">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">Create Account</h2>
              <p className="text-sm sm:text-base text-[#6B7280] mt-1">Start your 14-day free trial</p>
            </div>

            <SignupForm onSubmit={handleSignup} loading={loading} />

            <div className="relative my-5 sm:my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E5E7EB]" /></div>
              <div className="relative flex justify-center text-xs sm:text-sm"><span className="px-3 sm:px-4 bg-white text-[#9CA3AF]">or continue with</span></div>
            </div>

            <OAuthButtons />

            <p className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-[#6B7280]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#2563EB] hover:text-[#1D4ED8] font-semibold transition-colors">Sign In</Link>
            </p>
          </div>
        </div>
      </div>

      {toast && <div className="fixed top-4 right-4 z-50 animate-slide-down"><Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} /></div>}
    </div>
  );
};

export default SignupPage;