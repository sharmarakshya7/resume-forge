import { COLORS as C } from '../utils/constants.js';


function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 15 }}>
      <div style={{ background: C.purple, color: C.white, padding: '4px 10px',
        fontWeight: 700, fontSize: 10, letterSpacing: 1.2, marginBottom: 8 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

/**
 * Read-only ATS-formatted resume preview.
 * Renders a live miniature of the resume as the user fills in data.
 *
 * @param {{ data: object }} props
 */
export default function ResumePreview({ data }) {
  const { contact, summary, skills, experience, projects, education, certifications } = data;

  const hasContent = (arr, key) => arr.some(item => item[key]);

  return (
    <div style={{ background: C.white, fontFamily: "'DM Sans', sans-serif",
      fontSize: 11, lineHeight: 1.5, color: '#222', padding: 22 }}>

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', borderBottom: `2px solid ${C.purple}`,
        paddingBottom: 12, marginBottom: 14 }}>
        <div style={{ fontSize: 19, fontWeight: 800, color: C.purple }}>
          {contact.fullName || 'Your Name'}
        </div>
        {contact.title && (
          <div style={{ fontSize: 11.5, color: C.accent, fontWeight: 600, marginTop: 2 }}>
            {contact.title}
          </div>
        )}
        <div style={{ fontSize: 10, color: '#555', marginTop: 5, lineHeight: 1.7 }}>
          {[contact.phone, contact.email, contact.location].filter(Boolean).join(' · ')}
          {(contact.linkedin || contact.github || contact.website) && (
            <><br />{[contact.linkedin, contact.github, contact.website].filter(Boolean).join(' · ')}</>
          )}
        </div>
      </div>

      {/* ── Summary ── */}
      {summary && (
        <Section title="PROFESSIONAL SUMMARY">
          <p>{summary}</p>
        </Section>
      )}

      {/* ── Skills ── */}
      {skills.some(s => s.category || s.items) && (
        <Section title="TECHNICAL SKILLS">
          {skills.filter(s => s.category || s.items).map((s, i) => (
            <div key={i} style={{ marginBottom: 3 }}>
              <strong>{s.category}:</strong> {s.items}
            </div>
          ))}
        </Section>
      )}

      {/* ── Experience ── */}
      {hasContent(experience, 'jobTitle') && (
        <Section title="PROFESSIONAL EXPERIENCE">
          {experience.filter(e => e.jobTitle || e.company).map((exp, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 11.5, color: C.purple }}>
                <span>{exp.jobTitle}{exp.company ? ` | ${exp.company}` : ''}</span>
                <span style={{ fontWeight: 400, color: '#777', fontSize: 10 }}>{exp.duration}</span>
              </div>
              {exp.location && <div style={{ color: '#888', fontSize: 10, fontStyle: 'italic' }}>{exp.location}</div>}
              <div style={{ whiteSpace: 'pre-line', marginTop: 3 }}>{exp.responsibilities}</div>
            </div>
          ))}
        </Section>
      )}

      {/* ── Projects ── */}
      {hasContent(projects, 'name') && (
        <Section title="PROJECTS">
          {projects.filter(p => p.name).map((p, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 11.5, color: C.purple }}>
                {p.name}{p.link ? ` | ${p.link}` : ''}
              </div>
              {p.tech && <div style={{ fontSize: 10, color: '#777', marginBottom: 2 }}>Technologies: {p.tech}</div>}
              <div style={{ whiteSpace: 'pre-line' }}>{p.description}</div>
            </div>
          ))}
        </Section>
      )}

      {/* ── Education ── */}
      {hasContent(education, 'degree') && (
        <Section title="EDUCATION">
          {education.filter(e => e.degree || e.university).map((edu, i) => (
            <div key={i} style={{ marginBottom: 7 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 11.5, color: C.purple }}>
                <span>{edu.degree}</span>
                <span style={{ fontWeight: 400, color: '#777', fontSize: 10 }}>{edu.gradYear}</span>
              </div>
              <div style={{ fontSize: 10, color: '#666' }}>
                {edu.university}
                {edu.gpa    ? ` | GPA: ${edu.gpa}`  : ''}
                {edu.honors ? ` | ${edu.honors}`     : ''}
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* ── Certifications ── */}
      {hasContent(certifications, 'name') && (
        <Section title="CERTIFICATIONS">
          {certifications.filter(c => c.name).map((cert, i) => (
            <div key={i} style={{ marginBottom: 5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 11.5, color: C.purple }}>
                <span>{cert.name}</span>
                <span style={{ fontWeight: 400, color: '#777', fontSize: 10 }}>{cert.date}</span>
              </div>
              <div style={{ fontSize: 10, color: '#666' }}>
                {cert.org}{cert.credentialId ? ` | ID: ${cert.credentialId}` : ''}
              </div>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}
