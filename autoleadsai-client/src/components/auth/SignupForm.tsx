// src/components/auth/SignupForm.tsx

import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';
import Input from '../common/Input';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { sanitizeString, normalizeName } from '../../utils/sanitizers';
import { isValidEmail, getPasswordStrength } from '../../utils/validators';

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => Promise<void>;
  loading?: boolean;
}

interface SignupError {
  field: string;
  message: string;
}

const SignupForm = ({ onSubmit, loading = false }: SignupFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<SignupError[]>([]);

  const passwordStrength = password ? getPasswordStrength(password) : { isValid: false, errors: [] };
  const passwordsMatch = confirmPassword ? password === confirmPassword : true;

  const validate = useCallback(() => {
    const newErrors: SignupError[] = [];
    if (!firstName.trim()) newErrors.push({ field: 'firstName', message: 'First name is required' });
    else if (firstName.length > 50) newErrors.push({ field: 'firstName', message: 'First name is too long' });
    if (!lastName.trim()) newErrors.push({ field: 'lastName', message: 'Last name is required' });
    else if (lastName.length > 50) newErrors.push({ field: 'lastName', message: 'Last name is too long' });
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) newErrors.push({ field: 'email', message: 'Email is required' });
    else if (!isValidEmail(trimmedEmail)) newErrors.push({ field: 'email', message: 'Please enter a valid email address' });
    if (!password) newErrors.push({ field: 'password', message: 'Password is required' });
    else if (!passwordStrength.isValid) newErrors.push({ field: 'password', message: 'Password does not meet strength requirements' });
    if (!confirmPassword) newErrors.push({ field: 'confirmPassword', message: 'Please confirm your password' });
    else if (!passwordsMatch) newErrors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
    if (!agreed) newErrors.push({ field: 'terms', message: 'You must agree to the Terms of Service' });
    setErrors(newErrors);
    return newErrors.length === 0;
  }, [firstName, lastName, email, password, confirmPassword, agreed, passwordStrength.isValid, passwordsMatch]);

  const getFieldError = (field: string) => errors.find((e) => e.field === field)?.message;
  const clearFieldError = (field: string) => setErrors((prev) => prev.filter((e) => e.field !== field));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const data: SignupFormData = {
      firstName: normalizeName(sanitizeString(firstName)),
      lastName: normalizeName(sanitizeString(lastName)),
      email: sanitizeString(email.trim().toLowerCase()),
      password,
    };
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Input label="First Name" type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value); clearFieldError('firstName'); }} placeholder="John" icon={<FiUser className="w-4 h-4 sm:w-5 sm:h-5" />} error={getFieldError('firstName')} autoComplete="given-name" maxLength={50} />
        <Input label="Last Name" type="text" value={lastName} onChange={(e) => { setLastName(e.target.value); clearFieldError('lastName'); }} placeholder="Doe" icon={<FiUser className="w-4 h-4 sm:w-5 sm:h-5" />} error={getFieldError('lastName')} autoComplete="family-name" maxLength={50} />
      </div>

      <Input label="Email Address" type="email" value={email} onChange={(e) => { setEmail(e.target.value); clearFieldError('email'); }} placeholder="john@example.com" icon={<FiMail className="w-4 h-4 sm:w-5 sm:h-5" />} error={getFieldError('email')} autoComplete="email" maxLength={255} />

      <div>
        <Input label="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); clearFieldError('password'); }} placeholder="••••••••" icon={<FiLock className="w-4 h-4 sm:w-5 sm:h-5" />} rightIcon={showPassword ? <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />} onRightIconClick={() => setShowPassword(!showPassword)} error={getFieldError('password')} autoComplete="new-password" maxLength={128} />
        {password && (
          <div className="mt-2 animate-fade-in">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div key={level} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${level <= 5 - passwordStrength.errors.length ? (passwordStrength.isValid ? 'bg-[#22C55E]' : passwordStrength.errors.length <= 2 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]') : 'bg-[#E5E7EB]'}`} />
              ))}
            </div>
            <p className="text-[10px] sm:text-xs text-[#6B7280] mt-1">{passwordStrength.isValid ? 'Strong password' : 'Password strength: ' + (passwordStrength.errors.length <= 2 ? 'Moderate' : 'Weak')}</p>
          </div>
        )}
      </div>

      <div>
        <Input label="Confirm Password" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError('confirmPassword'); }} placeholder="••••••••" icon={<FiLock className="w-4 h-4 sm:w-5 sm:h-5" />} rightIcon={showConfirmPassword ? <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />} onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)} error={getFieldError('confirmPassword')} autoComplete="new-password" maxLength={128} />
        {confirmPassword && (
          <p className={`text-[10px] sm:text-xs mt-1 flex items-center gap-1 animate-fade-in ${passwordsMatch ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
            {passwordsMatch ? <><FiCheck className="w-3 h-3" /> Passwords match</> : <><FiX className="w-3 h-3" /> Passwords do not match</>}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-start gap-2 sm:gap-3">
          <input type="checkbox" id="terms" checked={agreed} onChange={(e) => { setAgreed(e.target.checked); clearFieldError('terms'); }} className="mt-0.5 sm:mt-1 w-4 h-4 rounded border-[#D1D5DB] text-[#2563EB] focus:ring-[#2563EB] cursor-pointer" />
          <label htmlFor="terms" className="text-xs sm:text-sm text-[#6B7280] cursor-pointer select-none">
            I agree to the <Link to="/terms" className="text-[#2563EB] hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-[#2563EB] hover:underline">Privacy Policy</Link>
          </label>
        </div>
        {getFieldError('terms') && (
          <p className="text-[10px] sm:text-xs text-[#EF4444] mt-1 flex items-center gap-1 animate-fade-in"><FiAlertCircle className="w-3 h-3" />{getFieldError('terms')}</p>
        )}
      </div>

      <Button type="submit" loading={loading} disabled={loading} className="w-full" size="lg">
        {loading ? 'Creating account...' : 'Create Account'}
      </Button>

      {loading && (
        <div className="flex items-center justify-center gap-3 py-2 animate-fade-in">
          <Spinner size="sm" /><p className="text-sm text-[#6B7280]">Setting up your account...</p>
        </div>
      )}
    </form>
  );
};

export default SignupForm;