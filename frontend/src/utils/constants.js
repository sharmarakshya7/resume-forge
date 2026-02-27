// ─── Design Tokens ────────────────────────────────────────────────────────────
export const COLORS = {
  purple:      '#362b55',
  purpleDark:  '#291f44',
  purpleLight: '#4a3d70',
  accent:      '#7c5cbf',
  white:       '#ffffff',
  cream:       '#f8f7fc',
  border:      '#e2dff0',
};

// ─── Global CSS injected once at app root ────────────────────────────────────
export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html  { scroll-behavior: smooth; }
  body  { font-family: 'DM Sans', sans-serif; background: #fff; color: #2a2a2a; overflow-x: hidden; }

  ::-webkit-scrollbar       { width: 5px; }
  ::-webkit-scrollbar-track { background: #f8f7fc; }
  ::-webkit-scrollbar-thumb { background: #7c5cbf; border-radius: 3px; }

  input, textarea { font-family: 'DM Sans', sans-serif; }

  @keyframes fadeUp   { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
  @keyframes floatImg { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
  @keyframes slideL   { from{opacity:0;transform:translateX(-38px)} to{opacity:1;transform:translateX(0)} }
  @keyframes slideR   { from{opacity:0;transform:translateX(38px)}  to{opacity:1;transform:translateX(0)} }
  @keyframes slideIn  { from{opacity:0;transform:translateX(-14px)} to{opacity:1;transform:translateX(0)} }

  .hero-img-wrap { animation: floatImg 5s ease-in-out infinite; }
  .hero-text     { animation: slideR  0.85s ease forwards; }
  .hero-img-col  { animation: slideL  0.85s ease forwards; }

  .fade-section         { opacity:0; transform:translateY(22px); transition:opacity .65s ease,transform .65s ease; }
  .fade-section.visible { opacity:1; transform:translateY(0); }

  .hcard { transition:transform .2s ease, box-shadow .2s ease; }
  .hcard:hover { transform:translateY(-6px); box-shadow:0 18px 48px rgba(54,43,85,.12) !important; }

  .nav-progress-bar  { height:3px; background:rgba(255,255,255,.18); overflow:hidden; }
  .nav-progress-fill { height:100%; background:linear-gradient(90deg,#b8a0ff,#fff); transition:width .4s ease; }

  @media(max-width:900px){
    .hero-grid   { flex-direction:column !important; text-align:center !important; }
    .hero-img-col{ width:100% !important; flex:unset !important; }
    .hero-btns   { justify-content:center !important; }
    .hero-stats  { justify-content:center !important; }
    .builder-grid{ grid-template-columns:1fr !important; }
    .stats-row   { flex-direction:column !important; }
    .review-grid { grid-template-columns:1fr 1fr !important; }
    .footer-grid { grid-template-columns:1fr 1fr !important; }
    .steps-grid  { grid-template-columns:1fr !important; }
    .about-cards { grid-template-columns:1fr !important; }
  }
  @media(max-width:560px){
    .review-grid { grid-template-columns:1fr !important; }
    .footer-grid { grid-template-columns:1fr !important; }
  }
`;
