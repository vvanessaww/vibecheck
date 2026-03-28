import { useState, useCallback } from 'react';
import { emptyScores, addWeights, calculatePersona } from '../data/scoring';

export const SCREENS = {
  SPLASH: 'splash',
  START: 'start',
  WELCOME: 'welcome',
  HEADLINER: 'headliner',
  THIS_OR_THAT: 'thisOrThat',
  SWIPE: 'swipe',
  DAY_DRAFT: 'dayDraft',
  GENRE: 'genre',
  VIBE_CHECK: 'vibeCheck',
  HOT_TAKES: 'hotTakes',
  LOADING: 'loading',
  RESULT: 'result',
  COMPARE: 'compare',
  SHARE: 'share',
};

const SCREEN_ORDER = [
  SCREENS.START,
  SCREENS.WELCOME,
  SCREENS.HEADLINER,
  SCREENS.THIS_OR_THAT,
  SCREENS.GENRE,
  SCREENS.VIBE_CHECK,
  SCREENS.HOT_TAKES,
  SCREENS.DAY_DRAFT,
  SCREENS.LOADING,
  SCREENS.RESULT,
  SCREENS.COMPARE,
  SCREENS.SHARE,
];

function initialState() {
  return {
    currentScreen: SCREENS.START,
    scores: emptyScores(),
    answers: {},
    playerName: '',
    dayPicks: [],
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

  const prevScreen = useCallback(() => {
    setState((prev) => {
      const idx = SCREEN_ORDER.indexOf(prev.currentScreen);
      const prevIdx = Math.max(idx - 1, 0);
      return { ...prev, currentScreen: SCREEN_ORDER[prevIdx] };
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

  const setPlayerName = useCallback((name) => {
    setState((prev) => ({ ...prev, playerName: name }));
  }, []);

  const setDayPicks = useCallback((picks) => {
    setState((prev) => ({ ...prev, dayPicks: picks }));
  }, []);

  const [challenger, setChallenger] = useState(null);

  const restart = useCallback(() => {
    setState(initialState());
  }, []);

  const personaId = calculatePersona(state.scores);

  return {
    currentScreen: state.currentScreen,
    scores: state.scores,
    answers: state.answers,
    playerName: state.playerName,
    dayPicks: state.dayPicks,
    personaId,
    setPlayerName,
    setDayPicks,
    challenger,
    setChallenger,
    nextScreen,
    prevScreen,
    goToScreen,
    recordAnswer,
    restart,
  };
}
