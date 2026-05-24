import bcrypt from 'bcryptjs';

export const validUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: 'SecurePass123!',
};

export const adminUser = {
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@autoleadsai.com',
  password: 'AdminPass123!',
  role: 'admin',
};

export const proUser = {
  firstName: 'Pro',
  lastName: 'User',
  email: 'pro@autoleadsai.com',
  password: 'ProPass123!',
  subscription: {
    tier: 'pro',
    status: 'active',
  },
};

export const scaleUser = {
  firstName: 'Scale',
  lastName: 'User',
  email: 'scale@autoleadsai.com',
  password: 'ScalePass123!',
  subscription: {
    tier: 'scale',
    status: 'active',
  },
};

export const trialUser = {
  firstName: 'Trial',
  lastName: 'User',
  email: 'trial@autoleadsai.com',
  password: 'TrialPass123!',
  subscription: {
    tier: 'starter',
    status: 'trialing',
    trialStart: new Date(),
    trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  },
};

export const expiredTrialUser = {
  firstName: 'Expired',
  lastName: 'Trial',
  email: 'expired@autoleadsai.com',
  password: 'ExpiredPass123!',
  subscription: {
    tier: 'starter',
    status: 'trialing',
    trialStart: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    trialEnd: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
  },
};

export const inactiveUser = {
  firstName: 'Inactive',
  lastName: 'User',
  email: 'inactive@autoleadsai.com',
  password: 'InactivePass123!',
  isActive: false,
};

export const unverifiedUser = {
  firstName: 'Unverified',
  lastName: 'User',
  email: 'unverified@autoleadsai.com',
  password: 'UnverifiedPass123!',
  emailVerified: false,
};

// ─── User with hashed password (for direct DB insertion) ──

export const createHashedUser = async () => {
  const hashedPassword = await bcrypt.hash('SecurePass123!', 12);
  return {
    firstName: 'Hashed',
    lastName: 'User',
    email: 'hashed@autoleadsai.com',
    password: hashedPassword,
    emailVerified: true,
  };
};

// ─── User response (what the API returns) ────────────

export const userResponseShape = {
  _id: expect.any(String),
  firstName: expect.any(String),
  lastName: expect.any(String),
  email: expect.any(String),
  role: expect.any(String),
  subscription: {
    tier: expect.any(String),
    status: expect.any(String),
    trialStart: expect.any(String),
    trialEnd: expect.any(String),
  },
  emailVerified: expect.any(Boolean),
  isActive: expect.any(Boolean),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

// ─── Auth response shape ─────────────────────────────

export const authResponseShape = {
  user: userResponseShape,
  accessToken: expect.any(String),
};