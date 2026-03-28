import { useState, useEffect, useCallback, useRef } from 'react';

const CYCLE_DURATION = 60000;

const PHASES = [
  { name: 'night', from: '#0a3d47', via: '#0d4a57', to: '#1a1721', celestial: '#f5f5dc', glow: 'rgba(245,245,220,0.4)' },
  { name: 'dawn', from: '#1a3a5c', via: '#c2655a', to: '#e8a87c', celestial: '#ffd180', glow: 'rgba(255,209,128,0.5)' },
  { name: 'day', from: '#4a90b8', via: '#6ab4d6', to: '#87ceeb', celestial: '#fff176', glow: 'rgba(255,241,118,0.6)' },
  { name: 'sunset', from: '#1a2a4a', via: '#c4524a', to: '#e8985a', celestial: '#ffab40', glow: 'rgba(255,171,64,0.5)' },
];

function lerp(a, b, t) { return a + (b - a) * t; }

function hexToRgb(hex) {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}

function rgbToHex([r, g, b]) {
  return '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
}

function lerpColor(hex1, hex2, t) {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  return rgbToHex([lerp(r1, r2, t), lerp(g1, g2, t), lerp(b1, b2, t)]);
}

function getPhaseColors(time) {
  const phaseLen = CYCLE_DURATION / PHASES.length;
  const phaseIdx = Math.floor(time / phaseLen) % PHASES.length;
  const nextIdx = (phaseIdx + 1) % PHASES.length;
  const t = (time % phaseLen) / phaseLen;
  const smooth = t * t * (3 - 2 * t);

  const cur = PHASES[phaseIdx];
  const next = PHASES[nextIdx];

  return {
    from: lerpColor(cur.from, next.from, smooth),
    via: lerpColor(cur.via, next.via, smooth),
    to: lerpColor(cur.to, next.to, smooth),
    celestial: lerpColor(cur.celestial, next.celestial, smooth),
    glow: cur.glow,
    isNight: phaseIdx === 0 || (phaseIdx === 3 && smooth > 0.5),
    isDay: phaseIdx === 2 || (phaseIdx === 1 && smooth > 0.5),
  };
}

const STARS = Array.from({ length: 30 }).map((_, i) => ({
  x: (i * 137.5) % 100,
  y: (i * 73.1) % 60,
  size: 1 + (i % 3) * 0.5,
  delay: (i * 0.4) % 3,
}));

const NOTE_SYMBOLS = ['\u266A', '\u266B', '\u2669'];

function MusicNotes() {
  const [notes, setNotes] = useState([]);
  const lastSpawnRef = useRef(0);

  const handleMove = useCallback((e) => {
    const now = Date.now();
    if (now - lastSpawnRef.current < 150) return;
    lastSpawnRef.current = now;

    const id = now + Math.random();
    const symbol = NOTE_SYMBOLS[Math.floor(Math.random() * NOTE_SYMBOLS.length)];
    const drift = (Math.random() - 0.5) * 30;
    const size = 12 + Math.random() * 6;

    setNotes((prev) => [
      ...prev.filter((n) => now - n.id < 4000).slice(-20),
      { id, x: e.clientX, y: e.clientY, symbol, drift, size },
    ]);
  }, []);

  useEffect(() => {
    const onMouse = (e) => handleMove(e);
    const onTouch = (e) => {
      if (e.touches[0]) handleMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
    };
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('touchmove', onTouch);
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
    };
  }, [handleMove]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {notes.map((note) => (
        <span
          key={note.id}
          className="absolute select-none"
          style={{
            left: note.x - note.size / 2,
            top: note.y - note.size,
            fontSize: note.size,
            color: 'rgba(255,255,255,0.3)',
            animation: 'noteFloat 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
            '--drift': `${note.drift}px`,
          }}
        >
          {note.symbol}
        </span>
      ))}
    </div>
  );
}

export default function Sky() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev + 50) % CYCLE_DURATION);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const colors = getPhaseColors(time);
  const nightOpacity = colors.isNight ? 1 : colors.isDay ? 0 : 0.5;
  const cloudOpacity = colors.isDay ? 0.5 : colors.isNight ? 0 : 0.2;

  const progress = (time % CYCLE_DURATION) / CYCLE_DURATION;
  const celestialX = -10 + progress * 120;
  const celestialY = 20 - Math.sin(progress * Math.PI) * 15;

  return (
    <>
      <div
        className="absolute inset-0 z-0"
        style={{ background: `linear-gradient(to bottom, ${colors.from}, ${colors.via}, ${colors.to})` }}
      />

      {/* Stars */}
      <div className="absolute inset-0 z-1 pointer-events-none" style={{ opacity: nightOpacity, transition: 'opacity 2s ease' }}>
        {STARS.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              animation: `twinkle ${2 + star.delay}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.6)`,
            }}
          />
        ))}
      </div>

      {/* Single celestial body (sun/moon) that changes color */}
      <div
        className="absolute z-1 pointer-events-none"
        style={{
          left: `${celestialX}%`,
          top: `${celestialY}%`,
          transition: 'left 0.1s linear, top 0.1s linear',
        }}
      >
        <div
          className="w-10 h-10 rounded-full"
          style={{
            background: `radial-gradient(circle at 35% 35%, white, ${colors.celestial})`,
            boxShadow: `0 0 30px ${colors.glow}, 0 0 80px ${colors.glow}`,
            transition: 'background 1s ease, box-shadow 1s ease',
          }}
        />
      </div>

      {/* Clouds */}
      <div
        className="absolute inset-0 z-1 pointer-events-none overflow-hidden"
        style={{ opacity: cloudOpacity, transition: 'opacity 3s ease' }}
      >
        <div className="absolute" style={{ top: '10%', animation: 'cloudDrift 45s linear infinite' }}>
          <svg width="120" height="40" viewBox="0 0 120 40">
            <ellipse cx="60" cy="25" rx="50" ry="15" fill="rgba(255,255,255,0.3)" />
            <ellipse cx="40" cy="20" rx="30" ry="12" fill="rgba(255,255,255,0.25)" />
            <ellipse cx="80" cy="18" rx="25" ry="10" fill="rgba(255,255,255,0.2)" />
          </svg>
        </div>
        <div className="absolute" style={{ top: '18%', animation: 'cloudDrift 60s linear infinite', animationDelay: '-20s' }}>
          <svg width="90" height="30" viewBox="0 0 90 30">
            <ellipse cx="45" cy="18" rx="40" ry="12" fill="rgba(255,255,255,0.2)" />
            <ellipse cx="30" cy="14" rx="22" ry="9" fill="rgba(255,255,255,0.18)" />
          </svg>
        </div>
      </div>

      {/* Music notes from cursor */}
      <MusicNotes />
    </>
  );
}
