import Btn from '../ui/Btn.jsx';
import { FormInput, FormTextarea, FormRow } from '../ui/FormFields.jsx';
import { COLORS as C } from '../../utils/constants.js';

// ─── Contact Section ──────────────────────────────────────────────────────────
export function ContactSection({ data, onChange }) {
  const set = (field, val) => onChange({ ...data, [field]: val });
  return (
    <div style={{ animation: 'slideIn .25s ease' }}>
      <SectionHeading>Contact Information</SectionHeading>
      <FormInput label="Full Name" required placeholder="Jane Smith" value={data.fullName} onChange={e => set('fullName', e.target.value)} />
      <FormRow>
        <FormInput label="Phone"  required placeholder="(555) 123-4567"  value={data.phone} onChange={e => set('phone', e.target.value)} />
        <FormInput label="Email"  required type="email" placeholder="jane@email.com" value={data.email} onChange={e => set('email', e.target.value)} />
      </FormRow>
      <FormRow>
        <FormInput label="LinkedIn"  placeholder="linkedin.com/in/profile" value={data.linkedin} onChange={e => set('linkedin', e.target.value)} />
        <FormInput label="GitHub"    placeholder="github.com/username"     value={data.github}   onChange={e => set('github',   e.target.value)} />
      </FormRow>
      <FormRow>
        <FormInput label="Location"  required placeholder="New York, NY" value={data.location} onChange={e => set('location', e.target.value)} />
        <FormInput label="Portfolio" placeholder="yoursite.com"          value={data.website}  onChange={e => set('website',  e.target.value)} />
      </FormRow>
      <FormInput label="Desired Job Title" placeholder="Senior Software Engineer" value={data.title} onChange={e => set('title', e.target.value)} />
    </div>
  );
}

// ─── Summary Section ──────────────────────────────────────────────────────────
export function SummarySection({ data, onChange }) {
  return (
    <div style={{ animation: 'slideIn .25s ease' }}>
      <SectionHeading>Professional Summary</SectionHeading>
      <p style={{ fontSize: 13, color: '#999', marginBottom: 18 }}>
        Write 2–4 sentences highlighting your experience, key skills, and career goals.
      </p>
      <FormTextarea
        label="Summary" required rows={6}
        placeholder="Results-driven Software Engineer with 5+ years of experience building scalable web applications. Proven expertise in React, Node.js, and cloud infrastructure."
        value={data}
        onChange={e => onChange(e.target.value)}
      />
      <InfoBox>
        <strong>Tip:</strong> Mention years of experience, 2–3 core skills, and one measurable achievement.
      </InfoBox>
    </div>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────
export function SkillsSection({ data, onChange }) {
  const add    = ()         => onChange([...data, { category: '', items: '' }]);
  const remove = (i)        => onChange(data.filter((_, idx) => idx !== i));
  const update = (i, f, v)  => onChange(data.map((s, idx) => idx === i ? { ...s, [f]: v } : s));

  return (
    <div style={{ animation: 'slideIn .25s ease' }}>
      <SectionHeading>Technical Skills</SectionHeading>
      <p style={{ fontSize: 13, color: '#999', marginBottom: 18 }}>Group skills by category for better ATS parsing.</p>

      {data.map((skill, i) => (
        <div key={i} style={{ background: C.cream, borderRadius: 12, padding: 14, marginBottom: 10, border: `1px solid ${C.border}` }}>
          <FormRow>
            <FormInput label="Category"               placeholder="Programming Languages" value={skill.category} onChange={e => update(i, 'category', e.target.value)} />
            <FormInput label="Skills (comma-separated)" placeholder="JavaScript, Python" value={skill.items}    onChange={e => update(i, 'items',    e.target.value)} />
          </FormRow>
          {data.length > 1 && <Btn variant="danger" size="sm" onClick={() => remove(i)}>Remove</Btn>}
        </div>
      ))}
      <Btn variant="outline" onClick={add}>+ Add Skill Category</Btn>
    </div>
  );
}

// ─── Experience Section ───────────────────────────────────────────────────────
export function ExperienceSection({ experience, projects, onExperienceChange, onProjectsChange }) {
  const addExp    = ()         => onExperienceChange([...experience, { jobTitle: '', company: '', location: '', duration: '', responsibilities: '' }]);
  const removeExp = (i)        => onExperienceChange(experience.filter((_, idx) => idx !== i));
  const updateExp = (i, f, v)  => onExperienceChange(experience.map((e, idx) => idx === i ? { ...e, [f]: v } : e));

  const addProj    = ()         => onProjectsChange([...projects, { name: '', tech: '', description: '', link: '' }]);
  const removeProj = (i)        => onProjectsChange(projects.filter((_, idx) => idx !== i));
  const updateProj = (i, f, v)  => onProjectsChange(projects.map((p, idx) => idx === i ? { ...p, [f]: v } : p));

  return (
    <div style={{ animation: 'slideIn .25s ease' }}>
      <SectionHeading>Professional Experience</SectionHeading>

      {experience.map((exp, i) => (
        <EntryCard key={i} label={`Position ${i + 1}`} onRemove={experience.length > 1 ? () => removeExp(i) : null}>
          <FormRow>
            <FormInput label="Job Title" required placeholder="Software Engineer" value={exp.jobTitle}  onChange={e => updateExp(i, 'jobTitle',  e.target.value)} />
            <FormInput label="Company"   required placeholder="Acme Corp"         value={exp.company}   onChange={e => updateExp(i, 'company',   e.target.value)} />
          </FormRow>
          <FormRow>
            <FormInput label="Location" placeholder="New York, NY / Remote" value={exp.location} onChange={e => updateExp(i, 'location', e.target.value)} />
            <FormInput label="Duration" required placeholder="Jan 2022 – Present"  value={exp.duration} onChange={e => updateExp(i, 'duration', e.target.value)} />
          </FormRow>
          <FormTextarea
            label="Key Responsibilities" required rows={4}
            placeholder={"• Built REST APIs serving 500K+ daily users\n• Reduced page load time by 40%\n• Led a team of 3 engineers"}
            value={exp.responsibilities}
            onChange={e => updateExp(i, 'responsibilities', e.target.value)}
          />
        </EntryCard>
      ))}
      <Btn variant="outline" onClick={addExp}>+ Add Experience</Btn>

      {/* ── Projects (optional) ── */}
      <div style={{ marginTop: 30 }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: C.purple, marginBottom: 8 }}>
          Projects <span style={{ fontSize: 13, fontWeight: 400, color: '#bbb' }}>(Optional)</span>
        </h3>
        {projects.map((p, i) => (
          <EntryCard key={i} label={`Project ${i + 1}`} onRemove={projects.length > 1 ? () => removeProj(i) : null}>
            <FormRow>
              <FormInput label="Project Name" placeholder="E-commerce Platform" value={p.name} onChange={e => updateProj(i, 'name', e.target.value)} />
              <FormInput label="GitHub / URL" placeholder="github.com/..."      value={p.link} onChange={e => updateProj(i, 'link', e.target.value)} />
            </FormRow>
            <FormInput label="Technologies"  placeholder="React, Node.js, PostgreSQL" value={p.tech}        onChange={e => updateProj(i, 'tech',        e.target.value)} />
            <FormTextarea label="Description" rows={3}
              placeholder={"• Full-stack marketplace with Stripe payments\n• Deployed on AWS with CI/CD pipeline"}
              value={p.description}
              onChange={e => updateProj(i, 'description', e.target.value)}
            />
          </EntryCard>
        ))}
        <Btn variant="outline" onClick={addProj}>+ Add Project</Btn>
      </div>
    </div>
  );
}

// ─── Education Section ────────────────────────────────────────────────────────
export function EducationSection({ education, certifications, onEducationChange, onCertificationsChange }) {
  const addEdu    = ()         => onEducationChange([...education, { degree: '', university: '', gradYear: '', gpa: '', honors: '' }]);
  const removeEdu = (i)        => onEducationChange(education.filter((_, idx) => idx !== i));
  const updateEdu = (i, f, v)  => onEducationChange(education.map((e, idx) => idx === i ? { ...e, [f]: v } : e));

  const addCert    = ()         => onCertificationsChange([...certifications, { name: '', org: '', date: '', credentialId: '' }]);
  const removeCert = (i)        => onCertificationsChange(certifications.filter((_, idx) => idx !== i));
  const updateCert = (i, f, v)  => onCertificationsChange(certifications.map((c, idx) => idx === i ? { ...c, [f]: v } : c));

  return (
    <div style={{ animation: 'slideIn .25s ease' }}>
      <SectionHeading>Education</SectionHeading>

      {education.map((edu, i) => (
        <EntryCard key={i} label={`Degree ${i + 1}`} onRemove={education.length > 1 ? () => removeEdu(i) : null}>
          <FormRow>
            <FormInput label="Degree"     required placeholder="B.S. in Computer Science" value={edu.degree}     onChange={e => updateEdu(i, 'degree',     e.target.value)} />
            <FormInput label="University" required placeholder="MIT"                       value={edu.university} onChange={e => updateEdu(i, 'university', e.target.value)} />
          </FormRow>
          <FormRow>
            <FormInput label="Graduation Year" placeholder="2022"      value={edu.gradYear} onChange={e => updateEdu(i, 'gradYear', e.target.value)} />
            <FormInput label="GPA (Optional)"  placeholder="3.9 / 4.0" value={edu.gpa}      onChange={e => updateEdu(i, 'gpa',      e.target.value)} />
          </FormRow>
          <FormInput label="Honors / Achievements" placeholder="Dean's List, Summa Cum Laude" value={edu.honors} onChange={e => updateEdu(i, 'honors', e.target.value)} />
        </EntryCard>
      ))}
      <Btn variant="outline" onClick={addEdu}>+ Add Education</Btn>

      {/* ── Certifications (optional) ── */}
      <div style={{ marginTop: 30 }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: C.purple, marginBottom: 8 }}>
          Certifications <span style={{ fontSize: 13, fontWeight: 400, color: '#bbb' }}>(Optional)</span>
        </h3>
        {certifications.map((cert, i) => (
          <EntryCard key={i} label={`Certification ${i + 1}`} onRemove={certifications.length > 1 ? () => removeCert(i) : null}>
            <FormRow>
              <FormInput label="Certification"        placeholder="AWS Certified Developer"  value={cert.name}         onChange={e => updateCert(i, 'name',         e.target.value)} />
              <FormInput label="Issuing Organization" placeholder="Amazon Web Services"      value={cert.org}          onChange={e => updateCert(i, 'org',          e.target.value)} />
            </FormRow>
            <FormRow>
              <FormInput label="Date"          placeholder="March 2024"  value={cert.date}         onChange={e => updateCert(i, 'date',         e.target.value)} />
              <FormInput label="Credential ID" placeholder="ABC-123456"  value={cert.credentialId} onChange={e => updateCert(i, 'credentialId', e.target.value)} />
            </FormRow>
          </EntryCard>
        ))}
        <Btn variant="outline" onClick={addCert}>+ Add Certification</Btn>
      </div>
    </div>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────
function SectionHeading({ children }) {
  return (
    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: C.purple, marginBottom: 18 }}>
      {children}
    </h3>
  );
}

function EntryCard({ label, onRemove, children }) {
  return (
    <div style={{ background: C.cream, borderRadius: 14, padding: 18, marginBottom: 14, border: `1px solid ${C.border}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontWeight: 700, color: C.purple, fontSize: 13 }}>{label}</span>
        {onRemove && <Btn variant="danger" size="sm" onClick={onRemove}>Remove</Btn>}
      </div>
      {children}
    </div>
  );
}

function InfoBox({ children }) {
  return (
    <div style={{ background: '#f0f6ff', border: '1px solid #c5d8f5', borderRadius: 9, padding: '11px 15px', fontSize: 13, color: '#2c5282' }}>
      {children}
    </div>
  );
}

// Also export FormTextarea alias for sections that import from here
export { FormTextarea };
