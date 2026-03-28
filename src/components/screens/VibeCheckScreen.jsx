import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Divider from '../layout/Divider';
import { VIBE_CHECK_QUESTIONS } from '../../data/questions';

export default function VibeCheckScreen({ onComplete, backRef, onBack }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [accumulatedWeights, setAccumulatedWeights] = useState({});

  useEffect(() => {
    if (!backRef) return;
    backRef.current = questionIndex > 0
      ? () => { setQuestionIndex(0); setAccumulatedWeights({}); }
      : null;
    return () => { backRef.current = null; };
  }, [questionIndex, backRef]);

  const question = VIBE_CHECK_QUESTIONS[questionIndex];

  const handleSelect = useCallback((option) => {
    const nextWeights = { ...accumulatedWeights };
    for (const [persona, value] of Object.entries(option.weights)) {
      nextWeights[persona] = (nextWeights[persona] || 0) + value;
    }

    if (questionIndex >= VIBE_CHECK_QUESTIONS.length - 1) {
      onComplete('vibeCheck', nextWeights);
    } else {
      setAccumulatedWeights(nextWeights);
      setQuestionIndex((prev) => prev + 1);
    }
  }, [questionIndex, accumulatedWeights, onComplete]);

  return (
    <div className="flex flex-col items-center w-full h-full" style={{ animation: 'fadeIn 0.4s ease-out forwards' }}>
      <h2 className="font-inter text-sm font-black tracking-[0.25em] text-white text-center uppercase mb-4 shrink-0">
        Vibe Check
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={questionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-[400px] mx-auto flex flex-col items-center"
        >
          <h2 className="font-inter text-lg font-black tracking-tight text-white text-center uppercase mb-6">
            {question.question}
          </h2>

          <div className="grid grid-cols-2 gap-3 w-full px-2">
            {question.options.map((option) => (
              <button
                key={option.label}
                onClick={() => handleSelect(option)}
                className="flex flex-col items-center justify-center py-6 px-4 rounded-2xl border-2 border-white/15 bg-teal-card/50 transition-all active:scale-95 hover:border-orange/50 hover:bg-orange/10"
              >
                <span className="text-3xl mb-2">{option.emoji}</span>
                <span className="font-inter text-sm font-bold uppercase tracking-wider text-white">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex gap-2">
        {VIBE_CHECK_QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${i === questionIndex ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
}
