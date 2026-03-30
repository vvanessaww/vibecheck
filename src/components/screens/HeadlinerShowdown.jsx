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

  const [selected, setSelected] = useState(null);
  const [fading, setFading] = useState(false);

  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);
    const artist = HEADLINER_OPTIONS[index];
    setTimeout(() => setFading(true), 1000);
    setTimeout(() => onComplete(artist.id, artist.weights), 1500);
  };

  useEffect(() => {
    scrollToIndex(1);
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full transition-opacity duration-500" style={{ animation: 'fadeIn 0.4s ease-out forwards', opacity: fading ? 0 : 1 }}>
      <h2 className="font-inter text-sm font-black tracking-[0.25em] text-white text-center uppercase mb-1 shrink-0">
        Which Headliner Are You<br />Most Excited to See?
      </h2>
      <p className="text-[10px] text-white/40 font-inter italic mb-3 shrink-0">(choose wisely... or don&apos;t)</p>

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
                  transform: isFocused ? 'scale(1)' : 'scale(0.85)',
                  opacity: isFocused ? 1 : 0.4,
                  filter: isFocused ? 'none' : 'brightness(0.6)',
                }}
                onClick={() => {
                  if (!isFocused) {
                    setActiveIndex(i);
                    scrollToIndex(i);
                  } else {
                    handleSelect(i);
                  }
                }}
              >
                <ArtistCard
                  artist={artist}
                  isSelected={selected === i}
                  isDeselected={selected !== null && selected !== i}
                  isFocused={isFocused}
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

    </div>
  );
}
