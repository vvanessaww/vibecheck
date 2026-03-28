import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArtistCard from '../shared/ArtistCard';
import { HEADLINER_OPTIONS } from '../../data/questions';

export default function HeadlinerShowdown({ onComplete }) {
  const [selectedId, setSelectedId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (artist) => {
    setSelectedId(selectedId === artist.id ? null : artist.id);
  };

  const handleLockIn = () => {
    if (selectedId === null) return;
    const artist = HEADLINER_OPTIONS.find((a) => a.id === selectedId);
    onComplete(selectedId, artist.weights);
  };

  const goTo = (dir) => {
    setActiveIndex((prev) => {
      const next = prev + dir;
      if (next < 0 || next >= HEADLINER_OPTIONS.length) return prev;
      return next;
    });
    setSelectedId(null);
  };

  return (
    <div className="flex flex-col items-center w-full h-full" style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
      <h2 className="font-inter text-sm font-black tracking-[0.25em] text-white text-center uppercase mb-4">
        Which Headliner<br />Would You See?
      </h2>

      <div className="w-full flex-1 relative flex items-center justify-center">
        {/* Left arrow */}
        <button
          onClick={() => goTo(-1)}
          className="absolute left-2 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
          style={{ opacity: activeIndex > 0 ? 1 : 0.2, pointerEvents: activeIndex > 0 ? 'auto' : 'none' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Cards - centered with neighbors peeking on desktop */}
        <div className="flex items-center justify-center gap-4 h-[400px]">
          {HEADLINER_OPTIONS.map((artist, i) => {
            const offset = i - activeIndex;
            const isCenter = offset === 0;
            const isNeighbor = Math.abs(offset) === 1;

            return (
              <motion.div
                key={artist.id}
                animate={{
                  scale: isCenter ? 1 : 0.85,
                  opacity: isCenter ? 1 : isNeighbor ? 0.4 : 0,
                  x: offset * 260,
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`absolute ${isCenter || isNeighbor ? '' : 'pointer-events-none'}`}
                style={{ display: !isCenter && !isNeighbor ? 'none' : undefined }}
              >
                <ArtistCard
                  artist={artist}
                  isSelected={selectedId === artist.id}
                  isDeselected={selectedId !== null && selectedId !== artist.id}
                  onSelect={() => isCenter && handleSelect(artist)}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => goTo(1)}
          className="absolute right-2 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
          style={{ opacity: activeIndex < HEADLINER_OPTIONS.length - 1 ? 1 : 0.2, pointerEvents: activeIndex < HEADLINER_OPTIONS.length - 1 ? 'auto' : 'none' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mb-3">
        {HEADLINER_OPTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActiveIndex(i); setSelectedId(null); }}
            className={`h-1.5 rounded-full transition-all ${i === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`}
          />
        ))}
      </div>

      {/* Lock in button */}
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
