import {
  isValidEmail,
  getPasswordStrength,
  isValidUrl,
  isValidPhone,
  isValidObjectId,
  validateRequiredFields,
  isWithinLength,
  isInRange,
} from '../../../src/utils/validators.js';

describe('Validators', () => {
  // ─── isValidEmail ─────────────────────────────────
  describe('isValidEmail', () => {
    test('returns true for valid email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true);
    });

    test('returns false for invalid email', () => {
      expect(isValidEmail('not-an-email')).toBe(false);
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
    });
  });

  // ─── getPasswordStrength ──────────────────────────
  describe('getPasswordStrength', () => {
    test('accepts strong password', () => {
      const result = getPasswordStrength('StrongPass1!');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('rejects password under 8 characters', () => {
      const result = getPasswordStrength('Shrt1!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('At least 8 characters');
    });

    test('rejects password without uppercase', () => {
      const result = getPasswordStrength('weakpass1!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('One uppercase letter');
    });

    test('rejects password without lowercase', () => {
      const result = getPasswordStrength('WEAKPASS1!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('One lowercase letter');
    });

    test('rejects password without number', () => {
      const result = getPasswordStrength('WeakPass!!');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('One number');
    });

    test('rejects password without special character', () => {
      const result = getPasswordStrength('WeakPass12');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('One special character');
    });

    test('returns multiple errors for weak password', () => {
      const result = getPasswordStrength('abc');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });

  // ─── isValidUrl ───────────────────────────────────
  describe('isValidUrl', () => {
    test('returns true for valid URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
      expect(isValidUrl('https://sub.domain.com/path?query=1')).toBe(true);
    });

    test('returns false for invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl('htp://wrong')).toBe(false);
    });
  });

  // ─── isValidPhone ─────────────────────────────────
  describe('isValidPhone', () => {
    test('returns true for valid phone numbers', () => {
      expect(isValidPhone('+1234567890')).toBe(true);
      expect(isValidPhone('123-456-7890')).toBe(true);
      expect(isValidPhone('(123) 456-7890')).toBe(true);
    });

    test('returns false for invalid phone numbers', () => {
      expect(isValidPhone('abc')).toBe(false);
      expect(isValidPhone('')).toBe(false);
      expect(isValidPhone('12')).toBe(false);
    });
  });

  // ─── isValidObjectId ──────────────────────────────
  describe('isValidObjectId', () => {
    test('returns true for valid ObjectId', () => {
      expect(isValidObjectId('507f1f77bcf86cd799439011')).toBe(true);
      expect(isValidObjectId('abcdef1234567890abcdef12')).toBe(true);
    });

    test('returns false for invalid ObjectId', () => {
      expect(isValidObjectId('short')).toBe(false);
      expect(isValidObjectId('')).toBe(false);
      expect(isValidObjectId('507f1f77bcf86cd79943901')).toBe(false); // 23 chars
      expect(isValidObjectId('507f1f77bcf86cd7994390111')).toBe(false); // 25 chars
      expect(isValidObjectId('507f1f77bcf86cd79943901g')).toBe(false); // invalid hex
    });
  });

  // ─── validateRequiredFields ───────────────────────
  describe('validateRequiredFields', () => {
    test('returns isValid=true when all fields present', () => {
      const data = { name: 'John', email: 'john@test.com', age: 30 };
      const result = validateRequiredFields(data, ['name', 'email']);
      expect(result.isValid).toBe(true);
      expect(result.missing).toHaveLength(0);
    });

    test('returns isValid=false with missing fields', () => {
      const data = { name: 'John' };
      const result = validateRequiredFields(data, ['name', 'email']);
      expect(result.isValid).toBe(false);
      expect(result.missing).toContain('email');
    });

    test('detects empty string as missing', () => {
      const data = { name: '' };
      const result = validateRequiredFields(data, ['name']);
      expect(result.isValid).toBe(false);
      expect(result.missing).toContain('name');
    });

    test('detects null as missing', () => {
      const data = { name: null };
      const result = validateRequiredFields(data, ['name']);
      expect(result.isValid).toBe(false);
    });
  });

  // ─── isWithinLength ───────────────────────────────
  describe('isWithinLength', () => {
    test('returns true when string is within range', () => {
      expect(isWithinLength('hello', 1, 10)).toBe(true);
      expect(isWithinLength('hello', 5, 5)).toBe(true);
    });

    test('returns false when string is too short', () => {
      expect(isWithinLength('hi', 5, 10)).toBe(false);
    });

    test('returns false when string is too long', () => {
      expect(isWithinLength('hello world', 1, 5)).toBe(false);
    });

    test('returns false for non-string input', () => {
      expect(isWithinLength(123, 1, 10)).toBe(false);
      expect(isWithinLength(null, 1, 10)).toBe(false);
    });
  });

  // ─── isInRange ────────────────────────────────────
  describe('isInRange', () => {
    test('returns true when number is in range', () => {
      expect(isInRange(50, 0, 100)).toBe(true);
      expect(isInRange(0, 0, 100)).toBe(true);
      expect(isInRange(100, 0, 100)).toBe(true);
    });

    test('returns false when number is out of range', () => {
      expect(isInRange(-1, 0, 100)).toBe(false);
      expect(isInRange(101, 0, 100)).toBe(false);
    });

    test('returns false for non-number input', () => {
      expect(isInRange('50', 0, 100)).toBe(false);
      expect(isInRange(NaN, 0, 100)).toBe(false);
      expect(isInRange(null, 0, 100)).toBe(false);
    });
  });
});