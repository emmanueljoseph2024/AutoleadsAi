import crypto from 'crypto';

// ─── Generate Random Token ──────────────────────────
export const generateToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// ─── Hash String (SHA-256) ──────────────────────────
export const hashString = (str) => {
  return crypto.createHash('sha256').update(str).digest('hex');
};

// ─── Generate HMAC ──────────────────────────────────
export const generateHmac = (data, secret) => {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
};

// ─── Verify HMAC ────────────────────────────────────
export const verifyHmac = (data, secret, signature) => {
  const expected = generateHmac(data, secret);
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
};

// ─── Encrypt Text ───────────────────────────────────
export const encrypt = (text, secretKey) => {
  const iv = crypto.randomBytes(16);
  const key = crypto.scryptSync(secretKey, 'salt', 32);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

// ─── Decrypt Text ───────────────────────────────────
export const decrypt = (encryptedText, secretKey) => {
  const [ivHex, encrypted] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const key = crypto.scryptSync(secretKey, 'salt', 32);
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// ─── Generate UUID ──────────────────────────────────
export const generateUuid = () => {
  return crypto.randomUUID();
};