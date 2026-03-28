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
      <h2 className="font-inter text-sm font-black tracking-[0.25em] text-white text-center uppercase mb-1 shrink-0">
        This or That
      </h2>
      <p className="text-[10px] text-white/40 font-inter italic mb-3 shrink-0">(friendships have ended over less)</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={roundIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex flex-col items-center justify-center w-full max-w-[400px] mx-auto px-4 gap-3"
        >
          {['left', 'right'].map((side, idx) => {
            const option = round[side];
            const isWinner = picked === side;
            const isLoser = picked !== null && picked !== side;

            return (
              <div key={side} className="contents">
                {idx === 1 && (
                  <span
                    className="font-oswald text-2xl font-black text-orange shrink-0"
                    style={{ textShadow: '0 0 20px rgba(255,92,0,0.6)' }}
                  >
                    VS
                  </span>
                )}
                <motion.div
                  onClick={() => handlePick(side)}
                  className="w-full h-[100px] rounded-2xl border-2 flex items-center justify-center px-6 text-center cursor-pointer transition-all hover:border-orange/60 hover:bg-orange/10"
                  style={{
                    backgroundColor: isWinner ? 'rgba(255, 92, 0, 0.2)' : 'rgba(19, 92, 107, 0.5)',
                    borderColor: isWinner ? '#ff5c00' : isLoser ? 'transparent' : 'rgba(255,255,255,0.15)',
                  }}
                  animate={{
                    scale: isWinner ? 1.05 : isLoser ? 0.9 : 1,
                    opacity: isLoser ? 0 : 1,
                  }}
                  transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
                >
                  <h3 className="font-oswald text-2xl font-black uppercase tracking-tighter leading-tight text-white">
                    {option.name}
                  </h3>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
