import mongoose from 'mongoose';

const nicheSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    keywords: [String],
    location: {
      type: String,
      default: '',
    },
    sources: [
      {
        type: String,
        enum: ['linkedin', 'facebook', 'reddit', 'twitter', 'instagram', 'website', 'google_maps', 'news', 'apollo'],
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    totalScans: {
      type: Number,
      default: 0,
    },
    totalLeads: {
      type: Number,
      default: 0,
    },
    lastScanAt: Date,
  },
  {
    timestamps: true,
  }
);

nicheSchema.index({ userId: 1, isActive: 1 });
nicheSchema.index({ userId: 1, name: 1 }, { unique: true });

const Niche = mongoose.model('Niche', nicheSchema);
export default Niche;