import { COLORS as C } from '../utils/constants.js';

/**
 * @param {{ onLoginClick, onSignupClick, onBuildClick }} props
 */
export default function Footer({ onLoginClick, onSignupClick, onBuildClick }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const columns = [
    {
      title: 'Builder',
      links: [{ l: 'Build Resume', a: onBuildClick }, { l: 'Live Preview' }, { l: 'Download PDF' }],
    },
    {
      title: 'Account',
      links: [{ l: 'Sign In', a: onLoginClick }, { l: 'Create Account', a: onSignupClick }],
    },
    {
      title: 'Company',
      links: [
        { l: 'About',   a: () => scrollTo('about-section')   },
        { l: 'Reviews', a: () => scrollTo('reviews-section') },
      ],
    },
  ];

  return (
    <footer style={{ background: C.purpleDark, color: C.white, padding: '54px 2rem 22px' }}>
      <div className="footer-grid"
        style={{ maxWidth: 1100, margin: '0 auto', display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 44 }}>

        {/* Brand blurb */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="7" fill="rgba(255,255,255,.12)" />
              <rect x="7" y="8"    width="14" height="2.2" rx="1.1" fill="white" />
              <rect x="7" y="12.9" width="10" height="2.2" rx="1.1" fill="white" />
              <rect x="7" y="17.8" width="12" height="2.2" rx="1.1" fill="white" />
            </svg>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700 }}>ResumeForge</span>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', lineHeight: 1.82, maxWidth: 270 }}>
            Build professional, ATS-optimized resumes for free. Sign in to save your progress.
          </p>
        </div>

        {/* Link columns */}
        {columns.map(col => (
          <div key={col.title}>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
              color: 'rgba(255,255,255,.38)', marginBottom: 16, textTransform: 'uppercase' }}>
              {col.title}
            </h4>
            {col.links.map(({ l, a }) => (
              <div key={l} onClick={a}
                style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', marginBottom: 10,
                  cursor: a ? 'pointer' : 'default', transition: 'color .2s' }}
                onMouseEnter={e => { if (a) e.target.style.color = C.white; }}
                onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,.6)'; }}>
                {l}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: 1100, margin: '0 auto', borderTop: '1px solid rgba(255,255,255,.09)',
        paddingTop: 18, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.3)' }}>© 2025 ResumeForge. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy Policy', 'Terms of Service'].map(t => (
            <span key={t} style={{ fontSize: 12.5, color: 'rgba(255,255,255,.3)', cursor: 'pointer' }}>{t}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
