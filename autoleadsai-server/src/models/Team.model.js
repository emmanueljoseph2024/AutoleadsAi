import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        role: {
          type: String,
          enum: ['admin', 'member', 'viewer'],
          default: 'member',
        },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    maxMembers: { type: Number, default: 10 },
  },
  {
    timestamps: true,
  }
);

teamSchema.index({ ownerId: 1 });

const Team = mongoose.model('Team', teamSchema);
export default Team;