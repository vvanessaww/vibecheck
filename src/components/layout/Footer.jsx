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

function SpectraTower({ height = 140 }) {
  const rows = 7;
  const cols = 8;
  const colors = [
    '#8b1a4a', '#c2185b', '#e53935', '#ff6f00',
    '#ffb300', '#c0ca33', '#43a047',
  ];

  const towerW = height * 0.45;
  const cellH = (height - 10) / rows;
  const cellW = towerW / cols;

  return (
    <svg style={{ width: towerW, height }} viewBox={`0 0 ${towerW} ${height}`}>
      {/* Tower body */}
      <rect x="0" y="5" width={towerW} height={height - 5} rx="4" fill="rgba(0,0,0,0.3)" />

      {/* Rainbow glass panels */}
      {colors.map((color, row) => (
        Array.from({ length: cols }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={col * cellW + 1}
            y={row * cellH + 6}
            width={cellW - 1.5}
            height={cellH - 1.5}
            rx="0.5"
            fill={color}
            opacity={0.7 + (col % 3) * 0.1}
          />
        ))
      ))}

      {/* Horizontal grid lines */}
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="0" y1={i * cellH + 5}
          x2={towerW} y2={i * cellH + 5}
          stroke="rgba(255,255,255,0.5)" strokeWidth="1"
        />
      ))}

      {/* Vertical grid lines with slight curve illusion */}
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * cellW} y1="5"
          x2={i * cellW} y2={height}
          stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"
        />
      ))}

      {/* Top rim */}
      <rect x="0" y="3" width={towerW} height="4" rx="2" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
}

function PalmTree({ height = 100, lean = 0 }) {
  const trunkW = 6;
  const frondLen = height * 0.35;
  return (
    <svg
      style={{ width: frondLen * 2, height, transform: `rotate(${lean}deg)`, transformOrigin: 'bottom center' }}
      viewBox={`0 0 ${frondLen * 2} ${height}`}
    >
      {/* Trunk */}
      <path
        d={`M${frondLen - trunkW / 2},${height} Q${frondLen - 2},${height * 0.5} ${frondLen},${height * 0.3}`}
        fill="none" stroke="#112e1a" strokeWidth={trunkW} strokeLinecap="round"
      />
      {/* Trunk segments */}
      {Array.from({ length: 5 }).map((_, i) => {
        const y = height * 0.35 + i * (height * 0.12);
        return (
          <line key={i} x1={frondLen - 5} y1={y} x2={frondLen + 3} y2={y}
            stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        );
      })}
      {/* Fronds */}
      {[-70, -40, -15, 15, 40, 70].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const tipX = frondLen + Math.sin(rad) * frondLen;
        const tipY = height * 0.3 - Math.cos(rad) * frondLen * 0.7;
        const cpX = frondLen + Math.sin(rad) * frondLen * 0.5;
        const cpY = height * 0.3 - Math.cos(rad) * frondLen * 0.5 + 8;
        return (
          <path
            key={i}
            d={`M${frondLen},${height * 0.3} Q${cpX},${cpY} ${tipX},${tipY}`}
            fill="none"
            stroke={i % 2 === 0 ? '#0d2114' : '#112e1a'}
            strokeWidth={2.5 - i * 0.15}
            strokeLinecap="round"
          />
        );
      })}
      {/* Coconuts */}
      <circle cx={frondLen - 3} cy={height * 0.3 + 2} r="2" fill="#112e1a" />
      <circle cx={frondLen + 2} cy={height * 0.3 + 3} r="1.8" fill="#0d2114" />
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

      {/* Palm trees - left cluster */}
      <div className="absolute bottom-7 left-2 z-15 flex items-end gap-1">
        <PalmTree height={90} lean={-5} />
        <PalmTree height={120} lean={-8} />
        <PalmTree height={70} lean={3} />
      </div>

      {/* Palm trees - right cluster */}
      <div className="absolute bottom-7 right-2 z-15 flex items-end gap-1">
        <PalmTree height={75} lean={5} />
        <PalmTree height={110} lean={8} />
        <PalmTree height={85} lean={-3} />
      </div>

      {/* Spectra tower - left side */}
      <div className="absolute bottom-8 z-20" style={{ left: 'max(8px, calc(50% - 200px))' }}>
        <SpectraTower height={130} />
      </div>

      {/* Ferris wheel - right side */}
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
