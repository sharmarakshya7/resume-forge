import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { saveResume, loadResume } from '../services/resumeService.js';
import { makeDefaultResume, calcCompletion, loadSavedResume, saveResumeLocal } from '../utils/resumeUtils.js';
import TabBar, { TABS } from '../components/builder/TabBar.jsx';
import { ContactSection, SummarySection, SkillsSection, ExperienceSection, EducationSection } from '../components/builder/FormSections.jsx';
import ResumePreview from '../components/ResumePreview.jsx';
import Btn from '../components/ui/Btn.jsx';
import { COLORS as C } from '../utils/constants.js';
import { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

// ── Icons ─────────────────────────────────────────────────────────────────────

const SaveIcon = () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M10 1H2a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V3L10 1z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="4" y="1" width="5" height="3" rx=".5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 7h7M3 9.5h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);

const WordIcon = () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="1" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 4.5l1.5 4 1.5-3 1.5 3 1.5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// ── Word document builder ─────────────────────────────────────────────────────
// Converts the resume data object into a structured .docx file

const buildWordDoc = (data) => {
  const { contact, summary, skills, experience, projects, education, certifications } = data;

  // Purple section title bar
  const sectionTitle = (text) => new Paragraph({
    children: [new TextRun({ text, bold: true, color: 'FFFFFF', size: 20, font: 'Arial' })],
    shading:  { fill: '362b55', type: 'clear', color: 'auto' },
    spacing:  { before: 240, after: 80 },
    border:   { bottom: { style: BorderStyle.SINGLE, size: 4, color: '7c5cbf' } },
  });

  // Standard body paragraph
  const body = (text, opts = {}) => new Paragraph({
    children: [new TextRun({ text: text || '', size: 20, font: 'Arial', ...opts })],
    spacing:  { after: 60 },
  });

  // Bold label + plain value on one line (used for skills)
  const labelValue = (label, value) => new Paragraph({
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 20, font: 'Arial' }),
      new TextRun({ text: value || '',  size: 20, font: 'Arial' }),
    ],
    spacing: { after: 60 },
  });

  // Bold title + date on one line (experience / education / cert headers)
  const entryHeader = (title, date) => new Paragraph({
    children: [
      new TextRun({ text: title,                    bold: true, size: 22, color: '362b55', font: 'Arial' }),
      new TextRun({ text: date ? `   ${date}` : '', size: 18,  color: '888888', font: 'Arial' }),
    ],
    spacing: { before: 120, after: 40 },
  });

  // Small italic subtitle (location, tech stack, etc.)
  const sub = (text) => body(text, { italics: true, color: '888888', size: 18 });

  // Empty spacer between entries
  const spacer = () => new Paragraph({ text: '', spacing: { after: 80 } });

  // ── Build paragraph array ─────────────────────────────────────────────────
  const children = [

    // ── Name ──────────────────────────────────────────────────────────────
    new Paragraph({
      children:  [new TextRun({ text: contact.fullName || 'Your Name', bold: true, size: 48, color: '362b55', font: 'Arial' })],
      alignment: AlignmentType.CENTER,
      spacing:   { after: 60 },
      border:    { bottom: { style: BorderStyle.SINGLE, size: 8, color: '362b55' } },
    }),

    // ── Job title ─────────────────────────────────────────────────────────
    contact.title && new Paragraph({
      children:  [new TextRun({ text: contact.title, size: 22, color: '7c5cbf', italics: true, font: 'Arial' })],
      alignment: AlignmentType.CENTER,
      spacing:   { after: 60 },
    }),

    // ── Contact line: phone · email · location ────────────────────────────
    new Paragraph({
      children: [new TextRun({
        text:  [contact.phone, contact.email, contact.location].filter(Boolean).join('   ·   '),
        size:  18, color: '555555', font: 'Arial',
      })],
      alignment: AlignmentType.CENTER,
      spacing:   { after: 40 },
    }),

    // ── Links: linkedin · github · website ───────────────────────────────
    (contact.linkedin || contact.github || contact.website) && new Paragraph({
      children: [new TextRun({
        text:  [contact.linkedin, contact.github, contact.website].filter(Boolean).join('   ·   '),
        size:  18, color: '555555', font: 'Arial',
      })],
      alignment: AlignmentType.CENTER,
      spacing:   { after: 200 },
    }),

    // ── Summary ────────────────────────────────────────────────────────────
    summary && sectionTitle('PROFESSIONAL SUMMARY'),
    summary && body(summary),

    // ── Skills ────────────────────────────────────────────────────────────
    skills.some(s => s.category || s.items) && sectionTitle('TECHNICAL SKILLS'),
    ...skills
        .filter(s => s.category || s.items)
        .map(s => labelValue(s.category, s.items)),

    // ── Experience ────────────────────────────────────────────────────────
    experience.some(e => e.jobTitle) && sectionTitle('PROFESSIONAL EXPERIENCE'),
    ...experience
        .filter(e => e.jobTitle || e.company)
        .flatMap(exp => [
          entryHeader([exp.jobTitle, exp.company].filter(Boolean).join(' | '), exp.duration),
          exp.location && sub(exp.location),
          ...(exp.responsibilities || '').split('\n').filter(Boolean).map(line => body(line)),
          spacer(),
        ]),

    // ── Projects ──────────────────────────────────────────────────────────
    projects.some(p => p.name) && sectionTitle('PROJECTS'),
    ...projects
        .filter(p => p.name)
        .flatMap(p => [
          new Paragraph({
            children: [
              new TextRun({ text: p.name,       bold: true, size: 22, color: '362b55', font: 'Arial' }),
              p.link ? new TextRun({ text: `   ${p.link}`, size: 18, color: '7c5cbf', font: 'Arial' }) : null,
            ].filter(Boolean),
            spacing: { before: 100, after: 40 },
          }),
          p.tech && sub(`Technologies: ${p.tech}`),
          ...(p.description || '').split('\n').filter(Boolean).map(line => body(line)),
          spacer(),
        ]),

    // ── Education ─────────────────────────────────────────────────────────
    education.some(e => e.degree) && sectionTitle('EDUCATION'),
    ...education
        .filter(e => e.degree || e.university)
        .flatMap(edu => [
          entryHeader(edu.degree, edu.gradYear),
          body(
              [edu.university, edu.gpa ? `GPA: ${edu.gpa}` : null, edu.honors || null]
                  .filter(Boolean).join('  |  '),
              { color: '555555' }
          ),
          spacer(),
        ]),

    // ── Certifications ─────────────────────────────────────────────────────
    certifications.some(c => c.name) && sectionTitle('CERTIFICATIONS'),
    ...certifications
        .filter(c => c.name)
        .flatMap(cert => [
          entryHeader(cert.name, cert.date),
          body(
              [cert.org, cert.credentialId ? `ID: ${cert.credentialId}` : null]
                  .filter(Boolean).join('  |  '),
              { color: '555555' }
          ),
          spacer(),
        ]),

  ].filter(Boolean); // remove nulls from skipped optional sections

  return new Document({
    sections: [{
      properties: {
        page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } }, // 0.5 inch margins
      },
      children,
    }],
  });
};

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Full resume builder page.
 * - Loads saved resume on mount (from server if logged in, localStorage if not)
 * - Reports completion percentage to parent via onCompletionChange
 * - Requires sign-in to save; shows prompt if user clicks Save without account
 *
 * @param {{ onCompletionChange, onNeedAuth, showToast }} props
 */
export default function BuilderPage({ onCompletionChange, onNeedAuth, showToast }) {
  const { user } = useAuth();
  const [activeTab,      setActiveTab]      = useState('contact');
  const [data,           setData]           = useState(() => loadSavedResume(user?.email) || makeDefaultResume());
  const [saving,         setSaving]         = useState(false);
  const [downloadingDoc, setDownloadingDoc] = useState(false);

  const tabIndex = TABS.findIndex(t => t.id === activeTab);

  // Load resume from server when user logs in
  useEffect(() => {
    if (!user) return;
    loadResume()
        .then(res => { if (res?.resume) setData(res.resume); })
        .catch(() => {
          // Fall back to local storage if API unavailable
          const local = loadSavedResume(user.email);
          if (local) setData(local);
        });
  }, [user]);

  // Report completion % to parent (used by Navbar progress bar)
  useEffect(() => {
    onCompletionChange?.(calcCompletion(data));
  }, [data, onCompletionChange]);

  const updateSection = (key, value) => setData(prev => ({ ...prev, [key]: value }));

  // ── Save handler ──────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!user) { onNeedAuth(); return; }
    setSaving(true);
    try {
      await saveResume(data);
      saveResumeLocal(user.email, data); // also keep a local copy as fallback
      showToast('Progress saved successfully!');
    } catch {
      // API unavailable — save locally only
      saveResumeLocal(user.email, data);
      showToast('Saved locally (offline mode).');
    } finally {
      setSaving(false);
    }
  };

  // ── Print to PDF ──────────────────────────────────────────────────────────
  const handlePrint = () => {
    const content = document.getElementById('resume-preview-area');
    const win = window.open('', '_blank');
    win.document.write(`
      <html>
        <head>
          <title>Resume — ${data.contact.fullName || 'ResumeForge'}</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: Arial, sans-serif; color: #222; font-size: 11px; line-height: 1.5; padding: 18px; }
          </style>
        </head>
        <body>${content.innerHTML}</body>
      </html>
    `);
    win.document.close();
    win.print();
    win.close();
  };

  // ── Download Word (.docx) ─────────────────────────────────────────────────
  const handleDownloadWord = async () => {
    setDownloadingDoc(true);
    try {
      const doc      = buildWordDoc(data);
      const blob     = await Packer.toBlob(doc);
      const filename = data.contact.fullName
          ? `${data.contact.fullName.replace(/\s+/g, '_')}_Resume.docx`
          : 'Resume.docx';
      saveAs(blob, filename);
      showToast('Word document downloaded!');
    } catch (err) {
      console.error('Word export error:', err);
      showToast('Failed to generate Word file. Please try again.');
    } finally {
      setDownloadingDoc(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        <div className="builder-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, alignItems: 'start' }}>

          {/* ── Form Panel ── */}
          <div style={{ background: C.white, borderRadius: 18, boxShadow: '0 6px 28px rgba(54,43,85,.09)', overflow: 'hidden' }}>

            {/* Panel header */}
            <div style={{ background: `linear-gradient(135deg,${C.purple},${C.purpleLight})`, padding: '18px 22px' }}>
              <h2 style={{ color: C.white, fontFamily: "'Playfair Display', serif", fontSize: 18, marginBottom: 4 }}>
                Resume Information
              </h2>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,.65)' }}>
                {user ? `Saving to ${user.email}` : 'Sign in to save your progress'}
              </p>
            </div>

            {/* Tabs + form */}
            <div style={{ padding: '20px 20px 0' }}>
              <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            <div style={{ padding: '0 20px 20px' }}>

              {activeTab === 'contact'    && <ContactSection    data={data.contact}    onChange={val => updateSection('contact',    val)} />}
              {activeTab === 'summary'    && <SummarySection    data={data.summary}    onChange={val => updateSection('summary',    val)} />}
              {activeTab === 'skills'     && <SkillsSection     data={data.skills}     onChange={val => updateSection('skills',     val)} />}
              {activeTab === 'experience' && (
                  <ExperienceSection
                      experience={data.experience}
                      projects={data.projects}
                      onExperienceChange={val => updateSection('experience', val)}
                      onProjectsChange={val   => updateSection('projects',   val)}
                  />
              )}
              {activeTab === 'education'  && (
                  <EducationSection
                      education={data.education}
                      certifications={data.certifications}
                      onEducationChange={val       => updateSection('education',       val)}
                      onCertificationsChange={val  => updateSection('certifications',  val)}
                  />
              )}

              {/* Navigation footer */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.border}`,
              }}>
                {/* Back */}
                <Btn variant="ghost"
                     onClick={() => setActiveTab(TABS[Math.max(0, tabIndex - 1)].id)}
                     style={{ visibility: tabIndex === 0 ? 'hidden' : 'visible' }}>
                  ← Back
                </Btn>

                {/* Save */}
                <button onClick={handleSave} disabled={saving} style={{
                  display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px',
                  border: `1.5px solid ${user ? '#c3e6cb' : C.border}`,
                  borderRadius: 9, cursor: saving ? 'not-allowed' : 'pointer',
                  background: user ? '#d4edda' : '#fafafa',
                  color:      user ? '#155724' : C.purple,
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, transition: 'all .2s',
                }}>
                  <SaveIcon />
                  {saving ? 'Saving…' : user ? 'Save Progress' : 'Sign In to Save'}
                </button>

                {/* Next / Complete */}
                {tabIndex < TABS.length - 1
                    ? <Btn onClick={() => setActiveTab(TABS[tabIndex + 1].id)}>Next →</Btn>
                    : <Btn onClick={handleSave}>{user ? 'Complete' : 'Sign In to Complete'}</Btn>
                }
              </div>
            </div>
          </div>

          {/* ── Preview Panel ── */}
          <div style={{ position: 'sticky', top: 74 }}>
            <div style={{ background: C.white, borderRadius: 18, boxShadow: '0 6px 28px rgba(54,43,85,.09)', overflow: 'hidden' }}>

              {/* Preview header — both download buttons side by side */}
              <div style={{
                background: C.cream, padding: '13px 18px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: `1px solid ${C.border}`,
              }}>
                <span style={{ fontWeight: 700, color: C.purple, fontSize: 14 }}>Live Preview</span>

                <div style={{ display: 'flex', gap: 8 }}>

                  {/* Word download button */}
                  <button
                      onClick={handleDownloadWord}
                      disabled={downloadingDoc}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '7px 14px', border: `1.5px solid ${C.border}`,
                        borderRadius: 9, background: C.white, color: C.purple,
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12.5,
                        cursor: downloadingDoc ? 'not-allowed' : 'pointer',
                        opacity: downloadingDoc ? 0.6 : 1, transition: 'all .2s',
                      }}
                      onMouseEnter={e => { if (!downloadingDoc) e.currentTarget.style.background = C.cream; }}
                      onMouseLeave={e => { e.currentTarget.style.background = C.white; }}>
                    <WordIcon />
                    {downloadingDoc ? 'Generating…' : 'Download .docx'}
                  </button>

                  {/* Print / PDF button — unchanged from original */}
                  <Btn variant="ghost" size="sm" onClick={handlePrint}>
                    Print / Save as PDF
                  </Btn>

                </div>
              </div>

              {/* Resume preview scrollable area */}
              <div id="resume-preview-area" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <ResumePreview data={data} />
              </div>
            </div>

            {/* Sign-in nudge for guests */}
            {!user && (
                <div style={{
                  background: `linear-gradient(135deg,${C.purple},${C.purpleLight})`,
                  borderRadius: 14, padding: 20, marginTop: 14,
                  display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: C.white, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Save Your Progress</p>
                    <p style={{ color: 'rgba(255,255,255,.72)', fontSize: 13, lineHeight: 1.5 }}>
                      Sign in to save your resume and return to it anytime.
                    </p>
                  </div>
                  <Btn variant="white" size="sm" onClick={onNeedAuth}>Sign In</Btn>
                </div>
            )}
          </div>

        </div>
      </div>
  );
}