import Resume from '../models/Resume.js';

// ─── POST /api/resume ─────────────────────────────────────────────────────────
/**
 * Save (upsert) the authenticated user's resume.
 * If a resume already exists for this user it is updated, otherwise created.
 */
export const saveResume = async (req, res) => {
  const resumeData = req.body;

  if (!resumeData || typeof resumeData !== 'object') {
    return res.status(400).json({ message: 'Invalid resume data.' });
  }

  const resume = await Resume.findOneAndUpdate(
    { user: req.user._id },
    { user: req.user._id, data: resumeData },
    { upsert: true, new: true, runValidators: true }
  );

  res.json({ message: 'Resume saved.', resume: resume.data });
};

// ─── GET /api/resume ──────────────────────────────────────────────────────────
/**
 * Load the authenticated user's saved resume.
 * Returns null if no resume has been saved yet.
 */
export const loadResume = async (req, res) => {
  const resume = await Resume.findOne({ user: req.user._id });
  res.json({ resume: resume ? resume.data : null });
};
