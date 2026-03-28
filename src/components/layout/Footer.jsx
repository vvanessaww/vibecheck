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

function MainStage({ width = 130, height = 80 }) {
  return (
    <svg style={{ width, height }} viewBox="0 0 130 80">
      {/* Roof - wide flat canopy overhanging the structure */}
      <path
        d="M0,12 L130,12 L126,18 L4,18 Z"
        fill="rgba(0,0,0,0.5)"
      />
      {/* Roof top edge */}
      <rect x="0" y="10" width="130" height="3" fill="rgba(255,255,255,0.15)" />

      {/* Outer truss towers - tall vertical structures on each side */}
      <rect x="4" y="18" width="8" height="62" fill="rgba(0,0,0,0.4)" />
      <rect x="118" y="18" width="8" height="62" fill="rgba(0,0,0,0.4)" />
      {/* Truss cross-hatching */}
      {[0,1,2,3,4,5].map((i) => (
        <g key={`truss-${i}`}>
          <line x1="4" y1={20 + i * 10} x2="12" y2={30 + i * 10} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <line x1="12" y1={20 + i * 10} x2="4" y2={30 + i * 10} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <line x1="118" y1={20 + i * 10} x2="126" y2={30 + i * 10} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <line x1="126" y1={20 + i * 10} x2="118" y2={30 + i * 10} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        </g>
      ))}

      {/* Side LED screens - angled outward like the real stage */}
      <path d="M14,20 L14,58 L38,58 L38,24 Z" fill="rgba(255,92,0,0.12)" stroke="rgba(255,92,0,0.2)" strokeWidth="0.5" />
      <path d="M92,24 L92,58 L116,58 L116,20 Z" fill="rgba(255,92,0,0.12)" stroke="rgba(255,92,0,0.2)" strokeWidth="0.5" />

      {/* Center video wall */}
      <rect x="40" y="22" width="50" height="38" fill="rgba(255,92,0,0.08)" />
      <rect x="42" y="24" width="46" height="34" fill="rgba(255,92,0,0.1)" stroke="rgba(255,92,0,0.15)" strokeWidth="0.5" />

      {/* Stage platform */}
      <rect x="14" y="60" width="102" height="4" fill="rgba(255,255,255,0.08)" />

      {/* Stage floor glow */}
      <ellipse cx="65" cy="72" rx="55" ry="8" fill="rgba(255,92,0,0.06)" />

      {/* Subtle pyro sparks */}
      <circle cx="30" cy="30" r="1" fill="rgba(255,200,50,0.3)" />
      <circle cx="100" cy="28" r="1" fill="rgba(255,200,50,0.3)" />
      <circle cx="65" cy="20" r="0.8" fill="rgba(255,200,50,0.2)" />
    </svg>
  );
}

function SaharaTent({ width = 120, height = 70 }) {
  return (
    <svg style={{ width, height }} viewBox="0 0 120 70">
      {/* Roof - wide flat canopy with slight curve, the modern mega-structure look */}
      <path
        d="M2,18 Q60,8 118,18 L118,24 Q60,14 2,24 Z"
        fill="rgba(255,255,255,0.12)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="0.5"
      />
      {/* Roof thickness */}
      <path
        d="M2,24 Q60,14 118,24 L118,26 Q60,16 2,26 Z"
        fill="rgba(0,0,0,0.3)"
      />

      {/* Support columns */}
      <rect x="6" y="26" width="4" height="44" fill="rgba(255,255,255,0.1)" />
      <rect x="30" y="26" width="3" height="44" fill="rgba(255,255,255,0.07)" />
      <rect x="57" y="26" width="3" height="44" fill="rgba(255,255,255,0.07)" />
      <rect x="87" y="26" width="3" height="44" fill="rgba(255,255,255,0.07)" />
      <rect x="110" y="26" width="4" height="44" fill="rgba(255,255,255,0.1)" />

      {/* Interior LED screens/walls - the glowing back wall */}
      <rect x="10" y="28" width="100" height="38" fill="rgba(75,184,204,0.05)" />
      <rect x="14" y="30" width="28" height="34" rx="1" fill="rgba(255,0,122,0.06)" />
      <rect x="46" y="30" width="28" height="34" rx="1" fill="rgba(75,184,204,0.08)" />
      <rect x="78" y="30" width="28" height="34" rx="1" fill="rgba(255,92,0,0.06)" />

      {/* LED light beams shooting up */}
      <line x1="28" y1="18" x2="25" y2="4" stroke="rgba(75,184,204,0.12)" strokeWidth="1" />
      <line x1="60" y1="14" x2="60" y2="0" stroke="rgba(255,0,122,0.1)" strokeWidth="1" />
      <line x1="92" y1="18" x2="95" y2="4" stroke="rgba(255,92,0,0.1)" strokeWidth="1" />

      {/* Ground/floor glow */}
      <ellipse cx="60" cy="70" rx="55" ry="4" fill="rgba(75,184,204,0.06)" />
    </svg>
  );
}

function StageTent({ width = 40, height = 30, color = 'rgba(255,255,255,0.1)' }) {
  return (
    <svg style={{ width, height }} viewBox={`0 0 ${width} ${height}`}>
      <path
        d={`M0,${height} L${width / 2},${height * 0.15} L${width},${height} Z`}
        fill={color}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.5"
      />
      <line x1={width / 2} y1={height * 0.15} x2={width / 2} y2={0}
        stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      {/* Flag */}
      <path
        d={`M${width / 2},${0} L${width / 2 + 6},${3} L${width / 2},${6}`}
        fill="rgba(255,92,0,0.5)"
      />
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

      {/* Stage tents */}
      <div className="absolute bottom-8 z-14 w-full flex justify-around items-end px-[8%] pointer-events-none">
        <StageTent width={30} height={24} color="rgba(75,184,204,0.15)" />
        <StageTent width={50} height={38} color="rgba(255,92,0,0.12)" />
        <StageTent width={35} height={28} color="rgba(255,255,255,0.08)" />
        <StageTent width={60} height={44} color="rgba(255,0,122,0.1)" />
        <StageTent width={28} height={22} color="rgba(75,184,204,0.12)" />
      </div>

      {/* Desert plants scattered between structures */}
      <div className="absolute bottom-8 z-15 w-full flex justify-around px-[15%] items-end pointer-events-none">
        <svg width="18" height="28" viewBox="0 0 18 28"><path d="M9,28 L9,12 M9,12 C9,12 3,8 2,4 M9,12 C9,12 15,8 16,4 M9,16 C9,16 5,14 4,11 M9,16 C9,16 13,14 14,11" stroke="#1a3a20" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
        <svg width="14" height="20" viewBox="0 0 14 20"><ellipse cx="7" cy="14" rx="6" ry="6" fill="#162e18" /><ellipse cx="7" cy="9" rx="4.5" ry="5" fill="#1a3a20" /><ellipse cx="7" cy="5" rx="3" ry="4" fill="#1e4424" /></svg>
        <svg width="20" height="15" viewBox="0 0 20 15"><ellipse cx="10" cy="10" rx="9" ry="5" fill="#162e18" /><ellipse cx="7" cy="8" rx="5" ry="4" fill="#1a3a20" /></svg>
        <svg width="12" height="22" viewBox="0 0 12 22"><path d="M6,22 L6,8 M6,8 C6,8 2,5 1,2 M6,8 C6,8 10,5 11,2 M6,14 C6,14 3,12 3,10" stroke="#1a3a20" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12"><ellipse cx="8" cy="8" rx="7" ry="4" fill="#162e18" /><ellipse cx="5" cy="6" rx="4" ry="3" fill="#1e4424" /></svg>
        <svg width="10" height="18" viewBox="0 0 10 18"><path d="M5,18 L5,6 M5,6 C5,6 1,3 1,1 M5,6 C5,6 9,3 9,1" stroke="#1a3a20" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
      </div>

      {/* Small ground flowers */}
      <div className="absolute bottom-7 z-16 w-full pointer-events-none">
        <div className="absolute left-[20%]"><svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="2.5" fill="#c2185b" opacity="0.6" /><circle cx="4" cy="4" r="1" fill="#ffb300" opacity="0.8" /></svg></div>
        <div className="absolute left-[35%]"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="2" fill="#7b1fa2" opacity="0.5" /></svg></div>
        <div className="absolute right-[25%]"><svg width="7" height="7" viewBox="0 0 7 7"><circle cx="3.5" cy="3.5" r="2.5" fill="#e91e63" opacity="0.5" /><circle cx="3.5" cy="3.5" r="1" fill="#fff176" opacity="0.7" /></svg></div>
        <div className="absolute right-[40%]"><svg width="5" height="5" viewBox="0 0 5 5"><circle cx="2.5" cy="2.5" r="1.8" fill="#4caf50" opacity="0.4" /></svg></div>
      </div>

      {/* Sahara tent - far left, outside the tower */}
      <div className="absolute bottom-8 z-12" style={{ left: 'max(-20px, calc(50% - 360px))' }}>
        <SaharaTent width={100} height={65} />
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

      {/* Main Stage - far right, outside the ferris wheel */}
      <div className="absolute bottom-8 z-12" style={{ right: 'max(-20px, calc(50% - 370px))' }}>
        <MainStage width={120} height={75} />
      </div>

      <div className="w-full h-8 bg-grass border-t-[0.5px] border-grass-border relative z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#112e1a] mix-blend-multiply" />
      </div>
      <div className="absolute bottom-1 w-full text-center z-30 pb-1">
        <p className="text-[8px] text-white/60 tracking-[0.15em] font-bold">
          made with &lt;3 by vanessa
          <a href="https://x.com/vanessas5to9" target="_blank" rel="noopener noreferrer" className="ml-1.5 text-[7px] text-white/40 hover:text-white/70 transition-colors pointer-events-auto underline">
            x
          </a>
          <a href="https://github.com/vvanessaww" target="_blank" rel="noopener noreferrer" className="ml-1.5 text-[7px] text-white/40 hover:text-white/70 transition-colors pointer-events-auto underline">
            github
          </a>
        </p>
      </div>
    </footer>
  );
}
