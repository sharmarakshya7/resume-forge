import { useState } from 'react';
import Btn from './ui/Btn.jsx';
import { FormInput, ErrorMsg } from './ui/FormFields.jsx';
import { signup, login, forgotPassword, verifyResetCode, resetPassword, persistSession } from '../services/authService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { COLORS as C } from '../utils/constants.js';

/**
 * Full auth modal with 5 screens:
 *   login → signup → forgot-email → forgot-code → forgot-reset → reset-success
 *
 * @param {{ initScreen: string, onClose: function }} props
 */
export default function AuthModal({ initScreen = 'login', onClose }) {
  const { login: setSession } = useAuth();

  const [screen,  setScreen]  = useState(initScreen);
  const [loading, setLoading] = useState(false);
  const [err,     setErr]     = useState('');
  const [devCode, setDevCode] = useState(''); // shown in demo (no real email server)

  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    code: '', newPassword: '', confirmNewPassword: '',
  });

  const set   = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErr(''); };
  const go    = (s)    => { setScreen(s); setErr(''); };

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const withLoading = async (fn) => {
    setLoading(true);
    try       { await fn(); }
    catch (e) { setErr(e.message); }
    finally   { setLoading(false); }
  };

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleLogin = () => withLoading(async () => {
    if (!form.email || !form.password) throw new Error('Please fill in all fields.');
    const data = await login(form.email, form.password);
    setSession(data);
    onClose();
  });

  const handleSignup = () => withLoading(async () => {
    if (!form.name || !form.email || !form.password) throw new Error('Please fill in all fields.');
    if (form.password.length < 6)                   throw new Error('Password must be at least 6 characters.');
    if (form.password !== form.confirmPassword)      throw new Error('Passwords do not match.');
    const data = await signup(form.name, form.email, form.password);
    setSession(data);
    onClose();
  });

  const handleForgotSend = () => withLoading(async () => {
    if (!form.email) throw new Error('Please enter your email.');
    const data = await forgotPassword(form.email);
    // In demo mode the backend returns the code in the response for testing.
    // In production this field is omitted and the code is only sent by email.
    if (data.devCode) setDevCode(data.devCode);
    go('forgot-code');
  });

  const handleVerifyCode = () => withLoading(async () => {
    if (form.code.length !== 6) throw new Error('Enter the 6-digit code.');
    await verifyResetCode(form.email, form.code.trim());
    go('forgot-reset');
  });

  const handleResetPassword = () => withLoading(async () => {
    if (!form.newPassword || !form.confirmNewPassword) throw new Error('Please fill in both fields.');
    if (form.newPassword.length < 6)                   throw new Error('Password must be at least 6 characters.');
    if (form.newPassword !== form.confirmNewPassword)   throw new Error('Passwords do not match.');
    await resetPassword(form.email, form.code, form.newPassword);
    go('reset-success');
  });

  // ── Shared UI pieces ──────────────────────────────────────────────────────────
  const SegmentTabs = () => (
    <div style={{ display: 'flex', background: C.cream, borderRadius: 10, padding: 4, marginBottom: 22 }}>
      {[['login', 'Sign In'], ['signup', 'Sign Up']].map(([s, l]) => (
        <button key={s} onClick={() => go(s)} style={{
          flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, transition: 'all .2s',
          background: screen === s ? C.white : 'transparent',
          color:      screen === s ? C.purple : '#aaa',
          boxShadow:  screen === s ? '0 2px 8px rgba(0,0,0,.08)' : 'none',
        }}>{l}</button>
      ))}
    </div>
  );

  const WideBtn = ({ onClick, children }) => (
    <Btn onClick={onClick} style={{ width: '100%', padding: '13px 0', fontSize: 15, marginTop: 4 }}>
      {loading ? 'Please wait…' : children}
    </Btn>
  );

  const BackToLogin = () => (
    <p style={{ textAlign: 'center', fontSize: 13, color: '#999', marginTop: 14 }}>
      <span onClick={() => go('login')} style={{ color: C.purple, cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}>
        ← Back to Sign In
      </span>
    </p>
  );

  // ── Screen titles ─────────────────────────────────────────────────────────────
  const TITLES = {
    login:          { h: 'Welcome Back',       sub: 'Sign in to save and access your resumes' },
    signup:         { h: 'Create Account',     sub: 'Create an account to save your progress' },
    'forgot-email': { h: 'Reset Password',     sub: "We'll send a 6-digit code to your email" },
    'forgot-code':  { h: 'Check Your Email',   sub: 'Enter the code we sent to your inbox' },
    'forgot-reset': { h: 'Set New Password',   sub: 'Choose a strong new password' },
    'reset-success':{ h: 'Password Updated!',  sub: 'You can now sign in with your new password' },
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.48)', zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
      <div style={{ background: C.white, borderRadius: 20, padding: 36, width: 430, maxWidth: '92vw',
        boxShadow: '0 24px 64px rgba(0,0,0,.18)', animation: 'fadeUp .3s ease',
        maxHeight: '90vh', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 23, color: C.purple, marginBottom: 4 }}>
              {TITLES[screen].h}
            </h2>
            <p style={{ fontSize: 12.5, color: '#999' }}>{TITLES[screen].sub}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#bbb', lineHeight: 1 }}>×</button>
        </div>

        {/* ── Login ── */}
        {screen === 'login' && (
          <>
            <SegmentTabs />
            <FormInput label="Email Address" required type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
            <FormInput label="Password"      required type="password" placeholder="••••••••"   value={form.password} onChange={e => set('password', e.target.value)} />
            {err && <ErrorMsg msg={err} />}
            <div style={{ textAlign: 'right', marginBottom: 14 }}>
              <span onClick={() => go('forgot-email')} style={{ fontSize: 13, color: C.purple, cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}>
                Forgot password?
              </span>
            </div>
            <WideBtn onClick={handleLogin}>Sign In</WideBtn>
            <p style={{ textAlign: 'center', fontSize: 13, color: '#999', marginTop: 14 }}>
              No account?{' '}
              <span onClick={() => go('signup')} style={{ color: C.purple, cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}>Sign up free</span>
            </p>
          </>
        )}

        {/* ── Sign Up ── */}
        {screen === 'signup' && (
          <>
            <SegmentTabs />
            <FormInput label="Full Name"       required placeholder="Jane Smith"           value={form.name}            onChange={e => set('name', e.target.value)} />
            <FormInput label="Email Address"   required type="email" placeholder="you@email.com" value={form.email}    onChange={e => set('email', e.target.value)} />
            <FormInput label="Password"        required type="password" placeholder="Min. 6 characters" value={form.password} onChange={e => set('password', e.target.value)} />
            <FormInput label="Confirm Password" required type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} />
            {err && <ErrorMsg msg={err} />}
            <WideBtn onClick={handleSignup}>Create Free Account</WideBtn>
            <p style={{ textAlign: 'center', fontSize: 13, color: '#999', marginTop: 14 }}>
              Already registered?{' '}
              <span onClick={() => go('login')} style={{ color: C.purple, cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}>Sign in</span>
            </p>
          </>
        )}

        {/* ── Forgot — Step 1: Enter Email ── */}
        {screen === 'forgot-email' && (
          <>
            <FormInput label="Your account email" required type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
            {err && <ErrorMsg msg={err} />}
            <WideBtn onClick={handleForgotSend}>Send Reset Code</WideBtn>
            <BackToLogin />
          </>
        )}

        {/* ── Forgot — Step 2: Enter Code ── */}
        {screen === 'forgot-code' && (
          <>
            {devCode && (
              <div style={{ background: '#fff8e1', border: '1px solid #ffe082', borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
                <p style={{ fontSize: 12.5, color: '#7a5800', lineHeight: 1.7 }}>
                  <strong>Demo mode:</strong> No email server connected yet. Your reset code:
                </p>
                <div style={{ fontSize: 28, fontWeight: 800, color: C.purple, letterSpacing: 6, textAlign: 'center', marginTop: 8, fontFamily: "'Playfair Display', serif" }}>
                  {devCode}
                </div>
              </div>
            )}
            <FormInput label="6-digit code" required placeholder="123456" maxLength={6} value={form.code} onChange={e => set('code', e.target.value.replace(/\D/g, ''))} />
            {err && <ErrorMsg msg={err} />}
            <WideBtn onClick={handleVerifyCode}>Verify Code</WideBtn>
            <p style={{ textAlign: 'center', fontSize: 13, color: '#999', marginTop: 14 }}>
              Didn't receive it?{' '}
              <span onClick={() => { go('forgot-email'); setDevCode(''); }} style={{ color: C.purple, cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}>Resend</span>
            </p>
          </>
        )}

        {/* ── Forgot — Step 3: New Password ── */}
        {screen === 'forgot-reset' && (
          <>
            <FormInput label="New Password"     required type="password" placeholder="Min. 6 characters" value={form.newPassword}        onChange={e => set('newPassword', e.target.value)} />
            <FormInput label="Confirm Password" required type="password" placeholder="Repeat new password" value={form.confirmNewPassword} onChange={e => set('confirmNewPassword', e.target.value)} />
            {err && <ErrorMsg msg={err} />}
            <WideBtn onClick={handleResetPassword}>Update Password</WideBtn>
          </>
        )}

        {/* ── Reset Success ── */}
        {screen === 'reset-success' && (
          <>
            <div style={{ textAlign: 'center', padding: '10px 0 24px' }}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ marginBottom: 12 }}>
                <circle cx="28" cy="28" r="28" fill="#d4edda" />
                <path d="M16 28l8 8 16-16" stroke="#28a745" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7 }}>Your password has been reset.<br />You can now sign in.</p>
            </div>
            <WideBtn onClick={() => go('login')}>Sign In Now</WideBtn>
          </>
        )}
      </div>
    </div>
  );
}
