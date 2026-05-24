import {
  startOfDay,
  endOfDay,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  daysAgo,
  daysFromNow,
  formatDate,
  timeAgo,
  isTrialActive,
} from '../../../src/utils/dateUtils.js';

describe('Date Utils', () => {
  // ─── startOfDay ───────────────────────────────────
  describe('startOfDay', () => {
    test('returns midnight of the given date', () => {
      const date = new Date('2024-01-15T14:30:00');
      const result = startOfDay(date);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getDate()).toBe(15);
    });

    test('defaults to today', () => {
      const result = startOfDay();
      const today = new Date();
      expect(result.getDate()).toBe(today.getDate());
      expect(result.getHours()).toBe(0);
    });
  });

  // ─── endOfDay ─────────────────────────────────────
  describe('endOfDay', () => {
    test('returns 23:59:59.999 of the given date', () => {
      const date = new Date('2024-01-15T14:30:00');
      const result = endOfDay(date);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
    });
  });

  // ─── startOfWeek ──────────────────────────────────
  describe('startOfWeek', () => {
    test('returns Monday of the given week', () => {
      const date = new Date('2024-01-15'); // Tuesday
      const result = startOfWeek(date);
      expect(result.getDay()).toBe(1); // Monday
    });
  });

  // ─── startOfMonth ─────────────────────────────────
  describe('startOfMonth', () => {
    test('returns first day of the month', () => {
      const date = new Date('2024-01-15');
      const result = startOfMonth(date);
      expect(result.getDate()).toBe(1);
      expect(result.getMonth()).toBe(0); // January
    });
  });

  // ─── endOfMonth ───────────────────────────────────
  describe('endOfMonth', () => {
    test('returns last day of the month', () => {
      const result = endOfMonth(new Date('2024-01-15'));
      expect(result.getDate()).toBe(31);
    });

    test('handles February', () => {
      const result = endOfMonth(new Date('2024-02-15')); // Leap year
      expect(result.getDate()).toBe(29);
    });
  });

  // ─── daysAgo ──────────────────────────────────────
  describe('daysAgo', () => {
    test('returns date from specified days ago', () => {
      const result = daysAgo(7);
      const expected = new Date();
      expected.setDate(expected.getDate() - 7);
      expect(result.getDate()).toBe(expected.getDate());
    });
  });

  // ─── daysFromNow ──────────────────────────────────
  describe('daysFromNow', () => {
    test('returns date from specified days in future', () => {
      const result = daysFromNow(14);
      const expected = new Date();
      expected.setDate(expected.getDate() + 14);
      expect(result.getDate()).toBe(expected.getDate());
    });
  });

  // ─── formatDate ───────────────────────────────────
  describe('formatDate', () => {
    test('formats date with default format', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date);
      expect(result).toBe('2024-01-15');
    });

    test('formats date with custom format', () => {
      const date = new Date('2024-01-15T14:30:00');
      const result = formatDate(date, 'YYYY-MM-DD HH:mm');
      expect(result).toBe('2024-01-15 14:30');
    });
  });

  // ─── timeAgo ──────────────────────────────────────
  describe('timeAgo', () => {
    test('returns "just now" for recent dates', () => {
      const result = timeAgo(new Date());
      expect(result).toBe('just now');
    });

    test('returns minutes ago', () => {
      const date = new Date(Date.now() - 5 * 60 * 1000);
      const result = timeAgo(date);
      expect(result).toContain('m ago');
    });

    test('returns hours ago', () => {
      const date = new Date(Date.now() - 3 * 60 * 60 * 1000);
      const result = timeAgo(date);
      expect(result).toContain('h ago');
    });

    test('returns days ago', () => {
      const date = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
      const result = timeAgo(date);
      expect(result).toContain('d ago');
    });
  });

  // ─── isTrialActive ────────────────────────────────
  describe('isTrialActive', () => {
    test('returns true when trial end is in the future', () => {
      const futureDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
      expect(isTrialActive(futureDate)).toBe(true);
    });

    test('returns false when trial end is in the past', () => {
      const pastDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
      expect(isTrialActive(pastDate)).toBe(false);
    });
  });
});