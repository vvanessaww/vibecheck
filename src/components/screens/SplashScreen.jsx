import { useState } from 'react';

export default function SplashScreen({ onDismiss }) {
  const [animating, setAnimating] = useState(false);

  const handleDismiss = () => {
    setAnimating(true);
    setTimeout(onDismiss, 700);
  };

  return (
    <div
      className="absolute inset-0 z-[100] bg-teal-dark flex flex-col items-center justify-between py-20 cursor-pointer"
      style={{
        transition: 'transform 0.7s ease-in-out, opacity 0.7s ease-in-out',
        transform: animating ? 'translateY(-100%)' : 'translateY(0)',
        opacity: animating ? 0 : 1,
      }}
      onClick={handleDismiss}
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-60 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="z-10 text-center px-6" style={{ animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
        <h3 className="font-oswald text-xs tracking-[0.4em] uppercase text-accent-teal mb-4">
          Welcome To The Valley
        </h3>
        <h2 className="font-oswald text-5xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-lg">
          Escape<br />To The<br />Desert
        </h2>
      </div>

      <div
        className="relative w-64 h-64 flex items-center justify-center"
        style={{ animation: 'wristbandSpin 8s linear infinite', perspective: '1000px' }}
      >
        <div
          className="relative w-48 h-12 bg-gradient-to-r from-orange via-pink-500 to-orange rounded-full border-t border-white/30 flex items-center justify-center overflow-hidden"
          style={{ boxShadow: '0 0 30px rgba(255,92,0,0.5)' }}
        >
          <div className="w-full flex justify-around items-center px-4">
            <span className="text-[10px] font-black tracking-widest text-white uppercase opacity-80">VIP</span>
            <div className="w-4 h-4 rounded-full bg-white/20" />
            <span className="text-[10px] font-black tracking-widest text-white uppercase opacity-80">2026</span>
          </div>
        </div>
      </div>

      <div className="z-10 flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center" style={{ animation: 'glow 2s ease-in-out infinite alternate' }}>
          <p className="text-white font-black tracking-[0.3em] uppercase text-sm mb-2">Tap To Begin</p>
          <div className="w-12 h-[1px] bg-white/50" />
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-64 pointer-events-none">
        <svg className="absolute bottom-0 h-32 opacity-40" style={{ width: '200%', animation: 'landscapeScroll 40s linear infinite' }} viewBox="0 0 800 100" preserveAspectRatio="none">
          <path d="M0,100 L50,40 L120,80 L200,20 L300,70 L400,10 L500,80 L600,40 L700,90 L800,50 L800,100 Z" fill="#062228" />
          <path d="M800,100 L850,40 L920,80 L1000,20 L1100,70 L1200,10 L1300,80 L1400,40 L1500,90 L1600,50 L1600,100 Z" fill="#062228" />
        </svg>
      </div>
    </div>
  );
}
