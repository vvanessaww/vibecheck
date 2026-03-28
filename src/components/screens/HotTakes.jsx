import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeCard from '../shared/SwipeCard';
import { HOT_TAKES } from '../../data/questions';

export default function HotTakes({ onComplete, backRef, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardKey, setCardKey] = useState(0);
  const [accumulatedWeights, setAccumulatedWeights] = useState({});

  useEffect(() => {
    if (!backRef) return;
    backRef.current = currentIndex > 0
      ? () => { setCurrentIndex(0); setCardKey((k) => k + 1); setAccumulatedWeights({}); }
      : null;
    return () => { backRef.current = null; };
  }, [currentIndex, backRef]);

  const handleSwipe = useCallback((dir) => {
    const card = HOT_TAKES[currentIndex];
    const weights = dir === 'right' ? card.agreeWeights : card.disagreeWeights;
    const nextWeights = { ...accumulatedWeights };
    for (const [persona, value] of Object.entries(weights)) {
      nextWeights[persona] = (nextWeights[persona] || 0) + value;
    }

    if (currentIndex >= HOT_TAKES.length - 1) {
      onComplete('hotTakes', nextWeights);
    } else {
      setAccumulatedWeights(nextWeights);
      setCurrentIndex((prev) => prev + 1);
      setCardKey((prev) => prev + 1);
    }
  }, [currentIndex, accumulatedWeights, onComplete]);

  const getCard = (offset) => HOT_TAKES[(currentIndex + offset) % HOT_TAKES.length];

  return (
    <div className="flex flex-col items-center w-full h-full" style={{ animation: 'fadeIn 0.4s ease-out forwards' }}>
      <h2 className={`font-inter text-sm font-black tracking-[0.25em] text-white text-center uppercase shrink-0 ${currentIndex === 0 ? 'mb-1' : 'mb-4'}`}>
        Hot Takes
      </h2>
      {currentIndex === 0 && <p className="text-[10px] text-white/40 font-inter italic mb-3 shrink-0">(swipe right if you agree, left if you&apos;re wrong)</p>}

      <AnimatePresence mode="wait">
      <motion.div
        key={cardKey}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-[400px] mx-auto shrink-0"
        style={{ height: '320px', perspective: '1000px' }}
      >
        {[3, 2, 1].map((pos) => (
          <SwipeCard
            key={`${cardKey}-${pos}`}
            position={pos}
            onSwipeComplete={handleSwipe}
            leftLabel="DISAGREE"
            rightLabel="AGREE"
            leftColor="rgba(220, 38, 38, 0.4)"
            leftBorder="#dc2626"
            leftTextColor="#fca5a5"
            rightColor="rgba(22, 163, 74, 0.4)"
            rightBorder="#16a34a"
            rightTextColor="#86efac"
          >
            {pos === 1 && (
              <h2 className="font-oswald text-3xl font-black uppercase tracking-tighter leading-tight text-white">
                {getCard(pos - 1).text}
              </h2>
            )}
          </SwipeCard>
        ))}
      </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex justify-center gap-12 shrink-0">
        <button
          onClick={() => handleSwipe('left')}
          className="w-14 h-14 rounded-full border-2 border-white/40 flex items-center justify-center bg-transparent text-white text-sm font-bold transition-all active:scale-90 hover:bg-white/10"
        >
          &#10005;
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="w-14 h-14 rounded-full border-2 border-white/40 flex items-center justify-center bg-transparent text-white text-sm font-bold transition-all active:scale-90 hover:bg-white/10"
        >
          &#10003;
        </button>
      </div>
    </div>
  );
}
