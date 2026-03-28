import { useState, useRef } from 'react';
import ArtistCard from '../shared/ArtistCard';
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

  const scrollToIndex = (index) => {
    if (!scrollRef.current) return;
    const cardWidth = 260;
    const containerWidth = scrollRef.current.offsetWidth;
    const scrollTarget = (index * cardWidth) - (containerWidth / 2) + (240 / 2);
    scrollRef.current.scrollTo({ left: scrollTarget, behavior: 'smooth' });
  };

  const goTo = (dir) => {
    const next = activeIndex + dir;
    if (next < 0 || next >= HEADLINER_OPTIONS.length) return;
    setActiveIndex(next);
    setSelectedId(null);
    scrollToIndex(next);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const cardWidth = 260;
    const containerWidth = scrollRef.current.offsetWidth;
    const scrollPos = scrollRef.current.scrollLeft + (containerWidth / 2) - (240 / 2);
    const index = Math.round(scrollPos / cardWidth);
    setActiveIndex(Math.max(0, Math.min(index, HEADLINER_OPTIONS.length - 1)));
  };

  return (
    <div className="flex flex-col items-center w-full h-full" style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
      <h2 className="font-inter text-sm font-black tracking-[0.25em] text-white text-center uppercase mb-4 shrink-0">
        Which Headliner<br />Would You See?
      </h2>

      <div className="w-full flex-1 relative flex items-center">
        {/* Left arrow */}
        <button
          onClick={() => goTo(-1)}
          className="absolute left-1 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
          style={{ opacity: activeIndex > 0 ? 1 : 0.2, pointerEvents: activeIndex > 0 ? 'auto' : 'none' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="w-full h-[380px] flex gap-5 items-center snap-x snap-mandatory overflow-x-auto"
          onScroll={handleScroll}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: 'calc(50% - 120px)',
            paddingRight: 'calc(50% - 120px)',
          }}
        >
          {HEADLINER_OPTIONS.map((artist, i) => {
            const isFocused = i === activeIndex;
            return (
              <div
                key={artist.id}
                className="snap-center shrink-0 transition-all duration-300"
                style={{
                  transform: isFocused ? 'scale(1)' : 'scale(0.88)',
                  opacity: isFocused ? 1 : 0.5,
                }}
                onClick={() => {
                  if (!isFocused) {
                    setActiveIndex(i);
                    setSelectedId(null);
                    scrollToIndex(i);
                  }
                }}
              >
                <ArtistCard
                  artist={artist}
                  isSelected={isFocused && selectedId === artist.id}
                  isDeselected={isFocused && selectedId !== null && selectedId !== artist.id}
                  onSelect={() => isFocused && handleSelect(artist)}
                />
              </div>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => goTo(1)}
          className="absolute right-1 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
          style={{ opacity: activeIndex < HEADLINER_OPTIONS.length - 1 ? 1 : 0.2, pointerEvents: activeIndex < HEADLINER_OPTIONS.length - 1 ? 'auto' : 'none' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mb-3 shrink-0">
        {HEADLINER_OPTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActiveIndex(i); setSelectedId(null); scrollToIndex(i); }}
            className={`h-1.5 rounded-full transition-all ${i === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`}
          />
        ))}
      </div>

      {/* Lock in button */}
      <div
        className="w-full px-8 transition-all duration-500 mb-4 shrink-0"
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
