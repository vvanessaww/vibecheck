import { useState, useRef } from 'react';
import ArtistCard from '../shared/ArtistCard';
import Divider from '../layout/Divider';
import { HEADLINER_OPTIONS } from '../../data/questions';

export default function HeadlinerShowdown({ onComplete }) {
  const [selectedId, setSelectedId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleSelect = (artist) => {
    setSelectedId(selectedId === artist.id ? null : artist.id);
  };

  const handleLockIn = () => {
    if (selectedId === null) return;
    const artist = HEADLINER_OPTIONS.find((a) => a.id === selectedId);
    onComplete(selectedId, artist.weights);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPos = scrollRef.current.scrollLeft;
    const cardWidth = 260;
    setActiveIndex(Math.round(scrollPos / cardWidth));
  };

  return (
    <div className="flex flex-col items-center w-full h-full" style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
      <Divider text="Stage 1 of 7" />
      <h2 className="font-inter text-sm font-black tracking-[0.25em] text-white text-center uppercase mt-2 mb-4">
        Which Headliner<br />Would You See?
      </h2>

      <div className="w-full flex-1 relative flex items-center">
        <div
          ref={scrollRef}
          className="w-full h-[420px] flex overflow-x-auto gap-5 px-[50px] snap-x snap-mandatory items-center pb-8 pt-4"
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {HEADLINER_OPTIONS.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              isSelected={selectedId === artist.id}
              isDeselected={selectedId !== null && selectedId !== artist.id}
              onSelect={() => handleSelect(artist)}
            />
          ))}
        </div>

        <div className="absolute bottom-2 left-0 w-full flex justify-center gap-1 pointer-events-none opacity-50">
          {HEADLINER_OPTIONS.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeIndex ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      <div
        className="w-full px-8 transition-all duration-500 mb-4"
        style={{
          transform: selectedId !== null ? 'translateY(0)' : 'translateY(40px)',
          opacity: selectedId !== null ? 1 : 0,
          pointerEvents: selectedId !== null ? 'auto' : 'none',
        }}
      >
        <button
          onClick={handleLockIn}
          className="w-full bg-orange text-white font-black py-4 rounded-full uppercase tracking-widest text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
          style={{ boxShadow: '0 0 20px rgba(255,92,0,0.4)' }}
        >
          Lock In Answer
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
