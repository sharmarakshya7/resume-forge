import { COLORS as C } from '../../utils/constants.js';

const fieldStyle = (error) => ({
  width: '100%', padding: '9px 13px',
  border: `2px solid ${error ? '#e74c3c' : C.border}`,
  borderRadius: 8, fontSize: 13.5, outline: 'none',
  transition: 'border .2s', background: C.white, color: '#2a2a2a',
});

const labelStyle = { display: 'block', marginBottom: 5, fontSize: 12.5, fontWeight: 600, color: C.purple };

export function FormInput({ label, required, error, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={labelStyle}>
          {label}{required && <span style={{ color: '#e74c3c' }}> *</span>}
        </label>
      )}
      <input
        style={fieldStyle(error)}
        onFocus={e => (e.target.style.borderColor = error ? '#e74c3c' : C.purple)}
        onBlur={e  => (e.target.style.borderColor = error ? '#e74c3c' : C.border)}
        {...props}
      />
      {error && <p style={{ fontSize: 12, color: '#e74c3c', marginTop: 4 }}>{error}</p>}
    </div>
  );
}

export function FormTextarea({ label, required, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={labelStyle}>
          {label}{required && <span style={{ color: '#e74c3c' }}> *</span>}
        </label>
      )}
      <textarea
        style={{ ...fieldStyle(false), resize: 'vertical', lineHeight: 1.6 }}
        onFocus={e => (e.target.style.borderColor = C.purple)}
        onBlur={e  => (e.target.style.borderColor = C.border)}
        {...props}
      />
    </div>
  );
}

/** Two-column grid row for form fields */
export function FormRow({ children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      {children}
    </div>
  );
}

/** Inline error message box */
export function ErrorMsg({ msg }) {
  return (
    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8,
      padding: '9px 13px', marginBottom: 12, fontSize: 13, color: '#dc2626',
      display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="7" fill="#dc2626"/>
        <path d="M7 4v3" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="7" cy="10" r="1" fill="white"/>
      </svg>
      {msg}
    </div>
  );
}
