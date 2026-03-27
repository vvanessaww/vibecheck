import { describe, it, expect } from 'vitest';
import { calculatePersona, addWeights, emptyScores } from '../data/scoring';

describe('addWeights', () => {
  it('adds weights to existing scores immutably', () => {
    const scores = emptyScores();
    const result = addWeights(scores, { sahara: 3, feels: 1 });
    expect(result.sahara).toBe(3);
    expect(result.feels).toBe(1);
    expect(result.dolab).toBe(0);
    expect(scores.sahara).toBe(0);
  });

  it('accumulates across multiple calls', () => {
    let scores = emptyScores();
    scores = addWeights(scores, { sahara: 3 });
    scores = addWeights(scores, { sahara: 2, feels: 1 });
    expect(scores.sahara).toBe(5);
    expect(scores.feels).toBe(1);
  });
});

describe('calculatePersona', () => {
  it('returns the persona with highest score', () => {
    const scores = { ...emptyScores(), sahara: 10, feels: 3, dolab: 1 };
    expect(calculatePersona(scores)).toBe('sahara');
  });

  it('returns first persona on tie', () => {
    const scores = { ...emptyScores(), sahara: 5, feels: 5 };
    const result = calculatePersona(scores);
    expect(result).toBe('sahara');
  });

  it('returns sahara as default on empty scores', () => {
    expect(calculatePersona(emptyScores())).toBe('sahara');
  });
});
