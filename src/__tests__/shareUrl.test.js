import { describe, it, expect } from 'vitest';
import { encodeQuizState, decodeQuizState } from '../utils/shareUrl';

describe('shareUrl', () => {
  it('round-trips quiz state through encode/decode', () => {
    const state = { headliner: 'h1', scores: { sahara: 5, feels: 2 } };
    const encoded = encodeQuizState(state);
    expect(typeof encoded).toBe('string');
    const decoded = decodeQuizState(encoded);
    expect(decoded).toEqual(state);
  });

  it('returns null for invalid encoded state', () => {
    expect(decodeQuizState('not-valid-base64!!!')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(decodeQuizState('')).toBeNull();
  });
});
