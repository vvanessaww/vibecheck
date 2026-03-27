import { PERSONA_IDS } from './personas';

export function emptyScores() {
  return Object.fromEntries(PERSONA_IDS.map((id) => [id, 0]));
}

export function addWeights(scores, weights) {
  const next = { ...scores };
  for (const [persona, value] of Object.entries(weights)) {
    if (persona in next) {
      next[persona] = next[persona] + value;
    }
  }
  return next;
}

export function calculatePersona(scores) {
  let maxId = PERSONA_IDS[0];
  let maxScore = -1;
  for (const id of PERSONA_IDS) {
    if (scores[id] > maxScore) {
      maxScore = scores[id];
      maxId = id;
    }
  }
  return maxId;
}
