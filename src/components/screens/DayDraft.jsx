import { useState, useCallback } from 'react';
import { FRIDAY_LINEUP, SATURDAY_LINEUP, SUNDAY_LINEUP } from '../../data/lineup';

const DAYS = [
  { label: 'Friday', lineup: FRIDAY_LINEUP },
  { label: 'Saturday', lineup: SATURDAY_LINEUP },
  { label: 'Sunday', lineup: SUNDAY_LINEUP },
];

const MAX_PICKS = 5;

export default function DayDraft({ onComplete }) {
  const [dayIndex, setDayIndex] = useState(0);
  const [selectedByDay, setSelectedByDay] = useState([[], [], []]);

  const day = DAYS[dayIndex];
  const selected = selectedByDay[dayIndex];

  const toggleArtist = useCallback((artistId) => {
    setSelectedByDay((prev) => {
      const daySel = prev[dayIndex];
      const updated = daySel.includes(artistId)
        ? daySel.filter((id) => id !== artistId)
        : daySel.length >= MAX_PICKS ? daySel : [...daySel, artistId];
      const next = [...prev];
      next[dayIndex] = updated;
      return next;
    });
  }, [dayIndex]);

  const handleNext = () => {
    if (dayIndex < DAYS.length - 1) {
      setDayIndex((prev) => prev + 1);
    } else {
      const weights = {};
      for (let d = 0; d < DAYS.length; d++) {
        for (const artistId of selectedByDay[d]) {
          const artist = DAYS[d].lineup.find((a) => a.id === artistId);
          if (artist) {
            for (const [persona, value] of Object.entries(artist.weights)) {
              weights[persona] = (weights[persona] || 0) + value;
            }
          }
        }
      }
      onComplete('dayDraft', weights);
    }
  };

  const maxReached = selected.length >= MAX_PICKS;
  const isLastDay = dayIndex === DAYS.length - 1;

  return (
    <div className="flex flex-col items-center w-full h-full" style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
      <h2 className="font-inter text-sm font-black tracking-[0.25em] text-white text-center uppercase mb-1 shrink-0">
        Build Your Lineup — {day.label}
      </h2>
      <p className="text-[10px] text-white/40 font-inter italic mb-3 shrink-0">(yes, you can only pick 5. we know it hurts)</p>

      <div className="w-full max-w-[400px] mx-auto flex-1 overflow-y-auto min-h-0 rounded-xl border border-white/10 bg-white/5" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.3) transparent' }}>
        {day.lineup.map((artist) => {
          const isSelected = selected.includes(artist.id);
          return (
            <div
              key={artist.id}
              className={`flex items-center py-3 px-2 border-b border-white/10 cursor-pointer transition-colors ${isSelected ? 'bg-white/5' : ''}`}
              onClick={() => toggleArtist(artist.id)}
              style={{ opacity: !isSelected && maxReached ? 0.4 : 1 }}
            >
              <div className="w-[70px] text-[0.65rem] tracking-[0.1em] opacity-60 font-inter text-white pr-3">
                {artist.time}
              </div>
              <div className="flex-1 pr-4">
                <div className="text-base font-bold tracking-[0.05em] font-inter text-white">{artist.name}</div>
                <div className="text-[0.6rem] tracking-[0.2em] text-accent-teal uppercase font-inter">
                  {artist.stage}
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                  isSelected ? 'border-orange bg-orange' : 'border-white'
                }`}
                style={isSelected ? { boxShadow: '3px 3px 0px rgba(0,0,0,0.3)' } : {}}
              >
                {isSelected && <div className="w-2.5 h-2.5 bg-teal-dark rounded-full" />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full max-w-[400px] mx-auto px-2 flex justify-between items-center shrink-0 pt-3 pb-1">
        <div>
          <span className="text-[0.6rem] tracking-[0.2em] uppercase opacity-70 font-inter block">Selected</span>
          <span className="font-oswald text-2xl font-black text-orange" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>
            {selected.length}/{MAX_PICKS}
          </span>
        </div>

        <div className="flex gap-1.5">
          {DAYS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === dayIndex ? 'w-6 bg-white' : i < dayIndex ? 'w-3 bg-orange' : 'w-1.5 bg-white/30'}`}
            />
          ))}
        </div>

        <button
          onClick={maxReached ? handleNext : undefined}
          className={`px-6 py-2.5 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all font-inter ${
            maxReached ? 'bg-orange text-white active:scale-95' : 'bg-white/20 text-white/50 cursor-default'
          }`}
          style={maxReached ? { boxShadow: '0 0 15px rgba(255,92,0,0.4)' } : {}}
        >
          {maxReached ? (isLastDay ? 'Lock It In' : 'Next Day') : 'Pick 5'}
        </button>
      </div>
    </div>
  );
}
