import {
  sanitizeString,
  sanitizeEmail,
  sanitizeUrl,
  sanitizeObject,
  stripHtml,
  normalizeName,
} from '../../../src/utils/sanitizers.js';

describe('Sanitizers', () => {
  // ─── sanitizeString ───────────────────────────────
  describe('sanitizeString', () => {
    test('trims whitespace', () => {
      expect(sanitizeString('  hello  ')).toBe('hello');
    });

    test('escapes HTML characters', () => {
      expect(sanitizeString('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
      );
    });

    test('returns empty string for non-string input', () => {
      expect(sanitizeString(null)).toBe('');
      expect(sanitizeString(undefined)).toBe('');
      expect(sanitizeString(123)).toBe('');
    });
  });

  // ─── sanitizeEmail ────────────────────────────────
  describe('sanitizeEmail', () => {
    test('trims and lowercases email', () => {
      expect(sanitizeEmail('  John@Example.COM  ')).toBe('john@example.com');
    });

    test('returns empty string for non-string input', () => {
      expect(sanitizeEmail(null)).toBe('');
      expect(sanitizeEmail(123)).toBe('');
    });
  });

  // ─── sanitizeUrl ──────────────────────────────────
  describe('sanitizeUrl', () => {
    test('trims and returns valid URL', () => {
      expect(sanitizeUrl('  https://example.com  ')).toBe('https://example.com/');
    });

    test('returns empty string for invalid URL', () => {
      expect(sanitizeUrl('not-a-url')).toBe('');
    });

    test('returns empty string for non-string input', () => {
      expect(sanitizeUrl(null)).toBe('');
    });
  });

  // ─── sanitizeObject ───────────────────────────────
  describe('sanitizeObject', () => {
    test('sanitizes all string values in object', () => {
      const obj = {
        name: '  <b>John</b>  ',
        email: 'JOHN@EXAMPLE.COM',
        nested: {
          bio: '<script>alert("hi")</script>',
        },
        age: 30,
      };
      const result = sanitizeObject(obj);
      expect(result.name).toBe('&lt;b&gt;John&lt;/b&gt;');
      expect(result.email).toBe('JOHN@EXAMPLE.COM');
      expect(result.nested.bio).toBe('&lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;');
      expect(result.age).toBe(30);
    });

    test('sanitizes array values', () => {
      const obj = {
        tags: ['  hello  ', '  <world>  '],
      };
      const result = sanitizeObject(obj);
      expect(result.tags[0]).toBe('hello');
      expect(result.tags[1]).toBe('&lt;world&gt;');
    });

    test('returns empty object for non-object input', () => {
      expect(sanitizeObject(null)).toEqual({});
      expect(sanitizeObject('string')).toEqual({});
    });
  });

  // ─── stripHtml ────────────────────────────────────
  describe('stripHtml', () => {
    test('removes HTML tags', () => {
      expect(stripHtml('<p>Hello <b>World</b></p>')).toBe('Hello World');
    });

    test('returns original string if no HTML', () => {
      expect(stripHtml('Hello World')).toBe('Hello World');
    });

    test('returns empty string for non-string input', () => {
      expect(stripHtml(null)).toBe('');
    });
  });

  // ─── normalizeName ────────────────────────────────
  describe('normalizeName', () => {
    test('capitalizes first letter of each word', () => {
      expect(normalizeName('john doe')).toBe('John Doe');
    });

    test('trims extra whitespace', () => {
      expect(normalizeName('  john   doe  ')).toBe('John Doe');
    });

    test('handles single name', () => {
      expect(normalizeName('john')).toBe('John');
    });

    test('returns empty string for non-string input', () => {
      expect(normalizeName(null)).toBe('');
    });
  });
});