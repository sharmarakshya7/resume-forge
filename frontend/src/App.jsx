import { useState } from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar     from './components/Navbar.jsx';
import Footer     from './components/Footer.jsx';
import AuthModal  from './components/AuthModal.jsx';
import HomePage   from './pages/HomePage.jsx';
import BuilderPage from './pages/BuilderPage.jsx';
import { COLORS as C, GLOBAL_CSS } from './utils/constants.js';

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{
      position: 'fixed', top: 68, left: '50%', transform: 'translateX(-50%)',
      background: C.purple, color: C.white, borderRadius: 9, padding: '11px 24px',
      fontSize: 14, fontWeight: 600, zIndex: 5000,
      boxShadow: '0 6px 20px rgba(54,43,85,.3)', animation: 'fadeUp .3s ease',
      whiteSpace: 'nowrap',
    }}>
      {message}
    </div>
  );
}

// ─── App (wrapped externally with AuthProvider) ───────────────────────────────
function AppInner() {
  const [page,       setPage]       = useState('home');   // 'home' | 'builder'
  const [authModal,  setAuthModal]  = useState(null);     // null | 'login' | 'signup'
  const [toast,      setToast]      = useState('');
  const [completion, setCompletion] = useState(0);        // 0-100, fed to Navbar

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3200);
  };

  const goHome    = () => { setPage('home');    window.scrollTo({ top: 0 }); };
  const goBuilder = () => { setPage('builder'); window.scrollTo({ top: 0 }); };

  return (
    <>
      {/* Inject global CSS once */}
      <style>{GLOBAL_CSS}</style>

      {/* Auth modal */}
      {authModal && (
        <AuthModal
          initScreen={authModal}
          onClose={() => setAuthModal(null)}
        />
      )}

      {/* Toast notification */}
      {toast && <Toast message={toast} />}

      {/* Navbar */}
      <Navbar
        onLoginClick={()  => setAuthModal('login')}
        onSignupClick={() => setAuthModal('signup')}
        onHomeClick={goHome}
        inBuilder={page === 'builder'}
        completion={completion}
      />

      {/* Pages */}
      {page === 'home' ? (
        <HomePage onBuildClick={goBuilder} />
      ) : (
        <div style={{ paddingTop: 58, background: C.cream, minHeight: '100vh' }}>
          {/* Builder header row */}
          <div style={{ maxWidth: 1360, margin: '0 auto', padding: '1.5rem 1.5rem .5rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 25, color: C.purple }}>Resume Builder</h1>
              <p style={{ color: '#aaa', fontSize: 13 }}>Fill in your details and watch your resume come to life</p>
            </div>
            <button onClick={goHome} style={{
              background: 'none', border: `1.5px solid ${C.border}`, borderRadius: 9,
              color: C.purple, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              padding: '9px 18px', fontFamily: "'DM Sans', sans-serif", transition: 'background .2s',
            }}
              onMouseEnter={e => e.target.style.background = C.cream}
              onMouseLeave={e => e.target.style.background = 'transparent'}>
              ← Back to Home
            </button>
          </div>

          <BuilderPage
            onCompletionChange={setCompletion}
            onNeedAuth={() => setAuthModal('login')}
            showToast={showToast}
          />
        </div>
      )}

      {/* Footer */}
      <Footer
        onLoginClick={()  => setAuthModal('login')}
        onSignupClick={() => setAuthModal('signup')}
        onBuildClick={goBuilder}
      />
    </>
  );
}

// Wrap with AuthProvider at the top level
export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
