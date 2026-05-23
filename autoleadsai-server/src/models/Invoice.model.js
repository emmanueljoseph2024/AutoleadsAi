import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription',
    },
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    },
    paddleInvoiceId: { type: String, unique: true },
    invoiceNumber: { type: String, unique: true },
    amount: Number,
    currency: { type: String, default: 'USD' },
    status: {
      type: String,
      enum: ['draft', 'open', 'paid', 'void', 'uncollectible'],
    },
    pdfUrl: String,
    dueDate: Date,
    paidAt: Date,
  },
  {
    timestamps: true,
  }
);

invoiceSchema.index({ userId: 1, createdAt: -1 });

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;