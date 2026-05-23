import mongoose from 'mongoose';

const paymentMethodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['card', 'bank_transfer', 'ussd', 'mobile_money'],
    },
    provider: {
      type: String,
      enum: ['paddle', 'paystack'],
    },
    lastFour: String,
    expiryMonth: Number,
    expiryYear: Number,
    brand: String,
    isDefault: { type: Boolean, default: false },
    providerPaymentMethodId: String,
  },
  {
    timestamps: true,
  }
);

paymentMethodSchema.index({ userId: 1, isDefault: 1 });

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);
export default PaymentMethod;