/** Animated clipboard + woman illustration used in the Hero */
export default function ClipboardIllustration() {
  return (
    <svg viewBox="0 0 520 600" fill="none" style={{ width: '100%', maxWidth: 460 }}>
      {/* Background circle */}
      <circle cx="260" cy="310" r="218" fill="#d8d4b8" opacity=".5" />

      {/* Clipboard board */}
      <rect x="122" y="82"  width="258" height="376" rx="11" fill="#7a5c1e" />
      <rect x="130" y="112" width="242" height="338" rx="6"  fill="#ffffff" />

      {/* Clip */}
      <rect   x="212" y="60"  width="78" height="38" rx="9"  fill="#cc2222" />
      <circle cx="251" cy="69" r="10" fill="#aa1111" />
      <circle cx="251" cy="69" r="5"  fill="#ee5555" />

      {/* Photo placeholder */}
      <rect   x="147" y="130" width="70" height="76" rx="4"  fill="#c5b9a8" />
      <circle cx="182" cy="154" r="17" fill="#a09080" />
      <rect   x="160" y="175" width="44" height="24" rx="4"  fill="#a09080" />

      {/* Name lines next to photo */}
      {[0, 1, 2].map(i => (
        <rect key={i} x="228" y={140 + i * 18} width={[100, 78, 58][i]} height="9" rx="4" fill="#c8c0b0" />
      ))}
      {[0, 1, 2].map(i => (
        <circle key={i} cx="340" cy={144 + i * 18} r="3.5" fill="#c8c0b0" />
      ))}

      {/* Divider */}
      <rect x="147" y="220" width="210" height="2" fill="#e0dbd0" />

      {/* Body text lines */}
      {[198, 182, 160, 192, 175, 155].map((w, i) => (
        <g key={i}>
          <rect   x="147" y={234 + i * 30} width={w} height="9"  rx="4"   fill="#c8c0b0" />
          <circle cx="352" cy={238 + i * 30} r="3.5" fill="#c8c0b0" />
        </g>
      ))}

      {/* ── Woman figure ── */}
      <ellipse cx="100" cy="572" rx="52" ry="11" fill="#1a1a2e" opacity=".15" />
      <rect x="83"  y="472" width="20" height="88" rx="10" fill="#2d2d5a" />
      <rect x="100" y="472" width="20" height="88" rx="10" fill="#2d2d5a" />
      <ellipse cx="93"  cy="558" rx="15" ry="7" fill="#cc2222" />
      <ellipse cx="113" cy="560" rx="15" ry="7" fill="#cc2222" />
      <rect x="73" y="342" width="58" height="138" rx="18" fill="#f0ede8" />
      {[-8, 0, 8].map(x => (
        <line key={x} x1={102 + x} y1="352" x2={102 + x} y2="468" stroke="#d8d2ca" strokeWidth="1.5" />
      ))}
      {[0, 1, 2, 3, 4].map(i => (
        <line key={i} x1="73" y1={362 + i * 22} x2="131" y2={362 + i * 22} stroke="#d8d2ca" strokeWidth="1.2" />
      ))}
      <rect   x="95"  y="322" width="14" height="26" rx="7" fill="#d4a88a" />
      <ellipse cx="102" cy="302" rx="27" ry="29" fill="#d4a88a" />
      <ellipse cx="102" cy="284" rx="27" ry="17" fill="#180808" />
      <path d="M75 296 Q62 322 70 352"   stroke="#180808" strokeWidth="16" strokeLinecap="round" fill="none" />
      <path d="M129 296 Q137 328 128 358" stroke="#180808" strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="93"  cy="305" r="2.8" fill="#8a6050" />
      <circle cx="111" cy="305" r="2.8" fill="#8a6050" />
      <path d="M97 316 Q102 320 107 316" stroke="#c07060" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M73 372 Q44 392 38 422" stroke="#f0ede8" strokeWidth="20" strokeLinecap="round" fill="none" />
      <rect   x="21" y="402" width="42" height="56" rx="5" fill="#cc2222" />
      <rect   x="27" y="408" width="30" height="42" rx="3" fill="#dd4444" />
      <path d="M131 362 Q148 342 152 312" stroke="#f0ede8" strokeWidth="17" strokeLinecap="round" fill="none" />
      <rect   x="149" y="298" width="6" height="26" rx="3" fill="#555" />
      <polygon points="152,324 149,334 155,334" fill="#888" />

      {/* ── Plant ── */}
      <rect   x="372" y="492" width="32" height="34" rx="6" fill="#8B6040" />
      <ellipse cx="388" cy="492" rx="17" ry="9" fill="#7a5535" />
      {[
        { d: 'M388 488 Q362 448 346 408', w: 7 },
        { d: 'M388 478 Q402 440 422 402', w: 6 },
        { d: 'M388 470 Q376 432 360 402', w: 6 },
        { d: 'M388 474 Q411 446 432 422', w: 5.5 },
      ].map((p, i) => (
        <path key={i} d={p.d} stroke="#3a7a30" strokeWidth={p.w} strokeLinecap="round" fill="none" />
      ))}
      <ellipse cx="349" cy="411" rx="21" ry="11" fill="#4a9a3a" transform="rotate(-28 349 411)" />
      <ellipse cx="420" cy="405" rx="21" ry="11" fill="#5aaa48" transform="rotate(28 420 405)"  />
      <ellipse cx="362" cy="404" rx="17" ry="9"  fill="#4a9a3a" transform="rotate(-18 362 404)" />
      <ellipse cx="430" cy="424" rx="17" ry="9"  fill="#5aaa48" transform="rotate(24 430 424)"  />
    </svg>
  );
}
