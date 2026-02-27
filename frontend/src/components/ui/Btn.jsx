import { useState } from 'react';
import { COLORS as C } from '../../utils/constants.js';

const VARIANTS = {
  primary:   (h) => ({ background: C.purple,      color: C.white,  boxShadow: h ? '0 8px 24px rgba(54,43,85,.38)' : '0 3px 12px rgba(54,43,85,.22)', transform: h ? 'translateY(-2px)' : 'none' }),
  outline:   (h) => ({ background: h ? C.purple : 'transparent', color: h ? C.white : C.purple, border: `2px solid ${C.purple}` }),
  ghost:     (h) => ({ background: h ? C.cream  : 'transparent', color: C.purple, border: `1.5px solid ${C.border}` }),
  danger:    (h) => ({ background: h ? '#c82333' : '#dc3545',    color: C.white }),
  white:     (h) => ({ background: C.white,       color: C.purple, boxShadow: h ? '0 6px 20px rgba(0,0,0,.13)' : '0 2px 8px rgba(0,0,0,.08)', transform: h ? 'translateY(-2px)' : 'none' }),
  'nav-ghost':(h)=> ({ background: h ? 'rgba(255,255,255,.1)' : 'transparent', color: C.white, border: '1.5px solid rgba(255,255,255,.3)' }),
};

const SIZES = {
  sm: { fontSize: 13, padding: '8px 18px' },
  md: { fontSize: 14, padding: '10px 22px' },
  lg: { fontSize: 16, padding: '14px 34px' },
};

export default function Btn({ children, onClick, variant = 'primary', size = 'md', disabled, style = {}, ...props }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
        borderRadius: 9, fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer', border: 'none',
        transition: 'all .22s ease', opacity: disabled ? .6 : 1,
        ...SIZES[size],
        ...VARIANTS[variant](hover),
        ...style,
      }}
    >
      {children}
    </button>
  );
}
