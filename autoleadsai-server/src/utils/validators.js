// ─── Email Validator ────────────────────────────────
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// ─── Password Strength Validator ────────────────────
export const getPasswordStrength = (password) => {
  const errors = [];
  if (password.length < 8) errors.push('At least 8 characters');
  if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('One number');
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('One special character');
  return { isValid: errors.length === 0, errors };
};

// ─── URL Validator ──────────────────────────────────
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// ─── Phone Validator ────────────────────────────────
export const isValidPhone = (phone) => {
  const regex = /^\+?[\d\s()-]{7,20}$/;
  return regex.test(phone);
};

// ─── ObjectId Validator ─────────────────────────────
export const isValidObjectId = (id) => {
  const regex = /^[0-9a-fA-F]{24}$/;
  return regex.test(id);
};

// ─── Required Fields Checker ────────────────────────
export const validateRequiredFields = (data, requiredFields) => {
  const missing = requiredFields.filter(
    (field) => data[field] === undefined || data[field] === null || data[field] === ''
  );
  return { isValid: missing.length === 0, missing };
};

// ─── String Length Validator ────────────────────────
export const isWithinLength = (str, min = 0, max = Infinity) => {
  if (typeof str !== 'string') return false;
  return str.length >= min && str.length <= max;
};

// ─── Number Range Validator ─────────────────────────
export const isInRange = (num, min = -Infinity, max = Infinity) => {
  if (typeof num !== 'number' || isNaN(num)) return false;
  return num >= min && num <= max;
};