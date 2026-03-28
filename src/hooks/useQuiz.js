import { useState, useCallback, useEffect } from 'react';
import { emptyScores, addWeights, calculatePersona } from '../data/scoring';

const STORAGE_KEY = 'vibecheck_quiz_state';

function loadSavedState() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    if (parsed && parsed.currentScreen && parsed.scores) return parsed;
  } catch { /* ignore corrupt data */ }
  return null;
}

function saveState(state) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* storage full or unavailable */ }
}

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
  const [state, setState] = useState(() => loadSavedState() || initialState());

  useEffect(() => {
    saveState(state);
  }, [state]);

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
    sessionStorage.removeItem(STORAGE_KEY);
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
