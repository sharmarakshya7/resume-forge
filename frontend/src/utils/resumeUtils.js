/** Returns a fresh empty resume data object */
export const makeDefaultResume = () => ({
  contact: {
    fullName: '', phone: '', email: '',
    linkedin: '', github: '', website: '',
    location: '', title: '',
  },
  summary:        '',
  skills:         [{ category: '', items: '' }],
  experience:     [{ jobTitle: '', company: '', location: '', duration: '', responsibilities: '' }],
  projects:       [{ name: '', tech: '', description: '', link: '' }],
  education:      [{ degree: '', university: '', gradYear: '', gpa: '', honors: '' }],
  certifications: [{ name: '', org: '', date: '', credentialId: '' }],
});

/**
 * Returns 0-100 completion score based on 5 key sections
 * @param {object} data - resume data object
 */
export const calcCompletion = (data) => {
  const checks = [
    Boolean(data.contact.fullName && data.contact.email),
    Boolean(data.summary),
    data.skills.some(s => s.category),
    data.experience.some(e => e.jobTitle),
    data.education.some(e => e.degree),
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
};

/** Load resume from localStorage for a given user email */
export const loadSavedResume = (email) => {
  try {
    const key  = email ? `rb_resume_${email}` : 'rb_resume_guest';
    const raw  = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/** Save resume to localStorage for a given user email */
export const saveResumeLocal = (email, data) => {
  const key = email ? `rb_resume_${email}` : 'rb_resume_guest';
  localStorage.setItem(key, JSON.stringify(data));
};
