// src/components/auth/ResetPasswordForm.tsx

import { useState, useCallback } from 'react';
import { FiLock, FiEye, FiEyeOff, FiCheck, FiAlertCircle } from 'react-icons/fi';
import Input from '../common/Input';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { getPasswordStrength } from '../../utils/validators';
import { sanitizeString } from '../../utils/sanitizers';

interface ResetPasswordFormProps {
  token: string;
  onSubmit: (token: string, password: string) => Promise<void>;
  loading?: boolean;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

const ResetPasswordForm = ({ token, onSubmit, loading = false }: ResetPasswordFormProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const passwordStrength = password ? getPasswordStrength(password) : { isValid: false, errors: [] };
  const passwordsMatch = confirmPassword ? password === confirmPassword : true;

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    if (!password) newErrors.password = 'Password is required';
    else if (password.length > 128) newErrors.password = 'Password is too long';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (!passwordStrength.isValid) newErrors.password = 'Password must include uppercase, lowercase, number, and special character';
    const commonPasswords = ['password', 'password123', '12345678', 'qwerty123', 'letmein1', 'admin123!', 'welcome1!', 'Password1!', 'Password123!'];
    if (password && commonPasswords.includes(password.toLowerCase())) newErrors.password = 'This password is too common.';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (confirmPassword.length > 128) newErrors.confirmPassword = 'Password confirmation is too long';
    else if (!passwordsMatch) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [password, confirmPassword, passwordStrength.isValid, passwordsMatch]);

  const getStrengthColor = (): string => {
    if (!password) return 'bg-[#E5E7EB]';
    const errorCount = passwordStrength.errors.length;
    if (errorCount === 0) return 'bg-[#22C55E]';
    if (errorCount <= 2) return 'bg-[#F59E0B]';
    return 'bg-[#EF4444]';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;
    const sanitizedToken = sanitizeString(token).slice(0, 256);
    await onSubmit(sanitizedToken, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
      <div>
        <Input label="New Password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value.slice(0, 128)); if (errors.password) setErrors((prev) => ({ ...prev, password: undefined })); }} placeholder="••••••••" icon={<FiLock className="w-4 h-4 sm:w-5 sm:h-5" />} rightIcon={showPassword ? <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />} onRightIconClick={() => setShowPassword(!showPassword)} error={errors.password} autoComplete="new-password" maxLength={128} />
        {password && (
          <div className="mt-2 animate-fade-in">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div key={level} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${level <= 5 - passwordStrength.errors.length ? getStrengthColor() : 'bg-[#E5E7EB]'}`} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Input label="Confirm New Password" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value.slice(0, 128)); if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined })); }} placeholder="••••••••" icon={<FiLock className="w-4 h-4 sm:w-5 sm:h-5" />} rightIcon={showConfirmPassword ? <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />} onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)} error={errors.confirmPassword} autoComplete="new-password" maxLength={128} />

      {confirmPassword && (
        <div className={`flex items-center gap-1.5 text-[10px] sm:text-xs animate-fade-in ${passwordsMatch ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
          {passwordsMatch ? <FiCheck className="w-3 h-3" /> : <FiAlertCircle className="w-3 h-3" />}
          {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
        </div>
      )}

      <Button type="submit" loading={loading} disabled={loading} className="w-full" size="lg">
        {loading ? 'Resetting password...' : 'Reset Password'}
      </Button>

      {loading && (
        <div className="mt-6 flex items-center justify-center gap-3 py-3 animate-fade-in">
          <Spinner size="sm" /><p className="text-sm text-[#6B7280]">Updating your password...</p>
        </div>
      )}
    </form>
  );
};

export default ResetPasswordForm;