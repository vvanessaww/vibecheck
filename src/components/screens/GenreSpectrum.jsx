import { useState, useCallback } from 'react';
import Divider from '../layout/Divider';
import { GENRE_SLIDERS } from '../../data/questions';

export default function GenreSpectrum({ onComplete }) {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [values, setValues] = useState(GENRE_SLIDERS.map(() => 50));

  const slider = GENRE_SLIDERS[sliderIndex];

  const handleChange = (e) => {
    const val = Number(e.target.value);
    setValues((prev) => {
      const next = [...prev];
      next[sliderIndex] = val;
      return next;
    });
  };

  const handleNext = useCallback(() => {
    if (sliderIndex < GENRE_SLIDERS.length - 1) {
      setSliderIndex((prev) => prev + 1);
    } else {
      const weights = {};
      for (let i = 0; i < GENRE_SLIDERS.length; i++) {
        const s = GENRE_SLIDERS[i];
        const val = values[i];
        const leftWeight = Math.round((100 - val) / 33);
        const rightWeight = Math.round(val / 33);
        weights[s.left.persona] = (weights[s.left.persona] || 0) + leftWeight;
        weights[s.right.persona] = (weights[s.right.persona] || 0) + rightWeight;
      }
      onComplete('genre', weights);
    }
  }, [sliderIndex, values, onComplete]);

  const currentValue = values[sliderIndex];

  return (
    <div className="flex flex-col items-center w-full h-full" style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
      <h2 className={`font-inter text-sm font-black tracking-[0.25em] text-white text-center uppercase shrink-0 ${sliderIndex === 0 ? 'mb-1' : 'mb-4'}`}>
        Where Do You Land?
      </h2>
      {sliderIndex === 0 && <p className="text-[10px] text-white/40 font-inter italic mb-3 shrink-0">(there are no wrong answers... just revealing ones)</p>}

      <div className="w-full max-w-[400px] mx-auto px-6 flex flex-col items-center gap-8 mt-8" key={sliderIndex}>
        <div className="w-full flex justify-between items-center">
          <span className="font-oswald text-xl font-black uppercase tracking-tighter text-accent-teal">
            {slider.left.label}
          </span>
          <span className="font-oswald text-xl font-black uppercase tracking-tighter text-orange text-right">
            {slider.right.label}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={currentValue}
          onChange={handleChange}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #4bb8cc, #7b6fbf ${currentValue * 0.5}%, #ff5c00)`,
            accentColor: '#ff5c00',
          }}
        />

        <button
          onClick={handleNext}
          className="mt-8 px-8 py-3 bg-orange text-white font-black uppercase tracking-widest text-xs rounded-full active:scale-95 transition-transform"
          style={{ boxShadow: '0 0 15px rgba(255,92,0,0.4)' }}
        >
          {sliderIndex < GENRE_SLIDERS.length - 1 ? 'Next' : 'Lock It In'}
        </button>
      </div>
    </div>
  );
}
