import {
  sleep,
  parsePagination,
  buildSort,
  buildFilter,
  pluralize,
  truncate,
  parseBoolean,
  omit,
  pick,
  chunk,
} from '../../../src/utils/helpers.js';

describe('Helpers', () => {
  // ─── sleep ────────────────────────────────────────
  describe('sleep', () => {
    test('resolves after specified time', async () => {
      const start = Date.now();
      await sleep(100);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(90);
    });

    test('resolves immediately with 0ms', async () => {
      await sleep(0);
    });
  });

  // ─── parsePagination ──────────────────────────────
  describe('parsePagination', () => {
    test('parses default values when no query provided', () => {
      const result = parsePagination({});
      expect(result.page).toBe(1);
      expect(result.limit).toBe(50);
      expect(result.skip).toBe(0);
    });

    test('parses custom page and limit', () => {
      const result = parsePagination({ page: '3', limit: '20' });
      expect(result.page).toBe(3);
      expect(result.limit).toBe(20);
      expect(result.skip).toBe(40);
    });

    test('clamps page to minimum 1', () => {
      const result = parsePagination({ page: '-5' });
      expect(result.page).toBe(1);
    });

    test('clamps limit to maximum 500', () => {
      const result = parsePagination({ limit: '1000' });
      expect(result.limit).toBe(500);
    });

    test('clamps limit to minimum 1', () => {
      const result = parsePagination({ limit: '0' });
      expect(result.limit).toBe(1);
    });
  });

  // ─── buildSort ────────────────────────────────────
  describe('buildSort', () => {
    test('returns ascending sort for field without prefix', () => {
      const result = buildSort('name');
      expect(result).toEqual({ name: 1 });
    });

    test('returns descending sort for field with minus prefix', () => {
      const result = buildSort('-createdAt');
      expect(result).toEqual({ createdAt: -1 });
    });

    test('uses default sort when no input provided', () => {
      const result = buildSort(null);
      expect(result).toEqual({ createdAt: -1 });
    });

    test('uses custom default sort', () => {
      const result = buildSort(null, 'name');
      expect(result).toEqual({ name: 1 });
    });
  });

  // ─── buildFilter ──────────────────────────────────
  describe('buildFilter', () => {
    test('returns object with only allowed fields', () => {
      const query = { name: 'John', email: 'john@test.com', role: 'admin' };
      const result = buildFilter(query, ['name', 'email']);
      expect(result).toEqual({ name: 'John', email: 'john@test.com' });
      expect(result.role).toBeUndefined();
    });

    test('returns empty object when no matches', () => {
      const query = { role: 'admin' };
      const result = buildFilter(query, ['name', 'email']);
      expect(result).toEqual({});
    });

    test('skips undefined values', () => {
      const query = { name: undefined, email: 'john@test.com' };
      const result = buildFilter(query, ['name', 'email']);
      expect(result).toEqual({});
    });
  });

  // ─── pluralize ────────────────────────────────────
  describe('pluralize', () => {
    test('returns singular for count of 1', () => {
      expect(pluralize(1, 'lead', 'leads')).toBe('lead');
    });

    test('returns plural for count other than 1', () => {
      expect(pluralize(0, 'lead', 'leads')).toBe('leads');
      expect(pluralize(5, 'lead', 'leads')).toBe('leads');
    });

    test('appends "s" when plural not provided', () => {
      expect(pluralize(5, 'lead')).toBe('leads');
    });
  });

  // ─── truncate ─────────────────────────────────────
  describe('truncate', () => {
    test('returns original string when within limit', () => {
      expect(truncate('hello', 10)).toBe('hello');
    });

    test('truncates and adds ellipsis when over limit', () => {
      const result = truncate('hello world this is long', 10);
      expect(result).toBe('hello w...');
      expect(result.length).toBe(10);
    });

    test('returns empty string for falsy input', () => {
      expect(truncate('', 10)).toBe('');
      expect(truncate(null, 10)).toBe(null);
    });

    test('uses default maxLength of 100', () => {
      const short = 'short';
      expect(truncate(short)).toBe('short');
    });
  });

  // ─── parseBoolean ─────────────────────────────────
  describe('parseBoolean', () => {
    test('returns boolean as-is', () => {
      expect(parseBoolean(true)).toBe(true);
      expect(parseBoolean(false)).toBe(false);
    });

    test('parses "true" string', () => {
      expect(parseBoolean('true')).toBe(true);
      expect(parseBoolean('TRUE')).toBe(true);
    });

    test('parses "false" string', () => {
      expect(parseBoolean('false')).toBe(false);
      expect(parseBoolean('FALSE')).toBe(false);
    });

    test('parses "1" as true', () => {
      expect(parseBoolean('1')).toBe(true);
    });

    test('parses "0" as false', () => {
      expect(parseBoolean('0')).toBe(false);
    });

    test('returns false for unknown values', () => {
      expect(parseBoolean('yes')).toBe(false);
      expect(parseBoolean(undefined)).toBe(false);
    });
  });

  // ─── omit ─────────────────────────────────────────
  describe('omit', () => {
    test('removes specified keys from object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = omit(obj, ['a', 'c']);
      expect(result).toEqual({ b: 2 });
    });

    test('returns original object when no keys to omit', () => {
      const obj = { a: 1, b: 2 };
      const result = omit(obj, []);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    test('does not mutate original object', () => {
      const obj = { a: 1, b: 2 };
      omit(obj, ['a']);
      expect(obj).toEqual({ a: 1, b: 2 });
    });
  });

  // ─── pick ─────────────────────────────────────────
  describe('pick', () => {
    test('returns only specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = pick(obj, ['a', 'c']);
      expect(result).toEqual({ a: 1, c: 3 });
    });

    test('ignores keys that do not exist', () => {
      const obj = { a: 1 };
      const result = pick(obj, ['a', 'z']);
      expect(result).toEqual({ a: 1 });
      expect(result.z).toBeUndefined();
    });

    test('returns empty object when no keys match', () => {
      const obj = { a: 1 };
      const result = pick(obj, ['x', 'y']);
      expect(result).toEqual({});
    });
  });

  // ─── chunk ────────────────────────────────────────
  describe('chunk', () => {
    test('splits array into chunks of specified size', () => {
      const result = chunk([1, 2, 3, 4, 5], 2);
      expect(result).toEqual([[1, 2], [3, 4], [5]]);
    });

    test('returns single chunk when size exceeds array length', () => {
      const result = chunk([1, 2, 3], 10);
      expect(result).toEqual([[1, 2, 3]]);
    });

    test('returns empty array for empty input', () => {
      const result = chunk([], 3);
      expect(result).toEqual([]);
    });

    test('handles size of 1', () => {
      const result = chunk([1, 2, 3], 1);
      expect(result).toEqual([[1], [2], [3]]);
    });
  });
});