import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Btn from './ui/Btn.jsx';
import { COLORS as C } from '../utils/constants.js';

function NavLink({ children, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px',
        borderRadius: 6, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 14,
        color: h ? C.white : 'rgba(255,255,255,.72)', transition: 'color .2s' }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      {children}
    </button>
  );
}

/**
 * @param {{ onLoginClick, onSignupClick, onHomeClick, inBuilder, completion }} props
 */
export default function Navbar({ onLoginClick, onSignupClick, onHomeClick, inBuilder = false, completion = 0 }) {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 14);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: C.purple,
      boxShadow: scrolled ? '0 2px 18px rgba(54,43,85,.22)' : 'none',
      transition: 'box-shadow .3s',
    }}>
      {/* Main bar */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 58 }}>

        {/* Logo */}
        <button onClick={onHomeClick}
          style={{ background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="7" fill="rgba(255,255,255,.14)" />
            <rect x="7" y="8"    width="14" height="2.2" rx="1.1" fill="white" />
            <rect x="7" y="12.9" width="10" height="2.2" rx="1.1" fill="white" />
            <rect x="7" y="17.8" width="12" height="2.2" rx="1.1" fill="white" />
          </svg>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, color: C.white, fontWeight: 700 }}>
            ResumeForge
          </span>
        </button>

        {/* Center: progress bar (builder only) */}
        {inBuilder && (
          <div style={{ flex: 1, maxWidth: 320, margin: '0 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,.7)', fontWeight: 600, letterSpacing: .5 }}>
                RESUME COMPLETION
              </span>
              <span style={{ fontSize: 11, fontWeight: 800, color: C.white }}>{completion}%</span>
            </div>
            <div className="nav-progress-bar">
              <div className="nav-progress-fill" style={{ width: `${completion}%` }} />
            </div>
          </div>
        )}

        {/* Home nav links */}
        {!inBuilder && (
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <NavLink onClick={() => scrollTo('reviews-section')}>Reviews</NavLink>
            <NavLink onClick={() => scrollTo('about-section')}>About</NavLink>
          </div>
        )}

        {/* Auth buttons */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {user ? (
            <>
              <span style={{ color: 'rgba(255,255,255,.65)', fontSize: 13 }}>
                Hi, <strong style={{ color: C.white }}>{user.name}</strong>
              </span>
              <Btn variant="nav-ghost" size="sm" onClick={logout}>Sign Out</Btn>
            </>
          ) : (
            <>
              <Btn variant="nav-ghost" size="sm" onClick={onLoginClick}>Sign In</Btn>
              <Btn variant="white"     size="sm" onClick={onSignupClick}>Get Started Free</Btn>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
