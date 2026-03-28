import { useState, useEffect } from 'react';

const CYCLE_DURATION = 60000; // 60 seconds per full day/night cycle

const PHASES = [
  { name: 'night', from: '#0a3d47', via: '#0d4a57', to: '#1a1721' },
  { name: 'dawn', from: '#1a3a5c', via: '#c2655a', to: '#e8a87c' },
  { name: 'day', from: '#4a90b8', via: '#6ab4d6', to: '#87ceeb' },
  { name: 'sunset', from: '#1a2a4a', via: '#c4524a', to: '#e8985a' },
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
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
  const smooth = t * t * (3 - 2 * t); // smoothstep

  const cur = PHASES[phaseIdx];
  const next = PHASES[nextIdx];

  return {
    from: lerpColor(cur.from, next.from, smooth),
    via: lerpColor(cur.via, next.via, smooth),
    to: lerpColor(cur.to, next.to, smooth),
    phase: cur.name,
    t: smooth,
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
  const sunOpacity = colors.isDay ? 1 : colors.isNight ? 0 : 0.4;

  // Sun/moon position - arc across the sky
  const progress = (time % CYCLE_DURATION) / CYCLE_DURATION;
  const celestialX = 15 + progress * 70;
  const celestialY = 8 + Math.sin(progress * Math.PI) * -5 + 12;

  return (
    <>
      {/* Background gradient overlay */}
      <div
        className="absolute inset-0 z-0 transition-colors"
        style={{
          background: `linear-gradient(to bottom, ${colors.from}, ${colors.via}, ${colors.to})`,
        }}
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

      {/* Moon */}
      <div
        className="absolute z-1 pointer-events-none"
        style={{
          left: `${85 - celestialX * 0.3}%`,
          top: `${celestialY}%`,
          opacity: nightOpacity,
          transition: 'opacity 2s ease',
        }}
      >
        <div
          className="w-8 h-8 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #f5f5dc, #d4c98a)',
            boxShadow: '0 0 20px rgba(245,245,220,0.4), 0 0 60px rgba(245,245,220,0.15)',
          }}
        />
      </div>

      {/* Sun */}
      <div
        className="absolute z-1 pointer-events-none"
        style={{
          left: `${celestialX}%`,
          top: `${celestialY - 3}%`,
          opacity: sunOpacity,
          transition: 'opacity 2s ease',
        }}
      >
        <div
          className="w-10 h-10 rounded-full"
          style={{
            background: 'radial-gradient(circle at 40% 40%, #fff7b0, #ffd54f, #ffb300)',
            boxShadow: '0 0 30px rgba(255,213,79,0.6), 0 0 80px rgba(255,179,0,0.2)',
          }}
        />
      </div>

      {/* Clouds - only during day */}
      <div
        className="absolute inset-0 z-1 pointer-events-none overflow-hidden"
        style={{ opacity: sunOpacity * 0.5, transition: 'opacity 3s ease' }}
      >
        <div
          className="absolute"
          style={{
            top: '10%',
            animation: 'cloudDrift 45s linear infinite',
          }}
        >
          <svg width="120" height="40" viewBox="0 0 120 40">
            <ellipse cx="60" cy="25" rx="50" ry="15" fill="rgba(255,255,255,0.3)" />
            <ellipse cx="40" cy="20" rx="30" ry="12" fill="rgba(255,255,255,0.25)" />
            <ellipse cx="80" cy="18" rx="25" ry="10" fill="rgba(255,255,255,0.2)" />
          </svg>
        </div>
        <div
          className="absolute"
          style={{
            top: '18%',
            animation: 'cloudDrift 60s linear infinite',
            animationDelay: '-20s',
          }}
        >
          <svg width="90" height="30" viewBox="0 0 90 30">
            <ellipse cx="45" cy="18" rx="40" ry="12" fill="rgba(255,255,255,0.2)" />
            <ellipse cx="30" cy="14" rx="22" ry="9" fill="rgba(255,255,255,0.18)" />
          </svg>
        </div>
      </div>
    </>
  );
}
