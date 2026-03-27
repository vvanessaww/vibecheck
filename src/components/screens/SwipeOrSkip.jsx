import { useState, useCallback } from 'react';
import SwipeCard from '../shared/SwipeCard';
import Divider from '../layout/Divider';
import { SWIPE_CARDS } from '../../data/questions';

export default function SwipeOrSkip({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardKey, setCardKey] = useState(0);
  const [accumulatedWeights, setAccumulatedWeights] = useState({});

  const handleSwipe = useCallback((dir) => {
    const card = SWIPE_CARDS[currentIndex];
    const weights = dir === 'right' ? card.yesWeights : card.noWeights;
    const nextWeights = { ...accumulatedWeights };
    for (const [persona, value] of Object.entries(weights)) {
      nextWeights[persona] = (nextWeights[persona] || 0) + value;
    }

    if (currentIndex >= SWIPE_CARDS.length - 1) {
      onComplete('swipe', nextWeights);
    } else {
      setAccumulatedWeights(nextWeights);
      setCurrentIndex((prev) => prev + 1);
      setCardKey((prev) => prev + 1);
    }
  }, [currentIndex, accumulatedWeights, onComplete]);

  const getCard = (offset) => SWIPE_CARDS[(currentIndex + offset) % SWIPE_CARDS.length];

  return (
    <div className="flex flex-col items-center w-full h-full" style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
      <Divider text={`Question ${currentIndex + 1} / ${SWIPE_CARDS.length}`} />
      <h2 className="font-inter text-sm font-black tracking-[0.25em] text-white text-center uppercase mt-2 mb-6">
        Swipe or Skip
      </h2>

      <div className="relative w-full h-[420px]" style={{ perspective: '1000px' }} key={cardKey}>
        {[3, 2, 1].map((pos) => (
          <SwipeCard key={`${cardKey}-${pos}`} position={pos} onSwipeComplete={handleSwipe}>
            {pos === 1 && (
              <h2 className="font-oswald text-3xl font-black uppercase tracking-tighter leading-tight text-white">
                {getCard(pos - 1).text}
              </h2>
            )}
          </SwipeCard>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-12">
        <button
          onClick={() => handleSwipe('left')}
          className="w-14 h-14 rounded-full border-2 border-accent-teal flex items-center justify-center bg-transparent text-white text-xl transition-all active:scale-90 hover:bg-accent-teal/20"
        >
          &#10005;
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="w-14 h-14 rounded-full border-2 border-pink flex items-center justify-center bg-transparent text-pink text-xl transition-all active:scale-90 hover:bg-pink/20"
          style={{ boxShadow: '0 0 15px rgba(255,0,122,0.3)' }}
        >
          &#10084;
        </button>
      </div>
    </div>
  );
}
