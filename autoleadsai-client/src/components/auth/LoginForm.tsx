// src/components/auth/LoginForm.tsx

import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import Input from '../common/Input';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { sanitizeString } from '../../utils/sanitizers';
import { isValidEmail } from '../../utils/validators';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading?: boolean;
}

interface LoginError {
  field: string;
  message: string;
}

const LoginForm = ({ onSubmit, loading = false }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginError[]>([]);

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

  const clearFieldErrors = (field: string) => {
    setErrors((prev) => prev.filter((e) => e.field !== field));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const sanitizedEmail = sanitizeString(email.trim().toLowerCase());
    await onSubmit(sanitizedEmail, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
      {getFieldError('password') && !getFieldError('email') && (
        <div className="p-3 sm:p-4 bg-[#FEE2E2] border border-[#EF4444]/20 rounded-xl flex items-center gap-2 sm:gap-3 animate-scale-in">
          <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#EF4444] shrink-0" />
          <p className="text-xs sm:text-sm text-[#EF4444]">{getFieldError('password')}</p>
        </div>
      )}

      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); clearFieldErrors('email'); clearFieldErrors('password'); }}
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
        onChange={(e) => { setPassword(e.target.value); clearFieldErrors('password'); }}
        placeholder="••••••••"
        icon={<FiLock className="w-4 h-4 sm:w-5 sm:h-5" />}
        rightIcon={showPassword ? <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />}
        onRightIconClick={() => setShowPassword(!showPassword)}
        error={getFieldError('password')}
        autoComplete="current-password"
        maxLength={128}
      />

      <div className="flex justify-end">
        <Link to="/forgot-password" className="text-xs sm:text-sm text-[#2563EB] hover:text-[#1D4ED8] font-medium transition-colors">
          Forgot Password?
        </Link>
      </div>

      <Button type="submit" loading={loading} disabled={loading} className="w-full" size="lg">
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>

      {loading && (
        <div className="flex items-center justify-center gap-3 py-2 animate-fade-in">
          <Spinner size="sm" />
          <p className="text-sm text-[#6B7280]">Verifying your credentials...</p>
        </div>
      )}
    </form>
  );
};

export default LoginForm;