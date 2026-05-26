// src/pages/auth/LoginPage.tsx

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Toast from '../../components/common/Toast';
import LoginForm from '../../components/auth/LoginForm';
import OAuthButtons from '../../components/auth/OAuthButtons';
import AutoleadsAiLogo from '../../assets/AutoleadsAiLogo.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = (location.state as { from?: string })?.from || '/dashboard';

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      const status = err?.response?.status;
      const serverMessage = err?.response?.data?.error;
      if (status === 403) setToast({ message: serverMessage || 'Account deactivated.', type: 'error' });
      else if (status === 429) setToast({ message: 'Too many attempts.', type: 'error' });
      else setToast({ message: serverMessage || 'Invalid email or password', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F9FAFB]">
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#2563EB] to-[#4F46E5] items-center justify-center p-8 xl:p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-48 h-48 xl:w-64 xl:h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 xl:w-96 xl:h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center max-w-lg animate-fade-in">
          <div className="w-16 h-16 xl:w-20 xl:h-20 bg-white/20 backdrop-blur-sm rounded-2xl xl:rounded-3xl flex items-center justify-center mx-auto mb-6 xl:mb-8 shadow-lg">
            <img src={AutoleadsAiLogo} alt="AutoLeads AI" className="w-8 h-8 xl:w-10 xl:h-10" />
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold text-white mb-3 xl:mb-4">Welcome Back</h1>
          <p className="text-sm xl:text-lg text-blue-100 leading-relaxed">Log in to access your AI-powered lead generation dashboard.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm sm:max-w-md animate-slide-up">
          <div className="lg:hidden text-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br from-[#2563EB] to-[#4F46E5] rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <img src={AutoleadsAiLogo} alt="AutoLeads AI" className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">AutoLeads AI</h1>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-[#E5E7EB] p-6 sm:p-8">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">Sign In</h2>
              <p className="text-sm sm:text-base text-[#6B7280] mt-1">Enter your credentials to continue</p>
            </div>

            <LoginForm onSubmit={handleLogin} loading={loading} />

            <div className="relative my-5 sm:my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E5E7EB]" /></div>
              <div className="relative flex justify-center text-xs sm:text-sm"><span className="px-3 sm:px-4 bg-white text-[#9CA3AF]">or continue with</span></div>
            </div>

            <OAuthButtons />

            <p className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-[#6B7280]">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-[#2563EB] hover:text-[#1D4ED8] font-semibold transition-colors">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>

      {toast && <div className="fixed top-4 right-4 z-50 animate-slide-down"><Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} /></div>}
    </div>
  );
};

export default LoginPage;