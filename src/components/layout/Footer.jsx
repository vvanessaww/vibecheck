function FerrisWheel({ size = 64 }) {
  const spokes = 8;
  return (
    <svg style={{ width: size, height: size, animation: 'spin 20s linear infinite' }} viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="3" fill="rgba(255,255,255,0.5)" />
      {Array.from({ length: spokes }).map((_, i) => {
        const angle = (i * 360) / spokes;
        const rad = (angle * Math.PI) / 180;
        const x2 = 32 + 28 * Math.cos(rad);
        const y2 = 32 + 28 * Math.sin(rad);
        const gx = 32 + 30 * Math.cos(rad);
        const gy = 32 + 30 * Math.sin(rad);
        return (
          <g key={i}>
            <line x1="32" y1="32" x2={x2} y2={y2} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <rect
              x={gx - 4} y={gy - 3} width="8" height="6" rx="1.5"
              fill="rgba(255,92,0,0.6)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"
              style={{ transform: `rotate(${-angle}deg)`, transformOrigin: `${gx}px ${gy}px` }}
            />
          </g>
        );
      })}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none z-10 flex flex-col justify-end">
      <div className="absolute bottom-12 w-full h-40 bg-gradient-to-t from-orange-red to-transparent opacity-60 mix-blend-overlay" />
      <svg
        className="absolute bottom-8 w-full h-32"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 L0,50 L60,30 L120,60 L200,20 L300,70 L400,10 L500,60 L600,30 L720,80 L840,20 L960,70 L1080,10 L1200,60 L1320,30 L1440,80 L1440,100 Z"
          fill="#b32400"
          opacity="0.8"
        />
        <path
          d="M0,100 L30,70 L90,40 L180,80 L270,30 L360,60 L480,20 L600,70 L720,30 L840,60 L960,20 L1080,70 L1200,40 L1320,90 L1440,50 L1440,100 Z"
          fill="#ff5c00"
          opacity="0.9"
        />
      </svg>

      {/* Ferris wheel - positioned relative to mobile content area */}
      <div className="absolute bottom-6 z-20" style={{ right: 'max(16px, calc(50% - 180px))' }}>
        <div className="relative">
          <FerrisWheel size={120} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[3px] h-8 bg-white/20 rounded-full" />
        </div>
      </div>

      <div className="w-full h-8 bg-grass border-t-[0.5px] border-grass-border relative z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#112e1a] mix-blend-multiply" />
      </div>
      <div className="absolute bottom-1 w-full text-center z-30 pb-1">
        <p className="text-[8px] text-white/60 tracking-[0.15em] font-bold">
          made with &lt;3 by vanessa
        </p>
      </div>
    </footer>
  );
}
