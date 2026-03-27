import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Divider from '../layout/Divider';
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
    <div className="flex flex-col items-center w-full h-full" style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
      <Divider text={`Round ${roundIndex + 1} / ${THIS_OR_THAT.length}`} />
      <h2 className="font-inter text-sm font-black tracking-[0.25em] text-white text-center uppercase mt-2 mb-8">
        This or That
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={roundIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex gap-4 w-full px-2 items-stretch"
          style={{ minHeight: '300px' }}
        >
          {['left', 'right'].map((side) => {
            const option = round[side];
            const isWinner = picked === side;
            const isLoser = picked !== null && picked !== side;

            return (
              <motion.div
                key={side}
                onClick={() => handlePick(side)}
                className="flex-1 rounded-2xl border-2 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors"
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
            );
          })}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8">
        <span
          className="font-oswald text-4xl font-black text-orange"
          style={{ textShadow: '0 0 20px rgba(255,92,0,0.6)' }}
        >
          VS
        </span>
      </div>
    </div>
  );
}
