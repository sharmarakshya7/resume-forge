/** Trustpilot-style star row */
export default function Stars({ count = 5, color = '#00b67a', size = 17 }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 18 18" fill="none">
          <rect width="18" height="18" rx="2" fill={color} />
          <path d="M9 3.5l1.4 4.2H15L11.3 10l1.4 4.2L9 12 5.3 14.2l1.4-4.2L3 7.7h4.6z" fill="white" />
        </svg>
      ))}
    </div>
  );
}
