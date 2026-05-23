import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select: false, // never returned in queries by default
    },
    avatar: {
      type: String,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    subscription: {
      tier: {
        type: String,
        enum: ['starter', 'pro', 'scale'],
        default: 'starter',
      },
      status: {
        type: String,
        enum: ['trialing', 'active', 'past_due', 'canceled', 'inactive'],
        default: 'trialing',
      },
      trialStart: {
        type: Date,
        default: Date.now,
      },
      trialEnd: {
        type: Date,
        // 14‑day trial by default
        default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
      currentPeriodStart: Date,
      currentPeriodEnd: Date,
      paddleCustomerId: String,
      paddleSubscriptionId: String,
    },
    refreshTokens: [
      {
        token: String,
        expiresAt: Date,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ 'subscription.status': 1 });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Check if trial is still active
userSchema.methods.isTrialActive = function () {
  if (this.subscription.status !== 'trialing') return false;
  return new Date() < this.subscription.trialEnd;
};

// Remove sensitive fields when converting to JSON
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.refreshTokens;
    delete ret.__v;
    return ret;
  },
});

const User = mongoose.model('User', userSchema);
export default User;