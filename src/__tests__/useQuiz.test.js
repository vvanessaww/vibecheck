import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuiz, SCREENS } from '../hooks/useQuiz';

describe('useQuiz', () => {
  it('starts at start screen', () => {
    const { result } = renderHook(() => useQuiz());
    expect(result.current.currentScreen).toBe(SCREENS.START);
  });

  it('advances screens in order', () => {
    const { result } = renderHook(() => useQuiz());
    act(() => result.current.nextScreen());
    expect(result.current.currentScreen).toBe(SCREENS.HEADLINER);
    act(() => result.current.nextScreen());
    expect(result.current.currentScreen).toBe(SCREENS.THIS_OR_THAT);
  });

  it('records answers and updates scores', () => {
    const { result } = renderHook(() => useQuiz());
    act(() => result.current.recordAnswer('headliner', 'h1', { sahara: 3 }));
    expect(result.current.scores.sahara).toBe(3);
  });

  it('records answers immutably', () => {
    const { result } = renderHook(() => useQuiz());
    const scoresBefore = result.current.scores;
    act(() => result.current.recordAnswer('headliner', 'h1', { sahara: 3 }));
    expect(scoresBefore.sahara).toBe(0);
    expect(result.current.scores.sahara).toBe(3);
  });

  it('resets state on restart', () => {
    const { result } = renderHook(() => useQuiz());
    act(() => result.current.recordAnswer('headliner', 'h1', { sahara: 3 }));
    act(() => result.current.nextScreen());
    act(() => result.current.restart());
    expect(result.current.currentScreen).toBe(SCREENS.START);
    expect(result.current.scores.sahara).toBe(0);
  });
});
