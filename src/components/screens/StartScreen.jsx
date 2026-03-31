import { useState } from 'react';

export default function StartScreen({ onStart, playerName, onNameChange, challengerName }) {
  const [name, setName] = useState(playerName || '');

  const handleStart = () => {
    onNameChange(name.trim());
    onStart();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && name.trim()) handleStart();
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full text-center py-4" style={{ animation: 'slideUp 0.4s ease-out forwards' }}>
      <div />

      <div className="flex flex-col items-center">
        <h2
          className="font-oswald text-5xl font-black uppercase tracking-tighter leading-[0.85] mb-2 bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent"
          style={{ animation: 'float 3s ease-in-out infinite' }}
        >
          Find Your 2026
        </h2>
        <h2
          className="font-oswald text-6xl font-black uppercase tracking-tighter leading-[0.85] mb-6 bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent"
          style={{ animation: 'float 4s ease-in-out infinite' }}
        >
          Home Stage
        </h2>

        <p className="font-inter font-bold text-sm text-gray-300 tracking-tight uppercase px-2">
          Which Coachella stage matches your soul?
        </p>
        <p className="font-inter text-[10px] text-white/40 mt-2 px-4">
          {challengerName ? `${challengerName} wants to know your vibe` : 'Take the quiz, then challenge your squad to compare vibes'}
        </p>

        <div className="mt-6 w-full max-w-[280px]">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 12))}
            onKeyDown={handleKeyDown}
            placeholder="Enter your name"
            maxLength={12}
            className="w-full text-center bg-white/10 border-2 border-white/20 rounded-full px-6 py-3 font-inter font-bold text-white text-sm tracking-wider placeholder:text-white/30 focus:outline-none focus:border-orange transition-colors"
          />
          <p className="text-[9px] text-white/30 mt-1.5 font-inter tracking-wider">{name.length}/12</p>
        </div>
      </div>

      <button
        onClick={name.trim() ? handleStart : undefined}
        className={`shrink-0 px-8 py-3 font-black uppercase tracking-widest text-sm rounded-full overflow-hidden transition-all active:scale-95 hover:scale-105 ${
          name.trim() ? 'bg-white text-teal-dark' : 'bg-white/20 text-white/50 cursor-default'
        }`}
      >
        Take The Quiz
      </button>
    </div>
  );
}
