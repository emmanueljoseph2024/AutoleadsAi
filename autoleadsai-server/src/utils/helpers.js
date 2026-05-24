// ─── Sleep / Delay ──────────────────────────────────
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── Random Number ──────────────────────────────────
export const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ─── Random String ──────────────────────────────────
export const randomString = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// ─── Parse Pagination Params ────────────────────────
export const parsePagination = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(500, Math.max(1, parseInt(query.limit) || 50));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

// ─── Build Sort Object ──────────────────────────────
export const buildSort = (sortStr, defaultSort = '-createdAt') => {
  const field = sortStr || defaultSort;
  const direction = field.startsWith('-') ? -1 : 1;
  const key = field.startsWith('-') ? field.slice(1) : field;
  return { [key]: direction };
};

// ─── Build Filter Object ────────────────────────────
export const buildFilter = (query, allowedFields) => {
  const filter = {};
  for (const field of allowedFields) {
    if (query[field] !== undefined) {
      filter[field] = query[field];
    }
  }
  return filter;
};

// ─── Pluralize ──────────────────────────────────────
export const pluralize = (count, singular, plural) => {
  return count === 1 ? singular : plural || `${singular}s`;
};

// ─── Truncate String ────────────────────────────────
export const truncate = (str, maxLength = 100) => {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
};

// ─── Parse Boolean ──────────────────────────────────
export const parseBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1';
  }
  return false;
};

// ─── Omit Fields from Object ────────────────────────
export const omit = (obj, keys) => {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
};

// ─── Pick Fields from Object ────────────────────────
export const pick = (obj, keys) => {
  const result = {};
  keys.forEach((key) => {
    if (obj[key] !== undefined) result[key] = obj[key];
  });
  return result;
};

// ─── Chunk Array ────────────────────────────────────
export const chunk = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

// ─── Debounce ───────────────────────────────────────
export const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};