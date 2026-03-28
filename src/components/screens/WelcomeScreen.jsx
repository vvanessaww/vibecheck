import { useEffect } from 'react';

export default function WelcomeScreen({ playerName, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h2
        className="font-oswald text-3xl font-black uppercase tracking-tighter text-white text-center"
        style={{
          animation: 'welcomeFade 3s ease-in-out forwards, float 3s ease-in-out infinite',
          opacity: 0,
        }}
      >
        Welcome to the desert, {playerName || 'friend'}
      </h2>
    </div>
  );
}
