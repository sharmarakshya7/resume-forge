import mongoose from 'mongoose';

// Flexible schema — resume data is stored as a single JSON object
// so adding new fields never requires a migration.
const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'User',
      required: true,
      unique: true,  // one resume document per user
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
