import Btn from '../components/ui/Btn.jsx';
import Stars from '../components/ui/Stars.jsx';
import ClipboardIllustration from '../components/ClipboardIllustration.jsx';
import { useFadeIn } from '../hooks/useFadeIn.js';
import { COLORS as C } from '../utils/constants.js';

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onBuildClick }) {
  return (
    <section style={{ minHeight: '100vh', background: C.white, display: 'flex',
      alignItems: 'center', paddingTop: 58, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '4rem 2rem', width: '100%' }}>
        <div className="hero-grid" style={{ display: 'flex', alignItems: 'center', gap: '5rem' }}>

          {/* Illustration — left */}
          <div className="hero-img-col" style={{ flex: '0 0 44%', minWidth: 280 }}>
            <div className="hero-img-wrap">
              <ClipboardIllustration />
            </div>
          </div>

          {/* Text — right */}
          <div className="hero-text" style={{ flex: 1 }}>
            <div style={{ display: 'inline-block', background: 'rgba(54,43,85,.07)',
              borderRadius: 100, padding: '5px 16px', marginBottom: 24, border: '1px solid rgba(54,43,85,.12)' }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: C.purple, letterSpacing: .8 }}>
                ATS-OPTIMIZED &nbsp;·&nbsp; 100% FREE
              </span>
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem,5.5vw,3.5rem)',
              color: C.purple, fontWeight: 900, lineHeight: 1.06, marginBottom: 20, letterSpacing: '-1px' }}>
              Professional ATS<br />Resume Builder
            </h1>

            <p style={{ fontSize: 17, color: '#5a5a6a', lineHeight: 1.8, marginBottom: 36, maxWidth: 420 }}>
              Create a free professional, Applicant Tracking System (ATS)-friendly resume that gets you noticed by recruiters.
            </p>

            <div className="hero-btns" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Btn size="lg" onClick={onBuildClick} style={{ paddingLeft: 32, paddingRight: 32 }}>Build My Resume</Btn>
              <Btn size="lg" variant="outline" onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })}>Learn More</Btn>
            </div>

            <div className="hero-stats" style={{ display: 'flex', gap: 36, marginTop: 44, flexWrap: 'wrap' }}>
              {[['1,000+', 'Resumes Built'], ['ATS-Ready', 'Optimized Format'], ['Free', 'No Hidden Fees']].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 21, fontWeight: 800, color: C.purple, fontFamily: "'Playfair Display', serif" }}>{val}</div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 3, fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Band ───────────────────────────────────────────────────────────────
function StatsBand() {
  const ref = useFadeIn();
  const stats = [
    ['42%',   'Higher Recruiter Response Rate'],
    ['95%',   'Pass ATS Screening'],
    ['3 min', 'Average Build Time'],
    ['4.7/5', 'User Satisfaction'],
  ];
  return (
    <div ref={ref} className="fade-section" style={{ background: C.purple, padding: '3rem 2rem' }}>
      <div className="stats-row" style={{ maxWidth: 1100, margin: '0 auto',
        display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        {stats.map(([val, label]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: C.white, fontFamily: "'Playfair Display', serif" }}>{val}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.62)', marginTop: 5, maxWidth: 130 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks({ onBuildClick }) {
  const ref = useFadeIn();
  const steps = [
    { n: '01', title: 'Enter Your Details',   desc: 'Fill in your contact info, work history, education, and skills with our guided step-by-step form. Clear prompts walk you through every section.' },
    { n: '02', title: 'Preview Instantly',    desc: 'Watch your professional resume build in real time. See exactly how your document looks before a recruiter or ATS ever reads it.' },
    { n: '03', title: 'Download & Apply',     desc: 'Print your polished, ATS-optimized resume as a clean PDF directly from your browser — then start sending applications today.' },
  ];
  return (
    <section ref={ref} className="fade-section" style={{ background: C.cream, padding: '88px 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 58 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: 1.8, marginBottom: 14, textTransform: 'uppercase' }}>Simple Process</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem,4vw,2.5rem)', color: C.purple }}>
            Three Steps to a Winning Resume
          </h2>
        </div>
        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 26 }}>
          {steps.map((s, i) => (
            <div key={i} className="hcard" style={{ background: C.white, borderRadius: 18,
              padding: '36px 28px', border: `1px solid ${C.border}`, boxShadow: '0 4px 16px rgba(54,43,85,.05)', cursor: 'default' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 900, color: 'rgba(54,43,85,.07)', lineHeight: 1, marginBottom: 18 }}>{s.n}</div>
              <div style={{ width: 32, height: 3, background: C.purple, borderRadius: 2, marginBottom: 16 }} />
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, color: C.purple, marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#6a6a7a', lineHeight: 1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Btn size="lg" onClick={onBuildClick}>Start Building Now</Btn>
        </div>
      </div>
    </section>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
function Reviews({ onBuildClick }) {
  const ref = useFadeIn();
  const reviews = [
    { name: 'Adarsh Sharma',   text: 'It was easy to use and updated my resume in the best format in no time.',                                          date: 'Feb 25, 2026' },
    { name: 'Kenyatta Hinds',  text: 'Resume building process was simple and easy to follow. Love what they did with this app — keep it up!',            date: 'Feb 25, 2026' },
    { name: 'Terraine Seaton', text: 'The ease of use actually had me excited to update my resume, which is most often a grueling task.',                 date: 'Feb 24, 2026' },
    { name: 'Sonia Brown',     text: 'Fast and user friendly. Would definitely recommend to others seeking to update their resume.',                      date: 'Feb 23, 2026' },
  ];
  return (
    <section id="reviews-section" ref={ref} className="fade-section" style={{ background: '#eef0f8', padding: '88px 2rem' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem,4vw,2.5rem)',
          color: '#12122a', fontWeight: 800, textAlign: 'center', marginBottom: 14 }}>
          Check our top-rated reviews
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ fontWeight: 700, color: '#12122a', fontSize: 15 }}>Excellent</span>
          <Stars count={5} color="#00b67a" />
          <span style={{ fontWeight: 700, color: '#12122a', fontSize: 15 }}>4.7 out of 5</span>
        </div>
        <p style={{ textAlign: 'center', fontSize: 13.5, color: '#777', marginBottom: 48,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          Based on 12,495 reviews on&nbsp;
          <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="7" fill="#00b67a" /><path d="M7 2.5l1.15 3.5H12l-3.1 2.25 1.18 3.65L7 9.7l-3.08 2.2L5.1 8.25 2 6h3.85z" fill="white" /></svg>
          &nbsp;<strong>Trustpilot</strong>
        </p>
        <div className="review-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
          {reviews.map((rv, i) => (
            <div key={i} className="hcard" style={{ background: C.white, borderRadius: 14, padding: 24,
              boxShadow: '0 2px 10px rgba(0,0,0,.06)', border: '1px solid #dde0ee', cursor: 'default' }}>
              <div style={{ fontWeight: 700, fontSize: 14.5, color: '#12122a', marginBottom: 9 }}>{rv.name}</div>
              <div style={{ marginBottom: 13 }}><Stars count={5} color="#00b67a" /></div>
              <p style={{ fontSize: 13.5, color: '#444', lineHeight: 1.65, marginBottom: 20 }}>{rv.text}</p>
              <p style={{ fontSize: 12, color: '#bbb' }}>{rv.date}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 46 }}>
          <Btn size="lg" onClick={onBuildClick}>Create My Resume</Btn>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const ref = useFadeIn();
  const cards = [
    ['Browser-Based',          'No installation needed. Works entirely in your browser, on any device.'],
    ['ATS Compatible',         'Clean, structured formatting ensures correct parsing by all major ATS platforms.'],
    ['Your Data Stays Private','Your resume is saved on your device. We never store personal data on servers.'],
  ];
  return (
    <section id="about-section" ref={ref} className="fade-section" style={{ background: C.white, padding: '88px 2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: 11.5, fontWeight: 700, color: C.accent, letterSpacing: 1.8, marginBottom: 14, textTransform: 'uppercase' }}>About Us</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem,4vw,2.5rem)', color: C.purple, marginBottom: 26 }}>
          About ATS Resume Builder
        </h2>
        <p style={{ fontSize: 15.5, color: '#5a5a6a', lineHeight: 1.88, maxWidth: 780, margin: '0 auto 22px' }}>
          ATS Resume Builder is a modern, browser-based tool designed to help job seekers create professional, recruiter-ready resumes in minutes. The platform generates resumes that are fully compatible with Applicant Tracking Systems (ATS), ensuring your application passes automated screenings and reaches hiring managers.
        </p>
        <p style={{ fontSize: 15.5, color: '#5a5a6a', lineHeight: 1.88, maxWidth: 780, margin: '0 auto 52px' }}>
          Built with a clean design and intuitive workflow, the tool lets you enter your details step by step, preview your resume instantly, and download it as a PDF. Sign in to save your progress and return to your resume from the same device at any time.
        </p>
        <div className="about-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, maxWidth: 740, margin: '0 auto' }}>
          {cards.map(([title, desc]) => (
            <div key={title} style={{ background: C.cream, borderRadius: 14, padding: '24px 20px', border: `1px solid ${C.border}`, textAlign: 'left' }}>
              <div style={{ width: 32, height: 3, background: C.purple, borderRadius: 2, marginBottom: 14 }} />
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: C.purple, marginBottom: 9 }}>{title}</h4>
              <p style={{ fontSize: 13, color: '#777', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Band ─────────────────────────────────────────────────────────────────
function CTABand({ onBuildClick }) {
  const ref = useFadeIn();
  return (
    <section ref={ref} className="fade-section" style={{ background: `linear-gradient(135deg,${C.purple} 0%,${C.purpleLight} 100%)`, padding: '82px 2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: C.white, marginBottom: 16 }}>
          Ready to Build Your Resume?
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,.72)', marginBottom: 36, lineHeight: 1.75 }}>
          Join thousands of job seekers who have landed interviews using ResumeForge. It only takes a few minutes.
        </p>
        <Btn variant="white" size="lg" onClick={onBuildClick}>Build My Resume — It's Free</Btn>
      </div>
    </section>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────
export default function HomePage({ onBuildClick }) {
  return (
    <main>
      <Hero        onBuildClick={onBuildClick} />
      <StatsBand />
      <HowItWorks  onBuildClick={onBuildClick} />
      <Reviews     onBuildClick={onBuildClick} />
      <About />
      <CTABand     onBuildClick={onBuildClick} />
    </main>
  );
}
