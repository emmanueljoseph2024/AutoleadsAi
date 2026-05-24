export const isValidEmail = (email: string): boolean => {
  if (typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return regex.test(email) && email.length <= 255;
};

export const getPasswordStrength = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (password.length < 8) errors.push('At least 8 characters');
  if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('One number');
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('One special character');
  return { isValid: errors.length === 0, errors };
};

export const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export const isValidPhone = (phone: string): boolean => {
  const regex = /^\+?[\d\s()-]{7,20}$/;
  return regex.test(phone);
};

export const isValidObjectId = (id: string): boolean => {
  const regex = /^[0-9a-fA-F]{24}$/;
  return regex.test(id);
};