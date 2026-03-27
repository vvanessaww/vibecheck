import { useState, useCallback } from 'react';
import { emptyScores, addWeights, calculatePersona } from '../data/scoring';

export const SCREENS = {
  SPLASH: 'splash',
  START: 'start',
  HEADLINER: 'headliner',
  THIS_OR_THAT: 'thisOrThat',
  SWIPE: 'swipe',
  DAY_DRAFT: 'dayDraft',
  GENRE: 'genre',
  VIBE_CHECK: 'vibeCheck',
  HOT_TAKES: 'hotTakes',
  LOADING: 'loading',
  RESULT: 'result',
  SHARE: 'share',
};

const SCREEN_ORDER = [
  SCREENS.SPLASH,
  SCREENS.START,
  SCREENS.HEADLINER,
  SCREENS.THIS_OR_THAT,
  SCREENS.SWIPE,
  SCREENS.DAY_DRAFT,
  SCREENS.GENRE,
  SCREENS.VIBE_CHECK,
  SCREENS.HOT_TAKES,
  SCREENS.LOADING,
  SCREENS.RESULT,
  SCREENS.SHARE,
];

function initialState() {
  return {
    currentScreen: SCREENS.SPLASH,
    scores: emptyScores(),
    answers: {},
  };
}

export function useQuiz() {
  const [state, setState] = useState(initialState);

  const nextScreen = useCallback(() => {
    setState((prev) => {
      const idx = SCREEN_ORDER.indexOf(prev.currentScreen);
      const nextIdx = Math.min(idx + 1, SCREEN_ORDER.length - 1);
      return { ...prev, currentScreen: SCREEN_ORDER[nextIdx] };
    });
  }, []);

  const goToScreen = useCallback((screen) => {
    setState((prev) => ({ ...prev, currentScreen: screen }));
  }, []);

  const recordAnswer = useCallback((screenId, answerId, weights) => {
    setState((prev) => ({
      ...prev,
      scores: addWeights(prev.scores, weights),
      answers: { ...prev.answers, [screenId]: answerId },
    }));
  }, []);

  const restart = useCallback(() => {
    setState(initialState());
  }, []);

  const personaId = calculatePersona(state.scores);

  return {
    currentScreen: state.currentScreen,
    scores: state.scores,
    answers: state.answers,
    personaId,
    nextScreen,
    goToScreen,
    recordAnswer,
    restart,
  };
}
