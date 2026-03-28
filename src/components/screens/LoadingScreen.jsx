import { useEffect } from 'react';

function EqBar({ color, delay }) {
  return (
    <div
      style={{
        width: '8px',
        borderRadius: '2px 2px 0 0',
        backgroundColor: color,
        animation: 'equalizer 1s ease-in-out infinite alternate',
        animationDelay: delay,
      }}
    />
  );
}

export default function LoadingScreen({ onComplete, playerName }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full" style={{ animation: 'fadeIn 0.4s ease-out forwards' }}>
      <div className="relative w-48 h-48 mb-10 flex items-center justify-center">
        <div
          className="absolute w-full h-full rounded-full bg-neutral-900 border-4 border-neutral-800 shadow-2xl"
          style={{
            background: 'repeating-radial-gradient(circle, #111 0px, #111 2px, #181818 3px)',
            animation: 'spin 3s linear infinite',
          }}
        />
        <div
          className="absolute w-16 h-16 rounded-full bg-orange flex items-center justify-center border-2 border-white/20"
          style={{ animation: 'spin 3s linear infinite' }}
        >
          <div className="w-2 h-2 rounded-full bg-teal-dark" />
        </div>
      </div>

      <div className="flex items-end justify-center gap-1 h-8 mb-6">
        <EqBar color="#4bb8cc" delay="0s" />
        <EqBar color="#ff5c00" delay="0.2s" />
        <EqBar color="#ffffff" delay="0.4s" />
        <EqBar color="#4bb8cc" delay="0.1s" />
        <EqBar color="#ff5c00" delay="0.3s" />
      </div>

      <div className="text-center space-y-2">
        <h2 className="font-oswald text-3xl font-black uppercase tracking-tighter text-white animate-pulse">
          Checking {playerName ? `${playerName}'s` : 'Your'} Vibes...
        </h2>
        <p className="text-[10px] font-bold tracking-[0.2em] text-accent-teal uppercase opacity-80 font-inter">
          Scanning Frequencies
        </p>
      </div>
    </div>
  );
}
