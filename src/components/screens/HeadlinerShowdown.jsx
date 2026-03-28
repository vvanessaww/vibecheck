import { useState, useRef, useEffect } from 'react';
import ArtistCard from '../shared/ArtistCard';
import { HEADLINER_OPTIONS } from '../../data/questions';

export default function HeadlinerShowdown({ onComplete }) {
  const [activeIndex, setActiveIndex] = useState(1);
  const scrollRef = useRef(null);
  const isScrollingRef = useRef(false);

  const activeArtist = HEADLINER_OPTIONS[activeIndex];

  const scrollToIndex = (index) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[index];
    if (!card) return;
    const containerWidth = scrollRef.current.offsetWidth;
    const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
    isScrollingRef.current = true;
    scrollRef.current.scrollTo({ left: cardCenter - (containerWidth / 2), behavior: 'smooth' });
    setTimeout(() => { isScrollingRef.current = false; }, 500);
  };

  const goTo = (dir) => {
    const next = activeIndex + dir;
    if (next < 0 || next >= HEADLINER_OPTIONS.length) return;
    setActiveIndex(next);
    scrollToIndex(next);
  };

  const handleScroll = () => {
    if (!scrollRef.current || isScrollingRef.current) return;
    const containerWidth = scrollRef.current.offsetWidth;
    const scrollCenter = scrollRef.current.scrollLeft + (containerWidth / 2);
    let closest = 0;
    let closestDist = Infinity;
    for (let i = 0; i < scrollRef.current.children.length; i++) {
      const child = scrollRef.current.children[i];
      const childCenter = child.offsetLeft + (child.offsetWidth / 2);
      const dist = Math.abs(scrollCenter - childCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    }
    setActiveIndex(closest);
  };

  const handleLockIn = () => {
    onComplete(activeArtist.id, activeArtist.weights);
  };

  useEffect(() => {
    scrollToIndex(1);
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full" style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
      <h2 className="font-inter text-sm font-black tracking-[0.25em] text-white text-center uppercase mb-4 shrink-0">
        Which Headliner<br />Would You See?
      </h2>

      <div className="w-full flex-1 relative flex items-center justify-center">
        {/* Left arrow */}
        <button
          onClick={() => goTo(-1)}
          className="absolute z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
          style={{ left: 'calc(50% - 155px)', opacity: activeIndex > 0 ? 1 : 0.2, pointerEvents: activeIndex > 0 ? 'auto' : 'none' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="w-full h-[380px] flex gap-5 items-center snap-x snap-mandatory overflow-x-auto justify-center"
          onScroll={handleScroll}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollPaddingLeft: 'calc(50% - 120px)',
            scrollPaddingRight: 'calc(50% - 120px)',
          }}
        >
          {HEADLINER_OPTIONS.map((artist, i) => {
            const isFocused = i === activeIndex;
            return (
              <div
                key={artist.id}
                className="snap-center shrink-0 transition-all duration-300"
                style={{
                  transform: isFocused ? 'scale(1)' : 'scale(0.85)',
                  opacity: isFocused ? 1 : 0.4,
                  filter: isFocused ? 'none' : 'brightness(0.6)',
                }}
                onClick={() => {
                  if (!isFocused) {
                    setActiveIndex(i);
                    scrollToIndex(i);
                  }
                }}
              >
                <ArtistCard
                  artist={artist}
                  isSelected={isFocused}
                  isDeselected={false}
                  onSelect={() => {}}
                />
              </div>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => goTo(1)}
          className="absolute z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
          style={{ right: 'calc(50% - 155px)', opacity: activeIndex < HEADLINER_OPTIONS.length - 1 ? 1 : 0.2, pointerEvents: activeIndex < HEADLINER_OPTIONS.length - 1 ? 'auto' : 'none' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4 mb-4 shrink-0">
        {HEADLINER_OPTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActiveIndex(i); scrollToIndex(i); }}
            className={`h-1.5 rounded-full transition-all ${i === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`}
          />
        ))}
      </div>

      {/* Lock in button - always visible since focused card is auto-selected */}
      <div className="w-full max-w-[400px] mx-auto px-8 mt-2 mb-4 shrink-0">
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
