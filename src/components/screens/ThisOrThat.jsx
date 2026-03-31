import { useState, useCallback, useEffect } from 'react';
import { THIS_OR_THAT } from '../../data/questions';

export default function ThisOrThat({ onComplete, backRef, onBack }) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [fading, setFading] = useState(false);
  const [accumulatedWeights, setAccumulatedWeights] = useState({});

  useEffect(() => {
    if (!backRef) return;
    backRef.current = roundIndex > 0
      ? () => { setRoundIndex(0); setPicked(null); setAccumulatedWeights({}); }
      : null;
    return () => { backRef.current = null; };
  }, [roundIndex, backRef]);

  const round = THIS_OR_THAT[roundIndex];

  const handlePick = useCallback((side) => {
    if (picked) return;
    setPicked(side);

    const choice = side === 'left' ? round.left : round.right;
    const nextWeights = { ...accumulatedWeights };
    for (const [persona, value] of Object.entries(choice.weights)) {
      nextWeights[persona] = (nextWeights[persona] || 0) + value;
    }

    // Show winner briefly, then fade out, then advance
    setTimeout(() => setFading(true), 1000);
    setTimeout(() => {
      if (roundIndex >= THIS_OR_THAT.length - 1) {
        onComplete('thisOrThat', nextWeights);
      } else {
        setAccumulatedWeights(nextWeights);
        setRoundIndex((prev) => prev + 1);
        setPicked(null);
        setFading(false);
      }
    }, 1800);
  }, [picked, round, roundIndex, accumulatedWeights, onComplete]);

  return (
    <div className="flex flex-col items-center justify-start w-full h-full pt-0 transition-opacity duration-700" style={{ animation: 'fadeIn 0.4s ease-out forwards', opacity: fading ? 0 : 1 }}>
      <h2 className="font-inter text-sm font-black tracking-[0.25em] text-white text-center uppercase mb-1 shrink-0">
        This or That
      </h2>
      <p className="text-[10px] text-white/40 font-inter italic mb-3 shrink-0">(friendships have ended over less)</p>

        <div
          key={roundIndex}
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
                    className={`font-oswald text-2xl font-black text-orange shrink-0 transition-opacity duration-300 ${picked ? 'opacity-0' : ''}`}
                    style={{ textShadow: '0 0 20px rgba(255,92,0,0.6)' }}
                  >
                    VS
                  </span>
                )}
                <div
                  onClick={() => handlePick(side)}
                  className={`w-full h-[100px] rounded-2xl border-2 flex items-center justify-center px-6 text-center cursor-pointer transition-all duration-300 ${
                    isWinner ? 'scale-105 border-orange bg-orange/20' :
                    isLoser ? 'opacity-0 border-transparent' :
                    'border-white/15 bg-[rgba(19,92,107,0.5)] hover:scale-[1.04] hover:border-orange hover:bg-orange/15 hover:shadow-[0_0_20px_rgba(255,92,0,0.3)]'
                  }`}
                >
                  <h3 className="font-oswald text-2xl font-black uppercase tracking-tighter leading-tight text-white">
                    {option.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
}
