import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THIS_OR_THAT } from '../../data/questions';

export default function ThisOrThat({ onComplete }) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [accumulatedWeights, setAccumulatedWeights] = useState({});

  const round = THIS_OR_THAT[roundIndex];

  const handlePick = useCallback((side) => {
    if (picked) return;
    setPicked(side);

    const choice = side === 'left' ? round.left : round.right;
    const nextWeights = { ...accumulatedWeights };
    for (const [persona, value] of Object.entries(choice.weights)) {
      nextWeights[persona] = (nextWeights[persona] || 0) + value;
    }

    setTimeout(() => {
      if (roundIndex >= THIS_OR_THAT.length - 1) {
        onComplete('thisOrThat', nextWeights);
      } else {
        setAccumulatedWeights(nextWeights);
        setRoundIndex((prev) => prev + 1);
        setPicked(null);
      }
    }, 800);
  }, [picked, round, roundIndex, accumulatedWeights, onComplete]);

  return (
    <div className="flex flex-col items-center justify-start w-full h-full pt-0" style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
      <h2 className="font-inter text-sm font-black tracking-[0.25em] text-white text-center uppercase mb-6 shrink-0">
        This or That
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={roundIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex items-center justify-center w-full px-2 gap-3"
        >
          {['left', 'right'].map((side, idx) => {
            const option = round[side];
            const isWinner = picked === side;
            const isLoser = picked !== null && picked !== side;

            return (
              <div key={side} className="contents">
                <motion.div
                  onClick={() => handlePick(side)}
                  className="w-[160px] h-[240px] rounded-2xl border-2 flex items-center justify-center p-5 text-center cursor-pointer transition-colors shrink-0"
                  style={{
                    backgroundColor: isWinner ? 'rgba(255, 92, 0, 0.2)' : 'rgba(19, 92, 107, 0.5)',
                    borderColor: isWinner ? '#ff5c00' : isLoser ? 'transparent' : 'rgba(255,255,255,0.15)',
                    transform: side === 'left' ? 'rotate(-2deg)' : 'rotate(2deg)',
                  }}
                  animate={{
                    scale: isWinner ? 1.1 : isLoser ? 0.8 : 1,
                    opacity: isLoser ? 0 : 1,
                  }}
                  transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
                >
                  <h3 className="font-oswald text-2xl font-black uppercase tracking-tighter leading-tight text-white">
                    {option.name}
                  </h3>
                </motion.div>

                {idx === 0 && (
                  <span
                    className="font-oswald text-3xl font-black text-orange shrink-0 mx-1"
                    style={{ textShadow: '0 0 20px rgba(255,92,0,0.6)' }}
                  >
                    VS
                  </span>
                )}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
